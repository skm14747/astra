import type { Metadata } from 'next';
import LocaleLink from '@/components/shared/LocaleLink';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

export const metadata: Metadata = {
  title: 'Synastry Aspects — Key Relationship Aspects in Astrology | Astra Destiny',
  description: 'Complete guide to synastry aspects: conjunctions, trines, squares, and oppositions between two birth charts. Discover which aspects indicate lasting love, sexual attraction, and karmic bonds.',
  keywords: ['synastry aspects', 'relationship astrology aspects', 'venus conjunct mars synastry', 'moon conjunct venus synastry', 'sun conjunct moon synastry'],
  alternates: { canonical: `${BASE_URL}/astrology/synastry-aspects/` },
};

const ASPECT_TYPES = [
  { name: 'Conjunction (0°)', symbol: '☌', nature: 'Fusion', desc: 'Two planets merge their energies. The effect depends entirely on which planets are involved — benefic conjunctions (Venus-Jupiter) are wonderful, while malefic ones (Mars-Saturn) create tension.' },
  { name: 'Trine (120°)', symbol: '△', nature: 'Harmony', desc: 'The easiest, most flowing aspect. Energy moves naturally between the planets. Trines indicate areas of natural compatibility where things "just work" without effort.' },
  { name: 'Sextile (60°)', symbol: '⚹', nature: 'Opportunity', desc: 'Similar to a trine but requires conscious effort to activate. Sextiles indicate areas where compatibility can be developed through communication and shared interests.' },
  { name: 'Square (90°)', symbol: '□', nature: 'Tension', desc: 'Creates friction, challenge, and growth. Squares are not "bad" — they generate the sexual tension and dynamic energy that keeps relationships exciting. Without squares, relationships can become boring.' },
  { name: 'Opposition (180°)', symbol: '☍', nature: 'Polarity', desc: 'Creates a magnetic pull between opposing energies. Oppositions in synastry often indicate strong initial attraction. The challenge is learning to balance complementary qualities.' },
];

const KEY_ASPECTS = [
  { aspect: 'Sun conjunct Moon', meaning: 'The most important synastry aspect for marriage. The Sun person\'s identity resonates with the Moon person\'s emotional needs. Creates a natural "husband-wife" dynamic.', category: 'love' },
  { aspect: 'Venus conjunct Mars', meaning: 'The strongest indicator of physical and romantic attraction. The Venus person is magnetically drawn to the Mars person\'s energy and assertiveness.', category: 'passion' },
  { aspect: 'Moon conjunct Venus', meaning: 'Deep emotional and aesthetic harmony. Both partners feel comfortable, cherished, and emotionally nourished. Excellent for domestic happiness.', category: 'love' },
  { aspect: 'Sun trine Sun', meaning: 'Core identity harmony. Both partners understand each other\'s life goals and ego needs. Creates mutual respect and admiration.', category: 'harmony' },
  { aspect: 'Venus trine Jupiter', meaning: 'Abundance, generosity, and joy in the relationship. This aspect expands love and makes both partners feel lucky to be together.', category: 'love' },
  { aspect: 'Mars square Mars', meaning: 'Intense sexual tension and occasional power struggles. Keeps the relationship dynamic but requires maturity to prevent destructive conflict.', category: 'passion' },
  { aspect: 'Saturn conjunct Venus', meaning: 'Karmic and binding. Saturn commits to Venus\'s love — this aspect often indicates a long-lasting, serious relationship. Can feel restrictive initially but deepens over time.', category: 'karmic' },
  { aspect: 'Rahu conjunct Venus', meaning: 'Obsessive attraction and karmic connection. Rahu amplifies Venus\'s desire — the attraction feels fated but may be unstable unless other stabilizing aspects exist.', category: 'karmic' },
  { aspect: 'Moon opposite Moon', meaning: 'Emotional polarity — both partners fill in what the other lacks emotionally. Creates strong attraction but can lead to misunderstandings if not conscious.', category: 'harmony' },
  { aspect: 'Jupiter conjunct Ascendant', meaning: 'Jupiter blesses the relationship with optimism, growth, and mutual encouragement. The Ascendant person feels uplifted by Jupiter\'s wisdom and generosity.', category: 'love' },
];

export default function SynastryAspectsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 space-y-8">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Love', href: '/horoscope/love' }, { name: 'Synastry Aspects', href: '/astrology/synastry-aspects' }]} />
      <Breadcrumbs items={[{ label: 'Love', href: '/horoscope/love' }, { label: 'Synastry Aspects', href: '/astrology/synastry-aspects' }]} />

      <div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Synastry Aspects Guide</h1>
        <p className="text-zinc-400 mt-2 text-lg">Key inter-chart aspects for love, attraction &amp; karmic bonds</p>
      </div>

      <article className="prose prose-invert prose-sm max-w-none space-y-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-3">What Is Synastry?</h2>
          <p className="text-zinc-300 text-sm leading-relaxed">
            Synastry is the astrological technique of overlaying two birth charts to analyse their inter-chart aspects. When a planet in your chart forms a geometric angle (aspect) with a planet in your partner&apos;s chart, it creates a specific energy dynamic — attraction, harmony, tension, or karmic binding. Understanding synastry aspects helps you see why certain relationships feel effortless while others are intensely challenging.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-4">Aspect Types</h2>
          <div className="space-y-3">
            {ASPECT_TYPES.map(a => (
              <div key={a.name} className="bg-white/[0.03] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{a.symbol}</span>
                  <h3 className="text-sm font-semibold text-zinc-200">{a.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    a.nature === 'Harmony' || a.nature === 'Opportunity' ? 'bg-emerald-600/20 text-emerald-300' :
                    a.nature === 'Tension' || a.nature === 'Polarity' ? 'bg-amber-600/20 text-amber-300' :
                    'bg-violet-600/20 text-violet-300'
                  }`}>{a.nature}</span>
                </div>
                <p className="text-xs text-zinc-400">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-4">10 Most Important Synastry Aspects</h2>
          <div className="space-y-3">
            {KEY_ASPECTS.map((a, i) => (
              <div key={i} className="bg-white/[0.03] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-zinc-200">{a.aspect}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    a.category === 'love' ? 'bg-pink-600/20 text-pink-300' :
                    a.category === 'passion' ? 'bg-red-600/20 text-red-300' :
                    a.category === 'karmic' ? 'bg-violet-600/20 text-violet-300' :
                    'bg-cyan-600/20 text-cyan-300'
                  }`}>{a.category}</span>
                </div>
                <p className="text-xs text-zinc-400">{a.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      </article>

      <div className="flex gap-3">
        <LocaleLink href="/tools/western/synastry" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">← Synastry Calculator</LocaleLink>
        <LocaleLink href="/horoscope/love" className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors">Love Horoscope →</LocaleLink>
      </div>
    </div>
  );
}
