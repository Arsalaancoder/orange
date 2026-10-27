import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// ─── Lazy-loaded Public Pages ────────────────────────────────────────────────
// Each page becomes its own JS chunk, downloaded on demand.
const HomePage            = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage           = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })));
const CollegesPage        = lazy(() => import('@/pages/CollegesPage').then(m => ({ default: m.CollegesPage })));
const CollegeDetailPage   = lazy(() => import('@/pages/CollegeDetailPage').then(m => ({ default: m.CollegeDetailPage })));
const ProgramsPage        = lazy(() => import('@/pages/ProgramsPage').then(m => ({ default: m.ProgramsPage })));
const ProgramDetailPage   = lazy(() => import('@/pages/ProgramDetailPage').then(m => ({ default: m.ProgramDetailPage })));
const AdmissionsPage      = lazy(() => import('@/pages/AdmissionsPage').then(m => ({ default: m.AdmissionsPage })));
const FacilitiesPage      = lazy(() => import('@/pages/FacilitiesPage').then(m => ({ default: m.FacilitiesPage })));
const ClinicalTrainingPage = lazy(() => import('@/pages/ClinicalTrainingPage').then(m => ({ default: m.ClinicalTrainingPage })));
const FacultyPage         = lazy(() => import('@/pages/FacultyPage').then(m => ({ default: m.FacultyPage })));
const StudentLifePage     = lazy(() => import('@/pages/StudentLifePage').then(m => ({ default: m.StudentLifePage })));
const CareerPathwaysPage  = lazy(() => import('@/pages/CareerPathwaysPage').then(m => ({ default: m.CareerPathwaysPage })));
const GalleryPage         = lazy(() => import('@/pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const NewsPage            = lazy(() => import('@/pages/NewsPage').then(m => ({ default: m.NewsPage })));
const NewsDetailPage      = lazy(() => import('@/pages/NewsDetailPage').then(m => ({ default: m.NewsDetailPage })));
const FAQPage             = lazy(() => import('@/pages/FAQPage').then(m => ({ default: m.FAQPage })));
const ContactPage         = lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPolicyPage   = lazy(() => import('@/pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const NotFoundPage        = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// ─── Lazy-loaded Admin CMS Pages ─────────────────────────────────────────────
// Admin JS is only downloaded when someone actually visits /admin/*
const AdminLoginPage      = lazy(() => import('@/pages/admin/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })));
const AdminDashboardPage  = lazy(() => import('@/pages/admin/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));
const AdminNewsPage       = lazy(() => import('@/pages/admin/AdminNewsPage').then(m => ({ default: m.AdminNewsPage })));
const AdminEventsPage     = lazy(() => import('@/pages/admin/AdminEventsPage').then(m => ({ default: m.AdminEventsPage })));
const AdminGalleryPage    = lazy(() => import('@/pages/admin/AdminGalleryPage').then(m => ({ default: m.AdminGalleryPage })));

// ─── Layout / Auth wrappers (small — kept static) ────────────────────────────
import { AdminProtectedRoute } from '@/components/admin/AdminProtectedRoute';
import { AdminLayout } from '@/components/admin/AdminLayout';

// ─── Shared page loading fallback ────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-4 border-[#F26A21]/20 border-t-[#F26A21] animate-spin" />
        <span className="text-xs font-semibold text-[#667085] tracking-wide">Loading…</span>
      </div>
    </div>
  );
}

// ─── Admin-specific loading state (dark theme to match admin UI) ──────────────
function AdminLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 rounded-full border-4 border-sky-200 border-t-sky-600 animate-spin" />
        <span className="text-xs font-semibold text-slate-500 tracking-wide">Loading admin panel…</span>
      </div>
    </div>
  );
}

export function App() {
  return (
    <Routes>
      {/* ── Public Routes ───────────────────────────────────────────────── */}
      <Route path="/" element={<Suspense fallback={<PageLoader />}><HomePage /></Suspense>} />
      <Route path="/about" element={<Suspense fallback={<PageLoader />}><AboutPage /></Suspense>} />

      {/* Colleges */}
      <Route path="/colleges" element={<Suspense fallback={<PageLoader />}><CollegesPage /></Suspense>} />
      <Route path="/colleges/:slug" element={<Suspense fallback={<PageLoader />}><CollegeDetailPage /></Suspense>} />

      {/* Programs */}
      <Route path="/programs" element={<Suspense fallback={<PageLoader />}><ProgramsPage /></Suspense>} />
      <Route path="/programs/:slug" element={<Suspense fallback={<PageLoader />}><ProgramDetailPage /></Suspense>} />

      {/* Admissions */}
      <Route path="/admissions" element={<Suspense fallback={<PageLoader />}><AdmissionsPage /></Suspense>} />

      {/* Campus & Academics */}
      <Route path="/facilities" element={<Suspense fallback={<PageLoader />}><FacilitiesPage /></Suspense>} />
      <Route path="/clinical-training" element={<Suspense fallback={<PageLoader />}><ClinicalTrainingPage /></Suspense>} />
      <Route path="/faculty" element={<Suspense fallback={<PageLoader />}><FacultyPage /></Suspense>} />
      <Route path="/student-life" element={<Suspense fallback={<PageLoader />}><StudentLifePage /></Suspense>} />
      <Route path="/career-pathways" element={<Suspense fallback={<PageLoader />}><CareerPathwaysPage /></Suspense>} />
      <Route path="/gallery" element={<Suspense fallback={<PageLoader />}><GalleryPage /></Suspense>} />

      {/* News */}
      <Route path="/news" element={<Suspense fallback={<PageLoader />}><NewsPage /></Suspense>} />
      <Route path="/news/:slug" element={<Suspense fallback={<PageLoader />}><NewsDetailPage /></Suspense>} />

      {/* Information & Legal */}
      <Route path="/faq" element={<Suspense fallback={<PageLoader />}><FAQPage /></Suspense>} />
      <Route path="/contact" element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
      <Route path="/privacy-policy" element={<Suspense fallback={<PageLoader />}><PrivacyPolicyPage /></Suspense>} />

      {/* ── Admin CMS Routes ─────────────────────────────────────────────── */}
      <Route
        path="/admin/login/*"
        element={<Suspense fallback={<AdminLoader />}><AdminLoginPage /></Suspense>}
      />

      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <Suspense fallback={<AdminLoader />}>
                <AdminDashboardPage />
              </Suspense>
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/news"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <Suspense fallback={<AdminLoader />}>
                <AdminNewsPage />
              </Suspense>
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/events"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <Suspense fallback={<AdminLoader />}>
                <AdminEventsPage />
              </Suspense>
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/gallery"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <Suspense fallback={<AdminLoader />}>
                <AdminGalleryPage />
              </Suspense>
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />

      {/* 404 Fallback */}
      <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense>} />
    </Routes>
  );
}

export default App;
