/**
 * Master Report Generator.
 * Orchestrates all 26 vedic modules + interpretation engine into a
 * structured report object ready for rendering.
 */
import type {
  KundliChart, Planet, GrahaPlanet, Dignity, DashaPeriod, YogaResult, DoshaResult,
  ShadBalaData, AshtakavargaData, FriendshipResult, SpecialLagna, ArudhaPada,
  ChalitChart, ConjunctionResult, GrahaYuddhaResult, AvasthaResult, BhavaBalaData,
  CharaKaraka, JaiminiData, VarshaphalData, NadiPoint, SadeSatiResult,
  RemedyRecommendation, CareerAnalysis, WealthAnalysis, HealthAnalysis, VargaChart,
} from './types';
import { RASHI_NAMES, NAKSHATRA_NAMES, RASHI_LORDS } from './constants';
import {
  generateKundli, getPlanetDignity, isCombust, getAspects,
  detectConjunctions, detectGrahaYuddha, calculateAvasthas,
} from './core';
import { detectAllYogas } from './yogas';
import { detectAllDoshas } from './doshas';
import { calculateVimshottariDasha, calculateYoginiDasha } from './dashas';
import { calculateShadbala, calculateVimsopakaBala, calculateBhavaBala } from './shadbala';
import { calculateAshtakavarga } from './ashtakavarga';
import { calculateAllFriendships } from './friendships';
import { calculateAllSpecialLagnas, calculateAllArudhaPadas } from './lagnas';
import { calculateSripatiChalit } from './chalit';
import { detectSadeSati } from './transits';
import { calculateVarshaphal } from './predictions';
import { generateExpandedRemedies } from './remedies';
import { getAllNadiPoints, calculateBhriguBindu } from './nadi';
import { calculateCharaKarakas, getKarakamsha, calculateCharaDasha, calculateBrahmaMaheshwaraRudra, getAmatyakarakaCareer } from './jaimini';
import { getAllVargas, getNavamsaChart, isVargottama } from './vargas';
import { getNakshatraDetails } from './nakshatra';
import { calculatePanchang } from './panchang';
import { analyzeCareer } from './career';
import { analyzeWealth } from './wealth';
import { analyzeHealth } from './health';
import { analyzeMarriage, type MarriageAnalysis } from './marriage';
import { detectTajikaYogas, calculateSahams, type TajikaYoga, type Saham } from './tajika';
import { getYantraRemedy, getGrahaShanti, getTempleRitual, getGemstoneTest, type GemstoneTest } from './remedies';

import type { Lang } from './types';
import {
  getPlanetInSignText, getPlanetInHouseText, getNakshatraProfile,
  getDignityText, getRetroText, getCombustText, getAspectReceived, getConjunctionText,
  getMahadashaNarrative,
  generateCareerReading, generateMarriageReading, generateWealthReading,
  generateHealthReading, generateSpiritualReading,
  ordinalHi, houseAreaHi,
} from './interpretations';
import type {
  NakshatraProfile, MahadashaNarrative,
  CareerReading, MarriageReading, WealthReading, HealthReading, SpiritualReading,
} from './interpretations';

// ══════════════════════════════════════════════════
// Report Data Types
// ══════════════════════════════════════════════════

export interface PlanetReportEntry {
  planet: Planet;
  sign: string;
  house: number;
  degree: string;
  nakshatra: string;
  pada: number;
  dignity: Dignity;
  isRetrograde: boolean;
  isCombust: boolean;
  signText: { positive: string; challenges: string; nature: string };
  houseText: { area: string; keywords: string; whenStrong: string; whenWeak: string };
  dignityText: { label: string; effect: string; modifier: string };
  retroText: string;
  combustText: string;
  aspectsFrom: number[];
  aspectsReceived: { planet: string; text: string }[];
  conjunctions: { planet: Planet; text: string }[];
}

export interface HouseReportEntry {
  house: number;
  sign: string;
  lord: string;
  lordHouse: number;
  planets: Planet[];
  area: string;
  interpretation: string;
}

export interface DashaReportEntry {
  period: DashaPeriod;
  narrative: MahadashaNarrative | undefined;
  isActive: boolean;
}

