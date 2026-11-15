import {
  PLANET_EXALTATION, PLANET_OWN_SIGNS, PLANET_DEBILITATION,
  RASHI_LORDS, NAISARGIKA_BALA, SHADBALA_REQUIRED,
  PLANET_FRIENDSHIPS, KENDRA_HOUSES,
} from './constants';
import { getPlanetDignity, getAspects } from './core';
import { getAllVargas, isVargottama } from './vargas';
import type { Planet, GrahaPlanet, RashiIndex, KundliChart, ShadBalaComponent, ShadBalaData, BhavaBalaData } from './types';

function norm360(v: number): number {
  return ((v % 360) + 360) % 360;
}

const EXALTATION_POINTS: Record<string, number> = {
  Sun: 10, Moon: 33, Mars: 298, Mercury: 165, Jupiter: 95, Venus: 357, Saturn: 200,
};

// --- Sthana Bala ---
function ucchaBalaSingle(planet: GrahaPlanet, siderealLon: number): number {
  const exPoint = EXALTATION_POINTS[planet] ?? 0;
  let diff = Math.abs(siderealLon - exPoint);
  if (diff > 180) diff = 360 - diff;
  return (180 - diff) / 3;
}

function kendradiBala(house: number): number {
  if ([1, 4, 7, 10].includes(house)) return 60;
  if ([2, 5, 8, 11].includes(house)) return 30;
  return 15;
}

function ojhaYugmaBala(planet: GrahaPlanet, rashi: RashiIndex): number {
  const isOddSign = rashi % 2 === 0;
  const maleP = ['Sun', 'Mars', 'Jupiter', 'Saturn'].includes(planet);
  if (maleP && isOddSign) return 15;
  if (!maleP && !isOddSign) return 15;
  return 0;
}

function drekkanaBala(planet: GrahaPlanet, degInSign: number): number {
  const part = degInSign < 10 ? 1 : degInSign < 20 ? 2 : 3;
  const male = ['Sun', 'Mars', 'Jupiter', 'Saturn'].includes(planet);
  if (male && part === 1) return 15;
  if (!male && part === 3) return 15;
  if (part === 2) return 15;
  return 0;
}

function sthanaBala(planet: GrahaPlanet, chart: KundliChart): number {
  const pos = chart.planets[planet];
  const uccha = ucchaBalaSingle(planet, pos.siderealLongitude);
  const kendradi = kendradiBala(pos.house);
  const ojha = ojhaYugmaBala(planet, pos.rashi);
  const drek = drekkanaBala(planet, pos.siderealLongitude % 30);
  // Simplified Sapta Vargaja: count favorable vargas * 7.5
  const vargas = getAllVargas(chart.ascendant.longitude, chart.planets);
  let vargaCount = 0;
  for (const v of Object.values(vargas)) {
    const vRashi = v.planets[planet]?.rashi;
    if (vRashi !== undefined) {
      const d = getPlanetDignity(planet, vRashi);
      if (d === 'exalted' || d === 'own' || d === 'moolatrikona' || d === 'friendly') vargaCount++;
    }
  }
  const saptaVargaja = vargaCount * 5;
  return uccha + saptaVargaja + ojha + kendradi + drek;
}

// --- Dig Bala ---
const DIG_BALA_HOUSES: Record<string, number> = {
  Jupiter: 1, Mercury: 1, Sun: 10, Mars: 10,
  Saturn: 7, Moon: 4, Venus: 4,
};

function digBala(planet: GrahaPlanet, chart: KundliChart): number {
  const targetHouse = DIG_BALA_HOUSES[planet] ?? 1;
  const diff = Math.abs(chart.planets[planet].house - targetHouse);
  const houseDist = diff > 6 ? 12 - diff : diff;
  return ((6 - houseDist) / 6) * 60;
}

// --- Kala Bala (simplified) ---
function kalaBala(planet: GrahaPlanet, chart: KundliChart): number {
  const date = chart.birthData.date;
  const hours = date.getHours() + date.getMinutes() / 60;
  const isDaytime = hours >= 6 && hours < 18;
  const diurnalPlanets = ['Sun', 'Jupiter', 'Venus'];
  const nocturnalPlanets = ['Moon', 'Mars', 'Saturn'];
  let nathonnatha = 30;
  if (diurnalPlanets.includes(planet) && isDaytime) nathonnatha = 60;
  if (nocturnalPlanets.includes(planet) && !isDaytime) nathonnatha = 60;
  if (planet === 'Mercury') nathonnatha = 60;

  const moonLon = chart.planets.Moon.siderealLongitude;
  const sunLon = chart.planets.Sun.siderealLongitude;
  let moonSunDiff = moonLon - sunLon;
  if (moonSunDiff < 0) moonSunDiff += 360;
  const isShukla = moonSunDiff < 180;
  const benefics = ['Jupiter', 'Venus', 'Mercury', 'Moon'];
  let paksha = 30;
  if (benefics.includes(planet) && isShukla) paksha = 60;
  if (!benefics.includes(planet) && !isShukla) paksha = 60;

  return nathonnatha + paksha;
}

// --- Cheshta Bala ---
function cheshtaBala(planet: GrahaPlanet, chart: KundliChart): number {
  if (planet === 'Sun' || planet === 'Moon') return 30;
  const speed = chart.planets[planet].speed;
  if (speed < -0.1) return 60;   // retrograde
  if (speed < 0) return 30;       // near station
  if (speed < 0.5) return 15;     // slow
  if (speed < 1.0) return 30;     // normal
  return 45;                       // fast
}

