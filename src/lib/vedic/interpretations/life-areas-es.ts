/**
 * Spanish life-area interpretation generators.
 * Provides authentic, culturally rooted, language-native astrological readings for:
 * Career, Marriage, Wealth, Health, and Spirituality in fluent Spanish.
 */
import type { Planet, KundliChart } from '../types';
import type { CareerReading, MarriageReading, WealthReading, HealthReading, SpiritualReading } from './life-areas';
import { PLANET_NAME_ES, SIGN_NAME_ES, ordinalEs } from './es';

function planetsInHouse(chart: KundliChart, house: number): Planet[] { return chart.houses[house - 1]?.planets ?? []; }
function houseLord(chart: KundliChart, house: number): string { return chart.houses[house - 1]?.lord ?? ''; }
function planetHouse(chart: KundliChart, planet: Planet): number { return chart.planets[planet]?.house ?? 0; }
function planetSign(chart: KundliChart, planet: Planet): string { return chart.planets[planet]?.rashiName ?? ''; }
function p(name: string): string { return PLANET_NAME_ES[name] || name; }
function s(name: string): string { return SIGN_NAME_ES[name] || name; }

const SIGN_CAREER_ES: Record<string, string[]> = {
  Aries: ['Fuerzas de Seguridad', 'Ingeniería Mecánica', 'Cirugía', 'Deportes de Competición', 'Emprendimiento Innovador'],
  Taurus: ['Banca y Finanzas', 'Sector Agropecuario', 'Gastronomía Selecta', 'Bienes de Lujo', 'Arquitectura y Patrimonio'],
  Gemini: ['Medios de Comunicación', 'Tecnologías de la Información (TI)', 'Periodismo', 'Comercio Exterior', 'Publicidad'],
  Cancer: ['Salud y Cuidados', 'Hostelería y Turismo', 'Sector Inmobiliario', 'Trabajo Social', 'Alimentación'],
  Leo: ['Gobierno y Política', 'Liderazgo Corporativo', 'Artes Escénicas', 'Gestión de Equipos', 'Industria del Entretenimiento'],
  Virgo: ['Auditoría y Contabilidad', 'Medicina Diagnóstica', 'Edición Técnica', 'Control de Calidad', 'Investigación'],
  Libra: ['Derecho y Judicatura', 'Diplomacia Internacional', 'Diseño y Moda', 'Relaciones Públicas', 'Sociedades Mercantiles'],
  Scorpio: ['Investigación Pericial', 'Psicología Profunda', 'Sector Asegurador', 'Minería', 'Investigación Científica'],
  Sagittarius: ['Educación Superior y Filosofía', 'Derecho Internacional', 'Industria Editorial', 'Turismo Global', 'Comercio Transnacional'],
  Capricorn: ['Administración Pública', 'Ingeniería Civil e Infraestructuras', 'Minería', 'Dirección Estratégica', 'Gran Industria'],
  Aquarius: ['Tecnología Disruptiva e IA', 'Aeroespacial', 'Organizaciones Humanitarias', 'Ciencias Sociales', 'Telecomunicaciones'],
  Pisces: ['Medicina Integrativa', 'Cine y Artes Visuales', 'Cooperación Internacional', 'Fotografía', 'Psicología Transpersonal'],
};

const PLANET_CAREER_ES: Record<string, string[]> = {
  Sun: ['Cargos de Dirección Pública', 'Gestión Empresarial', 'Medicina', 'Liderazgo Institucional', 'Política Estratégica'],
  Moon: ['Atención y Servicios al Público', 'Hostelería', 'Enfermería', 'Psicología', 'Recursos Marítimos y Alimentación'],
  Mars: ['Ingeniería y Obras', 'Cirugía', 'Defensa y Seguridad', 'Promoción Inmobiliaria', 'Deporte Profesional'],
  Mercury: ['Desarrollo de Software', 'Análisis Financiero', 'Comunicación y Letras', 'Comercio Electrónico', 'Consultoría'],
  Jupiter: ['Judicatura y Abogacía', 'Docencia Universitaria', 'Banca Ética', 'Filosofía', 'Asesoría Ministerial'],
  Venus: ['Diseño y Alta Costura', 'Cine y Producción Musical', 'Hostelería de Lujo', 'Arquitectura de Interiores', 'Diplomacia'],
  Saturn: ['Industria Pesada', 'Construcción', 'Agronomía', 'Administración General', 'Gestión Laboral e Institucional'],
  Rahu: ['Tecnología de Vanguardia', 'Aviación', 'Medios Digitales', 'Industria Farmacéutica', 'Importación y Exportación'],
  Ketu: ['Investigación Avanzada', 'Terapias Alternativas', 'Programación Informática', 'Astrología y Saberes Antiguos', 'Filantropía'],
};

