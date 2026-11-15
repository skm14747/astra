import {
  VIMSHOTTARI_LORDS,
  VIMSHOTTARI_DURATIONS,
  VIMSHOTTARI_TOTAL,
  NAKSHATRA_SPAN,
  MS_PER_YEAR,
  RASHI_NAMES,
  RASHI_LORDS,
} from './constants';
import type { DashaPeriod, VimshottariDasha, KundliChart, Planet } from './types';

export function calculateVimshottariDasha(
  moonSiderealLon: number,
  birthDate: Date
): VimshottariDasha {
  const nakshatraIndex = Math.floor(moonSiderealLon / NAKSHATRA_SPAN) % 27;
  const lordIndex = nakshatraIndex % 9;

  const nakshatraStart = Math.floor(moonSiderealLon / NAKSHATRA_SPAN) * NAKSHATRA_SPAN;
  const elapsedInNakshatra = moonSiderealLon - nakshatraStart;
  const fractionRemaining = 1 - elapsedInNakshatra / NAKSHATRA_SPAN;
  const balanceYears = VIMSHOTTARI_DURATIONS[lordIndex] * fractionRemaining;

  const mahadashas: DashaPeriod[] = [];
  let currentTime = birthDate.getTime();

  for (let i = 0; i < 9; i++) {
    const mdLordIdx = (lordIndex + i) % 9;
    const mdLord = VIMSHOTTARI_LORDS[mdLordIdx];
    const mdFullYears = VIMSHOTTARI_DURATIONS[mdLordIdx];
    const mdYears = i === 0 ? balanceYears : mdFullYears;
    const mdDurationMs = mdYears * MS_PER_YEAR;
    const mdStart = new Date(currentTime);
    const mdEnd = new Date(currentTime + mdDurationMs);

    const subPeriods = calculateAntardashas(mdLordIdx, mdYears, mdStart);

    mahadashas.push({
      lord: mdLord,
      startDate: mdStart,
      endDate: mdEnd,
      durationYears: mdYears,
      subPeriods,
    });

    currentTime += mdDurationMs;
  }

  return {
    birthMoonNakshatra: nakshatraIndex,
    birthDashaLord: VIMSHOTTARI_LORDS[lordIndex],
    balanceYears,
    mahadashas,
  };
}

function calculateAntardashas(
  mahaLordIdx: number,
  mahaDurationYears: number,
  mahaStart: Date
): DashaPeriod[] {
  const antardashas: DashaPeriod[] = [];
  let currentTime = mahaStart.getTime();

  for (let i = 0; i < 9; i++) {
    const adLordIdx = (mahaLordIdx + i) % 9;
    const adLord = VIMSHOTTARI_LORDS[adLordIdx];
    const adYears = mahaDurationYears * (VIMSHOTTARI_DURATIONS[adLordIdx] / VIMSHOTTARI_TOTAL);
    const adDurationMs = adYears * MS_PER_YEAR;
    const adStart = new Date(currentTime);
    const adEnd = new Date(currentTime + adDurationMs);

    const subPeriods = calculatePratyantardashas(adLordIdx, adYears, adStart);

    antardashas.push({
      lord: adLord,
      startDate: adStart,
      endDate: adEnd,
      durationYears: adYears,
      subPeriods,
    });

    currentTime += adDurationMs;
  }

  return antardashas;
}

function calculatePratyantardashas(
  antarLordIdx: number,
  antarDurationYears: number,
  antarStart: Date
): DashaPeriod[] {
  const pratyantars: DashaPeriod[] = [];
  let currentTime = antarStart.getTime();

  for (let i = 0; i < 9; i++) {
    const pdLordIdx = (antarLordIdx + i) % 9;
    const pdLord = VIMSHOTTARI_LORDS[pdLordIdx];
    const pdYears = antarDurationYears * (VIMSHOTTARI_DURATIONS[pdLordIdx] / VIMSHOTTARI_TOTAL);
    const pdDurationMs = pdYears * MS_PER_YEAR;
    const pdStart = new Date(currentTime);
    const pdEnd = new Date(currentTime + pdDurationMs);

    pratyantars.push({
      lord: pdLord,
      startDate: pdStart,
      endDate: pdEnd,
      durationYears: pdYears,
    });

    currentTime += pdDurationMs;
  }

  return pratyantars;
}

