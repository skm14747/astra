import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Astrology Calculation Methods & Accuracy',
  description: 'How Astra Destiny calculates Vedic astrology charts — our ephemeris sources, ayanamsa choice, house systems, Yoga/Dosha detection rules, and why results may differ between calculators.',
  alternates: {
    canonical: '/methodology',
    languages: { 'en': '/methodology', 'hi': '/hi/methodology', 'x-default': '/methodology' },
  },
  openGraph: {
    title: 'Astrology Calculation Methods & Accuracy | Astra Destiny',
    description: 'Technical details on how Astra Destiny computes Vedic birth charts, planetary positions, and astrological analyses.',
    url: '/methodology',
    type: 'article',
  },
};

export default function MethodologyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-8 space-y-8">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Methodology', href: '/methodology' }]} />

      <header>
        <div className="zodiac-divider mb-4">
          <span className="text-xs text-violet-400/40">⚙ ☉ ⚙</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
          How Astra Destiny&apos;s Calculations Work
        </h1>
        <p className="text-zinc-400 mt-2">
          Calculation systems, data sources, assumptions, and why results may differ between astrology software.
        </p>
      </header>

      <div className="prose prose-invert prose-zinc max-w-none prose-headings:font-display prose-headings:text-zinc-200 prose-p:text-zinc-400 prose-p:leading-relaxed prose-li:text-zinc-400 prose-strong:text-zinc-200 prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline prose-table:text-sm prose-th:text-zinc-300 prose-td:text-zinc-400">
        <h2>Planetary Ephemeris</h2>
        <p>
          All planetary positions in Astra Destiny are computed using the <strong>NASA JPL Development Ephemeris
          (DE-series)</strong>. This is the same ephemeris data used by NASA for spacecraft navigation and by
          professional observatories worldwide. It provides sub-arc-second accuracy for planetary longitudes
          — far exceeding the requirements of astrological calculation.
        </p>
        <p>
          The ephemeris computes the geocentric (Earth-centered) positions of the Sun, Moon, and planets
          (Mercury through Pluto), plus the true lunar nodes (Rahu and Ketu). All positions are computed for
          the Terrestrial Time (TT) corresponding to the user&apos;s input date and time, with ΔT corrections applied.
        </p>

        <h2>Ayanamsa (Precession Correction)</h2>
        <p>
          Vedic astrology uses the <strong>sidereal zodiac</strong>, which tracks the actual positions of
          constellations. Western astrology uses the tropical zodiac, fixed to the seasons (vernal equinox).
          The difference between the two is called the <strong>Ayanamsa</strong> and is approximately 24° as of 2026.
        </p>
        <p>
          Astra Destiny uses the <strong>Lahiri (Chitrapaksha) Ayanamsa</strong> as the default. This is:
        </p>
        <ul>
          <li>The official standard of the <strong>Indian Astronomical Ephemeris</strong> (published by the Government of India)</li>
          <li>The most widely used Ayanamsa in North Indian and South Indian Jyotish practice</li>
          <li>Defined such that the star Spica (Chitra) is at exactly 0° Libra</li>
        </ul>
        <p>
          For KP System calculations, the KP Ayanamsa (based on the theories of Prof. K.S. Krishnamurti) is used,
          which differs from Lahiri by a small fraction.
        </p>

        <h2>House Systems</h2>
        <table>
          <thead>
            <tr><th>System</th><th>Used For</th><th>Method</th></tr>
          </thead>
          <tbody>
            <tr><td>Equal Houses</td><td>Vedic (Parashari, Jaimini)</td><td>Each house spans exactly 30° from the Ascendant degree</td></tr>
            <tr><td>Whole Sign</td><td>Vedic (traditional)</td><td>Each sign = one house, starting from Ascendant sign</td></tr>
            <tr><td>Placidus</td><td>KP System</td><td>Time-based division of the ecliptic using semi-arcs</td></tr>
          </tbody>
        </table>
        <p>
          The default Vedic analysis uses the <strong>Equal House</strong> system, which is the standard in most
          Indian Jyotish practice. The <Link href="/vedic/kp">KP System</Link> module switches to Placidus cusps
          as required by that methodology.
        </p>

        <h2>Classical Text References</h2>
        <p>Our astrological algorithms are derived from these primary classical sources:</p>
        <ul>
          <li><strong>Brihat Parashara Hora Shastra (BPHS)</strong> — The foundational text of Parashari astrology. Used for Yoga rules, Dosha definitions, Shadbala formulas, Dasha systems, and divisional chart (Varga) calculations.</li>
          <li><strong>Uttara Kalamrita</strong> — By Kalidasa. Referenced for Indu Lagna (wealth ascendant), additional Yoga definitions, and planetary significations.</li>
          <li><strong>Saravali</strong> — By Kalyana Varma. Used for planetary combination interpretations and house significations.</li>
          <li><strong>Jataka Parijata</strong> — Referenced for Dosha cancellation conditions and refined Yoga rules.</li>
          <li><strong>Jaimini Sutras</strong> — For Chara Karaka computation, Rashi Drishti, and Chara Dasha system.</li>
          <li><strong>Tajaka Neelakanthi</strong> — For Varshaphal (annual chart) and Tajaka Yoga rules.</li>
        </ul>

        <h2>Specific Calculation Methods</h2>

        <h3>Nakshatra & Pada</h3>
        <p>
          The 27 Nakshatras each span 13°20&apos; of the sidereal zodiac. Each is divided into 4 Padas of 3°20&apos;.
          The Moon&apos;s Nakshatra determines the starting Dasha in Vimshottari, and is crucial for compatibility
          matching (Ashtakoota).
        </p>

        <h3>Vimshottari Dasha</h3>
        <p>
          The 120-year cycle is computed from the Moon&apos;s progress through its birth Nakshatra. The balance
          of the first Mahadasha equals the remaining portion of the Nakshatra multiplied by the Dasha lord&apos;s
          total period. Antardashas and Pratyantardashas are computed by proportional subdivision.
        </p>

        <h3>Yoga & Dosha Detection</h3>
        <p>
          We detect 20+ auspicious Yogas and 12+ Doshas following BPHS rules. Each Yoga has specific formation
          conditions (e.g., Raja Yoga requires Kendra + Trikona lordship conjunction) and is classified by strength
          (Strong, Medium, Weak) based on planetary dignity and house placement.
        </p>

        <h3>Ashtakavarga</h3>
        <p>
          The Bhinna Ashtakavarga (BAV) tables follow the 8-source Bindu contribution rules from BPHS Chapter 66.
          Sarva Ashtakavarga (SAV) is the sum of all 7 planetary BAV tables, always totaling 337 Bindus.
        </p>

        <h3>Shadbala</h3>
        <p>
          Six-fold strength computation follows BPHS Chapters 27-28: Sthana Bala (positional), Dig Bala (directional),
          Kala Bala (temporal), Cheshta Bala (motional), Naisargika Bala (natural), and Drig Bala (aspectual).
          Results are expressed in Shashtiamsas (60ths) with standard minimum thresholds per planet.
        </p>

        <h2>Why Results May Differ Between Calculators</h2>
        <p>
          If you compare Astra Destiny&apos;s output with another astrology software, you may find minor
          differences due to:
        </p>
        <ul>
          <li><strong>Ayanamsa choice</strong> — Lahiri, KP, Raman, and Yukteswar Ayanamsas can differ by 1-2°, enough to change Rashi/Nakshatra boundaries for planets near cusp degrees.</li>
          <li><strong>Ephemeris source</strong> — Swiss Ephemeris (used by many programs) and JPL DE-series produce slightly different results for distant historical dates.</li>
          <li><strong>ΔT (Delta T) value</strong> — The correction between Terrestrial Time and Universal Time affects positions for historical dates.</li>
          <li><strong>Geocoding differences</strong> — The latitude/longitude used for a city name may differ between databases.</li>
          <li><strong>Timezone handling</strong> — Historical timezone data, especially for Indian cities before 1947, varies between sources.</li>
          <li><strong>Rounding</strong> — Some software rounds to the nearest degree; Astra Destiny preserves full precision.</li>
        </ul>

        <h2>Open Approach</h2>
        <p>
          We believe in transparency. Our <Link href="/vedic/report">Full Report</Link> tool shows every
          intermediate calculation step, not just final results. If you find a discrepancy or believe a
          calculation is incorrect, please <Link href="/about">contact us</Link> with specific details
          so we can investigate.
        </p>
      </div>
    </article>
  );
}
