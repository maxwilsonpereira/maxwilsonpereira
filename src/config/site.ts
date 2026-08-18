export const SITE_URL = 'https://maxwilsonpereira.com.br' as const;
export const SITE_NAME = 'Max Wilson Pereira' as const;

export const locales = {
  pt: {
    code: 'pt',
    htmlLang: 'pt-BR',
    ogLocale: 'pt_BR',
    label: 'Português',
    shortLabel: 'PT',
    pathPrefix: '',
  },
  en: {
    code: 'en',
    htmlLang: 'en-US',
    ogLocale: 'en_US',
    label: 'English',
    shortLabel: 'EN',
    pathPrefix: 'en',
  },
  es: {
    code: 'es',
    htmlLang: 'es-ES',
    ogLocale: 'es_ES',
    label: 'Español',
    shortLabel: 'ES',
    pathPrefix: 'es',
  },
  de: {
    code: 'de',
    htmlLang: 'de-DE',
    ogLocale: 'de_DE',
    label: 'Deutsch',
    shortLabel: 'DE',
    pathPrefix: 'de',
  },
} as const;

export type Locale = keyof typeof locales;
export const localeCodes = Object.keys(locales) as Locale[];
export const defaultLocale: Locale = 'pt';

export const routes = {
  home: '',
  biography: 'pages/biografia.html',
  concert: 'pages/concerto.html',
  albums: 'pages/albums.html',
  videos: 'pages/videos.html',
  tenoriAmici: 'pages/albums/tenori-amici.html',
  quattro: 'pages/albums/quattro-sony.html',
  support: 'pages/apoio-pix.html',
  soInLovePurchase: 'pages/albums/so-in-love-pix.html',
  soInLoveDownload: 'pages/albums/so-in-love.html',
} as const;

export type RouteKey = keyof typeof routes;

export const translatedRouteKeys = [
  'home',
  'biography',
  'concert',
  'albums',
  'videos',
  'tenoriAmici',
  'quattro',
  'soInLoveDownload',
] as const satisfies readonly RouteKey[];

export function pathFor(route: RouteKey, locale: Locale = defaultLocale): string {
  const path = routes[route];
  if (locale === defaultLocale) return path ? `/${path}` : '/';
  return path ? `/${locale}/${path}` : `/${locale}/`;
}

export function urlFor(route: RouteKey, locale: Locale = defaultLocale): string {
  return `${SITE_URL}${pathFor(route, locale)}`;
}

export const socialLinks = {
  instagram: 'https://www.instagram.com/maxwilsonpereira/',
  youtube: 'https://www.youtube.com/maxwilsonpereira',
  youtubeChannel: 'https://www.youtube.com/user/maxwilsonpereira',
  tiktok: 'https://www.tiktok.com/discover/maxwilsonpereira',
  facebook: 'https://www.facebook.com/maxwilsonpereira/',
} as const;

export const socialProfiles = [
  { id: 'instagram', label: 'Instagram', href: socialLinks.instagram },
  { id: 'youtube', label: 'YouTube', href: socialLinks.youtube },
  { id: 'tiktok', label: 'TikTok', href: socialLinks.tiktok },
  { id: 'facebook', label: 'Facebook', href: socialLinks.facebook },
] as const;

export const defaultSocialImage = '/assets/optimized/og-max-wilson.jpg';

export const navigation = [
  { route: 'home', label: 'HOME' },
  { route: 'biography', label: 'BIOGRAFIA' },
  { route: 'concert', label: 'CONCERTO' },
  { route: 'albums', label: 'ÁLBUNS' },
  { route: 'videos', label: 'VÍDEOS' },
] as const;
