/**
 * Numerology interpretation texts for Life Path, Destiny, Soul Urge,
 * Personality, Personal Year, and Lo Shu missing/present numbers.
 */

export interface NumberMeaning {
  title: string;
  keywords: string[];
  overview: string;
  strengths: string[];
  challenges: string[];
  careers: string[];
}

export const LIFE_PATH_MEANINGS: Record<number, NumberMeaning> = {
  1: {
    title: 'The Leader',
    keywords: ['independence', 'originality', 'ambition', 'pioneering'],
    overview: 'Life Path 1 is the path of the leader, innovator, and independent thinker. You are here to develop self-confidence, take initiative, and forge new paths. You have natural executive ability and work best when you can be autonomous and direct your own efforts. Your life will present situations that require courage, originality, and the willingness to stand alone.',
    strengths: ['Natural leadership', 'Original thinking', 'Determination', 'Self-reliance', 'Courage'],
    challenges: ['Stubbornness', 'Dominance', 'Impatience', 'Self-centeredness'],
    careers: ['Entrepreneur', 'CEO/Executive', 'Inventor', 'Freelancer', 'Director'],
  },
  2: {
    title: 'The Peacemaker',
    keywords: ['cooperation', 'diplomacy', 'sensitivity', 'partnership'],
    overview: 'Life Path 2 is the path of the diplomat, mediator, and partner. You are here to learn cooperation, patience, and the art of working with others. You have exceptional sensitivity to people\'s feelings and can sense undercurrents others miss. Your life will require you to balance opposing forces, build bridges, and create harmony in relationships and groups.',
    strengths: ['Diplomacy', 'Empathy', 'Patience', 'Attention to detail', 'Mediation'],
    challenges: ['Over-sensitivity', 'Indecisiveness', 'Dependency', 'Shyness'],
    careers: ['Counsellor', 'Diplomat', 'Mediator', 'Social worker', 'Teacher'],
  },
  3: {
    title: 'The Communicator',
    keywords: ['creativity', 'expression', 'joy', 'social'],
    overview: 'Life Path 3 is the path of creative expression, communication, and joy. You are here to inspire others through words, art, or performance. You have a natural gift for uplifting people and bringing beauty into the world. Your life will constantly call you to express yourself authentically — whether through writing, speaking, singing, acting, or any creative medium.',
    strengths: ['Creativity', 'Optimism', 'Communication', 'Inspiration', 'Humor'],
    challenges: ['Scattered energy', 'Superficiality', 'Moodiness', 'Self-doubt'],
    careers: ['Writer', 'Artist', 'Speaker', 'Entertainer', 'Marketing'],
  },
  4: {
    title: 'The Builder',
    keywords: ['stability', 'hard work', 'discipline', 'foundation'],
    overview: 'Life Path 4 is the path of the builder, organizer, and systems thinker. You are here to create lasting structures — whether in business, family, or community. You have exceptional discipline, practical intelligence, and the endurance to see long projects through. Your life will require hard work, attention to detail, and the willingness to build step by step rather than seeking shortcuts.',
    strengths: ['Reliability', 'Discipline', 'Practicality', 'Organization', 'Loyalty'],
    challenges: ['Rigidity', 'Workaholism', 'Stubbornness', 'Resistance to change'],
    careers: ['Engineer', 'Architect', 'Accountant', 'Project Manager', 'Contractor'],
  },
  5: {
    title: 'The Freedom Seeker',
    keywords: ['adventure', 'change', 'freedom', 'versatility'],
    overview: 'Life Path 5 is the path of freedom, adventure, and sensory experience. You are here to explore the full range of human experience — travel, cultures, ideas, and the five senses. You are naturally curious, adaptable, and restless. Your life will be marked by change, movement, and variety. You learn through direct experience rather than theory.',
    strengths: ['Adaptability', 'Resourcefulness', 'Curiosity', 'Magnetism', 'Versatility'],
    challenges: ['Restlessness', 'Excess', 'Inconsistency', 'Fear of commitment'],
    careers: ['Travel writer', 'Sales', 'Public relations', 'Journalist', 'Event planner'],
  },
  6: {
    title: 'The Nurturer',
    keywords: ['responsibility', 'family', 'healing', 'service'],
    overview: 'Life Path 6 is the path of responsibility, love, and domestic harmony. You are here to nurture, heal, and create beauty in your home and community. You have a deep sense of duty to family and an innate ability to create comfort wherever you go. Your life will revolve around relationships, caregiving, and the balance between giving and receiving.',
    strengths: ['Compassion', 'Responsibility', 'Artistic sense', 'Healing ability', 'Devotion'],
    challenges: ['Over-giving', 'Perfectionism', 'Meddling', 'Self-sacrifice'],
    careers: ['Healthcare', 'Interior design', 'Counselling', 'Teaching', 'Social work'],
  },
  7: {
    title: 'The Seeker',
    keywords: ['wisdom', 'analysis', 'spirituality', 'introspection'],
    overview: 'Life Path 7 is the path of the philosopher, analyst, and spiritual seeker. You are here to develop inner wisdom through study, contemplation, and the search for truth. You have a brilliant, analytical mind and an intuitive connection to deeper realities. Your life will require periods of solitude, study, and inner work. You are not satisfied with surface-level answers.',
    strengths: ['Analytical thinking', 'Intuition', 'Wisdom', 'Research ability', 'Depth'],
    challenges: ['Isolation', 'Skepticism', 'Secrecy', 'Emotional detachment'],
    careers: ['Researcher', 'Scientist', 'Philosopher', 'Analyst', 'Spiritual teacher'],
  },
  8: {
    title: 'The Achiever',
    keywords: ['power', 'abundance', 'achievement', 'authority'],
    overview: 'Life Path 8 is the path of material mastery, power, and achievement. You are here to learn the responsible use of money, authority, and influence. You have natural business acumen and the drive to build empires. Your life will present opportunities for great material success, but also tests around ethical use of power. The karmic lesson is that true abundance comes through integrity.',
    strengths: ['Business sense', 'Leadership', 'Ambition', 'Financial savvy', 'Resilience'],
    challenges: ['Workaholism', 'Materialism', 'Power struggles', 'Impatience'],
    careers: ['Business owner', 'Finance', 'Real estate', 'Law', 'Executive'],
  },
  9: {
    title: 'The Humanitarian',
    keywords: ['compassion', 'completion', 'wisdom', 'universal love'],
    overview: 'Life Path 9 is the path of the humanitarian, healer, and old soul. You are here to serve the greater good and complete a major life cycle. You have deep compassion, artistic talent, and wisdom born from many experiences. Your life will call you to release personal attachments and serve something larger than yourself. You attract people from all walks of life.',
    strengths: ['Compassion', 'Wisdom', 'Creativity', 'Charisma', 'Generosity'],
    challenges: ['Detachment', 'Resentment', 'Mood swings', 'Difficulty letting go'],
    careers: ['Philanthropist', 'Artist', 'Counsellor', 'Teacher', 'Healer'],
  },
  11: {
    title: 'The Intuitive (Master Number)',
    keywords: ['intuition', 'illumination', 'inspiration', 'spiritual messenger'],
    overview: 'Life Path 11 is a Master Number — the path of the spiritual messenger and intuitive visionary. You carry double the energy of the 2, amplified with spiritual insight and nervous sensitivity. You are here to channel higher wisdom into the material world through inspiration, teaching, or creative expression. The pressure of this path is intense — you may oscillate between brilliance and anxiety.',
    strengths: ['Psychic ability', 'Inspiration', 'Visionary thinking', 'Charisma', 'Sensitivity'],
    challenges: ['Nervous tension', 'Self-doubt', 'Impracticality', 'Overwhelm'],
    careers: ['Spiritual teacher', 'Psychologist', 'Artist', 'Inventor', 'Counsellor'],
  },
  22: {
    title: 'The Master Builder (Master Number)',
    keywords: ['master builder', 'large-scale vision', 'practical idealism', 'legacy'],
    overview: 'Life Path 22 is the most powerful Master Number — the Master Builder who turns dreams into reality on a massive scale. You carry double the energy of the 4, amplified with the vision of 11. You are here to build something that serves humanity — an institution, system, or movement that outlasts your lifetime. This is the most challenging path, requiring enormous discipline and vision.',
    strengths: ['Visionary leadership', 'Practical genius', 'Discipline', 'Large-scale thinking', 'Manifestation'],
    challenges: ['Enormous pressure', 'Workaholism', 'Frustration', 'Nervous exhaustion'],
    careers: ['Architect', 'CEO of large enterprise', 'Political leader', 'System designer', 'Philanthropist'],
  },
  33: {
    title: 'The Master Teacher (Master Number)',
    keywords: ['master healer', 'selfless service', 'cosmic parent', 'unconditional love'],
    overview: 'Life Path 33 is the rarest Master Number — the Master Teacher and cosmic healer. You carry double the energy of the 6, elevated to a universal level. You are here to uplift humanity through selfless devotion, healing, and unconditional love. This path is extraordinarily demanding — few live it fully. Most 33s will operate primarily on the 6 vibration with occasional flashes of 33 energy.',
    strengths: ['Unconditional love', 'Healing presence', 'Selfless service', 'Spiritual mastery', 'Devotion'],
    challenges: ['Martyrdom', 'Overwhelming responsibility', 'Self-neglect', 'Burnout'],
    careers: ['Spiritual healer', 'Teacher', 'Humanitarian leader', 'Therapist', 'Religious leader'],
  },
};