export function getCurrentDashaPeriod(
  dasha: VimshottariDasha,
  date: Date
): { maha: DashaPeriod; antar: DashaPeriod | null; pratyantar: DashaPeriod | null } | null {
  const t = date.getTime();
  for (const md of dasha.mahadashas) {
    if (t >= md.startDate.getTime() && t < md.endDate.getTime()) {
      let antar: DashaPeriod | null = null;
      let pratyantar: DashaPeriod | null = null;
      if (md.subPeriods) {
        for (const ad of md.subPeriods) {
          if (t >= ad.startDate.getTime() && t < ad.endDate.getTime()) {
            antar = ad;
            if (ad.subPeriods) {
              for (const pd of ad.subPeriods) {
                if (t >= pd.startDate.getTime() && t < pd.endDate.getTime()) {
                  pratyantar = pd;
                  break;
                }
              }
            }
            break;
          }
        }
      }
      return { maha: md, antar, pratyantar };
    }
  }
  return null;
}

export const YOGINI_LORDS = ['Mangala', 'Pingala', 'Dhanya', 'Bhramari', 'Bhadrika', 'Ulka', 'Siddha', 'Sankata'];
export const YOGINI_DURATIONS = [1, 2, 3, 4, 5, 6, 7, 8];
export const YOGINI_TOTAL = 36;

export const ASHTOTTARI_LORDS = ['Sun', 'Moon', 'Mars', 'Mercury', 'Saturn', 'Jupiter', 'Rahu', 'Venus'];
export const ASHTOTTARI_DURATIONS = [6, 15, 8, 17, 10, 19, 12, 21];
export const ASHTOTTARI_TOTAL = 108;

// Yogini Dasha Calculator
export function calculateYoginiDasha(moonSiderealLon: number, birthDate: Date): DashaPeriod[] {
  const nakshatraIndex = Math.floor(moonSiderealLon / NAKSHATRA_SPAN) % 27;
  const yoginiIndex = (nakshatraIndex + 3) % 8;

  const nakshatraStart = Math.floor(moonSiderealLon / NAKSHATRA_SPAN) * NAKSHATRA_SPAN;
  const elapsedInNak = moonSiderealLon - nakshatraStart;
  const fractionRemaining = 1 - elapsedInNak / NAKSHATRA_SPAN;
  const balanceYears = YOGINI_DURATIONS[yoginiIndex] * fractionRemaining;

  const periods: DashaPeriod[] = [];
  let currentTime = birthDate.getTime();

  for (let i = 0; i < 8; i++) {
    const idx = (yoginiIndex + i) % 8;
    const years = i === 0 ? balanceYears : YOGINI_DURATIONS[idx];
    const durationMs = years * MS_PER_YEAR;
    const start = new Date(currentTime);
    const end = new Date(currentTime + durationMs);
    periods.push({ lord: YOGINI_LORDS[idx], startDate: start, endDate: end, durationYears: years });
    currentTime += durationMs;
  }
  return periods;
}

// Ashtottari Dasha Calculator
export function calculateAshtottariDasha(moonSiderealLon: number, birthDate: Date): DashaPeriod[] {
  const nakshatraIndex = Math.floor(moonSiderealLon / NAKSHATRA_SPAN) % 27;
  const lordIndex = nakshatraIndex % 8;

  const nakshatraStart = Math.floor(moonSiderealLon / NAKSHATRA_SPAN) * NAKSHATRA_SPAN;
  const elapsedInNak = moonSiderealLon - nakshatraStart;
  const fractionRemaining = 1 - elapsedInNak / NAKSHATRA_SPAN;
  const balanceYears = ASHTOTTARI_DURATIONS[lordIndex] * fractionRemaining;

  const periods: DashaPeriod[] = [];
  let currentTime = birthDate.getTime();

  for (let i = 0; i < 8; i++) {
    const idx = (lordIndex + i) % 8;
    const years = i === 0 ? balanceYears : ASHTOTTARI_DURATIONS[idx];
    const durationMs = years * MS_PER_YEAR;
    const start = new Date(currentTime);
    const end = new Date(currentTime + durationMs);

    const subPeriods: DashaPeriod[] = [];
    let subTime = start.getTime();
    for (let j = 0; j < 8; j++) {
      const subIdx = (idx + j) % 8;
      const subYears = years * (ASHTOTTARI_DURATIONS[subIdx] / ASHTOTTARI_TOTAL);
      const subMs = subYears * MS_PER_YEAR;
      subPeriods.push({
        lord: ASHTOTTARI_LORDS[subIdx],
        startDate: new Date(subTime), endDate: new Date(subTime + subMs),
        durationYears: subYears,
      });
      subTime += subMs;
    }

    periods.push({ lord: ASHTOTTARI_LORDS[idx], startDate: start, endDate: end, durationYears: years, subPeriods });
    currentTime += durationMs;
  }
  return periods;
}

