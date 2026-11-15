import { getTropicalMoonLongitude, getTropicalSunLongitude, getSunrise, getSunset } from '../astronomy/engine';
import { getAyanamsa, toSidereal } from '../astronomy/ayanamsa';
import {
  TITHI_NAMES, YOGA_NAMES, REPEATING_KARANA_NAMES, FIXED_KARANA_NAMES,
  DAY_NAMES, MASA_NAMES, RITU_NAMES, AYANA_NAMES, SAMVATSARA_NAMES,
  NAKSHATRA_NAMES, NAKSHATRA_LORDS, NAKSHATRA_SPAN,
  TITHI_SPAN, YOGA_SPAN, KARANA_SPAN, MS_PER_HOUR,
} from './constants';
import type { PanchangData, Observer, AyanamsaSystem } from './types';

function norm360(v: number): number {
  return ((v % 360) + 360) % 360;
}

export function getTithi(moonLon: number, sunLon: number): { index: number; name: string } {
  let diff = moonLon - sunLon;
  if (diff < 0) diff += 360;
  const index = Math.floor(diff / TITHI_SPAN);
  return { index, name: TITHI_NAMES[index] };
}

export function getYoga(sunLon: number, moonLon: number): { index: number; name: string } {
  const total = norm360(sunLon + moonLon);
  const index = Math.floor(total / YOGA_SPAN) % 27;
  return { index, name: YOGA_NAMES[index] };
}

export function getKarana(moonLon: number, sunLon: number): { index: number; name: string } {
  let diff = moonLon - sunLon;
  if (diff < 0) diff += 360;
  const index = Math.floor(diff / KARANA_SPAN);

  let name: string;
  if (index === 0) name = FIXED_KARANA_NAMES[0];
  else if (index >= 57) name = FIXED_KARANA_NAMES[index - 56];
  else name = REPEATING_KARANA_NAMES[(index - 1) % 7];

  return { index, name };
}

export function getVara(date: Date, observer: Observer): { index: number; name: string } {
  const tzOffsetMs = Math.round(observer.longitude / 15.0) * MS_PER_HOUR;
  const localTime = new Date(date.getTime() + tzOffsetMs);
  const day = localTime.getUTCDay();
  return { index: day, name: DAY_NAMES[day] };
}

export function getNakshatra(moonSiderealLon: number): { index: number; name: string; lord: string; pada: number } {
  const index = Math.floor(moonSiderealLon / NAKSHATRA_SPAN) % 27;
  const name = NAKSHATRA_NAMES[index];
  const lord = NAKSHATRA_LORDS[name];
  const pada = (Math.floor(moonSiderealLon / (NAKSHATRA_SPAN / 4)) % 4) + 1;
  return { index, name, lord, pada };
}

export function getPaksha(tithiIndex: number): 'Shukla' | 'Krishna' {
  return tithiIndex < 15 ? 'Shukla' : 'Krishna';
}

export function getMasa(date: Date, sunSiderealLon: number): { index: number; name: string; isAdhika: boolean } {
  const sunRashi = Math.floor(sunSiderealLon / 30);
  const masaIdx = (sunRashi + 1) % 12;
  return { index: masaIdx, name: MASA_NAMES[masaIdx], isAdhika: false };
}

export function getSamvat(year: number): { shaka: number; vikram: number; samvatsara: string } {
  const shaka = year - 78;
  const vikram = shaka + 135;
  const samvatsaraIdx = ((shaka + 11) % 60 + 60) % 60;
  return { shaka, vikram, samvatsara: SAMVATSARA_NAMES[samvatsaraIdx] };
}

export function getAyana(sunSiderealLon: number): string {
  if (sunSiderealLon >= 90 && sunSiderealLon < 270) return AYANA_NAMES[1];
  return AYANA_NAMES[0];
}

export function getRitu(sunSiderealLon: number): string {
  const adjusted = norm360(sunSiderealLon - 330);
  const idx = Math.floor(adjusted / 60);
  return RITU_NAMES[idx];
}

export function calculatePanchang(
  date: Date,
  observer: Observer,
  system: AyanamsaSystem = 'lahiri'
): PanchangData {
  const ayanamsa = getAyanamsa(date, system);
  const tropSun = getTropicalSunLongitude(date);
  const tropMoon = getTropicalMoonLongitude(date);
  const sidSun = toSidereal(tropSun, ayanamsa);
  const sidMoon = toSidereal(tropMoon, ayanamsa);

  const sunrise = getSunrise(date, observer);
  const sunset = getSunset(date, observer);

  const tithi = getTithi(sidMoon, sidSun);
  const nakshatra = getNakshatra(sidMoon);
  const yoga = getYoga(sidSun, sidMoon);
  const karana = getKarana(sidMoon, sidSun);
  const vara = getVara(date, observer);
  const paksha = getPaksha(tithi.index);
  const masa = getMasa(date, sidSun);
  const samvat = getSamvat(date.getFullYear());
  const ayana = getAyana(sidSun);
  const ritu = getRitu(sidSun);

  return {
    date,
    observer,
    sunrise,
    sunset,
    tithi: {
      index: tithi.index,
      name: tithi.name,
      paksha,
      number: (tithi.index % 15) + 1,
    },
    nakshatra: {
      index: nakshatra.index,
      name: nakshatra.name,
      lord: nakshatra.lord,
      pada: nakshatra.pada,
    },
    yoga,
    karana,
    vara,
    paksha,
    masa,
    samvat,
    ayana,
    ritu,
  };
}
