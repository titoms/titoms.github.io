export interface ServicesIndexContent {
  meta: { title: string; description: string };
  jsonLd: { description: string };
  breadcrumbCurrent: string;
  eyebrow: string;
  h1Lead: string;
  h1Accent: string;
  lead: string;
  primaryCta: string;
  secondaryCta: string;
  ladder: {
    eyebrow: string;
    h2: string;
    lead: string;
    nodes: { label: string; name: string; desc: string }[];
  };
  serviceSteps: Record<string, string>;
  servicePrices: Record<string, string>;
  serviceCtaLabels: Record<string, string>;
  learnMore: string;
  flagship: string;
  cta: { eyebrow: string; h2: string; lead: string; primaryCta: string };
}

export const servicesIndex: Record<'en' | 'fr' | 'es', ServicesIndexContent> = {
  en: {
    meta: {
      title: 'Services — Web Project Coaching, Full-Stack Development, MVP Workshop and Custom MVP | fullstackchris.dev',
      description: 'Web project coaching, full-stack development days, the AI Clarity Bootstrap Workshop, custom MVP development and a practical AI web development newsletter — React, Node.js, TypeScript and AI-assisted workflows for founders, freelancers and small teams.',
    },
    jsonLd: { description: 'Coaching, development days, MVP workshops and custom MVP development.' },
    breadcrumbCurrent: 'Services',
    eyebrow: 'Clarify · Plan · Build · Launch',
    h1Lead: 'Five ways to move your web project ',
    h1Accent: 'forward.',
    lead: "Whether you have a blurry idea, a blocked codebase or a product to launch — there's an entry point sized to exactly where you are right now.",
    primaryCta: 'Book a 15-min call',
    secondaryCta: 'See how it fits together',
    ladder: {
      eyebrow: 'HOW IT FITS TOGETHER',
      h2: 'One connected path from idea to launch.',
      lead: 'Most clients start with the smallest useful step, then continue only when the project is clearer. Each offer connects cleanly to the next — no restarting with someone new.',
      nodes: [
        { label: 'Learn', name: 'Newsletter', desc: 'Stay sharp on AI web dev, monthly.' },
        { label: 'Clarify', name: 'Coaching', desc: 'Diagnose the blocker, pick the next move.' },
        { label: 'Plan', name: 'Clarity bootstrap', desc: 'Scope, flows, stack and a real roadmap.' },
        { label: 'Build', name: 'Dev days', desc: 'Focused blocks that ship features.' },
        { label: 'Launch', name: 'Custom MVP', desc: 'Full build, deploy and handover.' },
      ],
    },
    serviceSteps: {
      'ai-web-development-newsletter': '00 · Learn',
      'web-project-coaching': '01 · Clarify',
      'full-stack-development-day': '03 · Build',
      'mvp-bootstrapping-workshop': '02 · Plan',
      'mvp-development': '04 · Launch',
    },
    servicePrices: {
      'ai-web-development-newsletter': 'from €9 / mo',
      'web-project-coaching': 'from €90 / 1h',
      'full-stack-development-day': 'from €350 / day',
      'mvp-bootstrapping-workshop': 'from €650 / day',
      'mvp-development': 'from €4,500',
    },
    serviceCtaLabels: {
      'ai-web-development-newsletter': 'Subscribe',
      'mvp-development': 'Request quote',
    },
    learnMore: 'Learn more',
    flagship: 'Flagship',
    cta: {
      eyebrow: 'NOT SURE WHICH?',
      h2: 'Start with a 30-minute call.',
      lead: "Tell me where you are and I'll help you pick the right entry point — no pressure, no jargon.",
      primaryCta: 'Book a project call',
    },
  },
  fr: {
    meta: {
      title: 'Services — Coaching projet web, développement full-stack, atelier MVP et MVP sur mesure | fullstackchris.dev',
      description: "Coaching de projet web, journées de développement full-stack, l'atelier AI Clarity Bootstrap, développement MVP sur mesure et une newsletter dev web IA concrète — React, Node.js, TypeScript et workflows assistés par IA pour fondateurs, freelances et petites équipes.",
    },
    jsonLd: { description: 'Coaching, journées de développement, ateliers MVP et développement MVP sur mesure.' },
    breadcrumbCurrent: 'Services',
    eyebrow: 'Clarifier · Planifier · Construire · Lancer',
    h1Lead: 'Cinq façons de faire avancer votre projet web',
    h1Accent: '.',
    lead: "Que vous ayez une idée floue, un code bloqué ou un produit à lancer — il y a un point d'entrée à la taille exacte de votre situation actuelle.",
    primaryCta: 'Réserver un appel de 15 min',
    secondaryCta: 'Voir comment ça s\'articule',
    ladder: {
      eyebrow: "COMMENT ÇA S'ARTICULE",
      h2: "Un parcours cohérent, de l'idée au lancement.",
      lead: "La plupart des clients commencent par la plus petite étape utile, puis continuent seulement quand le projet est plus clair. Chaque offre s'enchaîne proprement avec la suivante — pas besoin de repartir de zéro avec quelqu'un d'autre.",
      nodes: [
        { label: 'Apprendre', name: 'Newsletter', desc: 'Restez à jour sur le dev web IA, chaque mois.' },
        { label: 'Clarifier', name: 'Coaching', desc: 'Diagnostiquer le blocage, choisir la prochaine action.' },
        { label: 'Planifier', name: 'Clarity bootstrap', desc: 'Cadrage, parcours, stack et une vraie feuille de route.' },
        { label: 'Construire', name: 'Journées de dev', desc: 'Des blocs ciblés qui livrent des fonctionnalités.' },
        { label: 'Lancer', name: 'MVP sur mesure', desc: 'Construction complète, déploiement et passation.' },
      ],
    },
    serviceSteps: {
      'ai-web-development-newsletter': '00 · Apprendre',
      'web-project-coaching': '01 · Clarifier',
      'full-stack-development-day': '03 · Construire',
      'mvp-bootstrapping-workshop': '02 · Planifier',
      'mvp-development': '04 · Lancer',
    },
    servicePrices: {
      'ai-web-development-newsletter': 'dès 9 € / mois',
      'web-project-coaching': 'dès 90 € / 1h',
      'full-stack-development-day': 'dès 350 € / jour',
      'mvp-bootstrapping-workshop': 'dès 650 € / jour',
      'mvp-development': 'dès 4 500 €',
    },
    serviceCtaLabels: {
      'ai-web-development-newsletter': "S'abonner",
      'mvp-development': 'Demander un devis',
    },
    learnMore: 'En savoir plus',
    flagship: 'Phare',
    cta: {
      eyebrow: 'PAS SÛR LEQUEL CHOISIR ?',
      h2: 'Commencez par un appel de 30 minutes.',
      lead: 'Dites-moi où vous en êtes et je vous aide à choisir le bon point de départ — sans pression, sans jargon.',
      primaryCta: 'Réserver un appel projet',
    },
  },
  es: {
    meta: {
      title: 'Servicios — Coaching de proyecto web, desarrollo full-stack, taller MVP y MVP a medida | fullstackchris.dev',
      description: 'Coaching de proyecto web, jornadas de desarrollo full-stack, el Taller AI Clarity Bootstrap, desarrollo de MVP a medida y una newsletter práctica de desarrollo web con IA — React, Node.js, TypeScript y flujos asistidos por IA para fundadores, freelancers y equipos pequeños.',
    },
    jsonLd: { description: 'Coaching, jornadas de desarrollo, talleres MVP y desarrollo de MVP a medida.' },
    breadcrumbCurrent: 'Servicios',
    eyebrow: 'Clarificar · Planificar · Construir · Lanzar',
    h1Lead: 'Cinco formas de avanzar en tu proyecto web',
    h1Accent: '.',
    lead: 'Ya sea que tengas una idea difusa, un código bloqueado o un producto que lanzar — hay un punto de entrada del tamaño exacto de tu situación actual.',
    primaryCta: 'Reservar una llamada de 15 min',
    secondaryCta: 'Ver cómo encaja todo',
    ladder: {
      eyebrow: 'CÓMO ENCAJA TODO',
      h2: 'Un recorrido claro, de la idea al lanzamiento.',
      lead: 'La mayoría de los clientes empiezan por el paso útil más pequeño y continúan solo cuando el proyecto está más claro. Cada oferta conecta limpiamente con la siguiente — sin volver a empezar con otra persona.',
      nodes: [
        { label: 'Aprender', name: 'Newsletter', desc: 'Mantente al día en desarrollo web con IA, cada mes.' },
        { label: 'Clarificar', name: 'Coaching', desc: 'Diagnosticar el bloqueo, elegir el siguiente paso.' },
        { label: 'Planificar', name: 'Clarity bootstrap', desc: 'Alcance, flujos, stack y una hoja de ruta real.' },
        { label: 'Construir', name: 'Jornadas de desarrollo', desc: 'Bloques enfocados que entregan funcionalidades.' },
        { label: 'Lanzar', name: 'MVP a medida', desc: 'Construcción completa, despliegue y entrega.' },
      ],
    },
    serviceSteps: {
      'ai-web-development-newsletter': '00 · Aprender',
      'web-project-coaching': '01 · Clarificar',
      'full-stack-development-day': '03 · Construir',
      'mvp-bootstrapping-workshop': '02 · Planificar',
      'mvp-development': '04 · Lanzar',
    },
    servicePrices: {
      'ai-web-development-newsletter': 'desde 9 € / mes',
      'web-project-coaching': 'desde 90 € / 1h',
      'full-stack-development-day': 'desde 350 € / día',
      'mvp-bootstrapping-workshop': 'desde 650 € / día',
      'mvp-development': 'desde 4500 €',
    },
    serviceCtaLabels: {
      'ai-web-development-newsletter': 'Suscribirse',
      'mvp-development': 'Solicitar presupuesto',
    },
    learnMore: 'Saber más',
    flagship: 'Insignia',
    cta: {
      eyebrow: '¿NO SABES CUÁL ELEGIR?',
      h2: 'Empieza con una llamada de 30 minutos.',
      lead: 'Cuéntame dónde estás y te ayudo a elegir el punto de entrada adecuado — sin presión, sin jerga.',
      primaryCta: 'Reservar una llamada de proyecto',
    },
  },
};
