import fs from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve('dist');
const locales = ['', 'en/', 'es/', 'de/'];
const translated = [
  'index.html',
  'pages/biografia.html',
  'pages/concerto.html',
  'pages/albums.html',
  'pages/videos.html',
  'pages/albums/tenori-amici.html',
  'pages/albums/quattro-sony.html',
  'pages/albums/so-in-love.html',
];
const portugueseOnly = [
  'pages/apoio-pix.html',
  'pages/albums/so-in-love-pix.html',
];
const indexableTranslated = translated.filter((route) => route !== 'pages/albums/so-in-love.html');
const expected = [...locales.flatMap((locale) => translated.map((route) => `${locale}${route}`)), ...portugueseOnly, '404.html'];
const issues = [];
const canonicalOwners = new Map();

async function exists(file) {
  try { await fs.access(file); return true; } catch { return false; }
}

for (const route of expected) {
  const file = path.join(output, ...route.split('/'));
  if (!(await exists(file))) { issues.push(`Missing route: /${route}`); continue; }
  const html = await fs.readFile(file, 'utf8');
  const count = (pattern) => [...html.matchAll(pattern)].length;
  if (count(/<title>[^<]+<\/title>/giu) !== 1) issues.push(`${route}: expected one title`);
  if (count(/<h1\b/giu) !== 1) issues.push(`${route}: expected one h1`);
  if (count(/<html\s+lang="[^"]+"/giu) !== 1) issues.push(`${route}: missing html lang`);
  if (route !== '404.html') {
    if (count(/<meta\s+name="description"/giu) !== 1) issues.push(`${route}: expected one description`);
    if (count(/<link\s+rel="canonical"/giu) !== 1) issues.push(`${route}: expected one canonical`);
    if (count(/<meta\s+name="robots"/giu) !== 1) issues.push(`${route}: expected one robots directive`);
    for (const property of ['og:url', 'og:title', 'og:description', 'og:image', 'og:image:secure_url', 'og:image:type', 'og:image:width', 'og:image:height', 'og:image:alt']) {
      if (count(new RegExp(`<meta\\s+property="${property}"`, 'giu')) !== 1) issues.push(`${route}: expected one ${property}`);
    }
    for (const name of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt']) {
      if (count(new RegExp(`<meta\\s+name="${name}"`, 'giu')) !== 1) issues.push(`${route}: expected one ${name}`);
    }
    const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/iu)?.[1];
    const expectedPath = route.endsWith('index.html') ? route.slice(0, -'index.html'.length) : route;
    const expectedCanonical = `https://maxwilsonpereira.com.br/${expectedPath}`;
    if (canonical !== expectedCanonical) issues.push(`${route}: canonical mismatch (${canonical ?? 'missing'})`);
    if (canonical) {
      if (canonicalOwners.has(canonical)) issues.push(`${route}: duplicate canonical also used by ${canonicalOwners.get(canonical)}`);
      canonicalOwners.set(canonical, route);
    }
    const ogUrl = html.match(/<meta\s+property="og:url"\s+content="([^"]+)"/iu)?.[1];
    if (ogUrl !== canonical) issues.push(`${route}: og:url must match canonical`);
    const robots = html.match(/<meta\s+name="robots"\s+content="([^"]+)"/iu)?.[1] ?? '';
    const shouldNoindex = route.endsWith('pages/albums/so-in-love.html');
    if (shouldNoindex ? !robots.includes('noindex') : !robots.includes('index')) issues.push(`${route}: incorrect robots directive`);
    const isTranslated = translated.some((candidate) => route.endsWith(candidate));
    if (isTranslated && count(/<link\s+rel="alternate"\s+hreflang=/giu) !== 5) issues.push(`${route}: expected five hreflang links`);
    if (isTranslated && count(/<meta\s+property="og:locale:alternate"/giu) !== 3) issues.push(`${route}: expected three Open Graph locale alternates`);
    const jsonLd = [...html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/giu)];
    if (jsonLd.length !== 1) issues.push(`${route}: expected one JSON-LD graph`);
    for (const match of jsonLd) {
      try { JSON.parse(match[1]); } catch { issues.push(`${route}: invalid JSON-LD`); }
    }
  }
  if (/<img\b(?![^>]*\balt=)[^>]*>/giu.test(html)) issues.push(`${route}: image missing alt text`);

  const isAlbumSection = /(?:^|\/)pages\/albums(?:\/[^/]+)?\.html$/u.test(route);
  if (isAlbumSection) {
    const localePrefix = route.match(/^(en|es|de)\//u)?.[1];
    const expectedAlbumsHref = `${localePrefix ? `/${localePrefix}` : ''}/pages/albums.html`;
    const activeNav = html.match(/<a\s+class="site-nav-link is-active"\s+href="([^"]+)"\s+aria-current="([^"]+)"/iu);
    const expectedCurrentState = route.endsWith('pages/albums.html') ? 'page' : 'location';
    if (activeNav?.[1] !== expectedAlbumsHref || activeNav?.[2] !== expectedCurrentState) {
      issues.push(`${route}: Albums navigation item must be active with aria-current="${expectedCurrentState}"`);
    }
  }

  if (route === 'pages/albums/so-in-love.html') {
    const dialogTag = html.match(/<dialog\b[^>]*id="payment-thank-you-modal"[^>]*>/iu)?.[0] ?? '';
    const dialogIndex = html.indexOf('id="payment-thank-you-modal"');
    const upgradeIndex = html.indexOf('supportDialog.showModal()');
    const mainIndex = html.indexOf('<main');
    if (!/\bopen\b/iu.test(dialogTag)) issues.push(`${route}: support dialog must be present and initially open`);
    if (dialogIndex < 0 || upgradeIndex < 0 || mainIndex < 0 || dialogIndex > upgradeIndex || upgradeIndex > mainIndex) {
      issues.push(`${route}: support dialog and modal upgrade must render before main content`);
    }
  }

  if (/^(?:en|es|de)\/pages\/albums\/so-in-love\.html$/u.test(route) && html.includes('payment-thank-you-modal')) {
    issues.push(`${route}: Portuguese support dialog must not render on international download routes`);
  }

  for (const match of html.matchAll(/\s(?:href|src)="([^"]+)"/giu)) {
    const value = match[1].split(/[?#]/u, 1)[0];
    if (!value || /^(?:[a-z]+:|\/\/|#)/iu.test(value)) continue;
    const target = value.startsWith('/')
      ? path.join(output, ...value.slice(1).split('/'))
      : path.resolve(path.dirname(file), value);
    if (!(await exists(target))) issues.push(`${route}: broken local reference ${value}`);
  }
}

for (const required of ['CNAME', 'robots.txt', 'llms.txt', 'sitemap.xml']) {
  if (!(await exists(path.join(output, required)))) issues.push(`Missing public file: ${required}`);
}

const sitemap = await fs.readFile(path.join(output, 'sitemap.xml'), 'utf8');
for (const route of [...locales.flatMap((locale) => indexableTranslated.map((item) => `${locale}${item}`)), ...portugueseOnly]) {
  const publicRoute = route.replace(/index\.html$/u, '');
  if (!sitemap.includes(`https://maxwilsonpereira.com.br/${publicRoute}`)) issues.push(`Sitemap missing /${publicRoute}`);
}
if (sitemap.includes('/pages/albums/so-in-love.html')) issues.push('Protected download route must not be in sitemap');
if ([...sitemap.matchAll(/<url>/giu)].length !== 30) issues.push('Sitemap must contain exactly 30 indexable canonical URLs');

const robots = await fs.readFile(path.join(output, 'robots.txt'), 'utf8');
for (const required of ['User-agent: OAI-SearchBot', 'User-agent: ChatGPT-User', 'User-agent: *', 'Sitemap: https://maxwilsonpereira.com.br/sitemap.xml']) {
  if (!robots.includes(required)) issues.push(`robots.txt missing: ${required}`);
}

const llms = await fs.readFile(path.join(output, 'llms.txt'), 'utf8');
for (const required of ['https://maxwilsonpereira.com.br/', 'https://maxwilsonpereira.com.br/en/', 'https://maxwilsonpereira.com.br/es/', 'https://maxwilsonpereira.com.br/de/']) {
  if (!llms.includes(required)) issues.push(`llms.txt missing: ${required}`);
}

if (issues.length) {
  console.error(issues.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validated ${expected.length} HTML routes, metadata, JSON-LD, local references, and sitemap coverage.`);
}
