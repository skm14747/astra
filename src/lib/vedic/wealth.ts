import { RASHI_LORDS, RASHI_NAMES, TRIKONA_HOUSES } from './constants';
import { getPlanetDignity } from './core';
import { calculateInduLagna } from './lagnas';
import { calculateAshtakavarga } from './ashtakavarga';
import type { Planet, RashiIndex, KundliChart, WealthAnalysis } from './types';

export function analyzeWealth(chart: KundliChart): WealthAnalysis {
  const h2 = chart.houses.find(h => h.house === 2)!;
  const h11 = chart.houses.find(h => h.house === 11)!;
  const secondLord = h2.lord;
  const eleventhLord = h11.lord;

  const induLagna = calculateInduLagna(chart.ascendant.rashi, chart.planets.Moon.rashi);

  // Detect Dhana Yogas
  const dhanaYogas: string[] = [];
  const trikonaLords = [1, 5, 9].map(h => chart.houses.find(x => x.house === h)?.lord ?? '');
  const wealthLords = [secondLord, eleventhLord];

  for (const tl of trikonaLords) {
    for (const wl of wealthLords) {
      if (tl === wl) continue;
      const tlHouse = chart.planets[tl as Planet]?.house;
      const wlHouse = chart.planets[wl as Planet]?.house;
      if (tlHouse === wlHouse) {
        dhanaYogas.push(`${tl} + ${wl} conjoin in house ${tlHouse}`);
      }
    }
  }

  // Jupiter in 2nd or 11th
  const jupH = chart.planets.Jupiter.house;
  if (jupH === 2 || jupH === 11) {
    const jupDig = getPlanetDignity('Jupiter', chart.planets.Jupiter.rashi);
    if (jupDig === 'exalted' || jupDig === 'own') {
      dhanaYogas.push(`Jupiter in ${jupH}th in ${jupDig} sign`);
    }
  }

  const { sav } = calculateAshtakavarga(chart);
  const savSecond = sav[chart.houses.find(h => h.house === 2)?.rashi ?? 0] ?? 0;
  const savEleventh = sav[chart.houses.find(h => h.house === 11)?.rashi ?? 0] ?? 0;

  return {
    secondLord,
    eleventhLord,
    induLagna,
    dhanaYogas,
    savSecondHouse: savSecond,
    savEleventhHouse: savEleventh,
  };
}
