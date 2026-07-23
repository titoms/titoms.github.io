export interface BlogIndexContent {
  meta: { title: string; description: string };
  jsonLd: { name: string; description: string };
  eyebrow: string;
  h1: string;
  lead: string;
  articles: { eyebrow: string; title: string; description: string };
  plannedArticle: string;
  comingSoon: string;
  previewArticle: string;
  readArticle: string;
  newsletterCta: { getNotified: string; h2: string; lead: string; joinNewsletter: string };
}

export const blogIndex: Record<'en' | 'fr' | 'es', BlogIndexContent> = {
  en: {
    meta: {
      title: 'Blog - fullstackchris.dev',
      description: 'Practical articles on AI-assisted web development, MVP roadmap, React, Node.js, TypeScript and Claude Code workflows — for founders, freelancers and developers building real products.',
    },
    jsonLd: { name: 'fullstackchris.dev Blog', description: 'Practical articles on AI-assisted web development, MVP building, React, Node.js and TypeScript.' },
    eyebrow: 'Blog',
    h1: 'Practical AI and web development resources for builders.',
    lead: 'Articles on AI-assisted development, MVP scope, React, Node.js and TypeScript for founders, freelancers and developers.',
    articles: { eyebrow: 'Articles', title: 'Latest articles.', description: 'Real notes from building, teaching and consulting on web products.' },
    plannedArticle: 'Planned article',
    comingSoon: 'Coming soon',
    previewArticle: 'Preview article',
    readArticle: 'Read article',
    newsletterCta: {
      getNotified: 'Get notified',
      h2: 'New articles in your inbox.',
      lead: 'The AI web development newsletter covers tools, workflows and product ideas for developers and founders.',
      joinNewsletter: 'Join the newsletter',
    },
  },
  fr: {
    meta: {
      title: 'Blog - fullstackchris.dev',
      description: 'Articles pratiques sur le développement web assisté par IA, la feuille de route MVP, React, Node.js, TypeScript et les workflows Claude Code — pour fondateurs, freelances et développeurs qui construisent de vrais produits.',
    },
    jsonLd: { name: 'Blog fullstackchris.dev', description: 'Articles pratiques sur le développement web assisté par IA, la construction de MVP, React, Node.js et TypeScript.' },
    eyebrow: 'Blog',
    h1: 'Ressources pratiques en IA et développement web pour les builders.',
    lead: 'Des articles sur le développement assisté par IA, le cadrage MVP, React, Node.js et TypeScript pour fondateurs, freelances et développeurs.',
    articles: { eyebrow: 'Articles', title: 'Derniers articles.', description: 'De vraies notes issues de la construction, l\'enseignement et le conseil sur des produits web.' },
    plannedArticle: 'Article prévu',
    comingSoon: 'Bientôt disponible',
    previewArticle: "Aperçu de l'article",
    readArticle: "Lire l'article",
    newsletterCta: {
      getNotified: 'Soyez notifié',
      h2: 'De nouveaux articles dans votre boîte mail.',
      lead: 'La newsletter dev web IA couvre les outils, les workflows et les idées produit pour développeurs et fondateurs.',
      joinNewsletter: 'Rejoindre la newsletter',
    },
  },
  es: {
    meta: {
      title: 'Blog - fullstackchris.dev',
      description: 'Artículos prácticos sobre desarrollo web asistido por IA, hoja de ruta de MVP, React, Node.js, TypeScript y flujos de trabajo con Claude Code — para fundadores, freelancers y desarrolladores que construyen productos reales.',
    },
    jsonLd: { name: 'Blog de fullstackchris.dev', description: 'Artículos prácticos sobre desarrollo web asistido por IA, construcción de MVP, React, Node.js y TypeScript.' },
    eyebrow: 'Blog',
    h1: 'Recursos prácticos de IA y desarrollo web para builders.',
    lead: 'Artículos sobre desarrollo asistido por IA, alcance de MVP, React, Node.js y TypeScript para fundadores, freelancers y desarrolladores.',
    articles: { eyebrow: 'Artículos', title: 'Últimos artículos.', description: 'Notas reales sobre construir, enseñar y asesorar en productos web.' },
    plannedArticle: 'Artículo planeado',
    comingSoon: 'Próximamente',
    previewArticle: 'Vista previa del artículo',
    readArticle: 'Leer el artículo',
    newsletterCta: {
      getNotified: 'Recibe notificaciones',
      h2: 'Nuevos artículos en tu bandeja de entrada.',
      lead: 'La newsletter de desarrollo web con IA cubre herramientas, flujos de trabajo e ideas de producto para desarrolladores y fundadores.',
      joinNewsletter: 'Unirse a la newsletter',
    },
  },
};
