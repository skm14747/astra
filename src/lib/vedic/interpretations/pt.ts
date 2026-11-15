/**
 * Portuguese interpretation templates for Vedic astrology content.
 * Uses Brazilian Portuguese with adapted Vedic terminology.
 */
import type { Dignity } from '../types';

type SignText = [positive: string, challenges: string, nature: string];

const SUN_PT: Record<string, SignText> = {
  Aries:    ['Líder nato com presença imponente, corajoso e pioneiro. Forte vitalidade e espírito independente.', 'Pode ser agressivo, impaciente ou dominador quando descontrolado.', 'O Sol está exaltado aqui, dando máxima força ao ego, ambição e autoridade.'],
  Taurus:   ['Determinado, prático e firme em seus propósitos. Aprecia confortos materiais e tem sensibilidade artística.', 'Pode ser teimoso, possessivo ou excessivamente apegado à segurança.', 'Sol no signo de Vênus dá amor ao luxo e beleza com um ego confiável e centrado.'],
  Gemini:   ['Intelectualmente versátil, excelente comunicador, curioso e adaptável. Aprendiz rápido.', 'Pode dispersar energia, faltar foco ou ser superficial em compromissos.', 'Sol no signo de Mercúrio canaliza a identidade pelo intelecto, comunicação e conexões sociais.'],
  Cancer:   ['Emocionalmente perceptivo, protetor da família. Profunda intuição e forte apego às raízes.', 'Pode ser temperamental, excessivamente sensível ou dependente de segurança emocional.', 'Sol no signo da Lua dá uma natureza carinhosa, patriótica e caseira com fortes instintos parentais.'],
  Leo:      ['Confiante, magnânimo, autoridade natural. Expressão criativa e disposição régia e generosa.', 'O ego pode inflar para arrogância, teimosia ou necessidade constante de reconhecimento.', 'Sol em seu próprio signo é muito forte — identidade clara, força de vontade robusta e liderança natural.'],
  Virgo:    ['Analítico, orientado ao serviço, consciente da saúde. Atenção precisa aos detalhes.', 'Pode ser excessivamente crítico, ansioso ou fixado em imperfeições.', 'Sol no signo terrestre de Mercúrio dá um ego prático e modesto que encontra propósito no trabalho útil.'],
  Libra:    ['Diplomático, justo, socialmente gracioso. Busca harmonia nos relacionamentos.', 'Pode comprometer identidade pelos outros, ser indeciso ou evitar conflitos necessários.', 'Sol está debilitado aqui — o ego luta com assertividade, mas ganha refinamento e habilidades de parceria.'],
  Scorpio:  ['Intensamente focado, profundamente perceptivo, resiliente. Forte vontade e capacidade de transformação.', 'Pode ser secretivo, controlador, desconfiado ou vingativo quando ferido.', 'Sol no signo aquático de Marte dá um ego penetrante e investigativo com interesse em conhecimento oculto.'],
  Sagittarius: ['Otimista, filosófico, amante da liberdade. Forte bússola moral e amor ao conhecimento.', 'Pode ser pregador, excessivamente confiante, sem tato ou inquieto.', 'Sol no signo de fogo de Júpiter dá um ego nobre e dhármico movido pela busca da verdade, viagem e sabedoria.'],
  Capricorn: ['Disciplinado, ambicioso, responsável. Ascensão firme rumo à autoridade com paciência.', 'Pode ser frio, excessivamente sério, obcecado por status ou emocionalmente distante.', 'Sol no signo terrestre de Saturno dá um ego devotado e autoritário que conquista respeito pelo esforço persistente.'],
  Aquarius:  ['Humanitário, inovador, pensador independente. Visionário com abordagens não convencionais.', 'Pode ser emocionalmente desapegado, rebelde sem causa ou excêntrico.', 'Sol no signo aéreo de Saturno dá um ego orientado ao bem-estar coletivo, reforma e independência intelectual.'],
  Pisces:   ['Compassivo, intuitivo, espiritualmente inclinado. Natureza artística e profundamente empática.', 'Pode faltar limites, ser escapista ou sacrificar identidade pelos outros.', 'Sol no signo aquático de Júpiter dá um ego altruísta e espiritualmente orientado com dons artísticos e de cura.'],
};

