import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = process.cwd();
const SITE_URL = 'https://maxwilsonpereira.com.br';
const LANGUAGES = {
  en: { htmlLang: 'en-US', ogLocale: 'en_US' },
  de: { htmlLang: 'de-DE', ogLocale: 'de_DE' },
};
const PUBLIC_PAGES = [
  'index.html',
  'pages/biografia.html',
  'pages/concerto.html',
  'pages/albums.html',
  'pages/albums/tenori-amici.html',
  'pages/albums/quattro-sony.html',
];
const PORTUGUESE_ONLY_PAGES = [
  'pages/apoio-pix.html',
  'pages/albums/so-in-love-pix.html',
];
const PUBLIC_PAGE_SET = new Set(PUBLIC_PAGES);
const ALTERNATE_START = '<!-- localized-alternates:start -->';
const ALTERNATE_END = '<!-- localized-alternates:end -->';
const STRUCTURED_START = '<!-- structured-data:start -->';
const STRUCTURED_END = '<!-- structured-data:end -->';
const SOCIAL_IMAGE_START = '<!-- social-image-details:start -->';
const SOCIAL_IMAGE_END = '<!-- social-image-details:end -->';
const LANGUAGE_LABELS = {
  pt: {
    htmlLang: 'pt-BR',
    home: 'Início',
    albums: 'Álbuns',
    socialImageAlt: 'Max Wilson Pereira em apresentação ao vivo com Hebe Camargo',
    personDescription: 'Tenor brasileiro radicado em Viena, com trajetória em ópera, crossover clássico, televisão, concertos e música gravada.',
  },
  en: {
    htmlLang: 'en-US',
    home: 'Home',
    albums: 'Albums',
    socialImageAlt: 'Max Wilson Pereira performing live with Hebe Camargo',
    personDescription: 'Brazilian tenor based in Vienna, with a career spanning opera, classical crossover, television, concerts, and recorded music.',
  },
  de: {
    htmlLang: 'de-DE',
    home: 'Startseite',
    albums: 'Alben',
    socialImageAlt: 'Max Wilson Pereira bei einem Live-Auftritt mit Hebe Camargo',
    personDescription: 'Brasilianischer Tenor in Wien mit einer Laufbahn in Oper, klassischem Crossover, Fernsehen, Konzerten und Tonaufnahmen.',
  },
};

function toPosix(value) {
  return value.replaceAll('\\', '/');
}

function routeUrl(route, language = 'pt') {
  const suffix = route === 'index.html' ? '' : route;
  if (language === 'pt') return `${SITE_URL}/${suffix}`;
  return `${SITE_URL}/${language}/${suffix}`;
}

function alternateBlock(route) {
  return [
    ALTERNATE_START,
    `    <link rel="alternate" hreflang="pt-BR" href="${routeUrl(route)}" />`,
    `    <link rel="alternate" hreflang="en-US" href="${routeUrl(route, 'en')}" />`,
    `    <link rel="alternate" hreflang="de-DE" href="${routeUrl(route, 'de')}" />`,
    `    <link rel="alternate" hreflang="x-default" href="${routeUrl(route)}" />`,
    `    ${ALTERNATE_END}`,
  ].join('\n');
}

function upsertAlternateBlock(html, route) {
  const withoutExisting = html.replace(
    new RegExp(`${ALTERNATE_START}[\\s\\S]*?${ALTERNATE_END}\\s*`, 'g'),
    '',
  );
  const canonicalPattern = /(<link\s+rel="canonical"[\s\S]*?\/>)/i;
  if (!canonicalPattern.test(withoutExisting)) {
    throw new Error(`Canonical link not found in ${route}`);
  }
  return withoutExisting.replace(
    canonicalPattern,
    `$1\n    ${alternateBlock(route)}`,
  );
}

