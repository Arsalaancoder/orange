import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const DEFAULT_CLERK_KEY = 'pk_live_Y2xlcmsub3JhbmdlY29sbGVnZXMuY29tJA';
  const rawKey = (process.env.VITE_CLERK_PUBLISHABLE_KEY || '').trim() || (env.VITE_CLERK_PUBLISHABLE_KEY || '').trim();
  const publishableKey = rawKey || DEFAULT_CLERK_KEY;

  if (mode === 'production') {
    const keyBody = publishableKey?.match(/^pk_live_([A-Za-z0-9_-]+)$/)?.[1];
    let frontendApi: string | undefined;

    if (keyBody) {
      try {
        frontendApi = Buffer.from(keyBody, 'base64').toString('utf8');
      } catch {
        // Report the same safe configuration error as malformed key formats.
      }
    }

    if (!frontendApi?.endsWith('$') || frontendApi.length < 3) {
      throw new Error(
        'Production build blocked: set the GitHub Actions secret VITE_CLERK_PUBLISHABLE_KEY to a valid Clerk pk_live_ publishable key. The key value is never printed.'
      );
    }
  }

  return {
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    watch: {
      ignored: ['**/.wrangler/**', '**/worker/**', '**/dist/**', '**/*.log'],
    },
    proxy: {
      '/api': {
        target: process.env.VITE_DEV_API_TARGET || 'https://orange-paramedical-api.orange-paramedical.workers.dev',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    // Raise the warning threshold slightly — vendor chunks are expected to be large
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          // Clerk auth SDK (large, changes independently)
          if (id.includes('@clerk')) return 'vendor-clerk';
          // Framer Motion animation library
          if (id.includes('framer-motion')) return 'vendor-framer';
          // React Router
          if (id.includes('react-router')) return 'vendor-router';
          // Lucide icons (tree-shaken per page)
          if (id.includes('lucide-react')) return 'vendor-lucide';
          // Everything else in node_modules into one cached vendor bundle
          // (avoids circular dependency between react-dom and misc)
          return 'vendor';
        },
      },
    },
  },
  };
});

