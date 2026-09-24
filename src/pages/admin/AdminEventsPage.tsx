import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { api } from '@/services/api';
import type { EventItem } from '@/services/api';
import { Card } from '@/components/admin/ui/card';
import { Badge } from '@/components/admin/ui/badge';
import { Dialog, ConfirmDialog } from '@/components/admin/ui/dialog';
import { useToast } from '@/components/admin/ui/toast';
import { validateImageFile, compressImage } from '@/lib/imageCompression';
import {
  Calendar,
  Plus,
  Search,
  Edit2,
  Trash2,
  Image as ImageIcon,
  MapPin,
  Loader2,
  Upload,
  CheckCircle,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { softPopUpVariant } from '@/lib/motionVariants';

export const AdminEventsPage: React.FC = () => {
  const { getToken } = useAuth();
  const toast = useToast();
  const [eventsList, setEventsList] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'completed' | 'draft'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EventItem | null>(null);

  // Delete State
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formCategory, setFormCategory] = useState('Campus Workshop');
  const [formEventDate, setFormEventDate] = useState(new Date().toISOString().split('T')[0]);
  const [formStartTime, setFormStartTime] = useState('09:30 AM');
  const [formEndTime, setFormEndTime] = useState('03:30 PM');
  const [formVenue, setFormVenue] = useState('Main Auditorium, Chengicherla / Hyderabad Campus');
  const [formDescription, setFormDescription] = useState('');
  const [formStatus, setFormStatus] = useState<'upcoming' | 'completed' | 'cancelled' | 'draft'>('upcoming');
  const [formImage, setFormImage] = useState('');
  const [formR2Key, setFormR2Key] = useState('');

  // Upload State
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const data = await api.getAdminEvents(token || undefined);
      setEventsList(data);
    } catch (err) {
      toast.error('Failed to load events', 'Could not fetch events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormTitle('');
    setFormSlug('');
    setFormCategory('Campus Workshop');
    setFormEventDate(new Date().toISOString().split('T')[0]);
    setFormStartTime('09:30 AM');
    setFormEndTime('03:30 PM');
    setFormVenue('Main Auditorium, Chengicherla / Hyderabad Campus');
    setFormDescription('');
    setFormStatus('upcoming');
    setFormImage('');
    setFormR2Key('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: EventItem) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormSlug(item.slug);
    setFormCategory(item.category || 'Campus Workshop');
    setFormEventDate(item.event_date);
    setFormStartTime(item.start_time);
    setFormEndTime(item.end_time);
    setFormVenue(item.venue);
    setFormDescription(item.description);
    setFormStatus(item.status);
    setFormImage(item.image || item.image_url || '');
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
    try {
      const token = await getToken();
      const compressed = await compressImage(file, { maxWidth: 1600, quality: 0.85 });
      const res = await api.uploadImage(compressed.file, 'events', token || undefined);
      setFormImage(res.url);
      setFormR2Key(res.key);
      toast.success('Event Image Uploaded', 'Event banner saved successfully.');
    } catch (err: any) {
      toast.error('Upload Failed', err.message || 'Could not upload image.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      toast.error('Validation Error', 'Event title is required.');
      return;
    }

    setSaving(true);
    try {
      const token = await getToken();
      const payload: Partial<EventItem> = {
        title: formTitle,
        slug: formSlug || formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: formCategory,
        event_date: formEventDate,
        start_time: formStartTime,
        end_time: formEndTime,
        venue: formVenue,
        description: formDescription,
        status: formStatus,
        image: formImage || '/images/student-life/student-life-cpr-workshop.jpg',
        r2_key: formR2Key,
      };

      if (editingItem) {
        await api.updateEvent(editingItem.id, payload, token || undefined);
        toast.success('Event Updated', 'Event details updated successfully.');
      } else {
        await api.createEvent(payload, token || undefined);
        toast.success('Event Scheduled', 'New workshop event saved successfully.');
      }

      setIsModalOpen(false);
      fetchEvents();
    } catch (err: any) {
      toast.error('Save Failed', err.message || 'Could not save event.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      const token = await getToken();
      await api.deleteEvent(deletingId, token || undefined);
      toast.success('Event Removed', 'Event deleted successfully.');
      setDeletingId(null);
      fetchEvents();
    } catch (err: any) {
      toast.error('Delete Error', err.message || 'Could not delete event.');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredEvents = eventsList.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Page Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-emerald-600" />
            <span>Events & Workshops Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Schedule clinical training workshops, CPR sessions, health awareness drives, and cultural fests.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Event</span>
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
              placeholder="Search event titles, venues..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {(['all', 'upcoming', 'completed', 'draft'] as const).map((st) => (
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

      {/* Events Grid */}
      {loading ? (
        <Card className="p-12 text-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-emerald-600" />
          <p className="text-xs font-medium">Loading scheduled events...</p>
        </Card>
      ) : filteredEvents.length === 0 ? (
        <Card className="p-12 text-center bg-white">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Events Found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchQuery ? 'Try adjusting your search filters.' : 'Click "Schedule New Event" above to create an event.'}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((item) => (
            <motion.div key={item.id} variants={softPopUpVariant} initial="hidden" animate="visible">
              <Card className="h-full flex flex-col justify-between hover:border-emerald-200 transition-all group">
                <div>
                  <div className="relative h-44 bg-slate-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <Badge variant={item.status === 'upcoming' ? 'success' : 'outline'}>
                        {item.status}
                      </Badge>
                      <Badge variant="orange">{item.category}</Badge>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-3 text-xs font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                      <Calendar className="w-4 h-4 shrink-0" />
                      <span>{item.event_date}</span>
                      <span>•</span>
                      <span className="font-medium text-slate-600">{item.start_time} - {item.end_time}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{item.venue}</span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
                      {item.description}
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
                      className="p-1.5 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit event"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingId(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete event"
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
        title={editingItem ? 'Edit Scheduled Event' : 'Schedule New Campus Event'}
        description="Fill out event venue, timing, and promotional banner image."
      >
        <form onSubmit={handleSave} className="space-y-4 font-sans">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Event Title *
            </label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Annual Emergency CPR & Life Support Workshop"
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                placeholder="cpr-workshop-2026"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Event Category
              </label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
              >
                <option value="Campus Workshop">Campus Workshop</option>
                <option value="Academic Seminar">Academic Seminar</option>
                <option value="Health Awareness Drive">Health Awareness Drive</option>
                <option value="Community Outreach">Community Outreach</option>
                <option value="Cultural Fest">Cultural Fest</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Date *
              </label>
              <input
                type="date"
                value={formEventDate}
                onChange={(e) => setFormEventDate(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Start Time
              </label>
              <input
                type="text"
                value={formStartTime}
                onChange={(e) => setFormStartTime(e.target.value)}
                placeholder="09:30 AM"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                End Time
              </label>
              <input
                type="text"
                value={formEndTime}
                onChange={(e) => setFormEndTime(e.target.value)}
                placeholder="03:30 PM"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Venue / Location *
            </label>
            <input
              type="text"
              value={formVenue}
              onChange={(e) => setFormVenue(e.target.value)}
              placeholder="Main Auditorium, Medipally Campus"
              required
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Event Description
            </label>
            <textarea
              rows={3}
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Outline event schedule, learning outcomes, and guest instructors..."
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Event Banner Image
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
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span>{uploading ? 'Uploading...' : 'Upload Event Image'}</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-slate-400 mt-1">
                  High-resolution event image file.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Event Status
            </label>
            <select
              value={formStatus}
              onChange={(e) => setFormStatus(e.target.value as any)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
            >
              <option value="upcoming">Upcoming (Visible on website)</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="draft">Draft (Admin view only)</option>
            </select>
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
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
              <span>{editingItem ? 'Save Event Changes' : 'Schedule Event'}</span>
            </button>
          </div>
        </form>
      </Dialog>

      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDelete}
        title="Delete Event"
        description="Are you sure you want to delete this event?"
        confirmText="Delete Event"
        isLoading={isDeleting}
      />
    </div>
  );
};