function upsertSocialImageDetails(html, language) {
  const withoutExisting = html.replace(
    new RegExp(`${SOCIAL_IMAGE_START}[\\s\\S]*?${SOCIAL_IMAGE_END}\\s*`, 'g'),
    '',
  );
  const block = [
    `    ${SOCIAL_IMAGE_START}`,
    '    <meta property="og:image:width" content="1200" />',
    '    <meta property="og:image:height" content="630" />',
    '    <meta property="og:image:type" content="image/jpeg" />',
    `    <meta property="og:image:alt" content="${LANGUAGE_LABELS[language].socialImageAlt}" />`,
    `    <meta name="twitter:image:alt" content="${LANGUAGE_LABELS[language].socialImageAlt}" />`,
    `    ${SOCIAL_IMAGE_END}`,
  ].join('\n');
  return withoutExisting.replace(
    /^[ \t]*(<meta\s+property="og:locale")/im,
    `${block}\n    $1`,
  );
}

function decodeEntities(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");
}

function getPageMetadata(html) {
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() || '';
  const description = html.match(
    /<meta\s+name="description"\s+content="([^"]*)"\s*\/>/i,
  )?.[1] || '';
  return {
    title: decodeEntities(title),
    description: decodeEntities(description),
  };
}

function getBreadcrumbs(route, language, title) {
  const labels = LANGUAGE_LABELS[language];
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: labels.home,
      item: routeUrl('index.html', language),
    },
  ];
  if (route.startsWith('pages/albums/')) {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: labels.albums,
      item: routeUrl('pages/albums.html', language),
    });
  }
  items.push({
    '@type': 'ListItem',
    position: items.length + 1,
    name: title.replace(/\s*\|\s*Max Wilson Pereira$/u, ''),
    item: routeUrl(route, language),
  });
  return items;
}

