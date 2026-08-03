import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();

async function collectHtmlFiles(directory = ROOT) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectHtmlFiles(fullPath));
    if (entry.isFile() && entry.name.endsWith('.html')) files.push(fullPath);
  }
  return files;
}

function isExternal(value) {
  return /^(?:[a-z]+:|\/\/|#)/i.test(value);
}

const files = await collectHtmlFiles();
const broken = [];
const invalidStructuredData = [];
const documentIssues = [];

for (const file of files) {
  const html = await fs.readFile(file, 'utf8');
  const relativeFile = path.relative(ROOT, file);
  const count = (pattern) => [...html.matchAll(pattern)].length;
  const requiredHeadElements = [
    ['document language', /<html\s+lang="[^"]+"/gi],
    ['title', /<title>[\s\S]*?<\/title>/gi],
    ['description', /<meta\s+name="description"\s+content="[^"]*"\s*\/>/gi],
    ['canonical URL', /<link\s+rel="canonical"[\s\S]*?\/>/gi],
  ];
  for (const [label, pattern] of requiredHeadElements) {
    const matches = count(pattern);
    if (matches !== 1) {
      documentIssues.push(`${relativeFile} -> expected 1 ${label}, found ${matches}`);
    }
  }
  if (html.includes('<max-seo-meta')) {
    documentIssues.push(`${relativeFile} -> obsolete max-seo-meta element`);
  }

  for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\salt="[^"]*"/i.test(image[0])) {
      documentIssues.push(`${relativeFile} -> image without alt text`);
    }
    if (!/\swidth="\d+"/i.test(image[0]) || !/\sheight="\d+"/i.test(image[0])) {
      documentIssues.push(`${relativeFile} -> image without intrinsic dimensions`);
    }
  }

  for (const iframe of html.matchAll(/<iframe\b[^>]*>/gi)) {
    if (!/\stitle="[^"]+"/i.test(iframe[0])) {
      documentIssues.push(`${relativeFile} -> iframe without title`);
    }
    if (!/\sloading="lazy"/i.test(iframe[0])) {
      documentIssues.push(`${relativeFile} -> iframe not lazy-loaded`);
    }
  }
  const structuredDataBlocks = html.matchAll(
    /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi,
  );
  for (const block of structuredDataBlocks) {
    try {
      JSON.parse(block[1]);
    } catch (error) {
      invalidStructuredData.push(
        `${path.relative(ROOT, file)} -> ${error.message}`,
      );
    }
  }
  const references = html.matchAll(/\s(?:href|src|poster)="([^"]+)"/gi);
  for (const match of references) {
    const value = match[1];
    if (!value || isExternal(value)) continue;
    const localPath = value.split(/[?#]/, 1)[0];
    if (!localPath) continue;
    const target = localPath.startsWith('/')
      ? path.join(ROOT, localPath.slice(1))
      : path.resolve(path.dirname(file), localPath);
    try {
      await fs.access(target);
    } catch {
      broken.push(`${path.relative(ROOT, file)} -> ${value}`);
    }
  }

  const sourceSets = html.matchAll(/\s(?:srcset|imagesrcset)="([^"]+)"/gi);
  for (const match of sourceSets) {
    for (const candidate of match[1].split(',')) {
      const value = candidate.trim().split(/\s+/, 1)[0];
      if (!value || isExternal(value)) continue;
      const target = value.startsWith('/')
        ? path.join(ROOT, value.slice(1))
        : path.resolve(path.dirname(file), value);
      try {
        await fs.access(target);
      } catch {
        broken.push(`${path.relative(ROOT, file)} -> ${value}`);
      }
    }
  }
}

if (broken.length) {
  console.error(`Found ${broken.length} broken local references:`);
  console.error(broken.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validated ${files.length} HTML files: all local href/src/poster targets exist.`);
}

if (invalidStructuredData.length) {
  console.error(`Found ${invalidStructuredData.length} invalid JSON-LD blocks:`);
  console.error(invalidStructuredData.join('\n'));
  process.exitCode = 1;
} else {
  console.log('All JSON-LD blocks parse successfully.');
}

if (documentIssues.length) {
  console.error(`Found ${documentIssues.length} document issues:`);
  console.error(documentIssues.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Document language, metadata, media dimensions, and embeds are valid.');
}

const sitemap = await fs.readFile(path.join(ROOT, 'sitemap.xml'), 'utf8');
for (const protectedRoute of [
  '/pages/albums/so-in-love.html',
  '/pages/albums/quattro-sony.html',
]) {
  if (sitemap.includes(protectedRoute)) {
    console.error(`Sitemap includes protected or noindex route: ${protectedRoute}`);
    process.exitCode = 1;
  }
}
