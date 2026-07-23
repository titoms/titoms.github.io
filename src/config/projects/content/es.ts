import type { ProjectContent } from './en';

export const projectsContentEs: Record<string, ProjectContent> = {
  keevo: {
    description:
      "Una app de escritorio local-first que convierte horas de metraje bruto en transcripciones limpias y subtítulos listos para usar — ejecutando un modelo de voz en el dispositivo para que ningún archivo toque nunca la nube.",
    longDescription:
      "Keevo es una herramienta de escritorio de transcripción y subtitulado construida para creadores de contenido y productores de vídeo. Procesa el vídeo localmente usando un modelo de reconocimiento de voz en el dispositivo, genera transcripciones con marcas de tiempo, y exporta archivos de subtítulos en múltiples formatos — sin subidas a la nube, sin costes de API, sin preocupaciones de privacidad.",
    caseStudy: {
      tagline: "Transcripción local-first — tu metraje nunca sale de tu máquina.",
      problem:
        "Los creadores de contenido pasan horas transcribiendo manualmente el metraje o pagan costes recurrentes de API a servicios de voz en la nube. Ambas opciones introducen fricción: un coste en tiempo o preocupaciones de privacidad al subir metraje de clientes a servidores de terceros.",
      context:
        "Construido para editores de vídeo freelance, podcasters y equipos de contenido que procesan grabaciones sensibles y quieren la propiedad total de su flujo de trabajo sin costes de suscripción.",
      technicalChallenges: [
        "Ejecutar un modelo de voz cuantizado en el dispositivo dentro de Tauri sin bloquear el hilo de la interfaz.",
        "Gestionar la segmentación de audio de larga duración para producir marcas de tiempo precisas a través de ritmos de habla variables.",
        "Diseñar un editor de línea de tiempo que permita a los usuarios corregir transcripciones sin volver a ejecutar el modelo.",
        "Empaquetar binarios nativos para macOS y Windows dentro del pipeline de build multiplataforma de Tauri.",
      ],
      architecture:
        "Shell de Tauri (núcleo Rust) con un renderizador React en la webview del sistema. El modelo de voz corre en un worker Rust lanzado desde el backend de Tauri, con resultados transmitidos al renderizador vía IPC a medida que se completan los segmentos. SQLite almacena el estado del proyecto localmente.",
      implementation:
        "El pipeline extrae el audio vía ffmpeg, lo divide en segmentos solapados, ejecuta la inferencia en un pool de workers, fusiona los resultados con una pasada de reconciliación de marcas de tiempo, y luego los muestra en el editor. La exportación de subtítulos soporta SRT, VTT y texto plano.",
      results: [
        "Procesa 60 minutos de metraje en menos de 4 minutos en Apple Silicon.",
        "Cero dependencia de la nube — todos los datos permanecen en el dispositivo.",
        "Precisión de subtítulos comparable a las principales APIs en la nube en grabaciones limpias.",
      ],
      lessonsLearned: [
        "El aislamiento fuera del hilo principal no es negociable al ejecutar inferencia — bloquear el hilo de la UI hunde la experiencia.",
        "Los fragmentos de audio solapados con reconciliación producen límites de palabras mucho más limpios que los cortes duros.",
        "SQLite es el almacén de estado local correcto para Tauri — cero configuración, fiable, suficientemente rápido para este tipo de datos.",
        "El backend Rust de Tauri mantiene una huella de instalación mucho menor que la de Electron, dando acceso directo a runtimes de inferencia nativos.",
      ],
    },
    meta: { role: "Solo · full-stack", timeline: "2025 · en curso", platform: "Escritorio · macOS · Windows", type: "Herramienta de desarrollo" },
    painPoints: [
      { bold: "La transcripción en la nube es cara.", rest: "Los costes de API se acumulan rápido en grabaciones largas y erosionan los márgenes freelance." },
      { bold: "La privacidad es una preocupación real.", rest: "Subir metraje de clientes a servidores de terceros es inaceptable para muchos profesionales del vídeo." },
      { bold: "La transcripción manual es brutal.", rest: "Horas de escuchar y escribir que no aportan nada creativo a la producción." },
    ],
    audienceWho: "Creadores de vídeo y podcasters",
    audienceDesc: "Editores freelance, equipos de contenido y podcasters que necesitan transcripción rápida y privada sin costes de API recurrentes",
    audienceStats: [
      { value: "0 nube", label: "dependencia" },
      { value: "<4 min", label: "por hora de metraje" },
      { value: "100%", label: "local y privado" },
    ],
    productFlow: [
      { step: "01", title: "Importar", description: "Suelta cualquier archivo de vídeo o audio." },
      { step: "02", title: "Transcribir", description: "El modelo en el dispositivo se ejecuta, los segmentos se transmiten." },
      { step: "03", title: "Editar", description: "Corrige palabras y ajusta marcas de tiempo en la línea de tiempo." },
      { step: "04", title: "Exportar", description: "SRT, VTT o texto plano — listo para cualquier editor." },
    ],
    features: [
      { title: "Inferencia en el dispositivo", description: "Un modelo de voz cuantizado corre enteramente en la máquina local en un worker Rust lanzado por el backend de Tauri — sin claves de API, sin subidas, sin costes recurrentes.", bullets: ["El runtime de inferencia Rust nativo funciona en macOS y Windows", "Los resultados se transmiten a la UI a medida que se completan los segmentos"] },
      { title: "Editor de línea de tiempo", description: "Corrige la salida del modelo en un editor de transcripción sincronizado — hacer clic en cualquier palabra busca el vídeo, así que la revisión es rápida.", bullets: ["Visualización de marcas de tiempo a nivel de palabra", "Flujo de edición orientado al teclado"] },
      { title: "Exportación multi-formato", description: "Exporta a SRT, WebVTT o texto plano con un clic — listo para importar en Premiere, Final Cut, DaVinci o cualquier herramienta de subtítulos.", bullets: ["Códigos de tiempo precisos de la pasada de reconciliación", "Compatible con UTF-8 para contenido multilingüe"] },
    ],
    stack: [
      { label: "Shell", chips: ["Tauri", "Rust"] },
      { label: "UI", chips: ["React", "TypeScript"] },
      { label: "IA", chips: ["Inferencia Rust nativa", "Modelo de voz en el dispositivo"] },
      { label: "Almacenamiento", chips: ["SQLite", "ffmpeg"] },
    ],
    proves: [
      { iconKey: "cpu", title: "IA en el dispositivo", description: "Entregado un pipeline de inferencia en Rust en producción dentro de Tauri sin bloquear el hilo de la UI." },
      { iconKey: "zap", title: "Rendimiento de escritorio", description: "Procesa una hora de metraje en menos de 4 minutos mediante una arquitectura de inferencia con pool de workers." },
      { iconKey: "shield", title: "Privacidad por diseño", description: "Cero dependencia de la nube — todo el procesamiento permanece local, haciéndolo viable para grabaciones de clientes y sensibles." },
      { iconKey: "layers", title: "Build multiplataforma", description: "Empaquetado de binarios nativos para macOS y Windows mediante el pipeline de build único de Tauri." },
    ],
  },
  edumation: {
    description:
      "EduMation es un sistema de gestión escolar (SMS) de nivel empresarial diseñado para automatizar la carga administrativa de coordinar estudiantes, profesores y programas pedagógicos.",
    longDescription:
      "EduMation es una plataforma de gestión educativa lista para empresas centrada en resolver desafíos complejos de programación y administración mediante la automatización. La plataforma centraliza la gestión de estudiantes, profesores y cursos dentro de una arquitectura multi-tenant, mientras que su función principal — un motor de programación inteligente que tiene en cuenta las restricciones — automatiza la generación de horarios semanales integrando requisitos internos con la disponibilidad de calendarios externos (Google, Microsoft, ICS).",
    caseStudy: {
      tagline: "Programación automatizada para instituciones educativas — de semanas a minutos.",
      problem:
        "Las instituciones educativas se enfrentan a una 'pesadilla de programación': coordinar manualmente a docenas de profesores, grupos de estudiantes y cursos en franjas horarias limitadas mientras se evitan conflictos con compromisos personales externos. Este proceso manual suele tomar días, implica una alta carga cognitiva, y es frágil — un solo cambio puede desencadenar múltiples conflictos.",
      context:
        "Construido para organizaciones de formación profesional que gestionan múltiples escuelas, programas y cohortes de estudiantes. La plataforma necesitaba manejar programación compleja basada en restricciones (disponibilidad de profesores, capacidad de aulas, dependencias entre cursos) a gran escala, garantizando al mismo tiempo un aislamiento estricto de datos entre instituciones.",
      technicalChallenges: [
        "Resolver el problema de programación NP-difícil sopesando múltiples restricciones blandas y estrictas como descansos para comer, horarios laborales y preferencias de los profesores.",
        "Garantizar un aislamiento estricto de datos multi-tenant mediante filtrado a nivel de middleware para todas las consultas de base de datos en la infraestructura compartida.",
        "Gestionar sincronizaciones de calendarios externos de alta latencia (Google, Microsoft Graph, ICS) sin bloquear los flujos principales de la aplicación ni superar los límites de tasa de los proveedores.",
        "Construir una interfaz de horario interactiva de alto rendimiento capaz de renderizar cientos de eventos dinámicos con tiempos de respuesta inferiores a 100 ms para las ediciones.",
      ],
      architecture:
        "Una stack MERN (MongoDB, Express, React, Node) modular con TypeScript para una seguridad de tipos estricta. El frontend React sigue un Design System interno a medida, mientras que el backend Node.js implementa un servicio de programación basado en heurísticas. Los datos de cada institución se aíslan mediante una capa de filtrado basada en schoolId, y la disponibilidad externa se cachea con un índice TTL de 180 días para verificaciones de conflicto en O(1).",
      implementation:
        "El programador usa una heurística voraz que ordena los cursos por su 'grado de restricción' (el más restringido primero). Calcula las franjas inválidas indexando eventos internos e intervalos ocupados externos cacheados. Un sistema de aleatorización basado en semillas genera tres propuestas distintas para los administradores, mientras que un worker de sincronización dedicado gestiona las integraciones basadas en OAuth2 con proveedores de calendario externos.",
      results: [
        "Tiempo medio de generación de horarios reducido de ~14 días de trabajo manual a menos de 5 minutos.",
        "Eliminación del 100% de los conflictos de doble reserva en las instituciones piloto mediante validación automatizada.",
        "Reducción del 90% en la carga administrativa de los roles de coordinador pedagógico por semestre.",
      ],
      lessonsLearned: [
        "Un solucionador heurístico 'suficientemente bueno' con refinamiento humano es mucho más efectivo para necesidades reales que un solucionador CSP exacto y costoso.",
        "Imponer el aislamiento de datos en la capa de middleware/consulta es la única forma fiable de prevenir brechas de seguridad entre tenants en un entorno SaaS compartido.",
        "Cachear la disponibilidad externa mejora significativamente la capacidad de respuesta de las operaciones de programación en comparación con la obtención en vivo durante la planificación.",
        "La lógica de dominio con tipos seguros para restricciones complejas previene cientos de posibles errores lógicos en tiempo de ejecución durante el desarrollo.",
      ],
    },
    meta: { role: "Solo · full-stack", timeline: "2023 · 14 semanas", platform: "Web · SaaS", type: "Plataforma empresarial" },
    painPoints: [
      { bold: "La programación manual es brutal.", rest: "Coordinar a docenas de profesores y cursos a mano lleva días y es propenso a errores." },
      { bold: "Un cambio rompe todo.", rest: "Un solo conflicto de profesor desencadena docenas de reasignaciones en todo el semestre." },
      { bold: "No existe ninguna herramienta para este nicho.", rest: "El software de programación genérico no puede manejar restricciones específicas del dominio educativo." },
    ],
    audienceWho: "Organizaciones de formación y coordinadores",
    audienceDesc: "Organizaciones de formación profesional que gestionan múltiples escuelas, programas y cohortes de estudiantes a la vez",
    audienceStats: [
      { value: "14d→5min", label: "tiempo de programación" },
      { value: "100%", label: "sin conflictos" },
      { value: "90%", label: "menos trabajo administrativo" },
    ],
    productFlow: [
      { step: "01", title: "Importar", description: "Cargar profesores, grupos de estudiantes, aulas y restricciones." },
      { step: "02", title: "Generar", description: "El solucionador heurístico propone 3 horarios sin conflictos." },
      { step: "03", title: "Refinar", description: "Los coordinadores ajustan y validan en la interfaz de arrastrar y soltar." },
      { step: "04", title: "Publicar", description: "Calendario en vivo sincronizado con todos los profesores y estudiantes." },
    ],
    features: [
      { title: "Motor de programación con IA", description: "Un solucionador heurístico que procesa restricciones estrictas (disponibilidad de profesores, capacidad de aulas) y blandas (descansos, preferencias) para generar propuestas sin conflictos en menos de 5 minutos.", bullets: ["Genera 3 propuestas distintas usando aleatorización basada en semillas", "Gestiona horarios multi-cohorte complejos en segundos"] },
      { title: "Sincronización de calendario en tiempo real", description: "Una sincronización OAuth2 bidireccional con Google Calendar y Microsoft Graph garantiza que los compromisos personales de los profesores siempre estén reflejados, sin paso de importación manual.", bullets: ["Cacheo TTL de 180 días para verificaciones de conflicto en O(1)", "Un worker de sincronización en segundo plano gestiona los límites de tasa con elegancia"] },
      { title: "Arquitectura multi-tenant", description: "El aislamiento estricto de datos impuesto en la capa de middleware garantiza que una institución nunca vea los datos de otra, incluso en infraestructura compartida.", bullets: ["Filtrado basado en schoolId en cada consulta de base de datos", "Control de acceso basado en roles por institución y rol"] },
    ],
    stack: [
      { label: "Frontend", chips: ["React", "TypeScript", "Design System a medida"] },
      { label: "Backend", chips: ["Node.js", "Express", "MongoDB"] },
      { label: "Integraciones", chips: ["API de Google Calendar", "Microsoft Graph", "ICS"] },
      { label: "DevOps", chips: ["Docker", "CI/CD", "Redis"] },
    ],
    proves: [
      { iconKey: "brain", title: "Resolución de problemas con IA", description: "Diseñado y entregado un solucionador heurístico en producción para un problema de programación NP-difícil." },
      { iconKey: "shield", title: "Seguridad multi-tenant", description: "Construido aislamiento de datos a nivel de fila en una base de datos SaaS compartida sin ninguna contaminación cruzada entre tenants." },
      { iconKey: "zap", title: "UI de alto rendimiento", description: "Renderizados cientos de eventos de calendario dinámicos con tiempos de respuesta interactivos inferiores a 100 ms." },
      { iconKey: "link", title: "Integraciones con terceros", description: "Entregadas y mantenidas sincronizaciones OAuth2 en vivo con Google Calendar y Microsoft Graph." },
    ],
  },
  railguessr: {
    description:
      "RailGuessr es un juego de geografía centrado en el transporte que reta a los jugadores a identificar estaciones intermedias en la red del Metro de París.",
    longDescription:
      "RailGuessr es un juego interactivo de geografía del transporte diseñado para entusiastas urbanos y viajeros habituales. Los jugadores deben reconstruir segmentos específicos del metro identificando las estaciones intermedias entre dos extremos a través de 16 líneas. El proyecto presenta un sistema de desafío diario determinista, soporte PWA, y una interfaz minimalista de alto rendimiento diseñada para un compromiso mobile-first.",
    caseStudy: {
      tagline: "La geografía se encuentra con el transporte — adivina la estación, vence el reloj.",
      problem:
        "Los aficionados al transporte y los viajeros diarios carecían de una forma atractiva y sin fricción de poner a prueba su conocimiento de las redes urbanas. Los juegos de geografía existentes eran demasiado genéricos, y no existía ningún desafío diario 'estilo Wordle' específicamente para el complejo sistema del Metro de París.",
      context:
        "Construido para explorar la lógica determinista del lado del cliente y las mecánicas de juego de alta retención. RailGuessr se dirige a una comunidad nicho de entusiastas del transporte, ofreciendo un desafío mental diario sincronizado globalmente sin requerir ninguna infraestructura de backend.",
      technicalChallenges: [
        "Implementar un sistema de desafío diario determinista donde cada usuario en el mundo recibe el mismo rompecabezas basado en un hash de fecha, sin dependencia de backend.",
        "Gestionar la complejidad topológica de las líneas de metro ramificadas (líneas 7, 10, 13) usando búsqueda de caminos basada en grafos para identificar estaciones intermedias válidas.",
        "Optimizar para un soporte PWA 100% offline-first mientras se mantiene una alta visibilidad SEO y rendimiento de AdSense para la monetización.",
        "Construir un sistema de coincidencia de entrada 'difusa' que maneje acentos, mayúsculas/minúsculas, y nomenclatura variada (p. ej., 'Châtelet' vs 'Chatelet') para maximizar la accesibilidad.",
      ],
      architecture:
        "Una aplicación React puramente del lado del cliente desplegada vía Cloudflare Pages. La red de metro se modela como una lista de adyacencia estática (grafo). La semilla diaria se deriva de un hash de la fecha actual, garantizando la sincronización global. Las estadísticas y rachas del usuario se gestionan mediante una utilidad StatsManager a medida que interactúa con LocalStorage.",
      implementation:
        "La lógica de recorrido de grafos identifica caminos únicos en líneas ramificadas, mientras que un normalizador a medida elimina caracteres especiales para la coincidencia difusa. La UI está construida con Tailwind CSS y Framer Motion para transiciones fluidas por debajo de 60fps. La monetización se integra vía Google AdSense con un enfoque específico en mantener el rendimiento central de la UX.",
      results: [
        "Escalado de infraestructura a coste cero: la plataforma gestiona miles de usuarios globalmente a coste de hosting cero mediante entrega en el edge.",
        "Alta retención de usuarios: el sistema de rachas diarias y las comparticiones comunitarias (Twitter/Reddit) impulsaron un crecimiento orgánico a más de 400 usuarios activos mensuales.",
        "Conversión PWA: el 15% de los usuarios habituales han 'instalado' el juego en sus pantallas de inicio móviles para acceso diario.",
      ],
      lessonsLearned: [
        "El hashing determinista del lado del cliente es una alternativa poderosa y sin coste a los backends tradicionales para juegos diarios sincronizados.",
        "El diseño minimalista y los flujos fluidos 'tecla Enter' importan más para la retención que los gráficos de alta fidelidad.",
        "Las implementaciones PWA reducen significativamente la barrera de entrada para el juego móvil casual comparado con la distribución en tiendas de aplicaciones.",
        "Las estructuras de datos basadas en grafos son esenciales para modelar con precisión redes de transporte del mundo real comparado con simples arrays.",
      ],
    },
    meta: { role: "Solo · full-stack", timeline: "2023 · 6 semanas", platform: "Web · PWA", type: "Juego diario" },
    painPoints: [
      { bold: "Los aficionados al transporte no tienen desafío diario.", rest: "Los juegos de geografía genéricos ignoran el detalle y la topología real de las redes de metro urbanas." },
      { bold: "La sincronización diaria normalmente requiere un backend.", rest: "Mantener a todos los jugadores globales en el mismo rompecabezas normalmente implica un servidor y un coste de hosting." },
      { bold: "La topología del metro no es trivial.", rest: "Las líneas ramificadas como la 7 y la 13 no pueden modelarse como simples arrays." },
    ],
    audienceWho: "Entusiastas del transporte y viajeros habituales",
    audienceDesc: "Jugadores diarios que viajan al trabajo, entusiastas urbanos que conocen el metro de su ciudad de memoria",
    audienceStats: [
      { value: "0 €", label: "coste de hosting" },
      { value: "400+", label: "usuarios activos mensuales" },
      { value: "15%", label: "instalaciones PWA" },
    ],
    productFlow: [
      { step: "01", title: "Semilla diaria", description: "El hash de fecha genera el desafío único de hoy." },
      { step: "02", title: "Jugar", description: "El jugador introduce las estaciones intermedias para reconstruir la ruta." },
      { step: "03", title: "Puntuar", description: "La coincidencia difusa valida las respuestas y actualiza la racha." },
      { step: "04", title: "Compartir", description: "Compartir con un clic impulsa el crecimiento orgánico de la comunidad." },
    ],
    features: [
      { title: "Desafío diario determinista", description: "Un hash de fecha genera el mismo rompecabezas para cada jugador globalmente — sin backend requerido, sin coste de sincronización.", bullets: ["Coste de infraestructura cero para sincronización diaria global", "Rompecabezas reproducibles permiten discusión comunitaria y pistas"] },
      { title: "Búsqueda de caminos basada en grafos", description: "El Metro de París se modela como un grafo, permitiendo una identificación precisa de rutas incluso en líneas ramificadas como la 7, 10 y 13.", bullets: ["Gestiona líneas bifurcadas y segmentos de vía compartidos", "Valida todos los caminos de solución válidos, no solo una respuesta canónica"] },
      { title: "Soporte PWA y sin conexión", description: "El soporte PWA offline-first completo significa que los jugadores pueden abrir su desafío diario incluso bajo tierra en el propio metro.", bullets: ["El service worker cachea todos los recursos del juego en la primera carga", "Instalable en la pantalla de inicio en iOS y Android"] },
    ],
    stack: [
      { label: "Frontend", chips: ["React", "Tailwind CSS", "Framer Motion"] },
      { label: "Datos", chips: ["Lista de adyacencia de grafo", "LocalStorage (rachas)", "JSON estático"] },
      { label: "Infra", chips: ["Cloudflare Pages", "Service Worker / PWA"] },
      { label: "Monetización", chips: ["Google AdSense"] },
    ],
    proves: [
      { iconKey: "graph", title: "Algoritmos de grafos", description: "Modelada una red de transporte del mundo real y escrita lógica de búsqueda de caminos en topologías ramificadas." },
      { iconKey: "zap", title: "Arquitectura sin backend", description: "Entregado un juego diario sincronizado globalmente con coste de servidor cero usando hashing determinista del lado del cliente." },
      { iconKey: "mobile", title: "Ingeniería PWA", description: "Construido un juego instalable y utilizable sin conexión que alcanza una tasa de adopción de pantalla de inicio del 15%." },
      { iconKey: "search", title: "Coincidencia difusa", description: "Diseñado un normalizador de cadenas tolerante a acentos para adivinanzas justas y accesibles a través de entradas variadas." },
    ],
  },
  singuessr: {
    description:
      "Singuessr es una plataforma interactiva de blind test musical que convierte cualquier lista de reproducción de Spotify en un juego de adivinanzas en tiempo real — las listas y portadas vienen de Spotify, los adelantos de audio se transmiten desde Apple Music.",
    longDescription:
      "Singuessr es una plataforma dinámica de blind test musical construida para fans de todos los géneros. Combina dos APIs musicales: la Spotify Web API (a través de un proxy Cloudflare Worker de alto rendimiento a medida) proporciona metadatos de listas de reproducción y portadas de álbumes, mientras que la API de Apple Music / iTunes Search entrega los adelantos de audio de 30 segundos que impulsan cada ronda. La arquitectura serverless híbrida gestiona las restricciones regionales de API, la obtención recursiva de alta concurrencia, y la coincidencia de pistas entre catálogos.",
    caseStudy: {
      tagline: "Tus listas de reproducción, tu juego — el blind test dinámico definitivo.",
      problem:
        "Los blind tests musicales tradicionales son estáticos, predefinidos, y limitados en alcance. Además, los adelantos de Spotify sufren errores '403 Forbidden' de licencias regionales cuando se obtienen desde regiones de servidores en la nube — así que una app construida únicamente sobre audio de Spotify se rompe para la mayoría de los usuarios.",
      context:
        "Construido para resolver las limitaciones del trivial musical estático. Singuessr usa Spotify como fuente de verdad para las listas de reproducción y portadas (porque ahí es donde los usuarios organizan su música), pero enruta la reproducción de audio a través del catálogo público de adelantos de Apple Music / iTunes — que es alcanzable globalmente, no autenticado, y libre de la complejidad de OAuth.",
      technicalChallenges: [
        "Diseñar un proxy Cloudflare Worker para eludir las restricciones CORS y los bloqueos de licencia regionales al obtener datos de listas de reproducción de Spotify (inyectando cabeceras market=FR y gestionando la renovación de tokens OAuth2 en el edge).",
        "Hacer coincidir cada pista de Spotify con su equivalente de adelanto en Apple Music / iTunes a través de dos catálogos independientes, con normalización difusa para lidiar con inconsistencias de nombres entre proveedores.",
        "Implementar la obtención recursiva de API para aplanar grandes listas de reproducción de Spotify (100+ pistas) en una única carga JSON de alta velocidad para el frontend.",
        "Desarrollar un algoritmo de puntuación 'difuso' que normaliza los títulos de canciones, eliminando metadatos como '- Remasterizado' o '(Bonus Track)' para garantizar adivinanzas justas.",
        "Optimizar el ciclo de vida de medios en React para precargar los próximos buffers de audio de Apple Music, garantizando una transición sin latencia entre rondas del juego.",
      ],
      architecture:
        "Una arquitectura serverless híbrida: una SPA de React para la UI y un Cloudflare Worker para la capa de proxy de API. El Worker gestiona el OAuth2 de Spotify, el aplanamiento recursivo de listas de reproducción, y la coincidencia entre catálogos contra la API pública de iTunes Search para resolver la URL de adelanto de Apple Music de cada pista. El frontend gestiona el bucle de audio interactivo y alimenta la cola de rondas directamente desde esas URLs de adelanto. El despliegue está completamente automatizado a través de la red edge de Cloudflare.",
      implementation:
        "El proxy usa una estrategia de 'aplanar y cachear' para los metadatos de listas de reproducción de Spotify (portadas + títulos + artistas) y canaliza cada pista hacia una búsqueda paralela en iTunes Search que devuelve una URL de adelanto de Apple Music de 30 segundos. El audio se reproduce entonces en la SPA de React vía la API de Audio HTML5 con una máquina de estados a medida que gestiona la carga, reproducción, y condiciones de carrera durante rondas de adivinanza rápidas.",
      results: [
        "Acceso a millones de listas de reproducción jugables al instante a través de una única interfaz de búsqueda/importación.",
        "Tiempos de carga inferiores a 200ms para listas de reproducción grandes, logrados al delegar el aplanamiento de datos de Spotify y la coincidencia de adelantos de iTunes al edge.",
        "Reproducción de audio alcanzable globalmente — los adelantos de Apple Music eluden los problemas de licencia regional que bloquean los adelantos de Spotify desde regiones de servidores.",
        "Monetización exitosa a través de redes publicitarias que priorizan la privacidad (A-Ads) manteniendo un alto rendimiento de la plataforma.",
      ],
      lessonsLearned: [
        "La coincidencia entre catálogos (Spotify → Apple Music) es la forma más simple de combinar lo mejor de ambos mundos: las listas de reproducción curadas de Spotify con las URLs de adelanto alcanzables globalmente de Apple Music.",
        "Los workers serverless son una solución ideal para la orquestación de APIs y eludir restricciones regionales en integraciones de medios de terceros.",
        "Precargar recursos durante el 'tiempo muerto del reproductor' es la forma más efectiva de mejorar el rendimiento percibido en apps de medios interactivas.",
        "La normalización de cadenas basada en regex es crítica al hacer coincidir pistas entre proveedores con convenciones de nomenclatura de metadatos inconsistentes.",
        "La monetización que prioriza la privacidad puede ser efectiva y performante cuando se integra pronto en el ciclo de vida de la aplicación.",
      ],
    },
    meta: { role: "Solo · full-stack", timeline: "2023 · 8 semanas", platform: "Web", type: "Plataforma musical" },
    painPoints: [
      { bold: "Las licencias regionales bloquean los adelantos de Spotify.", rest: "Los servidores en la nube reciben errores 403 de las URLs de adelanto de Spotify para contenido de la región de la UE — el audio simplemente no se reproduce para la mayoría de los usuarios." },
      { bold: "Los blind tests estáticos aburren rápido.", rest: "Las listas de canciones predefinidas no escalan y pierden rápidamente su valor de rejugabilidad tras unas pocas sesiones." },
      { bold: "Las listas grandes tardan en cargar.", rest: "Obtener 100+ pistas de la API paginada de Spotify crea una latencia de carga dolorosa." },
    ],
    audienceWho: "Amantes de la música y grupos de amigos",
    audienceDesc: "Cualquiera que quiera lanzar un blind test en tiempo real sobre sus propias listas de reproducción de Spotify curadas",
    audienceStats: [
      { value: "∞", label: "listas jugables" },
      { value: "<200ms", label: "carga de lista grande" },
      { value: "0", label: "bloqueos regionales" },
    ],
    productFlow: [
      { step: "01", title: "Importar", description: "Pega cualquier URL de lista de reproducción pública de Spotify." },
      { step: "02", title: "Resolver", description: "El worker en el edge aplana las pistas de Spotify y hace coincidir cada una con su adelanto de Apple Music." },
      { step: "03", title: "Jugar", description: "Los adelantos de Apple Music se transmiten ronda a ronda, con portadas de Spotify." },
      { step: "04", title: "Puntuar", description: "La coincidencia difusa valida las adivinanzas de títulos de canciones." },
    ],
    features: [
      { title: "Proxy Cloudflare Worker", description: "Un Worker ligero orquesta dos APIs: consulta Spotify para datos de lista de reproducción + portadas de álbum (con las cabeceras de mercado adecuadas para esquivar bloqueos regionales), luego resuelve cada pista a su URL de adelanto de Apple Music vía iTunes Search.", bullets: ["Resuelve los bloqueos regionales 403 de Spotify de forma transparente para el cliente", "Coincidencia entre catálogos vía iTunes Search para encontrar cada URL de adelanto", "Gestiona el flujo de tokens OAuth2 y la orquestación de solicitudes en el edge"] },
      { title: "Aplanamiento recursivo de listas", description: "Una única llamada de obtención recorre recursivamente todos los endpoints paginados de Spotify, devolviendo un array de pistas plano — cada una enriquecida con su adelanto de Apple Music correspondiente — en un solo viaje de ida y vuelta.", bullets: ["Gestiona el límite de 100 elementos por página de Spotify de forma transparente", "Menos de 200ms para listas grandes vía colocalización en el edge"] },
      { title: "Gestión del ciclo de vida de audio", description: "Una máquina de estados a medida precarga el próximo buffer de adelanto de Apple Music durante la ronda activa, eliminando la latencia percibida entre rondas del juego.", bullets: ["Transiciones de ronda sin latencia vía precarga en segundo plano", "Gestión de condiciones de carrera durante secuencias de adivinanza rápidas"] },
    ],
    stack: [
      { label: "Frontend", chips: ["React", "Tailwind CSS", "API de Audio HTML5"] },
      { label: "Edge / Backend", chips: ["Cloudflare Workers", "Spotify Web API", "API de Apple Music / iTunes Search"] },
      { label: "Algoritmos", chips: ["Normalización regex", "Coincidencia entre catálogos", "Coincidencia difusa", "Máquina de estados"] },
      { label: "Monetización", chips: ["A-Ads (prioriza la privacidad)"] },
    ],
    proves: [
      { iconKey: "server", title: "Arquitectura serverless", description: "Diseñado y entregado un Cloudflare Worker que actúa como proxy y orquesta dos APIs musicales en el edge." },
      { iconKey: "shield", title: "Elusión de restricciones regionales", description: "Combinado Spotify (listas + portadas) con Apple Music (adelantos alcanzables globalmente) para que el audio se reproduzca para cada usuario, sin importar la región." },
      { iconKey: "zap", title: "Ingeniería de rendimiento", description: "Logrado una carga de listas grandes por debajo de 200ms colocalizando el aplanamiento de datos y la coincidencia entre catálogos en el edge de la CDN." },
      { iconKey: "music", title: "Máquina de estados de medios", description: "Construido un robusto gestor de ciclo de vida de audio que maneja la precarga y las condiciones de carrera en un contexto de juego rápido." },
    ],
  },
  "fuchibol-hub": {
    description:
      "FuchibolHub es una plataforma centrada en el fútbol que reúne múltiples minijuegos interactivos diseñados para el compromiso y la competición de los fans.",
    longDescription:
      "FuchibolHub es una plataforma centrada en el fútbol que reúne múltiples minijuegos interactivos diseñados para el compromiso y la competición de los fans. Su función estrella es un sistema de pronósticos a gran escala construido en torno a la Copa Mundial de la FIFA 2026, que permite a los usuarios pronosticar resultados de partidos y el progreso del torneo. El proyecto explora la gamificación, la interacción comunitaria y un diseño de aplicación escalable orientado a eventos.",
    caseStudy: {
      tagline: "La plataforma de pronósticos para el Mundial 2026 — hecha para fans, no para apostadores.",
      problem:
        "Los fans del fútbol quieren competir en pronósticos de partidos, pero las plataformas existentes o bien requieren apuestas con dinero real u ofrecen un compromiso tan superficial que no mantiene la atención más allá de la primera semana. No existía una plataforma de pronósticos gratuita, social y basada en reputación construida en torno al mayor evento futbolístico de la década.",
      context:
        "Construida antes de la Copa Mundial de la FIFA 2026 para ofrecer una liga de pronósticos gratuita donde grupos de amigos y comunidades pueden competir según la precisión de sus pronósticos. La plataforma necesitaba gestionar la progresión del cuadro del torneo, actualizaciones de clasificación en tiempo real, y picos de tráfico durante los partidos principales.",
      technicalChallenges: [
        "Actualizaciones de puntuación y clasificación en tiempo real usando Socket.io a través de usuarios concurrentes durante ventanas de partidos de alto tráfico.",
        "Aplicación de plazos de pronóstico — los envíos deben bloquearse precisamente en el momento del inicio de cada partido, en el servidor.",
        "Arquitectura escalable orientada a eventos para gestionar la progresión del cuadro del torneo (fase de grupos → eliminatorias → final).",
        "Puntuación basada en grupos con reglas configurables — diferentes ligas usan diferentes sistemas de puntos.",
        "Gestionar envíos de pronósticos concurrentes sin condiciones de carrera en los minutos previos al inicio del partido.",
      ],
      architecture:
        "Frontend React, backend Node.js/Express, MongoDB. Socket.io gestiona las difusiones de clasificación en tiempo real. Un procesador de resultados de partidos basado en cron actualiza las puntuaciones y emite eventos de cambio. Redis sirve como capa pub/sub entre las instancias worker de Socket.io. Los envíos de pronósticos se validan y bloquean en el servidor contra una marca de tiempo de inicio almacenada en el documento del partido.",
      implementation:
        "El bloqueo de envío de pronósticos ocurre en el momento de inicio validado por el servidor — la cuenta atrás de la UI del cliente es puramente cosmética. El procesamiento de resultados de partidos se ejecuta como una tarea en segundo plano, activada por un payload de webhook o una acción del administrador, usando una cola para evitar el doble procesamiento. El cálculo de la clasificación usa pipelines de agregación de MongoDB con una caché Redis TTL de 30 segundos para evitar recalcular en cada solicitud durante los picos de tráfico.",
      results: [
        "Más de 200 usuarios registrados para la temporada del Mundial 2026 antes del lanzamiento",
        "Actualizaciones de clasificación en tiempo real con una latencia inferior a 500ms bajo carga",
        "Cero incidentes de pronósticos después del inicio del partido gracias a la aplicación del bloqueo en el servidor",
      ],
      lessonsLearned: [
        "El pub/sub de Redis simplifica significativamente el escalado de Socket.io a través de múltiples procesos Node — vale la pena añadirlo pronto.",
        "Las herramientas de administración deben construirse antes del lanzamiento — la entrada manual de resultados de partidos sin una interfaz crea riesgo operativo.",
        "La lógica de progresión del cuadro es más limpia modelada como una máquina de estados que como una secuencia de actualizaciones condicionales.",
        "La aplicación de plazos de pronóstico debe ser autoritaria del servidor desde el primer día — los bloqueos del lado del cliente son insuficientes.",
      ],
    },
    meta: { role: "Solo · full-stack", timeline: "2026 · 10 semanas", platform: "Web", type: "Plataforma social" },
    painPoints: [
      { bold: "Las plataformas de apuestas excluyen a los fans casuales.", rest: "La mayoría de las apps de pronósticos requieren dinero real, lo que aleja a la mayoría de los fans del fútbol." },
      { bold: "Las alternativas gratuitas carecen de profundidad competitiva.", rest: "Las herramientas gratuitas existentes no tienen clasificaciones adecuadas, juego en grupo, ni progresión de cuadro de torneo." },
      { bold: "Las actualizaciones en tiempo real son difíciles de escalar.", rest: "Socket.io a través de múltiples procesos Node requiere una arquitectura Redis cuidadosa para evitar el split-brain." },
    ],
    audienceWho: "Fans del fútbol y grupos de amigos",
    audienceDesc: "Grupos de amigos que quieren competir en pronósticos del Mundial 2026 sin apostar",
    audienceStats: [
      { value: "200+", label: "usuarios antes del lanzamiento" },
      { value: "<500ms", label: "latencia de clasificación" },
      { value: "0", label: "errores de pronóstico" },
    ],
    productFlow: [
      { step: "01", title: "Unirse a un grupo", description: "Crea o únete a una liga de pronósticos con amigos." },
      { step: "02", title: "Pronosticar", description: "Envía pronósticos de partidos antes del bloqueo por inicio." },
      { step: "03", title: "Seguir", description: "Actualizaciones de clasificación en tiempo real durante el partido." },
      { step: "04", title: "Clasificar", description: "Clasificación de temporada actualizada conforme avanza el torneo." },
    ],
    features: [
      { title: "Clasificación en tiempo real", description: "Socket.io difunde actualizaciones de puntuación a todos los clientes conectados durante las ventanas de partido, con pub/sub de Redis para escalado horizontal a través de procesos Node.", bullets: ["Actualización de clasificación por debajo de 500ms bajo carga concurrente", "El pub/sub de Redis desacopla la difusión del cálculo de puntuación"] },
      { title: "Bloqueo de pronóstico en el servidor", description: "Los envíos de pronósticos se validan y bloquean en el servidor contra la marca de tiempo de inicio almacenada — la cuenta atrás de la UI del cliente es puramente cosmética.", bullets: ["Cero pronósticos después del inicio en producción", "La cuenta atrás del cliente es cosmética; el servidor siempre tiene la autoridad"] },
      { title: "Pipeline de puntuación orientado a eventos", description: "El procesamiento de resultados de partidos se ejecuta como una tarea en segundo plano, emitiendo eventos consumidos por los servicios de actualización de puntuación, evaluación de insignias y recálculo de clasificación.", bullets: ["El procesamiento idempotente gestiona los reintentos de forma segura", "La progresión del cuadro se modela como una máquina de estados"] },
    ],
    stack: [
      { label: "Frontend", chips: ["React", "Tailwind CSS", "Cliente Socket.io"] },
      { label: "Backend", chips: ["Node.js", "Express", "Socket.io", "MongoDB"] },
      { label: "Tiempo real", chips: ["Pub/sub de Redis", "Tareas cron", "WebSockets"] },
      { label: "DevOps", chips: ["Docker", "Workers en segundo plano"] },
    ],
    proves: [
      { iconKey: "activity", title: "Arquitectura en tiempo real", description: "Diseñado un sistema Socket.io con pub/sub de Redis que escala a través de múltiples procesos Node." },
      { iconKey: "lock", title: "Plazos autoritarios del servidor", description: "Construida una aplicación de bloqueo de pronósticos completamente del lado del servidor, con cero incidentes de elusión del cliente en producción." },
      { iconKey: "layers", title: "Pipeline orientado a eventos", description: "Diseñado un pipeline de procesamiento de puntuación idempotente que gestiona limpiamente los resultados de partidos y la progresión del cuadro." },
      { iconKey: "users", title: "Mecánicas sociales de grupo", description: "Entregadas reglas de liga configurables, puntuación de grupo de amigos, y progresión de cuadro para formatos de torneo." },
    ],
  },
  "fresh-win": {
    description:
      "Fresh.win es una plataforma de pronósticos deportivos centrada en competiciones de fútbol de las principales ligas europeas.",
    longDescription:
      "Fresh.win es una plataforma de pronósticos deportivos centrada en competiciones de fútbol de las principales ligas europeas. En lugar de apostar dinero, los usuarios compiten mediante pronósticos de partidos basados en probabilidades, clasificaciones y desafíos comunitarios. La plataforma integra sistemas de gamificación como recompensas diarias, programas de referidos, mecánicas de rachas y competiciones estacionales para maximizar el compromiso mientras promueve el juego responsable.",
    caseStudy: {
      tagline: "Compite en pronósticos de fútbol — sin dinero, solo reputación.",
      problem:
        "El mercado de apuestas deportivas tiene un problema de juego responsable: las plataformas diseñadas para apuestas de dinero atraen comportamientos adictivos y excluyen a los fans casuales. Había un hueco para una plataforma de pronósticos que ofreciera el mismo bucle de compromiso competitivo — clasificaciones, rachas, presumir con los amigos — sin apuestas económicas.",
      context:
        "Fresh.win se dirige a la gran audiencia de fans del fútbol que quieren poner a prueba su conocimiento de los partidos y competir socialmente pero se sienten disuadidos por las plataformas de apuestas. El programa de referidos y las mecánicas de rachas están diseñados para impulsar el crecimiento orgánico mientras las recompensas diarias crean hábitos de retorno.",
      technicalChallenges: [
        "Diseñar un motor de gamificación atractivo sin ser tan generoso que las clasificaciones pierdan sentido.",
        "Construir un pipeline de seguimiento y atribución de referidos resistente al fraude para prevenir abusos.",
        "Implementar cuadros de competición estacionales y clasificaciones acumulativas con alto rendimiento de consulta.",
        "Un sistema de distribución de recompensas diarias que sea justo, verificable, y resistente a la manipulación temporal.",
        "Equilibrar la generosidad de las recompensas frente a la integridad de la competición — ajustado mediante retroalimentación de usuarios beta.",
      ],
      architecture:
        "Frontend React + Tailwind, API Node.js, PostgreSQL para datos relacionales (usuarios, pronósticos, referidos, clasificaciones). Un motor de puntos procesa los resultados de los partidos de forma asíncrona vía una cola de tareas. Los códigos de referido usan tokens de ID de usuario firmados con HMAC y expiración configurable. El motor de gamificación está orientado a eventos: la resolución de un partido emite eventos consumidos por los servicios de actualización de puntuación, verificación de racha, evaluación de insignias, y recálculo de clasificación.",
      implementation:
        "El motor de puntos escucha los eventos de resultado de partido y activa un pipeline: actualización de puntuación → recálculo de racha → evaluación de insignia → actualización de clasificación. Cada paso es idempotente para gestionar los reintentos de forma segura. La distribución de recompensas diarias se ejecuta como una tarea cron programada con deduplicación vía una clave de fecha procesada por usuario. La prevención de fraude de referidos combina limitación de tasa, verificación de correo electrónico, y comprobaciones de identidad basadas en IP.",
      results: [
        "Bucle de gamificación validado con más de 150 usuarios beta durante una prueba de 6 semanas",
        "Racha de retención activa media de 4 días entre usuarios comprometidos",
        "El sistema de referidos impulsó el 40% de la adquisición de nuevos usuarios durante la fase beta",
      ],
      lessonsLearned: [
        "El ajuste de recompensas de gamificación es tan importante como las mecánicas en sí — empezar de forma conservadora y aumentar la generosidad según los datos de retención.",
        "La prevención de fraude de referidos debe construirse antes del lanzamiento público, no añadirse después del primer incidente de abuso.",
        "El modelo relacional de PostgreSQL simplifica las consultas de clasificación complejas en comparación con las bases de datos documentales — la herramienta adecuada para este tipo de datos.",
        "Un motor de puntos orientado a eventos desacopla limpiamente la lógica de negocio y facilita las pruebas A/B de las reglas de recompensa.",
      ],
    },
    meta: { role: "Solo · full-stack", timeline: "2024 · 12 semanas", platform: "Web", type: "Plataforma de pronósticos" },
    painPoints: [
      { bold: "Las plataformas de apuestas dañan a los fans casuales.", rest: "Los pronósticos basados en dinero atraen comportamientos adictivos y excluyen a los fans que solo quieren competir." },
      { bold: "Las plataformas gratuitas carecen de profundidad.", rest: "Sin apuestas reales, los bucles de compromiso colapsan después de la primera semana — no hay motivo para volver." },
      { bold: "El fraude de referidos es rampante.", rest: "Los sistemas de referidos desprotegidos se abusan inmediatamente después del lanzamiento público." },
    ],
    audienceWho: "Fans del fútbol que evitan las apuestas",
    audienceDesc: "Fans del deporte que quieren pronósticos competitivos sin apuestas económicas — solo reputación y presumir con los amigos",
    audienceStats: [
      { value: "150+", label: "usuarios beta" },
      { value: "4 días", label: "racha activa media" },
      { value: "40%", label: "adquisición por referidos" },
    ],
    productFlow: [
      { step: "01", title: "Pronosticar", description: "Envía pronósticos de resultados de partidos diariamente." },
      { step: "02", title: "Ganar", description: "Puntos otorgados según la precisión del pronóstico." },
      { step: "03", title: "Racha", description: "Las recompensas diarias se acumulan con rachas activas." },
      { step: "04", title: "Competir", description: "Clasificaciones estacionales y ligas de amigos." },
    ],
    features: [
      { title: "Motor de gamificación", description: "Un sistema de puntos orientado a eventos que procesa los resultados de partidos de forma asíncrona, activando el recálculo de racha, la evaluación de insignias, y la actualización de clasificación en un único pipeline idempotente.", bullets: ["Ajuste conservador de recompensas refinado mediante retroalimentación beta", "Reglas de recompensa testeables en A/B vía arquitectura orientada a eventos"] },
      { title: "Pipeline de atribución de referidos", description: "Tokens de referido firmados con HMAC y expiración configurable, combinados con limitación de tasa, verificación de correo electrónico, y comprobaciones de identidad basadas en IP para prevenir abusos.", bullets: ["Prevención de fraude construida antes del lanzamiento público, no añadida después", "El seguimiento de atribución sobrevive a flujos de conversión de varios pasos"] },
      { title: "Sistema de competición estacional", description: "Pipelines de agregación de PostgreSQL calculan clasificaciones estacionales y resultados acumulativos con una capa cacheada en Redis para ventanas de partido de alto tráfico.", bullets: ["Alto rendimiento de consulta durante picos de tráfico de partidos", "Lógica de cuadro estacional modelada para transiciones de estado limpias"] },
    ],
    stack: [
      { label: "Frontend", chips: ["React", "Tailwind CSS"] },
      { label: "Backend", chips: ["Node.js", "Express", "PostgreSQL"] },
      { label: "Gamificación", chips: ["Motor orientado a eventos", "Tokens HMAC", "Caché Redis"] },
      { label: "Infraestructura", chips: ["Tareas cron", "Cola de tareas", "Limitación de tasa"] },
    ],
    proves: [
      { iconKey: "star", title: "Diseño de gamificación", description: "Diseñado y ajustado un bucle de compromiso completo — puntos, rachas, insignias, clasificaciones — validado con más de 150 usuarios beta." },
      { iconKey: "shield", title: "Prevención de fraude", description: "Construido un sistema antifraude de referidos multicapa usando tokens HMAC, limitación de tasa, y comprobaciones de IP antes del lanzamiento público." },
      { iconKey: "database", title: "Modelado de datos relacionales", description: "Elegido PostgreSQL en lugar de una base documental y aprovechados sus pipelines de agregación para consultas de clasificación complejas." },
      { iconKey: "layers", title: "Arquitectura orientada a eventos", description: "Desacoplado el pipeline de puntos en servicios independientes e idempotentes que facilitan las pruebas A/B de las reglas de recompensa." },
    ],
  },
};
