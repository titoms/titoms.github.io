# Site I18n Design

## Goal

Translate the visible site into English, French, and Spanish, choose the initial language from the visitor's browser/system language, and provide a small selector in the navbar and footer.

## Scope

The localization covers the main pages, services, projects, case studies, blog metadata, blog article bodies, navigation, footer, UI labels, metadata, and CTAs. English remains the canonical source language. French and Spanish are maintained as static in-repository content so the site works on Cloudflare Pages without server-side dependencies or runtime translation APIs.

## Architecture

Localized routes are generated under `/fr/...` and `/es/...`, while the existing root routes stay English. A shared language helper maps route prefixes, localized paths, and language labels. A first-visit client script checks `localStorage` first, then `navigator.languages`, and redirects from English root routes to the matching localized route when the visitor prefers French or Spanish.

Astro pages receive the active locale from their route and import localized static data. React islands that render site chrome receive locale data via props or read a small locale dictionary. Blog posts are duplicated by locale under the content collection so Astro can statically render real localized pages.

## UX

The language selector is compact and text-only: EN / FR / ES. It appears in the desktop navbar, mobile drawer, and footer. Selecting a language saves the preference to `localStorage` and navigates to the corresponding localized URL for the current page where possible.

## Verification

Run `npm.cmd run build` to confirm Astro generates all localized routes. Then start the dev server and inspect English, French, and Spanish versions of the home page, one service page, one project case study, and one blog article. Check that the selector changes routes and that no page renders blank content.
