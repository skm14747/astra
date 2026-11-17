import type { Planet, KundliChart, YogaResult, HouseData } from './types';
import { KENDRA_HOUSES, TRIKONA_HOUSES, PANCHA_MAHAPURUSHA, RASHI_LORDS } from './constants';

function houseLord(chart: KundliChart, houseNum: number): string {
  const h = chart.houses.find(h => h.house === houseNum);
  return h ? h.lord : '';
}

function planetHouse(chart: KundliChart, planet: Planet): number {
  return chart.planets[planet]?.house ?? 0;
}

function planetRashi(chart: KundliChart, planet: Planet): number {
  return chart.planets[planet]?.rashi ?? -1;
}

function planetsInHouse(chart: KundliChart, houseNum: number): Planet[] {
  const h = chart.houses.find(h => h.house === houseNum);
  return h ? h.planets : [];
}

export function detectKendraTrikona(chart: KundliChart): YogaResult[] {
  const results: YogaResult[] = [];
  for (const kh of KENDRA_HOUSES) {
    for (const th of TRIKONA_HOUSES) {
      if (kh === th) continue;
      const kLord = houseLord(chart, kh);
      const tLord = houseLord(chart, th);
      if (kLord === tLord) continue;
      const kHouse = planetHouse(chart, kLord as Planet);
      const tHouse = planetHouse(chart, tLord as Planet);
      if (kHouse === tHouse) {
        const strength = [1, 4, 5, 7, 9, 10].includes(kHouse) ? 'Very Strong' : 'Strong';
        results.push({
          name: 'Kendra-Trikona Raja Yoga',
          type: 'benefic',
          strength,
          description: `${kLord} (lord of ${kh}) and ${tLord} (lord of ${th}) conjoin in house ${kHouse}`,
          planets: [kLord as Planet, tLord as Planet],
          houses: [kh, th, kHouse],
        });
      }
    }
  }
  return results;
}

export function detectDharmaKarmadhipati(chart: KundliChart): YogaResult | null {
  const lord9 = houseLord(chart, 9);
  const lord10 = houseLord(chart, 10);
  if (lord9 === lord10) return null;
  if (planetHouse(chart, lord9 as Planet) === planetHouse(chart, lord10 as Planet)) {
    return {
      name: 'Dharma Karmadhipati Raja Yoga',
      type: 'benefic',
      strength: 'Supreme',
      description: `${lord9} (9th lord) and ${lord10} (10th lord) conjoin — supreme combination`,
      planets: [lord9 as Planet, lord10 as Planet],
      houses: [9, 10],
    };
  }
  return null;
}

export function detectGajaKesari(chart: KundliChart): YogaResult | null {
  const moonH = planetHouse(chart, 'Moon');
  const jupH = planetHouse(chart, 'Jupiter');
  const dist = ((jupH - moonH + 12) % 12) + 1;
  if ([1, 4, 7, 10].includes(dist)) {
    return {
      name: 'Gaja Kesari Yoga',
      type: 'benefic',
      strength: 'Strong',
      description: `Jupiter in ${dist}th from Moon — wisdom, fame, and prosperity`,
      planets: ['Moon', 'Jupiter'],
      houses: [moonH, jupH],
    };
  }
  return null;
}

export function detectPanchaMahapurusha(chart: KundliChart): YogaResult[] {
  const results: YogaResult[] = [];
  for (const [name, config] of Object.entries(PANCHA_MAHAPURUSHA)) {
    const h = planetHouse(chart, config.planet);
    const r = planetRashi(chart, config.planet);
    if (KENDRA_HOUSES.includes(h as 1 | 4 | 7 | 10) && config.signs.includes(r as (typeof config.signs)[number])) {
      results.push({
        name: `${name} Yoga`,
        type: 'benefic',
        strength: 'Strong',
        description: `${config.planet} in own/exalted sign in Kendra house ${h}`,
        planets: [config.planet],
        houses: [h],
      });
    }
  }
  return results;
}

export function detectBudhadityaYoga(chart: KundliChart): YogaResult | null {
  if (planetHouse(chart, 'Sun') === planetHouse(chart, 'Mercury')) {
    return {
      name: 'Budhaditya Yoga',
      type: 'benefic',
      strength: 'Moderate',
      description: 'Sun and Mercury conjoin — intelligence and communication',
      planets: ['Sun', 'Mercury'],
      houses: [planetHouse(chart, 'Sun')],
    };
  }
  return null;
}

export function detectChandraMangalaYoga(chart: KundliChart): YogaResult | null {
  if (planetHouse(chart, 'Moon') === planetHouse(chart, 'Mars')) {
    return {
      name: 'Chandra-Mangala Yoga',
      type: 'benefic',
      strength: 'Moderate',
      description: 'Moon and Mars conjoin — wealth through enterprise',
      planets: ['Moon', 'Mars'],
      houses: [planetHouse(chart, 'Moon')],
    };
  }
  return null;
}

