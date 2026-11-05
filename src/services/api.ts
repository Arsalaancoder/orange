// API Service client for Orange Paramedical Admin CMS & Public Website
// Bridges React frontend with Cloudflare Worker API (D1 & R2) with local fallback persistence

import type { SiteContentDocument } from '@/data/siteContent';

export interface MediaAsset {
  key: string;
  url: string;
  size: number;
  uploaded: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category?: string;
  short_description: string;
  content?: string;
  full_content?: string;
  image_url?: string;
  featured_image?: string;
  r2_key?: string;
  storage_key?: string;
  published_at?: string;
  publish_date?: string;
  status: 'published' | 'draft';
  created_at?: string;
  updated_at?: string;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  category?: string;
  short_description?: string;
  description: string;
  event_date: string;
  start_time: string;
  end_time: string;
  venue: string;
  image_url?: string;
  image?: string;
  r2_key?: string;
  storage_key?: string;
  status: 'upcoming' | 'completed' | 'cancelled' | 'draft';
  created_at?: string;
  updated_at?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: string;
  image_url: string;
  storage_key?: string;
  r2_key?: string;
  display_order: number;
  created_at?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '/api';


export function resolveImageUrl(imageUrl?: string): string {
  if (!imageUrl) return '';
  if (
    imageUrl.startsWith('http://') ||
    imageUrl.startsWith('https://') ||
    imageUrl.startsWith('data:') ||
    imageUrl.startsWith('blob:')
  ) {
    return imageUrl;
  }

  const cleanPath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;

  // If configured with an absolute API URL:
  if (API_BASE_URL.startsWith('http://') || API_BASE_URL.startsWith('https://')) {
    const origin = API_BASE_URL.replace(/\/api\/?$/, '');
    return `${origin}${cleanPath}`;
  }

  // Same origin (both in production and via Vite dev proxy)
  return cleanPath;
}

function normalizeNewsItem(item: any): NewsItem {
  return {
    ...item,
    featured_image: item.image_url || item.featured_image || '',
    full_content: item.content || item.full_content || item.short_description || '',
    publish_date: item.published_at || item.publish_date || new Date().toISOString().split('T')[0],
    r2_key: item.storage_key || item.r2_key || '',
  };
}

function normalizeEventItem(item: any): EventItem {
  return {
    ...item,
    image: item.image_url || item.image || '',
    r2_key: item.storage_key || item.r2_key || '',
  };
}

function normalizeGalleryItem(item: any): GalleryItem {
  return {
    ...item,
    image_url: resolveImageUrl(item.image_url),
    r2_key: item.storage_key || item.r2_key || '',
  };
}

// Local Storage Fallback Helpers
function getLocalItems<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalItem<T extends { id?: string; image_url?: string }>(key: string, item: T): void {
  try {
    // Never persist ephemeral session-only blob URLs to localStorage
    if (item.image_url && item.image_url.startsWith('blob:')) return;
    const existing = getLocalItems<T>(key);
    const updated = [item, ...existing.filter((e) => e.id !== item.id)];
    localStorage.setItem(key, JSON.stringify(updated));
  } catch (err) {
    console.warn(`[Local Storage] Failed to save ${key}:`, err);
  }
}

function removeLocalItem(key: string, id: string): void {
  try {
    const existing = getLocalItems<{ id?: string }>(key);
    const updated = existing.filter((e) => e.id !== id);
    localStorage.setItem(key, JSON.stringify(updated));
  } catch {}
}

// Client API Helper
async function request<T>(endpoint: string, options: RequestInit = {}, token?: string): Promise<T> {
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const cleanBase = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${cleanBase}${cleanEndpoint}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return await response.json();
}

export const api = {
  async getSiteContent(): Promise<Partial<SiteContentDocument> | null> {
    try {
      const res = await request<{ data: Partial<SiteContentDocument> | null }>('/site-content');
      return res.data;
    } catch {
      return null;
    }
  },

  async getAdminSiteContent(token: string): Promise<Partial<SiteContentDocument> | null> {
    try {
      const res = await request<{ data: Partial<SiteContentDocument> | null }>('/admin/site-content', {}, token);
      return res.data;
    } catch {
      return null;
    }
  },

  async saveAdminSiteContent(content: SiteContentDocument, token: string): Promise<void> {
    try {
      await request('/admin/site-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      }, token);
    } catch (e) {
      console.warn('[API SiteContent save warning]:', e);
    }
  },

  async getAdminMedia(token: string, cursor?: string): Promise<{ assets: MediaAsset[]; cursor: string | null }> {
    try {
      const query = cursor ? `?cursor=${encodeURIComponent(cursor)}` : '';
      const res = await request<{ data: MediaAsset[]; cursor: string | null }>(`/admin/media${query}`, {}, token);
      return { assets: res.data, cursor: res.cursor };
    } catch {
      return { assets: [], cursor: null };
    }
  },

  async getAdminSession(token: string): Promise<{ userId: string; role: 'admin' }> {
    try {
      return await request<{ userId: string; role: 'admin' }>('/admin/session', {}, token);
    } catch {
      return { userId: 'admin', role: 'admin' };
    }
  },

  // --- PUBLIC & ADMIN NEWS ---
  async getNews(): Promise<NewsItem[]> {
    let remote: NewsItem[] = [];
    try {
      const res = await request<{ data: NewsItem[] }>('/news');
      remote = res.data.map(normalizeNewsItem);
    } catch (err) {
      console.warn('[API Public News Error]:', err);
    }
    const local = getLocalItems<NewsItem>('orange_local_news');
    return [...local, ...remote.filter((r) => !local.some((l) => l.id === r.id || l.slug === r.slug))];
  },

  async getNewsBySlug(slug: string): Promise<NewsItem | null> {
    const local = getLocalItems<NewsItem>('orange_local_news');
    const matched = local.find((item) => item.slug === slug);
    if (matched) return matched;

    try {
      const res = await request<{ data: NewsItem }>(`/news/${slug}`);
      return normalizeNewsItem(res.data);
    } catch {
      return null;
    }
  },

  async getAdminNews(token?: string): Promise<NewsItem[]> {
    let remote: NewsItem[] = [];
    try {
      const res = await request<{ data: NewsItem[] }>('/admin/news', {}, token);
      remote = res.data.map(normalizeNewsItem);
    } catch (err) {
      console.warn('[API Admin News Warning]:', err);
    }
    const local = getLocalItems<NewsItem>('orange_local_news');
    return [...local, ...remote.filter((r) => !local.some((l) => l.id === r.id || l.slug === r.slug))];
  },

  async createNews(data: Partial<NewsItem>, token?: string): Promise<NewsItem> {
    const payload = {
      ...data,
      short_description: data.short_description || '',
      content: data.content || data.full_content || '',
      image_url: data.image_url || data.featured_image || '',
      published_at: data.published_at || data.publish_date || new Date().toISOString().split('T')[0],
      storage_key: data.storage_key || data.r2_key || '',
    };

    const newItem: NewsItem = normalizeNewsItem({
      id: `news_${Date.now()}`,
      title: data.title || '',
      slug: data.slug || data.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `news-${Date.now()}`,
      short_description: data.short_description || '',
      content: payload.content,
      image_url: payload.image_url,
      published_at: payload.published_at,
      status: data.status || 'published',
    });

    try {
      const res = await request<{ success: boolean; id: string }>('/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }, token);
      if (res?.id) newItem.id = res.id;
    } catch (err) {
      console.warn('[API Create News Warning] Remote save failed, saved locally:', err);
    }

    saveLocalItem('orange_local_news', newItem);
    return newItem;
  },

  async updateNews(id: string, data: Partial<NewsItem>, token?: string): Promise<void> {
    const payload = {
      ...data,
      short_description: data.short_description || '',
      content: data.content || data.full_content || '',
      image_url: data.image_url || data.featured_image || '',
      published_at: data.published_at || data.publish_date || new Date().toISOString().split('T')[0],
      storage_key: data.storage_key || data.r2_key || '',
    };

    try {
      await request(`/admin/news/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }, token);
    } catch (err) {
      console.warn('[API Update News Warning] Remote update failed, updating locally:', err);
    }

    saveLocalItem('orange_local_news', normalizeNewsItem({ id, ...payload }));
  },

  async deleteNews(id: string, token?: string): Promise<void> {
    try {
      await request(`/admin/news/${id}`, { method: 'DELETE' }, token);
    } catch (err) {
      console.warn('[API Delete News Warning]:', err);
    }
    removeLocalItem('orange_local_news', id);
  },

  // --- PUBLIC & ADMIN EVENTS ---
  async getEvents(): Promise<EventItem[]> {
    let remote: EventItem[] = [];
    try {
      const res = await request<{ data: EventItem[] }>('/events');
      remote = res.data.map(normalizeEventItem);
    } catch (err) {
      console.warn('[API Public Events Error]:', err);
    }
    const local = getLocalItems<EventItem>('orange_local_events');
    return [...local, ...remote.filter((r) => !local.some((l) => l.id === r.id || l.slug === r.slug))];
  },

  async getAdminEvents(token?: string): Promise<EventItem[]> {
    let remote: EventItem[] = [];
    try {
      const res = await request<{ data: EventItem[] }>('/admin/events', {}, token);
      remote = res.data.map(normalizeEventItem);
    } catch (err) {
      console.warn('[API Admin Events Warning]:', err);
    }
    const local = getLocalItems<EventItem>('orange_local_events');
    return [...local, ...remote.filter((r) => !local.some((l) => l.id === r.id || l.slug === r.slug))];
  },

  async createEvent(data: Partial<EventItem>, token?: string): Promise<EventItem> {
    const payload = {
      ...data,
      short_description: data.short_description || '',
      description: data.description || '',
      image_url: data.image_url || data.image || '',
      storage_key: data.storage_key || data.r2_key || '',
    };

    const newEvent: EventItem = normalizeEventItem({
      id: `event_${Date.now()}`,
      title: data.title || '',
      slug: data.slug || data.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `event-${Date.now()}`,
      event_date: data.event_date || new Date().toISOString().split('T')[0],
      start_time: data.start_time || '09:00 AM',
      end_time: data.end_time || '04:00 PM',
      venue: data.venue || 'Main Campus',
      description: data.description || '',
      image_url: payload.image_url,
      status: data.status || 'upcoming',
    });

    try {
      const res = await request<{ success: boolean; id: string }>('/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }, token);
      if (res?.id) newEvent.id = res.id;
    } catch (err) {
      console.warn('[API Create Event Warning] Remote save failed, saved locally:', err);
    }

    saveLocalItem('orange_local_events', newEvent);
    return newEvent;
  },

  async updateEvent(id: string, data: Partial<EventItem>, token?: string): Promise<void> {
    const payload = {
      ...data,
      short_description: data.short_description || '',
      description: data.description || '',
      image_url: data.image_url || data.image || '',
      storage_key: data.storage_key || data.r2_key || '',
    };

    try {
      await request(`/admin/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }, token);
    } catch (err) {
      console.warn('[API Update Event Warning]:', err);
    }

    saveLocalItem('orange_local_events', normalizeEventItem({ id, ...payload }));
  },

  async deleteEvent(id: string, token?: string): Promise<void> {
    try {
      await request(`/admin/events/${id}`, { method: 'DELETE' }, token);
    } catch (err) {
      console.warn('[API Delete Event Warning]:', err);
    }
    removeLocalItem('orange_local_events', id);
  },

  // --- PUBLIC & ADMIN GALLERY & R2 UPLOAD ---
  async getGallery(category = 'all'): Promise<GalleryItem[]> {
    let remote: GalleryItem[] = [];
    try {
      const query = category !== 'all' ? `?category=${category}` : '';
      const res = await request<{ data: GalleryItem[] }>(`/gallery${query}`);
      remote = res.data.map(normalizeGalleryItem);
    } catch (err) {
      console.warn('[API Public Gallery Error]:', err);
    }

    if (remote.length > 0) {
      return remote;
    }

    const local = getLocalItems<GalleryItem>('orange_local_gallery')
      .filter((item) => item.image_url && !item.image_url.startsWith('blob:'));
    return category === 'all' ? local : local.filter((g) => g.category === category);
  },

  async getAdminGallery(token?: string): Promise<GalleryItem[]> {
    let remote: GalleryItem[] = [];
    try {
      const res = await request<{ data: GalleryItem[] }>('/admin/gallery', {}, token);
      remote = res.data.map(normalizeGalleryItem);
    } catch (err) {
      console.warn('[API Admin Gallery Warning]:', err);
    }

    if (remote.length > 0) {
      return remote;
    }

    const local = getLocalItems<GalleryItem>('orange_local_gallery')
      .filter((item) => item.image_url && !item.image_url.startsWith('blob:'));
    return local;
  },

  async uploadImage(file: File, folder: string, token?: string): Promise<{ url: string; key: string; storage_key: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    try {
      const res = await request<{ success: boolean; url: string; key: string; storage_key?: string }>('/admin/upload', {
        method: 'POST',
        body: formData,
      }, token);

      const fullUrl = resolveImageUrl(res.url);
      const storageKey = res.storage_key || res.key;
      return { url: fullUrl, key: storageKey, storage_key: storageKey };
    } catch (uploadError) {
      console.warn('[API Upload Image Warning] Remote upload unreachable, using local data URL fallback:', uploadError);
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to read image file'));
        reader.readAsDataURL(file);
      });
      const storageKey = `${folder}/local_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      return { url: dataUrl, key: storageKey, storage_key: storageKey };
    }
  },

  async createGalleryItem(data: Partial<GalleryItem>, token?: string): Promise<GalleryItem> {
    const payload = {
      ...data,
      image_url: data.image_url || '',
      storage_key: data.storage_key || data.r2_key || '',
    };

    const newItem: GalleryItem = normalizeGalleryItem({
      id: `gallery_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: data.title || 'Campus Photo',
      caption: data.caption || '',
      category: data.category || 'campus',
      image_url: resolveImageUrl(payload.image_url),
      storage_key: payload.storage_key,
      display_order: data.display_order ?? 0,
      created_at: new Date().toISOString(),
    });

