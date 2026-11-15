import {
  RASHI_VARNA, RASHI_VASHYA, VASHYA_TYPES,
  NAKSHATRA_YONI, YONI_NAMES, YONI_ENEMIES,
  NAKSHATRA_GANA, GANA_NAMES, GANA_MATRIX,
  NAKSHATRA_NADI, NADI_NAMES,
  RASHI_LORDS, PLANET_FRIENDSHIPS,
} from './constants';
import type { KootaScore, CompatibilityResult, KundliChart } from './types';

function getRelation(p1: string, p2: string): number {
  if (p1 === p2) return 1;
  const data = PLANET_FRIENDSHIPS[p1];
  if (!data) return 0;
  if (data.friends.includes(p2)) return 1;
  if (data.enemies.includes(p2)) return -1;
  return 0;
}

export function calculateVarna(boyRashi: number, girlRashi: number): KootaScore {
  const bV = RASHI_VARNA[boyRashi];
  const gV = RASHI_VARNA[girlRashi];
  const score = bV <= gV ? 1 : 0;
  return { name: 'Varna', score, maxScore: 1, area: 'Work/Ego', description: score ? 'Compatible' : 'Boy Varna higher than Girl', boyValue: String(bV), girlValue: String(gV) };
}

export function calculateVashya(boyRashi: number, girlRashi: number): KootaScore {
  const bType = RASHI_VASHYA[boyRashi];
  const gType = RASHI_VASHYA[girlRashi];
  let score: number;
  if (bType === gType) score = 2;
  else if (bType === 1 || gType === 1) score = 1;
  else score = 0;
  return { name: 'Vashya', score, maxScore: 2, area: 'Dominance', description: `${VASHYA_TYPES[bType]} - ${VASHYA_TYPES[gType]}`, boyValue: VASHYA_TYPES[bType], girlValue: VASHYA_TYPES[gType] };
}

export function calculateTara(boyNak: number, girlNak: number): KootaScore {
  let countGB = boyNak - girlNak;
  if (countGB < 0) countGB += 27;
  countGB += 1;
  const remGB = countGB % 9;
  const isGoodGB = [1, 2, 4, 6, 8, 0].includes(remGB);

  let countBG = girlNak - boyNak;
  if (countBG < 0) countBG += 27;
  countBG += 1;
  const remBG = countBG % 9;
  const isGoodBG = [1, 2, 4, 6, 8, 0].includes(remBG);

  let score = 0;
  if (isGoodGB && isGoodBG) score = 3;
  else if (isGoodGB || isGoodBG) score = 1.5;

  return { name: 'Tara', score, maxScore: 3, area: 'Destiny/Luck', description: `G→B:${countGB} B→G:${countBG}`, boyValue: String(remGB), girlValue: String(remBG) };
}

export function calculateYoni(boyNak: number, girlNak: number): KootaScore {
  const bYoni = NAKSHATRA_YONI[boyNak];
  const gYoni = NAKSHATRA_YONI[girlNak];

  let score: number;
  if (bYoni === gYoni) {
    score = 4;
  } else {
    const isGreatEnemy = YONI_ENEMIES.some(
      ([a, b]) => (bYoni === a && gYoni === b) || (bYoni === b && gYoni === a)
    );
    if (isGreatEnemy) score = 0;
    else score = 2;
  }

  return { name: 'Yoni', score, maxScore: 4, area: 'Sexual Compatibility', description: `${YONI_NAMES[bYoni]} - ${YONI_NAMES[gYoni]}`, boyValue: YONI_NAMES[bYoni], girlValue: YONI_NAMES[gYoni] };
}

export function calculateGrahaMaitri(boyRashi: number, girlRashi: number): KootaScore {
  const bLord = RASHI_LORDS[boyRashi];
  const gLord = RASHI_LORDS[girlRashi];
  const rel1 = getRelation(bLord, gLord);
  const rel2 = getRelation(gLord, bLord);

  let score: number;
  if (rel1 === 1 && rel2 === 1) score = 5;
  else if ((rel1 === 1 && rel2 === 0) || (rel1 === 0 && rel2 === 1)) score = 4;
  else if (rel1 === 0 && rel2 === 0) score = 3;
  else if ((rel1 === 1 && rel2 === -1) || (rel1 === -1 && rel2 === 1)) score = 1;
  else if ((rel1 === 0 && rel2 === -1) || (rel1 === -1 && rel2 === 0)) score = 0.5;
  else score = 0;

  return { name: 'Graha Maitri', score, maxScore: 5, area: 'Mental Compatibility', description: `${bLord} - ${gLord}`, boyValue: bLord, girlValue: gLord };
}

