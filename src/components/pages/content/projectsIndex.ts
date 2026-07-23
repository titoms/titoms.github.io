export interface ProjectsIndexContent {
  meta: { title: string; description: string };
  jsonLd: { description: string };
  breadcrumbCurrent: string;
  eyebrow: string;
  h1Lead: string;
  h1Accent: string;
  lead: string;
  stats: { shippedProducts: string; productDomains: string; teachingWebDev: string };
  filter: { label: string; all: string; apps: string; tools: string; games: string };
  featuredFlag: string;
  readCaseStudy: string;
  emptyNote: string;
  toolbox: { eyebrow: string; description: string };
  cta: { eyebrow: string; h2: string; lead: string; primaryCta: string; secondaryCta: string };
  projectKinds: Record<string, string>;
}

export const projectsIndex: Record<'en' | 'fr' | 'es', ProjectsIndexContent> = {
  en: {
    meta: {
      title: 'Projects — React, Node.js and AI-Assisted Web App Case Studies | fullstackchris.dev',
      description: 'Selected web and desktop products shipped end-to-end — React, Node.js, TypeScript and AI-assisted workflows. Real case studies of MVPs, internal tools and creator products built for founders and small teams.',
    },
    jsonLd: { description: 'Selected web and desktop products built with React, Node.js, TypeScript and AI-assisted workflows.' },
    breadcrumbCurrent: 'Projects',
    eyebrow: 'Selected work · 2023 — 2026',
    h1Lead: "Things I've scoped, built and ",
    h1Accent: 'actually shipped.',
    lead: 'Real products, not portfolio filler — desktop apps, web tools and games. Each one is a small case study in clarifying a fuzzy idea and getting it to production.',
    stats: { shippedProducts: 'Shipped products', productDomains: 'Product domains', teachingWebDev: 'Teaching web dev' },
    filter: { label: 'Filter', all: 'All', apps: 'Web apps', tools: 'Tools', games: 'Games' },
    featuredFlag: 'Featured · case study',
    readCaseStudy: 'Read the case study →',
    emptyNote: 'No projects in this category yet.',
    toolbox: { eyebrow: 'THE TOOLBOX', description: 'Proven tools chosen for shipping, maintenance and scale.' },
    cta: {
      eyebrow: 'WORK WITH ME',
      h2: 'Have an idea that belongs on this page?',
      lead: "Bring me your concept or half-built project. I'll scope it, design it and ship it — using the same workflow behind these.",
      primaryCta: 'Start your project',
      secondaryCta: 'See all services',
    },
    projectKinds: {
      'keevo': 'Desktop product · 2025',
      'edumation': 'Web app · SaaS',
      'railguessr': 'Browser game · Maps',
      'singuessr': 'Browser game · Audio',
      'fuchibol-hub': 'Web app · Sports',
      'fresh-win': 'Web app · Prediction',
    },
  },
  fr: {
    meta: {
      title: 'Projets — Études de cas React, Node.js et applications web assistées par IA | fullstackchris.dev',
      description: "Produits web et desktop sélectionnés, livrés de bout en bout — React, Node.js, TypeScript et workflows assistés par IA. Véritables études de cas de MVP, outils internes et produits créateurs construits pour fondateurs et petites équipes.",
    },
    jsonLd: { description: 'Produits web et desktop sélectionnés, construits avec React, Node.js, TypeScript et workflows assistés par IA.' },
    breadcrumbCurrent: 'Projets',
    eyebrow: 'Travaux sélectionnés · 2023 — 2026',
    h1Lead: "Des projets que j'ai cadrés, construits et ",
    h1Accent: 'réellement livrés.',
    lead: "De vrais produits, pas du remplissage de portfolio — applications desktop, outils web et jeux. Chacun est une petite étude de cas sur la clarification d'une idée floue jusqu'à sa mise en production.",
    stats: { shippedProducts: 'Produits livrés', productDomains: 'Domaines produit', teachingWebDev: 'Enseignement dev web' },
    filter: { label: 'Filtrer', all: 'Tous', apps: 'Applications web', tools: 'Outils', games: 'Jeux' },
    featuredFlag: 'À la une · étude de cas',
    readCaseStudy: "Lire l'étude de cas →",
    emptyNote: 'Aucun projet dans cette catégorie pour le moment.',
    toolbox: { eyebrow: 'LA BOÎTE À OUTILS', description: 'Des outils éprouvés, choisis pour livrer, maintenir et scaler.' },
    cta: {
      eyebrow: 'TRAVAILLER ENSEMBLE',
      h2: 'Une idée qui a sa place sur cette page ?',
      lead: "Apportez-moi votre concept ou projet à moitié construit. Je le cadre, le conçois et le livre — avec le même workflow que ceux-ci.",
      primaryCta: 'Démarrer votre projet',
      secondaryCta: 'Voir tous les services',
    },
    projectKinds: {
      'keevo': 'Produit desktop · 2025',
      'edumation': 'Application web · SaaS',
      'railguessr': 'Jeu navigateur · Cartes',
      'singuessr': 'Jeu navigateur · Audio',
      'fuchibol-hub': 'Application web · Sport',
      'fresh-win': 'Application web · Pronostics',
    },
  },
  es: {
    meta: {
      title: 'Proyectos — Casos de estudio React, Node.js y apps web asistidas por IA | fullstackchris.dev',
      description: 'Productos web y de escritorio seleccionados, entregados de principio a fin — React, Node.js, TypeScript y flujos asistidos por IA. Casos de estudio reales de MVPs, herramientas internas y productos de creadores construidos para fundadores y equipos pequeños.',
    },
    jsonLd: { description: 'Productos web y de escritorio seleccionados, construidos con React, Node.js, TypeScript y flujos asistidos por IA.' },
    breadcrumbCurrent: 'Proyectos',
    eyebrow: 'Trabajo seleccionado · 2023 — 2026',
    h1Lead: 'Cosas que he definido, construido y ',
    h1Accent: 'realmente entregado.',
    lead: 'Productos reales, no relleno de portafolio — aplicaciones de escritorio, herramientas web y juegos. Cada uno es un pequeño caso de estudio sobre cómo clarificar una idea difusa y llevarla a producción.',
    stats: { shippedProducts: 'Productos entregados', productDomains: 'Dominios de producto', teachingWebDev: 'Docencia en desarrollo web' },
    filter: { label: 'Filtrar', all: 'Todos', apps: 'Apps web', tools: 'Herramientas', games: 'Juegos' },
    featuredFlag: 'Destacado · caso de estudio',
    readCaseStudy: 'Leer el caso de estudio →',
    emptyNote: 'Aún no hay proyectos en esta categoría.',
    toolbox: { eyebrow: 'LA CAJA DE HERRAMIENTAS', description: 'Herramientas probadas, elegidas para entregar, mantener y escalar.' },
    cta: {
      eyebrow: 'TRABAJEMOS JUNTOS',
      h2: '¿Tienes una idea que merece estar en esta página?',
      lead: 'Tráeme tu concepto o proyecto a medio construir. Lo defino, lo diseño y lo entrego — usando el mismo flujo de trabajo que hay detrás de estos.',
      primaryCta: 'Inicia tu proyecto',
      secondaryCta: 'Ver todos los servicios',
    },
    projectKinds: {
      'keevo': 'Producto de escritorio · 2025',
      'edumation': 'App web · SaaS',
      'railguessr': 'Juego de navegador · Mapas',
      'singuessr': 'Juego de navegador · Audio',
      'fuchibol-hub': 'App web · Deportes',
      'fresh-win': 'App web · Pronósticos',
    },
  },
};
