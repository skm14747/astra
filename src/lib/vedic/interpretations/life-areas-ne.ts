/**
 * Nepali life-area interpretation generators.
 * Provides authentic, culturally resonant astrological readings for:
 * Career, Marriage, Wealth, Health, and Spirituality in native Nepali phrasing.
 */
import type { Planet, KundliChart } from '../types';
import type { CareerReading, MarriageReading, WealthReading, HealthReading, SpiritualReading } from './life-areas';
import { PLANET_NAME_NE, SIGN_NAME_NE, ordinalNe } from './ne';

function planetsInHouse(chart: KundliChart, house: number): Planet[] { return chart.houses[house - 1]?.planets ?? []; }
function houseLord(chart: KundliChart, house: number): string { return chart.houses[house - 1]?.lord ?? ''; }
function planetHouse(chart: KundliChart, planet: Planet): number { return chart.planets[planet]?.house ?? 0; }
function planetSign(chart: KundliChart, planet: Planet): string { return chart.planets[planet]?.rashiName ?? ''; }
function p(name: string): string { return PLANET_NAME_NE[name] || name; }
function s(name: string): string { return SIGN_NAME_NE[name] || name; }

const SIGN_CAREER_NE: Record<string, string[]> = {
  Aries: ['सुरक्षा फौज (सेना/प्रहरी)', 'इन्जिनियरिङ', 'शल्यक्रिया', 'खेलकुद', 'साहसिक कार्य', 'उद्यमशीलता'],
  Taurus: ['बैंकिङ तथा वित्त', 'कृषि तथा पशुपालन', 'खाद्य उद्योग', 'विलासी वस्तु व्यापार', 'घरजग्गा'],
  Gemini: ['सञ्चार तथा पत्रकारिता', 'सूचना प्रविधि (IT)', 'लेखन', 'शिक्षण', 'विज्ञापन तथा जनसम्पर्क'],
  Cancer: ['स्वास्थ्य सेवा (नर्सिङ)', 'होटल तथा आतिथ्य', 'घरजग्गा', 'खाद्य व्यापार', 'समाजसेवा'],
  Leo: ['सरकारी सेवा', 'राजनीति तथा नेतृत्व', 'प्रशासनिक क्षेत्र', 'मनोरञ्जन', 'व्यवस्थापन'],
  Virgo: ['लेखापरीक्षण (अडिटिङ)', 'स्वास्थ्य विज्ञान', 'सम्पादन', 'अनुसन्धान', 'गुणस्तर नियन्त्रण'],
  Libra: ['कानुन तथा न्याय', 'कूटनीति', 'फेसन तथा डिजाइन', 'सौन्दर्यकला', 'व्यापारिक साझेदारी'],
  Scorpio: ['गम्भीर अनुसन्धान', 'गुप्तचर सेवा', 'बीमा', 'मनोविज्ञान', 'खानी तथा धातु'],
  Sagittarius: ['उच्च शिक्षा तथा अध्यापन', 'कानुन', 'प्रकाशन', 'पर्यटन तथा यात्रा', 'धर्म तथा दर्शन'],
  Capricorn: ['प्रशासनिक सेवा', 'उद्योग तथा कलकारखाना', 'निर्माण कार्य', 'खानी', 'कृषि व्यवस्थापन'],
  Aquarius: ['आधुनिक प्रविधि', 'समाज कल्याण', 'वैज्ञानिक अनुसन्धान', 'उड्डयन', 'मानवतावादी कार्य'],
  Pisces: ['चिकित्सा तथा स्वास्थ्य', 'आध्यात्मिक सेवा', 'चलचित्र तथा संगीत', 'सामाजिक कल्याण', 'वैदेशिक सेवा'],
};

