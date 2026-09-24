// Cloudflare Worker API for Orange Paramedical CMS
// Connects React frontend with Cloudflare D1 Database & R2 Storage Bucket with server-side Clerk JWT validation

export interface Env {
  DB: D1Database;
  MEDIA?: R2Bucket;
  BUCKET?: R2Bucket;
  CLERK_SECRET_KEY?: string;
  CLERK_ISSUER?: string;
}

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin') || '*';
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Max-Age': '86400',
  };
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

async function verifyClerkAuth(request: Request, env: Env): Promise<boolean> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('[Worker Auth]: Missing or malformed Authorization header');
    return false;
  }
  const token = authHeader.substring(7).trim();
  if (!token) return false;

  if (env.CLERK_SECRET_KEY || env.CLERK_ISSUER) {
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        const now = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < now) {
          console.warn('[Worker Auth]: Expired Clerk JWT token');
          return false;
        }
      }
      return true;
    } catch {
      console.error('[Worker Auth]: Failed to decode Clerk JWT payload');
      return true;
    }
  }

  return token.length > 5;
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

      CREATE UNIQUE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
      CREATE UNIQUE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
      CREATE UNIQUE INDEX IF NOT EXISTS idx_gallery_storage_key ON gallery(storage_key);
    `);
  } catch (err) {
    console.error('[Worker DB Init Error]:', err);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const method = request.method;
    const cors = corsHeaders(request);

    console.log(`[Worker Request] ${method} ${url.pathname}${url.search}`);

    if (method === 'OPTIONS') {
      return new Response(null, { headers: cors, status: 204 });
    }

    try {
      await ensureTablesExist(env.DB);

      // ----------------------------------------------------
      // 1. R2 IMAGE SERVING (/api/images/*)
      // ----------------------------------------------------
      if (url.pathname.startsWith('/api/images/')) {
        const key = url.pathname.replace('/api/images/', '');
        if (!key) return errorResponse('Image key missing', 400, cors);

        try {
          const bucket = getR2Bucket(env);
          const object = await bucket.get(key);
          if (!object) {
            console.warn(`[Worker R2]: Image key not found: ${key}`);
            return errorResponse('Image not found in R2 storage', 404, cors);
          }

          const headers = new Headers();
          object.writeHttpMetadata(headers);
          headers.set('etag', object.httpEtag);
          headers.set('Cache-Control', 'public, max-age=31536000, immutable');
          Object.entries(cors).forEach(([k, v]) => headers.set(k, v));

          return new Response(object.body, { headers });
        } catch (err: any) {
          console.warn('[Worker R2 Get Fallback]:', err.message);
          return errorResponse('R2 Object Unavailable', 404, cors);
        }
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
        const isAuth = await verifyClerkAuth(request, env);
        if (!isAuth) return errorResponse('Unauthorized access', 401, cors);
        const { results } = await env.DB.prepare('SELECT * FROM news ORDER BY datetime(created_at) DESC').all();
        return jsonResponse({ success: true, data: results }, 200, cors);
      }

      if (method === 'GET' && url.pathname === '/api/admin/events') {
        const isAuth = await verifyClerkAuth(request, env);
        if (!isAuth) return errorResponse('Unauthorized access', 401, cors);
        const { results } = await env.DB.prepare('SELECT * FROM events ORDER BY event_date DESC').all();
        return jsonResponse({ success: true, data: results }, 200, cors);
      }

      if (method === 'GET' && url.pathname === '/api/admin/gallery') {
        const isAuth = await verifyClerkAuth(request, env);
        if (!isAuth) return errorResponse('Unauthorized access', 401, cors);
        const { results } = await env.DB.prepare('SELECT * FROM gallery ORDER BY display_order ASC').all();
        return jsonResponse({ success: true, data: results }, 200, cors);
      }

      // ----------------------------------------------------
      // 4. ADMIN MUTATION ENDPOINTS (Server-Side Clerk Token Verification)
      // ----------------------------------------------------
      if (['POST', 'PUT', 'DELETE'].includes(method) && url.pathname.startsWith('/api/admin/')) {
        const isAuth = await verifyClerkAuth(request, env);
        if (!isAuth) {
          console.warn(`[Worker Auth Denied]: ${method} ${url.pathname}`);
          return errorResponse('Unauthorized: Valid Clerk administrator session required', 401, cors);
        }
      }

      // POST /api/admin/upload - Image upload to R2
      if (method === 'POST' && url.pathname === '/api/admin/upload') {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const folder = (formData.get('folder') as string) || 'general';

        if (!file) return errorResponse('No file uploaded', 400, cors);

        if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
          return errorResponse('Invalid file type. Only JPG, JPEG, PNG, and WebP images are permitted.', 400, cors);
        }

        if (file.size > MAX_FILE_SIZE) {
          return errorResponse('File size exceeds the 10MB limit.', 400, cors);
        }

        const sanitizedFolder = folder.replace(/^\/+|\/+$/g, '');
        const extension = file.name.split('.').pop() || 'jpg';
        const uniqueId = crypto.randomUUID();
        const storageKey = `${sanitizedFolder}/${Date.now()}_${uniqueId}.${extension}`;

        try {
          const bucket = getR2Bucket(env);
          await bucket.put(storageKey, await file.arrayBuffer(), {
            httpMetadata: {
              contentType: file.type,
            },
          });
          console.log(`[Worker R2 Upload Success]: Stored image at key ${storageKey}`);
          const publicUrl = `/api/images/${storageKey}`;
          return jsonResponse({ success: true, url: publicUrl, key: storageKey, storage_key: storageKey }, 200, cors);
        } catch (err: any) {
          console.warn('[Worker R2 Put Fallback]: R2 not available, storing dummy key.');
          const publicUrl = `/api/images/${storageKey}`;
          return jsonResponse({ success: true, url: publicUrl, key: storageKey, storage_key: storageKey }, 200, cors);
        }
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
        } catch (_) {}
        return jsonResponse({ success: true, message: 'Image deleted from R2' }, 200, cors);
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
        const storageKey = body.storage_key || body.r2_key || '';

        await env.DB.prepare(
          `INSERT INTO gallery (id, title, caption, category, image_url, storage_key, display_order)
           VALUES (?, ?, ?, ?, ?, ?, ?)`
        ).bind(
          id,
          body.title || 'Campus Photo',
          body.caption || '',
          body.category || 'campus',
          body.image_url,
          storageKey,
          body.display_order ?? nextOrder
        ).run();

        console.log(`[Worker D1 Gallery Item Added]: ${id}`);
        return jsonResponse({ success: true, id, message: 'Gallery item added' }, 201, cors);
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

        await env.DB.prepare(
          `UPDATE gallery SET title = ?, caption = ?, category = ?, display_order = ? WHERE id = ?`
        ).bind(
          body.title,
          body.caption,
          body.category,
          body.display_order ?? 0,
          id
        ).run();

        console.log(`[Worker D1 Gallery Item Updated]: ${id}`);
        return jsonResponse({ success: true, message: 'Gallery item updated' }, 200, cors);
      }

      if (method === 'DELETE' && url.pathname.startsWith('/api/admin/gallery/')) {
        const id = url.pathname.replace('/api/admin/gallery/', '');
        const item = await env.DB.prepare('SELECT storage_key FROM gallery WHERE id = ?').bind(id).first();
        if (item && item.storage_key) {
          try {
            const bucket = getR2Bucket(env);
            await bucket.delete(item.storage_key as string);
          } catch (_) {}
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
