import Link from 'next/link';

export default function Article() {
  return (
    <>
      <p>
        The <strong>Navamsa chart (D9)</strong> is the single most important divisional chart in Vedic astrology.
        Maharishi Parashara stated that no prediction should be confirmed without consulting the Navamsa. While the
        birth chart (D1) shows the external circumstances of life, the Navamsa reveals the soul&apos;s deeper nature,
        the quality of marriage, and the true strength of planets.
      </p>

      <h2>How the Navamsa is Calculated</h2>
      <p>
        Each zodiac sign (30°) is divided into 9 equal parts of 3°20&apos; each — these are the Navamsas. There are
        108 Navamsas in the complete zodiac (12 signs × 9 = 108), a sacred number in Vedic tradition. The division
        follows a specific pattern:
      </p>
      <ul>
        <li><strong>Fire signs</strong> (Aries, Leo, Sagittarius) — Navamsas start from Aries</li>
        <li><strong>Earth signs</strong> (Taurus, Virgo, Capricorn) — Navamsas start from Capricorn</li>
        <li><strong>Air signs</strong> (Gemini, Libra, Aquarius) — Navamsas start from Libra</li>
        <li><strong>Water signs</strong> (Cancer, Scorpio, Pisces) — Navamsas start from Cancer</li>
      </ul>
      <p>
        A planet at 5° Aries, for example, falls in the 2nd Navamsa (3°20&apos;–6°40&apos;), which maps to Taurus.
        <Link href="/vedic/navamsa"> Astra&apos;s Navamsa calculator</Link> handles this automatically for all 9 planets.
      </p>

      <h2>Vargottama: The Confirmed Strength</h2>
      <p>
        When a planet occupies the <strong>same sign in both D1 and D9</strong>, it is called <strong>Vargottama</strong>.
        This is considered one of the strongest planetary conditions — almost as powerful as exaltation. A Vargottama
        planet delivers its results with certainty and consistency.
      </p>
      <p>
        Vargottama occurs at the first Navamsa of fire signs, the 5th Navamsa of earth signs, the 9th Navamsa of
        air signs, and specific Navamsas of water signs. The Ascendant being Vargottama is especially auspicious — it
        gives a strong constitution, clear sense of purpose, and consistency between the inner and outer self.
      </p>

      <h2>Reading D9 for Marriage</h2>
      <p>The Navamsa chart is called the &quot;chart of marriage&quot; (Dharma-Patni Kundli). Key factors to examine:</p>
      <ol>
        <li><strong>7th house of D9</strong> — Planets here describe the spouse&apos;s nature. Benefics (Jupiter, Venus, Mercury) indicate a harmonious marriage; malefics (Mars, Saturn, Rahu) suggest challenges.</li>
        <li><strong>D9 Lagna lord</strong> — Its placement shows the native&apos;s approach to marriage and partnerships after the wedding.</li>
        <li><strong>Venus (for men) / Jupiter (for women)</strong> — The dignity and placement of the marriage significator in D9 reveals the quality of the marital bond.</li>
        <li><strong>Benefics in D9 Kendras (1, 4, 7, 10)</strong> — Indicate overall marital happiness and stability.</li>
        <li><strong>D9 7th lord</strong> — Its house placement and sign show the circumstances of marriage and the spouse&apos;s background.</li>
      </ol>

      <h2>Navamsa Lagna: The Inner Self</h2>
      <p>
        The D9 Ascendant (Navamsa Lagna) represents the personality that emerges more fully after marriage and in
        spiritual pursuits. While the D1 Lagna is how the world sees you from birth, the D9 Lagna reveals who you
        truly become with maturity.
      </p>
      <p>
        For instance, a person with Aries D1 Lagna but Cancer D9 Lagna may appear bold and direct externally but
        is deeply emotional, nurturing, and home-oriented at their core — qualities that become more visible after marriage.
      </p>

      <h2>Pushkara Navamsa and Bhaga</h2>
      <p>
        <strong>Pushkara Navamsas</strong> are specific Navamsa positions considered extremely auspicious — they act
        like &quot;feeding stations&quot; for planets, nourishing their ability to deliver positive results. Planets in
        Pushkara Navamsas are particularly fortunate for the areas they govern. There are 24 Pushkara Navamsas
        distributed across the zodiac.
      </p>

      <h2>D9 in Dasha Interpretation</h2>
      <p>
        When analyzing <Link href="/vedic/dashas">Dasha periods</Link>, the Navamsa position of the Dasha lord
        indicates the quality and direction of results. A Mahadasha lord that is debilitated in D1 but exalted in D9
        will eventually deliver positive results after initial challenges. Conversely, a planet exalted in D1 but
        fallen in D9 may promise much but deliver less.
      </p>

      <h2>Calculate Your Navamsa Chart</h2>
      <p>
        Generate your <Link href="/vedic/navamsa">free Navamsa chart</Link> with Astra to see your D9 planet
        placements, Vargottama status, and a side-by-side comparison with your birth chart. Or explore all 16
        <Link href="/vedic/divisional"> divisional charts</Link> from D1 to D60.
      </p>
    </>
  );
}
