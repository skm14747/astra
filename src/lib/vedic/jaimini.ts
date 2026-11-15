import { RASHI_NAMES, RASHI_LORDS, MS_PER_YEAR } from './constants';
import { getNavamsaChart } from './vargas';
import { calculateArudhaPada } from './lagnas';
import type {
  Planet, GrahaPlanet, RashiIndex, KundliChart,
  CharaKaraka, CharaKarakaType, JaiminiData, ArudhaPada, DashaPeriod,
} from './types';

const KARAKA_NAMES: CharaKarakaType[] = ['AK', 'AmK', 'BK', 'MK', 'PK', 'GK', 'DK'];
const KARAKA_FULL_NAMES: Record<CharaKarakaType, string> = {
  AK: 'Atmakaraka (Soul)', AmK: 'Amatyakaraka (Career)',
  BK: 'Bhratrikaraka (Siblings)', MK: 'Matrikaraka (Mother)',
  PK: 'Putrakaraka (Children)', GK: 'Gnatikaraka (Rivals)',
  DK: 'Darakaraka (Spouse)',
};

const AMK_CAREER: Record<string, string> = {
  Sun: 'Executive/governance', Moon: 'Public/healthcare',
  Mars: 'Engineering/military', Mercury: 'IT/analytics/media',
  Jupiter: 'Advisory/legal/education', Venus: 'Design/luxury/art',
  Saturn: 'Infrastructure/operations',
};

export function calculateCharaKarakas(chart: KundliChart): CharaKaraka[] {
  const grahas: GrahaPlanet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const sorted = grahas
    .map(p => ({ planet: p, degreeInSign: chart.planets[p].siderealLongitude % 30 }))
    .sort((a, b) => b.degreeInSign - a.degreeInSign);

  return sorted.map((entry, i) => ({
    type: KARAKA_NAMES[i],
    planet: entry.planet as Planet,
    degreeInSign: entry.degreeInSign,
    fullName: KARAKA_FULL_NAMES[KARAKA_NAMES[i]],
  }));
}

export function getKarakamsha(chart: KundliChart): { rashi: RashiIndex; rashiName: string } {
  const karakas = calculateCharaKarakas(chart);
  const ak = karakas[0]; // Atmakaraka
  const d9 = getNavamsaChart(chart.ascendant.longitude, chart.planets);
  const akInD9 = d9.planets[ak.planet];
  return { rashi: akInD9.rashi, rashiName: akInD9.rashiName };
}

export function getSwamsha(chart: KundliChart): { rashi: RashiIndex; rashiName: string; houses: { house: number; rashi: RashiIndex; rashiName: string }[] } {
  const km = getKarakamsha(chart);
  const houses = [];
  for (let i = 0; i < 12; i++) {
    const r = ((km.rashi + i) % 12) as RashiIndex;
    houses.push({ house: i + 1, rashi: r, rashiName: RASHI_NAMES[r] });
  }
  return { ...km, houses };
}

// Jaimini Rashi Drishti
const MOVABLE = [0, 3, 6, 9];
const FIXED = [1, 4, 7, 10];
const DUAL = [2, 5, 8, 11];

export function getJaiminiRashiDrishti(rashi: RashiIndex): RashiIndex[] {
  if (MOVABLE.includes(rashi)) {
    return FIXED.filter(r => Math.abs(r - rashi) !== 1 && Math.abs(r - rashi) !== 11) as RashiIndex[];
  }
  if (FIXED.includes(rashi)) {
    return MOVABLE.filter(r => Math.abs(r - rashi) !== 1 && Math.abs(r - rashi) !== 11) as RashiIndex[];
  }
  return DUAL.filter(r => r !== rashi) as RashiIndex[];
}

export function getAllJaiminiRashiDrishti(): Record<number, number[]> {
  const result: Record<number, number[]> = {};
  for (let r = 0; r < 12; r++) {
    result[r] = getJaiminiRashiDrishti(r as RashiIndex);
  }
  return result;
}

