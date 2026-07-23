export interface LegalPageContent {
  title: string;
  description: string;
  lastUpdated: string;
  bodyHtml: string;
}

export const legalNotice: Record<'en' | 'fr' | 'es', LegalPageContent> = {
  en: {
    title: 'Legal notice',
    description: "Legal notice and publisher information for fullstackchris.dev — operated by Christophe Crognier (Auto-entrepreneur, France).",
    lastUpdated: '2026-06-13',
    bodyHtml: `
      <p>
        This legal notice applies to the website
        <a href="https://fullstackchris.dev">https://fullstackchris.dev</a>
        (the "Website"). It identifies the publisher, the director of publication,
        and the hosting providers of the Website, in line with French and EU
        transparency obligations.
      </p>

      <h2>Publisher</h2>
      <dl>
        <dt>Name</dt>
        <dd>Christophe Crognier</dd>
        <dt>Legal status</dt>
        <dd>Auto-entrepreneur (Micro-entreprise) — France</dd>
        <dt>SIREN</dt>
        <dd>851 494 641</dd>
        <dt>SIRET</dt>
        <dd>851 494 641 00018</dd>
        <dt>VAT</dt>
        <dd>Not applicable — TVA non applicable, art. 293 B du CGI</dd>
        <dt>Registered address</dt>
        <dd>[CONFIDENTIAL ADDRESS — available on request]</dd>
        <dt>Phone</dt>
        <dd>[NO PHONE NUMBER — please use email]</dd>
        <dt>Email</dt>
        <dd><a href="mailto:christophe.crognier@gmail.com">christophe.crognier@gmail.com</a></dd>
      </dl>

      <h2>Director of publication</h2>
      <p>Christophe Crognier.</p>

      <h2>Hosting providers</h2>
      <p>The Website is currently hosted and served through:</p>
      <ul>
        <li>
          <strong>GitHub Pages</strong> — GitHub, Inc., 88 Colin P. Kelly Jr. St.,
          San Francisco, CA 94107, United States.
        </li>
        <li>
          <strong>Cloudflare</strong> — Cloudflare, Inc., 101 Townsend St.,
          San Francisco, CA 94107, United States. Cloudflare is used for DNS,
          security and may be used for future hosting or serverless functions.
        </li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        Unless otherwise stated, all content on the Website — including text, source
        code samples, illustrations, logos, layout and brand elements — is the
        property of Christophe Crognier or used with permission. Reproduction,
        representation, modification, publication or adaptation of all or part of
        the content, by any means and on any medium, is prohibited without prior
        written authorization, except for private, individual use.
      </p>
      <p>
        Third-party trademarks, logos and product names mentioned on the Website
        remain the property of their respective owners.
      </p>

      <h2>Liability</h2>
      <p>
        The publisher makes reasonable efforts to keep information on the Website
        accurate and up to date, but cannot guarantee completeness or absence of
        error. Use of the information is at your own risk. The publisher cannot be
        held liable for direct or indirect damages resulting from access to, or use
        of, the Website.
      </p>

      <h2>External links</h2>
      <p>
        The Website may link to third-party sites whose content is outside the
        publisher's control. The presence of a link does not imply endorsement, and
        the publisher is not responsible for the content, availability, or privacy
        practices of those third-party sites.
      </p>

      <h2>Applicable law</h2>
      <p>
        This legal notice is governed by French law. Any dispute will be submitted
        to the competent French courts under applicable procedural rules.
      </p>

      <h2>Contact</h2>
      <p>
        For any question regarding this legal notice, please write to
        <a href="mailto:christophe.crognier@gmail.com">christophe.crognier@gmail.com</a>.
      </p>
    `,
  },
  fr: {
    title: 'Mentions légales',
    description: "Mentions légales et informations sur l'éditeur de fullstackchris.dev — exploité par Christophe Crognier (Auto-entrepreneur, France).",
    lastUpdated: '2026-06-13',
    bodyHtml: `
      <p>
        Ces mentions légales s'appliquent au site web
        <a href="https://fullstackchris.dev">https://fullstackchris.dev</a>
        (le « Site »). Elles identifient l'éditeur, le directeur de la publication,
        et les hébergeurs du Site, conformément aux obligations de transparence
        françaises et européennes.
      </p>

      <h2>Éditeur</h2>
      <dl>
        <dt>Nom</dt>
        <dd>Christophe Crognier</dd>
        <dt>Statut juridique</dt>
        <dd>Auto-entrepreneur (Micro-entreprise) — France</dd>
        <dt>SIREN</dt>
        <dd>851 494 641</dd>
        <dt>SIRET</dt>
        <dd>851 494 641 00018</dd>
        <dt>TVA</dt>
        <dd>Non applicable — TVA non applicable, art. 293 B du CGI</dd>
        <dt>Adresse enregistrée</dt>
        <dd>[ADRESSE CONFIDENTIELLE — disponible sur demande]</dd>
        <dt>Téléphone</dt>
        <dd>[AUCUN NUMÉRO DE TÉLÉPHONE — merci d'utiliser l'e-mail]</dd>
        <dt>E-mail</dt>
        <dd><a href="mailto:christophe.crognier@gmail.com">christophe.crognier@gmail.com</a></dd>
      </dl>

      <h2>Directeur de la publication</h2>
      <p>Christophe Crognier.</p>

      <h2>Hébergeurs</h2>
      <p>Le Site est actuellement hébergé et servi par :</p>
      <ul>
        <li>
          <strong>GitHub Pages</strong> — GitHub, Inc., 88 Colin P. Kelly Jr. St.,
          San Francisco, CA 94107, États-Unis.
        </li>
        <li>
          <strong>Cloudflare</strong> — Cloudflare, Inc., 101 Townsend St.,
          San Francisco, CA 94107, États-Unis. Cloudflare est utilisé pour le DNS,
          la sécurité, et pourra être utilisé pour l'hébergement ou des fonctions serverless futures.
        </li>
      </ul>

      <h2>Propriété intellectuelle</h2>
      <p>
        Sauf mention contraire, tout le contenu du Site — y compris les textes, exemples de
        code source, illustrations, logos, mise en page et éléments de marque — est la
        propriété de Christophe Crognier ou utilisé avec autorisation. Toute reproduction,
        représentation, modification, publication ou adaptation de tout ou partie du
        contenu, par quelque moyen ou support que ce soit, est interdite sans autorisation
        écrite préalable, sauf pour un usage privé et individuel.
      </p>
      <p>
        Les marques, logos et noms de produits tiers mentionnés sur le Site
        restent la propriété de leurs détenteurs respectifs.
      </p>

      <h2>Responsabilité</h2>
      <p>
        L'éditeur fait des efforts raisonnables pour maintenir les informations du Site
        exactes et à jour, mais ne peut garantir leur exhaustivité ni l'absence
        d'erreur. L'utilisation des informations se fait à vos propres risques. L'éditeur ne peut être
        tenu responsable des dommages directs ou indirects résultant de l'accès au Site
        ou de son utilisation.
      </p>

      <h2>Liens externes</h2>
      <p>
        Le Site peut contenir des liens vers des sites tiers dont le contenu échappe au
        contrôle de l'éditeur. La présence d'un lien n'implique pas d'approbation, et
        l'éditeur n'est pas responsable du contenu, de la disponibilité, ou des pratiques
        de confidentialité de ces sites tiers.
      </p>

      <h2>Droit applicable</h2>
      <p>
        Ces mentions légales sont régies par le droit français. Tout litige sera soumis
        aux tribunaux français compétents selon les règles de procédure applicables.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question concernant ces mentions légales, merci d'écrire à
        <a href="mailto:christophe.crognier@gmail.com">christophe.crognier@gmail.com</a>.
      </p>
    `,
  },
  es: {
    title: 'Aviso legal',
    description: 'Aviso legal e información del editor de fullstackchris.dev — operado por Christophe Crognier (Auto-entrepreneur, Francia).',
    lastUpdated: '2026-06-13',
    bodyHtml: `
      <p>
        Este aviso legal se aplica al sitio web
        <a href="https://fullstackchris.dev">https://fullstackchris.dev</a>
        (el "Sitio"). Identifica al editor, al director de publicación,
        y a los proveedores de hosting del Sitio, conforme a las obligaciones
        de transparencia francesas y de la UE.
      </p>

      <h2>Editor</h2>
      <dl>
        <dt>Nombre</dt>
        <dd>Christophe Crognier</dd>
        <dt>Estatus legal</dt>
        <dd>Auto-entrepreneur (Micro-entreprise) — Francia</dd>
        <dt>SIREN</dt>
        <dd>851 494 641</dd>
        <dt>SIRET</dt>
        <dd>851 494 641 00018</dd>
        <dt>IVA</dt>
        <dd>No aplicable — TVA non applicable, art. 293 B du CGI</dd>
        <dt>Dirección registrada</dt>
        <dd>[DIRECCIÓN CONFIDENCIAL — disponible bajo solicitud]</dd>
        <dt>Teléfono</dt>
        <dd>[SIN NÚMERO DE TELÉFONO — por favor use el correo electrónico]</dd>
        <dt>Correo electrónico</dt>
        <dd><a href="mailto:christophe.crognier@gmail.com">christophe.crognier@gmail.com</a></dd>
      </dl>

      <h2>Director de publicación</h2>
      <p>Christophe Crognier.</p>

      <h2>Proveedores de hosting</h2>
      <p>El Sitio está actualmente alojado y servido a través de:</p>
      <ul>
        <li>
          <strong>GitHub Pages</strong> — GitHub, Inc., 88 Colin P. Kelly Jr. St.,
          San Francisco, CA 94107, Estados Unidos.
        </li>
        <li>
          <strong>Cloudflare</strong> — Cloudflare, Inc., 101 Townsend St.,
          San Francisco, CA 94107, Estados Unidos. Cloudflare se usa para DNS,
          seguridad, y podría usarse para futuro hosting o funciones serverless.
        </li>
      </ul>

      <h2>Propiedad intelectual</h2>
      <p>
        Salvo que se indique lo contrario, todo el contenido del Sitio — incluyendo textos, ejemplos de
        código fuente, ilustraciones, logotipos, maquetación y elementos de marca — es
        propiedad de Christophe Crognier o se usa con permiso. Está prohibida la reproducción,
        representación, modificación, publicación o adaptación de todo o parte del
        contenido, por cualquier medio y en cualquier soporte, sin autorización
        previa por escrito, salvo para uso privado e individual.
      </p>
      <p>
        Las marcas, logotipos y nombres de producto de terceros mencionados en el Sitio
        siguen siendo propiedad de sus respectivos titulares.
      </p>

      <h2>Responsabilidad</h2>
      <p>
        El editor hace esfuerzos razonables para mantener la información del Sitio
        exacta y actualizada, pero no puede garantizar su exhaustividad ni la ausencia
        de errores. El uso de la información es bajo tu propio riesgo. El editor no puede
        ser considerado responsable de daños directos o indirectos derivados del acceso al Sitio
        o de su uso.
      </p>

      <h2>Enlaces externos</h2>
      <p>
        El Sitio puede enlazar a sitios de terceros cuyo contenido está fuera del
        control del editor. La presencia de un enlace no implica respaldo, y
        el editor no es responsable del contenido, disponibilidad, o prácticas de
        privacidad de esos sitios de terceros.
      </p>

      <h2>Ley aplicable</h2>
      <p>
        Este aviso legal se rige por la ley francesa. Cualquier disputa se someterá
        a los tribunales franceses competentes según las normas de procedimiento aplicables.
      </p>

      <h2>Contacto</h2>
      <p>
        Para cualquier pregunta sobre este aviso legal, escribe a
        <a href="mailto:christophe.crognier@gmail.com">christophe.crognier@gmail.com</a>.
      </p>
    `,
  },
};