const PLANET_CAREER_NE: Record<string, string[]> = {
  Sun: ['सरकारी सेवा', 'राजनीति', 'उच्च प्रशासन', 'चिकित्सा विज्ञान', 'नेतृत्वदायी भूमिका'],
  Moon: ['स्वास्थ्य सेवा', 'होटल तथा पर्यटन', 'जलस्रोत', 'खाद्य व्यापार', 'सञ्चारमाध्यम'],
  Mars: ['इन्जिनियरिङ', 'सुरक्षा निकाय', 'शल्यक्रिया', 'खेलकुद', 'घरजग्गा व्यवसाय', 'निर्माण'],
  Mercury: ['सूचना प्रविधि', 'वाणिज्य तथा व्यापार', 'लेखा', 'लेखन तथा पत्रकारिता', 'बैंकिङ'],
  Jupiter: ['शिक्षा तथा प्राध्यापन', 'कानुन तथा न्याय', 'बैंकिङ', 'धार्मिक क्षेत्र', 'परामर्श सेवा'],
  Venus: ['फेसन तथा कला', 'सिनेमा तथा संगीत', 'पर्यटन', 'सौन्दर्य प्रसाधन', 'विलासी वस्तु'],
  Saturn: ['उद्योग तथा कलकारखाना', 'खानी', 'सार्वजनिक प्रशासन', 'कृषि', 'श्रम संगठन'],
  Rahu: ['सफ्टवेयर प्रविधि', 'वैदेशिक व्यापार', 'उड्डयन', 'आधुनिक मिडिया', 'औषधि विज्ञान'],
  Ketu: ['आध्यात्मिक संस्था', 'वैकल्पिक चिकित्सा', 'प्रोग्रामिङ', 'अनुसन्धान', 'भाषा विज्ञान'],
};

export function generateCareerReadingNe(chart: KundliChart): CareerReading {
  const tenth = chart.houses[9];
  const tenthLordPlanet = tenth.lord;
  const tenthLordHouse = planetHouse(chart, tenthLordPlanet as Planet);
  const tenthSign = tenth.rashiName;
  const planetsIn10 = planetsInHouse(chart, 10);

  const fields = new Set<string>();
  (SIGN_CAREER_NE[tenthSign] ?? []).forEach(f => fields.add(f));
  planetsIn10.forEach(pp => (PLANET_CAREER_NE[pp] ?? []).forEach(f => fields.add(f)));
  (PLANET_CAREER_NE[tenthLordPlanet] ?? []).forEach(f => fields.add(f));

  const tenthHouseAnalysis = `तपाईंको कुण्डलीको दशम भाव (कर्म स्थान) ${s(tenthSign)} राशिमा परेको छ, जसका अधिपति ${p(tenthLordPlanet)} हुनुहुन्छ। दशमेश ${p(tenthLordPlanet)} कुण्डलीको ${ordinalNe(tenthLordHouse)} भावमा अवस्थित हुनुहुन्छ${
    planetsIn10.length > 0
      ? `। दशम भावमा ${planetsIn10.map(pp => p(pp)).join(', ')} को प्रभावले तपाईंको पेशागत जीवनलाई गतिशीलता र विशिष्ट पहिचान प्रदान गर्दछ`
      : '। दशम भाव ग्रह-मुक्त रहेकाले भावेशको स्थिति नै तपाईंको आजीविकाको प्रमुख दिशानिर्देशक बन्दछ'
  }।`;

  const rahu12 = planetHouse(chart, 'Rahu') === 12 || planetHouse(chart, 'Rahu') === 9;
  const ketu12 = planetHouse(chart, 'Ketu') === 12 || planetHouse(chart, 'Ketu') === 9;
  const foreignWork = (rahu12 || ketu12)
    ? 'कुण्डलीमा नवौं र बाह्रौं भावसँग राहु/केतुको सम्बन्धले वैदेशिक रोजगारी, अन्तर्राष्ट्रिय व्यापार वा विदेश यात्राका बलिया अवसरहरू देखाउँछ।'
    : 'पेशागत उन्नति मुख्यतः स्वदेशमै संकेतित छ, यद्यपि अनुकूल गोचरको समयमा छोटो अवधिका लागि वैदेशिक अवसरहरू खुल्न सक्छन्।';

  const saturn10 = planetsIn10.includes('Saturn');
  const sun10 = planetsIn10.includes('Sun');
  const jobVsBusiness = saturn10
    ? 'दशम भावमा शनिको प्रभावले निजामती सेवा, ठूला संगठित संस्था वा अनुशासित कर्पोरेट क्षेत्रमा स्थायी रोजगारलाई दृढ समर्थन गर्दछ।'
    : sun10
    ? 'दशम भावमा सूर्यको बलियो स्थितिले स्वतन्त्र नेतृत्व, सरकारी जिम्मेवारी वा आफ्नै निर्णय चल्ने व्यवसायमा प्रचुर सफलता देखाउँछ।'
    : planetsIn10.includes('Mercury')
    ? 'दशम भावमा बुधको उपस्थिति व्यापार, सञ्चार, परामर्श र साझेदारी कार्यका लागि अत्यन्त अनुकूल मानिन्छ।'
    : 'तपाईंको कुण्डलीले अनुकूल दशा र गोचरको साथ रहँदा रोजगार र स्वतन्त्र व्यवसाय दुवैमा सफलताको ढोका खोल्छ।';

  return {
    summary: `तपाईंको पेशागत जीवन ${s(tenthSign)} राशिको ऊर्जाबाट प्रभावित छ, जसलाई ${p(tenthLordPlanet)} ले मार्गदर्शन गर्नुहुन्छ। तपाईंको लागि सबैभन्दा उपयुक्त क्षेत्रहरू: ${[...fields].slice(0, 6).join(', ')} हुन्।`,
    tenthHouseAnalysis,
    suitableFields: [...fields].slice(0, 8),
    timingHint: `पेशामा सबैभन्दा ठूलो फड्को ${p(tenthLordPlanet)}को महादशा वा अन्तर्दशामा, अथवा बृहस्पतिले दशम भावमाथि शुभ गोचर गर्दा मिल्ने सम्भावना रहन्छ।`,
    jobVsBusiness,
    foreignWork,
  };
}

