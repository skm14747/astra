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

const MARS_ES: Record<string, SignText> = {
  Aries:    ['Altamente energético, valiente, competitivo. Excelente iniciativa y vitalidad física.', 'Agresividad, impaciencia, imprudencia, propensión a accidentes.', 'Marte en su propio signo es muy fuerte — energía bruta, coraje y destreza física en su pico.'],
  Taurus:   ['Energía persistente, acción práctica, fuerte resistencia. Determinación en la adquisición material.', 'Terquedad en conflictos, agresividad posesiva, lento para perdonar.', 'Marte en el signo terrestre de Venus canaliza la agresividad hacia adquisición material, propiedades y esfuerzo sostenido.'],
  Gemini:   ['Ingenio rápido en debates, versátil en acción, comunicador hábil.', 'Argumentativo, energía dispersa, agresividad nerviosa.', 'Marte en el signo de Mercurio da habla afilada, habilidad de escritura y combatividad mental.'],
  Cancer:   ['Protector de la familia, acción motivada emocionalmente, fuerte energía doméstica.', 'Pasivo-agresividad, volatilidad emocional, conflictos domésticos.', 'Marte está debilitado aquí — la energía se vuelve emocionalmente reactiva. La protección familiar es feroz pero la ira puede desplazarse.'],
  Leo:      ['Acción autoritaria, coraje orgulloso, liderazgo en competencia.', 'Agresividad movida por el ego, comportamiento dominante.', 'Marte en el signo del Sol da coraje audaz y dignificado con autoridad natural en situaciones competitivas.'],
  Virgo:    ['Acción precisa y metódica. Habilidad en trabajo técnico, cirugía y operaciones detalladas.', 'Energía nerviosa, agresividad crítica.', 'Marte en el signo terrestre de Mercurio da energía meticulosa — bueno para ingeniería, medicina y artesanía.'],
  Libra:    ['Acción diplomática, enfoque estratégico al conflicto.', 'Pasividad en conflictos, dificultad para afirmar necesidades.', 'Marte en el signo de Venus canaliza energía hacia asociaciones, negociaciones y emprendimientos estéticos.'],
  Scorpio:  ['Intensamente poderoso, estratégico, profundamente resiliente.', 'Vengativo, obsesivo, destructivo cuando provocado.', 'Marte en su propio signo (Escorpio) da las más profundas reservas de fuerza de voluntad y pensamiento estratégico.'],
  Sagittarius: ['Energía aventurera, acción justa, amor a la libertad física y viajes.', 'Entusiasmo imprudente, agresividad predicadora.', 'Marte en el signo de fuego de Júpiter da búsqueda energética de verdad, ética, aventura y aprendizaje superior.'],
  Capricorn: ['Energía disciplinada, acción calculada, resistencia tremenda.', 'Ambición implacable, agresividad fría.', 'Marte está exaltado aquí — energía máximamente organizada, paciente y eficaz. El guerrero se convierte en general.'],
  Aquarius:  ['Acción progresista, motivación humanitaria, métodos no convencionales.', 'Rebelde sin plan, estallidos de energía erráticos.', 'Marte en el signo aéreo de Saturno dirige energía hacia causas sociales, tecnología y reforma.'],
  Pisces:   ['Acción compasiva, energía espiritual, impulso creativo.', 'Energía difusa, falta de asertividad, tendencias escapistas.', 'Marte en el signo acuático de Júpiter dirige energía hacia búsquedas espirituales, imaginación y sanación.'],
};

