/**
 * Spanish interpretation templates for Vedic astrology content.
 * Uses Latin American Spanish with adapted Vedic terminology.
 */
import type { Dignity } from '../types';

type SignText = [positive: string, challenges: string, nature: string];

const SUN_ES: Record<string, SignText> = {
  Aries:    ['Líder nato con presencia imponente, valiente y pionero. Fuerte vitalidad y espíritu independiente.', 'Puede ser agresivo, impaciente o dominante sin control.', 'El Sol está exaltado aquí, dando máxima fuerza al ego, ambición y autoridad.'],
  Taurus:   ['Determinado, práctico y firme en sus propósitos. Disfruta los placeres materiales y tiene sensibilidad artística.', 'Puede ser terco, posesivo o excesivamente apegado a la seguridad.', 'Sol en el signo de Venus da amor al lujo y la belleza con un ego confiable y centrado.'],
  Gemini:   ['Intelectualmente versátil, excelente comunicador, curioso y adaptable. Aprendiz rápido.', 'Puede dispersar energía, falta de enfoque o superficialidad en compromisos.', 'Sol en el signo de Mercurio canaliza la identidad a través del intelecto, comunicación y conexiones sociales.'],
  Cancer:   ['Emocionalmente perceptivo, protector de la familia. Profunda intuición y fuerte apego a las raíces.', 'Puede ser temperamental, excesivamente sensible o dependiente de seguridad emocional.', 'Sol en el signo de la Luna da una naturaleza cariñosa, patriótica y hogareña.'],
  Leo:      ['Seguro, magnánimo, autoridad natural. Expresión creativa y disposición regia y generosa.', 'El ego puede inflarse a arrogancia, terquedad o necesidad constante de reconocimiento.', 'Sol en su propio signo es muy fuerte — identidad clara, fuerza de voluntad robusta y liderazgo natural.'],
  Virgo:    ['Analítico, orientado al servicio, consciente de la salud. Atención precisa a los detalles.', 'Puede ser excesivamente crítico, ansioso o fijado en imperfecciones.', 'Sol en el signo terrestre de Mercurio da un ego práctico y modesto que encuentra propósito en el trabajo útil.'],
  Libra:    ['Diplomático, justo, socialmente elegante. Busca armonía en las relaciones.', 'Puede comprometer la identidad por otros, ser indeciso o evitar conflictos necesarios.', 'Sol está debilitado aquí — el ego lucha con la asertividad, pero gana refinamiento y habilidades de asociación.'],
  Scorpio:  ['Intensamente enfocado, profundamente perceptivo, resiliente. Fuerte voluntad y capacidad de transformación.', 'Puede ser secretivo, controlador, desconfiado o vengativo cuando herido.', 'Sol en el signo acuático de Marte da un ego penetrante e investigativo con interés en el conocimiento oculto.'],
  Sagittarius: ['Optimista, filosófico, amante de la libertad. Fuerte brújula moral y amor al conocimiento superior.', 'Puede ser predicador, excesivamente confiado, sin tacto o inquieto.', 'Sol en el signo de fuego de Júpiter da un ego noble y dhármico movido por la búsqueda de la verdad, viajes y sabiduría.'],
  Capricorn: ['Disciplinado, ambicioso, responsable. Ascenso firme hacia la autoridad con paciencia y resistencia.', 'Puede ser frío, excesivamente serio, obsesionado con el estatus o emocionalmente distante.', 'Sol en el signo terrestre de Saturno da un ego devoto y autoritario que gana respeto por el esfuerzo persistente.'],
  Aquarius:  ['Humanitario, innovador, pensador independiente. Visionario con enfoques no convencionales.', 'Puede ser emocionalmente desapegado, rebelde sin causa o excéntrico.', 'Sol en el signo aéreo de Saturno da un ego orientado al bienestar colectivo, reforma e independencia intelectual.'],
  Pisces:   ['Compasivo, intuitivo, espiritualmente inclinado. Naturaleza artística y profundamente empática.', 'Puede faltar límites, ser escapista o sacrificar identidad propia por otros.', 'Sol en el signo acuático de Júpiter da un ego altruista y espiritualmente orientado con dones artísticos y de sanación.'],
};

