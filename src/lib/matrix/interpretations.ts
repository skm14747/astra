import type { Language } from '@/lib/settings/context';

export type PositionKey = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i';

export interface ArcanaInterpretation {
  positive: string;
  shadow: string;
  advice: string;
}

type InterpretationMap = Record<number, ArcanaInterpretation>;

const POSITION_LABELS: Record<Language, Record<PositionKey, string>> = {
  en: { a: 'Day (Body)', b: 'Month (Spirit)', c: 'Year (Mind)', d: 'Karmic Lesson', e: 'Soul Center', f: 'Father Line', g: 'Mother Line', h: 'Paternal Gift', i: 'Maternal Gift' },
  es: { a: 'Día (Cuerpo)', b: 'Mes (Espíritu)', c: 'Año (Mente)', d: 'Lección Kármica', e: 'Centro del Alma', f: 'Línea Paterna', g: 'Línea Materna', h: 'Don Paterno', i: 'Don Materno' },
  pt: { a: 'Dia (Corpo)', b: 'Mês (Espírito)', c: 'Ano (Mente)', d: 'Lição Cármica', e: 'Centro da Alma', f: 'Linha Paterna', g: 'Linha Materna', h: 'Dom Paterno', i: 'Dom Materno' },
  fr: { a: 'Jour (Corps)', b: 'Mois (Esprit)', c: 'Année (Mental)', d: 'Leçon Karmique', e: 'Centre de l\'Âme', f: 'Lignée Paternelle', g: 'Lignée Maternelle', h: 'Don Paternel', i: 'Don Maternel' },
  ja: { a: '日 (身体)', b: '月 (精神)', c: '年 (知性)', d: 'カルマの課題', e: '魂の中心', f: '父方の系譜', g: '母方の系譜', h: '父方の贈り物', i: '母方の贈り物' },
  hi: { a: 'दिन (शरीर)', b: 'माह (आत्मा)', c: 'वर्ष (मन)', d: 'कर्म पाठ', e: 'आत्मा केंद्र', f: 'पितृ वंश', g: 'मातृ वंश', h: 'पैतृक वरदान', i: 'मातृ वरदान' },
  ne: { a: 'दिन (शरीर)', b: 'महिना (आत्मा)', c: 'वर्ष (मन)', d: 'कर्म पाठ', e: 'आत्मा केन्द्र', f: 'पितृ वंश', g: 'मातृ वंश', h: 'पैतृक वरदान', i: 'मातृ वरदान' },
  ko: { a: '일 (신체)', b: '월 (정신)', c: '년 (지성)', d: '업보의 교훈', e: '영혼의 중심', f: '부계', g: '모계', h: '부계의 선물', i: '모계의 선물' },
};

export function getPositionLabel(position: PositionKey, language: Language): string {
  return POSITION_LABELS[language]?.[position] ?? POSITION_LABELS.en[position] ?? position.toUpperCase();
}