const MERCURY_ES: Record<string, SignText> = {
  Aries:    ['Pensamiento rápido, intelecto afilado, comunicación decisiva.', 'Conclusiones apresuradas, habla agresiva, impaciencia con mentes más lentas.', 'Mercurio en el signo de Marte da una mente rápida, directa y competitiva — ágil en debates y decisivo en análisis.'],
  Taurus:   ['Intelecto práctico, pensamiento metódico, buena perspicacia financiera.', 'Lento para adaptar ideas, terquedad mental.', 'Mercurio en el signo de Venus da una mente práctica y sensorial — bueno para finanzas, arte y aprendizaje práctico.'],
  Gemini:   ['Comunicador brillante, intelecto versátil, ingenio excepcional. Múltiples talentos.', 'Inquietud mental, superficialidad, dificultad para completar lo que comienza.', 'Mercurio en su propio signo es muy fuerte — el intelecto está en el pico de nitidez y poder comunicativo.'],
  Cancer:   ['Pensamiento intuitivo, inteligencia emocional, memoria retentiva.', 'Razonamiento emocionalmente sesgado, dificultad con la objetividad.', 'Mercurio en el signo de la Luna da una mente coloreada por emociones — pensamiento intuitivo y orientado a la memoria.'],
  Leo:      ['Expresión confiada, habla autoritaria, intelecto creativo.', 'Obstinado, intelectualmente arrogante.', 'Mercurio en el signo del Sol da comunicación audaz y creativa — bueno para discursos de liderazgo y enseñanza.'],
  Virgo:    ['Excepcionalmente analítico, preciso, metódico. Maestro en detalles y solución práctica de problemas.', 'Análisis excesivo, crítica excesiva, ansiedad por imperfección.', 'Mercurio está exaltado aquí — el intelecto alcanza precisión, discriminación y poder analítico máximos.'],
  Libra:    ['Comunicación diplomática, juicio equilibrado, intelecto estético.', 'Pensamiento indeciso, ver demasiados lados, evitar posiciones fuertes.', 'Mercurio en el signo aéreo de Venus da un intelecto armonioso y justo — bueno para derecho, diplomacia y artes.'],
  Scorpio:  ['Mente penetrante, habilidad de investigación, percepción psicológica.', 'Pensamiento suspicaz, comunicación secreta.', 'Mercurio en el signo acuático de Marte da un intelecto profundo e investigativo — bueno para investigación y psicología.'],
  Sagittarius: ['Pensamiento filosófico, visión amplia, comunicación entusiasta.', 'Exageración, negligencia de detalles.', 'Mercurio en el signo de fuego de Júpiter da una mente amplia y optimista — bueno para enseñanza y comunicación intercultural.'],
  Capricorn: ['Pensamiento estructurado, inteligencia práctica, perspicacia en negocios.', 'Pensamiento pesimista, rigidez mental.', 'Mercurio en el signo de Saturno da una mente disciplinada y organizada — bueno para gestión y aprendizaje estructurado.'],
  Aquarius:  ['Pensamiento innovador, ideas originales, mente científica.', 'Ideas excéntricas, terquedad sobre visiones no convencionales.', 'Mercurio en el signo aéreo de Saturno da una mente futurista e inventiva — bueno para tecnología y ciencia.'],
  Pisces:   ['Pensamiento imaginativo, expresión poética, comprensión intuitiva.', 'Lógica difusa, dificultad con detalles concretos.', 'Mercurio está debilitado aquí — la mente racional es coloreada por la imaginación. El genio está en los dominios creativos y espirituales.'],
};

