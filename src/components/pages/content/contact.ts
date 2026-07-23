export interface ContactContent {
  meta: { title: string; description: string };
  jsonLd: { name: string; description: string };
  eyebrow: string;
  h1: string;
  lead: string;
  callSteps: { eyebrow: string; title: string; steps: { step: string; label: string; description: string }[] };
  schedule: { eyebrow: string; title: string; cantSee: string; openInCalendly: string };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    links: { title: string; href: string; description: string }[];
    learnMore: string;
  };
}

export const contact: Record<'en' | 'fr' | 'es', ContactContent> = {
  en: {
    meta: {
      title: 'Contact — Book a Call with a Full-Stack Web Developer | fullstackchris.dev',
      description: 'Book a free 30-minute call to discuss your web project, MVP, blocker or product idea. Full-stack development, web project coaching, AI-assisted workflows — no commitment required.',
    },
    jsonLd: {
      name: 'Contact — fullstackchris.dev',
      description: 'Book a free 30-minute call to discuss your project, blocker, or product idea.',
    },
    eyebrow: 'Contact',
    h1: "Let's talk about your project.",
    lead: "Book a free 30-minute call. Bring your project, blocker, or idea — I'll help you figure out if and how I can help.",
    callSteps: {
      eyebrow: 'How it works',
      title: 'Book a call in 3 steps.',
      steps: [
        { step: '1', label: 'Choose a time', description: 'Pick a 30-minute slot that works for you.' },
        { step: '2', label: 'Describe your project', description: 'Brief context on what you are building or what is blocked.' },
        { step: '3', label: 'Join the call', description: "I'll talk through the situation with you and define a path forward." },
      ],
    },
    schedule: {
      eyebrow: 'Schedule',
      title: 'Pick a time that works for you.',
      cantSee: "Can't see the calendar?",
      openInCalendly: 'Open in Calendly',
    },
    services: {
      eyebrow: 'Or browse services',
      title: 'Know what you need?',
      description: 'Skip the call and go straight to the right offer.',
      links: [
        { title: 'Web project coaching', href: '/services/web-project-coaching/', description: 'Review, unblock, and get written next steps.' },
        { title: 'Full-stack development day', href: '/services/full-stack-development-day/', description: 'Focused implementation sessions.' },
        { title: 'AI Clarity Bootstrap Workshop', href: '/services/mvp-bootstrapping-workshop/', description: 'Turn your idea into a build plan.' },
        { title: 'AI web development newsletter', href: '/services/ai-web-development-newsletter/', description: 'Monthly briefing on AI tools and workflows.' },
      ],
      learnMore: 'Learn more',
    },
  },
  fr: {
    meta: {
      title: 'Contact — Réservez un appel avec un développeur web full-stack | fullstackchris.dev',
      description: "Réservez un appel gratuit de 30 minutes pour discuter de votre projet web, MVP, blocage ou idée de produit. Développement full-stack, coaching projet web, workflows assistés par IA — sans engagement.",
    },
    jsonLd: {
      name: 'Contact — fullstackchris.dev',
      description: 'Réservez un appel gratuit de 30 minutes pour discuter de votre projet, blocage ou idée de produit.',
    },
    eyebrow: 'Contact',
    h1: 'Parlons de votre projet.',
    lead: "Réservez un appel gratuit de 30 minutes. Apportez votre projet, votre blocage ou votre idée — je vous aide à déterminer si et comment je peux vous aider.",
    callSteps: {
      eyebrow: 'Comment ça marche',
      title: 'Réservez un appel en 3 étapes.',
      steps: [
        { step: '1', label: 'Choisissez un créneau', description: 'Choisissez un créneau de 30 minutes qui vous convient.' },
        { step: '2', label: 'Décrivez votre projet', description: 'Un bref contexte sur ce que vous construisez ou ce qui est bloqué.' },
        { step: '3', label: "Rejoignez l'appel", description: 'Je passe en revue la situation avec vous et définis une voie à suivre.' },
      ],
    },
    schedule: {
      eyebrow: 'Planning',
      title: 'Choisissez un créneau qui vous convient.',
      cantSee: 'Vous ne voyez pas le calendrier ?',
      openInCalendly: 'Ouvrir dans Calendly',
    },
    services: {
      eyebrow: 'Ou parcourez les services',
      title: 'Vous savez déjà ce dont vous avez besoin ?',
      description: "Passez l'appel et allez directement à la bonne offre.",
      links: [
        { title: 'Coaching projet web', href: '/services/web-project-coaching/', description: 'Revue, déblocage et prochaines étapes écrites.' },
        { title: 'Journée de développement full-stack', href: '/services/full-stack-development-day/', description: 'Sessions d\'implémentation ciblées.' },
        { title: 'Atelier AI Clarity Bootstrap', href: '/services/mvp-bootstrapping-workshop/', description: 'Transformez votre idée en plan de construction.' },
        { title: 'Newsletter dev web IA', href: '/services/ai-web-development-newsletter/', description: 'Briefing mensuel sur les outils IA et les workflows.' },
      ],
      learnMore: 'En savoir plus',
    },
  },
  es: {
    meta: {
      title: 'Contacto — Reserva una llamada con un desarrollador web full-stack | fullstackchris.dev',
      description: 'Reserva una llamada gratuita de 30 minutos para hablar de tu proyecto web, MVP, bloqueo o idea de producto. Desarrollo full-stack, coaching de proyectos web, flujos asistidos por IA — sin compromiso.',
    },
    jsonLd: {
      name: 'Contacto — fullstackchris.dev',
      description: 'Reserva una llamada gratuita de 30 minutos para hablar de tu proyecto, bloqueo o idea de producto.',
    },
    eyebrow: 'Contacto',
    h1: 'Hablemos de tu proyecto.',
    lead: 'Reserva una llamada gratuita de 30 minutos. Trae tu proyecto, bloqueo o idea — te ayudo a averiguar si y cómo puedo ayudarte.',
    callSteps: {
      eyebrow: 'Cómo funciona',
      title: 'Reserva una llamada en 3 pasos.',
      steps: [
        { step: '1', label: 'Elige un horario', description: 'Elige un espacio de 30 minutos que te convenga.' },
        { step: '2', label: 'Describe tu proyecto', description: 'Un breve contexto sobre lo que estás construyendo o lo que está bloqueado.' },
        { step: '3', label: 'Únete a la llamada', description: 'Repasaré la situación contigo y definiremos un camino a seguir.' },
      ],
    },
    schedule: {
      eyebrow: 'Agenda',
      title: 'Elige un horario que te convenga.',
      cantSee: '¿No ves el calendario?',
      openInCalendly: 'Abrir en Calendly',
    },
    services: {
      eyebrow: 'O explora los servicios',
      title: '¿Ya sabes lo que necesitas?',
      description: 'Sáltate la llamada y ve directo a la oferta adecuada.',
      links: [
        { title: 'Coaching de proyecto web', href: '/services/web-project-coaching/', description: 'Revisión, desbloqueo y próximos pasos por escrito.' },
        { title: 'Jornada de desarrollo full-stack', href: '/services/full-stack-development-day/', description: 'Sesiones de implementación enfocadas.' },
        { title: 'Taller AI Clarity Bootstrap', href: '/services/mvp-bootstrapping-workshop/', description: 'Convierte tu idea en un plan de construcción.' },
        { title: 'Newsletter de desarrollo web con IA', href: '/services/ai-web-development-newsletter/', description: 'Resumen mensual sobre herramientas de IA y flujos de trabajo.' },
      ],
      learnMore: 'Saber más',
    },
  },
};