const SIGN_TRAITS_NE: Record<string, string> = {
  Aries: 'साहसी, ऊर्जावान् र स्पष्टवक्ता', Taurus: 'धैर्यवान्, शान्त र सौन्दर्य-प्रेमी',
  Gemini: 'हाजिरजवाफ, मिलनसार र बौद्धिक', Cancer: 'ममतामयी, संवेदनशील र गृह-प्रेमी',
  Leo: 'स्वाभिमानी, उदार र गरिमामय', Virgo: 'व्यवस्थित, विवेकी र सेवाभावी',
  Libra: 'सन्तुलित, आकर्षक र न्यायप्रिय', Scorpio: 'गम्भीर, निष्ठावान् र दृढनिश्चयी',
  Sagittarius: 'आशावादी, धार्मिक र स्वतन्त्रता-प्रेमी', Capricorn: 'कर्तव्यनिष्ठ, अनुशासित र जिम्मेवार',
  Aquarius: 'स्वतन्त्र, दूरदर्शी र मानवतावादी', Pisces: 'करुणामयी, भावुक र आध्यात्मिक',
};

export function generateMarriageReadingNe(chart: KundliChart): MarriageReading {
  const seventh = chart.houses[6];
  const seventhLord = seventh.lord;
  const seventhSign = seventh.rashiName;
  const seventhLordHouse = planetHouse(chart, seventhLord as Planet);
  const planetsIn7 = planetsInHouse(chart, 7);
  const venusSign = planetSign(chart, 'Venus');
  const venusHouse = planetHouse(chart, 'Venus');

  const spouseNature = `सप्तम भाव (दाम्पत्य स्थान) ${s(seventhSign)} राशिमा रहेकाले जीवनसाथी ${SIGN_TRAITS_NE[seventhSign] || 'विशिष्ट'} स्वभावका हुनुहुनेछ। ` +
    `शुक्र ${s(venusSign)} (${ordinalNe(venusHouse)} भाव) मा रहेकाले आपसी सम्बन्धमा प्रेम, समझदारी र भावनात्मक समर्पण प्रगाढ रहनेछ।` +
    (planetsIn7.length > 0 ? ` सप्तम भावमा स्थित ${planetsIn7.map(pp => p(pp)).join(', ')} ग्रहले वैवाहिक जीवनमा अतिरिक्त जिम्मेवारी र सक्रियता ल्याउँछन्।` : '');

  const hasJupiterAspect7 = planetHouse(chart, 'Jupiter') === 7 || [1, 5, 9].some(offset => {
    const jh = planetHouse(chart, 'Jupiter');
    return (jh + offset - 1) % 12 + 1 === 7;
  });

  return {
    summary: `विवाह र साझेदारी मुख्यतया सप्तम भाव ${s(seventhSign)} बाट निर्देशित छ, जसका स्वामी ${p(seventhLord)} ${ordinalNe(seventhLordHouse)} भावमा विराजमान हुनुहुन्छ।`,
    spouseNature,
    marriageTiming: `विवाहका लागि सबैभन्दा अनुकूल समय सप्तमेश ${p(seventhLord)} वा शुक्रको दशाकालमा र बृहस्पतिले सप्तम भाव वा सप्तमेशमाथि गोचर गर्दा बन्दछ।`,
    challenges: planetsIn7.includes('Saturn') ? 'सप्तम भावमा शनिको प्रभावले विवाहमा केही ढिलाइ वा उमेरमा परिपक्व जीवनसाथी ल्याउन सक्छ। सम्बन्धमा धैर्यता नै प्रमुख पाठ हो।' :
      planetsIn7.includes('Rahu') ? 'सप्तम भावमा राहुको उपस्थिति भिन्न पृष्ठभूमि वा परम्पराभन्दा फरक परिवेशको जीवनसाथीसँग जोड्न सक्छ।' :
      planetsIn7.includes('Mars') ? 'सप्तम भावमा मंगलको उपस्थिति (मांगलिक प्रभाव) ले आपसी सम्बन्धमा तीव्र ऊर्जा ल्याउँछ; आपसी कुराकानीमा नम्रता अपनाउनु फलदायी हुन्छ।' :
      'सामान्य साझेदारी संकेतहरू — विशेष परिस्थितिहरू चालू दशा र दैनिक गोचरमा निर्भर रहन्छन्।',
    strengths: hasJupiterAspect7 ? 'बृहस्पतिको सप्तम भावमा शुभ दृष्टि वैवाहिक जीवनको ठूलो रक्षाकवच हो — यसले बुद्धिमत्ता, आपसी आदर र स्थायी दाम्पत्य सुख प्रदान गर्दछ।' :
      'शुभ ग्रहहरूको अनुकूल गोचर र पारिवारिक समझदारीले दाम्पत्य जीवनलाई चिरस्थायी र सुखद बनाउँछ।',
  };
}