const JUPITER_ES: Record<string, SignText> = {
  Aries:    ['Sabiduría audaz, ética pionera, maestro natural.', 'Creencias dogmáticas, exceso de confianza en posiciones morales.', 'Júpiter en el signo de fuego de Marte da sabiduría dinámica y orientada a la acción — el gurú que lidera con el ejemplo.'],
  Taurus:   ['Sabiduría fundamentada, prosperidad material, naturaleza generosa.', 'Apego a comodidades materiales, complacencia espiritual.', 'Júpiter en el signo terrestre de Venus da prosperidad, patronato artístico y amor por la buena comida y el confort.'],
  Gemini:   ['Intelectualmente expansivo, conocimiento versátil, excelente maestro y escritor.', 'Sabiduría dispersa, filosofía superficial.', 'Júpiter en el signo de Mercurio da amplitud de conocimiento, habilidades de comunicación y búsqueda intelectual diversificada.'],
  Cancer:   ['Profundamente compasivo, emocionalmente sabio, maestro acogedor.', 'Sentimentalismo nublando el juicio, sobreprotección.', 'Júpiter está exaltado aquí — sabiduría en su nivel más alto, nutrida por compasión profunda e intuición.'],
  Leo:      ['Sabiduría regia, liderazgo generoso, maestro inspirador.', 'Orgullo espiritual, necesidad de reconocimiento en la enseñanza.', 'Júpiter en el signo del Sol da sabiduría grandiosa y dignificada — el rey-filósofo que guía con el ejemplo.'],
  Virgo:    ['Sabiduría práctica, ética orientada al servicio.', 'Crítica excesiva de creencias, perder el bosque por los árboles.', 'Júpiter en el signo terrestre de Mercurio da un enfoque detallado y de servicio a la sabiduría.'],
  Libra:    ['Sabiduría justa, ética diplomática, apreciación por belleza y armonía.', 'Relativismo moral, dificultad para tomar posiciones éticas firmes.', 'Júpiter en el signo aéreo de Venus da sabiduría expresada a través de asociación, justicia y armonía social.'],
  Scorpio:  ['Sabiduría profunda, percepción transformadora, comprensión espiritual profunda.', 'Intensidad dogmática, usar conocimiento para controlar.', 'Júpiter en el signo acuático de Marte da sabiduría penetrante — interés en tantra, psicología y ciencias ocultas.'],
  Sagittarius: ['Altamente optimista, profundamente filosófico, gurú natural.', 'Expansión excesiva, fe ciega.', 'Júpiter en su propio signo es muy fuerte — sabiduría, fe, fortuna y aprendizaje superior florecen naturalmente.'],
  Capricorn: ['Filosofía práctica, ética disciplinada, sabiduría conquistada por la dificultad.', 'Visión del mundo pesimista, bendiciones retrasadas.', 'Júpiter está debilitado aquí — la sabiduría viene por la dificultad. La paciencia trae comprensión profunda eventualmente.'],
  Aquarius:  ['Sabiduría humanitaria, ética progresista, enfoque innovador de la espiritualidad.', 'Desapego de la fe personal, espiritualidad intelectualizada en exceso.', 'Júpiter en el signo aéreo de Saturno da sabiduría universal orientada a la reforma — bueno para justicia social y bienestar colectivo.'],
  Pisces:   ['Profundamente espiritual, compasivo, sabiduría intuitiva. Místico y sanador natural.', 'Escapismo espiritual, ingenuidad.', 'Júpiter en su propio signo (Piscis) da la más alta sabiduría espiritual — compasión, intuición y devoción fluyen sin esfuerzo.'],
};

const VENUS_ES: Record<string, SignText> = {
  Aries:    ['Amor apasionado, romance atrevido, expresión directa de afecto.', 'Impulsividad en el amor, pasiones pasajeras, conflictos en relaciones.', 'Venus en el signo de Marte da amor apasionado y directo — la atracción es inmediata y la búsqueda es audaz.'],
  Taurus:   ['Profundamente sensual, leal en el amor, apreciación por belleza y lujo.', 'Posesividad en el amor, tendencias materialistas.', 'Venus en su propio signo es muy fuerte — amor, belleza, lujo y placeres sensuales plenamente disfrutados.'],
  Gemini:   ['Encantador, ingenioso, socialmente versátil en el amor.', 'Inconstancia en el amor, atracciones superficiales.', 'Venus en el signo de Mercurio da un estilo de amor ligero y comunicativo — atracción por palabras y humor.'],
  Cancer:   ['Amor acogedor, devoción emocional, felicidad doméstica.', 'Apego excesivo en relaciones, manipulación emocional.', 'Venus en el signo de la Luna da una naturaleza amorosa profundamente cuidadosa y orientada al hogar.'],
  Leo:      ['Romance grandioso, amor generoso, afecto dramático.', 'Orgullo en el amor, celos, necesidad de admiración.', 'Venus en el signo del Sol da una naturaleza amorosa regia y generosa — romance teatral y cálido.'],
  Virgo:    ['Amor devoto y práctico. Muestra afecto a través del servicio y atención a las necesidades de la pareja.', 'Crítica a la pareja, dificultad para expresar afecto espontáneamente.', 'Venus está debilitado aquí — el amor se expresa por servicio práctico. El afecto crece lentamente pero es profundamente leal.'],
  Libra:    ['Amor armonioso, fuerte impulso de asociación, sentido estético refinado.', 'Dependencia excesiva de relaciones, identidad perdida en la asociación.', 'Venus en su propio signo (Libra) es muy fuerte — amor, belleza y asociación expresados con gracia y equilibrio.'],
  Scorpio:  ['Profundamente apasionado, magnéticamente atractivo, amor transformador.', 'Celos, apego obsesivo, luchas de poder en relaciones.', 'Venus en el signo acuático de Marte da una naturaleza amorosa intensa y magnética.'],
  Sagittarius: ['Amor aventurero, conexión filosófica, libertad en relaciones.', 'Problemas de compromiso, inquietud en el amor.', 'Venus en el signo de fuego de Júpiter da una naturaleza romántica expansiva y amante de la libertad.'],
  Capricorn: ['Amor maduro, asociación leal, romance práctico.', 'Frialdad emocional en el amor, relaciones orientadas por estatus.', 'Venus en el signo de Saturno da una naturaleza amorosa seria y duradera — el romance comienza tarde pero se profundiza con el tiempo.'],
  Aquarius:  ['Amor no convencional, romance basado en amistad, valores progresistas.', 'Desapego emocional, dificultad con la intimidad.', 'Venus en el signo aéreo de Saturno da una naturaleza amorosa moderna e independiente.'],
  Pisces:   ['Profundamente romántico, amor espiritualmente conectado, devoción altruista.', 'Expectativas irrealistas, martirio en el amor.', 'Venus está exaltado aquí — el amor alcanza su más alta expresión: incondicional, espiritual y profundamente compasivo.'],
};