export const PERSONAL_YEAR_MEANINGS: Record<number, { title: string; theme: string; advice: string }> = {
  1: { title: 'New Beginnings', theme: 'Fresh starts, independence, planting seeds', advice: 'Start new projects. Assert yourself. This is Year 1 of a new 9-year cycle — what you initiate now sets the tone for the next 8 years.' },
  2: { title: 'Patience & Partnership', theme: 'Cooperation, relationships, gestation', advice: 'Be patient. Seeds planted last year need time. Focus on partnerships, diplomacy, and behind-the-scenes development.' },
  3: { title: 'Creative Expression', theme: 'Socializing, creativity, self-expression', advice: 'Express yourself! Write, create, network. Your social life expands and creative projects flourish. Joy and optimism are your allies.' },
  4: { title: 'Hard Work & Foundation', theme: 'Building, discipline, practical matters', advice: 'Buckle down and build. This is a year of discipline, organization, and laying foundations. Health and routine matter.' },
  5: { title: 'Change & Freedom', theme: 'Adventure, change, new experiences', advice: 'Expect the unexpected. Travel, explore, and embrace change. Old structures may fall away to make room for the new.' },
  6: { title: 'Love & Responsibility', theme: 'Home, family, relationships, service', advice: 'Focus on home, family, and relationships. Marriage, home purchases, and caregiving responsibilities often appear in a 6 year.' },
  7: { title: 'Inner Reflection', theme: 'Study, solitude, spiritual growth', advice: 'Go inward. Study, meditate, research. This is not the year for aggressive external action — it\'s for deepening understanding and spiritual growth.' },
  8: { title: 'Power & Abundance', theme: 'Achievement, money, authority', advice: 'Harvest time. Financial and career gains are possible now. Step into authority. What you\'ve built in years 1-7 now produces material results.' },
  9: { title: 'Completion & Release', theme: 'Endings, letting go, compassion', advice: 'Complete and release. Finish projects, end what no longer serves you, and give back. Clear the decks for the new cycle beginning next year.' },
};

