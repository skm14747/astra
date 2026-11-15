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
  ordinalHi, houseAreaHi, planetNameHi, SIGN_NAME_HI, PLANET_NAME_HI,
  ordinalNe, houseAreaNe, planetNameNe, SIGN_NAME_NE, PLANET_NAME_NE,
  ordinalPt, houseAreaPt, planetNamePt, SIGN_NAME_PT, PLANET_NAME_PT,
  ordinalEs, houseAreaEs, planetNameEs, SIGN_NAME_ES, PLANET_NAME_ES,
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
      const ph = planetNameHi;
      planetsText = h.planets.length > 0
        ? `इस भाव में ${h.planets.map(pp => ph(pp)).join(', ')} की स्थिति इन जीवन-प्रसंगों को विशेष रूप से सक्रिय, गतिशील और प्रभावशाली बनाती है।`
        : `यह भाव ग्रह-मुक्त है — इसका शुभाशुभ फल मुख्यतः भावेश ${ph(h.lord)} की स्थिति, युति एवं इस पर पड़ने वाली दृष्टियों द्वारा निर्धारित होगा।`;
      lordText = `${ordinalHi(i + 1)} भाव के अधिपति ${ph(h.lord)} हैं, जो जन्म पत्रिका के ${ordinalHi(lordHouse)} भाव में विराजमान हैं। फलस्वरूप ${houseAreaHi(i + 1)} का सीधा प्रभाव आपके ${houseAreaHi(lordHouse)} पर दिखाई देगा।`;
      area = houseAreaHi(i + 1);
    } else if (lang === 'ne') {
      const ph = planetNameNe;
      planetsText = h.planets.length > 0
        ? `यस भावमा ${h.planets.map(pp => ph(pp)).join(', ')} को उपस्थिति यी जीवन-प्रसंगहरूलाई विशेष रूपले सक्रिय र प्रभावशाली बनाउँछ।`
        : `यो भाव ग्रह-रहित छ — यसको सम्पूर्ण फल मुख्यतः भावेश ${ph(h.lord)} को अवस्थिति, युति तथा दृष्टि सम्बन्धबाट निर्देशित हुनेछ।`;
      lordText = `${ordinalNe(i + 1)} भावका अधिपति ${ph(h.lord)} हुन्, जो कुण्डलीको ${ordinalNe(lordHouse)} भावमा स्थित हुनुहुन्छ। यसले गर्दा ${houseAreaNe(i + 1)} को प्रत्यक्ष प्रभाव तपाईंको ${houseAreaNe(lordHouse)} मा पर्नेछ।`;
      area = houseAreaNe(i + 1);
    } else if (lang === 'pt') {
      const ph = planetNamePt;
      planetsText = h.planets.length > 0
        ? `A presença de ${h.planets.map(pp => ph(pp)).join(', ')} neste setor infunde dinamismo, foco e aprendizados intensos aos assuntos desta casa.`
        : `Esta casa não abriga planetas diretamente — suas promessas fluem por meio da condição cósmica de seu regente, ${ph(h.lord)}, e dos aspectos recebidos por ela.`;
      lordText = `O regente desta ${ordinalPt(i + 1)} casa é ${ph(h.lord)}, estabelecido na ${ordinalPt(lordHouse)} casa natal. Esse entrelaçamento cósmico faz com que as experiências de ${houseAreaPt(i + 1)} se manifestem primordialmente por meio de ${houseAreaPt(lordHouse)}.`;
      area = houseAreaPt(i + 1);
    } else if (lang === 'es') {
      const ph = planetNameEs;
      planetsText = h.planets.length > 0
        ? `La presencia de ${h.planets.map(pp => ph(pp)).join(', ')} en este sector focaliza tus vivencias cotidianas y despierta un movimiento notable en estos asuntos de vida.`
        : `Esta casa se encuentra libre de planetas — sus frutos dependen esencialmente de la dignidad cósmica de su regente, ${ph(h.lord)}, y de las miradas planetarias (drishti) que confluyen en ella.`;
      lordText = `El regente de esta ${ordinalEs(i + 1)} casa es ${ph(h.lord)}, posicionado en la ${ordinalEs(lordHouse)} casa natal. Esta conexión entrelaza de forma natural las vivencias de ${houseAreaEs(i + 1)} con el desarrollo de ${houseAreaEs(lordHouse)}.`;
      area = houseAreaEs(i + 1);
    } else {
      planetsText = h.planets.length > 0
        ? `${h.planets.join(', ')} ${h.planets.length > 1 ? 'occupy' : 'occupies'} this house, bringing vital energy and focus directly into these life dimensions.`
        : `No planets occupy this house directly — its outcomes unfold primarily through the placement, dignity, and aspects received by its lord, ${h.lord}.`;
      lordText = `The lord of your ${ordinal(i + 1)} house is ${h.lord}, seated in the ${ordinal(lordHouse)} house. This cosmic link channels the affairs of ${houseArea(i + 1)} directly into ${houseArea(lordHouse)}.`;
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

  const buildAscText = (): string => {
    if (lang === 'hi')
      return `आपकी जन्म कुंडली का लग्न ${SIGN_NAME_HI[ascSign] || ascSign} है, जिससे आपका लग्न स्वरूप ${SIGN_NAME_HI[ascSign] || ascSign} बनता है। लग्नेश ${planetNameHi(ascLord)} आपकी जन्म पत्रिका के ${ordinalHi(ascLordHouse)} भाव में विराजमान हैं — यह स्थिति आपकी स्वाभाविक जीवन-ऊर्जा, व्यक्तित्व और आत्मबल को विशेष रूप से ${houseAreaHi(ascLordHouse)} से जोड़ती है। ${ascText.nature}`;
    if (lang === 'ne')
      return `तपाईंको जन्म कुण्डलीको लग्न ${SIGN_NAME_NE[ascSign] || ascSign} हो, जसले तपाईंलाई ${SIGN_NAME_NE[ascSign] || ascSign} लग्नको जातक बनाउँछ। लग्नेश ${planetNameNe(ascLord)} कुण्डलीको ${ordinalNe(ascLordHouse)} भावमा विराजमान हुनुहुन्छ — यसले तपाईंको सम्पूर्ण जीवन-ऊर्जा, व्यक्तित्व र आत्मबललाई विशेष गरी ${houseAreaNe(ascLordHouse)} सँग जोड्दछ। ${ascText.nature}`;
    if (lang === 'pt')
      return `Seu Ascendente (Lagna) está no signo sideral de ${SIGN_NAME_PT[ascSign] || ascSign}, delineando a sua presença física e a sua forma de se projetar no mundo. O regente do Ascendente, ${planetNamePt(ascLord)}, ocupa a sua ${ordinalPt(ascLordHouse)} casa natal, ancorando a sua força vital e o seu impulso de autorrealização nos assuntos de ${houseAreaPt(ascLordHouse)}. ${ascText.nature}`;
    if (lang === 'es')
      return `Tu Ascendente (Lagna) se ubica en el signo sideral de ${SIGN_NAME_ES[ascSign] || ascSign}, configurando tu impronta personal y el modo en que te presentas ante la vida. El planeta regente del Ascendente, ${planetNameEs(ascLord)}, se encuentra en tu ${ordinalEs(ascLordHouse)} casa, orientando tu energía vital y tu propósito personal hacia los temas de ${houseAreaEs(ascLordHouse)}. ${ascText.nature}`;
    return `Your Ascendant (Lagna) rises in sidereal ${ascSign}, shaping your core persona and path of worldly engagement. The Ascendant lord, ${ascLord}, is seated in your ${ordinal(ascLordHouse)} house, anchoring your essential life force and self-expression in ${houseArea(ascLordHouse)}. ${ascText.nature}`;
  };

  const ascendantReading = {
    sign: ascSign,
    lord: ascLord,
    lordHouse: ascLordHouse,
    text: buildAscText(),
  };

  // Moon sign reading
  const moonPos = chart.planets.Moon;
  const moonSignText = getPlanetInSignText('Moon', moonPos.rashiName, lang);

  const buildMoonText = (): string => {
    if (lang === 'hi')
      return `जन्म के समय चंद्रमा ${SIGN_NAME_HI[moonPos.rashiName] || moonPos.rashiName} राशि में संचरण कर रहे थे, अतः आपकी जन्म राशि ${SIGN_NAME_HI[moonPos.rashiName] || moonPos.rashiName} है। आपका जन्म ${moonPos.nakshatraName} नक्षत्र के ${moonPos.pada}वें चरण में हुआ है। ${moonSignText.nature} इस नक्षत्र और चंद्र स्थिति के प्रभाव से आपकी मानसिक सोच, भावनात्मक संवेदनशीलता और अंतःकरण में इसके विशिष्ट गुण स्वाभाविक रूप से परिलक्षित होंगे।`;
    if (lang === 'ne')
      return `जन्मको समयमा चन्द्रमा ${SIGN_NAME_NE[moonPos.rashiName] || moonPos.rashiName} राशिमा रहेकाले तपाईंको जन्म राशि ${SIGN_NAME_NE[moonPos.rashiName] || moonPos.rashiName} हो। तपाईंको जन्म ${moonPos.nakshatraName} नक्षत्रको ${moonPos.pada}औं चरणमा भएको छ। ${moonSignText.nature} यस नक्षत्र र चन्द्र प्रभावले गर्दा तपाईंको मन, भावना र निर्णय क्षमतामा यसका विशिष्ट लक्षणहरू झल्कनेछन्।`;
    if (lang === 'pt')
      return `No momento de seu nascimento, a Lua (Chandra) transitava por ${SIGN_NAME_PT[moonPos.rashiName] || moonPos.rashiName}, definindo este como o seu signo lunar de nascimento (Rashi). Você nasceu sob a regência do Nakshatra ${moonPos.nakshatraName} (no ${moonPos.pada}º pada). ${moonSignText.nature} Essa posição confere à sua psique uma sensibilidade intuitiva marcante e molda a maneira como você busca segurança e acolhimento emocional.`;
    if (lang === 'es')
      return `En el instante de tu nacimiento, la Luna (Chandra) transitaba por ${SIGN_NAME_ES[moonPos.rashiName] || moonPos.rashiName}, convirtiéndolo en tu signo lunar (Rashi). Has nacido bajo el influjo del Nakshatra ${moonPos.nakshatraName} (en el pada ${moonPos.pada}). ${moonSignText.nature} Esta constelación nutre tu vida anímica con cualidades intuitivas singulares y modela el modo en que buscas equilibrio y serenidad interior.`;
    return `At the moment of your birth, the Moon (Chandra) traversed ${moonPos.rashiName}, making this your natal Rashi (Moon sign). You were born under ${moonPos.nakshatraName} Nakshatra (Pada ${moonPos.pada}). ${moonSignText.nature} This lunar placement deeply influences your emotional rhythm, instinctual responses, and inner sanctuary.`;
  };

  const moonSignReading = {
    sign: moonPos.rashiName,
    nakshatra: moonPos.nakshatraName,
    text: buildMoonText(),
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