const EN_INTERPRETATIONS: InterpretationMap = {
  1: { positive: 'Natural leader with magnetic willpower. You manifest ideas into reality with ease.', shadow: 'Can become manipulative or scattered when unfocused.', advice: 'Channel your creative energy into one project at a time. Your skill is activation — use it wisely.' },
  2: { positive: 'Deep intuition and psychic sensitivity. You sense what others miss and guard sacred knowledge.', shadow: 'Secrecy becomes isolation; intuition becomes paranoia if ungrounded.', advice: 'Trust your inner voice but stay connected to others. Your wisdom grows through sharing, not hoarding.' },
  3: { positive: 'Abundant creativity and nurturing warmth. You attract beauty and bring ideas to fruition.', shadow: 'Over-giving leads to resentment; creativity blocked by self-doubt.', advice: 'Create without needing validation. Your abundance flows when you nurture yourself first.' },
  4: { positive: 'Strong foundation-builder with natural authority. You bring order and structure to chaos.', shadow: 'Rigidity and control issues; difficulty adapting to change.', advice: 'Lead through wisdom, not force. True authority comes from inner stability, not external control.' },
  5: { positive: 'Natural teacher and bridge between tradition and truth. You guide others to deeper meaning.', shadow: 'Dogmatic thinking; imposing beliefs on others.', advice: 'Honor tradition while staying open to new understanding. Your role is to guide, not to judge.' },
  6: { positive: 'Gifted in relationships and values-based choices. You harmonize opposing forces with love.', shadow: 'Indecision and people-pleasing; avoiding necessary confrontation.', advice: 'Choose from your heart, not from fear of loss. Every choice shapes your destiny.' },
  7: { positive: 'Unstoppable willpower and focused determination. You overcome obstacles through sheer persistence.', shadow: 'Aggression disguised as ambition; running over others to win.', advice: 'Victory is sweetest when achieved with integrity. Direct your drive toward meaningful goals.' },
  8: { positive: 'Strong sense of fairness and karmic awareness. You naturally balance scales and see truth clearly.', shadow: 'Harsh judgment of self and others; inability to forgive.', advice: 'Practice compassionate justice. Understanding karma means accepting that balance takes time.' },
  9: { positive: 'Profound wisdom gained through solitude and reflection. You light the way for seekers.', shadow: 'Withdrawal from life; intellectual superiority; loneliness.', advice: 'Share your lantern. Wisdom unused serves no one. Retreat to recharge, return to serve.' },
  10: { positive: 'Blessed by good fortune and natural timing. You sense when to act and when to wait.', shadow: 'Gambling with destiny; passivity waiting for luck.', advice: 'Fortune favors the prepared. Work with cycles — what rises will fall, what falls will rise again.' },
  11: { positive: 'Gentle courage and quiet endurance. You tame inner beasts and outer challenges with patience.', shadow: 'Suppressing emotions; passive aggression masking as patience.', advice: 'True strength is gentle. Face your fears with an open heart — your softness is your superpower.' },
  12: { positive: 'Unique perspective from willingly seeing life upside down. Sacrifice brings deep spiritual insight.', shadow: 'Martyrdom complex; stuck in limbo; avoiding decisions.', advice: 'Sometimes you must pause to gain clarity. Trust that surrender is not defeat — it is strategy.' },
  13: { positive: 'Powerful transformer who releases what no longer serves. Rebirth follows every ending you initiate.', shadow: 'Fear of change despite needing it; destroying instead of transforming.', advice: 'Let go gracefully. Death of the old self makes space for who you are becoming.' },
  14: { positive: 'Natural alchemist who blends opposites into harmony. You moderate extremes with grace.', shadow: 'Avoiding commitment; diluting passion with over-caution.', advice: 'Find the middle path between extremes. Your gift is integration — blend, don\'t suppress.' },
  15: { positive: 'Unflinching honesty about shadow desires. You channel raw energy into creative and material mastery.', shadow: 'Addiction, obsession, and bondage to pleasure.', advice: 'Face your shadows honestly. What you deny controls you; what you acknowledge becomes your power.' },
  16: { positive: 'Catalyst for necessary upheaval. You rebuild stronger structures after dismantling illusions.', shadow: 'Destructive tendencies; creating chaos unconsciously.', advice: 'Not every tower needs toppling. Choose which structures to challenge and which to preserve.' },
  17: { positive: 'Radiant hope and inspiration to others. You connect heaven and earth through your very presence.', shadow: 'Naive optimism; disconnection from practical reality.', advice: 'Keep your gaze on the stars but your feet on the ground. Your hope heals others — protect it.' },
  18: { positive: 'Rich inner life and powerful subconscious guidance. You navigate emotional depths with rare skill.', shadow: 'Anxiety, deception, and confusion; lost in illusions.', advice: 'Trust the moonlit path even when you cannot see clearly. Your intuition knows the way through darkness.' },
  19: { positive: 'Radiating joy, vitality, and success. You illuminate every room and inspire confidence in others.', shadow: 'Ego inflation; burning others with excessive intensity.', advice: 'Shine without blinding. Your warmth attracts — your humility sustains.' },
  20: { positive: 'Clarity about your life calling. You awaken others and inspire transformative renewal.', shadow: 'Self-righteousness; judging others\' life choices.', advice: 'Answer your own calling before summoning others. Authentic living is your greatest sermon.' },
  21: { positive: 'Wholeness and completion achieved through integration. You embody the full cycle of experience.', shadow: 'Premature satisfaction; refusing to begin new cycles.', advice: 'Celebrate completion but stay open to the next journey. The world card is a portal, not a wall.' },
  22: { positive: 'Unlimited potential and fearless beginnings. You leap where others hesitate, trusting the universe.', shadow: 'Recklessness; chronic restarts; inability to commit.', advice: 'Leap with joy but pack wisdom for the journey. Your freedom is a gift — use it intentionally.' },
};

