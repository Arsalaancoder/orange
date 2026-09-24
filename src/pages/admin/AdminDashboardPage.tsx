import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { api } from '@/services/api';
import type { NewsItem, EventItem, GalleryItem } from '@/services/api';
import { Card } from '@/components/admin/ui/card';
import { Badge } from '@/components/admin/ui/badge';
import {
  Newspaper,
  Calendar,
  Image as ImageIcon,
  Plus,
  ArrowUpRight,
  Sparkles,
  Database,
  HardDrive,
  Clock,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { softPopUpVariant, staggeredContainerVariant } from '@/lib/motionVariants';

export const AdminDashboardPage: React.FC = () => {
  const { getToken } = useAuth();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadDashboardData = async () => {
      try {
        const token = await getToken();
        const [newsData, eventsData, galleryData] = await Promise.all([
          api.getAdminNews(token || undefined).catch((e) => {
            console.warn('News fetch warning:', e);
            return [];
          }),
          api.getAdminEvents(token || undefined).catch((e) => {
            console.warn('Events fetch warning:', e);
            return [];
          }),
          api.getAdminGallery(token || undefined).catch((e) => {
            console.warn('Gallery fetch warning:', e);
            return [];
          }),
        ]);
        if (isMounted) {
          setNews(newsData);
          setEvents(eventsData);
          setGallery(galleryData);
        }
      } catch (err: any) {
        console.error('Dashboard load error:', err);
        if (isMounted) {
          setApiError(err.message || 'Failed to load administrative content.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalNews = news.length;
  const publishedNews = news.filter((n) => n.status === 'published').length;
  const totalEvents = events.length;
  const upcomingEvents = events.filter((e) => e.status === 'upcoming').length;
  const totalGallery = gallery.length;

  return (
    <motion.div
      variants={staggeredContainerVariant}
      initial="hidden"
      animate="visible"
      className="space-y-8 font-sans"
    >
      {/* Non-blocking API Error Banner */}
      {apiError && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3 text-amber-800 text-xs font-semibold">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>{apiError}</span>
        </div>
      )}

      {/* Top Welcome Banner */}
      <motion.div
        variants={softPopUpVariant}
        className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#1E1B4B] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F26A21]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Administrator Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Institutional Content Management System
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Manage academic circulars, campus events, and photo galleries for Chengicherla / Hyderabad, Nagaram / Hyderabad, and Nalgonda campuses seamlessly.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <Link
            to="/admin/news"
            className="px-4 py-2.5 bg-[#F26A21] hover:bg-[#d85813] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Post News</span>
          </Link>
          <Link
            to="/admin/events"
            className="px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 border border-white/20 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-orange-300" />
            <span>New Event</span>
          </Link>
        </div>
      </motion.div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Stat 1: News */}
        <motion.div variants={softPopUpVariant}>
          <Card className="p-5 hover:border-orange-200 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">News Circulars</span>
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F26A21] flex items-center justify-center">
                <Newspaper className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-black text-slate-900">{loading ? '...' : totalNews}</span>
              <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                <Badge variant="success">{publishedNews} Published</Badge>
                <span>{totalNews - publishedNews} Drafts</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stat 2: Events */}
        <motion.div variants={softPopUpVariant}>
          <Card className="p-5 hover:border-emerald-200 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Campus Events</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-black text-slate-900">{loading ? '...' : totalEvents}</span>
              <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                <Badge variant="success">{upcomingEvents} Upcoming</Badge>
                <span>{totalEvents - upcomingEvents} Completed</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stat 3: Gallery Photos */}
        <motion.div variants={softPopUpVariant}>
          <Card className="p-5 hover:border-sky-200 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Campus Gallery</span>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <ImageIcon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-3xl font-black text-slate-900">{loading ? '...' : totalGallery}</span>
              <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                <Badge variant="orange">High Resolution</Badge>
                <span>Organized Categories</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stat 4: Backend Status */}
        <motion.div variants={softPopUpVariant}>
          <Card className="p-5 hover:border-indigo-200 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Content Engine</span>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-base font-extrabold text-slate-900">CMS Online</span>
              </div>
              <p className="mt-1 text-xs text-[#667085] flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5 text-slate-400" />
                <span>Live Website Sync</span>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Main Grid: Recent Content Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent News Circulars */}
        <motion.div variants={softPopUpVariant} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-[#F26A21]" />
              <span>Recent News & Circulars</span>
            </h2>
            <Link to="/admin/news" className="text-xs font-semibold text-[#F26A21] hover:underline flex items-center gap-1">
              <span>Manage All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <Card>
            {loading ? (
              <div className="p-8 text-center text-slate-400">
                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#F26A21]" />
                <span className="text-xs">Loading latest news...</span>
              </div>
            ) : news.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">No news published yet.</div>
            ) : (
              <div className="divide-y divide-slate-100">
                {news.slice(0, 4).map((item) => (
                  <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={item.status === 'published' ? 'success' : 'outline'}>{item.status}</Badge>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.publish_date}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 truncate">{item.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.short_description}</p>
                    </div>
                    <Link
                      to="/admin/news"
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#F26A21] bg-slate-100 hover:bg-orange-50 rounded-lg transition-colors shrink-0"
                    >
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Recent Events & Workshops */}
        <motion.div variants={softPopUpVariant} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <span>Upcoming Workshops & Events</span>
            </h2>
            <Link to="/admin/events" className="text-xs font-semibold text-[#F26A21] hover:underline flex items-center gap-1">
              <span>Manage All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <Card>
            {loading ? (
              <div className="p-8 text-center text-slate-400">
                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-600" />
                <span className="text-xs">Loading scheduled events...</span>
              </div>
            ) : events.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">No events scheduled.</div>
            ) : (
              <div className="divide-y divide-slate-100">
                {events.slice(0, 4).map((item) => (
                  <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="success">{item.category}</Badge>
                        <span className="text-[11px] font-semibold text-slate-500">{item.event_date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 truncate">{item.title}</h4>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{item.venue}</p>
                    </div>
                    <Link
                      to="/admin/events"
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-600 bg-slate-100 hover:bg-emerald-50 rounded-lg transition-colors shrink-0"
                    >
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </div>

      {/* Quick Action Cards */}
      <motion.div variants={softPopUpVariant} className="pt-4">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Quick Management Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/admin/news"
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-[#F26A21] hover:shadow-md transition-all group flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F26A21] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Newspaper className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#F26A21] transition-colors">
                Publish Circular
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">Post new academic announcement</p>
            </div>
          </Link>

          <Link
            to="/admin/events"
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all group flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                Schedule Workshop
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">Add clinical skill event</p>
            </div>
          </Link>

          <Link
            to="/admin/gallery"
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-sky-500 hover:shadow-md transition-all group flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                Upload Gallery Photos
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">Add campus photos</p>
            </div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboardPage;
