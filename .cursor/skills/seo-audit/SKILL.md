---
name: seo-audit
description: Runs a comprehensive Astra Destiny SEO audit across technical, content, schema, performance, AI search, on-page, accessibility, and international market readiness. Use for a full-site SEO audit, technical SEO review, schema audit, AI search readiness check, E-E-A-T review, GEO assessment, or international SEO review.
---

# SEO audit — Astra Destiny

## When to use

Use this skill for a comprehensive multi-category SEO audit of the full site or a subset of pages. For a quick single-page review, use `seo-page-review` instead.

Triggers: "SEO audit", "full site SEO", "technical SEO", "schema audit", "AI search readiness", "E-E-A-T review", "GEO assessment", "SEO health check", "international SEO".

## Relationship to seo-page-review

`seo-page-review` is a focused check of one or a few URLs for indexability, metadata, and content. This skill is a scored audit across eight categories that covers the full site. The two skills do not overlap in purpose; prefer this one when the request is broad.

## Inputs

- **Target:** URL, localhost port, or "all pages" (default). "All pages" means every route in `src/app/sitemap.ts` plus static pages.
- **Scope:** full audit (all categories) or a specific category (A through H below).
- **Live server:** whether a dev or production server is running. If not, skip curl and browser checks and note them as "requires live deployment to confirm".

## Reference files (read, never modify during audit)

- `src/app/vedic/seo.ts` — `VEDIC_SEO` record, `buildVedicMetadata()`, per-page SEO data
- `src/app/layout.tsx` — homepage metadata, keywords, site template
- `src/app/sitemap.ts` — `VEDIC_ROUTES`, `MATRIX_ROUTES`, sitemap generation
- `src/components/seo/JsonLd.tsx` — JSON-LD components (BreadcrumbJsonLd, FAQJsonLd, HowToJsonLd)
- `src/components/seo/SeoIntro.tsx` — server-rendered SEO intro component
- `src/components/seo/RelatedTools.tsx` — internal link component
- `src/lib/i18n/en.ts` and `src/lib/i18n/hi.ts` — translation dictionaries
- `src/components/shared/Navbar.tsx` — navigation structure
- `src/components/shared/SiteFooter.tsx` — footer links
- `seo/keyword-clusters.json` — keyword research data
- `seo/content-map.md` — content strategy and competitor analysis
- `next.config.ts` — headers, redirects, env

## Audit categories

### Category A — Technical SEO (weight: 20%)

1. **Crawlability.** Check for unintentional `noindex` meta tags. Confirm sitemap points at correct URL.
2. **Sitemap completeness.** Compare `VEDIC_ROUTES` in `src/app/sitemap.ts` against all routes in `src/app/vedic/`. Confirm no route is missing. Check `MATRIX_ROUTES` too.
3. **Canonical URLs.** Confirm `buildVedicMetadata()` generates correct canonicals. Check `alternates.canonical` on every page.
4. **Duplicate paths.** Confirm no two routes resolve to the same content.
5. **Internal links.** Confirm all `relatedTools` in `VEDIC_SEO` point to real routes. Check footer and nav links.
6. **HTTPS.** Confirm `NEXT_PUBLIC_SITE_URL` defaults to `https://astradestiny.com`.
7. **Mobile viewport.** Check `src/app/layout.tsx` for viewport meta.

### Category B — Content Quality / E-E-A-T (weight: 20%)

1. **Unique titles.** Confirm each `VEDIC_SEO` entry has a unique `title`.
2. **Unique meta descriptions.** Confirm no two pages share a `description`.
3. **Single h1.** Confirm each page component renders exactly one `<h1>`.
4. **SEO intro content.** Confirm every tool page has `seoIntro` in `VEDIC_SEO` and corresponding i18n keys.
5. **Server-rendered content.** Confirm `SeoIntro` component renders on server (check for 'use client' — it IS client but with fallback text).
6. **No false claims.** Check that "294 algorithms" matches `tools-inventory.csv` line count. Verify "NASA JPL" claim.
7. **FAQ quality.** Confirm FAQs answer real user questions, not stuffed keywords.

### Category C — Schema / Structured Data (weight: 10%)

