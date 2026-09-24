import { useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from '@/components/admin/ui/toast';
import './index.css';
import App from './App';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY');
}

function ClerkWithRouter() {
  const navigate = useNavigate();

  const routerPush = useCallback(
    (to: string) => {
      navigate(to);
    },
    [navigate]
  );

  const routerReplace = useCallback(
    (to: string) => {
      navigate(to, { replace: true });
    },
    [navigate]
  );

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      routerPush={routerPush}
      routerReplace={routerReplace}
      signInUrl="/admin/login"
      afterSignOutUrl="/admin/login"
    >
      <HelmetProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </HelmetProvider>
    </ClerkProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ClerkWithRouter />
  </BrowserRouter>
);
