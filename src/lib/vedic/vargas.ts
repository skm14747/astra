import type { Planet, RashiIndex, VargaChart, HouseData, PlanetPosition } from './types';
import { RASHI_NAMES, RASHI_LORDS } from './constants';

function norm360(lon: number): number {
  return ((lon % 360) + 360) % 360;
}

function getRashiSign(lon: number): RashiIndex {
  return Math.floor(norm360(lon) / 30) as RashiIndex;
}

function getHoraSign(lon: number): RashiIndex {
  const n = norm360(lon);
  const rashi = Math.floor(n / 30);
  const deg = n % 30;
  const isOdd = rashi % 2 === 0;
  if (isOdd) return (deg < 15 ? 4 : 3) as RashiIndex;
  return (deg < 15 ? 3 : 4) as RashiIndex;
}

function getDrekkanaSign(lon: number): RashiIndex {
  const n = norm360(lon);
  const rashi = Math.floor(n / 30);
  const deg = n % 30;
  if (deg < 10) return rashi as RashiIndex;
  if (deg < 20) return ((rashi + 4) % 12) as RashiIndex;
  return ((rashi + 8) % 12) as RashiIndex;
}

function getChaturthamshaSign(lon: number): RashiIndex {
  const n = norm360(lon);
  const rashi = Math.floor(n / 30);
  const deg = n % 30;
  const part = Math.min(3, Math.floor(deg / 7.5));
  return ((rashi + part * 3) % 12) as RashiIndex;
}

function getPanchamshaSign(lon: number): RashiIndex {
  const n = norm360(lon);
  const rashi = Math.floor(n / 30);
  const deg = n % 30;
  const part = Math.min(4, Math.floor(deg / 6));
  const isOdd = rashi % 2 === 0;
  const oddSigns = [0, 10, 8, 2, 6];
  const evenSigns = [1, 3, 5, 7, 9];
  return (isOdd ? oddSigns[part] : evenSigns[part]) as RashiIndex;
}

function getShashthamshaSign(lon: number): RashiIndex {
  const n = norm360(lon);
  const rashi = Math.floor(n / 30);
  const deg = n % 30;
  const part = Math.min(5, Math.floor(deg / 5));
  const isOdd = rashi % 2 === 0;
  return (isOdd ? (0 + part) % 12 : (6 + part) % 12) as RashiIndex;
}

function getSaptamsaSign(lon: number): RashiIndex {
  const n = norm360(lon);
  const rashi = Math.floor(n / 30);
  const deg = n % 30;
  const part = Math.min(6, Math.floor(deg / (30 / 7)));
  const isOdd = rashi % 2 === 0;
  if (isOdd) return ((rashi + part) % 12) as RashiIndex;
  return (((rashi + 6) + part) % 12) as RashiIndex;
}

function getAshtamshaSign(lon: number): RashiIndex {
  const n = norm360(lon);
  const rashi = Math.floor(n / 30);
  const deg = n % 30;
  const part = Math.min(7, Math.floor(deg / 3.75));
  let start: number;
  if ([0, 3, 6, 9].includes(rashi)) start = 0;
  else if ([1, 4, 7, 10].includes(rashi)) start = 8;
  else start = 4;
  return ((start + part) % 12) as RashiIndex;
}

function getNavamsaSign(lon: number): RashiIndex {
  const n = norm360(lon);
  const span = 360 / 108;
  const idx = Math.floor(n / span);
  return (idx % 12) as RashiIndex;
}

function getDasamsaSign(lon: number): RashiIndex {
  const n = norm360(lon);
  const rashi = Math.floor(n / 30);
  const deg = n % 30;
  const part = Math.min(9, Math.floor(deg / 3));
  const isOdd = rashi % 2 === 0;
  if (isOdd) return ((rashi + part) % 12) as RashiIndex;
  return (((rashi + 8) + part) % 12) as RashiIndex;
}

function getRudramshaSign(lon: number): RashiIndex {
  const n = norm360(lon);
  const rashi = Math.floor(n / 30);
  const deg = n % 30;
  const part = Math.min(10, Math.floor(deg / (30 / 11)));
  const start = (12 - rashi) % 12;
  return ((start + part) % 12) as RashiIndex;
}

