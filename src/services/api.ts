// API Service client for Orange Paramedical Admin CMS & Public Website
// Bridges React frontend with Cloudflare Worker API (D1 & R2) with server error reporting

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
    r2_key: item.storage_key || item.r2_key || '',
  };
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
  // --- PUBLIC NEWS ---
  async getNews(): Promise<NewsItem[]> {
    try {
      const res = await request<{ data: NewsItem[] }>('/news');
      return res.data.map(normalizeNewsItem);
    } catch (err) {
      console.warn('[API Public News Error]:', err);
      return [];
    }
  },

  async getNewsBySlug(slug: string): Promise<NewsItem | null> {
    try {
      const res = await request<{ data: NewsItem }>(`/news/${slug}`);
      return normalizeNewsItem(res.data);
    } catch {
      return null;
    }
  },

  // --- PUBLIC EVENTS ---
  async getEvents(): Promise<EventItem[]> {
    try {
      const res = await request<{ data: EventItem[] }>('/events');
      return res.data.map(normalizeEventItem);
    } catch (err) {
      console.warn('[API Public Events Error]:', err);
      return [];
    }
  },

  // --- PUBLIC GALLERY ---
  async getGallery(category = 'all'): Promise<GalleryItem[]> {
    try {
      const query = category !== 'all' ? `?category=${category}` : '';
      const res = await request<{ data: GalleryItem[] }>(`/gallery${query}`);
      return res.data.map(normalizeGalleryItem);
    } catch (err) {
      console.warn('[API Public Gallery Error]:', err);
      return [];
    }
  },

  // --- ADMIN NEWS ---
  async getAdminNews(token?: string): Promise<NewsItem[]> {
    const res = await request<{ data: NewsItem[] }>('/admin/news', {}, token);
    return res.data.map(normalizeNewsItem);
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

    const res = await request<{ success: boolean; id: string }>('/admin/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }, token);

    return normalizeNewsItem({
      id: res.id,
      title: data.title || '',
      slug: data.slug || data.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '',
      short_description: data.short_description || '',
      content: payload.content,
      image_url: payload.image_url,
      published_at: payload.published_at,
      status: data.status || 'published',
    });
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

    await request(`/admin/news/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }, token);
  },

  async deleteNews(id: string, token?: string): Promise<void> {
    await request(`/admin/news/${id}`, { method: 'DELETE' }, token);
  },

  // --- ADMIN EVENTS ---
  async getAdminEvents(token?: string): Promise<EventItem[]> {
    const res = await request<{ data: EventItem[] }>('/admin/events', {}, token);
    return res.data.map(normalizeEventItem);
  },

  async createEvent(data: Partial<EventItem>, token?: string): Promise<EventItem> {
    const payload = {
      ...data,
      short_description: data.short_description || '',
      description: data.description || '',
      image_url: data.image_url || data.image || '',
      storage_key: data.storage_key || data.r2_key || '',
    };

    const res = await request<{ success: boolean; id: string }>('/admin/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }, token);

    return normalizeEventItem({
      id: res.id,
      title: data.title || '',
      slug: data.slug || data.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '',
      event_date: data.event_date || new Date().toISOString().split('T')[0],
      start_time: data.start_time || '09:00 AM',
      end_time: data.end_time || '04:00 PM',
      venue: data.venue || 'Main Campus',
      description: data.description || '',
      image_url: payload.image_url,
      status: data.status || 'upcoming',
    });
  },

  async updateEvent(id: string, data: Partial<EventItem>, token?: string): Promise<void> {
    const payload = {
      ...data,
      short_description: data.short_description || '',
      description: data.description || '',
      image_url: data.image_url || data.image || '',
      storage_key: data.storage_key || data.r2_key || '',
    };

    await request(`/admin/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }, token);
  },

  async deleteEvent(id: string, token?: string): Promise<void> {
    await request(`/admin/events/${id}`, { method: 'DELETE' }, token);
  },

  // --- ADMIN GALLERY & R2 UPLOAD ---
  async getAdminGallery(token?: string): Promise<GalleryItem[]> {
    const res = await request<{ data: GalleryItem[] }>('/admin/gallery', {}, token);
    return res.data.map(normalizeGalleryItem);
  },

  async uploadImage(file: File, folder: string, token?: string): Promise<{ url: string; key: string; storage_key: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const res = await request<{ success: boolean; url: string; key: string; storage_key?: string }>('/admin/upload', {
      method: 'POST',
      body: formData,
    }, token);

    const fullUrl = res.url.startsWith('http') ? res.url : res.url;
    const storageKey = res.storage_key || res.key;
    return { url: fullUrl, key: storageKey, storage_key: storageKey };
  },

  async createGalleryItem(data: Partial<GalleryItem>, token?: string): Promise<GalleryItem> {
    const payload = {
      ...data,
      image_url: data.image_url || '',
      storage_key: data.storage_key || data.r2_key || '',
    };

    const res = await request<{ success: boolean; id: string }>('/admin/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }, token);

    return normalizeGalleryItem({
      id: res.id,
      title: data.title || 'Campus Photo',
      caption: data.caption || '',
      category: data.category || 'campus',
      image_url: payload.image_url,
      storage_key: payload.storage_key,
      display_order: data.display_order ?? 0,
    });
  },

  async updateGalleryItem(id: string, data: Partial<GalleryItem>, token?: string): Promise<void> {
    await request(`/admin/gallery/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }, token);
  },

  async reorderGallery(items: Array<{ id: string; display_order: number }>, token?: string): Promise<void> {
    await request('/admin/gallery/reorder', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    }, token);
  },

  async deleteGalleryItem(id: string, token?: string): Promise<void> {
    await request(`/admin/gallery/${id}`, { method: 'DELETE' }, token);
  },
};
