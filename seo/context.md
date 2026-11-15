# Astra Destiny — SEO Context

## Product

Astra Destiny (astradestiny.com) is a free Vedic astrology platform with 294 Jyotish algorithms running entirely in the browser. It offers Kundli generation, Dasha timelines, Yoga/Dosha detection, Kundli Milan, Panchang, Choghadiya, Sade Sati, Nakshatra analysis, and 20+ other Vedic calculators. All calculations use NASA JPL DE-series ephemeris with Lahiri Ayanamsa. No server-side data storage — privacy by design.

## Conversion

Primary: tool usage (returning daily users for panchang/choghadiya/rashifal). Secondary: birth profile creation. Future: consultation lead generation, gemstone affiliate revenue.

## Competitors

| Competitor | Monthly Traffic | Strength |
|---|---|---|
| DrikPanchang | 9.83M | Panchang + choghadiya dominance, festival pages |
| AstroSage | 6.69M | Kundli + matching monopoly, rashifal 521K keyword |
| ProKerala | 4M (astro) | Multi-vertical authority, today tithi |
| AstroYogi | 1.6M | Brand, paid consultations |
| GaneshaSpeaks | 1.6M | Daily horoscope content |
| mPanchang | 243K | Muhurta niche |

## International Market Strategy

### Engagement Data (Pew Research 2025)

| Rank | Country | Engagement | Astrology System |
|------|---------|-----------|-----------------|
| 1 | South Africa | 47% | Western + Vedic hybrid |
| 2 | India | 45% | Vedic (Kundli, Nakshatra, Dasha, Panchang) |
| 3 | Thailand | 29% | Local + Chinese traditions |
| 4 | Kenya | 23% | Western zodiac, horoscopes |
| 5 | Philippines | 22% | Western zodiac, horoscopes |
| 6 | Nigeria | 20% | Western zodiac, love predictions |
| 7 | South Korea | 20% | Saju (Four Pillars) |
| 8 | Sri Lanka | 20% | Vedic astrology |
| 9 | Japan | 19% | Fortune-telling, Chinese zodiac |
| 10 | Singapore | 19% | Chinese astrology, Feng Shui |

### Additional Vedic Markets

Nepal, Bangladesh — share India's Vedic astrology tradition (Kundli, Muhurat, Kundli matching).

### Market Tiers

| Tier | Countries | Content Strategy |
|------|-----------|-----------------|
| **Tier 1** | India, Nepal, South Africa | Vedic astrology, bilingual Hindi+English, Devanagari in titles |
| **Tier 2** | Thailand, Sri Lanka, Bangladesh | Vedic + local traditions, English content |
| **Tier 3** | Philippines, Nigeria, Kenya | Zodiac, daily horoscope, love compatibility in English |
| **Tier 4** | Singapore, Malaysia, South Korea, Japan | Chinese/local systems, English (future: zh/ko/ja) |
| **Tier 5** | Brazil, Mexico, Argentina | Western astrology, English (future: es/pt) |

### Key Rules

1. **India first** — 80%+ of Vedic astrology traffic. Always optimize for India.
2. **Bilingual wins** — Hindi/Hinglish 2-3x CTR vs English-only in India.
3. **Career > Marriage** — Career astrology is 39% of India queries vs 24% marriage (Ishvaram study, 351K conversations).
4. **Don't assume one system globally** — Vedic for South Asia, Western zodiac for Africa/LatAm, Chinese for East/Southeast Asia.
5. **South Africa is underserved** — 47% engagement, few Vedic competitors, English works.
6. **Festival-driven spikes** — Plan content 1-2 weeks before Navratri, Diwali, Chhath.
7. **Wedding season** — Vivah muhurat content for Nov-Feb, Apr-Jun windows.

## User Intent Distribution (India)

Source: Ishvaram.com — 134,834 classified first questions from AI-Jyotish conversations (Jun–Jul 2026)

| Intent | Share |
|--------|-------|
| Career & work | 39.2% |
| Marriage & relationships | 24.1% |
| Doshas & remedies | 21.7% |
| Full kundali reading | 4.0% |
| Muhurat / timing | 3.9% |
| Health | 2.8% |
| Money & finance | 2.2% |

## Technical Stack

- Next.js App Router, React, TypeScript, Tailwind CSS
- All astrology calculations in `src/lib/vedic/` (browser-only, no API calls)
- i18n: `useT()` hook with `en.ts` / `hi.ts`, hreflang en/hi/x-default
- SEO: `VEDIC_SEO` record in `src/app/vedic/seo.ts`, `buildVedicMetadata()` function
- Schema: BreadcrumbJsonLd, FAQJsonLd, HowToJsonLd components
- Domain: astradestiny.com (env: `NEXT_PUBLIC_SITE_URL`)

## Current Pages

21 Vedic tool pages + 4 Matrix pages + Panchang date pages + Blog.
Key gaps: /rashifal (521K keyword), /vedic/hora (40.5K), /vedic/lucky-number, /vedic/gun-milan.

## Claims (verified)

- "294 algorithms" — verified from `tools-inventory.csv` (296 rows including header)
- "NASA JPL DE-series ephemeris" — verified, uses Swiss Ephemeris with DE431
- "Lahiri Ayanamsa" — verified, configurable in settings
- "All calculations browser-side" — verified, no server API calls for astrology math
- "No data leaves your device" — verified, localStorage-only profile storage