export function detectSaraswatiYoga(chart: KundliChart): YogaResult | null {
  const goodHouses = [1, 2, 4, 5, 7, 9, 10];
  const meH = planetHouse(chart, 'Mercury');
  const juH = planetHouse(chart, 'Jupiter');
  const veH = planetHouse(chart, 'Venus');
  if (goodHouses.includes(meH) && goodHouses.includes(juH) && goodHouses.includes(veH)) {
    return {
      name: 'Saraswati Yoga',
      type: 'benefic',
      strength: 'Strong',
      description: 'Mercury, Jupiter, Venus all in benefic houses — scholarly fame',
      planets: ['Mercury', 'Jupiter', 'Venus'],
      houses: [meH, juH, veH],
    };
  }
  return null;
}

export function detectVipreetRajaYogas(chart: KundliChart): YogaResult[] {
  const results: YogaResult[] = [];
  const dusthana = [6, 8, 12];
  const configs = [
    { name: 'Harsha Yoga', lordOf: 6 },
    { name: 'Sarala Yoga', lordOf: 8 },
    { name: 'Vimala Yoga', lordOf: 12 },
  ];
  for (const c of configs) {
    const lord = houseLord(chart, c.lordOf);
    const h = planetHouse(chart, lord as Planet);
    if (dusthana.includes(h)) {
      results.push({
        name: c.name,
        type: 'benefic',
        strength: 'Moderate',
        description: `${c.lordOf}th lord ${lord} in dusthana house ${h} — Vipreet Raja Yoga`,
        planets: [lord as Planet],
        houses: [c.lordOf, h],
      });
    }
  }
  return results;
}

// --- Phase 5: Additional Yogas ---

export function detectDhanYoga(chart: KundliChart): YogaResult[] {
  const results: YogaResult[] = [];
  const trikonaLords = [1, 5, 9].map(h => houseLord(chart, h));
  const wealthLords = [2, 11].map(h => houseLord(chart, h));
  for (const tl of trikonaLords) {
    for (const wl of wealthLords) {
      if (tl === wl) continue;
      if (planetHouse(chart, tl as Planet) === planetHouse(chart, wl as Planet)) {
        results.push({ name: 'Dhana Yoga', type: 'benefic', strength: 'Strong', description: `${tl} and ${wl} conjoin — wealth combination`, planets: [tl as Planet, wl as Planet], houses: [planetHouse(chart, tl as Planet)] });
      }
    }
  }
  return results;
}

export function detectNeechaBhangaRajaYoga(chart: KundliChart): YogaResult[] {
  const results: YogaResult[] = [];
  const PLANET_DEBILITATION_MAP: Partial<Record<Planet, number>> = { Sun: 6, Moon: 7, Mars: 3, Mercury: 11, Jupiter: 9, Venus: 5, Saturn: 0 };
  const allPlanets: Planet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  for (const p of allPlanets) {
    const debSign = PLANET_DEBILITATION_MAP[p];
    if (debSign === undefined || planetRashi(chart, p) !== debSign) continue;
    const debLord = houseLord(chart, ((debSign - chart.ascendant.rashi + 12) % 12) + 1) as Planet;
    const debLordHouse = planetHouse(chart, debLord);
    if (KENDRA_HOUSES.includes(debLordHouse as 1|4|7|10)) {
      results.push({ name: 'Neecha Bhanga Raja Yoga', type: 'benefic', strength: 'Strong', description: `${p} debilitated but ${debLord} in Kendra — cancellation produces Raja Yoga`, planets: [p, debLord], houses: [planetHouse(chart, p), debLordHouse] });
    }
  }
  return results;
}

export function detectLakshmiYoga(chart: KundliChart): YogaResult | null {
  const lord9 = houseLord(chart, 9) as Planet;
  const lord9House = planetHouse(chart, lord9);
  const venusRashi = planetRashi(chart, 'Venus');
  const isVenusStrong = [1, 6, 11].includes(venusRashi); // own or exalted
  if ((KENDRA_HOUSES.includes(lord9House as 1|4|7|10) || [1, 5, 9].includes(lord9House)) && isVenusStrong) {
    return { name: 'Lakshmi Yoga', type: 'benefic', strength: 'Strong', description: '9th lord strong + Venus in own/exalted — divine wealth', planets: [lord9, 'Venus'], houses: [lord9House, planetHouse(chart, 'Venus')] };
  }
  return null;
}

