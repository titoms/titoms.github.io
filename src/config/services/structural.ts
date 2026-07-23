import { STRIPE_PAYMENT_LINKS } from '../constants';

export type ServiceStructural = {
  slug: string;
  stripeLink?: string;
};

export const servicesStructural: ServiceStructural[] = [
  { slug: 'ai-web-development-newsletter', stripeLink: STRIPE_PAYMENT_LINKS.newsletter },
  { slug: 'web-project-coaching', stripeLink: STRIPE_PAYMENT_LINKS.coaching1h },
  { slug: 'full-stack-development-day', stripeLink: STRIPE_PAYMENT_LINKS.developmentDay },
  { slug: 'mvp-bootstrapping-workshop', stripeLink: STRIPE_PAYMENT_LINKS.mvpWorkshop },
  { slug: 'mvp-development' },
];
