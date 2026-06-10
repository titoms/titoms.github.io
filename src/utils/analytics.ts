declare global {
  interface Window {
    // Cloudflare Web Analytics beacon
    __cfBeacon?: { push: (args: Record<string, unknown>) => void };
  }
}

/**
 * Fire a named analytics event. Called on key user interactions:
 * newsletter_signup, cta_click, stripe_click.
 * Cloudflare Web Analytics custom events require a paid plan;
 * swap the body here to add any other provider (Plausible, Umami…).
 */
export function trackEvent(name: string, properties?: Record<string, string>): void {
  if (typeof window === 'undefined') return;
  try {
    window.__cfBeacon?.push({ type: 'event', name, ...properties });
  } catch {
    // Analytics must never break the UI
  }
}