1. **JSON-LD present.** Confirm every layout.tsx emits `BreadcrumbJsonLd`. Confirm `FAQJsonLd` when `seo.faqs` exists.
2. **Valid types.** Note that `FAQPage` schema was retired by Google May 2026 for most sites — flag if still used.
3. **Content-schema match.** Confirm `BreadcrumbList` items match visible breadcrumbs.
4. **No fabricated markup.** Confirm no `AggregateRating`, `Review`, or fake `author` fields.

### Category D — Performance (weight: 10%)

1. **Build output.** Run `npm run build` and check route summary. Flag routes above 150 kB First Load JS.
2. **Browser-only computation.** Confirm all Vedic calculations run client-side (no API calls to external astrology services).
3. **Image handling.** Check for `next/image` usage and `alt` attributes.

### Category E — AI Search Readiness / GEO (weight: 10%)

1. **AI bot access.** Check for GPTBot, Anthropic-AI, or similar blocks.
2. **Quotable content.** Check if `seoIntro` text opens with a direct answer. Check FAQ quality.
3. **Structured data for LLM extraction.** Confirm JSON-LD provides tool name, description, category.

### Category F — On-Page SEO (weight: 15%)

1. **Internal linking.** Confirm every `VEDIC_SEO` entry has `relatedTools` with 3-5 links. Check footer coverage.
2. **URL structure.** Confirm clean `/vedic/{slug}` paths.
3. **Open Graph.** Confirm `buildVedicMetadata()` generates OG title, description, url, images.
4. **hreflang.** Confirm `alternates.languages` in `buildVedicMetadata()` includes en, hi, x-default.
5. **Breadcrumbs.** Confirm visible breadcrumbs match JSON-LD `BreadcrumbList`.

### Category G — Accessibility (weight: 5%)

1. **Language attribute.** Confirm `<html lang="en">` in layout.
2. **Labelled inputs.** Check tool components for `aria-label` or `<label>`.
3. **Image alt text.** Check all images have `alt`.
4. **Focus indicators.** Check Tailwind config for visible focus styles.

### Category H — International Market Readiness (weight: 10%)

This is a NEW category specific to Astra Destiny's multi-market strategy.

1. **Hindi translations completeness.** Compare `en.ts` key count with `hi.ts`. Flag missing Hindi translations. Every SEO heading and text key in `en.ts` must exist in `hi.ts`.
2. **Devanagari in titles.** Check if high-volume India keywords include Devanagari script in parentheses where appropriate (kundli, panchang).
3. **India-first keyword targeting.** Confirm top-6 pages by traffic (kundli, compatibility, panchang, choghadiya, muhurta, career) target India-specific keyword variants.
4. **South Africa / Africa readiness.** Check if any content targets Western astrology terms (zodiac signs, daily horoscope, birth chart) for English-speaking African markets. Note as opportunity if missing.
5. **Nepal/Bangladesh/Sri Lanka.** Confirm Vedic astrology terms are used (not Western) since these markets share the Vedic tradition.
6. **Localization infrastructure.** Confirm i18n hook (`useT()`) is used consistently. Confirm hreflang setup.
7. **Market-specific content gaps.** Cross-reference `seo/keyword-clusters.json` for gaps. Flag new page opportunities for non-India markets.

## Scoring methodology

Score each category 0–100 based on fraction of checks that pass.

```
overall = (A * 0.20) + (B * 0.20) + (C * 0.10) + (D * 0.10) + (E * 0.10) + (F * 0.15) + (G * 0.05) + (H * 0.10)
```

### Severity levels

- **Critical:** blocks indexing or causes duplicate content
- **High:** impacts rankings or user trust
- **Medium:** optimization opportunity
- **Low:** nice-to-have or future market expansion

## Verification rules

1. Do NOT claim Lighthouse scores, Core Web Vitals, or Search Console metrics unless you ran the tool.
2. Do NOT fabricate traffic numbers, ranking positions, or indexing status.
3. Mark each finding as "Verified from source", "Verified from build", "Verified from curl", or "Requires live deployment".
4. Do not treat a check as passed unless you performed it in this session.

## Deliverable

Save a Markdown report to `seo/audit-YYYY-MM-DD.md` with:
- Summary table (overall score, pages audited, issues by severity)
- Category scores table (A–H with weights)
- Findings by severity (Critical > High > Medium > Low)
- Each finding: Issue, Evidence, Verification method, Fix, Confirm fix
- Checks not performed (with reasons)

Fix only the issues the task approves.
