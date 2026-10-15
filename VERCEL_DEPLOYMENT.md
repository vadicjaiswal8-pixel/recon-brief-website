# Recon Brief Vercel Deployment

This package preserves the finalized Recon Brief marketing design and adds the missing Vite deployment structure. The app at `https://app.reconbrief.in/` is not part of this package and is not changed.

## Repository placement

1. In the existing `recon-brief-website` repository, switch to the `final-website-deploy` branch.
2. Replace the branch contents with the files from this package, including `public/assets/`.
3. Keep the repository root as Vercel's Root Directory (`./`).
4. Commit and push the complete branch.

## Vercel settings

Use these settings:

- Framework Preset: **Vite**
- Build Command: `vite build` (or `npm run build`)
- Output Directory: `dist`
- Root Directory: `./`
- Node.js: `24.x`

Vercel installs `vite` from `package.json`, runs the Vite build, and publishes the generated `dist/` directory.

## Important asset requirement

Do not upload only the root HTML/CSS/JS files. The `public/` directory must be committed, especially:

- `public/assets/evidence-network.png`
- `public/assets/report-preview.jpg`
- `public/favicon.svg`
- `public/manus-routes.json`
- `public/robots.txt`
- `public/sitemap.xml`

Vite copies these files into `dist/` during `vite build`. The HTML uses Vite-safe relative references for `styles.css` and `script.js`; the CSS uses `/assets/...` paths backed by `public/assets/`.

## Local verification

```bash
npm install
npm run build
npm run preview
```

Open the printed preview URL and check the hero, animated report card, evidence map, interactive workflow/demo, output section, and all CTA/navigation links.
