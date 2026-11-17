import {
  Body,
  GeoVector,
  Ecliptic,
  EclipticLongitude,
  SearchRiseSet,
  MakeTime,
  Observer as AstroObserver,
  SearchMoonNode,
  SearchLunarEclipse,
  NextGlobalSolarEclipse,
} from 'astronomy-engine';
import type { Observer } from '../vedic/types';

const PLANET_BODY_MAP: Record<string, Body> = {
  Sun: Body.Sun,
  Moon: Body.Moon,
  Mars: Body.Mars,
  Mercury: Body.Mercury,
  Jupiter: Body.Jupiter,
  Venus: Body.Venus,
  Saturn: Body.Saturn,
};

export function makeObserver(obs: Observer): AstroObserver {
  return new AstroObserver(obs.latitude, obs.longitude, obs.altitude ?? 0);
}

export function getTropicalLongitude(planet: string, date: Date): number {
  if (planet === 'Sun') return getTropicalSunLongitude(date);
  if (planet === 'Moon') return getTropicalMoonLongitude(date);
  const body = PLANET_BODY_MAP[planet];
  if (!body) throw new Error(`Unknown planet: ${planet}`);
  return EclipticLongitude(body, date);
}

export function getTropicalMoonLongitude(date: Date): number {
  const vec = GeoVector(Body.Moon, date, true);
  const ecl = Ecliptic(vec);
  return ecl.elon;
}

export function getTropicalSunLongitude(date: Date): number {
  const vec = GeoVector(Body.Sun, date, true);
  const ecl = Ecliptic(vec);
  return ecl.elon;
}

export function getPlanetEcliptic(planet: string, date: Date): { lon: number; lat: number } {
  const body = PLANET_BODY_MAP[planet];
  if (!body) throw new Error(`Unknown planet: ${planet}`);
  const vec = GeoVector(body, date, true);
  const ecl = Ecliptic(vec);
  return { lon: ecl.elon, lat: ecl.elat };
}

export function getPlanetSpeed(planet: string, date: Date): number {
  const halfWindow = 30 * 60 * 1000; // 30 minutes
  const before = new Date(date.getTime() - halfWindow);
  const after = new Date(date.getTime() + halfWindow);
  const lonBefore = getTropicalLongitude(planet, before);
  const lonAfter = getTropicalLongitude(planet, after);
  let diff = lonAfter - lonBefore;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return diff * 24; // degrees per day
}

export function getMoonSpeed(date: Date): number {
  const halfWindow = 30 * 60 * 1000;
  const before = new Date(date.getTime() - halfWindow);
  const after = new Date(date.getTime() + halfWindow);
  const lonBefore = getTropicalMoonLongitude(before);
  const lonAfter = getTropicalMoonLongitude(after);
  let diff = lonAfter - lonBefore;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return diff * 24;
}

export function getMeanLunarNode(date: Date): number {
  const T = (MakeTime(date).tt) / 36525.0;
  const omega = 125.04452 - 1934.136261 * T + 0.0020708 * T * T + (T * T * T) / 450000;
  return ((omega % 360) + 360) % 360;
}

export function getSunrise(date: Date, observer: Observer): Date | null {
  const obs = makeObserver(observer);
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const result = SearchRiseSet(Body.Sun, obs, +1, startOfDay, 1);
  return result ? result.date : null;
}

export function getSunset(date: Date, observer: Observer): Date | null {
  const obs = makeObserver(observer);
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const result = SearchRiseSet(Body.Sun, obs, -1, startOfDay, 1);
  return result ? result.date : null;
}

export function getGMST(date: Date): number {
  const jd = MakeTime(date).tt + 2451545.0;
  const T = (jd - 2451545.0) / 36525.0;
  const gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0)
    + 0.000387933 * T * T - (T * T * T) / 38710000.0;
  return ((gmst % 360) + 360) % 360;
}

export function getObliquity(date: Date): number {
  const T = MakeTime(date).tt / 36525.0;
  return 23.439291 - 0.0130042 * T - 1.64e-7 * T * T + 5.036e-7 * T * T * T;
}

// --- Phase 7: Advanced Astronomical Functions ---

// True Rahu (Moon's true ascending node)
export function getTrueRahu(date: Date): number {
  const vec = GeoVector(Body.Moon, date, true);
  const ecl = Ecliptic(vec);
  // True node approximation: use Moon's ascending node
  // astronomy-engine doesn't directly expose true node, so we use mean + perturbation
  const T = MakeTime(date).tt / 36525.0;
  const omega = 125.04452 - 1934.136261 * T + 0.0020708 * T * T + (T * T * T) / 450000;
  // Add major perturbation terms
  const D = 297.85036 + 445267.111480 * T;
  const M = 357.52772 + 35999.050340 * T;
  const Mp = 134.96298 + 477198.867398 * T;
  const dOmega = -1.274 * Math.sin((Mp * Math.PI) / 180) + 0.658 * Math.sin((2 * D * Math.PI) / 180);
  return ((omega + dOmega) % 360 + 360) % 360;
}

