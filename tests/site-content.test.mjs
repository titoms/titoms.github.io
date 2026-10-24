import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const root = new URL('..', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('training catalogue exposes 12 localized routes and Human Coders reference', async () => {
  const routes = [
    'src/pages/formations/index.astro', 'src/pages/formations/react-typescript.astro', 'src/pages/formations/node-backend.astro', 'src/pages/formations/ia-developpeurs.astro',
    'src/pages/fr/formations/index.astro', 'src/pages/fr/formations/react-typescript.astro', 'src/pages/fr/formations/node-backend.astro', 'src/pages/fr/formations/ia-developpeurs.astro',
    'src/pages/es/formations/index.astro', 'src/pages/es/formations/react-typescript.astro', 'src/pages/es/formations/node-backend.astro', 'src/pages/es/formations/ia-developpeurs.astro',
  ];
  assert.ok(routes.every((route) => existsSync(new URL(route, root))));
  const view = await read('src/components/pages/TrainingPageView.astro');
  for (const label of ['Objectifs pédagogiques mesurables', 'Programme indicatif', 'Modalités d’évaluation', 'Livrables remis', 'FAQ spécifique']) assert.match(view, new RegExp(label));
  assert.match(view, /humancoders\.com\/formateurs\/christophe-crognier/);
});

test('commercial copy uses validated prices and no newsletter service step', async () => {
  const index = await read('src/components/pages/content/servicesIndex.ts');
  const services = await read('src/components/pages/ServicesIndexView.astro');
  const pricing = await read('src/config/commercialPricing.ts');
  const content = await Promise.all(['fr', 'en', 'es'].map((locale) => read(`src/config/services/content/${locale}.ts`)));
  assert.match(index, /Four ways/);
  assert.match(index, /Quatre façons/);
  assert.match(index, /Cuatro formas/);
  assert.match(index, /350 .*half-day|350 .*demi-journée|350 .*medio día/);
  assert.match(pricing, /aiClarityDayFromCents: 75000/);
  assert.doesNotMatch(services, /ai-web-development-newsletter.*map/);
  for (const source of content) {
    assert.match(source, /90 EUR/);
    assert.match(source, /350 EUR/);
    assert.match(source, /600 EUR/);
    assert.match(source, /COMMERCIAL_PRICING\.aiClarityDayFromCents/);
    assert.match(source, /4500 EUR|4 500 EUR|4,500 EUR/);
    assert.match(source, /7500 EUR|7 500 EUR|7,500 EUR/);
    assert.doesNotMatch(source, /300 EUR|550 EUR/);
  }
});

test('training registration is explicit and does not imply certification or funding', async () => {
  const view = await read('src/components/pages/TrainingPageView.astro');
  const notice = await read('src/components/ui/TrainingLegalNotice.astro');
  const legal = await read('src/components/pages/content/legal/legalNotice.ts');
  for (const source of [notice, legal]) {
    assert.match(source, /11757736975/);
    assert.match(source, /Île-de-France/);
    assert.match(source, /ne vaut pas agrément de l’État/);
    assert.match(source, /Qualiopi/);
    assert.match(source, /CPF/);
    assert.match(source, /OPCO/);
  }
  assert.match(view, /TrainingLegalNotice/);
  assert.match(notice, /lang="fr"/);
  assert.match(notice, /This activity registration/);
  assert.match(notice, /Esta declaración de actividad/);
});

test('MVP article metadata is current and does not expose image prompts', async () => {
  for (const locale of ['en', 'fr', 'es']) {
    const article = await read(`src/content/blog/${locale}/how-much-does-an-mvp-cost.mdx`);
    assert.match(article, /updatedAt: 2026-10-24/);
    assert.doesNotMatch(article, /imagePrompt:/);
    assert.doesNotMatch(article, /2025/);
  }
  const view = await read('src/components/pages/BlogPostView.astro');
  assert.doesNotMatch(view, /article\.data\.imagePrompt/);
});

test('blog cards are semantic full-card links and article code styling is shared', async () => {
  const index = await read('src/components/pages/BlogIndexView.astro');
  const styles = await read('src/styles/global.css');
  assert.match(index, /class="article-card/);
  const firstCard = index.slice(index.indexOf('<a href'), index.indexOf('</a>', index.indexOf('<a href')));
  assert.doesNotMatch(firstCard, /<Button/);
  assert.match(styles, /\.article-content pre/);
  assert.match(styles, /overflow-x: auto/);
});

test('training navigation labels are localized', async () => {
  const [fr, en, es] = await Promise.all([
    read('src/i18n/locales/fr.ts'),
    read('src/i18n/locales/en.ts'),
    read('src/i18n/locales/es.ts'),
  ]);
  assert.match(fr, /Formations/);
  assert.match(en, /Training/);
  assert.match(es, /Formaciones/);
});
