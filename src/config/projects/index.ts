import type { Project } from '../../types';
import { projectsStructural } from './structural';
import { projectsContentEn } from './content/en';
import { projectsContentFr } from './content/fr';
import { projectsContentEs } from './content/es';

const contentByLocale = {
  en: projectsContentEn,
  fr: projectsContentFr,
  es: projectsContentEs,
} as const;

export function getProjects(locale: 'en' | 'fr' | 'es'): Project[] {
  const content = contentByLocale[locale];
  return projectsStructural.map((structural) => {
    const projectContent = content[structural.slug] ?? projectsContentEn[structural.slug];
    if (!content[structural.slug]) {
      console.warn(`[projects] Missing "${locale}" content for slug "${structural.slug}" — falling back to English.`);
    }
    return { ...structural, ...projectContent };
  });
}
