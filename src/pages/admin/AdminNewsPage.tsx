import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { api } from '@/services/api';
import type { NewsItem } from '@/services/api';
import { Card } from '@/components/admin/ui/card';
import { Badge } from '@/components/admin/ui/badge';
import { Dialog, ConfirmDialog } from '@/components/admin/ui/dialog';
import { useToast } from '@/components/admin/ui/toast';
import { validateImageFile, compressImage } from '@/lib/imageCompression';
import {
  Newspaper,
  Plus,
  Search,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Clock,
  Loader2,
  Upload,
  CheckCircle,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { softPopUpVariant } from '@/lib/motionVariants';

export const AdminNewsPage: React.FC = () => {
  const { getToken } = useAuth();
  const toast = useToast();
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);

  // Delete State
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formCategory, setFormCategory] = useState('Academic');
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formFullContent, setFormFullContent] = useState('');
  const [formPublishDate, setFormPublishDate] = useState(new Date().toISOString().split('T')[0]);
  const [formStatus, setFormStatus] = useState<'published' | 'draft'>('published');
  const [formImage, setFormImage] = useState('');
  const [formR2Key, setFormR2Key] = useState('');

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const data = await api.getAdminNews(token || undefined);
      setNewsList(data);
    } catch (err) {
      toast.error('Failed to load news', 'Could not fetch news articles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormTitle('');
    setFormSlug('');
    setFormCategory('Academic');
    setFormShortDesc('');
    setFormFullContent('');
    setFormPublishDate(new Date().toISOString().split('T')[0]);
    setFormStatus('published');
    setFormImage('');
    setFormR2Key('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: NewsItem) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormSlug(item.slug);
    setFormCategory(item.category || 'Academic');
    setFormShortDesc(item.short_description);
    setFormFullContent(item.full_content || item.content || '');
    setFormPublishDate(item.publish_date || item.published_at || new Date().toISOString().split('T')[0]);
    setFormStatus(item.status);
    setFormImage(item.featured_image || item.image_url || '');
    setFormR2Key(item.r2_key || '');
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormTitle(val);
    if (!editingItem) {
      const slugVal = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setFormSlug(slugVal);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      toast.error('Image Error', validation.error);
      return;
    }

    setUploading(true);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      setFormImage(dataUrl);

      try {
        const token = await getToken();
        const compressed = await compressImage(file, { maxWidth: 1600, quality: 0.85 });
        const res = await api.uploadImage(compressed.file, 'news', token || undefined);
        if (res.url && res.url.startsWith('http')) {
          setFormImage(res.url);
        }
        setFormR2Key(res.key);
        toast.success('Image Uploaded', 'Featured image loaded successfully.');
      } catch (err: any) {
        toast.success('Image Loaded', 'Featured image preview ready.');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      toast.error('Validation Error', 'Title is required.');
      return;
    }
    if (!formShortDesc.trim()) {
      toast.error('Validation Error', 'Short description is required.');
      return;
    }

    setSaving(true);
    try {
      const token = await getToken();
      const payload: Partial<NewsItem> = {
        title: formTitle,
        slug: formSlug || formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: formCategory,
        short_description: formShortDesc,
        full_content: formFullContent || formShortDesc,
        publish_date: formPublishDate,
        status: formStatus,
        featured_image: formImage || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
        r2_key: formR2Key,
      };

      if (editingItem) {
        await api.updateNews(editingItem.id, payload, token || undefined);
        toast.success('Article Updated', 'News article was updated successfully.');
      } else {
        await api.createNews(payload, token || undefined);
        toast.success('Article Published', 'New article added successfully.');
      }

      setIsModalOpen(false);
      fetchNews();
    } catch (err: any) {
      toast.error('Save Failed', err.message || 'Could not save news article.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      const token = await getToken();
      await api.deleteNews(deletingId, token || undefined);
      toast.success('Article Deleted', 'News article removed successfully.');
      setDeletingId(null);
      fetchNews();
    } catch (err: any) {
      toast.error('Delete Error', err.message || 'Could not delete news article.');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredNews = newsList.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.short_description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Page Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-[#F26A21]" />
            <span>News & Circulars Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create, edit, and publish institutional announcements and academic circulars.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-[#F26A21] hover:bg-[#d85813] text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create News Article</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news titles or descriptions..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F26A21] focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {(['all', 'published', 'draft'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* News Table / Grid */}
      {loading ? (
        <Card className="p-12 text-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-[#F26A21]" />
          <p className="text-xs font-medium">Loading articles...</p>
        </Card>
      ) : filteredNews.length === 0 ? (
        <Card className="p-12 text-center bg-white">
          <Newspaper className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No News Articles Found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchQuery ? 'Try adjusting your search query or filter criteria.' : 'Click "Create News Article" above to post your first announcement.'}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <motion.div key={item.id} variants={softPopUpVariant} initial="hidden" animate="visible">
              <Card className="h-full flex flex-col justify-between hover:border-orange-200 transition-all group">
                <div>
                  <div className="relative h-44 bg-slate-100 overflow-hidden">
                    <img
                      src={item.featured_image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <Badge variant={item.status === 'published' ? 'success' : 'warning'}>
                        {item.status}
                      </Badge>
                      <Badge variant="orange">{item.category}</Badge>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Published: {item.publish_date}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.short_description}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400 truncate max-w-[140px]">
                    /{item.slug}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 text-slate-600 hover:text-[#F26A21] hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit article"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingId(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit News Article' : 'Create New News Article'}
        description="Enter article details below."
      >
        <form onSubmit={handleSave} className="space-y-4 font-sans">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Article Title *
            </label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Admissions Open for B.Sc Nursing 2026-27"
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F26A21]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                URL Slug
              </label>
              <input
                type="text"
                value={formSlug}
                onChange={(e) => setFormSlug(e.target.value)}
                placeholder="admissions-open-2026"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
              >
                <option value="Academic">Academic</option>
                <option value="Admissions">Admissions</option>
                <option value="Campus Life">Campus Life</option>
                <option value="Accreditation">Accreditation</option>
                <option value="Clinical Training">Clinical Training</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Short Description *
            </label>
            <textarea
              rows={2}
              value={formShortDesc}
              onChange={(e) => setFormShortDesc(e.target.value)}
              placeholder="Brief summary to display on card listings..."
              required
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F26A21]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Content Body
            </label>
            <textarea
              rows={4}
              value={formFullContent}
              onChange={(e) => setFormFullContent(e.target.value)}
              placeholder="Detailed news article body text..."
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F26A21]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Featured Image
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {formImage ? (
                <div className="relative w-24 h-20 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                  <img src={formImage} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setFormImage('');
                      setFormR2Key('');
                    }}
                    className="absolute top-1 right-1 bg-red-600 text-white p-0.5 rounded-full"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-20 rounded-xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center shrink-0 text-slate-400">
                  <ImageIcon className="w-6 h-6" />
                </div>
              )}

              <div className="flex-1 w-full">
                <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors">
                  <Upload className="w-4 h-4 text-[#F26A21]" />
                  <span>{uploading ? 'Compressing & Uploading...' : 'Upload Featured Image'}</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-slate-400 mt-1">
                  Supported formats: JPG, JPEG, PNG, WebP (Auto-compressed).
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Publish Date
              </label>
              <input
                type="date"
                value={formPublishDate}
                onChange={(e) => setFormPublishDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Publication Status
              </label>
              <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
              >
                <option value="published">Published (Visible on site)</option>
                <option value="draft">Draft (Admin view only)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="px-5 py-2.5 bg-[#F26A21] hover:bg-[#d85813] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
              <span>{editingItem ? 'Save Changes' : 'Publish Article'}</span>
            </button>
          </div>
        </form>
      </Dialog>

      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
        title="Delete News Article"
        description="Are you sure you want to permanently delete this news article?"
        confirmText="Delete Article"
        isLoading={isDeleting}
      />
    </div>
  );
};
