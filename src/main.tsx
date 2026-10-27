import { useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from '@/components/admin/ui/toast';
import './index.css';
import App from './App';

// VITE_CLERK_PUBLISHABLE_KEY is read from the committed .env file during build.
// Do NOT pass it as a GitHub Actions env var unless the secret is definitely set —
// an unset GitHub secret evaluates to "" which overrides the .env value.
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

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

  // Always render ClerkProvider — even if the key is missing.
  // Omitting ClerkProvider causes useAuth() to return { isLoaded: false }
  // forever, which shows an infinite loading spinner on every admin page.
  // When the key is missing/invalid, Clerk itself will surface an error that
  // the ErrorBoundary (App.tsx) will catch and display clearly.
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY || 'missing-key'}
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
