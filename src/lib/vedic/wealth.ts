/**
 * Wealth & Financial Analysis — 7 algorithms (#186-#194)
 */
import { RASHI_NAMES, RASHI_LORDS, TRIKONA_HOUSES } from './constants';
import { getPlanetDignity } from './core';
import { calculateInduLagna } from './lagnas';
import { calculateAshtakavarga } from './ashtakavarga';
import { getAllVargas } from './vargas';
import type { Planet, GrahaPlanet, RashiIndex, KundliChart } from './types';

export interface WealthAnalysis {
  secondLord: string;
  eleventhLord: string;
  induLagna: RashiIndex;
  dhanaYogas: string[];
  savSecondHouse: number;
  savEleventhHouse: number;
  horaAnalysis: { leoCount: number; cancerCount: number; selfEarned: boolean };
  secondHouseDetail: { lord: string; lordHouse: number; planets: Planet[]; bav: number };
  fifthHouseSpeculation: { lord: string; planets: Planet[]; hasJupiterVenus: boolean; potential: string };
  ninthHouseFortune: { lord: string; lordDignity: string; strength: string };
  eleventhHouseGains: { lord: string; planets: Planet[]; incomeStreams: number };
  ashtakavargaWealth: { jupiterBAVin2: number; venusBAVin2: number; jupiterBAVin11: number };
  wealthTimingLords: string[];
}

export function analyzeWealth(chart: KundliChart): WealthAnalysis {
  const h2 = chart.houses.find(h => h.house === 2)!;
  const h11 = chart.houses.find(h => h.house === 11)!;
  const secondLord = h2.lord;
  const eleventhLord = h11.lord;

  const induLagna = calculateInduLagna(chart.ascendant.rashi, chart.planets.Moon.rashi);

  // Dhana Yogas
  const dhanaYogas: string[] = [];
  const trikonaLords = [1, 5, 9].map(h => chart.houses.find(x => x.house === h)?.lord ?? '');
  const wealthLords = [secondLord, eleventhLord];
  for (const tl of trikonaLords) {
    for (const wl of wealthLords) {
      if (tl === wl) continue;
      const tlH = chart.planets[tl as Planet]?.house;
      const wlH = chart.planets[wl as Planet]?.house;
      if (tlH === wlH) dhanaYogas.push(`${tl} + ${wl} conjoin in house ${tlH}`);
    }
  }
  const jupH = chart.planets.Jupiter.house;
  if (jupH === 2 || jupH === 11) {
    const jupDig = getPlanetDignity('Jupiter', chart.planets.Jupiter.rashi);
    if (jupDig === 'exalted' || jupDig === 'own') dhanaYogas.push(`Jupiter in ${jupH}th in ${jupDig} sign`);
  }

  const { bav, sav } = calculateAshtakavarga(chart);
  const savSecond = sav[h2.rashi] ?? 0;
  const savEleventh = sav[h11.rashi] ?? 0;

  // #186 D2 Hora analysis
  const vargas = getAllVargas(chart.ascendant.longitude, chart.planets);
  const d2 = vargas['d2'];
  let leoCount = 0, cancerCount = 0;
  if (d2) {
    const grahas: GrahaPlanet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
    for (const g of grahas) {
      if (d2.planets[g].rashi === 4) leoCount++; // Leo = self-earned
      if (d2.planets[g].rashi === 3) cancerCount++; // Cancer = inherited
    }
  }
  const horaAnalysis = { leoCount, cancerCount, selfEarned: leoCount >= cancerCount };

  // #187 2nd house detail
  const secondLordHouse = chart.planets[secondLord as Planet]?.house ?? 0;
  const secondHouseDetail = {
    lord: secondLord,
    lordHouse: secondLordHouse,
    planets: h2.planets as Planet[],
    bav: savSecond,
  };

  // #188 5th house speculation
  const h5 = chart.houses.find(h => h.house === 5)!;
  const hasJupVenus = h5.planets.includes('Jupiter') || h5.planets.includes('Venus');
  const fifthHouseSpeculation = {
    lord: h5.lord,
    planets: h5.planets as Planet[],
    hasJupiterVenus: hasJupVenus,
    potential: hasJupVenus ? 'Favorable for speculation' : h5.planets.length > 0 ? 'Moderate' : 'Low',
  };

  // #189 9th house fortune
  const h9 = chart.houses.find(h => h.house === 9)!;
  const h9Lord = h9.lord as Planet;
  const h9Dig = getPlanetDignity(h9Lord, chart.planets[h9Lord]?.rashi ?? 0);
  const h9SAV = sav[h9.rashi] ?? 0;
  const ninthHouseFortune = {
    lord: h9.lord,
    lordDignity: h9Dig,
    strength: h9SAV >= 28 ? 'Strong Fortune' : h9SAV >= 25 ? 'Average Fortune' : 'Weak Fortune',
  };

  // #190 11th house gains
  const eleventhHouseGains = {
    lord: eleventhLord,
    planets: h11.planets as Planet[],
    incomeStreams: Math.max(1, h11.planets.length),
  };

  // #193 Ashtakavarga wealth indicators
  const jupBAV2 = bav.Jupiter?.[h2.rashi] ?? 0;
  const venBAV2 = bav.Venus?.[h2.rashi] ?? 0;
  const jupBAV11 = bav.Jupiter?.[h11.rashi] ?? 0;

  // #194 Wealth timing lords
  const wealthTimingLords = [secondLord, eleventhLord, h9.lord, 'Jupiter', 'Venus']
    .filter((v, i, a) => a.indexOf(v) === i);

  return {
    secondLord, eleventhLord, induLagna, dhanaYogas,
    savSecondHouse: savSecond, savEleventhHouse: savEleventh,
    horaAnalysis, secondHouseDetail, fifthHouseSpeculation,
    ninthHouseFortune, eleventhHouseGains,
    ashtakavargaWealth: { jupiterBAVin2: jupBAV2, venusBAVin2: venBAV2, jupiterBAVin11: jupBAV11 },
    wealthTimingLords,
  };
}
