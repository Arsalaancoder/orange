# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
# Orange Paramedical

## Administrator authentication (Better Auth)

The admin portal uses Better Auth email/password sessions stored in the existing Cloudflare D1 database. Normal public signup is disabled. A one-time setup-code flow is available to create the first administrator only: the Worker validates the secret, checks for an existing admin, and atomically grants the admin role to at most one account. Admin API requests still require a valid HttpOnly session cookie and a server-side `admin` role; frontend route checks only control navigation.

### Local development

1. Copy `.env.example` to `.env.local` and keep the API URLs set to `/api`.
2. Copy `worker/.dev.vars.example` to `worker/.dev.vars`; set `BETTER_AUTH_SECRET` to a random value with at least 32 characters. Do not commit either local file.
3. Run the API Worker with `npx wrangler dev --config worker/wrangler.jsonc --port 8787`.
4. In another terminal, run `npm run dev`.

The local Worker uses local D1 state by default. Apply the migration locally with `npx wrangler d1 migrations apply orange-paramedical-db --local --config worker/wrangler.jsonc` before testing sign-in.

Provision a local administrator with Better Auth's CLI (the CLI defaults to local D1 and will prompt for a password):

```sh
npx auth@1.7.15 create-admin --config worker/auth.cli.ts --email your-admin-email@example.com --name "Orange Administrator" --role admin
```

### Production configuration

Configure these **repository Actions secrets**:

- `CLOUDFLARE_API_TOKEN` — Cloudflare token with Workers Scripts edit, D1 edit, R2 access needed for deploy/bindings, and zone permissions needed to bind the API custom domain.
- `BETTER_AUTH_SECRET` — a high-entropy secret of at least 32 characters. Generate it securely (for example, `npx auth@1.7.15 secret`) and add it directly in GitHub Settings → Secrets and variables → Actions. Do not put it in source control or print it.
- `BOOTSTRAP_ADMIN_CODE` — optional, high-entropy one-time setup code of at least 32 characters. Add it as a GitHub Actions repository secret before deployment to enable first-admin signup. It is used only by the guarded bootstrap endpoint, never logged, and becomes unusable after the first admin exists. Remove the GitHub secret and delete the Worker secret after setup (`npx wrangler secret delete BOOTSTRAP_ADMIN_CODE --config worker/wrangler.jsonc`).

The API Worker uses `https://api.orangecolleges.com` as its Better Auth URL, and the frontend calls `https://api.orangecolleges.com/api`. `worker/wrangler.jsonc` configures that API custom domain, the existing D1 database and the existing R2 bucket. Trusted origins are limited to the production site and local Vite origin. If the production website host changes, update `AUTH_TRUSTED_ORIGINS` in that Worker config.

On each `main` deployment, Actions builds the static bundle, exports production D1 to a short-lived private workflow artifact, applies additive Better Auth migrations, publishes `BETTER_AUTH_SECRET` to the API Worker without echoing it, then deploys the API and website Workers. The artifact contains a database export (including CMS records and any auth records), is retained for seven days, and is available to repository collaborators with Actions artifact access.

### Provision the first administrator

On `/admin/login`, choose **First time here? Create the initial admin account** and enter the setup code, owner-controlled name/email, and a unique password of at least 12 characters. The code is never sent to normal Better Auth signup; the regular signup endpoint remains disabled. Only one account can be promoted to admin, including if two setup requests race. After setup, remove `BOOTSTRAP_ADMIN_CODE` from GitHub Actions and delete it from the Worker as shown above. You can also use the CLI method below.

The CLI config defaults to local D1. Production provisioning requires an explicit remote-binding opt-in and a Wrangler login to the correct Cloudflare account. Keep the Better Auth secret available through the untracked `worker/.dev.vars` file or `BETTER_AUTH_SECRET` process environment, then run:

```powershell
$env:BETTER_AUTH_REMOTE_BINDINGS = 'true'
npx auth@1.7.15 create-admin --config worker/auth.cli.ts --email your-admin-email@example.com --name "Orange Administrator" --role admin
Remove-Item Env:BETTER_AUTH_REMOTE_BINDINGS
```

The CLI prompts for the password. Use a unique password and do not pass it on the command line. The email must be an owner-controlled account. Better Auth rejects duplicate emails; do not use a force option to bypass the existing-user check. Public signup remains disabled. Passwords from the previous identity provider cannot be reused automatically.

### Password recovery

No transactional email provider or `sendResetPassword` handler is configured, so the project does not expose a fake password-reset link or email reset flow. For a locked-out account, provision a separate owner-controlled recovery administrator through the Better Auth CLI, then sign in with it. From that authenticated admin session, use Better Auth's Admin plugin endpoints to locate the exact account (`GET /api/auth/admin/list-users` with an exact email filter), set its role (`POST /api/auth/admin/set-role`), and set a new password (`POST /api/auth/admin/set-user-password`). Both mutation endpoints require the admin session cookie; the password endpoint uses Better Auth's password hashing. Confirm the target user ID and owner-controlled email before each operation, and remove the temporary recovery admin when recovery is complete. Do not edit password hashes directly in D1.

### Deployment verification

After Actions finishes, verify that both `orange` and `orange-paramedical-api` have current Cloudflare deployments, that `https://api.orangecolleges.com/api/auth/get-session` responds without a Worker error, and that `/admin/login` accepts only the provisioned admin account. Test an unauthenticated request to `/api/admin/news` returns `401`, and a signed-in non-admin request returns `403`.
