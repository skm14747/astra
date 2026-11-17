import type { Metadata } from 'next';
import LocaleLink from '@/components/shared/LocaleLink';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

export const metadata: Metadata = {
  title: 'Venus-Mars Compatibility in Vedic Astrology — Romantic Chemistry Guide | Astra Destiny',
  description: 'Venus-Mars compatibility in Vedic astrology: how these two planets of love and desire interact across signs to reveal romantic chemistry, attraction patterns, and relationship dynamics.',
  keywords: ['venus mars compatibility', 'venus mars synastry', 'vedic astrology love compatibility', 'romantic chemistry astrology'],
  alternates: { canonical: `${BASE_URL}/astrology/venus-mars-compatibility` },
};

const VENUS_IN_SIGNS = [
  { sign: 'Aries', trait: 'Bold, spontaneous romance. Falls in love quickly and passionately. Attracted to confidence and directness.' },
  { sign: 'Taurus', trait: 'Sensual, loyal, and comfort-loving. Own-sign strength gives deep appreciation for beauty, food, and physical touch.' },
  { sign: 'Gemini', trait: 'Flirtatious and intellectually stimulated. Needs constant conversation and mental variety in love.' },
  { sign: 'Cancer', trait: 'Nurturing and emotionally attached. Seeks a partner who provides security and home life.' },
  { sign: 'Leo', trait: 'Dramatic, generous, and attention-seeking. Loves grand gestures and being the centre of a partner\'s world.' },
  { sign: 'Virgo', trait: 'Debilitated Venus. Shows love through practical service. Modest but deeply devoted when committed.' },
  { sign: 'Libra', trait: 'Own-sign strength. The ideal romantic — charming, balanced, and partnership-oriented. Craves harmony.' },
  { sign: 'Scorpio', trait: 'Intense, magnetic, and possessive. All-or-nothing in love with deep emotional and sexual bonds.' },
  { sign: 'Sagittarius', trait: 'Freedom-loving and adventurous. Attracted to philosophical or culturally diverse partners.' },
  { sign: 'Capricorn', trait: 'Serious and traditional. Love deepens with time and commitment. Attracted to status and maturity.' },
  { sign: 'Aquarius', trait: 'Unconventional and independent. Values friendship in romance and is attracted to uniqueness.' },
  { sign: 'Pisces', trait: 'Exalted Venus. The most romantic placement — dreamy, compassionate, and spiritually connected to love.' },
];

const MARS_IN_SIGNS = [
  { sign: 'Aries', trait: 'Own sign. Assertive, competitive, and direct in pursuit. Initiates romance boldly.' },
  { sign: 'Taurus', trait: 'Persistent and sensual. Slow to act but deeply committed once engaged.' },
  { sign: 'Gemini', trait: 'Verbally expressive desire. Attracted through wit and intellectual challenge.' },
  { sign: 'Cancer', trait: 'Debilitated Mars. Emotionally protective, may struggle to express desire directly.' },
  { sign: 'Leo', trait: 'Passionate and proud. Romance is dramatic and generous.' },
  { sign: 'Virgo', trait: 'Practical and methodical in pursuit. Shows desire through helpful actions.' },
  { sign: 'Libra', trait: 'Diplomatic but indecisive. Desires harmony and can suppress conflict.' },
  { sign: 'Scorpio', trait: 'Own sign. Intensely magnetic and deeply sexual. Transformative relationships.' },
  { sign: 'Sagittarius', trait: 'Adventurous and open. Pursues love with enthusiasm and optimism.' },
  { sign: 'Capricorn', trait: 'Exalted Mars. Patient, strategic, and powerfully ambitious in love and career.' },
  { sign: 'Aquarius', trait: 'Independent and progressive. Attracted to unconventional dynamics.' },
  { sign: 'Pisces', trait: 'Gentle and spiritual. Desire is expressed through selfless devotion.' },
];

const KEY_COMBOS = [
  { v: 'Venus in Aries', m: 'Mars in Aries', chemistry: 'Explosive. Both want to lead — passionate but potentially combative. Works if both respect independence.', rating: 4 },
  { v: 'Venus in Taurus', m: 'Mars in Scorpio', chemistry: 'Magnetic opposition. Taurus sensuality meets Scorpio intensity — one of the most potent attraction combinations.', rating: 5 },
  { v: 'Venus in Libra', m: 'Mars in Aries', chemistry: 'Classic polarity. Venus in own sign draws Mars in own sign — opposites attract with powerful romantic tension.', rating: 5 },
  { v: 'Venus in Pisces', m: 'Mars in Capricorn', chemistry: 'Exalted planets. Venus brings romantic idealism, Mars provides steady commitment. Deep, lasting bond.', rating: 5 },
  { v: 'Venus in Cancer', m: 'Mars in Cancer', chemistry: 'Emotionally intense but Mars is debilitated — desire is expressed indirectly. Nurturing but may lack spark.', rating: 3 },
  { v: 'Venus in Virgo', m: 'Mars in Gemini', chemistry: 'Both Mercury-ruled. Mental connection is strong but emotional expression may feel restrained.', rating: 3 },
];

export default function VenusMarsCompatibilityPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 space-y-8">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Love', href: '/horoscope/love' }, { name: 'Venus-Mars Compatibility', href: '/astrology/venus-mars-compatibility' }]} />
      <Breadcrumbs items={[{ label: 'Love', href: '/horoscope/love' }, { label: 'Venus-Mars Compatibility', href: '/astrology/venus-mars-compatibility' }]} />

      <div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Venus-Mars Compatibility</h1>
        <p className="text-zinc-400 mt-2 text-lg">How Venus (love) and Mars (desire) create romantic chemistry in Vedic astrology</p>
      </div>

      <article className="prose prose-invert prose-sm max-w-none space-y-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-3">The Venus-Mars Dance</h2>
          <p className="text-zinc-300 text-sm leading-relaxed">Venus represents what we find attractive, how we give and receive love, and our aesthetic preferences. Mars represents how we pursue what we desire, our sexual energy, and our assertiveness. In synastry (cross-chart comparison), the interaction between one person&apos;s Venus and another&apos;s Mars is the primary indicator of romantic chemistry and physical attraction.</p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-4">Venus in Each Sign</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {VENUS_IN_SIGNS.map(v => (
              <div key={v.sign} className="bg-white/[0.03] rounded-lg p-3">
                <h3 className="text-sm font-semibold text-pink-400">♀ Venus in {v.sign}</h3>
                <p className="text-xs text-zinc-400 mt-1">{v.trait}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-4">Mars in Each Sign</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MARS_IN_SIGNS.map(m => (
              <div key={m.sign} className="bg-white/[0.03] rounded-lg p-3">
                <h3 className="text-sm font-semibold text-red-400">♂ Mars in {m.sign}</h3>
                <p className="text-xs text-zinc-400 mt-1">{m.trait}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-4">Key Venus-Mars Combinations</h2>
          <div className="space-y-4">
            {KEY_COMBOS.map((c, i) => (
              <div key={i} className="bg-white/[0.03] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-zinc-200">{c.v} + {c.m}</span>
                  <span className="text-xs text-violet-400">{'★'.repeat(c.rating)}</span>
                </div>
                <p className="text-xs text-zinc-400">{c.chemistry}</p>
              </div>
            ))}
          </div>
        </div>
      </article>

      <div className="flex gap-3">
        <LocaleLink href="/horoscope/love" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">← Love Horoscope</LocaleLink>
        <LocaleLink href="/vedic/compatibility" className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors">Kundli Matching →</LocaleLink>
      </div>
    </div>
  );
}
