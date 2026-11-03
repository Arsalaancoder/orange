import { getPlatformProxy } from 'wrangler';
import { fileURLToPath } from 'node:url';
import { createAuth, type AuthEnv } from './auth.ts';

const configPath = fileURLToPath(new URL('./wrangler.jsonc', import.meta.url));
// Default to local D1. Remote provisioning must be explicitly selected to
// prevent a local `create-admin` command from silently targeting production.
const remoteBindings = process.env.BETTER_AUTH_REMOTE_BINDINGS === 'true';
const platform = await getPlatformProxy({ configPath, remoteBindings });

// The Better Auth CLI loads this file to provision the first admin account.
// Put the same BETTER_AUTH_SECRET in the untracked .dev.vars file or process
// environment; never commit it or pass it as a command-line argument.
const authEnv = platform.env as unknown as AuthEnv;
const auth = createAuth({
  ...authEnv,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET || authEnv.BETTER_AUTH_SECRET,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || authEnv.BETTER_AUTH_URL || (
    remoteBindings ? 'https://api.orangecolleges.com' : 'http://localhost:8787'
  ),
});

export { auth };
export default auth;
