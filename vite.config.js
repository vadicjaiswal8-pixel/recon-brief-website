import { readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const projectRoot = dirname(fileURLToPath(import.meta.url));
const excludedNamePattern = /(?:^|[._-])(?:test|spec|preview|draft|redirect|404|auth|login|logout|account|dashboard|private)(?:[._-]|$)/i;
const htmlPages = readdirSync(projectRoot, { withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name)
  .filter((name) => name.toLowerCase().endsWith('.html'))
  .filter((name) => name.toLowerCase() !== 'index.html.html')
  .filter((name) => !excludedNamePattern.test(name));

if (!htmlPages.includes('index.html')) {
  throw new Error('Vite HTML entry discovery requires the root index.html homepage.');
}

const htmlInputs = Object.fromEntries(
  htmlPages.map((name) => [name.slice(0, -'.html'.length), resolve(projectRoot, name)]),
);

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: htmlInputs,
    },
  },
});
