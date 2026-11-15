const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

const CONTENT = `# Astra — Free Vedic Astrology Calculator

> Free Vedic astrology calculator with 205 Jyotish tools. Kundli, Dasha timelines, Yogas, Nakshatra analysis, Kundli Milan, Panchang, Muhurta, and Matrix of Destiny. Built on BPHS & NASA-precision astronomy.

## About

Astra is a comprehensive Vedic astrology (Jyotish) web application that runs entirely in the browser. It uses NASA JPL DE-series ephemeris for sub-arc-second planetary precision and the Lahiri Ayanamsa (Chitrapaksha) for sidereal corrections.

All calculations happen client-side — no data is sent to any server.

## Key Features

- **Birth Chart (Kundli):** Complete Vedic birth chart with planetary positions, houses, nakshatras, dignities, and combustion analysis
- **Dasha Timeline:** Vimshottari (120-year), Yogini (36-year), and Ashtottari (108-year) Dasha systems with Mahadasha, Antardasha, and Pratyantardasha
- **Yogas & Doshas:** 20+ Yogas (Raja, Gajakesari, Pancha Mahapurusha, Dhana, Lakshmi) and 12+ Doshas (Kaal Sarp, Manglik, Pitra, Kemadruma)
- **Kundli Milan:** 36-point Ashtakoota marriage compatibility matching with Mangal Dosha check
- **Daily Panchang:** Tithi, Nakshatra, Yoga, Karana, Vara plus Rahu Kalam, Gulika Kalam, Abhijit Muhurta
- **Muhurta Finder:** Auspicious timing for 20+ activities based on Tithi, Nakshatra, Yoga, and planetary transits
- **Transits:** Sade Sati detection, transit scores, double transit, and Ashtakavarga transit strength
- **Shadbala:** Six-fold planetary strength (Sthana, Dig, Kala, Cheshta, Naisargika, Drig) with Ishta/Kashta Phala
- **Jaimini:** Chara Karakas, Karakamsha, Rashi Drishti, Chara Dasha
- **Nadi:** Bhrigu Bindu, Pranapada Lagna, Gulika, Mandi, Nadi Amsha (D150)
- **Divisional Charts:** All 20 Varga charts from D1 to D60
- **Ashtakavarga:** Bhinna (BAV) and Sarva (SAV) Ashtakavarga Bindu tables
- **KP System:** Krishnamurti Paddhati sub-lord calculator
- **Applied Analysis:** Career, Wealth, and Health analysis
- **Vedic Remedies:** Gemstones, Mantras, Rudraksha, Charity, Fasting, Stotra recommendations
- **Matrix of Destiny:** Personal octagram with 22 Major Arcana energies, health card, life timeline, and compatibility

## Pages

- Homepage: ${BASE_URL}
- Kundli: ${BASE_URL}/vedic/kundli
- Dasha Timeline: ${BASE_URL}/vedic/dashas
- Yogas & Doshas: ${BASE_URL}/vedic/yogas
- Kundli Milan: ${BASE_URL}/vedic/compatibility
- Daily Panchang: ${BASE_URL}/vedic/panchang
- Muhurta Finder: ${BASE_URL}/vedic/muhurta
- Transits: ${BASE_URL}/vedic/transits
- Shadbala: ${BASE_URL}/vedic/shadbala
- Jaimini: ${BASE_URL}/vedic/jaimini
- Nadi: ${BASE_URL}/vedic/nadi
- Divisional Charts: ${BASE_URL}/vedic/divisional
- Ashtakavarga: ${BASE_URL}/vedic/ashtakavarga
- KP System: ${BASE_URL}/vedic/kp
- Nakshatra: ${BASE_URL}/vedic/nakshatra
- Career: ${BASE_URL}/vedic/career
- Wealth: ${BASE_URL}/vedic/wealth
- Health: ${BASE_URL}/vedic/health
- Predictions: ${BASE_URL}/vedic/predictions
- Remedies: ${BASE_URL}/vedic/remedies
- Full Report: ${BASE_URL}/vedic/report
- Matrix of Destiny: ${BASE_URL}/matrix/chart
- Matrix Health: ${BASE_URL}/matrix/health
- Matrix Timeline: ${BASE_URL}/matrix/timeline
- Matrix Compatibility: ${BASE_URL}/matrix/compatibility
- How It Works: ${BASE_URL}/how-it-works

## Full Documentation

For the complete tool inventory with all 205 calculations: ${BASE_URL}/llms-full.txt
`;

export function GET() {
  return new Response(CONTENT.trim(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
