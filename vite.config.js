import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const projectRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(projectRoot, 'index.html'),
        about: resolve(projectRoot, 'about.html'),
        howItWorks: resolve(projectRoot, 'how-it-works.html'),
      },
    },
  },
});
