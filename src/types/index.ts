export type NavLink = {
  id: string;
  title: string;
  href?: string;
};

import type { ImageMetadata } from 'astro';

export type IconAsset = ImageMetadata | string;
export type ImageAsset = ImageMetadata | string;

export type Service = {
  title: string;
  icon: IconAsset;
};

export type WorkMode = {
  title: string;
  description: string;
  outcome: string;
};

export type BuildStat = {
  value: string;
  label: string;
  description: string;
};

export type ServiceOffer = {
  title: string;
  description: string;
  price: string;
  priceUnit?: string;
  badge?: string;
  featured?: boolean;
};

export type ProcessItem = {
  title: string;
  description: string;
};

export type PricingPlan = {
  title: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
  featured?: boolean;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type FooterGroup = {
  title: string;
  links: NavLink[];
};

export type Technology = {
  name: string;
  icon: IconAsset;
};

export type Experience = {
  title: string;
  company_name: string;
  icon: IconAsset;
  iconBg: string;
  date: string;
  points: string[];
};

export type Testimonial = {
  testimonial: string;
  name: string;
  designation: string;
  company: string;
  image: string;
};

export type ProjectTag = {
  name: string;
  color: string;
};

export type ProjectCaseStudy = {
  tagline: string;
  problem: string;
  context: string;
  technicalChallenges: string[];
  architecture: string;
  implementation: string;
  results: string[];
  lessonsLearned: string[];
};

export type ProjectMeta = {
  role: string;
  timeline: string;
  platform: string;
  type: string;
};

export type ProjectFlowStep = {
  step: string;
  title: string;
  description: string;
};

export type ProjectFeature = {
  title: string;
  description: string;
  bullets: string[];
};

export type ProjectStackCategory = {
  label: string;
  chips: string[];
};

export type ProjectProve = {
  iconKey: string;
  title: string;
  description: string;
};

export type ProjectPainPoint = {
  bold: string;
  rest: string;
};

export type ProjectAudienceStat = {
  value: string;
  label: string;
};

export type Project = {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  caseStudy: ProjectCaseStudy;
  tags: ProjectTag[];
  image: ImageAsset | null;
  images: ImageAsset[];
  source_code_link: string;
  live_link?: string;
  meta: ProjectMeta;
  painPoints: ProjectPainPoint[];
  audienceWho: string;
  audienceDesc: string;
  audienceStats: ProjectAudienceStat[];
  productFlow: ProjectFlowStep[];
  features: ProjectFeature[];
  stack: ProjectStackCategory[];
  proves: ProjectProve[];
  nextProjectSlug?: string;
};

export type MotionDirection = "left" | "right" | "up" | "down" | "";

export type ServicePricingRow = {
  label: string;
  price: string;
  featured?: boolean;
};

export type ServiceIncludedItem = {
  title: string;
  description: string;
};

export type ServiceHeroCard = {
  type: 'chips' | 'checklist' | 'investment' | 'info';
  title: string;
  items?: string[];
  leaveWith?: string;
  leaveWithItems?: string[];
  amount?: string;
  note?: string;
  footer?: string;
  description?: string;
  whenTitle?: string;
  whenItems?: string[];
};

export type ServicePageData = {
  slug: string;
  title: string;
  meta: {
    title: string;
    description: string;
  };
  badge: string;
  hero: {
    h1: string;
    subtitle: string;
    primaryCta: string;
    primaryCtaHref?: string;
    secondaryCta?: string;
    secondaryCtaHref?: string;
  };
  answer?: string;
  painPoints: string[];
  outcomes: string[];
  useCases?: string[];
  included: ServiceIncludedItem[];
  pricing: ServicePricingRow[];
  pricingNote?: string;
  stripeLink?: string;
  goodFit?: string[];
  notAFit?: string[];
  processSteps?: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  heroCard?: ServiceHeroCard;
};

export type BlogArticle = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  comingSoon?: boolean;
};