export function detectParivartanaYoga(chart: KundliChart): YogaResult[] {
  const results: YogaResult[] = [];
  for (let h1 = 1; h1 <= 12; h1++) {
    for (let h2 = h1 + 1; h2 <= 12; h2++) {
      const lord1 = houseLord(chart, h1) as Planet;
      const lord2 = houseLord(chart, h2) as Planet;
      if (lord1 === lord2) continue;
      if (planetHouse(chart, lord1) === h2 && planetHouse(chart, lord2) === h1) {
        let yogaType = 'Maha Parivartana';
        const dusthana = [6, 8, 12];
        if (dusthana.includes(h1) || dusthana.includes(h2)) yogaType = 'Dainya Parivartana';
        else if ([3, 6, 11].includes(h1) || [3, 6, 11].includes(h2)) yogaType = 'Khala Parivartana';
        results.push({ name: `${yogaType} Yoga`, type: yogaType === 'Dainya Parivartana' ? 'malefic' : 'benefic', strength: 'Strong', description: `${lord1} (${h1}th lord) and ${lord2} (${h2}th lord) exchange signs`, planets: [lord1, lord2], houses: [h1, h2] });
      }
    }
  }
  return results;
}

export function detectAmalaYoga(chart: KundliChart): YogaResult | null {
  const benefics: Planet[] = ['Jupiter', 'Venus', 'Mercury'];
  for (const b of benefics) {
    if (planetHouse(chart, b) === 10) {
      return { name: 'Amala Yoga', type: 'benefic', strength: 'Moderate', description: `${b} in 10th — spotless reputation and philanthropic virtue`, planets: [b], houses: [10] };
    }
  }
  return null;
}

export function detectAdhiYoga(chart: KundliChart): YogaResult | null {
  const moonH = planetHouse(chart, 'Moon');
  const h6 = (moonH % 12) + 1 === 1 ? 12 : ((moonH + 5) % 12) + 1;
  const h7 = ((moonH + 6) % 12) + 1 === 1 ? 12 : ((moonH + 6) % 12) + 1;
  const h8 = ((moonH + 7) % 12) + 1 === 1 ? 12 : ((moonH + 7) % 12) + 1;
  const benefics: Planet[] = ['Jupiter', 'Venus', 'Mercury'];
  const count = benefics.filter(b => {
    const bh = planetHouse(chart, b);
    return [((moonH + 5) % 12) + 1, ((moonH + 6) % 12) + 1, ((moonH + 7) % 12) + 1].includes(bh);
  }).length;
  if (count >= 1) {
    return { name: 'Adhi Yoga', type: 'benefic', strength: count >= 3 ? 'Very Strong' : 'Moderate', description: `${count} benefic(s) in 6th/7th/8th from Moon — ministerial authority`, planets: benefics.filter(b => [((moonH + 5) % 12) + 1, ((moonH + 6) % 12) + 1, ((moonH + 7) % 12) + 1].includes(planetHouse(chart, b))), houses: [moonH] };
  }
  return null;
}