export interface FullReport {
  // Part 1: Vedic Profile
  chart: KundliChart;
  panchang: { tithi: string; nakshatra: string; yoga: string; karana: string; vara: string } | null;
  specialLagnas: SpecialLagna[];
  arudhaPadas: ArudhaPada[];
  chalit: ChalitChart;
  shadbala: ShadBalaData;
  vimsopaka: Record<GrahaPlanet, number>;
  bhavaBala: BhavaBalaData;
  ashtakavarga: AshtakavargaData;
  friendships: FriendshipResult[];
  vargas: VargaChart[];
  vargottamaPlanets: Planet[];

  // Part 2: Personality & Nature
  ascendantReading: { sign: string; lord: string; lordHouse: number; text: string };
  moonSignReading: { sign: string; nakshatra: string; text: string };
  nakshatraProfile: NakshatraProfile | undefined;
  planetEntries: PlanetReportEntry[];
  houseEntries: HouseReportEntry[];
  yogas: YogaResult[];
  doshas: DoshaResult[];
  conjunctions: ConjunctionResult[];
  avasthas: AvasthaResult[];

  // Part 3: Life Areas
  career: CareerReading;
  careerRaw: CareerAnalysis;
  marriage: MarriageReading;
  wealth: WealthReading;
  wealthRaw: WealthAnalysis;
  health: HealthReading;
  healthRaw: HealthAnalysis;
  spiritual: SpiritualReading;

  // Part 4: Timeline & Remedies
  vimshottariDasha: DashaReportEntry[];
  yoginiDasha: DashaPeriod[];
  charaDasha: DashaPeriod[];
  sadeSati: SadeSatiResult;
  varshaphal: VarshaphalData | null;
  nadiPoints: NadiPoint[];
  jaiminiKarakas: CharaKaraka[];
  karakamsha: { rashi: number; rashiName: string };
  brahmaMaheshwara: { brahma: string; maheshwara: string; rudra: string };
  amatyakarakaCareer: { planet: Planet; career: string };
  remedies: RemedyRecommendation[];

  // Phase 5+: Extended data
  marriageAnalysis: MarriageAnalysis | null;
  tajikaYogas: TajikaYoga[];
  sahams: Saham[];
  gemstoneSpecs: { planet: string; spec: GemstoneTest }[];

  // Meta
  generatedAt: Date;
  profileName: string;
}

// ══════════════════════════════════════════════════
// Generator
// ══════════════════════════════════════════════════

const ALL_PLANETS: Planet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];

