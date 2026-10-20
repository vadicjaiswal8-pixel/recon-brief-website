# Recon Brief Vercel Deployment

This repository contains the Recon Brief marketing website in its existing Vite and static HTML/CSS/JavaScript format. The separate application at `https://app.reconbrief.in/` is not part of this package and is not changed.

## Repository placement

1. Commit the complete project root, including `package.json`, `package-lock.json`, `vite.config.js`, `vercel.json`, the HTML pages, shared CSS/JavaScript, and `public/` files.
2. Keep the repository root as Vercel's Root Directory (`./`).
3. Push the intended branch and confirm Vercel is building that branch and commit.

## Vercel settings

- Framework Preset: **Vite**
- Build Command: `npm run build` (or the configured `vite build`)
- Output Directory: `dist`
- Root Directory: `./`
- Node.js: **24.x** (as recommended by the existing project setup)

`vite.config.js` lists the homepage and both page HTML entries as build inputs. Vercel publishes the Vite output from `dist/`. `vercel.json` enables clean URLs so `about.html` and `how-it-works.html` are accessible at `/about` and `/how-it-works`, including direct visits and refreshes.

The Trust & Privacy navigation link intentionally points to `/trust-and-privacy`, but that page is deferred and is not included in the build or sitemap.

## Files to commit

Do not upload only selected HTML/CSS/JavaScript files. Commit the complete source tree, including all root configuration and the existing `public/` directory so Vite can copy its public files to `dist/`.

## Local production verification

```bash
npm ci
npm run build
npm run preview
```

The build should produce `dist/index.html`, `dist/about.html`, and `dist/how-it-works.html`, along with the existing static assets. Check the homepage, both new pages, navigation links, the About FAQ disclosures, and the page metadata. On Vercel, verify the extensionless `/about` and `/how-it-works` routes after deployment; this guide does not claim that a deployment has been performed.
