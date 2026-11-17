import {
  getTropicalLongitude,
  getTropicalMoonLongitude,
  getTropicalSunLongitude,
  getPlanetSpeed,
  getMoonSpeed,
  getMeanLunarNode,
  getGMST,
  getObliquity,
} from '../astronomy/engine';
import { getAyanamsa, toSidereal } from '../astronomy/ayanamsa';
import {
  RASHI_NAMES,
  NAKSHATRA_NAMES,
  NAKSHATRA_LORDS,
  RASHI_LORDS,
  PLANET_EXALTATION,
  PLANET_DEBILITATION,
  PLANET_OWN_SIGNS,
  MOOLATRIKONA,
  COMBUST_LIMITS,
  COMBUST_LIMITS_RETRO,
  GRAHA_DRISHTI,
  PLANET_FRIENDSHIPS,
  NAKSHATRA_SPAN,
  PADA_SPAN,
} from './constants';
import type {
  Planet,
  RashiIndex,
  AyanamsaSystem,
  BirthData,
  PlanetPosition,
  HouseData,
  KundliChart,
  Observer,
  Dignity,
} from './types';

const GRAHA_PLANETS: Planet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

function norm360(v: number): number {
  return ((v % 360) + 360) % 360;
}

function getRashiIndex(lon: number): RashiIndex {
  return Math.floor(lon / 30) as RashiIndex;
}

function getNakshatraIndex(lon: number): number {
  return Math.floor(lon / NAKSHATRA_SPAN) % 27;
}

function getPada(lon: number): number {
  return (Math.floor(lon / PADA_SPAN) % 4) + 1;
}

function decomposeAngle(lon: number): { degree: number; minutes: number; seconds: number } {
  const inSign = lon % 30;
  const degree = Math.floor(inSign);
  const minRaw = (inSign - degree) * 60;
  const minutes = Math.floor(minRaw);
  const seconds = Math.round((minRaw - minutes) * 60);
  return { degree, minutes, seconds };
}

export function calculateAscendant(date: Date, observer: Observer): number {
  const gmst = getGMST(date);
  const lmst = gmst + observer.longitude;
  const ramc = norm360(lmst);
  const obliquity = getObliquity(date);
  const ramcRad = (ramc * Math.PI) / 180;
  const oblRad = (obliquity * Math.PI) / 180;
  const latRad = (observer.latitude * Math.PI) / 180;

  const y = Math.cos(ramcRad);
  const x = -(Math.sin(oblRad) * Math.tan(latRad) + Math.cos(oblRad) * Math.sin(ramcRad));
  let ascLon = (Math.atan2(y, x) * 180) / Math.PI;
  ascLon = norm360(ascLon);
  return ascLon;
}

export function calculatePlanetPosition(
  planet: Planet,
  date: Date,
  ayanamsa: number,
  ascendantRashi: RashiIndex
): PlanetPosition {
  let tropicalLon: number;
  let speed: number;

  if (planet === 'Rahu') {
    tropicalLon = getMeanLunarNode(date);
    speed = -0.053;
  } else if (planet === 'Ketu') {
    tropicalLon = norm360(getMeanLunarNode(date) + 180);
    speed = -0.053;
  } else if (planet === 'Moon') {
    tropicalLon = getTropicalMoonLongitude(date);
    speed = getMoonSpeed(date);
  } else if (planet === 'Sun') {
    tropicalLon = getTropicalSunLongitude(date);
    speed = getPlanetSpeed('Sun', date);
  } else {
    tropicalLon = getTropicalLongitude(planet, date);
    speed = getPlanetSpeed(planet, date);
  }

  const sidLon = toSidereal(tropicalLon, ayanamsa);
  const rashi = getRashiIndex(sidLon);
  const nakIdx = getNakshatraIndex(sidLon);
  const pada = getPada(sidLon);
  const { degree, minutes, seconds } = decomposeAngle(sidLon);
  const house = ((rashi - ascendantRashi + 12) % 12) + 1;

  return {
    planet,
    longitude: tropicalLon,
    siderealLongitude: sidLon,
    rashi,
    rashiName: RASHI_NAMES[rashi],
    degree,
    minutes,
    seconds,
    nakshatra: nakIdx,
    nakshatraName: NAKSHATRA_NAMES[nakIdx],
    nakshatraLord: NAKSHATRA_LORDS[NAKSHATRA_NAMES[nakIdx]],
    pada,
    speed,
    isRetrograde: speed < 0,
    house,
  };
}

export function getHouses(ascendantRashi: RashiIndex): HouseData[] {
  const houses: HouseData[] = [];
  for (let i = 0; i < 12; i++) {
    const rashi = ((ascendantRashi + i) % 12) as RashiIndex;
    houses.push({
      house: i + 1,
      rashi,
      rashiName: RASHI_NAMES[rashi],
      lord: RASHI_LORDS[rashi],
      planets: [],
    });
  }
  return houses;
}

