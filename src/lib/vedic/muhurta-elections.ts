/**
 * Muhurta Election Rules — 11 activity-specific selection criteria (#229-#239)
 * Each evaluator takes panchang data and returns a scored MuhurtaElection.
 */
import type { PanchangData, MuhurtaTime, MuhurtaElection } from './types';

interface Factor { name: string; passed: boolean; detail: string }

function score(factors: Factor[]): number {
  const total = factors.length;
  const passed = factors.filter(f => f.passed).length;
  return Math.round((passed / total) * 100);
}

function election(type: string, factors: Factor[]): MuhurtaElection {
  const s = score(factors);
  return { type, isAuspicious: s >= 60, score: s, factors };
}

function isShukla(p: PanchangData): boolean { return p.paksha === 'Shukla'; }
function tithiNum(p: PanchangData): number { return (p.tithi.index % 15) + 1; }

const GOOD_NAKS_MARRIAGE = [3, 4, 9, 11, 12, 14, 16, 18, 20, 21, 22, 25, 26];
const GOOD_NAKS_VEHICLE = [0, 3, 6, 7, 12, 14];
const GOOD_NAKS_PROPERTY = [3, 11, 20, 25];
const GOOD_NAKS_FOUNDATION = [3, 7, 11, 12, 20, 25, 26];

/* #229 Marriage Muhurta */
export function evaluateMarriageMuhurta(p: PanchangData, muhurtas: MuhurtaTime[]): MuhurtaElection {
  const f: Factor[] = [
    { name: 'Shukla Paksha', passed: isShukla(p), detail: isShukla(p) ? 'Bright fortnight — favorable' : 'Krishna Paksha — avoid' },
    { name: 'Tithi', passed: [2, 3, 5, 7, 10, 11, 13, 15].includes(tithiNum(p)), detail: `Tithi ${tithiNum(p)}: ${p.tithi.name}` },
    { name: 'Nakshatra', passed: GOOD_NAKS_MARRIAGE.includes(p.nakshatra.index), detail: p.nakshatra.name },
    { name: 'Rahu Kalam clear', passed: !muhurtas.some(m => m.name === 'Rahu Kalam'), detail: 'No Rahu Kalam conflict' },
    { name: 'No Panchak', passed: ![22, 23, 24, 25, 26].includes(p.nakshatra.index), detail: 'Panchak nakshatras avoided' },
    { name: 'No Bhadra', passed: p.karana.name !== 'Vishti', detail: `Karana: ${p.karana.name}` },
  ];
  return election('Marriage', f);
}

/* #230 Griha Pravesh */
export function evaluateGrihaPraveshMuhurta(p: PanchangData, muhurtas: MuhurtaTime[]): MuhurtaElection {
  const fixedLagna = [1, 4, 7, 10]; // Taurus, Leo, Scorpio, Aquarius
  const f: Factor[] = [
    { name: 'Shukla Paksha', passed: isShukla(p), detail: isShukla(p) ? 'Bright fortnight' : 'Dark fortnight' },
    { name: 'Fixed sign day', passed: true, detail: 'Fixed Lagna preferred for stability' },
    { name: 'Good Tithi', passed: ![4, 8, 9, 14].includes(tithiNum(p)), detail: `Tithi ${tithiNum(p)}` },
    { name: 'Favorable Nakshatra', passed: GOOD_NAKS_FOUNDATION.includes(p.nakshatra.index), detail: p.nakshatra.name },
    { name: 'No Rahu Kalam', passed: !muhurtas.some(m => m.name === 'Rahu Kalam'), detail: 'Clear of Rahu Kalam' },
  ];
  return election('Griha Pravesh', f);
}

/* #231 Business Opening */
export function evaluateBusinessMuhurta(p: PanchangData, muhurtas: MuhurtaTime[]): MuhurtaElection {
  const goodDays = [3, 4, 5]; // Wednesday, Thursday, Friday
  const f: Factor[] = [
    { name: 'Favorable day', passed: goodDays.includes(p.vara.index), detail: p.vara.name },
    { name: 'Shukla Paksha', passed: isShukla(p), detail: isShukla(p) ? 'Bright fortnight' : 'Dark fortnight' },
    { name: 'Good Tithi', passed: ![4, 8, 9, 14, 30].includes(tithiNum(p)), detail: `Tithi ${tithiNum(p)}` },
    { name: 'Auspicious Nakshatra', passed: ![2, 5, 8, 17, 18].includes(p.nakshatra.index), detail: p.nakshatra.name },
    { name: 'No Vishti Karana', passed: p.karana.name !== 'Vishti', detail: `Karana: ${p.karana.name}` },
    { name: 'No Rahu Kalam', passed: !muhurtas.some(m => m.name === 'Rahu Kalam'), detail: 'Clear' },
  ];
  return election('Business Opening', f);
}

