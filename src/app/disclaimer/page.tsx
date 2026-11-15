import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Astrology Disclaimer',
  description: 'Important disclaimer about Astra Destiny\'s Vedic astrology calculations — for educational and entertainment purposes only, not professional advice.',
  alternates: {
    canonical: '/disclaimer',
    languages: { 'en': '/disclaimer', 'hi': '/hi/disclaimer', 'x-default': '/disclaimer' },
  },
};

export default function DisclaimerPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-8 space-y-8">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Disclaimer', href: '/disclaimer' }]} />

      <header>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Astrology Disclaimer</h1>
        <p className="text-zinc-500 mt-2 text-sm">Last updated: November 15, 2026</p>
      </header>

      <div className="prose prose-invert prose-zinc max-w-none prose-headings:font-display prose-headings:text-zinc-200 prose-p:text-zinc-400 prose-p:leading-relaxed prose-li:text-zinc-400 prose-strong:text-zinc-200">
        <div className="glass-card rounded-2xl p-6 not-prose mb-8 border-l-4 border-l-yellow-500">
          <p className="text-zinc-300 font-medium">
            ⚠️ All astrological content, calculations, and interpretations on Astra Destiny are provided for
            <strong> educational and entertainment purposes only</strong>. They are not a substitute for
            professional medical, financial, legal, or psychological advice.
          </p>
        </div>

        <h2>Nature of Astrology</h2>
        <p>
          Vedic astrology (Jyotish) is an ancient system of knowledge that interprets the positions of celestial
          bodies relative to human experience. While it has a rich tradition spanning thousands of years and is
          deeply meaningful to many practitioners and cultures, it is not a scientifically validated predictive system
          in the modern empirical sense.
        </p>
        <p>
          The calculations on this site are mathematically precise — we use NASA JPL ephemeris for planetary positions
          and established Parashari/Jaimini rules for astrological analysis. However, the <em>interpretation</em> of
          these calculations involves traditional astrological frameworks that are cultural and philosophical in nature.
        </p>

        <h2>What Our Calculations Can and Cannot Do</h2>
        <h3>What they can do:</h3>
        <ul>
          <li>Accurately compute sidereal planetary positions for any date and location</li>
          <li>Generate correct Vedic birth charts following established mathematical rules</li>
          <li>Apply classical Jyotish rules consistently (Yogas, Doshas, Dashas, Ashtakavarga, etc.)</li>
          <li>Serve as educational tools for studying Vedic astrology</li>
          <li>Provide a starting point for further study with a qualified Jyotish practitioner</li>
        </ul>

        <h3>What they cannot do:</h3>
        <ul>
          <li>Predict specific future events with certainty</li>
          <li>Replace medical diagnosis or treatment</li>
          <li>Provide reliable financial or investment guidance</li>
          <li>Determine legal outcomes</li>
          <li>Substitute for professional mental health support</li>
          <li>Guarantee the success or failure of marriages, careers, or other life decisions</li>
        </ul>

        <h2>Marriage Compatibility</h2>
        <p>
          Our Kundli Milan (Ashtakoota matching) tool applies traditional 36-point compatibility scoring rules.
          This system reflects one aspect of Vedic marriage assessment and does not account for the full complexity
          of human relationships. A low compatibility score does not mean a marriage will fail, and a high score
          does not guarantee success. Personal effort, communication, and mutual respect are far more important
          than any astrological metric.
        </p>

        <h2>Dosha Interpretations</h2>
        <p>
          Doshas (Mangal Dosha, Kaal Sarp Dosha, etc.) are traditional astrological classifications. Their presence
          in a birth chart does not constitute a diagnosis or prediction of specific negative outcomes. Many
          practitioners note that cancellation conditions and overall chart strength modify or nullify dosha effects.
          Do not make major life decisions based solely on dosha assessments.
        </p>

        <h2>Health-Related Content</h2>
        <p>
          Any health-related interpretations (e.g., Ayush analysis, medical astrology indicators) are based on
          traditional Jyotish significations, not medical science. <strong>Always consult qualified healthcare
          professionals for health concerns.</strong> Never delay seeking medical attention based on astrological
          indications.
        </p>

        <h2>Remedies</h2>
        <p>
          Vedic remedies (gemstones, mantras, pujas, fasting) are traditional practices with cultural significance.
          Their efficacy is a matter of personal faith and tradition, not established scientific evidence.
          Gemstone recommendations should be verified with a qualified practitioner, and any gemstone should be
          worn only after proper assessment of your full chart.
        </p>

        <h2>Your Responsibility</h2>
        <p>
          By using Astra Destiny, you acknowledge that you use the service at your own discretion and risk.
          We encourage you to approach astrology as one of many tools for self-reflection, not as an authoritative
          guide for major life decisions.
        </p>
      </div>
    </article>
  );
}