const ES_INTERPRETATIONS: InterpretationMap = {
  1: { positive: 'Líder natural con voluntad magnética. Manifiestas ideas en realidad con facilidad.', shadow: 'Puede volverse manipulador o disperso sin enfoque.', advice: 'Canaliza tu energía creativa en un proyecto a la vez. Tu don es la activación — úsalo sabiamente.' },
  2: { positive: 'Intuición profunda y sensibilidad psíquica. Percibes lo que otros no ven y guardas conocimiento sagrado.', shadow: 'El secretismo se convierte en aislamiento; la intuición en paranoia si no se arraiga.', advice: 'Confía en tu voz interior pero mantente conectado con otros. Tu sabiduría crece al compartirla.' },
  3: { positive: 'Creatividad abundante y calidez nutritiva. Atraes belleza y llevas las ideas a su plenitud.', shadow: 'Dar en exceso lleva al resentimiento; creatividad bloqueada por la duda.', advice: 'Crea sin necesitar validación. Tu abundancia fluye cuando te nutres a ti mismo primero.' },
  4: { positive: 'Fuerte constructor de bases con autoridad natural. Traes orden y estructura al caos.', shadow: 'Rigidez y problemas de control; dificultad para adaptarse al cambio.', advice: 'Lidera con sabiduría, no con fuerza. La verdadera autoridad viene de la estabilidad interior.' },
  5: { positive: 'Maestro natural y puente entre la tradición y la verdad. Guías a otros hacia un significado más profundo.', shadow: 'Pensamiento dogmático; imponer creencias a otros.', advice: 'Honra la tradición manteniéndote abierto a nuevos entendimientos. Tu rol es guiar, no juzgar.' },
  6: { positive: 'Dotado en relaciones y decisiones basadas en valores. Armonizas fuerzas opuestas con amor.', shadow: 'Indecisión y complacencia; evitar confrontaciones necesarias.', advice: 'Elige desde tu corazón, no desde el miedo a la pérdida. Cada elección moldea tu destino.' },
  7: { positive: 'Voluntad imparable y determinación enfocada. Superas obstáculos con pura persistencia.', shadow: 'Agresión disfrazada de ambición; pasar por encima de otros para ganar.', advice: 'La victoria es más dulce cuando se logra con integridad. Dirige tu impulso hacia metas significativas.' },
  8: { positive: 'Fuerte sentido de justicia y conciencia kármica. Equilibras naturalmente y ves la verdad con claridad.', shadow: 'Juicio severo hacia ti mismo y otros; incapacidad de perdonar.', advice: 'Practica la justicia compasiva. Entender el karma significa aceptar que el equilibrio toma tiempo.' },
  9: { positive: 'Sabiduría profunda ganada a través de la soledad y reflexión. Iluminas el camino para los buscadores.', shadow: 'Retirada de la vida; superioridad intelectual; soledad.', advice: 'Comparte tu linterna. La sabiduría no usada no sirve a nadie. Retírate para recargar, regresa para servir.' },
  10: { positive: 'Bendecido por la buena fortuna y el timing natural. Sientes cuándo actuar y cuándo esperar.', shadow: 'Apostar con el destino; pasividad esperando la suerte.', advice: 'La fortuna favorece a los preparados. Trabaja con los ciclos — lo que sube bajará, lo que baja volverá a subir.' },
  11: { positive: 'Coraje gentil y resistencia tranquila. Domas bestias internas y desafíos externos con paciencia.', shadow: 'Suprimir emociones; agresión pasiva disfrazada de paciencia.', advice: 'La verdadera fuerza es gentil. Enfrenta tus miedos con el corazón abierto — tu suavidad es tu superpoder.' },
  12: { positive: 'Perspectiva única al ver la vida al revés. El sacrificio trae profunda visión espiritual.', shadow: 'Complejo de mártir; estancado en el limbo; evitar decisiones.', advice: 'A veces debes pausar para ganar claridad. Confía en que rendirse no es derrota — es estrategia.' },
  13: { positive: 'Poderoso transformador que libera lo que ya no sirve. El renacimiento sigue a cada final que inicias.', shadow: 'Miedo al cambio a pesar de necesitarlo; destruir en vez de transformar.', advice: 'Suelta con gracia. La muerte del viejo yo hace espacio para quien estás convirtiéndote.' },
  14: { positive: 'Alquimista natural que mezcla opuestos en armonía. Moderas extremos con gracia.', shadow: 'Evitar el compromiso; diluir la pasión con exceso de cautela.', advice: 'Encuentra el camino medio entre los extremos. Tu don es la integración — mezcla, no suprimas.' },
  15: { positive: 'Honestidad sin pestañear sobre los deseos oscuros. Canalizas energía cruda en maestría creativa y material.', shadow: 'Adicción, obsesión y esclavitud al placer.', advice: 'Enfrenta tus sombras honestamente. Lo que niegas te controla; lo que reconoces se convierte en tu poder.' },
  16: { positive: 'Catalizador del cambio necesario. Reconstruyes estructuras más fuertes tras desmantelar ilusiones.', shadow: 'Tendencias destructivas; crear caos inconscientemente.', advice: 'No toda torre necesita ser derribada. Elige qué estructuras desafiar y cuáles preservar.' },
  17: { positive: 'Esperanza radiante e inspiración para otros. Conectas cielo y tierra con tu sola presencia.', shadow: 'Optimismo ingenuo; desconexión de la realidad práctica.', advice: 'Mantén la mirada en las estrellas pero los pies en la tierra. Tu esperanza sana a otros — protégela.' },
  18: { positive: 'Rica vida interior y poderosa guía subconsciente. Navegas profundidades emocionales con rara habilidad.', shadow: 'Ansiedad, engaño y confusión; perdido en ilusiones.', advice: 'Confía en el camino iluminado por la luna aun cuando no puedas ver claro. Tu intuición conoce el camino.' },
  19: { positive: 'Irradias alegría, vitalidad y éxito. Iluminas cada lugar e inspiras confianza en otros.', shadow: 'Inflación del ego; quemar a otros con intensidad excesiva.', advice: 'Brilla sin cegar. Tu calidez atrae — tu humildad sostiene.' },
  20: { positive: 'Claridad sobre tu llamado de vida. Despiertas a otros e inspiras renovación transformadora.', shadow: 'Santurrón; juzgar las elecciones de vida de otros.', advice: 'Responde a tu propio llamado antes de convocar a otros. Vivir auténticamente es tu mejor sermón.' },
  21: { positive: 'Plenitud y completud lograda a través de la integración. Encarnas el ciclo completo de experiencia.', shadow: 'Satisfacción prematura; negarse a comenzar nuevos ciclos.', advice: 'Celebra la completud pero permanece abierto al próximo viaje. La carta del mundo es un portal, no un muro.' },
  22: { positive: 'Potencial ilimitado y comienzos sin miedo. Saltas donde otros dudan, confiando en el universo.', shadow: 'Imprudencia; reinicios crónicos; incapacidad de comprometerse.', advice: 'Salta con alegría pero lleva sabiduría para el viaje. Tu libertad es un don — úsala intencionalmente.' },
};

