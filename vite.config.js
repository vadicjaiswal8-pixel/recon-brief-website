import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve('index.html'),
        about: resolve('about/index.html'),
        howItWorks: resolve('how-it-works/index.html'),
      },
    },
  },
});
