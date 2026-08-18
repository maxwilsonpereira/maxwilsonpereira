import { SITE_NAME, SITE_URL, routes, socialLinks, urlFor, type Locale, type RouteKey } from '@/config/site';
import { t } from '@/i18n';
import type { SeoData } from '@/types';

type SchemaNode = Record<string, unknown>;

const pageTypes: Partial<Record<RouteKey, string>> = {
  biography: 'ProfilePage',
  albums: 'CollectionPage',
};

export function buildStructuredData(route: RouteKey, locale: Locale, seo: SeoData): SchemaNode {
  const pageUrl = urlFor(route, locale);
  const websiteId = `${SITE_URL}/#website`;
  const personId = `${SITE_URL}/#max-wilson-pereira`;
  const pageId = `${pageUrl}#webpage`;
  const imageUrl = new URL(seo.image ?? '/assets/optimized/og-max-wilson.jpg', SITE_URL).href;
  const primaryImage = {
    '@type': 'ImageObject',
    url: imageUrl,
    width: seo.imageWidth ?? 1200,
    height: seo.imageHeight ?? 630,
    caption: seo.imageAlt,
  };
  const graph: SchemaNode[] = [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: ['pt-BR', 'en-US', 'es-ES', 'de-DE'],
      publisher: { '@id': personId },
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/assets/optimized/max-gigga-698.webp`,
      jobTitle: 'Tenor',
      description: t(locale, 'Tenor brasileiro radicado em Viena, com trajetória em ópera, crossover clássico, televisão, concertos e música gravada.'),
      birthPlace: { '@type': 'Place', name: 'São Paulo, Brasil' },
      homeLocation: { '@type': 'Place', name: 'Viena, Áustria' },
      sameAs: [socialLinks.instagram, socialLinks.youtube, socialLinks.tiktok, socialLinks.facebook],
    },
    {
      '@type': pageTypes[route] ?? 'WebPage',
      '@id': pageId,
      url: pageUrl,
      name: seo.title,
      description: seo.description,
      inLanguage: locale === 'pt' ? 'pt-BR' : locale === 'en' ? 'en-US' : locale === 'es' ? 'es-ES' : 'de-DE',
      isPartOf: { '@id': websiteId },
      mainEntity: { '@id': personId },
      about: { '@id': personId },
      image: primaryImage,
      primaryImageOfPage: primaryImage,
    },
  ];

  if (route !== 'home') {
    const breadcrumbId = `${pageUrl}#breadcrumb`;
    graph[2].breadcrumb = { '@id': breadcrumbId };
    const items: SchemaNode[] = [
      { '@type': 'ListItem', position: 1, name: t(locale, 'Início'), item: urlFor('home', locale) },
    ];
    if (routes[route].startsWith('pages/albums/')) {
      items.push({ '@type': 'ListItem', position: 2, name: t(locale, 'Álbuns'), item: urlFor('albums', locale) });
    }
    items.push({
      '@type': 'ListItem',
      position: items.length + 1,
      name: seo.title.replace(/\s*\|\s*Max Wilson Pereira$/u, ''),
      item: pageUrl,
    });
    graph.push({ '@type': 'BreadcrumbList', '@id': breadcrumbId, itemListElement: items });
  }

  const albumSchemas: Partial<Record<RouteKey, SchemaNode>> = {
    tenoriAmici: {
      '@type': 'MusicAlbum', '@id': `${pageUrl}#album`, name: 'Tenori Amici - Con Amore', url: pageUrl,
      image: `${SITE_URL}/assets/tenori-amici/cover-front.jpg`, recordLabel: 'Biscoito Fino',
      byArtist: { '@type': 'MusicGroup', name: 'Tenori Amici', member: { '@id': personId } },
    },
    quattro: {
      '@type': 'MusicAlbum', '@id': `${pageUrl}#album`, name: 'QUATTRO', url: pageUrl,
      image: `${SITE_URL}/assets/quattro-sony/cover-front.jpg`, datePublished: '2011', recordLabel: 'Sony Music Entertainment Brasil',
      byArtist: { '@type': 'MusicGroup', name: 'QUATTRO', member: { '@id': personId } },
    },
    soInLovePurchase: {
      '@type': 'MusicAlbum', '@id': `${pageUrl}#album`, name: 'SO IN LOVE', url: pageUrl,
      image: `${SITE_URL}/assets/so-in-love/cover-front.jpg`, byArtist: { '@id': personId },
    },
  };
  const album = albumSchemas[route];
  if (album) {
    graph.push(album);
    graph[2].mainEntity = { '@id': album['@id'] };
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
