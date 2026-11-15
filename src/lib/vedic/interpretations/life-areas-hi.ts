/**
 * Hindi life-area interpretation generators.
 * Mirrors life-areas.ts with Hindi output.
 */
import type { Planet, KundliChart } from '../types';
import type { CareerReading, MarriageReading, WealthReading, HealthReading, SpiritualReading } from './life-areas';

function planetsInHouse(chart: KundliChart, house: number): Planet[] {
  return chart.houses[house - 1]?.planets ?? [];
}
function houseLord(chart: KundliChart, house: number): string {
  return chart.houses[house - 1]?.lord ?? '';
}
function planetHouse(chart: KundliChart, planet: Planet): number {
  return chart.planets[planet]?.house ?? 0;
}
function planetSign(chart: KundliChart, planet: Planet): string {
  return chart.planets[planet]?.rashiName ?? '';
}

const PLANET_HI: Record<string, string> = {
  Sun: 'सूर्य', Moon: 'चंद्रमा', Mars: 'मंगल', Mercury: 'बुध',
  Jupiter: 'गुरु', Venus: 'शुक्र', Saturn: 'शनि', Rahu: 'राहु', Ketu: 'केतु',
};

const SIGN_HI: Record<string, string> = {
  Aries: 'मेष', Taurus: 'वृषभ', Gemini: 'मिथुन', Cancer: 'कर्क',
  Leo: 'सिंह', Virgo: 'कन्या', Libra: 'तुला', Scorpio: 'वृश्चिक',
  Sagittarius: 'धनु', Capricorn: 'मकर', Aquarius: 'कुंभ', Pisces: 'मीन',
};

function p(name: string): string { return PLANET_HI[name] || name; }
function s(name: string): string { return SIGN_HI[name] || name; }

function ordHi(n: number): string {
  const map: Record<number, string> = {
    1: 'पहले', 2: 'दूसरे', 3: 'तीसरे', 4: 'चौथे', 5: 'पाँचवें', 6: 'छठे',
    7: 'सातवें', 8: 'आठवें', 9: 'नौवें', 10: 'दसवें', 11: 'ग्यारहवें', 12: 'बारहवें',
  };
  return map[n] || `${n}वें`;
}

const SIGN_CAREER_HI: Record<string, string[]> = {
  Aries: ['सेना', 'पुलिस', 'शल्य चिकित्सा', 'खेल', 'इंजीनियरिंग', 'उद्यमिता'],
  Taurus: ['वित्त', 'बैंकिंग', 'कृषि', 'खाद्य उद्योग', 'विलासिता सामान', 'अचल संपत्ति'],
  Gemini: ['मीडिया', 'पत्रकारिता', 'लेखन', 'आईटी', 'शिक्षण', 'विज्ञापन'],
  Cancer: ['नर्सिंग', 'आतिथ्य', 'अचल संपत्ति', 'खाद्य', 'देखभाल', 'लोक सेवा'],
  Leo: ['सरकार', 'राजनीति', 'मनोरंजन', 'नेतृत्व', 'प्रबंधन', 'प्रदर्शन कला'],
  Virgo: ['लेखांकन', 'स्वास्थ्य सेवा', 'संपादन', 'शोध', 'लेखा-परीक्षा', 'गुणवत्ता नियंत्रण'],
  Libra: ['कानून', 'कूटनीति', 'फैशन', 'इंटीरियर डिज़ाइन', 'परामर्श', 'साझेदारी व्यापार'],
  Scorpio: ['शोध', 'जांच', 'बीमा', 'तांत्रिक विद्या', 'मनोविज्ञान', 'खनन'],
  Sagittarius: ['शिक्षण', 'कानून', 'प्रकाशन', 'यात्रा उद्योग', 'धर्म', 'दर्शन'],
  Capricorn: ['सरकार', 'प्रशासन', 'निर्माण', 'खनन', 'कृषि', 'प्रबंधन'],
  Aquarius: ['प्रौद्योगिकी', 'सामाजिक कार्य', 'विज्ञान', 'विमानन', 'नेटवर्किंग', 'मानवतावादी कार्य'],
  Pisces: ['स्वास्थ्य सेवा', 'आध्यात्मिक कार्य', 'फिल्म', 'संगीत', 'दान', 'विदेश सेवा'],
};

