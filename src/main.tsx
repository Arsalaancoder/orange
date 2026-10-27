import { useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from '@/components/admin/ui/toast';
import './index.css';
import App from './App';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;

// Warn in console but don't throw — a hard throw crashes the ENTIRE app
// (white screen for all visitors) if the env var is ever missing in CI.
if (!PUBLISHABLE_KEY) {
  console.error(
    '[Orange CMS] VITE_CLERK_PUBLISHABLE_KEY is not set. ' +
    'Admin authentication will not work. ' +
    'Add this env var to your Cloudflare Pages / GitHub Actions secrets.'
  );
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

  // If the key is missing, render the app without Clerk so the public site
  // still works. Admin routes will redirect to the login page.
  if (!PUBLISHABLE_KEY) {
    return (
      <HelmetProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </HelmetProvider>
    );
  }

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
