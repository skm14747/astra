/**
 * Centralized domain-data i18n for Vedic astrology terms.
 *
 * This module provides localized versions of planet names, rashi (sign) names,
 * nakshatra names, dignity labels, and other domain-specific terms that the
 * calculation engines return in English.
 *
 * Page components should use these helpers instead of rendering English constants
 * directly from constants.ts or core.ts.
 */

import type { Lang, Dignity } from './types';
import { RASHI_NAMES, NAKSHATRA_NAMES } from './constants';

// ═══════════════════════════════════════════════════
// Planet Names
// ═══════════════════════════════════════════════════

const PLANET_NAMES: Record<Lang, Record<string, string>> = {
  en: { Sun: 'Sun', Moon: 'Moon', Mars: 'Mars', Mercury: 'Mercury', Jupiter: 'Jupiter', Venus: 'Venus', Saturn: 'Saturn', Rahu: 'Rahu', Ketu: 'Ketu', Ascendant: 'Ascendant' },
  hi: { Sun: 'सूर्य', Moon: 'चंद्रमा', Mars: 'मंगल', Mercury: 'बुध', Jupiter: 'गुरु', Venus: 'शुक्र', Saturn: 'शनि', Rahu: 'राहु', Ketu: 'केतु', Ascendant: 'लग्न' },
  ne: { Sun: 'सूर्य', Moon: 'चन्द्रमा', Mars: 'मंगल', Mercury: 'बुध', Jupiter: 'गुरु', Venus: 'शुक्र', Saturn: 'शनि', Rahu: 'राहु', Ketu: 'केतु', Ascendant: 'लग्न' },
  pt: { Sun: 'Sol', Moon: 'Lua', Mars: 'Marte', Mercury: 'Mercúrio', Jupiter: 'Júpiter', Venus: 'Vênus', Saturn: 'Saturno', Rahu: 'Rahu', Ketu: 'Ketu', Ascendant: 'Ascendente' },
  es: { Sun: 'Sol', Moon: 'Luna', Mars: 'Marte', Mercury: 'Mercurio', Jupiter: 'Júpiter', Venus: 'Venus', Saturn: 'Saturno', Rahu: 'Rahu', Ketu: 'Ketu', Ascendant: 'Ascendente' },
  fr: { Sun: 'Soleil', Moon: 'Lune', Mars: 'Mars', Mercury: 'Mercure', Jupiter: 'Jupiter', Venus: 'Vénus', Saturn: 'Saturne', Rahu: 'Rahu', Ketu: 'Ketu', Ascendant: 'Ascendant' },
  ja: { Sun: '太陽', Moon: '月', Mars: '火星', Mercury: '水星', Jupiter: '木星', Venus: '金星', Saturn: '土星', Rahu: 'ラーフ', Ketu: 'ケートゥ', Ascendant: 'アセンダント' },
  ko: { Sun: '태양', Moon: '달', Mars: '화성', Mercury: '수성', Jupiter: '목성', Venus: '금성', Saturn: '토성', Rahu: '라후', Ketu: '케투', Ascendant: '어센던트' },
};

export function getPlanetName(planet: string, lang: Lang = 'en'): string {
  return PLANET_NAMES[lang]?.[planet] ?? PLANET_NAMES.en[planet] ?? planet;
}

// ═══════════════════════════════════════════════════
// Rashi (Zodiac Sign) Names — by index (0-11)
// ═══════════════════════════════════════════════════

const RASHI_I18N: Record<Lang, readonly string[]> = {
  en: RASHI_NAMES,
  hi: ['मेष', 'वृषभ', 'मिथुन', 'कर्क', 'सिंह', 'कन्या', 'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुंभ', 'मीन'],
  ne: ['मेष', 'वृष', 'मिथुन', 'कर्कट', 'सिंह', 'कन्या', 'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुम्भ', 'मीन'],
  pt: ['Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem', 'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'],
  es: ['Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo', 'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis'],
  fr: ['Bélier', 'Taureau', 'Gémeaux', 'Cancer', 'Lion', 'Vierge', 'Balance', 'Scorpion', 'Sagittaire', 'Capricorne', 'Verseau', 'Poissons'],
  ja: ['牡羊座', '牡牛座', '双子座', '蟹座', '獅子座', '乙女座', '天秤座', '蠍座', '射手座', '山羊座', '水瓶座', '魚座'],
  ko: ['양자리', '황소자리', '쌍둥이자리', '게자리', '사자자리', '처녀자리', '천칭자리', '전갈자리', '사수자리', '염소자리', '물병자리', '물고기자리'],
};

/** Look up by rashi index (0–11). */
export function getRashiName(index: number, lang: Lang = 'en'): string {
  return RASHI_I18N[lang]?.[index] ?? RASHI_NAMES[index] ?? '';
}

/** Look up by English rashi name string (e.g. "Aries"). */
export function getRashiNameByKey(enName: string, lang: Lang = 'en'): string {
  if (lang === 'en') return enName;
  const idx = (RASHI_NAMES as readonly string[]).indexOf(enName);
  if (idx === -1) return enName;
  return RASHI_I18N[lang]?.[idx] ?? enName;
}

// ═══════════════════════════════════════════════════
// Nakshatra Names — by index (0-26)
// ═══════════════════════════════════════════════════

const NAKSHATRA_I18N: Record<Lang, readonly string[]> = {
  en: NAKSHATRA_NAMES,
  hi: [
    'अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशिरा', 'आर्द्रा',
    'पुनर्वसु', 'पुष्य', 'आश्लेषा', 'मघा', 'पूर्वा फाल्गुनी', 'उत्तरा फाल्गुनी',
    'हस्त', 'चित्रा', 'स्वाति', 'विशाखा', 'अनुराधा', 'ज्येष्ठा',
    'मूल', 'पूर्वाषाढ़ा', 'उत्तराषाढ़ा', 'श्रवण', 'धनिष्ठा', 'शतभिषा',
    'पूर्वा भाद्रपद', 'उत्तरा भाद्रपद', 'रेवती',
  ],
  ne: [
    'अश्विनी', 'भरणी', 'कृत्तिका', 'रोहिणी', 'मृगशिरा', 'आर्द्रा',
    'पुनर्वसु', 'पुष्य', 'आश्लेषा', 'मघा', 'पूर्वा फाल्गुनी', 'उत्तरा फाल्गुनी',
    'हस्त', 'चित्रा', 'स्वाती', 'विशाखा', 'अनुराधा', 'ज्येष्ठा',
    'मूल', 'पूर्वाषाढा', 'उत्तराषाढा', 'श्रवण', 'धनिष्ठा', 'शतभिषा',
    'पूर्वा भाद्रपद', 'उत्तरा भाद्रपद', 'रेवती',
  ],
  pt: NAKSHATRA_NAMES, // Sanskrit transliteration acceptable in PT
  es: NAKSHATRA_NAMES, // Sanskrit transliteration acceptable in ES
  fr: NAKSHATRA_NAMES, // Sanskrit transliteration acceptable in FR
  ja: [
    'アシュヴィニー', 'バラニー', 'クリッティカー', 'ローヒニー', 'ムリガシラー', 'アールドラー',
    'プナルヴァス', 'プシュヤ', 'アーシュレーシャー', 'マガー', 'プールヴァ・ファールグニー', 'ウッタラ・ファールグニー',
    'ハスタ', 'チトラー', 'スヴァーティ', 'ヴィシャーカー', 'アヌラーダー', 'ジェーシュター',
    'ムーラ', 'プールヴァ・アーシャーダー', 'ウッタラ・アーシャーダー', 'シュラヴァナ', 'ダニシュター', 'シャタビシャー',
    'プールヴァ・バードラパダ', 'ウッタラ・バードラパダ', 'レーヴァティー',
  ],
  ko: [
    '아슈비니', '바라니', '크리티카', '로히니', '므리가시라', '아르드라',
    '푸나르바수', '푸시야', '아슐레샤', '마가', '푸르바 팔구니', '우타라 팔구니',
    '하스타', '치트라', '스바티', '비샤카', '아누라다', '지예슈타',
    '물라', '푸르바샤다', '우타라샤다', '쉬라바나', '다니슈타', '샤타비샤',
    '푸르바 바드라파다', '우타라 바드라파다', '레바티',
  ],
};

