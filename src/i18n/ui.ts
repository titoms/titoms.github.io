import en from './locales/en';
import fr from './locales/fr';
import es from './locales/es';

export const locales = ['en', 'fr', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

const dictionaries: Record<Locale, typeof en> = { en, fr, es };

type Dictionary = typeof en;

function get(dict: Dictionary, path: string): unknown {
  return path.split('.').reduce<unknown>((node, key) => {
    if (node && typeof node === 'object' && key in node) {
      return (node as Record<string, unknown>)[key];
    }
    return undefined;
  }, dict);
}

export function useTranslations(locale: string | undefined) {
  const dict = dictionaries[(locale as Locale) ?? defaultLocale] ?? dictionaries[defaultLocale];

  return function t(path: string): string {
    const value = get(dict, path) ?? get(dictionaries[defaultLocale], path);
    return typeof value === 'string' ? value : path;
  };
}

export function stripLocalePrefix(pathname: string): string {
  const match = pathname.match(/^\/(fr|es)(\/.*|$)/);
  return match ? match[2] || '/' : pathname;
}

export function getLocalePrefix(locale: string | undefined): string {
  return locale && locale !== defaultLocale ? '/' + locale : '';
}

export function getLocalizedPath(path: string, locale: string | undefined): string {
  if (!path || path.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(path)) {
    return path;
  }

  const prefix = getLocalePrefix(locale);
  const barePath = stripLocalePrefix(path);

  if (barePath === '/') {
    return prefix || '/';
  }

  return prefix + (barePath.startsWith('/') ? barePath : '/' + barePath);
}
