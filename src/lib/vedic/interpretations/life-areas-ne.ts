/**
 * Nepali life-area interpretation generators.
 */
import type { Planet, KundliChart } from '../types';
import type { CareerReading, MarriageReading, WealthReading, HealthReading, SpiritualReading } from './life-areas';
import { PLANET_NAME_NE, SIGN_NAME_NE, ordinalNe, houseAreaNe } from './ne';

function planetsInHouse(chart: KundliChart, house: number): Planet[] { return chart.houses[house - 1]?.planets ?? []; }
function houseLord(chart: KundliChart, house: number): string { return chart.houses[house - 1]?.lord ?? ''; }
function planetHouse(chart: KundliChart, planet: Planet): number { return chart.planets[planet]?.house ?? 0; }
function planetSign(chart: KundliChart, planet: Planet): string { return chart.planets[planet]?.rashiName ?? ''; }
function p(name: string): string { return PLANET_NAME_NE[name] || name; }
function s(name: string): string { return SIGN_NAME_NE[name] || name; }

export function generateCareerReadingNe(chart: KundliChart): CareerReading {
  const tenth = chart.houses[9];
  const tenthLordPlanet = tenth.lord;
  const tenthLordHouse = planetHouse(chart, tenthLordPlanet as Planet);
  const tenthSign = tenth.rashiName;
  const planetsIn10 = planetsInHouse(chart, 10);

  const tenthHouseAnalysis = `तपाईंको 10औं भाव (कर्म भाव) ${s(tenthSign)} राशिमा छ, जसको स्वामी ${p(tenthLordPlanet)} हो। ${p(tenthLordPlanet)} तपाईंको ${ordinalNe(tenthLordHouse)} भावमा स्थित छ${
    planetsIn10.length > 0
      ? `। ${planetsIn10.map(pp => p(pp)).join(', ')} ग्रह तपाईंको 10औं भावमा विराजमान छन्, जसले सीधा तपाईंको पेशागत जीवनलाई प्रभावित गर्छ`
      : '। कुनै ग्रह सीधा 10औं भावमा छैन, त्यसैले स्वामीको स्थिति प्राथमिक क्यारियर सूचक बन्छ'
  }।`;

  return {
    summary: `तपाईंको क्यारियर ${s(tenthSign)} ऊर्जाले आकार लिन्छ, ${p(tenthLordPlanet)}द्वारा निर्देशित।`,
    tenthHouseAnalysis,
    suitableFields: [],
    timingHint: `क्यारियरको शिखर ${p(tenthLordPlanet)}को महादशा वा अन्तर्दशामा, वा गुरुले तपाईंको 10औं भावमाथि गोचर गर्दा सबैभन्दा सम्भावित छ।`,
    jobVsBusiness: 'तपाईंको कुण्डलीले दशा अवधि र गोचर समर्थन अनुसार रोजगार र व्यापार दुवैलाई समर्थन गर्छ।',
    foreignWork: 'क्यारियर मुख्यतः स्वदेशमा सङ्केतित छ, यद्यपि गोचरले अस्थायी विदेशी अवसर खोल्न सक्छ।',
  };
}

export function generateMarriageReadingNe(chart: KundliChart): MarriageReading {
  const seventh = chart.houses[6];
  const seventhLord = seventh.lord;
  const seventhSign = seventh.rashiName;
  const seventhLordHouse = planetHouse(chart, seventhLord as Planet);

  return {
    summary: `विवाह मुख्यतः तपाईंको ${s(seventhSign)} 7औं भावबाट सङ्केतित छ, जसको स्वामी ${p(seventhLord)} ${ordinalNe(seventhLordHouse)} भावमा स्थित छ।`,
    spouseNature: `तपाईंको 7औं भाव ${s(seventhSign)}मा छ, जसले जीवनसाथीको स्वभाव सुझाव दिन्छ।`,
    marriageTiming: `विवाहको समय ${p(seventhLord)} वा शुक्रको दशामा, र गुरुले तपाईंको 7औं भावमाथि गोचर गर्दा सबैभन्दा अनुकूल छ।`,
    challenges: 'सामान्य साझेदारी सङ्केतहरू — विशिष्ट चुनौतीहरू चलिरहेको दशा र गोचर अवधिमा निर्भर छन्।',
    strengths: 'शुभ ग्रहले 7औं भावमाथि गोचर गर्दा र गुरुको अनुकूल अवधिमा साझेदारी क्षमता बढ्छ।',
  };
}

