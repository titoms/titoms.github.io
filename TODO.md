Remaining items to fill before publication

- Add registered business address: [TO COMPLETE]

NEWSLETTER / CLOUDFLARE :

1. In Cloudflare, add `BEEHIIV_API_KEY` and `BEEHIIV_PUBLICATION_ID` to the `fullstackchris` Worker secrets/environment variables, then redeploy.
2. Add `BEEHIIV_API_BASE_URL=https://api.beehiiv.com` only if the default beehiiv API base URL needs to be overridden.
3. Test the Cloudflare temporary URL before switching DNS: homepage, images, legal pages, `/api/health`, and newsletter signup with a test email.
4. Keep GitHub Pages active until Cloudflare testing is complete.
5. After the domain migration is complete, remove the custom domain from GitHub Pages.
6. In beehiiv, confirm that AI Clarity Newsletter double opt-in or welcome email behavior matches the website copy: "Check your inbox to confirm your subscription."
7. In beehiiv, create a custom field named `interest` before any future form starts sending user-selected interest values.
8. TODO: Add optional Cloudflare Turnstile to the newsletter form and verify its token server-side in the Worker.
9. TODO: Add disposable email filtering if low-quality signups become a problem.
10. TODO: Add KV-based rate limiting for newsletter submissions if abuse appears.
11. TODO: Add freebie delivery tracking when free resources are connected to newsletter signup.
12. TODO: Add Stripe webhooks only when paid products/newsletter subscriptions require server-side fulfillment.

DESIGN :

1. Designer les pages relatives a un ecommerce, page de produits, page d'un produit individuel, page de panier, page de validation de commande, etc, le tout en respectant le design system actuel.
Catégories de produits: "freebies", "templates", "design systems", "others".
2. Designer une vue de calendrier pour réserver des créneaux pour les différents services qui exigent mon temps personnel.
3. Designer une vue "freebies/resources" pour le téléchargement de contenus gratuits.
