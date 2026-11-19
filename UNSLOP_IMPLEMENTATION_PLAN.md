# Unslop craft pass — implementation plan

> **SEO safety rule:** This plan touches ONLY visual CSS classes on page.tsx files.
> It NEVER modifies any of the files or patterns listed in the "Do not touch" section below.

## Do not touch (SEO-critical assets)

| Asset | Why |
|---|---|
| **All `layout.tsx` files** (71 files) | Contain `generateMetadata`, `buildVedicMetadata`, page titles, meta descriptions, canonical URLs, hreflang alternates, BreadcrumbJsonLd, FAQJsonLd, HowToJsonLd |
| **`src/app/vedic/seo.ts`** (1066 lines) | Master SEO config — titles, descriptions, keywords, FAQ schema, seoIntro text, relatedTools links |
| **`src/app/sitemap.ts`** | XML sitemap generation for all routes |
| **`src/app/robots.ts`** | robots.txt directives |
| **`src/components/seo/JsonLd.tsx`** | WebSiteJsonLd, OrganizationJsonLd, WebAppJsonLd structured data |
| **`src/components/seo/Breadcrumbs.tsx`** | Breadcrumb navigation (links + `aria-label`) |
| **`src/components/seo/SeoIntro.tsx`** | SEO intro text block with `<h2>` heading and expandable text — **no class changes** |
| **`src/app/layout.tsx`** | Root metadata, OpenGraph, Twitter cards, hreflang, canonical |
| **`src/app/manifest.ts`** | PWA manifest |
| **`src/lib/i18n/*.ts`** (en, hi, ne, pt, es, ja, fr, ko) | Translation strings — the actual text content |
| **All `<h1>`, `<h2>`, `<h3>` tags** | Tag name, hierarchy, and text content must remain identical. Only surrounding CSS classes change. |
| **All `<a>` / `LocaleLink` hrefs** | Internal link structure must remain identical |
| **All `alt` attributes on images** | Image SEO stays untouched |
| **All `aria-*` attributes** | Accessibility landmarks stay untouched |

## SEO safety analysis of each change type

| Change | SEO impact | Why safe |
|---|---|---|
| `transition-all` → `transition-colors` | **Zero** | CSS transitions are invisible to crawlers. Googlebot does not index animation properties. |
| `font-bold` → `font-medium` | **Zero** | `font-weight` is a visual CSS property. Google does not rank based on bold text weight in CSS (only `<strong>` / `<b>` HTML tags matter, and we are not changing any). |
| `uppercase` → sentence case (CSS) | **Zero** | We are removing `text-transform: uppercase` from CSS classes. The underlying DOM text is ALREADY sentence case (e.g., `t('footer.popularTools')` renders "Popular tools"). Google indexes the DOM text, not the CSS-transformed visual. Removing CSS `uppercase` makes the visual match the DOM — if anything, this IMPROVES consistency for Googlebot rendering. |
| `tracking-wider` → `tracking-normal` | **Zero** | `letter-spacing` is purely visual. No SEO signal. |
| Add `tabular-nums` | **Zero** | `font-variant-numeric` is purely visual. No SEO signal. |
| Remove `animate-ping` | **Zero** | CSS animation removal. No SEO signal. |
| Remove `hover:scale-105` | **Zero** | CSS hover transform. No SEO signal. |

## Confirmed: Zero heading, link, or content changes

- **0** `<h1>` tags added, removed, or re-ordered
- **0** `<h2>` tags added, removed, or re-ordered
- **0** heading text content modified
- **0** `<a>` hrefs modified
- **0** translation keys modified
- **0** structured data (JSON-LD) modified
- **0** meta title/description values modified
- **0** canonical URLs modified
- **0** hreflang tags modified
- **0** sitemap entries modified

---

## Phase 0: Foundation — `globals.css`

**Impact:** Cascades to every page automatically. Do this first.

### 0a. `.section-title` — sentence case

```css
/* BEFORE */
.section-title {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #8b6cf0;
}

/* AFTER */
.section-title {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  /* text-transform: uppercase removed */
  color: #8b6cf0;
}
```

SEO note: `.section-title` is used on `<span>` elements, NOT on heading tags. No heading structure affected.

