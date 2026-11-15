import {
  NAKSHATRA_NAMES, NAKSHATRA_LORDS, NAKSHATRA_SPAN,
  PANCHAK_NAKSHATRAS, PANCHAK_TYPES,
  NAKSHATRA_GANA, GANA_NAMES, NAKSHATRA_NADI, NADI_NAMES,
  NAKSHATRA_YONI, YONI_NAMES, RASHI_VARNA, VARNA_NAMES,
  RASHI_VASHYA, VASHYA_TYPES,
  VEDHA_NAKSHATRA_PAIRS, GANDANTA_JUNCTIONS,
} from './constants';

export function getNakshatraDetails(siderealMoonLon: number) {
  const index = Math.floor(siderealMoonLon / NAKSHATRA_SPAN) % 27;
  const name = NAKSHATRA_NAMES[index];
  const lord = NAKSHATRA_LORDS[name];
  const pada = (Math.floor(siderealMoonLon / (NAKSHATRA_SPAN / 4)) % 4) + 1;
  const degreeInNakshatra = siderealMoonLon % NAKSHATRA_SPAN;
  const percentComplete = (degreeInNakshatra / NAKSHATRA_SPAN) * 100;

  return { index, name, lord, pada, degreeInNakshatra, percentComplete };
}

export function calculateTaraBala(birthNakshatra: number, transitNakshatra: number) {
  let diff = transitNakshatra - birthNakshatra;
  if (diff < 0) diff += 27;
  const count = diff + 1;
  const remainder = count % 9 || 9;

  const taraNames = [
    '', 'Janma', 'Sampat', 'Vipat', 'Kshema',
    'Pratyak', 'Sadhana', 'Naidhana', 'Mitra', 'Parama Mitra',
  ];

  // Favorable: 1(Janma), 2(Sampat), 4(Kshema), 6(Sadhana), 8(Mitra), 9(Parama Mitra)
  // Unfavorable: 3(Vipat), 5(Pratyak), 7(Naidhana)
  const isGood = ![3, 5, 7].includes(remainder);

  return {
    count,
    remainder,
    taraName: taraNames[remainder],
    isGood,
    description: `${taraNames[remainder]} Tara — ${isGood ? 'Favorable' : 'Unfavorable'}`,
  };
}

export function isPanchak(nakshatraIndex: number): { isPanchak: boolean; type?: string } {
  if ((PANCHAK_NAKSHATRAS as readonly number[]).includes(nakshatraIndex)) {
    return { isPanchak: true, type: PANCHAK_TYPES[nakshatraIndex] };
  }
  return { isPanchak: false };
}

export function getNakshatraCharacteristics(index: number) {
  const characteristics: Record<number, { deity: string; symbol: string; nature: string }> = {
    0: { deity: 'Ashwini Kumaras', symbol: 'Horse Head', nature: 'Swift/Light' },
    1: { deity: 'Yama', symbol: 'Yoni/Vulva', nature: 'Fierce/Severe' },
    2: { deity: 'Agni', symbol: 'Razor/Flame', nature: 'Mixed' },
    3: { deity: 'Brahma', symbol: 'Chariot/Cart', nature: 'Fixed/Stable' },
    4: { deity: 'Soma', symbol: 'Deer Head', nature: 'Soft/Tender' },
    5: { deity: 'Rudra', symbol: 'Teardrop/Diamond', nature: 'Sharp/Dreadful' },
    6: { deity: 'Aditi', symbol: 'Bow/Quiver', nature: 'Movable' },
    7: { deity: 'Brihaspati', symbol: 'Lotus/Arrow', nature: 'Light/Swift' },
    8: { deity: 'Sarpa', symbol: 'Serpent/Wheel', nature: 'Sharp/Dreadful' },
    9: { deity: 'Pitris', symbol: 'Palanquin/Throne', nature: 'Fierce/Severe' },
    10: { deity: 'Bhaga', symbol: 'Hammock/Fig Tree', nature: 'Fierce/Severe' },
    11: { deity: 'Aryaman', symbol: 'Bed/Fig Tree', nature: 'Fixed/Stable' },
    12: { deity: 'Savitar', symbol: 'Palm/Fist', nature: 'Light/Swift' },
    13: { deity: 'Tvashtar', symbol: 'Bright Jewel/Pearl', nature: 'Soft/Tender' },
    14: { deity: 'Vayu', symbol: 'Coral/Sapphire', nature: 'Movable' },
    15: { deity: 'Indragni', symbol: 'Archway/Potter\'s Wheel', nature: 'Mixed' },
    16: { deity: 'Mitra', symbol: 'Lotus/Triumphal Arch', nature: 'Soft/Tender' },
    17: { deity: 'Indra', symbol: 'Circular Amulet/Umbrella', nature: 'Sharp/Dreadful' },
    18: { deity: 'Nirrti', symbol: 'Bunch of Roots/Lion\'s Tail', nature: 'Sharp/Dreadful' },
    19: { deity: 'Apah', symbol: 'Elephant Tusk/Fan', nature: 'Fierce/Severe' },
    20: { deity: 'Vishvadevas', symbol: 'Elephant Tusk/Bed', nature: 'Fixed/Stable' },
    21: { deity: 'Vishnu', symbol: 'Ear/Three Footprints', nature: 'Movable' },
    22: { deity: 'Vasus', symbol: 'Drum/Flute', nature: 'Movable' },
    23: { deity: 'Varuna', symbol: 'Empty Circle/1000 Flowers', nature: 'Movable' },
    24: { deity: 'Ajaikapada', symbol: 'Sword/Two Front Legs of Bed', nature: 'Fierce/Severe' },
    25: { deity: 'Ahirbudhnya', symbol: 'Twins/Back Legs of Bed', nature: 'Fixed/Stable' },
    26: { deity: 'Pushan', symbol: 'Fish/Drum', nature: 'Soft/Tender' },
  };

  return characteristics[index] || { deity: 'Unknown', symbol: 'Unknown', nature: 'Unknown' };
}

