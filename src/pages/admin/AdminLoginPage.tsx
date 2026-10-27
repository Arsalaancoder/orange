import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { SignIn } from '@clerk/clerk-react';
import { Loader2, AlertTriangle, ExternalLink } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { isLoaded, isSignedIn } = useAuth();

  // If Clerk takes more than 8 seconds to initialize, it's almost certainly
  // a configuration issue (wrong domain, missing env var, network block).
  // Show a helpful error instead of an infinite spinner.
  const [clerkTimeout, setClerkTimeout] = useState(false);
  useEffect(() => {
    if (isLoaded) return; // Clerk loaded fine — cancel timer
    const t = setTimeout(() => setClerkTimeout(true), 8000);
    return () => clearTimeout(t);
  }, [isLoaded]);

  // ── Clerk is still initializing ──────────────────────────────────────────
  if (!isLoaded && !clerkTimeout) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2563EB]">
        <div className="text-center text-white space-y-3">
          <Loader2 className="w-10 h-10 animate-spin mx-auto text-white" />
          <p className="text-sm font-semibold tracking-wide">Loading Administrator Portal...</p>
        </div>
      </div>
    );
  }

  // ── Clerk timed out (misconfiguration / missing env var) ─────────────────
  if (!isLoaded && clerkTimeout) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2563EB] p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center space-y-5">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-amber-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Authentication Unavailable
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              The admin login could not connect to the authentication service.
              This usually means the <strong>VITE_CLERK_PUBLISHABLE_KEY</strong> environment
              variable is missing or this domain is not authorized in your Clerk dashboard.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 text-left space-y-2 text-xs font-mono text-slate-600 border border-slate-200">
            <p className="font-bold text-slate-800 font-sans text-xs uppercase tracking-wider mb-2">
              To fix this:
            </p>
            <p>1. Go to your Cloudflare Pages dashboard</p>
            <p>2. Settings → Environment Variables</p>
            <p>3. Add <span className="text-[#F26A21] font-bold">VITE_CLERK_PUBLISHABLE_KEY</span></p>
            <p>4. Also add it to GitHub Actions secrets</p>
            <p>5. Redeploy the site</p>
          </div>

          <a
            href="https://dashboard.clerk.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F26A21] hover:bg-[#d85813] text-white font-bold text-sm rounded-xl transition-all"
          >
            <span>Open Clerk Dashboard</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <p className="text-xs text-slate-400 mt-2">
            Public website is working normally.{' '}
            <a href="/" className="text-[#F26A21] hover:underline font-semibold">Go to homepage →</a>
          </p>
        </div>
      </div>
    );
  }

  // ── Already signed in → redirect ─────────────────────────────────────────
  if (isSignedIn) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // ── Clerk loaded, show the sign-in form ───────────────────────────────────
  return (
    <div className="min-h-screen bg-[#2563EB] flex items-center justify-center p-4 sm:p-6 lg:p-12 relative overflow-hidden font-sans">
      {/* Background Geometric Accent Graphics */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[#FBBF24] rounded-bl-full pointer-events-none z-0 opacity-90" />
      <div className="absolute bottom-0 left-0 w-44 h-44 bg-[#06B6D4] rounded-tr-full pointer-events-none z-0 opacity-90" />
      <div className="absolute -left-12 bottom-16 w-32 h-32 bg-[#A855F7] rounded-full blur-xs pointer-events-none z-0 opacity-70" />
      <div className="absolute top-1/2 -right-8 w-20 h-40 bg-[#8B5CF6] rounded-l-full pointer-events-none z-0 opacity-80" />

      {/* Main Centered White Card Container */}
      <div className="relative z-10 w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        {/* Left Side: Brand Header, Hero Title, Subtitle & Nursing Students Image */}
        <div className="lg:col-span-6 bg-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-100">
          {/* Top Brand Logo */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Orange Group Logo" className="h-16 sm:h-20 w-auto object-contain transition-transform hover:scale-105" />
            <div>
              <span className="text-lg sm:text-xl font-extrabold text-[#1E293B] tracking-tight block leading-tight">
                Orange Group
              </span>
              <span className="text-xs font-bold text-[#F26A21] uppercase tracking-wider block">
                Nursing & Paramedical Colleges
              </span>
            </div>
          </div>

          {/* Hero Typography */}
          <div className="mt-6 space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-[#1E3A8A] tracking-tight leading-tight">
              The Next Generation
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0284C7] tracking-tight">
              Of Healthcare & Paramedical Education
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md pt-1">
              Our institution lets you visit exceptional medical providers, get clinically-backed wellness services, and discover the right healthcare career, all in one place.
            </p>
          </div>

          {/* Integrated Nursing Students Image */}
          <div className="mt-6 w-full flex justify-center">
            <div className="relative w-full max-w-[480px] h-[280px] sm:h-[320px] overflow-hidden rounded-[24px] shadow-md border border-slate-100">
              <img
                src="/images/admin-login-team.png"
                alt="Nursing students"
                className="w-full h-full object-cover object-[center_30%]"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Welcome Back Admin Form */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center bg-white relative">
          <div className="flex flex-col items-center justify-center my-auto py-2">
            <SignIn
              routing="path"
              path="/admin/login"
              forceRedirectUrl="/admin/dashboard"
              withSignUp={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
