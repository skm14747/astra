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

// ══════════════════════════════════════════════════
// Language-aware API
// ══════════════════════════════════════════════════

export function getPlanetInSignText(planet: Planet, sign: string, lang: Lang = 'en') {
  if (lang === 'hi') {
    const table = ALL_PLANETS_HI[planet];
    if (table) {
      const entry = table[sign];
      if (entry) return { positive: entry[0], challenges: entry[1], nature: entry[2] };
    }
  }
  return getPlanetInSignTextEn(planet, sign);
}

export function getPlanetInHouseText(planet: Planet, house: number, lang: Lang = 'en') {
  if (lang === 'hi') {
    const area = (HOUSE_AREAS_HI[house - 1] || '') as string;
    // Fall back to English house text but with Hindi area
    const en = getPlanetInHouseTextEn(planet, house);
    return { ...en, area };
  }
  return getPlanetInHouseTextEn(planet, house);
}

export function getDignityText(d: Dignity, lang: Lang = 'en') {
  return lang === 'hi' ? DIGNITY_TEXT_HI[d] : getDignityTextEn(d);
}

export function getRetroText(lang: Lang = 'en') {
  return lang === 'hi' ? RETRO_TEXT_HI : RETRO_TEXT;
}

export function getCombustText(lang: Lang = 'en') {
  return lang === 'hi' ? COMBUST_TEXT_HI : COMBUST_TEXT;
}

export function getAspectReceived(planet: string, lang: Lang = 'en') {
  return lang === 'hi' ? (ASPECT_RECEIVED_HI[planet] || '') : (ASPECT_RECEIVED[planet] || '');
}

export function getConjunctionText(p1: Planet, p2: Planet, lang: Lang = 'en') {
  return lang === 'hi' ? getConjunctionTextHi(p1, p2) : getConjunctionTextEn(p1, p2);
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
  return lang === 'hi' ? generateCareerReadingHi(chart) : generateCareerReadingEn(chart);
}

export function generateMarriageReading(chart: Parameters<typeof generateMarriageReadingEn>[0], lang: Lang = 'en') {
  return lang === 'hi' ? generateMarriageReadingHi(chart) : generateMarriageReadingEn(chart);
}

export function generateWealthReading(chart: Parameters<typeof generateWealthReadingEn>[0], lang: Lang = 'en') {
  return lang === 'hi' ? generateWealthReadingHi(chart) : generateWealthReadingEn(chart);
}

export function generateHealthReading(chart: Parameters<typeof generateHealthReadingEn>[0], lang: Lang = 'en') {
  return lang === 'hi' ? generateHealthReadingHi(chart) : generateHealthReadingEn(chart);
}

export function generateSpiritualReading(chart: Parameters<typeof generateSpiritualReadingEn>[0], lang: Lang = 'en') {
  return lang === 'hi' ? generateSpiritualReadingHi(chart) : generateSpiritualReadingEn(chart);
}

// Re-export English constants for backward compatibility
export { RETRO_TEXT, COMBUST_TEXT, ASPECT_RECEIVED };

// Hindi helpers for report.ts
export { ordinalHi, houseAreaHi, planetNameHi } from './hi';
