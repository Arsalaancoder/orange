import React, { useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from '@/components/admin/ui/toast';
import { SiteContentProvider } from '@/context/SiteContentContext';
import { AdminAuthProvider } from '@/auth/adminAuth';
import './index.css';
import App from './App';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

interface SafeClerkProps {
  children: React.ReactNode;
  routerPush: (to: string) => void;
  routerReplace: (to: string) => void;
}

class SafeClerkBoundary extends React.Component<SafeClerkProps, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('[Clerk] Safe boundary caught an authentication error, falling back to local admin auth:', error);
  }

  render() {
    if (this.state.hasError || !PUBLISHABLE_KEY) {
      return <>{this.props.children}</>;
    }

    try {
      return (
        <ClerkProvider
          publishableKey={PUBLISHABLE_KEY}
          routerPush={this.props.routerPush}
          routerReplace={this.props.routerReplace}
          signInUrl="/admin/login"
          afterSignOutUrl="/admin/login"
        >
          {this.props.children}
        </ClerkProvider>
      );
    } catch (err) {
      console.warn('[Clerk] Initialization error:', err);
      return <>{this.props.children}</>;
    }
  }
}

function ClerkWithRouter() {
  const navigate = useNavigate();
  const routerPush = useCallback(
    (to: string) => { navigate(to); },
    [navigate]
  );

  const routerReplace = useCallback(
    (to: string) => { navigate(to, { replace: true }); },
    [navigate]
  );

  return (
    <SafeClerkBoundary routerPush={routerPush} routerReplace={routerReplace}>
      <AdminAuthProvider>
        <SiteContentProvider>
          <HelmetProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </HelmetProvider>
        </SiteContentProvider>
      </AdminAuthProvider>
    </SafeClerkBoundary>
  );
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ClerkWithRouter />
  </BrowserRouter>
);
