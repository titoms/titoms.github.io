export interface HomeContent {
  meta: { title: string; description: string };
  jsonLd: { jobTitle: string; websiteDescription: string };
  why: {
    eyebrow: string;
    title: string;
    cards: { title: string; body: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    offers: {
      title: string;
      description: string;
      price: string;
      priceUnit?: string;
      badge: string;
      featured?: boolean;
      ctaHref: string;
      ctaLabel: string;
    }[];
    notSure: { title: string; body: string; askQuestion: string };
  };
  process: { eyebrow: string; title: string; description: string; steps: { title: string; description: string }[] };
  projects: { eyebrow: string; title: string; description: string };
  testimonials: {
    eyebrow: string;
    title: string;
    cards: { testimonial: string; name: string; designation: string; company: string }[];
  };
  techStack: { eyebrow: string; title: string };
  pricing: {
    eyebrow: string;
    title: string;
    description: string;
    plans: {
      title: string;
      description: string;
      price: string;
      period: string;
      features: string[];
      featured?: boolean;
      ctaHref: string;
      ctaLabel: string;
    }[];
  };
  newsletter: { tag: string; h2: string; lead: string; note: string; issue: string[] };
  faq: { eyebrow: string; title: string; description: string; items: { question: string; answer: string }[] };
  finalCta: { eyebrow: string; h2: string; lead: string; primaryCta: string; secondaryCta: string };
}

export const home: Record<'en' | 'fr' | 'es', HomeContent> = {
  en: {
    meta: {
      title: 'Full-Stack Web Development, AI Workflows and Technical Coaching — fullstackchris.dev',
      description:
        'I help founders, freelancers and small teams clarify, build and launch web projects using React, Node.js, TypeScript and practical AI-assisted development workflows — full-stack development, web project coaching, MVP roadmap and custom MVP development.',
    },
    jsonLd: {
      jobTitle: 'Full-Stack Developer',
      websiteDescription: 'Full-stack development, coaching, and MVP services for founders and developers.',
    },
    why: {
      eyebrow: 'WHY WORK WITH ME',
      title: 'Practical delivery, clear explanations, AI where it actually helps.',
      cards: [
        { title: 'I can explain it', body: "~7,000 hours teaching web development means I cut through jargon and help non-technical founders make confident decisions." },
        { title: 'I can scope it', body: "I turn a vague idea into a prioritized MVP and a realistic budget — so you don't burn weeks building the wrong thing." },
        { title: 'I can build it', body: 'React, Next.js, Node, TypeScript and Postgres — shipped to production, with AI-assisted workflows where they genuinely help.' },
      ],
    },
    services: {
      eyebrow: 'WHAT I OFFER',
      title: 'A clear path from first call to launched product.',
      description: 'Start wherever you are. Each service hands off cleanly to the next — clarity, then focused build, then a full MVP.',
      offers: [
        { title: 'AI Web Dev Newsletter', description: 'A monthly, no-hype briefing on AI tools, coding workflows and MVP ideas worth testing.', price: 'from €9', priceUnit: '/mo', badge: 'Newsletter', ctaHref: '/services/ai-web-development-newsletter/', ctaLabel: 'Subscribe →' },
        { title: 'Web Project Coaching', description: 'One-on-one sessions to debug, clarify and structure your React / Node / AI-generated project.', price: '€90', priceUnit: '/ 1h', badge: 'Coaching', ctaHref: '/services/web-project-coaching/', ctaLabel: 'Learn more →' },
        { title: 'Full-stack Development Day', description: 'Focused half- or full-day blocks for a clear feature, bug fix, dashboard or refactor.', price: 'from €350', priceUnit: '/ day', badge: 'Delivery', ctaHref: '/services/full-stack-development-day/', ctaLabel: 'Learn more →' },
        { title: 'AI Clarity Bootstrap Workshop', description: 'Turn an idea into a realistic MVP plan: scope, user flows, stack, roadmap and budget.', price: 'from €650', priceUnit: '/ day', badge: 'Workshop', featured: true, ctaHref: '/services/mvp-bootstrapping-workshop/', ctaLabel: 'Learn more →' },
        { title: 'Custom MVP Development', description: 'A working web app from scope to deployment — frontend, backend, database and handover.', price: 'from €4,500', badge: 'MVP', ctaHref: '/services/mvp-development/', ctaLabel: 'Learn more →' },
      ],
      notSure: { title: 'Not sure where to start?', body: "Book a free 30-minute call. I'll help you figure out the right next step for your project.", askQuestion: 'Ask a question' },
    },
    process: {
      eyebrow: 'Process',
      title: 'How a session works.',
      description: 'From first call to shipped code — the same delivery flow on every engagement.',
      steps: [
        { title: 'Clarify the real goal', description: "I'll map the user, business goal, current state, constraints and the smallest useful outcome with you." },
        { title: 'Reduce the scope', description: 'The work is translated into a buildable slice: features, risks, dependencies, assumptions and success criteria.' },
        { title: 'Build with visibility', description: 'Implementation happens in focused blocks with practical notes, trade-offs and concrete next steps.' },
        { title: 'Handover or continue', description: 'You leave with working software, a clearer roadmap, or a defined next session depending on the offer.' },
      ],
    },
    projects: {
      eyebrow: 'Recent work',
      title: 'AI-assisted web projects shipped end-to-end.',
      description: 'Real React, Node.js and TypeScript products — desktop apps, web tools and games. Click any project to read the full case study.',
    },
    testimonials: {
      eyebrow: 'Real feedback',
      title: 'What founders and developers say.',
      cards: [
        { testimonial: 'Placeholder for founder feedback on turning an unclear product idea into a realistic build plan.', name: 'Founder', designation: 'MVP workshop client', company: 'Coming soon' },
        { testimonial: 'Placeholder for developer feedback on debugging, architecture guidance and understanding AI-generated code.', name: 'Developer', designation: 'Coaching client', company: 'Coming soon' },
        { testimonial: 'Placeholder for business feedback on a focused development day that shipped a scoped feature.', name: 'Team lead', designation: 'Development day client', company: 'Coming soon' },
      ],
    },
    techStack: { eyebrow: 'Tech stack', title: 'React, Node.js, TypeScript and AI tools used daily.' },
    pricing: {
      eyebrow: 'Pricing',
      title: 'Pick your plan.',
      description: 'All sessions include clear deliverables. Book a call if you need a custom quote.',
      plans: [
        { title: 'Coaching Session', description: 'For a blocker, review or technical decision.', price: '90 EUR', period: '/hour', features: ['Project diagnosis', 'Architecture advice', 'AI-generated code review', 'Written next steps'], ctaHref: '/services/web-project-coaching/', ctaLabel: 'See plans →' },
        { title: 'Development Day', description: 'For a scoped feature, bug or cleanup.', price: '600 EUR', period: '/day', features: ['Focused implementation', 'React and Node.js work', 'Delivery notes', 'Optional follow-up session'], featured: true, ctaHref: '/services/full-stack-development-day/', ctaLabel: 'See plans →' },
        { title: 'MVP Workshop', description: 'For founders who need a realistic product plan.', price: '650 EUR', period: '/day', features: ['MVP scope', 'Feature priorities', 'Tech stack recommendation', 'Roadmap and risk map'], ctaHref: '/services/mvp-bootstrapping-workshop/', ctaLabel: 'See plans →' },
      ],
    },
    newsletter: {
      tag: 'Free + Paid',
      h2: 'Stay ahead of AI web dev without the noise.',
      lead: "A practical monthly briefing for builders. What's worth testing, what to ignore, and the prompts and workflows I actually use.",
      note: 'Free sample available · Solo €9/mo · Pro €19/mo · cancel anytime',
      issue: [
        'Claude Code workflows for React projects',
        'Cursor vs Claude Code: what to use and when',
        'AI agents for solo founders',
        '3 AI-powered MVP ideas worth testing',
        'Tool of the month',
        'Prompt of the month',
        'What to ignore this month',
      ],
    },
    faq: {
      eyebrow: 'Questions',
      title: 'Common questions answered.',
      description: 'Still not sure? Book a free 30-minute call.',
      items: [
        { question: 'Do I need to be technical?', answer: 'No. Every service adapts to non-technical founders, beginners or developers. The goal is that you always leave knowing what to build and why.' },
        { question: 'How much does an MVP cost?', answer: 'MVP development starts at €4,500, with most projects landing between €6,000 and €15,000 depending on scope. I confirm a fixed quote after a short discovery.' },
        { question: 'Can you help with AI-generated code?', answer: 'Yes — understanding, debugging and cleaning up code from ChatGPT, Claude, Cursor or Copilot is one of the most common reasons people book a session.' },
        { question: 'Can coaching turn into a full build?', answer: 'Often. If the scope becomes clear, we move from coaching to development days or a custom MVP project — no need to start over with someone new.' },
      ],
    },
    finalCta: {
      eyebrow: 'START HERE',
      h2: 'Bring me your idea, blocker or product goal.',
      lead: "I'll help you clarify it, understand it, build it and launch it. Start with a call — I'll find the right next step with you.",
      primaryCta: 'Book a project call',
      secondaryCta: 'See all services',
    },
  },
  fr: {
    meta: {
      title: 'Développement web full-stack, workflows IA et coaching technique — fullstackchris.dev',
      description:
        "J'aide les fondateurs, freelances et petites équipes à clarifier, construire et lancer des projets web avec React, Node.js, TypeScript et des workflows de développement assisté par IA concrets — développement full-stack, coaching projet, feuille de route MVP et développement MVP sur mesure.",
    },
    jsonLd: {
      jobTitle: 'Développeur Full-Stack',
      websiteDescription: 'Développement full-stack, coaching et services MVP pour fondateurs et développeurs.',
    },
    why: {
      eyebrow: 'POURQUOI TRAVAILLER AVEC MOI',
      title: "Du concret livré, des explications claires, de l'IA quand elle aide vraiment.",
      cards: [
        { title: 'Je peux vous l\'expliquer', body: "~7 000 heures d'enseignement en développement web me permettent de couper court au jargon et d'aider les fondateurs non techniques à prendre des décisions avec confiance." },
        { title: 'Je peux le cadrer', body: "Je transforme une idée floue en MVP priorisé et un budget réaliste — pour ne pas perdre des semaines à construire la mauvaise chose." },
        { title: 'Je peux le construire', body: 'React, Next.js, Node, TypeScript et Postgres — livrés en production, avec des workflows assistés par IA là où ils aident vraiment.' },
      ],
    },
    services: {
      eyebrow: 'CE QUE JE PROPOSE',
      title: 'Un parcours clair, du premier appel au produit lancé.',
      description: "Commencez où vous en êtes. Chaque service passe le relais proprement au suivant — clarté, puis développement ciblé, puis MVP complet.",
      offers: [
        { title: 'Newsletter Dev Web IA', description: 'Un briefing mensuel sans blabla sur les outils IA, les workflows de code et les idées de MVP qui valent le coup d\'être testées.', price: 'dès 9 €', priceUnit: '/mois', badge: 'Newsletter', ctaHref: '/services/ai-web-development-newsletter/', ctaLabel: "S'abonner →" },
        { title: 'Coaching Projet Web', description: 'Sessions individuelles pour déboguer, clarifier et structurer votre projet React / Node / généré par IA.', price: '90 €', priceUnit: '/ 1h', badge: 'Coaching', ctaHref: '/services/web-project-coaching/', ctaLabel: 'En savoir plus →' },
        { title: 'Journée de Développement Full-Stack', description: 'Blocs ciblés d\'une demi-journée ou d\'une journée pour une fonctionnalité claire, un correctif, un dashboard ou un refactor.', price: 'dès 350 €', priceUnit: '/ jour', badge: 'Livraison', ctaHref: '/services/full-stack-development-day/', ctaLabel: 'En savoir plus →' },
        { title: 'Atelier AI Clarity Bootstrap', description: 'Transformez une idée en plan MVP réaliste : cadrage, parcours utilisateur, stack, feuille de route et budget.', price: 'dès 650 €', priceUnit: '/ jour', badge: 'Atelier', featured: true, ctaHref: '/services/mvp-bootstrapping-workshop/', ctaLabel: 'En savoir plus →' },
        { title: 'Développement MVP sur mesure', description: 'Une application web fonctionnelle du cadrage au déploiement — frontend, backend, base de données et passation.', price: 'dès 4 500 €', badge: 'MVP', ctaHref: '/services/mvp-development/', ctaLabel: 'En savoir plus →' },
      ],
      notSure: { title: 'Pas sûr par où commencer ?', body: "Réservez un appel gratuit de 30 minutes. Je vous aide à trouver la bonne prochaine étape pour votre projet.", askQuestion: 'Poser une question' },
    },
    process: {
      eyebrow: 'Processus',
      title: 'Comment se déroule une session.',
      description: 'Du premier appel au code livré — le même déroulé sur chaque mission.',
      steps: [
        { title: "Clarifier le véritable objectif", description: "Je cartographie avec vous l'utilisateur, l'objectif business, l'état actuel, les contraintes et le plus petit résultat utile." },
        { title: 'Réduire le périmètre', description: 'Le travail est traduit en une tranche réalisable : fonctionnalités, risques, dépendances, hypothèses et critères de succès.' },
        { title: 'Construire avec visibilité', description: "L'implémentation se fait par blocs ciblés avec des notes pratiques, des compromis et des prochaines étapes concrètes." },
        { title: 'Passation ou poursuite', description: 'Vous repartez avec un logiciel fonctionnel, une feuille de route plus claire, ou une prochaine session définie selon l\'offre.' },
      ],
    },
    projects: {
      eyebrow: 'Travaux récents',
      title: 'Des projets web assistés par IA, livrés de bout en bout.',
      description: 'De vrais produits React, Node.js et TypeScript — applications desktop, outils web et jeux. Cliquez sur un projet pour lire l\'étude de cas complète.',
    },
    testimonials: {
      eyebrow: 'Retours réels',
      title: 'Ce que disent fondateurs et développeurs.',
      cards: [
        { testimonial: "Emplacement pour un retour de fondateur sur la transformation d'une idée produit floue en plan de construction réaliste.", name: 'Fondateur', designation: 'Client atelier MVP', company: 'Bientôt disponible' },
        { testimonial: "Emplacement pour un retour de développeur sur le débogage, les conseils d'architecture et la compréhension de code généré par IA.", name: 'Développeur', designation: 'Client coaching', company: 'Bientôt disponible' },
        { testimonial: "Emplacement pour un retour business sur une journée de développement ciblée ayant livré une fonctionnalité cadrée.", name: 'Chef d\'équipe', designation: 'Client journée de développement', company: 'Bientôt disponible' },
      ],
    },
    techStack: { eyebrow: 'Stack technique', title: 'React, Node.js, TypeScript et outils IA utilisés au quotidien.' },
    pricing: {
      eyebrow: 'Tarifs',
      title: 'Choisissez votre formule.',
      description: 'Toutes les sessions incluent des livrables clairs. Réservez un appel pour un devis sur mesure.',
      plans: [
        { title: 'Session de Coaching', description: 'Pour un blocage, une revue ou une décision technique.', price: '90 EUR', period: '/heure', features: ['Diagnostic de projet', "Conseils d'architecture", 'Revue de code généré par IA', 'Prochaines étapes écrites'], ctaHref: '/services/web-project-coaching/', ctaLabel: 'Voir les formules →' },
        { title: 'Journée de Développement', description: 'Pour une fonctionnalité cadrée, un bug ou un nettoyage.', price: '600 EUR', period: '/jour', features: ['Implémentation ciblée', 'Travail React et Node.js', 'Notes de livraison', 'Session de suivi optionnelle'], featured: true, ctaHref: '/services/full-stack-development-day/', ctaLabel: 'Voir les formules →' },
        { title: 'Atelier MVP', description: 'Pour les fondateurs qui ont besoin d\'un plan produit réaliste.', price: '650 EUR', period: '/jour', features: ['Cadrage MVP', 'Priorités des fonctionnalités', 'Recommandation de stack technique', 'Feuille de route et carte des risques'], ctaHref: '/services/mvp-bootstrapping-workshop/', ctaLabel: 'Voir les formules →' },
      ],
    },
    newsletter: {
      tag: 'Gratuit + Payant',
      h2: 'Restez à la pointe du dev web IA sans le bruit.',
      lead: "Un briefing mensuel concret pour les builders. Ce qui vaut le coup d'être testé, ce qu'il faut ignorer, et les prompts et workflows que j'utilise réellement.",
      note: 'Échantillon gratuit disponible · Solo 9 €/mois · Pro 19 €/mois · annulez à tout moment',
      issue: [
        'Workflows Claude Code pour projets React',
        'Cursor vs Claude Code : quoi utiliser et quand',
        'Agents IA pour fondateurs solo',
        '3 idées de MVP boostées à l\'IA qui valent le coup d\'être testées',
        'Outil du mois',
        'Prompt du mois',
        'Ce qu\'il faut ignorer ce mois-ci',
      ],
    },
    faq: {
      eyebrow: 'Questions',
      title: 'Questions fréquentes.',
      description: 'Toujours pas sûr ? Réservez un appel gratuit de 30 minutes.',
      items: [
        { question: 'Dois-je être technique ?', answer: "Non. Chaque service s'adapte aux fondateurs non techniques, débutants ou développeurs. L'objectif est que vous repartiez toujours en sachant quoi construire et pourquoi." },
        { question: 'Combien coûte un MVP ?', answer: 'Le développement MVP démarre à 4 500 €, la plupart des projets se situant entre 6 000 € et 15 000 € selon le périmètre. Je confirme un devis fixe après une courte découverte.' },
        { question: 'Pouvez-vous aider avec du code généré par IA ?', answer: "Oui — comprendre, déboguer et nettoyer du code venant de ChatGPT, Claude, Cursor ou Copilot est l'une des raisons les plus courantes de réserver une session." },
        { question: 'Le coaching peut-il se transformer en développement complet ?', answer: 'Souvent. Si le périmètre devient clair, on passe du coaching à des journées de développement ou un projet MVP sur mesure — pas besoin de repartir de zéro avec quelqu\'un d\'autre.' },
      ],
    },
    finalCta: {
      eyebrow: 'COMMENCEZ ICI',
      h2: 'Apportez-moi votre idée, votre blocage ou votre objectif produit.',
      lead: "Je vous aide à le clarifier, le comprendre, le construire et le lancer. Commencez par un appel — je trouve la bonne prochaine étape avec vous.",
      primaryCta: 'Réserver un appel projet',
      secondaryCta: 'Voir tous les services',
    },
  },
  es: {
    meta: {
      title: 'Desarrollo web Full-Stack, flujos de IA y coaching técnico — fullstackchris.dev',
      description:
        'Ayudo a fundadores, freelancers y equipos pequeños a clarificar, construir y lanzar proyectos web usando React, Node.js, TypeScript y flujos de desarrollo asistidos por IA — desarrollo full-stack, coaching de proyectos, hoja de ruta de MVP y desarrollo de MVP a medida.',
    },
    jsonLd: {
      jobTitle: 'Desarrollador Full-Stack',
      websiteDescription: 'Desarrollo full-stack, coaching y servicios de MVP para fundadores y desarrolladores.',
    },
    why: {
      eyebrow: 'POR QUÉ TRABAJAR CONMIGO',
      title: 'Entrega concreta, explicaciones claras e IA solo cuando aporta.',
      cards: [
        { title: 'Puedo explicarlo', body: '~7000 horas enseñando desarrollo web me permiten cortar la jerga y ayudar a fundadores no técnicos a tomar decisiones con confianza.' },
        { title: 'Puedo definir el alcance', body: 'Convierto una idea vaga en un MVP priorizado y un presupuesto realista — para que no pierdas semanas construyendo lo que no toca.' },
        { title: 'Puedo construirlo', body: 'React, Next.js, Node, TypeScript y Postgres — entregados en producción, con flujos asistidos por IA donde realmente ayudan.' },
      ],
    },
    services: {
      eyebrow: 'QUÉ OFREZCO',
      title: 'Un camino claro, desde la primera llamada hasta el producto lanzado.',
      description: 'Empieza donde estés. Cada servicio da paso limpiamente al siguiente — claridad, luego construcción enfocada, luego un MVP completo.',
      offers: [
        { title: 'Newsletter de Desarrollo Web con IA', description: 'Un resumen mensual sin exageraciones sobre herramientas de IA, flujos de trabajo de código e ideas de MVP que vale la pena probar.', price: 'desde 9 €', priceUnit: '/mes', badge: 'Newsletter', ctaHref: '/services/ai-web-development-newsletter/', ctaLabel: 'Suscribirse →' },
        { title: 'Coaching de Proyecto Web', description: 'Sesiones individuales para depurar, clarificar y estructurar tu proyecto React / Node / generado por IA.', price: '90 €', priceUnit: '/ 1h', badge: 'Coaching', ctaHref: '/services/web-project-coaching/', ctaLabel: 'Saber más →' },
        { title: 'Jornada de Desarrollo Full-Stack', description: 'Bloques enfocados de medio día o día completo para una funcionalidad clara, corrección de errores, dashboard o refactor.', price: 'desde 350 €', priceUnit: '/ día', badge: 'Entrega', ctaHref: '/services/full-stack-development-day/', ctaLabel: 'Saber más →' },
        { title: 'Taller AI Clarity Bootstrap', description: 'Convierte una idea en un plan de MVP realista: alcance, flujos de usuario, stack, hoja de ruta y presupuesto.', price: 'desde 650 €', priceUnit: '/ día', badge: 'Taller', featured: true, ctaHref: '/services/mvp-bootstrapping-workshop/', ctaLabel: 'Saber más →' },
        { title: 'Desarrollo de MVP a Medida', description: 'Una aplicación web funcional desde el alcance hasta el despliegue — frontend, backend, base de datos y entrega.', price: 'desde 4500 €', badge: 'MVP', ctaHref: '/services/mvp-development/', ctaLabel: 'Saber más →' },
      ],
      notSure: { title: '¿No sabes por dónde empezar?', body: 'Reserva una llamada gratuita de 30 minutos. Te ayudo a encontrar el siguiente paso adecuado para tu proyecto.', askQuestion: 'Hacer una pregunta' },
    },
    process: {
      eyebrow: 'Proceso',
      title: 'Cómo funciona una sesión.',
      description: 'Desde la primera llamada hasta el código entregado — el mismo flujo de entrega en cada proyecto.',
      steps: [
        { title: 'Clarificar el objetivo real', description: 'Mapeamos juntos el usuario, el objetivo de negocio, el estado actual, las restricciones y el resultado útil más pequeño.' },
        { title: 'Reducir el alcance', description: 'El trabajo se traduce en una porción construible: funcionalidades, riesgos, dependencias, suposiciones y criterios de éxito.' },
        { title: 'Construir con visibilidad', description: 'La implementación ocurre en bloques enfocados con notas prácticas, compensaciones y próximos pasos concretos.' },
        { title: 'Entrega o continuación', description: 'Te vas con software funcionando, una hoja de ruta más clara, o una próxima sesión definida según la oferta.' },
      ],
    },
    projects: {
      eyebrow: 'Trabajo reciente',
      title: 'Proyectos web asistidos por IA entregados de principio a fin.',
      description: 'Productos reales en React, Node.js y TypeScript — aplicaciones de escritorio, herramientas web y juegos. Haz clic en cualquier proyecto para leer el caso de estudio completo.',
    },
    testimonials: {
      eyebrow: 'Comentarios reales',
      title: 'Lo que dicen fundadores y desarrolladores.',
      cards: [
        { testimonial: 'Espacio reservado para comentarios de un fundador sobre cómo convertir una idea de producto poco clara en un plan de construcción realista.', name: 'Fundador', designation: 'Cliente de taller MVP', company: 'Próximamente' },
        { testimonial: 'Espacio reservado para comentarios de un desarrollador sobre depuración, orientación de arquitectura y comprensión de código generado por IA.', name: 'Desarrollador', designation: 'Cliente de coaching', company: 'Próximamente' },
        { testimonial: 'Espacio reservado para comentarios de negocio sobre una jornada de desarrollo enfocada que entregó una funcionalidad acotada.', name: 'Líder de equipo', designation: 'Cliente de jornada de desarrollo', company: 'Próximamente' },
      ],
    },
    techStack: { eyebrow: 'Stack tecnológico', title: 'React, Node.js, TypeScript y herramientas de IA de uso diario.' },
    pricing: {
      eyebrow: 'Precios',
      title: 'Elige tu plan.',
      description: 'Todas las sesiones incluyen entregables claros. Reserva una llamada si necesitas un presupuesto a medida.',
      plans: [
        { title: 'Sesión de Coaching', description: 'Para un bloqueo, revisión o decisión técnica.', price: '90 EUR', period: '/hora', features: ['Diagnóstico de proyecto', 'Asesoría de arquitectura', 'Revisión de código generado por IA', 'Próximos pasos por escrito'], ctaHref: '/services/web-project-coaching/', ctaLabel: 'Ver planes →' },
        { title: 'Jornada de Desarrollo', description: 'Para una funcionalidad acotada, un bug o una limpieza.', price: '600 EUR', period: '/día', features: ['Implementación enfocada', 'Trabajo en React y Node.js', 'Notas de entrega', 'Sesión de seguimiento opcional'], featured: true, ctaHref: '/services/full-stack-development-day/', ctaLabel: 'Ver planes →' },
        { title: 'Taller MVP', description: 'Para fundadores que necesitan un plan de producto realista.', price: '650 EUR', period: '/día', features: ['Alcance del MVP', 'Prioridades de funcionalidades', 'Recomendación de stack tecnológico', 'Hoja de ruta y mapa de riesgos'], ctaHref: '/services/mvp-bootstrapping-workshop/', ctaLabel: 'Ver planes →' },
      ],
    },
    newsletter: {
      tag: 'Gratis + De pago',
      h2: 'Mantente a la vanguardia del desarrollo web con IA sin el ruido.',
      lead: 'Un resumen mensual práctico para builders. Qué vale la pena probar, qué ignorar, y los prompts y flujos de trabajo que realmente uso.',
      note: 'Muestra gratuita disponible · Solo 9 €/mes · Pro 19 €/mes · cancela cuando quieras',
      issue: [
        'Flujos de trabajo de Claude Code para proyectos React',
        'Cursor vs Claude Code: qué usar y cuándo',
        'Agentes de IA para fundadores solitarios',
        '3 ideas de MVP potenciadas por IA que vale la pena probar',
        'Herramienta del mes',
        'Prompt del mes',
        'Qué ignorar este mes',
      ],
    },
    faq: {
      eyebrow: 'Preguntas',
      title: 'Preguntas frecuentes respondidas.',
      description: '¿Aún no estás seguro? Reserva una llamada gratuita de 30 minutos.',
      items: [
        { question: '¿Necesito ser técnico?', answer: 'No. Cada servicio se adapta a fundadores no técnicos, principiantes o desarrolladores. El objetivo es que siempre te vayas sabiendo qué construir y por qué.' },
        { question: '¿Cuánto cuesta un MVP?', answer: 'El desarrollo de MVP empieza en 4500 €, con la mayoría de proyectos entre 6000 € y 15 000 € según el alcance. Confirmo un presupuesto fijo tras un breve descubrimiento.' },
        { question: '¿Puedes ayudar con código generado por IA?', answer: 'Sí — entender, depurar y limpiar código de ChatGPT, Claude, Cursor o Copilot es una de las razones más comunes para reservar una sesión.' },
        { question: '¿El coaching puede convertirse en un desarrollo completo?', answer: 'A menudo. Si el alcance se aclara, pasamos del coaching a jornadas de desarrollo o a un proyecto de MVP a medida — sin necesidad de empezar de cero con otra persona.' },
      ],
    },
    finalCta: {
      eyebrow: 'EMPIEZA AQUÍ',
      h2: 'Tráeme tu idea, bloqueo u objetivo de producto.',
      lead: 'Te ayudo a clarificarlo, entenderlo, construirlo y lanzarlo. Empieza con una llamada — encontramos juntos el siguiente paso adecuado.',
      primaryCta: 'Reservar una llamada de proyecto',
      secondaryCta: 'Ver todos los servicios',
    },
  },
};
