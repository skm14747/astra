import type { Dignity } from '../types';

export const DIGNITY_TEXT_KO: Record<Dignity, { label: string; effect: string; modifier: string }> = {
  exalted: {
    label: '고양 (Uchcha)',
    effect: '자신의 힘이 절정에 도달하여 가장 고귀하고 품격 있는 길한 결과를 온전히 베풀고 있습니다',
    modifier: '최상의 품격: 행성은 자신의 상징과 길조를 당당한 자신감과 풍요로움으로 매끄럽게 발현합니다.',
  },
  own: {
    label: '자성 (Swakshetra)',
    effect: '자신의 본향에 편안히 머물며 흔들림 없는 주권으로 그 가치와 복덕을 굳건히 지켜냅니다',
    modifier: '자기 집에서 주권을 행사하는 주인처럼, 안정되고 자립적인 성취를 지속적으로 유지합니다.',
  },
  moolatrikona: {
    label: '물라트리코나',
    effect: '자신의 공식 집무실에 머무는 것처럼 지극히 기능적이고 생산적이며 권위 있는 실행력을 발휘합니다',
    modifier: '행성의 진정한 일터로서, 주거지 이상의 능동적인 생산성과 명쾌한 효율성을 자랑합니다.',
  },
  friendly: {
    label: '친화궁 (Mitra Rashi)',
    effect: '다정한 벗의 환대를 받으며 자신의 본성을 편안하고 자연스럽게 발휘하고 있습니다',
    modifier: '궁 주인의 따뜻한 조력에 힘입어 긍정적인 결실이 순조롭고 막힘없이 드러납니다.',
  },
  neutral: {
    label: '중립궁 (Sama Rashi)',
    effect: '치우침 없는 중립의 터전에서 다른 아스펙트와 하우스 배치의 조화를 바탕으로 제 역할을 수행합니다',
    modifier: '특별한 조력이나 방해 없이, 개인의 성실한 노력과 주변 배치의 조화에 따라 온전한 결실을 맺습니다.',
  },
  enemy: {
    label: '적대궁 (Shatru Rashi)',
    effect: '불리하고 험난한 환경에 놓여 그 기운을 제대로 발현하기 위해 한층 끈기 있는 노력이 요구됩니다',
    modifier: '비우호적인 환경 속에서 일하는 것과 같아, 성급함을 버리고 신중한 타협과 인내로 돌파해야 합니다.',
  },
  debilitated: {
    label: '쇠락 (Neecha)',
    effect: '외적 힘이 가장 낮아진 자리로, 깊은 내적 성찰과 영적 변용을 이끄는 배움의 시험대입니다',
    modifier: '카르마적 시련의 배치이나, 니차 방가(쇠락의 해소)를 통해 전화위복의 비범한 저력으로 거듭날 수 있습니다.',
  },
};

export const RETRO_TEXT_KO = {
  label: '역행 (Vakri)',
  effect: '기운이 내면으로 깊숙이 작용하여 깊은 자기 성찰을 촉진하고 독창적이며 묵직한 방식으로 성취를 이끕니다.',
  modifier: '베딕 점성술에서 역행하는 행성은 강한 추진력(체슈타 발라)을 지니며, 과거 카르마의 뿌리 깊은 과제를 완수하게 합니다.',
};

export const COMBUST_TEXT_KO = {
  label: '연소 (Asta)',
  effect: '태양의 강렬한 화염 속에 용해되어 외적 과시보다 내적 겸손과 거룩한 헌신의 덕목을 기릅니다.',
  modifier: '자아의 이기적인 주장은 정화되고, 보다 숭고한 대의와 공공을 향한 봉사로 그 에너지가 승화됩니다.',
};

export const ASPECT_RECEIVED_KO: Record<string, string> = {
  Sun: '태양의 아스펙트: 당당한 기개, 명석한 지도력, 고결한 자존감과 정의감을 불어넣어 줍니다.',
  Moon: '달의 아스펙트: 따뜻한 모성애, 섬세한 직관력, 정서적 안정과 평온한 안식을 선사합니다.',
  Mars: '화성의 아스펙트: 과감한 추진력, 불굴의 용기, 신속한 결단과 강인한 돌파력을 부여합니다.',
  Mercury: '수성의 아스펙트: 기민한 분석력, 유려한 언변, 배움에 대한 열정과 유연한 상업적 기지를 더해줍니다.',
  Jupiter: '목성의 아스펙트: 하늘의 은덕, 고차원적 지혜, 너그러운 포용력과 상서로운 행운을 베풉니다.',
  Venus: '금성의 아스펙트: 우아한 심미안, 조화로운 대인관계, 품격 있는 예술성과 삶의 여유를 건넵니다.',
  Saturn: '토성의 아스펙트: 묵묵한 인내력, 책임감 있는 규율, 신중한 통찰과 무너지지 않는 기초를 세워줍니다.',
  Rahu: '라후의 아스펙트: 관습을 깨는 독창성, 첨단 기술에 대한 안목, 과감한 야망과 변혁을 촉진합니다.',
  Ketu: '케투의 아스펙트: 영적 탈집착, 번뜩이는 직관의 통찰, 본질을 꿰뚫어 보는 혜안을 줍니다.',
};

export const HOUSE_AREA_MAP_KO = [
  '신체와 자아, 생명력과 개인의 존엄',
  '재물과 가문의 번영, 바른 언어와 식견',
  '용기와 형제자매, 주도적인 실행력과 소통',
  '마음의 평안, 가정의 보금자리, 모친의 사랑과 부동산',
  '지성과 창의적 재능, 자녀의 복덕, 과거세의 선한 공덕(푸르바 푼냐)',
  '건강의 지킴, 질병과 장애의 극복, 헌신적 봉사',
  '혼인과 성스러운 동반자 관계, 대외적 협력',
  '수명의 연장, 영혼의 신비로운 변용과 카르마의 해원',
  '스승의 은덕, 다르마(천명), 굳건한 신앙과 고등 학문',
  '직업적 위상, 사회적 명예, 공적 책무와 천직',
  '소망의 성취, 고귀한 결실, 인맥과 우정의 연대',
  '영적 해탈(모크샤), 내면의 침묵, 안식과 성스러운 순례',
];

const KO_ORDINALS: Record<number, string> = {
  1: '제1', 2: '제2', 3: '제3', 4: '제4', 5: '제5', 6: '제6',
  7: '제7', 8: '제8', 9: '제9', 10: '제10', 11: '제11', 12: '제12',
};

export function ordinalKo(n: number): string { return KO_ORDINALS[n] || `제${n}`; }
export function houseAreaKo(h: number): string { return HOUSE_AREA_MAP_KO[h - 1] || ''; }

export const PLANET_NAME_KO: Record<string, string> = {
  Sun: '태양', Moon: '달', Mars: '화성', Mercury: '수성',
  Jupiter: '목성', Venus: '금성', Saturn: '토성', Rahu: '라후', Ketu: '케투',
};

export function planetNameKo(p: string): string { return PLANET_NAME_KO[p] || p; }
