import type { Metadata } from 'next';
import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free Vedic Astrology Calculators & Tools',
  description: 'Browse all Astra Destiny astrology calculators — Kundli generator, Dasha calculator, Kundli Milan, Panchang, Nakshatra finder, Dosha checks, and 20+ more free Jyotish tools.',
  alternates: { canonical: '/tools' },
  openGraph: {
    title: 'Free Vedic Astrology Calculators & Tools | Astra Destiny',
    description: 'Browse 200+ free Vedic astrology calculators — Kundli, Dasha, Kundli Milan, Panchang, Nakshatra, and more.',
    url: '/tools',
    type: 'website',
  },
};

interface ToolItem {
  href: string;
  name: string;
  description: string;
  icon: string;
}

const TOOL_CATEGORIES: { title: string; tools: ToolItem[] }[] = [
  {
    title: 'Birth Chart & Kundli',
    tools: [
      { href: '/vedic/kundli', name: 'Kundli (Birth Chart)', description: 'Full Vedic birth chart with 9 planets, 12 houses, dignities, and nakshatras.', icon: '☉' },
      { href: '/vedic/divisional', name: 'Divisional Charts (D1–D60)', description: 'All 16 Varga charts — Navamsa, Dasamsa, Dwadasamsa, and more.', icon: '◎' },
      { href: '/vedic/navamsa', name: 'Navamsa (D9) Chart', description: 'Dedicated D9 analysis with Vargottama detection and marriage interpretation.', icon: '◎' },
    ],
  },
  {
    title: 'Timing & Predictions',
    tools: [
      { href: '/vedic/dashas', name: 'Mahadasha Calculator', description: 'Vimshottari, Yogini & Ashtottari Dasha timelines with all sub-periods.', icon: '⏳' },
      { href: '/vedic/predictions', name: 'Varshaphal (Annual)', description: 'Solar Return chart with Muntha, Year Lord, and Tajaka Yogas.', icon: '🔮' },
      { href: '/vedic/transits', name: 'Sade Sati & Transits', description: 'Saturn transit detection, Kantaka Shani, Dhaiya, and transit strength.', icon: '♄' },
    ],
  },
  {
    title: 'Yogas & Doshas',
    tools: [
      { href: '/vedic/yogas', name: 'Yoga & Dosha Analysis', description: 'Detect 20+ Yogas (Raja, Gajakesari, Dhana) and 12+ Doshas.', icon: '♃' },
      { href: '/vedic/mangal-dosha', name: 'Mangal Dosha Check', description: 'Manglik status, house placement, cancellation conditions, and remedies.', icon: '♂' },
      { href: '/vedic/kaal-sarp-dosha', name: 'Kaal Sarp Dosha', description: '12 types of Kaal Sarp Yog, severity, and Jupiter cancellation.', icon: '🐍' },
    ],
  },
  {
    title: 'Compatibility',
    tools: [
      { href: '/vedic/compatibility', name: 'Kundli Milan', description: '36-point Ashtakoota matching — Varna, Vashya, Tara, Yoni, Maitri, Gana, Bhakoot, Nadi.', icon: '♥' },
      { href: '/vedic/nakshatra', name: 'Nakshatra Calculator', description: 'Find your Janma Nakshatra, Pada, deity, Gana, Nadi, and Tara Bala.', icon: '☽' },
    ],
  },
  {
    title: 'Daily Almanac',
    tools: [
      { href: '/vedic/panchang', name: "Today's Panchang", description: 'Daily Hindu almanac — Tithi, Nakshatra, Yoga, Karana, Rahu Kalam.', icon: '📅' },
      { href: '/vedic/muhurta', name: 'Muhurta Finder', description: 'Find auspicious times for marriage, griha pravesh, travel, and 20+ activities.', icon: '🕐' },
    ],
  },
  {
    title: 'Strength Analysis',
    tools: [
      { href: '/vedic/shadbala', name: 'Shadbala Calculator', description: 'Six-fold planetary strength — Sthana, Dig, Kala, Cheshta, Naisargika, Drig Bala.', icon: '⚖' },
      { href: '/vedic/ashtakavarga', name: 'Ashtakavarga', description: 'BAV and SAV Bindu tables for transit strength prediction.', icon: '⬡' },
    ],
  },
  {
    title: 'Advanced Systems',
    tools: [
      { href: '/vedic/kp', name: 'KP System', description: 'Krishnamurti Paddhati sub-lords, significators, and ruling planets.', icon: '⊕' },
      { href: '/vedic/jaimini', name: 'Jaimini Astrology', description: 'Chara Karakas, Karakamsha, Rashi Drishti, and Chara Dasha.', icon: '♈' },
      { href: '/vedic/nadi', name: 'Nadi Astrology', description: 'Bhrigu Bindu, Pranapada Lagna, Gulika, Mandi, and Nadi Amsha.', icon: '🌀' },
    ],
  },
  {
    title: 'Life Area Analysis',
    tools: [
      { href: '/vedic/career', name: 'Career Astrology', description: '10th house, Dasamsa (D10), Amatyakaraka analysis.', icon: '💼' },
      { href: '/vedic/wealth', name: 'Wealth Analysis', description: 'Dhana Yogas, Indu Lagna, 2nd/11th house assessment.', icon: '₹' },
      { href: '/vedic/health', name: 'Health & Longevity', description: 'Ayush tiers, Maraka lords, Badhaka planets, body area mapping.', icon: '❤' },
      { href: '/vedic/remedies', name: 'Vedic Remedies', description: 'Gemstones, mantras, Rudraksha, charity, and fasting prescriptions.', icon: '💎' },
      { href: '/vedic/report', name: 'Full Vedic Report', description: 'Complete analysis combining all tools in one comprehensive view.', icon: '📋' },
    ],
  },
];

