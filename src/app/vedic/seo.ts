import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astra.goeasytool.com';

export type VedicPageSeo = {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  seoIntro: {
    heading: string;
    text: string;
  };
};

export const VEDIC_SEO: Record<string, VedicPageSeo> = {
  kundli: {
    title: 'Free Kundli — Vedic Birth Chart Calculator Online',
    description:
      'Generate your free Kundli (Vedic birth chart) with Ascendant, planetary positions, house cusps, and Moolatrikona analysis. NASA-precision sidereal calculations with Lahiri Ayanamsa.',
    canonical: '/vedic/kundli',
    keywords: ['free kundli', 'birth chart calculator', 'vedic birth chart', 'lagna chart', 'janam kundli'],
    seoIntro: {
      heading: 'What is a Kundli?',
      text: 'A Kundli (also called Janam Kundli or Vedic birth chart) is a map of the sky at the exact moment of your birth. It shows the positions of the Sun, Moon, and planets across the 12 zodiac signs and houses. In Vedic astrology (Jyotish), the Kundli is the foundation for all predictions — from personality traits to life events, career timing, and relationship compatibility. Our calculator uses NASA JPL DE-series ephemeris for sub-arc-second precision and the Lahiri Ayanamsa for sidereal corrections, matching the standards used by the Indian Astronomical Ephemeris.',
    },
  },
  divisional: {
    title: 'Divisional Charts — D1 to D60 Varga Calculator',
    description:
      'Calculate all 16 Varga divisional charts (D1–D60) including Navamsa D9, Dasamsa D10, and Dwadasamsa D12. Understand career, marriage, and spiritual potential through Parashari Varga charts.',
    canonical: '/vedic/divisional',
    keywords: ['divisional charts', 'navamsa calculator', 'varga charts', 'D9 chart', 'dasamsa D10'],
    seoIntro: {
      heading: 'What are Divisional Charts (Varga)?',
      text: 'Divisional charts (Varga Kundli) are sub-divisions of the birth chart described by Maharishi Parashara in BPHS. Each division zooms into a specific area of life: the Navamsa (D9) reveals marriage and dharma, the Dasamsa (D10) shows career and public life, and the Dwadasamsa (D12) indicates ancestral karma. There are 16 primary divisions (Shodasha Varga) used for Vimsopaka Bala strength assessment. This calculator generates all charts with correct Parashari division rules.',
    },
  },
  yogas: {
    title: 'Yoga & Dosha Calculator — Raja Yoga, Kaal Sarp Dosha',
    description:
      'Detect all major Yogas (Raja, Dhana, Pancha Mahapurusha, Gajakesari) and Doshas (Manglik, Kaal Sarp, Pitra) in your Vedic birth chart with BPHS-accurate rules.',
    canonical: '/vedic/yogas',
    keywords: ['yoga calculator', 'raja yoga', 'kaal sarp dosha', 'manglik dosha', 'gajakesari yoga'],
    seoIntro: {
      heading: 'What are Yogas and Doshas?',
      text: 'Yogas are specific planetary combinations that produce auspicious or inauspicious results in a birth chart. Raja Yoga (royal combination) can indicate fame and authority, while Dhana Yoga signals wealth accumulation. Doshas are afflictions — Manglik Dosha (Mars in certain houses) affects marriage compatibility, Kaal Sarp Dosha (all planets hemmed between Rahu-Ketu) creates recurring life obstacles, and Pitra Dosha indicates ancestral karma. Our engine checks 60+ Yoga patterns and all major Doshas following BPHS and Uttara Kalamrita rules.',
    },
  },
  remedies: {
    title: 'Vedic Astrology Remedies — Gemstones, Mantras & Rudraksha',
    description:
      'Get personalized Vedic remedies based on your chart — gemstones, mantras, Rudraksha, charity, fasting days, and Stotra recommendations for each planet affliction.',
    canonical: '/vedic/remedies',
    keywords: ['vedic remedies', 'astrology gemstones', 'mantra for planets', 'rudraksha recommendation'],
    seoIntro: {
      heading: 'Vedic Astrological Remedies',
      text: 'Vedic astrology prescribes specific remedies (Upaya) to strengthen weak planets and mitigate afflictions. These include wearing gemstones on the correct finger and metal, chanting Beej Mantras and Stotras a prescribed number of times, wearing the appropriate Mukhi Rudraksha, performing charity on specific days, and observing fasts. Our system analyzes your chart for debilitated, combust, or afflicted planets and generates a complete remedial prescription following traditional Jyotish guidelines.',
    },
  },
  dashas: {
    title: 'Vimshottari Dasha Calculator — Mahadasha Timeline',
    description:
      'Calculate your complete Vimshottari Dasha timeline with Mahadasha, Antardasha, and Pratyantardasha periods. Also includes Yogini and Ashtottari Dasha systems.',
    canonical: '/vedic/dashas',
    keywords: ['vimshottari dasha calculator', 'mahadasha', 'antardasha', 'dasha timeline', 'yogini dasha'],
    seoIntro: {
      heading: 'What is Vimshottari Dasha?',
      text: 'The Vimshottari Dasha system is the most widely used timing technique in Vedic astrology. It divides life into 120 years governed by 9 planetary periods (Mahadasha), each further divided into sub-periods (Antardasha) and sub-sub-periods (Pratyantardasha). The starting planet is determined by your birth Nakshatra. Each Dasha activates the houses and signs ruled by that planet, triggering specific life events. This tool calculates all three levels of Dasha with exact dates, plus Yogini Dasha (36-year cycle) and Ashtottari Dasha (108-year cycle) alternatives.',
    },
  },
  transits: {
    title: 'Saturn Transit & Sade Sati Calculator',
    description:
      'Track real-time planetary transits (Gochar) with Sade Sati detection, Ashtakavarga transit strength, and major transit event predictions for Saturn, Jupiter, Rahu & Ketu.',
    canonical: '/vedic/transits',
    keywords: ['sade sati calculator', 'saturn transit', 'planetary transit', 'gochar', 'jupiter transit'],
    seoIntro: {
      heading: 'Understanding Transits (Gochar)',
      text: 'Transits (Gochar) track current planetary positions relative to your birth chart. Saturn\'s 7.5-year Sade Sati (transit through the 12th, 1st, and 2nd houses from natal Moon) is the most feared transit period, bringing challenges and transformation. Jupiter transits bring expansion and opportunity every 12 years. Rahu-Ketu transits (18-month cycles) activate karmic patterns. Our transit tracker uses real-time NASA ephemeris positions and evaluates transit strength through Ashtakavarga Bindu scores.',
    },
  },
  nakshatra: {
    title: 'Nakshatra Finder — Birth Star Analysis',
    description:
      'Find your birth Nakshatra (lunar mansion) with Pada, deity, Gana, Nadi, animal symbol, and Tara Bala analysis. All 27 Nakshatras with detailed interpretations.',
    canonical: '/vedic/nakshatra',
    keywords: ['nakshatra finder', 'birth star', 'lunar mansion', 'tara bala', 'nakshatra compatibility'],
    seoIntro: {
      heading: 'What is a Nakshatra?',
      text: 'Nakshatras are the 27 lunar mansions of Vedic astrology, each spanning 13°20\' of the zodiac. Your birth Nakshatra (determined by the Moon\'s position) reveals your emotional nature, instinctive reactions, and deep personality traits. Each Nakshatra has a ruling deity, planetary lord, Gana (temperament), Nadi (pulse), and animal symbol used in compatibility matching. Tara Bala (star strength) analysis compares your birth Nakshatra against current transiting Nakshatra to determine daily auspiciousness.',
    },
  },
  kp: {
    title: 'KP System — Krishnamurti Paddhati Sub-Lord Calculator',
    description:
      'Calculate KP System sub-lords, significators, and ruling planets. Krishnamurti Paddhati analysis with house cusps using Placidus system and KP Ayanamsa.',
    canonical: '/vedic/kp',
    keywords: ['kp system', 'sub lord calculator', 'krishnamurti paddhati', 'kp astrology', 'ruling planets'],
    seoIntro: {
      heading: 'What is the KP System?',
      text: 'The Krishnamurti Paddhati (KP System) is a modern refinement of Vedic astrology developed by Prof. K.S. Krishnamurti. It divides each Nakshatra into 9 sub-divisions governed by Vimshottari Dasha lords, creating a finer 249-level zodiac segmentation. The Sub-Lord of a house cusp determines whether that house\'s significations will manifest. KP System uses Placidus house cusps (unlike Vedic equal houses) and its own Ayanamsa. It\'s especially prized for precise event timing and horary (Prashna) astrology.',
    },
  },
  panchang: {
    title: "Today's Panchang — Tithi, Nakshatra & Muhurta",
    description:
      "Get today's Hindu Panchang with Tithi, Nakshatra, Yoga, Karana, and Vara. Includes sunrise/sunset times, Rahu Kalam, Gulika Kalam, and auspicious/inauspicious periods.",
    canonical: '/vedic/panchang',
    keywords: ['today panchang', 'daily panchang', 'tithi today', 'rahu kalam', 'hindu calendar'],
    seoIntro: {
      heading: "Today's Hindu Panchang",
      text: 'The Panchang is the traditional Hindu almanac based on five elements (Pancha Anga): Tithi (lunar day), Vara (weekday), Nakshatra (lunar mansion), Yoga (Sun-Moon angular relationship), and Karana (half-Tithi). It has been used for millennia to determine auspicious and inauspicious times for ceremonies, travel, and daily activities. Our Panchang calculates all five elements plus Rahu Kalam (inauspicious Saturn-ruled period), Gulika Kalam, Yamaganda, and Abhijit Muhurta for any date and location.',
    },
  },
  muhurta: {
    title: 'Muhurta Finder — Auspicious Time Calculator',
    description:
      'Find the best Muhurta (auspicious timing) for marriage, griha pravesh, travel, business start, and 20+ activities based on Tithi, Nakshatra, Yoga, and planetary transits.',
    canonical: '/vedic/muhurta',
    keywords: ['muhurta finder', 'shubh muhurat', 'auspicious time', 'marriage muhurta', 'griha pravesh muhurta'],
    seoIntro: {
      heading: 'What is Muhurta?',
      text: 'Muhurta (Electional Astrology) is the science of choosing the most auspicious moment to begin an important activity. Vedic Muhurta considers the Tithi, Nakshatra, Yoga, Karana, Vara, and planetary positions to find windows of maximal cosmic support. Key rules include avoiding Rahu Kalam and Gulika periods, selecting favorable Nakshatras for specific activities, and ensuring strong Lagna and benefic transits. Our Muhurta Finder scans upcoming time windows and rates them for 20+ activity types.',
    },
  },
  ashtakavarga: {
    title: 'Ashtakavarga Calculator — BAV & SAV Bindus',
    description:
      'Calculate Ashtakavarga scores with Bhinna (BAV) and Sarva (SAV) Ashtakavarga Bindu tables for all 7 planets. Identify strong and weak houses for transit predictions.',
    canonical: '/vedic/ashtakavarga',
    keywords: ['ashtakavarga calculator', 'BAV SAV', 'bindu points', 'ashtakavarga chart'],
    seoIntro: {
      heading: 'What is Ashtakavarga?',
      text: 'Ashtakavarga is a quantitative scoring system from BPHS that assigns Bindu (benefic points) to each sign from each planet and the Ascendant. The Bhinna Ashtakavarga (BAV) shows individual planet contributions (0-8 points per sign), while the Sarva Ashtakavarga (SAV) sums all contributions (0-56 per sign). Signs with high SAV scores (28+) give strong transit results; low scores (<25) indicate challenging transit periods. Ashtakavarga is essential for predicting the actual impact of planetary transits.',
    },
  },
  compatibility: {
    title: 'Kundli Milan — Free Ashtakoota Matching (36 Points)',
    description:
      'Free Kundli Milan with Ashtakoota (8-factor) compatibility matching. Check Nadi, Bhakoot, Gana, Maitri, Yoni, Tara, Vashya & Varna scores out of 36 points.',
    canonical: '/vedic/compatibility',
    keywords: ['kundli milan', 'ashtakoota matching', 'marriage compatibility', 'guna milan', 'horoscope matching'],
    seoIntro: {
      heading: 'What is Kundli Milan?',
      text: 'Kundli Milan (Ashtakoota Guna Matching) is the traditional Vedic method for assessing marriage compatibility between two horoscopes. It evaluates 8 factors (Kootas): Varna (spiritual compatibility, 1 point), Vashya (mutual attraction, 2 points), Tara (birth star harmony, 3 points), Yoni (sexual compatibility, 4 points), Graha Maitri (mental compatibility, 5 points), Gana (temperament, 6 points), Bhakoot (health & wealth, 7 points), and Nadi (health & genes, 8 points). A score of 18+ out of 36 is considered acceptable for marriage.',
    },
  },
  shadbala: {
    title: 'Shadbala Calculator — Planetary Strength Analysis',
    description:
      'Calculate the six-fold strength (Shadbala) of each planet — Sthana, Dig, Kala, Cheshta, Naisargika, and Drig Bala — in Shashtiamsas. Includes Ishta/Kashta Phala and Vimsopaka Bala.',
    canonical: '/vedic/shadbala',
    keywords: ['shadbala calculator', 'planetary strength', 'shashtiamsa', 'ishta phala', 'vimsopaka bala'],
    seoIntro: {
      heading: 'What is Shadbala?',
      text: 'Shadbala (six-fold strength) is the most comprehensive planetary strength assessment in Vedic astrology, described in detail in BPHS chapters 27-28. It measures six types of strength: Sthana Bala (positional — exaltation, own sign, Moolatrikona), Dig Bala (directional — angular houses), Kala Bala (temporal — day/night, year lord, hora), Cheshta Bala (motional — speed and retrograde), Naisargika Bala (natural — Sun is strongest, Saturn weakest), and Drig Bala (aspectual — benefic/malefic aspects). Planets must meet minimum strength thresholds in Shashtiamsas (60ths) to deliver their full promise.',
    },
  },
  jaimini: {
    title: 'Jaimini Astrology — Chara Karakas & Chara Dasha',
    description:
      'Explore Jaimini Astrology with 7 Chara Karakas (Atmakaraka to Darakaraka), Karakamsha Lagna, Rashi Drishti, and Chara Dasha timing system.',
    canonical: '/vedic/jaimini',
    keywords: ['jaimini astrology', 'chara karaka', 'atmakaraka', 'karakamsha', 'chara dasha'],
    seoIntro: {
      heading: 'What is Jaimini Astrology?',
      text: 'Jaimini Sutras present a parallel system of Vedic astrology attributed to Sage Jaimini (disciple of Vyasa). Unlike Parashari astrology which focuses on planets, Jaimini emphasizes signs (Rashi) and their lords. The 7 Chara Karakas are planets ranked by degree — Atmakaraka (highest degree) represents the soul, Amatyakaraka represents career, and Darakaraka (lowest) represents spouse. Karakamsha (Atmakaraka\'s Navamsa sign in the birth chart) reveals spiritual purpose and career direction. Chara Dasha provides sign-based timing periods unique to this system.',
    },
  },
  career: {
    title: 'Career Astrology — 10th House & D10 Analysis',
    description:
      'Analyze career potential through 10th house significations, Dasamsa (D10) chart, 10th lord placement, and career-indicating planet combinations.',
    canonical: '/vedic/career',
    keywords: ['career astrology', '10th house', 'dasamsa chart', 'job prediction', 'profession astrology'],
    seoIntro: {
      heading: 'Career Analysis in Vedic Astrology',
      text: 'Career analysis in Vedic astrology examines the 10th house (Karma Bhava), its lord, planets placed there, and the Dasamsa (D10) divisional chart. The 10th house represents public life, profession, authority, and reputation. Key indicators include the 10th lord\'s sign placement, aspects from benefics/malefics, and Dasha timing for career changes. The Amatyakaraka (Jaimini career significator), strong planets in the D10, and Shadbala strength of the 10th lord all contribute to a comprehensive career prediction.',
    },
  },
  wealth: {
    title: 'Wealth Astrology — Dhana Yoga & Indu Lagna',
    description:
      'Analyze wealth potential with Dhana Yogas, Indu Lagna (wealth ascendant), 2nd/11th house analysis, and financial timing through Dasha periods.',
    canonical: '/vedic/wealth',
    keywords: ['wealth astrology', 'dhana yoga', 'indu lagna', 'financial astrology', 'money prediction'],
    seoIntro: {
      heading: 'Wealth Analysis in Vedic Astrology',
      text: 'Vedic astrology assesses wealth potential through the 2nd house (accumulated wealth), 11th house (income and gains), and their lords. Dhana Yogas are specific combinations between lords of wealth houses (1, 2, 5, 9, 11) that indicate financial prosperity. Indu Lagna (from Uttara Kalamrita) is a special wealth ascendant calculated from the 9th lords of the Ascendant and Moon, revealing the magnitude of wealth. Lakshmi Yoga and other prosperity indicators combine with Dasha timing to predict when wealth will manifest.',
    },
  },
  health: {
    title: 'Health & Longevity — Ayush & Maraka Analysis',
    description:
      'Assess health and longevity through Ayush (lifespan) tiers, Maraka (death-inflicting) lords, Badhaka planets, and vulnerable body areas mapped from house significations.',
    canonical: '/vedic/health',
    keywords: ['health astrology', 'longevity prediction', 'maraka lord', 'ayush calculator', 'medical astrology'],
    seoIntro: {
      heading: 'Health & Longevity in Vedic Astrology',
      text: 'Health analysis in Vedic astrology examines the 1st house (constitution), 6th house (diseases), 8th house (longevity), and their lords. Ayush (lifespan) is classified into Balarishta (infant risk), Alpa Ayu (short), Madhya Ayu (medium), and Purna Ayu (full life) based on the 8th house, its lord, and Saturn\'s condition. Maraka lords (2nd and 7th house rulers) are timing indicators for health crises. Badhaka planets create hidden obstructions. Each house maps to specific body parts, allowing identification of vulnerable health areas.',
    },
  },
  predictions: {
    title: 'Varshaphal — Annual Horoscope Predictions',
    description:
      'Calculate your Varshaphal (annual chart / Solar Return) with Muntha progression, Year Lord, and Tajaka Yogas for detailed yearly predictions.',
    canonical: '/vedic/predictions',
    keywords: ['varshaphal', 'annual horoscope', 'solar return', 'yearly prediction', 'tajaka yoga'],
    seoIntro: {
      heading: 'What is Varshaphal?',
      text: 'Varshaphal (Tajaka annual chart) is a Solar Return chart cast for the exact moment the Sun returns to its natal position each year. Derived from Tajaka Shastra (Indo-Persian tradition), it provides detailed predictions for the year ahead. Key components include the Muntha (a progressed point advancing one sign per year), the Year Lord (Varsha Pati — the planet ruling the year), and Tajaka Yogas (annual combination patterns like Ithasala, Ishrafa, and Kamboola). This system complements Vimshottari Dasha for fine-grained annual predictions.',
    },
  },
  nadi: {
    title: 'Nadi Astrology — Bhrigu Bindu Calculator',
    description:
      'Calculate Nadi Astrology points — Bhrigu Bindu, Pranapada Lagna, Gulika, Mandi, and Nadi Amsha (D150). Transit triggers for major life events.',
    canonical: '/vedic/nadi',
    keywords: ['nadi astrology', 'bhrigu bindu', 'pranapada lagna', 'gulika', 'nadi amsha'],
    seoIntro: {
      heading: 'What is Nadi Astrology?',
      text: 'Nadi Astrology encompasses several specialized techniques from the Bhrigu and Dhruva Nadi traditions of South India. The Bhrigu Bindu is the sensitive midpoint of Rahu and Moon — when transiting Jupiter or Saturn crosses this degree, major life events are triggered. Pranapada Lagna (vital breath ascendant) provides additional timing information. Gulika and Mandi are mathematical shadow points derived from Saturn that indicate karmic challenges. The Nadi Amsha (D150) is the finest divisional chart used for extremely detailed delineation.',
    },
  },
};

export function buildVedicMetadata(slug: string): Metadata {
  const seo = VEDIC_SEO[slug];
  if (!seo) return {};
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: seo.canonical },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: seo.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/og-image.png'],
    },
  };
}