// Sthira Dasha (fixed durations per sign type)
export function calculateSthiraDasha(lagnaRashi: number, birthDate: Date): DashaPeriod[] {
  const periods: DashaPeriod[] = [];
  let currentTime = birthDate.getTime();
  for (let i = 0; i < 12; i++) {
    const signIdx = (lagnaRashi + i) % 12;
    const duration = signTypeDuration(signIdx);
    const durationMs = duration * MS_PER_YEAR;
    periods.push({ lord: RASHI_NAMES[signIdx], startDate: new Date(currentTime), endDate: new Date(currentTime + durationMs), durationYears: duration });
    currentTime += durationMs;
  }
  return periods;
}

/* ── Helpers for sign-based dashas ── */
const MOVABLE_SIGNS = [0, 3, 6, 9];
const FIXED_SIGNS = [1, 4, 7, 10];
function signTypeDuration(sign: number): number {
  if (MOVABLE_SIGNS.includes(sign)) return 7;
  if (FIXED_SIGNS.includes(sign)) return 8;
  return 9;
}

function buildSignDasha(startSign: number, birthDate: Date, durations: number[], signOrder: number[]): DashaPeriod[] {
  const periods: DashaPeriod[] = [];
  let t = birthDate.getTime();
  for (let i = 0; i < signOrder.length; i++) {
    const s = signOrder[i];
    const dur = durations[i] ?? signTypeDuration(s);
    const ms = dur * MS_PER_YEAR;
    periods.push({ lord: RASHI_NAMES[s], startDate: new Date(t), endDate: new Date(t + ms), durationYears: dur });
    t += ms;
  }
  return periods;
}

function buildPlanetDasha(lords: string[], durations: number[], total: number, moonLon: number, birthDate: Date): DashaPeriod[] {
  const nakIdx = Math.floor(moonLon / NAKSHATRA_SPAN) % 27;
  const lordIdx = nakIdx % lords.length;
  const nakStart = Math.floor(moonLon / NAKSHATRA_SPAN) * NAKSHATRA_SPAN;
  const frac = 1 - (moonLon - nakStart) / NAKSHATRA_SPAN;
  const balYears = durations[lordIdx] * frac;

  const periods: DashaPeriod[] = [];
  let t = birthDate.getTime();
  for (let i = 0; i < lords.length; i++) {
    const idx = (lordIdx + i) % lords.length;
    const yrs = i === 0 ? balYears : durations[idx];
    const ms = yrs * MS_PER_YEAR;
    const subPeriods: DashaPeriod[] = [];
    let st = t;
    for (let j = 0; j < lords.length; j++) {
      const si = (idx + j) % lords.length;
      const sy = yrs * (durations[si] / total);
      const sm = sy * MS_PER_YEAR;
      subPeriods.push({ lord: lords[si], startDate: new Date(st), endDate: new Date(st + sm), durationYears: sy });
      st += sm;
    }
    periods.push({ lord: lords[idx], startDate: new Date(t), endDate: new Date(t + ms), durationYears: yrs, subPeriods });
    t += ms;
  }
  return periods;
}