const PLANET_CAREER_HI: Record<string, string[]> = {
  Sun: ['सरकार', 'राजनीति', 'प्रशासन', 'चिकित्सा', 'अधिकार पद'],
  Moon: ['नर्सिंग', 'आतिथ्य', 'खाद्य', 'यात्रा', 'जनसंपर्क', 'जल-संबंधित'],
  Mars: ['सेना', 'इंजीनियरिंग', 'शल्य चिकित्सा', 'पुलिस', 'खेल', 'अचल संपत्ति', 'अग्निशमन'],
  Mercury: ['आईटी', 'लेखन', 'लेखांकन', 'शिक्षण', 'मीडिया', 'व्यापार', 'ज्योतिष'],
  Jupiter: ['शिक्षा', 'कानून', 'बैंकिंग', 'पुरोहित', 'सलाहकार', 'प्रकाशन'],
  Venus: ['फैशन', 'फिल्म', 'संगीत', 'विलासिता', 'आतिथ्य', 'सौंदर्य', 'कला', 'डिज़ाइन'],
  Saturn: ['निर्माण', 'खनन', 'तेल', 'कृषि', 'श्रम', 'सरकारी सेवा'],
  Rahu: ['प्रौद्योगिकी', 'विदेश व्यापार', 'विमानन', 'मीडिया', 'दवा उद्योग', 'अपरंपरागत क्षेत्र'],
  Ketu: ['आध्यात्मिक कार्य', 'वैकल्पिक उपचार', 'प्रोग्रामिंग', 'शोध', 'भाषाएँ'],
};

export function generateCareerReadingHi(chart: KundliChart): CareerReading {
  const tenth = chart.houses[9];
  const tenthLordPlanet = tenth.lord;
  const tenthLordHouse = planetHouse(chart, tenthLordPlanet as Planet);
  const tenthSign = tenth.rashiName;
  const planetsIn10 = planetsInHouse(chart, 10);

  const fields = new Set<string>();
  (SIGN_CAREER_HI[tenthSign] ?? []).forEach(f => fields.add(f));
  planetsIn10.forEach(pp => (PLANET_CAREER_HI[pp] ?? []).forEach(f => fields.add(f)));
  (PLANET_CAREER_HI[tenthLordPlanet] ?? []).forEach(f => fields.add(f));

  const tenthHouseAnalysis = `आपका 10वाँ भाव (कर्म भाव) ${s(tenthSign)} राशि में है, जिसके स्वामी ${p(tenthLordPlanet)} हैं। ${p(tenthLordPlanet)} आपके ${ordHi(tenthLordHouse)} भाव में स्थित हैं${
    planetsIn10.length > 0
      ? `। ${planetsIn10.map(pp => p(pp)).join(', ')} ग्रह आपके 10वें भाव में विराजमान हैं, जो सीधे आपके पेशेवर जीवन को प्रभावित करते हैं`
      : '। कोई ग्रह सीधे 10वें भाव में नहीं है, इसलिए स्वामी की स्थिति प्राथमिक कैरियर संकेतक बनती है'
  }।`;

  const rahu12 = planetHouse(chart, 'Rahu') === 12 || planetHouse(chart, 'Rahu') === 9;
  const ketu12 = planetHouse(chart, 'Ketu') === 12 || planetHouse(chart, 'Ketu') === 9;
  const foreignWork = (rahu12 || ketu12)
    ? 'आपके कैरियर में विदेशी कार्य या यात्रा के संकेत हैं। राहु/केतु की 9वें या 12वें भाव से संलग्नता अंतरराष्ट्रीय अवसरों का सुझाव देती है।'
    : 'कैरियर मुख्यतः स्वदेश में संकेतित है, हालांकि गोचर अस्थायी विदेशी अवसर खोल सकते हैं।';

  const saturn10 = planetsIn10.includes('Saturn');
  const sun10 = planetsIn10.includes('Sun');
  const jobVsBusiness = saturn10
    ? '10वें भाव में शनि संरचित रोज़गार — सरकारी सेवा, बड़े संगठनों या अनुशासित कॉर्पोरेट वातावरण — को दृढ़ता से समर्थन करता है।'
    : sun10
    ? '10वें भाव में सूर्य स्वतंत्र अधिकार — नेतृत्व भूमिकाएँ, स्वरोज़गार या सरकारी पद जहाँ आप दूसरों को निर्देशित करें — को समर्थन करता है।'
    : planetsIn10.includes('Mercury')
    ? '10वें भाव में बुध व्यापार, व्यापारिक और संचार-आधारित पेशों को समर्थन करता है। एकाधिक उद्यम या सलाहकार भूमिकाएँ आपके अनुकूल हैं।'
    : 'आपकी कुंडली दशा अवधि और गोचर समर्थन के अनुसार रोज़गार और व्यापार दोनों का समर्थन करती है।';

  return {
    summary: `आपका कैरियर ${s(tenthSign)} ऊर्जा से आकार लेता है, ${p(tenthLordPlanet)} द्वारा निर्देशित। आपकी कुंडली के अनुसार सबसे उपयुक्त क्षेत्र हैं: ${[...fields].slice(0, 6).join(', ')}।`,
    tenthHouseAnalysis,
    suitableFields: [...fields].slice(0, 8),
    timingHint: `कैरियर का शिखर सबसे संभावित है ${p(tenthLordPlanet)} की महादशा या अंतर्दशा में, या जब गुरु आपके 10वें भाव पर गोचर करें।`,
    jobVsBusiness,
    foreignWork,
  };
}

