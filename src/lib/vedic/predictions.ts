import { getTropicalSunLongitude } from '../astronomy/engine';
import { getAyanamsa, toSidereal } from '../astronomy/ayanamsa';
import { calculateAscendant, generateKundli } from './core';
import { RASHI_NAMES, RASHI_LORDS, MS_PER_DAY, MS_PER_YEAR } from './constants';
import type { RashiIndex, KundliChart, VarshaphalData, AyanamsaSystem, Observer } from './types';

function norm360(v: number): number {
  return ((v % 360) + 360) % 360;
}

export function findSolarReturn(natalSunLon: number, year: number, observer: Observer, system: AyanamsaSystem = 'lahiri'): Date {
  const approxDate = new Date(year, 0, 1);
  let bestDate = approxDate;
  let bestDiff = 999;

  // Binary search for solar return
  let lo = new Date(year, 0, 1).getTime();
  let hi = new Date(year, 11, 31).getTime();

  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2;
    const midDate = new Date(mid);
    const ayan = getAyanamsa(midDate, system);
    const sunTrop = getTropicalSunLongitude(midDate);
    const sunSid = toSidereal(sunTrop, ayan);
    let diff = sunSid - natalSunLon;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    if (Math.abs(diff) < bestDiff) {
      bestDiff = Math.abs(diff);
      bestDate = midDate;
    }
    if (diff > 0) hi = mid;
    else lo = mid;
  }
  return bestDate;
}

export function calculateMuntha(lagnaRashi: number, age: number): { rashi: RashiIndex; rashiName: string; lord: string } {
  const r = ((lagnaRashi + age) % 12) as RashiIndex;
  return { rashi: r, rashiName: RASHI_NAMES[r], lord: RASHI_LORDS[r] };
}

export function calculateVarshaphal(chart: KundliChart, targetYear: number): VarshaphalData {
  const natalSunSid = chart.planets.Sun.siderealLongitude;
  const solarReturnDate = findSolarReturn(natalSunSid, targetYear, chart.birthData.observer, chart.ayanamsaSystem);

  const ayan = getAyanamsa(solarReturnDate, chart.ayanamsaSystem);
  const tropAsc = calculateAscendant(solarReturnDate, chart.birthData.observer);
  const sidAsc = toSidereal(tropAsc, ayan);
  const varshaLagna = Math.floor(sidAsc / 30) as RashiIndex;

  const age = targetYear - chart.birthData.date.getFullYear();
  const muntha = calculateMuntha(chart.ascendant.rashi, age);

  // Year lord (simplified: lord of the day of the week of solar return)
  const dayOfWeek = solarReturnDate.getDay();
  const dayLords = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const yearLord = dayLords[dayOfWeek];

  return {
    year: targetYear,
    solarReturnDate,
    varshaLagna,
    muntha: muntha.rashi,
    munthaLord: muntha.lord,
    yearLord,
  };
}

// Sahams (sensitive points)
export function calculatePunyaSaham(sunLon: number, moonLon: number, ascLon: number, isDaytime: boolean): number {
  if (isDaytime) return norm360(moonLon - sunLon + ascLon);
  return norm360(sunLon - moonLon + ascLon);
}

// Prashna Kundli (Horary chart)
export function generatePrashnaKundli(questionDate: Date, observer: Observer, system: AyanamsaSystem = 'lahiri'): KundliChart {
  return generateKundli({ date: questionDate, observer }, system);
}

/* ── #209 Annual Planetary Return (generalized) ── */
export function findPlanetaryReturn(
  getPlanetLon: (date: Date) => number,
  natalLon: number,
  searchYear: number,
  ayanamsaFn: (d: Date) => number
): Date | null {
  let lo = new Date(searchYear, 0, 1).getTime();
  let hi = new Date(searchYear, 11, 31).getTime();
  let best: Date | null = null;
  let bestDiff = 999;

  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2;
    const midDate = new Date(mid);
    const ayan = ayanamsaFn(midDate);
    const trop = getPlanetLon(midDate);
    const sid = norm360(trop - ayan);
    let diff = sid - natalLon;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    if (Math.abs(diff) < bestDiff) {
      bestDiff = Math.abs(diff);
      best = midDate;
    }
    if (Math.abs(diff) < 0.01) return midDate;
    if (diff > 0) hi = mid; else lo = mid;
  }
  return best;
}