export function getNakshatraName(index: number, lang: Lang = 'en'): string {
  return NAKSHATRA_I18N[lang]?.[index] ?? NAKSHATRA_NAMES[index] ?? '';
}

// ═══════════════════════════════════════════════════
// Dignity Labels
// ═══════════════════════════════════════════════════

const DIGNITY_LABELS: Record<Lang, Record<Dignity, string>> = {
  en: { exalted: 'Exalted', own: 'Own Sign', moolatrikona: 'Moolatrikona', friendly: 'Friendly', neutral: 'Neutral', enemy: 'Enemy', debilitated: 'Debilitated' },
  hi: { exalted: 'उच्च', own: 'स्वगृही', moolatrikona: 'मूलत्रिकोण', friendly: 'मित्र', neutral: 'सम', enemy: 'शत्रु', debilitated: 'नीच' },
  ne: { exalted: 'उच्च', own: 'स्वगृही', moolatrikona: 'मूलत्रिकोण', friendly: 'मित्र', neutral: 'सम', enemy: 'शत्रु', debilitated: 'नीच' },
  pt: { exalted: 'Exaltado', own: 'Domicílio', moolatrikona: 'Moolatrikona', friendly: 'Amigável', neutral: 'Neutro', enemy: 'Inimigo', debilitated: 'Debilitado' },
  es: { exalted: 'Exaltado', own: 'Domicilio', moolatrikona: 'Moolatrikona', friendly: 'Amistoso', neutral: 'Neutro', enemy: 'Enemigo', debilitated: 'Debilitado' },
  fr: { exalted: 'Exalté', own: 'Domicile', moolatrikona: 'Moolatrikona', friendly: 'Ami', neutral: 'Neutre', enemy: 'Ennemi', debilitated: 'Débilité' },
  ja: { exalted: '高揚', own: '自室', moolatrikona: 'ムーラトリコーナ', friendly: '友好', neutral: '中立', enemy: '敵', debilitated: '減衰' },
  ko: { exalted: '고양', own: '본궁', moolatrikona: '물라트리코나', friendly: '우호', neutral: '중립', enemy: '적', debilitated: '쇠약' },
};

export function getDignityLabel(dignity: Dignity, lang: Lang = 'en'): string {
  return DIGNITY_LABELS[lang]?.[dignity] ?? DIGNITY_LABELS.en[dignity] ?? dignity;
}

// ═══════════════════════════════════════════════════
// Koota / Compatibility i18n
// ═══════════════════════════════════════════════════

interface KootaI18n {
  name: string;
  area: string;
}

const KOOTA_NAMES: Record<Lang, Record<string, KootaI18n>> = {
  en: {
    Varna: { name: 'Varna', area: 'Work/Ego' },
    Vashya: { name: 'Vashya', area: 'Dominance' },
    Tara: { name: 'Tara', area: 'Destiny/Luck' },
    Yoni: { name: 'Yoni', area: 'Sexual Compatibility' },
    'Graha Maitri': { name: 'Graha Maitri', area: 'Mental Compatibility' },
    Gana: { name: 'Gana', area: 'Temperament' },
    Bhakoot: { name: 'Bhakoot', area: 'Love/Happiness' },
    Nadi: { name: 'Nadi', area: 'Health/Genetics' },
  },
  hi: {
    Varna: { name: 'वर्ण', area: 'कार्य/अहंकार' },
    Vashya: { name: 'वश्य', area: 'प्रभुत्व' },
    Tara: { name: 'तारा', area: 'भाग्य/किस्मत' },
    Yoni: { name: 'योनि', area: 'शारीरिक अनुकूलता' },
    'Graha Maitri': { name: 'ग्रह मैत्री', area: 'मानसिक अनुकूलता' },
    Gana: { name: 'गण', area: 'स्वभाव' },
    Bhakoot: { name: 'भकूट', area: 'प्रेम/सुख' },
    Nadi: { name: 'नाड़ी', area: 'स्वास्थ्य/वंश' },
  },
  ne: {
    Varna: { name: 'वर्ण', area: 'कार्य/अहंकार' },
    Vashya: { name: 'वश्य', area: 'प्रभुत्व' },
    Tara: { name: 'तारा', area: 'भाग्य/किस्मत' },
    Yoni: { name: 'योनि', area: 'शारीरिक अनुकूलता' },
    'Graha Maitri': { name: 'ग्रह मैत्री', area: 'मानसिक अनुकूलता' },
    Gana: { name: 'गण', area: 'स्वभाव' },
    Bhakoot: { name: 'भकूट', area: 'प्रेम/सुख' },
    Nadi: { name: 'नाड़ी', area: 'स्वास्थ्य/वंश' },
  },
  pt: {
    Varna: { name: 'Varna', area: 'Trabalho/Ego' },
    Vashya: { name: 'Vashya', area: 'Dominância' },
    Tara: { name: 'Tara', area: 'Destino/Sorte' },
    Yoni: { name: 'Yoni', area: 'Compatibilidade Sexual' },
    'Graha Maitri': { name: 'Graha Maitri', area: 'Compatibilidade Mental' },
    Gana: { name: 'Gana', area: 'Temperamento' },
    Bhakoot: { name: 'Bhakoot', area: 'Amor/Felicidade' },
    Nadi: { name: 'Nadi', area: 'Saúde/Genética' },
  },
  es: {
    Varna: { name: 'Varna', area: 'Trabajo/Ego' },
    Vashya: { name: 'Vashya', area: 'Dominio' },
    Tara: { name: 'Tara', area: 'Destino/Suerte' },
    Yoni: { name: 'Yoni', area: 'Compatibilidad Sexual' },
    'Graha Maitri': { name: 'Graha Maitri', area: 'Compatibilidad Mental' },
    Gana: { name: 'Gana', area: 'Temperamento' },
    Bhakoot: { name: 'Bhakoot', area: 'Amor/Felicidad' },
    Nadi: { name: 'Nadi', area: 'Salud/Genética' },
  },
  fr: {
    Varna: { name: 'Varna', area: 'Travail/Ego' },
    Vashya: { name: 'Vashya', area: 'Domination' },
    Tara: { name: 'Tara', area: 'Destin/Chance' },
    Yoni: { name: 'Yoni', area: 'Compatibilité Sexuelle' },
    'Graha Maitri': { name: 'Graha Maitri', area: 'Compatibilité Mentale' },
    Gana: { name: 'Gana', area: 'Tempérament' },
    Bhakoot: { name: 'Bhakoot', area: 'Amour/Bonheur' },
    Nadi: { name: 'Nadi', area: 'Santé/Génétique' },
  },
  ja: {
    Varna: { name: 'ヴァルナ', area: '仕事/自我' },
    Vashya: { name: 'ヴァシャ', area: '支配力' },
    Tara: { name: 'ターラ', area: '運命/幸運' },
    Yoni: { name: 'ヨーニ', area: '性的相性' },
    'Graha Maitri': { name: 'グラハ・マイトリー', area: '精神的相性' },
    Gana: { name: 'ガナ', area: '気質' },
    Bhakoot: { name: 'バクート', area: '愛/幸福' },
    Nadi: { name: 'ナディ', area: '健康/遺伝' },
  },
  ko: {
    Varna: { name: '바르나', area: '직업/자아' },
    Vashya: { name: '바시야', area: '지배력' },
    Tara: { name: '타라', area: '운명/행운' },
    Yoni: { name: '요니', area: '성적 호환성' },
    'Graha Maitri': { name: '그라하 마이트리', area: '정신적 호환성' },
    Gana: { name: '가나', area: '기질' },
    Bhakoot: { name: '바쿳', area: '사랑/행복' },
    Nadi: { name: '나디', area: '건강/유전' },
  },
};

