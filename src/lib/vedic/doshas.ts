import type { Planet, KundliChart, DoshaResult } from './types';
import { KENDRA_HOUSES, KAAL_SARP_TYPES } from './constants';

function planetHouse(chart: KundliChart, planet: Planet): number {
  return chart.planets[planet]?.house ?? 0;
}

export function detectKaalSarpDosha(chart: KundliChart): DoshaResult {
  const rahuLon = chart.planets.Rahu.siderealLongitude;
  const ketuLon = chart.planets.Ketu.siderealLongitude;
  const planets: Planet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

  let side1 = 0;
  let side2 = 0;
  let onAxis = 0;

  for (const p of planets) {
    const lon = chart.planets[p].siderealLongitude;
    const distFromRahu = ((lon - rahuLon) % 360 + 360) % 360;
    if (distFromRahu < 1e-6 || Math.abs(distFromRahu - 180) < 1e-6) {
      onAxis++;
    } else if (distFromRahu < 180) {
      side1++;
    } else {
      side2++;
    }
  }

  const isFull = side1 === 7 || side2 === 7;
  const isPartial = onAxis > 0 && (side1 === 0 || side2 === 0);
  const isActive = isFull || isPartial;

  const jupH = planetHouse(chart, 'Jupiter');
  const isCancelled = (KENDRA_HOUSES as readonly number[]).includes(jupH);

  const rahuH = chart.planets.Rahu.house;
  const typeName = KAAL_SARP_TYPES[rahuH] || 'Unknown';

  return {
    name: 'Kaal Sarp Dosha',
    isActive: isActive && !isCancelled,
    severity: isFull ? 'severe' : 'moderate',
    type: `${typeName} Kaal Sarp (Rahu in house ${rahuH})`,
    cancellation: isCancelled ? `Jupiter in Kendra (house ${jupH}) cancels the dosha` : undefined,
    description: isFull
      ? 'All 7 planets hemmed between Rahu-Ketu axis'
      : isPartial
        ? 'Partial Kaal Sarp — some planets on the axis'
        : 'Not present',
  };
}

