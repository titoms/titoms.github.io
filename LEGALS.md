You are working on my Astro website `fullstackchris.dev`.

Goal:
Create and integrate the legal pages required for a professional freelance/service website based in France/EU.

Important:
This is not legal advice. Create a solid first draft with placeholders for missing legal/company information. Do not invent missing data.

Known information:

* Website: https://fullstackchris.dev
* Owner / Publisher: Christophe Crognier
* Contact email: [christophe.crognier@gmail.com](mailto:christophe.crognier@gmail.com)
* Activity: freelance full-stack web development, technical coaching, AI-assisted development coaching, bootstrapping/MVP workshop, future newsletter and digital resources.
* Newsletter name: AI Clarity Newsletter
* Newsletter provider planned: beehiiv
* Payment provider planned: Stripe Payment Links / Stripe Checkout
* Analytics: Cloudflare Web Analytics
* Current hosting: GitHub Pages
* Domain DNS: Cloudflare
* Future hosting may move to Cloudflare Pages / Workers
* Target users: France, EU and international visitors
* Languages: create pages in English first, but structure should allow French/Spanish later.

Missing information to leave as placeholders:

* Legal status: [AUTO-ENTREPRENEUR]
* SIREN: [851494641]
* SIRET: [85149464100018]
* VAT number: [NOT APPLICABLE]
* Business address / registered address: [CONFIDENTIAL ADDRESS]
* Phone number: [NO NUMBER]
* Hosting provider details:

  * Current: GitHub Pages, GitHub, Inc., [official address to verify]
  * Domain/DNS: Cloudflare, Inc., [official address to verify]
* Applicable law/court: [TO COMPLETE]

Legal pages to create:

1. `/legal-notice`
2. `/privacy-policy`
3. `/terms-of-service`
4. `/cookies`

Also:

* Add links to these pages in the global footer.
* Add a short legal link group in the footer.
* Add SEO metadata for each page.
* Consider `noindex` for legal pages if appropriate, but do not hide them from users.
* Use clean Astro components and the existing design system.
* Keep the pages simple, readable and professional.
* Do not use scary legal wording.
* Add a “Last updated: [DATE]” line on each page.

Content requirements:

## Legal Notice

Include:

* Website name and URL.
* Publisher identity.
* Contact email.
* Legal status placeholder.
* SIREN/SIRET placeholders.
* VAT placeholder.
* Publication director: Christophe Crognier.
* Hosting provider placeholder.
* Intellectual property.
* Liability disclaimer.
* External links disclaimer.

## Privacy Policy

Explain:

* Who collects the data.
* What data may be collected:

  * email address for newsletter
  * name/company if forms are used
  * phone/address if payment/customer forms require it
  * message content submitted through contact forms
  * payment metadata handled by Stripe
  * analytics data if Plausible/Umami is used
  * technical logs from hosting/security providers
* Why data is collected:

  * answer contact requests
  * manage newsletter subscriptions
  * provide services
  * process payments
  * improve the website
  * security and abuse prevention
* Third-party processors:

  * beehiiv for newsletter
  * Stripe for payment
  * Plausible or Umami for analytics
  * GitHub Pages for hosting
  * Cloudflare for DNS/security/future hosting
  * Tally/Formspree only if active
* User rights:

  * access
  * correction
  * deletion
  * objection
  * portability where applicable
  * withdraw consent
  * unsubscribe from newsletter
  * contact email for requests
* Data retention:

  * use reasonable placeholders
  * newsletter until unsubscribe
  * contact data as long as needed for business follow-up
  * invoices/payment records according to legal accounting obligations
* International transfers:

  * mention that some providers may process data outside the EU and rely on appropriate safeguards.
* Security:

  * reasonable technical and organizational measures.
* Contact:

  * [christophe.crognier@gmail.com](mailto:christophe.crognier@gmail.com)

## Terms of Service

For services:

* Scope of services:

  * full-stack development
  * technical coaching
  * AI-assisted development coaching
  * AI Clarity Framework workshop
  * digital resources/templates/freebies
* Prices and payment:

  * prices shown on the website or agreed by quote
  * payments through Stripe or invoice
* Booking:

  * service starts after payment or written agreement
  * scheduling handled by email/calendar
* Cancellation/rescheduling:

  * create a fair placeholder policy
  * e.g. rescheduling possible with reasonable notice
  * no-show or late cancellation terms to complete
* Refunds:

  * placeholder, to be reviewed
* Client responsibilities:

  * provide accurate information
  * provide access/materials if needed
  * ensure they have rights to shared assets/code
* Delivery:

  * coaching/workshop sessions
  * development deliverables depending on agreed scope
* Intellectual property:

  * client keeps their pre-existing assets
  * final deliverables transfer/licensing terms to define
  * reusable methods, templates, know-how and generic components may remain reusable by Christophe unless otherwise agreed
* Limitation of liability:

  * no guarantee of business results
  * client remains responsible for decisions and deployment
* AI tools:

  * AI may be used to assist development, research, documentation or workflow
  * human review remains part of the process
* Governing law:

  * France / placeholder

## Cookie Policy

Explain:

* What cookies/trackers are.
* Current website may use only necessary technical cookies if applicable.
* Analytics:

  * Plausible/Umami if enabled
  * explain whether cookies are used or not depending on configuration
* Third-party embeds:

  * beehiiv forms
  * Stripe checkout/payment links
  * YouTube embeds if used
  * Calendly/Tally/Formspree if used
* Consent:

  * if non-essential trackers are added later, a consent banner will be implemented.
* How users can manage cookies in their browser.
* Contact email.

Cookie banner logic:

* Do not add a cookie banner by default unless the codebase currently includes non-essential trackers that require consent.
* Add a TODO comment explaining when a cookie banner/CMP should be added:

  * Google Analytics
  * Meta Pixel
  * LinkedIn Insight Tag
  * advertising/remarketing pixels
  * non-essential third-party tracking
  * YouTube embeds loaded automatically
* If only privacy-friendly analytics without cookies is used, mention it in the Cookie Policy and Privacy Policy instead of adding a heavy cookie banner.

Implementation tasks:

1. Inspect the current Astro routing structure.
2. Create legal page components/routes.
3. Add footer links.
4. Add metadata.
5. Add a reusable `LegalPageLayout` component if useful.
6. Add placeholders clearly marked as `[TO COMPLETE]`.
7. Add a checklist at the top or bottom of each file for remaining manual information.
8. Do not invent legal identifiers or business addresses.
9. Do not add third-party scripts.
10. Do not change the design system unnecessarily.

After implementation:

* Summarize all created files.
* List all placeholders I must fill.
* List recommended next legal checks before publishing.