const MOON_ES: Record<string, SignText> = {
  Aries:    ['Emocionalmente audaz y espontáneo, rápido para actuar sobre sentimientos.', 'Impulsividad emocional, temperamento rápido, dificultad con la paciencia.', 'Luna en el signo de Marte da una naturaleza emocional ardiente y orientada a la acción.'],
  Taurus:   ['Emocionalmente estable, paciente, sensual. Profunda apreciación por la belleza y seguridad material.', 'Terquedad emocional, posesividad, resistencia al cambio.', 'Luna está exaltada aquí — naturaleza emocional en su máxima fuerza. Paz interior y contentamiento son naturales.'],
  Gemini:   ['Emocionalmente adaptable, comunicativo, intelectualmente curioso.', 'Inquietud emocional, sentimientos dispersos, dificultad con compromiso emocional profundo.', 'Luna en el signo de Mercurio da una mente que intelectualiza las emociones.'],
  Cancer:   ['Profundamente protector, intuitivo, cuidador. Fuerte apego al hogar y seguridad emocional.', 'Excesivamente sensible, pegajoso, temperamental.', 'Luna en su propio signo es muy fuerte — inteligencia emocional, instintos maternales y sensibilidad psíquica elevados.'],
  Leo:      ['Emocionalmente generoso, cálido, orgulloso. Necesita sentirse especial y apreciado.', 'Drama emocional, necesidad de atención, orgullo herido cuando no es reconocido.', 'Luna en el signo del Sol da una naturaleza emocional digna y cálida que anhela expresión creativa.'],
  Virgo:    ['Emocionalmente analítico, orientado al servicio, consciente de la salud.', 'Ansiedad emocional, autocrítica, preocupación por imperfecciones.', 'Luna en el signo terrestre de Mercurio da una naturaleza emocional nerviosa y orientada al detalle.'],
  Libra:    ['Emocionalmente equilibrado, orientado a relaciones, estéticamente refinado.', 'Indecisión emocional, dependencia de otros para el estado de ánimo.', 'Luna en el signo de Venus da una naturaleza emocional graciosa y sociable.'],
  Scorpio:  ['Emocionalmente intenso, profundamente perceptivo, transformador.', 'Turbulencia emocional, celos, tendencia a guardar rencores.', 'Luna está debilitada aquí — emociones son profundas y turbulentas. Gran fuerza psicológica viene de enfrentar la oscuridad interior.'],
  Sagittarius: ['Emocionalmente optimista, aventurero, filosóficamente inclinado.', 'Inquietud emocional, evitación de emociones pesadas.', 'Luna en el signo de fuego de Júpiter da una naturaleza emocional entusiasta y amante de la libertad.'],
  Capricorn: ['Emocionalmente reservado, disciplinado, maduro más allá de su edad.', 'Frialdad emocional, dificultad para expresar vulnerabilidad.', 'Luna en el signo de Saturno da una naturaleza emocional seria y estructurada.'],
  Aquarius:  ['Emocionalmente independiente, humanitario, intelectualmente orientado.', 'Desapego emocional, dificultad con la intimidad.', 'Luna en el signo aéreo de Saturno da una naturaleza emocional progresista y orientada al grupo.'],
  Pisces:   ['Emocionalmente compasivo, intuitivo, espiritualmente sensible.', 'Absorción del dolor ajeno, escapismo, dificultad con límites.', 'Luna en el signo acuático de Júpiter da una naturaleza emocional profundamente compasiva y mística.'],
};

export const ALL_PLANETS_ES: Record<string, Record<string, SignText>> = {
  Sun: SUN_ES, Moon: MOON_ES,
};

export const DIGNITY_TEXT_ES: Record<Dignity, { label: string; effect: string; modifier: string }> = {
  exalted: { label: 'Exaltado (Uchcha)', effect: 'en su pico absoluto de poder. Otorga sus mejores y más elevados resultados en plena medida', modifier: 'Esta es la más alta dignidad — el planeta entrega sus mejores significaciones con facilidad, confianza y abundancia.' },
  own: { label: 'Domicilio (Swakshetra)', effect: 'cómodo y fuerte en su propio territorio. Protege y sostiene firmemente sus significaciones', modifier: 'Como una persona en su propia casa — segura, relajada y en total control. Resultados son confiables.' },
  moolatrikona: { label: 'Moolatrikona', effect: 'en su oficina o lugar de trabajo — altamente funcional, productivo y autoritario', modifier: 'Moolatrikona es el "lugar de trabajo" del planeta — un poco menos cómodo que casa, pero máximamente productivo.' },
  friendly: { label: 'Signo Amigo (Mitra Rashi)', effect: 'en casa de un amigo — acogido, apoyado y capaz de expresar su naturaleza con facilidad', modifier: 'Buenos resultados vienen naturalmente con algo de apoyo del señor del signo.' },
  neutral: { label: 'Signo Neutro (Sama Rashi)', effect: 'en territorio neutro — resultados son mixtos, viables y moldeados por otros factores del mapa', modifier: 'Ni ayudado ni perjudicado por el signo — otros aspectos y conjunciones determinan el resultado final.' },
  enemy: { label: 'Signo Enemigo (Shatru Rashi)', effect: 'en territorio hostil — sus significaciones enfrentan resistencia y requieren esfuerzo extra', modifier: 'Como trabajar en un ambiente sin apoyo. Resultados llegan, pero con retrasos o compromisos.' },
  debilitated: { label: 'Debilitado (Neecha)', effect: 'en su punto más débil. Sus significaciones luchan y pueden producir dificultades', modifier: 'El planeta está en fuerza mínima, pero Neecha Bhanga puede transformar debilidad en fuerza única.' },
};