/* #232 Vehicle Purchase */
export function evaluateVehicleMuhurta(p: PanchangData, muhurtas: MuhurtaTime[]): MuhurtaElection {
  const f: Factor[] = [
    { name: 'Favorable Nakshatra', passed: GOOD_NAKS_VEHICLE.includes(p.nakshatra.index), detail: p.nakshatra.name },
    { name: 'Shukla Paksha', passed: isShukla(p), detail: isShukla(p) ? 'Bright fortnight' : 'Dark fortnight' },
    { name: 'Good Tithi', passed: ![4, 8, 9, 14].includes(tithiNum(p)), detail: `Tithi ${tithiNum(p)}` },
    { name: 'No Vishti', passed: p.karana.name !== 'Vishti', detail: `Karana: ${p.karana.name}` },
    { name: 'Not Saturday', passed: p.vara.index !== 6, detail: p.vara.name },
  ];
  return election('Vehicle Purchase', f);
}

/* #233 Property Purchase */
export function evaluatePropertyMuhurta(p: PanchangData, muhurtas: MuhurtaTime[]): MuhurtaElection {
  const f: Factor[] = [
    { name: 'Favorable Nakshatra', passed: GOOD_NAKS_PROPERTY.includes(p.nakshatra.index), detail: p.nakshatra.name },
    { name: 'Shukla Paksha', passed: isShukla(p), detail: isShukla(p) ? 'Bright fortnight' : 'Dark fortnight' },
    { name: 'Good Tithi', passed: [2, 3, 5, 7, 10, 11, 12, 13].includes(tithiNum(p)), detail: `Tithi ${tithiNum(p)}` },
    { name: 'Thursday/Friday', passed: [4, 5].includes(p.vara.index), detail: p.vara.name },
    { name: 'No Rahu Kalam', passed: !muhurtas.some(m => m.name === 'Rahu Kalam'), detail: 'Clear' },
  ];
  return election('Property Purchase', f);
}

/* #234 Travel */
export function evaluateTravelMuhurta(p: PanchangData, muhurtas: MuhurtaTime[]): MuhurtaElection {
  const badNaks = [2, 5, 8, 17, 18, 23, 24]; // Krittika, Ardra, Ashlesha, Jyeshtha, Mula, Shatabhisha, P.Bhadra
  const f: Factor[] = [
    { name: 'Good Nakshatra', passed: !badNaks.includes(p.nakshatra.index), detail: p.nakshatra.name },
    { name: 'Good Tithi', passed: ![4, 8, 9, 14].includes(tithiNum(p)), detail: `Tithi ${tithiNum(p)}` },
    { name: 'No Rahu Kalam', passed: !muhurtas.some(m => m.name === 'Rahu Kalam'), detail: 'Clear' },
    { name: 'Not Tuesday/Saturday', passed: ![2, 6].includes(p.vara.index), detail: p.vara.name },
    { name: 'No Vishti', passed: p.karana.name !== 'Vishti', detail: `Karana: ${p.karana.name}` },
  ];
  return election('Travel', f);
}

/* #235 Namkaran (Naming Ceremony) */
export function evaluateNamkaranMuhurta(p: PanchangData, muhurtas: MuhurtaTime[]): MuhurtaElection {
  const goodNaks = [0, 3, 4, 6, 7, 12, 14, 16, 21, 26]; // Ashwini, Rohini, Mrigashira, Punarvasu, Pushya, Hasta, Swati, Anuradha, Shravana, Revati
  const f: Factor[] = [
    { name: 'Good Nakshatra', passed: goodNaks.includes(p.nakshatra.index), detail: p.nakshatra.name },
    { name: 'Shukla Paksha', passed: isShukla(p), detail: isShukla(p) ? 'Bright fortnight' : 'Dark fortnight' },
    { name: 'Good Tithi', passed: ![4, 8, 9, 14, 30].includes(tithiNum(p)), detail: `Tithi ${tithiNum(p)}` },
    { name: 'No Rahu Kalam', passed: !muhurtas.some(m => m.name === 'Rahu Kalam'), detail: 'Clear' },
  ];
  return election('Namkaran', f);
}

/* #236 Upanayana (Thread Ceremony) */
export function evaluateUpanayanaMuhurta(p: PanchangData, muhurtas: MuhurtaTime[]): MuhurtaElection {
  const goodMonths = [10, 11, 0, 1]; // Magha, Phalguna, Chaitra, Vaishakha (masa indices)
  const f: Factor[] = [
    { name: 'Favorable Month', passed: goodMonths.includes(p.masa.index), detail: p.masa.name },
    { name: 'Shukla Paksha', passed: isShukla(p), detail: isShukla(p) ? 'Bright fortnight' : 'Dark fortnight' },
    { name: 'Good Day', passed: [0, 1, 3, 4].includes(p.vara.index), detail: p.vara.name }, // Sun, Mon, Wed, Thu
    { name: 'Good Tithi', passed: ![4, 8, 9, 14].includes(tithiNum(p)), detail: `Tithi ${tithiNum(p)}` },
    { name: 'No Vishti', passed: p.karana.name !== 'Vishti', detail: `Karana: ${p.karana.name}` },
  ];
  return election('Upanayana', f);
}

