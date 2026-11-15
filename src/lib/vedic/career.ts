/**
 * Career & Business Analysis — 11 algorithms (#172-#184)
 */
import { RASHI_NAMES, RASHI_LORDS, KENDRA_HOUSES, TRIKONA_HOUSES } from './constants';
import { getPlanetDignity, getAspects } from './core';
import { getAllVargas } from './vargas';
import { calculateCharaKarakas } from './jaimini';
import { calculateArudhaPada, calculateAllArudhaPadas } from './lagnas';
import { calculateAshtakavarga } from './ashtakavarga';
import { calculateShadbala } from './shadbala';
import { detectDoubleTransit } from './transits';
import type { Planet, GrahaPlanet, RashiIndex, KundliChart, Dignity } from './types';

const AMK_CAREER: Record<string, string> = {
  Sun: 'Executive/governance/politics', Moon: 'Public service/healthcare/hospitality',
  Mars: 'Engineering/military/sports', Mercury: 'IT/analytics/media/writing',
  Jupiter: 'Advisory/legal/education/finance', Venus: 'Design/luxury/arts/entertainment',
  Saturn: 'Infrastructure/operations/mining',
};

const AK_LIFE_MISSION: Record<string, string> = {
  Sun: 'Leadership, self-mastery, and recognition',
  Moon: 'Emotional wisdom, nurturing, and public connection',
  Mars: 'Courage, action, and overcoming challenges',
  Mercury: 'Knowledge, communication, and analytical mastery',
  Jupiter: 'Wisdom, teaching, and spiritual expansion',
  Venus: 'Relationships, creativity, and material harmony',
  Saturn: 'Discipline, service, and karmic responsibility',
};

export interface CareerAnalysis {
  tenthLord: string;
  tenthLordHouse: number;
  tenthLordDignity: Dignity;
  planetsInTenth: Planet[];
  amatyakaraka: Planet;
  amatyakarakaCareer: string;
  d10Strength: string;
  d10Planets: { planet: string; rashi: string; dignity: string }[];
  tenthHouseSAV: number;
  tenthHouseAspects: string[];
  atmakarakaAnalysis: { planet: Planet; mission: string; navamsaSign: string };
  arudhaLagnaSign: string;
  arudhaLagnaPlanets: string[];
  sixthHouseAnalysis: { lord: string; planets: Planet[]; strength: string };
  seventhHouseAnalysis: { lord: string; planets: Planet[]; strength: string };
  eleventhHouseAnalysis: { lord: string; planets: Planet[]; incomeStreams: number };
  activeRajYogas: string[];
  careerTimingDashaLords: string[];
}

