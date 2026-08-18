import type { Locale, RouteKey } from '@/config/site';

export interface SeoData {
  title: string;
  description: string;
  ogDescription?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageMime?: 'image/jpeg' | 'image/png' | 'image/webp';
  type?: 'website' | 'article';
  noindex?: boolean;
}

export interface PageDefinition {
  locale: Locale;
  route: RouteKey;
  pathname: string;
}

export interface Track {
  number: string;
  title: string;
  artist: string;
  src: string;
}

export interface VideoItem {
  id: string;
  videoId: string;
  title: string;
  description: string;
}