const MOON_PT: Record<string, SignText> = {
  Aries:    ['Emocionalmente ousado e espontâneo, rápido para agir sobre sentimentos.', 'Impulsividade emocional, temperamento rápido, dificuldade com paciência.', 'Lua no signo de Marte dá uma natureza emocional ardente e orientada à ação — sentimentos são expressos imediata e diretamente.'],
  Taurus:   ['Emocionalmente estável, paciente, sensual. Profunda apreciação por beleza e segurança material.', 'Teimosia emocional, possessividade, resistência à mudança.', 'Lua está exaltada aqui — natureza emocional em sua máxima força. Paz interior, sensibilidade artística e contentamento são naturais.'],
  Gemini:   ['Emocionalmente adaptável, comunicativo, intelectualmente curioso.', 'Inquietação emocional, sentimentos dispersos, dificuldade com compromisso emocional profundo.', 'Lua no signo de Mercúrio dá uma mente que intelectualiza emoções — sentimentos são analisados em vez de simplesmente sentidos.'],
  Cancer:   ['Profundamente protetor, intuitivo, cuidador. Forte apego ao lar e segurança emocional.', 'Excessivamente sensível, apegado, temperamental, propenso a sobrecarga emocional.', 'Lua em seu próprio signo é muito forte — inteligência emocional, instintos maternais e sensibilidade psíquica são elevados.'],
  Leo:      ['Emocionalmente generoso, afetuoso, orgulhoso. Precisa se sentir especial e apreciado.', 'Drama emocional, necessidade de atenção, orgulho ferido quando não reconhecido.', 'Lua no signo do Sol dá uma natureza emocional digna e calorosa que anseia por expressão criativa.'],
  Virgo:    ['Emocionalmente analítico, orientado ao serviço, consciente da saúde.', 'Ansiedade emocional, autocrítica, preocupação com imperfeições.', 'Lua no signo terrestre de Mercúrio dá uma natureza emocional nervosa e detalhista.'],
  Libra:    ['Emocionalmente equilibrado, orientado a relacionamentos, esteticamente refinado.', 'Indecisão emocional, dependência dos outros para o humor.', 'Lua no signo de Vênus dá uma natureza emocional graciosa e sociável.'],
  Scorpio:  ['Emocionalmente intenso, profundamente perceptivo, transformador.', 'Turbulência emocional, ciúme, tendência a guardar rancores.', 'Lua está debilitada aqui — emoções são profundas e turbulentas. Grande força psicológica vem de enfrentar a escuridão interior.'],
  Sagittarius: ['Emocionalmente otimista, aventureiro, filosoficamente inclinado.', 'Inquietação emocional, evitação de emoções pesadas.', 'Lua no signo de fogo de Júpiter dá uma natureza emocional entusiasmada e amante da liberdade.'],
  Capricorn: ['Emocionalmente reservado, disciplinado, maduro além da idade.', 'Frieza emocional, dificuldade em expressar vulnerabilidade.', 'Lua no signo de Saturno dá uma natureza emocional séria e estruturada.'],
  Aquarius:  ['Emocionalmente independente, humanitário, intelectualmente orientado.', 'Desapego emocional, dificuldade com intimidade.', 'Lua no signo aéreo de Saturno dá uma natureza emocional progressista e orientada ao grupo.'],
  Pisces:   ['Emocionalmente compassivo, intuitivo, espiritualmente sensível.', 'Absorção da dor alheia, escapismo, dificuldade com limites.', 'Lua no signo aquático de Júpiter dá uma natureza emocional profundamente compassiva e mística.'],
};

const MARS_PT: Record<string, SignText> = {
  Aries:    ['Altamente energético, corajoso, competitivo. Excelente iniciativa e vitalidade física.', 'Agressividade, impaciência, imprudência, propensão a acidentes.', 'Marte em seu próprio signo é muito forte — energia bruta, coragem e habilidade física estão no pico.'],
  Taurus:   ['Energia persistente, ação prática, forte resistência. Determinação na aquisição material.', 'Teimosia em conflitos, agressividade possessiva, lento para perdoar.', 'Marte no signo terrestre de Vênus canaliza agressividade para aquisição material, propriedades e esforço sustentado.'],
  Gemini:   ['Raciocínio rápido em debates, versátil na ação, comunicador hábil.', 'Argumentativo, energia dispersa, agressividade nervosa.', 'Marte no signo de Mercúrio dá fala afiada, habilidade de escrita e combatividade mental.'],
  Cancer:   ['Protetor da família, ação motivada emocionalmente, forte energia doméstica.', 'Passivo-agressividade, volatilidade emocional, conflitos domésticos.', 'Marte está debilitado aqui — a energia se torna emocionalmente reativa. Proteção familiar é feroz, mas a raiva pode ser deslocada.'],
  Leo:      ['Ação autoritária, coragem orgulhosa, liderança em competição.', 'Agressividade movida pelo ego, comportamento dominante.', 'Marte no signo do Sol dá coragem audaciosa e dignificada com autoridade natural em situações competitivas.'],
  Virgo:    ['Ação precisa e metódica. Habilidade em trabalho técnico, cirurgia e operações detalhadas.', 'Energia nervosa, agressividade crítica.', 'Marte no signo terrestre de Mercúrio dá energia meticulosa — bom para engenharia, medicina e artesanato.'],
  Libra:    ['Ação diplomática, abordagem estratégica ao conflito.', 'Passividade em conflitos, dificuldade em afirmar necessidades.', 'Marte no signo de Vênus canaliza energia para parcerias, negociações e empreendimentos estéticos.'],
  Scorpio:  ['Intensamente poderoso, estratégico, profundamente resiliente.', 'Vingativo, obsessivo, destrutivo quando provocado.', 'Marte em seu próprio signo (Escorpião) dá as mais profundas reservas de força de vontade e pensamento estratégico.'],
  Sagittarius: ['Energia aventureira, ação justa, amor à liberdade física e viagem.', 'Entusiasmo imprudente, agressividade pregadora.', 'Marte no signo de fogo de Júpiter dá busca energética por verdade, ética, aventura e aprendizado superior.'],
  Capricorn: ['Energia disciplinada, ação calculada, resistência tremenda.', 'Ambição implacável, agressividade fria.', 'Marte está exaltado aqui — energia maximamente organizada, paciente e eficaz. O guerreiro se torna general.'],
  Aquarius:  ['Ação progressista, motivação humanitária, métodos não convencionais.', 'Rebelde sem plano, surtos de energia erráticos.', 'Marte no signo aéreo de Saturno direciona energia para causas sociais, tecnologia e reforma.'],
  Pisces:   ['Ação compassiva, energia espiritual, impulso criativo.', 'Energia difusa, falta de assertividade, tendências escapistas.', 'Marte no signo aquático de Júpiter direciona energia para buscas espirituais, imaginação e cura.'],
};

