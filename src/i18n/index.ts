import translations from './translations.json';
import type { Locale } from '@/config/site';

type TranslationDictionary = Record<string, Record<string, string>>;
const dictionaries = translations as TranslationDictionary;

export function t(locale: Locale, source: string): string {
  if (locale === 'pt') return source;
  return dictionaries[locale]?.[source] ?? source;
}

export function translator(locale: Locale): (source: string) => string {
  return (source) => t(locale, source);
}
