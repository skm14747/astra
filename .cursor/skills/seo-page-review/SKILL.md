---
name: seo-page-review
description: Audits an Astra Destiny page for indexability, metadata, content, keyword targeting, i18n completeness, international readiness, and accessibility. Use when reviewing SEO for a specific tool page, checking sitemap, robots, canonical URLs, or evaluating a page's multi-market readiness.
---

# SEO page review — Astra Destiny

## When to use

Use this for one URL or a set of related tool pages. Do not claim a ranking you did not measure.

## Inputs

- Path or paths, such as `/vedic/kundli` or `/vedic/choghadiya`
- The target market(s), if known (default: India + Global English)

## Steps

1. Read `src/app/vedic/seo.ts` to find the page's `VEDIC_SEO` entry. Read its layout.tsx and page.tsx.
2. Read `src/app/sitemap.ts`, `src/lib/i18n/en.ts`, `src/lib/i18n/hi.ts`.
3. Read `seo/keyword-clusters.json` to find the page's target cluster and keywords.
4. **Metadata check:** title (max 60 chars), description (150-160 chars), canonical, keywords array.
5. **Keyword alignment:** Does the title lead with the highest-volume keyword variant from the cluster? Cross-reference with `seo/keyword-clusters.json`.
6. **SEO intro:** Confirm `seoIntro` exists with `heading` and `text`. Confirm matching i18n keys in both `en.ts` and `hi.ts`.
7. **FAQs:** Confirm `faqs[]` exists with 3+ items. Confirm `FAQJsonLd` in layout.
8. **Related tools:** Confirm `relatedTools[]` has 3-5 cross-links. Confirm all href targets exist as routes.
9. **Breadcrumbs:** Confirm `BreadcrumbJsonLd` and visible `Breadcrumbs` in layout. Confirm items match.
10. **i18n completeness:** Check that all page-specific keys exist in BOTH en.ts and hi.ts:
    - `'{section}.title'`, `'{section}.subtitle'`
    - `'seo.{section}.heading'`, `'seo.{section}.text'`
    - `'empty.{section}'` (if page has empty state)
    - `'nav.{section}'` (if page is in navbar)
11. **Sitemap:** Confirm the route is in `VEDIC_ROUTES` in `src/app/sitemap.ts`.
12. **Navigation:** Confirm the page appears in `Navbar.tsx` and `SiteFooter.tsx`.
13. **Tools directory:** Confirm the page appears in `src/app/tools/page.tsx`.

## International Market Check

For each page, assess its readiness for the priority markets:

| Market | What to check |
|--------|--------------|
| **India** | Hindi i18n keys present? Devanagari in title if applicable? Targets India keyword variant? |
| **Nepal/Bangladesh/Sri Lanka** | Vedic terms used (not Western)? English content accessible? |
| **South Africa** | Would page appear for Western astrology queries? Note if content gap. |
| **Global English** | Is the page understandable without Vedic astrology knowledge? Does seoIntro explain the concept? |

## Keyword Targeting Reference

When evaluating keyword alignment, use these India-specific volumes as benchmarks:

- kundali: 450K, kundali matching: 301K, rashifal: 521K
- choghadiya: 368K, today tithi: 301K, panchang: 70K
- free online kundali: 60.5K, gun milan: 83K, hora today: 40.5K
- Career intent dominates India (39% of queries per Ishvaram data)

## Verification

Reproduce a finding from a file path or a page you opened. After an approved fix, re-read the changed route and re-run the test.

## Deliverable

Findings with severity, evidence, location, and a proposed fix:

- **Blocker:** indexable duplicate, wrong canonical, missing from sitemap, false claim
- **High:** missing SEO intro, broken internal link, invalid structured data, missing i18n keys
- **Medium:** weak title, suboptimal keyword targeting, heading skip, thin content
- **Note:** international market opportunity, unverified ranking

Fix only the issues the task approves.
