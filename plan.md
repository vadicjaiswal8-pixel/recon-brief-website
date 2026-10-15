# Recon Brief marketing website plan

## Product scope
A public, responsive marketing website for Recon Brief. The page sells the product as an evidence-backed AI research and intelligence workspace and routes visitors toward exploring or starting the workspace.

## Design direction
- **Design movement:** Editorial intelligence interface — a blend of premium research publication, observatory dashboard, and modern blue technical instrument.
- **Core principles:** Make evidence visible; lead with a decision-oriented story; use blue semantically for trust/progress; keep motion structured and restrained.
- **Color philosophy:** Deep ink/navy foundations create a quiet research-room atmosphere. Recon blue is the only signature accent and marks action, evidence links, confidence, and progress. Soft paper neutrals support editorial readability; mint is reserved for verified/ready states.
- **Layout paradigm:** A narrative vertical scroll with a left-anchored editorial rail, offset evidence panels, and a report preview that visually bridges marketing to the workspace.
- **Signature elements:** Blue evidence-network lines, report-page imagery with scan lines, and numbered research stages.
- **Interaction philosophy:** Hover and scroll interactions expose relationships: source-to-claim links, report sections, and workflow progress. CTAs feel like opening the research instrument, not generic SaaS signup buttons.
- **Animation:** Slow ambient network drift; fast, short interaction responses; structured stage reveals; one-time scroll reveals with reduced-motion support.
- **Typography:** Newsreader/DM Sans/DM Mono. Newsreader carries editorial trust, DM Sans keeps interface copy legible, DM Mono labels stages and evidence metadata.
- **Brand essence:** “Turn scattered sources into decision-ready intelligence.” Personality: rigorous, composed, curious.
- **Brand voice:** Headlines are direct and confident; CTAs are specific. Examples: “From question to decision.” and “Open the research instrument.”
- **Wordmark & logo:** A compact blue R mark paired with a serif Recon Brief wordmark, with a mono “research intelligence” descriptor.
- **Signature brand color:** Recon Blue `#64B5E8`.

## Implementation
- Plain static HTML/CSS/JS on Webdev port 3000 for fast, crawler-visible initial content and no backend secrets.
- `index.html`: all public marketing copy and semantic sections.
- `styles.css`: responsive layout, blue visual system, report/evidence imagery treatment, motion, reduced-motion rules.
- `script.js`: accessible mobile nav, scroll reveal, active workflow stage, FAQ/accordion, CTA interactions, and pointer parallax.
- `public/assets/`: research report and evidence-network images used intentionally in the hero and evidence sections.
- `public/manus-routes.json`: declares `/` as the public page route.
- `app.config.ts`: durable project logo metadata.
- `sitemap.xml` and `robots.txt`: public discovery documents.

## Public page sections
1. Sticky navigation and hero promise.
2. Product proof strip with grounded-source metrics.
3. Five-stage research workflow.
4. Evidence traceability split section.
5. Market/competitive intelligence use cases.
6. Report and presentation outputs showcase.
7. Trust/privacy section.
8. Conversion CTA and footer.

## Material constraints
No API keys, credentials, private app data, or backend details in client code. Use only public, local visual assets and static marketing copy.


## Iteration 2 — product demonstration
The page now prioritizes conversion through a deterministic sample-brief console after the proof strip. Visitors can enter or select a question, then watch Define → Research → Evidence → Analyze → Report progress with changing copy and grounded output status. A comparison section explicitly contrasts a generic AI answer with Recon Brief's visible research trail. The hero now names market, competitive, and complex-question use cases directly and routes to the demo instead of a vague workspace CTA.



## Content and trust refinement
The existing visual composition remains the source of truth. This refinement updates only product language and link behavior: the site now describes Recon Brief as an AI-assisted research and competitive-intelligence platform covering market, competitive, academic, study, company, and presentation workflows; removes unsupported numerical claims and verification language; labels visual reports and the interactive path as illustrative; uses the rounded blue/white-R mark; and sends primary application CTAs to https://app.reconbrief.in/.



## Focused app-animation correction
The original app source was located in `/home/ubuntu/recon-redesign/index.html` and `/home/ubuntu/recon-redesign/style.css`. Its `.rb-hero-proof` component and `proof-float`/`scan` behavior are reused in the marketing website's existing output-center visual as `.app-hero-animation`. The surrounding output heading, three cards, section proportions, and responsive layout remain intact. The Research Layer was inspected and requires no content or structural change: its current paragraph and four descriptive columns contain no unsupported metrics or verification claims.


## Vite/Vercel deployment hardening

The approved HTML/CSS/JavaScript design remains the source of truth. Deployment hardening adds only a minimal Vite 8 manifest/configuration and makes the existing stylesheet/runtime references Vite-safe. Research imagery, favicon, sitemap, robots policy, and route manifest are committed under `public/` so Vite copies them into `dist/`. No marketing copy, layout, animation, color, or responsive behavior is redesigned, and the separate `app.reconbrief.in` application remains untouched.


## Deployed visual asset repair

The evidence-network and report-preview images are imported from the source `assets/` directory through the Vite entry module. The HTML keeps relative fallback sources and the ambient CSS background uses a relative source path. This makes Vite emit hashed image assets in `dist/assets/` and removes the deployment dependency on manually copied `public/assets/`. Visual design, animation behavior, copy, and layout remain unchanged.