const MERCURY_PT: Record<string, SignText> = {
  Aries:    ['Pensamento rápido, intelecto afiado, comunicação decisiva.', 'Conclusões apressadas, fala agressiva, impaciência com mentes mais lentas.', 'Mercúrio no signo de Marte dá uma mente rápida, direta e competitiva — ágil em debates e decisivo em análises.'],
  Taurus:   ['Intelecto prático, pensamento metódico, boa perspicácia financeira.', 'Lento para adaptar ideias, teimosia mental.', 'Mercúrio no signo de Vênus dá uma mente prática e sensorial — bom para finanças, arte e aprendizado prático.'],
  Gemini:   ['Comunicador brilhante, intelecto versátil, perspicácia excepcional. Múltiplos talentos.', 'Inquietação mental, superficialidade, dificuldade em completar o que começa.', 'Mercúrio em seu próprio signo é muito forte — o intelecto está no pico de nitidez e poder comunicativo.'],
  Cancer:   ['Pensamento intuitivo, inteligência emocional, memória retentiva.', 'Raciocínio emocionalmente tendencioso, dificuldade com objetividade.', 'Mercúrio no signo da Lua dá uma mente colorida por emoções — pensamento intuitivo e orientado à memória.'],
  Leo:      ['Expressão confiante, fala autoritária, intelecto criativo.', 'Opinioso, intelectualmente arrogante.', 'Mercúrio no signo do Sol dá comunicação audaciosa e criativa — bom para discursos de liderança e ensino.'],
  Virgo:    ['Excepcionalmente analítico, preciso, metódico. Mestre em detalhes e solução prática de problemas.', 'Análise excessiva, crítica demais, ansiedade com imperfeição.', 'Mercúrio está exaltado aqui — o intelecto atinge precisão, discriminação e poder analítico máximos.'],
  Libra:    ['Comunicação diplomática, julgamento equilibrado, intelecto estético.', 'Pensamento indeciso, ver muitos lados, evitar posições fortes.', 'Mercúrio no signo aéreo de Vênus dá um intelecto harmonioso e justo — bom para direito, diplomacia e artes.'],
  Scorpio:  ['Mente penetrante, habilidade de pesquisa, percepção psicológica.', 'Pensamento suspeitoso, comunicação secreta.', 'Mercúrio no signo aquático de Marte dá um intelecto profundo e investigativo — bom para pesquisa e psicologia.'],
  Sagittarius: ['Pensamento filosófico, visão ampla, comunicação entusiástica.', 'Exagero, negligência de detalhes.', 'Mercúrio no signo de fogo de Júpiter dá uma mente ampla e otimista — bom para ensino, publicação e comunicação intercultural.'],
  Capricorn: ['Pensamento estruturado, inteligência prática, perspicácia nos negócios.', 'Pensamento pessimista, rigidez mental.', 'Mercúrio no signo de Saturno dá uma mente disciplinada e organizada — bom para gestão e aprendizado estruturado.'],
  Aquarius:  ['Pensamento inovador, ideias originais, mente científica.', 'Ideias excêntricas, teimosia sobre visões não convencionais.', 'Mercúrio no signo aéreo de Saturno dá uma mente futurista e inventiva — bom para tecnologia e ciência.'],
  Pisces:   ['Pensamento imaginativo, expressão poética, compreensão intuitiva.', 'Lógica difusa, dificuldade com detalhes concretos.', 'Mercúrio está debilitado aqui — a mente racional é colorida pela imaginação. O gênio está nos domínios criativos e espirituais.'],
};