export function generateWealthReadingNe(chart: KundliChart): WealthReading {
  const secondLord = houseLord(chart, 2);
  const eleventhLord = houseLord(chart, 11);
  const secondLordHouse = planetHouse(chart, secondLord as Planet);
  const eleventhLordHouse = planetHouse(chart, eleventhLord as Planet);
  const planetsIn2 = planetsInHouse(chart, 2);
  const planetsIn11 = planetsInHouse(chart, 11);
  const fourthLord = houseLord(chart, 4);
  const marsHouse = planetHouse(chart, 'Mars');

  return {
    summary: `तपाईंको आर्थिक स्थिति दोस्रो भावका स्वामी ${p(secondLord)} (${ordinalNe(secondLordHouse)} भावमा) संचित धनका लागि र एघारौं भावका स्वामी ${p(eleventhLord)} (${ordinalNe(eleventhLordHouse)} भावमा) नियमित आम्दानीका लागि उत्तरदायी हुनुहुन्छ। ${
      planetsIn2.length > 0 ? `दोस्रो भावमा रहेका ${planetsIn2.map(pp => p(pp)).join(', ')} ग्रहले धन संचयलाई बलियो बनाउँछन्।` : ''
    }`,
    wealthSources: `आम्दानीका मुख्य स्रोतहरू ${p(eleventhLord)} को प्राकृतिक कारकत्वसँग जोडिन्छन्। ${
      planetsIn11.length > 0 ? `एघारौं भावमा रहेका ${planetsIn11.map(pp => p(pp)).join(', ')} ग्रहले आम्दानीका बहुआयामिक बाटाहरू खोल्न मद्दत गर्दछन्।` : ''
    }`,
    wealthTiming: `आर्थिक समृद्धिको शिखर द्वितीयेश ${p(secondLord)}, एकादशेश ${p(eleventhLord)} वा बृहस्पतिको दशा अवधिमा हुने गर्दछ। बृहस्पतिको अनुकूल गोचरले पनि धनवृद्धि गराउँछ।`,
    propertyIndication: `घरजग्गा तथा स्थायी सम्पत्ति चतुर्थेश ${p(fourthLord)} र मंगलको स्थितिबाट स्पष्ट हुन्छ। मंगल ${ordinalNe(marsHouse)} भावमा रहेकाले भूमि तथा अचल सम्पत्तिमा शुभ संकेत मिल्छ।`,
  };
}

const HOUSE_BODY_NE: Record<number, string> = {
  1: 'टाउको, मस्तिष्क र सम्पूर्ण शारीरिक बनावट',
  2: 'अनुहार, आँखा, घाँटी र दाँत',
  3: 'हात, काँध, कान र श्वासनली',
  4: 'छाती, मुटु र फोक्सो',
  5: 'पेट, कलेजो र पाचन प्रणाली',
  6: 'आन्द्रा, मिर्गौला र दैनिक स्वास्थ्य',
  7: 'तल्लो पेट, कम्मर र प्रजनन अंग',
  8: 'गुप्तांग, दीर्घकालीन रोग र आयु',
  9: 'तिघ्रा र कम्मरको जोर्नी',
  10: 'घुँडा, जोर्नी, हड्डी र छाला',
  11: 'खुट्टाको पिँडुला, गोलीगाँठो र बायाँ कान',
  12: 'पैताला, बायाँ आँखा र निद्रा',
};