export function getKootaName(enName: string, lang: Lang = 'en'): string {
  return KOOTA_NAMES[lang]?.[enName]?.name ?? enName;
}

export function getKootaArea(enName: string, lang: Lang = 'en'): string {
  return KOOTA_NAMES[lang]?.[enName]?.area ?? KOOTA_NAMES.en[enName]?.area ?? '';
}

// ═══════════════════════════════════════════════════
// Compatibility Descriptions / Verdicts
// ═══════════════════════════════════════════════════

const COMPATIBILITY_DESCRIPTIONS: Record<Lang, Record<string, string>> = {
  en: {
    Compatible: 'Compatible',
    'Boy Varna higher than Girl': 'Boy Varna higher than Girl',
  },
  hi: {
    Compatible: 'अनुकूल',
    'Boy Varna higher than Girl': 'वर का वर्ण वधू से ऊँचा',
  },
  ne: {
    Compatible: 'अनुकूल',
    'Boy Varna higher than Girl': 'वरको वर्ण वधूभन्दा अग्लो',
  },
  pt: {
    Compatible: 'Compatível',
    'Boy Varna higher than Girl': 'Varna do noivo superior à noiva',
  },
  es: {
    Compatible: 'Compatible',
    'Boy Varna higher than Girl': 'Varna del novio superior a la novia',
  },
  fr: {
    Compatible: 'Compatible',
    'Boy Varna higher than Girl': 'Varna du fiancé supérieur à la fiancée',
  },
  ja: {
    Compatible: '相性良好',
    'Boy Varna higher than Girl': '男性のヴァルナが女性より高い',
  },
  ko: {
    Compatible: '호환',
    'Boy Varna higher than Girl': '남성 바르나가 여성보다 높음',
  },
};

export function getCompatibilityDescription(enDesc: string, lang: Lang = 'en'): string {
  return COMPATIBILITY_DESCRIPTIONS[lang]?.[enDesc] ?? enDesc;
}

const VERDICTS: Record<Lang, Record<string, string>> = {
  en: { 'Excellent Match': 'Excellent Match', 'Good Match': 'Good Match', 'Average Match': 'Average Match', 'Not Recommended': 'Not Recommended' },
  hi: { 'Excellent Match': 'उत्तम मेल', 'Good Match': 'अच्छा मेल', 'Average Match': 'सामान्य मेल', 'Not Recommended': 'अनुशंसित नहीं' },
  ne: { 'Excellent Match': 'उत्तम मेल', 'Good Match': 'राम्रो मेल', 'Average Match': 'सामान्य मेल', 'Not Recommended': 'सिफारिस गरिँदैन' },
  pt: { 'Excellent Match': 'Combinação Excelente', 'Good Match': 'Boa Combinação', 'Average Match': 'Combinação Média', 'Not Recommended': 'Não Recomendado' },
  es: { 'Excellent Match': 'Excelente Compatibilidad', 'Good Match': 'Buena Compatibilidad', 'Average Match': 'Compatibilidad Media', 'Not Recommended': 'No Recomendado' },
  fr: { 'Excellent Match': 'Excellente Compatibilité', 'Good Match': 'Bonne Compatibilité', 'Average Match': 'Compatibilité Moyenne', 'Not Recommended': 'Non Recommandé' },
  ja: { 'Excellent Match': '最高の相性', 'Good Match': '良い相性', 'Average Match': '普通の相性', 'Not Recommended': '非推奨' },
  ko: { 'Excellent Match': '최상의 궁합', 'Good Match': '좋은 궁합', 'Average Match': '보통 궁합', 'Not Recommended': '비추천' },
};

export function getVerdict(enVerdict: string, lang: Lang = 'en'): string {
  return VERDICTS[lang]?.[enVerdict] ?? enVerdict;
}

// ═══════════════════════════════════════════════════
// Weekday Names
// ═══════════════════════════════════════════════════

const WEEKDAYS: Record<Lang, readonly string[]> = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  hi: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
  ne: ['आइतबार', 'सोमबार', 'मंगलबार', 'बुधबार', 'बिहीबार', 'शुक्रबार', 'शनिबार'],
  pt: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  fr: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  ja: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  ko: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
};

export function getWeekdayName(index: number, lang: Lang = 'en'): string {
  return WEEKDAYS[lang]?.[index] ?? WEEKDAYS.en[index] ?? '';
}

// ═══════════════════════════════════════════════════
// Dosha Labels
// ═══════════════════════════════════════════════════

const DOSHA_PRESENT: Record<Lang, string> = {
  en: 'Present', hi: 'मौजूद है', ne: 'विद्यमान', pt: 'Presente', es: 'Presente', fr: 'Présent', ja: '存在', ko: '존재',
};
const DOSHA_ABSENT: Record<Lang, string> = {
  en: 'Absent', hi: 'अनुपस्थित', ne: 'अनुपस्थित', pt: 'Ausente', es: 'Ausente', fr: 'Absent', ja: '不在', ko: '부재',
};
const DOSHA_CANCELLED: Record<Lang, string> = {
  en: 'Cancelled', hi: 'निरस्त', ne: 'रद्द', pt: 'Cancelado', es: 'Cancelado', fr: 'Annulé', ja: '解消', ko: '해소',
};

export function getDoshaStatus(status: 'present' | 'absent' | 'cancelled', lang: Lang = 'en'): string {
  if (status === 'present') return DOSHA_PRESENT[lang] ?? DOSHA_PRESENT.en;
  if (status === 'cancelled') return DOSHA_CANCELLED[lang] ?? DOSHA_CANCELLED.en;
  return DOSHA_ABSENT[lang] ?? DOSHA_ABSENT.en;
}

// ═══════════════════════════════════════════════════
// Hora Quality Labels
// ═══════════════════════════════════════════════════

const HORA_QUALITY: Record<Lang, Record<string, string>> = {
  en: { Favorable: 'Favorable', Unfavorable: 'Unfavorable', Neutral: 'Neutral', Good: 'Good', Excellent: 'Excellent' },
  hi: { Favorable: 'अनुकूल', Unfavorable: 'प्रतिकूल', Neutral: 'सामान्य', Good: 'शुभ', Excellent: 'अति शुभ' },
  ne: { Favorable: 'अनुकूल', Unfavorable: 'प्रतिकूल', Neutral: 'सामान्य', Good: 'शुभ', Excellent: 'अति शुभ' },
  pt: { Favorable: 'Favorável', Unfavorable: 'Desfavorável', Neutral: 'Neutro', Good: 'Bom', Excellent: 'Excelente' },
  es: { Favorable: 'Favorable', Unfavorable: 'Desfavorable', Neutral: 'Neutro', Good: 'Bueno', Excellent: 'Excelente' },
  fr: { Favorable: 'Favorable', Unfavorable: 'Défavorable', Neutral: 'Neutre', Good: 'Bon', Excellent: 'Excellent' },
  ja: { Favorable: '吉', Unfavorable: '凶', Neutral: '中立', Good: '良', Excellent: '大吉' },
  ko: { Favorable: '길', Unfavorable: '흉', Neutral: '중립', Good: '양호', Excellent: '대길' },
};

