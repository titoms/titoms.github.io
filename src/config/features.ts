// Feature flags — kept dependency-free so astro.config.ts can import this file
// (constants.ts pulls in image assets, which the config loader cannot bundle).

export const SITE_FEATURES = {
  /** Shop + booking screens and API surface. Flip at Phase 14d go-live. */
  shopBooking: false,
} as const;