const JUPITER_PT: Record<string, SignText> = {
  Aries:    ['Sabedoria audaciosa, ética pioneira, professor natural.', 'Crenças dogmáticas, excesso de confiança em posições morais.', 'Júpiter no signo de fogo de Marte dá sabedoria dinâmica e orientada à ação — o guru que lidera pelo exemplo.'],
  Taurus:   ['Sabedoria fundamentada, prosperidade material, natureza generosa.', 'Apego a confortos materiais, complacência espiritual.', 'Júpiter no signo terrestre de Vênus dá prosperidade, patronato artístico e amor por boa comida e conforto.'],
  Gemini:   ['Intelectualmente expansivo, conhecimento versátil, excelente professor e escritor.', 'Sabedoria dispersa, filosofia superficial.', 'Júpiter no signo de Mercúrio dá amplitude de conhecimento, habilidades de comunicação e busca intelectual diversificada.'],
  Cancer:   ['Profundamente compassivo, emocionalmente sábio, professor acolhedor.', 'Sentimentalismo turvando o julgamento, superproteção.', 'Júpiter está exaltado aqui — sabedoria no mais alto nível, nutrida por compaixão profunda e intuição.'],
  Leo:      ['Sabedoria régia, liderança generosa, professor inspirador.', 'Orgulho espiritual, necessidade de reconhecimento no ensino.', 'Júpiter no signo do Sol dá sabedoria grandiosa e dignificada — o rei-filósofo que guia pelo exemplo.'],
  Virgo:    ['Sabedoria prática, ética orientada ao serviço.', 'Crítica excessiva de crenças, perder a floresta pelas árvores.', 'Júpiter no signo terrestre de Mercúrio dá abordagem detalhada e de serviço à sabedoria.'],
  Libra:    ['Sabedoria justa, ética diplomática, apreciação por beleza e harmonia.', 'Relativismo moral, dificuldade em tomar posições éticas firmes.', 'Júpiter no signo aéreo de Vênus dá sabedoria expressa através de parceria, justiça e harmonia social.'],
  Scorpio:  ['Sabedoria profunda, percepção transformadora, compreensão espiritual profunda.', 'Intensidade dogmática, usar conhecimento para controlar.', 'Júpiter no signo aquático de Marte dá sabedoria penetrante — interesse em tantra, psicologia e ciências ocultas.'],
  Sagittarius: ['Altamente otimista, profundamente filosófico, guru natural.', 'Expansão excessiva, fé cega.', 'Júpiter em seu próprio signo é muito forte — sabedoria, fé, fortuna e aprendizado superior florescem naturalmente.'],
  Capricorn: ['Filosofia prática, ética disciplinada, sabedoria conquistada pela dificuldade.', 'Visão de mundo pessimista, bênçãos atrasadas.', 'Júpiter está debilitado aqui — sabedoria vem pela dificuldade. Paciência traz compreensão profunda eventualmente.'],
  Aquarius:  ['Sabedoria humanitária, ética progressista, abordagem inovadora da espiritualidade.', 'Desapego da fé pessoal, espiritualidade intelectualizada demais.', 'Júpiter no signo aéreo de Saturno dá sabedoria universal orientada à reforma — bom para justiça social e bem-estar coletivo.'],
  Pisces:   ['Profundamente espiritual, compassivo, sabedoria intuitiva. Místico e curador natural.', 'Escapismo espiritual, ingenuidade.', 'Júpiter em seu próprio signo (Peixes) dá a mais alta sabedoria espiritual — compaixão, intuição e devoção fluem sem esforço.'],
};