export function getHoraQuality(enQuality: string, lang: Lang = 'en'): string {
  return HORA_QUALITY[lang]?.[enQuality] ?? enQuality;
}

// ═══════════════════════════════════════════════════
// Chakra Names (Matrix of Destiny Health Card)
// ═══════════════════════════════════════════════════

const CHAKRA_NAMES: Record<Lang, Record<string, string>> = {
  en: {
    sahasrara: 'Sahasrara (Crown)',
    ajna: 'Ajna (Third Eye)',
    vishuddha: 'Vishuddha (Throat)',
    anahata: 'Anahata (Heart)',
    manipura: 'Manipura (Solar Plexus)',
    svadhisthana: 'Svadhisthana (Sacral)',
    muladhara: 'Muladhara (Root)',
  },
  hi: {
    sahasrara: 'सहस्रार (मुकुट)',
    ajna: 'आज्ञा (तीसरा नेत्र)',
    vishuddha: 'विशुद्ध (कंठ)',
    anahata: 'अनाहत (हृदय)',
    manipura: 'मणिपुर (नाभि)',
    svadhisthana: 'स्वाधिष्ठान (त्रिक)',
    muladhara: 'मूलाधार (जड़)',
  },
  ne: {
    sahasrara: 'सहस्रार (मुकुट)',
    ajna: 'आज्ञा (तेस्रो नेत्र)',
    vishuddha: 'विशुद्ध (कण्ठ)',
    anahata: 'अनाहत (हृदय)',
    manipura: 'मणिपुर (नाभि)',
    svadhisthana: 'स्वाधिष्ठान (त्रिक)',
    muladhara: 'मूलाधार (जड)',
  },
  pt: {
    sahasrara: 'Sahasrara (Coroa)',
    ajna: 'Ajna (Terceiro Olho)',
    vishuddha: 'Vishuddha (Garganta)',
    anahata: 'Anahata (Coração)',
    manipura: 'Manipura (Plexo Solar)',
    svadhisthana: 'Svadhisthana (Sacral)',
    muladhara: 'Muladhara (Raiz)',
  },
  es: {
    sahasrara: 'Sahasrara (Corona)',
    ajna: 'Ajna (Tercer Ojo)',
    vishuddha: 'Vishuddha (Garganta)',
    anahata: 'Anahata (Corazón)',
    manipura: 'Manipura (Plexo Solar)',
    svadhisthana: 'Svadhisthana (Sacro)',
    muladhara: 'Muladhara (Raíz)',
  },
  fr: {
    sahasrara: 'Sahasrara (Couronne)',
    ajna: 'Ajna (Troisième Œil)',
    vishuddha: 'Vishuddha (Gorge)',
    anahata: 'Anahata (Cœur)',
    manipura: 'Manipura (Plexus Solaire)',
    svadhisthana: 'Svadhisthana (Sacré)',
    muladhara: 'Muladhara (Racine)',
  },
  ja: {
    sahasrara: 'サハスラーラ（頭頂）',
    ajna: 'アージュニャー（第三の目）',
    vishuddha: 'ヴィシュッダ（喉）',
    anahata: 'アナーハタ（心臓）',
    manipura: 'マニプーラ（太陽神経叢）',
    svadhisthana: 'スヴァディシュターナ（仙骨）',
    muladhara: 'ムーラーダーラ（根）',
  },
  ko: {
    sahasrara: '사하스라라 (왕관)',
    ajna: '아즈나 (제3의 눈)',
    vishuddha: '비슈다 (목)',
    anahata: '아나하타 (심장)',
    manipura: '마니푸라 (태양 신경총)',
    svadhisthana: '스바디스타나 (천골)',
    muladhara: '물라다라 (뿌리)',
  },
};

export function getChakraName(key: string, lang: Lang = 'en'): string {
  return CHAKRA_NAMES[lang]?.[key] ?? CHAKRA_NAMES.en[key] ?? key;
}

// ═══════════════════════════════════════════════════
// Atmakaraka — Soul Lessons (AK_LESSONS)
// ═══════════════════════════════════════════════════

interface AkLessonData { lesson: string; desire: string; deity: string }
type AkLessonsMap = Record<string, AkLessonData>;