export const LO_SHU_MISSING: Record<number, string> = {
  1: 'Missing 1: Difficulty with self-expression and communication. May struggle to articulate feelings. Need to develop confidence in sharing ideas.',
  2: 'Missing 2: Lack of sensitivity to others. May appear blunt or insensitive. Need to develop patience and empathy in relationships.',
  3: 'Missing 3: Difficulty with imagination and creative expression. May struggle with confidence. Need to develop creative outlets.',
  4: 'Missing 4: Lack of organization and practical planning. May be disorganized or impractical. Need to develop discipline and routine.',
  5: 'Missing 5: Difficulty with emotional balance and freedom. May feel restricted. Need to develop adaptability and embrace change.',
  6: 'Missing 6: Lack of domestic harmony and creative expression in home. May struggle with responsibility. Need to develop commitment.',
  7: 'Missing 7: Difficulty with personal sacrifice and learning from experience. May avoid introspection. Need to develop inner wisdom.',
  8: 'Missing 8: Lack of attention to detail and financial planning. May be careless with money. Need to develop organizational skills.',
  9: 'Missing 9: Lack of idealism and humanitarian concern. May be too focused on self. Need to develop compassion and global awareness.',
};

export const LO_SHU_PRESENT: Record<number, string> = {
  1: 'Number 1 present: Good communication ability. Can express thoughts and feelings clearly. Natural verbal ability.',
  2: 'Number 2 present: Strong intuition and sensitivity. Good at sensing others\' feelings. Natural empathy.',
  3: 'Number 3 present: Active imagination and intellectual ability. Good memory and creative thinking.',
  4: 'Number 4 present: Practical and organized. Good at planning and building structures. Attention to detail.',
  5: 'Number 5 present: Emotional depth and freedom-loving. Adaptable and versatile. Good at handling change.',
  6: 'Number 6 present: Creative and domestic. Good at creating beautiful environments. Strong sense of responsibility.',
  7: 'Number 7 present: Good at learning from experience. Personal growth through sacrifice. Spiritual awareness.',
  8: 'Number 8 present: Detail-oriented and financially aware. Good at managing resources and seeing the big picture.',
  9: 'Number 9 present: Idealistic and humanitarian. Concerned about the greater good. Ambitious and far-sighted.',
};

export function getLifePathMeaning(number: number): NumberMeaning | null {
  return LIFE_PATH_MEANINGS[number] ?? null;
}

export function getPersonalYearMeaning(number: number): { title: string; theme: string; advice: string } | null {
  return PERSONAL_YEAR_MEANINGS[number] ?? null;
}
