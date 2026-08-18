import fs from 'node:fs/promises';
import path from 'node:path';
import * as csstree from 'css-tree';

const root = path.resolve('.');
const cssFile = path.join(root, 'src', 'styles', 'global.css');
const output = path.join(root, 'dist');
const dynamicClasses = new Set([
  'is-disabled',
  'is-open',
  'is-scrolled',
  'is-visible',
  'reveal-ready',
  'site-menu-open',
]);

async function collectHtml(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectHtml(absolute));
    else if (entry.name.endsWith('.html')) files.push(absolute);
  }
  return files;
}

const classes = new Set(dynamicClasses);
const ids = new Set();
for (const file of await collectHtml(output)) {
  const html = await fs.readFile(file, 'utf8');
  for (const match of html.matchAll(/\bclass="([^"]*)"/giu)) {
    match[1].split(/\s+/u).filter(Boolean).forEach((name) => classes.add(name));
  }
  for (const match of html.matchAll(/\bid="([^"]+)"/giu)) ids.add(match[1]);
}

const css = await fs.readFile(cssFile, 'utf8');
const ast = csstree.parse(css, { positions: true });
const ranges = [];
let totalRules = 0;

function selectorCouldMatch(selector) {
  const classNames = [...selector.matchAll(/\.(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)/gu)].map((match) => match[1]);
  const idNames = [...selector.matchAll(/#(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)/gu)].map((match) => match[1]);
  const customElements = [...selector.matchAll(/(?:^|[\s>+~,])([a-z][a-z0-9]*-[a-z0-9-]+)/gu)].map((match) => match[1]);
  return classNames.every((name) => classes.has(name))
    && idNames.every((name) => ids.has(name))
    && customElements.length === 0;
}

csstree.walk(ast, {
  visit: 'Rule',
  enter(node) {
    totalRules += 1;
    const selectors = csstree.generate(node.prelude).split(',');
    if (selectors.some(selectorCouldMatch)) return;
    ranges.push([node.loc.start.offset, node.loc.end.offset]);
  },
});

let pruned = css;
for (const [start, end] of ranges.sort((a, b) => b[0] - a[0])) {
  pruned = `${pruned.slice(0, start)}${pruned.slice(end)}`;
}

const removedBytes = Buffer.byteLength(css) - Buffer.byteLength(pruned);
console.log(`Unused selector rules: ${ranges.length}/${totalRules}; removable CSS: ${removedBytes} bytes.`);
if (process.argv.includes('--write')) {
  await fs.writeFile(cssFile, pruned, 'utf8');
  console.log('Pruned global.css using the complete generated HTML route set and runtime class safelist.');
}
