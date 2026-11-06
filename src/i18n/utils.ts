import { en } from './en';
import { es, type Dictionary } from './es';

export type Lang = 'es' | 'en';

const dictionaries: Record<Lang, Partial<Dictionary>> = { es, en };

export function t(lang: Lang, key: string): string {
  return dictionaries[lang][key] ?? es[key] ?? key;
}

export function getAlternateUrl(url: string | URL, lang: Lang): string {
  const pathname = typeof url === 'string' ? url : url.pathname;
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const withoutEnglishPrefix = normalizedPath.replace(/^\/en(?=\/|$)/, '') || '/';
  const withoutLocalePrefix = withoutEnglishPrefix === '/' ? '/' : withoutEnglishPrefix;
  const projectPath = lang === 'en'
    ? withoutLocalePrefix.replace(/^\/proyectos(?=\/|$)/, '/projects')
    : withoutLocalePrefix.replace(/^\/projects(?=\/|$)/, '/proyectos');
  return lang === 'en'
    ? `/en${projectPath === '/' ? '/' : projectPath}`
    : projectPath;
}