const AK_LESSONS_I18N: Record<Lang, AkLessonsMap> = {
  en: {
    Sun: { lesson: 'Learning humility and selfless service', desire: 'Recognition and authority', deity: 'Shiva' },
    Moon: { lesson: 'Emotional detachment and inner peace', desire: 'Emotional security and nurturing', deity: 'Parvati / Gouri' },
    Mars: { lesson: 'Controlling anger and aggression', desire: 'Victory and dominance', deity: 'Skanda / Kartikeya' },
    Mercury: { lesson: 'Truthful speech and honest communication', desire: 'Knowledge and intellectual mastery', deity: 'Vishnu' },
    Jupiter: { lesson: 'Respecting all traditions equally', desire: 'Wisdom and spiritual expansion', deity: 'Samba Shiva' },
    Venus: { lesson: 'Moderation in desires and relationships', desire: 'Love, beauty, and pleasure', deity: 'Mahalakshmi' },
    Saturn: { lesson: 'Patience, endurance, and accepting duty', desire: 'Structure and lasting achievement', deity: 'Vishnu (Narayana)' },
  },
  hi: {
    Sun: { lesson: 'विनम्रता और निःस्वार्थ सेवा सीखना', desire: 'मान्यता और अधिकार', deity: 'शिव' },
    Moon: { lesson: 'भावनात्मक वैराग्य और आंतरिक शांति', desire: 'भावनात्मक सुरक्षा और पालन-पोषण', deity: 'पार्वती / गौरी' },
    Mars: { lesson: 'क्रोध और आक्रामकता पर नियंत्रण', desire: 'विजय और प्रभुत्व', deity: 'स्कंद / कार्तिकेय' },
    Mercury: { lesson: 'सत्य वाणी और ईमानदार संवाद', desire: 'ज्ञान और बौद्धिक निपुणता', deity: 'विष्णु' },
    Jupiter: { lesson: 'सभी परम्पराओं का समान सम्मान', desire: 'ज्ञान और आध्यात्मिक विस्तार', deity: 'साम्ब शिव' },
    Venus: { lesson: 'इच्छाओं और संबंधों में संयम', desire: 'प्रेम, सौंदर्य और सुख', deity: 'महालक्ष्मी' },
    Saturn: { lesson: 'धैर्य, सहनशीलता और कर्तव्य स्वीकृति', desire: 'संरचना और स्थायी उपलब्धि', deity: 'विष्णु (नारायण)' },
  },
  ne: {
    Sun: { lesson: 'विनम्रता र निःस्वार्थ सेवा सिक्नु', desire: 'मान्यता र अधिकार', deity: 'शिव' },
    Moon: { lesson: 'भावनात्मक वैराग्य र आन्तरिक शान्ति', desire: 'भावनात्मक सुरक्षा', deity: 'पार्वती / गौरी' },
    Mars: { lesson: 'क्रोध र आक्रामकता नियन्त्रण', desire: 'विजय र प्रभुत्व', deity: 'स्कन्द / कार्तिकेय' },
    Mercury: { lesson: 'सत्य वाणी र इमानदार संवाद', desire: 'ज्ञान र बौद्धिक निपुणता', deity: 'विष्णु' },
    Jupiter: { lesson: 'सबै परम्पराको समान सम्मान', desire: 'ज्ञान र आध्यात्मिक विस्तार', deity: 'साम्ब शिव' },
    Venus: { lesson: 'इच्छा र सम्बन्धमा संयम', desire: 'प्रेम, सौन्दर्य र सुख', deity: 'महालक्ष्मी' },
    Saturn: { lesson: 'धैर्य, सहनशीलता र कर्तव्य', desire: 'संरचना र स्थायी उपलब्धि', deity: 'विष्णु (नारायण)' },
  },
  pt: {
    Sun: { lesson: 'Aprender humildade e serviço altruísta', desire: 'Reconhecimento e autoridade', deity: 'Shiva' },
    Moon: { lesson: 'Desapego emocional e paz interior', desire: 'Segurança emocional e cuidado', deity: 'Parvati / Gouri' },
    Mars: { lesson: 'Controlar raiva e agressividade', desire: 'Vitória e domínio', deity: 'Skanda / Kartikeya' },
    Mercury: { lesson: 'Fala verdadeira e comunicação honesta', desire: 'Conhecimento e maestria intelectual', deity: 'Vishnu' },
    Jupiter: { lesson: 'Respeitar todas as tradições igualmente', desire: 'Sabedoria e expansão espiritual', deity: 'Samba Shiva' },
    Venus: { lesson: 'Moderação nos desejos e relacionamentos', desire: 'Amor, beleza e prazer', deity: 'Mahalakshmi' },
    Saturn: { lesson: 'Paciência, resistência e aceitação do dever', desire: 'Estrutura e conquista duradoura', deity: 'Vishnu (Narayana)' },
  },
  es: {
    Sun: { lesson: 'Aprender humildad y servicio desinteresado', desire: 'Reconocimiento y autoridad', deity: 'Shiva' },
    Moon: { lesson: 'Desapego emocional y paz interior', desire: 'Seguridad emocional y cuidado', deity: 'Parvati / Gouri' },
    Mars: { lesson: 'Controlar la ira y agresividad', desire: 'Victoria y dominio', deity: 'Skanda / Kartikeya' },
    Mercury: { lesson: 'Habla verdadera y comunicación honesta', desire: 'Conocimiento y maestría intelectual', deity: 'Vishnu' },
    Jupiter: { lesson: 'Respetar todas las tradiciones por igual', desire: 'Sabiduría y expansión espiritual', deity: 'Samba Shiva' },
    Venus: { lesson: 'Moderación en deseos y relaciones', desire: 'Amor, belleza y placer', deity: 'Mahalakshmi' },
    Saturn: { lesson: 'Paciencia, resistencia y aceptación del deber', desire: 'Estructura y logro duradero', deity: 'Vishnu (Narayana)' },
  },
  fr: {
    Sun: { lesson: 'Apprendre l\'humilité et le service désintéressé', desire: 'Reconnaissance et autorité', deity: 'Shiva' },
    Moon: { lesson: 'Détachement émotionnel et paix intérieure', desire: 'Sécurité émotionnelle et bienveillance', deity: 'Parvati / Gouri' },
    Mars: { lesson: 'Contrôler la colère et l\'agressivité', desire: 'Victoire et domination', deity: 'Skanda / Kartikeya' },
    Mercury: { lesson: 'Parole véridique et communication honnête', desire: 'Connaissance et maîtrise intellectuelle', deity: 'Vishnu' },
    Jupiter: { lesson: 'Respecter toutes les traditions également', desire: 'Sagesse et expansion spirituelle', deity: 'Samba Shiva' },
    Venus: { lesson: 'Modération dans les désirs et les relations', desire: 'Amour, beauté et plaisir', deity: 'Mahalakshmi' },
    Saturn: { lesson: 'Patience, endurance et acceptation du devoir', desire: 'Structure et accomplissement durable', deity: 'Vishnu (Narayana)' },
  },
  ja: {
    Sun: { lesson: '謙虚さと無私の奉仕を学ぶ', desire: '認知と権威', deity: 'シヴァ' },
    Moon: { lesson: '感情的な超越と内なる平和', desire: '感情的安定と養育', deity: 'パールヴァティー / ガウリー' },
    Mars: { lesson: '怒りと攻撃性の制御', desire: '勝利と支配', deity: 'スカンダ / カールティケーヤ' },
    Mercury: { lesson: '真実の言葉と誠実な意思疎通', desire: '知識と知的熟達', deity: 'ヴィシュヌ' },
    Jupiter: { lesson: 'すべての伝統を等しく尊重する', desire: '知恵と精神的拡大', deity: 'サンバ・シヴァ' },
    Venus: { lesson: '欲望と人間関係の節制', desire: '愛、美、喜び', deity: 'マハーラクシュミー' },
    Saturn: { lesson: '忍耐、持久力、義務の受容', desire: '構造と永続的な達成', deity: 'ヴィシュヌ（ナーラーヤナ）' },
  },
  ko: {
    Sun: { lesson: '겸손과 이타적 봉사 배우기', desire: '인정과 권위', deity: '시바' },
    Moon: { lesson: '감정적 초월과 내면의 평화', desire: '감정적 안정과 양육', deity: '파르바티 / 가우리' },
    Mars: { lesson: '분노와 공격성 조절', desire: '승리와 지배', deity: '스칸다 / 카르티케야' },
    Mercury: { lesson: '진실된 말과 정직한 소통', desire: '지식과 지적 숙달', deity: '비슈누' },
    Jupiter: { lesson: '모든 전통을 동등하게 존중', desire: '지혜와 영적 확장', deity: '삼바 시바' },
    Venus: { lesson: '욕망과 관계의 절제', desire: '사랑, 아름다움, 즐거움', deity: '마하락슈미' },
    Saturn: { lesson: '인내, 지구력, 의무 수용', desire: '구조와 지속적 성취', deity: '비슈누 (나라야나)' },
  },
};

export function getAkLesson(planet: string, lang: Lang = 'en'): AkLessonData {
  return AK_LESSONS_I18N[lang]?.[planet] ?? AK_LESSONS_I18N.en[planet] ?? AK_LESSONS_I18N.en.Sun;
}

// ═══════════════════════════════════════════════════
// Darakaraka — Spouse Traits (DK_SPOUSE)
// ═══════════════════════════════════════════════════

interface DkSpouseData { appearance: string; personality: string; career: string }
type DkSpouseMap = Record<string, DkSpouseData>;