const SATURN_ES: Record<string, SignText> = {
  Aries:    ['Acción disciplinada, iniciativa estructurada, coraje conquistado.', 'Frustración con progreso lento, ira por restricción.', 'Saturno en el signo de Marte crea tensión entre paciencia y urgencia — las lecciones vienen al aprender a actuar con disciplina.'],
  Taurus:   ['Acumulación paciente, disciplina financiera, habilidades prácticas duraderas.', 'Inseguridad material, miedo a la pobreza.', 'Saturno en el signo terrestre de Venus da crecimiento material lento pero firme — seguridad financiera por esfuerzo persistente.'],
  Gemini:   ['Pensamiento estructurado, comunicación disciplinada, habilidad seria de escritura.', 'Bloqueos de comunicación, dificultades de aprendizaje en la juventud.', 'Saturno en el signo de Mercurio da una mente cuidadosa y metódica — bueno para investigación y estudio serio.'],
  Cancer:   ['Madurez emocional, vida familiar responsable, deber hacia la madre.', 'Supresión emocional, infancia difícil, felicidad doméstica retrasada.', 'Saturno en el signo de la Luna da restricción emocional — la vida temprana puede ser difícil, pero gran profundidad emocional se desarrolla.'],
  Leo:      ['Autoridad conquistada, liderazgo disciplinado, enfoque humilde al poder.', 'Frustración del ego, reconocimiento retrasado.', 'Saturno en el signo del Sol crea tensión entre ambición y humildad — la autoridad llega tarde pero es bien merecida.'],
  Virgo:    ['Ética de trabajo meticulosa, enfoque sistemático, experiencia por la práctica.', 'Ansiedad, preocupaciones crónicas de salud.', 'Saturno en el signo terrestre de Mercurio da disciplina excepcional en trabajo detallado — maestría por repetición y paciencia.'],
  Libra:    ['Juicio justo, autoridad equilibrada, relaciones justas.', 'Matrimonio retrasado, obligaciones de relación.', 'Saturno está exaltado aquí — disciplina, justicia y autoridad equilibrada en su pico. Juez y administrador natural.'],
  Scorpio:  ['Resistencia profunda, resiliencia psicológica, disciplina transformadora.', 'Miedo a la pérdida, problemas de control.', 'Saturno en el signo acuático de Marte da tremenda resiliencia a través del sufrimiento — transformación por paciencia.'],
  Sagittarius: ['Filosofía disciplinada, enseñanza estructurada, búsqueda paciente de sabiduría.', 'Rigidez dogmática, viaje restringido.', 'Saturno en el signo de fuego de Júpiter da sabiduría conquistada por la dificultad.'],
  Capricorn: ['Disciplina máxima, autoridad natural, logro ambicioso.', 'Adicción al trabajo, frialdad, soledad en la cima.', 'Saturno en su propio signo es muy fuerte — autoridad en la carrera y poder organizacional plenamente expresados.'],
  Aquarius:  ['Disciplina humanitaria, método científico, servicio al colectivo.', 'Aislamiento emocional, rigidez excéntrica.', 'Saturno en su propio signo (Acuario) da servicio disciplinado a causas colectivas — el reformador y arquitecto social.'],
  Pisces:   ['Disciplina espiritual, servicio compasivo, aceptación del sufrimiento.', 'Ansiedad espiritual, miedo a la disolución.', 'Saturno en el signo acuático de Júpiter da disciplina espiritual por el sufrimiento — el monje o sanador que sirve por sacrificio personal.'],
};