function buildStructuredData(html, route, language) {
  const labels = LANGUAGE_LABELS[language];
  const { title, description } = getPageMetadata(html);
  const pageUrl = routeUrl(route, language);
  const pageId = `${pageUrl}#webpage`;
  const personId = `${SITE_URL}/#max-wilson-pereira`;
  const websiteId = `${SITE_URL}/#website`;
  const graph = [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${SITE_URL}/`,
      name: 'Max Wilson Pereira',
      inLanguage: labels.htmlLang,
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: 'Max Wilson Pereira',
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/assets/max-gigga.jpg`,
      jobTitle: 'Tenor',
      description: labels.personDescription,
      birthPlace: {
        '@type': 'Place',
        name: 'São Paulo, Brasil',
      },
      homeLocation: {
        '@type': 'Place',
        name: 'Viena, Áustria',
      },
      sameAs: [
        'https://www.youtube.com/maxwilsonpereira',
        'https://www.instagram.com/maxwilsonpereira/',
      ],
    },
    {
      '@type': route === 'pages/biografia.html'
        ? 'ProfilePage'
        : route === 'pages/albums.html'
          ? 'CollectionPage'
          : 'WebPage',
      '@id': pageId,
      url: pageUrl,
      name: title,
      description,
      inLanguage: labels.htmlLang,
      isPartOf: { '@id': websiteId },
      mainEntity: { '@id': personId },
    },
  ];

  if (route !== 'index.html') {
    const breadcrumbId = `${pageUrl}#breadcrumb`;
    graph[2].breadcrumb = { '@id': breadcrumbId };
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: getBreadcrumbs(route, language, title),
    });
  }

  if (route === 'pages/albums/tenori-amici.html') {
    graph.push({
      '@type': 'MusicAlbum',
      '@id': `${pageUrl}#album`,
      name: 'Tenori Amici - Con Amore',
      url: pageUrl,
      image: `${SITE_URL}/assets/tenori-amici/cover-front.jpg`,
      recordLabel: 'Biscoito Fino',
      byArtist: {
        '@type': 'MusicGroup',
        name: 'Tenori Amici',
        member: { '@id': personId },
      },
    });
    graph[2].mainEntity = { '@id': `${pageUrl}#album` };
  }

  if (route === 'pages/albums/quattro-sony.html') {
    graph.push({
      '@type': 'MusicAlbum',
      '@id': `${pageUrl}#album`,
      name: 'QUATTRO',
      url: pageUrl,
      image: `${SITE_URL}/assets/quattro-sony/cover-front.jpg`,
      datePublished: '2011',
      recordLabel: 'Sony Music Entertainment Brasil',
      byArtist: {
        '@type': 'MusicGroup',
        name: 'QUATTRO',
        member: { '@id': personId },
      },
    });
    graph[2].mainEntity = { '@id': `${pageUrl}#album` };
  }

  if (route === 'pages/albums/so-in-love-pix.html') {
    graph.push({
      '@type': 'MusicAlbum',
      '@id': `${pageUrl}#album`,
      name: 'SO IN LOVE',
      url: pageUrl,
      image: `${SITE_URL}/assets/so-in-love/cover-front.jpg`,
      byArtist: { '@id': personId },
    });
    graph[2].mainEntity = { '@id': `${pageUrl}#album` };
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

function upsertStructuredData(html, route, language) {
  const withoutExisting = html.replace(
    new RegExp(`${STRUCTURED_START}[\\s\\S]*?${STRUCTURED_END}\\s*`, 'g'),
    '',
  );
  const json = JSON.stringify(buildStructuredData(withoutExisting, route, language), null, 2)
    .replaceAll('<', '\\u003c');
  const block = [
    `    ${STRUCTURED_START}`,
    '    <script type="application/ld+json">',
    json.split('\n').map((line) => `      ${line}`).join('\n'),
    '    </script>',
    `    ${STRUCTURED_END}`,
  ].join('\n');
  return withoutExisting.replace(
    /^[ \t]*<\/head>/im,
    `${block}\n  </head>`,
  );
}

async function loadTranslations() {
  const componentSource = await fs.readFile(
    path.join(ROOT, 'js', 'components.js'),
    'utf8',
  );
  const startMarker = 'const MWP_TEXT_TRANSLATIONS = ';
  const start = componentSource.indexOf(startMarker);
  const end = componentSource.indexOf('\n\nfunction getCurrentLanguage', start);
  if (start < 0 || end < 0) throw new Error('Translation dictionary not found.');

  const expression = componentSource
    .slice(start + startMarker.length, end)
    .trim()
    .replace(/;$/, '');
  return vm.runInNewContext(`(${expression})`, Object.create(null));
}

function replaceMetadata(html, route, language, translations) {
  const locale = LANGUAGES[language];
  const translate = (value) => translations[language]?.[value] || value;
  let output = html.replace(
    /<html\s+lang="[^"]+">/i,
    `<html lang="${locale.htmlLang}">`,
  );

  output = output.replace(
    /<title>([\s\S]*?)<\/title>/i,
    (_, value) => `<title>${translate(value.trim())}</title>`,
  );
  for (const name of ['description', 'twitter:title', 'twitter:description']) {
    const pattern = new RegExp(
      `(<meta\\s+name="${name}"\\s+content=")([^"]*)("\\s*\\/>)`,
      'i',
    );
    output = output.replace(pattern, (_, before, value, after) => {
      return `${before}${translate(value)}${after}`;
    });
  }
  for (const property of ['og:title', 'og:description']) {
    const pattern = new RegExp(
      `(<meta\\s+property="${property}"\\s+content=")([^"]*)("\\s*\\/>)`,
      'i',
    );
    output = output.replace(pattern, (_, before, value, after) => {
      return `${before}${translate(value)}${after}`;
    });
  }

  const canonical = routeUrl(route, language);
  output = output.replace(
    /(<link\s+rel="canonical"\s+href=")[^"]*("\s*\/>)/i,
    `$1${canonical}$2`,
  );
  output = output.replace(
    /(<meta\s+property="og:url"\s+content=")[^"]*("\s*\/>)/i,
    `$1${canonical}$2`,
  );
  output = output.replace(
    /(<meta\s+property="og:locale"\s+content=")[^"]*("\s*\/>)/i,
    `$1${locale.ogLocale}$2`,
  );
  return output;
}

function translateStaticMarkup(html, language, translations) {
  const dictionary = translations[language] || {};
  const translateExact = (value) => dictionary[value] || value;
  const translateText = (value) => {
    if (!value.trim()) return value;
    const leading = value.match(/^\s*/u)?.[0] || '';
    const trailing = value.match(/\s*$/u)?.[0] || '';
    const content = value.slice(leading.length, value.length - trailing.length);
    const normalized = content.replace(/\s+/gu, ' ');
    return `${leading}${translateExact(normalized)}${trailing}`;
  };
  const translateAttributes = (tag) => tag.replace(
    /(\s(?:alt|aria-label|placeholder|title|text)=")([^"]*)(")/gi,
    (_, before, value, after) => `${before}${translateExact(value)}${after}`,
  );

  return html
    .split(/(<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<!--[\s\S]*?-->|<[^>]+>)/gi)
    .map((token) => {
      if (!token.startsWith('<')) return translateText(token);
      if (/^<(?:script|style|!--)/i.test(token)) return token;
      return translateAttributes(token);
    })
    .join('');
}

function splitUrl(value) {
  const match = value.match(/^([^?#]*)([?#][\s\S]*)?$/);
  return { pathname: match?.[1] || value, suffix: match?.[2] || '' };
}

function isExternal(value) {
  return /^(?:[a-z]+:|\/\/|#)/i.test(value);
}

function rewriteLocalUrl(value, sourceRoute, targetRoute, language) {
  if (!value || isExternal(value)) return value;
  const { pathname: localPath, suffix } = splitUrl(value);
  if (!localPath) return value;

  const sourceDirectory = path.posix.dirname(sourceRoute);
  const resolved = path.posix.normalize(path.posix.join(sourceDirectory, localPath));
  const targetResolved = PUBLIC_PAGE_SET.has(resolved)
    ? path.posix.join(language, resolved)
    : resolved;
  let relative = path.posix.relative(path.posix.dirname(targetRoute), targetResolved);
  if (!relative) relative = path.posix.basename(targetResolved);
  return `${relative}${suffix}`;
}

function rewriteLocalReferences(html, sourceRoute, targetRoute, language) {
  let output = html.replace(
    /(\s(?:src|href|poster|data-src)=")([^"]+)(")/gi,
    (_, before, value, after) => {
      return `${before}${rewriteLocalUrl(value, sourceRoute, targetRoute, language)}${after}`;
    },
  );
  output = output.replace(/(\s(?:srcset|imagesrcset)=")([^"]+)(")/gi, (_, before, value, after) => {
    const rewritten = value
      .split(',')
      .map((candidate) => {
        const parts = candidate.trim().split(/\s+/);
        const url = rewriteLocalUrl(parts.shift(), sourceRoute, targetRoute, language);
        return [url, ...parts].join(' ');
      })
      .join(', ');
    return `${before}${rewritten}${after}`;
  });
  return output;
}

async function generate() {
  const translations = await loadTranslations();
  for (const sourceRoute of PUBLIC_PAGES) {
    const sourcePath = path.join(ROOT, ...sourceRoute.split('/'));
    let source = await fs.readFile(sourcePath, 'utf8');
    source = upsertAlternateBlock(source, sourceRoute);
    source = upsertSocialImageDetails(source, 'pt');
    source = upsertStructuredData(source, sourceRoute, 'pt');
    await fs.writeFile(sourcePath, source, 'utf8');

    for (const language of Object.keys(LANGUAGES)) {
      const targetRoute = path.posix.join(language, sourceRoute);
      const targetPath = path.join(ROOT, ...targetRoute.split('/'));
      let localized = replaceMetadata(source, sourceRoute, language, translations);
      localized = translateStaticMarkup(localized, language, translations);
      localized = rewriteLocalReferences(
        localized,
        sourceRoute,
        targetRoute,
        language,
      );
      localized = upsertSocialImageDetails(localized, language);
      localized = upsertStructuredData(localized, sourceRoute, language);
      localized = localized.replace(
        '<!doctype html>',
        '<!doctype html>\n<!-- Generated by scripts/generate-localized-pages.mjs. Edit the Portuguese source instead. -->',
      );
      await fs.mkdir(path.dirname(targetPath), { recursive: true });
      await fs.writeFile(targetPath, localized, 'utf8');
    }
  }

  for (const sourceRoute of PORTUGUESE_ONLY_PAGES) {
    const sourcePath = path.join(ROOT, ...sourceRoute.split('/'));
    const source = await fs.readFile(sourcePath, 'utf8');
    await fs.writeFile(
      sourcePath,
      upsertStructuredData(
        upsertSocialImageDetails(source, 'pt'),
        sourceRoute,
        'pt',
      ),
      'utf8',
    );
  }
  console.log(`Generated ${PUBLIC_PAGES.length * Object.keys(LANGUAGES).length} localized pages.`);
}

await generate();
