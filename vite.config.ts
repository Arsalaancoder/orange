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
          // Clerk (auth SDK — large, rarely changes)
          if (id.includes('@clerk')) return 'vendor-clerk';
          // Framer Motion (animation library)
          if (id.includes('framer-motion')) return 'vendor-framer';
          // React + ReactDOM core
          if (id.includes('react-dom') || id.includes('react/')) return 'vendor-react';
          // React Router
          if (id.includes('react-router')) return 'vendor-router';
          // Lucide icons
          if (id.includes('lucide-react')) return 'vendor-lucide';
          // All other node_modules
          if (id.includes('node_modules')) return 'vendor-misc';
        },
      },
    },
  },
});

