# Hindi Language Support — Implementation Plan

## Overview

Add full English ↔ हिन्दी toggle across all 25 pages, shared components (Navbar, BottomTabs, EmptyState, ProfileModal, CommandPalette), and Settings. The audience is elderly users in India who are more comfortable reading in Hindi.

---

## Architecture Decision: Dict-based i18n (no external library)

**Why not next-intl / next-i18next:**
- Our app is 100% client-rendered (`'use client'` on every page)
- No server components, no `[locale]` route segments needed
- Adding a full i18n framework would require restructuring routing (App Router i18n needs `[locale]/...` layout)
- We only have 2 languages (English + Hindi) — a simple context + dictionary is sufficient

**Chosen approach:** `LanguageContext` + flat JSON dictionaries + `useT()` hook

---

## String Inventory (estimated ~450 translatable strings)

| Category | Count | Examples |
|---|---|---|
| **Page titles & subtitles** | ~50 | "Daily Panchang", "Your Vedic birth chart…" |
| **Section labels** | ~40 | "Panchangam", "Hindu Calendar", "Muhurta Timings" |
| **Card labels / field names** | ~80 | "Tithi", "Nakshatra", "Sunrise", "Retrograde" |
| **Button text / actions** | ~30 | "Create Birth Profile", "Save Changes", "Cancel", "Allow location" |
| **Empty states** | ~25 | "Create a birth profile to see…" |
| **Nav / tabs / menus** | ~40 | "Birth Chart", "Predictions", "Settings", "Home" |
| **Settings labels** | ~30 | "Ayanamsa System", "Font Size", "Appearance" |
| **SEO intros** | ~19 | Long paragraph strings (keep English for SEO, show Hindi in UI) |
| **Tooltip / badge text** | ~40 | "NOW", "Exalted", "Retrograde", "High priority" |
| **Homepage hero + features** | ~30 | "Discover Your Cosmic Blueprint", feature descriptions |
| **Profile modal** | ~15 | "Name", "Date of Birth", "Birth City" |
| **Misc / dynamic** | ~50 | "of 15", "auspicious today", "elapsed", "remaining" |

**Note:** Astrological proper nouns (planet names, rashi names, nakshatra names) are already Sanskrit-origin — they are the same in Hindi. Only UI chrome, descriptions, and instructions need translation.

---

## Implementation Steps (10 tasks)

### Task 1: Create language types and context
**File:** `src/lib/i18n/context.tsx`

- Define `Language = 'en' | 'hi'`
- Create `LanguageContext` with `language` and `setLanguage`
- Use `useLocalStorage('astra-language', 'en')` for persistence
- Apply `lang` attribute to `<html>` via `useEffect`
- Export `useLanguage()` hook and `LanguageProvider`

**File:** `src/lib/settings/context.tsx`
- Add `language: Language` and `setLanguage` to SettingsContext (keep it co-located with other settings)
- OR: keep language in its own context for cleaner separation (recommended — language affects every component)

**Decision:** Add to SettingsContext since it already holds fontSize/theme and is already consumed everywhere.

### Task 2: Create translation dictionary structure
**File:** `src/lib/i18n/en.ts` — English dictionary (canonical keys)
**File:** `src/lib/i18n/hi.ts` — Hindi dictionary (matching keys)
**File:** `src/lib/i18n/index.ts` — exports `useT()` hook

Dictionary shape:
```typescript
export const en = {
  // Common
  'app.name': 'Astra',
  'app.tagline': 'Vedic Astrology + Matrix of Destiny',

  // Nav
  'nav.birthChart': 'Birth Chart',
  'nav.predictions': 'Predictions',
  'nav.daily': 'Daily',
  'nav.matching': 'Matching',
  'nav.matrix': 'Matrix',
  'nav.lifeAreas': 'Life Areas',
  'nav.settings': 'Settings',

  // Bottom tabs
  'tab.home': 'Home',
  'tab.chart': 'Chart',
  'tab.daily': 'Daily',
  'tab.match': 'Match',
  'tab.matrix': 'Matrix',

  // Page titles
  'panchang.title': 'Daily Panchang',
  'panchang.loading': 'Loading today\'s Panchang…',
  'panchang.section.panchangam': 'Panchangam',
  'panchang.section.panchangam.sub': 'The five limbs',
  'panchang.section.calendar': 'Hindu Calendar',
  'panchang.section.muhurta': 'Muhurta Timings',
  'panchang.sunrise': 'Sunrise',
  'panchang.sunset': 'Sunset',
  'panchang.dayLength': 'Day Length',
  'panchang.night': 'Night',
  // ... etc for all ~450 keys
} as const;
```

