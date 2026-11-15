/**
 * Mahadasha narrative templates for each planet.
 * Sources: BPHS Ch.46-52, Phaladeepika Ch.20, Uttara Kalamrita.
 */

export interface MahadashaNarrative {
  planet: string;
  theme: string;
  generalEffects: string;
  whenStrong: string;
  whenWeak: string;
  health: string;
  career: string;
  relationships: string;
  spirituality: string;
  bestSubPeriods: string;
  challengingSubPeriods: string;
}

export const MAHADASHA_TEXTS: Record<string, MahadashaNarrative> = {
  Sun: {
    planet: 'Sun',
    theme: 'Authority, Identity, and Self-Expression',
    generalEffects: 'The Sun Mahadasha (6 years) brings themes of authority, leadership, government connections, and the development of personal identity. This is a period where your relationship with father figures, authority, and your own ego come into sharp focus.',
    whenStrong: 'When the Sun is well-placed in your chart, this period brings recognition, government favor, career advancement, good health, and a strong sense of purpose. Leadership opportunities arise naturally, and your vitality peaks.',
    whenWeak: 'When the Sun is afflicted, this period can bring ego conflicts, health issues (especially eyes, heart, bones), difficulties with father or government, and identity crises. Over-assertion creates enemies.',
    health: 'The Sun governs the heart, eyes, bones, and vitality. Protect cardiovascular health during this period. Vitamin D and outdoor activity are beneficial. Watch for fever, headaches, and eye strain.',
    career: 'Government, politics, administration, and leadership roles are favored. Positions of authority open up. Independent ventures gain momentum. Father may play a key role in career direction.',
    relationships: 'The Sun period tends to make you more independent and self-focused, which can strain partnerships. Balance authority with partnership. Father-child relationships are highlighted.',
    spirituality: 'Surya mantras, Gayatri mantra, and Sun worship strengthen this period. Sunday is your power day. Facing east during meditation amplifies solar energy.',
    bestSubPeriods: 'Sun-Jupiter, Sun-Mars, and Sun-Moon sub-periods tend to be most productive — bringing recognition, courage, and emotional clarity respectively.',
    challengingSubPeriods: 'Sun-Saturn and Sun-Rahu sub-periods can bring authority conflicts, health challenges, or reputation issues. Sun-Ketu may trigger ego dissolution.',
  },
  Moon: {
    planet: 'Moon',
    theme: 'Emotions, Mind, and Public Connection',
    generalEffects: 'The Moon Mahadasha (10 years) brings themes of emotional development, public life, mother, travel, and mental growth. This is a decade where feelings, intuition, domestic life, and public image take center stage.',
    whenStrong: 'When the Moon is well-placed, this period brings emotional contentment, public popularity, good maternal relationships, comfortable home life, travel, and strong intuition. Mental peace and creative flow are abundant.',
    whenWeak: 'When the Moon is afflicted, this period can bring emotional turbulence, mental health challenges, domestic disruption, problematic relationships with mother, and public fickleness. Sleep disturbances and water-related issues.',
    health: 'The Moon governs the mind, chest/lungs, body fluids, and blood. Protect mental health, hydration, and sleep quality. Watch for depression, anxiety, cold/cough, and blood-related issues.',
    career: 'Public-facing careers, hospitality, food, real estate, travel, nursing, and counseling are favored. Career success comes through emotional intelligence and public appeal.',
    relationships: 'Emotional bonds deepen. Mother and maternal figures are prominent. Marriage and home life need nurturing attention. Emotional vulnerability can strengthen or strain bonds.',
    spirituality: 'Chandra mantras, Shiva worship, and Monday fasting strengthen this period. Meditation near water is powerful. The Moon period develops compassion and intuitive wisdom.',
    bestSubPeriods: 'Moon-Jupiter, Moon-Venus, and Moon-Mercury sub-periods bring emotional wisdom, romantic fulfillment, and mental clarity respectively.',
    challengingSubPeriods: 'Moon-Saturn brings emotional heaviness and responsibility. Moon-Rahu can bring anxiety and emotional confusion. Moon-Mars may trigger emotional conflicts.',
  },
  Mars: {
    planet: 'Mars',
    theme: 'Energy, Courage, and Action',
    generalEffects: 'The Mars Mahadasha (7 years) brings themes of energy, courage, competition, property, siblings, and physical vitality. This is a period of action — starting projects, acquiring land, and engaging in competition.',
    whenStrong: 'When Mars is well-placed, this period brings victory over competitors, property acquisition, physical strength, courageous initiatives, and success in technical or military fields.',
    whenWeak: 'When Mars is afflicted, this period can bring accidents, surgical interventions, conflicts, blood-related health issues, sibling problems, and legal disputes. Anger management becomes crucial.',
    health: 'Mars governs blood, muscles, head, and the immune system. Protect against injuries, inflammation, blood pressure issues, and surgical situations. Regular exercise channels Mars energy positively.',
    career: 'Engineering, military, police, surgery, sports, real estate, construction, and technical fields are favored. Career advances through bold action and competitive victory.',
    relationships: 'Passionate but potentially volatile. Sibling relationships are highlighted. Marriage needs patience and anger management. Property disputes with family may arise.',
    spirituality: 'Hanuman worship, Mars mantras, and Tuesday observances strengthen this period. Physical yoga and martial arts are spiritual practices during Mars Dasha.',
    bestSubPeriods: 'Mars-Jupiter and Mars-Moon bring righteous action and emotional courage. Mars-Sun brings leadership energy.',
    challengingSubPeriods: 'Mars-Saturn can bring accidents and legal issues. Mars-Rahu brings impulsive, risky actions. Mars-Ketu may trigger surgical events.',
  },
  Mercury: {
    planet: 'Mercury',
    theme: 'Intellect, Communication, and Business',
    generalEffects: 'The Mercury Mahadasha (17 years) is the second-longest period, bringing themes of education, business, communication, friendships, and intellectual growth. This long period shapes your thinking patterns and commercial abilities.',
    whenStrong: 'When Mercury is well-placed, this period brings educational success, business prosperity, eloquent speech, writing achievements, diverse friendships, and mental agility. Technology and trade flourish.',
    whenWeak: 'When Mercury is afflicted, this period can bring speech disorders, business losses, skin issues, nervous disorders, fraudulent associates, and educational setbacks.',
    health: 'Mercury governs the nervous system, skin, speech, and lungs. Protect against anxiety, skin conditions, respiratory issues, and nervous exhaustion. Mental relaxation is essential.',
    career: 'Writing, IT, commerce, accounting, teaching, media, advertising, and analytical professions are favored. Multiple income streams develop during this period.',
    relationships: 'Friendships and intellectual connections strengthen. Communication in marriage is critical. Business partnerships form and evolve. Networking expands significantly.',
    spirituality: 'Vishnu mantras, Mercury remedies, and Wednesday observances strengthen this period. The intellect becomes a tool for spiritual discrimination (Viveka).',
    bestSubPeriods: 'Mercury-Jupiter and Mercury-Venus bring intellectual expansion and creative communication. Mercury-Moon enhances intuitive writing.',
    challengingSubPeriods: 'Mercury-Saturn brings mental heaviness and slow communication. Mercury-Mars can bring argumentative tendencies. Mercury-Rahu may bring deceptive situations.',
  },
  Jupiter: {
    planet: 'Jupiter',
    theme: 'Wisdom, Fortune, and Expansion',
    generalEffects: 'The Jupiter Mahadasha (16 years) brings themes of wisdom, prosperity, children, higher education, spiritual growth, and overall fortune. This is generally the most benefic period — the great teacher period of life.',
    whenStrong: 'When Jupiter is well-placed, this period brings prosperity, wise counsel, excellent education, blessed children, spiritual progress, and overall life expansion. This is often the best period of life.',
    whenWeak: 'When Jupiter is afflicted, this period can bring overexpansion, liver issues, excessive weight, false gurus, unfulfilled promises, and spiritual disillusionment.',
    health: 'Jupiter governs the liver, fat, blood sugar, and the hips. Protect against weight gain, diabetes, liver conditions, and cholesterol. Moderation in food is important.',
    career: 'Education, law, banking, priesthood, government advisory, publishing, and counseling are favored. Positions of trust and wisdom open up.',
    relationships: 'Marriage and children are blessed. Relations with teachers and mentors flourish. Family expands through marriage and birth. Father relationship improves.',
    spirituality: 'This is the peak spiritual period. Guru mantras, Thursday fasting, Brihaspati puja, and devoted study of scriptures accelerate spiritual evolution.',
    bestSubPeriods: 'Jupiter-Moon, Jupiter-Venus, and Jupiter-Mercury bring emotional wisdom, beautiful relationships, and intellectual expansion.',
    challengingSubPeriods: 'Jupiter-Saturn brings structured but heavy growth. Jupiter-Rahu can bring guru issues. Jupiter-Ketu triggers deep spiritual questioning.',
  },
  Venus: {
    planet: 'Venus',
    theme: 'Love, Beauty, and Material Pleasure',
    generalEffects: 'The Venus Mahadasha (20 years) is the longest period, bringing themes of love, marriage, luxury, vehicles, artistic expression, and material comforts. This two-decade stretch shapes your relationship with pleasure and beauty.',
    whenStrong: 'When Venus is well-placed, this period brings romantic fulfillment, marriage, luxury, beautiful vehicles, artistic success, material comfort, and a refined, pleasurable life.',
    whenWeak: 'When Venus is afflicted, this period can bring relationship heartbreak, excessive indulgence, venereal issues, financial loss through luxury, and creative blocks.',
    health: 'Venus governs the reproductive system, kidneys, throat, and complexion. Protect against reproductive health issues, kidney stones, throat problems, and diabetes.',
    career: 'Fashion, entertainment, music, art, luxury goods, hospitality, beauty, diplomacy, and marriage counseling are favored. Creative industries peak.',
    relationships: 'This is THE relationship period. Marriage, love, and partnership are central themes. Spouse plays a major role in life direction. Romance and beauty permeate daily life.',
    spirituality: 'Lakshmi worship, Venus mantras, and Friday observances strengthen this period. Art and beauty become paths to the divine. Devotional (bhakti) practices flourish.',
    bestSubPeriods: 'Venus-Mercury and Venus-Jupiter bring creative communication and wise love. Venus-Moon brings emotional romantic fulfillment.',
    challengingSubPeriods: 'Venus-Saturn brings relationship duty and delayed romance. Venus-Rahu can bring unconventional or foreign relationships. Venus-Sun may bring ego in love.',
  },
  Saturn: {
    planet: 'Saturn',
    theme: 'Discipline, Karma, and Endurance',
    generalEffects: 'The Saturn Mahadasha (19 years) brings themes of discipline, responsibility, hard work, karmic reckoning, and slow but lasting achievement. This long period tests endurance and rewards persistence.',
    whenStrong: 'When Saturn is well-placed, this period brings career authority, property, lasting achievement, respect from the masses, and the harvest of long-term effort. Government positions and land ownership are indicated.',
    whenWeak: 'When Saturn is afflicted, this period can bring chronic health issues, career delays, depression, poverty, legal problems, and a general sense of heaviness and restriction.',
    health: 'Saturn governs bones, joints, teeth, nerves, and chronic conditions. Protect against arthritis, dental issues, depression, chronic fatigue, and bone density loss. Regular health checkups are essential.',
    career: 'Government, administration, mining, oil, agriculture, real estate, labor relations, and chronic condition management are favored. Career success comes through sustained effort.',
    relationships: 'Relationships are tested by duty, distance, or circumstances. Marriage requires patience and commitment. Elders and servants need attention. Loneliness may be a theme.',
    spirituality: 'Shani mantras, Saturday observances, and service to the underprivileged strengthen this period. Karma yoga (selfless service) is the path. Saturn teaches through restriction.',
    bestSubPeriods: 'Saturn-Mercury and Saturn-Venus bring practical intelligence and earned comfort. Saturn-Jupiter brings structured growth and earned wisdom.',
    challengingSubPeriods: 'Saturn-Mars can bring accidents and conflicts. Saturn-Rahu brings intense karmic pressure. Saturn-Sun creates authority conflicts.',
  },
  Rahu: {
    planet: 'Rahu',
    theme: 'Worldly Ambition, Innovation, and Transformation',
    generalEffects: 'The Rahu Mahadasha (18 years) brings themes of worldly ambition, foreign connections, technology, unconventional growth, and dramatic life changes. This is a period of breaking boundaries and pursuing desires intensely.',
    whenStrong: 'When Rahu is well-placed, this period brings sudden success, foreign opportunities, technological mastery, material abundance, and dramatic upward mobility. Research and innovation peak.',
    whenWeak: 'When Rahu is afflicted, this period can bring deception, scandal, addiction, mental confusion, foreign troubles, and chronic mysterious illnesses.',
    health: 'Rahu relates to mysterious conditions, toxicity, and mental health. Watch for unexplained symptoms, addiction, phobias, and psychosomatic conditions. Mental health support is important.',
    career: 'Technology, foreign trade, media, aviation, pharmaceuticals, research, and unconventional fields are favored. Career breaks conventional patterns.',
    relationships: 'Unconventional relationships, foreign partners, or unusual marriage circumstances. Relationships break social norms. Family dynamics shift dramatically.',
    spirituality: 'Durga worship, Rahu mantras, and Wednesday/Saturday observances help manage this period. Rahu teaches through worldly experience before redirecting toward spirit.',
    bestSubPeriods: 'Rahu-Jupiter and Rahu-Venus bring expanded opportunity and material fulfillment. Rahu-Mercury brings technological brilliance.',
    challengingSubPeriods: 'Rahu-Saturn brings intense karmic pressure. Rahu-Mars can bring impulsive dangerous situations. Rahu-Sun creates authority deception.',
  },
  Ketu: {
    planet: 'Ketu',
    theme: 'Spiritual Liberation, Detachment, and Past-Life Resolution',
    generalEffects: 'The Ketu Mahadasha (7 years) brings themes of spiritual awakening, detachment, past-life resolution, and unexpected events. This is often a period of loss that leads to liberation — material endings that become spiritual beginnings.',
    whenStrong: 'When Ketu is well-placed, this period brings spiritual advancement, intuitive gifts, liberation from attachments, healing abilities, and resolution of past-life karma.',
    whenWeak: 'When Ketu is afflicted, this period can bring confusion, accidents, sudden losses, mysterious health issues, and a sense of purposelessness. Direction in life feels unclear.',
    health: 'Ketu relates to mysterious conditions, infections, and accidents. Watch for unexplained ailments, infections, and accidents. Spiritual healing practices are beneficial.',
    career: 'Spiritual teaching, research, alternative medicine, computer programming, and any work requiring intuition over convention. Career may shift dramatically toward service or spirituality.',
    relationships: 'Detachment from relationships is a theme. Existing bonds may dissolve if they lack spiritual depth. Past-life relationship patterns surface for resolution.',
    spirituality: 'Ganesha worship, Ketu mantras, and spiritual retreat strengthen this period. Meditation deepens naturally. This is the most spiritually productive Dasha for seekers.',
    bestSubPeriods: 'Ketu-Jupiter and Ketu-Moon bring spiritual wisdom and emotional spiritual depth. Ketu-Venus can bring divine beauty appreciation.',
    challengingSubPeriods: 'Ketu-Saturn brings heavy karmic restriction. Ketu-Mars can bring accidents. Ketu-Rahu brings extreme confusion between worldly and spiritual pulls.',
  },
};

export function getMahadashaNarrative(planet: string): MahadashaNarrative | undefined {
  return MAHADASHA_TEXTS[planet];
}
