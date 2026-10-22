

## October 2026 social sharing metadata and llms.txt implementation

- [x] Repair the Competitor Analysis social-image publication path through the existing public-asset build flow while preserving the 1200 × 630 PNG and existing absolute metadata URL.
- [x] Create and include page-specific 1200 × 630 PNG social cards for the homepage, About, How It Works, AI Market Research, and Research Methodology; reuse the existing Competitor Analysis card unchanged.
- [x] Add exactly one `og:image` and one `twitter:image` set to each of the six public marketing pages, use `summary_large_image` consistently, preserve existing titles, descriptions, canonicals, Open Graph core metadata, and do not add an unverified `twitter:site` handle.
- [x] Add concise public `public/llms.txt` documentation with the six marketing-page links and the publicly described Quick Answer, Standard Report, and Deep Analysis options; do not create `llms-full.txt`, change sitemap behavior, change robots.txt, create Trust & Privacy content, or touch the application.
- [x] Validate the documented build, generated HTML, metadata uniqueness, image dimensions and MIME types, dist inclusion, llms.txt output, and Vite-served extensionless routes locally without deploying.