// Chara Dasha (simplified Jaimini)
export function calculateCharaDasha(chart: KundliChart, years: number = 120): DashaPeriod[] {
  const startRashi = chart.ascendant.rashi;
  const isOdd = MOVABLE.includes(startRashi) || DUAL.includes(startRashi);
  const periods: DashaPeriod[] = [];
  let currentTime = chart.birthData.date.getTime();

  for (let i = 0; i < 12; i++) {
    const signIdx = isOdd
      ? ((startRashi + i) % 12) as RashiIndex
      : ((startRashi - i + 12) % 12) as RashiIndex;
    const lordName = RASHI_LORDS[signIdx];
    const lordRashi = chart.planets[lordName as Planet]?.rashi ?? 0;

    let duration: number;
    if (lordRashi === signIdx) {
      // Lord in own sign = 12 years (BPHS exception)
      duration = 12;
    } else if (MOVABLE.includes(signIdx)) {
      // Forward count from sign to lord, inclusive, minus 1
      duration = ((lordRashi - signIdx + 12) % 12);
    } else {
      // Reverse count from sign to lord, inclusive, minus 1
      duration = ((signIdx - lordRashi + 12) % 12);
    }
    if (duration <= 0) duration = 12;
    if (duration > 12) duration = 12;

    const durationMs = duration * MS_PER_YEAR;
    const start = new Date(currentTime);
    const end = new Date(currentTime + durationMs);

    periods.push({
      lord: `${RASHI_NAMES[signIdx]} (${lordName})`,
      startDate: start, endDate: end,
      durationYears: duration,
    });
    currentTime += durationMs;
    if (currentTime - chart.birthData.date.getTime() > years * MS_PER_YEAR) break;
  }
  return periods;
}

// Brahma, Maheshwara, Rudra (simplified)
export function calculateBrahmaMaheshwaraRudra(chart: KundliChart): { brahma: string; maheshwara: string; rudra: string } {
  const karakas = calculateCharaKarakas(chart);
  const ak = karakas[0];
  const akRashi = chart.planets[ak.planet].rashi;

  // Brahma: strongest lord among 6th, 8th, 12th from AK sign in odd sign
  const brahmaHouses = [6, 8, 12].map(h => ((akRashi + h - 1) % 12) as RashiIndex);
  const oddBrahma = brahmaHouses.filter(r => r % 2 === 0);
  const brahmaSign = oddBrahma.length > 0 ? oddBrahma[0] : brahmaHouses[0];
  const brahma = RASHI_LORDS[brahmaSign];

  // Maheshwara: lord of 8th from AK
  const eighth = ((akRashi + 7) % 12) as RashiIndex;
  const maheshwara = RASHI_LORDS[eighth];

  // Rudra: malefic in 2nd from AL or 8th from AL
  const alRashi = chart.ascendant.rashi;
  const rudraHouse = ((alRashi + 1) % 12) as RashiIndex;
  const rudra = RASHI_LORDS[rudraHouse];

  return { brahma, maheshwara, rudra };
}

export function getAmatyakarakaCareer(chart: KundliChart): { planet: Planet; career: string } {
  const karakas = calculateCharaKarakas(chart);
  const amk = karakas[1]; // second highest
  return { planet: amk.planet, career: AMK_CAREER[amk.planet] ?? 'General' };
}

export function calculateJaiminiData(chart: KundliChart): JaiminiData {
  const karakas = calculateCharaKarakas(chart);
  const km = getKarakamsha(chart);
  const padas: ArudhaPada[] = [];
  for (let h = 1; h <= 12; h++) {
    padas.push(calculateArudhaPada(h, chart.ascendant.rashi, chart.planets));
  }
  const rashiDrishti = getAllJaiminiRashiDrishti();

  return {
    charaKarakas: karakas,
    karakamsha: km.rashi,
    karakamshaName: km.rashiName,
    arudhaPadas: padas,
    rashiDrishti,
  };
}