const SIGN_TRAITS_HI: Record<string, string> = {
  Aries: 'साहसी, ऊर्जावान और स्वतंत्र', Taurus: 'धैर्यवान, सुंदर और आराम-प्रेमी',
  Gemini: 'हाज़िरजवाब, संवादी और बौद्धिक रूप से जिज्ञासु', Cancer: 'स्नेही, भावनात्मक रूप से गहरी और पालनकारी',
  Leo: 'आत्मविश्वासी, स्नेही और गरिमापूर्ण', Virgo: 'विश्लेषणात्मक, स्वास्थ्य-सचेत और सेवा-उन्मुख',
  Libra: 'आकर्षक, निष्पक्ष और सौंदर्यपूर्ण', Scorpio: 'तीव्र, रहस्यमय और गहरी वफादार',
  Sagittarius: 'साहसी, दार्शनिक और स्वतंत्रता-प्रेमी', Capricorn: 'अनुशासित, जिम्मेदार और महत्वाकांक्षी',
  Aquarius: 'स्वतंत्र, नवप्रवर्तक और मानवतावादी', Pisces: 'करुणामय, कलात्मक और आध्यात्मिक',
};

const VENUS_LOVE_HI: Record<string, string> = {
  Aries: 'भावुक, सीधी और स्वतःस्फूर्त प्रेम शैली', Taurus: 'संवेदी, वफादार और विलासिता-प्रेमी रोमांटिक प्रकृति',
  Gemini: 'आकर्षक, हाज़िरजवाब और संवादी प्रेम दृष्टिकोण', Cancer: 'पालनकारी, भावनात्मक और गृह-केंद्रित प्रेम',
  Leo: 'भव्य, उदार और नाटकीय रोमांटिक अभिव्यक्ति', Virgo: 'समर्पित, सेवा-उन्मुख और व्यावहारिक प्रेम प्रकृति',
  Libra: 'सामंजस्यपूर्ण, साझेदारी-प्रेरित और सुरुचिपूर्ण रोमांस', Scorpio: 'तीव्र, सब-या-कुछ-नहीं और गहरी भावुक प्रेम',
  Sagittarius: 'साहसी, स्वतंत्रता-प्रेमी और दार्शनिक रोमांस', Capricorn: 'परिपक्व, प्रतिबद्ध और स्थायी प्रेम शैली',
  Aquarius: 'स्वतंत्र, मित्रता-प्रथम और अपरंपरागत रोमांस', Pisces: 'गहरी रोमांटिक, आध्यात्मिक और निःस्वार्थ भक्तिपूर्ण प्रेम',
};