export function detectKemadrumaDosha(chart: KundliChart): DoshaResult {
  const moonH = planetHouse(chart, 'Moon');
  const h2 = (moonH % 12) + 1;
  const h12 = ((moonH + 10) % 12) + 1;

  const checkPlanets: Planet[] = ['Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const has2nd = checkPlanets.some(p => planetHouse(chart, p) === h2);
  const has12th = checkPlanets.some(p => planetHouse(chart, p) === h12);

  const isActive = !has2nd && !has12th;

  const kendraFromLagna = checkPlanets.some(p => (KENDRA_HOUSES as readonly number[]).includes(planetHouse(chart, p)));
  const kendraFromMoon = checkPlanets.some(p => {
    const dist = ((planetHouse(chart, p) - moonH + 12) % 12) + 1;
    return [1, 4, 7, 10].includes(dist);
  });

  const isCancelled = kendraFromLagna || kendraFromMoon;

  return {
    name: 'Kemadruma Dosha',
    isActive: isActive && !isCancelled,
    severity: 'moderate',
    cancellation: isCancelled ? 'Planets in Kendra from Lagna or Moon cancel the dosha' : undefined,
    description: isActive
      ? 'No planets in 2nd or 12th from Moon — periods of hardship possible'
      : 'Not present',
  };
}

export function detectGuruChandal(chart: KundliChart): DoshaResult {
  const isActive = planetHouse(chart, 'Jupiter') === planetHouse(chart, 'Rahu');
  return {
    name: 'Guru Chandal Yoga',
    isActive,
    severity: 'moderate',
    description: isActive
      ? 'Jupiter conjunct Rahu — unorthodox beliefs, challenges with teachers'
      : 'Not present',
  };
}

export function detectGrahanDosha(chart: KundliChart): DoshaResult[] {
  const results: DoshaResult[] = [];
  const sunH = planetHouse(chart, 'Sun');
  const moonH = planetHouse(chart, 'Moon');
  const rahuH = planetHouse(chart, 'Rahu');
  const ketuH = planetHouse(chart, 'Ketu');

  if (sunH === rahuH || sunH === ketuH) {
    results.push({
      name: 'Surya Grahan Dosha',
      isActive: true,
      severity: 'moderate',
      description: `Sun conjunct ${sunH === rahuH ? 'Rahu' : 'Ketu'} — eclipse on vitality and authority`,
    });
  }
  if (moonH === rahuH || moonH === ketuH) {
    results.push({
      name: 'Chandra Grahan Dosha',
      isActive: true,
      severity: 'moderate',
      description: `Moon conjunct ${moonH === rahuH ? 'Rahu' : 'Ketu'} — eclipse on mind and emotions`,
    });
  }
  return results;
}

export function detectAngarakDosha(chart: KundliChart): DoshaResult {
  const marsH = planetHouse(chart, 'Mars');
  const rahuH = planetHouse(chart, 'Rahu');
  const ketuH = planetHouse(chart, 'Ketu');
  const isActive = marsH === rahuH || marsH === ketuH;
  return {
    name: 'Angarak Dosha',
    isActive,
    severity: 'moderate',
    description: isActive
      ? `Mars conjunct ${marsH === rahuH ? 'Rahu' : 'Ketu'} — aggression, accidents, conflicts`
      : 'Not present',
  };
}

export function detectShrapitDosha(chart: KundliChart): DoshaResult {
  const isActive = planetHouse(chart, 'Saturn') === planetHouse(chart, 'Rahu');
  return {
    name: 'Shrapit Dosha',
    isActive,
    severity: 'severe',
    description: isActive
      ? 'Saturn conjunct Rahu — past-life karmic burden, delays and obstacles'
      : 'Not present',
  };
}

export function detectMangalDosha(chart: KundliChart): DoshaResult {
  const marsH = planetHouse(chart, 'Mars');
  const manglikHouses = [1, 2, 4, 7, 8, 12];
  const isActive = manglikHouses.includes(marsH);

  let cancellation: string | undefined;
  if (isActive) {
    if (planetHouse(chart, 'Jupiter') === marsH) {
      cancellation = 'Jupiter conjunct Mars cancels Mangal Dosha';
    } else if (planetHouse(chart, 'Saturn') === 1 || planetHouse(chart, 'Saturn') === 7) {
      cancellation = 'Saturn in 1st or 7th house mitigates Mangal Dosha';
    }
  }

  return {
    name: 'Mangal Dosha (Manglik)',
    isActive: isActive && !cancellation,
    severity: isActive ? 'moderate' : 'mild',
    cancellation,
    description: isActive
      ? `Mars in house ${marsH} — delays/conflicts in marriage`
      : 'Not present',
  };
}

// --- Phase 5: Additional Doshas ---

export function detectPitruDosha(chart: KundliChart): DoshaResult {
  const sunH = planetHouse(chart, 'Sun');
  const rahuH = planetHouse(chart, 'Rahu');
  const ketuH = planetHouse(chart, 'Ketu');
  const sunWithNode = sunH === rahuH || sunH === ketuH;
  const ninthLord = chart.houses.find(h => h.house === 9)?.lord;
  const ninthLordInDusthana = ninthLord ? [6, 8, 12].includes(planetHouse(chart, ninthLord as Planet)) : false;

  const isActive = sunWithNode || ninthLordInDusthana;
  return {
    name: 'Pitru Dosha',
    isActive,
    severity: sunWithNode ? 'severe' : 'moderate',
    description: isActive
      ? sunWithNode ? 'Sun with Rahu/Ketu — ancestral karmic debt' : '9th lord in Dusthana — paternal challenges'
      : 'Not present',
  };
}

export function detectVishYoga(chart: KundliChart): DoshaResult {
  const isActive = planetHouse(chart, 'Saturn') === planetHouse(chart, 'Moon');
  return {
    name: 'Vish Yoga',
    isActive,
    severity: 'moderate',
    description: isActive ? 'Saturn conjunct Moon — emotional suppression and chronic worry' : 'Not present',
  };
}

export function detectDaridrYoga(chart: KundliChart): DoshaResult {
  const lord11 = chart.houses.find(h => h.house === 11)?.lord as Planet;
  const lord11H = lord11 ? planetHouse(chart, lord11) : 0;
  const isActive = [6, 8, 12].includes(lord11H);
  return {
    name: 'Daridra Yoga',
    isActive,
    severity: 'moderate',
    description: isActive ? `11th lord in house ${lord11H} — persistent financial hardship` : 'Not present',
  };
}

export function detectGandmoolDosha(chart: KundliChart): DoshaResult {
  const moonNak = chart.planets.Moon.nakshatra;
  const gandmoolNaks = [0, 8, 9, 17, 18, 26]; // Ashwini, Ashlesha, Magha, Jyeshtha, Mula, Revati
  const isActive = gandmoolNaks.includes(moonNak);
  return {
    name: 'Gandmool Dosha',
    isActive,
    severity: 'moderate',
    description: isActive ? `Moon in ${chart.planets.Moon.nakshatraName} — Gandmool nakshatra, special birth rites needed` : 'Not present',
  };
}

export function detectNadiDosha(chart: KundliChart): DoshaResult {
  // Nadi Dosha is primarily for matching, detected here if Moon is in Aadi Nadi with specific conditions
  const moonNak = chart.planets.Moon.nakshatra;
  const nadi = moonNak % 3;
  return {
    name: 'Nadi Assessment',
    isActive: false,
    severity: 'mild',
    description: `Moon Nadi: ${['Aadi', 'Madhya', 'Antya'][nadi]} — primarily used in matching context`,
  };
}

/* #125 Naisargika Dosha — Natural malefics in sensitive houses */
export function detectNaisargikaDosha(chart: KundliChart): DoshaResult {
  const malefics = ['Sun', 'Mars', 'Saturn', 'Rahu', 'Ketu'] as const;
  const sensitiveHouses = [1, 4, 7, 8, 12];
  const afflictions: string[] = [];
  for (const m of malefics) {
    const h = chart.planets[m].house;
    if (sensitiveHouses.includes(h)) {
      afflictions.push(`${m} in ${h}th house`);
    }
  }
  return {
    name: 'Naisargika Dosha',
    isActive: afflictions.length >= 2,
    severity: afflictions.length >= 3 ? 'severe' : afflictions.length >= 2 ? 'moderate' : 'mild',
    description: afflictions.length > 0
      ? `Natural malefics in sensitive houses: ${afflictions.join(', ')}`
      : 'No significant Naisargika Dosha — malefics not concentrated in sensitive houses',
  };
}

export function detectAllDoshas(chart: KundliChart): DoshaResult[] {
  return [
    detectKaalSarpDosha(chart),
    detectKemadrumaDosha(chart),
    detectGuruChandal(chart),
    ...detectGrahanDosha(chart),
    detectAngarakDosha(chart),
    detectShrapitDosha(chart),
    detectMangalDosha(chart),
    detectPitruDosha(chart),
    detectVishYoga(chart),
    detectDaridrYoga(chart),
    detectGandmoolDosha(chart),
    detectNadiDosha(chart),
    detectNaisargikaDosha(chart),
  ];
}
