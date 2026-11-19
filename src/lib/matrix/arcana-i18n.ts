import type { Language } from '@/lib/settings/context';
import { useSettings } from '@/lib/settings/context';

export interface LocalizedArcana {
  number: number;
  name: string;
  theme: string;
}

type ArcanaTable = LocalizedArcana[];

const EN: ArcanaTable = [
  { number: 1, name: 'The Magician', theme: 'Willpower, initiative, skill' },
  { number: 2, name: 'The High Priestess', theme: 'Intuition, secrets, patience' },
  { number: 3, name: 'The Empress', theme: 'Creativity, abundance, nurture' },
  { number: 4, name: 'The Emperor', theme: 'Structure, authority, stability' },
  { number: 5, name: 'The Hierophant', theme: 'Tradition, teaching, guidance' },
  { number: 6, name: 'The Lovers', theme: 'Choices, relationships, values' },
  { number: 7, name: 'The Chariot', theme: 'Determination, victory, control' },
  { number: 8, name: 'Justice', theme: 'Balance, fairness, karmic cause and effect' },
  { number: 9, name: 'The Hermit', theme: 'Introspection, wisdom, solitude' },
  { number: 10, name: 'Wheel of Fortune', theme: 'Cycles, fate, turning points' },
  { number: 11, name: 'Strength', theme: 'Courage, patience, endurance, soft power' },
  { number: 12, name: 'The Hanged Man', theme: 'Surrender, new perspective, sacrifice' },
  { number: 13, name: 'Transformation', theme: 'Endings, rebirth, deep change' },
  { number: 14, name: 'Temperance', theme: 'Balance, moderation, integration' },
  { number: 15, name: 'The Devil', theme: 'Shadows, attachments, temptation' },
  { number: 16, name: 'The Tower', theme: 'Sudden change, upheaval, awakening' },
  { number: 17, name: 'The Star', theme: 'Hope, inspiration, serenity' },
  { number: 18, name: 'The Moon', theme: 'Illusion, fear, subconscious' },
  { number: 19, name: 'The Sun', theme: 'Joy, success, vitality' },
  { number: 20, name: 'Judgement', theme: 'Reckoning, calling, renewal' },
  { number: 21, name: 'The World', theme: 'Completion, wholeness, fulfillment' },
  { number: 22, name: 'The Fool', theme: 'New beginnings, leap of faith, freedom' },
];

const ES: ArcanaTable = [
  { number: 1, name: 'El Mago', theme: 'Voluntad, iniciativa, habilidad' },
  { number: 2, name: 'La Sacerdotisa', theme: 'Intuición, secretos, paciencia' },
  { number: 3, name: 'La Emperatriz', theme: 'Creatividad, abundancia, cuidado' },
  { number: 4, name: 'El Emperador', theme: 'Estructura, autoridad, estabilidad' },
  { number: 5, name: 'El Sumo Sacerdote', theme: 'Tradición, enseñanza, guía' },
  { number: 6, name: 'Los Enamorados', theme: 'Elecciones, relaciones, valores' },
  { number: 7, name: 'El Carro', theme: 'Determinación, victoria, control' },
  { number: 8, name: 'La Justicia', theme: 'Equilibrio, justicia, causa y efecto' },
  { number: 9, name: 'El Ermitaño', theme: 'Introspección, sabiduría, soledad' },
  { number: 10, name: 'La Rueda de la Fortuna', theme: 'Ciclos, destino, puntos de inflexión' },
  { number: 11, name: 'La Fuerza', theme: 'Coraje, paciencia, resistencia' },
  { number: 12, name: 'El Colgado', theme: 'Rendición, nueva perspectiva, sacrificio' },
  { number: 13, name: 'La Transformación', theme: 'Finales, renacimiento, cambio profundo' },
  { number: 14, name: 'La Templanza', theme: 'Equilibrio, moderación, integración' },
  { number: 15, name: 'El Diablo', theme: 'Sombras, apegos, tentación' },
  { number: 16, name: 'La Torre', theme: 'Cambio repentino, despertar' },
  { number: 17, name: 'La Estrella', theme: 'Esperanza, inspiración, serenidad' },
  { number: 18, name: 'La Luna', theme: 'Ilusión, miedo, subconsciente' },
  { number: 19, name: 'El Sol', theme: 'Alegría, éxito, vitalidad' },
  { number: 20, name: 'El Juicio', theme: 'Llamado, renovación, despertar' },
  { number: 21, name: 'El Mundo', theme: 'Completud, plenitud, realización' },
  { number: 22, name: 'El Loco', theme: 'Nuevos comienzos, salto de fe, libertad' },
];

