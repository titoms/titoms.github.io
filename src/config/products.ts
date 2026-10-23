// Shop catalog — the ONLY source of truth for product pricing (server re-validates
// every amount from this file; client-submitted prices are never trusted).
// Prices are in EUR cents. Downloadable files live in the R2 DOWNLOADS bucket
// under `fileKey` — never commit product files to the repo.

export type ProductCategory = 'Freebies' | 'Templates' | 'Design Systems' | 'Others';

export interface ProductFaq {
  q: string;
  a: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: ProductCategory;
  /** EUR cents; 0 = free (email-gated lead magnet) */
  priceCents: number;
  compareAtPriceCents?: number;
  tagline: string;
  description: string;
  whatsIncluded: string[];
  goodFit: string[];
  notFit: string[];
  techSpecs: { label: string; value: string }[];
  license: string;
  faqs: ProductFaq[];
  /** R2 object key, e.g. "products/ds-violet.zip" */
  fileKey: string;
  /** Popularity weight for the default sort (higher = first) */
  popular: number;
  /** YYYYMMDD for the "newest" sort */
  addedDate: number;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = ['Freebies', 'Templates', 'Design Systems', 'Others'];

const CATEGORY_SLUGS: Record<ProductCategory, string> = {
  'Freebies': 'freebies',
  'Templates': 'templates',
  'Design Systems': 'design-systems',
  'Others': 'others',
};

export const categoryToSlug = (category: ProductCategory): string => CATEGORY_SLUGS[category];
export const slugToCategory = (slug: string): ProductCategory | null => {
  const entry = Object.entries(CATEGORY_SLUGS).find(([, value]) => value === slug);
  return entry ? (entry[0] as ProductCategory) : null;
};

export const PRODUCTS: Product[] = [
  {
    id: 'fb-starter',
    slug: 'astro-landing-starter-kit',
    title: 'Astro Landing Starter Kit',
    category: 'Freebies',
    priceCents: 0,
    tagline: 'A clean Astro + Tailwind landing page starter with SEO wired in.',
    description: 'The exact starting point I use for fast marketing sites: Astro 6, Tailwind, sitemap, OpenGraph and a page structure that converts.',
    whatsIncluded: ['Astro 6 + Tailwind project', 'Base layout with SEO/OG tags', 'Hero, features, pricing and FAQ sections', 'Sitemap + robots ready'],
    goodFit: ['Founders launching a landing page', 'Developers who want a clean Astro base'],
    notFit: ['Full web applications', 'CMS-driven sites'],
    techSpecs: [
      { label: 'Stack', value: 'Astro 6, Tailwind CSS, TypeScript' },
      { label: 'Format', value: 'ZIP (source code)' },
    ],
    license: 'Personal + commercial projects, no resale as-is.',
    faqs: [
      { q: 'Is it really free?', a: 'Yes. Drop your email and the download link is yours.' },
      { q: 'Can I use it for client work?', a: 'Yes, commercial projects are allowed. Reselling the starter itself is not.' },
    ],
    fileKey: 'products/fb-starter.zip',
    popular: 90,
    addedDate: 20260701,
  },
  {
    id: 'fb-cheatsheet',
    slug: 'tailwind-component-cheatsheet',
    title: 'Tailwind Component Cheatsheet',
    category: 'Freebies',
    priceCents: 0,
    tagline: 'A printable reference of the component patterns I reuse constantly.',
    description: 'Cards, navbars, pricing tables, modals, drawers — copy-paste-ready Tailwind snippets following a consistent dark design system.',
    whatsIncluded: ['PDF + HTML versions', '40+ component snippets', 'Dark theme tokens'],
    goodFit: ['Developers learning Tailwind', 'Anyone prototyping quickly'],
    notFit: ['Non-Tailwind projects'],
    techSpecs: [
      { label: 'Format', value: 'PDF + HTML' },
    ],
    license: 'Free for any use, attribution appreciated.',
    faqs: [
      { q: 'Which Tailwind version?', a: 'Snippets target Tailwind 3.x and work with v4 for the classes used.' },
    ],
    fileKey: 'products/fb-cheatsheet.zip',
    popular: 75,
    addedDate: 20260615,
  },
  {
    id: 'fb-prompts',
    slug: 'cursor-claude-prompt-pack',
    title: 'Cursor & Claude Prompt Pack',
    category: 'Freebies',
    priceCents: 0,
    tagline: 'The prompts I actually use to ship with AI coding tools.',
    description: 'A curated set of system prompts and task prompts for Claude Code and Cursor: scaffolding, refactoring, testing, code review.',
    whatsIncluded: ['30+ prompts in Markdown', 'Workflow notes per prompt', 'Pitfalls section'],
    goodFit: ['Solo founders using AI tools', 'Developers adopting Claude Code / Cursor'],
    notFit: ['Non-coding AI use cases'],
    techSpecs: [
      { label: 'Format', value: 'Markdown (ZIP)' },
    ],
    license: 'Free for any use.',
    faqs: [
      { q: 'Are these model-specific?', a: 'Written for Claude and GPT-class models; most transfer across tools.' },
    ],
    fileKey: 'products/fb-prompts.zip',
    popular: 85,
    addedDate: 20260710,
  },
  {
    id: 'tpl-saas',
    slug: 'saas-marketing-template',
    title: 'SaaS Marketing Template',
    category: 'Templates',
    priceCents: 3900,
    compareAtPriceCents: 5900,
    tagline: 'A conversion-focused SaaS marketing site, ready to customize.',
    description: 'Hero, social proof, features, pricing, FAQ and blog shell — built with Astro + Tailwind and tuned for Core Web Vitals.',
    whatsIncluded: ['Full Astro source', '6 page templates', 'Pricing + FAQ components', 'SEO/OG wiring', 'Deployment notes (Cloudflare)'],
    goodFit: ['SaaS founders pre-launch', 'Indie hackers who want a serious marketing site'],
    notFit: ['Web apps behind auth', 'Non-JS stacks'],
    techSpecs: [
      { label: 'Stack', value: 'Astro 6, Tailwind CSS, TypeScript' },
      { label: 'Pages', value: '6 templates' },
      { label: 'Format', value: 'ZIP (source code)' },
    ],
    license: 'Single project commercial license.',
    faqs: [
      { q: 'Can I use it for multiple products?', a: 'One license covers one end product. Contact me for a multi-project license.' },
      { q: 'Is support included?', a: 'Email support for setup questions for 30 days.' },
    ],
    fileKey: 'products/tpl-saas.zip',
    popular: 70,
    addedDate: 20260520,
  },
  {
    id: 'tpl-portfolio',
    slug: 'founder-portfolio-template',
    title: 'Founder Portfolio Template',
    category: 'Templates',
    priceCents: 2900,
    tagline: 'A sharp personal site for founders and independents.',
    description: 'Positioning-first portfolio: services, case studies, about and contact, designed to turn visitors into calls.',
    whatsIncluded: ['Astro source', 'Case study layout', 'Services/pricing sections', 'Contact form wiring'],
    goodFit: ['Founders', 'Freelancers and consultants'],
    notFit: ['Agencies needing multi-author CMS'],
    techSpecs: [
      { label: 'Stack', value: 'Astro 6, Tailwind CSS' },
      { label: 'Format', value: 'ZIP (source code)' },
    ],
    license: 'Single project commercial license.',
    faqs: [
      { q: 'Does it include a blog?', a: 'A minimal MDX blog shell is included.' },
    ],
    fileKey: 'products/tpl-portfolio.zip',
    popular: 55,
    addedDate: 20260410,
  },
  {
    id: 'tpl-docs',
    slug: 'docs-changelog-template',
    title: 'Docs & Changelog Template',
    category: 'Templates',
    priceCents: 3500,
    tagline: 'Clean product documentation and changelog site in Astro.',
    description: 'Sidebar navigation, search-ready structure, MDX docs pages and a versioned changelog — the docs setup I wish every MVP had.',
    whatsIncluded: ['Docs layout with sidebar', 'Changelog with versions', 'MDX content collections', 'Search-ready markup'],
    goodFit: ['SaaS products shipping docs early', 'Dev-tool products'],
    notFit: ['Marketing-first sites'],
    techSpecs: [
      { label: 'Stack', value: 'Astro 6, MDX, Tailwind CSS' },
      { label: 'Format', value: 'ZIP (source code)' },
    ],
    license: 'Single project commercial license.',
    faqs: [
      { q: 'Is search included?', a: 'The markup is structured for Pagefind/Algolia; wiring is documented but not included.' },
    ],
    fileKey: 'products/tpl-docs.zip',
    popular: 40,
    addedDate: 20260315,
  },
  {
    id: 'ds-violet',
    slug: 'violet-dark-ui-kit',
    title: 'Violet Dark UI Kit',
    category: 'Design Systems',
    priceCents: 5900,
    compareAtPriceCents: 7900,
    tagline: 'A complete dark-mode design system: tokens, components, Figma + code.',
    description: 'The flagship kit. Electric-violet dark theme with a full token scale, 60+ components in Figma and matching React/Tailwind implementations.',
    whatsIncluded: ['Figma library (tokens + components)', 'React + Tailwind component code', 'CSS variable token files', 'Icon set (200+)', 'Usage documentation'],
    goodFit: ['Teams starting a dark-mode product', 'Founders who want premium UI fast'],
    notFit: ['Light-mode-first brands', 'Native mobile apps'],
    techSpecs: [
      { label: 'Design', value: 'Figma library' },
      { label: 'Code', value: 'React 18, Tailwind CSS, CSS variables' },
      { label: 'Components', value: '60+' },
      { label: 'Format', value: 'ZIP + Figma link' },
    ],
    license: 'Single team commercial license.',
    faqs: [
      { q: 'Are updates included?', a: 'Yes, v1.x updates are free for buyers.' },
      { q: 'Can I use it in a client project?', a: 'One end product per license; extended licenses available on request.' },
      { q: 'Is there a light theme?', a: 'Tokens are structured for theming; a light scale ships in v1.2.' },
    ],
    fileKey: 'products/ds-violet.zip',
    popular: 100,
    addedDate: 20260720,
  },
  {
    id: 'ds-minimal',
    slug: 'minimal-saas-design-system',
    title: 'Minimal SaaS Design System',
    category: 'Design Systems',
    priceCents: 4900,
    tagline: 'A restrained, neutral system for B2B SaaS products.',
    description: 'Calm neutrals, tight spacing scale and accessible contrast — 40+ components in Figma and Tailwind code.',
    whatsIncluded: ['Figma library', 'Tailwind theme config', '40+ components', 'Accessibility notes'],
    goodFit: ['B2B SaaS', 'Internal tools and dashboards'],
    notFit: ['Consumer brands needing strong identity'],
    techSpecs: [
      { label: 'Design', value: 'Figma library' },
      { label: 'Code', value: 'Tailwind CSS + CSS variables' },
      { label: 'Format', value: 'ZIP + Figma link' },
    ],
    license: 'Single team commercial license.',
    faqs: [
      { q: 'Dark mode?', a: 'Ships with both light and dark scales.' },
    ],
    fileKey: 'products/ds-minimal.zip',
    popular: 60,
    addedDate: 20260505,
  },
  {
    id: 'ds-blog',
    slug: 'developer-blog-design-system',
    title: 'Developer Blog Design System',
    category: 'Design Systems',
    priceCents: 4500,
    tagline: 'Typography-first system for technical blogs and docs.',
    description: 'Code blocks, callouts, tables and long-form reading components — designed for developer content that people actually read.',
    whatsIncluded: ['Figma file', 'Astro/MDX components', 'Syntax theme', 'Typography scale'],
    goodFit: ['Developer blogs', 'Technical documentation'],
    notFit: ['E-commerce', 'Marketing-heavy sites'],
    techSpecs: [
      { label: 'Design', value: 'Figma file' },
      { label: 'Code', value: 'Astro, MDX, Tailwind CSS' },
      { label: 'Format', value: 'ZIP + Figma link' },
    ],
    license: 'Single project commercial license.',
    faqs: [
      { q: 'Which syntax highlighter?', a: 'Shiki, with a custom theme included.' },
    ],
    fileKey: 'products/ds-blog.zip',
    popular: 45,
    addedDate: 20260220,
  },
  {
    id: 'oth-playbook',
    slug: 'ai-prompt-engineering-playbook',
    title: 'AI Prompt Engineering Playbook',
    category: 'Others',
    priceCents: 1900,
    tagline: 'A practical guide to prompting for real development work.',
    description: 'Not theory: the patterns, anti-patterns and workflows from 2+ years of daily AI-assisted development and teaching.',
    whatsIncluded: ['120-page PDF', 'Prompt pattern library', 'Real project case studies'],
    goodFit: ['Developers adopting AI tools', 'Founders doing AI-assisted builds'],
    notFit: ['ML researchers'],
    techSpecs: [
      { label: 'Format', value: 'PDF (120 pages)' },
    ],
    license: 'Personal license.',
    faqs: [
      { q: 'How current is it?', a: 'Updated for mid-2026 tooling; updates for 12 months included.' },
    ],
    fileKey: 'products/oth-playbook.zip',
    popular: 65,
    addedDate: 20260601,
  },
  {
    id: 'oth-claude',
    slug: 'claude-code-workflow-pack',
    title: 'Claude Code Workflow Pack',
    category: 'Others',
    priceCents: 2500,
    tagline: 'CLAUDE.md templates, skills and commands for serious Claude Code use.',
    description: 'The workflow layer: repo-ready CLAUDE.md templates, custom commands, subagent setups and review checklists.',
    whatsIncluded: ['CLAUDE.md templates (5 project types)', 'Custom command collection', 'Subagent configs', 'Review checklists'],
    goodFit: ['Teams standardizing on Claude Code', 'Solo devs scaling AI workflows'],
    notFit: ['Non-Claude-Code users'],
    techSpecs: [
      { label: 'Format', value: 'Markdown + config files (ZIP)' },
    ],
    license: 'Personal + internal team use.',
    faqs: [
      { q: 'Does this replace documentation?', a: 'No — it is a starter structure you adapt to your repo.' },
    ],
    fileKey: 'products/oth-claude.zip',
    popular: 80,
    addedDate: 20260725,
  },
  {
    id: 'oth-notion',
    slug: 'mvp-planning-notion-template',
    title: 'MVP Planning Notion Template',
    category: 'Others',
    priceCents: 1500,
    tagline: 'The Notion workspace I use to scope MVPs with clients.',
    description: 'Idea capture, user flows, feature prioritization, tech decisions and roadmap — the full AI Clarity Framework as a Notion template.',
    whatsIncluded: ['Notion template (duplicate link)', 'Prioritization matrix', 'Roadmap board', 'Scope worksheet'],
    goodFit: ['Non-technical founders', 'Workshop participants'],
    notFit: ['Teams not using Notion'],
    techSpecs: [
      { label: 'Format', value: 'Notion template link (PDF guide included)' },
    ],
    license: 'Personal + internal team use.',
    faqs: [
      { q: 'Do I need a paid Notion plan?', a: 'No, it works on the free plan.' },
    ],
    fileKey: 'products/oth-notion.zip',
    popular: 50,
    addedDate: 20260425,
  },
];

export const getProduct = (idOrSlug: string): Product | undefined =>
  PRODUCTS.find((p) => p.id === idOrSlug || p.slug === idOrSlug);

export const productsByCategory = (category: ProductCategory): Product[] =>
  PRODUCTS.filter((p) => p.category === category);

export const formatPrice = (cents: number): string =>
  cents === 0 ? 'Free' : `€${(cents / 100).toFixed(2).replace(/\.00$/, '')}`;