// Retrograde station detection via binary search
export function findNextStation(planet: string, startDate: Date, direction: 'direct' | 'retrograde', maxDays: number = 365): { date: Date; longitude: number } | null {
  const stepMs = 24 * 3600000; // 1 day
  let prevSpeed = getPlanetSpeed(planet, startDate);

  for (let d = 1; d <= maxDays; d++) {
    const checkDate = new Date(startDate.getTime() + d * stepMs);
    const speed = getPlanetSpeed(planet, checkDate);

    if ((direction === 'retrograde' && prevSpeed > 0 && speed <= 0) ||
        (direction === 'direct' && prevSpeed < 0 && speed >= 0)) {
      // Binary search for exact crossing
      let lo = startDate.getTime() + (d - 1) * stepMs;
      let hi = startDate.getTime() + d * stepMs;
      for (let i = 0; i < 30; i++) {
        const mid = (lo + hi) / 2;
        const midSpeed = getPlanetSpeed(planet, new Date(mid));
        if ((direction === 'retrograde' && midSpeed > 0) || (direction === 'direct' && midSpeed < 0)) {
          lo = mid;
        } else {
          hi = mid;
        }
      }
      const stationDate = new Date((lo + hi) / 2);
      return { date: stationDate, longitude: getTropicalLongitude(planet, stationDate) };
    }
    prevSpeed = speed;
  }
  return null;
}

// Planetary ingress (sign change) detection
export function findNextIngress(planet: string, startDate: Date, ayanamsa: number, maxDays: number = 400): { date: Date; rashi: number } | null {
  const norm = (v: number) => ((v % 360) + 360) % 360;
  const startLon = norm(getTropicalLongitude(planet, startDate) - ayanamsa);
  const startRashi = Math.floor(startLon / 30);

  const stepMs = 24 * 3600000;
  for (let d = 1; d <= maxDays; d++) {
    const checkDate = new Date(startDate.getTime() + d * stepMs);
    const lon = norm(getTropicalLongitude(planet, checkDate) - ayanamsa);
    const rashi = Math.floor(lon / 30);

    if (rashi !== startRashi) {
      // Binary search for exact crossing
      let lo = startDate.getTime() + (d - 1) * stepMs;
      let hi = startDate.getTime() + d * stepMs;
      for (let i = 0; i < 40; i++) {
        const mid = (lo + hi) / 2;
        const midLon = norm(getTropicalLongitude(planet, new Date(mid)) - ayanamsa);
        const midRashi = Math.floor(midLon / 30);
        if (midRashi === startRashi) lo = mid;
        else hi = mid;
      }
      return { date: new Date((lo + hi) / 2), rashi };
    }
  }
  return null;
}

// Sankranti detection (Sun's ingress)
export function findNextSankranti(startDate: Date, ayanamsa: number): { date: Date; rashi: number } | null {
  return findNextIngress('Sun', startDate, ayanamsa, 60);
}

// Local Mean Time
export function getLocalMeanTime(utcDate: Date, observerLongitude: number): Date {
  const offsetMs = Math.round(observerLongitude / 15.0) * 3600000;
  return new Date(utcDate.getTime() + offsetMs);
}

// Local Sidereal Time
export function getLocalSiderealTime(date: Date, observerLongitude: number): number {
  const gmst = getGMST(date);
  const lmst = gmst + observerLongitude;
  return ((lmst % 360) + 360) % 360;
}

// Sidereal <-> Tropical conversions
export function tropicalToSidereal(tropicalLon: number, ayanamsa: number): number {
  return ((tropicalLon - ayanamsa) % 360 + 360) % 360;
}

export function siderealToTropical(siderealLon: number, ayanamsa: number): number {
  return (siderealLon + ayanamsa) % 360;
}

/* ── #293 Refined Ingress (higher precision) ── */
export function findRefinedIngress(planet: string, startDate: Date, ayanamsa: number, maxDays: number = 400): { date: Date; rashi: number; precisionMs: number } | null {
  const base = findNextIngress(planet, startDate, ayanamsa, maxDays);
  if (!base) return null;
  // Extra Newton-style refinement: narrow ±30 sec around the base result
  const norm = (v: number) => ((v % 360) + 360) % 360;
  let lo = base.date.getTime() - 30_000;
  let hi = base.date.getTime() + 30_000;
  const targetRashi = base.rashi;
  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2;
    const midLon = norm(getTropicalLongitude(planet, new Date(mid)) - ayanamsa);
    const midRashi = Math.floor(midLon / 30);
    if (midRashi === targetRashi) hi = mid;
    else lo = mid;
  }
  const refinedMs = (lo + hi) / 2;
  return { date: new Date(refinedMs), rashi: targetRashi, precisionMs: (hi - lo) / 2 };
}

/* ── #282 True Rahu-Ketu (oscillating node) ── */
export function getTrueRahuLongitude(date: Date): number {
  try {
    const nodeEvent = SearchMoonNode(date);
    if (nodeEvent) {
      const geo = GeoVector(Body.Moon, nodeEvent.time, true);
      const ecl = Ecliptic(geo);
      return ecl.elon;
    }
  } catch { /* fall through */ }
  return getMeanLunarNode(date);
}

/* ── #291 Eclipse Detection ── */
export interface EclipseInfo {
  type: 'solar' | 'lunar';
  date: Date;
  kind: string;
}

export function findNextSolarEclipse(startDate: Date): EclipseInfo | null {
  try {
    const eclipse = NextGlobalSolarEclipse(startDate);
    if (eclipse) {
      return { type: 'solar', date: eclipse.peak.date, kind: eclipse.kind ?? 'partial' };
    }
  } catch { /* not supported in all versions */ }
  return null;
}

export function findNextLunarEclipse(startDate: Date): EclipseInfo | null {
  try {
    const eclipse = SearchLunarEclipse(startDate);
    if (eclipse) {
      return { type: 'lunar', date: eclipse.peak.date, kind: eclipse.kind ?? 'partial' };
    }
  } catch { /* not supported in all versions */ }
  return null;
}
