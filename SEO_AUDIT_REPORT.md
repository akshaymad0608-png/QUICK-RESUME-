# SEO audit report — QuickResume

Audited 2026-10-04. Origin: https://quickresume.business

## Scope and method

- **Stack:** Vite + React SPA with `prerender.mjs` (16 prerendered routes plus static pages), Firebase auth, Node server bundle; deployed on Vercel; IndexNow workflow on sitemap changes.
- **Static validation:** `scripts/seo-validate.mjs` over the production build (what a crawler sees without running JavaScript).
- **Lab performance:** Lighthouse 12 (mobile preset, simulated throttling), Chromium headless, against a plain local static server serving the build. A plain `python3 -m http.server` does **not** gzip/brotli, so the "enable text compression" findings and the absolute LCP are pessimistic compared with production hosting. Treat the numbers as a baseline to compare against after changes, not as field data.
- **Not verified here:** indexing status, rankings and Core Web Vitals field data (INP is only measurable in the field). Those come from Search Console.
- Search Console data for this property is not available to the tooling in this environment; use the CSV workflow.

## Results at a glance

| Pages built | Indexable | `noindex` | Sitemap URLs | Errors | Warnings | Notes |
|---|---|---|---|---|---|---|
| 28 | 28 | 0 | 28 | 0 | 10 | 0 |

### Validator findings (after this PR's fixes)

| Severity | Check | Count | Example |
|---|---|---|---|
| warn | `thin-static-content` | 10 | `/about — 79 visible words in static HTML` |

### Lighthouse (mobile, local baseline)

| Category | Score |
|---|---|
| Performance | 61 |
| Accessibility | 98 |
| Best practices | 96 |
| SEO | 100 |

Lab metrics (home page): LCP **6.6 s**, FCP 5.1 s, TBT 160 ms, CLS 0.

## Issues found and fixed so far

- Earlier work (PRs #12–#13): `/about` and `/contact` added to the sitemap, About description shortened, IndexNow workflow added, fabricated testimonials/"100k+ resumes" and "99% ATS parse rate" claims removed, "ATS-tested" reworded to "ATS-friendly".

## Issues still open

- 10 of 28 pages (About, Build, Contact and most generator pages) carry under 100 words of static HTML. Each generator page needs visible, unique explanatory content (what it does, how to use it, an example output) that exists in the DOM for users, not only in the prerender.
- 312 KiB unused JavaScript and 900 ms of render-blocking resources reported on the home page.

## What this audit deliberately does not claim

- No ranking, traffic or indexing improvement is promised. Rankings depend on content quality, links and competition.
- Structured data uses only facts visible on the site; no review/rating markup is emitted without real reviews.
