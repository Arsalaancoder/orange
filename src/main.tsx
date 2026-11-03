import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider } from '@/components/admin/ui/toast';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <HelmetProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </HelmetProvider>
  </BrowserRouter>
);