const PT_INTERPRETATIONS: InterpretationMap = {
  1: { positive: 'Líder nato com vontade magnética. Você manifesta ideias em realidade com facilidade.', shadow: 'Pode se tornar manipulador ou disperso sem foco.', advice: 'Canalize sua energia criativa em um projeto por vez. Seu dom é a ativação — use-o com sabedoria.' },
  2: { positive: 'Intuição profunda e sensibilidade psíquica. Você percebe o que outros não veem.', shadow: 'O segredo vira isolamento; a intuição vira paranoia se não for fundamentada.', advice: 'Confie na sua voz interior, mas mantenha-se conectado. Sua sabedoria cresce ao compartilhar.' },
  3: { positive: 'Criatividade abundante e calor acolhedor. Você atrai beleza e frutifica ideias.', shadow: 'Doar demais leva ao ressentimento; criatividade bloqueada pela dúvida.', advice: 'Crie sem precisar de validação. Sua abundância flui quando você se nutre primeiro.' },
  4: { positive: 'Forte construtor de bases com autoridade natural. Você traz ordem ao caos.', shadow: 'Rigidez e questões de controle; dificuldade de adaptação.', advice: 'Lidere pela sabedoria, não pela força. Verdadeira autoridade vem da estabilidade interior.' },
  5: { positive: 'Professor nato e ponte entre tradição e verdade. Você guia outros a significados mais profundos.', shadow: 'Pensamento dogmático; impor crenças aos outros.', advice: 'Honre a tradição permanecendo aberto a novos entendimentos. Seu papel é guiar, não julgar.' },
  6: { positive: 'Talentoso em relacionamentos e escolhas baseadas em valores. Harmoniza forças opostas com amor.', shadow: 'Indecisão e desejo de agradar; evitar confrontos necessários.', advice: 'Escolha do coração, não do medo da perda. Cada escolha molda seu destino.' },
  7: { positive: 'Vontade imparável e determinação focada. Você supera obstáculos com pura persistência.', shadow: 'Agressão disfarçada de ambição; passar por cima dos outros para vencer.', advice: 'A vitória é mais doce com integridade. Direcione seu impulso para metas significativas.' },
  8: { positive: 'Forte senso de justiça e consciência cármica. Você equilibra naturalmente e vê a verdade com clareza.', shadow: 'Julgamento severo de si e dos outros; incapacidade de perdoar.', advice: 'Pratique a justiça compassiva. Entender o carma é aceitar que o equilíbrio leva tempo.' },
  9: { positive: 'Sabedoria profunda adquirida pela solidão e reflexão. Você ilumina o caminho dos buscadores.', shadow: 'Retirada da vida; superioridade intelectual; solidão.', advice: 'Compartilhe sua lanterna. Sabedoria não usada não serve a ninguém.' },
  10: { positive: 'Abençoado pela boa sorte e timing natural. Você sente quando agir e quando esperar.', shadow: 'Apostar com o destino; passividade esperando pela sorte.', advice: 'A fortuna favorece os preparados. Trabalhe com os ciclos — o que sobe desce, o que desce sobe.' },
  11: { positive: 'Coragem gentil e resistência tranquila. Você doma feras internas com paciência.', shadow: 'Suprimir emoções; agressão passiva mascarada de paciência.', advice: 'A verdadeira força é gentil. Enfrente seus medos com o coração aberto.' },
  12: { positive: 'Perspectiva única ao ver a vida de cabeça para baixo. O sacrifício traz profunda visão espiritual.', shadow: 'Complexo de mártir; preso no limbo; evitar decisões.', advice: 'Às vezes é preciso pausar para ganhar clareza. Confie que se render não é derrota — é estratégia.' },
  13: { positive: 'Transformador poderoso que libera o que não serve mais. O renascimento segue cada fim que você inicia.', shadow: 'Medo da mudança apesar de precisar dela; destruir em vez de transformar.', advice: 'Solte com graça. A morte do velho eu abre espaço para quem você está se tornando.' },
  14: { positive: 'Alquimista natural que mescla opostos em harmonia. Você modera extremos com graça.', shadow: 'Evitar compromisso; diluir paixão com excesso de cautela.', advice: 'Encontre o caminho do meio. Seu dom é a integração — mescle, não suprima.' },
  15: { positive: 'Honestidade inabalável sobre desejos sombrios. Você canaliza energia bruta em maestria criativa.', shadow: 'Vício, obsessão e escravidão ao prazer.', advice: 'Enfrente suas sombras honestamente. O que você nega o controla; o que reconhece se torna seu poder.' },
  16: { positive: 'Catalisador de mudanças necessárias. Você reconstrói estruturas mais fortes após derrubar ilusões.', shadow: 'Tendências destrutivas; criar caos inconscientemente.', advice: 'Nem toda torre precisa ser derrubada. Escolha quais estruturas desafiar e quais preservar.' },
  17: { positive: 'Esperança radiante e inspiração para outros. Você conecta céu e terra com sua presença.', shadow: 'Otimismo ingênuo; desconexão da realidade prática.', advice: 'Mantenha o olhar nas estrelas e os pés na terra. Sua esperança cura outros — proteja-a.' },
  18: { positive: 'Rica vida interior e poderosa guia subconsciente. Você navega profundezas emocionais com rara habilidade.', shadow: 'Ansiedade, engano e confusão; perdido em ilusões.', advice: 'Confie no caminho iluminado pela lua. Sua intuição conhece o caminho na escuridão.' },
  19: { positive: 'Irradia alegria, vitalidade e sucesso. Você ilumina cada ambiente e inspira confiança.', shadow: 'Inflação do ego; queimar outros com intensidade excessiva.', advice: 'Brilhe sem cegar. Seu calor atrai — sua humildade sustenta.' },
  20: { positive: 'Clareza sobre seu chamado de vida. Você desperta outros e inspira renovação transformadora.', shadow: 'Moralismo; julgar as escolhas de vida alheias.', advice: 'Responda ao seu próprio chamado antes de convocar outros. Viver autenticamente é seu melhor sermão.' },
  21: { positive: 'Plenitude e completude alcançadas pela integração. Você incorpora o ciclo completo de experiência.', shadow: 'Satisfação prematura; recusar-se a iniciar novos ciclos.', advice: 'Celebre a completude, mas permaneça aberto à próxima jornada.' },
  22: { positive: 'Potencial ilimitado e começos destemidos. Você salta onde outros hesitam, confiando no universo.', shadow: 'Imprudência; recomeços crônicos; incapacidade de se comprometer.', advice: 'Salte com alegria, mas leve sabedoria para a jornada. Sua liberdade é um dom — use-a intencionalmente.' },
};

const INTERPRETATIONS: Record<string, InterpretationMap> = {
  en: EN_INTERPRETATIONS,
  es: ES_INTERPRETATIONS,
  pt: PT_INTERPRETATIONS,
};

export function getInterpretation(arcanaNumber: number, language: Language): ArcanaInterpretation {
  const table = INTERPRETATIONS[language] ?? INTERPRETATIONS.en;
  return table[arcanaNumber] ?? EN_INTERPRETATIONS[arcanaNumber] ?? { positive: '', shadow: '', advice: '' };
}
