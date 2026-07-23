import type { LegalPageContent } from './legalNotice';

export const termsOfService: Record<'en' | 'fr' | 'es', LegalPageContent> = {
  en: {
    title: 'Terms of service',
    description: 'Terms applying to coaching, development, and workshop services offered by Christophe Crognier through fullstackchris.dev.',
    lastUpdated: '2026-06-13',
    bodyHtml: `
      <p>
        These terms apply when you engage Christophe Crognier ("the Provider") for
        services listed on <a href="https://fullstackchris.dev">fullstackchris.dev</a>
        or purchase a digital resource through the Website. They are written to
        set fair expectations between client and provider — if anything is
        unclear, please ask before booking.
      </p>

      <h2>Scope of services</h2>
      <ul>
        <li>Full-stack web development (React, TypeScript, Node, Astro and related stacks).</li>
        <li>Technical coaching for developers and founders.</li>
        <li>AI-assisted development coaching.</li>
        <li>AI Clarity Framework workshop for MVP scoping and roadmap.</li>
        <li>Digital resources, templates, and freebies published on the Website.</li>
      </ul>

      <h2>Prices and payment</h2>
      <p>
        Prices are listed on the relevant service page, or proposed by quote for
        custom engagements. Payments are processed through Stripe (Payment Links
        or Checkout) or by invoice for larger engagements. All prices are quoted
        in the currency shown on the service page. VAT is not applicable
        (TVA non applicable, art. 293 B du CGI).
      </p>

      <h2>Booking and start of service</h2>
      <p>
        A booking is confirmed when payment is received or when a written
        agreement (email confirmation, signed quote) is exchanged. Sessions and
        deliverables are scheduled by email or through the calendar tool linked on
        the Website.
      </p>

      <h2>Cancellation, rescheduling and refunds</h2>
      <p>For coaching sessions, development sessions and workshops, the Client may request to reschedule the session by contacting Christophe Crognier at least 24 hours before the scheduled time.</p>
      <p>If the Client does not attend the scheduled session or requests cancellation less than 24 hours before the scheduled time, the payment may be retained, unless otherwise agreed in writing.</p>
      <p>If Christophe Crognier needs to reschedule a session, a new date will be proposed. If no suitable date can be found, a refund may be offered.</p>
      <p>For consumers purchasing services online, statutory withdrawal rights apply where relevant. If the Client requests that the service begins before the end of the legal withdrawal period, the Client may be asked to expressly agree to the immediate performance of the service and acknowledge that the withdrawal right may be lost once the service has been fully performed, where applicable under consumer law.</p>
      <p>For digital products, templates, downloadable resources or other digital content, access may be provided only after the Client has expressly agreed to immediate delivery and acknowledged that, where applicable under consumer law, the withdrawal right may be lost once the digital content has been supplied.</p>

      <h2>Client responsibilities</h2>
      <ul>
        <li>Provide accurate information about the project and goals.</li>
        <li>Provide timely access to repositories, environments, and assets needed for the work.</li>
        <li>Confirm rights to any code, designs, or assets shared with the Provider.</li>
        <li>Review deliverables and respond within agreed timeframes to keep the engagement on schedule.</li>
      </ul>

      <h2>Delivery</h2>
      <ul>
        <li>Coaching and workshop sessions are delivered live (video call) at the scheduled time, with notes or recording shared where agreed.</li>
        <li>Development deliverables are scoped per engagement (repository access, pull requests, documentation, deployments) and delivered according to the agreed milestones.</li>
      </ul>

      <h2>Intellectual property</h2>
      <ul>
        <li>The client keeps ownership of pre-existing assets and codebases.</li>
        <li>Final deliverables created specifically for the client are transferred or licensed according to the agreed terms in the engagement letter.</li>
        <li>Reusable methods, generic components, templates, and know-how developed by the Provider remain available for reuse on other engagements unless otherwise agreed in writing.</li>
      </ul>

      <h2>Use of AI tools</h2>
      <p>
        The Provider may use AI assistants (such as code-generation and
        research tools) to accelerate development, documentation, and exploration.
        All AI-assisted output is reviewed by a human before delivery. The client
        can request a no-AI workflow if specifically required.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        The Provider does not guarantee business outcomes such as revenue, growth,
        or specific technical performance. The client remains responsible for
        decisions about deployment, security configurations, third-party services,
        and operational choices. To the extent permitted by law, the Provider's
        liability is limited to the amount paid for the engagement that gave rise
        to the claim.
      </p>

      <h2>Confidentiality</h2>
      <p>
        Information shared during an engagement is treated as confidential and
        used only for the purpose of delivering the service, unless explicitly
        agreed otherwise (for example, a public case study).
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by French law. In case of dispute, the parties
        will first attempt to resolve the matter amicably. Failing that, the
        dispute will be submitted to the competent French courts under applicable
        procedural rules.
      </p>

      <h2>Contact</h2>
      <p>Questions about these terms or a specific engagement: <a href="mailto:christophe.crognier@gmail.com">christophe.crognier@gmail.com</a>.</p>
    `,
  },
  fr: {
    title: 'Conditions générales',
    description: "Conditions applicables aux services de coaching, développement et ateliers proposés par Christophe Crognier via fullstackchris.dev.",
    lastUpdated: '2026-06-13',
    bodyHtml: `
      <p>
        Ces conditions s'appliquent lorsque vous engagez Christophe Crognier (« le Prestataire ») pour
        des services listés sur <a href="https://fullstackchris.dev">fullstackchris.dev</a>
        ou lorsque vous achetez une ressource numérique via le Site. Elles sont rédigées pour
        établir des attentes justes entre client et prestataire — si quelque chose n'est
        pas clair, merci de demander avant de réserver.
      </p>

      <h2>Périmètre des services</h2>
      <ul>
        <li>Développement web full-stack (React, TypeScript, Node, Astro et stacks associées).</li>
        <li>Coaching technique pour développeurs et fondateurs.</li>
        <li>Coaching en développement assisté par IA.</li>
        <li>Atelier framework AI Clarity pour le cadrage et la feuille de route MVP.</li>
        <li>Ressources numériques, templates et cadeaux publiés sur le Site.</li>
      </ul>

      <h2>Prix et paiement</h2>
      <p>
        Les prix sont indiqués sur la page de service concernée, ou proposés par devis pour
        des missions sur mesure. Les paiements sont traités via Stripe (Payment Links
        ou Checkout) ou par facture pour les missions plus importantes. Tous les prix sont indiqués
        dans la devise affichée sur la page de service. La TVA n'est pas applicable
        (TVA non applicable, art. 293 B du CGI).
      </p>

      <h2>Réservation et début de service</h2>
      <p>
        Une réservation est confirmée lorsque le paiement est reçu ou lorsqu'un accord
        écrit (confirmation par e-mail, devis signé) est échangé. Les sessions et
        livrables sont planifiés par e-mail ou via l'outil de calendrier lié sur
        le Site.
      </p>

      <h2>Annulation, report et remboursements</h2>
      <p>Pour les sessions de coaching, de développement et les ateliers, le Client peut demander à reporter la session en contactant Christophe Crognier au moins 24 heures avant l'heure prévue.</p>
      <p>Si le Client ne se présente pas à la session prévue ou demande une annulation moins de 24 heures avant l'heure prévue, le paiement peut être conservé, sauf accord écrit contraire.</p>
      <p>Si Christophe Crognier doit reporter une session, une nouvelle date sera proposée. Si aucune date convenable ne peut être trouvée, un remboursement peut être proposé.</p>
      <p>Pour les consommateurs achetant des services en ligne, les droits de rétractation légaux s'appliquent le cas échéant. Si le Client demande que le service commence avant la fin du délai légal de rétractation, il peut lui être demandé d'accepter expressément l'exécution immédiate du service et de reconnaître que le droit de rétractation peut être perdu une fois le service pleinement exécuté, lorsque applicable en droit de la consommation.</p>
      <p>Pour les produits numériques, templates, ressources téléchargeables ou autre contenu numérique, l'accès peut n'être fourni qu'après que le Client a expressément accepté la livraison immédiate et reconnu que, le cas échéant en droit de la consommation, le droit de rétractation peut être perdu une fois le contenu numérique fourni.</p>

      <h2>Responsabilités du client</h2>
      <ul>
        <li>Fournir des informations exactes sur le projet et les objectifs.</li>
        <li>Fournir un accès en temps utile aux repositories, environnements et ressources nécessaires au travail.</li>
        <li>Confirmer les droits sur tout code, design, ou ressource partagée avec le Prestataire.</li>
        <li>Revoir les livrables et répondre dans les délais convenus pour maintenir la mission dans les temps.</li>
      </ul>

      <h2>Livraison</h2>
      <ul>
        <li>Les sessions de coaching et d'atelier sont livrées en direct (appel vidéo) à l'heure prévue, avec notes ou enregistrement partagés si convenu.</li>
        <li>Les livrables de développement sont cadrés par mission (accès repository, pull requests, documentation, déploiements) et livrés selon les jalons convenus.</li>
      </ul>

      <h2>Propriété intellectuelle</h2>
      <ul>
        <li>Le client conserve la propriété des ressources et bases de code préexistantes.</li>
        <li>Les livrables finaux créés spécifiquement pour le client sont transférés ou licenciés selon les termes convenus dans la lettre de mission.</li>
        <li>Les méthodes réutilisables, composants génériques, templates et savoir-faire développés par le Prestataire restent disponibles pour réutilisation sur d'autres missions, sauf accord écrit contraire.</li>
      </ul>

      <h2>Utilisation d'outils IA</h2>
      <p>
        Le Prestataire peut utiliser des assistants IA (tels que des outils de génération de
        code et de recherche) pour accélérer le développement, la documentation et l'exploration.
        Toute sortie assistée par IA est revue par un humain avant livraison. Le client
        peut demander un workflow sans IA si spécifiquement requis.
      </p>

      <h2>Limitation de responsabilité</h2>
      <p>
        Le Prestataire ne garantit pas de résultats business tels que chiffre d'affaires, croissance,
        ou performance technique spécifique. Le client reste responsable des
        décisions concernant le déploiement, les configurations de sécurité, les services tiers,
        et les choix opérationnels. Dans la limite permise par la loi, la responsabilité du Prestataire
        est limitée au montant payé pour la mission ayant donné lieu
        à la réclamation.
      </p>

      <h2>Confidentialité</h2>
      <p>
        Les informations partagées pendant une mission sont traitées de manière confidentielle et
        utilisées uniquement dans le but de livrer le service, sauf accord explicite
        contraire (par exemple, une étude de cas publique).
      </p>

      <h2>Droit applicable</h2>
      <p>
        Ces conditions sont régies par le droit français. En cas de litige, les parties
        tenteront d'abord de résoudre le différend à l'amiable. À défaut, le
        litige sera soumis aux tribunaux français compétents selon les règles de procédure
        applicables.
      </p>

      <h2>Contact</h2>
      <p>Questions sur ces conditions ou une mission spécifique : <a href="mailto:christophe.crognier@gmail.com">christophe.crognier@gmail.com</a>.</p>
    `,
  },
  es: {
    title: 'Términos de servicio',
    description: 'Términos aplicables a los servicios de coaching, desarrollo y talleres ofrecidos por Christophe Crognier a través de fullstackchris.dev.',
    lastUpdated: '2026-06-13',
    bodyHtml: `
      <p>
        Estos términos se aplican cuando contratas a Christophe Crognier ("el Proveedor") para
        servicios listados en <a href="https://fullstackchris.dev">fullstackchris.dev</a>
        o compras un recurso digital a través del Sitio. Están redactados para
        establecer expectativas justas entre cliente y proveedor — si algo no
        está claro, pregunta antes de reservar.
      </p>

      <h2>Alcance de los servicios</h2>
      <ul>
        <li>Desarrollo web full-stack (React, TypeScript, Node, Astro y stacks relacionados).</li>
        <li>Coaching técnico para desarrolladores y fundadores.</li>
        <li>Coaching de desarrollo asistido por IA.</li>
        <li>Taller del framework AI Clarity para alcance y hoja de ruta de MVP.</li>
        <li>Recursos digitales, plantillas y regalos publicados en el Sitio.</li>
      </ul>

      <h2>Precios y pago</h2>
      <p>
        Los precios se indican en la página de servicio correspondiente, o se proponen mediante presupuesto para
        proyectos a medida. Los pagos se procesan a través de Stripe (Payment Links
        o Checkout) o mediante factura para proyectos más grandes. Todos los precios se indican
        en la moneda mostrada en la página de servicio. El IVA no es aplicable
        (TVA non applicable, art. 293 B du CGI).
      </p>

      <h2>Reserva e inicio del servicio</h2>
      <p>
        Una reserva se confirma cuando se recibe el pago o cuando se intercambia un acuerdo
        por escrito (confirmación por correo electrónico, presupuesto firmado). Las sesiones y
        entregables se programan por correo electrónico o a través de la herramienta de calendario enlazada en
        el Sitio.
      </p>

      <h2>Cancelación, reprogramación y reembolsos</h2>
      <p>Para sesiones de coaching, sesiones de desarrollo y talleres, el Cliente puede solicitar reprogramar la sesión contactando a Christophe Crognier al menos 24 horas antes de la hora programada.</p>
      <p>Si el Cliente no asiste a la sesión programada o solicita la cancelación con menos de 24 horas de antelación, el pago puede retenerse, salvo acuerdo escrito en contrario.</p>
      <p>Si Christophe Crognier necesita reprogramar una sesión, se propondrá una nueva fecha. Si no se puede encontrar una fecha adecuada, se podrá ofrecer un reembolso.</p>
      <p>Para los consumidores que compren servicios en línea, se aplican los derechos legales de desistimiento cuando corresponda. Si el Cliente solicita que el servicio comience antes de que finalice el período legal de desistimiento, se le podrá pedir que acepte expresamente la ejecución inmediata del servicio y reconozca que el derecho de desistimiento puede perderse una vez que el servicio se haya ejecutado completamente, cuando sea aplicable según el derecho del consumidor.</p>
      <p>Para productos digitales, plantillas, recursos descargables u otro contenido digital, el acceso solo podrá proporcionarse después de que el Cliente haya aceptado expresamente la entrega inmediata y reconocido que, cuando sea aplicable según el derecho del consumidor, el derecho de desistimiento puede perderse una vez suministrado el contenido digital.</p>

      <h2>Responsabilidades del cliente</h2>
      <ul>
        <li>Proporcionar información precisa sobre el proyecto y los objetivos.</li>
        <li>Proporcionar acceso oportuno a repositorios, entornos y activos necesarios para el trabajo.</li>
        <li>Confirmar los derechos sobre cualquier código, diseño o activo compartido con el Proveedor.</li>
        <li>Revisar los entregables y responder dentro de los plazos acordados para mantener el proyecto en calendario.</li>
      </ul>

      <h2>Entrega</h2>
      <ul>
        <li>Las sesiones de coaching y taller se entregan en vivo (videollamada) en el horario programado, con notas o grabación compartidas cuando se acuerde.</li>
        <li>Los entregables de desarrollo se acotan por proyecto (acceso al repositorio, pull requests, documentación, despliegues) y se entregan según los hitos acordados.</li>
      </ul>

      <h2>Propiedad intelectual</h2>
      <ul>
        <li>El cliente conserva la propiedad de los activos y bases de código preexistentes.</li>
        <li>Los entregables finales creados específicamente para el cliente se transfieren o licencian según los términos acordados en la carta de compromiso.</li>
        <li>Los métodos reutilizables, componentes genéricos, plantillas y know-how desarrollados por el Proveedor permanecen disponibles para reutilización en otros proyectos, salvo acuerdo escrito en contrario.</li>
      </ul>

      <h2>Uso de herramientas de IA</h2>
      <p>
        El Proveedor puede usar asistentes de IA (como herramientas de generación de
        código e investigación) para acelerar el desarrollo, la documentación y la exploración.
        Todo resultado asistido por IA es revisado por un humano antes de la entrega. El cliente
        puede solicitar un flujo de trabajo sin IA si específicamente lo requiere.
      </p>

      <h2>Limitación de responsabilidad</h2>
      <p>
        El Proveedor no garantiza resultados de negocio como ingresos, crecimiento,
        o rendimiento técnico específico. El cliente sigue siendo responsable de las
        decisiones sobre despliegue, configuraciones de seguridad, servicios de terceros,
        y decisiones operativas. En la medida permitida por la ley, la responsabilidad del Proveedor
        se limita al importe pagado por el proyecto que dio origen
        a la reclamación.
      </p>

      <h2>Confidencialidad</h2>
      <p>
        La información compartida durante un proyecto se trata como confidencial y
        se usa únicamente con el propósito de entregar el servicio, salvo que se
        acuerde explícitamente lo contrario (por ejemplo, un caso de estudio público).
      </p>

      <h2>Ley aplicable</h2>
      <p>
        Estos términos se rigen por la ley francesa. En caso de disputa, las partes
        intentarán primero resolver el asunto de forma amistosa. De no lograrlo, la
        disputa se someterá a los tribunales franceses competentes según las normas de procedimiento
        aplicables.
      </p>

      <h2>Contacto</h2>
      <p>Preguntas sobre estos términos o un proyecto específico: <a href="mailto:christophe.crognier@gmail.com">christophe.crognier@gmail.com</a>.</p>
    `,
  },
};