function getDwadasamsaSign(lon: number): RashiIndex {
  const n = norm360(lon);
  const rashi = Math.floor(n / 30);
  const deg = n % 30;
  const part = Math.min(11, Math.floor(deg / 2.5));
  return ((rashi + part) % 12) as RashiIndex;
}

function getShodasamsaSign(lon: number): RashiIndex {
  const n = norm360(lon);
  const sign = Math.floor(n / 30);
  const deg = n % 30;
  const part = Math.min(15, Math.floor(deg / 1.875));
  let start: number;
  if ([0, 3, 6, 9].includes(sign)) start = 0;
  else if ([1, 4, 7, 10].includes(sign)) start = 4;
  else start = 8;
  return ((start + part) % 12) as RashiIndex;
}

function getVimsamsaSign(lon: number): RashiIndex {
  const n = norm360(lon);
  const sign = Math.floor(n / 30);
  const deg = n % 30;
  const div = Math.min(20, Math.floor(deg / 1.5) + 1);
  let start: number;
  if (sign % 3 === 0) start = 0;
  else if (sign % 3 === 1) start = 8;
  else start = 4;
  return ((start + (div - 1)) % 12) as RashiIndex;
}

function getChaturvimshamsaSign(lon: number): RashiIndex {
  const n = norm360(lon);
  const sign = Math.floor(n / 30);
  const deg = n % 30;
  const div = Math.min(23, Math.floor(deg / 1.25));
  if (sign % 2 === 0) return ((4 + div) % 12) as RashiIndex;
  return ((3 + div) % 12) as RashiIndex;
}

function getSaptavimshamshaSign(lon: number): RashiIndex {
  const n = norm360(lon);
  const rashi = Math.floor(n / 30);
  const deg = n % 30;
  const div = Math.min(26, Math.floor(deg / (30 / 27)));
  let start: number;
  if ([0, 4, 8].includes(rashi)) start = 0;
  else if ([1, 5, 9].includes(rashi)) start = 3;
  else if ([2, 6, 10].includes(rashi)) start = 6;
  else start = 9;
  return ((start + div) % 12) as RashiIndex;
}

function getTrimshamshaSign(lon: number): RashiIndex {
  const n = norm360(lon);
  const sign = Math.floor(n / 30);
  const deg = n % 30;
  const isOdd = sign % 2 === 0;
  if (isOdd) {
    if (deg < 5) return 0;
    if (deg < 10) return 10;
    if (deg < 18) return 8;
    if (deg < 25) return 2;
    return 6;
  } else {
    if (deg < 5) return 1;
    if (deg < 12) return 5;
    if (deg < 20) return 11;
    if (deg < 25) return 9;
    return 7;
  }
}

function getKhavedamshaSign(lon: number): RashiIndex {
  const n = norm360(lon);
  const rashi = Math.floor(n / 30);
  const within = n - rashi * 30;
  const div = Math.min(40, Math.floor(within / 0.75) + 1);
  const isOdd = rashi % 2 === 0;
  const start = isOdd ? 0 : 6;
  return ((start + (div - 1)) % 12) as RashiIndex;
}

function getAkshavedamshaSign(lon: number): RashiIndex {
  const n = norm360(lon);
  const sign = Math.floor(n / 30);
  const deg = n % 30;
  const div = Math.min(44, Math.floor(deg / (40 / 60)));
  let start: number;
  if ([0, 3, 6, 9].includes(sign)) start = 0;
  else if ([1, 4, 7, 10].includes(sign)) start = 4;
  else start = 8;
  return ((start + div) % 12) as RashiIndex;
}

function getShastiamsaSign(lon: number): RashiIndex {
  const n = norm360(lon);
  const sign = Math.floor(n / 30);
  const deg = n % 30;
  const part = Math.min(59, Math.floor(deg / 0.5));
  return ((sign + part) % 12) as RashiIndex;
}

