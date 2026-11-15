import { VIMSHOTTARI_LORDS, VIMSHOTTARI_DURATIONS, VIMSHOTTARI_TOTAL, RASHI_LORDS, NAKSHATRA_SPAN } from './constants';
import type { KPData } from './types';

export function calculateKPSubLord(siderealLon: number): KPData {
  const signLord = RASHI_LORDS[Math.floor(siderealLon / 30)];

  const nakshatraIndex = Math.floor(siderealLon / NAKSHATRA_SPAN) % 27;
  const starLord = VIMSHOTTARI_LORDS[nakshatraIndex % 9];

  const nakshatraStart = Math.floor(siderealLon / NAKSHATRA_SPAN) * NAKSHATRA_SPAN;
  const offsetInNak = siderealLon - nakshatraStart;

  let subLord = starLord;
  let subStartDeg = 0;
  let subEndDeg = 0;
  const starLordIdx = nakshatraIndex % 9;

  let accumulated = 0;
  for (let i = 0; i < 9; i++) {
    const idx = (starLordIdx + i) % 9;
    const span = (VIMSHOTTARI_DURATIONS[idx] / VIMSHOTTARI_TOTAL) * NAKSHATRA_SPAN;
    if (offsetInNak >= accumulated && (offsetInNak < accumulated + span || i === 8)) {
      subLord = VIMSHOTTARI_LORDS[idx];
      subStartDeg = accumulated;
      subEndDeg = accumulated + span;
      break;
    }
    accumulated += span;
  }

  let subSubLord = subLord;
  const subDuration = subEndDeg - subStartDeg;
  const offsetInSub = offsetInNak - subStartDeg;
  const subLordIdx = VIMSHOTTARI_LORDS.indexOf(subLord);

  let accSub = 0;
  for (let j = 0; j < 9; j++) {
    const idx = (subLordIdx + j) % 9;
    const span = (VIMSHOTTARI_DURATIONS[idx] / VIMSHOTTARI_TOTAL) * subDuration;
    if (offsetInSub >= accSub && (offsetInSub < accSub + span || j === 8)) {
      subSubLord = VIMSHOTTARI_LORDS[idx];
      break;
    }
    accSub += span;
  }

  return { signLord, starLord, subLord, subSubLord };
}
