import Link from '@/components/shared/LocaleLink';

export default function Article() {
  return (
    <>
      <p>
        The <strong>Vimshottari Dasha</strong> system is the most widely used timing technique in Vedic astrology. It
        divides the entire human lifespan into a 120-year cycle governed by the 9 planets (Navagraha), revealing
        precisely <em>when</em> the promises in your birth chart will manifest. Maharishi Parashara recommended this
        system in Brihat Parashara Hora Shastra (BPHS) as the primary tool for event timing.
      </p>

      <h2>How Vimshottari Dasha is Calculated</h2>
      <p>
        The starting planet is determined by the <Link href="/vedic/nakshatra">Moon&apos;s Nakshatra</Link> at birth. Each
        of the 27 Nakshatras is ruled by one of the 9 planets. The balance of the first Mahadasha depends on how
        far the Moon has traversed the birth Nakshatra — if the Moon is halfway through Ashwini (ruled by Ketu), you
        start with half of Ketu&apos;s 7-year period remaining.
      </p>

      <h2>Mahadasha Periods (120 Years Total)</h2>
      <table>
        <thead>
          <tr><th>Planet</th><th>Duration</th><th>General Theme</th></tr>
        </thead>
        <tbody>
          <tr><td>Sun (Surya)</td><td>6 years</td><td>Authority, recognition, father, government, health</td></tr>
          <tr><td>Moon (Chandra)</td><td>10 years</td><td>Emotions, mother, public life, travel, comfort</td></tr>
          <tr><td>Mars (Mangal)</td><td>7 years</td><td>Energy, property, siblings, courage, conflicts</td></tr>
          <tr><td>Rahu</td><td>18 years</td><td>Obsession, foreign, unconventional growth, illusion</td></tr>
          <tr><td>Jupiter (Guru)</td><td>16 years</td><td>Wisdom, expansion, children, dharma, wealth</td></tr>
          <tr><td>Saturn (Shani)</td><td>19 years</td><td>Discipline, karma, chronic issues, slow results</td></tr>
          <tr><td>Mercury (Budha)</td><td>17 years</td><td>Intelligence, business, communication, education</td></tr>
          <tr><td>Ketu</td><td>7 years</td><td>Detachment, spirituality, loss, sudden changes</td></tr>
          <tr><td>Venus (Shukra)</td><td>20 years</td><td>Love, luxury, marriage, arts, comforts</td></tr>
        </tbody>
      </table>

      <h2>Antardasha: Sub-Periods Within Each Mahadasha</h2>
      <p>
        Each Mahadasha is subdivided into 9 Antardashas (Bhuktis), one for each planet. The Antardasha lord colors
        the events within the Mahadasha. For example, during Jupiter Mahadasha / Venus Antardasha, you get Jupiter&apos;s
        expansion combined with Venus&apos;s love and luxury — often a time of marriage, wealth, and happiness.
      </p>
      <p>
        The Antardasha sequence follows the same order as the Mahadasha sequence, starting with the Mahadasha lord itself.
        So in Saturn Mahadasha, the first Antardasha is Saturn-Saturn, followed by Saturn-Mercury, Saturn-Ketu, and so on.
      </p>

      <h2>Pratyantardasha: Sub-Sub-Periods</h2>
      <p>
        For pinpoint event timing, each Antardasha is further divided into 9 Pratyantardashas. While Mahadashas give
        the general life theme and Antardashas narrow it down, Pratyantardashas can time events to within weeks. The
        <Link href="/vedic/dashas"> Astra Dasha calculator</Link> computes all three levels automatically.
      </p>

      <h2>How to Interpret Dasha Results</h2>
      <p>The effect of a Dasha depends on several factors:</p>
      <ol>
        <li><strong>House lordship</strong> — Which houses does the Dasha lord rule? A 5th and 9th lord Dasha brings fortune; a 6th and 8th lord Dasha brings challenges.</li>
        <li><strong>House placement</strong> — Where is the Dasha lord placed in the <Link href="/vedic/kundli">birth chart</Link>? A well-placed planet delivers positive results.</li>
        <li><strong>Dignity</strong> — Is the planet exalted, in own sign, or debilitated? Dignity determines the quality of results.</li>
        <li><strong>Aspects and conjunctions</strong> — Benefic aspects from Jupiter or Venus improve results; malefic aspects from Saturn, Mars, or Rahu create obstacles.</li>
        <li><strong>Yogas</strong> — If the Dasha lord participates in a <Link href="/vedic/yogas">Raja Yoga or Dhana Yoga</Link>, those results activate during the Dasha.</li>
        <li><strong>Transits</strong> — <Link href="/vedic/transits">Current planetary transits</Link> confirm or modify Dasha predictions.</li>
      </ol>

      <h2>Alternative Dasha Systems</h2>
      <p>
        While Vimshottari is the default recommendation of Parashara, two other systems are valuable:
      </p>
      <ul>
        <li><strong>Yogini Dasha</strong> (36-year cycle) — Preferred for shorter-term event timing. Uses 8 Yoginis instead of 9 planets.</li>
        <li><strong>Ashtottari Dasha</strong> (108-year cycle) — Used when Rahu is in a Kendra or Trikona from the Lagna lord. Omits Sun and Ketu.</li>
      </ul>

      <h2>Calculate Your Dasha Timeline</h2>
      <p>
        Use <Link href="/vedic/dashas">Astra&apos;s free Dasha calculator</Link> to see your complete Vimshottari,
        Yogini, and Ashtottari timelines with exact Mahadasha, Antardasha, and Pratyantardasha dates. Identify your
        current running Dasha and understand what the coming years hold.
      </p>
    </>
  );
}