export function analyzeCareer(chart: KundliChart): CareerAnalysis {
  const h10 = chart.houses.find(h => h.house === 10)!;
  const tenthLord = h10.lord as Planet;
  const tenthLordHouse = chart.planets[tenthLord]?.house ?? 0;
  const tenthLordDignity = getPlanetDignity(tenthLord, chart.planets[tenthLord]?.rashi ?? 0);
  const planetsInTenth = h10.planets;

  const karakas = calculateCharaKarakas(chart);
  const amk = karakas[1];
  const ak = karakas[0];

  // D10 analysis
  const vargas = getAllVargas(chart.ascendant.longitude, chart.planets);
  const d10 = vargas['d10'];
  const d10Planets: { planet: string; rashi: string; dignity: string }[] = [];
  let d10KendraCount = 0;
  if (d10) {
    const grahas: GrahaPlanet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
    for (const g of grahas) {
      const r = d10.planets[g];
      const dig = getPlanetDignity(g, r.rashi);
      d10Planets.push({ planet: g, rashi: r.rashiName, dignity: dig });
    }
    d10KendraCount = d10.houses.filter((_, i) => [0, 3, 6, 9].includes(i)).filter(h => h.planets.length > 0).length;
  }
  const d10Strength = d10KendraCount >= 3 ? 'Very Strong' : d10KendraCount >= 2 ? 'Strong' : 'Average';

  // Ashtakavarga for 10th house
  const { sav } = calculateAshtakavarga(chart);
  const tenthHouseSAV = sav[h10.rashi] ?? 0;

  // Aspects on 10th house
  const tenthHouseAspects: string[] = [];
  const allPlanets: Planet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
  for (const p of allPlanets) {
    const aspects = getAspects(p, chart.planets[p].house);
    if (aspects.includes(10)) tenthHouseAspects.push(p);
  }

  // Atmakaraka analysis
  const d9 = vargas['d9'];
  const akNavamsa = d9?.planets[ak.planet]?.rashiName ?? RASHI_NAMES[chart.planets[ak.planet].rashi];
  const atmakarakaAnalysis = {
    planet: ak.planet,
    mission: AK_LIFE_MISSION[ak.planet] ?? 'Self-realization',
    navamsaSign: akNavamsa,
  };

  // Arudha Lagna (A1) analysis
  const allPadas = calculateAllArudhaPadas(chart);
  const a1 = allPadas[0];
  const arudhaLagnaSign = a1 ? RASHI_NAMES[a1.padaRashi] : '';
  const arudhaLagnaPlanets = a1
    ? allPlanets.filter(p => chart.planets[p].rashi === a1.padaRashi)
    : [];

  // 6th house (employment/service)
  const h6 = chart.houses.find(h => h.house === 6)!;
  const h6SAV = sav[h6.rashi] ?? 0;
  const sixthHouseAnalysis = {
    lord: h6.lord,
    planets: h6.planets as Planet[],
    strength: h6SAV >= 28 ? 'Strong' : h6SAV >= 25 ? 'Average' : 'Weak',
  };

  // 7th house (business partnerships)
  const h7 = chart.houses.find(h => h.house === 7)!;
  const h7SAV = sav[h7.rashi] ?? 0;
  const seventhHouseAnalysis = {
    lord: h7.lord,
    planets: h7.planets as Planet[],
    strength: h7SAV >= 28 ? 'Strong' : h7SAV >= 25 ? 'Average' : 'Weak',
  };

  // 11th house (income/gains)
  const h11 = chart.houses.find(h => h.house === 11)!;
  const eleventhHouseAnalysis = {
    lord: h11.lord,
    planets: h11.planets as Planet[],
    incomeStreams: Math.max(1, h11.planets.length),
  };

  // Active Raj Yogas involving career houses
  const activeRajYogas: string[] = [];
  const kendraLords = KENDRA_HOUSES.map(h => chart.houses.find(x => x.house === h)?.lord).filter(Boolean) as string[];
  const trikonaLords = TRIKONA_HOUSES.map(h => chart.houses.find(x => x.house === h)?.lord).filter(Boolean) as string[];
  for (const kl of kendraLords) {
    for (const tl of trikonaLords) {
      if (kl !== tl && chart.planets[kl as Planet]?.house === chart.planets[tl as Planet]?.house) {
        activeRajYogas.push(`${kl} + ${tl} in house ${chart.planets[kl as Planet].house}`);
      }
    }
  }

  // Career timing: dasha lords of 10th lord, lagna lord, and AK
  const careerTimingDashaLords = [tenthLord, h10.lord, amk.planet].filter((v, i, a) => a.indexOf(v) === i);

  return {
    tenthLord: h10.lord,
    tenthLordHouse,
    tenthLordDignity,
    planetsInTenth,
    amatyakaraka: amk.planet,
    amatyakarakaCareer: AMK_CAREER[amk.planet] ?? 'General',
    d10Strength,
    d10Planets,
    tenthHouseSAV,
    tenthHouseAspects,
    atmakarakaAnalysis,
    arudhaLagnaSign,
    arudhaLagnaPlanets: arudhaLagnaPlanets.map(String),
    sixthHouseAnalysis,
    seventhHouseAnalysis,
    eleventhHouseAnalysis,
    activeRajYogas,
    careerTimingDashaLords,
  };
}
