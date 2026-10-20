import { cp, mkdir, rm } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await Promise.all([
  cp('index.html', 'dist/index.html'),
  cp('about.html', 'dist/about.html'),
  cp('how-it-works.html', 'dist/how-it-works.html'),
  cp('styles.css', 'dist/styles.css'),
  cp('script.js', 'dist/script.js'),
  cp('public', 'dist', { recursive: true }),
]);
console.log('Recon Brief static build written to dist/');