export function generateCareerReadingEs(chart: KundliChart): CareerReading {
  const tenth = chart.houses[9];
  const tenthLordPlanet = tenth.lord;
  const tenthLordHouse = planetHouse(chart, tenthLordPlanet as Planet);
  const tenthSign = tenth.rashiName;
  const planetsIn10 = planetsInHouse(chart, 10);

  const fields = new Set<string>();
  (SIGN_CAREER_ES[tenthSign] ?? []).forEach(f => fields.add(f));
  planetsIn10.forEach(pp => (PLANET_CAREER_ES[pp] ?? []).forEach(f => fields.add(f)));
  (PLANET_CAREER_ES[tenthLordPlanet] ?? []).forEach(f => fields.add(f));

  const tenthHouseAnalysis = `Tu casa 10 (Karma Bhava —el sector de la vocación y el estatus social) se sitúa en el signo sideral de ${s(tenthSign)}, bajo la regencia de ${p(tenthLordPlanet)}. Este planeta se ubica en tu ${ordinalEs(tenthLordHouse)} casa natal${
    planetsIn10.length > 0
      ? `, mientras que la presencia de ${planetsIn10.map(pp => p(pp)).join(', ')} en la casa 10 infunde dinamismo y una impronta singular a tu proyección profesional`
      : ', indicando que tus logros se erigen primordialmente a través de la dignidad y las conexiones de su regente'
  }.`;

  const rahu12 = planetHouse(chart, 'Rahu') === 12 || planetHouse(chart, 'Rahu') === 9;
  const ketu12 = planetHouse(chart, 'Ketu') === 12 || planetHouse(chart, 'Ketu') === 9;
  const foreignWork = (rahu12 || ketu12)
    ? 'La activación de las casas 9ª o 12ª por nodos lunares favorece decididamente carreras internacionales, corporaciones multinacionales y vínculos laborales allende las fronteras natales.'
    : 'La trayectoria profesional tiende a consolidarse con firmeza en el país de origen, si bien períodos de tránsito favorable abren puertas a colaboraciones externas temporales.';

  const saturn10 = planetsIn10.includes('Saturn');
  const sun10 = planetsIn10.includes('Sun');
  const jobVsBusiness = saturn10
    ? 'Saturno en la casa 10 respalda trayectorias estructuradas y metódicas —como el servicio público de carrera o grandes corporaciones donde se asciende por mérito y perseverancia.'
    : sun10
    ? 'El Sol en la casa 10 otorga una vocación innata para el mando autónomo, la dirección empresarial o responsabilidades públicas donde ejerzas la autoridad principal.'
    : planetsIn10.includes('Mercury')
    ? 'Mercurio en la casa 10 beneficia con fuerza el comercio, la intermediación, la consultoría, los medios y proyectos de naturaleza polifacética.'
    : 'Tu carta natal ofrece versatilidad para compaginar cargos de responsabilidad con iniciativas empresariales independientes.';

  return {
    summary: `Tu vocación está impulsada por la energía arquetípica de ${s(tenthSign)} y canalizada por el talento de ${p(tenthLordPlanet)}. Los ámbitos de mayor realización y prosperidad son: ${[...fields].slice(0, 6).join(', ')}.`,
    tenthHouseAnalysis,
    suitableFields: [...fields].slice(0, 8),
    timingHint: `El despegue profesional más relevante coincide con las etapas de Mahadasha o Antardasha de ${p(tenthLordPlanet)}, o cuando Júpiter transita de forma benefactora sobre tu casa 10.`,
    jobVsBusiness,
    foreignWork,
  };
}

const SIGN_TRAITS_ES: Record<string, string> = {
  Aries: 'valiente, enérgica, audaz y decidida', Taurus: 'leal, paciente, serena y amante del buen vivir',
  Gemini: 'comunicativa, elocuente, ingeniosa y de mente ágil', Cancer: 'afectuosa, protectora, sensible y hogareña',
  Leo: 'noble, generosa, leal y de presencia radiante', Virgo: 'detallista, dedicada, práctica y atenta',
  Libra: 'armoniosa, refinada, diplomática y compañera', Scorpio: 'profunda, magnética, fiel e intensamente leal',
  Sagittarius: 'optimista, libre, culta y de miras elevadas', Capricorn: 'comprometida, madura, formal y perseverante',
  Aquarius: 'independiente, visionaria, justa y solidaria', Pisces: 'empática, compasiva, sensible y de alma poética',
};