/* ── #211 Extended Horary Analysis ── */
export interface HoraryAnalysis {
  lagnaSign: string;
  moonSign: string;
  moonNakshatra: string;
  moonStrength: string;
  seventhHouseIndicator: string;
  horaRuler: string;
  quickAnswer: string;
}

export function analyzeHorary(chart: KundliChart): HoraryAnalysis {
  const moonPos = chart.planets.Moon;
  const h7 = chart.houses.find(h => h.house === 7);
  const dayOfWeek = chart.birthData.date.getDay();
  const dayLords = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const horaRuler = dayLords[dayOfWeek];

  const moonStrong = moonPos.speed > 12;
  const quickAnswer = moonStrong
    ? 'Moon is fast — matter will resolve quickly'
    : 'Moon is slow — matter will take time';

  return {
    lagnaSign: chart.ascendant.rashiName,
    moonSign: moonPos.rashiName,
    moonNakshatra: moonPos.nakshatraName,
    moonStrength: moonStrong ? 'Strong (fast)' : 'Weak (slow)',
    seventhHouseIndicator: h7 ? `${h7.lord} in ${RASHI_NAMES[h7.rashi]}` : '',
    horaRuler,
    quickAnswer,
  };
}

/* ── #213 Transit-Dasha Correlation Engine ── */
export function calculateEventManifestationScore(
  transitPlanetHouses: Record<string, number>,
  dashaLord: string,
  antarLord: string | null,
  natalMoonRashi: number
): { score: number; analysis: string } {
  let score = 50;
  const notes: string[] = [];

  // Transit of Dasha lord
  const dashaTransitHouse = transitPlanetHouses[dashaLord];
  if (dashaTransitHouse !== undefined) {
    if ([1, 4, 7, 10].includes(dashaTransitHouse)) { score += 20; notes.push(`${dashaLord} transiting Kendra (house ${dashaTransitHouse})`); }
    else if ([5, 9].includes(dashaTransitHouse)) { score += 15; notes.push(`${dashaLord} transiting Trikona`); }
    else if ([6, 8, 12].includes(dashaTransitHouse)) { score -= 10; notes.push(`${dashaLord} transiting Dusthana`); }
  }

  // Antar lord transit
  if (antarLord && transitPlanetHouses[antarLord] !== undefined) {
    const aH = transitPlanetHouses[antarLord];
    if ([1, 5, 9, 10].includes(aH)) { score += 10; notes.push(`${antarLord} (Antar) in favorable transit`); }
  }

  // Jupiter in good house
  const jupH = transitPlanetHouses['Jupiter'];
  if (jupH && [2, 5, 7, 9, 11].includes(jupH)) { score += 10; notes.push('Jupiter in favorable transit'); }

  return { score: Math.max(0, Math.min(100, score)), analysis: notes.join('; ') || 'Neutral transit period' };
}

/* ── #214 Event Timing via Divisional Charts ── */
export interface DivisionalEventTiming {
  chart: string;
  eventType: string;
  relevantHouses: number[];
  activatingDashaLords: string[];
}

export function getEventTimingFromDivisionals(chart: KundliChart): DivisionalEventTiming[] {
  const timings: DivisionalEventTiming[] = [];

  // D9 for marriage
  const h7Lord = chart.houses.find(h => h.house === 7)?.lord ?? '';
  timings.push({ chart: 'D9 (Navamsa)', eventType: 'Marriage', relevantHouses: [1, 7], activatingDashaLords: [h7Lord, 'Venus'] });

  // D10 for career
  const h10Lord = chart.houses.find(h => h.house === 10)?.lord ?? '';
  timings.push({ chart: 'D10 (Dasamsa)', eventType: 'Career change', relevantHouses: [1, 10], activatingDashaLords: [h10Lord, 'Saturn'] });

  // D4 for property
  const h4Lord = chart.houses.find(h => h.house === 4)?.lord ?? '';
  timings.push({ chart: 'D4 (Chaturthamsa)', eventType: 'Property/Vehicle', relevantHouses: [1, 4], activatingDashaLords: [h4Lord, 'Mars'] });

  // D7 for children
  const h5Lord = chart.houses.find(h => h.house === 5)?.lord ?? '';
  timings.push({ chart: 'D7 (Saptamsa)', eventType: 'Children', relevantHouses: [1, 5], activatingDashaLords: [h5Lord, 'Jupiter'] });

  return timings;
}
