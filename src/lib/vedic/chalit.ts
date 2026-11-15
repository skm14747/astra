import { getGMST, getObliquity } from '../astronomy/engine';
import { toSidereal } from '../astronomy/ayanamsa';
import { RASHI_NAMES } from './constants';
import type { Planet, RashiIndex, KundliChart, ChalitChart, BhavaMadhya, BhavaSandhi, Observer } from './types';

function norm360(v: number): number {
  return ((v % 360) + 360) % 360;
}

function midpoint(a: number, b: number): number {
  let diff = b - a;
  if (diff < 0) diff += 360;
  return norm360(a + diff / 2);
}

export function calculateMC(date: Date, observer: Observer, ayanamsa: number): number {
  const gmst = getGMST(date);
  const lmst = gmst + observer.longitude;
  const ramc = norm360(lmst);
  const oblRad = (getObliquity(date) * Math.PI) / 180;
  const ramcRad = (ramc * Math.PI) / 180;
  let mc = (Math.atan2(Math.sin(ramcRad), Math.cos(ramcRad) * Math.cos(oblRad)) * 180) / Math.PI;
  mc = norm360(mc);
  return toSidereal(mc, ayanamsa);
}

export function calculateSripatiChalit(chart: KundliChart): ChalitChart {
  const ascLon = chart.ascendant.longitude;
  const mc = calculateMC(chart.birthData.date, chart.birthData.observer, chart.ayanamsa);
  const ic = norm360(mc + 180);
  const desc = norm360(ascLon + 180);

  const madhyaLons: number[] = new Array(12).fill(0);
  madhyaLons[0] = ascLon;
  madhyaLons[6] = desc;
  madhyaLons[9] = mc;
  madhyaLons[3] = ic;

  // Trisect MC to Asc arc
  const arc1 = norm360(ascLon - mc + 360) % 360 || 360;
  madhyaLons[10] = norm360(mc + arc1 / 3);
  madhyaLons[11] = norm360(mc + (2 * arc1) / 3);

  // Trisect Asc to IC arc
  const arc2 = norm360(ic - ascLon + 360) % 360 || 360;
  madhyaLons[1] = norm360(ascLon + arc2 / 3);
  madhyaLons[2] = norm360(ascLon + (2 * arc2) / 3);

  // Opposite houses
  madhyaLons[4] = norm360(madhyaLons[10] + 180);
  madhyaLons[5] = norm360(madhyaLons[11] + 180);
  madhyaLons[7] = norm360(madhyaLons[1] + 180);
  madhyaLons[8] = norm360(madhyaLons[2] + 180);

  const madhyas: BhavaMadhya[] = madhyaLons.map((lon, i) => ({
    house: i + 1,
    longitude: lon,
    rashi: Math.floor(lon / 30) as RashiIndex,
    degree: Math.floor(lon % 30),
  }));

  // Sandhis = midpoint between consecutive madhyas
  const sandhis: BhavaSandhi[] = [];
  for (let i = 0; i < 12; i++) {
    const prev = (i + 11) % 12;
    sandhis.push({
      house: i + 1,
      longitude: midpoint(madhyaLons[prev], madhyaLons[i]),
    });
  }

  // Assign planets to bhavas
  const planetBhavas = {} as Record<Planet, { chalitHouse: number; rashiHouse: number; shift: number }>;
  const allPlanets: Planet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];

  for (const p of allPlanets) {
    const pLon = chart.planets[p].siderealLongitude;
    const rashiHouse = chart.planets[p].house;
    let chalitHouse = 1;

    for (let i = 0; i < 12; i++) {
      const start = sandhis[i].longitude;
      const end = sandhis[(i + 1) % 12].longitude;
      let inRange: boolean;
      if (start <= end) {
        inRange = pLon >= start && pLon < end;
      } else {
        inRange = pLon >= start || pLon < end;
      }
      if (inRange) {
        chalitHouse = i + 1;
        break;
      }
    }

    const shift = chalitHouse - rashiHouse;
    planetBhavas[p] = { chalitHouse, rashiHouse, shift: Math.abs(shift) > 6 ? 0 : shift };
  }

  return { madhyas, sandhis, planetBhavas };
}

export function getMoonChart(chart: KundliChart): { houses: { house: number; rashi: RashiIndex; rashiName: string; planets: Planet[] }[] } {
  const moonRashi = chart.planets.Moon.rashi;
  const houses = [];
  for (let i = 0; i < 12; i++) {
    const rashi = ((moonRashi + i) % 12) as RashiIndex;
    const planetsInHouse: Planet[] = [];
    for (const [name, pos] of Object.entries(chart.planets)) {
      if (pos.rashi === rashi) planetsInHouse.push(name as Planet);
    }
    houses.push({ house: i + 1, rashi, rashiName: RASHI_NAMES[rashi], planets: planetsInHouse });
  }
  return { houses };
}

export function getSunChart(chart: KundliChart): { houses: { house: number; rashi: RashiIndex; rashiName: string; planets: Planet[] }[] } {
  const sunRashi = chart.planets.Sun.rashi;
  const houses = [];
  for (let i = 0; i < 12; i++) {
    const rashi = ((sunRashi + i) % 12) as RashiIndex;
    const planetsInHouse: Planet[] = [];
    for (const [name, pos] of Object.entries(chart.planets)) {
      if (pos.rashi === rashi) planetsInHouse.push(name as Planet);
    }
    houses.push({ house: i + 1, rashi, rashiName: RASHI_NAMES[rashi], planets: planetsInHouse });
  }
  return { houses };
}