const PT: ArcanaTable = [
  { number: 1, name: 'O Mago', theme: 'Vontade, iniciativa, habilidade' },
  { number: 2, name: 'A Sacerdotisa', theme: 'Intuição, segredos, paciência' },
  { number: 3, name: 'A Imperatriz', theme: 'Criatividade, abundância, cuidado' },
  { number: 4, name: 'O Imperador', theme: 'Estrutura, autoridade, estabilidade' },
  { number: 5, name: 'O Hierofante', theme: 'Tradição, ensino, orientação' },
  { number: 6, name: 'Os Enamorados', theme: 'Escolhas, relacionamentos, valores' },
  { number: 7, name: 'O Carro', theme: 'Determinação, vitória, controle' },
  { number: 8, name: 'A Justiça', theme: 'Equilíbrio, justiça, causa e efeito' },
  { number: 9, name: 'O Eremita', theme: 'Introspecção, sabedoria, solidão' },
  { number: 10, name: 'A Roda da Fortuna', theme: 'Ciclos, destino, pontos de virada' },
  { number: 11, name: 'A Força', theme: 'Coragem, paciência, resistência' },
  { number: 12, name: 'O Enforcado', theme: 'Rendição, nova perspectiva, sacrifício' },
  { number: 13, name: 'A Transformação', theme: 'Finais, renascimento, mudança profunda' },
  { number: 14, name: 'A Temperança', theme: 'Equilíbrio, moderação, integração' },
  { number: 15, name: 'O Diabo', theme: 'Sombras, apegos, tentação' },
  { number: 16, name: 'A Torre', theme: 'Mudança repentina, despertar' },
  { number: 17, name: 'A Estrela', theme: 'Esperança, inspiração, serenidade' },
  { number: 18, name: 'A Lua', theme: 'Ilusão, medo, subconsciente' },
  { number: 19, name: 'O Sol', theme: 'Alegria, sucesso, vitalidade' },
  { number: 20, name: 'O Julgamento', theme: 'Chamado, renovação, despertar' },
  { number: 21, name: 'O Mundo', theme: 'Completude, plenitude, realização' },
  { number: 22, name: 'O Louco', theme: 'Novos começos, salto de fé, liberdade' },
];

const FR: ArcanaTable = [
  { number: 1, name: 'Le Bateleur', theme: 'Volonté, initiative, habileté' },
  { number: 2, name: 'La Papesse', theme: 'Intuition, secrets, patience' },
  { number: 3, name: "L'Impératrice", theme: 'Créativité, abondance, soin' },
  { number: 4, name: "L'Empereur", theme: 'Structure, autorité, stabilité' },
  { number: 5, name: 'Le Pape', theme: 'Tradition, enseignement, guidance' },
  { number: 6, name: "L'Amoureux", theme: 'Choix, relations, valeurs' },
  { number: 7, name: 'Le Chariot', theme: 'Détermination, victoire, maîtrise' },
  { number: 8, name: 'La Justice', theme: 'Équilibre, justice, cause et effet' },
  { number: 9, name: "L'Ermite", theme: 'Introspection, sagesse, solitude' },
  { number: 10, name: 'La Roue de Fortune', theme: 'Cycles, destin, tournants' },
  { number: 11, name: 'La Force', theme: 'Courage, patience, endurance' },
  { number: 12, name: 'Le Pendu', theme: 'Lâcher-prise, nouvelle perspective, sacrifice' },
  { number: 13, name: "L'Arcane sans Nom", theme: 'Fins, renaissance, transformation profonde' },
  { number: 14, name: 'Tempérance', theme: 'Équilibre, modération, intégration' },
  { number: 15, name: 'Le Diable', theme: 'Ombres, attachements, tentation' },
  { number: 16, name: 'La Maison Dieu', theme: 'Changement soudain, éveil' },
  { number: 17, name: "L'Étoile", theme: 'Espoir, inspiration, sérénité' },
  { number: 18, name: 'La Lune', theme: 'Illusion, peur, subconscient' },
  { number: 19, name: 'Le Soleil', theme: 'Joie, succès, vitalité' },
  { number: 20, name: 'Le Jugement', theme: 'Appel, renouveau, éveil' },
  { number: 21, name: 'Le Monde', theme: 'Accomplissement, plénitude, réalisation' },
  { number: 22, name: 'Le Mat', theme: 'Nouveaux départs, saut de foi, liberté' },
];

