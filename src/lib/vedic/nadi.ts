import { RASHI_NAMES, RASHI_LORDS, NAKSHATRA_SPAN } from './constants';
import { getSunrise } from '../astronomy/engine';
import { calculateAscendant } from './core';
import { getAyanamsa, toSidereal } from '../astronomy/ayanamsa';
import type { Planet, RashiIndex, KundliChart, NadiPoint, Observer, AyanamsaSystem } from './types';

function norm360(v: number): number {
  return ((v % 360) + 360) % 360;
}

function makeNadiPoint(name: string, lon: number, desc: string): NadiPoint {
  const n = norm360(lon);
  const r = Math.floor(n / 30) as RashiIndex;
  return { name, longitude: n, rashi: r, rashiName: RASHI_NAMES[r], description: desc };
}

// Bhrigu Bindu = midpoint of forward arc from Rahu to Moon
export function calculateBhriguBindu(rahuLon: number, moonLon: number): NadiPoint {
  // Convention A (forward arc): measure from Rahu forward through signs to Moon
  const forwardArc = ((moonLon - rahuLon) % 360 + 360) % 360;
  const mid = norm360(rahuLon + forwardArc / 2);
  return makeNadiPoint('Bhrigu Bindu', mid, 'Transit of Jupiter/Saturn over this point triggers major events');
}

// Pranapada Lagna
export function calculatePranapada(sunSiderealLon: number, elapsedMinutes: number): NadiPoint {
  const sunRashi = Math.floor(sunSiderealLon / 30);
  const MOVABLE = [0, 3, 6, 9];
  const FIXED = [1, 4, 7, 10];

  let ppBase: number;
  if (MOVABLE.includes(sunRashi)) ppBase = sunSiderealLon;
  else if (FIXED.includes(sunRashi)) ppBase = norm360(sunSiderealLon + 240);
  else ppBase = norm360(sunSiderealLon + 120);

  const elapsedVighatis = (elapsedMinutes / 24) * 60;
  const lon = norm360(ppBase + elapsedVighatis * 0.4);
  return makeNadiPoint('Pranapada Lagna', lon, 'Life force indicator from Sun sign-type');
}

// Gulika position: ascendant at start of Gulika Kalam
export function calculateGulika(chart: KundliChart): NadiPoint {
  const { date, observer } = chart.birthData;
  const sunrise = getSunrise(date, observer);
  if (!sunrise) return makeNadiPoint('Gulika', 0, 'Could not calculate — no sunrise data');

  const GULIKA_PORTIONS = [7, 6, 5, 4, 3, 2, 1];
  const vara = date.getDay();
  const sunset = new Date(sunrise.getTime() + 12 * 3600000); // approximate
  const portionMs = (sunset.getTime() - sunrise.getTime()) / 8;
  const gulikaStart = new Date(sunrise.getTime() + (GULIKA_PORTIONS[vara] - 1) * portionMs);

  const ayan = getAyanamsa(gulikaStart, chart.ayanamsaSystem);
  const tropAsc = calculateAscendant(gulikaStart, observer);
  const sidAsc = toSidereal(tropAsc, ayan);
  return makeNadiPoint('Gulika', sidAsc, 'Saturn\'s upagraha — malefic shadow point');
}

// Mandi = same calculation framework as Gulika but at end of Gulika period
export function calculateMandi(chart: KundliChart): NadiPoint {
  const { date, observer } = chart.birthData;
  const sunrise = getSunrise(date, observer);
  if (!sunrise) return makeNadiPoint('Mandi', 0, 'Could not calculate — no sunrise data');

  const GULIKA_PORTIONS = [7, 6, 5, 4, 3, 2, 1];
  const vara = date.getDay();
  const sunset = new Date(sunrise.getTime() + 12 * 3600000);
  const portionMs = (sunset.getTime() - sunrise.getTime()) / 8;
  const mandiTime = new Date(sunrise.getTime() + GULIKA_PORTIONS[vara] * portionMs);

  const ayan = getAyanamsa(mandiTime, chart.ayanamsaSystem);
  const tropAsc = calculateAscendant(mandiTime, observer);
  const sidAsc = toSidereal(tropAsc, ayan);
  return makeNadiPoint('Mandi', sidAsc, 'Sub-point within Gulika duration');
}

// Nadi Amsha (D150 level)
export function calculateNadiAmsha(siderealLon: number): { division: number; deityGroup: string } {
  const division = Math.floor((siderealLon % 30) / 0.2) + 1; // 150 divisions per sign
  const groups = ['Deva', 'Nara', 'Rakshasa'];
  return { division: Math.min(150, division), deityGroup: groups[(division - 1) % 3] };
}

// Bhrigu Nandi Nadi: pair-wise reading
export function getBhriguNandiReading(planet1: Planet, planet2: Planet, houseDiff: number): string {
  const pairKey = `${planet1}-${planet2}`;
  const genericReadings: Record<number, string> = {
    1: 'Mutual strengthening of significations',
    2: 'Financial connection between the two significations',
    3: 'Effort and initiative link',
    4: 'Comfort and property connection',
    5: 'Creative and intellectual link',
    6: 'Service and health connection',
    7: 'Partnership and opposition dynamic',
    8: 'Transformative and hidden connection',
    9: 'Fortune and dharma link',
    10: 'Career and status connection',
    11: 'Gains and fulfillment link',
    12: 'Loss, expense, or spiritual connection',
  };
  return genericReadings[houseDiff] ?? 'Neutral relationship';
}

export function getAllNadiPoints(chart: KundliChart): NadiPoint[] {
  const rahuLon = chart.planets.Rahu.siderealLongitude;
  const moonLon = chart.planets.Moon.siderealLongitude;
  const sunLon = chart.planets.Sun.siderealLongitude;

  const sunrise = getSunrise(chart.birthData.date, chart.birthData.observer);
  let elapsed = 0;
  if (sunrise) {
    elapsed = (chart.birthData.date.getTime() - sunrise.getTime()) / 60000;
    if (elapsed < 0) elapsed = 0;
  }

  return [
    calculateBhriguBindu(rahuLon, moonLon),
    calculatePranapada(sunLon, elapsed),
    calculateGulika(chart),
    calculateMandi(chart),
  ];
}