### 0b. `.glass-card` — specific transitions

```css
/* BEFORE */
.glass-card {
  ...
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* AFTER */
.glass-card {
  ...
  transition: background 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              border-color 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

### 0c. Add tabular-nums utility class

```css
/* NEW — add after .section-title */
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
```

### 0d. `.cosmic-btn` — specific transitions

```css
/* BEFORE */
.cosmic-btn {
  ...
  transition: all 0.3s ease;
}

/* AFTER */
.cosmic-btn {
  ...
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}
```

### 0e. Print styles — leave `uppercase !important` in print block (line 828) as-is

The `text-transform: uppercase !important` at line 828 is inside a `@media print` block for the PDF report. Leave it — print output is not crawled.

---

## Phase 1: Shell components

These appear on every page. Changes here are visually global.

### 1a. `Navbar.tsx` (9 font-bold, 1 uppercase, 2 arbitrary px)

| Line(s) | Change | SEO check |
|---|---|---|
| All `font-bold` on nav links/labels | → `font-medium` | ✅ No heading tags affected. Nav uses `<span>`, `<a>`, `<button>` |
| `uppercase tracking-wider` on "More" label | → remove both classes | ✅ Not a heading, just a dropdown group label |
| Arbitrary `px` values (2) | → nearest 4px step | ✅ Visual only |
| `animate-ping` on profile status dot (line 237) | → remove, keep static dot | ✅ Visual only |

### 1b. `SiteFooter.tsx` (3 uppercase headings)

| Line(s) | Change | SEO check |
|---|---|---|
| 3× `<h3 className="... uppercase tracking-wider ...">` | → remove `uppercase tracking-wider` | ✅ `<h3>` TAG stays. Text content stays. Only CSS visual removed. |
| `font-semibold` on footer headings | → `font-medium` | ✅ Visual only |

### 1c. `Sidebar.tsx` (2 transition-all, 1 uppercase)

| Change | SEO check |
|---|---|
| `transition-all` → `transition-colors` (2 instances) | ✅ Visual only |
| `uppercase tracking-wider` on section headings → remove | ✅ `<span>` not a heading tag |

### 1d. `BottomTabs.tsx` (1 transition-all)

| Change | SEO check |
|---|---|
| `transition-all` → `transition-colors` | ✅ Visual only |

### 1e. `CommandPalette.tsx` (2 uppercase)

| Change | SEO check |
|---|---|
| `uppercase tracking-wider` on group headings → remove | ✅ cmdk `<Command.Group heading>` — not an HTML heading tag |

### 1f. `RelatedTools.tsx` (1 transition-all, 1 uppercase heading)

| Line | Change | SEO check |
|---|---|---|
| `<h2 className="... uppercase ...">` | → remove `uppercase tracking-wide` | ✅ `<h2>` TAG stays. `{t('related.title')}` text unchanged. Only visual CSS removed. |
| `transition-all` on link pills | → `transition-colors` | ✅ `<a>` href unchanged |

### 1g. `Skeleton.tsx` — NO CHANGES

`animate-pulse-subtle` is legitimate loading state animation. Skip.

---

## Phase 2: Home page (`page.tsx`)

Highest-traffic page. ~4.5K monthly organic visits (India).

### 2a. Remove `animate-ping` on profile dot (line 110)

```tsx
// BEFORE
<span className="absolute inset-0 rounded-full bg-violet-400 animate-ping opacity-40" />

// AFTER — remove this entire span
```

SEO: decorative `<span>`, no text content, no link.

### 2b. FeatureCard transitions

| Change | SEO check |
|---|---|
| `transition-all` → `transition-colors` on tool pill links | ✅ `<a>` hrefs unchanged |
| `group-hover:scale-110` on icon box → keep (review later) | ✅ Not an SEO element |

### 2c. `font-bold` → `font-medium` (3 instances)

All on `<h1>`, `<h2>`, `<h3>` tag classes. The TAGS stay. Only weight changes.

SEO: Google does not use CSS `font-weight` as a ranking signal. Only `<strong>` / `<b>` HTML tags carry any weight signal, and none are used here.

### 2d. Inline footer: 6× uppercase headings → sentence case

```tsx
// BEFORE
<h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">