export function generateMarriageReadingHi(chart: KundliChart): MarriageReading {
  const seventh = chart.houses[6];
  const seventhLord = seventh.lord;
  const seventhSign = seventh.rashiName;
  const seventhLordHouse = planetHouse(chart, seventhLord as Planet);
  const planetsIn7 = planetsInHouse(chart, 7);
  const venusSign = planetSign(chart, 'Venus');
  const venusHouse = planetHouse(chart, 'Venus');

  const spouseNature = `आपका 7वाँ भाव ${s(seventhSign)} में है, जो ${SIGN_TRAITS_HI[seventhSign] || 'विशिष्ट'} जीवनसाथी का सुझाव देता है। ` +
    `शुक्र ${s(venusSign)} (भाव ${venusHouse}) में ${VENUS_LOVE_HI[venusSign] || 'एक विशिष्ट प्रेम दृष्टिकोण'} जोड़ता है।` +
    (planetsIn7.length > 0 ? ` ${planetsIn7.map(pp => p(pp)).join(' और ')} 7वें भाव में साझेदारी गतिशीलता में अतिरिक्त जटिलता लाते हैं।` : '');

  const hasJupiterAspect7 = planetHouse(chart, 'Jupiter') === 7 || [1, 5, 9].some(offset => {
    const jh = planetHouse(chart, 'Jupiter');
    return (jh + offset - 1) % 12 + 1 === 7;
  });

  return {
    summary: `विवाह मुख्यतः आपके ${s(seventhSign)} 7वें भाव से संकेतित है, जिसके स्वामी ${p(seventhLord)} ${ordHi(seventhLordHouse)} भाव में स्थित हैं।`,
    spouseNature,
    marriageTiming: `विवाह का समय ${p(seventhLord)} या शुक्र की दशा में, और जब गुरु आपके 7वें भाव या इसके स्वामी पर गोचर करें, सबसे अनुकूल है।`,
    challenges: planetsIn7.includes('Saturn') ? '7वें भाव में शनि विवाह में विलंब या एक परिपक्व, जिम्मेदार साथी ला सकता है। संबंधों में धैर्य आपका पाठ है।' :
      planetsIn7.includes('Rahu') ? '7वें भाव में राहु एक अपरंपरागत जीवनसाथी ला सकता है — संभवतः भिन्न पृष्ठभूमि, संस्कृति या राष्ट्रीयता से।' :
      planetsIn7.includes('Mars') ? '7वें भाव में मंगल (मांगलिक विचार) जुनून लाता है लेकिन संभावित संघर्ष भी। मिलती-जुलती मंगल ऊर्जा वाला साथी संतुलन बनाता है।' :
      'सामान्य साझेदारी संकेत — विशिष्ट चुनौतियाँ चल रही दशा और गोचर अवधियों पर निर्भर।',
    strengths: hasJupiterAspect7 ? 'गुरु का 7वें भाव पर शुभ प्रभाव एक मज़बूत सकारात्मक है — यह विवाह की रक्षा करता है, बुद्धिमान साथी लाता है और स्थायी साझेदारी का समर्थन करता है।' :
      'जब शुभ ग्रह 7वें भाव पर गोचर करें और गुरु की अनुकूल अवधि में आपकी साझेदारी क्षमता बढ़ती है।',
  };
}