const VENUS_PT: Record<string, SignText> = {
  Aries:    ['Amor apaixonado, romance ousado, expressão direta de afeto.', 'Impulsividade no amor, paixões passageiras, conflitos em relacionamentos.', 'Vênus no signo de Marte dá amor apaixonado e direto — a atração é imediata e a busca é ousada.'],
  Taurus:   ['Profundamente sensual, leal no amor, apreciação por beleza e luxo.', 'Possessividade no amor, tendências materialistas.', 'Vênus em seu próprio signo é muito forte — amor, beleza, luxo e prazeres sensuais são plenamente desfrutados.'],
  Gemini:   ['Charmoso, espirituoso, socialmente versátil no amor.', 'Inconstância no amor, atrações superficiais.', 'Vênus no signo de Mercúrio dá um estilo de amor leve e comunicativo — atração por palavras e humor.'],
  Cancer:   ['Amor acolhedor, devoção emocional, felicidade doméstica.', 'Apego excessivo nos relacionamentos, manipulação emocional.', 'Vênus no signo da Lua dá uma natureza amorosa profundamente cuidadosa e orientada ao lar.'],
  Leo:      ['Romance grandioso, amor generoso, afeto dramático.', 'Orgulho no amor, ciúme, necessidade de admiração.', 'Vênus no signo do Sol dá uma natureza amorosa régia e generosa — romance teatral e caloroso.'],
  Virgo:    ['Amor devotado e prático. Mostra afeto através de serviço e atenção às necessidades do parceiro.', 'Crítica ao parceiro, dificuldade em expressar afeto espontaneamente.', 'Vênus está debilitado aqui — o amor é expresso por serviço prático. O afeto cresce lentamente mas é profundamente leal.'],
  Libra:    ['Amor harmonioso, forte impulso de parceria, senso estético refinado.', 'Dependência excessiva de relacionamentos, identidade perdida na parceria.', 'Vênus em seu próprio signo (Libra) é muito forte — amor, beleza e parceria expressos com graça e equilíbrio.'],
  Scorpio:  ['Profundamente apaixonado, magneticamente atraente, amor transformador.', 'Ciúme, apego obsessivo, lutas de poder nos relacionamentos.', 'Vênus no signo aquático de Marte dá uma natureza amorosa intensa e magnética.'],
  Sagittarius: ['Amor aventureiro, conexão filosófica, liberdade nos relacionamentos.', 'Problemas de compromisso, inquietação no amor.', 'Vênus no signo de fogo de Júpiter dá uma natureza romântica expansiva e amante da liberdade.'],
  Capricorn: ['Amor maduro, parceria leal, romance prático.', 'Frieza emocional no amor, relacionamentos orientados por status.', 'Vênus no signo de Saturno dá uma natureza amorosa séria e duradoura — romance começa tarde mas aprofunda com o tempo.'],
  Aquarius:  ['Amor não convencional, romance baseado em amizade, valores progressistas.', 'Desapego emocional, dificuldade com intimidade.', 'Vênus no signo aéreo de Saturno dá uma natureza amorosa moderna e independente.'],
  Pisces:   ['Profundamente romântico, amor espiritualmente conectado, devoção altruísta.', 'Expectativas irrealistas, martírio no amor.', 'Vênus está exaltado aqui — o amor atinge sua mais alta expressão: incondicional, espiritual e profundamente compassivo.'],
};

const SATURN_PT: Record<string, SignText> = {
  Aries:    ['Ação disciplinada, iniciativa estruturada, coragem conquistada.', 'Frustração com progresso lento, raiva por restrição.', 'Saturno no signo de Marte cria tensão entre paciência e urgência — lições vêm ao aprender a agir com disciplina.'],
  Taurus:   ['Acumulação paciente, disciplina financeira, habilidades práticas duradouras.', 'Insegurança material, medo da pobreza.', 'Saturno no signo terrestre de Vênus dá crescimento material lento mas firme — segurança financeira vem pelo esforço persistente.'],
  Gemini:   ['Pensamento estruturado, comunicação disciplinada, habilidade séria de escrita.', 'Bloqueios de comunicação, dificuldades de aprendizado na juventude.', 'Saturno no signo de Mercúrio dá uma mente cuidadosa e metódica — bom para pesquisa e estudo sério.'],
  Cancer:   ['Maturidade emocional, vida familiar responsável, dever para com a mãe.', 'Supressão emocional, infância difícil, felicidade doméstica atrasada.', 'Saturno no signo da Lua dá restrição emocional — a vida inicial pode ser difícil, mas grande profundidade emocional se desenvolve.'],
  Leo:      ['Autoridade conquistada, liderança disciplinada, abordagem humilde ao poder.', 'Frustração do ego, reconhecimento atrasado.', 'Saturno no signo do Sol cria tensão entre ambição e humildade — autoridade vem tarde mas é bem merecida.'],
  Virgo:    ['Ética de trabalho meticulosa, abordagem sistemática, expertise pela prática.', 'Ansiedade, preocupações crônicas de saúde.', 'Saturno no signo terrestre de Mercúrio dá disciplina excepcional no trabalho detalhado — maestria por repetição e paciência.'],
  Libra:    ['Julgamento justo, autoridade equilibrada, relacionamentos justos.', 'Casamento atrasado, obrigações de relacionamento.', 'Saturno está exaltado aqui — disciplina, justiça e autoridade equilibrada estão no pico. Juiz e administrador natural.'],
  Scorpio:  ['Resistência profunda, resiliência psicológica, disciplina transformadora.', 'Medo de perda, problemas de controle.', 'Saturno no signo aquático de Marte dá tremenda resiliência através do sofrimento — transformação por paciência.'],
  Sagittarius: ['Filosofia disciplinada, ensino estruturado, busca paciente da sabedoria.', 'Rigidez dogmática, viagem restrita.', 'Saturno no signo de fogo de Júpiter dá sabedoria conquistada pela dificuldade.'],
  Capricorn: ['Disciplina máxima, autoridade natural, conquista ambiciosa.', 'Vício em trabalho, frieza, solidão no topo.', 'Saturno em seu próprio signo é muito forte — autoridade na carreira e poder organizacional plenamente expressos.'],
  Aquarius:  ['Disciplina humanitária, método científico, serviço ao coletivo.', 'Isolamento emocional, rigidez excêntrica.', 'Saturno em seu próprio signo (Aquário) dá serviço disciplinado a causas coletivas — o reformador e arquiteto social.'],
  Pisces:   ['Disciplina espiritual, serviço compassivo, aceitação do sofrimento.', 'Ansiedade espiritual, medo da dissolução.', 'Saturno no signo aquático de Júpiter dá disciplina espiritual pelo sofrimento — o monge ou curador que serve pelo sacrifício pessoal.'],
};

