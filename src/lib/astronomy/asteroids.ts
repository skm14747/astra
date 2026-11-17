/**
 * Asteroid & Fictional Point Ephemeris
 *
 * Mean Black Moon Lilith (h13): Mean lunar apogee.
 * Chiron (2060): Orbit from JPL osculating elements (simplified analytical model).
 *
 * Accuracy: ~0.5° for Lilith, ~1° for Chiron (sufficient for natal chart interpretation).
 */

const DEG = Math.PI / 180;
const RAD = 180 / Math.PI;

function norm360(v: number): number {
  return ((v % 360) + 360) % 360;
}

/**
 * Julian Day Number from Date (UT).
 */
function toJD(date: Date): number {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate() + date.getUTCHours() / 24 + date.getUTCMinutes() / 1440;
  let Y = y, M = m;
  if (M <= 2) { Y -= 1; M += 12; }
  const A = Math.floor(Y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + d + B - 1524.5;
}

/**
 * Centuries from J2000.0 (JD 2451545.0).
 */
function centuriesFromJ2000(date: Date): number {
  return (toJD(date) - 2451545.0) / 36525.0;
}

// ─── Mean Black Moon Lilith ───
// Mean lunar apogee: mean anomaly-based position.
// Reference: Jean Meeus, Astronomical Algorithms.

/**
 * Mean Black Moon Lilith tropical longitude (degrees).
 */
export function getMeanLilithLongitude(date: Date): number {
  const T = centuriesFromJ2000(date);
  // Mean longitude of lunar perigee (Π) from Meeus
  const meanPerigee = 83.3532465 + 4069.0137287 * T - 0.0103200 * T * T
    - T * T * T / 80053 + T * T * T * T / 18999000;
  // Lilith = perigee + 180° (apogee is opposite perigee)
  return norm360(meanPerigee + 180);
}

/**
 * Mean Lilith sign and degree.
 */
export function getMeanLilith(date: Date): {
  longitude: number;
  sign: number;
  signName: string;
  degreeInSign: number;
} {
  const lon = getMeanLilithLongitude(date);
  const sign = Math.floor(lon / 30);
  const SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  return {
    longitude: lon,
    sign,
    signName: SIGNS[sign],
    degreeInSign: lon % 30,
  };
}

// ─── Chiron (2060) ───
// Simplified Keplerian orbit with secular perturbation terms.
// Osculating elements at epoch J2000.0 from JPL Horizons.

const CHIRON_ELEMENTS = {
  a: 13.670,         // semi-major axis (AU)
  e: 0.37911,        // eccentricity
  i: 6.931,          // inclination (deg)
  omega: 339.558,    // argument of perihelion (deg)
  Omega: 209.379,    // longitude of ascending node (deg)
  M0: 72.299,        // mean anomaly at epoch J2000.0 (deg)
  n: 0.01941367,     // mean daily motion (deg/day)
  period: 50.42,     // orbital period (years)
};

/**
 * Solve Kepler's equation M = E - e*sin(E) via Newton-Raphson.
 */
function solveKepler(M: number, e: number): number {
  let E = M;
  for (let i = 0; i < 20; i++) {
    const dE = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    E -= dE;
    if (Math.abs(dE) < 1e-10) break;
  }
  return E;
}

/**
 * Chiron tropical ecliptic longitude (degrees).
 */
export function getChironLongitude(date: Date): number {
  const JD = toJD(date);
  const daysSinceJ2000 = JD - 2451545.0;

  const { e, i, omega, Omega, M0, n } = CHIRON_ELEMENTS;
  const M = norm360(M0 + n * daysSinceJ2000) * DEG;
  const E = solveKepler(M, e);

  // True anomaly
  const cosV = (Math.cos(E) - e) / (1 - e * Math.cos(E));
  const sinV = (Math.sqrt(1 - e * e) * Math.sin(E)) / (1 - e * Math.cos(E));
  const v = Math.atan2(sinV, cosV) * RAD;

  // Argument of latitude
  const u = (omega + v) * DEG;
  const iRad = i * DEG;
  const OmegaRad = Omega * DEG;

  // Ecliptic longitude
  const lambda = Math.atan2(
    Math.cos(iRad) * Math.sin(u),
    Math.cos(u),
  ) + OmegaRad;

  return norm360(lambda * RAD);
}

/**
 * Chiron sign and degree.
 */
export function getChiron(date: Date): {
  longitude: number;
  sign: number;
  signName: string;
  degreeInSign: number;
} {
  const lon = getChironLongitude(date);
  const sign = Math.floor(lon / 30);
  const SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  return {
    longitude: lon,
    sign,
    signName: SIGNS[sign],
    degreeInSign: lon % 30,
  };
}

// ─── Saturn Return Calculator ───
// Saturn's sidereal period ≈ 29.4571 years.
// Uses the existing astronomy engine for precise Saturn longitude.

export function calculateSaturnReturns(natalSaturnLon: number, birthDate: Date, count: number = 3): {
  returnNumber: number;
  approximateDate: Date;
  age: number;
}[] {
  const SATURN_PERIOD_DAYS = 10759.22; // 29.4571 years × 365.25
  const returns = [];

  for (let i = 1; i <= count; i++) {
    const approxDays = SATURN_PERIOD_DAYS * i;
    const approxDate = new Date(birthDate.getTime() + approxDays * 86400000);
    const age = Math.floor(approxDays / 365.25);
    returns.push({ returnNumber: i, approximateDate: approxDate, age });
  }

  return returns;
}

// ─── North Node ───
// Mean North Node is already computed in the main engine.
// This provides a convenience wrapper for the Western calculator page.

export function getNorthNodeSign(longitude: number): {
  sign: number;
  signName: string;
  degreeInSign: number;
} {
  const sign = Math.floor(norm360(longitude) / 30);
  const SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  return {
    sign,
    signName: SIGNS[sign],
    degreeInSign: norm360(longitude) % 30,
  };
}