export function generateWealthReadingHi(chart: KundliChart): WealthReading {
  const secondLord = houseLord(chart, 2);
  const eleventhLord = houseLord(chart, 11);
  const secondLordHouse = planetHouse(chart, secondLord as Planet);
  const eleventhLordHouse = planetHouse(chart, eleventhLord as Planet);
  const planetsIn2 = planetsInHouse(chart, 2);
  const planetsIn11 = planetsInHouse(chart, 11);
  const fourthLord = houseLord(chart, 4);
  const marsHouse = planetHouse(chart, 'Mars');

  return {
    summary: `आपका धन ${p(secondLord)} (2वें भाव का स्वामी, भाव ${secondLordHouse} में) बचत के लिए और ${p(eleventhLord)} (11वें भाव का स्वामी, भाव ${eleventhLordHouse} में) आय के लिए आकार लेता है। ${
      planetsIn2.length > 0 ? `${planetsIn2.map(pp => p(pp)).join(', ')} 2वें भाव में सीधे आपके धन संचय को प्रभावित करते हैं।` : ''
    }`,
    wealthSources: `प्राथमिक आय चैनल ${p(eleventhLord)} की प्रकृति (${(PLANET_CAREER_HI[eleventhLord] ?? ['सामान्य पेशा']).slice(0, 3).join(', ')}) से जुड़ते हैं। ${
      planetsIn11.length > 0 ? `${planetsIn11.map(pp => p(pp)).join(', ')} 11वें भाव में ${planetsIn11.map(pp => (PLANET_CAREER_HI[pp] ?? ['विभिन्न'])[0]).join(' और ')} के माध्यम से लाभ बढ़ाते हैं।` : ''
    }`,
    wealthTiming: `धन का शिखर ${p(secondLord)}, ${p(eleventhLord)} या गुरु की दशा में होता है। गुरु का 2वें या 11वें भाव पर गोचर भी वित्तीय वृद्धि को प्रेरित करता है।`,
    propertyIndication: `संपत्ति आपके 4वें भाव के स्वामी ${p(fourthLord)} से संकेतित है। मंगल भाव ${marsHouse} में ${marsHouse === 4 ? 'सीधे संपत्ति मामलों को आशीर्वाद देता है' : 'अपने ' + ordHi(marsHouse) + ' भाव स्थिति से संपत्ति को प्रभावित करता है'}।`,
  };
}

const HOUSE_BODY_HI: Record<number, string> = {
  1: 'सिर, मस्तिष्क, समग्र शारीरिक संरचना',
  2: 'चेहरा, दाँत, दाहिनी आँख, गला',
  3: 'भुजाएँ, कंधे, दाहिना कान, ऊपरी छाती',
  4: 'छाती, हृदय, फेफड़े, स्तन क्षेत्र',
  5: 'पेट, ऊपरी उदर, यकृत, मन',
  6: 'आंतें, गुर्दे, निचला उदर',
  7: 'कमर का निचला हिस्सा, गुर्दे, प्रजनन अंग',
  8: 'जननांग, पुरानी बीमारियाँ, गुदा',
  9: 'कूल्हे, जांघें, धमनियाँ',
  10: 'घुटने, जोड़, हड्डियाँ, त्वचा',
  11: 'पिंडलियाँ, टखने, बाएँ कान',
  12: 'पैर, बाईं आँख, नींद, अस्पताल में भर्ती',
};

export function generateHealthReadingHi(chart: KundliChart): HealthReading {
  const sixthLord = houseLord(chart, 6);
  const sixthLordHouse = planetHouse(chart, sixthLord as Planet);
  const planetsIn6 = planetsInHouse(chart, 6);
  const planetsIn8 = planetsInHouse(chart, 8);

  const vulnerable: string[] = [];
  if (planetsIn6.length > 0) {
    planetsIn6.forEach(pp => { vulnerable.push(`${p(pp)} 6वें भाव में ${HOUSE_BODY_HI[6]} को प्रभावित करता है`); });
  }
  if (planetsIn8.length > 0) {
    planetsIn8.forEach(pp => { vulnerable.push(`${p(pp)} 8वें भाव में ${HOUSE_BODY_HI[8]} को प्रभावित करता है`); });
  }
  const ascLord = chart.houses[0].lord;
  const ascLordHouse = planetHouse(chart, ascLord as Planet);
  if (ascLordHouse === 6 || ascLordHouse === 8 || ascLordHouse === 12) {
    vulnerable.push(`लग्न स्वामी ${p(ascLord)} ${ordHi(ascLordHouse)} भाव में — स्वास्थ्य पर विशेष ध्यान आवश्यक`);
  }

  return {
    summary: `आपके 6वें भाव का स्वामी ${p(sixthLord)} भाव ${sixthLordHouse} में स्थित होकर आपके स्वास्थ्य पैटर्न को आकार देता है। ${
      planetsIn6.length > 0 ? `${planetsIn6.map(pp => p(pp)).join(', ')} 6वें भाव में सक्रिय स्वास्थ्य विषयों का संकेत देते हैं।` : 'कोई ग्रह 6वें भाव में नहीं — कम प्रत्यक्ष स्वास्थ्य चुनौतियों का सुझाव।'
    }`,
    vulnerableAreas: vulnerable.length > 0 ? vulnerable.join('। ') + '।' : 'कोई बड़ा कमज़ोर क्षेत्र संकेतित नहीं — सामान्य स्वास्थ्य अनुशासन बनाए रखें।',
    healthPeriods: `${p(sixthLord)} और 6वें या 8वें भाव में स्थित ग्रहों की दशा में स्वास्थ्य पर अतिरिक्त ध्यान चाहिए। लग्न या 6वें भाव पर शनि और राहु का गोचर भी सतर्कता माँगता है।`,
    preventiveMeasures: 'अपने कमज़ोर क्षेत्रों के अनुसार नियमित स्वास्थ्य जाँच, मंगल की स्थिति ऊर्जा के अनुसार व्यायाम दिनचर्या, और चंद्र राशि प्राथमिकताओं के अनुसार आहार की सिफारिश है।',
  };
}

