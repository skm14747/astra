import type { Dignity } from '../types';

export const DIGNITY_TEXT_JA: Record<Dignity, { label: string; effect: string; modifier: string }> = {
  exalted: {
    label: '高揚 (Uchcha)',
    effect: '自らの威光の頂点に達し、最も高貴で恵み豊かな成果を惜しみなく発揮しています',
    modifier: '最高峰の品格：惑星は自らの象意を自信に満ちた余裕と豊かさをもってスムーズにもたらします。',
  },
  own: {
    label: '自室 (Swakshetra)',
    effect: '自らの本拠地において安らかにして強固であり、その象意をしっかりと守護し支えています',
    modifier: '我が家で寛ぐ主のように、自律的な主権と安定した成果を持続的にもたらします。',
  },
  moolatrikona: {
    label: 'ムーラトリコーナ',
    effect: '自らの執務室に在るかのように、極めて機能的で生産性が高く、確たる指揮力を発揮しています',
    modifier: '惑星の本来の職場であり、居室以上の実務的推進力と明晰な効率性を誇ります。',
  },
  friendly: {
    label: '友好星座 (Mitra Rashi)',
    effect: '親友の館に温かく迎え入れられ、本来の美点を無理なく自然に表現できています',
    modifier: '星座の支配星からの好意的な後押しを受け、円滑で良好な成果を期待できます。',
  },
  neutral: {
    label: '中立星座 (Sama Rashi)',
    effect: '公平な中立の地にあり、他のアスペクトや配置に応じて実直に役目を果たします',
    modifier: '特に後押しも妨害も受けず、他の惑星との調和や努力次第で確かな結果を生み出せます。',
  },
  enemy: {
    label: '敵対星座 (Shatru Rashi)',
    effect: '不慣れで厳しい環境にあり、その象意を十全に発揮するには粘り強い努力を要します',
    modifier: '逆風の中での作業に似ており、時間をかけた調整と謙虚な工夫が実を結びます。',
  },
  debilitated: {
    label: '減衰 (Neecha)',
    effect: '外的な力勢の最低点にあり、内省と精神的な自己変革を深く促す学びの配置です',
    modifier: 'カルマ的試練の場ですが、ニーチャ・バンガ（減衰の解消）により類まれな強さへと昇華される可能性を秘めます。',
  },
};

export const RETRO_TEXT_JA = {
  label: '逆行 (Vakri)',
  effect: 'エネルギーが内省的に働き、自己を見つめ直す深い洞察と、独自の粘り強いアプローチをもたらします。',
  modifier: 'ヴェーディック占星術では逆行星は力強く（チェーシュタ・バラの加算）、カルマの深層に根ざした独自の成果を導きます。',
};

export const COMBUST_TEXT_JA = {
  label: 'コンバスト (Asta)',
  effect: '太陽の強烈な光に溶け込み、外的な顕示よりも精神的な謙虚さと内なる純粋性を育みます。',
  modifier: '自意識の主張が抑えられ、より高い精神的使命や公の奉仕への献身へとエネルギーが昇華されます。',
};

export const ASPECT_RECEIVED_JA: Record<string, string> = {
  Sun: '太陽のアスペクト：誇り、明晰な指導力、自尊心、そして高潔な正義感をもたらします。',
  Moon: '月のアスペクト：柔らかな慈愛、繊細な直感力、情操の豊かさ、そして安心感を育みます。',
  Mars: '火星のアスペクト：勇敢な行動力、不屈の闘志、迅速な決断、そして力強い推進力を授けます。',
  Mercury: '水星のアスペクト：機知に富んだ分析力、巧みな言葉、学習意欲、そして柔軟な商才を与えます。',
  Jupiter: '木星のアスペクト：天の慈悲、高次の叡智、寛大な精神、そして幸運の拡大をもたらします。',
  Venus: '金星のアスペクト：優雅な美意識、人間関係の調和、洗練された品格、そして生活の潤いを注ぎます。',
  Saturn: '土星のアスペクト：堅実な忍耐力、責任ある規律、慎重な洞察、そして永続する土台を築きます。',
  Rahu: 'ラーフのアスペクト：型破りな創造性、先端技術への着眼、強い野心、そして独自の変革を促します。',
  Ketu: 'ケートゥのアスペクト：精神的な脱執着、鋭い直感の閃き、そして本質を見抜く洞察力を与えます。',
};

export const HOUSE_AREA_MAP_JA = [
  '身体と自己・生命力・個人の尊厳',
  '財運・家柄・言語と食養生',
  '勇気・兄弟姉妹・主体的な行動力と通信',
  '心の幸福・家庭環境・母性の慈愛と不動産',
  '知性と創造力・子宝・過去世の功徳（プールヴァ・プンニャ）',
  '健康維持・障害の克服・奉仕と勝負',
  '婚姻・良きパートナーシップ・対外折衝',
  '長寿・生命の変容・神秘的探求とカルマ',
  '高次の導き・ダルマ（天命）・信仰と学問',
  'キャリア・社会的名声・公的責任と天職',
  '願望成就・高貴な利得・人脈と友愛の輪',
  '霊的解放（モークシャ）・内省・静寂と遠方への旅路',
];

const JA_ORDINALS: Record<number, string> = {
  1: '第1', 2: '第2', 3: '第3', 4: '第4', 5: '第5', 6: '第6',
  7: '第7', 8: '第8', 9: '第9', 10: '第10', 11: '第11', 12: '第12',
};

export function ordinalJa(n: number): string { return JA_ORDINALS[n] || `第${n}`; }
export function houseAreaJa(h: number): string { return HOUSE_AREA_MAP_JA[h - 1] || ''; }

export const PLANET_NAME_JA: Record<string, string> = {
  Sun: '太陽', Moon: '月', Mars: '火星', Mercury: '水星',
  Jupiter: '木星', Venus: '金星', Saturn: '土星', Rahu: 'ラーフ', Ketu: 'ケートゥ',
};

export function planetNameJa(p: string): string { return PLANET_NAME_JA[p] || p; }
