import {
  RAHU_KALAM_PORTIONS,
  YAMAGANDA_PORTIONS,
  GULIKA_PORTIONS,
  HORA_RULERS,
  VARJYAM_START_GHATIS,
  AMRIT_KALAM_START_GHATIS,
  AMRIT_SIDDHI_YOGA,
  NAKSHATRA_SPAN,
} from './constants';
import type { MuhurtaTime, Observer } from './types';
export type { MuhurtaTime };

function calcPortionTime(
  sunrise: Date,
  sunset: Date,
  vara: number,
  portionIndices: readonly number[]
): { start: Date; end: Date } | null {
  const daylightMs = sunset.getTime() - sunrise.getTime();
  const portionMs = daylightMs / 8;
  const portionIdx = portionIndices[vara];
  const startMs = sunrise.getTime() + (portionIdx - 1) * portionMs;
  const endMs = sunrise.getTime() + portionIdx * portionMs;
  return { start: new Date(startMs), end: new Date(endMs) };
}

export function calculateRahuKalam(sunrise: Date, sunset: Date, vara: number): MuhurtaTime | null {
  const result = calcPortionTime(sunrise, sunset, vara, RAHU_KALAM_PORTIONS);
  if (!result) return null;
  return { name: 'Rahu Kalam', ...result, isAuspicious: false };
}

export function calculateYamaganda(sunrise: Date, sunset: Date, vara: number): MuhurtaTime | null {
  const result = calcPortionTime(sunrise, sunset, vara, YAMAGANDA_PORTIONS);
  if (!result) return null;
  return { name: 'Yamaganda Kalam', ...result, isAuspicious: false };
}

export function calculateGulika(sunrise: Date, sunset: Date, vara: number): MuhurtaTime | null {
  const result = calcPortionTime(sunrise, sunset, vara, GULIKA_PORTIONS);
  if (!result) return null;
  return { name: 'Gulika Kalam', ...result, isAuspicious: false };
}

export function calculateAbhijitMuhurta(sunrise: Date, sunset: Date): MuhurtaTime {
  const dayMs = sunset.getTime() - sunrise.getTime();
  const muhurtaMs = dayMs / 15;
  return {
    name: 'Abhijit Muhurta',
    start: new Date(sunrise.getTime() + 7 * muhurtaMs),
    end: new Date(sunrise.getTime() + 8 * muhurtaMs),
    isAuspicious: true,
  };
}

export function calculateBrahmaMuhurta(sunrise: Date, prevSunset: Date): MuhurtaTime {
  const nightMs = sunrise.getTime() - prevSunset.getTime();
  const muhurtaMs = nightMs / 15;
  return {
    name: 'Brahma Muhurta',
    start: new Date(sunrise.getTime() - 2 * muhurtaMs),
    end: new Date(sunrise.getTime() - 1 * muhurtaMs),
    isAuspicious: true,
  };
}

export function calculateDurMuhurta(sunrise: Date, sunset: Date): MuhurtaTime[] {
  const dayMs = sunset.getTime() - sunrise.getTime();
  const mMs = dayMs / 15;
  return [
    { name: 'Dur Muhurta (4th)', start: new Date(sunrise.getTime() + 3 * mMs), end: new Date(sunrise.getTime() + 4 * mMs), isAuspicious: false },
    { name: 'Dur Muhurta (6th)', start: new Date(sunrise.getTime() + 5 * mMs), end: new Date(sunrise.getTime() + 6 * mMs), isAuspicious: false },
    { name: 'Dur Muhurta (14th)', start: new Date(sunrise.getTime() + 13 * mMs), end: new Date(sunrise.getTime() + 14 * mMs), isAuspicious: false },
  ];
}

export function getCurrentHora(sunrise: Date, currentTime: Date, vara: number): { planet: string; horaNumber: number } {
  const dayStartPlanets = [0, 3, 6, 2, 5, 1, 4];
  const startPlanetIdx = dayStartPlanets[vara];
  const hoursFromSunrise = (currentTime.getTime() - sunrise.getTime()) / 3600000;
  const horaIdx = (startPlanetIdx + Math.floor(hoursFromSunrise)) % 7;
  return { planet: HORA_RULERS[horaIdx], horaNumber: Math.floor(hoursFromSunrise) + 1 };
}

export function calculateVarjyam(
  nakshatraIndex: number,
  nakshatraStart: Date,
  nakshatraEnd: Date
): MuhurtaTime | null {
  const ghatis = VARJYAM_START_GHATIS[nakshatraIndex];
  if (ghatis === undefined) return null;
  const nakDurationMs = nakshatraEnd.getTime() - nakshatraStart.getTime();
  const startOffset = (nakDurationMs * ghatis) / 60;
  const duration = (nakDurationMs * 4) / 60;
  return {
    name: 'Varjyam',
    start: new Date(nakshatraStart.getTime() + startOffset),
    end: new Date(nakshatraStart.getTime() + startOffset + duration),
    isAuspicious: false,
  };
}

