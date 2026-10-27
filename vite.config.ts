import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
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
        target: 'https://orange-paramedical-api.orange-paramedical.workers.dev',
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
});

