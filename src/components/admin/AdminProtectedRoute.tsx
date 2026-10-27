import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

interface Props {
  children: React.ReactNode;
}

export function AdminProtectedRoute({ children }: Props) {
  const { isLoaded, isSignedIn } = useAuth();

  // If Clerk never loads within 8s (missing key / unauthorized domain),
  // redirect to login page which shows the helpful error card.
  const [clerkTimeout, setClerkTimeout] = useState(false);
  useEffect(() => {
    if (isLoaded) return;
    const t = setTimeout(() => setClerkTimeout(true), 8000);
    return () => clearTimeout(t);
  }, [isLoaded]);

  // Still waiting on Clerk
  if (!isLoaded && !clerkTimeout) {
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

  // Clerk timed out → redirect to login which shows the config error UI
  if (!isLoaded && clerkTimeout) {
    return <Navigate to="/admin/login" replace />;
  }

  // Not signed in → go to login
  if (!isSignedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