export function calculateAmritKalam(
  nakshatraIndex: number,
  nakshatraStart: Date,
  nakshatraEnd: Date
): MuhurtaTime | null {
  const ghatis = AMRIT_KALAM_START_GHATIS[nakshatraIndex];
  if (ghatis === undefined) return null;
  const nakDurationMs = nakshatraEnd.getTime() - nakshatraStart.getTime();
  const startOffset = (nakDurationMs * ghatis) / 60;
  const duration = (nakDurationMs * 4) / 60;
  return {
    name: 'Amrit Kalam',
    start: new Date(nakshatraStart.getTime() + startOffset),
    end: new Date(nakshatraStart.getTime() + startOffset + duration),
    isAuspicious: true,
  };
}

export function isAmritSiddhiYoga(vara: number, nakshatraIndex: number): boolean {
  return AMRIT_SIDDHI_YOGA[vara] === nakshatraIndex;
}

export function isRaviPushyaYoga(vara: number, nakshatraIndex: number): boolean {
  return vara === 0 && nakshatraIndex === 7;
}

export function isGuruPushyaYoga(vara: number, nakshatraIndex: number): boolean {
  return vara === 4 && nakshatraIndex === 7;
}

export function getAllMuhurtas(
  sunrise: Date,
  sunset: Date,
  prevSunset: Date,
  vara: number
): MuhurtaTime[] {
  const muhurtas: MuhurtaTime[] = [];

  muhurtas.push(calculateBrahmaMuhurta(sunrise, prevSunset));
  muhurtas.push(calculateAbhijitMuhurta(sunrise, sunset));
  muhurtas.push(...calculateDurMuhurta(sunrise, sunset));

  const rahu = calculateRahuKalam(sunrise, sunset, vara);
  if (rahu) muhurtas.push(rahu);

  const yama = calculateYamaganda(sunrise, sunset, vara);
  if (yama) muhurtas.push(yama);

  const gulika = calculateGulika(sunrise, sunset, vara);
  if (gulika) muhurtas.push(gulika);

  return muhurtas.sort((a, b) => a.start.getTime() - b.start.getTime());
}

/* ── Choghadiya (चौघड़िया) ── */

export type ChoghadiyaType = 'Udveg' | 'Char' | 'Labh' | 'Amrit' | 'Kaal' | 'Shubh' | 'Rog';

export interface ChoghadiyaPeriod {
  type: ChoghadiyaType;
  ruler: string;
  start: Date;
  end: Date;
  isAuspicious: boolean;
}

const CHOGHADIYA_CYCLE: ChoghadiyaType[] = ['Udveg', 'Char', 'Labh', 'Amrit', 'Kaal', 'Shubh', 'Rog'];

const CHOGHADIYA_RULERS: Record<ChoghadiyaType, string> = {
  Udveg: 'Sun',
  Char: 'Venus',
  Labh: 'Mercury',
  Amrit: 'Moon',
  Kaal: 'Saturn',
  Shubh: 'Jupiter',
  Rog: 'Mars',
};

const CHOGHADIYA_AUSPICIOUS: Record<ChoghadiyaType, boolean> = {
  Amrit: true,
  Shubh: true,
  Labh: true,
  Char: true,
  Udveg: false,
  Kaal: false,
  Rog: false,
};

const DAY_START_INDEX = [0, 6, 5, 4, 3, 2, 1] as const;
const NIGHT_START_INDEX = [4, 3, 2, 1, 0, 6, 5] as const;

/**
 * Calculate Choghadiya periods for day (sunrise→sunset) and night (sunset→nextSunrise).
 * @param sunrise  - Sunrise of the day
 * @param sunset   - Sunset of the day
 * @param nextSunrise - Sunrise of the following day
 * @param vara     - Day of week: 0=Sunday, 1=Monday, ... 6=Saturday
 */
export function calculateChoghadiya(
  sunrise: Date,
  sunset: Date,
  nextSunrise: Date,
  vara: number,
): { day: ChoghadiyaPeriod[]; night: ChoghadiyaPeriod[] } {
  const dayMs = sunset.getTime() - sunrise.getTime();
  const nightMs = nextSunrise.getTime() - sunset.getTime();
  const dayPortionMs = dayMs / 8;
  const nightPortionMs = nightMs / 8;

  const dayStartIdx = DAY_START_INDEX[vara];
  const nightStartIdx = NIGHT_START_INDEX[vara];

  const day: ChoghadiyaPeriod[] = [];
  for (let i = 0; i < 8; i++) {
    const type = CHOGHADIYA_CYCLE[(dayStartIdx + i) % 7];
    day.push({
      type,
      ruler: CHOGHADIYA_RULERS[type],
      start: new Date(sunrise.getTime() + i * dayPortionMs),
      end: new Date(sunrise.getTime() + (i + 1) * dayPortionMs),
      isAuspicious: CHOGHADIYA_AUSPICIOUS[type],
    });
  }

  const night: ChoghadiyaPeriod[] = [];
  for (let i = 0; i < 8; i++) {
    const type = CHOGHADIYA_CYCLE[(nightStartIdx + i) % 7];
    night.push({
      type,
      ruler: CHOGHADIYA_RULERS[type],
      start: new Date(sunset.getTime() + i * nightPortionMs),
      end: new Date(sunset.getTime() + (i + 1) * nightPortionMs),
      isAuspicious: CHOGHADIYA_AUSPICIOUS[type],
    });
  }

  return { day, night };
}