const RAHU_PT: Record<string, SignText> = {
  Aries:    ['Impulso ambicioso, busca destemida por identidade, pioneiro em campos não convencionais.', 'Ambição imprudente, confusão de identidade, propensão a acidentes.', 'Rahu no signo de Marte amplifica ambição agressiva — tremendo impulso para ser o primeiro por meios não convencionais.'],
  Taurus:   ['Magnetismo material, acumulação de luxo, fontes não convencionais de riqueza.', 'Materialismo obsessivo, consumo tóxico, distúrbios de fala.', 'Rahu é forte aqui — desejo mundano por conforto, riqueza e beleza é amplificado. Pode trazer ganhos materiais súbitos.'],
  Gemini:   ['Comunicação brilhante, intelecto não convencional, maestria em tecnologia e mídia.', 'Fala enganosa, sobrecarga de informação, distúrbios nervosos.', 'Rahu no signo de Mercúrio amplifica comunicação — mídia, tecnologia e idiomas estrangeiros prosperam.'],
  Cancer:   ['Vida doméstica não convencional, interesse em culturas estrangeiras.', 'Manipulação emocional, vida familiar perturbada.', 'Rahu no signo da Lua perturba a paz emocional mas traz experiências domésticas fascinantes e não convencionais.'],
  Leo:      ['Presença pública poderosa, autoridade não convencional, carisma magnético.', 'Ego inflado, engano no poder.', 'Rahu no signo do Sol amplifica desejo por reconhecimento — pode trazer fama súbita ou proeminência pública.'],
  Virgo:    ['Maestria analítica, cura não convencional, inovação técnica.', 'Ansiedade de saúde, análise obsessiva.', 'Rahu no signo terrestre de Mercúrio dá capacidade analítica obsessiva — bom para tecnologia e medicina alternativa.'],
  Libra:    ['Charme magnético, parcerias não convencionais, habilidade diplomática.', 'Ilusão em relacionamentos, parcerias enganosas.', 'Rahu no signo de Vênus amplifica desejo por relacionamento e beleza — parcerias estrangeiras são prováveis.'],
  Scorpio:  ['Maestria oculta, capacidade intensa de pesquisa, ambição transformadora.', 'Comportamento obsessivo, perigos ocultos.', 'Rahu no signo aquático de Marte dá desejo intenso por conhecimento oculto — práticas tântricas e pesquisa.'],
  Sagittarius: ['Sabedoria não convencional, ensino estrangeiro, filosofia inovadora.', 'Engano em contextos religiosos/acadêmicos, problemas com gurus.', 'Rahu no signo de Júpiter amplifica desejo por significado — viagem estrangeira e educação não convencional.'],
  Capricorn: ['Conquista ambiciosa, carreira não convencional, ascensão súbita.', 'Ambição antiética, enganos na carreira.', 'Rahu no signo de Saturno amplifica ambição na carreira — pode trazer ascensão profissional súbita e dramática.'],
  Aquarius:  ['Reforma inovadora, maestria tecnológica, ambição humanitária.', 'Extremismo excêntrico, manipulação de grupos.', 'Rahu no signo aéreo de Saturno amplifica desejo por inovação — excelente para tecnologia e reforma social.'],
  Pisces:   ['Magnetismo espiritual, cura não convencional, experiências psíquicas.', 'Ilusão espiritual, escapismo por substâncias.', 'Rahu no signo aquático de Júpiter amplifica desejo espiritual — experiências psíquicas e tradições espirituais estrangeiras.'],
};

