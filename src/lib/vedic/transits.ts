import type { Planet, RashiIndex, TransitResult, SadeSatiResult, VedhaResult } from './types';
import { UPACHAYA_HOUSES } from './constants';

export function detectSadeSati(saturnTransitRashi: RashiIndex, natalMoonRashi: RashiIndex): SadeSatiResult {
  const houseFromMoon = ((saturnTransitRashi - natalMoonRashi + 12) % 12) + 1;
  if (houseFromMoon === 12) {
    return { isActive: true, phase: 'rising', description: 'Sade Sati Phase 1 (Rising) — Saturn in 12th from Moon' };
  }
  if (houseFromMoon === 1) {
    return { isActive: true, phase: 'peak', description: 'Sade Sati Phase 2 (Peak) — Saturn transiting over Moon' };
  }
  if (houseFromMoon === 2) {
    return { isActive: true, phase: 'setting', description: 'Sade Sati Phase 3 (Setting) — Saturn in 2nd from Moon' };
  }
  return { isActive: false, phase: null, description: 'Sade Sati not active' };
}

export function isKantakaShani(saturnTransitRashi: RashiIndex, natalMoonRashi: RashiIndex): boolean {
  const h = ((saturnTransitRashi - natalMoonRashi + 12) % 12) + 1;
  return [4, 8, 10].includes(h);
}

export function isAshtamaShani(saturnTransitRashi: RashiIndex, natalMoonRashi: RashiIndex): boolean {
  return ((saturnTransitRashi - natalMoonRashi + 12) % 12) + 1 === 8;
}

export function hasGuruBalam(jupiterTransitRashi: RashiIndex, natalMoonRashi: RashiIndex): boolean {
  const h = ((jupiterTransitRashi - natalMoonRashi + 12) % 12) + 1;
  return [2, 5, 7, 9, 11].includes(h);
}

export function isRahuFavorable(rahuTransitRashi: RashiIndex, natalMoonRashi: RashiIndex): boolean {
  const h = ((rahuTransitRashi - natalMoonRashi + 12) % 12) + 1;
  return [3, 6, 11].includes(h);
}

export function calculateTransitScore(
  saturnTransitRashi: RashiIndex,
  jupiterTransitRashi: RashiIndex,
  rahuTransitRashi: RashiIndex,
  natalMoonRashi: RashiIndex
): number {
  let score = 65;
  if (hasGuruBalam(jupiterTransitRashi, natalMoonRashi)) score += 20;
  if (isRahuFavorable(rahuTransitRashi, natalMoonRashi)) score += 12;
  const sadeSati = detectSadeSati(saturnTransitRashi, natalMoonRashi);
  if (sadeSati.isActive) score -= 15;
  if (isAshtamaShani(saturnTransitRashi, natalMoonRashi)) score -= 20;
  return Math.max(30, Math.min(95, score));
}

export function getTransitEffect(
  planet: Planet,
  transitRashi: RashiIndex,
  natalMoonRashi: RashiIndex
): TransitResult {
  const houseFromMoon = ((transitRashi - natalMoonRashi + 12) % 12) + 1;
  const upachaya = (UPACHAYA_HOUSES as readonly number[]).includes(houseFromMoon);

  let effect: string;
  let isFavorable: boolean;

  if (planet === 'Jupiter') {
    isFavorable = [2, 5, 7, 9, 11].includes(houseFromMoon);
    effect = isFavorable ? 'Jupiter blesses this house — growth and wisdom' : 'Jupiter transit less favorable here';
  } else if (planet === 'Saturn') {
    isFavorable = upachaya;
    effect = isFavorable ? 'Saturn supports discipline and structure' : 'Saturn brings lessons and challenges';
  } else if (planet === 'Rahu') {
    isFavorable = [3, 6, 11].includes(houseFromMoon);
    effect = isFavorable ? 'Rahu amplifies success in upachaya' : 'Rahu creates confusion and obsession';
  } else {
    isFavorable = upachaya;
    effect = `${planet} transiting ${houseFromMoon}th from Moon`;
  }

  return { planet, transitRashi, houseFromMoon, effect, isFavorable };
}

// --- Phase 6: Vedha, Double Transit, Returns ---

const VEDHA_PAIRS: Record<string, Record<number, number>> = {
  Sun: { 3: 9, 4: 10, 6: 12, 10: 4, 11: 5 },
  Moon: { 1: 5, 3: 9, 6: 12, 7: 2, 10: 4, 11: 8 },
  Mars: { 3: 12, 6: 9, 11: 5 },
  Mercury: { 2: 5, 4: 3, 6: 9, 8: 1, 10: 8, 11: 12 },
  Jupiter: { 2: 12, 5: 4, 7: 3, 9: 10, 11: 8 },
  Venus: { 1: 8, 2: 7, 3: 1, 4: 10, 5: 9, 8: 5, 9: 11, 11: 6, 12: 3 },
  Saturn: { 3: 12, 6: 9, 11: 5 },
};

