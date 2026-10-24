

## October 2026 social sharing metadata and llms.txt implementation

- [x] Repair the Competitor Analysis social-image publication path through the existing public-asset build flow while preserving the 1200 × 630 PNG and existing absolute metadata URL.
- [x] Create and include page-specific 1200 × 630 PNG social cards for the homepage, About, How It Works, AI Market Research, and Research Methodology; reuse the existing Competitor Analysis card unchanged.
- [x] Add exactly one `og:image` and one `twitter:image` set to each of the six public marketing pages, use `summary_large_image` consistently, preserve existing titles, descriptions, canonicals, Open Graph core metadata, and do not add an unverified `twitter:site` handle.
- [x] Add concise public `public/llms.txt` documentation with the six marketing-page links and the publicly described Quick Answer, Standard Report, and Deep Analysis options; do not create `llms-full.txt`, change sitemap behavior, change robots.txt, create Trust & Privacy content, or touch the application.
- [x] Validate the documented build, generated HTML, metadata uniqueness, image dimensions and MIME types, dist inclusion, llms.txt output, and Vite-served extensionless routes locally without deploying.


## October 2026 Trust & Privacy page

- [x] Add a dedicated `/trust-and-privacy` page in the existing static marketing-site architecture, using the current Recon Brief header, footer, typography, colors, spacing, responsive behavior, and native disclosure patterns.
- [x] Include the approved Trust & Privacy disclosures for accounts, stored data, uploaded files, data handlers, device-side data, protections, report honesty, and contact, with the implementation date shown as October 24, 2026.
- [ ] Keep unresolved publication details visibly marked: the Supabase project region and verified provider data-handling terms remain placeholders because the available static project does not contain the authenticated application configuration or authoritative provider-term review.
- [ ] Preserve the approved account-deletion wording as supplied, but clearly state that this static marketing project cannot verify the Settings → Delete your account flow, individual report deletion, file-processing behavior, usage counters, browser retention, or security implementation.
- [ ] Report the discovered discrepancy: the existing marketing pages include Google Analytics 4, which conflicts with the supplied “We use no analytics, advertising or tracking tools” disclosure; do not remove or add tracking as part of this page task.
- [x] Link the page through the existing header/footer Trust & Privacy links, add the route to `manus-routes.json`, and allow the existing sitemap build to include its canonical URL.
- [x] Run the existing build and route/content checks without deploying or changing the research engine, authentication, database schema, account-deletion behavior, or unrelated application functionality.
