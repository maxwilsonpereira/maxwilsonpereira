import fs from 'node:fs/promises';
import path from 'node:path';

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else if (/\.(?:astro|ts)$/u.test(entry.name)) files.push(absolute);
  }
  return files;
}

const dictionaries = JSON.parse(await fs.readFile('src/i18n/translations.json', 'utf8'));
const required = new Set();
for (const file of await walk('src')) {
  const source = await fs.readFile(file, 'utf8');
  for (const pattern of [/(?:tr|translate)\('([^']+)'\)/gu, /t\(locale, '([^']+)'\)/gu]) {
    for (const match of source.matchAll(pattern)) required.add(match[1]);
  }
}

const seoSource = await fs.readFile('src/data/seo.ts', 'utf8');
for (const match of seoSource.matchAll(/(?:title|description|ogDescription): '([^']+)'/gu)) required.add(match[1]);

const missing = [];
for (const locale of ['en', 'es', 'de']) {
  for (const source of required) {
    if (!(source in dictionaries[locale])) missing.push(`${locale}: ${source}`);
  }
}

if (missing.length) {
  console.error(`Missing translations:\n${missing.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Validated ${required.size} shared strings across English, Spanish, and German.`);
}
