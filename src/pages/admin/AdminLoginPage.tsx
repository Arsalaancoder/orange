import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/auth/adminAuth';
import {
  LockKeyhole,
  Eye,
  EyeOff,
  Loader2,
  AlertTriangle,
  User,
  Mail,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { isLoaded, isSignedIn, signIn, signUp } = useAdminAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Already signed in → go straight to dashboard
  if (isLoaded && isSignedIn) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      if (mode === 'signup') {
        if (!name.trim()) {
          throw new Error('Please enter your full administrator name.');
        }
        if (!email.trim() || !email.includes('@')) {
          throw new Error('Please enter a valid administrator email address.');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters long.');
        }
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match. Please re-enter your password.');
        }

        const res = await signUp(name.trim(), email.trim(), password);
        if (!res.success) {
          throw new Error(res.error || 'Failed to create administrator account.');
        }

        setSuccessMessage('Administrator account created successfully! Redirecting...');
        setTimeout(() => {
          navigate('/admin/dashboard', { replace: true });
        }, 300);
      } else {
        if (!email.trim()) {
          throw new Error('Please enter your administrator email address.');
        }
        if (!password) {
          throw new Error('Please enter your password.');
        }

        const res = await signIn(email.trim(), password);
        if (!res.success) {
          throw new Error(res.error || 'Invalid email or password.');
        }

        setSuccessMessage('Signed in successfully! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/admin/dashboard', { replace: true });
        }, 300);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

        {/* Right Side: Administrator Sign-In & Sign-Up Form */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center bg-white relative">
          <div className="w-full max-w-md mx-auto my-auto py-2">
            {/* Form Header */}
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-[#F26A21] shadow-xs">
                <LockKeyhole className="h-7 w-7" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {mode === 'signin' ? 'Administrator Sign In' : 'Create Admin Account'}
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
                {mode === 'signin'
                  ? 'Access and manage college news, events, gallery, and site content.'
                  : 'Register a new administrator profile for Orange Paramedical CMS.'}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="mb-6 flex p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setError('');
                  setSuccessMessage('');
                }}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                  mode === 'signin'
                    ? 'bg-white text-[#1E3A8A] shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError('');
                  setSuccessMessage('');
                }}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                  mode === 'signup'
                    ? 'bg-white text-[#1E3A8A] shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div
                role="alert"
                className="mb-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs sm:text-sm text-red-700 animate-in fade-in duration-200"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div
                role="status"
                className="mb-4 flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs sm:text-sm text-emerald-800 animate-in fade-in duration-200"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name field (Sign Up only) */}
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                    Administrator Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    <input
                      required
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Dr. Arsalaan"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setError('');
                      }}
                      className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 sm:py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#F26A21] focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                </div>
              )}

              {/* Email Address */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  <input
                    required
                    type="email"
                    autoComplete="username"
                    placeholder="admin@orangecolleges.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className="w-full rounded-xl border border-slate-300 pl-10 pr-4 py-2.5 sm:py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#F26A21] focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    required
                    minLength={6}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                    placeholder={mode === 'signup' ? 'Minimum 6 characters' : 'Enter your password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    className="w-full rounded-xl border border-slate-300 px-4 pr-11 py-2.5 sm:py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#F26A21] focus:ring-2 focus:ring-orange-100"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3.5 flex items-center text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Sign Up only) */}
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      required
                      minLength={6}
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setError('');
                      }}
                      className="w-full rounded-xl border border-slate-300 px-4 pr-11 py-2.5 sm:py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#F26A21] focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#F26A21] hover:bg-[#d85813] active:scale-[0.99] px-5 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{mode === 'signin' ? 'Signing In…' : 'Creating Account…'}</span>
                  </>
                ) : (
                  <span>{mode === 'signin' ? 'Sign In to Portal' : 'Create Admin Account'}</span>
                )}
              </button>
            </form>

            {/* Bottom Toggle Note */}
            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'signin' ? 'signup' : 'signin');
                  setError('');
                  setSuccessMessage('');
                }}
                className="text-xs sm:text-sm font-semibold text-[#1E3A8A] hover:text-[#0284C7] hover:underline cursor-pointer"
              >
                {mode === 'signin'
                  ? "Don't have an account? Sign up as admin"
                  : 'Already have an account? Sign in'}
              </button>
            </div>

            {/* Trust badge */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Protected Administrator Area • Orange Paramedical Colleges</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