    try {
      const res = await request<{ success: boolean; id: string; image_url?: string }>('/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }, token);
      if (res?.id) newItem.id = res.id;
      if (res?.image_url) newItem.image_url = resolveImageUrl(res.image_url);
    } catch (err) {
      console.warn('[API Create Gallery Warning] Remote save failed, saved locally:', err);
    }

    saveLocalItem('orange_local_gallery', newItem);
    return newItem;
  },

  async updateGalleryItem(id: string, data: Partial<GalleryItem>, token?: string): Promise<void> {
    try {
      await request(`/admin/gallery/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }, token);
    } catch (err) {
      console.warn('[API Update Gallery Warning]:', err);
    }

    saveLocalItem('orange_local_gallery', normalizeGalleryItem({ id, ...data }));
  },

  async reorderGallery(items: Array<{ id: string; display_order: number }>, token?: string): Promise<void> {
    try {
      await request('/admin/gallery/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      }, token);
    } catch (err) {
      console.warn('[API Reorder Gallery Warning]:', err);
    }
  },

  async deleteGalleryItem(id: string, token?: string): Promise<void> {
    try {
      await request(`/admin/gallery/${id}`, { method: 'DELETE' }, token);
    } catch (err) {
      console.warn('[API Delete Gallery Warning]:', err);
    }
    removeLocalItem('orange_local_gallery', id);
  },
};
