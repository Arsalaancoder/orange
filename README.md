# Orange Paramedical

## Administrator authentication

The React admin portal signs in with Clerk. The API Worker verifies each Bearer session token with Clerk's backend SDK and requires the signed session claim `metadata.role` to equal `admin`. Public signup must also be disabled in Clerk Dashboard.

### Local development

1. Set `VITE_CLERK_PUBLISHABLE_KEY` in the ignored root `.env.local` file using the Clerk development instance's publishable key (`pk_test_...`). Set `VITE_API_URL=/api` and `VITE_API_BASE_URL=/api` there as well.
2. Set `CLERK_SECRET_KEY` in ignored `worker/.dev.vars` using the matching Clerk development instance secret key (`sk_test_...`). Never use a `VITE_` name for this key.
3. In one terminal run `npx wrangler dev --config worker/wrangler.jsonc --port 8787`. In another run `npm run dev`.

Vite proxies `/api` to the local API Worker, which uses the local D1 database and configured R2 binding. The existing D1 data and migrations are retained.

### Clerk Dashboard setup

In Clerk Dashboard, add a custom session token claim:

```json
{"metadata":"{{user.public_metadata}}"}
```

Set the intended administrator's **Public metadata** to include `{"role":"admin"}`. Public metadata is included in the signed session token; the Worker checks it on every `/api/admin/**` request. Keep all other users without that role. Set signup access to Invite-only or Waitlist so visitors cannot create accounts. The sign-in widget also hides its signup option.

Use the same Clerk instance for the frontend publishable key and API Worker secret key. For production, make sure the Clerk production instance and its custom Frontend API domain are active and resolve correctly before switching the production site to it.

### Production deployment configuration

Configure these repository Actions secrets:

- `VITE_CLERK_PUBLISHABLE_KEY` — production Clerk publishable key beginning `pk_live_`; passed only to the Vite production build.
- `CLERK_SECRET_KEY` — matching production Clerk secret key beginning `sk_live_`; stored only as a secret on the API Worker.
- `CLOUDFLARE_API_TOKEN` — token authorized to update the API and static Workers.

The API Worker uses `CLERK_AUTHORIZED_PARTIES` from `worker/wrangler.jsonc` to restrict accepted session origins. Its existing D1 database and R2 bucket bindings remain configured there. The workflow deploys the API Worker and static website Worker on pushes to `main`; it does not apply or reset D1 migrations.