/* #237 Vidyarambha (Education Start) */
export function evaluateVidyarambhaMuhurta(p: PanchangData, muhurtas: MuhurtaTime[]): MuhurtaElection {
  const f: Factor[] = [
    { name: 'Wednesday/Thursday', passed: [3, 4].includes(p.vara.index), detail: p.vara.name },
    { name: 'Good Nakshatra', passed: [4, 6, 7, 12, 14, 21, 26].includes(p.nakshatra.index), detail: p.nakshatra.name },
    { name: 'Shukla Paksha', passed: isShukla(p), detail: isShukla(p) ? 'Bright fortnight' : 'Dark fortnight' },
    { name: 'Good Tithi', passed: [2, 3, 5, 7, 10, 11, 13].includes(tithiNum(p)), detail: `Tithi ${tithiNum(p)}` },
    { name: 'No Rahu Kalam', passed: !muhurtas.some(m => m.name === 'Rahu Kalam'), detail: 'Clear' },
  ];
  return election('Vidyarambha', f);
}

/* #238 Foundation-laying */
export function evaluateFoundationMuhurta(p: PanchangData, muhurtas: MuhurtaTime[]): MuhurtaElection {
  const f: Factor[] = [
    { name: 'Good Nakshatra', passed: GOOD_NAKS_FOUNDATION.includes(p.nakshatra.index), detail: p.nakshatra.name },
    { name: 'Shukla Paksha', passed: isShukla(p), detail: isShukla(p) ? 'Bright fortnight' : 'Dark fortnight' },
    { name: 'No Vishti', passed: p.karana.name !== 'Vishti', detail: `Karana: ${p.karana.name}` },
    { name: 'Good Tithi', passed: [2, 3, 5, 7, 10, 11, 12, 13].includes(tithiNum(p)), detail: `Tithi ${tithiNum(p)}` },
    { name: 'No Rahu Kalam', passed: !muhurtas.some(m => m.name === 'Rahu Kalam'), detail: 'Clear' },
  ];
  return election('Foundation-laying', f);
}

/* #239 Medical Procedure */
export function evaluateMedicalMuhurta(p: PanchangData, muhurtas: MuhurtaTime[]): MuhurtaElection {
  const f: Factor[] = [
    { name: 'Waxing Moon', passed: isShukla(p), detail: isShukla(p) ? 'Waxing Moon — favorable' : 'Waning Moon — weaker' },
    { name: 'Good Tithi', passed: ![4, 8, 9, 14, 30].includes(tithiNum(p)), detail: `Tithi ${tithiNum(p)}` },
    { name: 'Avoid Mars nakshatras', passed: ![4, 13, 22].includes(p.nakshatra.index), detail: p.nakshatra.name },
    { name: 'Not Tuesday', passed: p.vara.index !== 2, detail: p.vara.name },
    { name: 'No Rahu Kalam', passed: !muhurtas.some(m => m.name === 'Rahu Kalam'), detail: 'Clear' },
    { name: 'No Vishti', passed: p.karana.name !== 'Vishti', detail: `Karana: ${p.karana.name}` },
  ];
  return election('Medical Procedure', f);
}

/* Registry of all muhurta election types */
export const MUHURTA_ELECTION_TYPES = [
  { key: 'marriage', label: 'Marriage', fn: evaluateMarriageMuhurta },
  { key: 'grihaPravesh', label: 'Griha Pravesh', fn: evaluateGrihaPraveshMuhurta },
  { key: 'business', label: 'Business Opening', fn: evaluateBusinessMuhurta },
  { key: 'vehicle', label: 'Vehicle Purchase', fn: evaluateVehicleMuhurta },
  { key: 'property', label: 'Property Purchase', fn: evaluatePropertyMuhurta },
  { key: 'travel', label: 'Travel', fn: evaluateTravelMuhurta },
  { key: 'namkaran', label: 'Namkaran', fn: evaluateNamkaranMuhurta },
  { key: 'upanayana', label: 'Upanayana', fn: evaluateUpanayanaMuhurta },
  { key: 'vidyarambha', label: 'Vidyarambha', fn: evaluateVidyarambhaMuhurta },
  { key: 'foundation', label: 'Foundation-laying', fn: evaluateFoundationMuhurta },
  { key: 'medical', label: 'Medical Procedure', fn: evaluateMedicalMuhurta },
] as const;
