import type { ServicePageData } from '../../types';
import { servicesStructural } from './structural';
import { servicesContentEn } from './content/en';
import { servicesContentFr } from './content/fr';
import { servicesContentEs } from './content/es';

const contentByLocale = {
  en: servicesContentEn,
  fr: servicesContentFr,
  es: servicesContentEs,
} as const;

export function getServicePages(locale: 'en' | 'fr' | 'es'): ServicePageData[] {
  const content = contentByLocale[locale];
  return servicesStructural.map((structural) => {
    const serviceContent = content[structural.slug] ?? servicesContentEn[structural.slug];
    if (!content[structural.slug]) {
      console.warn(`[services] Missing "${locale}" content for slug "${structural.slug}" — falling back to English.`);
    }
    return { ...structural, ...serviceContent };
  });
}
