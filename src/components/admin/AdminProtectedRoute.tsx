import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/auth/useAdminAuth';

interface Props {
  children: React.ReactNode;
}

export function AdminProtectedRoute({ children }: Props) {
  const { isLoaded, isSignedIn, isAdmin, error } = useAdminAuth();

  // Wait for the Better Auth session lookup before deciding access.
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
            <div className="absolute inset-0 rounded-full border-4 border-t-[#F26A21] animate-spin" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 tracking-tight">Verifying Session</p>
            <p className="text-xs text-slate-500 mt-0.5">Authenticating your administrator credentials…</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div role="alert" className="min-h-screen flex items-center justify-center p-6 text-center text-slate-700">Unable to verify the administrator session. Check the API connection and try again.</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return <div role="alert" className="min-h-screen flex items-center justify-center p-6 text-center text-slate-700">This account is not authorized to access the administrator portal.</div>;
  }

  return <>{children}</>;
}
