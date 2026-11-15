import { RASHI_LORDS, KENDRA_HOUSES, TRIKONA_HOUSES } from './constants';
import { getPlanetDignity } from './core';
import { getAllVargas } from './vargas';
import { calculateCharaKarakas } from './jaimini';
import type { Planet, GrahaPlanet, KundliChart, CareerAnalysis } from './types';

const AMK_CAREER: Record<string, string> = {
  Sun: 'Executive/governance/politics', Moon: 'Public service/healthcare/hospitality',
  Mars: 'Engineering/military/sports', Mercury: 'IT/analytics/media/writing',
  Jupiter: 'Advisory/legal/education/finance', Venus: 'Design/luxury/arts/entertainment',
  Saturn: 'Infrastructure/operations/mining',
};

export function analyzeCareer(chart: KundliChart): CareerAnalysis {
  const h10 = chart.houses.find(h => h.house === 10)!;
  const tenthLord = h10.lord as Planet;
  const tenthLordHouse = chart.planets[tenthLord]?.house ?? 0;
  const tenthLordDignity = getPlanetDignity(tenthLord, chart.planets[tenthLord]?.rashi ?? 0);
  const planetsInTenth = h10.planets;

  const karakas = calculateCharaKarakas(chart);
  const amk = karakas[1]; // Amatyakaraka

  // D10 analysis
  const vargas = getAllVargas(chart.ascendant.longitude, chart.planets);
  const d10 = vargas['d10'];
  let d10Strength = 'Average';
  if (d10) {
    const kendraCount = d10.houses.filter((h, i) => [0, 3, 6, 9].includes(i) && h.planets.length > 0).length;
    if (kendraCount >= 3) d10Strength = 'Very Strong';
    else if (kendraCount >= 2) d10Strength = 'Strong';
  }

  return {
    tenthLord: h10.lord,
    tenthLordHouse,
    tenthLordDignity,
    planetsInTenth,
    amatyakaraka: amk.planet,
    amatyakarakaCareer: AMK_CAREER[amk.planet] ?? 'General',
    d10Strength,
  };
}