/* ── #70 Kalachakra Dasha ── */
const KALACHAKRA_SAVYA_DURATIONS = [7, 16, 9, 21, 7, 10, 7, 10, 4];
const KALACHAKRA_APSAVYA_DURATIONS = [4, 10, 7, 10, 7, 21, 9, 16, 7];
const SAVYA_NAKSHATRAS = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26]; // even-indexed
export function calculateKalachakraDasha(moonLon: number, birthDate: Date): DashaPeriod[] {
  const nakIdx = Math.floor(moonLon / NAKSHATRA_SPAN) % 27;
  const padaTotal = Math.floor(moonLon / (NAKSHATRA_SPAN / 4));
  const isSavya = SAVYA_NAKSHATRAS.includes(nakIdx);
  const durations = isSavya ? KALACHAKRA_SAVYA_DURATIONS : KALACHAKRA_APSAVYA_DURATIONS;
  const total = durations.reduce((a, b) => a + b, 0);
  const startIdx = padaTotal % durations.length;
  const nakStart = Math.floor(moonLon / NAKSHATRA_SPAN) * NAKSHATRA_SPAN;
  const frac = 1 - (moonLon - nakStart) / NAKSHATRA_SPAN;

  const periods: DashaPeriod[] = [];
  let t = birthDate.getTime();
  const numCycles = Math.ceil(120 / total) * durations.length;
  for (let i = 0; i < numCycles && (t - birthDate.getTime()) < 120 * MS_PER_YEAR; i++) {
    const idx = (startIdx + i) % durations.length;
    const signIdx = isSavya ? (nakIdx + idx) % 12 : (nakIdx - idx + 12) % 12;
    const yrs = i === 0 ? durations[idx] * frac : durations[idx];
    const ms = yrs * MS_PER_YEAR;
    periods.push({ lord: RASHI_NAMES[signIdx], startDate: new Date(t), endDate: new Date(t + ms), durationYears: yrs });
    t += ms;
  }
  return periods;
}

/* ── #71 Narayana Dasha (Jaimini) ── */
export function calculateNarayanaDasha(chart: KundliChart): DashaPeriod[] {
  const lagna = chart.ascendant.rashi;
  const isOdd = lagna % 2 === 0; // Aries=0 is odd
  const periods: DashaPeriod[] = [];
  let t = chart.birthData.date.getTime();

  for (let i = 0; i < 12; i++) {
    const signIdx = isOdd ? (lagna + i) % 12 : (lagna - i + 12) % 12;
    const lord = RASHI_LORDS[signIdx];
    const lordRashi = chart.planets[lord as Planet]?.rashi ?? 0;
    let duration: number;
    if (lordRashi === signIdx) {
      duration = 12;
    } else if (isOdd) {
      duration = ((lordRashi - signIdx + 12) % 12);
    } else {
      duration = ((signIdx - lordRashi + 12) % 12);
    }
    if (duration <= 0) duration = 12;
    const ms = duration * MS_PER_YEAR;
    periods.push({ lord: `${RASHI_NAMES[signIdx]} (${lord})`, startDate: new Date(t), endDate: new Date(t + ms), durationYears: duration });
    t += ms;
  }
  return periods;
}

/* ── #72 Shoola Dasha ── */
export function calculateShoolaDasha(lagnaRashi: number, birthDate: Date): DashaPeriod[] {
  const periods: DashaPeriod[] = [];
  let t = birthDate.getTime();
  for (let group = 0; group < 4; group++) {
    for (let offset = 0; offset < 3; offset++) {
      const signIdx = (lagnaRashi + group * 3 + offset) % 12;
      const dur = signTypeDuration(signIdx);
      const ms = dur * MS_PER_YEAR;
      periods.push({ lord: RASHI_NAMES[signIdx], startDate: new Date(t), endDate: new Date(t + ms), durationYears: dur });
      t += ms;
    }
  }
  return periods;
}

/* ── #73 Mandooka Dasha ── */
export function calculateMandookaDasha(lagnaRashi: number, birthDate: Date): DashaPeriod[] {
  // "Frog" pattern: odd signs first (1,3,5,7,9,11) then even (2,4,6,8,10,12)
  const order: number[] = [];
  for (let i = 0; i < 6; i++) order.push((lagnaRashi + i * 2) % 12);
  for (let i = 0; i < 6; i++) order.push((lagnaRashi + 1 + i * 2) % 12);

  const durations = order.map(s => signTypeDuration(s));
  return buildSignDasha(lagnaRashi, birthDate, durations, order);
}

/* ── #75 Brahma Dasha ── */
export function calculateBrahmaDasha(chart: KundliChart): DashaPeriod[] {
  const grahas: Planet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const sorted = grahas
    .map(p => ({ planet: p, deg: chart.planets[p].siderealLongitude % 30 }))
    .sort((a, b) => b.deg - a.deg);
  const akRashi = chart.planets[sorted[0].planet].rashi;

  // Brahma sign: strongest odd sign among 6th/8th/12th from AK
  const candidates = [6, 8, 12].map(h => ((akRashi + h - 1) % 12));
  const brahmaSign = candidates.find(r => r % 2 === 0) ?? candidates[0];

  const periods: DashaPeriod[] = [];
  let t = chart.birthData.date.getTime();
  for (let i = 0; i < 12; i++) {
    const signIdx = (brahmaSign + i) % 12;
    const dur = signTypeDuration(signIdx);
    const ms = dur * MS_PER_YEAR;
    periods.push({ lord: RASHI_NAMES[signIdx], startDate: new Date(t), endDate: new Date(t + ms), durationYears: dur });
    t += ms;
  }
  return periods;
}

