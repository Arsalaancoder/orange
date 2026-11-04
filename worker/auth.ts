import { betterAuth } from 'better-auth';
import { admin } from 'better-auth/plugins';

export interface AuthEnv {
  DB: D1Database;
  BETTER_AUTH_SECRET?: string;
  BETTER_AUTH_URL?: string;
  AUTH_TRUSTED_ORIGINS?: string;
}

const DEFAULT_TRUSTED_ORIGINS = [
  'https://orangecolleges.com',
  'https://www.orangecolleges.com',
  'http://localhost:5173',
];

/** Create an auth instance from request-scoped Worker bindings. */
export function createAuth(env: AuthEnv, allowInitialSignUp = false) {
  const secret = env.BETTER_AUTH_SECRET;
  const baseURL = env.BETTER_AUTH_URL;

  if (!secret || secret.length < 32) {
    throw new Error('BETTER_AUTH_SECRET must be configured with at least 32 characters.');
  }
  if (!baseURL) {
    throw new Error('BETTER_AUTH_URL must be configured for the API Worker.');
  }

  const trustedOrigins = env.AUTH_TRUSTED_ORIGINS
    ? env.AUTH_TRUSTED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
    : DEFAULT_TRUSTED_ORIGINS;

  return betterAuth({
    appName: 'Orange Paramedical Admin',
    database: env.DB,
    secret,
    baseURL,
    basePath: '/api/auth',
    trustedOrigins,
    emailAndPassword: {
      enabled: true,
      // Normal auth traffic always keeps public registration disabled. The
      // Worker may enable it only for its guarded initial-admin bootstrap.
      disableSignUp: !allowInitialSignUp,
      minPasswordLength: 12,
      maxPasswordLength: 128,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
      cookieCache: { enabled: false },
    },
    advanced: {
      useSecureCookies: baseURL.startsWith('https://'),
      defaultCookieAttributes: {
        httpOnly: true,
        secure: baseURL.startsWith('https://'),
        sameSite: 'lax',
        path: '/',
      },
    },
    plugins: [admin({ defaultRole: 'user', adminRoles: ['admin'] })],
  });
}
