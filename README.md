# Recon Brief marketing website

This is the finalized Recon Brief marketing website: a static, premium editorial landing page for an AI-assisted research and competitive intelligence platform.

The update preserves the original hero composition, typography, spacing, animation placement, responsive behavior, section structure, and blue visual identity while improving the product copy, application links, workflow coverage, logo mark, and trust language.

## Requirements

- Node.js 18 or newer (used for the static build script)
- Python 3.9+ or another static HTTP server for local preview
- No npm install is required. There is no package manifest because the site has no runtime dependencies.

## Run locally on Windows

Open **PowerShell** in this project folder.

```powershell
node build.mjs
py -m http.server 3000 --directory dist
```

If the Python launcher is not available, use:

```powershell
python -m http.server 3000 --directory dist
```

Then open `http://localhost:3000` in a browser. Stop the server with `Ctrl+C`.

To preview the source files directly instead of the generated build:

```powershell
py -m http.server 3000
```

## Build

```powershell
node build.mjs
```

The production-ready static output is written to `dist/` and includes the HTML, CSS, JavaScript, images, favicon, route manifest, sitemap, and robots file.

## Main files

- `index.html` — semantic marketing page, SEO metadata, navigation, product story, demo, workflows, trust, and CTAs.
- `styles.css` — original blue Recon Brief design system, layout, responsive rules, and motion.
- `script.js` — navigation, scroll reveal, workflow animation, interactive illustrative demo, and accessible interactions.
- `assets/` and `public/assets/` — research report and evidence-network imagery.
- `favicon.svg` and `public/favicon.svg` — blue rounded-square Recon Brief mark with a white R.
- `build.mjs` — dependency-free static build script.
- `manus-routes.json`, `sitemap.xml`, `robots.txt` — discovery and route metadata.
- `app.config.ts` — project logo metadata.

## Content and trust notes

The visible counts, unsupported performance percentages, and verification language were removed. The report imagery and interactive research path are explicitly presented as **illustrative/sample** material; the marketing demo does not run live research.

Primary application CTAs link to `https://app.reconbrief.in/` in a new tab. Internal section links remain available for navigation.

## Changes in this update

1. Preserved the original visual identity and animation system.
2. Updated the logo to the blue rounded-square/white-R Recon Brief mark.
3. Replaced unsupported metrics and fake verification labels with descriptive product language.
4. Clarified Market & Company Research, Competitive Intelligence, Academic Research & Studies, and Presentation Creation workflows.
5. Marked report imagery and the interactive demo as illustrative.
6. Linked the main workspace and workflow CTAs to the real Recon Brief app.
7. Added this Windows/local-run documentation.



## October 2026 targeted animation pass

This pass made two focused corrections without redesigning unrelated sections. The static visual in the **Research that is ready to leave the room** output section was replaced with a faithful marketing-site adaptation of the real application hero animation found in `/home/ubuntu/recon-redesign/index.html` and `/home/ubuntu/recon-redesign/style.css`.

The reused application component is `.rb-hero-proof`. Its report frame, floating motion, and scan-line behavior were carried into the marketing page as `.app-hero-animation`, using the existing `/assets/report-preview.jpg` asset. The adaptation is CSS-only and does not require app APIs, data, or runtime dependencies. It respects `prefers-reduced-motion` and is contained within the existing output visual area.

The Research Layer section was inspected and intentionally left structurally unchanged: it still contains the original paragraph, top rail, four columns, labels, and dividers. No unsupported statistics or new claims were added.

### Exact files changed in this pass

| File | Change |
| --- | --- |
| `index.html` | Replaced only the output-section center image markup with the app-derived animated report component. The heading and three output cards remain unchanged. |
| `styles.css` | Added the app-derived floating report and scan-line keyframes, responsive containment, and reduced-motion override. The existing stylesheet was preserved. |
| `README.md` | Documented the source component, adaptation boundary, and validation results. |
| `plan.md` | Recorded the targeted animation integration decision. |
| `TODO.md` | Recorded the completed acceptance criteria for this pass. |

### Validation for this pass

The production build, JavaScript syntax check, CSS diff check, asset loading checks, and structural assertions passed. Browser Preview captures were completed at 1440px desktop and 390px mobile widths. The styled page rendered correctly, the app-derived animation markup was present in the output area, the Research Layer retained four columns, and all three output cards remained present. No unavailable dependencies remain for this animation adaptation.
