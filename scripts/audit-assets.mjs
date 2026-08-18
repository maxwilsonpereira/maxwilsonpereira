import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('.');
const publicAssets = path.join(root, 'public', 'assets');
const output = path.join(root, 'dist');

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else files.push(absolute);
  }
  return files;
}

const searchableExtensions = new Set(['.css', '.html', '.js', '.json', '.txt', '.xml']);
const searchableFiles = (await walk(output)).filter((file) => {
  const relative = path.relative(output, file).replaceAll('\\', '/');
  return !relative.startsWith('assets/') && searchableExtensions.has(path.extname(file));
});
const outputText = (await Promise.all(searchableFiles.map((file) => fs.readFile(file, 'utf8')))).join('\n');
const unused = [];

for (const file of await walk(publicAssets)) {
  const relative = path.relative(publicAssets, file).replaceAll('\\', '/');
  const publicPath = `/assets/${relative}`;
  if (!outputText.includes(publicPath) && !outputText.includes(encodeURI(publicPath))) unused.push(relative);
}

if (unused.length) console.log(unused.join('\n'));
console.log(`Unused assets: ${unused.length}`);

if (process.argv.includes('--delete')) {
  for (const relative of unused) {
    const target = path.resolve(publicAssets, ...relative.split('/'));
    if (!target.startsWith(`${publicAssets}${path.sep}`)) throw new Error(`Unsafe asset path: ${target}`);
    await fs.unlink(target);
  }
  const directories = (await walkDirectories(publicAssets)).sort((a, b) => b.length - a.length);
  for (const directory of directories) {
    try { await fs.rmdir(directory); } catch (error) { if (error.code !== 'ENOTEMPTY') throw error; }
  }
  console.log(`Deleted ${unused.length} assets that are absent from the complete production output.`);
}

async function walkDirectories(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const directories = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const absolute = path.join(directory, entry.name);
    directories.push(absolute, ...await walkDirectories(absolute));
  }
  return directories;
}