/* ── #76 Dwisaptati Sama Dasha (72-yr) ── */
const DWISAPTATI_LORDS = VIMSHOTTARI_LORDS;
const DWISAPTATI_DUR = [8, 8, 8, 8, 8, 8, 8, 8, 8]; // 9 x 8 = 72
const DWISAPTATI_TOTAL = 72;
export function isDwisaptatiApplicable(chart: KundliChart): boolean {
  const lagnaLord = RASHI_LORDS[chart.ascendant.rashi];
  const seventhLord = RASHI_LORDS[(chart.ascendant.rashi + 6) % 12];
  return chart.planets[lagnaLord as Planet]?.house === 7 || chart.planets[seventhLord as Planet]?.house === 1;
}
export function calculateDwisaptatiSamaDasha(moonLon: number, birthDate: Date): DashaPeriod[] {
  return buildPlanetDasha(DWISAPTATI_LORDS as unknown as string[], DWISAPTATI_DUR, DWISAPTATI_TOTAL, moonLon, birthDate);
}

/* ── #77 Shattrimshat Sama Dasha (36-yr) ── */
const SHATTRIMSHAT_LORDS = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu'];
const SHATTRIMSHAT_DUR = [4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5, 4.5];
const SHATTRIMSHAT_TOTAL = 36;
export function isShattrimshatApplicable(chart: KundliChart): boolean {
  return chart.planets.Sun.house === 1;
}
export function calculateShattrimshatSamaDasha(moonLon: number, birthDate: Date): DashaPeriod[] {
  return buildPlanetDasha(SHATTRIMSHAT_LORDS, SHATTRIMSHAT_DUR, SHATTRIMSHAT_TOTAL, moonLon, birthDate);
}

/* ── #78 Panchottari Dasha (105-yr) ── */
const PANCHOTTARI_LORDS = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
const PANCHOTTARI_DUR = [12, 13, 21, 18, 18, 13, 10];
const PANCHOTTARI_TOTAL = 105;
export function isPanchottariApplicable(chart: KundliChart): boolean {
  return chart.ascendant.rashi === 3; // Cancer Lagna
}
export function calculatePanchottariDasha(moonLon: number, birthDate: Date): DashaPeriod[] {
  return buildPlanetDasha(PANCHOTTARI_LORDS, PANCHOTTARI_DUR, PANCHOTTARI_TOTAL, moonLon, birthDate);
}

/* ── #79 Shodasottari Dasha (116-yr) ── */
const SHODASOTTARI_LORDS = ['Sun', 'Mars', 'Jupiter', 'Saturn', 'Ketu', 'Moon', 'Mercury', 'Venus'];
const SHODASOTTARI_DUR = [11, 12, 13, 14, 15, 16, 17, 18];
const SHODASOTTARI_TOTAL = 116;
export function calculateShodasottariDasha(moonLon: number, birthDate: Date): DashaPeriod[] {
  return buildPlanetDasha(SHODASOTTARI_LORDS, SHODASOTTARI_DUR, SHODASOTTARI_TOTAL, moonLon, birthDate);
}

/* ── #80 Dwadashottari Dasha (112-yr) ── */
const DWADASHOTTARI_LORDS = ['Sun', 'Jupiter', 'Ketu', 'Mercury', 'Rahu', 'Mars', 'Saturn', 'Moon'];
const DWADASHOTTARI_DUR = [7, 9, 11, 13, 15, 17, 19, 21];
const DWADASHOTTARI_TOTAL = 112;
export function isDwadashottariApplicable(chart: KundliChart): boolean {
  return chart.planets.Venus.house === 1;
}
export function calculateDwadashottariDasha(moonLon: number, birthDate: Date): DashaPeriod[] {
  return buildPlanetDasha(DWADASHOTTARI_LORDS, DWADASHOTTARI_DUR, DWADASHOTTARI_TOTAL, moonLon, birthDate);
}

