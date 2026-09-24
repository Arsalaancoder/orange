import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { api } from '@/services/api';
import type { GalleryItem } from '@/services/api';
import { Card } from '@/components/admin/ui/card';
import { Badge } from '@/components/admin/ui/badge';
import { Dialog, ConfirmDialog } from '@/components/admin/ui/dialog';
import { Progress } from '@/components/admin/ui/card';
import { useToast } from '@/components/admin/ui/toast';
import { validateImageFile, compressImage } from '@/lib/imageCompression';
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  Edit3,
  ArrowUp,
  ArrowDown,
  Loader2,
  CheckCircle2,
  Tag,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { softPopUpVariant } from '@/lib/motionVariants';

interface PendingUpload {
  file: File;
  previewUrl: string;
  title: string;
  caption: string;
  category: string;
  originalSize: number;
  compressedSize: number;
  compressedFile: File;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  errorMessage?: string;
}

export const AdminGalleryPage: React.FC = () => {
  const { getToken } = useAuth();
  const toast = useToast();
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Batch Upload States
  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Edit Item Modal
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCaption, setEditCaption] = useState('');
  const [editCategory, setEditCategory] = useState('campus');

  // Delete Item
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const data = await api.getAdminGallery(token || undefined);
      setGalleryList(data);
    } catch (err) {
      toast.error('Failed to load gallery', 'Could not fetch photos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newPending: PendingUpload[] = [];

    for (const file of files) {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        toast.error('File Skipped', `${file.name}: ${validation.error}`);
        continue;
      }

      try {
        const compressed = await compressImage(file, { maxWidth: 1920, quality: 0.85 });
        const folderCat = selectedCategory !== 'all' ? selectedCategory : 'campus';
        const defaultTitle = file.name.substring(0, file.name.lastIndexOf('.')) || 'Campus Photo';

        newPending.push({
          file,
          previewUrl: compressed.previewUrl,
          title: defaultTitle.replace(/[-_]/g, ' '),
          caption: `Photo taken at Orange Group campus.`,
          category: folderCat,
          originalSize: compressed.originalSize,
          compressedSize: compressed.compressedSize,
          compressedFile: compressed.file,
          status: 'pending',
        });
      } catch (err: any) {
        toast.error('Compression Error', `Could not compress ${file.name}`);
      }
    }

    setPendingUploads((prev) => [...prev, ...newPending]);
    e.target.value = '';
  };

  const startBatchUpload = async () => {
    if (pendingUploads.length === 0) return;
    setIsUploading(true);
    setUploadProgress(10);

    let completedCount = 0;
    const total = pendingUploads.length;

    for (let i = 0; i < pendingUploads.length; i++) {
      const item = pendingUploads[i];
      setPendingUploads((prev) =>
        prev.map((p, idx) => (idx === i ? { ...p, status: 'uploading' } : p))
      );

      try {
        const token = await getToken();
        const folderKey = `gallery/${item.category}`;
        const uploadRes = await api.uploadImage(item.compressedFile, folderKey, token || undefined);

        await api.createGalleryItem({
          title: item.title,
          caption: item.caption,
          category: item.category,
          image_url: (uploadRes.url && uploadRes.url.startsWith('http')) ? uploadRes.url : item.previewUrl,
          r2_key: uploadRes.key,
          display_order: galleryList.length + i + 1,
        }, token || undefined);

        completedCount++;
        setUploadProgress(Math.round((completedCount / total) * 100));

        setPendingUploads((prev) =>
          prev.map((p, idx) => (idx === i ? { ...p, status: 'completed' } : p))
        );
      } catch (err: any) {
        setPendingUploads((prev) =>
          prev.map((p, idx) =>
            idx === i ? { ...p, status: 'error', errorMessage: err.message } : p
          )
        );
      }
    }

    setIsUploading(false);
    toast.success(
      'Upload Finished',
      `Successfully uploaded ${completedCount} of ${total} images.`
    );

    setTimeout(() => {
      setPendingUploads((prev) => prev.filter((p) => p.status !== 'completed'));
      fetchGallery();
    }, 1200);
  };

  const removePendingItem = (index: number) => {
    setPendingUploads((prev) => prev.filter((_, idx) => idx !== index));
  };

  const moveItem = async (index: number, direction: 'up' | 'down') => {
    const newList = [...galleryList];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newList.length) return;

    const temp = newList[index];
    newList[index] = newList[targetIndex];
    newList[targetIndex] = temp;

    const updatedOrder = newList.map((item, idx) => ({
      id: item.id,
      display_order: idx + 1,
    }));

    setGalleryList(newList);
    try {
      const token = await getToken();
      await api.reorderGallery(updatedOrder, token || undefined);
      toast.success('Order Updated', 'Gallery sequence updated.');
    } catch {
      toast.error('Reorder Error', 'Failed to update order.');
    }
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditCaption(item.caption);
    setEditCategory(item.category);
  };

  const handleSaveEdit = async () => {
    if (!editingItem) return;
    try {
      const token = await getToken();
      await api.updateGalleryItem(editingItem.id, {
        title: editTitle,
        caption: editCaption,
        category: editCategory,
      }, token || undefined);
      toast.success('Photo Updated', 'Gallery photo details updated.');
      setEditingItem(null);
      fetchGallery();
    } catch {
      toast.error('Update Failed', 'Could not update gallery item.');
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      const token = await getToken();
      await api.deleteGalleryItem(deletingId, token || undefined);
      toast.success('Photo Deleted', 'Gallery photo removed successfully.');
      setDeletingId(null);
      fetchGallery();
    } catch (err: any) {
      toast.error('Delete Error', err.message || 'Could not delete gallery photo.');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredGallery =
    selectedCategory === 'all'
      ? galleryList
      : galleryList.filter((g) => g.category === selectedCategory);

  return (
    <div className="space-y-6 font-sans">
      {/* Page Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-sky-600" />
            <span>Campus Gallery & Photos Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Batch upload, order, and categorize photos showcasing campus infrastructure.
          </p>
        </div>

        <label className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer">
          <Upload className="w-4 h-4" />
          <span>Upload Multiple Photos</span>
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>
      </div>

      {/* Category Filter Tabs */}
      <Card className="p-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <Tag className="w-4 h-4 text-sky-600" />
            <span>Category Filter:</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {(['all', 'campus', 'labs', 'events', 'general'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Batch Upload Staging Area */}
      {pendingUploads.length > 0 && (
        <Card className="p-6 border-2 border-sky-200 bg-sky-50/40 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sky-600" />
                <span>Upload Staging Queue ({pendingUploads.length} images)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Review titles and categories before finalizing upload.
              </p>
            </div>

            <button
              onClick={startBatchUpload}
              disabled={isUploading}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              <span>{isUploading ? 'Uploading...' : 'Start Upload'}</span>
            </button>
          </div>

          {isUploading && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>Upload Progress</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {pendingUploads.map((item, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
                <img src={item.previewUrl} alt="Preview" className="w-16 h-16 rounded-lg object-cover border border-slate-200 shrink-0" />
                <div className="min-w-0 flex-1 space-y-1">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPendingUploads((prev) =>
                        prev.map((p, pIdx) => (pIdx === idx ? { ...p, title: val } : p))
                      );
                    }}
                    className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-bold text-slate-900"
                  />
                  <div className="flex items-center gap-2">
                    <select
                      value={item.category}
                      onChange={(e) => {
                        const val = e.target.value;
                        setPendingUploads((prev) =>
                          prev.map((p, pIdx) => (pIdx === idx ? { ...p, category: val } : p))
                        );
                      }}
                      className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-semibold text-slate-700"
                    >
                      <option value="campus">campus</option>
                      <option value="labs">labs</option>
                      <option value="events">events</option>
                      <option value="general">general</option>
                    </select>
                    <span className="text-[10px] text-slate-400">
                      {(item.compressedSize / 1024).toFixed(0)}KB
                    </span>
                  </div>
                </div>

                {item.status === 'uploading' ? (
                  <Loader2 className="w-4 h-4 animate-spin text-sky-600 shrink-0" />
                ) : item.status === 'completed' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <button
                    onClick={() => removePendingItem(idx)}
                    className="text-slate-400 hover:text-red-600 p-1 shrink-0 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Gallery Grid */}
      {loading ? (
        <Card className="p-12 text-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-sky-600" />
          <p className="text-xs font-medium">Loading gallery photos...</p>
        </Card>
      ) : filteredGallery.length === 0 ? (
        <Card className="p-12 text-center bg-white">
          <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Gallery Photos Found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Click "Upload Multiple Photos" above to add photos.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, index) => (
            <motion.div key={item.id} variants={softPopUpVariant} initial="hidden" animate="visible">
              <Card className="h-full flex flex-col justify-between hover:border-sky-200 transition-all group">
                <div>
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="orange">{item.category}</Badge>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-900/70 p-1 rounded-lg backdrop-blur-xs">
                      <button
                        onClick={() => moveItem(index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-white hover:text-sky-300 disabled:opacity-30 cursor-pointer"
                        title="Move Up in Display Order"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[10px] font-bold text-white px-1">#{item.display_order}</span>
                      <button
                        onClick={() => moveItem(index, 'down')}
                        disabled={index === filteredGallery.length - 1}
                        className="p-1 text-white hover:text-sky-300 disabled:opacity-30 cursor-pointer"
                        title="Move Down in Display Order"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{item.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{item.caption}</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit photo details"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingId(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete photo"
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

      {/* Edit Modal */}
      <Dialog
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        title="Edit Gallery Photo Details"
        description="Update caption and category tag for this photo."
      >
        <div className="space-y-4 font-sans">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Title
            </label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Caption
            </label>
            <textarea
              rows={3}
              value={editCaption}
              onChange={(e) => setEditCaption(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
            >
              <option value="campus">campus</option>
              <option value="labs">labs</option>
              <option value="events">events</option>
              <option value="general">general</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => setEditingItem(null)}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Save Photo Details
            </button>
          </div>
        </div>
      </Dialog>

      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
        title="Delete Gallery Photo"
        description="Are you sure you want to delete this photo?"
        confirmText="Delete Photo"
        isLoading={isDeleting}
      />
    </div>
  );
};
