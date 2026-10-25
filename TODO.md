

## October 2026 Samples experience

- [x] Add a Samples link to the existing desktop and mobile website header and the existing footer, with both pointing to `/samples` and without changing unrelated navigation behavior.
- [x] Create `/samples` with five distinct categories: Company Research, Market Research, Competitive Intelligence, Academic Research, and Custom Research. Company Research must be Available and clickable; the other four must be clearly marked Coming Soon, must not open the Company Research report, and must not use fake report pages or misleading controls.
- [x] Create the public report route `/samples/company-research/the-whole-truth-foods` and make it directly accessible, shareable, and linked from the Company Research card.
- [x] Render the complete attached Whole Truth Foods report in its original order and content, including the opening summary, all required headings, paragraphs, lists, evidence references, interpretations, research gaps, Evidence Check findings, and all E1–E12 Evidence Registry entries.
- [x] Render Company Snapshot, Financial & Operating Performance, and Evidence Registry as semantic HTML tables with every original column, row, value, period, definition, source ID, and classification preserved. Tables must remain selectable text and use controlled horizontal scrolling on mobile.
- [x] Add report metadata identifying Company Research, The Whole Truth Foods, Company Research Report, Standard Analysis, and 12 sources without inventing an author, publication date, verification badge, or source URL.
- [x] Preserve the existing Recon Brief design system, public static architecture, authentication/application boundaries, unrelated routes, research engine, and existing functionality. Do not add dependencies or backend/database changes.
- [x] Validate navigation, direct routes, canonical metadata, sitemap inclusion, table integrity, absence of raw Markdown table syntax, complete section order, E1–E12 presence, responsive desktop/mobile rendering, and the existing build.

## October 2026 Samples report 404 fix

- [x] Trace the Samples link, route manifest, report source, Vite HTML input discovery, generated output, sitemap, and Vercel configuration; confirm the live deployment served Samples but omitted the report artifact and sitemap URL.
- [x] Move the complete report into a guaranteed root-level static build artifact and add exact Vercel rewrites for the clean report URL and trailing-slash variant; do not add a broad SPA rewrite.
- [x] Rebuild and verify the report artifact, 3 semantic tables, 13 report sections, Evidence Registry, canonical sitemap URL, and exact rewrite targets.
- [ ] Redeploy through the user’s Vercel account and verify the live URL; this remains open because this workspace has no Vercel authentication.

## October 2026 inline Samples fallback

- [x] Keep the existing separate report artifact and route configuration, but make both Company Research controls open the complete report inline on `/samples` so the visitor does not depend on the broken production route.
- [x] Reuse the canonical report HTML artifact through same-origin fetch; remove only its outer header, footer, noise layer, and script before injecting the report body, avoiding a second report copy.
- [x] Add collapse/reopen behavior, accessible button state, loading/error status, focus return, restrained expansion styling, and responsive containment.
- [x] Verify with Chromium at 1280px and 390px: URL remains `/samples`, open/collapse/reopen works, 3 tables and 13 sections remain present, no horizontal overflow occurs, and no console exceptions are emitted.
- [ ] Verify the change on the live production domain after deployment; this remains blocked by missing Vercel authentication in the current session.