export default function ToolsDirectoryPage() {
  const totalTools = TOOL_CATEGORIES.reduce((sum, cat) => sum + cat.tools.length, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-10">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Tools', href: '/tools' }]} />

      <header>
        <div className="zodiac-divider mb-4">
          <span className="text-xs text-violet-400/40">☉ ☽ ♃ ♄ ♂</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
          Free Vedic Astrology Calculators & Tools
        </h1>
        <p className="text-zinc-400 mt-2 max-w-2xl">
          {totalTools} specialized Jyotish tools — each free, instant, and private. Choose a calculator below
          or start with the <Link href="/vedic/kundli" className="text-violet-400 hover:underline">Kundli generator</Link> to
          create your birth chart.
        </p>
      </header>

      {/* Which tool should I use? */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-display text-lg font-semibold text-zinc-200 mb-3">Which tool should I use?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="text-zinc-400"><strong className="text-zinc-200">New to astrology?</strong> Start with <Link href="/vedic/kundli" className="text-violet-400 hover:underline">Kundli</Link> to generate your birth chart.</div>
          <div className="text-zinc-400"><strong className="text-zinc-200">Marriage compatibility?</strong> Use <Link href="/vedic/compatibility" className="text-violet-400 hover:underline">Kundli Milan</Link> for Ashtakoota matching.</div>
          <div className="text-zinc-400"><strong className="text-zinc-200">What&apos;s happening now?</strong> Check <Link href="/vedic/transits" className="text-violet-400 hover:underline">Transits</Link> for current planetary effects.</div>
          <div className="text-zinc-400"><strong className="text-zinc-200">Auspicious timing?</strong> Use <Link href="/vedic/panchang" className="text-violet-400 hover:underline">Panchang</Link> or <Link href="/vedic/muhurta" className="text-violet-400 hover:underline">Muhurta</Link>.</div>
        </div>
      </div>

      {/* Tool categories */}
      {TOOL_CATEGORIES.map(category => (
        <section key={category.title}>
          <h2 className="section-title mb-4">{category.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.tools.map(tool => (
              <Link
                key={tool.href}
                href={tool.href}
                className="glass-card rounded-xl p-5 hover:border-violet-500/30 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5">{tool.icon}</span>
                  <div>
                    <h3 className="font-display font-semibold text-zinc-200 group-hover:text-white transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{tool.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* SEO footer */}
      <section className="mt-12 border-t border-white/[0.04] pt-8">
        <h2 className="font-display text-lg font-semibold text-zinc-300 mb-3">About These Tools</h2>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl">
          Every calculator on Astra Destiny uses NASA JPL DE-series ephemeris for astronomical precision and
          follows classical Jyotish texts (BPHS, Uttara Kalamrita, Saravali) for astrological rules. All
          calculations run entirely in your browser — your birth data never leaves your device. No account,
          login, or payment required. Read our <Link href="/methodology" className="text-violet-400 hover:underline">Methodology</Link> page
          for technical details on how each calculation works.
        </p>
      </section>
    </div>
  );
}