const JA: ArcanaTable = [
  { number: 1, name: '魔術師', theme: '意志力、主導権、技能' },
  { number: 2, name: '女教皇', theme: '直感、秘密、忍耐' },
  { number: 3, name: '女帝', theme: '創造性、豊かさ、育み' },
  { number: 4, name: '皇帝', theme: '構造、権威、安定' },
  { number: 5, name: '法王', theme: '伝統、教え、導き' },
  { number: 6, name: '恋人', theme: '選択、関係性、価値観' },
  { number: 7, name: '戦車', theme: '決意、勝利、統制' },
  { number: 8, name: '正義', theme: 'バランス、公正、因果' },
  { number: 9, name: '隠者', theme: '内省、知恵、孤独' },
  { number: 10, name: '運命の輪', theme: '循環、運命、転換点' },
  { number: 11, name: '力', theme: '勇気、忍耐、内なる力' },
  { number: 12, name: '吊るされた男', theme: '委ね、新たな視点、犠牲' },
  { number: 13, name: '変容', theme: '終焉、再生、深い変化' },
  { number: 14, name: '節制', theme: 'バランス、節度、統合' },
  { number: 15, name: '悪魔', theme: '影、執着、誘惑' },
  { number: 16, name: '塔', theme: '突然の変化、覚醒' },
  { number: 17, name: '星', theme: '希望、インスピレーション、安らぎ' },
  { number: 18, name: '月', theme: '幻想、恐れ、潜在意識' },
  { number: 19, name: '太陽', theme: '喜び、成功、活力' },
  { number: 20, name: '審判', theme: '召命、再生、覚醒' },
  { number: 21, name: '世界', theme: '完成、全体性、達成' },
  { number: 22, name: '愚者', theme: '新たな始まり、飛躍、自由' },
];

const HI: ArcanaTable = [
  { number: 1, name: 'जादूगर', theme: 'इच्छाशक्ति, पहल, कौशल' },
  { number: 2, name: 'महापुरोहितिनी', theme: 'अंतर्ज्ञान, रहस्य, धैर्य' },
  { number: 3, name: 'साम्राज्ञी', theme: 'रचनात्मकता, प्रचुरता, पोषण' },
  { number: 4, name: 'सम्राट', theme: 'संरचना, अधिकार, स्थिरता' },
  { number: 5, name: 'महापुरोहित', theme: 'परम्परा, शिक्षा, मार्गदर्शन' },
  { number: 6, name: 'प्रेमी', theme: 'चयन, संबंध, मूल्य' },
  { number: 7, name: 'रथ', theme: 'दृढ़ संकल्प, विजय, नियंत्रण' },
  { number: 8, name: 'न्याय', theme: 'संतुलन, निष्पक्षता, कर्म-फल' },
  { number: 9, name: 'संन्यासी', theme: 'आत्मनिरीक्षण, ज्ञान, एकांत' },
  { number: 10, name: 'भाग्य चक्र', theme: 'चक्र, भाग्य, मोड़' },
  { number: 11, name: 'शक्ति', theme: 'साहस, धैर्य, सहनशीलता' },
  { number: 12, name: 'उलटा आदमी', theme: 'समर्पण, नई दृष्टि, बलिदान' },
  { number: 13, name: 'रूपांतरण', theme: 'अंत, पुनर्जन्म, गहरा परिवर्तन' },
  { number: 14, name: 'संयम', theme: 'संतुलन, मर्यादा, समन्वय' },
  { number: 15, name: 'शैतान', theme: 'छाया, आसक्ति, प्रलोभन' },
  { number: 16, name: 'मीनार', theme: 'अचानक परिवर्तन, जागृति' },
  { number: 17, name: 'तारा', theme: 'आशा, प्रेरणा, शांति' },
  { number: 18, name: 'चंद्रमा', theme: 'भ्रम, भय, अवचेतन' },
  { number: 19, name: 'सूर्य', theme: 'आनंद, सफलता, ऊर्जा' },
  { number: 20, name: 'निर्णय', theme: 'पुकार, नवीनीकरण, जागृति' },
  { number: 21, name: 'विश्व', theme: 'पूर्णता, समग्रता, सिद्धि' },
  { number: 22, name: 'मूर्ख', theme: 'नई शुरुआत, विश्वास की छलांग, स्वतंत्रता' },
];