export function generateMarriageReadingEs(chart: KundliChart): MarriageReading {
  const seventh = chart.houses[6];
  const seventhLord = seventh.lord;
  const seventhSign = seventh.rashiName;
  const seventhLordHouse = planetHouse(chart, seventhLord as Planet);
  const planetsIn7 = planetsInHouse(chart, 7);
  const venusSign = planetSign(chart, 'Venus');
  const venusHouse = planetHouse(chart, 'Venus');

  const spouseNature = `Tu casa 7 (el ámbito de los compromisos conyugales y de pareja) se sitúa en ${s(seventhSign)}, describiendo un(a) compañero(a) de carácter ${SIGN_TRAITS_ES[seventhSign] || 'singular y destacado'}. ` +
    `Venus ubicado en ${s(venusSign)} (en tu ${ordinalEs(venusHouse)} casa) aporta devoción sincera, calidez de sentimientos y anhelo de una convivencia armónica.` +
    (planetsIn7.length > 0 ? ` La presencia de ${planetsIn7.map(pp => p(pp)).join(', ')} en la casa 7 introduce dinámicas de intenso aprendizaje en la vida compartida.` : '');

  const hasJupiterAspect7 = planetHouse(chart, 'Jupiter') === 7 || [1, 5, 9].some(offset => {
    const jh = planetHouse(chart, 'Jupiter');
    return (jh + offset - 1) % 12 + 1 === 7;
  });

  return {
    summary: `El matrimonio y las alianzas profundas se hallan delineadas principalmente por la casa 7 en ${s(seventhSign)}, cuyo regente ${p(seventhLord)} se ubica en tu ${ordinalEs(seventhLordHouse)} casa natal.`,
    spouseNature,
    marriageTiming: `Los períodos más propicios para formalizar uniones matrimoniales corresponden al Dasha de ${p(seventhLord)} o de Venus, y a tránsitos protectores de Júpiter sobre el eje de la casa 7.`,
    challenges: planetsIn7.includes('Saturn') ? 'Saturno en la casa 7 suele favorecer enlaces maduros o que fructifican con el paso del tiempo, donde la lealtad y la paciencia son el mayor tesoro.' :
      planetsIn7.includes('Rahu') ? 'Rahu en la casa 7 inclina hacia parejas de entornos no convencionales o procedencias lejanas, demandando apertura de mente y comprensión.' :
      planetsIn7.includes('Mars') ? 'Marte en la casa 7 infunde pasión intensa, pidiendo templanza para transformar la asertividad en compañerismo constructivo.' :
      'Tendencias afectivas armónicas — los matices particulares se regularán por los ciclos Dasha activos y los tránsitos del momento.',
    strengths: hasJupiterAspect7 ? 'La mirada benefactora de Júpiter sobre la casa 7 representa una valiosa protección cósmica para el matrimonio, promoviendo respeto sincero y estabilidad duradera.' :
      'La disposición al diálogo transparente y el reconocimiento mutuo aseguran un clima de paz y complicidad en el hogar.',
  };
}

export function generateWealthReadingEs(chart: KundliChart): WealthReading {
  const secondLord = houseLord(chart, 2);
  const eleventhLord = houseLord(chart, 11);
  const secondLordHouse = planetHouse(chart, secondLord as Planet);
  const eleventhLordHouse = planetHouse(chart, eleventhLord as Planet);
  const planetsIn2 = planetsInHouse(chart, 2);
  const planetsIn11 = planetsInHouse(chart, 11);
  const fourthLord = houseLord(chart, 4);
  const marsHouse = planetHouse(chart, 'Mars');

  return {
    summary: `Tu estructura financiera se apoya en la casa 2 (ahorros y patrimonio estable) regida por ${p(secondLord)} en la ${ordinalEs(secondLordHouse)} casa, y se expande mediante la casa 11 (fuentes de ingresos y beneficios) regida por ${p(eleventhLord)} en la ${ordinalEs(eleventhLordHouse)} casa. ${
      planetsIn2.length > 0 ? `La estancia de ${planetsIn2.map(pp => p(pp)).join(', ')} en la casa 2 robustece la capacidad natural de ahorro y resguardo de capital.` : ''
    }`,
    wealthSources: `Las vías prioritarias de ganancia conectan con la naturaleza vocacional de ${p(eleventhLord)}. ${
      planetsIn11.length > 0 ? `Los planetas ${planetsIn11.map(pp => p(pp)).join(', ')} en la casa 11 multiplican los ingresos a través de proyectos colectivos y contactos valiosos.` : ''
    }`,
    wealthTiming: `Los picos de consolidación económica tienen lugar durante los ciclos Dasha de ${p(secondLord)}, ${p(eleventhLord)} o Júpiter, potenciados cuando este último transita por las casas del dinero.`,
    propertyIndication: `La compra de bienes raíces, tierras y patrimonio duradero viene auspiciada por el regente de la casa 4, ${p(fourthLord)}, y por la fortaleza de Marte en la ${ordinalEs(marsHouse)} casa.`,
  };
}

