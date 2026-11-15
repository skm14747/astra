import type { Planet, GrahaPlanet, KundliChart, AshtakavargaData } from './types';

const BAV_CONTRIBUTIONS: Record<string, Record<string, number[]>> = {
  Sun: {
    Sun: [1, 2, 4, 7, 8, 9, 10, 11],
    Moon: [3, 6, 10, 11],
    Mars: [1, 2, 4, 7, 8, 9, 10, 11],
    Mercury: [3, 5, 6, 9, 10, 11, 12],
    Jupiter: [5, 6, 9, 11],
    Venus: [6, 7, 12],
    Saturn: [1, 2, 4, 7, 8, 9, 10, 11],
    Ascendant: [3, 4, 6, 10, 11, 12],
  },
  Moon: {
    Sun: [3, 6, 7, 8, 10, 11],
    Moon: [1, 3, 6, 7, 10, 11],
    Mars: [2, 3, 5, 6, 9, 10, 11],
    Mercury: [1, 3, 4, 5, 7, 8, 10, 11],
    Jupiter: [1, 4, 7, 8, 10, 11, 12],
    Venus: [3, 4, 5, 7, 9, 10, 11],
    Saturn: [3, 5, 6, 11],
    Ascendant: [3, 6, 10, 11],
  },
  Mars: {
    Sun: [3, 5, 6, 10, 11],
    Moon: [3, 6, 11],
    Mars: [1, 2, 4, 7, 8, 10, 11],
    Mercury: [3, 5, 6, 11],
    Jupiter: [6, 10, 11, 12],
    Venus: [6, 8, 11, 12],
    Saturn: [1, 4, 7, 8, 9, 10, 11],
    Ascendant: [1, 3, 6, 10, 11],
  },
  Mercury: {
    Sun: [5, 6, 9, 11, 12],
    Moon: [2, 4, 6, 8, 10, 11],
    Mars: [1, 2, 4, 7, 8, 9, 10, 11],
    Mercury: [1, 3, 5, 6, 9, 10, 11, 12],
    Jupiter: [6, 8, 11, 12],
    Venus: [1, 2, 3, 4, 5, 8, 9, 11],
    Saturn: [1, 2, 4, 7, 8, 9, 10, 11],
    Ascendant: [1, 2, 4, 6, 8, 10, 11],
  },
  Jupiter: {
    Sun: [1, 2, 3, 4, 7, 8, 9, 10, 11],
    Moon: [2, 5, 7, 9, 11],
    Mars: [1, 2, 4, 7, 8, 10, 11],
    Mercury: [1, 2, 4, 5, 6, 9, 10, 11],
    Jupiter: [1, 2, 3, 4, 7, 8, 10, 11],
    Venus: [2, 5, 6, 9, 10, 11],
    Saturn: [3, 5, 6, 12],
    Ascendant: [1, 2, 4, 5, 6, 7, 9, 10, 11],
  },
  Venus: {
    Sun: [8, 11, 12],
    Moon: [1, 2, 3, 4, 5, 8, 9, 11, 12],
    Mars: [3, 4, 6, 8, 9, 11, 12],
    Mercury: [3, 5, 6, 9, 11],
    Jupiter: [5, 8, 9, 10, 11],
    Venus: [1, 2, 3, 4, 5, 8, 9, 10, 11],
    Saturn: [3, 4, 5, 8, 9, 10, 11],
    Ascendant: [1, 2, 3, 4, 5, 8, 9, 11],
  },
  Saturn: {
    Sun: [1, 2, 4, 7, 8, 10, 11],
    Moon: [3, 6, 11],
    Mars: [3, 5, 6, 10, 11, 12],
    Mercury: [6, 8, 9, 10, 11, 12],
    Jupiter: [5, 6, 11, 12],
    Venus: [6, 11, 12],
    Saturn: [3, 5, 6, 11],
    Ascendant: [1, 3, 4, 6, 10, 11],
  },
};

export function calculateBAV(chart: KundliChart): Record<GrahaPlanet, number[]> {
  const planets: GrahaPlanet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const refPoints = [...planets, 'Ascendant'] as const;
  const bav = {} as Record<GrahaPlanet, number[]>;

  for (const planet of planets) {
    const bindus = new Array(12).fill(0);
    const contributions = BAV_CONTRIBUTIONS[planet];
    if (!contributions) continue;

    for (const ref of refPoints) {
      let refRashi: number;
      if (ref === 'Ascendant') {
        refRashi = chart.ascendant.rashi;
      } else {
        refRashi = chart.planets[ref as Planet]?.rashi ?? 0;
      }

      const offsets = contributions[ref];
      if (!offsets) continue;

      for (const offset of offsets) {
        const targetRashi = (refRashi + offset - 1) % 12;
        bindus[targetRashi]++;
      }
    }

    bav[planet] = bindus;
  }

  return bav;
}

export function calculateSAV(bav: Record<GrahaPlanet, number[]>): number[] {
  const sav = new Array(12).fill(0);
  for (const planet of Object.values(bav)) {
    for (let i = 0; i < 12; i++) {
      sav[i] += planet[i];
    }
  }
  return sav;
}

export function calculateAshtakavarga(chart: KundliChart): AshtakavargaData {
  const bav = calculateBAV(chart);
  const sav = calculateSAV(bav);
  return { bav, sav };
}

export function getWeakHouses(sav: number[]): number[] {
  return sav.map((v, i) => (v < 27 ? i + 1 : -1)).filter(h => h > 0);
}
