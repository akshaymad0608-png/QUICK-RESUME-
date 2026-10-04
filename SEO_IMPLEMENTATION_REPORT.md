# SEO implementation report — QuickResume

Implemented 2026-10-04 on branch `claude/seo-toolkit`.

## What was added

| File | Purpose |
|---|---|
| `scripts/seo-validate.mjs` | Zero-dependency validator for the build output: titles, descriptions, duplicates, canonicals, robots/googlebot directives, headings, Open Graph/Twitter, images without `alt`, JSON-LD validity and pitfalls, sitemap consistency (noindex pages, missing files, wrong host, collapse), broken internal links, orphan pages, `robots.txt`, `ads.txt`, important pages being indexable. Exit code 1 on errors. |
| `scripts/gsc-analyze.mjs` | Reads Search Console CSV exports and writes `reports/gsc-opportunities.md`: branded vs non-branded, low-CTR, positions 5–20, zero-click, question and long-tail queries, declining pages (with a previous export), cannibalisation and intent mismatches (with `QueryPage.csv`). |
| `scripts/seo-report.mjs` | Builds a self-contained local dashboard `reports/seo-dashboard.html` from the two reports. No server, no credentials, not deployed. |
| `seo.config.json` | Origin, build folder, important pages, sitemap floor, brand terms. |
| `.github/workflows/seo.yml` | Runs the validator in CI on every PR and on `main`. |
| `SEO_*.md` | These four documents. |
| `package.json` | `seo:validate`, `seo:gsc`, `seo:report` scripts. |
| `.gitignore` | `reports/` and `seo-data/` (generated output and private exports) are not committed. |

## Site changes in this pass

- No site code changed; the toolkit only adds checks.

## Validation

Command: `npm run build && node scripts/seo-validate.mjs`

- 28 pages scanned (28 indexable, 0 noindex), 28 sitemap URLs.
- **0 errors**, 10 warnings, 0 notes (full list in `SEO_AUDIT_REPORT.md`).
- Production build passes.
- Lighthouse (local baseline) is recorded in `SEO_AUDIT_REPORT.md`; no improvement is claimed from this PR because it does not change performance.

## Remaining technical issues

- 10 of 28 pages (About, Build, Contact and most generator pages) carry under 100 words of static HTML. Each generator page needs visible, unique explanatory content (what it does, how to use it, an example output) that exists in the DOM for users, not only in the prerender.
- 312 KiB unused JavaScript and 900 ms of render-blocking resources reported on the home page.

## Search Console setup

1. Open <https://search.google.com/search-console> and add a **Domain** property for `quickresume.business` (DNS TXT verification) so http/https/www variants are all covered. A URL-prefix property for `https://quickresume.business/` also works.
2. **Sitemaps** → submit `https://quickresume.business/sitemap.xml`. Status should read "Success"; compare "Discovered URLs" with the sitemap count above.
3. **Settings → Users and permissions**: add any tool/service account that needs read access.
4. **Pages (Indexing)**: for each excluded reason, compare with the intended `noindex` pages. "Crawled – currently not indexed" on a page you care about is a content-quality signal; improve the page, then use **URL Inspection → Request indexing** (about 10 per day).
5. Export data for the analyser: **Performance → Search results**, date range last 3–6 months, **Export → Download CSV**; unzip into `seo-data/current/`. For a decline comparison export the previous equal period into `seo-data/previous/`.
6. Run `npm run seo:gsc` (or `node scripts/gsc-analyze.mjs`), then `npm run seo:report` and open `reports/seo-dashboard.html`.
7. Optional: **Links**, **Core Web Vitals** and **Enhancements** (breadcrumbs, FAQ, etc.) should show no errors; fix any that appear.

## Recommended next steps

See `SEO_ACTION_PLAN_90_DAYS.md`.
