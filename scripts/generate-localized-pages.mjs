import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = process.cwd();
const SITE_URL = 'https://maxwilsonpereira.com.br';
const LANGUAGES = {
  en: { htmlLang: 'en-US', ogLocale: 'en_US' },
  de: { htmlLang: 'de-DE', ogLocale: 'de_DE' },
  es: { htmlLang: 'es-ES', ogLocale: 'es_ES' },
};
const PUBLIC_PAGES = [
  'index.html',
  'pages/biografia.html',
  'pages/concerto.html',
  'pages/albums.html',
  'pages/videos.html',
  'pages/albums/tenori-amici.html',
  'pages/albums/quattro-sony.html',
];
const PORTUGUESE_ONLY_PAGES = [
  'pages/apoio-pix.html',
  'pages/albums/so-in-love-pix.html',
];
const SITEMAP_EXCLUDED_PAGES = new Set([
  'pages/albums/quattro-sony.html',
]);
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
  es: {
    htmlLang: 'es-ES',
    home: 'Inicio',
    albums: 'Álbumes',
    socialImageAlt: 'Max Wilson Pereira actuando en directo con Hebe Camargo',
    personDescription: 'Tenor brasileño residente en Viena, con una trayectoria en ópera, crossover clásico, televisión, conciertos y música grabada.',
  },
};