type VargaCalcFn = (lon: number) => RashiIndex;

const VARGA_FUNCTIONS: Record<string, { name: string; division: number; fn: VargaCalcFn }> = {
  d1: { name: 'Rashi', division: 1, fn: getRashiSign },
  d2: { name: 'Hora', division: 2, fn: getHoraSign },
  d3: { name: 'Drekkana', division: 3, fn: getDrekkanaSign },
  d4: { name: 'Chaturthamsha', division: 4, fn: getChaturthamshaSign },
  d5: { name: 'Panchamsha', division: 5, fn: getPanchamshaSign },
  d6: { name: 'Shashthamsha', division: 6, fn: getShashthamshaSign },
  d7: { name: 'Saptamsha', division: 7, fn: getSaptamsaSign },
  d8: { name: 'Ashtamsha', division: 8, fn: getAshtamshaSign },
  d9: { name: 'Navamsha', division: 9, fn: getNavamsaSign },
  d10: { name: 'Dashamsha', division: 10, fn: getDasamsaSign },
  d11: { name: 'Rudramsha', division: 11, fn: getRudramshaSign },
  d12: { name: 'Dwadashamsha', division: 12, fn: getDwadasamsaSign },
  d16: { name: 'Shodashamsha', division: 16, fn: getShodasamsaSign },
  d20: { name: 'Vimshamsha', division: 20, fn: getVimsamsaSign },
  d24: { name: 'Chaturvimshamsha', division: 24, fn: getChaturvimshamsaSign },
  d27: { name: 'Saptavimshamsha', division: 27, fn: getSaptavimshamshaSign },
  d30: { name: 'Trimshamsha', division: 30, fn: getTrimshamshaSign },
  d40: { name: 'Khavedamsha', division: 40, fn: getKhavedamshaSign },
  d45: { name: 'Akshavedamsha', division: 45, fn: getAkshavedamshaSign },
  d60: { name: 'Shashtyamsha', division: 60, fn: getShastiamsaSign },
};

function buildVargaChart(
  vargaKey: string,
  ascendantLon: number,
  planets: Record<Planet, PlanetPosition>
): VargaChart {
  const varga = VARGA_FUNCTIONS[vargaKey];
  if (!varga) throw new Error(`Unknown varga: ${vargaKey}`);

  const ascRashi = varga.fn(ascendantLon);
  const vargaPlanets = {} as Record<Planet, { rashi: RashiIndex; rashiName: string }>;

  for (const [name, pos] of Object.entries(planets)) {
    const rashi = varga.fn(pos.siderealLongitude);
    vargaPlanets[name as Planet] = { rashi, rashiName: RASHI_NAMES[rashi] };
  }

  const houses: HouseData[] = [];
  for (let i = 0; i < 12; i++) {
    const rashi = ((ascRashi + i) % 12) as RashiIndex;
    const planetsInHouse: Planet[] = [];
    for (const [name, data] of Object.entries(vargaPlanets)) {
      if (data.rashi === rashi) planetsInHouse.push(name as Planet);
    }
    houses.push({
      house: i + 1,
      rashi,
      rashiName: RASHI_NAMES[rashi],
      lord: RASHI_LORDS[rashi],
      planets: planetsInHouse,
    });
  }

  return { name: varga.name, division: varga.division, ascendantRashi: ascRashi, planets: vargaPlanets, houses };
}

export function getAllVargas(
  ascendantLon: number,
  planets: Record<Planet, PlanetPosition>
): Record<string, VargaChart> {
  const result: Record<string, VargaChart> = {};
  for (const key of Object.keys(VARGA_FUNCTIONS)) {
    result[key] = buildVargaChart(key, ascendantLon, planets);
  }
  return result;
}

export function getNavamsaChart(ascendantLon: number, planets: Record<Planet, PlanetPosition>): VargaChart {
  return buildVargaChart('d9', ascendantLon, planets);
}

export function isVargottama(d1Rashi: RashiIndex, d9Rashi: RashiIndex): boolean {
  return d1Rashi === d9Rashi;
}

export { VARGA_FUNCTIONS };
