export interface UiDictionary {
  nav: {
    home: string;
    about: string;
    services: string;
    projects: string;
    blog: string;
    contact: string;
    bookCall: string;
    openMenu: string;
    closeMenu: string;
  };
  languageSwitcher: { label: string };
  footer: {
    groups: {
      services: {
        title: string;
        links: {
          aiNewsletter: string;
          projectCoaching: string;
          developmentDay: string;
          mvpWorkshop: string;
        };
      };
      projects: { title: string };
      blog: {
        title: string;
        links: {
          aiAssistedDevelopment: string;
          mvpRoadmapWithAi: string;
          reactTypescriptNodeStack: string;
          claudeCodeWorkflows: string;
        };
      };
      contact: {
        title: string;
        bookCall: string;
        linkedin: string;
        github: string;
        twitter: string;
      };
      legal: {
        title: string;
        legalNotice: string;
        privacyPolicy: string;
        termsOfService: string;
        cookies: string;
      };
    };
    copyright: string;
  };
  newsletter: {
    honeypotLabel: string;
    emailLabel: string;
    placeholder: string;
    subscribe: string;
    sending: string;
    successFallback: string;
    errorFallback: string;
    confirmationHint: string;
  };
  processStepper: {
    ariaLabel: string;
    complete: string;
    inProgress: string;
  };
  techCategories: {
    frontend: string;
    backend: string;
    aiLlm: string;
    devopsTools: string;
    design: string;
  };
  common: {
    learnMore: string;
    readMore: string;
    caseStudy: string;
    testLive: string;
    backToBlog: string;
    allArticles: string;
    readArticle: string;
    previewArticle: string;
    seeServices: string;
    comingSoon: string;
    lastUpdated: string;
  };
  projectPage: {
    caseStudy: string;
    role: string;
    timeline: string;
    platform: string;
    type: string;
    visitProduct: string;
    readTechnicalBreakdown: string;
    primaryScreenshot: string;
    theProblem: string;
    theSolution: string;
    keyFeatures: string;
    builtAround: string;
    before: string;
    after: string;
    manualWorkflow: string;
    fragmentedTools: string;
    unifiedProduct: string;
    technicalChallenge: string;
    hardProblemsSolved: string;
    whatMadeItHard: string;
    theStack: string;
    technologiesUsed: string;
    whatThisProves: string;
    whatDemonstrates: string;
    workWithMe: string;
    wantToBuildSomethingLikeThis: string;
    bringMeYourIdea: string;
    requestDevelopmentHelp: string;
    nextCaseStudy: string;
    screenshotOf: string;
  };
  servicePage: {
    breadcrumbServices: string;
    leaveWith: string;
    whenToUse: string;
    youLeaveWith: string;
    soundFamiliar: string;
    needClarity: string;
    whatYouLeaveWith: string;
    everySessionEndsWithPlan: string;
    whatICanHelpWith: string;
    useCases: string;
    whatsIncluded: string;
    everySessionIncludes: string;
    isItAFit: string;
    bestResultsFromClearScope: string;
    goodFit: string;
    notAFit: string;
    pricing: string;
    investment: string;
    threeFormats: string;
    recommended: string;
    buyNow: string;
    bookACall: string;
    directPaymentComingSoon: string;
    bookASession: string;
    questions: string;
    commonQuestions: string;
    readyToGetStarted: string;
  };
}