export function detectVesiYoga(chart: KundliChart): YogaResult | null {
  const sunH = planetHouse(chart, 'Sun');
  const h2 = (sunH % 12) + 1;
  const exclude: Planet[] = ['Moon', 'Rahu', 'Ketu', 'Sun'];
  const all: Planet[] = ['Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const found = all.filter(p => !exclude.includes(p) && planetHouse(chart, p) === h2);
  if (found.length > 0) {
    return { name: 'Vesi Yoga', type: 'benefic', strength: 'Moderate', description: `${found.join(', ')} in 2nd from Sun — enhanced solar power`, planets: found, houses: [h2] };
  }
  return null;
}

export function detectVosiYoga(chart: KundliChart): YogaResult | null {
  const sunH = planetHouse(chart, 'Sun');
  const h12 = ((sunH + 10) % 12) + 1;
  const exclude: Planet[] = ['Moon', 'Rahu', 'Ketu', 'Sun'];
  const all: Planet[] = ['Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const found = all.filter(p => !exclude.includes(p) && planetHouse(chart, p) === h12);
  if (found.length > 0) {
    return { name: 'Vosi Yoga', type: 'benefic', strength: 'Moderate', description: `${found.join(', ')} in 12th from Sun — past-life spiritual merit`, planets: found, houses: [h12] };
  }
  return null;
}

export function detectUbhayachariYoga(chart: KundliChart): YogaResult | null {
  const sunH = planetHouse(chart, 'Sun');
  const h2 = (sunH % 12) + 1;
  const h12 = ((sunH + 10) % 12) + 1;
  const exclude: Planet[] = ['Moon', 'Rahu', 'Ketu', 'Sun'];
  const all: Planet[] = ['Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const in2nd = all.filter(p => !exclude.includes(p) && planetHouse(chart, p) === h2);
  const in12th = all.filter(p => !exclude.includes(p) && planetHouse(chart, p) === h12);
  if (in2nd.length > 0 && in12th.length > 0) {
    return { name: 'Ubhayachari Yoga', type: 'benefic', strength: 'Strong', description: 'Planets flanking Sun — royalty and fame', planets: [...in2nd, ...in12th], houses: [h2, h12] };
  }
  return null;
}

export function detectAnaphaYoga(chart: KundliChart): YogaResult | null {
  const moonH = planetHouse(chart, 'Moon');
  const h12 = ((moonH + 10) % 12) + 1;
  const all: Planet[] = ['Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const found = all.filter(p => planetHouse(chart, p) === h12);
  if (found.length > 0) return { name: 'Anapha Yoga', type: 'benefic', strength: 'Moderate', description: `${found.join(', ')} in 12th from Moon — self-made wealth`, planets: found, houses: [h12] };
  return null;
}

export function detectSunaphaYoga(chart: KundliChart): YogaResult | null {
  const moonH = planetHouse(chart, 'Moon');
  const h2 = (moonH % 12) + 1;
  const all: Planet[] = ['Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const found = all.filter(p => planetHouse(chart, p) === h2);
  if (found.length > 0) return { name: 'Sunapha Yoga', type: 'benefic', strength: 'Moderate', description: `${found.join(', ')} in 2nd from Moon — intelligence and fame`, planets: found, houses: [h2] };
  return null;
}

export function detectDurudharaYoga(chart: KundliChart): YogaResult | null {
  const moonH = planetHouse(chart, 'Moon');
  const h2 = (moonH % 12) + 1;
  const h12 = ((moonH + 10) % 12) + 1;
  const all: Planet[] = ['Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
  const in2nd = all.filter(p => planetHouse(chart, p) === h2);
  const in12th = all.filter(p => planetHouse(chart, p) === h12);
  if (in2nd.length > 0 && in12th.length > 0) return { name: 'Durudhara Yoga', type: 'benefic', strength: 'Strong', description: 'Planets flanking Moon — generous and wealthy', planets: [...in2nd, ...in12th], houses: [h2, h12] };
  return null;
}

/* #101 Kahala Yoga — Lord of 4th and Jupiter in mutual Kendras + Lagna lord strong */
export function detectKahalaYoga(chart: KundliChart): YogaResult | null {
  const h4 = chart.houses.find(h => h.house === 4);
  if (!h4) return null;
  const h4Lord = h4.lord as Planet;
  const h4LordHouse = chart.planets[h4Lord]?.house ?? 0;
  const jupHouse = chart.planets.Jupiter.house;
  const kendras = [1, 4, 7, 10];
  if (kendras.includes(h4LordHouse) && kendras.includes(jupHouse)) {
    return { name: 'Kahala Yoga', type: 'benefic', strength: 'Strong', description: '4th lord and Jupiter in Kendras — authority, courage, and determination', planets: [h4Lord, 'Jupiter'], houses: [h4LordHouse, jupHouse] };
  }
  return null;
}

export function detectAllYogas(chart: KundliChart): YogaResult[] {
  const yogas: YogaResult[] = [];
  yogas.push(...detectKendraTrikona(chart));
  const dk = detectDharmaKarmadhipati(chart);
  if (dk) yogas.push(dk);
  const gk = detectGajaKesari(chart);
  if (gk) yogas.push(gk);
  yogas.push(...detectPanchaMahapurusha(chart));
  const ba = detectBudhadityaYoga(chart);
  if (ba) yogas.push(ba);
  const cm = detectChandraMangalaYoga(chart);
  if (cm) yogas.push(cm);
  const sw = detectSaraswatiYoga(chart);
  if (sw) yogas.push(sw);
  yogas.push(...detectVipreetRajaYogas(chart));
  yogas.push(...detectDhanYoga(chart));
  yogas.push(...detectNeechaBhangaRajaYoga(chart));
  const lk = detectLakshmiYoga(chart);
  if (lk) yogas.push(lk);
  yogas.push(...detectParivartanaYoga(chart));
  const am = detectAmalaYoga(chart);
  if (am) yogas.push(am);
  const adhi = detectAdhiYoga(chart);
  if (adhi) yogas.push(adhi);
  const vesi = detectVesiYoga(chart);
  if (vesi) yogas.push(vesi);
  const vosi = detectVosiYoga(chart);
  if (vosi) yogas.push(vosi);
  const ubh = detectUbhayachariYoga(chart);
  if (ubh) yogas.push(ubh);
  const anapha = detectAnaphaYoga(chart);
  if (anapha) yogas.push(anapha);
  const sunapha = detectSunaphaYoga(chart);
  if (sunapha) yogas.push(sunapha);
  const dur = detectDurudharaYoga(chart);
  if (dur) yogas.push(dur);
  const kah = detectKahalaYoga(chart);
  if (kah) yogas.push(kah);
  return yogas;
}