export function generateFullReport(chart: KundliChart, lang: Lang = 'en'): FullReport {
  const now = new Date();

  // ── Part 1: Raw Data ──
  const specialLagnas = calculateAllSpecialLagnas(chart);
  const arudhaPadas = calculateAllArudhaPadas(chart);
  const chalit = calculateSripatiChalit(chart);
  const shadbala = calculateShadbala(chart);
  const vimsopaka = calculateVimsopakaBala(chart);
  const bhavaBala = calculateBhavaBala(chart);
  const astakavarga = calculateAshtakavarga(chart);
  const friendships = calculateAllFriendships(chart);

  let vargasRecord: Record<string, VargaChart> = {};
  try { vargasRecord = getAllVargas(chart.ascendant.longitude, chart.planets); } catch { /* skip if not available */ }
  const vargas = Object.values(vargasRecord);

  const navamsa = getNavamsaChart(chart.ascendant.longitude, chart.planets);
  const vargottamaPlanets = ALL_PLANETS.filter(p => {
    const d1 = chart.planets[p].rashi;
    const d9 = navamsa.planets[p]?.rashi;
    return d9 !== undefined && isVargottama(d1, d9);
  });

  // Panchang
  let panchangData: FullReport['panchang'] = null;
  try {
    const p = calculatePanchang(chart.birthData.date, chart.birthData.observer, chart.ayanamsaSystem);
    panchangData = {
      tithi: p.tithi.name,
      nakshatra: p.nakshatra.name,
      yoga: p.yoga.name,
      karana: p.karana.name,
      vara: p.vara.name,
    };
  } catch { /* ok */ }

  // ── Part 2: Interpretations ──
  const conjunctions = detectConjunctions(chart);
  const avasthas = calculateAvasthas(chart);
  const yogas = detectAllYogas(chart);
  const doshas = detectAllDoshas(chart);

  // Build planet-by-planet entries
  const planetEntries: PlanetReportEntry[] = ALL_PLANETS.map(planet => {
    const pos = chart.planets[planet];
    const dignity = getPlanetDignity(planet, pos.rashi, pos.degree);
    const combust = planet !== 'Sun' && planet !== 'Rahu' && planet !== 'Ketu'
      ? isCombust(planet, pos.longitude, chart.planets.Sun.longitude, pos.isRetrograde)
      : false;
    const aspects = getAspects(planet, pos.house);
    const aspectsReceived = ALL_PLANETS.filter(other => other !== planet).filter(other => {
      const otherAspects = getAspects(other, chart.planets[other].house);
      return otherAspects.includes(pos.house);
    }).map(other => ({ planet: other, text: getAspectReceived(other, lang) }));

    const planetConjs = conjunctions.filter(c => c.planet1 === planet || c.planet2 === planet).map(c => {
      const other = c.planet1 === planet ? c.planet2 : c.planet1;
      return { planet: other, text: getConjunctionText(planet, other, lang) };
    });

    return {
      planet,
      sign: pos.rashiName,
      house: pos.house,
      degree: `${pos.degree}°${pos.minutes}'`,
      nakshatra: pos.nakshatraName,
      pada: pos.pada,
      dignity,
      isRetrograde: pos.isRetrograde,
      isCombust: combust,
      signText: getPlanetInSignText(planet, pos.rashiName, lang),
      houseText: getPlanetInHouseText(planet, pos.house, lang),
      dignityText: getDignityText(dignity, lang),
      retroText: pos.isRetrograde ? getRetroText(lang).effect : '',
      combustText: combust ? getCombustText(lang).effect : '',
      aspectsFrom: aspects,
      aspectsReceived,
      conjunctions: planetConjs,
    };
  });

  // Build house-by-house entries
  const houseEntries: HouseReportEntry[] = chart.houses.map((h, i) => {
    const lordPos = chart.planets[h.lord as Planet];
    const lordHouse = lordPos?.house ?? 0;
    let lordText: string;
    let planetsText: string;
    let area: string;

    if (lang === 'hi') {
      const PLANET_HI: Record<string, string> = {
        Sun: 'सूर्य', Moon: 'चंद्रमा', Mars: 'मंगल', Mercury: 'बुध',
        Jupiter: 'गुरु', Venus: 'शुक्र', Saturn: 'शनि', Rahu: 'राहु', Ketu: 'केतु',
      };
      const ph = (name: string) => PLANET_HI[name] || name;
      planetsText = h.planets.length > 0
        ? `${h.planets.map(pp => ph(pp)).join(', ')} इस भाव में विराजमान हैं, अपनी ऊर्जाएँ सीधे इन जीवन क्षेत्रों में लाते हैं।`
        : 'कोई ग्रह इस भाव में नहीं — परिणाम मुख्यतः स्वामी की स्थिति और प्राप्त दृष्टियों पर निर्भर।';
      lordText = `आपके ${ordinalHi(i + 1)} भाव का स्वामी ${ph(h.lord)} है, जो ${ordinalHi(lordHouse)} भाव में स्थित है। यह ${houseAreaHi(i + 1)} को ${houseAreaHi(lordHouse)} से जोड़ता है।`;
      area = houseAreaHi(i + 1);
    } else {
      planetsText = h.planets.length > 0
        ? `${h.planets.join(', ')} ${h.planets.length > 1 ? 'occupy' : 'occupies'} this house, bringing their energies directly into these life areas.`
        : 'No planets occupy this house — results depend primarily on the lord\'s placement and aspects received.';
      lordText = `The lord of your ${ordinal(i + 1)} house is ${h.lord}, placed in the ${ordinal(lordHouse)} house. This connects ${houseArea(i + 1)} with ${houseArea(lordHouse)}.`;
      area = houseArea(i + 1);
    }

    return {
      house: i + 1,
      sign: h.rashiName,
      lord: h.lord,
      lordHouse,
      planets: h.planets,
      area,
      interpretation: `${lordText} ${planetsText}`,
    };
  });

  // Ascendant reading
  const ascSign = chart.ascendant.rashiName;
  const ascLord = RASHI_LORDS[chart.ascendant.rashi];
  const ascLordHouse = chart.planets[ascLord as Planet]?.house ?? 1;
  const ascText = getPlanetInSignText('Sun', ascSign, lang);
  const SIGN_HI: Record<string, string> = {
    Aries: 'मेष', Taurus: 'वृषभ', Gemini: 'मिथुन', Cancer: 'कर्क',
    Leo: 'सिंह', Virgo: 'कन्या', Libra: 'तुला', Scorpio: 'वृश्चिक',
    Sagittarius: 'धनु', Capricorn: 'मकर', Aquarius: 'कुंभ', Pisces: 'मीन',
  };
  const PLANET_HI_MAP: Record<string, string> = {
    Sun: 'सूर्य', Moon: 'चंद्रमा', Mars: 'मंगल', Mercury: 'बुध',
    Jupiter: 'गुरु', Venus: 'शुक्र', Saturn: 'शनि', Rahu: 'राहु', Ketu: 'केतु',
  };
  const ascendantReading = {
    sign: ascSign,
    lord: ascLord,
    lordHouse: ascLordHouse,
    text: lang === 'hi'
      ? `आपका लग्न (Ascendant) ${SIGN_HI[ascSign] || ascSign} है, जो आपको ${SIGN_HI[ascSign] || ascSign} लग्न का जातक बनाता है। आपके लग्न का स्वामी ${PLANET_HI_MAP[ascLord] || ascLord}, आपके ${ordinalHi(ascLordHouse)} भाव में स्थित है, जो आपकी जीवन शक्ति को ${houseAreaHi(ascLordHouse)} की ओर निर्देशित करता है। ${ascText.nature}`
      : `Your Ascendant (Lagna) is ${ascSign}, making you a ${ascSign} rising native. The lord of your Ascendant, ${ascLord}, is placed in your ${ordinal(ascLordHouse)} house, directing your life force toward ${houseArea(ascLordHouse)}. ${ascText.nature}`,
  };

  // Moon sign reading
  const moonPos = chart.planets.Moon;
  const moonSignText = getPlanetInSignText('Moon', moonPos.rashiName, lang);
  const moonSignReading = {
    sign: moonPos.rashiName,
    nakshatra: moonPos.nakshatraName,
    text: lang === 'hi'
      ? `आपका चंद्रमा ${SIGN_HI[moonPos.rashiName] || moonPos.rashiName} में है, जो इसे आपकी राशि (चंद्र राशि) बनाता है। ${moonSignText.nature} ${moonPos.nakshatraName} नक्षत्र (पद ${moonPos.pada}) में जन्म लेकर, आपका भावनात्मक स्वभाव इसके विशिष्ट गुणों को धारण करता है।`
      : `Your Moon (Chandra) is in ${moonPos.rashiName}, making this your Rashi (Moon sign). ${moonSignText.nature} Born under ${moonPos.nakshatraName} nakshatra (pada ${moonPos.pada}), your emotional temperament carries its specific qualities.`,
  };

  const nakshatraProfile = getNakshatraProfile(moonPos.nakshatra, lang);

  // ── Part 3: Life Areas ──
  const careerReading = generateCareerReading(chart, lang);
  const careerRaw = analyzeCareer(chart);
  const marriageReading = generateMarriageReading(chart, lang);
  const wealthReading = generateWealthReading(chart, lang);
  const wealthRaw = analyzeWealth(chart);
  const healthReading = generateHealthReading(chart, lang);
  const healthRaw = analyzeHealth(chart);
  const spiritualReading = generateSpiritualReading(chart, lang);

  // ── Part 4: Timeline ──
  const moonLon = chart.planets.Moon.siderealLongitude;
  const vimDasha = calculateVimshottariDasha(moonLon, chart.birthData.date);
  const vimDashaEntries: DashaReportEntry[] = vimDasha.mahadashas.map(md => ({
    period: md,
    narrative: getMahadashaNarrative(md.lord, lang),
    isActive: md.startDate <= now && md.endDate > now,
  }));

  let yoginiDasha: DashaPeriod[] = [];
  try { yoginiDasha = calculateYoginiDasha(moonLon, chart.birthData.date); } catch { /* ok */ }

  let charaDasha: DashaPeriod[] = [];
  try { charaDasha = calculateCharaDasha(chart, 120); } catch { /* ok */ }

  // Saturn transit for Sade Sati (approximate current Saturn)
  const saturnNow = chart.planets.Saturn.rashi; // fallback: natal Saturn
  const sadeSati = detectSadeSati(saturnNow, chart.planets.Moon.rashi);

  let varshaphal: VarshaphalData | null = null;
  try { varshaphal = calculateVarshaphal(chart, now.getFullYear()); } catch { /* ok */ }

  const nadiPoints = getAllNadiPoints(chart);
  const jaiminiKarakas = calculateCharaKarakas(chart);
  const karakamsha = getKarakamsha(chart);
  const brahmaMaheshwara = calculateBrahmaMaheshwaraRudra(chart);
  const amatyakarakaCareer = getAmatyakarakaCareer(chart);
  const remedies = generateExpandedRemedies(chart);

  // Phase 5+: Extended data
  let marriageAnalysis: MarriageAnalysis | null = null;
  try { marriageAnalysis = analyzeMarriage(chart); } catch { /* ok */ }

  let tajikaYogas: TajikaYoga[] = [];
  try {
    if (varshaphal) {
      const tajikaInput = ALL_PLANETS.map(p => ({
        name: p,
        longitude: chart.planets[p].siderealLongitude,
        speed: chart.planets[p].speed ?? 1,
      }));
      tajikaYogas = detectTajikaYogas(tajikaInput);
    }
  } catch { /* ok */ }

  let sahams: Saham[] = [];
  try {
    const sunLon = chart.planets.Sun.siderealLongitude;
    const moonLon = chart.planets.Moon.siderealLongitude;
    const ascLon = chart.ascendant.longitude;
    const isDaytime = sunLon < 180; // rough: Sun above horizon
    sahams = calculateSahams(sunLon, moonLon, ascLon, isDaytime);
  } catch { /* ok */ }

  const gemstoneSpecs: { planet: string; spec: GemstoneTest }[] = [];
  for (const planet of ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu']) {
    const spec = getGemstoneTest(planet);
    if (spec) gemstoneSpecs.push({ planet, spec });
  }

  return {
    chart,
    panchang: panchangData,
    specialLagnas,
    arudhaPadas,
    chalit,
    shadbala,
    vimsopaka,
    bhavaBala,
    ashtakavarga: astakavarga,
    friendships,
    vargas,
    vargottamaPlanets,
    ascendantReading,
    moonSignReading,
    nakshatraProfile,
    planetEntries,
    houseEntries,
    yogas,
    doshas,
    conjunctions,
    avasthas,
    career: careerReading,
    careerRaw,
    marriage: marriageReading,
    wealth: wealthReading,
    wealthRaw,
    health: healthReading,
    healthRaw,
    spiritual: spiritualReading,
    vimshottariDasha: vimDashaEntries,
    yoginiDasha,
    charaDasha,
    sadeSati,
    varshaphal,
    nadiPoints,
    jaiminiKarakas,
    karakamsha,
    brahmaMaheshwara,
    amatyakarakaCareer,
    remedies,
    marriageAnalysis,
    tajikaYogas,
    sahams,
    gemstoneSpecs,
    generatedAt: now,
    profileName: chart.birthData.name || 'Your',
  };
}

// ── Helpers ──

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

const HOUSE_AREA_MAP = [
  'self, body, and vitality', 'wealth, speech, and family',
  'siblings, courage, and communication', 'home, mother, and inner peace',
  'children, intelligence, and creativity', 'health, enemies, and service',
  'marriage, partnerships, and business', 'longevity, transformation, and occult',
  'fortune, dharma, and higher learning', 'career, status, and authority',
  'income, gains, and social networks', 'expenditure, spirituality, and liberation',
];

function houseArea(h: number): string { return HOUSE_AREA_MAP[h - 1] || ''; }
