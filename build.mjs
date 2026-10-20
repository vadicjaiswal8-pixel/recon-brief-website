import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const excludedNamePattern = /(?:^|[._-])(?:test|spec|preview|draft|redirect|404|auth|login|logout|account|dashboard|private)(?:[._-]|$)/i;
const rootEntries = await readdir('.', { withFileTypes: true });
const htmlPages = rootEntries
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name)
  .filter((name) => name.toLowerCase().endsWith('.html'))
  .filter((name) => name.toLowerCase() !== 'index.html.html')
  .filter((name) => !excludedNamePattern.test(name));

if (!htmlPages.includes('index.html')) {
  throw new Error('Static build requires the root index.html homepage.');
}

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await Promise.all([
  ...htmlPages.map((name) => cp(name, resolve('dist', name))),
  cp('styles.css', 'dist/styles.css'),
  cp('script.js', 'dist/script.js'),
  cp('public', 'dist', { recursive: true }),
]);

await import('./scripts/generate-sitemap.mjs');
console.log('Recon Brief static build written to dist/');
