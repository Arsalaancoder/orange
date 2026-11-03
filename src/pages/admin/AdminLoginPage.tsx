import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AlertTriangle, Eye, EyeOff, Loader2, LockKeyhole } from 'lucide-react';
import { authClient } from '@/auth/authClient';

export const AdminLoginPage: React.FC = () => {
  const { data: session, isPending } = authClient.useSession();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [setupCode, setSetupCode] = useState('');
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isPending && session?.user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      if (isCreatingAccount) {
        const response = await fetch(`${import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '/api'}/auth/bootstrap-admin`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name.trim(), email: email.trim(), password, setupCode }),
        });
        const data = await response.json() as { message?: string; error?: string; user?: { role?: string } };
        if (!response.ok) throw new Error(data.message || data.error || 'Administrator setup could not be completed.');
        if (data.user?.role !== 'admin') throw new Error('Administrator setup could not be verified. Please sign in.');
        await authClient.getSession();
        navigate('/admin/dashboard', { replace: true });
        return;
      }

      const result = await authClient.signIn.email({ email: email.trim(), password, callbackURL: '/admin/dashboard' });
      if (result.error) {
        const status = Number(result.error.status);
        if (status === 401) throw new Error('Invalid email or password.');
        if (status >= 500) throw new Error('The authentication service is unavailable. Please try again shortly.');
        throw new Error('Sign-in could not be completed. Check the information and try again.');
      }
      if (result.data?.user.role !== 'admin') {
        await authClient.signOut();
        throw new Error('This account is not authorized to access the administrator portal.');
      }
      navigate('/admin/dashboard', { replace: true });
    } catch (cause) {
      setError(cause instanceof TypeError
        ? 'Unable to reach the authentication service. Check your connection and try again.'
        : cause instanceof Error ? cause.message : 'Unable to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render the existing administrator sign-in layout.
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

        {/* Right Side: Administrator Sign-In Form */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center bg-white relative">
          <div className="w-full max-w-sm mx-auto py-2">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-[#F26A21]"><LockKeyhole className="h-7 w-7" /></div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Administrator Sign In</h2>
              <p className="mt-2 text-sm text-slate-500">{isCreatingAccount ? 'Create the first administrator account with your one-time setup code.' : 'Use your administrator account.'}</p>
            </div>
            {isPending && <p className="mb-4 flex items-center justify-center gap-2 text-sm text-slate-500"><Loader2 className="h-4 w-4 animate-spin" /> Checking existing session…</p>}
            {error && <div role="alert" className="mb-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{error}</div>}
            <form onSubmit={submit} className="space-y-5">
              {isCreatingAccount && <>
                <label className="block text-sm font-semibold text-slate-700">Administrator name
                  <input required autoComplete="name" value={name} onChange={(event) => { setName(event.target.value); setError(''); }} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-[#F26A21] focus:ring-2 focus:ring-orange-100" />
                </label>
                <label className="block text-sm font-semibold text-slate-700">One-time setup code
                  <input required type="password" autoComplete="off" value={setupCode} onChange={(event) => { setSetupCode(event.target.value); setError(''); }} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-[#F26A21] focus:ring-2 focus:ring-orange-100" />
                </label>
              </>}
              <label className="block text-sm font-semibold text-slate-700">Email address
                <input required type="email" autoComplete="username" value={email} onChange={(event) => { setEmail(event.target.value); setError(''); }} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none transition focus:border-[#F26A21] focus:ring-2 focus:ring-orange-100" />
              </label>
              <label className="block text-sm font-semibold text-slate-700">Password
                <span className="relative mt-2 block">
                  <input required minLength={12} type={showPassword ? 'text' : 'password'} autoComplete={isCreatingAccount ? 'new-password' : 'current-password'} value={password} onChange={(event) => { setPassword(event.target.value); setError(''); }} className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 font-normal outline-none transition focus:border-[#F26A21] focus:ring-2 focus:ring-orange-100" />
                  <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((value) => !value)} className="absolute inset-y-0 right-3 text-slate-500 hover:text-slate-800">{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
                </span>
              </label>
              <button disabled={isSubmitting} type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F26A21] px-5 py-3 font-bold text-white transition hover:bg-[#d85813] disabled:cursor-not-allowed disabled:opacity-60">
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}{isSubmitting ? 'Signing in…' : 'Sign In'}
              </button>
              {isCreatingAccount && <p className="text-center text-xs text-slate-500">This setup is available only once. The setup code is checked by the server and never grants a second administrator.</p>}
            </form>
            <button type="button" onClick={() => { setIsCreatingAccount((value) => !value); setError(''); }} className="mt-4 w-full text-center text-sm font-semibold text-[#1E3A8A] hover:underline">
              {isCreatingAccount ? 'Already created the account? Sign in' : 'First time here? Create the initial admin account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
