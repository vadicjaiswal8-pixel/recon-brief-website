# Recon Brief Vercel Deployment

This repository contains the Recon Brief marketing website in its existing Vite and static HTML/CSS/JavaScript format. The separate application at `https://app.reconbrief.in/` is not part of this package and is not changed.

## Repository placement

1. Commit the complete project root, including `package.json`, `package-lock.json`, `vite.config.js`, `vercel.json`, the HTML pages, shared CSS/JavaScript, and `public/` files.
2. Keep the repository root as Vercel's Root Directory (`./`).
3. Push the intended branch and confirm Vercel is building that branch and commit.

## Vercel settings

- Framework Preset: **Vite**
- Build Command: `npm run build` (required so the generated sitemap step runs)
- Output Directory: `dist`
- Root Directory: `./`
- Node.js: **24.x** (as recommended by the existing project setup)

`vite.config.js` automatically discovers eligible root-level HTML pages as build inputs. Vercel publishes the Vite output from `dist/`. `vercel.json` enables clean URLs so `.html` pages are accessible without their extension, including direct visits and refreshes. The configured build command runs `node build.mjs --sitemap-only` after Vite; the generator is in the project-root build file rather than a separate nested module. It scans the built HTML and includes only pages with a matching, self-canonical, indexable URL on the preferred host. It synchronizes the existing root-level `sitemap.xml` and `robots.txt` with their `public/` copies and served `dist/` versions, keeping the existing `/sitemap.xml` URL.

The live non-www host currently responds with a permanent redirect to `https://www.reconbrief.in/`. This project therefore uses `www` in canonical URLs, structured site URLs, and the absolute sitemap directive in robots.txt. No redirect behavior is configured or changed by this project update. For a future public SEO landing page, add a root-level `<slug>.html` file with a self-canonical URL such as `https://www.reconbrief.in/<slug>`; it is discovered and added to the sitemap during the normal build. Pages without a canonical URL, marked `noindex`, using another host, or matching private/test/redirect exclusions are omitted.

The Trust & Privacy navigation link intentionally points to `/trust-and-privacy`, but that page is deferred and is not included in the build or sitemap.

## Files to commit

Do not upload only selected HTML/CSS/JavaScript files. Commit the complete source tree, including all root configuration and the existing `public/` directory so Vite can copy its public files to `dist/`.

## Local production verification

```bash
npm ci
npm run build
npm run preview
```

The build should produce the configured HTML pages, static assets, and a generated `dist/sitemap.xml`. Check that the sitemap URLs parse and that each points to an accessible page. On Vercel, verify the extensionless routes and `/sitemap.xml` after deployment; this guide does not claim that a deployment has been performed.
