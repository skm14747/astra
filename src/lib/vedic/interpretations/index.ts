import type { Planet, Dignity, Lang } from '../types';

// ── English sources ──
import { getPlanetInSignText as getPlanetInSignTextEn } from './planet-in-sign';
import { getPlanetInHouseText as getPlanetInHouseTextEn, HOUSE_AREAS } from './planet-in-house';
export { HOUSE_AREAS };
import { getNakshatraProfile as getNakshatraProfileEn, NAKSHATRA_PROFILES } from './nakshatra-text';
export { NAKSHATRA_PROFILES };
export type { NakshatraProfile } from './nakshatra-text';
import {
  getDignityText as getDignityTextEn, DIGNITY_TEXT,
  RETRO_TEXT, COMBUST_TEXT, ASPECT_RECEIVED,
  getConjunctionText as getConjunctionTextEn,
} from './dignity-text';
export { DIGNITY_TEXT };
import { getMahadashaNarrative as getMahadashaNarrativeEn, MAHADASHA_TEXTS } from './dasha-text';
export { MAHADASHA_TEXTS };
export type { MahadashaNarrative } from './dasha-text';
import {
  generateCareerReading as generateCareerReadingEn,
  generateMarriageReading as generateMarriageReadingEn,
  generateWealthReading as generateWealthReadingEn,
  generateHealthReading as generateHealthReadingEn,
  generateSpiritualReading as generateSpiritualReadingEn,
} from './life-areas';
export type { CareerReading, MarriageReading, WealthReading, HealthReading, SpiritualReading } from './life-areas';

// ── Hindi sources ──
import {
  ALL_PLANETS_HI,
  DIGNITY_TEXT_HI, RETRO_TEXT_HI, COMBUST_TEXT_HI, ASPECT_RECEIVED_HI,
  getConjunctionTextHi, HOUSE_AREAS_HI, ordinalHi, houseAreaHi, planetNameHi,
} from './hi';
import {
  generateCareerReadingHi, generateMarriageReadingHi,
  generateWealthReadingHi, generateHealthReadingHi,
  generateSpiritualReadingHi,
} from './life-areas-hi';

// ── Nepali sources ──
import {
  ALL_PLANETS_NE,
  DIGNITY_TEXT_NE, RETRO_TEXT_NE, COMBUST_TEXT_NE, ASPECT_RECEIVED_NE,
  HOUSE_AREA_MAP_NE, ordinalNe, houseAreaNe, planetNameNe,
} from './ne';
import {
  generateCareerReadingNe, generateMarriageReadingNe,
  generateWealthReadingNe, generateHealthReadingNe,
  generateSpiritualReadingNe,
} from './life-areas-ne';

// ── Portuguese sources ──
import {
  ALL_PLANETS_PT,
  DIGNITY_TEXT_PT, RETRO_TEXT_PT, COMBUST_TEXT_PT, ASPECT_RECEIVED_PT,
  HOUSE_AREA_MAP_PT, ordinalPt, houseAreaPt, planetNamePt,
} from './pt';
import {
  generateCareerReadingPt, generateMarriageReadingPt,
  generateWealthReadingPt, generateHealthReadingPt,
  generateSpiritualReadingPt,
} from './life-areas-pt';

// ── Spanish sources ──
import {
  ALL_PLANETS_ES,
  DIGNITY_TEXT_ES, RETRO_TEXT_ES, COMBUST_TEXT_ES, ASPECT_RECEIVED_ES,
  HOUSE_AREA_MAP_ES, ordinalEs, houseAreaEs, planetNameEs,
} from './es';
import {
  generateCareerReadingEs, generateMarriageReadingEs,
  generateWealthReadingEs, generateHealthReadingEs,
  generateSpiritualReadingEs,
} from './life-areas-es';

// ══════════════════════════════════════════════════
// Language-aware API
// ══════════════════════════════════════════════════

export function getPlanetInSignText(planet: Planet, sign: string, lang: Lang = 'en') {
  const lookup = (tables: Record<string, Record<string, [string, string, string]>>) => {
    const table = tables[planet];
    if (table) {
      const entry = table[sign];
      if (entry) return { positive: entry[0], challenges: entry[1], nature: entry[2] };
    }
    return null;
  };
  if (lang === 'hi') return lookup(ALL_PLANETS_HI) ?? getPlanetInSignTextEn(planet, sign);
  if (lang === 'ne') return lookup(ALL_PLANETS_NE) ?? lookup(ALL_PLANETS_HI) ?? getPlanetInSignTextEn(planet, sign);
  if (lang === 'pt') return lookup(ALL_PLANETS_PT) ?? getPlanetInSignTextEn(planet, sign);
  if (lang === 'es') return lookup(ALL_PLANETS_ES) ?? getPlanetInSignTextEn(planet, sign);
  return getPlanetInSignTextEn(planet, sign);
}

export function getPlanetInHouseText(planet: Planet, house: number, lang: Lang = 'en') {
  const en = getPlanetInHouseTextEn(planet, house);
  if (lang === 'hi') return { ...en, area: (HOUSE_AREAS_HI[house - 1] || '') as string };
  if (lang === 'ne') return { ...en, area: HOUSE_AREA_MAP_NE[house - 1] || en.area };
  if (lang === 'pt') return { ...en, area: HOUSE_AREA_MAP_PT[house - 1] || en.area };
  if (lang === 'es') return { ...en, area: HOUSE_AREA_MAP_ES[house - 1] || en.area };
  return en;
}

