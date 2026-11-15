import {
  VIMSHOTTARI_LORDS,
  VIMSHOTTARI_DURATIONS,
  VIMSHOTTARI_TOTAL,
  NAKSHATRA_SPAN,
  MS_PER_YEAR,
} from './constants';
import type { DashaPeriod, VimshottariDasha } from './types';

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
  const MOVABLE = [0, 3, 6, 9];
  const FIXED = [1, 4, 7, 10];

  for (let i = 0; i < 12; i++) {
    const signIdx = (lagnaRashi + i) % 12;
    let duration: number;
    if (MOVABLE.includes(signIdx)) duration = 7;
    else if (FIXED.includes(signIdx)) duration = 8;
    else duration = 9;

    const durationMs = duration * MS_PER_YEAR;
    const start = new Date(currentTime);
    const end = new Date(currentTime + durationMs);
    const RASHI_NAMES_LOCAL = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    periods.push({ lord: RASHI_NAMES_LOCAL[signIdx], startDate: start, endDate: end, durationYears: duration });
    currentTime += durationMs;
  }
  return periods;
}
