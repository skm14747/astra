import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'About Astra Destiny — Our Vedic Astrology Tools',
  description: 'Learn about Astra Destiny — our mission, the team behind the tools, our approach to Vedic astrology calculation, and how we built 200+ free Jyotish calculators.',
  alternates: {
    canonical: '/about',
    languages: { 'en': '/about', 'hi': '/hi/about', 'x-default': '/about' },
  },
  openGraph: {
    title: 'About Astra Destiny — Our Vedic Astrology Tools',
    description: 'Learn about Astra Destiny — our mission, approach, and the team behind 200+ free Vedic astrology calculators.',
    url: '/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-8 space-y-8">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'About', href: '/about' }]} />

      <header>
        <div className="zodiac-divider mb-4">
          <span className="text-xs text-violet-400/40">✦ ☉ ✦</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">About Astra Destiny</h1>
        <p className="text-zinc-400 mt-2">
          Free, privacy-first Vedic astrology tools powered by astronomical precision.
        </p>
      </header>

      <div className="prose prose-invert prose-zinc max-w-none prose-headings:font-display prose-headings:text-zinc-200 prose-p:text-zinc-400 prose-p:leading-relaxed prose-li:text-zinc-400 prose-strong:text-zinc-200 prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline">
        <h2>Our Mission</h2>
        <p>
          Astra Destiny exists to make authentic Vedic astrology (Jyotish) accessible to everyone — free of charge,
          free of paywalls, and free of unnecessary data collection. We believe that the computational precision
          of modern astronomy, combined with the wisdom of ancient Jyotish texts, can create tools that are both
          scientifically rigorous in their calculations and respectful of the tradition they represent.
        </p>

        <h2>What Makes Us Different</h2>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          {[
            { icon: '🔬', title: 'NASA-Precision Ephemeris', text: 'We use NASA JPL DE-series ephemeris for sub-arc-second planetary positions — the same data used by space agencies.' },
            { icon: '🔒', title: 'Privacy First', text: 'All calculations run in your browser. Birth data never leaves your device. No accounts, no tracking of personal astrological data.' },
            { icon: '📚', title: 'Classical Foundations', text: 'Our algorithms follow Brihat Parashara Hora Shastra (BPHS), Uttara Kalamrita, Saravali, and Jataka Parijata.' },
            { icon: '🆓', title: 'Completely Free', text: 'Every tool is free with no premium tiers, no locked features, and no limit on usage. Supported by non-intrusive advertising.' },
          ].map(item => (
            <div key={item.title} className="glass-card rounded-xl p-4">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="text-sm font-semibold text-zinc-200 mb-1">{item.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <h2>Our Tools</h2>
        <p>
          Astra Destiny offers 200+ Vedic astrology tools spanning the complete range of Jyotish analysis:
        </p>
        <ul>
          <li><strong>Birth Chart Generation</strong> — <Link href="/vedic/kundli">Kundli</Link>, <Link href="/vedic/divisional">Divisional Charts</Link> (D1–D60), <Link href="/vedic/navamsa">Navamsa (D9)</Link></li>
          <li><strong>Predictive Timing</strong> — <Link href="/vedic/dashas">Vimshottari/Yogini/Ashtottari Dashas</Link>, <Link href="/vedic/transits">Transit Tracker</Link>, <Link href="/vedic/predictions">Varshaphal</Link></li>
          <li><strong>Compatibility</strong> — <Link href="/vedic/compatibility">Kundli Milan (36-point Ashtakoota)</Link></li>
          <li><strong>Doshas & Yogas</strong> — <Link href="/vedic/yogas">60+ Yoga patterns</Link>, <Link href="/vedic/mangal-dosha">Mangal Dosha</Link>, <Link href="/vedic/kaal-sarp-dosha">Kaal Sarp Dosha</Link></li>
          <li><strong>Daily Almanac</strong> — <Link href="/vedic/panchang">Panchang</Link>, <Link href="/vedic/muhurta">Muhurta Finder</Link></li>
          <li><strong>Advanced Systems</strong> — <Link href="/vedic/kp">KP System</Link>, <Link href="/vedic/jaimini">Jaimini Astrology</Link>, <Link href="/vedic/nadi">Nadi Astrology</Link></li>
          <li><strong>Strength Analysis</strong> — <Link href="/vedic/shadbala">Shadbala</Link>, <Link href="/vedic/ashtakavarga">Ashtakavarga</Link></li>
          <li><strong>Life Areas</strong> — <Link href="/vedic/career">Career</Link>, <Link href="/vedic/wealth">Wealth</Link>, <Link href="/vedic/health">Health</Link>, <Link href="/vedic/remedies">Remedies</Link></li>
        </ul>

        <h2>Intended Audience</h2>
        <p>
          Astra Destiny is designed for anyone interested in Vedic astrology — from beginners wanting to generate
          their first Kundli to experienced Jyotish practitioners who need quick, accurate calculations. We aim
          to serve students of Jyotish, practicing astrologers, and curious individuals alike.
        </p>

        <h2>Approach & Limitations</h2>
        <p>
          We strive for mathematical precision in our astronomical calculations and faithfulness to classical
          Jyotish texts in our astrological algorithms. However, we acknowledge that:
        </p>
        <ul>
          <li>Astrology is an interpretive tradition, not an exact predictive science in the modern empirical sense.</li>
          <li>Different schools of Jyotish may interpret the same chart differently.</li>
          <li>Our interpretations follow specific texts and may not match every practitioner&apos;s approach.</li>
          <li>Birth time accuracy critically affects chart results — we cannot verify the accuracy of user-provided birth times.</li>
        </ul>
        <p>
          Please read our <Link href="/disclaimer">Astrology Disclaimer</Link> and <Link href="/methodology">Methodology</Link> page
          for detailed information about our calculation methods and their limitations.
        </p>

        <h2>Languages</h2>
        <p>
          Astra Destiny is available in English and Hindi (हिन्दी), with full translation of all 460+ interface
          strings. You can switch languages from the Settings page.
        </p>

        <h2>Contact</h2>
        <p>
          For questions, feedback, or issues, reach us at: <strong>contact@astradestiny.com</strong>
        </p>
      </div>
    </article>
  );
}