export function assignPlanetsToHouses(
  houses: HouseData[],
  planets: Record<Planet, PlanetPosition>
): HouseData[] {
  const result = houses.map(h => ({ ...h, planets: [] as Planet[] }));
  for (const [name, pos] of Object.entries(planets)) {
    const houseIdx = pos.house - 1;
    if (houseIdx >= 0 && houseIdx < 12) {
      result[houseIdx].planets.push(name as Planet);
    }
  }
  return result;
}

export function generateKundli(birthData: BirthData, system: AyanamsaSystem = 'lahiri'): KundliChart {
  const { date, observer } = birthData;
  const ayanamsa = getAyanamsa(date, system);

  const tropicalAsc = calculateAscendant(date, observer);
  const siderealAsc = toSidereal(tropicalAsc, ayanamsa);
  const ascRashi = getRashiIndex(siderealAsc);
  const ascNakIdx = getNakshatraIndex(siderealAsc);
  const ascPada = getPada(siderealAsc);

  const allPlanets: Planet[] = [...GRAHA_PLANETS, 'Rahu', 'Ketu'];
  const planets = {} as Record<Planet, PlanetPosition>;
  for (const p of allPlanets) {
    planets[p] = calculatePlanetPosition(p, date, ayanamsa, ascRashi);
  }

  let houses = getHouses(ascRashi);
  houses = assignPlanetsToHouses(houses, planets);

  return {
    birthData,
    ayanamsa,
    ayanamsaSystem: system,
    ascendant: {
      longitude: siderealAsc,
      rashi: ascRashi,
      rashiName: RASHI_NAMES[ascRashi],
      degree: Math.floor(siderealAsc % 30),
      nakshatra: ascNakIdx,
      nakshatraName: NAKSHATRA_NAMES[ascNakIdx],
      pada: ascPada,
    },
    planets,
    houses,
  };
}

export function getPlanetDignity(planet: Planet, rashi: RashiIndex, degreeInSign?: number): Dignity {
  if (PLANET_EXALTATION[planet] === rashi) return 'exalted';
  if (PLANET_DEBILITATION[planet] === rashi) return 'debilitated';
  const mt = MOOLATRIKONA[planet];
  if (mt && mt.rashi === rashi && degreeInSign !== undefined && degreeInSign >= mt.startDeg && degreeInSign < mt.endDeg) {
    return 'moolatrikona';
  }
  const ownSigns = PLANET_OWN_SIGNS[planet];
  if (ownSigns && ownSigns.includes(rashi)) return 'own';
  const friendData = PLANET_FRIENDSHIPS[planet];
  if (friendData) {
    const rashiLord = RASHI_LORDS[rashi];
    if (friendData.friends.includes(rashiLord)) return 'friendly';
    if (friendData.enemies.includes(rashiLord)) return 'enemy';
  }
  return 'neutral';
}

export function isCombust(planet: Planet, planetLon: number, sunLon: number, isRetrograde: boolean): boolean {
  if (planet === 'Sun' || planet === 'Rahu' || planet === 'Ketu') return false;
  let diff = Math.abs(planetLon - sunLon);
  if (diff > 180) diff = 360 - diff;
  const limit = isRetrograde && COMBUST_LIMITS_RETRO[planet]
    ? COMBUST_LIMITS_RETRO[planet]!
    : COMBUST_LIMITS[planet];
  if (!limit) return false;
  return diff <= limit;
}

export function getAspects(sourcePlanet: Planet, sourceHouse: number): number[] {
  const aspects: number[] = [];
  const offsets = GRAHA_DRISHTI[sourcePlanet] ?? [6];
  for (const offset of offsets) {
    aspects.push(((sourceHouse - 1 + offset) % 12) + 1);
  }
  if (!GRAHA_DRISHTI[sourcePlanet]) {
    aspects.push(((sourceHouse - 1 + 6) % 12) + 1);
  }
  return aspects;
}

export function areMutuallyAspecting(
  p1: Planet, h1: number,
  p2: Planet, h2: number
): boolean {
  return getAspects(p1, h1).includes(h2) && getAspects(p2, h2).includes(h1);
}

// --- Phase 2: Conjunctions, Graha Yuddha, Avasthas ---

import type {
  ConjunctionResult,
  GrahaYuddhaResult,
  AvasthaResult,
  BalaAvastha,
  JagraduAvastha,
  DeeptadiAvastha,
} from './types';
import { getPlanetEcliptic } from '../astronomy/engine';