Hindi version:
```typescript
export const hi = {
  'app.name': 'एस्ट्रा',
  'app.tagline': 'वैदिक ज्योतिष + भाग्य मैट्रिक्स',

  'nav.birthChart': 'जन्म कुंडली',
  'nav.predictions': 'भविष्यवाणी',
  'nav.daily': 'दैनिक',
  'nav.matching': 'मिलान',
  'nav.matrix': 'मैट्रिक्स',
  'nav.lifeAreas': 'जीवन क्षेत्र',
  'nav.settings': 'सेटिंग्स',

  'tab.home': 'होम',
  'tab.chart': 'कुंडली',
  'tab.daily': 'दैनिक',
  'tab.match': 'मिलान',
  'tab.matrix': 'मैट्रिक्स',

  'panchang.title': 'दैनिक पंचांग',
  'panchang.loading': 'आज का पंचांग लोड हो रहा है…',
  'panchang.section.panchangam': 'पंचांग',
  'panchang.section.panchangam.sub': 'पाँच अंग',
  'panchang.section.calendar': 'हिन्दू कैलेंडर',
  'panchang.section.muhurta': 'मुहूर्त समय',
  'panchang.sunrise': 'सूर्योदय',
  'panchang.sunset': 'सूर्यास्त',
  'panchang.dayLength': 'दिन की अवधि',
  'panchang.night': 'रात',
  // ... etc
} as const;
```

### Task 3: Create `useT()` hook
**File:** `src/lib/i18n/index.ts`

```typescript
import { useSettings } from '../settings/context';
import { en } from './en';
import { hi } from './hi';

const dicts = { en, hi } as const;

export function useT() {
  const { language } = useSettings();
  return (key: keyof typeof en, params?: Record<string, string | number>) => {
    let str = dicts[language][key] ?? dicts.en[key] ?? key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        str = str.replace(`{${k}}`, String(v));
      });
    }
    return str;
  };
}
```

Supports interpolation: `t('panchang.tithi.of', { n: 6, total: 15 })` → "Tithi 6 of 15" / "तिथि 6 / 15"

### Task 4: Add language to SettingsContext + UI controls
**File:** `src/lib/settings/context.tsx`
- Add `language: Language`, `setLanguage` to context
- `useLocalStorage('astra-language', 'en')`
- `useEffect` to set `document.documentElement.lang = language`

**File:** `src/components/shared/Navbar.tsx`
- Add EN/हि toggle button in accessibility toolbar (between font size and theme)

**File:** `src/app/settings/page.tsx`
- Add "Language" section under Accessibility with English / हिन्दी buttons

### Task 5: Add Hindi font support
**File:** `src/app/layout.tsx`
- Add `Noto_Sans_Devanagari` from Google Fonts for Hindi text rendering
- Add CSS variable `--font-hindi`
- Apply conditionally when language is Hindi

**File:** `src/app/globals.css`
- Add `[lang="hi"] body { font-family: var(--font-hindi), var(--font-sans), ... }`
- Ensure Hindi text wraps properly (Devanagari can be wider)

### Task 6: Translate shared components
Replace hardcoded strings with `t()` calls in:

| Component | Strings to translate |
|---|---|
| `Navbar.tsx` | 6 group labels, ~25 menu item labels, "Create Profile", "New Profile", "Activate", "⌘K search" |
| `BottomTabs.tsx` | 5 tab labels |
| `EmptyState.tsx` | "Create Birth Profile" button |
| `ProfileModal.tsx` | "Create Birth Profile", "Edit Profile", field labels, "Save Changes", "Cancel" |
| `CommandPalette.tsx` | Placeholder text, tool names in search |

### Task 7: Translate all 19 Vedic pages
For each page, replace hardcoded English strings with `t('key')`:

| Page | Key strings to translate |
|---|---|
| **Panchang** | Title, sections, field labels, "NOW" badge, "Loading…", sunrise/sunset labels |
| **Muhurta** | Title, "Current Hora", "Muhurta Timings", "NOW", "Auspicious"/"Inauspicious" |
| **Kundli** | Title, "Ascendant", "Planetary Positions", table headers, dignity labels |
| **Dashas** | Title, "Current Period", "Full Timeline", "elapsed", "remaining" |
| **Yogas** | Title, "Yogas found", "Doshas active", strength labels |
| **Transits** | Title, "Favorable", "Challenging", "Sade Sati" |
| **Compatibility** | Title, "Select Partners", "Ashtakoota Score", "Koota Breakdown" |
| **Nakshatra** | Title, "Characteristics", "Position Details" |
| **Divisional** | Title, "Select Varga Chart", chart descriptions |
| **Ashtakavarga** | Title, "BAV / SAV Matrix", "Strongest", "Weakest" |
| **KP** | Title, "Sub-Lord Table", table headers |
| **Remedies** | Title, type labels, "High priority", "Total remedies" |
| **Predictions** | Title, "Solar Return", "Varsha Lagna", "Muntha", "Year Lord" |
| **Jaimini** | Title, "Chara Karakas", "Arudha Padas", "Chara Dasha" |
| **Shadbala** | Title, table headers, strength labels |
| **Nadi** | Title, description |
| **Career** | Title, house labels |
| **Wealth** | Title, dhana yoga labels |
| **Health** | Title, medical astrology labels |

