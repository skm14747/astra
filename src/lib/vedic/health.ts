import { RASHI_LORDS, MARAKA_HOUSES } from './constants';
import { calculateShadbala } from './shadbala';
import { calculateAshtakavarga } from './ashtakavarga';
import type { Planet, GrahaPlanet, RashiIndex, KundliChart, HealthAnalysis } from './types';

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

export function analyzeHealth(chart: KundliChart): HealthAnalysis {
  // Maraka lords (2nd and 7th)
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

  // Ayush tier (simplified)
  const lagnaLord = chart.houses.find(h => h.house === 1)?.lord as GrahaPlanet;
  const shadbala = calculateShadbala(chart);
  const lagnaLordStrength = shadbala.planets[lagnaLord]?.ratio ?? 0;
  const eighthLord = chart.houses.find(h => h.house === 8)?.lord as GrahaPlanet;
  const eighthLordStrength = shadbala.planets[eighthLord]?.ratio ?? 0;

  let ayushTier: 'Alpayu' | 'Madhyayu' | 'Deerghayu';
  if (lagnaLordStrength >= 1.0 && eighthLordStrength >= 0.8) ayushTier = 'Deerghayu';
  else if (lagnaLordStrength >= 0.6 || eighthLordStrength >= 0.6) ayushTier = 'Madhyayu';
  else ayushTier = 'Alpayu';

  // Vulnerable areas from weak planets
  const { sav } = calculateAshtakavarga(chart);
  const vulnerableAreas: string[] = [];
  const allPlanets: Planet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  for (const p of allPlanets) {
    const pos = chart.planets[p];
    const bavInSign = sav[pos.rashi] ?? 30;
    if (bavInSign < 25) {
      vulnerableAreas.push(`${p}: ${PLANET_HEALTH_AREAS[p] ?? 'General'}`);
    }
  }

  // 6th house malefics
  const h6 = chart.houses.find(h => h.house === 6);
  if (h6 && h6.planets.length > 0) {
    for (const p of h6.planets) {
      if (['Mars', 'Saturn', 'Rahu', 'Ketu'].includes(p)) {
        vulnerableAreas.push(`${p} in 6th: ${PLANET_HEALTH_AREAS[p] ?? 'General'}`);
      }
    }
  }

  return { marakaLords, badhakaLord, badhakaHouse, ayushTier, vulnerableAreas };
}
