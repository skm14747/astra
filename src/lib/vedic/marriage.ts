/**
 * Marriage & Relationship Depth — 5 algorithms (#167-#171)
 */
import { RASHI_NAMES, RASHI_LORDS } from './constants';
import { getPlanetDignity, getAspects } from './core';
import { getAllVargas } from './vargas';
import { calculateCharaKarakas } from './jaimini';
import { calculateArudhaPada } from './lagnas';
import { calculateAshtakavarga } from './ashtakavarga';
import type { Planet, GrahaPlanet, RashiIndex, KundliChart, Dignity } from './types';

const DK_SPOUSE_TRAITS: Record<string, string> = {
  Sun: 'Dignified, authoritative, proud',
  Moon: 'Nurturing, attractive, emotional',
  Mars: 'Energetic, ambitious, assertive',
  Mercury: 'Witty, intelligent, youthful',
  Jupiter: 'Virtuous, wise, cultured',
  Venus: 'Artistic, charming, romantic',
  Saturn: 'Mature, responsible, disciplined',
};

export interface MarriageAnalysis {
  navamsaCompat: {
    d9SeventhLord: string;
    d9VenusSign: string;
    d9VenusDignity: string;
    d9SeventhPlanets: string[];
  };
  seventhHouse: {
    lord: string;
    lordHouse: number;
    lordDignity: Dignity;
    planets: Planet[];
    sav: number;
    aspects: string[];
  };
  upapadaLagna: {
    sign: string;
    rashi: RashiIndex;
    planetsInUL: string[];
    interpretation: string;
  };
  darakaraka: {
    planet: Planet;
    degreeInSign: number;
    spouseTraits: string;
    dkSign: string;
    dkNavamsa: string;
  };
  marriageTiming: {
    seventhLord: string;
    timingDashaLords: string[];
    bestTransits: string[];
  };
}

export function analyzeMarriage(chart: KundliChart): MarriageAnalysis {
  const vargas = getAllVargas(chart.ascendant.longitude, chart.planets);
  const d9 = vargas['d9'];

  // #167 Navamsa compatibility
  const d9SeventhRashi = d9 ? ((d9.ascendantRashi + 6) % 12) as RashiIndex : 0 as RashiIndex;
  const d9SeventhLord = RASHI_LORDS[d9SeventhRashi];
  const d9VenusSign = d9?.planets.Venus.rashiName ?? RASHI_NAMES[chart.planets.Venus.rashi];
  const d9VenusDignity = d9 ? getPlanetDignity('Venus', d9.planets.Venus.rashi) : 'neutral';
  const d9SeventhPlanets: string[] = [];
  if (d9) {
    const allP: Planet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
    for (const p of allP) {
      if (d9.planets[p].rashi === d9SeventhRashi) d9SeventhPlanets.push(p);
    }
  }

  // #168 7th house analysis
  const h7 = chart.houses.find(h => h.house === 7)!;
  const h7Lord = h7.lord as Planet;
  const h7LordHouse = chart.planets[h7Lord]?.house ?? 0;
  const h7LordDignity = getPlanetDignity(h7Lord, chart.planets[h7Lord]?.rashi ?? 0);
  const { sav } = calculateAshtakavarga(chart);
  const h7SAV = sav[h7.rashi] ?? 0;
  const h7Aspects: string[] = [];
  const allPlanets: Planet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
  for (const p of allPlanets) {
    if (getAspects(p, chart.planets[p].house).includes(7)) h7Aspects.push(p);
  }

  // #169 Upapada Lagna (A12)
  const ul = calculateArudhaPada(12, chart.ascendant.rashi, chart.planets);
  const ulPlanets = allPlanets.filter(p => chart.planets[p].rashi === ul.padaRashi);
  const ulInterpretation = ulPlanets.length > 0
    ? `Planets in UL (${RASHI_NAMES[ul.padaRashi]}): ${ulPlanets.join(', ')} — indicates spouse qualities`
    : `UL in ${RASHI_NAMES[ul.padaRashi]} — spouse background from this sign`;

  // #170 Darakaraka analysis
  const karakas = calculateCharaKarakas(chart);
  const dk = karakas[6]; // Lowest degree = Darakaraka
  const dkSign = RASHI_NAMES[chart.planets[dk.planet].rashi];
  const dkNavamsa = d9?.planets[dk.planet].rashiName ?? dkSign;

  // #171 Marriage timing
  const timingLords = [h7.lord, 'Venus', d9SeventhLord].filter((v, i, a) => a.indexOf(v) === i);
  const bestTransits = [
    'Jupiter transiting 7th from Moon or Lagna',
    'Jupiter-Saturn double transit on 7th house',
    `Dasha of ${h7.lord} or Venus`,
  ];

  return {
    navamsaCompat: { d9SeventhLord, d9VenusSign, d9VenusDignity, d9SeventhPlanets },
    seventhHouse: { lord: h7.lord, lordHouse: h7LordHouse, lordDignity: h7LordDignity, planets: h7.planets as Planet[], sav: h7SAV, aspects: h7Aspects },
    upapadaLagna: { sign: RASHI_NAMES[ul.padaRashi], rashi: ul.padaRashi, planetsInUL: ulPlanets, interpretation: ulInterpretation },
    darakaraka: { planet: dk.planet, degreeInSign: dk.degreeInSign, spouseTraits: DK_SPOUSE_TRAITS[dk.planet] ?? 'Adaptable', dkSign, dkNavamsa },
    marriageTiming: { seventhLord: h7.lord, timingDashaLords: timingLords, bestTransits },
  };
}