export function calculateGana(boyNak: number, girlNak: number): KootaScore {
  const bGana = NAKSHATRA_GANA[boyNak];
  const gGana = NAKSHATRA_GANA[girlNak];
  const score = GANA_MATRIX[bGana][gGana];
  return { name: 'Gana', score, maxScore: 6, area: 'Temperament', description: `${GANA_NAMES[bGana]} - ${GANA_NAMES[gGana]}`, boyValue: GANA_NAMES[bGana], girlValue: GANA_NAMES[gGana] };
}

export function calculateBhakoot(boyRashi: number, girlRashi: number): KootaScore {
  const diff = ((girlRashi - boyRashi + 12) % 12) + 1;
  const badPositions = [2, 12, 5, 9, 6, 8];
  const isBad = badPositions.includes(diff);

  let score = 7;
  if (isBad) {
    const bLord = RASHI_LORDS[boyRashi];
    const gLord = RASHI_LORDS[girlRashi];
    if (bLord === gLord) score = 7;
    else score = 0;
  }

  return { name: 'Bhakoot', score, maxScore: 7, area: 'Love/Happiness', description: `Position: ${diff}`, boyValue: String(boyRashi), girlValue: String(girlRashi) };
}

export function calculateNadi(boyNak: number, girlNak: number, boyRashi?: number, girlRashi?: number): KootaScore {
  const bNadi = NAKSHATRA_NADI[boyNak];
  const gNadi = NAKSHATRA_NADI[girlNak];

  let score = 8;
  if (bNadi === gNadi) {
    score = 0;
    if (boyRashi !== undefined && girlRashi !== undefined && boyRashi === girlRashi && boyNak !== girlNak) {
      score = 8;
    }
  }

  return { name: 'Nadi', score, maxScore: 8, area: 'Health/Genetics', description: `${NADI_NAMES[bNadi]} - ${NADI_NAMES[gNadi]}`, boyValue: NADI_NAMES[bNadi], girlValue: NADI_NAMES[gNadi] };
}

export function calculateAshtakootaScore(
  boyNak: number, boyRashi: number,
  girlNak: number, girlRashi: number
): CompatibilityResult {
  const kootas: KootaScore[] = [
    calculateVarna(boyRashi, girlRashi),
    calculateVashya(boyRashi, girlRashi),
    calculateTara(boyNak, girlNak),
    calculateYoni(boyNak, girlNak),
    calculateGrahaMaitri(boyRashi, girlRashi),
    calculateGana(boyNak, girlNak),
    calculateBhakoot(boyRashi, girlRashi),
    calculateNadi(boyNak, girlNak, boyRashi, girlRashi),
  ];

  const totalScore = kootas.reduce((s, k) => s + k.score, 0);
  let verdict: string;
  if (totalScore >= 25) verdict = 'Excellent Match';
  else if (totalScore >= 18) verdict = 'Good Match';
  else if (totalScore >= 12) verdict = 'Average Match';
  else verdict = 'Not Recommended';

  return { kootas, totalScore, maxScore: 36, verdict, mangalDosha: { boy: false, girl: false } };
}

export function calculateFullCompatibility(boyChart: KundliChart, girlChart: KundliChart): CompatibilityResult {
  const boyMoon = boyChart.planets.Moon;
  const girlMoon = girlChart.planets.Moon;
  const result = calculateAshtakootaScore(
    boyMoon.nakshatra, boyMoon.rashi,
    girlMoon.nakshatra, girlMoon.rashi
  );

  const marsHousesBoy = boyChart.planets.Mars.house;
  const marsHousesGirl = girlChart.planets.Mars.house;
  const manglikHouses = [1, 2, 4, 7, 8, 12];
  result.mangalDosha.boy = manglikHouses.includes(marsHousesBoy);
  result.mangalDosha.girl = manglikHouses.includes(marsHousesGirl);

  return result;
}