export function generateSpiritualReadingHi(chart: KundliChart): SpiritualReading {
  const ninthLord = houseLord(chart, 9);
  const twelfthLord = houseLord(chart, 12);
  const jupiterHouse = planetHouse(chart, 'Jupiter');
  const ketuHouse = planetHouse(chart, 'Ketu');
  const planetsIn9 = planetsInHouse(chart, 9);
  const planetsIn12 = planetsInHouse(chart, 12);

  const mokshaTrikona = [4, 8, 12];
  const mokshaCount = mokshaTrikona.reduce((n, h) => n + planetsInHouse(chart, h).length, 0);

  return {
    summary: `आपका आध्यात्मिक मार्ग 9वें भाव के स्वामी ${p(ninthLord)} (धर्म) और 12वें भाव के स्वामी ${p(twelfthLord)} (मोक्ष) द्वारा निर्देशित है। गुरु भाव ${jupiterHouse} में और केतु भाव ${ketuHouse} में आपकी आध्यात्मिक अभिरुचि को और आकार देते हैं।`,
    spiritualStrengths: `${
      planetsIn9.length > 0 ? `${planetsIn9.map(pp => p(pp)).join(', ')} 9वें भाव में धार्मिक झुकाव को मज़बूत करते हैं। ` : ''
    }${
      planetsIn12.length > 0 ? `${planetsIn12.map(pp => p(pp)).join(', ')} 12वें भाव में ध्यान और मोक्ष का समर्थन करते हैं। ` : ''
    }${
      mokshaCount >= 3 ? 'मज़बूत मोक्ष त्रिकोण सक्रियण — 4वें, 8वें और 12वें भाव में एकाधिक ग्रह गहरी आध्यात्मिक क्षमता दर्शाते हैं।' :
      'आध्यात्मिक विकास सहज झुकाव के बजाय सचेत अभ्यास से आता है।'
    }`,
    meditationStyle: ketuHouse <= 6 ? 'सक्रिय, सेवा-उन्मुख आध्यात्मिक अभ्यास आपके अनुकूल है — कर्म योग, दैनिक गतिविधियों में मंत्र जप, और सामान्य में पवित्र खोजना।' :
      'चिंतनशील, अंतर्मुखी अभ्यास आपके अनुकूल है — बैठकर ध्यान, दृश्यावलोकन, और भक्ति योग जैसे समर्पण-आधारित दृष्टिकोण।',
    karmaTheme: `केतु भाव ${ketuHouse} में ${HOUSE_BODY_HI[ketuHouse] ? HOUSE_BODY_HI[ketuHouse] + ' से संबंधित विषयों' : 'इस भाव के विषयों'} में पूर्व जन्म महारत का सुझाव देता है। आपकी आत्मा यहाँ अधूरे कार्य को पूरा करना चाहती है, जबकि राहु के भाव ${planetHouse(chart, 'Rahu')} के विषय नई वृद्धि के रूप में विकसित हो रहे हैं।`,
  };
}
