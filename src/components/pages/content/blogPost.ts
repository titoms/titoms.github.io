export interface BlogPostContent {
  backToAllArticles: string;
  comingSoonBadge: string;
  comingSoon: { title: string; body: string; joinNewsletter: string; backToBlog: string };
  imagePlaceholder: string;
  nextStep: { eyebrow: string; title: string };
  relatedServices: { slug: string; title: string; description: string }[];
  learnMore: string;
  dateLocale: string;
}

export const blogPost: Record<'en' | 'fr' | 'es', BlogPostContent> = {
  en: {
    backToAllArticles: 'All articles',
    comingSoonBadge: 'Coming soon',
    comingSoon: {
      title: 'This article is in progress.',
      body: 'I am working on this article. Explore the coaching and technical training options while it is in progress.',
      joinNewsletter: 'Explore training',
      backToBlog: 'Back to blog',
    },
    imagePlaceholder: 'Image placeholder',
    nextStep: { eyebrow: 'Next step', title: 'Work with me directly.' },
    relatedServices: [
      { slug: 'web-project-coaching', title: 'Web project coaching', description: 'Get hands-on guidance on your project or blocker.' },
      { slug: 'full-stack-development-day', title: 'Development day', description: 'Book a focused development session.' },
      { slug: 'mvp-bootstrapping-workshop', title: 'MVP workshop', description: 'Turn your idea into a realistic build plan.' },
    ],
    learnMore: 'Learn more',
    dateLocale: 'en',
  },
  fr: {
    backToAllArticles: 'Tous les articles',
    comingSoonBadge: 'Bientôt disponible',
    comingSoon: {
      title: 'Cet article est en cours de rédaction.',
      body: "Je travaille sur cet article. Découvrez les formations et le coaching technique pendant sa rédaction.",
      joinNewsletter: 'Découvrir les formations',
      backToBlog: 'Retour au blog',
    },
    imagePlaceholder: "Emplacement d'image",
    nextStep: { eyebrow: 'Prochaine étape', title: 'Travaillons ensemble directement.' },
    relatedServices: [
      { slug: 'web-project-coaching', title: 'Coaching projet web', description: 'Un accompagnement concret sur votre projet ou blocage.' },
      { slug: 'full-stack-development-day', title: 'Journée de développement', description: 'Réservez une session de développement ciblée.' },
      { slug: 'mvp-bootstrapping-workshop', title: 'Atelier MVP', description: 'Transformez votre idée en plan de construction réaliste.' },
    ],
    learnMore: 'En savoir plus',
    dateLocale: 'fr',
  },
  es: {
    backToAllArticles: 'Todos los artículos',
    comingSoonBadge: 'Próximamente',
    comingSoon: {
      title: 'Este artículo está en progreso.',
      body: 'Estoy trabajando en este artículo. Descubre las opciones de formación y coaching técnico mientras lo termino.',
      joinNewsletter: 'Ver formación',
      backToBlog: 'Volver al blog',
    },
    imagePlaceholder: 'Marcador de imagen',
    nextStep: { eyebrow: 'Siguiente paso', title: 'Trabajemos juntos directamente.' },
    relatedServices: [
      { slug: 'web-project-coaching', title: 'Coaching de proyecto web', description: 'Recibe orientación práctica sobre tu proyecto o bloqueo.' },
      { slug: 'full-stack-development-day', title: 'Jornada de desarrollo', description: 'Reserva una sesión de desarrollo enfocada.' },
      { slug: 'mvp-bootstrapping-workshop', title: 'Taller MVP', description: 'Convierte tu idea en un plan de construcción realista.' },
    ],
    learnMore: 'Saber más',
    dateLocale: 'es',
  },
};