const RAHU_ES: Record<string, SignText> = {
  Aries:    ['Impulso ambicioso, búsqueda intrépida de identidad, pionero en campos no convencionales.', 'Ambición temeraria, confusión de identidad, propensión a accidentes.', 'Rahu en el signo de Marte amplifica la ambición agresiva — tremendo impulso para ser el primero por medios no convencionales.'],
  Taurus:   ['Magnetismo material, acumulación de lujo, fuentes no convencionales de riqueza.', 'Materialismo obsesivo, consumo tóxico, trastornos del habla.', 'Rahu es fuerte aquí — deseo mundano por comodidad, riqueza y belleza amplificado. Puede traer ganancias materiales súbitas.'],
  Gemini:   ['Comunicación brillante, intelecto no convencional, maestría en tecnología y medios.', 'Habla engañosa, sobrecarga de información, trastornos nerviosos.', 'Rahu en el signo de Mercurio amplifica la comunicación — medios, tecnología e idiomas extranjeros prosperan.'],
  Cancer:   ['Vida doméstica no convencional, interés en culturas extranjeras.', 'Manipulación emocional, vida familiar perturbada.', 'Rahu en el signo de la Luna perturba la paz emocional pero trae experiencias domésticas fascinantes y no convencionales.'],
  Leo:      ['Presencia pública poderosa, autoridad no convencional, carisma magnético.', 'Ego inflado, engaño en el poder.', 'Rahu en el signo del Sol amplifica el deseo de reconocimiento — puede traer fama súbita o prominencia pública.'],
  Virgo:    ['Maestría analítica, sanación no convencional, innovación técnica.', 'Ansiedad de salud, análisis obsesivo.', 'Rahu en el signo terrestre de Mercurio da capacidad analítica obsesiva — bueno para tecnología y medicina alternativa.'],
  Libra:    ['Encanto magnético, asociaciones no convencionales, habilidad diplomática.', 'Ilusión en relaciones, asociaciones engañosas.', 'Rahu en el signo de Venus amplifica el deseo de relación y belleza — asociaciones extranjeras son probables.'],
  Scorpio:  ['Maestría oculta, capacidad intensa de investigación, ambición transformadora.', 'Comportamiento obsesivo, peligros ocultos.', 'Rahu en el signo acuático de Marte da deseo intenso por conocimiento oculto — prácticas tántricas e investigación.'],
  Sagittarius: ['Sabiduría no convencional, enseñanza extranjera, filosofía innovadora.', 'Engaño en contextos religiosos/académicos, problemas con gurús.', 'Rahu en el signo de Júpiter amplifica el deseo de significado — viaje extranjero y educación no convencional.'],
  Capricorn: ['Logro ambicioso, carrera no convencional, ascenso súbito.', 'Ambición poco ética, engaños en la carrera.', 'Rahu en el signo de Saturno amplifica la ambición en la carrera — puede traer ascenso profesional súbito y dramático.'],
  Aquarius:  ['Reforma innovadora, maestría tecnológica, ambición humanitaria.', 'Extremismo excéntrico, manipulación de grupos.', 'Rahu en el signo aéreo de Saturno amplifica el deseo de innovación — excelente para tecnología y reforma social.'],
  Pisces:   ['Magnetismo espiritual, sanación no convencional, experiencias psíquicas.', 'Ilusión espiritual, escapismo por sustancias.', 'Rahu en el signo acuático de Júpiter amplifica el deseo espiritual — experiencias psíquicas y tradiciones espirituales extranjeras.'],
};