const DK_SPOUSE_I18N: Record<Lang, DkSpouseMap> = {
  en: {
    Sun: { appearance: 'Regal bearing, strong bone structure, radiant complexion', personality: 'Dignified, authoritative, proud, leadership-oriented', career: 'Government, administration, politics, medicine' },
    Moon: { appearance: 'Soft features, pleasant face, attractive eyes', personality: 'Nurturing, emotional, caring, home-oriented', career: 'Healthcare, hospitality, public relations, counselling' },
    Mars: { appearance: 'Athletic build, sharp features, energetic', personality: 'Courageous, assertive, passionate, competitive', career: 'Engineering, military, sports, surgery, real estate' },
    Mercury: { appearance: 'Youthful look, expressive face, quick movements', personality: 'Intellectual, witty, communicative, adaptable', career: 'IT, media, writing, trade, analytics, accounting' },
    Jupiter: { appearance: 'Well-built, dignified appearance, broad forehead', personality: 'Wise, traditional, optimistic, philosophical', career: 'Education, law, finance, religion, advisory' },
    Venus: { appearance: 'Attractive, charming, refined features, good skin', personality: 'Artistic, romantic, pleasure-seeking, diplomatic', career: 'Arts, design, fashion, luxury, entertainment' },
    Saturn: { appearance: 'Lean build, mature features, serious expression', personality: 'Disciplined, hardworking, mature, reserved', career: 'Construction, mining, agriculture, labour, engineering' },
  },
  hi: {
    Sun: { appearance: 'राजसी व्यक्तित्व, मजबूत हड्डी संरचना, तेजस्वी रंग', personality: 'गरिमामय, सत्तावादी, गर्वशील, नेतृत्व उन्मुख', career: 'सरकार, प्रशासन, राजनीति, चिकित्सा' },
    Moon: { appearance: 'कोमल चेहरा, सुंदर मुखाकृति, आकर्षक नेत्र', personality: 'पालन-पोषक, भावुक, देखभाल करने वाला, गृह-उन्मुख', career: 'स्वास्थ्य सेवा, आतिथ्य, जनसंपर्क, परामर्श' },
    Mars: { appearance: 'खिलाड़ी शरीर, तीक्ष्ण चेहरा, ऊर्जावान', personality: 'साहसी, दृढ़, भावुक, प्रतियोगी', career: 'इंजीनियरिंग, सेना, खेल, शल्य चिकित्सा, अचल संपत्ति' },
    Mercury: { appearance: 'युवा दिखावट, अभिव्यक्तिपूर्ण चेहरा, तेज हरकतें', personality: 'बौद्धिक, विनोदी, संवादकुशल, अनुकूलनशील', career: 'आईटी, मीडिया, लेखन, व्यापार, विश्लेषण, लेखांकन' },
    Jupiter: { appearance: 'सुगठित, गरिमामय, चौड़ा माथा', personality: 'बुद्धिमान, पारंपरिक, आशावादी, दार्शनिक', career: 'शिक्षा, कानून, वित्त, धर्म, सलाहकार' },
    Venus: { appearance: 'आकर्षक, मोहक, परिष्कृत, अच्छी त्वचा', personality: 'कलात्मक, रोमांटिक, सुखप्रिय, कूटनीतिक', career: 'कला, डिज़ाइन, फैशन, विलासिता, मनोरंजन' },
    Saturn: { appearance: 'दुबला शरीर, परिपक्व चेहरा, गंभीर भाव', personality: 'अनुशासित, मेहनती, परिपक्व, संयमित', career: 'निर्माण, खनन, कृषि, श्रम, इंजीनियरिंग' },
  },
  ne: {
    Sun: { appearance: 'राजसी व्यक्तित्व, बलियो हड्डी, तेजस्वी', personality: 'गरिमामय, सत्तावादी, नेतृत्व उन्मुख', career: 'सरकार, प्रशासन, राजनीति, चिकित्सा' },
    Moon: { appearance: 'कोमल अनुहार, मनमोहक आँखा', personality: 'स्नेही, भावुक, हेरचाह गर्ने', career: 'स्वास्थ्य सेवा, आतिथ्य, परामर्श' },
    Mars: { appearance: 'खेलाडी शरीर, तीव्र अनुहार', personality: 'साहसी, दृढ, भावुक', career: 'इन्जिनियरिङ, सेना, खेल' },
    Mercury: { appearance: 'युवा देखावट, अभिव्यक्तिपूर्ण', personality: 'बौद्धिक, विनोदी, संवादकुशल', career: 'आईटी, मीडिया, लेखन, व्यापार' },
    Jupiter: { appearance: 'सुगठित, गरिमामय', personality: 'बुद्धिमान, पारम्परिक, आशावादी', career: 'शिक्षा, कानून, वित्त, धर्म' },
    Venus: { appearance: 'आकर्षक, मनमोहक', personality: 'कलात्मक, रोमान्टिक', career: 'कला, डिजाइन, फ्यासन, मनोरञ्जन' },
    Saturn: { appearance: 'दुबलो शरीर, परिपक्व', personality: 'अनुशासित, मेहनती, संयमित', career: 'निर्माण, खनन, कृषि' },
  },
  pt: {
    Sun: { appearance: 'Porte régio, estrutura óssea forte, tez radiante', personality: 'Digno, autoritário, orgulhoso, orientado à liderança', career: 'Governo, administração, política, medicina' },
    Moon: { appearance: 'Traços suaves, rosto agradável, olhos atraentes', personality: 'Protetor, emocional, carinhoso, voltado ao lar', career: 'Saúde, hotelaria, relações públicas, aconselhamento' },
    Mars: { appearance: 'Corpo atlético, traços marcantes, energético', personality: 'Corajoso, assertivo, apaixonado, competitivo', career: 'Engenharia, militar, esportes, cirurgia, imóveis' },
    Mercury: { appearance: 'Aparência jovem, rosto expressivo, movimentos rápidos', personality: 'Intelectual, espirituoso, comunicativo, adaptável', career: 'TI, mídia, escrita, comércio, análise, contabilidade' },
    Jupiter: { appearance: 'Boa constituição, aparência digna, testa larga', personality: 'Sábio, tradicional, otimista, filosófico', career: 'Educação, direito, finanças, religião, consultoria' },
    Venus: { appearance: 'Atraente, encantador, traços refinados, boa pele', personality: 'Artístico, romântico, busca prazer, diplomático', career: 'Artes, design, moda, luxo, entretenimento' },
    Saturn: { appearance: 'Corpo magro, traços maduros, expressão séria', personality: 'Disciplinado, trabalhador, maduro, reservado', career: 'Construção, mineração, agricultura, engenharia' },
  },
  es: {
    Sun: { appearance: 'Porte regio, estructura ósea fuerte, tez radiante', personality: 'Digno, autoritario, orgulloso, orientado al liderazgo', career: 'Gobierno, administración, política, medicina' },
    Moon: { appearance: 'Rasgos suaves, rostro agradable, ojos atractivos', personality: 'Protector, emocional, cariñoso, orientado al hogar', career: 'Salud, hostelería, relaciones públicas, asesoramiento' },
    Mars: { appearance: 'Complexión atlética, rasgos marcados, enérgico', personality: 'Valiente, asertivo, apasionado, competitivo', career: 'Ingeniería, militar, deportes, cirugía, inmobiliaria' },
    Mercury: { appearance: 'Aspecto juvenil, rostro expresivo, movimientos rápidos', personality: 'Intelectual, ingenioso, comunicativo, adaptable', career: 'TI, medios, escritura, comercio, análisis, contabilidad' },
    Jupiter: { appearance: 'Buena constitución, aspecto digno, frente ancha', personality: 'Sabio, tradicional, optimista, filosófico', career: 'Educación, derecho, finanzas, religión, asesoría' },
    Venus: { appearance: 'Atractivo, encantador, rasgos refinados, buena piel', personality: 'Artístico, romántico, buscador de placer, diplomático', career: 'Artes, diseño, moda, lujo, entretenimiento' },
    Saturn: { appearance: 'Complexión delgada, rasgos maduros, expresión seria', personality: 'Disciplinado, trabajador, maduro, reservado', career: 'Construcción, minería, agricultura, ingeniería' },
  },
  fr: {
    Sun: { appearance: 'Port royal, ossature solide, teint radieux', personality: 'Digne, autoritaire, fier, orienté leadership', career: 'Gouvernement, administration, politique, médecine' },
    Moon: { appearance: 'Traits doux, visage agréable, yeux attirants', personality: 'Protecteur, émotionnel, attentionné, axé foyer', career: 'Santé, hôtellerie, relations publiques, conseil' },
    Mars: { appearance: 'Physique athlétique, traits marqués, énergique', personality: 'Courageux, assertif, passionné, compétitif', career: 'Ingénierie, militaire, sports, chirurgie, immobilier' },
    Mercury: { appearance: 'Apparence jeune, visage expressif, gestes rapides', personality: 'Intellectuel, spirituel, communicatif, adaptable', career: 'IT, médias, écriture, commerce, analyse, comptabilité' },
    Jupiter: { appearance: 'Bien bâti, apparence digne, front large', personality: 'Sage, traditionnel, optimiste, philosophe', career: 'Éducation, droit, finance, religion, conseil' },
    Venus: { appearance: 'Attirant, charmant, traits raffinés, belle peau', personality: 'Artistique, romantique, hédoniste, diplomate', career: 'Arts, design, mode, luxe, divertissement' },
    Saturn: { appearance: 'Physique mince, traits mûrs, expression sérieuse', personality: 'Discipliné, travailleur, mature, réservé', career: 'Construction, mines, agriculture, ingénierie' },
  },
  ja: {
    Sun: { appearance: '威厳ある風格、骨格がしっかり、輝く肌', personality: '堂々とした、権威的、誇り高い、リーダー気質', career: '政府、行政、政治、医療' },
    Moon: { appearance: '柔らかい顔立ち、穏やかな表情、魅力的な目', personality: '包容力がある、感情豊か、思いやり、家庭的', career: '医療、ホスピタリティ、広報、カウンセリング' },
    Mars: { appearance: '運動的な体格、鋭い容貌、活力的', personality: '勇敢、積極的、情熱的、競争心旺盛', career: 'エンジニアリング、軍事、スポーツ、外科、不動産' },
    Mercury: { appearance: '若々しい外見、表情豊か、機敏', personality: '知的、ウィットに富む、社交的、適応力', career: 'IT、メディア、執筆、貿易、分析、会計' },
    Jupiter: { appearance: 'がっしりした体格、堂々とした風貌、広い額', personality: '賢明、伝統的、楽観的、哲学的', career: '教育、法律、金融、宗教、顧問' },
    Venus: { appearance: '魅力的、優美、洗練された容貌、美肌', personality: '芸術的、ロマンチスト、快楽主義、外交的', career: '芸術、デザイン、ファッション、高級品、エンタメ' },
    Saturn: { appearance: '痩身、成熟した容貌、真面目な表情', personality: '規律正しい、勤勉、成熟、控えめ', career: '建設、採掘、農業、労働、エンジニアリング' },
  },
  ko: {
    Sun: { appearance: '위엄 있는 풍채, 튼튼한 골격, 빛나는 안색', personality: '위엄 있는, 권위적, 자부심 강한, 리더 기질', career: '정부, 행정, 정치, 의학' },
    Moon: { appearance: '부드러운 이목구비, 온화한 얼굴, 매력적인 눈', personality: '양육적, 감성적, 배려심, 가정적', career: '의료, 서비스업, 홍보, 상담' },
    Mars: { appearance: '체육인 체형, 날카로운 이목구비, 활력적', personality: '용감한, 적극적, 열정적, 경쟁적', career: '엔지니어링, 군사, 스포츠, 외과, 부동산' },
    Mercury: { appearance: '젊은 외모, 표현력 풍부, 민첩한 동작', personality: '지적, 재치 있는, 의사소통 능력, 적응력', career: 'IT, 미디어, 글쓰기, 무역, 분석, 회계' },
    Jupiter: { appearance: '건장한 체격, 위엄 있는 외모, 넓은 이마', personality: '현명한, 전통적, 낙관적, 철학적', career: '교육, 법률, 금융, 종교, 자문' },
    Venus: { appearance: '매력적, 우아한, 세련된 이목구비, 좋은 피부', personality: '예술적, 낭만적, 쾌락주의, 외교적', career: '예술, 디자인, 패션, 고급, 엔터테인먼트' },
    Saturn: { appearance: '마른 체형, 성숙한 이목구비, 진지한 표정', personality: '규율 있는, 근면한, 성숙한, 내성적', career: '건설, 채굴, 농업, 노동, 엔지니어링' },
  },
};