// AFTER
<h3 className="text-sm font-medium text-zinc-300 mb-3">
```

SEO: `<h3>` tag stays. Text like `{t('footer.popularTools')}` is already "Popular tools" in the DOM. CSS `uppercase` just made it visually "POPULAR TOOLS". Removing CSS `uppercase` makes visual match the actual DOM text that Google already indexes.

---

## Phase 3: Vedic core pages (highest traffic tools)

### 3a. `vedic/kundli/page.tsx`

| Change | Count | SEO check |
|---|---|---|
| Table headers `uppercase tracking-wider` → remove | 1 row (`<tr>`) | ✅ Table `<tr>` not heading. `<th>` text unchanged. |
| `font-bold` → `font-medium` | 2 | ✅ On `<h1>`, `<h2>` — tags stay |
| Add `tabular-nums` class to degree display elements | ~3 | ✅ Visual only |

### 3b. `vedic/panchang/page.tsx`

| Change | Count | SEO check |
|---|---|---|
| `uppercase tracking-wider` → remove | 9 labels | ✅ All on `<div>` labels, not headings |
| `transition-all` → `transition-colors` | 3 | ✅ Visual only |
| `font-bold` → `font-medium` | 7 | ✅ Tags unchanged |
| Add `tabular-nums` on time displays | ~6 | ✅ Visual only |

### 3c. `DatePanchangView.tsx`

| Change | Count | SEO check |
|---|---|---|
| `uppercase tracking-wider` → remove | 8 labels | ✅ All on `<div>` elements |
| `font-bold` → `font-medium` | 6 | ✅ Visual only |
| Add `tabular-nums` on times/degrees | ~4 | ✅ Visual only |

### 3d. `MonthPanchangView.tsx`

| Change | Count | SEO check |
|---|---|---|
| `uppercase tracking-wider` → remove on `<th>` | 6 | ✅ `<th>` tag and text unchanged |
| `font-bold` → `font-medium` | 1 | ✅ Visual only |
| Add `tabular-nums` on date column | 1 | ✅ Visual only |

### 3e. `vedic/dashas/page.tsx`

| Change | Count | SEO check |
|---|---|---|
| `transition-all` → `transition-colors` | 1 | ✅ Visual only |
| `font-bold` → `font-medium` | 1 | ✅ On `<h1>`, tag stays |
| Add `tabular-nums` on period durations | ~2 | ✅ Visual only |

### 3f. `DashaTimeline.tsx`

| Change | Count | SEO check |
|---|---|---|
| `transition-all` → specific | 1 | ✅ Visual only |
| `animate-pulse` on current marker → static indicator | 1 | ✅ Decorative span |
| Add `tabular-nums` | ~1 | ✅ Visual only |

### 3g. `vedic/nakshatra/page.tsx`

| Change | Count | SEO check |
|---|---|---|
| `uppercase tracking-wider` → remove | 3 labels | ✅ `<div>` and `<span>`, not headings |
| `transition-all` → `transition-colors` | 1 | ✅ Visual only |
| `font-bold` → `font-medium` | 2 | ✅ Tags unchanged |
| Add `tabular-nums` | ~2 | ✅ Visual only |

### 3h. `vedic/yogas/page.tsx`

| Change | Count | SEO check |
|---|---|---|
| `font-bold` → `font-medium` | 1 | ✅ On `<h1>`, tag stays |

---

## Phase 4: Vedic secondary pages

### 4a–4l. Same pattern across 12 files

Each file gets the same treatment:
- `font-bold` → `font-medium` (on page headings, card titles)
- `uppercase tracking-wider` → remove (on `<div>` labels, `<th>` headers, `<span>` badges)
- `transition-all` → `transition-colors` (on hover cards, interactive elements)
- Add `tabular-nums` (on score/time/degree displays)

| File | font-bold | uppercase | transition-all | tabular-nums | SEO risk |
|---|---|---|---|---|---|
| `compatibility/page.tsx` | 3 | 0 | 0 | yes | None |
| `transits/page.tsx` | 2 | 0 | 1 | yes | None |
| `sade-sati/page.tsx` | 3 | 0 | 0 | yes | None |
| `muhurta/page.tsx` | 3 | 0 | 1 | yes | None |
| `choghadiya/page.tsx` | 2 | 0 | 1 | yes | None |
| `hora/page.tsx` | 3 | 0 | 1 | yes | None |
| `kp/page.tsx` | 1 | 5 (`<th>`) | 0 | no | None — `<th>` tags stay |
| `report/page.tsx` | 4 | 34 | 1 | yes | None — all `<p>`, `<tr>`, `<span>` labels |
| `remedies/page.tsx` | 1 | 1 (`<span>`) | 0 | no | None |
| `ashtakavarga/page.tsx` | 2 | 1 (`<th>`) | 0 | yes | None |
| `shadbala/page.tsx` | 4 | 0 | 0 | yes | None |
| `predictions/page.tsx` | 2 | 0 | 0 | no | None |

Special note on `report/page.tsx`: This has the most `uppercase` instances (34). All are on `<p>`, `<span>`, `<tr>`, `<div>` elements inside the report body — NOT on heading tags. The `<h1>` and `<h2>` tags in the report keep their structure.

---

## Phase 5: Vedic divisional + Jaimini pages

### 5a–5k. Same pattern across 11 files

| File | font-bold | uppercase | tabular-nums | SEO risk |
|---|---|---|---|---|
| `navamsa/page.tsx` | 1 | 6 (`<th>`, `<div>`) | no | None |
| `divisional/page.tsx` | 1 | 0 | no | None |
| `jaimini/page.tsx` | 1 | 0 | no | None |
| `nadi/page.tsx` | 3 | 0 | no | None |
| `atmakaraka/page.tsx` | 2 | 1 (`<div>`) | no | None |
| `darakaraka/page.tsx` | 2 | 4 (`<div>`) | no | None |
| `karakamsha/page.tsx` | 2 | 1 (`<div>`) | no | None |
| `upapada/page.tsx` | 2 | 1 (`<div>`) | no | None |
| `arudha-pada/page.tsx` | 2 | 1 (`<div>`) | no | None |
| `varshphal/page.tsx` | 4 | 4 (`<div>`) | yes | None |
| `career + wealth + health` | 1+3+2 | 0 | yes | None |

---

## Phase 6: Matrix pages

| File | font-bold | uppercase | transition-all | hover:scale | SEO risk |
|---|---|---|---|---|---|
| `matrix/chart/page.tsx` | 8 | 0 | 4 | 3 (on `<button>`) | None |
| `matrix/health/page.tsx` | 8 | 7 (`<div>`, `<th>`) | 0 | 0 | None |
| `matrix/timeline/page.tsx` | 4 | 0 | 0 | 0 | None |
| `matrix/compatibility/page.tsx` | 3 | 1 (`<div>`) | 0 | 0 | None |

Matrix chart `hover:scale-105`: These are on `<button>` elements for interactive node selection. Replace with `active:scale-95` (press feedback) instead of hover zoom.

---

## Phase 7: Tools pages (numerology, western)

### 7a–7k. Same pattern across 11 files

| File | font-bold | uppercase | transition-all | SEO risk |
|---|---|---|---|---|
| `tools/page.tsx` | 1 | 0 | 3 | None |
| `numerology/page.tsx` | 3 | 4 (`<div>`) | 0 | None |
| `numerology/life-path/page.tsx` | 3 | 4 (`<div>`) | 0 | None |
| `numerology/destiny-number/page.tsx` | 5 | 3 (`<div>`) | 0 | None |
| `numerology/lo-shu-grid/page.tsx` | 3 | 2 (`<div>`) | 1 | None |
| `numerology/personal-year/page.tsx` | 4 | 0 | 0 | None |
| `western/north-node/page.tsx` | 3 | 2 (`<div>`) | 0 | None |
| `western/chiron/page.tsx` | 2 | 1 (`<div>`) | 0 | None |
| `western/lilith/page.tsx` | 2 | 1 (`<div>`) | 0 | None |
| `western/saturn-return/page.tsx` | 1 | 0 | 0 | None |
| `western/synastry/page.tsx` | 1 | 0 | 0 | None |

---

## Phase 8: Content and horoscope pages

| File | font-bold | uppercase | transition-all | SEO risk |
|---|---|---|---|---|
| `blog/page.tsx` | 1 | 0 | 1 | None |
| `blog/[slug]/page.tsx` | 1 | 1 (`<h2>`) | 1 | ⚠️ `<h2>` — keep tag, only remove CSS `uppercase`. Text "More Articles" stays. |
| `rashifal/page.tsx` | 4 | 0 | 2 | None |
| `horoscope/today/page.tsx` | 4 | 0 | 2 | None |
| `horoscope/love/page.tsx` | 1 | 0 | 1 | None |
| `astrology/page.tsx` | 2 | 0 | 2 | None |
| `astrology/[slug]/page.tsx` | 1 | 0 | 0 | None |
| `astrology sub-pages` (4 files) | 1 each | 0 | 0 | None |
| `nakshatras/page.tsx` | 1 | 0 | 1 | None |
| `nakshatras/[slug]/page.tsx` | 1 | 0 | 0 | None |

SEO note for `blog/[slug]/page.tsx`: The `<h2>` "More Articles" has `uppercase` CSS. Removing it shows "More Articles" as-is — the underlying text is already Title Case in the hardcoded English string. This is safe.

---

## Phase 9: Static and utility pages

| File | font-bold | uppercase | transition-all | SEO risk |
|---|---|---|---|---|
| `about/page.tsx` | 1 | 0 | 0 | None |
| `methodology/page.tsx` | 1 | 0 | 0 | None |
| `privacy/page.tsx` | 1 | 0 | 0 | None |
| `terms/page.tsx` | 1 | 0 | 0 | None |
| `disclaimer/page.tsx` | 1 | 0 | 0 | None |
| `how-it-works/page.tsx` | 1 | 0 | 0 | None |
| `settings/page.tsx` | 1 | 1 (`<p>`) | 0 | None |
| `embed/panchang/page.tsx` | 0 | 1 (`<div>`) | 1 | None |
| `panchang/[date]/page.tsx` | 1 | 1 (`<h2>`) | 1 | ⚠️ `<h2>` — keep tag, only remove CSS. |
| `panchang/month/[month]/page.tsx` | 1 | 0 | 1 | None |

---

## Phase 10: Shared Vedic components

| File | font-bold | tabular-nums | SEO risk |
|---|---|---|---|
| `PlanetDetailPanel.tsx` | 1 | Add to degree/longitude values | None |
| `ArcanaDetailPanel.tsx` | 1 | No numeric data | None |

---

## Phase 11: Verification

### 11a. Build check

```bash
npm run build
```

Must pass with zero errors. No TypeScript types are affected (only className strings).

### 11b. Visual spot-check (5 pages)

Open in browser and compare before/after:
1. `/` (home) — footer headings now sentence case, tool pills smoother
2. `/vedic/kundli` — table headers sentence case, degrees aligned
3. `/vedic/panchang` — labels sentence case, times with tabular-nums
4. `/matrix/chart` — no hover zoom on nodes, smoother transitions
5. `/vedic/report` — biggest change: 34 labels now sentence case, all figures aligned

### 11c. Mobile test (375px)

Check home + panchang in device emulator. `transition-all` → `transition-colors` should eliminate micro-jank on low-end devices.

### 11d. SEO verification

```bash
# Verify zero heading changes
git diff --stat  # Should show only className string changes
git diff | grep -c '<h[1-3]'  # Should be 0 tag additions/removals
git diff | grep -c 'href='    # Should be 0 link changes
```

---

## Summary

| Metric | Count |
|---|---|
| Files modified | ~80 page.tsx + components + 1 globals.css |
| `transition-all` removed | ~40 instances |
| `font-bold` → `font-medium` | ~170 instances |
| `uppercase` removed (CSS only) | ~129 instances |
| `tabular-nums` added | ~30 data display elements |
| `animate-ping` removed | 2 instances |
| Heading tags changed | **0** |
| Link hrefs changed | **0** |
| Meta/title/description changed | **0** |
| Structured data changed | **0** |
| i18n strings changed | **0** |
| SEO impact | **Zero** |
