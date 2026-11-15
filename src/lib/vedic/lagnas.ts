import { RASHI_NAMES, RASHI_LORDS, INDU_KALAS } from './constants';
import type { Planet, RashiIndex, KundliChart, SpecialLagna, ArudhaPada, Observer } from './types';
import { getSunrise } from '../astronomy/engine';

function norm360(v: number): number {
  return ((v % 360) + 360) % 360;
}

function getRashi(lon: number): RashiIndex {
  return Math.floor(norm360(lon) / 30) as RashiIndex;
}

function elapsedMinutesFromSunrise(date: Date, observer: Observer): number {
  const sunrise = getSunrise(date, observer);
  if (!sunrise) return 0;
  let elapsed = (date.getTime() - sunrise.getTime()) / 60000;
  if (elapsed < 0) {
    const prevDay = new Date(date.getTime() - 86400000);
    const prevSunrise = getSunrise(prevDay, observer);
    if (prevSunrise) elapsed = (date.getTime() - prevSunrise.getTime()) / 60000;
  }
  return elapsed;
}

export function calculateHoraLagna(sunSiderealLon: number, elapsedMin: number): number {
  return norm360(sunSiderealLon + elapsedMin * 0.5);
}

export function calculateGhatiLagna(sunSiderealLon: number, elapsedMin: number): number {
  return norm360(sunSiderealLon + elapsedMin * 1.25);
}

export function calculateBhavaLagna(sunSiderealLon: number, elapsedMin: number): number {
  return norm360(sunSiderealLon + elapsedMin * 0.25);
}

export function calculateInduLagna(
  lagnaRashi: RashiIndex,
  moonRashi: RashiIndex
): RashiIndex {
  const ninth9Lagna = ((lagnaRashi + 8) % 12) as RashiIndex;
  const ninth9Moon = ((moonRashi + 8) % 12) as RashiIndex;
  const lord9Lagna = RASHI_LORDS[ninth9Lagna];
  const lord9Moon = RASHI_LORDS[ninth9Moon];
  const totalKalas = (INDU_KALAS[lord9Lagna] ?? 0) + (INDU_KALAS[lord9Moon] ?? 0);
  let remainder = totalKalas % 12;
  if (remainder === 0) remainder = 12;
  return ((moonRashi + remainder - 1) % 12) as RashiIndex;
}

export function calculateArudhaPada(
  houseNum: number,
  lagnaRashi: RashiIndex,
  planets: Record<Planet, { rashi: RashiIndex }>
): ArudhaPada {
  const houseSign = ((lagnaRashi + houseNum - 1) % 12) as RashiIndex;
  const lordName = RASHI_LORDS[houseSign];
  const lordPlanet = lordName as Planet;
  const lordSign = planets[lordPlanet]?.rashi ?? 0;
  const distance = ((lordSign - houseSign + 12) % 12) + 1;
  let padaSign = ((lordSign + distance - 1) % 12) as RashiIndex;

  const relFromHouse = ((padaSign - houseSign + 12) % 12) + 1;
  let exceptionApplied = false;
  if (relFromHouse === 1 || relFromHouse === 7) {
    padaSign = ((padaSign + 9) % 12) as RashiIndex;
    exceptionApplied = true;
  }

  return {
    house: houseNum,
    padaRashi: padaSign,
    padaRashiName: RASHI_NAMES[padaSign],
    lord: lordName,
    exceptionApplied,
  };
}

function makeLagna(name: string, lon: number, desc: string): SpecialLagna {
  const r = getRashi(lon);
  return {
    name,
    longitude: norm360(lon),
    rashi: r,
    rashiName: RASHI_NAMES[r],
    degree: Math.floor(norm360(lon) % 30),
    description: desc,
  };
}

export function calculateAllSpecialLagnas(chart: KundliChart): SpecialLagna[] {
  const { birthData, planets, ascendant } = chart;
  const sunLon = planets.Sun.siderealLongitude;
  const moonRashi = planets.Moon.rashi;
  const lagnaRashi = ascendant.rashi;
  const elapsed = elapsedMinutesFromSunrise(birthData.date, birthData.observer);

  const horaLon = calculateHoraLagna(sunLon, elapsed);
  const ghatiLon = calculateGhatiLagna(sunLon, elapsed);
  const bhavaLon = calculateBhavaLagna(sunLon, elapsed);
  const induRashi = calculateInduLagna(lagnaRashi, moonRashi);
  const induLon = induRashi * 30 + 15;

  const al = calculateArudhaPada(1, lagnaRashi, planets);
  const ul = calculateArudhaPada(12, lagnaRashi, planets);

  return [
    makeLagna('Hora Lagna', horaLon, 'Financial riches and prosperity'),
    makeLagna('Ghati Lagna', ghatiLon, 'Power, authority, and political influence'),
    makeLagna('Bhava Lagna', bhavaLon, 'Physical vitality and bodily strength'),
    makeLagna('Indu Lagna', induLon, 'Wealth potential and Dhana Yoga assessment'),
    makeLagna('Arudha Lagna (AL)', al.padaRashi * 30 + 15, 'Public perception and worldly status'),
    makeLagna('Upapada Lagna (UL)', ul.padaRashi * 30 + 15, 'Marriage, spouse heritage, and marital concord'),
  ];
}

export function calculateAllArudhaPadas(chart: KundliChart): ArudhaPada[] {
  const padas: ArudhaPada[] = [];
  for (let h = 1; h <= 12; h++) {
    padas.push(calculateArudhaPada(h, chart.ascendant.rashi, chart.planets));
  }
  return padas;
}
