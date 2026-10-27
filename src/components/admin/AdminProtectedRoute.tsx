import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

interface Props {
  children: React.ReactNode;
}

export function AdminProtectedRoute({ children }: Props) {
  const { isLoaded, isSignedIn } = useAuth();

  // Clerk is still initialising — show branded spinner; no artificial timeout
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

  if (!isSignedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
