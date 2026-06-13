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

Optional variables:

```text
BEEHIIV_API_BASE_URL=https://api.beehiiv.com
DEBUG_BEEHIIV=true
BEEHIIV_CUSTOM_FIELDS_ENABLED=true
```

For Cloudflare, add these as Worker secrets/environment variables:

```text
BEEHIIV_API_KEY
BEEHIIV_PUBLICATION_ID
BEEHIIV_API_BASE_URL
DEBUG_BEEHIIV
BEEHIIV_CUSTOM_FIELDS_ENABLED
```

Do not use `PUBLIC_` prefixes for beehiiv values. `PUBLIC_` Astro variables are bundled into frontend code.

`BEEHIIV_API_BASE_URL` can be omitted unless beehiiv changes its host. If it is set, use the host only:

```text
https://api.beehiiv.com
```

Do not set it to a subscriptions endpoint. The Worker appends:

```text
/v2/publications/{publicationId}/subscriptions
```

To temporarily debug beehiiv configuration in Cloudflare:

1. Set `DEBUG_BEEHIIV=true` on the Worker.
2. Redeploy if the Cloudflare UI requires it for variable changes.
3. Run the PowerShell smoke tests below.
4. Remove `DEBUG_BEEHIIV` or set it to `false` before production use.
5. Redeploy again if needed.

Debug mode never returns the API key, but it can return a sanitized beehiiv error body. Keep it disabled outside short troubleshooting windows.

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

The Worker first sends the minimal beehiiv subscription payload:

```json
{
  "email": "user@example.com",
  "reactivate_existing": false,
  "send_welcome_email": false,
  "utm_source": "cloudflare-test",
  "utm_medium": "organic",
  "utm_campaign": "ai_clarity_newsletter",
  "double_opt_override": "not_set"
}
```

Do not enable custom fields until the minimal subscription works.

To use optional custom fields:

1. In beehiiv, open `Audience  Custom Fields  Create field`.
2. Create `Interest` as Text/String.
3. Create `Source` as Text/String.
4. Make sure the API key can read custom fields if you plan to call `/api/newsletter/custom-fields`.
5. Set `BEEHIIV_CUSTOM_FIELDS_ENABLED=true` in Cloudflare only after the fields exist.

beehiiv discards custom fields that do not already exist in the publication. The Worker checks for `Interest` before sending custom fields, and only sends `Source` when that field exists too.

## PowerShell smoke tests

Use the deployed temporary Worker URL first. These commands are safe to run from PowerShell and do not expose secrets.

```powershell
Invoke-RestMethod -Uri "https://fullstackchris.christophe-crognier.workers.dev/api/health" -Method GET
```

```powershell
Invoke-RestMethod -Uri "https://fullstackchris.christophe-crognier.workers.dev/api/newsletter/debug-config" -Method GET
```

```powershell
Invoke-RestMethod -Uri "https://fullstackchris.christophe-crognier.workers.dev/api/newsletter/subscribe" -Method POST -ContentType "application/json" -Body '{"email":"test@example.com","source":"cloudflare-test","interest":"AI workflows","honeypot":""}'
```

When `DEBUG_BEEHIIV=true`, a failing subscription response may include:

```json
{
  "success": false,
  "message": "We could not subscribe you right now. Please try again later.",
  "debug": {
    "beehiivStatus": 401,
    "beehiivBody": "..."
  }
}
```

If debug mode is disabled, the public frontend response remains generic.

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
