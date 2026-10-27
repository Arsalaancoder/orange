import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

// ─── Lazy-loaded Public Pages ─────────────────────────────────────────────────
const HomePage             = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })));
const AboutPage            = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })));
const CollegesPage         = lazy(() => import('@/pages/CollegesPage').then(m => ({ default: m.CollegesPage })));
const CollegeDetailPage    = lazy(() => import('@/pages/CollegeDetailPage').then(m => ({ default: m.CollegeDetailPage })));
const ProgramsPage         = lazy(() => import('@/pages/ProgramsPage').then(m => ({ default: m.ProgramsPage })));
const ProgramDetailPage    = lazy(() => import('@/pages/ProgramDetailPage').then(m => ({ default: m.ProgramDetailPage })));
const AdmissionsPage       = lazy(() => import('@/pages/AdmissionsPage').then(m => ({ default: m.AdmissionsPage })));
const FacilitiesPage       = lazy(() => import('@/pages/FacilitiesPage').then(m => ({ default: m.FacilitiesPage })));
const ClinicalTrainingPage = lazy(() => import('@/pages/ClinicalTrainingPage').then(m => ({ default: m.ClinicalTrainingPage })));
const FacultyPage          = lazy(() => import('@/pages/FacultyPage').then(m => ({ default: m.FacultyPage })));
const StudentLifePage      = lazy(() => import('@/pages/StudentLifePage').then(m => ({ default: m.StudentLifePage })));
const CareerPathwaysPage   = lazy(() => import('@/pages/CareerPathwaysPage').then(m => ({ default: m.CareerPathwaysPage })));
const GalleryPage          = lazy(() => import('@/pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const NewsPage             = lazy(() => import('@/pages/NewsPage').then(m => ({ default: m.NewsPage })));
const NewsDetailPage       = lazy(() => import('@/pages/NewsDetailPage').then(m => ({ default: m.NewsDetailPage })));
const FAQPage              = lazy(() => import('@/pages/FAQPage').then(m => ({ default: m.FAQPage })));
const ContactPage          = lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPolicyPage    = lazy(() => import('@/pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const NotFoundPage         = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// ─── Lazy-loaded Admin CMS Pages ──────────────────────────────────────────────
const AdminLoginPage       = lazy(() => import('@/pages/admin/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })));
const AdminDashboardPage   = lazy(() => import('@/pages/admin/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));
const AdminNewsPage        = lazy(() => import('@/pages/admin/AdminNewsPage').then(m => ({ default: m.AdminNewsPage })));
const AdminEventsPage      = lazy(() => import('@/pages/admin/AdminEventsPage').then(m => ({ default: m.AdminEventsPage })));
const AdminGalleryPage     = lazy(() => import('@/pages/admin/AdminGalleryPage').then(m => ({ default: m.AdminGalleryPage })));

// ─── Static imports (tiny wrappers, needed on every admin route) ──────────────
import { AdminProtectedRoute } from '@/components/admin/AdminProtectedRoute';
import { AdminLayout } from '@/components/admin/AdminLayout';

// ─── Shared fallback spinners ─────────────────────────────────────────────────
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

function AdminLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
          <div className="absolute inset-0 rounded-full border-4 border-t-[#F26A21] animate-spin" />
        </div>
        <span className="text-xs font-semibold text-slate-500 tracking-wide">Loading admin panel…</span>
      </div>
    </div>
  );
}

/**
 * Wraps a public page with Suspense + ErrorBoundary.
 * The ErrorBoundary catches any lazy-chunk load failures and renders
 * a friendly "Reload Page" screen instead of a white screen.
 */
function PublicPage({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

/**
 * Wraps an admin page with Suspense + ErrorBoundary (admin-styled).
 * NOTE: Suspense + ErrorBoundary sit OUTSIDE AdminLayout so the layout
 * shell itself never enters an error state when the inner page chunk fails.
 */
function AdminPage({ children }: { children: React.ReactNode }) {
  return (
    <AdminProtectedRoute>
      <ErrorBoundary isAdmin>
        <Suspense fallback={<AdminLoader />}>
          <AdminLayout>{children}</AdminLayout>
        </Suspense>
      </ErrorBoundary>
    </AdminProtectedRoute>
  );
}

export function App() {
  return (
    <Routes>
      {/* ── Public Routes ──────────────────────────────────────────────────── */}
      <Route path="/"                element={<PublicPage><HomePage /></PublicPage>} />
      <Route path="/about"           element={<PublicPage><AboutPage /></PublicPage>} />

      {/* Colleges */}
      <Route path="/colleges"        element={<PublicPage><CollegesPage /></PublicPage>} />
      <Route path="/colleges/:slug"  element={<PublicPage><CollegeDetailPage /></PublicPage>} />

      {/* Programs */}
      <Route path="/programs"        element={<PublicPage><ProgramsPage /></PublicPage>} />
      <Route path="/programs/:slug"  element={<PublicPage><ProgramDetailPage /></PublicPage>} />

      {/* Admissions */}
      <Route path="/admissions"      element={<PublicPage><AdmissionsPage /></PublicPage>} />

      {/* Campus & Academics */}
      <Route path="/facilities"        element={<PublicPage><FacilitiesPage /></PublicPage>} />
      <Route path="/clinical-training" element={<PublicPage><ClinicalTrainingPage /></PublicPage>} />
      <Route path="/faculty"           element={<PublicPage><FacultyPage /></PublicPage>} />
      <Route path="/student-life"      element={<PublicPage><StudentLifePage /></PublicPage>} />
      <Route path="/career-pathways"   element={<PublicPage><CareerPathwaysPage /></PublicPage>} />
      <Route path="/gallery"           element={<PublicPage><GalleryPage /></PublicPage>} />

      {/* News */}
      <Route path="/news"            element={<PublicPage><NewsPage /></PublicPage>} />
      <Route path="/news/:slug"      element={<PublicPage><NewsDetailPage /></PublicPage>} />

      {/* Information & Legal */}
      <Route path="/faq"             element={<PublicPage><FAQPage /></PublicPage>} />
      <Route path="/contact"         element={<PublicPage><ContactPage /></PublicPage>} />
      <Route path="/privacy-policy"  element={<PublicPage><PrivacyPolicyPage /></PublicPage>} />

      {/* ── Admin CMS Routes ───────────────────────────────────────────────── */}
      <Route
        path="/admin/login/*"
        element={
          <ErrorBoundary isAdmin>
            <Suspense fallback={<AdminLoader />}>
              <AdminLoginPage />
            </Suspense>
          </ErrorBoundary>
        }
      />

      <Route path="/admin/dashboard" element={<AdminPage><AdminDashboardPage /></AdminPage>} />
      <Route path="/admin/news"      element={<AdminPage><AdminNewsPage /></AdminPage>} />
      <Route path="/admin/events"    element={<AdminPage><AdminEventsPage /></AdminPage>} />
      <Route path="/admin/gallery"   element={<AdminPage><AdminGalleryPage /></AdminPage>} />

      {/* 404 */}
      <Route path="*" element={<PublicPage><NotFoundPage /></PublicPage>} />
    </Routes>
  );
}

export default App;
