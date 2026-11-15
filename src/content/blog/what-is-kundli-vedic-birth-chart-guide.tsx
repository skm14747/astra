import Link from 'next/link';

export default function Article() {
  return (
    <>
      <p>
        A <strong>Kundli</strong> (also called Janam Kundli, Janam Patri, or Vedic Birth Chart) is the cornerstone of
        Jyotish — the ancient Indian science of light. It is a precise map of the sky at the exact moment and location
        of your birth, showing where the Sun, Moon, and planets were placed among the 12 zodiac signs and 12 houses.
      </p>
      <p>
        Unlike Western horoscopes that use the tropical zodiac (fixed to the seasons), Vedic astrology uses the{' '}
        <strong>sidereal zodiac</strong>, which tracks the actual position of constellations. The difference between the
        two — approximately 24° as of 2026 — is called the <strong>Ayanamsa</strong>. Astra uses the Lahiri
        (Chitrapaksha) Ayanamsa, the standard adopted by the Indian Astronomical Ephemeris.
      </p>

      <h2>The 12 Houses of the Kundli</h2>
      <p>
        Each house (Bhava) in the Kundli governs a specific area of life. The 1st house (Lagna or Ascendant) is the
        most important — it represents the self, physical body, and overall life direction.
      </p>
      <table>
        <thead>
          <tr><th>House</th><th>Name</th><th>Signification</th></tr>
        </thead>
        <tbody>
          <tr><td>1st</td><td>Lagna (Ascendant)</td><td>Self, body, personality, health</td></tr>
          <tr><td>2nd</td><td>Dhana Bhava</td><td>Wealth, family, speech, early education</td></tr>
          <tr><td>3rd</td><td>Sahaja Bhava</td><td>Siblings, courage, communication, short travel</td></tr>
          <tr><td>4th</td><td>Sukha Bhava</td><td>Mother, home, vehicles, inner peace</td></tr>
          <tr><td>5th</td><td>Putra Bhava</td><td>Children, intelligence, creativity, romance</td></tr>
          <tr><td>6th</td><td>Ripu Bhava</td><td>Enemies, debts, disease, daily work</td></tr>
          <tr><td>7th</td><td>Kalatra Bhava</td><td>Marriage, partnerships, business</td></tr>
          <tr><td>8th</td><td>Ayu Bhava</td><td>Longevity, transformation, hidden matters, occult</td></tr>
          <tr><td>9th</td><td>Dharma Bhava</td><td>Fortune, father, higher learning, spirituality</td></tr>
          <tr><td>10th</td><td>Karma Bhava</td><td>Career, authority, public reputation</td></tr>
          <tr><td>11th</td><td>Labha Bhava</td><td>Income, gains, elder siblings, desires</td></tr>
          <tr><td>12th</td><td>Vyaya Bhava</td><td>Losses, foreign lands, liberation, expenses</td></tr>
        </tbody>
      </table>

      <h2>The 9 Planets (Navagraha)</h2>
      <p>
        Vedic astrology considers 9 celestial bodies — the 7 visible planets plus Rahu and Ketu (the Moon&apos;s nodes,
        calculated from the lunar orbit):
      </p>
      <ul>
        <li><strong>Sun (Surya)</strong> — Soul, authority, father, government</li>
        <li><strong>Moon (Chandra)</strong> — Mind, emotions, mother, public</li>
        <li><strong>Mars (Mangal)</strong> — Energy, courage, brothers, property</li>
        <li><strong>Mercury (Budha)</strong> — Intelligence, speech, commerce, education</li>
        <li><strong>Jupiter (Guru)</strong> — Wisdom, expansion, children, dharma</li>
        <li><strong>Venus (Shukra)</strong> — Love, luxury, spouse, arts</li>
        <li><strong>Saturn (Shani)</strong> — Discipline, karma, longevity, hardship</li>
        <li><strong>Rahu (North Node)</strong> — Obsession, foreign, unconventional, amplification</li>
        <li><strong>Ketu (South Node)</strong> — Detachment, spirituality, past lives, moksha</li>
      </ul>

      <h2>How to Read Your Kundli</h2>
      <p>Reading a Kundli involves these essential steps:</p>
      <ol>
        <li><strong>Identify the Ascendant (Lagna)</strong> — This is the rising sign at your birth time. It determines the house arrangement.</li>
        <li><strong>Check planet placements</strong> — Note which house and sign each planet occupies.</li>
        <li><strong>Assess dignity</strong> — Is the planet exalted, in own sign, friendly, or debilitated? Dignity determines how well a planet can deliver results.</li>
        <li><strong>Look for Yogas</strong> — Specific combinations of planets that create special results (e.g., <Link href="/vedic/yogas">Raja Yoga</Link> for power, Dhana Yoga for wealth).</li>
        <li><strong>Check Doshas</strong> — Afflictions like <Link href="/vedic/mangal-dosha">Mangal Dosha</Link> or <Link href="/vedic/kaal-sarp-dosha">Kaal Sarp Dosha</Link> that need remedial measures.</li>
        <li><strong>Study the Dasha timeline</strong> — The <Link href="/vedic/dashas">Vimshottari Dasha system</Link> reveals when each planet activates in your life.</li>
      </ol>

      <h2>Why Birth Time Accuracy Matters</h2>
      <p>
        The Ascendant changes approximately every 2 hours, and the Moon moves through one{' '}
        <Link href="/vedic/nakshatra">Nakshatra</Link> roughly every day. A difference of even 5 minutes in birth time
        can shift the Ascendant degree enough to change Dasha balance calculations and divisional chart placements.
        For accurate readings, birth time should ideally be precise to within 2-3 minutes.
      </p>

      <h2>Generate Your Free Kundli</h2>
      <p>
        <Link href="/vedic/kundli">Astra&apos;s Kundli calculator</Link> uses NASA JPL DE-series ephemeris for sub-arc-second
        planetary precision. All calculations run entirely in your browser — no data is sent to any server. Enter your
        birth details and explore your complete Vedic birth chart instantly.
      </p>
    </>
  );
}