// Videos is an editorial page: its performance notes need route-level translations
// rather than falling back to the Portuguese source copy.
const VIDEO_DESCRIPTIONS = {
  en: {
    'video-hebe': 'In 2010, at Credicard Hall in São Paulo, I had the honour of sharing this Italian classic with the unforgettable Hebe Camargo. It recalls a radiant evening — and an artist whose joy, generosity and love of music remain alive.',
    'video-russia': 'A record of my Russia-1 interview and of the emotion of representing Brazil as a guest tenor at the Taneyevsky Festival. With Maestro Artiom Markin and the Vladimir Governor Symphony Orchestra, I shared opera, operetta and musical theatre with an open-hearted audience.',
    'video-phantom': 'One of musical theatre’s great declarations of love, recorded at Blue Studio with Marina Elali and the late producer Guto Graça Mello. A duet that lets the melody speak first: delicate, intense and fully present.',
    'video-evidencias': 'A Brazilian classic, reinvented for three voices and three countries. With soprano Nataliya Stepanska and tenor Fernando Hernández, I celebrate the universal power of a song everyone recognises before the first line.',
    'video-flamengo': 'Passion, voice and supporters meet in this recording of Clube de Regatas do Flamengo’s anthem with the beloved Sandra de Sá. A vibrant Brazilian celebration made to sing along to.',
    'video-enchanted': 'Live in São Paulo, I sing Rodgers and Hammerstein’s unforgettable song from South Pacific. Some melodies seem to suspend time; this is one of them.',
    'video-she-rio': 'At the Fairmont Rio in Copacabana, Charles Aznavour’s elegance meets Tibí’s sensitive piano and Rio’s landscape. A romantic classic where every note seems to breathe the sea air.',
    'video-conte': 'An evening among friends in Vienna’s Boteco Larica grew into a grand duet. With Italian soprano Francesca Caforio, I sing this farewell which, paradoxically, always brings us closer.',
    'video-mae': 'Before leaving Brazil to return to Vienna, I sang with my mother, Sylvia Massari, beside the sea in São Paulo. It is a song of permanence and affection — a farewell becoming an embrace.',
    'video-sorrento': 'Singing this Neapolitan song in Sorrento lets the city itself enter the interpretation: a small film of travel, longing and Italy, carried by a melody that crosses generations.',
    'video-notting': 'On the streets of Notting Hill, where cinema immortalised this song, I revisit a piece I love deeply. London becomes both setting and memory for this affectionate cover of a contemporary classic.',
    'video-awake': 'A tribute to an artist I admire and to a beautifully delicate pop song. In Awake, I look for the melody’s intimacy and the quiet hope it leaves behind.',
  },
  de: {
    'video-hebe': '2010 in der Credicard Hall in São Paulo durfte ich diesen italienischen Klassiker mit der unvergesslichen Hebe Camargo teilen. Die Aufnahme erinnert an einen strahlenden Abend und an eine Künstlerin, deren Freude, Großzügigkeit und Liebe zur Musik weiterleben.',
    'video-russia': 'Ein Dokument meines Interviews für Russia-1 und der großen Ehre, Brasilien als Gasttenor beim Taneyevsky Festival zu vertreten. Mit Maestro Artiom Markin und dem Vladimir Governor Symphony Orchestra sang ich Oper, Operette und Musical für ein herzliches Publikum.',
    'video-phantom': 'Eine der großen Liebeserklärungen des Musiktheaters, aufgenommen im Blue Studio mit Marina Elali und dem verstorbenen Produzenten Guto Graça Mello: ein Duett, das die Melodie zuerst sprechen lässt — zart, intensiv und ganz im Moment.',
    'video-evidencias': 'Ein brasilianischer Klassiker, neu gestaltet für drei Stimmen und drei Länder. Mit Sopranistin Nataliya Stepanska und Tenor Fernando Hernández feiere ich die universelle Kraft eines Liedes, das alle schon vor der ersten Zeile erkennen.',
    'video-flamengo': 'Leidenschaft, Stimme und Fankultur treffen in dieser Aufnahme der Hymne des Clube de Regatas do Flamengo mit der beliebten Sandra de Sá zusammen — eine lebendige brasilianische Feier zum Mitsingen.',
    'video-enchanted': 'Live in São Paulo singe ich Rodgers und Hammersteins unvergessliches Lied aus South Pacific. Manche Melodien scheinen die Zeit anzuhalten; diese gehört dazu.',
    'video-she-rio': 'Im Fairmont Rio in Copacabana begegnen sich die Eleganz von Charles Aznavour, Tibís sensibles Klavier und die Landschaft Rios. Ein romantischer Klassiker, in dem jede Note Meeresluft zu atmen scheint.',
    'video-conte': 'Ein Abend unter Freunden im Wiener Boteco Larica wurde zu einem großen Duett. Mit der italienischen Sopranistin Francesca Caforio singe ich diesen Abschied, der uns paradoxerweise immer näherbringt.',
    'video-mae': 'Bevor ich Brasilien in Richtung Wien verließ, sang ich mit meiner Mutter Sylvia Massari am Meer. Es ist ein Lied über Beständigkeit und Zuneigung — ein Abschied, der zur Umarmung wird.',
    'video-sorrento': 'Dieses neapolitanische Lied in Sorrent zu singen heißt, die Stadt selbst in die Interpretation einzuladen: ein kleiner Film von Reise, Sehnsucht und Italien.',
    'video-notting': 'In den Straßen von Notting Hill, wo das Kino dieses Lied verewigte, begegne ich einem Stück wieder, das ich sehr liebe. London wird zur Kulisse und Erinnerung dieses Covers eines modernen Klassikers.',
    'video-awake': 'Eine Hommage an einen Künstler, den ich bewundere, und an ein besonders zartes Popsong. In Awake suche ich die Intimität der Melodie und die stille Hoffnung, die sie hinterlässt.',
  },
  es: {
    'video-hebe': 'En 2010, en el Credicard Hall de São Paulo, tuve el honor de compartir este clásico italiano con la inolvidable Hebe Camargo. Es el recuerdo de una noche luminosa y de una artista cuya alegría, generosidad y pasión por la música siguen vivas.',
    'video-russia': 'Un registro de mi entrevista para Russia-1 y de la emoción de representar a Brasil como tenor invitado en el Festival Taneyevsky. Junto al maestro Artiom Markin y la Orquesta Sinfónica del Gobernador de Vladimir, compartí ópera, opereta y teatro musical con un público de corazón abierto.',
    'video-phantom': 'Una de las grandes declaraciones de amor del teatro musical, grabada en Blue Studio con Marina Elali y el recordado productor Guto Graça Mello. Un dúo que deja hablar primero a la melodía: delicada, intensa y plenamente presente.',
    'video-evidencias': 'Un clásico brasileño reinventado para tres voces y tres países. Junto a la soprano Nataliya Stepanska y al tenor Fernando Hernández, celebro la fuerza universal de una canción que todos reconocen antes del primer verso.',
    'video-flamengo': 'Pasión, voz y afición se encuentran en esta grabación del himno del Clube de Regatas do Flamengo con la querida Sandra de Sá. Una celebración brasileña vibrante, hecha para cantar juntos.',
    'video-enchanted': 'En vivo en São Paulo, canto la inolvidable canción de Rodgers y Hammerstein para South Pacific. Hay melodías que parecen detener el tiempo; esta es una de ellas.',
    'video-she-rio': 'En el Fairmont Rio de Copacabana, la elegancia de Charles Aznavour se encuentra con el sensible piano de Tibí y el paisaje carioca. Un clásico romántico en el que cada nota parece respirar el mar.',
    'video-conte': 'Una noche entre amigos en el Boteco Larica de Viena se convirtió en un gran dúo. Junto a la soprano italiana Francesca Caforio, canto esta despedida que, paradójicamente, siempre nos acerca.',
    'video-mae': 'Antes de dejar Brasil para volver a Viena, canté con mi madre, Sylvia Massari, frente al mar. Es una canción de permanencia y afecto: una despedida que se transforma en abrazo.',
    'video-sorrento': 'Cantar esta canción napolitana en Sorrento permite que la propia ciudad entre en la interpretación: una pequeña película de viaje, nostalgia e Italia.',
    'video-notting': 'En las calles de Notting Hill, donde el cine inmortalizó esta canción, vuelvo a una música que amo profundamente. Londres se vuelve escenario y memoria para este cover de un clásico contemporáneo.',
    'video-awake': 'Un homenaje a un artista que admiro y a una canción pop de gran delicadeza. En Awake busco la intimidad de la melodía y la esperanza serena que deja al terminar.',
  },
};