export function generateWealthReadingNe(chart: KundliChart): WealthReading {
  const secondLord = houseLord(chart, 2);
  const eleventhLord = houseLord(chart, 11);
  const secondLordHouse = planetHouse(chart, secondLord as Planet);
  const eleventhLordHouse = planetHouse(chart, eleventhLord as Planet);

  return {
    summary: `तपाईंको धन ${p(secondLord)} (2औं भावको स्वामी, भाव ${secondLordHouse}मा) बचतका लागि र ${p(eleventhLord)} (11औं भावको स्वामी, भाव ${eleventhLordHouse}मा) आयका लागि आकार लिन्छ।`,
    wealthSources: `प्राथमिक आय चैनलहरू ${p(eleventhLord)}को प्रकृतिसँग जोडिन्छन्।`,
    wealthTiming: `धनको शिखर ${p(secondLord)}, ${p(eleventhLord)} वा गुरुको दशामा हुन्छ।`,
    propertyIndication: `सम्पत्ति तपाईंको 4औं भावको स्वामीबाट सङ्केतित छ।`,
  };
}

export function generateHealthReadingNe(chart: KundliChart): HealthReading {
  const sixthLord = houseLord(chart, 6);
  const sixthLordHouse = planetHouse(chart, sixthLord as Planet);

  return {
    summary: `तपाईंको 6औं भावको स्वामी ${p(sixthLord)} भाव ${sixthLordHouse}मा स्थित भएर तपाईंको स्वास्थ्य ढाँचालाई आकार दिन्छ।`,
    vulnerableAreas: 'कुनै ठूलो कमजोर क्षेत्र सङ्केतित छैन — सामान्य स्वास्थ्य अनुशासन कायम राख्नुहोस्।',
    healthPeriods: `${p(sixthLord)} र 6औं वा 8औं भावमा स्थित ग्रहको दशामा स्वास्थ्यमा अतिरिक्त ध्यान चाहिन्छ।`,
    preventiveMeasures: 'तपाईंको कमजोर क्षेत्र अनुसार नियमित स्वास्थ्य जाँच, व्यायाम दिनचर्या र आहारको सिफारिस गरिन्छ।',
  };
}

export function generateSpiritualReadingNe(chart: KundliChart): SpiritualReading {
  const ninthLord = houseLord(chart, 9);
  const twelfthLord = houseLord(chart, 12);
  const jupiterHouse = planetHouse(chart, 'Jupiter');
  const ketuHouse = planetHouse(chart, 'Ketu');

  return {
    summary: `तपाईंको आध्यात्मिक मार्ग 9औं भावको स्वामी ${p(ninthLord)} (धर्म) र 12औं भावको स्वामी ${p(twelfthLord)} (मोक्ष)द्वारा निर्देशित छ। गुरु भाव ${jupiterHouse}मा र केतु भाव ${ketuHouse}मा तपाईंको आध्यात्मिक अभिरुचिलाई अझ आकार दिन्छन्।`,
    spiritualStrengths: 'आध्यात्मिक विकास सचेत अभ्यासबाट आउँछ।',
    meditationStyle: ketuHouse <= 6 ? 'सक्रिय, सेवा-उन्मुख आध्यात्मिक अभ्यास तपाईंका लागि उपयुक्त छ — कर्म योग, दैनिक गतिविधिमा मन्त्र जप।' :
      'चिन्तनशील, अन्तर्मुखी अभ्यास तपाईंका लागि उपयुक्त छ — बसेर ध्यान, दृश्यावलोकन, र भक्ति योग।',
    karmaTheme: `केतु भाव ${ketuHouse}मा पूर्व जन्म महारत सुझाव दिन्छ। तपाईंको आत्मा यहाँ अधूरो कार्य पूरा गर्न चाहन्छ।`,
  };
}