export function getDignityText(d: Dignity, lang: Lang = 'en') {
  if (lang === 'hi') return DIGNITY_TEXT_HI[d];
  if (lang === 'ne') return DIGNITY_TEXT_NE[d];
  if (lang === 'pt') return DIGNITY_TEXT_PT[d];
  if (lang === 'es') return DIGNITY_TEXT_ES[d];
  return getDignityTextEn(d);
}

export function getRetroText(lang: Lang = 'en') {
  if (lang === 'hi') return RETRO_TEXT_HI;
  if (lang === 'ne') return RETRO_TEXT_NE;
  if (lang === 'pt') return RETRO_TEXT_PT;
  if (lang === 'es') return RETRO_TEXT_ES;
  return RETRO_TEXT;
}

export function getCombustText(lang: Lang = 'en') {
  if (lang === 'hi') return COMBUST_TEXT_HI;
  if (lang === 'ne') return COMBUST_TEXT_NE;
  if (lang === 'pt') return COMBUST_TEXT_PT;
  if (lang === 'es') return COMBUST_TEXT_ES;
  return COMBUST_TEXT;
}

export function getAspectReceived(planet: string, lang: Lang = 'en') {
  if (lang === 'hi') return ASPECT_RECEIVED_HI[planet] || '';
  if (lang === 'ne') return ASPECT_RECEIVED_NE[planet] || '';
  if (lang === 'pt') return ASPECT_RECEIVED_PT[planet] || '';
  if (lang === 'es') return ASPECT_RECEIVED_ES[planet] || '';
  return ASPECT_RECEIVED[planet] || '';
}

export function getConjunctionText(p1: Planet, p2: Planet, lang: Lang = 'en') {
  if (lang === 'hi') return getConjunctionTextHi(p1, p2);
  // ne, pt, es: fall back to English (conjunction texts are complex; shared Vedic terms work)
  return getConjunctionTextEn(p1, p2);
}

export function getNakshatraProfile(index: number, _lang: Lang = 'en') {
  // Nakshatra profiles stay English for now (Sanskrit terms are universal)
  return getNakshatraProfileEn(index);
}

export function getMahadashaNarrative(planet: string, _lang: Lang = 'en') {
  // Dasha narratives stay English for now
  return getMahadashaNarrativeEn(planet);
}

export function generateCareerReading(chart: Parameters<typeof generateCareerReadingEn>[0], lang: Lang = 'en') {
  if (lang === 'hi') return generateCareerReadingHi(chart);
  if (lang === 'ne') return generateCareerReadingNe(chart);
  if (lang === 'pt') return generateCareerReadingPt(chart);
  if (lang === 'es') return generateCareerReadingEs(chart);
  return generateCareerReadingEn(chart);
}

export function generateMarriageReading(chart: Parameters<typeof generateMarriageReadingEn>[0], lang: Lang = 'en') {
  if (lang === 'hi') return generateMarriageReadingHi(chart);
  if (lang === 'ne') return generateMarriageReadingNe(chart);
  if (lang === 'pt') return generateMarriageReadingPt(chart);
  if (lang === 'es') return generateMarriageReadingEs(chart);
  return generateMarriageReadingEn(chart);
}

export function generateWealthReading(chart: Parameters<typeof generateWealthReadingEn>[0], lang: Lang = 'en') {
  if (lang === 'hi') return generateWealthReadingHi(chart);
  if (lang === 'ne') return generateWealthReadingNe(chart);
  if (lang === 'pt') return generateWealthReadingPt(chart);
  if (lang === 'es') return generateWealthReadingEs(chart);
  return generateWealthReadingEn(chart);
}

export function generateHealthReading(chart: Parameters<typeof generateHealthReadingEn>[0], lang: Lang = 'en') {
  if (lang === 'hi') return generateHealthReadingHi(chart);
  if (lang === 'ne') return generateHealthReadingNe(chart);
  if (lang === 'pt') return generateHealthReadingPt(chart);
  if (lang === 'es') return generateHealthReadingEs(chart);
  return generateHealthReadingEn(chart);
}

export function generateSpiritualReading(chart: Parameters<typeof generateSpiritualReadingEn>[0], lang: Lang = 'en') {
  if (lang === 'hi') return generateSpiritualReadingHi(chart);
  if (lang === 'ne') return generateSpiritualReadingNe(chart);
  if (lang === 'pt') return generateSpiritualReadingPt(chart);
  if (lang === 'es') return generateSpiritualReadingEs(chart);
  return generateSpiritualReadingEn(chart);
}

// Re-export English constants for backward compatibility
export { RETRO_TEXT, COMBUST_TEXT, ASPECT_RECEIVED };

// Language helpers for report.ts
export { ordinalHi, houseAreaHi, planetNameHi, SIGN_NAME_HI, PLANET_NAME_HI } from './hi';
export { ordinalNe, houseAreaNe, planetNameNe, SIGN_NAME_NE, PLANET_NAME_NE } from './ne';
export { ordinalPt, houseAreaPt, planetNamePt, SIGN_NAME_PT, PLANET_NAME_PT } from './pt';
export { ordinalEs, houseAreaEs, planetNameEs, SIGN_NAME_ES, PLANET_NAME_ES } from './es';
