import type { LegalPageContent } from './legalNotice';

export const cookies: Record<'en' | 'fr' | 'es', LegalPageContent> = {
  en: {
    title: 'Cookie policy',
    description: 'How fullstackchris.dev uses cookies and trackers — short answer: minimal, with privacy-friendly analytics and no advertising pixels.',
    lastUpdated: '2026-06-13',
    bodyHtml: `
      <p>
        This page explains how
        <a href="https://fullstackchris.dev">fullstackchris.dev</a>
        uses cookies and similar technologies. The short version: the Website is
        designed to be as cookie-light as possible. There is no advertising
        pixel, no cross-site tracking, and analytics are cookieless.
      </p>

      <h2>What is a cookie</h2>
      <p>
        A cookie is a small text file that a website can store in your browser to
        remember information between visits — for example, a session, a language
        preference, or a tracking identifier. Similar technologies include local
        storage, session storage, and pixels.
      </p>

      <h2>What this Website uses</h2>
      <ul>
        <li><strong>Strictly necessary technical storage</strong> — used only if needed for the page to work (for example, remembering a chosen language via local storage). No personal identifiers are stored.</li>
        <li><strong>Cloudflare Web Analytics</strong> — a privacy-friendly analytics service that <em>does not set cookies</em> and does not use personal identifiers. It collects aggregated, anonymous data such as page views and referrers.</li>
      </ul>

      <h2>Third-party embeds and services</h2>
      <p>
        When you interact with embedded services or leave the Website for an
        external service, the corresponding third party may set cookies on its own domain. These are
        governed by the third party's own privacy and cookie policies:
      </p>
      <ul>
        <li><strong>beehiiv</strong> — newsletter delivery and subscriber management, called server-side by the Website.</li>
        <li><strong>Stripe</strong> — payment links and checkout for paid services.</li>
        <li><strong>Calendly</strong> — scheduling embed when used for booking calls.</li>
        <li>YouTube, Tally, or Formspree — only if explicitly embedded on a page. They are not used by default.</li>
      </ul>
      <p>
        These cookies are set by the third party, not by this Website, and they
        only apply within those services. Submitting a form or starting a checkout
        is treated as a deliberate interaction.
      </p>

      <h2>Consent</h2>
      <p>
        Because the Website does not currently use non-essential tracking cookies
        or advertising pixels, no cookie banner is displayed. If non-essential
        trackers are added in the future (for example, a marketing pixel or
        auto-loaded video player), a consent mechanism will be implemented at
        that time, in line with EU ePrivacy and GDPR requirements.
      </p>

      <h2>Managing cookies in your browser</h2>
      <p>
        You can manage or delete cookies in your browser settings. Most browsers
        let you block all cookies, allow only first-party cookies, or clear stored
        data per site:
      </p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
        <li><a href="https://support.microsoft.com/en-us/microsoft-edge" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
      </ul>

      <h2>Updates to this policy</h2>
      <p>This policy may change when new services or trackers are added. The "Last updated" date at the top of the page reflects the most recent revision.</p>

      <h2>Contact</h2>
      <p>Questions about cookies on this Website: <a href="mailto:christophe.crognier@gmail.com">christophe.crognier@gmail.com</a>.</p>
    `,
  },
  fr: {
    title: 'Politique de cookies',
    description: "Comment fullstackchris.dev utilise les cookies et traceurs — en bref : un usage minimal, avec une analytique respectueuse de la vie privée et sans pixel publicitaire.",
    lastUpdated: '2026-06-13',
    bodyHtml: `
      <p>
        Cette page explique comment
        <a href="https://fullstackchris.dev">fullstackchris.dev</a>
        utilise les cookies et technologies similaires. En résumé : le Site est
        conçu pour être aussi léger que possible en cookies. Il n'y a pas de pixel
        publicitaire, pas de suivi inter-sites, et l'analytique est sans cookies.
      </p>

      <h2>Qu'est-ce qu'un cookie</h2>
      <p>
        Un cookie est un petit fichier texte qu'un site web peut stocker dans votre navigateur pour
        se souvenir d'informations entre les visites — par exemple, une session, une préférence
        de langue, ou un identifiant de suivi. Les technologies similaires incluent le stockage
        local, le stockage de session, et les pixels.
      </p>

      <h2>Ce que ce Site utilise</h2>
      <ul>
        <li><strong>Stockage technique strictement nécessaire</strong> — utilisé uniquement si nécessaire au fonctionnement de la page (par exemple, se souvenir d'une langue choisie via le stockage local). Aucun identifiant personnel n'est stocké.</li>
        <li><strong>Cloudflare Web Analytics</strong> — un service d'analytique respectueux de la vie privée qui <em>ne pose pas de cookies</em> et n'utilise pas d'identifiants personnels. Il collecte des données agrégées et anonymes telles que les pages vues et les référents.</li>
      </ul>

      <h2>Contenus et services tiers intégrés</h2>
      <p>
        Lorsque vous interagissez avec des services intégrés ou quittez le Site pour un
        service externe, le tiers concerné peut poser des cookies sur son propre domaine. Ceux-ci sont
        régis par les propres politiques de confidentialité et de cookies de ce tiers :
      </p>
      <ul>
        <li><strong>beehiiv</strong> — envoi de la newsletter et gestion des abonnés, appelé côté serveur par le Site.</li>
        <li><strong>Stripe</strong> — liens de paiement et checkout pour les services payants.</li>
        <li><strong>Calendly</strong> — intégration de planification lorsqu'utilisée pour réserver des appels.</li>
        <li>YouTube, Tally, ou Formspree — uniquement si explicitement intégrés sur une page. Ils ne sont pas utilisés par défaut.</li>
      </ul>
      <p>
        Ces cookies sont posés par le tiers, pas par ce Site, et ils
        s'appliquent uniquement au sein de ces services. Soumettre un formulaire ou démarrer un paiement
        est considéré comme une interaction volontaire.
      </p>

      <h2>Consentement</h2>
      <p>
        Comme le Site n'utilise actuellement aucun cookie de suivi non essentiel
        ni pixel publicitaire, aucune bannière de cookies n'est affichée. Si des traceurs non
        essentiels sont ajoutés à l'avenir (par exemple, un pixel marketing ou
        un lecteur vidéo à chargement automatique), un mécanisme de consentement sera mis en place
        à ce moment-là, conformément aux exigences de l'ePrivacy et du RGPD de l'UE.
      </p>

      <h2>Gérer les cookies dans votre navigateur</h2>
      <p>
        Vous pouvez gérer ou supprimer les cookies dans les paramètres de votre navigateur. La plupart des navigateurs
        vous permettent de bloquer tous les cookies, d'autoriser uniquement les cookies internes au site, ou d'effacer les données
        stockées par site :
      </p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
        <li><a href="https://support.microsoft.com/en-us/microsoft-edge" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
      </ul>

      <h2>Mises à jour de cette politique</h2>
      <p>Cette politique peut changer lorsque de nouveaux services ou traceurs sont ajoutés. La date de « Dernière mise à jour » en haut de la page reflète la révision la plus récente.</p>

      <h2>Contact</h2>
      <p>Questions sur les cookies de ce Site : <a href="mailto:christophe.crognier@gmail.com">christophe.crognier@gmail.com</a>.</p>
    `,
  },
  es: {
    title: 'Política de cookies',
    description: 'Cómo fullstackchris.dev usa cookies y rastreadores — respuesta corta: mínimo uso, con analítica respetuosa con la privacidad y sin píxeles publicitarios.',
    lastUpdated: '2026-06-13',
    bodyHtml: `
      <p>
        Esta página explica cómo
        <a href="https://fullstackchris.dev">fullstackchris.dev</a>
        usa cookies y tecnologías similares. La versión corta: el Sitio está
        diseñado para ser lo más ligero posible en cookies. No hay píxel
        publicitario, ni seguimiento entre sitios, y la analítica no usa cookies.
      </p>

      <h2>Qué es una cookie</h2>
      <p>
        Una cookie es un pequeño archivo de texto que un sitio web puede almacenar en tu navegador para
        recordar información entre visitas — por ejemplo, una sesión, una preferencia
        de idioma, o un identificador de seguimiento. Tecnologías similares incluyen el almacenamiento
        local, el almacenamiento de sesión, y los píxeles.
      </p>

      <h2>Qué usa este Sitio</h2>
      <ul>
        <li><strong>Almacenamiento técnico estrictamente necesario</strong> — usado solo si es necesario para que la página funcione (por ejemplo, recordar un idioma elegido mediante almacenamiento local). No se almacenan identificadores personales.</li>
        <li><strong>Cloudflare Web Analytics</strong> — un servicio de analítica respetuoso con la privacidad que <em>no establece cookies</em> y no usa identificadores personales. Recopila datos agregados y anónimos como vistas de página y referencias.</li>
      </ul>

      <h2>Contenidos y servicios de terceros incrustados</h2>
      <p>
        Cuando interactúas con servicios incrustados o abandonas el Sitio hacia un
        servicio externo, el tercero correspondiente puede establecer cookies en su propio dominio. Estas se
        rigen por las propias políticas de privacidad y cookies de ese tercero:
      </p>
      <ul>
        <li><strong>beehiiv</strong> — envío de la newsletter y gestión de suscriptores, llamado del lado del servidor por el Sitio.</li>
        <li><strong>Stripe</strong> — enlaces de pago y checkout para servicios de pago.</li>
        <li><strong>Calendly</strong> — integración de programación cuando se usa para reservar llamadas.</li>
        <li>YouTube, Tally, o Formspree — solo si están explícitamente incrustados en una página. No se usan por defecto.</li>
      </ul>
      <p>
        Estas cookies las establece el tercero, no este Sitio, y
        solo se aplican dentro de esos servicios. Enviar un formulario o iniciar un checkout
        se considera una interacción deliberada.
      </p>

      <h2>Consentimiento</h2>
      <p>
        Como el Sitio actualmente no usa cookies de seguimiento no esenciales
        ni píxeles publicitarios, no se muestra ningún banner de cookies. Si se añaden rastreadores
        no esenciales en el futuro (por ejemplo, un píxel de marketing o
        un reproductor de vídeo de carga automática), se implementará un mecanismo de consentimiento en
        ese momento, conforme a los requisitos de la ePrivacy y el RGPD de la UE.
      </p>

      <h2>Gestionar cookies en tu navegador</h2>
      <p>
        Puedes gestionar o eliminar cookies en la configuración de tu navegador. La mayoría de los navegadores
        te permiten bloquear todas las cookies, permitir solo cookies propias, o borrar los datos
        almacenados por sitio:
      </p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
        <li><a href="https://support.microsoft.com/en-us/microsoft-edge" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
      </ul>

      <h2>Actualizaciones de esta política</h2>
      <p>Esta política puede cambiar cuando se añadan nuevos servicios o rastreadores. La fecha de "Última actualización" en la parte superior de la página refleja la revisión más reciente.</p>

      <h2>Contacto</h2>
      <p>Preguntas sobre las cookies de este Sitio: <a href="mailto:christophe.crognier@gmail.com">christophe.crognier@gmail.com</a>.</p>
    `,
  },
};
