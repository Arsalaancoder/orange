import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';
import {
  LayoutDashboard,
  Newspaper,
  Calendar,
  Image as ImageIcon,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useToast } from '@/components/admin/ui/toast';
import { ConfirmDialog } from '@/components/admin/ui/dialog';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'News & Circulars', path: '/admin/news', icon: Newspaper },
    { label: 'Events & Workshops', path: '/admin/events', icon: Calendar },
    { label: 'Gallery & Photos', path: '/admin/gallery', icon: ImageIcon },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out', 'You have signed out of the administrator portal.');
      navigate('/admin/login');
    } catch {
      toast.error('Logout error', 'An error occurred while signing out.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-slate-600 hover:text-slate-900 p-2 rounded-lg"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link to="/admin/dashboard" className="flex items-center gap-3 group">
              <img src="/logo.png" alt="Orange Paramedical Logo" className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform" />
              <div className="hidden sm:block">
                <span className="font-extrabold text-slate-900 tracking-tight text-base block leading-none">
                  Orange CMS
                </span>
                <span className="text-[11px] font-medium text-[#F26A21] tracking-wider uppercase">
                  Admin Control Panel
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1.5 ml-4 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-full text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Administrator Session Active</span>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#F26A21] bg-slate-100 hover:bg-orange-50 rounded-lg transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {user?.fullName || 'Administrator'}
                </p>
                <p className="text-[11px] text-slate-500 truncate max-w-[160px]">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>

              <button
                onClick={() => setLogoutConfirm(true)}
                title="Sign out of Admin Portal"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-white bg-red-50 hover:bg-red-600 rounded-lg transition-all border border-red-200 hover:border-red-600 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              Management Portal
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? 'bg-[#F26A21] text-white shadow-md shadow-orange-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {active && <ChevronRight className="w-4 h-4 text-white/80" />}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-slate-100 mt-4 space-y-3">
              <div className="p-3.5 bg-orange-50/70 rounded-xl border border-orange-100">
                <p className="text-xs font-bold text-[#F26A21]">Institutional Content Engine</p>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Real-time synchronization across all campuses.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex">
            <div className="w-72 bg-white h-full p-5 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <img src="/logo.png" alt="Orange Group Logo" className="h-9 w-auto object-contain" />
                  <span className="font-extrabold text-slate-900 text-sm">Admin Menu</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold ${
                        active ? 'bg-[#F26A21] text-white' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-3">
                <a
                  href="/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 p-3 rounded-xl"
                >
                  <ExternalLink className="w-4 h-4 text-[#F26A21]" />
                  <span>Open Public Site</span>
                </a>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileOpen(false)} />
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>

      {/* Logout Confirmation Dialog */}
      <ConfirmDialog
        isOpen={logoutConfirm}
        onClose={() => setLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Sign Out of Admin CMS"
        description="Are you sure you want to end your administrator session? You will need to authenticate again to access the CMS."
        confirmText="Logout Now"
        isDestructive={true}
      />
    </div>
  );
};
