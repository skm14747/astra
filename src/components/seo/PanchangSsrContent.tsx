/**
 * Server-rendered educational content for the Panchang page.
 *
 * This component renders in the layout (server component), ensuring
 * Googlebot always sees substantive content even though the interactive
 * Panchang calculator is a client component that shows "Loading…" initially.
 *
 * Contains: five elements explanation, usage guide, and terminology.
 */
export default function PanchangSsrContent() {
  return (
    <section
      className="mx-auto max-w-5xl px-4 sm:px-6 pb-12"
      aria-label="About Hindu Panchang"
    >
      <div className="border-t border-white/[0.04] pt-8 space-y-8">
        {/* ── What is Panchang ─────────────────────────── */}
        <div>
          <h2 className="font-display text-lg font-semibold text-zinc-300 mb-3">
            What is Panchang? (पंचांग)
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl">
            Panchang (Sanskrit: पञ्चाङ्ग, &quot;five limbs&quot;) is the traditional
            Hindu lunisolar calendar and almanac. It tracks five astronomical
            elements — <strong className="text-zinc-400">Tithi</strong> (lunar
            day), <strong className="text-zinc-400">Vara</strong> (weekday),{' '}
            <strong className="text-zinc-400">Nakshatra</strong> (lunar
            mansion), <strong className="text-zinc-400">Yoga</strong> (Sun–Moon
            angular relationship), and{' '}
            <strong className="text-zinc-400">Karana</strong> (half-Tithi) — to
            determine auspicious and inauspicious times for ceremonies,
            business, travel, and daily activities. The Panchang has been the
            foundation of Hindu timekeeping for over 3,000 years, referenced in
            the Vedanga Jyotisha and Surya Siddhanta.
          </p>
        </div>

        {/* ── The Five Elements ────────────────────────── */}
        <div>
          <h3 className="text-base font-semibold text-zinc-300 mb-3">
            The Five Elements of Panchang
          </h3>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4">
              <dt className="font-semibold text-zinc-300 mb-1">1. Tithi (तिथि) — Lunar Day</dt>
              <dd className="text-zinc-500 leading-relaxed">
                A Tithi is one of 30 lunar days in a synodic month, defined by
                each 12° increase in the Moon–Sun elongation. There are 15
                Tithis in each Paksha (fortnight). Shukla Paksha (waxing) runs
                Pratipada to Purnima; Krishna Paksha (waning) runs Pratipada to
                Amavasya. Each Tithi has a ruling deity and specific
                auspiciousness for activities like fasting, charity, or travel.
              </dd>
            </div>
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4">
              <dt className="font-semibold text-zinc-300 mb-1">2. Vara (वार) — Weekday</dt>
              <dd className="text-zinc-500 leading-relaxed">
                The seven Varas correspond to the seven visible celestial bodies
                (Graha): Ravivara (Sunday/Sun), Somavara (Monday/Moon),
                Mangalavara (Tuesday/Mars), Budhavara (Wednesday/Mercury),
                Guruvara (Thursday/Jupiter), Shukravara (Friday/Venus), and
                Shanivara (Saturday/Saturn). Each Vara carries the energy of its
                ruling planet and affects daily activity timing.
              </dd>
            </div>
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4">
              <dt className="font-semibold text-zinc-300 mb-1">3. Nakshatra (नक्षत्र) — Lunar Mansion</dt>
              <dd className="text-zinc-500 leading-relaxed">
                The 27 Nakshatras divide the ecliptic into equal segments of
                13°20&apos; each. The Moon transits one Nakshatra roughly every day.
                Each Nakshatra has a ruling deity, planetary lord, and specific
                qualities that influence muhurta selection — for example,
                Rohini and Uttara Phalguni are considered highly auspicious for
                marriages.
              </dd>
            </div>
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4">
              <dt className="font-semibold text-zinc-300 mb-1">4. Yoga (योग) — Sun–Moon Combination</dt>
              <dd className="text-zinc-500 leading-relaxed">
                Yoga is calculated from the combined longitude of the Sun and
                Moon. There are 27 Yogas, each spanning 13°20&apos; of the combined
                arc. Yogas like Siddhi, Amrita, and Shubha are considered highly
                favorable, while Vishkambha and Vyaghata indicate obstacles.
                Yoga timing is critical for selecting auspicious moments.
              </dd>
            </div>
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4">
              <dt className="font-semibold text-zinc-300 mb-1">5. Karana (करण) — Half-Tithi</dt>
              <dd className="text-zinc-500 leading-relaxed">
                A Karana is half of a Tithi — there are 60 Karanas in a lunar
                month. Seven Karanas are &quot;Chara&quot; (movable) and repeat eight
                times, while four are &quot;Sthira&quot; (fixed) and occur once each.
                Karanas help fine-tune muhurta timing within a Tithi and are
                especially useful for short-duration activities.
              </dd>
            </div>
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4">
              <dt className="font-semibold text-zinc-300 mb-1">Rahu Kalam &amp; Gulika Kalam</dt>
              <dd className="text-zinc-500 leading-relaxed">
                Rahu Kalam is an inauspicious 90-minute period each day ruled by
                Rahu, calculated by dividing the day into eight equal parts.
                Gulika Kalam (Saturn&apos;s period) and Yamaganda (Jupiter&apos;s adverse
                period) are similarly computed. These periods are avoided for
                starting new ventures, signing contracts, or beginning journeys.
              </dd>
            </div>
          </dl>
        </div>

        {/* ── How to Use ──────────────────────────────── */}
        <div>
          <h3 className="text-base font-semibold text-zinc-300 mb-3">
            How to Use Today&apos;s Panchang
          </h3>
          <ol className="list-decimal list-inside text-sm text-zinc-500 leading-relaxed max-w-3xl space-y-2">
            <li>
              <strong className="text-zinc-400">Check the Tithi</strong> — certain Tithis
              like Ekadashi (11th), Purnima (full moon), and Amavasya (new
              moon) have specific religious observances and fasting rules.
            </li>
            <li>
              <strong className="text-zinc-400">Note the Nakshatra</strong> — the
              Moon&apos;s Nakshatra affects emotional energy and is key for
              muhurta selection. Fixed Nakshatras (Rohini, Uttara group) favor
              permanent activities; movable ones favor travel and change.
            </li>
            <li>
              <strong className="text-zinc-400">Avoid Rahu Kalam</strong> — do
              not start important work, sign documents, or begin travel during
              Rahu Kalam. This period changes daily based on the weekday.
            </li>
            <li>
              <strong className="text-zinc-400">Use Choghadiya for quick timing</strong> — the{' '}
              <a href="/vedic/choghadiya/" className="text-violet-400 hover:text-violet-300 underline">
                Choghadiya calculator
              </a>{' '}
              divides day and night into auspicious/inauspicious windows of
              approximately 1.5 hours each.
            </li>
            <li>
              <strong className="text-zinc-400">Cross-reference with Muhurta</strong> — for
              important life events (marriage, griha pravesh, naming ceremony),
              use the{' '}
              <a href="/vedic/muhurta/" className="text-violet-400 hover:text-violet-300 underline">
                Shubh Muhurat Finder
              </a>{' '}
              which analyzes all Panchang elements together.
            </li>
          </ol>
        </div>

        {/* ── Calculation Method ──────────────────────── */}
        <div>
          <h3 className="text-base font-semibold text-zinc-300 mb-3">
            Our Calculation Method
          </h3>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl">
            Astra Destiny&apos;s Panchang uses the Swiss Ephemeris (based on NASA
            JPL DE431) for planetary positions with sub-arc-second precision.
            Sunrise and sunset are calculated using the apparent solar disc
            center with standard atmospheric refraction (34 arcminutes). The
            Lahiri Ayanamsa is applied by default for sidereal corrections,
            with support for Krishnamurti, Raman, and other Ayanamsa systems.
            All calculations run entirely in your browser — no birth data is
            sent to any server.
          </p>
        </div>
      </div>
    </section>
  );
}