export function checkVedha(
  planet: Planet,
  houseFromMoon: number,
  allTransitPositions: Record<Planet, number>
): VedhaResult {
  const pairs = VEDHA_PAIRS[planet];
  if (!pairs || !pairs[houseFromMoon]) {
    return { planet, favorableHouse: houseFromMoon, isObstructed: false };
  }

  const vedhaHouse = pairs[houseFromMoon];
  // Sun-Saturn exempt from mutual Vedha
  const exemptPairs: [string, string][] = [['Sun', 'Saturn'], ['Saturn', 'Sun']];

  for (const [otherPlanet, otherHouse] of Object.entries(allTransitPositions)) {
    if (otherPlanet === planet) continue;
    if (exemptPairs.some(([a, b]) => a === planet && b === otherPlanet)) continue;
    if (otherHouse === vedhaHouse) {
      return {
        planet, favorableHouse: houseFromMoon, isObstructed: true,
        obstructingPlanet: otherPlanet as Planet, vedhaHouse,
      };
    }
  }
  return { planet, favorableHouse: houseFromMoon, isObstructed: false };
}

export function detectDoubleTransit(
  jupiterTransitRashi: RashiIndex,
  saturnTransitRashi: RashiIndex,
  natalMoonRashi: RashiIndex
): number[] {
  // Houses influenced by Jupiter (5th, 7th, 9th aspect + occupied house)
  const jupHouse = ((jupiterTransitRashi - natalMoonRashi + 12) % 12) + 1;
  const jupInfluenced = new Set([jupHouse, ((jupHouse + 3) % 12) + 1, ((jupHouse + 5) % 12) + 1, ((jupHouse + 7) % 12) + 1]);

  // Houses influenced by Saturn (3rd, 7th, 10th aspect + occupied house)
  const satHouse = ((saturnTransitRashi - natalMoonRashi + 12) % 12) + 1;
  const satInfluenced = new Set([satHouse, ((satHouse + 1) % 12) + 1, ((satHouse + 5) % 12) + 1, ((satHouse + 8) % 12) + 1]);

  const doubleTransitHouses: number[] = [];
  for (const h of jupInfluenced) {
    if (satInfluenced.has(h)) doubleTransitHouses.push(h);
  }
  return doubleTransitHouses.sort((a, b) => a - b);
}

export function detectDhaiya(saturnTransitRashi: RashiIndex, natalMoonRashi: RashiIndex): { type: string; isActive: boolean } | null {
  const diff = ((saturnTransitRashi - natalMoonRashi + 12) % 12);
  if (diff === 3) return { type: '4th house Dhaiya (Kantaka)', isActive: true };
  if (diff === 7) return { type: '8th house Dhaiya (Ashtama)', isActive: true };
  return null;
}

/* ── #149 Jupiter Return ── */
export function detectJupiterReturn(
  transitJupiterRashi: RashiIndex,
  natalJupiterRashi: RashiIndex,
  birthYear: number,
  currentYear: number
): { isReturn: boolean; returnNumber: number; age: number } {
  const age = currentYear - birthYear;
  const returnNum = Math.round(age / 11.86);
  return { isReturn: transitJupiterRashi === natalJupiterRashi, returnNumber: returnNum, age };
}

/* ── #150 Saturn Return ── */
export function detectSaturnReturn(
  transitSaturnRashi: RashiIndex,
  natalSaturnRashi: RashiIndex,
  birthYear: number,
  currentYear: number
): { isReturn: boolean; returnNumber: number; phase: string; age: number } {
  const age = currentYear - birthYear;
  const returnNum = Math.round(age / 29.46);
  const phases: Record<number, string> = { 1: 'Career maturation', 2: 'Wisdom phase', 3: 'Legacy phase' };
  return { isReturn: transitSaturnRashi === natalSaturnRashi, returnNumber: returnNum, phase: phases[returnNum] ?? '', age };
}

/* ── #152 Transit over natal Ascendant ── */
export function getTransitFromLagna(
  planet: Planet,
  transitRashi: RashiIndex,
  natalLagnaRashi: RashiIndex
): { houseFromLagna: number; effect: string; isFavorable: boolean } {
  const h = ((transitRashi - natalLagnaRashi + 12) % 12) + 1;
  const upachaya = [3, 6, 10, 11].includes(h);
  return { houseFromLagna: h, effect: `${planet} in ${h}th from Lagna`, isFavorable: upachaya };
}

/* ── #153 Transit over natal planets ── */
export function getTransitOverNatalPlanets(
  transitPlanet: Planet,
  transitRashi: RashiIndex,
  natalPlanets: Record<Planet, { rashi: RashiIndex }>
): { planet: Planet; conjunction: boolean; opposition: boolean }[] {
  const results: { planet: Planet; conjunction: boolean; opposition: boolean }[] = [];
  const all: Planet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
  for (const np of all) {
    if (np === transitPlanet) continue;
    const nr = natalPlanets[np].rashi;
    const conjunction = transitRashi === nr;
    const opposition = ((transitRashi - nr + 12) % 12) === 6;
    if (conjunction || opposition) results.push({ planet: np, conjunction, opposition });
  }
  return results;
}

/* ── #156 Gochar-Dasha Integration ── */
export function getGocharDashaCorrelation(
  transitPlanet: Planet,
  currentDashaLord: string,
  transitRashi: RashiIndex,
  natalMoonRashi: RashiIndex
): { isCorrelated: boolean; amplification: string } {
  const isMatch = transitPlanet === currentDashaLord;
  const hFromMoon = ((transitRashi - natalMoonRashi + 12) % 12) + 1;
  if (isMatch) {
    return {
      isCorrelated: true,
      amplification: `${transitPlanet} transit amplified — Dasha lord in ${hFromMoon}th from Moon. Events of this planet will manifest strongly.`,
    };
  }
  return { isCorrelated: false, amplification: '' };
}