const HOUSE_BODY_ES: Record<number, string> = {
  1: 'cabeza, vitalidad general y constitución física',
  2: 'rostro, cuello, garganta, dientes y visión derecha',
  3: 'brazos, hombros, audición y vías respiratorias altas',
  4: 'pecho, corazón, pulmones y equilibrio emocional',
  5: 'estómago, hígado, digestión y sistema nervioso',
  6: 'intestinos, riñones e inmunidad general',
  7: 'zona lumbar y órganos del aparato reproductor',
  8: 'vitalidad profunda, regeneración celular y longevidad',
  9: 'caderas, muslos y circulación arterial',
  10: 'rodillas, articulaciones, huesos y piel',
  11: 'piernas, tobillos y audición izquierda',
  12: 'pies, sistema linfático, sueño y visión izquierda',
};

export function generateHealthReadingEs(chart: KundliChart): HealthReading {
  const sixthLord = houseLord(chart, 6);
  const sixthLordHouse = planetHouse(chart, sixthLord as Planet);
  const planetsIn6 = planetsInHouse(chart, 6);
  const planetsIn8 = planetsInHouse(chart, 8);

  const vulnerable: string[] = [];
  if (planetsIn6.length > 0) {
    planetsIn6.forEach(pp => { vulnerable.push(`${p(pp)} en casa 6 — atención orientada a ${HOUSE_BODY_ES[6]}`); });
  }
  if (planetsIn8.length > 0) {
    planetsIn8.forEach(pp => { vulnerable.push(`${p(pp)} en casa 8 — cuidado necesario en ${HOUSE_BODY_ES[8]}`); });
  }
  const ascLord = chart.houses[0].lord;
  const ascLordHouse = planetHouse(chart, ascLord as Planet);
  if (ascLordHouse === 6 || ascLordHouse === 8 || ascLordHouse === 12) {
    vulnerable.push(`El regente del Ascendente, ${p(ascLord)}, en la ${ordinalEs(ascLordHouse)} casa sugiere hábitos ordenados para mantener siempre alta la vitalidad`);
  }

  return {
    summary: `El regente de la casa 6, ${p(sixthLord)}, en la ${ordinalEs(sixthLordHouse)} casa indica que la salud física se mantiene mediante el equilibrio de las rutinas diarias, la moderación en los hábitos y una nutrición adaptada a tu constitución biológica natural.`,
    vulnerableAreas: vulnerable.length > 0 ? vulnerable.slice(0, 3).join('; ') : 'No se aprecian focos de vulnerabilidad severa — los cuidados preventivos habituales garantizan un vigor excelente.',
    healthPeriods: `Revisiones preventivas y orden en los descansos cobran especial sentido durante los ciclos de ${p(sixthLord)} o regentes de casas de esfuerzo.`,
    preventiveMeasures: 'El equilibrio entre reposo reparador, ejercicio suave, contacto con la naturaleza y serenidad anímica preserva la longevidade con plenitud.',
  };
}

export function generateSpiritualReadingEs(chart: KundliChart): SpiritualReading {
  const ninth = chart.houses[8];
  const ninthLord = ninth.lord;
  const ninthSign = ninth.rashiName;
  const ninthLordHouse = planetHouse(chart, ninthLord as Planet);
  const ketuHouse = planetHouse(chart, 'Ketu');

  return {
    summary: `El sendero espiritual y la búsqueda de sentido superior se iluminan a través de la casa 9 en ${s(ninthSign)}, guiada por ${p(ninthLord)} en la ${ordinalEs(ninthLordHouse)} casa. La posición de Ketu en la ${ordinalEs(ketuHouse)} casa potencia la intuición interior y la libertad respecto a apegos pasajeros.`,
    spiritualStrengths: 'Integridad ética, compasión espontánea, respeto por la sabiduría ancestral y una aguda sensibilidad intuitiva.',
    meditationStyle: 'Momentos de retiro consciente, contemplación en la naturaleza, meditación silenciosa y lecturas reflexivas aquietan y esclarecen la mente.',
    karmaTheme: 'El propósito principal de este ciclo de vida consiste en conjugar con sabiduría las tareas prácticas del mundo con una mirada compasiva y libre de espíritu.',
  };
}
