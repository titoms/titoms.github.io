export interface AboutContent {
  meta: { title: string; description: string };
  jsonLd: { jobTitle: string; description: string };
  breadcrumbCurrent: string;
  eyebrow: string;
  h1Line1: string;
  h1Accent: string;
  lead: string;
  heroMeta: { teachingHours: string; productionShipping: string; devAiTeaching: string };
  portraitAlt: string;
  availableForProjects: string;
  approach: {
    eyebrow: string;
    h2: string;
    lead: string;
    cards: { key: string; title: string; body: string }[];
  };
  bio: {
    eyebrow: string;
    h2: string;
    paragraphs: string[];
    highlights: string[];
  };
  glance: {
    eyebrow: string;
    role: { label: string; value: string };
    focus: { label: string; value: string };
    stack: { label: string; value: string };
    teaching: { label: string; value: string };
  };
  experience: {
    eyebrow: string;
    h2: string;
    lead: string;
    nowBadge: string;
    jobs: { title: string; points: string[] }[];
  };
  techStack: { eyebrow: string; h2: string; lead: string };
  cta: { eyebrow: string; h2: string; lead: string };
}

export const about: Record<'en' | 'fr' | 'es', AboutContent> = {
  en: {
    meta: {
      title: 'About — Christophe Crognier, AI-Assisted Full-Stack Web Developer | fullstackchris.dev',
      description:
        'AI-assisted full-stack web developer and technical coach. I build React, Node.js and TypeScript web apps end to end — from MVP scope and architecture to deployment, automation and AI workflows.',
    },
    jsonLd: {
      jobTitle: 'AI Fullstack Engineer',
      description:
        'AI Fullstack Engineer building scalable applications and automation systems — designing and shipping production-ready products from architecture to deployment.',
    },
    breadcrumbCurrent: 'About',
    eyebrow: 'AI FULLSTACK ENGINEER',
    h1Line1: 'Production-ready products,',
    h1Accent: 'end to end.',
    lead: 'I design and ship scalable web applications and modern AI-enhanced systems — from system architecture and backend engineering to frontend interfaces, deployment pipelines and automation workflows.',
    heroMeta: {
      teachingHours: 'Teaching hours',
      productionShipping: 'Production shipping',
      devAiTeaching: 'Dev + AI + teaching',
    },
    portraitAlt: 'Christophe Crognier, AI Fullstack Engineer',
    availableForProjects: 'Available for projects',
    approach: {
      eyebrow: 'APPROACH',
      h2: 'Pragmatic engineering, production-ready by default.',
      lead: 'I position myself at the intersection of fullstack engineering, automation and applied AI — helping companies ship robust products faster while maintaining high engineering standards.',
      cards: [
        {
          key: '01 · FULLSTACK ENGINEERING',
          title: 'Production-ready end to end',
          body: 'Architecture, backend, frontend interfaces and deployment pipelines — built with maintainability and pragmatic decision-making so products can evolve safely as usage grows.',
        },
        {
          key: '02 · AUTOMATION',
          title: 'Systems that run themselves',
          body: 'Real-time data processing, transactional logic, scheduled jobs and analytics pipelines — designed to solve real operational problems rather than experimental prototypes.',
        },
        {
          key: '03 · APPLIED AI',
          title: 'AI tooling that ships',
          body: 'Combining traditional software engineering practices with modern AI tooling to create reliable systems — including on-device inference, AI-assisted workflows and intelligent automation.',
        },
      ],
    },
    bio: {
      eyebrow: 'WHO I AM',
      h2: 'A fullstack engineer who can also explain the system.',
      paragraphs: [
        "I'm a fullstack engineer specialised in designing and delivering scalable web applications and modern AI-enhanced systems. My work focuses on building production-ready products end to end — combining traditional software engineering practices with emerging AI tooling to create reliable systems that solve real operational problems rather than experimental prototypes.",
        'Over the past years I have built multiple complex applications involving real-time data processing, transactional logic, scheduled automation, analytics pipelines and user-centric interfaces. My approach emphasises maintainability, performance and pragmatic decision-making, ensuring that products can evolve safely as usage grows.',
        'Beyond development, my experience as a programming instructor — 7,000+ hours of teaching — strengthened my ability to structure complex systems clearly, communicate technical decisions effectively, and design architectures that remain understandable for teams over time.',
      ],
      highlights: ['My work focuses on building production-ready products end to end', 'maintainability, performance and pragmatic decision-making', '7,000+ hours of teaching'],
    },
    glance: {
      eyebrow: 'AT A GLANCE',
      role: { label: 'Role', value: 'AI Fullstack Engineer' },
      focus: { label: 'Focus', value: 'Scalable web apps · Automation · Applied AI' },
      stack: { label: 'Stack signature', value: 'React · Node.js · TypeScript · Rust · Tauri · Cloudflare' },
      teaching: { label: 'Teaching', value: '7,000+ hours instructing web development' },
    },
    experience: {
      eyebrow: 'EXPERIENCE',
      h2: 'Career timeline.',
      lead: "From front-end roles at European event platforms to freelance fullstack work and 7,000+ hours of teaching — a decade of shipping and explaining software.",
      nowBadge: 'Now',
      jobs: [
        {
          title: 'Front End Developer',
          points: [
            'Developing and maintaining web pages for major European Events',
            'Creation of landing pages for subscriptions',
            'Implementing responsive design and ensuring cross-browser compatibility.',
            'Working in a agile environment',
          ],
        },
        {
          title: 'Back End Developer',
          points: [
            'Developing and maintaining web applications using AngularJS, CakePHP and other related technologies.',
            'Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.',
            'Implementing responsive design and ensuring cross-browser compatibility.',
            'Participating in code reviews and providing constructive feedback to other developers.',
          ],
        },
        {
          title: 'Back End Developer',
          points: [
            'Creation and maintaining of automation bots',
            'Working close with client for better customization of the product',
            'Implementing automation tasks in several technologies as Javascript, PHP and Java',
          ],
        },
        {
          title: 'Full Stack Developer',
          points: [
            'Developing a activity reservation Progressive Web App using ReactJS',
            'Conception and deployment of an API using NodeJS and Express framework',
            'Implementing a CI/CD pipeline for test and deployment automation using Jenkins, Git and Docker',
            'Creation of large variety of tests, unitary, functional and end to end testing',
          ],
        },
        {
          title: 'Freelance Web Developer',
          points: [
            'As a Freelance Full Stack Developer, I design and build custom web applications from concept to production.',
            'I work across the entire development lifecycle including architecture design, front-end and back-end implementation, database modeling, deployment and maintenance.',
            'My work primarily focuses on scalable React and Node.js applications, API development, automation workflows and production-ready systems deployed using modern DevOps practices.',
            'I collaborate directly with clients to transform business ideas into functional digital products, ensuring performance, maintainability and long-term scalability while adapting quickly to evolving project requirements.',
          ],
        },
        {
          title: 'Freelance Programming Teacher',
          points: [
            'As an Independent Programming Instructor, I have delivered over 7,000 hours of technical training in private higher-education institutions, teaching students from Bachelor to Master level.',
            'My teaching covers both theoretical foundations and real-world software engineering practices, helping students understand not only how to code but how to design, structure and communicate complex technical systems.',
            'This experience has strengthened my ability to break down complex concepts, document architectures clearly and collaborate efficiently with both technical and non-technical stakeholders — skills directly transferable to professional software development environments.',
          ],
        },
      ],
    },
    techStack: {
      eyebrow: 'TECH STACK',
      h2: 'Tools used daily.',
      lead: 'The proven toolchain behind everything I ship — plus the AI tools that have become part of the workflow.',
    },
    cta: {
      eyebrow: 'WORK WITH ME',
      h2: "Bring me your product goal — I'll help you ship it.",
      lead: "Fullstack engineering, automation and applied AI, built to production standards. Let's find the right next step on a call.",
    },
  },
  fr: {
    meta: {
      title: 'À propos — Christophe Crognier, développeur Full-Stack assisté par IA | fullstackchris.dev',
      description:
        "Développeur full-stack assisté par IA et coach technique. Je conçois des applications React, Node.js et TypeScript de bout en bout — du cadrage MVP et de l'architecture jusqu'au déploiement, à l'automatisation et aux workflows IA.",
    },
    jsonLd: {
      jobTitle: 'Ingénieur Fullstack IA',
      description:
        "Ingénieur Fullstack IA construisant des applications évolutives et des systèmes d'automatisation — concevant et livrant des produits prêts pour la production, de l'architecture au déploiement.",
    },
    breadcrumbCurrent: 'À propos',
    eyebrow: 'INGÉNIEUR FULLSTACK IA',
    h1Line1: 'Des produits prêts pour la production,',
    h1Accent: 'de bout en bout.',
    lead: "Je conçois et livre des applications web évolutives et des systèmes modernes enrichis par l'IA — de l'architecture système et l'ingénierie back-end aux interfaces front-end, pipelines de déploiement et workflows d'automatisation.",
    heroMeta: {
      teachingHours: "Heures d'enseignement",
      productionShipping: 'Mise en production',
      devAiTeaching: 'Dev + IA + enseignement',
    },
    portraitAlt: 'Christophe Crognier, Ingénieur Fullstack IA',
    availableForProjects: 'Disponible pour des projets',
    approach: {
      eyebrow: 'APPROCHE',
      h2: 'Ingénierie pragmatique, prête pour la production par défaut.',
      lead: "Je me positionne à l'intersection de l'ingénierie fullstack, de l'automatisation et de l'IA appliquée — j'aide les entreprises à livrer des produits robustes plus rapidement tout en maintenant des standards d'ingénierie élevés.",
      cards: [
        {
          key: '01 · INGÉNIERIE FULLSTACK',
          title: 'Prêt pour la production, de bout en bout',
          body: 'Architecture, back-end, interfaces front-end et pipelines de déploiement — construits avec une maintenabilité et une prise de décision pragmatique pour que les produits évoluent en toute sécurité avec l\'usage.',
        },
        {
          key: '02 · AUTOMATISATION',
          title: 'Des systèmes qui tournent seuls',
          body: "Traitement de données en temps réel, logique transactionnelle, tâches planifiées et pipelines analytiques — conçus pour résoudre de vrais problèmes opérationnels plutôt que des prototypes expérimentaux.",
        },
        {
          key: '03 · IA APPLIQUÉE',
          title: "Des outils IA qui sont livrés en production",
          body: "Combiner les pratiques traditionnelles du génie logiciel avec les outils IA modernes pour créer des systèmes fiables — y compris l'inférence embarquée, les workflows assistés par IA et l'automatisation intelligente.",
        },
      ],
    },
    bio: {
      eyebrow: 'QUI JE SUIS',
      h2: 'Un ingénieur fullstack capable aussi d\'expliquer le système.',
      paragraphs: [
        "Je suis un ingénieur fullstack spécialisé dans la conception et la livraison d'applications web évolutives et de systèmes modernes enrichis par l'IA. Mon travail se concentre sur la construction de produits prêts pour la production de bout en bout — combinant les pratiques traditionnelles du génie logiciel avec les outils IA émergents pour créer des systèmes fiables qui résolvent de vrais problèmes opérationnels plutôt que des prototypes expérimentaux.",
        "Au cours des dernières années, j'ai construit plusieurs applications complexes impliquant du traitement de données en temps réel, de la logique transactionnelle, de l'automatisation planifiée, des pipelines analytiques et des interfaces centrées utilisateur. Mon approche met l'accent sur la maintenabilité, la performance et une prise de décision pragmatique, garantissant que les produits évoluent en toute sécurité avec l'usage.",
        "Au-delà du développement, mon expérience en tant que formateur en programmation — plus de 7 000 heures d'enseignement — a renforcé ma capacité à structurer clairement des systèmes complexes, communiquer efficacement les décisions techniques, et concevoir des architectures qui restent compréhensibles pour les équipes dans la durée.",
      ],
      highlights: ['construction de produits prêts pour la production de bout en bout', 'maintenabilité, performance et prise de décision pragmatique', 'plus de 7 000 heures d\'enseignement'],
    },
    glance: {
      eyebrow: "EN BREF",
      role: { label: 'Rôle', value: 'Ingénieur Fullstack IA' },
      focus: { label: 'Focus', value: 'Applications web évolutives · Automatisation · IA appliquée' },
      stack: { label: 'Stack signature', value: 'React · Node.js · TypeScript · Rust · Tauri · Cloudflare' },
      teaching: { label: 'Enseignement', value: "Plus de 7 000 heures d'enseignement du développement web" },
    },
    experience: {
      eyebrow: 'EXPÉRIENCE',
      h2: 'Parcours professionnel.',
      lead: "Des rôles front-end sur des plateformes d'événements européennes au travail fullstack en freelance et plus de 7 000 heures d'enseignement — une décennie à livrer et expliquer des logiciels.",
      nowBadge: 'Actuel',
      jobs: [
        {
          title: 'Développeur Front End',
          points: [
            "Développement et maintenance de pages web pour de grands événements européens",
            "Création de landing pages pour des abonnements",
            "Mise en œuvre d'un design responsive et compatibilité multi-navigateurs.",
            "Travail dans un environnement agile",
          ],
        },
        {
          title: 'Développeur Back End',
          points: [
            "Développement et maintenance d'applications web avec AngularJS, CakePHP et d'autres technologies associées.",
            "Collaboration avec des équipes transverses incluant designers, product managers et autres développeurs pour créer des produits de haute qualité.",
            "Mise en œuvre d'un design responsive et compatibilité multi-navigateurs.",
            "Participation aux revues de code et retours constructifs à d'autres développeurs.",
          ],
        },
        {
          title: 'Développeur Back End',
          points: [
            "Création et maintenance de bots d'automatisation",
            "Travail rapproché avec le client pour une meilleure personnalisation du produit",
            "Mise en œuvre de tâches d'automatisation en Javascript, PHP et Java",
          ],
        },
        {
          title: 'Développeur Full Stack',
          points: [
            "Développement d'une Progressive Web App de réservation d'activités avec ReactJS",
            "Conception et déploiement d'une API avec NodeJS et le framework Express",
            "Mise en place d'un pipeline CI/CD pour l'automatisation des tests et du déploiement avec Jenkins, Git et Docker",
            "Création d'une large variété de tests unitaires, fonctionnels et de bout en bout",
          ],
        },
        {
          title: 'Développeur Web Freelance',
          points: [
            "En tant que développeur Full Stack indépendant, je conçois et construis des applications web sur mesure, du concept à la production.",
            "Je travaille sur l'ensemble du cycle de développement : conception d'architecture, implémentation front-end et back-end, modélisation de base de données, déploiement et maintenance.",
            "Mon travail se concentre principalement sur des applications React et Node.js évolutives, le développement d'API, les workflows d'automatisation et des systèmes prêts pour la production déployés avec des pratiques DevOps modernes.",
            "Je collabore directement avec les clients pour transformer des idées business en produits numériques fonctionnels, en garantissant performance, maintenabilité et évolutivité à long terme tout en m'adaptant rapidement à l'évolution des besoins du projet.",
          ],
        },
        {
          title: 'Formateur en Programmation Freelance',
          points: [
            "En tant que formateur indépendant en programmation, j'ai dispensé plus de 7 000 heures de formation technique dans des établissements d'enseignement supérieur privés, pour des étudiants de la Licence au Master.",
            "Mon enseignement couvre à la fois les fondamentaux théoriques et les pratiques concrètes du génie logiciel, aidant les étudiants à comprendre non seulement comment coder, mais comment concevoir, structurer et communiquer des systèmes techniques complexes.",
            "Cette expérience a renforcé ma capacité à décomposer des concepts complexes, documenter clairement les architectures et collaborer efficacement avec des interlocuteurs techniques et non techniques — des compétences directement transférables aux environnements professionnels de développement logiciel.",
          ],
        },
      ],
    },
    techStack: {
      eyebrow: 'STACK TECHNIQUE',
      h2: 'Outils utilisés au quotidien.',
      lead: "La chaîne d'outils éprouvée derrière tout ce que je livre — plus les outils IA devenus partie intégrante du workflow.",
    },
    cta: {
      eyebrow: 'TRAVAILLER ENSEMBLE',
      h2: 'Apportez-moi votre objectif produit — je vous aide à le livrer.',
      lead: "Ingénierie fullstack, automatisation et IA appliquée, construites selon des standards de production. Trouvons la bonne prochaine étape lors d'un appel.",
    },
  },
  es: {
    meta: {
      title: 'Acerca de — Christophe Crognier, desarrollador Full-Stack asistido por IA | fullstackchris.dev',
      description:
        'Desarrollador full-stack asistido por IA y coach técnico. Construyo aplicaciones web React, Node.js y TypeScript de principio a fin — desde el alcance del MVP y la arquitectura hasta el despliegue, la automatización y los flujos de IA.',
    },
    jsonLd: {
      jobTitle: 'Ingeniero Fullstack de IA',
      description:
        'Ingeniero Fullstack de IA que construye aplicaciones escalables y sistemas de automatización — diseñando y entregando productos listos para producción desde la arquitectura hasta el despliegue.',
    },
    breadcrumbCurrent: 'Acerca de',
    eyebrow: 'INGENIERO FULLSTACK DE IA',
    h1Line1: 'Productos listos para producción,',
    h1Accent: 'de principio a fin.',
    lead: 'Diseño y entrego aplicaciones web escalables y sistemas modernos potenciados por IA — desde la arquitectura de sistemas y la ingeniería backend hasta las interfaces frontend, los pipelines de despliegue y los flujos de automatización.',
    heroMeta: {
      teachingHours: 'Horas de docencia',
      productionShipping: 'Entrega en producción',
      devAiTeaching: 'Dev + IA + docencia',
    },
    portraitAlt: 'Christophe Crognier, Ingeniero Fullstack de IA',
    availableForProjects: 'Disponible para proyectos',
    approach: {
      eyebrow: 'ENFOQUE',
      h2: 'Ingeniería pragmática, lista para producción por defecto.',
      lead: 'Me sitúo en la intersección de la ingeniería fullstack, la automatización y la IA aplicada — ayudo a las empresas a entregar productos robustos más rápido, manteniendo altos estándares de ingeniería.',
      cards: [
        {
          key: '01 · INGENIERÍA FULLSTACK',
          title: 'Listo para producción, de principio a fin',
          body: 'Arquitectura, backend, interfaces frontend y pipelines de despliegue — construidos con mantenibilidad y toma de decisiones pragmática para que los productos evolucionen con seguridad a medida que crece el uso.',
        },
        {
          key: '02 · AUTOMATIZACIÓN',
          title: 'Sistemas que funcionan solos',
          body: 'Procesamiento de datos en tiempo real, lógica transaccional, tareas programadas y pipelines analíticos — diseñados para resolver problemas operativos reales en lugar de prototipos experimentales.',
        },
        {
          key: '03 · IA APLICADA',
          title: 'Herramientas de IA que llegan a producción',
          body: 'Combinando prácticas tradicionales de ingeniería de software con herramientas de IA modernas para crear sistemas fiables — incluyendo inferencia en el dispositivo, flujos asistidos por IA y automatización inteligente.',
        },
      ],
    },
    bio: {
      eyebrow: 'QUIÉN SOY',
      h2: 'Un ingeniero fullstack que también sabe explicar el sistema.',
      paragraphs: [
        'Soy un ingeniero fullstack especializado en diseñar y entregar aplicaciones web escalables y sistemas modernos potenciados por IA. Mi trabajo se centra en construir productos listos para producción de principio a fin — combinando prácticas tradicionales de ingeniería de software con herramientas de IA emergentes para crear sistemas fiables que resuelven problemas operativos reales en lugar de prototipos experimentales.',
        'En los últimos años he construido múltiples aplicaciones complejas que involucran procesamiento de datos en tiempo real, lógica transaccional, automatización programada, pipelines analíticos e interfaces centradas en el usuario. Mi enfoque enfatiza la mantenibilidad, el rendimiento y la toma de decisiones pragmática, garantizando que los productos puedan evolucionar con seguridad a medida que crece el uso.',
        'Más allá del desarrollo, mi experiencia como instructor de programación — más de 7000 horas de docencia — reforzó mi capacidad de estructurar sistemas complejos con claridad, comunicar decisiones técnicas de forma efectiva y diseñar arquitecturas que sigan siendo comprensibles para los equipos con el tiempo.',
      ],
      highlights: ['construir productos listos para producción de principio a fin', 'mantenibilidad, rendimiento y toma de decisiones pragmática', 'más de 7000 horas de docencia'],
    },
    glance: {
      eyebrow: 'UN VISTAZO',
      role: { label: 'Rol', value: 'Ingeniero Fullstack de IA' },
      focus: { label: 'Enfoque', value: 'Aplicaciones web escalables · Automatización · IA aplicada' },
      stack: { label: 'Stack principal', value: 'React · Node.js · TypeScript · Rust · Tauri · Cloudflare' },
      teaching: { label: 'Docencia', value: 'Más de 7000 horas enseñando desarrollo web' },
    },
    experience: {
      eyebrow: 'EXPERIENCIA',
      h2: 'Trayectoria profesional.',
      lead: 'Desde roles frontend en plataformas de eventos europeas hasta trabajo fullstack freelance y más de 7000 horas de docencia — una década entregando y explicando software.',
      nowBadge: 'Actual',
      jobs: [
        {
          title: 'Desarrollador Front End',
          points: [
            'Desarrollo y mantenimiento de páginas web para grandes eventos europeos',
            'Creación de landing pages para suscripciones',
            'Implementación de diseño responsive y compatibilidad entre navegadores.',
            'Trabajo en un entorno ágil',
          ],
        },
        {
          title: 'Desarrollador Back End',
          points: [
            'Desarrollo y mantenimiento de aplicaciones web usando AngularJS, CakePHP y otras tecnologías relacionadas.',
            'Colaboración con equipos multidisciplinares incluyendo diseñadores, product managers y otros desarrolladores para crear productos de alta calidad.',
            'Implementación de diseño responsive y compatibilidad entre navegadores.',
            'Participación en revisiones de código y retroalimentación constructiva a otros desarrolladores.',
          ],
        },
        {
          title: 'Desarrollador Back End',
          points: [
            'Creación y mantenimiento de bots de automatización',
            'Trabajo cercano con el cliente para una mejor personalización del producto',
            'Implementación de tareas de automatización en varias tecnologías como Javascript, PHP y Java',
          ],
        },
        {
          title: 'Desarrollador Full Stack',
          points: [
            'Desarrollo de una Progressive Web App de reserva de actividades usando ReactJS',
            'Diseño y despliegue de una API usando NodeJS y el framework Express',
            'Implementación de un pipeline CI/CD para automatización de pruebas y despliegue usando Jenkins, Git y Docker',
            'Creación de una amplia variedad de pruebas unitarias, funcionales y end to end',
          ],
        },
        {
          title: 'Desarrollador Web Freelance',
          points: [
            'Como desarrollador Full Stack freelance, diseño y construyo aplicaciones web a medida desde el concepto hasta la producción.',
            'Trabajo en todo el ciclo de desarrollo, incluyendo diseño de arquitectura, implementación frontend y backend, modelado de bases de datos, despliegue y mantenimiento.',
            'Mi trabajo se centra principalmente en aplicaciones React y Node.js escalables, desarrollo de APIs, flujos de automatización y sistemas listos para producción desplegados con prácticas DevOps modernas.',
            'Colaboro directamente con los clientes para transformar ideas de negocio en productos digitales funcionales, garantizando rendimiento, mantenibilidad y escalabilidad a largo plazo, adaptándome rápidamente a los requisitos cambiantes del proyecto.',
          ],
        },
        {
          title: 'Profesor de Programación Freelance',
          points: [
            'Como instructor independiente de programación, he impartido más de 7000 horas de formación técnica en instituciones privadas de educación superior, enseñando a estudiantes desde Grado hasta Máster.',
            'Mi docencia cubre tanto los fundamentos teóricos como las prácticas reales de ingeniería de software, ayudando a los estudiantes a entender no solo cómo programar, sino cómo diseñar, estructurar y comunicar sistemas técnicos complejos.',
            'Esta experiencia ha reforzado mi capacidad para descomponer conceptos complejos, documentar arquitecturas con claridad y colaborar eficazmente con interlocutores técnicos y no técnicos — habilidades directamente transferibles a entornos profesionales de desarrollo de software.',
          ],
        },
      ],
    },
    techStack: {
      eyebrow: 'STACK TECNOLÓGICO',
      h2: 'Herramientas de uso diario.',
      lead: 'El stack probado detrás de todo lo que entrego — más las herramientas de IA que ya forman parte del flujo de trabajo.',
    },
    cta: {
      eyebrow: 'TRABAJEMOS JUNTOS',
      h2: 'Trae tu objetivo de producto — te ayudo a entregarlo.',
      lead: 'Ingeniería fullstack, automatización e IA aplicada, construidas con estándares de producción. Encontremos el siguiente paso adecuado en una llamada.',
    },
  },
};
