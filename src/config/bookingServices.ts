// Bookable services — REFONTE prices are canonical (the handoff prototype's
// prices are stale; do not copy them). Prices in EUR cents. The server
// re-derives amounts and durations from this file for every booking.

export interface BookingService {
  id: string;
  title: string;
  durationMin: number;
  durationLabel: string;
  /** EUR cents; null = custom quote (no calendar flow) */
  priceCents: number | null;
  description: string;
  category: 'coaching' | 'development' | 'workshop' | 'custom';
  featured?: boolean;
}

export const BOOKING_SERVICES: BookingService[] = [
  {
    id: 'coach-1h',
    title: '1-Hour Coaching',
    durationMin: 60,
    durationLabel: '1 hour',
    priceCents: 9000,
    description: 'Debug, clarify and structure your React/Node/AI-generated project.',
    category: 'coaching',
  },
  {
    id: 'coach-half',
    title: 'Half-Day Coaching / Consulting',
    durationMin: 240,
    durationLabel: '4 hours',
    priceCents: 30000,
    description: 'A focused half-day block to work through a specific technical or product problem.',
    category: 'coaching',
  },
  {
    id: 'coach-full',
    title: 'Full-Day Coaching / Consulting',
    durationMin: 480,
    durationLabel: '8 hours',
    priceCents: 55000,
    description: 'A full day of dedicated coaching across architecture, code review and planning.',
    category: 'coaching',
  },
  {
    id: 'dev-half',
    title: 'Half-Day Development',
    durationMin: 240,
    durationLabel: '4 hours',
    priceCents: 35000,
    description: 'Focused hands-on build time for a clear feature, fix or refactor.',
    category: 'development',
  },
  {
    id: 'dev-full',
    title: 'Full-Day Development',
    durationMin: 480,
    durationLabel: '8 hours',
    priceCents: 60000,
    description: 'A full day of hands-on development — feature, dashboard or integration.',
    category: 'development',
  },
  {
    id: 'ai-workshop',
    title: 'AI Clarity / Bootstrapping Workshop',
    durationMin: 480,
    durationLabel: '1 day',
    priceCents: 65000,
    description: 'Turn an idea into a scoped MVP plan: user flows, stack, roadmap and budget.',
    category: 'workshop',
    featured: true,
  },
  {
    id: 'custom',
    title: 'Custom Time-Based Service',
    durationMin: 0,
    durationLabel: 'Varies',
    priceCents: null,
    description: "Something more specific? Tell me about it and I'll propose a scope and time.",
    category: 'custom',
  },
];

export const getBookingService = (id: string): BookingService | undefined =>
  BOOKING_SERVICES.find((s) => s.id === id);

export const formatBookingPrice = (cents: number | null): string =>
  cents === null ? 'Custom quote' : `€${(cents / 100).toFixed(2).replace(/\.00$/, '')}`;