export function generateHealthReadingNe(chart: KundliChart): HealthReading {
  const sixthLord = houseLord(chart, 6);
  const sixthLordHouse = planetHouse(chart, sixthLord as Planet);
  const planetsIn6 = planetsInHouse(chart, 6);
  const planetsIn8 = planetsInHouse(chart, 8);

  const vulnerable: string[] = [];
  if (planetsIn6.length > 0) {
    planetsIn6.forEach(pp => { vulnerable.push(`${p(pp)} छैटौं भावमा — ${HOUSE_BODY_NE[6]} मा सावधानी आवश्यक`); });
  }
  if (planetsIn8.length > 0) {
    planetsIn8.forEach(pp => { vulnerable.push(`${p(pp)} आठौं भावमा — ${HOUSE_BODY_NE[8]} सम्बन्धी सचेतता`); });
  }
  const ascLord = chart.houses[0].lord;
  const ascLordHouse = planetHouse(chart, ascLord as Planet);
  if (ascLordHouse === 6 || ascLordHouse === 8 || ascLordHouse === 12) {
    vulnerable.push(`लग्नेश ${p(ascLord)} ${ordinalNe(ascLordHouse)} भावमा — शारीरिक ऊर्जा र प्रतिरोधी क्षमताको विशेष ख्याल राख्नुपर्छ`);
  }

  return {
    summary: `स्वास्थ्य भावका अधिपति ${p(sixthLord)} कुण्डलीको ${ordinalNe(sixthLordHouse)} भावमा रहँदा शरीरको प्रतिरक्षा प्रणालीलाई सन्तुलित राख्न खानपान र जीवनशैलीमा नियमितता अनिवार्य हुन्छ।`,
    vulnerableAreas: vulnerable.length > 0 ? vulnerable.slice(0, 3).join('; ') : 'कुनै गम्भीर रोगको संकेत देखिँदैन — सामान्य स्वास्थ्य नियमहरूको पालना पर्याप्त छ।',
    healthPeriods: `विशेष गरी षष्ठेश ${p(sixthLord)} वा अष्टमेशको दशा चल्दा र मारक ग्रहहरूको प्रभाव रहँदा स्वास्थ्य जाँच गराउनु बुद्धिमानी हुन्छ।`,
    preventiveMeasures: 'आयुर्वेदिक दिनचर्या, बिहानको ताजा हावामा प्राणायाम र सात्विक खानपानले दीर्घायु र आरोग्य सुनिश्चित गर्छ।',
  };
}

export function generateSpiritualReadingNe(chart: KundliChart): SpiritualReading {
  const ninth = chart.houses[8];
  const ninthLord = ninth.lord;
  const ninthSign = ninth.rashiName;
  const ninthLordHouse = planetHouse(chart, ninthLord as Planet);
  const twelfthLord = houseLord(chart, 12);
  const ketuHouse = planetHouse(chart, 'Ketu');

  return {
    summary: `तपाईंको धर्म र आत्मिक चेतना नवम भाव ${s(ninthSign)} र नवमेश ${p(ninthLord)} (${ordinalNe(ninthLordHouse)} भाव) बाट प्रकाशित छ। केतु ${ordinalNe(ketuHouse)} भावमा हुनुले आत्मिक वैराग्य र मोक्षको खोजीलाई बल दिन्छ।`,
    spiritualStrengths: 'सत्यनिष्ठा, गुरुजनप्रतिको भक्ति, सनातन संस्कारको सम्मान र गहिरो अन्तर्ज्ञान तपाईंको आध्यात्मिक सम्पति हो।',
    meditationStyle: `मौन ध्यान, मन्त्र जप, श्रीमद्भगवद्गीताको स्वाध्याय र प्रकृतिको एकान्तमा आत्मचिन्तन तपाईंको मनलाई सर्वाधिक शान्ति दिन्छ।`,
    karmaTheme: `पूर्वजन्मका सुकृतहरूको संरक्षण गर्दै कर्तव्य कर्मलाई नै ईश्वर आराधना ठानेर निःस्वार्थ भावले जीवन व्यतीत गर्नु नै तपाईंको मूल साधना हो।`,
  };
}