function localizeVideoDescriptions(html, language) {
  const descriptions = VIDEO_DESCRIPTIONS[language];
  if (!descriptions) return html;
  const sectionCopy = {
    en: [
      'From Rio de Janeiro to Vienna, through stages around the world and live encounters, these videos hold songs, friendships, and chapters in a journey still being written.',
      'This selection is only part of the journey. On YouTube, there are more performances, behind-the-scenes moments, and encounters to enjoy whenever you wish.',
    ],
    de: [
      'Von Rio de Janeiro bis Wien, über Bühnen in aller Welt und bei Live-Begegnungen: Diese Videos bewahren Lieder, Freundschaften und Kapitel eines Weges, der weitergeschrieben wird.',
      'Diese Auswahl ist nur ein Teil der Reise. Auf YouTube warten weitere Auftritte, Einblicke hinter die Kulissen und Begegnungen zum Entdecken.',
    ],
    es: [
      'De Río de Janeiro a Viena, pasando por escenarios del mundo y encuentros en vivo, estos videos guardan canciones, amistades y capítulos de una trayectoria que sigue escribiéndose.',
      'Esta selección es solo una parte del viaje. En YouTube hay más actuaciones, momentos detrás de escena y encuentros para disfrutar cuando quieras.',
    ],
  }[language];
  let output = Object.entries(descriptions).reduce((value, [id, copy]) => value.replace(
    new RegExp(`(<h2 id="${id}">[\\s\\S]*?</h2><p>)[\\s\\S]*?(</p>)`),
    `$1${copy}$2`,
  ), html);
  output = output.replace(/(<h2 id="videos-intro-title">[\s\S]*?<\/h2>\s*<p>)[\s\S]*?(<\/p>)/, `$1${sectionCopy[0]}$2`);
  return output.replace(/(<h2 id="youtube-title">[\s\S]*?<\/h2>\s*<p>)[\s\S]*?(<\/p>)/, `$1${sectionCopy[1]}$2`);
}

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
    `    <link rel="alternate" hreflang="es-ES" href="${routeUrl(route, 'es')}" />`,
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
  const end = componentSource.indexOf('\nfunction getCurrentLanguage', start);
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

  const translated = html
    .split(/(<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<!--[\s\S]*?-->|<[^>]+>)/gi)
    .map((token) => {
      if (!token.startsWith('<')) return translateText(token);
      if (/^<(?:script|style|!--)/i.test(token)) return token;
      return translateAttributes(token);
    })
    .join('');

  // A translated text fragment may replace leading punctuation with a word
  // (for example, ", de" becomes "by"). Preserve a word boundary after
  // inline elements so adjacent fragments never render as "titleby Author".
  return translated.replace(
    /(<\/(?:strong|em|a|span)>)(?=[\p{L}\p{N}])/gu,
    '$1 ',
  );
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