export function getDkSpouse(planet: string, lang: Lang = 'en'): DkSpouseData {
  return DK_SPOUSE_I18N[lang]?.[planet] ?? DK_SPOUSE_I18N.en[planet] ?? DK_SPOUSE_I18N.en.Sun;
}

// ═══════════════════════════════════════════════════
// Arudha Pada Labels
// ═══════════════════════════════════════════════════

interface ArudhaLabelData { name: string; meaning: string }

const ARUDHA_LABELS_I18N: Record<Lang, Record<number, ArudhaLabelData>> = {
  en: {
    1: { name: 'Arudha Lagna (AL)', meaning: 'Public image, reputation, worldly status' },
    2: { name: 'Dhana Pada (A2)', meaning: 'Perceived wealth, financial reputation' },
    3: { name: 'Vikrama Pada (A3)', meaning: 'Courage & initiative as seen by others' },
    4: { name: 'Sukha Pada (A4)', meaning: 'Happiness, property, vehicles reputation' },
    5: { name: 'Mantra Pada (A5)', meaning: 'Perceived intelligence, followers' },
    6: { name: 'Roga Pada (A6)', meaning: 'Perceived enemies, litigation image' },
    7: { name: 'Dara Pada (A7)', meaning: 'Public perception of partnerships' },
    8: { name: 'Mrityu Pada (A8)', meaning: 'Vulnerabilities visible to others' },
    9: { name: 'Dharma Pada (A9)', meaning: 'Perceived righteousness, guru reputation' },
    10: { name: 'Raja Pada (A10)', meaning: 'Career reputation, professional image' },
    11: { name: 'Labha Pada (A11)', meaning: 'Perceived gains, social network' },
    12: { name: 'Upapada (UL)', meaning: 'Marriage manifestation, spouse background' },
  },
  hi: {
    1: { name: 'आरूढ़ लग्न (AL)', meaning: 'सार्वजनिक छवि, प्रतिष्ठा, सांसारिक स्थिति' },
    2: { name: 'धन पद (A2)', meaning: 'कथित धन, वित्तीय प्रतिष्ठा' },
    3: { name: 'विक्रम पद (A3)', meaning: 'दूसरों द्वारा देखा गया साहस व पहल' },
    4: { name: 'सुख पद (A4)', meaning: 'सुख, संपत्ति, वाहन की प्रतिष्ठा' },
    5: { name: 'मंत्र पद (A5)', meaning: 'कथित बुद्धि, अनुयायी' },
    6: { name: 'रोग पद (A6)', meaning: 'कथित शत्रु, मुकदमा छवि' },
    7: { name: 'दार पद (A7)', meaning: 'साझेदारी की सार्वजनिक धारणा' },
    8: { name: 'मृत्यु पद (A8)', meaning: 'दूसरों को दिखने वाली कमज़ोरियाँ' },
    9: { name: 'धर्म पद (A9)', meaning: 'कथित धार्मिकता, गुरु प्रतिष्ठा' },
    10: { name: 'राज पद (A10)', meaning: 'करियर प्रतिष्ठा, पेशेवर छवि' },
    11: { name: 'लाभ पद (A11)', meaning: 'कथित लाभ, सामाजिक नेटवर्क' },
    12: { name: 'उपपद (UL)', meaning: 'विवाह अभिव्यक्ति, जीवनसाथी पृष्ठभूमि' },
  },
  ne: {
    1: { name: 'आरूढ लग्न (AL)', meaning: 'सार्वजनिक छवि, प्रतिष्ठा' },
    2: { name: 'धन पद (A2)', meaning: 'कथित धन, वित्तीय प्रतिष्ठा' },
    3: { name: 'विक्रम पद (A3)', meaning: 'अरूले देखेको साहस' },
    4: { name: 'सुख पद (A4)', meaning: 'सुख, सम्पत्ति, सवारी' },
    5: { name: 'मन्त्र पद (A5)', meaning: 'कथित बुद्धि, अनुयायी' },
    6: { name: 'रोग पद (A6)', meaning: 'कथित शत्रु, मुद्दा छवि' },
    7: { name: 'दार पद (A7)', meaning: 'साझेदारीको सार्वजनिक धारणा' },
    8: { name: 'मृत्यु पद (A8)', meaning: 'अरूलाई देखिने कमजोरी' },
    9: { name: 'धर्म पद (A9)', meaning: 'कथित धार्मिकता, गुरु प्रतिष्ठा' },
    10: { name: 'राज पद (A10)', meaning: 'करियर प्रतिष्ठा, पेशेवर छवि' },
    11: { name: 'लाभ पद (A11)', meaning: 'कथित लाभ, सामाजिक सञ्जाल' },
    12: { name: 'उपपद (UL)', meaning: 'विवाह अभिव्यक्ति, जीवनसाथी' },
  },
  pt: {
    1: { name: 'Arudha Lagna (AL)', meaning: 'Imagem pública, reputação, status mundano' },
    2: { name: 'Dhana Pada (A2)', meaning: 'Riqueza percebida, reputação financeira' },
    3: { name: 'Vikrama Pada (A3)', meaning: 'Coragem e iniciativa vista pelos outros' },
    4: { name: 'Sukha Pada (A4)', meaning: 'Felicidade, propriedade, veículos' },
    5: { name: 'Mantra Pada (A5)', meaning: 'Inteligência percebida, seguidores' },
    6: { name: 'Roga Pada (A6)', meaning: 'Inimigos percebidos, imagem litigiosa' },
    7: { name: 'Dara Pada (A7)', meaning: 'Percepção pública das parcerias' },
    8: { name: 'Mrityu Pada (A8)', meaning: 'Vulnerabilidades visíveis aos outros' },
    9: { name: 'Dharma Pada (A9)', meaning: 'Retidão percebida, reputação de guru' },
    10: { name: 'Raja Pada (A10)', meaning: 'Reputação profissional, imagem de carreira' },
    11: { name: 'Labha Pada (A11)', meaning: 'Ganhos percebidos, rede social' },
    12: { name: 'Upapada (UL)', meaning: 'Manifestação do casamento, histórico do cônjuge' },
  },
  es: {
    1: { name: 'Arudha Lagna (AL)', meaning: 'Imagen pública, reputación, estatus mundano' },
    2: { name: 'Dhana Pada (A2)', meaning: 'Riqueza percibida, reputación financiera' },
    3: { name: 'Vikrama Pada (A3)', meaning: 'Coraje e iniciativa vistos por otros' },
    4: { name: 'Sukha Pada (A4)', meaning: 'Felicidad, propiedad, vehículos' },
    5: { name: 'Mantra Pada (A5)', meaning: 'Inteligencia percibida, seguidores' },
    6: { name: 'Roga Pada (A6)', meaning: 'Enemigos percibidos, imagen litigiosa' },
    7: { name: 'Dara Pada (A7)', meaning: 'Percepción pública de asociaciones' },
    8: { name: 'Mrityu Pada (A8)', meaning: 'Vulnerabilidades visibles a otros' },
    9: { name: 'Dharma Pada (A9)', meaning: 'Rectitud percibida, reputación de guru' },
    10: { name: 'Raja Pada (A10)', meaning: 'Reputación profesional, imagen de carrera' },
    11: { name: 'Labha Pada (A11)', meaning: 'Ganancias percibidas, red social' },
    12: { name: 'Upapada (UL)', meaning: 'Manifestación del matrimonio, antecedentes del cónyuge' },
  },
  fr: {
    1: { name: 'Arudha Lagna (AL)', meaning: 'Image publique, réputation, statut mondain' },
    2: { name: 'Dhana Pada (A2)', meaning: 'Richesse perçue, réputation financière' },
    3: { name: 'Vikrama Pada (A3)', meaning: 'Courage et initiative perçus' },
    4: { name: 'Sukha Pada (A4)', meaning: 'Bonheur, propriété, véhicules' },
    5: { name: 'Mantra Pada (A5)', meaning: 'Intelligence perçue, adeptes' },
    6: { name: 'Roga Pada (A6)', meaning: 'Ennemis perçus, image litigieuse' },
    7: { name: 'Dara Pada (A7)', meaning: 'Perception publique des partenariats' },
    8: { name: 'Mrityu Pada (A8)', meaning: 'Vulnérabilités visibles' },
    9: { name: 'Dharma Pada (A9)', meaning: 'Droiture perçue, réputation de guru' },
    10: { name: 'Raja Pada (A10)', meaning: 'Réputation de carrière, image professionnelle' },
    11: { name: 'Labha Pada (A11)', meaning: 'Gains perçus, réseau social' },
    12: { name: 'Upapada (UL)', meaning: 'Manifestation du mariage, antécédents du conjoint' },
  },
  ja: {
    1: { name: 'アールダ・ラグナ (AL)', meaning: '社会的イメージ、評判、世俗的地位' },
    2: { name: 'ダナ・パダ (A2)', meaning: '認知される富、財務的評判' },
    3: { name: 'ヴィクラマ・パダ (A3)', meaning: '他者から見た勇気と積極性' },
    4: { name: 'スカ・パダ (A4)', meaning: '幸福、財産、乗り物の評判' },
    5: { name: 'マントラ・パダ (A5)', meaning: '認知される知性、信奉者' },
    6: { name: 'ローガ・パダ (A6)', meaning: '認知される敵、訴訟イメージ' },
    7: { name: 'ダーラ・パダ (A7)', meaning: 'パートナーシップの社会的認知' },
    8: { name: 'ムリティユ・パダ (A8)', meaning: '他者から見える弱点' },
    9: { name: 'ダルマ・パダ (A9)', meaning: '認知される正義、師の評判' },
    10: { name: 'ラージャ・パダ (A10)', meaning: 'キャリアの評判、職業イメージ' },
    11: { name: 'ラーバ・パダ (A11)', meaning: '認知される利得、人脈' },
    12: { name: 'ウパパダ (UL)', meaning: '結婚の具現化、配偶者の背景' },
  },
  ko: {
    1: { name: '아루다 라그나 (AL)', meaning: '공적 이미지, 명성, 세속적 지위' },
    2: { name: '다나 파다 (A2)', meaning: '인지된 재산, 재정적 평판' },
    3: { name: '비크라마 파다 (A3)', meaning: '타인이 보는 용기와 주도성' },
    4: { name: '수카 파다 (A4)', meaning: '행복, 부동산, 차량 평판' },
    5: { name: '만트라 파다 (A5)', meaning: '인지된 지성, 추종자' },
    6: { name: '로가 파다 (A6)', meaning: '인지된 적, 소송 이미지' },
    7: { name: '다라 파다 (A7)', meaning: '파트너십의 공적 인식' },
    8: { name: '므리투 파다 (A8)', meaning: '타인에게 보이는 취약점' },
    9: { name: '다르마 파다 (A9)', meaning: '인지된 의로움, 구루 평판' },
    10: { name: '라자 파다 (A10)', meaning: '직업 평판, 전문가 이미지' },
    11: { name: '라바 파다 (A11)', meaning: '인지된 이득, 사회적 네트워크' },
    12: { name: '우파파다 (UL)', meaning: '결혼의 구현, 배우자 배경' },
  },
};

export function getArudhaLabel(house: number, lang: Lang = 'en'): ArudhaLabelData {
  return ARUDHA_LABELS_I18N[lang]?.[house] ?? ARUDHA_LABELS_I18N.en[house] ?? { name: `A${house}`, meaning: '' };
}
