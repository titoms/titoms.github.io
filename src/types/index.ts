export type NavLink = {
  id: string;
  title: string;
  href?: string;
};

export type IconAsset = string;
export type ImageAsset = string;

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

export type ServicePageData = {
  slug: string;
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
  painPoints: string[];
  outcomes: string[];
  included: ServiceIncludedItem[];
  pricing: ServicePricingRow[];
  pricingNote?: string;
  goodFit?: string[];
  notAFit?: string[];
  processSteps?: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
};