const KETU_ES: Record<string, SignText> = {
  Aries:    ['Coraje espiritual, desapego de batallas del ego, energía guerrera de vidas pasadas.', 'Confusión de identidad, acción sin dirección, desconexión de la vitalidad física.', 'Ketu en el signo de Marte trae maestría de coraje de vidas pasadas — el alma ya luchó y ahora busca combate espiritual.'],
  Taurus:   ['Desapego de la seguridad material, simplicidad espiritual, abundancia de vidas pasadas.', 'Inestabilidad financiera, desconexión de comodidades físicas.', 'Ketu en el signo de Venus significa que el alma ya experimentó riqueza material — el desapego de posesiones es natural.'],
  Gemini:   ['Conocimiento intuitivo, maestría de comunicación de vidas pasadas, desapego del exceso de pensamiento.', 'Dificultades de comunicación, pensamiento disperso.', 'Ketu en el signo de Mercurio significa maestría intelectual de vidas pasadas — el aprendizaje formal parece innecesario.'],
  Cancer:   ['Desapego espiritual de dependencias emocionales, karma materno de vidas pasadas.', 'Adormecimiento emocional, dificultad para conectar con la madre.', 'Ketu en el signo de la Luna significa que el alma ya experimentó vínculos emocionales profundos — ahora busca desapego.'],
  Leo:      ['Humildad, desapego de fama y autoridad, liderazgo espiritual.', 'Baja autoestima, desconexión de la expresión creativa.', 'Ketu en el signo del Sol significa realeza de vidas pasadas — el alma ahora practica humildad y poder espiritual.'],
  Virgo:    ['Sanación intuitiva, desapego del perfeccionismo, maestría de servicio de vidas pasadas.', 'Negligencia con la salud, dificultad con detalles prácticos.', 'Ketu en el signo terrestre de Mercurio significa maestría de servicio y análisis de vidas pasadas.'],
  Libra:    ['Desapego de relaciones, independencia espiritual, karma de asociación de vidas pasadas.', 'Dificultad en el matrimonio, aislamiento social.', 'Ketu en el signo de Venus significa maestría de relaciones de vidas pasadas — el alma busca identidad más allá de las asociaciones.'],
  Scorpio:  ['Percepción espiritual profunda, maestría oculta, desapego de juegos de poder.', 'Problemas psicológicos ocultos, dificultad para confiar.', 'Ketu es fuerte aquí — conocimiento místico profundo y poder espiritual transformador vienen naturalmente.'],
  Sagittarius: ['Sabiduría espiritual, desapego del dogma, energía de gurú de vidas pasadas.', 'Desconexión de la educación superior, crisis de fe.', 'Ketu en el signo de Júpiter significa maestría filosófica de vidas pasadas — el alma busca experiencia directa.'],
  Capricorn: ['Desapego de ambición en la carrera, autoridad espiritual, logro de vidas pasadas.', 'Inestabilidad en la carrera, dificultad con la estructura.', 'Ketu en el signo de Saturno significa maestría de carrera de vidas pasadas — la ambición mundana es reemplazada por autoridad espiritual.'],
  Aquarius:  ['Innovación espiritual, desapego de grupos, trabajo humanitario de vidas pasadas.', 'Aislamiento social, desconexión de causas.', 'Ketu en el signo aéreo de Saturno significa servicio colectivo de vidas pasadas — el alma busca liberación espiritual individual.'],
  Pisces:   ['Logro espiritual profundo, sabiduría intuitiva, orientación natural al moksha.', 'Escapismo, disolución de habilidades prácticas.', 'Ketu en el signo acuático de Júpiter da el más alto logro espiritual — el alma gravita naturalmente hacia la liberación y la trascendencia.'],
};

export const ALL_PLANETS_ES: Record<string, Record<string, SignText>> = {
  Sun: SUN_ES, Moon: MOON_ES, Mars: MARS_ES, Mercury: MERCURY_ES,
  Jupiter: JUPITER_ES, Venus: VENUS_ES, Saturn: SATURN_ES, Rahu: RAHU_ES, Ketu: KETU_ES,
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
