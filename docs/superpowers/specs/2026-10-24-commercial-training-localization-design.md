# Commercial and training localization design

## Intent

Make the public offer unambiguous and turn the existing French training stub into a maintained, equivalent catalogue in English, French and Spanish.

## Decisions

- Keep the existing Astro static architecture and all published paths.
- Use `/formations/` for English, `/fr/formations/` for French, and `/es/formations/` for Spanish, with matching child slugs.
- Store the three localized catalogues in one typed Astro component to prevent silent language fallback and keep programme structure identical.
- Keep the Human Coders URL and use the repository's official white logo asset in a padded dark/light-safe card.
- Keep only validated commercial prices in public service copy: €90/hour, €350 half-day, €600 full day, AI Clarity from €650/day, and custom MVP development from €4,500.
- Treat training duration as an indicative proposal and route requests to the existing contact flow.

## Non-goals

No visual redesign, new legal status, unsupported testimonials/certifications, new operational claims, or activation of inactive newsletter promotion.

## Verification

Targeted static checks cover routes, locale links, required training sections, prices, Human Coders attribution, and removal of the image prompt from the MVP article. Then run the existing test suite and Astro build.