const NE: ArcanaTable = [
  { number: 1, name: 'जादूगर', theme: 'इच्छाशक्ति, पहल, सीप' },
  { number: 2, name: 'महापुरोहितिनी', theme: 'अन्तर्ज्ञान, रहस्य, धैर्य' },
  { number: 3, name: 'साम्राज्ञी', theme: 'रचनात्मकता, प्रचुरता, पोषण' },
  { number: 4, name: 'सम्राट', theme: 'संरचना, अधिकार, स्थिरता' },
  { number: 5, name: 'महापुरोहित', theme: 'परम्परा, शिक्षा, मार्गदर्शन' },
  { number: 6, name: 'प्रेमी', theme: 'छनोट, सम्बन्ध, मूल्य' },
  { number: 7, name: 'रथ', theme: 'दृढ़ संकल्प, विजय, नियन्त्रण' },
  { number: 8, name: 'न्याय', theme: 'सन्तुलन, निष्पक्षता, कर्म-फल' },
  { number: 9, name: 'सन्न्यासी', theme: 'आत्मनिरीक्षण, ज्ञान, एकान्त' },
  { number: 10, name: 'भाग्य चक्र', theme: 'चक्र, भाग्य, मोड' },
  { number: 11, name: 'शक्ति', theme: 'साहस, धैर्य, सहनशीलता' },
  { number: 12, name: 'उल्टो मानिस', theme: 'समर्पण, नयाँ दृष्टि, बलिदान' },
  { number: 13, name: 'रूपान्तरण', theme: 'अन्त, पुनर्जन्म, गहिरो परिवर्तन' },
  { number: 14, name: 'संयम', theme: 'सन्तुलन, मर्यादा, समन्वय' },
  { number: 15, name: 'शैतान', theme: 'छाया, आसक्ति, प्रलोभन' },
  { number: 16, name: 'मिनार', theme: 'अचानक परिवर्तन, जागरण' },
  { number: 17, name: 'तारा', theme: 'आशा, प्रेरणा, शान्ति' },
  { number: 18, name: 'चन्द्रमा', theme: 'भ्रम, डर, अवचेतन' },
  { number: 19, name: 'सूर्य', theme: 'आनन्द, सफलता, ऊर्जा' },
  { number: 20, name: 'निर्णय', theme: 'आह्वान, नवीनीकरण, जागरण' },
  { number: 21, name: 'संसार', theme: 'पूर्णता, समग्रता, सिद्धि' },
  { number: 22, name: 'मूर्ख', theme: 'नयाँ सुरुवात, विश्वासको छलाङ, स्वतन्त्रता' },
];

const KO: ArcanaTable = [
  { number: 1, name: '마법사', theme: '의지력, 주도력, 기술' },
  { number: 2, name: '여사제', theme: '직관, 비밀, 인내' },
  { number: 3, name: '여황제', theme: '창조성, 풍요, 양육' },
  { number: 4, name: '황제', theme: '구조, 권위, 안정' },
  { number: 5, name: '교황', theme: '전통, 가르침, 인도' },
  { number: 6, name: '연인', theme: '선택, 관계, 가치관' },
  { number: 7, name: '전차', theme: '결단력, 승리, 통제' },
  { number: 8, name: '정의', theme: '균형, 공정, 인과응보' },
  { number: 9, name: '은둔자', theme: '성찰, 지혜, 고독' },
  { number: 10, name: '운명의 수레바퀴', theme: '순환, 운명, 전환점' },
  { number: 11, name: '힘', theme: '용기, 인내, 내면의 힘' },
  { number: 12, name: '매달린 사람', theme: '내려놓음, 새로운 관점, 희생' },
  { number: 13, name: '변환', theme: '종말, 재탄생, 깊은 변화' },
  { number: 14, name: '절제', theme: '균형, 절제, 통합' },
  { number: 15, name: '악마', theme: '그림자, 집착, 유혹' },
  { number: 16, name: '탑', theme: '급격한 변화, 각성' },
  { number: 17, name: '별', theme: '희망, 영감, 평온' },
  { number: 18, name: '달', theme: '환상, 두려움, 잠재의식' },
  { number: 19, name: '태양', theme: '기쁨, 성공, 활력' },
  { number: 20, name: '심판', theme: '소명, 재생, 각성' },
  { number: 21, name: '세계', theme: '완성, 전체성, 성취' },
  { number: 22, name: '광대', theme: '새로운 시작, 믿음의 도약, 자유' },
];

const ARCANA_I18N: Record<Language, ArcanaTable> = {
  en: EN, es: ES, pt: PT, fr: FR, ja: JA, hi: HI, ne: NE, ko: KO,
};

export function getLocalizedArcana(num: number, language: Language): LocalizedArcana {
  const table = ARCANA_I18N[language] ?? EN;
  const idx = num - 1;
  if (idx < 0 || idx >= table.length) {
    return { number: num, name: 'Unknown', theme: '' };
  }
  return table[idx];
}

export function useLocalizedArcana() {
  const { language } = useSettings();
  return (num: number): LocalizedArcana => getLocalizedArcana(num, language);
}
