// Cloudflare Worker API for Orange Paramedical CMS
// Connects React frontend with Cloudflare D1 Database & R2 Storage Bucket with server-side Clerk JWT validation

export interface Env {
  DB: D1Database;
  MEDIA?: R2Bucket;
  BUCKET?: R2Bucket;
  CLERK_SECRET_KEY?: string;
  CLERK_AUTHORIZED_PARTIES?: string;
}

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

function getAuthorizedParties(env: Env): string[] {
  return (env.CLERK_AUTHORIZED_PARTIES || '').split(',').map((item) => item.trim()).filter(Boolean);
}

function corsHeaders(request: Request, env: Env): Record<string, string> {
  const origin = request.headers.get('Origin');
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
  if (origin && getAuthorizedParties(env).includes(origin)) headers['Access-Control-Allow-Origin'] = origin;
  return headers;
}

function jsonResponse(data: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}

function errorResponse(message: string, status = 400, headers: Record<string, string> = {}) {
  console.error(`[Worker Error ${status}]:`, message);
  return jsonResponse({ error: message, success: false }, status, headers);
}

function getR2Bucket(env: Env): R2Bucket {
  const bucket = env.MEDIA || env.BUCKET;
  if (!bucket) {
    throw new Error('R2 storage bucket binding (MEDIA) is not configured.');
  }
  return bucket;
}

async function verifyClerkAdmin(request: Request, env: Env): Promise<{ userId: string } | null> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.substring(7).trim();
  if (!token || !env.CLERK_SECRET_KEY) return null;
  const { verifyToken } = await import('@clerk/backend');
  const claims = await verifyToken(token, {
    secretKey: env.CLERK_SECRET_KEY,
    authorizedParties: getAuthorizedParties(env),
  });
  const metadata = (claims as typeof claims & { metadata?: { role?: unknown } }).metadata;
  if (typeof claims.sub !== 'string' || metadata?.role !== 'admin') return null;
  return { userId: claims.sub };
}

