/**
 * Health & Longevity Analysis — 9 algorithms (#195-#203)
 */
import { RASHI_LORDS, MARAKA_HOUSES } from './constants';
import { getPlanetDignity } from './core';
import { calculateShadbala } from './shadbala';
import { calculateAshtakavarga } from './ashtakavarga';
import { getAllVargas } from './vargas';
import type { Planet, GrahaPlanet, RashiIndex, KundliChart } from './types';

const PLANET_HEALTH_AREAS: Record<string, string> = {
  Sun: 'Heart, eyes, bones, vitality',
  Moon: 'Mind, lungs, blood, fluids',
  Mars: 'Blood, muscles, surgery, accidents',
  Mercury: 'Nervous system, skin, speech',
  Jupiter: 'Liver, fat, diabetes, growth',
  Venus: 'Kidneys, reproductive, diabetes',
  Saturn: 'Bones, joints, chronic illness, teeth',
  Rahu: 'Mysterious illness, poison, phobia',
  Ketu: 'Surgery, infection, spiritual crisis',
};

export interface HealthAnalysis {
  marakaLords: string[];
  badhakaLord: string;
  badhakaHouse: number;
  ayushTier: 'Alpayu' | 'Madhyayu' | 'Deerghayu';
  vulnerableAreas: string[];
  sixthHouseDisease: { planets: Planet[]; conditions: string[] };
  eighthHouseLongevity: { lord: string; lordDignity: string; score: string };
  twelfthHouseHospitalization: { planets: Planet[]; risk: string };
  lagnaStrength: { lord: string; shadbalaRatio: number; constitution: string };
  marakaAnalysis: { marakaLords: string[]; marakaDashaWarning: string };
  badhakaAnalysis: { house: number; lord: string; effect: string };
  d30Analysis: { maleficCount: number; vulnerabilities: string[] };
  ashtakavargaHealth: { sav6th: number; sav8th: number; healthScore: string };
}

export function analyzeHealth(chart: KundliChart): HealthAnalysis {
  const marakaLords = MARAKA_HOUSES.map(h => {
    const house = chart.houses.find(x => x.house === h);
    return house?.lord ?? '';
  });

  // Badhaka house
  const lagnaRashi = chart.ascendant.rashi;
  const MOVABLE = [0, 3, 6, 9];
  const FIXED = [1, 4, 7, 10];
  let badhakaHouse: number;
  if (MOVABLE.includes(lagnaRashi)) badhakaHouse = 11;
  else if (FIXED.includes(lagnaRashi)) badhakaHouse = 9;
  else badhakaHouse = 7;
  const badhakaLord = chart.houses.find(h => h.house === badhakaHouse)?.lord ?? '';

  // Shadbala for ayush
  const lagnaLord = chart.houses.find(h => h.house === 1)?.lord as GrahaPlanet;
  const shadbala = calculateShadbala(chart);
  const lagnaLordRatio = shadbala.planets[lagnaLord]?.ratio ?? 0;
  const eighthLord = chart.houses.find(h => h.house === 8)?.lord as GrahaPlanet;
  const eighthLordRatio = shadbala.planets[eighthLord]?.ratio ?? 0;

  let ayushTier: 'Alpayu' | 'Madhyayu' | 'Deerghayu';
  if (lagnaLordRatio >= 1.0 && eighthLordRatio >= 0.8) ayushTier = 'Deerghayu';
  else if (lagnaLordRatio >= 0.6 || eighthLordRatio >= 0.6) ayushTier = 'Madhyayu';
  else ayushTier = 'Alpayu';

  const { bav, sav } = calculateAshtakavarga(chart);
  const vulnerableAreas: string[] = [];
  const allPlanets: Planet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  for (const p of allPlanets) {
    const pos = chart.planets[p];
    if ((sav[pos.rashi] ?? 30) < 25) {
      vulnerableAreas.push(`${p}: ${PLANET_HEALTH_AREAS[p] ?? 'General'}`);
    }
  }

  // #195 6th house disease mapping
  const h6 = chart.houses.find(h => h.house === 6)!;
  const h6Planets = h6.planets as Planet[];
  const conditions = h6Planets
    .filter(p => ['Mars', 'Saturn', 'Rahu', 'Ketu'].includes(p))
    .map(p => `${p} in 6th: ${PLANET_HEALTH_AREAS[p] ?? 'General'}`);

  // #196 8th house longevity
  const h8 = chart.houses.find(h => h.house === 8)!;
  const eighthLordDignity = getPlanetDignity(eighthLord, chart.planets[eighthLord]?.rashi ?? 0);
  const h8SAV = sav[h8.rashi] ?? 0;
  const longevityScore = h8SAV >= 28 ? 'Strong longevity' : h8SAV >= 25 ? 'Average longevity' : 'Longevity concerns';

  // #197 12th house hospitalization
  const h12 = chart.houses.find(h => h.house === 12)!;
  const h12Malefics = h12.planets.filter(p => ['Mars', 'Saturn', 'Rahu', 'Ketu'].includes(p));
  const hospRisk = h12Malefics.length >= 2 ? 'High' : h12Malefics.length === 1 ? 'Moderate' : 'Low';

  // #198 Lagna lord strength
  const constitution = lagnaLordRatio >= 1.2 ? 'Robust' : lagnaLordRatio >= 0.8 ? 'Moderate' : 'Fragile';

  // #199 Maraka analysis
  const marakaDashaWarning = `Caution during ${marakaLords[0]} and ${marakaLords[1]} Dasha periods`;

  // #200 Badhaka analysis
  const badhakaEffect = MOVABLE.includes(lagnaRashi)
    ? '11th house obstruction — social circle related'
    : FIXED.includes(lagnaRashi)
      ? '9th house obstruction — fortune/guru related'
      : '7th house obstruction — partnership related';

  // #201 D30 Trimsamsa analysis
  const vargas = getAllVargas(chart.ascendant.longitude, chart.planets);
  const d30 = vargas['d30'];
  let d30MaleficCount = 0;
  const d30Vulnerabilities: string[] = [];
  if (d30) {
    const malefics = ['Mars', 'Saturn', 'Rahu', 'Ketu'] as const;
    for (const m of malefics) {
      const r = d30.planets[m as Planet];
      if (r) {
        d30MaleficCount++;
        d30Vulnerabilities.push(`${m} in D30 ${r.rashiName}`);
      }
    }
  }

  // #203 Ashtakavarga health indicators
  const sav6 = sav[h6.rashi] ?? 0;
  const sav8 = sav[h8.rashi] ?? 0;
  const healthScore = (sav6 >= 28 && sav8 >= 28) ? 'Strong' : (sav6 < 25 || sav8 < 25) ? 'Needs attention' : 'Moderate';

  return {
    marakaLords,
    badhakaLord,
    badhakaHouse,
    ayushTier,
    vulnerableAreas,
    sixthHouseDisease: { planets: h6Planets, conditions },
    eighthHouseLongevity: { lord: eighthLord, lordDignity: eighthLordDignity, score: longevityScore },
    twelfthHouseHospitalization: { planets: h12.planets as Planet[], risk: hospRisk },
    lagnaStrength: { lord: lagnaLord, shadbalaRatio: lagnaLordRatio, constitution },
    marakaAnalysis: { marakaLords, marakaDashaWarning },
    badhakaAnalysis: { house: badhakaHouse, lord: badhakaLord, effect: badhakaEffect },
    d30Analysis: { maleficCount: d30MaleficCount, vulnerabilities: d30Vulnerabilities },
    ashtakavargaHealth: { sav6th: sav6, sav8th: sav8, healthScore },
  };
}