const KETU_PT: Record<string, SignText> = {
  Aries:    ['Coragem espiritual, desapego de batalhas do ego, energia guerreira de vidas passadas.', 'Confusão de identidade, ação sem direção, desconexão da vitalidade física.', 'Ketu no signo de Marte traz maestria de coragem de vidas passadas — a alma já lutou e agora busca combate espiritual.'],
  Taurus:   ['Desapego da segurança material, simplicidade espiritual, abundância de vidas passadas.', 'Instabilidade financeira, desconexão de confortos físicos.', 'Ketu no signo de Vênus significa que a alma já experimentou riqueza material — desapego de posses vem naturalmente.'],
  Gemini:   ['Conhecimento intuitivo, maestria de comunicação de vidas passadas, desapego do excesso de pensamento.', 'Dificuldades de comunicação, pensamento disperso.', 'Ketu no signo de Mercúrio significa maestria intelectual de vidas passadas — aprendizado formal parece desnecessário.'],
  Cancer:   ['Desapego espiritual de dependências emocionais, karma materno de vidas passadas.', 'Dormência emocional, dificuldade em conectar com a mãe.', 'Ketu no signo da Lua significa que a alma já experimentou vínculos emocionais profundos — agora busca desapego.'],
  Leo:      ['Humildade, desapego de fama e autoridade, liderança espiritual.', 'Baixa autoestima, desconexão da expressão criativa.', 'Ketu no signo do Sol significa realeza de vidas passadas — a alma agora pratica humildade e poder espiritual.'],
  Virgo:    ['Cura intuitiva, desapego do perfeccionismo, maestria de serviço de vidas passadas.', 'Negligência com saúde, dificuldade com detalhes práticos.', 'Ketu no signo terrestre de Mercúrio significa maestria de serviço e análise de vidas passadas.'],
  Libra:    ['Desapego de relacionamentos, independência espiritual, karma de parceria de vidas passadas.', 'Dificuldade no casamento, isolamento social.', 'Ketu no signo de Vênus significa maestria de relacionamentos de vidas passadas — a alma busca identidade além de parcerias.'],
  Scorpio:  ['Percepção espiritual profunda, maestria oculta, desapego de jogos de poder.', 'Questões psicológicas ocultas, dificuldade em confiar.', 'Ketu é forte aqui — conhecimento místico profundo e poder espiritual transformador vêm naturalmente.'],
  Sagittarius: ['Sabedoria espiritual, desapego de dogma, energia de guru de vidas passadas.', 'Desconexão da educação superior, crises de fé.', 'Ketu no signo de Júpiter significa maestria filosófica de vidas passadas — a alma busca experiência direta.'],
  Capricorn: ['Desapego de ambição na carreira, autoridade espiritual, conquista de vidas passadas.', 'Instabilidade na carreira, dificuldade com estrutura.', 'Ketu no signo de Saturno significa maestria de carreira de vidas passadas — ambição mundana substituída por autoridade espiritual.'],
  Aquarius:  ['Inovação espiritual, desapego de grupos, trabalho humanitário de vidas passadas.', 'Isolamento social, desconexão de causas.', 'Ketu no signo aéreo de Saturno significa serviço coletivo de vidas passadas — a alma busca libertação espiritual individual.'],
  Pisces:   ['Conquista espiritual profunda, sabedoria intuitiva, orientação natural ao moksha.', 'Escapismo, dissolução de habilidades práticas.', 'Ketu no signo aquático de Júpiter dá a mais alta conquista espiritual — a alma gravita naturalmente para libertação e transcendência.'],
};

export const ALL_PLANETS_PT: Record<string, Record<string, SignText>> = {
  Sun: SUN_PT, Moon: MOON_PT, Mars: MARS_PT, Mercury: MERCURY_PT,
  Jupiter: JUPITER_PT, Venus: VENUS_PT, Saturn: SATURN_PT, Rahu: RAHU_PT, Ketu: KETU_PT,
};