/* ── #81 Shatabdika Dasha (100-yr) ── */
const SHATABDIKA_LORDS = ['Sun', 'Moon', 'Venus', 'Mercury', 'Jupiter', 'Mars', 'Saturn'];
const SHATABDIKA_DUR = [5, 5, 10, 10, 20, 20, 30];
const SHATABDIKA_TOTAL = 100;
export function calculateShatabdikaDasha(moonLon: number, birthDate: Date): DashaPeriod[] {
  return buildPlanetDasha(SHATABDIKA_LORDS, SHATABDIKA_DUR, SHATABDIKA_TOTAL, moonLon, birthDate);
}

/* ── #82 Chaturashiti Sama Dasha (84-yr) ── */
const CHATURASHITI_LORDS = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
const CHATURASHITI_DUR = [12, 12, 12, 12, 12, 12, 12];
const CHATURASHITI_TOTAL = 84;
export function isChaturashitiApplicable(chart: KundliChart): boolean {
  const h10 = chart.houses.find(h => h.house === 10);
  if (!h10) return false;
  const tenthLord = h10.lord;
  return chart.planets[tenthLord as Planet]?.house === 10;
}
export function calculateChaturashitiSamaDasha(moonLon: number, birthDate: Date): DashaPeriod[] {
  return buildPlanetDasha(CHATURASHITI_LORDS, CHATURASHITI_DUR, CHATURASHITI_TOTAL, moonLon, birthDate);
}

/* ── #207 Mudda Dasha (compressed Vimshottari for annual chart) ── */
export function calculateMuddaDasha(moonLon: number, solarReturnDate: Date): DashaPeriod[] {
  const daysInYear = 365.2425;
  const nakIdx = Math.floor(moonLon / NAKSHATRA_SPAN) % 27;
  const lordIdx = nakIdx % 9;
  const nakStart = Math.floor(moonLon / NAKSHATRA_SPAN) * NAKSHATRA_SPAN;
  const frac = 1 - (moonLon - nakStart) / NAKSHATRA_SPAN;
  const balDays = VIMSHOTTARI_DURATIONS[lordIdx] * frac * (daysInYear / VIMSHOTTARI_TOTAL);

  const periods: DashaPeriod[] = [];
  let t = solarReturnDate.getTime();
  const msPerDay = 86400000;
  for (let i = 0; i < 9; i++) {
    const idx = (lordIdx + i) % 9;
    const days = i === 0 ? balDays : VIMSHOTTARI_DURATIONS[idx] * (daysInYear / VIMSHOTTARI_TOTAL);
    const ms = days * msPerDay;
    periods.push({ lord: VIMSHOTTARI_LORDS[idx], startDate: new Date(t), endDate: new Date(t + ms), durationYears: days / daysInYear });
    t += ms;
  }
  return periods;
}

/* ── All dasha systems registry ── */
export type DashaSystem =
  | 'vimshottari' | 'yogini' | 'ashtottari' | 'sthira' | 'chara'
  | 'kalachakra' | 'narayana' | 'shoola' | 'mandooka' | 'brahma'
  | 'dwisaptati' | 'shattrimshat' | 'panchottari' | 'shodasottari'
  | 'dwadashottari' | 'shatabdika' | 'chaturashiti' | 'mudda';

export const DASHA_SYSTEM_LABELS: Record<DashaSystem, string> = {
  vimshottari: 'Vimshottari (120yr)',
  yogini: 'Yogini (36yr)',
  ashtottari: 'Ashtottari (108yr)',
  sthira: 'Sthira (Fixed)',
  chara: 'Chara (Jaimini)',
  kalachakra: 'Kalachakra',
  narayana: 'Narayana (Jaimini)',
  shoola: 'Shoola',
  mandooka: 'Mandooka (Frog)',
  brahma: 'Brahma',
  dwisaptati: 'Dwisaptati Sama (72yr)',
  shattrimshat: 'Shattrimshat Sama (36yr)',
  panchottari: 'Panchottari (105yr)',
  shodasottari: 'Shodasottari (116yr)',
  dwadashottari: 'Dwadashottari (112yr)',
  shatabdika: 'Shatabdika (100yr)',
  chaturashiti: 'Chaturashiti Sama (84yr)',
  mudda: 'Mudda (Annual)',
};
