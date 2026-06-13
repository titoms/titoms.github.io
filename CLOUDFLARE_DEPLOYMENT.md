# Cloudflare Workers Static Assets Deployment

This site is an Astro static build served by a Cloudflare Worker with Static Assets. The Worker also owns API routes such as `/api/health` and `/api/newsletter/subscribe`.

Do not deploy from this document until the Cloudflare temporary URL has been tested. Keep GitHub Pages active during the migration.

## Cloudflare setup

Cloudflare build settings:

```text
Build command:
pnpm run build

Deploy command:
pnpm exec wrangler deploy
```

If Cloudflare asks for a non-production branch deploy command:

```text
pnpm exec wrangler versions upload
```

The static asset output directory is configured in `wrangler.jsonc`, not in the Cloudflare UI:

```jsonc
"assets": {
  "binding": "ASSETS",
  "directory": "./dist"
}
```

`assets.directory` must stay as `./dist` because Astro builds to `dist`.

## Local test

Install dependencies:

```bash
pnpm install
```

Build and run the Worker locally:

```bash
pnpm run build
pnpm exec wrangler dev
```

Or use the combined script:

```bash
pnpm run cf:dev
```

Then test:

```text
/
/api/health
/api/newsletter/subscribe
```

Expected health response:

```json
{ "ok": true, "service": "fullstackchris-api" }
```

## Secrets

Do not commit secrets.

For local Worker development:

1. Copy `.dev.vars.example` to `.dev.vars`.
2. Fill real values locally.
3. Keep `.dev.vars` uncommitted.

Required variables:

```text
BEEHIIV_API_KEY
BEEHIIV_PUBLICATION_ID
```

Optional variable:

```text
BEEHIIV_API_BASE_URL=https://api.beehiiv.com
```

For Cloudflare, add these as Worker secrets/environment variables:

```text
BEEHIIV_API_KEY
BEEHIIV_PUBLICATION_ID
BEEHIIV_API_BASE_URL
```

Do not use `PUBLIC_` prefixes for beehiiv values. `PUBLIC_` Astro variables are bundled into frontend code.

## Newsletter endpoint

The custom form posts to:

```text
POST /api/newsletter/subscribe
```

The browser only sends form data. The Worker calls beehiiv server-side using the private API key.

Success copy intentionally says:

```text
Check your inbox to confirm your subscription.
```

This remains correct if beehiiv double opt-in is enabled and the subscriber is pending confirmation.

## Domain migration

Keep GitHub Pages active during testing.

Test on the Cloudflare temporary domain first. Do not change DNS until:

- Homepage works.
- Images work.
- Legal pages work.
- `/api/health` works.
- Newsletter endpoint works with a test email.
- No beehiiv API key appears in built frontend files.

Only then connect `fullstackchris.dev` to Cloudflare.

After the migration is complete, remove the custom domain from GitHub Pages so both platforms do not compete for the same hostname.

## Image checks

Astro emits imported `src/assets` images under `dist/_astro`.

Files in `public/` must be referenced from root:

```text
public/og-image.png -> /og-image.png
public/favicon.ico -> /favicon.ico
```

Never reference `/public/...` from app code.

If images are broken on Cloudflare:

1. Confirm `pnpm run build` produced `dist/_astro`.
2. Confirm `wrangler.jsonc` points to `./dist`.
3. Open the failed image URL in the browser network tab.
4. If a URL contains an old repo base path, remove any stale Astro `base` config.
5. Redeploy after confirming the full `dist` directory is uploaded.
