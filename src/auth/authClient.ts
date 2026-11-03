import { createAuthClient } from 'better-auth/react';
import { adminClient } from 'better-auth/client/plugins';

const apiBaseUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '/api';
const apiOrigin = apiBaseUrl.startsWith('/')
  ? window.location.origin
  : new URL(apiBaseUrl).origin;

export const authClient = createAuthClient({
  baseURL: apiOrigin,
  basePath: '/api/auth',
  plugins: [adminClient()],
});