export const DIGNITY_TEXT_PT: Record<Dignity, { label: string; effect: string; modifier: string }> = {
  exalted: { label: 'Exaltado (Uchcha)', effect: 'em seu pico absoluto de poder. Concede seus melhores e mais elevados resultados em plena medida', modifier: 'Esta é a mais alta dignidade — o planeta entrega suas melhores significações com facilidade, confiança e abundância.' },
  own: { label: 'Domicílio (Swakshetra)', effect: 'confortável e forte em seu próprio território. Protege e sustenta firmemente suas significações', modifier: 'Como uma pessoa em sua própria casa — confiante, relaxada e em total controle. Resultados são confiáveis.' },
  moolatrikona: { label: 'Moolatrikona', effect: 'em seu escritório ou local de trabalho — altamente funcional, produtivo e autoritário', modifier: 'Moolatrikona é o "local de trabalho" do planeta — um pouco menos confortável que casa, mas maximamente produtivo.' },
  friendly: { label: 'Signo Amigo (Mitra Rashi)', effect: 'na casa de um amigo — acolhido, apoiado e capaz de expressar sua natureza com facilidade', modifier: 'Bons resultados vêm naturalmente com algum apoio do senhor do signo.' },
  neutral: { label: 'Signo Neutro (Sama Rashi)', effect: 'em território neutro — resultados são mistos, viáveis e moldados por outros fatores do mapa', modifier: 'Nem ajudado nem prejudicado pelo signo — outros aspectos e conjunções determinam o resultado final.' },
  enemy: { label: 'Signo Inimigo (Shatru Rashi)', effect: 'em território hostil — suas significações enfrentam resistência e requerem esforço extra', modifier: 'Como trabalhar em um ambiente sem apoio. Resultados vêm, mas com atrasos ou compromissos.' },
  debilitated: { label: 'Debilitado (Neecha)', effect: 'em seu ponto mais fraco. Suas significações lutam e podem produzir dificuldades', modifier: 'O planeta está em força mínima, mas Neecha Bhanga pode transformar fraqueza em força única.' },
};

export const RETRO_TEXT_PT = {
  label: 'Retrógrado (Vakri)',
  effect: 'Sua energia se volta para dentro, intensificando a autorreflexão e frequentemente produzindo resultados por canais não convencionais.',
  modifier: 'Planetas retrógrados são considerados fortes na astrologia védica (Vakri = bônus de Cheshta Bala).',
};

export const COMBUST_TEXT_PT = {
  label: 'Combusto (Asta)',
  effect: 'Escondido no brilho do Sol, suas significações são ofuscadas pelo ego ou figuras de autoridade.',
  modifier: 'As qualidades do planeta se fundem com o Sol — sua expressão independente é reduzida, mas ganha proximidade ao poder.',
};

export const ASPECT_RECEIVED_PT: Record<string, string> = {
  Sun: 'O aspecto do Sol traz autoridade, visibilidade e pressão do ego a estes assuntos.',
  Moon: 'O aspecto da Lua traz envolvimento emocional, atenção pública e condições flutuantes.',
  Mars: 'O aspecto de Marte traz energia, coragem e potencial conflito.',
  Mercury: 'O aspecto de Mercúrio traz análise intelectual, comunicação e pensamento comercial.',
  Jupiter: 'O aspecto de Júpiter traz sabedoria, expansão, proteção e fortuna — considerado altamente benéfico.',
  Venus: 'O aspecto de Vênus traz beleza, conforto, refinamento artístico e dinâmicas de relacionamento.',
  Saturn: 'O aspecto de Saturno traz disciplina, atraso, restrição e resistência duradoura.',
  Rahu: 'O aspecto de Rahu traz influências não convencionais, elementos estrangeiros e desejo amplificado.',
  Ketu: 'O aspecto de Ketu traz desapego espiritual, influência de vidas passadas e sensação de incompletude.',
};

export const HOUSE_AREA_MAP_PT = [
  'eu, corpo e vitalidade', 'riqueza, fala e família',
  'irmãos, coragem e comunicação', 'lar, mãe e paz interior',
  'filhos, inteligência e criatividade', 'saúde, inimigos e serviço',
  'casamento, parcerias e negócios', 'longevidade, transformação e ocultismo',
  'fortuna, dharma e educação superior', 'carreira, status e autoridade',
  'renda, ganhos e redes sociais', 'despesas, espiritualidade e libertação',
];

const PT_ORDINALS: Record<number, string> = {
  1: '1ª', 2: '2ª', 3: '3ª', 4: '4ª', 5: '5ª', 6: '6ª',
  7: '7ª', 8: '8ª', 9: '9ª', 10: '10ª', 11: '11ª', 12: '12ª',
};

export function ordinalPt(n: number): string { return PT_ORDINALS[n] || `${n}ª`; }
export function houseAreaPt(h: number): string { return HOUSE_AREA_MAP_PT[h - 1] || ''; }

export const PLANET_NAME_PT: Record<string, string> = {
  Sun: 'Sol', Moon: 'Lua', Mars: 'Marte', Mercury: 'Mercúrio',
  Jupiter: 'Júpiter', Venus: 'Vênus', Saturn: 'Saturno', Rahu: 'Rahu', Ketu: 'Ketu',
};

export const SIGN_NAME_PT: Record<string, string> = {
  Aries: 'Áries', Taurus: 'Touro', Gemini: 'Gêmeos', Cancer: 'Câncer',
  Leo: 'Leão', Virgo: 'Virgem', Libra: 'Libra', Scorpio: 'Escorpião',
  Sagittarius: 'Sagitário', Capricorn: 'Capricórnio', Aquarius: 'Aquário', Pisces: 'Peixes',
};

export function planetNamePt(p: string): string { return PLANET_NAME_PT[p] || p; }
