/** Public commercial amounts, in EUR cents.
 *
 * Coaching half-day/full-day rates intentionally stay separate from
 * development half-day/full-day rates in bookingServices.ts.
 */
export const COMMERCIAL_PRICING = {
  coachingHourlyCents: 9000,
  developmentHalfDayCents: 35000,
  developmentDayCents: 60000,
  aiClarityDayFromCents: 75000,
  scopedMvpFromCents: 450000,
  broaderWebMvpStartingBudgetCents: 750000,
} as const;

export const formatEur = (cents: number): string =>
  `€${(cents / 100).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
