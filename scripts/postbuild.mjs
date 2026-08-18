import fs from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve('dist');
const sitemapPath = path.join(output, 'sitemap.xml');

for (const locale of ['en', 'es', 'de']) {
  const flatHomepage = path.join(output, `${locale}.html`);
  const localizedHomepage = path.join(output, locale, 'index.html');
  await fs.mkdir(path.dirname(localizedHomepage), { recursive: true });
  await fs.rename(flatHomepage, localizedHomepage);
}

async function htmlFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(absolute));
    else if (entry.name.endsWith('.html')) files.push(absolute);
  }
  return files;
}

function escapeXml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
}

const pages = [];
for (const file of await htmlFiles(output)) {
  const html = await fs.readFile(file, 'utf8');
  if (/<meta\s+name="robots"\s+content="[^"]*noindex/iu.test(html)) continue;
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/iu)?.[1];
  if (!canonical) continue;
  const alternates = [...html.matchAll(/<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"/giu)]
    .map((match) => ({ language: match[1], href: match[2] }));
  pages.push({ canonical, alternates });
}

pages.sort((a, b) => a.canonical.localeCompare(b.canonical));
const urls = pages.map(({ canonical, alternates }) => {
  const links = alternates.map(({ language, href }) => `<xhtml:link rel="alternate" hreflang="${escapeXml(language)}" href="${escapeXml(href)}"/>`).join('');
  return `<url><loc>${escapeXml(canonical)}</loc>${links}</url>`;
}).join('');
const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;

await fs.writeFile(sitemapPath, xml, 'utf8');
await Promise.all(['sitemap-0.xml', 'sitemap-index.xml'].map(async (name) => {
  try { await fs.unlink(path.join(output, name)); } catch (error) { if (error.code !== 'ENOENT') throw error; }
}));
console.log(`Created sitemap.xml for ${pages.length} canonical routes.`);