### Task 8: Translate 4 Matrix pages
| Page | Key strings to translate |
|---|---|
| **Matrix Chart** | Title, "Core Energies", "Life Purposes", "Talents", arcana labels stay English |
| **Matrix Health** | Title, "7-Chakra Matrix", chakra names (keep Sanskrit) |
| **Matrix Timeline** | Title, "Current Decade", "Decade Vertices", "Year-by-Year" |
| **Matrix Compat** | Title, "Select Profiles", "Harmony Score", "Dimension Scores" |

### Task 9: Translate Homepage
| Section | Strings |
|---|---|
| Hero | "Discover Your Cosmic Blueprint", subtitle, CTA buttons |
| Vedic section | "Ancient wisdom, cosmic precision", feature titles + descriptions |
| Matrix section | "Decode your life path", feature titles + descriptions |
| More tools | "Explore more tools", all tool labels |
| Footer | Privacy text, "Powered by…" |

### Task 10: Translate Settings page
| Section | Strings |
|---|---|
| Header | "Settings", "Customize your Astra experience" |
| Calculation | "Ayanamsa System", option labels |
| Display | "Chart Style", option labels |
| Accessibility | "Font Size", "Appearance", size labels, "Larger text is easier…" |
| Language | "Language" (new section) |
| Data | "Saved Profiles", "Activate", "Edit", "Delete", "No profiles…" |

---

## Locale-aware formatting

**Dates:** `now.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', ...)`
**Times:** `now.toLocaleTimeString(language === 'hi' ? 'hi-IN' : 'en-IN', ...)`

This gives us Hindi day names (रविवार), month names (नवम्बर), and Devanagari numerals automatically.

---

## What stays in English (NOT translated)

1. **Astrological proper nouns** — Planet names (Sun, Moon, Mars…), Rashi names (Aries, Taurus…), Nakshatra names — these are already Sanskrit-derived and universally recognized
2. **SEO `<SeoIntro>` text** — Stays English for Google indexation
3. **Metadata** (title tags, OG tags) — Stays English for SEO
4. **Technical labels** — "Lahiri", "KP", "Raman", "D1", "D9", "BAV", "SAV"
5. **Degree/coordinate notation** — "28.6139°N, 77.209°E"

---

## Execution Order & Dependencies

```
Task 1 (Context)  ──┐
Task 2 (Dicts en)  ──┤── Task 3 (useT hook)
Task 5 (Hindi font) ─┘         │
                                ├── Task 4 (Settings UI + Navbar toggle)
                                ├── Task 6 (Shared components)
                                ├── Task 7 (19 Vedic pages)
                                ├── Task 8 (4 Matrix pages)
                                ├── Task 9 (Homepage)
                                └── Task 10 (Settings page)
```

Tasks 6–10 are independent of each other and can be done in any order.

---

## Estimated effort

| Task | Complexity | Lines changed |
|---|---|---|
| 1. Language context | Small | ~30 |
| 2. Dictionary files | Large (translation work) | ~900 (2 files × 450 keys) |
| 3. useT hook | Small | ~25 |
| 4. Settings UI + toggle | Medium | ~60 |
| 5. Hindi font | Small | ~15 |
| 6. Shared components | Medium | ~100 |
| 7. 19 Vedic pages | Large | ~400 |
| 8. 4 Matrix pages | Medium | ~100 |
| 9. Homepage | Medium | ~80 |
| 10. Settings page | Small | ~40 |
| **Total** | | **~1,750 lines** |

---

## Testing checklist

- [ ] Toggle EN → हिन्दी → EN preserves state
- [ ] Hindi text renders correctly (Devanagari glyphs)
- [ ] Font size XL + Hindi doesn't overflow cards
- [ ] Light mode + Hindi contrast is readable
- [ ] Date/time formatting uses Hindi locale
- [ ] All 25 pages show Hindi strings
- [ ] Navbar, BottomTabs, CommandPalette show Hindi
- [ ] ProfileModal shows Hindi labels
- [ ] Empty states show Hindi descriptions
- [ ] Language persists across page reload (localStorage)
- [ ] Build succeeds with 0 TypeScript errors