async function ensureTablesExist(db: D1Database) {
  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS news (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        short_description TEXT NOT NULL,
        content TEXT NOT NULL,
        image_url TEXT NOT NULL DEFAULT '',
        status TEXT NOT NULL DEFAULT 'published',
        published_at TEXT NOT NULL DEFAULT (datetime('now')),
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        short_description TEXT NOT NULL DEFAULT '',
        description TEXT NOT NULL,
        event_date TEXT NOT NULL,
        start_time TEXT NOT NULL DEFAULT '09:00 AM',
        end_time TEXT NOT NULL DEFAULT '04:00 PM',
        venue TEXT NOT NULL DEFAULT 'Main Campus',
        image_url TEXT NOT NULL DEFAULT '',
        status TEXT NOT NULL DEFAULT 'upcoming',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS gallery (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        caption TEXT NOT NULL DEFAULT '',
        category TEXT NOT NULL DEFAULT 'campus',
        image_url TEXT NOT NULL,
        storage_key TEXT NOT NULL DEFAULT '',
        display_order INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS media_storage (
        key TEXT PRIMARY KEY,
        content_type TEXT NOT NULL,
        data_base64 TEXT NOT NULL,
        size INTEGER NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS site_content (
        id TEXT PRIMARY KEY,
        content_json TEXT NOT NULL,
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      CREATE UNIQUE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
      CREATE UNIQUE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
      CREATE UNIQUE INDEX IF NOT EXISTS idx_gallery_storage_key ON gallery(storage_key);
      CREATE INDEX IF NOT EXISTS idx_media_storage_key ON media_storage(key);
    `);
  } catch (err) {
    console.error('[Worker DB Init Error]:', err);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const method = request.method;
    const cors = corsHeaders(request, env);

    console.log(`[Worker Request] ${method} ${url.pathname}${url.search}`);

    if (method === 'OPTIONS') {
      return new Response(null, { headers: cors, status: 204 });
    }

    let administrator: { userId: string } | null = null;
    if (url.pathname.startsWith('/api/admin/')) {
      if (!env.CLERK_SECRET_KEY || !env.CLERK_AUTHORIZED_PARTIES?.trim()) {
        return errorResponse('Admin authentication is not configured on this Worker.', 503, cors);
      }
      try {
        administrator = await verifyClerkAdmin(request, env);
      } catch {
        return errorResponse('A valid Clerk administrator session is required.', 401, cors);
      }
      if (!administrator) return errorResponse('A valid Clerk administrator session is required.', 401, cors);
    }

    try {
      await ensureTablesExist(env.DB);

      if (url.pathname === '/api/admin/session' && method === 'GET' && administrator) {
        return jsonResponse({ success: true, userId: administrator.userId, role: 'admin' }, 200, cors);
      }

      if (url.pathname === '/api/site-content' && method === 'GET') {
        const row = await env.DB.prepare("SELECT content_json FROM site_content WHERE id = 'main'").first<{ content_json: string }>();
        return jsonResponse({ success: true, data: row ? JSON.parse(row.content_json) : null }, 200, cors);
      }

      if (url.pathname === '/api/admin/site-content' && method === 'GET') {
        const row = await env.DB.prepare("SELECT content_json, updated_at FROM site_content WHERE id = 'main'").first<{ content_json: string; updated_at: string }>();
        return jsonResponse({ success: true, data: row ? JSON.parse(row.content_json) : null, updatedAt: row?.updated_at ?? null }, 200, cors);
      }

      if (url.pathname === '/api/admin/site-content' && method === 'PUT') {
        let payload: { text?: unknown; programs?: unknown };
        try {
          payload = await request.json() as typeof payload;
        } catch {
          return errorResponse('Invalid content document.', 400, cors);
        }
        if (!payload || !payload.text || typeof payload.text !== 'object' || Array.isArray(payload.text) || !Array.isArray(payload.programs)) {
          return errorResponse('Content must include editable text fields and the current program list.', 400, cors);
        }
        const serialized = JSON.stringify(payload);
        if (serialized.length > 512_000) return errorResponse('Content document is too large.', 413, cors);
        const textEntries = Object.entries(payload.text as Record<string, unknown>);
        if (textEntries.length > 300 || textEntries.some(([key, value]) => key.length > 160 || typeof value !== 'string' || value.length > 10_000)) {
          return errorResponse('One or more text fields are invalid or too long.', 400, cors);
        }
        if (textEntries.some(([key, value]) => /\.image$/i.test(key) && value !== '' && !(value.startsWith('/') || value.startsWith('https://'))) ) {
          return errorResponse('Images must use a site path or HTTPS URL.', 400, cors);
        }
        const programs = payload.programs as Array<Record<string, unknown>>;
        const slugs = new Set<string>();
        const ids = new Set<string>();
        for (const program of programs) {
          if (!program || typeof program !== 'object' || typeof program.id !== 'string' || typeof program.slug !== 'string' || typeof program.code !== 'string' || typeof program.fullTitle !== 'string' || !['Nursing', 'Paramedical'].includes(String(program.category))) {
            return errorResponse('A program is missing required identity or category fields.', 400, cors);
          }
            const requiredText = ['id', 'slug', 'code', 'fullTitle', 'overview', 'description', 'imageLabel', 'seoTitle', 'seoDescription'];
            if (requiredText.some((key) => typeof program[key] !== 'string' || String(program[key]).length > 5000)) {
              return errorResponse('A program contains invalid or overlong text.', 400, cors);
            }
            for (const key of ['duration', 'eligibility', 'trainingStatement']) {
              if (program[key] !== undefined && program[key] !== null && (typeof program[key] !== 'string' || program[key].length > 2000)) {
                return errorResponse('A program contains invalid or overlong optional text.', 400, cors);
              }
            }
            for (const key of ['learningAreas', 'trainingAreas', 'careerOpportunities']) {
              const values = program[key];
              if (values !== undefined && (!Array.isArray(values) || values.length > 100 || values.some((item) => typeof item !== 'string' || item.length > 1000))) {
                return errorResponse('Program lists must contain short text items.', 400, cors);
              }
            }
            for (const key of ['isPrimary', 'isSubjectToApproval']) {
              if (program[key] !== undefined && typeof program[key] !== 'boolean') return errorResponse('Program visibility settings are invalid.', 400, cors);
            }
            if (program.imageUrl !== undefined && program.imageUrl !== null && program.imageUrl !== '' && (typeof program.imageUrl !== 'string' || !(program.imageUrl.startsWith('/') || program.imageUrl.startsWith('https://'))) ) {
              return errorResponse('Program images must use a site path or HTTPS URL.', 400, cors);
            }
          if (!/^[a-z0-9-]+$/.test(program.slug) || slugs.has(program.slug) || ids.has(program.id)) {
            return errorResponse('Program slugs and IDs must be unique and slugs may contain only lowercase letters, numbers, and hyphens.', 400, cors);
          }
          slugs.add(program.slug);
          ids.add(program.id);
        }
        if (programs.length === 0 || programs.length > 100) return errorResponse('The program list must contain between 1 and 100 entries.', 400, cors);
        await env.DB.prepare(`
          INSERT INTO site_content (id, content_json, updated_at)
          VALUES ('main', ?, datetime('now'))
          ON CONFLICT(id) DO UPDATE SET content_json = excluded.content_json, updated_at = datetime('now')
        `).bind(serialized).run();
        return jsonResponse({ success: true, updatedAt: new Date().toISOString() }, 200, cors);
      }

      if (url.pathname === '/api/admin/media' && method === 'GET' && administrator) {
        const bucket = getR2Bucket(env);
        const cursor = url.searchParams.get('cursor') || undefined;
        const listing = await bucket.list({ limit: 100, cursor });
        const assets = listing.objects.map((object) => ({
          key: object.key,
          url: `${url.origin}/api/images/${object.key.split('/').map(encodeURIComponent).join('/')}`,
          size: object.size,
          uploaded: object.uploaded.toISOString(),
        }));
        return jsonResponse({ success: true, data: assets, cursor: listing.truncated ? listing.cursor : null }, 200, cors);
      }

      // ----------------------------------------------------
      // 1. IMAGE SERVING (/api/images/*) - Dual R2 & D1 Storage
      // ----------------------------------------------------
      if (url.pathname.startsWith('/api/images/')) {
        const rawKey = url.pathname.replace(/^\/api\/images\//, '');
        if (!rawKey) return errorResponse('Image key missing', 400, cors);
        const key = decodeURIComponent(rawKey);

        // A. Try R2 storage first if available
        try {
          const bucket = getR2Bucket(env);
          const object = await bucket.get(rawKey) || await bucket.get(key);
          if (object) {
            const headers = new Headers();
            object.writeHttpMetadata(headers);
            headers.set('etag', object.httpEtag);
            headers.set('Cache-Control', 'public, max-age=31536000, immutable');
            Object.entries(cors).forEach(([k, v]) => headers.set(k, v));
            return new Response(object.body, { headers });
          }
        } catch {
          // R2 storage not configured or object unavailable, fall through to D1 media_storage
        }

        // B. Fall back to D1 media_storage table
        try {
          const row = await env.DB.prepare(
            'SELECT content_type, data_base64 FROM media_storage WHERE key = ? OR key = ? LIMIT 1'
          ).bind(rawKey, key).first<{ content_type: string; data_base64: string }>();

          if (row && row.data_base64) {
            const binary = atob(row.data_base64);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
              bytes[i] = binary.charCodeAt(i);
            }
            const headers = new Headers({
              'Content-Type': row.content_type || 'image/jpeg',
              'Cache-Control': 'public, max-age=31536000, immutable',
            });
            Object.entries(cors).forEach(([k, v]) => headers.set(k, v));
            return new Response(bytes, { headers });
          }
        } catch (d1Err) {
          console.warn('[Worker D1 Media Fetch Error]:', d1Err);
        }

        return errorResponse('Image not found in storage', 404, cors);
      }

      // ----------------------------------------------------
      // 2. PUBLIC API ENDPOINTS
      // ----------------------------------------------------

      // GET /api/news - Only published news
      if (method === 'GET' && url.pathname === '/api/news') {
        const { results } = await env.DB.prepare(
          "SELECT * FROM news WHERE status = 'published' ORDER BY datetime(created_at) DESC"
        ).all();
        console.log(`[Worker D1]: Fetched ${results.length} published news items`);
        return jsonResponse({ success: true, data: results }, 200, cors);
      }

      // GET /api/news/:slug - News detail by slug
      if (method === 'GET' && url.pathname.startsWith('/api/news/')) {
        const slug = url.pathname.replace('/api/news/', '');
        const item = await env.DB.prepare('SELECT * FROM news WHERE slug = ?').bind(slug).first();
        if (!item) return errorResponse('News article not found', 404, cors);
        return jsonResponse({ success: true, data: item }, 200, cors);
      }

      // GET /api/events - Published/Upcoming events
      if (method === 'GET' && url.pathname === '/api/events') {
        const { results } = await env.DB.prepare(
          "SELECT * FROM events WHERE status != 'draft' ORDER BY event_date ASC"
        ).all();
        console.log(`[Worker D1]: Fetched ${results.length} public events`);
        return jsonResponse({ success: true, data: results }, 200, cors);
      }

      // GET /api/gallery - Gallery items
      if (method === 'GET' && url.pathname === '/api/gallery') {
        const category = url.searchParams.get('category');
        let query = 'SELECT * FROM gallery';
        const params: unknown[] = [];
        if (category && category !== 'all') {
          query += ' WHERE category = ?';
          params.push(category);
        }
        query += ' ORDER BY display_order ASC, created_at DESC';
        const { results } = await env.DB.prepare(query).bind(...params).all();
        console.log(`[Worker D1]: Fetched ${results.length} gallery items`);
        return jsonResponse({ success: true, data: results }, 200, cors);
      }

      // ----------------------------------------------------
      // 3. ADMIN READ ENDPOINTS
      // ----------------------------------------------------
      if (method === 'GET' && url.pathname === '/api/admin/news') {
        const { results } = await env.DB.prepare('SELECT * FROM news ORDER BY datetime(created_at) DESC').all();
        return jsonResponse({ success: true, data: results }, 200, cors);
      }

      if (method === 'GET' && url.pathname === '/api/admin/events') {
        const { results } = await env.DB.prepare('SELECT * FROM events ORDER BY event_date DESC').all();
        return jsonResponse({ success: true, data: results }, 200, cors);
      }

      if (method === 'GET' && url.pathname === '/api/admin/gallery') {
        const { results } = await env.DB.prepare('SELECT * FROM gallery ORDER BY display_order ASC').all();
        return jsonResponse({ success: true, data: results }, 200, cors);
      }

      // ----------------------------------------------------
      // 4. ADMIN MUTATION ENDPOINTS (Server-Side Clerk Token Verification)
      // ----------------------------------------------------
      // POST /api/admin/upload - Image upload with R2 + D1 dual persistence
      if (method === 'POST' && url.pathname === '/api/admin/upload') {
        const contentTypeHeader = request.headers.get('Content-Type') || '';
        let fileBuffer: ArrayBuffer;
        let fileType = 'image/jpeg';
        let fileName = 'upload.jpg';
        let folder = 'general';

        if (contentTypeHeader.includes('application/json')) {
          const body = (await request.json()) as any;
          if (!body.data || typeof body.data !== 'string') {
            return errorResponse('Image data is required', 400, cors);
          }
          folder = body.folder || 'general';
          fileName = body.name || 'image.jpg';
          const match = body.data.match(/^data:([^;]+);base64,(.+)$/);
          if (match) {
            fileType = match[1];
            const binary = atob(match[2]);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
            fileBuffer = bytes.buffer;
          } else {
            return errorResponse('Invalid base64 image data', 400, cors);
          }
        } else {
          const formData = await request.formData();
          const file = formData.get('file') as File | null;
          folder = (formData.get('folder') as string) || 'general';

          if (!file) return errorResponse('No file uploaded', 400, cors);

          if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
            return errorResponse('Invalid file type. Only JPG, JPEG, PNG, and WebP images are permitted.', 400, cors);
          }

          if (file.size > MAX_FILE_SIZE) {
            return errorResponse('File size exceeds the 10MB limit.', 400, cors);
          }

          fileType = file.type;
          fileName = file.name;
          fileBuffer = await file.arrayBuffer();
        }

        const sanitizedFolder = folder.replace(/^\/+|\/+$/g, '');
        const extension = fileName.split('.').pop() || 'jpg';
        const uniqueId = crypto.randomUUID();
        const storageKey = `${sanitizedFolder}/${Date.now()}_${uniqueId}.${extension}`;

        const workerOrigin = `${url.protocol}//${url.host}`;
        const absolutePublicUrl = `${workerOrigin}/api/images/${storageKey}`;

        // 1. Try R2 storage first
        let saved = false;
        try {
          const bucket = getR2Bucket(env);
          await bucket.put(storageKey, fileBuffer, {
            httpMetadata: {
              contentType: fileType,
            },
          });
          saved = true;
          console.log(`[Worker R2 Upload Success]: Stored image at key ${storageKey}`);
        } catch (r2Err) {
          console.warn('[Worker R2 Upload Unavailable/Failed]:', r2Err);
        }

        // 2. Fallback to D1 media_storage table
        if (!saved) {
          try {
            const bytes = new Uint8Array(fileBuffer);
            let binary = '';
            const chunkSize = 8192;
            for (let i = 0; i < bytes.length; i += chunkSize) {
              binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunkSize)));
            }
            const base64 = btoa(binary);

            await env.DB.prepare(
              `INSERT INTO media_storage (key, content_type, data_base64, size)
               VALUES (?, ?, ?, ?)
               ON CONFLICT(key) DO UPDATE SET data_base64 = excluded.data_base64, content_type = excluded.content_type`
            ).bind(storageKey, fileType, base64, bytes.length).run();
            saved = true;
            console.log(`[Worker D1 Media Upload Success]: Stored image at key ${storageKey} (${bytes.length} bytes)`);
          } catch (d1Err) {
            console.error('[Worker D1 Media Storage Failed]:', d1Err);
          }
        }

        if (!saved) {
          return errorResponse('Image storage is unavailable. The image could not be saved.', 503, cors);
        }

        return jsonResponse({
          success: true,
          url: absolutePublicUrl,
          key: storageKey,
          storage_key: storageKey,
        }, 200, cors);
      }

      // DELETE /api/admin/upload - Delete image from R2
      if (method === 'DELETE' && url.pathname === '/api/admin/upload') {
        const body = (await request.json()) as { key?: string; storage_key?: string };
        const storageKey = body.storage_key || body.key;
        if (!storageKey) return errorResponse('Storage key required', 400, cors);
        try {
          const bucket = getR2Bucket(env);
          await bucket.delete(storageKey);
          console.log(`[Worker R2 Delete Success]: Removed key ${storageKey}`);
        } catch {}
        try {
          await env.DB.prepare('DELETE FROM media_storage WHERE key = ?').bind(storageKey).run();
          console.log(`[Worker D1 Media Delete Success]: Removed key ${storageKey}`);
        } catch {}
        return jsonResponse({ success: true, message: 'Image deleted from storage' }, 200, cors);
      }

      // --- NEWS CRUD ---
      if (method === 'POST' && url.pathname === '/api/admin/news') {
        const body = (await request.json()) as any;
        const id = crypto.randomUUID();
        const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const shortDesc = body.short_description || body.shortDesc || '';
        const contentVal = body.content || body.full_content || '';
        const imgUrl = body.image_url || body.featured_image || '';
        const pubDate = body.published_at || body.publish_date || new Date().toISOString().split('T')[0];

        await env.DB.prepare(
          `INSERT INTO news (id, title, slug, short_description, content, image_url, status, published_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
          id,
          body.title,
          slug,
          shortDesc,
          contentVal,
          imgUrl,
          body.status || 'published',
          pubDate
        ).run();

        console.log(`[Worker D1 News Created]: ${id} (${slug})`);
        return jsonResponse({ success: true, id, message: 'News article created' }, 201, cors);
      }

      if (method === 'PUT' && url.pathname.startsWith('/api/admin/news/')) {
        const id = url.pathname.replace('/api/admin/news/', '');
        const body = (await request.json()) as any;
        const shortDesc = body.short_description || body.shortDesc || '';
        const contentVal = body.content || body.full_content || '';
        const imgUrl = body.image_url || body.featured_image || '';
        const pubDate = body.published_at || body.publish_date || new Date().toISOString().split('T')[0];

        await env.DB.prepare(
          `UPDATE news SET 
            title = ?, slug = ?, short_description = ?, content = ?, 
            image_url = ?, status = ?, published_at = ?, updated_at = datetime('now')
           WHERE id = ?`
        ).bind(
          body.title,
          body.slug,
          shortDesc,
          contentVal,
          imgUrl,
          body.status || 'published',
          pubDate,
          id
        ).run();

        console.log(`[Worker D1 News Updated]: ${id}`);
        return jsonResponse({ success: true, message: 'News article updated' }, 200, cors);
      }

      if (method === 'DELETE' && url.pathname.startsWith('/api/admin/news/')) {
        const id = url.pathname.replace('/api/admin/news/', '');
        await env.DB.prepare('DELETE FROM news WHERE id = ?').bind(id).run();
        console.log(`[Worker D1 News Deleted]: ${id}`);
        return jsonResponse({ success: true, message: 'News article deleted' }, 200, cors);
      }

      // --- EVENTS CRUD ---
      if (method === 'POST' && url.pathname === '/api/admin/events') {
        const body = (await request.json()) as any;
        const id = crypto.randomUUID();
        const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const shortDesc = body.short_description || body.shortDesc || '';
        const imgUrl = body.image_url || body.image || '';

        await env.DB.prepare(
          `INSERT INTO events (id, title, slug, short_description, description, event_date, start_time, end_time, venue, image_url, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
          id,
          body.title,
          slug,
          shortDesc,
          body.description || '',
          body.event_date || new Date().toISOString().split('T')[0],
          body.start_time || '09:00 AM',
          body.end_time || '04:00 PM',
          body.venue || 'Main Campus',
          imgUrl,
          body.status || 'upcoming'
        ).run();

        console.log(`[Worker D1 Event Created]: ${id} (${slug})`);
        return jsonResponse({ success: true, id, message: 'Event created' }, 201, cors);
      }

      if (method === 'PUT' && url.pathname.startsWith('/api/admin/events/')) {
        const id = url.pathname.replace('/api/admin/events/', '');
        const body = (await request.json()) as any;
        const shortDesc = body.short_description || body.shortDesc || '';
        const imgUrl = body.image_url || body.image || '';

        await env.DB.prepare(
          `UPDATE events SET 
            title = ?, slug = ?, short_description = ?, description = ?, event_date = ?, start_time = ?, end_time = ?, 
            venue = ?, image_url = ?, status = ?, updated_at = datetime('now')
           WHERE id = ?`
        ).bind(
          body.title,
          body.slug,
          shortDesc,
          body.description || '',
          body.event_date || '',
          body.start_time || '',
          body.end_time || '',
          body.venue || '',
          imgUrl,
          body.status || 'upcoming',
          id
        ).run();

        console.log(`[Worker D1 Event Updated]: ${id}`);
        return jsonResponse({ success: true, message: 'Event updated' }, 200, cors);
      }

      if (method === 'DELETE' && url.pathname.startsWith('/api/admin/events/')) {
        const id = url.pathname.replace('/api/admin/events/', '');
        await env.DB.prepare('DELETE FROM events WHERE id = ?').bind(id).run();
        console.log(`[Worker D1 Event Deleted]: ${id}`);
        return jsonResponse({ success: true, message: 'Event deleted' }, 200, cors);
      }

      // --- GALLERY CRUD ---
      if (method === 'POST' && url.pathname === '/api/admin/gallery') {
        const body = (await request.json()) as any;
        const id = crypto.randomUUID();

        const maxOrderRow = await env.DB.prepare('SELECT MAX(display_order) as maxOrder FROM gallery').first();
        const nextOrder = (maxOrderRow?.maxOrder as number || 0) + 1;
        let storageKey = body.storage_key || body.r2_key || '';
        let imageUrl = body.image_url || '';

        // If a base64 Data URL was passed directly in body.image_url, store it into media_storage
        if (imageUrl.startsWith('data:image/')) {
          try {
            const match = imageUrl.match(/^data:([^;]+);base64,(.+)$/);
            if (match) {
              const mime = match[1];
              const ext = mime.split('/')[1] || 'jpg';
              if (!storageKey) {
                storageKey = `gallery/${body.category || 'campus'}/${Date.now()}_${id}.${ext}`;
              }
              const binary = atob(match[2]);
              await env.DB.prepare(
                `INSERT INTO media_storage (key, content_type, data_base64, size)
                 VALUES (?, ?, ?, ?)
                 ON CONFLICT(key) DO UPDATE SET data_base64 = excluded.data_base64, content_type = excluded.content_type`
              ).bind(storageKey, mime, match[2], binary.length).run();
              const workerOrigin = `${url.protocol}//${url.host}`;
              imageUrl = `${workerOrigin}/api/images/${storageKey}`;
            }
          } catch (embedErr) {
            console.warn('[Worker D1 Auto-Embed Data URL Error]:', embedErr);
          }
        }

        await env.DB.prepare(
          `INSERT INTO gallery (id, title, caption, category, image_url, storage_key, display_order)
           VALUES (?, ?, ?, ?, ?, ?, ?)`
        ).bind(
          id,
          body.title || 'Campus Photo',
          body.caption || '',
          body.category || 'campus',
          imageUrl,
          storageKey,
          body.display_order ?? nextOrder
        ).run();

        console.log(`[Worker D1 Gallery Item Added]: ${id}`);
        return jsonResponse({ success: true, id, image_url: imageUrl, message: 'Gallery item added' }, 201, cors);
      }

      if (method === 'PUT' && url.pathname === '/api/admin/gallery/reorder') {
        const body = (await request.json()) as { items: Array<{ id: string; display_order: number }> };
        if (Array.isArray(body.items)) {
          for (const item of body.items) {
            await env.DB.prepare('UPDATE gallery SET display_order = ? WHERE id = ?').bind(item.display_order, item.id).run();
          }
        }
        console.log('[Worker D1 Gallery Reordered]');
        return jsonResponse({ success: true, message: 'Gallery reordered' }, 200, cors);
      }

      if (method === 'PUT' && url.pathname.startsWith('/api/admin/gallery/')) {
        const id = url.pathname.replace('/api/admin/gallery/', '');
        const body = (await request.json()) as any;

        let extraSql = '';
        const params: any[] = [body.title, body.caption, body.category];

        if (body.image_url) {
          extraSql += ', image_url = ?';
          params.push(body.image_url);
        }
        if (body.storage_key || body.r2_key) {
          extraSql += ', storage_key = ?';
          params.push(body.storage_key || body.r2_key);
        }
        if (body.display_order !== undefined) {
          extraSql += ', display_order = ?';
          params.push(body.display_order);
        }
        params.push(id);

        await env.DB.prepare(
          `UPDATE gallery SET title = ?, caption = ?, category = ? ${extraSql} WHERE id = ?`
        ).bind(...params).run();

        console.log(`[Worker D1 Gallery Item Updated]: ${id}`);
        return jsonResponse({ success: true, message: 'Gallery item updated' }, 200, cors);
      }

      if (method === 'DELETE' && url.pathname.startsWith('/api/admin/gallery/')) {
        const id = url.pathname.replace('/api/admin/gallery/', '');
        const item = await env.DB.prepare('SELECT storage_key FROM gallery WHERE id = ?').bind(id).first<{ storage_key: string }>();
        if (item && item.storage_key) {
          try {
            const bucket = getR2Bucket(env);
            await bucket.delete(item.storage_key);
          } catch {}
          try {
            await env.DB.prepare('DELETE FROM media_storage WHERE key = ?').bind(item.storage_key).run();
          } catch {}
        }
        await env.DB.prepare('DELETE FROM gallery WHERE id = ?').bind(id).run();
        console.log(`[Worker D1 Gallery Item Deleted]: ${id}`);
        return jsonResponse({ success: true, message: 'Gallery item deleted' }, 200, cors);
      }

      return errorResponse('Endpoint not found', 404, cors);
    } catch (err: any) {
      console.error('Worker API Exception Stack:', err);
      return errorResponse(err.message || 'Internal Server Error', 500, cors);
    }
  },
};