// --- Phase 2 additions ---

export function getChandraBala(moonLon: number, sunLon: number): { strengthPercent: number; description: string } {
  let angDist = Math.abs(moonLon - sunLon);
  if (angDist > 180) angDist = 360 - angDist;
  const pct = Math.round((angDist / 180) * 100);
  return { strengthPercent: pct, description: pct >= 50 ? 'Strong Moon (bright)' : 'Weak Moon (dark)' };
}

export function getChandraBalaFromRashi(transitMoonRashi: number, birthMoonRashi: number): { isGood: boolean; position: number } {
  const diff = ((transitMoonRashi - birthMoonRashi + 12) % 12);
  const count = diff + 1;
  const good = [1, 3, 6, 7, 10, 11].includes(count);
  return { isGood: good, position: count };
}

export function isGandanta(siderealLon: number): { isGandanta: boolean; junction?: string } {
  const threshold = 10 / 3; // 3 deg 20 min
  for (const g of GANDANTA_JUNCTIONS) {
    const boundary = (g.toRashi) * 30;
    let diff = siderealLon - boundary;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    if (Math.abs(diff) <= threshold) {
      return { isGandanta: true, junction: `${NAKSHATRA_NAMES[g.nakshatraEnd]}-${NAKSHATRA_NAMES[g.nakshatraStart]}` };
    }
  }
  return { isGandanta: false };
}

export function getNakshatraGana(nakshatraIndex: number): { index: number; name: string } {
  const idx = NAKSHATRA_GANA[nakshatraIndex];
  return { index: idx, name: GANA_NAMES[idx] };
}

export function getNakshatraNadi(nakshatraIndex: number): { index: number; name: string } {
  const idx = NAKSHATRA_NADI[nakshatraIndex];
  return { index: idx, name: NADI_NAMES[idx] };
}

export function getNakshatraYoni(nakshatraIndex: number): { index: number; name: string } {
  const idx = NAKSHATRA_YONI[nakshatraIndex];
  return { index: idx, name: YONI_NAMES[idx] };
}

export function getRashiVarna(rashiIndex: number): { index: number; name: string } {
  const idx = RASHI_VARNA[rashiIndex];
  return { index: idx, name: VARNA_NAMES[idx] };
}

export function getRashiVashya(rashiIndex: number): { index: number; name: string } {
  const idx = RASHI_VASHYA[rashiIndex];
  return { index: idx, name: VASHYA_TYPES[idx] };
}

export function checkNakshatraCompatibility(nak1: number, nak2: number): { isCompatible: boolean; tara1: string; tara2: string } {
  const t1 = calculateTaraBala(nak1, nak2);
  const t2 = calculateTaraBala(nak2, nak1);
  return { isCompatible: t1.isGood && t2.isGood, tara1: t1.taraName, tara2: t2.taraName };
}

export function isMahendraTara(boyNak: number, girlNak: number): boolean {
  const count = ((boyNak - girlNak + 27) % 27) + 1;
  return count % 7 === 4 || count % 7 === 1;
}

export function isVedhaNakshatra(nak1: number, nak2: number): boolean {
  return VEDHA_NAKSHATRA_PAIRS.some(
    ([a, b]) => (nak1 === a && nak2 === b) || (nak1 === b && nak2 === a)
  );
}