export function detectConjunctions(chart: KundliChart, orbDegrees: number = 12): ConjunctionResult[] {
  const results: ConjunctionResult[] = [];
  const allPlanets: Planet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];

  for (let i = 0; i < allPlanets.length; i++) {
    for (let j = i + 1; j < allPlanets.length; j++) {
      const p1 = allPlanets[i];
      const p2 = allPlanets[j];
      if (chart.planets[p1].rashi !== chart.planets[p2].rashi) continue;
      let diff = Math.abs(chart.planets[p1].siderealLongitude - chart.planets[p2].siderealLongitude);
      if (diff > 180) diff = 360 - diff;
      if (diff <= orbDegrees) {
        results.push({
          planet1: p1, planet2: p2,
          house: chart.planets[p1].house,
          orbDegrees: diff,
          isTight: diff <= 5,
        });
      }
    }
  }
  return results;
}

export function detectGrahaYuddha(chart: KundliChart): GrahaYuddhaResult[] {
  const results: GrahaYuddhaResult[] = [];
  const warriors: Planet[] = ['Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

  for (let i = 0; i < warriors.length; i++) {
    for (let j = i + 1; j < warriors.length; j++) {
      const p1 = warriors[i];
      const p2 = warriors[j];
      if (chart.planets[p1].rashi !== chart.planets[p2].rashi) continue;
      let diff = Math.abs(chart.planets[p1].siderealLongitude - chart.planets[p2].siderealLongitude);
      if (diff > 180) diff = 360 - diff;
      if (diff <= 1.0) {
        let winner: Planet;
        let loser: Planet;
        // BPHS ch.79 v.9: Venus always wins planetary war
        if (p1 === 'Venus') { winner = p1; loser = p2; }
        else if (p2 === 'Venus') { winner = p2; loser = p1; }
        else {
          try {
            const lat1 = getPlanetEcliptic(p1, chart.birthData.date).lat;
            const lat2 = getPlanetEcliptic(p2, chart.birthData.date).lat;
            // Planet further north (higher latitude) wins
            if (lat1 >= lat2) { winner = p1; loser = p2; }
            else { winner = p2; loser = p1; }
          } catch {
            winner = chart.planets[p1].siderealLongitude <= chart.planets[p2].siderealLongitude ? p1 : p2;
            loser = winner === p1 ? p2 : p1;
          }
        }
        results.push({ planet1: p1, planet2: p2, winner, loser, angularDiff: diff });
      }
    }
  }
  return results;
}

export function getBalaAvastha(degreeInSign: number): { avastha: BalaAvastha; strength: number } {
  if (degreeInSign < 6) return { avastha: 'Bala', strength: 25 };
  if (degreeInSign < 12) return { avastha: 'Kumara', strength: 50 };
  if (degreeInSign < 18) return { avastha: 'Yuva', strength: 100 };
  if (degreeInSign < 24) return { avastha: 'Vriddha', strength: 50 };
  return { avastha: 'Mrita', strength: 0 };
}

export function getJagraduAvastha(planet: Planet, rashi: RashiIndex): JagraduAvastha {
  const dignity = getPlanetDignity(planet, rashi);
  if (dignity === 'exalted' || dignity === 'own' || dignity === 'moolatrikona') return 'Jagrat';
  if (dignity === 'friendly') return 'Swapna';
  return 'Sushupti';
}

export function getDeeptadiAvastha(planet: Planet, chart: KundliChart): DeeptadiAvastha {
  const pos = chart.planets[planet];
  const dignity = getPlanetDignity(planet, pos.rashi, pos.siderealLongitude % 30);
  if (dignity === 'exalted') return 'Deepta';
  if (dignity === 'own' || dignity === 'moolatrikona') return 'Swastha';
  if (dignity === 'friendly') return 'Mudita';
  if (pos.isRetrograde && planet !== 'Rahu' && planet !== 'Ketu') return 'Shakta';
  if (isCombust(planet, pos.siderealLongitude, chart.planets.Sun.siderealLongitude, pos.isRetrograde)) return 'Dukhi';
  if (dignity === 'debilitated') return 'Khala';
  if (dignity === 'enemy') return 'Bhita';
  return 'Shanta';
}

export function calculateAvasthas(chart: KundliChart): AvasthaResult[] {
  const allPlanets: Planet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
  return allPlanets.map(planet => {
    const pos = chart.planets[planet];
    const degInSign = pos.siderealLongitude % 30;
    const balaResult = getBalaAvastha(degInSign);
    return {
      planet,
      bala: balaResult.avastha,
      balaStrength: balaResult.strength,
      jagradadi: getJagraduAvastha(planet, pos.rashi),
      deeptadi: getDeeptadiAvastha(planet, chart),
    };
  });
}