export const RETRO_TEXT_ES = {
  label: 'Retrógrado (Vakri)',
  effect: 'Su energía se vuelve hacia dentro, intensificando la autorreflexión y frecuentemente produciendo resultados por canales no convencionales.',
  modifier: 'Los planetas retrógrados son considerados fuertes en la astrología védica (Vakri = bono de Cheshta Bala).',
};

export const COMBUST_TEXT_ES = {
  label: 'Combusto (Asta)',
  effect: 'Oculto en el resplandor del Sol, sus significaciones son eclipsadas por el ego o figuras de autoridad.',
  modifier: 'Las cualidades del planeta se fusionan con el Sol — su expresión independiente se reduce, pero gana proximidad al poder.',
};

export const ASPECT_RECEIVED_ES: Record<string, string> = {
  Sun: 'El aspecto del Sol trae autoridad, visibilidad y presión del ego a estos asuntos.',
  Moon: 'El aspecto de la Luna trae involucramiento emocional, atención pública y condiciones fluctuantes.',
  Mars: 'El aspecto de Marte trae energía, coraje y potencial conflicto a estos asuntos.',
  Mercury: 'El aspecto de Mercurio trae análisis intelectual, comunicación y pensamiento comercial.',
  Jupiter: 'El aspecto de Júpiter trae sabiduría, expansión, protección y fortuna — considerado altamente benéfico.',
  Venus: 'El aspecto de Venus trae belleza, comodidad, refinamiento artístico y dinámicas de relación.',
  Saturn: 'El aspecto de Saturno trae disciplina, retraso, restricción y resistencia duradera.',
  Rahu: 'El aspecto de Rahu trae influencias no convencionales, elementos extranjeros y deseo amplificado.',
  Ketu: 'El aspecto de Ketu trae desapego espiritual, influencia de vidas pasadas y sensación de incompletitud.',
};

export const HOUSE_AREA_MAP_ES = [
  'yo, cuerpo y vitalidad', 'riqueza, habla y familia',
  'hermanos, coraje y comunicación', 'hogar, madre y paz interior',
  'hijos, inteligencia y creatividad', 'salud, enemigos y servicio',
  'matrimonio, asociaciones y negocios', 'longevidad, transformación y ocultismo',
  'fortuna, dharma y educación superior', 'carrera, estatus y autoridad',
  'ingresos, ganancias y redes sociales', 'gastos, espiritualidad y liberación',
];

const ES_ORDINALS: Record<number, string> = {
  1: '1ª', 2: '2ª', 3: '3ª', 4: '4ª', 5: '5ª', 6: '6ª',
  7: '7ª', 8: '8ª', 9: '9ª', 10: '10ª', 11: '11ª', 12: '12ª',
};

export function ordinalEs(n: number): string { return ES_ORDINALS[n] || `${n}ª`; }
export function houseAreaEs(h: number): string { return HOUSE_AREA_MAP_ES[h - 1] || ''; }

export const PLANET_NAME_ES: Record<string, string> = {
  Sun: 'Sol', Moon: 'Luna', Mars: 'Marte', Mercury: 'Mercurio',
  Jupiter: 'Júpiter', Venus: 'Venus', Saturn: 'Saturno', Rahu: 'Rahu', Ketu: 'Ketu',
};

export const SIGN_NAME_ES: Record<string, string> = {
  Aries: 'Aries', Taurus: 'Tauro', Gemini: 'Géminis', Cancer: 'Cáncer',
  Leo: 'Leo', Virgo: 'Virgo', Libra: 'Libra', Scorpio: 'Escorpio',
  Sagittarius: 'Sagitario', Capricorn: 'Capricornio', Aquarius: 'Acuario', Pisces: 'Piscis',
};

export function planetNameEs(p: string): string { return PLANET_NAME_ES[p] || p; }
