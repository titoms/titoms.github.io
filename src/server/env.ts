/// <reference types="@cloudflare/workers-types" />

// Shared Worker environment type. Bindings/secrets are optional so tests and
// partial environments typecheck; each route validates what it needs.

export interface Env {
  ASSETS: Fetcher;

  // Phase 14 bindings (wrangler.jsonc)
  DB?: D1Database;
  HOLDS?: KVNamespace;
  DOWNLOADS?: R2Bucket;

  // Newsletter (existing)
  BEEHIIV_API_KEY?: string;
  BEEHIIV_PUBLICATION_ID?: string;
  BEEHIIV_API_BASE_URL?: string;
  DEBUG_BEEHIIV?: string;
  BEEHIIV_CUSTOM_FIELDS_ENABLED?: string;

  // Phase 14 secrets
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  /** HMAC key for stateless tokens (download links, booking manage links) */
  TOKEN_SECRET?: string;
  RESEND_API_KEY?: string;
  EMAIL_FROM?: string;
  ADMIN_EMAIL?: string;
  GOOGLE_SERVICE_ACCOUNT_EMAIL?: string;
  GOOGLE_PRIVATE_KEY_B64?: string;
  GOOGLE_CALENDAR_ID?: string;

  // Dev convenience
  DEBUG_EMAIL_LINKS?: string;
}

/** Secret used to HMAC-sign stateless tokens (download links, manage links). */
export const tokenSecret = (env: Env): string =>
  env.TOKEN_SECRET || env.STRIPE_SECRET_KEY || "dev-only-insecure-secret";
