import type { ProjectContent } from './en';

export const projectsContentFr: Record<string, ProjectContent> = {
  keevo: {
    description:
      "Une application desktop local-first qui transforme des heures de rushes bruts en transcriptions propres et sous-titres prêts à l'emploi — en exécutant un modèle vocal embarqué pour qu'aucun fichier ne touche jamais le cloud.",
    longDescription:
      "Keevo est un outil desktop de transcription et de sous-titrage conçu pour les créateurs de contenu et les producteurs vidéo. Il traite la vidéo localement grâce à un modèle de reconnaissance vocale embarqué, génère des transcriptions horodatées et exporte les fichiers de sous-titres dans plusieurs formats — sans upload cloud, sans coût d'API, sans risque de confidentialité.",
    caseStudy: {
      tagline: "Transcription local-first — vos rushes ne quittent jamais votre machine.",
      problem:
        "Les créateurs de contenu passent des heures à transcrire manuellement leurs rushes ou paient des coûts d'API récurrents à des services de reconnaissance vocale cloud. Les deux options créent de la friction : un coût en temps ou des enjeux de confidentialité liés à l'upload de rushes clients vers des serveurs tiers.",
      context:
        "Construit pour les monteurs vidéo freelances, les podcasteurs et les équipes de contenu qui traitent des enregistrements sensibles et veulent la pleine propriété de leur workflow sans coûts d'abonnement.",
      technicalChallenges: [
        "Exécuter un modèle vocal quantifié embarqué dans Tauri sans bloquer le thread UI.",
        "Gérer la segmentation audio longue durée pour produire des horodatages précis à travers des débits de parole variables.",
        "Concevoir un éditeur de timeline permettant aux utilisateurs de corriger les transcriptions sans relancer le modèle.",
        "Packager des binaires natifs pour macOS et Windows dans le pipeline de build multiplateforme de Tauri.",
      ],
      architecture:
        "Shell Tauri (cœur Rust) avec un rendu React dans la webview système. Le modèle vocal tourne dans un worker Rust lancé depuis le backend Tauri, avec des résultats streamés vers le rendu via IPC au fur et à mesure que les segments se terminent. SQLite stocke l'état du projet localement.",
      implementation:
        "Le pipeline extrait l'audio via ffmpeg, le découpe en segments qui se chevauchent, exécute l'inférence dans un pool de workers, fusionne les résultats avec une passe de réconciliation des horodatages, puis les affiche dans l'éditeur. L'export des sous-titres supporte SRT, VTT et texte brut.",
      results: [
        "Traite 60 minutes de rushes en moins de 4 minutes sur Apple Silicon.",
        "Zéro dépendance cloud — toutes les données restent sur l'appareil.",
        "Précision des sous-titres comparable aux meilleures API cloud sur des enregistrements propres.",
      ],
      lessonsLearned: [
        "L'isolation hors thread principal n'est pas négociable pour l'inférence — bloquer le thread UI plombe l'expérience.",
        "Des segments audio qui se chevauchent avec réconciliation produisent des frontières de mots bien plus propres que des découpages nets.",
        "SQLite est le bon stockage d'état local pour Tauri — zéro configuration, fiable, assez rapide pour ce type de données.",
        "Le backend Rust de Tauri garde une empreinte d'installation bien plus légère qu'Electron tout en donnant un accès direct aux runtimes d'inférence natifs.",
      ],
    },
    meta: { role: "Solo · full-stack", timeline: "2025 · en cours", platform: "Desktop · macOS · Windows", type: "Outil de développement" },
    painPoints: [
      { bold: "La transcription cloud est coûteuse.", rest: "Les coûts d'API s'accumulent vite sur les longs enregistrements et rognent les marges des freelances." },
      { bold: "La confidentialité est un vrai enjeu.", rest: "Uploader des rushes clients vers des serveurs tiers est inenvisageable pour beaucoup de professionnels de la vidéo." },
      { bold: "La transcription manuelle est pénible.", rest: "Des heures d'écoute-frappe qui n'apportent rien de créatif à la production." },
    ],
    audienceWho: "Créateurs vidéo & podcasteurs",
    audienceDesc: "Monteurs freelances, équipes de contenu et podcasteurs qui ont besoin d'une transcription rapide et privée sans coûts d'API récurrents",
    audienceStats: [
      { value: "0 cloud", label: "dépendance" },
      { value: "<4 min", label: "par heure de rushes" },
      { value: "100%", label: "local & privé" },
    ],
    productFlow: [
      { step: "01", title: "Importer", description: "Déposez n'importe quel fichier vidéo ou audio." },
      { step: "02", title: "Transcrire", description: "Le modèle embarqué tourne, les segments arrivent en flux." },
      { step: "03", title: "Éditer", description: "Corrigez les mots et ajustez les horodatages dans la timeline." },
      { step: "04", title: "Exporter", description: "SRT, VTT ou texte brut — prêt à glisser dans n'importe quel éditeur." },
    ],
    features: [
      { title: "Inférence embarquée", description: "Un modèle vocal quantifié tourne entièrement sur la machine locale dans un worker Rust lancé par le backend Tauri — pas de clés API, pas d'upload, pas de coûts récurrents.", bullets: ["Le runtime d'inférence Rust natif fonctionne sur macOS et Windows", "Les résultats sont streamés vers l'UI au fur et à mesure des segments"] },
      { title: "Éditeur de timeline", description: "Corrigez la sortie du modèle dans un éditeur de transcription synchronisé — cliquer sur un mot déplace la vidéo, la relecture est donc rapide.", bullets: ["Affichage des horodatages au niveau du mot", "Flux d'édition orienté clavier"] },
      { title: "Export multi-format", description: "Exportez en SRT, WebVTT ou texte brut en un clic — prêt à importer dans Premiere, Final Cut, DaVinci ou tout autre outil de sous-titrage.", bullets: ["Timecodes précis issus de la passe de réconciliation", "Compatible UTF-8 pour le contenu multilingue"] },
    ],
    stack: [
      { label: "Shell", chips: ["Tauri", "Rust"] },
      { label: "UI", chips: ["React", "TypeScript"] },
      { label: "IA", chips: ["Inférence Rust native", "Modèle vocal embarqué"] },
      { label: "Stockage", chips: ["SQLite", "ffmpeg"] },
    ],
    proves: [
      { iconKey: "cpu", title: "IA embarquée", description: "Livré un pipeline d'inférence Rust en production dans Tauri sans bloquer le thread UI." },
      { iconKey: "zap", title: "Performance desktop", description: "Traite une heure de rushes en moins de 4 minutes via une architecture d'inférence en pool de workers." },
      { iconKey: "shield", title: "Confidentialité par conception", description: "Zéro dépendance cloud — tout le traitement reste local, ce qui le rend viable pour des enregistrements clients et sensibles." },
      { iconKey: "layers", title: "Build multiplateforme", description: "Packaging de binaires natifs pour macOS et Windows via le pipeline de build unique de Tauri." },
    ],
  },
  edumation: {
    description:
      "EduMation est un système de gestion scolaire (SMS) de niveau entreprise conçu pour automatiser la charge administrative de coordination des élèves, enseignants et programmes pédagogiques.",
    longDescription:
      "EduMation est une plateforme de gestion éducative de niveau entreprise centrée sur la résolution de défis complexes de planification et d'administration grâce à l'automatisation. La plateforme centralise la gestion des élèves, enseignants et cours dans une architecture multi-tenant, tandis que sa fonctionnalité centrale — un moteur de planification intelligent tenant compte des contraintes — automatise la génération des emplois du temps hebdomadaires en intégrant les besoins internes avec la disponibilité de calendriers externes (Google, Microsoft, ICS).",
    caseStudy: {
      tagline: "Planification automatisée pour les établissements d'enseignement — des semaines aux minutes.",
      problem:
        "Les établissements d'enseignement font face à un « cauchemar de planification » : coordonner manuellement des dizaines d'enseignants, de groupes d'élèves et de cours sur des créneaux limités tout en évitant les conflits avec des engagements personnels externes. Ce processus manuel prend généralement des jours, implique une charge cognitive élevée, et est fragile — un seul changement peut se répercuter en cascade sur de multiples conflits.",
      context:
        "Construit pour des organismes de formation professionnelle gérant plusieurs écoles, programmes et cohortes d'élèves. La plateforme devait gérer une planification complexe basée sur des contraintes (disponibilité des enseignants, capacité des salles, dépendances entre cours) à grande échelle, tout en assurant une isolation stricte des données entre établissements.",
      technicalChallenges: [
        "Résoudre le problème de planification NP-difficile en pondérant de multiples contraintes souples et strictes comme les pauses déjeuner, les horaires de travail et les préférences des enseignants.",
        "Assurer une isolation stricte des données multi-tenant via un filtrage au niveau middleware pour toutes les requêtes de base de données sur l'infrastructure partagée.",
        "Gérer des synchronisations de calendriers externes à forte latence (Google, Microsoft Graph, ICS) sans bloquer les flux principaux de l'application ni dépasser les limites de taux des fournisseurs.",
        "Construire une UI d'emploi du temps interactive et performante capable d'afficher des centaines d'événements dynamiques avec des temps de réponse inférieurs à 100 ms pour les modifications.",
      ],
      architecture:
        "Une stack MERN (MongoDB, Express, React, Node) modulaire avec TypeScript pour une sécurité de type stricte. Le frontend React suit un Design System interne sur mesure, tandis que le backend Node.js implémente un service de planification piloté par heuristique. Les données de chaque établissement sont isolées via une couche de filtrage basée sur schoolId, et la disponibilité externe est mise en cache avec un index TTL de 180 jours pour des vérifications de conflit en O(1).",
      implementation:
        "Le planificateur utilise une heuristique gloutonne qui trie les cours par leur « degré de contrainte » (le moins contraint d'abord). Il calcule les créneaux invalides en indexant les événements internes et les intervalles occupés externes mis en cache. Un système de randomisation basé sur une graine génère trois propositions distinctes pour les administrateurs, tandis qu'un worker de synchronisation dédié gère les intégrations OAuth2 avec les fournisseurs de calendriers externes.",
      results: [
        "Temps moyen de génération d'emploi du temps réduit d'environ 14 jours de travail manuel à moins de 5 minutes.",
        "Élimination à 100 % des conflits de double réservation dans les établissements pilotes grâce à la validation automatisée.",
        "Réduction de 90 % de la charge administrative pour les coordinateurs pédagogiques par semestre.",
      ],
      lessonsLearned: [
        "Un solveur heuristique « suffisamment bon » avec un raffinement humain est bien plus efficace pour les besoins réels qu'un solveur CSP exact et coûteux.",
        "Imposer l'isolation des données au niveau middleware/requête est la seule façon fiable d'empêcher les fuites de sécurité entre tenants dans un environnement SaaS partagé.",
        "Mettre en cache la disponibilité externe améliore significativement la réactivité des opérations de planification par rapport à une récupération en direct pendant la planification.",
        "Une logique métier typée pour des contraintes complexes évite des centaines d'erreurs logiques potentielles à l'exécution pendant le développement.",
      ],
    },
    meta: { role: "Solo · full-stack", timeline: "2023 · 14 semaines", platform: "Web · SaaS", type: "Plateforme entreprise" },
    painPoints: [
      { bold: "La planification manuelle est pénible.", rest: "Coordonner des dizaines d'enseignants et de cours à la main prend des jours et est sujet aux erreurs." },
      { bold: "Un changement casse tout.", rest: "Un seul conflit d'enseignant se répercute en cascade sur des dizaines de réaffectations sur le semestre." },
      { bold: "Aucun outil n'existe pour cette niche.", rest: "Les logiciels de planification génériques ne gèrent pas les contraintes spécifiques au domaine éducatif." },
    ],
    audienceWho: "Organismes de formation & coordinateurs",
    audienceDesc: "Organismes de formation professionnelle gérant plusieurs écoles, programmes et cohortes d'élèves à la fois",
    audienceStats: [
      { value: "14j→5min", label: "temps de planification" },
      { value: "100%", label: "sans conflit" },
      { value: "90%", label: "moins de travail admin" },
    ],
    productFlow: [
      { step: "01", title: "Importer", description: "Charger enseignants, groupes d'élèves, salles et contraintes." },
      { step: "02", title: "Générer", description: "Le solveur heuristique propose 3 emplois du temps sans conflit." },
      { step: "03", title: "Affiner", description: "Les coordinateurs ajustent et valident dans l'UI glisser-déposer." },
      { step: "04", title: "Publier", description: "Calendrier en direct synchronisé avec tous les enseignants et élèves." },
    ],
    features: [
      { title: "Moteur de planification IA", description: "Un solveur heuristique qui traite les contraintes strictes (disponibilité des enseignants, capacité des salles) et souples (pauses déjeuner, préférences) pour générer des propositions sans conflit en moins de 5 minutes.", bullets: ["Génère 3 propositions distinctes via une randomisation basée sur une graine", "Gère une planification multi-cohorte complexe en quelques secondes"] },
      { title: "Synchronisation calendrier en temps réel", description: "Une synchronisation OAuth2 bidirectionnelle avec Google Calendar et Microsoft Graph garantit que les engagements personnels des enseignants sont toujours reflétés, sans étape d'import manuel.", bullets: ["Cache TTL de 180 jours pour des vérifications de conflit en O(1)", "Un worker de synchronisation en arrière-plan gère élégamment les limites de taux"] },
      { title: "Architecture multi-tenant", description: "Une isolation stricte des données imposée au niveau middleware garantit qu'un établissement ne voit jamais les données d'un autre, même sur une infrastructure partagée.", bullets: ["Filtrage basé sur schoolId à chaque requête de base de données", "Contrôle d'accès basé sur les rôles par établissement et par rôle"] },
    ],
    stack: [
      { label: "Frontend", chips: ["React", "TypeScript", "Design System sur mesure"] },
      { label: "Backend", chips: ["Node.js", "Express", "MongoDB"] },
      { label: "Intégrations", chips: ["API Google Calendar", "Microsoft Graph", "ICS"] },
      { label: "DevOps", chips: ["Docker", "CI/CD", "Redis"] },
    ],
    proves: [
      { iconKey: "brain", title: "Résolution de problèmes par IA", description: "Conçu et livré un solveur heuristique en production pour un problème de planification NP-difficile." },
      { iconKey: "shield", title: "Sécurité multi-tenant", description: "Construit une isolation des données au niveau ligne sur une base SaaS partagée sans aucune contamination croisée entre tenants." },
      { iconKey: "zap", title: "UI haute performance", description: "Affiché des centaines d'événements de calendrier dynamiques avec des temps de réponse interactifs inférieurs à 100 ms." },
      { iconKey: "link", title: "Intégrations tierces", description: "Livré et maintenu des synchronisations OAuth2 en direct avec Google Calendar et Microsoft Graph." },
    ],
  },
  railguessr: {
    description:
      "RailGuessr est un jeu de géographie centré sur les transports qui met les joueurs au défi d'identifier les stations intermédiaires du réseau du métro parisien.",
    longDescription:
      "RailGuessr est un jeu de géographie des transports interactif conçu pour les passionnés d'urbanisme et les usagers du quotidien. Les joueurs doivent reconstituer des segments spécifiques du métro en identifiant les stations intermédiaires entre deux terminus sur 16 lignes. Le projet propose un système de défi quotidien déterministe, un support PWA, et une interface minimaliste et performante pensée pour un usage mobile-first.",
    caseStudy: {
      tagline: "La géographie rencontre les transports — devinez la station, battez le chrono.",
      problem:
        "Les passionnés de transports et les usagers quotidiens manquaient d'un moyen engageant et sans friction de tester leur connaissance des réseaux urbains. Les jeux de géographie existants étaient trop génériques, et il n'existait aucun défi quotidien « façon Wordle » spécifiquement pour le réseau complexe du métro parisien.",
      context:
        "Construit pour explorer la logique déterministe côté client et les mécaniques de jeu à forte rétention. RailGuessr cible une communauté de niche de passionnés de transports, en proposant un défi mental quotidien synchronisé mondialement sans nécessiter d'infrastructure backend.",
      technicalChallenges: [
        "Implémenter un système de défi quotidien déterministe où chaque utilisateur dans le monde reçoit la même énigme basée sur un hash de date, sans aucune dépendance backend.",
        "Gérer la complexité topologique des lignes de métro ramifiées (lignes 7, 10, 13) en utilisant un pathfinding basé sur des graphes pour identifier les stations intermédiaires valides.",
        "Optimiser pour un support PWA 100 % offline-first tout en maintenant une bonne visibilité SEO et des performances AdSense pour la monétisation.",
        "Construire un système de correspondance de saisie « floue » gérant les accents, la casse et une nomenclature variée (ex. « Châtelet » vs « Chatelet ») pour maximiser l'accessibilité.",
      ],
      architecture:
        "Une application React purement côté client déployée via Cloudflare Pages. Le réseau de métro est modélisé comme une liste d'adjacence statique (graphe). La graine quotidienne est dérivée d'un hash de la date courante, garantissant une synchronisation mondiale. Les statistiques et séries utilisateur sont gérées via un utilitaire StatsManager sur mesure interagissant avec LocalStorage.",
      implementation:
        "La logique de parcours de graphe identifie les chemins uniques sur les lignes ramifiées, tandis qu'un normaliseur sur mesure retire les caractères spéciaux pour la correspondance floue. L'UI est construite avec Tailwind CSS et Framer Motion pour des transitions fluides à moins de 60 fps. La monétisation est intégrée via Google AdSense avec un focus particulier sur le maintien des performances UX principales.",
      results: [
        "Scalabilité d'infrastructure à coût zéro : la plateforme gère des milliers d'utilisateurs dans le monde à coût d'hébergement nul via une livraison en edge.",
        "Forte rétention utilisateur : le système de série quotidienne et les partages communautaires (Twitter/Reddit) ont porté la croissance organique à plus de 400 utilisateurs actifs mensuels.",
        "Conversion PWA : 15 % des utilisateurs réguliers ont « installé » le jeu sur leur écran d'accueil mobile pour un accès quotidien.",
      ],
      lessonsLearned: [
        "Le hachage déterministe côté client est une alternative puissante et gratuite aux backends traditionnels pour les jeux quotidiens synchronisés.",
        "Un design minimaliste et des flux fluides « touche Entrée » comptent plus pour la rétention que des graphismes haute fidélité.",
        "Les implémentations PWA abaissent significativement la barrière d'entrée pour le jeu mobile occasionnel comparé à la distribution en app store.",
        "Les structures de données basées sur des graphes sont essentielles pour modéliser fidèlement des réseaux de transport réels comparé à de simples tableaux.",
      ],
    },
    meta: { role: "Solo · full-stack", timeline: "2023 · 6 semaines", platform: "Web · PWA", type: "Jeu quotidien" },
    painPoints: [
      { bold: "Les passionnés de transports n'ont aucun défi quotidien.", rest: "Les jeux de géographie génériques ignorent le détail et la vraie topologie des réseaux de métro urbains." },
      { bold: "La synchronisation quotidienne nécessite normalement un backend.", rest: "Garder chaque joueur dans le monde sur la même énigme implique généralement un serveur et un coût d'hébergement." },
      { bold: "La topologie du métro n'est pas triviale.", rest: "Les lignes ramifiées comme les lignes 7 et 13 ne peuvent pas être modélisées comme de simples tableaux." },
    ],
    audienceWho: "Passionnés de transports & usagers quotidiens",
    audienceDesc: "Joueurs quotidiens qui font la navette, passionnés d'urbanisme qui connaissent le métro de leur ville par cœur",
    audienceStats: [
      { value: "0 €", label: "coût d'hébergement" },
      { value: "400+", label: "utilisateurs actifs mensuels" },
      { value: "15%", label: "installations PWA" },
    ],
    productFlow: [
      { step: "01", title: "Graine quotidienne", description: "Le hash de date génère le défi unique du jour." },
      { step: "02", title: "Jouer", description: "Le joueur saisit les stations intermédiaires pour reconstituer le trajet." },
      { step: "03", title: "Score", description: "La correspondance floue valide les réponses et met à jour la série." },
      { step: "04", title: "Partager", description: "Le partage en un clic alimente la croissance communautaire organique." },
    ],
    features: [
      { title: "Défi quotidien déterministe", description: "Un hash de date génère la même énigme pour chaque joueur dans le monde — aucun backend requis, aucun coût de synchronisation.", bullets: ["Coût d'infrastructure nul pour une synchronisation quotidienne mondiale", "Des énigmes reproductibles permettent la discussion communautaire et les indices"] },
      { title: "Pathfinding basé sur un graphe", description: "Le métro parisien est modélisé comme un graphe, permettant une identification précise des trajets même sur des lignes ramifiées comme les 7, 10 et 13.", bullets: ["Gère les lignes fourchues et les segments de voie partagés", "Valide tous les chemins de solution valides, pas seulement une réponse canonique"] },
      { title: "Support PWA & hors ligne", description: "Un support PWA offline-first complet permet aux joueurs d'ouvrir leur défi quotidien même sous terre dans le métro lui-même.", bullets: ["Le service worker met en cache tous les assets du jeu dès le premier chargement", "Installable sur l'écran d'accueil iOS et Android"] },
    ],
    stack: [
      { label: "Frontend", chips: ["React", "Tailwind CSS", "Framer Motion"] },
      { label: "Données", chips: ["Liste d'adjacence de graphe", "LocalStorage (séries)", "JSON statique"] },
      { label: "Infra", chips: ["Cloudflare Pages", "Service Worker / PWA"] },
      { label: "Monétisation", chips: ["Google AdSense"] },
    ],
    proves: [
      { iconKey: "graph", title: "Algorithmes de graphes", description: "Modélisé un réseau de transport réel et écrit une logique de pathfinding sur des topologies ramifiées." },
      { iconKey: "zap", title: "Architecture sans backend", description: "Livré un jeu quotidien synchronisé mondialement à coût serveur nul grâce au hachage déterministe côté client." },
      { iconKey: "mobile", title: "Ingénierie PWA", description: "Construit un jeu installable et utilisable hors ligne atteignant un taux d'adoption écran d'accueil de 15 %." },
      { iconKey: "search", title: "Correspondance floue", description: "Conçu un normaliseur de chaînes tolérant aux accents pour des devinettes justes et accessibles à travers des saisies variées." },
    ],
  },
  singuessr: {
    description:
      "Singuessr est une plateforme de blindtest musical interactive qui transforme n'importe quelle playlist Spotify en jeu de devinettes en temps réel — les playlists et pochettes viennent de Spotify, les extraits audio d'Apple Music.",
    longDescription:
      "Singuessr est une plateforme de blindtest musical dynamique construite pour les fans de tous genres. Elle combine deux API musicales : l'API Web Spotify (via un proxy Cloudflare Worker sur mesure et performant) fournit les métadonnées de playlist et les pochettes d'album, tandis que l'API Apple Music / iTunes Search livre les extraits audio de 30 secondes qui animent chaque manche. L'architecture serverless hybride gère les restrictions régionales d'API, la récupération récursive à forte concurrence, et la correspondance de titres entre catalogues.",
    caseStudy: {
      tagline: "Vos playlists, votre jeu — le blindtest dynamique ultime.",
      problem:
        "Les blindtests musicaux traditionnels sont statiques, prédéfinis et limités en portée. En plus de cela, les extraits Spotify souffrent d'erreurs « 403 Forbidden » liées aux licences régionales lorsqu'ils sont récupérés depuis des régions de serveurs cloud — donc une app construite uniquement sur l'audio Spotify est cassée pour la plupart des utilisateurs.",
      context:
        "Construit pour résoudre les limites du quiz musical statique. Singuessr utilise Spotify comme source de vérité pour les playlists et les pochettes (car c'est là que les utilisateurs organisent leur musique), mais route la lecture audio via le catalogue public de previews Apple Music / iTunes — accessible mondialement, non authentifié, et sans complexité OAuth.",
      technicalChallenges: [
        "Concevoir un proxy Cloudflare Worker pour contourner les restrictions CORS et les verrous de licence régionaux lors de la récupération des données de playlist Spotify (injection d'en-têtes market=FR et gestion du rafraîchissement de token OAuth2 en périphérie).",
        "Faire correspondre chaque titre Spotify à son équivalent en preview Apple Music / iTunes à travers deux catalogues indépendants, avec une normalisation floue pour gérer les incohérences de nommage entre fournisseurs.",
        "Implémenter une récupération d'API récursive pour aplatir de larges playlists Spotify (100+ titres) en une seule charge JSON haute vitesse pour le frontend.",
        "Développer un algorithme de scoring « flou » qui normalise les titres de chansons, en retirant les métadonnées comme « - Remasterisé » ou « (Bonus Track) » pour garantir des devinettes justes.",
        "Optimiser le cycle de vie média en React pour précharger les prochains buffers audio Apple Music, garantissant une transition sans latence entre les manches.",
      ],
      architecture:
        "Une architecture serverless hybride : une SPA React pour l'UI et un Cloudflare Worker pour la couche proxy d'API. Le Worker gère l'OAuth2 Spotify, l'aplatissement récursif de playlist, et la correspondance entre catalogues via l'API publique iTunes Search pour résoudre l'URL de preview Apple Music de chaque titre. Le frontend gère la boucle audio interactive et alimente la file de manches directement depuis ces URLs de preview. Le déploiement est entièrement automatisé via le réseau edge de Cloudflare.",
      implementation:
        "Le proxy utilise une stratégie « aplatir-et-mettre-en-cache » pour les métadonnées de playlist Spotify (pochettes + titres + artistes) et transmet chaque titre vers une recherche iTunes Search parallèle qui retourne une URL de preview Apple Music de 30 secondes. L'audio est ensuite joué dans la SPA React via l'API Audio HTML5 avec une machine à états sur mesure qui gère le chargement, la lecture, et les conditions de concurrence pendant les manches de devinette rapides.",
      results: [
        "Accès instantané à des millions de playlists jouables via une simple interface de recherche/import.",
        "Temps de chargement inférieurs à 200 ms pour les grandes playlists, obtenus en déportant l'aplatissement Spotify et la correspondance de previews iTunes vers la périphérie.",
        "Lecture audio accessible mondialement — les previews Apple Music contournent les problèmes de licence régionale qui bloquent les previews Spotify depuis les régions de serveurs.",
        "Monétisation réussie via des régies publicitaires respectueuses de la vie privée (A-Ads) tout en maintenant de hautes performances de plateforme.",
      ],
      lessonsLearned: [
        "La correspondance entre catalogues (Spotify → Apple Music) est le moyen le plus simple de combiner le meilleur des deux mondes : les playlists organisées de Spotify avec les URLs de preview accessibles mondialement d'Apple Music.",
        "Les workers serverless sont une solution idéale pour l'orchestration d'API et le contournement des restrictions régionales dans les intégrations média tierces.",
        "Précharger les assets pendant les « temps morts du lecteur » est le moyen le plus efficace d'améliorer la performance perçue dans les applications média interactives.",
        "La normalisation de chaînes par regex est critique lors de la correspondance de titres entre fournisseurs aux conventions de nommage de métadonnées incohérentes.",
        "La monétisation respectueuse de la vie privée peut être efficace et performante lorsqu'elle est intégrée tôt dans le cycle de vie de l'application.",
      ],
    },
    meta: { role: "Solo · full-stack", timeline: "2023 · 8 semaines", platform: "Web", type: "Plateforme musicale" },
    painPoints: [
      { bold: "Les licences régionales bloquent les previews Spotify.", rest: "Les serveurs cloud reçoivent des erreurs 403 des URLs de preview Spotify pour le contenu de la région UE — l'audio ne joue tout simplement pas pour la plupart des utilisateurs." },
      { bold: "Les blindtests statiques deviennent vite ennuyeux.", rest: "Les listes de chansons prédéfinies ne scalent pas et perdent rapidement leur intérêt de rejouabilité après quelques sessions." },
      { bold: "Les grandes playlists sont lentes à charger.", rest: "Récupérer 100+ titres depuis l'API paginée de Spotify crée une latence de chargement pénible." },
    ],
    audienceWho: "Mélomanes & groupes d'amis",
    audienceDesc: "Toute personne qui veut lancer un blindtest en temps réel sur ses propres playlists Spotify organisées",
    audienceStats: [
      { value: "∞", label: "playlists jouables" },
      { value: "<200ms", label: "chargement grande playlist" },
      { value: "0", label: "blocages régionaux" },
    ],
    productFlow: [
      { step: "01", title: "Importer", description: "Collez n'importe quelle URL de playlist Spotify publique." },
      { step: "02", title: "Résoudre", description: "Le worker en périphérie aplatit les titres Spotify et fait correspondre chacun à sa preview Apple Music." },
      { step: "03", title: "Jouer", description: "Les previews Apple Music streament manche après manche, avec les pochettes de Spotify." },
      { step: "04", title: "Score", description: "La correspondance floue valide les devinettes de titres." },
    ],
    features: [
      { title: "Proxy Cloudflare Worker", description: "Un Worker léger orchestre deux API : il interroge Spotify pour les données de playlist + pochettes d'album (avec les bons en-têtes de marché pour éviter les blocages régionaux), puis résout chaque titre vers son URL de preview Apple Music via iTunes Search.", bullets: ["Résout les blocages régionaux 403 de Spotify de façon transparente pour le client", "Correspondance entre catalogues via iTunes Search pour trouver chaque URL de preview", "Gère le flux de token OAuth2 et l'orchestration des requêtes en périphérie"] },
      { title: "Aplatissement récursif de playlist", description: "Un seul appel de récupération parcourt récursivement tous les endpoints paginés de Spotify, retournant un tableau de titres aplati — chacun enrichi de sa preview Apple Music correspondante — en un seul aller-retour.", bullets: ["Gère la limite de 100 éléments par page de Spotify de façon transparente", "Moins de 200 ms pour les grandes playlists grâce à la colocalisation en périphérie"] },
      { title: "Gestion du cycle de vie audio", description: "Une machine à états sur mesure précharge le prochain buffer de preview Apple Music pendant la manche active, éliminant la latence perçue entre les manches.", bullets: ["Transitions de manche sans latence via préchargement en arrière-plan", "Gestion des conditions de concurrence pendant les séquences de devinette rapides"] },
    ],
    stack: [
      { label: "Frontend", chips: ["React", "Tailwind CSS", "API Audio HTML5"] },
      { label: "Edge / Backend", chips: ["Cloudflare Workers", "API Web Spotify", "API Apple Music / iTunes Search"] },
      { label: "Algorithmes", chips: ["Normalisation regex", "Correspondance entre catalogues", "Correspondance floue", "Machine à états"] },
      { label: "Monétisation", chips: ["A-Ads (respectueux de la vie privée)"] },
    ],
    proves: [
      { iconKey: "server", title: "Architecture serverless", description: "Conçu et livré un Cloudflare Worker qui proxifie et orchestre deux API musicales en périphérie." },
      { iconKey: "shield", title: "Contournement des restrictions régionales", description: "Combiné Spotify (playlists + pochettes) avec Apple Music (previews accessibles mondialement) pour que l'audio joue pour chaque utilisateur, quelle que soit la région." },
      { iconKey: "zap", title: "Ingénierie de performance", description: "Atteint un chargement de grande playlist inférieur à 200 ms en colocalisant l'aplatissement des données et la correspondance entre catalogues en périphérie CDN." },
      { iconKey: "music", title: "Machine à états média", description: "Construit un gestionnaire de cycle de vie audio robuste qui gère le préchargement et les conditions de concurrence dans un contexte de jeu rapide." },
    ],
  },
  "fuchibol-hub": {
    description:
      "FuchibolHub est une plateforme centrée sur le football rassemblant plusieurs mini-jeux interactifs conçus pour l'engagement et la compétition des fans.",
    longDescription:
      "FuchibolHub est une plateforme centrée sur le football rassemblant plusieurs mini-jeux interactifs conçus pour l'engagement et la compétition des fans. Sa fonctionnalité phare est un système de pronostics à grande échelle construit autour de la Coupe du Monde FIFA 2026, permettant aux utilisateurs de prédire les résultats des matchs et la progression du tournoi. Le projet explore la gamification, l'interaction communautaire et une conception d'application pilotée par événements et scalable.",
    caseStudy: {
      tagline: "La plateforme de pronostics pour la Coupe du Monde 2026 — construite pour les fans, pas les parieurs.",
      problem:
        "Les fans de football veulent s'affronter sur des pronostics de matchs, mais les plateformes existantes exigent soit des paris en argent réel, soit offrent un engagement si superficiel qu'il ne retient pas l'attention au-delà de la première semaine. Il n'existait aucune plateforme de pronostics gratuite, sociale et basée sur la réputation construite autour du plus grand événement footballistique de la décennie.",
      context:
        "Construit en amont de la Coupe du Monde FIFA 2026 pour offrir une ligue de pronostics gratuite où des groupes d'amis et des communautés peuvent s'affronter selon la précision de leurs pronostics. La plateforme devait gérer la progression du tableau du tournoi, les mises à jour de classement en temps réel, et le pic de trafic pendant les matchs majeurs.",
      technicalChallenges: [
        "Mises à jour de score et de classement en temps réel avec Socket.io à travers des utilisateurs concurrents pendant les fenêtres de trafic élevé des matchs.",
        "Application des délais de pronostic — les soumissions doivent se verrouiller précisément au coup d'envoi de chaque match, côté serveur.",
        "Architecture pilotée par événements scalable pour gérer la progression du tableau du tournoi (phase de groupes → phases finales → finale).",
        "Scoring basé sur des groupes avec règles configurables — différentes ligues utilisent différents systèmes de points.",
        "Gérer les soumissions de pronostics concurrentes sans conditions de concurrence dans les minutes précédant le coup d'envoi.",
      ],
      architecture:
        "Frontend React, backend Node.js/Express, MongoDB. Socket.io gère les diffusions de classement en temps réel. Un processeur de résultats de match basé sur cron met à jour les scores et émet des événements de changement. Redis sert de couche pub/sub entre les instances worker Socket.io. Les soumissions de pronostics sont validées et verrouillées côté serveur contre un horodatage de coup d'envoi stocké dans le document du match.",
      implementation:
        "Le verrouillage des soumissions de pronostics se fait à l'heure de coup d'envoi validée côté serveur — le compte à rebours de l'UI client est purement cosmétique. Le traitement des résultats de match tourne comme une tâche en arrière-plan, déclenchée soit par un payload webhook soit par une action admin, utilisant une file d'attente pour éviter le double traitement. Le calcul du classement utilise des pipelines d'agrégation MongoDB avec un cache Redis TTL de 30 secondes pour éviter de recalculer à chaque requête pendant les pics de trafic.",
      results: [
        "Plus de 200 utilisateurs inscrits pour la saison Coupe du Monde 2026 avant le lancement",
        "Mises à jour de classement en temps réel avec une latence inférieure à 500 ms sous charge",
        "Zéro incident de pronostic après coup d'envoi grâce à l'application côté serveur du verrouillage",
      ],
      lessonsLearned: [
        "Le pub/sub Redis simplifie considérablement la mise à l'échelle de Socket.io sur plusieurs processus Node — à ajouter tôt.",
        "Les outils d'administration doivent être construits avant le lancement — la saisie manuelle des résultats sans UI crée un risque opérationnel.",
        "La logique de progression du tableau est plus propre modélisée comme une machine à états qu'une séquence de mises à jour conditionnelles.",
        "L'application des délais de pronostic doit être autoritaire côté serveur dès le premier jour — les verrous côté client sont insuffisants.",
      ],
    },
    meta: { role: "Solo · full-stack", timeline: "2026 · 10 semaines", platform: "Web", type: "Plateforme sociale" },
    painPoints: [
      { bold: "Les plateformes de paris excluent les fans occasionnels.", rest: "La plupart des apps de pronostics exigent de l'argent réel, ce qui rebute la majorité des fans de football." },
      { bold: "Les alternatives gratuites manquent de profondeur compétitive.", rest: "Les outils gratuits existants n'ont pas de vrais classements, de jeu en groupe, ni de progression de tableau de tournoi." },
      { bold: "Les mises à jour en temps réel sont difficiles à scaler.", rest: "Socket.io sur plusieurs processus Node nécessite une architecture Redis soignée pour éviter le split-brain." },
    ],
    audienceWho: "Fans de football & groupes d'amis",
    audienceDesc: "Groupes d'amis qui veulent s'affronter sur les pronostics de la Coupe du Monde 2026 sans parier",
    audienceStats: [
      { value: "200+", label: "utilisateurs avant lancement" },
      { value: "<500ms", label: "latence du classement" },
      { value: "0", label: "erreurs de pronostic" },
    ],
    productFlow: [
      { step: "01", title: "Rejoindre un groupe", description: "Créez ou rejoignez une ligue de pronostics entre amis." },
      { step: "02", title: "Pronostiquer", description: "Soumettez vos pronostics de match avant le verrouillage au coup d'envoi." },
      { step: "03", title: "Suivre", description: "Mises à jour de classement en temps réel pendant le match." },
      { step: "04", title: "Classer", description: "Classement de saison mis à jour au fil de la progression du tournoi." },
    ],
    features: [
      { title: "Classement en temps réel", description: "Socket.io diffuse les mises à jour de score à tous les clients connectés pendant les fenêtres de match, avec un pub/sub Redis pour la mise à l'échelle horizontale sur plusieurs processus Node.", bullets: ["Rafraîchissement du classement inférieur à 500 ms sous charge concurrente", "Le pub/sub Redis découple la diffusion du calcul de score"] },
      { title: "Verrouillage de pronostic côté serveur", description: "Les soumissions de pronostics sont validées et verrouillées côté serveur contre l'horodatage de coup d'envoi stocké — le compte à rebours de l'UI client est purement cosmétique.", bullets: ["Zéro pronostic après coup d'envoi en production", "Le compte à rebours client est cosmétique ; le serveur fait toujours autorité"] },
      { title: "Pipeline de score piloté par événements", description: "Le traitement des résultats de match tourne comme une tâche en arrière-plan, émettant des événements consommés par les services de mise à jour de score, d'évaluation de badges et de recalcul de classement.", bullets: ["Le traitement idempotent gère les relances en toute sécurité", "La progression du tableau est modélisée comme une machine à états"] },
    ],
    stack: [
      { label: "Frontend", chips: ["React", "Tailwind CSS", "Client Socket.io"] },
      { label: "Backend", chips: ["Node.js", "Express", "Socket.io", "MongoDB"] },
      { label: "Temps réel", chips: ["Pub/sub Redis", "Tâches cron", "WebSockets"] },
      { label: "DevOps", chips: ["Docker", "Workers en arrière-plan"] },
    ],
    proves: [
      { iconKey: "activity", title: "Architecture temps réel", description: "Conçu un système Socket.io avec pub/sub Redis qui scale sur plusieurs processus Node." },
      { iconKey: "lock", title: "Délais autoritaires côté serveur", description: "Construit une application du verrouillage de pronostic entièrement côté serveur, avec zéro incident de contournement client en production." },
      { iconKey: "layers", title: "Pipeline piloté par événements", description: "Conçu un pipeline de traitement de score idempotent qui gère proprement les résultats de match et la progression du tableau." },
      { iconKey: "users", title: "Mécaniques sociales de groupe", description: "Livré des règles de ligue configurables, un scoring de groupe d'amis, et une progression de tableau pour les formats de tournoi." },
    ],
  },
  "fresh-win": {
    description:
      "Fresh.win est une plateforme de pronostics sportifs centrée sur les compétitions de football des meilleurs championnats européens.",
    longDescription:
      "Fresh.win est une plateforme de pronostics sportifs centrée sur les compétitions de football des meilleurs championnats européens. Plutôt que de parier de l'argent, les utilisateurs s'affrontent via des pronostics de match basés sur des probabilités, des classements et des défis communautaires. La plateforme intègre des systèmes de gamification comme des récompenses quotidiennes, des programmes de parrainage, des mécaniques de séries et des compétitions saisonnières pour maximiser l'engagement tout en promouvant un jeu responsable.",
    caseStudy: {
      tagline: "S'affronter sur des pronostics de football — pas d'argent, juste de la réputation.",
      problem:
        "Le marché des paris sportifs a un problème de jeu responsable : les plateformes conçues pour les mises en argent attirent des comportements addictifs et excluent les fans occasionnels. Il y avait une place pour une plateforme de pronostics offrant la même boucle d'engagement compétitif — classements, séries, fierté sociale — sans enjeu financier.",
      context:
        "Fresh.win cible le large public de fans de football qui veulent tester leurs connaissances des matchs et s'affronter socialement mais sont rebutés par les plateformes de paris. Le programme de parrainage et les mécaniques de séries sont conçus pour stimuler la croissance organique tandis que les récompenses quotidiennes créent des habitudes de retour.",
      technicalChallenges: [
        "Concevoir un moteur de gamification engageant sans être si généreux que les classements perdent leur sens.",
        "Construire un pipeline de suivi et d'attribution de parrainage résistant à la fraude pour prévenir les abus.",
        "Implémenter des tableaux de compétition saisonniers et des classements cumulatifs avec de hautes performances de requête.",
        "Un système de distribution de récompenses quotidiennes juste, vérifiable, et résistant à la manipulation temporelle.",
        "Équilibrer la générosité des récompenses avec l'intégrité de la compétition — ajusté via les retours des utilisateurs bêta.",
      ],
      architecture:
        "Frontend React + Tailwind, API Node.js, PostgreSQL pour les données relationnelles (utilisateurs, pronostics, parrainages, classements). Un moteur de points traite les résultats de match de façon asynchrone via une file d'attente de tâches. Les codes de parrainage utilisent des tokens d'ID utilisateur signés HMAC avec expiration configurable. Le moteur de gamification est piloté par événements : la résolution d'un match émet des événements consommés par les services de mise à jour de score, de vérification de série, d'évaluation de badges et de recalcul de classement.",
      implementation:
        "Le moteur de points écoute les événements de résultat de match et déclenche un pipeline : mise à jour du score → recalcul de série → évaluation de badge → rafraîchissement du classement. Chaque étape est idempotente pour gérer les relances en toute sécurité. La distribution de récompenses quotidiennes tourne comme une tâche cron planifiée avec déduplication via une clé de date traitée par utilisateur. La prévention de fraude de parrainage combine limitation de débit, vérification d'e-mail, et contrôles d'identité basés sur l'IP.",
      results: [
        "Boucle de gamification validée avec plus de 150 utilisateurs bêta sur un essai de 6 semaines",
        "Série de rétention active moyenne de 4 jours parmi les utilisateurs engagés",
        "Le système de parrainage a généré 40 % de l'acquisition de nouveaux utilisateurs pendant la phase bêta",
      ],
      lessonsLearned: [
        "L'ajustement des récompenses de gamification est aussi important que les mécaniques elles-mêmes — commencer prudemment et augmenter la générosité selon les données de rétention.",
        "La prévention de fraude de parrainage doit être construite avant le lancement public, pas ajoutée après le premier incident d'abus.",
        "Le modèle relationnel de PostgreSQL simplifie les requêtes de classement complexes comparé aux bases documentaires — le bon outil pour ce type de données.",
        "Un moteur de points piloté par événements découple proprement la logique métier et rend le test A/B des règles de récompense simple.",
      ],
    },
    meta: { role: "Solo · full-stack", timeline: "2024 · 12 semaines", platform: "Web", type: "Plateforme de pronostics" },
    painPoints: [
      { bold: "Les plateformes de paris nuisent aux fans occasionnels.", rest: "Les pronostics basés sur l'argent attirent des comportements addictifs et excluent les fans qui veulent juste s'affronter." },
      { bold: "Les plateformes gratuites manquent de profondeur.", rest: "Sans enjeu réel, les boucles d'engagement s'effondrent après une semaine — il n'y a plus de raison de revenir." },
      { bold: "La fraude au parrainage est endémique.", rest: "Les systèmes de parrainage non protégés sont abusés immédiatement après le lancement public." },
    ],
    audienceWho: "Fans de football qui évitent les paris",
    audienceDesc: "Fans de sport qui veulent des pronostics compétitifs sans enjeu financier — juste de la réputation et de la fierté sociale",
    audienceStats: [
      { value: "150+", label: "utilisateurs bêta" },
      { value: "4 jours", label: "série active moy." },
      { value: "40%", label: "acquisition par parrainage" },
    ],
    productFlow: [
      { step: "01", title: "Pronostiquer", description: "Soumettez des pronostics de résultats de match quotidiennement." },
      { step: "02", title: "Gagner", description: "Points attribués selon la précision des pronostics." },
      { step: "03", title: "Série", description: "Les récompenses quotidiennes s'accumulent avec les séries actives." },
      { step: "04", title: "S'affronter", description: "Classements saisonniers et ligues entre amis." },
    ],
    features: [
      { title: "Moteur de gamification", description: "Un système de points piloté par événements qui traite les résultats de match de façon asynchrone, déclenchant le recalcul de série, l'évaluation de badge et le rafraîchissement du classement dans un seul pipeline idempotent.", bullets: ["Ajustement prudent des récompenses affiné via les retours bêta", "Règles de récompense testables en A/B via l'architecture pilotée par événements"] },
      { title: "Pipeline d'attribution de parrainage", description: "Des tokens de parrainage signés HMAC avec expiration configurable, combinés à la limitation de débit, la vérification d'e-mail, et des contrôles d'identité basés sur l'IP pour prévenir les abus.", bullets: ["Prévention de fraude construite avant le lancement public, pas ajoutée après coup", "Le suivi d'attribution survit aux parcours de conversion multi-étapes"] },
      { title: "Système de compétition saisonnière", description: "Des pipelines d'agrégation PostgreSQL calculent les classements saisonniers et les résultats cumulatifs avec une couche mise en cache Redis pour les fenêtres de match à fort trafic.", bullets: ["Haute performance de requête pendant les pics de trafic de match", "Logique de tableau saisonnier modélisée pour des transitions d'état propres"] },
    ],
    stack: [
      { label: "Frontend", chips: ["React", "Tailwind CSS"] },
      { label: "Backend", chips: ["Node.js", "Express", "PostgreSQL"] },
      { label: "Gamification", chips: ["Moteur piloté par événements", "Tokens HMAC", "Cache Redis"] },
      { label: "Infrastructure", chips: ["Tâches cron", "File d'attente de tâches", "Limitation de débit"] },
    ],
    proves: [
      { iconKey: "star", title: "Conception de gamification", description: "Conçu et ajusté une boucle d'engagement complète — points, séries, badges, classements — validée avec plus de 150 utilisateurs bêta." },
      { iconKey: "shield", title: "Prévention de fraude", description: "Construit un système anti-fraude de parrainage multi-couches utilisant des tokens HMAC, la limitation de débit, et des contrôles IP avant le lancement public." },
      { iconKey: "database", title: "Modélisation de données relationnelles", description: "Choisi PostgreSQL plutôt qu'une base documentaire et exploité ses pipelines d'agrégation pour des requêtes de classement complexes." },
      { iconKey: "layers", title: "Architecture pilotée par événements", description: "Découplé le pipeline de points en services indépendants et idempotents qui rendent simple le test A/B des règles de récompense." },
    ],
  },
};