async function writeFileIfChanged(filePath, contents) {
  const existing = await fs.readFile(filePath, 'utf8');
  if (
    existing.replaceAll('\r\n', '\n') === contents.replaceAll('\r\n', '\n')
  ) return;
  await fs.writeFile(filePath, contents, 'utf8');
}

async function generateSitemap() {
  const lastModified = new Date().toISOString().slice(0, 10);
  const alternates = (route) => [
    ['pt-BR', routeUrl(route)],
    ['en-US', routeUrl(route, 'en')],
    ['de-DE', routeUrl(route, 'de')],
    ['es-ES', routeUrl(route, 'es')],
    ['x-default', routeUrl(route)],
  ].map(([language, url]) => `    <xhtml:link rel="alternate" hreflang="${language}" href="${url}" />`);
  const localizedUrls = PUBLIC_PAGES
    .filter((route) => !SITEMAP_EXCLUDED_PAGES.has(route))
    .flatMap((route) =>
    ['pt', ...Object.keys(LANGUAGES)].map((language) => {
      const url = routeUrl(route, language);
      return ['  <url>', `    <loc>${url}</loc>`, `    <lastmod>${lastModified}</lastmod>`, ...alternates(route), '  </url>'].join('\n');
    }),
  );
  const portugueseOnlyUrls = PORTUGUESE_ONLY_PAGES.map((route) => [
    '  <url>',
    `    <loc>${routeUrl(route)}</loc>`,
    `    <lastmod>${lastModified}</lastmod>`,
    '  </url>',
  ].join('\n'));
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '  xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...localizedUrls,
    ...portugueseOnlyUrls,
    '</urlset>',
    '',
  ].join('\n');
  await fs.writeFile(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf8');
}

async function generate() {
  const translations = await loadTranslations();
  for (const sourceRoute of PUBLIC_PAGES) {
    const sourcePath = path.join(ROOT, ...sourceRoute.split('/'));
    let source = await fs.readFile(sourcePath, 'utf8');
    source = upsertAlternateBlock(source, sourceRoute);
    source = upsertSocialImageDetails(source, 'pt');
    source = upsertStructuredData(source, sourceRoute, 'pt');
    try {
      await writeFileIfChanged(sourcePath, source);
    } catch (error) {
      if (error?.code !== 'EPERM') throw error;
      console.warn(`Could not refresh localized metadata in ${sourceRoute}; continuing with generated locales.`);
    }

    for (const language of Object.keys(LANGUAGES)) {
      const targetRoute = path.posix.join(language, sourceRoute);
      const targetPath = path.join(ROOT, ...targetRoute.split('/'));
      let localized = replaceMetadata(source, sourceRoute, language, translations);
      localized = translateStaticMarkup(localized, language, translations);
      if (sourceRoute === 'pages/videos.html') {
        localized = localizeVideoDescriptions(localized, language);
      }
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
    try {
      await writeFileIfChanged(
        sourcePath,
        upsertStructuredData(
          upsertSocialImageDetails(source, 'pt'),
          sourceRoute,
          'pt',
        ),
      );
    } catch (error) {
      if (error?.code !== 'EPERM') throw error;
      console.warn(`Could not refresh metadata in ${sourceRoute}.`);
    }
  }
  await generateSitemap();
  console.log(`Generated ${PUBLIC_PAGES.length * Object.keys(LANGUAGES).length} localized pages.`);
}

await generate();
