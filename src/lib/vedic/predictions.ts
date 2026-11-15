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