const en: UiDictionary = {
  nav: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    projects: 'Projects',
    blog: 'Blog',
    contact: 'Contact',
    bookCall: 'Book a call',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  languageSwitcher: {
    label: 'Language',
  },
  footer: {
    groups: {
      services: {
        title: 'Services',
        links: {
          aiNewsletter: 'AI newsletter',
          projectCoaching: 'Project coaching',
          developmentDay: 'Development day',
          mvpWorkshop: 'MVP workshop',
        },
      },
      projects: {
        title: 'Projects',
      },
      blog: {
        title: 'Blog / resources',
        links: {
          aiAssistedDevelopment: 'AI-assisted development',
          mvpRoadmapWithAi: 'MVP roadmap with AI',
          reactTypescriptNodeStack: 'React TypeScript Node stack',
          claudeCodeWorkflows: 'Claude Code workflows',
        },
      },
      contact: {
        title: 'Contact',
        bookCall: 'Book a call',
        linkedin: 'LinkedIn',
        github: 'GitHub',
        twitter: 'X / Twitter',
      },
      legal: {
        title: 'Legal',
        legalNotice: 'Legal notice',
        privacyPolicy: 'Privacy policy',
        termsOfService: 'Terms of service',
        cookies: 'Cookies',
      },
    },
    copyright: 'fullstackchris.dev — Christophe Crognier',
  },
  newsletter: {
    honeypotLabel: 'Website',
    emailLabel: 'Email address',
    placeholder: 'you@example.com',
    subscribe: 'Subscribe',
    sending: 'Sending...',
    successFallback: 'Check your inbox to confirm your subscription.',
    errorFallback: 'Something went wrong. Please try again.',
    confirmationHint: "If confirmation is required, you'll receive an email from AI Clarity Newsletter shortly.",
  },
  processStepper: {
    ariaLabel: 'How a session works',
    complete: 'complete / shipped',
    inProgress: 'in progress',
  },
  techCategories: {
    frontend: 'Frontend',
    backend: 'Backend',
    aiLlm: 'AI / LLM',
    devopsTools: 'DevOps & Tools',
    design: 'Design',
  },
  common: {
    learnMore: 'Learn more',
    readMore: 'Read more',
    caseStudy: 'Case study',
    testLive: 'Test live ↗',
    backToBlog: 'Back to blog',
    allArticles: 'All articles',
    readArticle: 'Read article',
    previewArticle: 'Preview article',
    seeServices: 'See services',
    comingSoon: 'Coming soon',
    lastUpdated: 'Last updated',
  },
  projectPage: {
    caseStudy: 'CASE STUDY',
    role: 'Role',
    timeline: 'Timeline',
    platform: 'Platform',
    type: 'Type',
    visitProduct: 'Visit the product',
    readTechnicalBreakdown: 'Read the technical breakdown',
    primaryScreenshot: 'primary screenshot',
    theProblem: 'THE PROBLEM',
    theSolution: 'THE SOLUTION',
    keyFeatures: 'KEY FEATURES',
    builtAround: 'Built around how {who} actually work.',
    before: 'Before',
    after: 'After',
    manualWorkflow: 'manual workflow',
    fragmentedTools: 'fragmented tools · high manual overhead',
    unifiedProduct: 'single unified product · fast & automated',
    technicalChallenge: 'TECHNICAL CHALLENGE',
    hardProblemsSolved: 'Hard problems solved.',
    whatMadeItHard: 'What made it hard',
    theStack: 'THE STACK',
    technologiesUsed: 'Technologies used.',
    whatThisProves: 'WHAT THIS PROVES',
    whatDemonstrates: 'What {name} demonstrates.',
    workWithMe: 'WORK WITH ME',
    wantToBuildSomethingLikeThis: 'Want to build something like this?',
    bringMeYourIdea: "Bring me your idea or half-built project. I'll scope it, design it and ship it — using the same workflow behind {name}.",
    requestDevelopmentHelp: 'Request development help',
    nextCaseStudy: 'Next case study',
    screenshotOf: 'screenshot',
  },
  servicePage: {
    breadcrumbServices: 'Services',
    leaveWith: 'LEAVE WITH',
    whenToUse: 'WHEN TO USE',
    youLeaveWith: 'YOU LEAVE WITH',
    soundFamiliar: 'SOUND FAMILIAR?',
    needClarity: "You don't need a full-time hire. You need clarity.",
    whatYouLeaveWith: 'WHAT YOU LEAVE WITH',
    everySessionEndsWithPlan: 'Every session ends with a plan.',
    whatICanHelpWith: 'WHAT I CAN HELP WITH',
    useCases: 'Use cases.',
    whatsIncluded: "WHAT'S INCLUDED",
    everySessionIncludes: 'Every session includes.',
    isItAFit: 'IS IT A FIT?',
    bestResultsFromClearScope: 'Best results come from clear scope.',
    goodFit: 'Good fit',
    notAFit: 'Not a fit',
    pricing: 'PRICING',
    investment: 'Investment.',
    threeFormats: 'Three formats.',
    recommended: 'Recommended',
    buyNow: 'Buy now',
    bookACall: 'Book a call',
    directPaymentComingSoon: 'Direct payment coming soon — book a call to get started',
    bookASession: 'Book a session',
    questions: 'QUESTIONS',
    commonQuestions: 'Common questions.',
    readyToGetStarted: 'Ready to get started?',
  },
};

export default en;
