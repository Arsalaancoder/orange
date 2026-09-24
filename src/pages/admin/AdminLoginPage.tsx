import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { SignIn } from '@clerk/clerk-react';
import { Loader2 } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2563EB]">
        <div className="text-center text-white space-y-3">
          <Loader2 className="w-10 h-10 animate-spin mx-auto text-white" />
          <p className="text-sm font-semibold tracking-wide">Loading Administrator Portal...</p>
        </div>
      </div>
    );
  }

  if (isSignedIn) {
    return <Navigate to="/admin/dashboard" replace />;
  }

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