// --- Naisargika Bala ---
function naisargikaBala(planet: GrahaPlanet): number {
  return NAISARGIKA_BALA[planet] ?? 30;
}

// --- Drik Bala ---
function drikBala(planet: GrahaPlanet, chart: KundliChart): number {
  const beneficPlanets = ['Jupiter', 'Venus', 'Mercury', 'Moon'];
  let total = 0;
  const grahas: GrahaPlanet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  for (const g of grahas) {
    if (g === planet) continue;
    const aspects = getAspects(g, chart.planets[g].house);
    if (aspects.includes(chart.planets[planet].house)) {
      total += beneficPlanets.includes(g) ? 15 : -15;
    }
  }
  return Math.max(-60, Math.min(60, total / 4));
}

export function calculateShadbala(chart: KundliChart): ShadBalaData {
  const planets: GrahaPlanet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const result = {} as Record<GrahaPlanet, ShadBalaComponent>;
  const ishta = {} as Record<GrahaPlanet, number>;
  const kashta = {} as Record<GrahaPlanet, number>;

  for (const p of planets) {
    const sthana = sthanaBala(p, chart);
    const dig = digBala(p, chart);
    const kala = kalaBala(p, chart);
    const cheshta = cheshtaBala(p, chart);
    const naisargika = naisargikaBala(p);
    const drik = drikBala(p, chart);
    const total = sthana + dig + kala + cheshta + naisargika + drik;
    const required = SHADBALA_REQUIRED[p] ?? 300;
    const ratio = total / required;

    result[p] = { sthanaBala: sthana, digBala: dig, kalaBala: kala, cheshtaBala: cheshta, naisargikaBala: naisargika, drikBala: drik, total, required, ratio };

    const uccha = ucchaBalaSingle(p, chart.planets[p].siderealLongitude);
    ishta[p] = Math.sqrt(Math.max(0, uccha * cheshta));
    kashta[p] = Math.sqrt(Math.max(0, (60 - uccha) * (60 - cheshta)));
  }

  return { planets: result, ishtaPhala: ishta, kashtaPhala: kashta };
}

// --- Vimsopaka Bala ---
const VARGA_WEIGHTS_SHADVARGA: Record<string, number> = { d1: 6, d2: 2, d3: 4, d9: 5, d12: 2, d30: 1 };

export function calculateVimsopakaBala(chart: KundliChart): Record<GrahaPlanet, number> {
  const planets: GrahaPlanet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const vargas = getAllVargas(chart.ascendant.longitude, chart.planets);
  const result = {} as Record<GrahaPlanet, number>;

  for (const p of planets) {
    let weightedSum = 0;
    let totalWeight = 0;
    for (const [key, weight] of Object.entries(VARGA_WEIGHTS_SHADVARGA)) {
      const v = vargas[key];
      if (!v) continue;
      const vRashi = v.planets[p]?.rashi;
      if (vRashi === undefined) continue;
      const d = getPlanetDignity(p, vRashi);
      let points = 8;
      if (d === 'exalted') points = 20;
      else if (d === 'moolatrikona') points = 18;
      else if (d === 'own') points = 15;
      else if (d === 'friendly') points = 10;
      else if (d === 'enemy') points = 5;
      else if (d === 'debilitated') points = 2;
      weightedSum += points * weight;
      totalWeight += weight;
    }
    result[p] = totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 100) / 100 : 0;
  }
  return result;
}

// --- Vaiseshikamsa ---
export function calculateVaiseshikamsa(chart: KundliChart): Record<GrahaPlanet, { count: number; classification: string }> {
  const planets: GrahaPlanet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const vargas = getAllVargas(chart.ascendant.longitude, chart.planets);
  const result = {} as Record<GrahaPlanet, { count: number; classification: string }>;
  const names = ['', 'Parijata', 'Uttama', 'Gopura', 'Simhasana', 'Paravata', 'Devaloka', 'Iravatamsa'];

  for (const p of planets) {
    let count = 0;
    for (const v of Object.values(vargas)) {
      const vRashi = v.planets[p]?.rashi;
      if (vRashi === undefined) continue;
      const d = getPlanetDignity(p, vRashi);
      if (d === 'exalted' || d === 'own' || d === 'moolatrikona' || d === 'friendly') count++;
    }
    const clsIdx = Math.min(count, 7);
    result[p] = { count, classification: names[clsIdx] || 'Iravatamsa' };
  }
  return result;
}

// --- Bhava Bala ---
export function calculateBhavaBala(chart: KundliChart): BhavaBalaData {
  const shadbala = calculateShadbala(chart);
  const houses = chart.houses.map(h => {
    const lordPlanet = h.lord as GrahaPlanet;
    const bhavadhipati = shadbala.planets[lordPlanet]?.total ?? 0;
    const bhavaDig = h.house <= 6 ? (7 - h.house) * 10 : (h.house - 6) * 10;
    let bhavaDrishti = 0;
    const grahas: GrahaPlanet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
    for (const g of grahas) {
      const aspects = getAspects(g, chart.planets[g].house);
      if (aspects.includes(h.house)) {
        bhavaDrishti += ['Jupiter', 'Venus', 'Mercury'].includes(g) ? 10 : -5;
      }
    }
    return { house: h.house, bhavadhipatiBala: bhavadhipati, bhavaDigBala: bhavaDig, bhavaDrishtiBala: bhavaDrishti, total: bhavadhipati + bhavaDig + bhavaDrishti };
  });
  return { houses };
}
