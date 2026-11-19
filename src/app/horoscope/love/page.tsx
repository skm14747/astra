import type { Metadata } from 'next';
import LocaleLink from '@/components/shared/LocaleLink';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

export const metadata: Metadata = {
  title: 'Love Horoscope — Vedic Astrology Romance & Relationship Guide | Astra Destiny',
  description: 'Discover your love potential through Vedic astrology. Venus-Mars compatibility, Darakaraka spouse analysis, marriage timing, synastry aspects, and Kundli matching — all in one place.',
  keywords: ['love horoscope', 'vedic love astrology', 'marriage astrology', 'venus mars compatibility', 'darakaraka spouse', 'kundli matching', 'synastry'],
  alternates: { canonical: `${BASE_URL}/horoscope/love/` },
};

const LOVE_TOOLS = [
  { href: '/vedic/compatibility', icon: '💕', title: 'Kundli Matching (Gun Milan)', desc: 'Traditional 36-point Ashtakoot compatibility score between two birth charts.' },
  { href: '/astrology/venus-mars-compatibility', icon: '♀♂', title: 'Venus-Mars Compatibility', desc: 'How your Venus and your partner\'s Mars (and vice versa) create attraction and chemistry.' },
  { href: '/astrology/darakaraka-spouse', icon: '💍', title: 'Darakaraka Spouse Profile', desc: 'Jaimini astrology reveals your ideal spouse\'s appearance, personality, and career through the Darakaraka planet.' },
  { href: '/astrology/marriage-timing', icon: '📅', title: 'Marriage Timing', desc: 'When will you get married? Dasha periods, transits, and Navamsa indicators for marriage timing.' },
  { href: '/astrology/synastry-aspects', icon: '🔗', title: 'Synastry Aspects Guide', desc: 'Key inter-chart aspects that indicate lasting love, intense attraction, or karmic connections.' },
  { href: '/tools/western/synastry', icon: '⚡', title: 'Western Synastry Calculator', desc: 'Overlay two charts and discover your strongest synastry connections.' },
  { href: '/vedic/navamsa', icon: '🪷', title: 'Navamsa Chart (D-9)', desc: 'The marriage chart — your D-9 reveals your spouse\'s nature and relationship destiny.' },
];

const LOVE_SIGNS_INTRO = [
  { sign: 'Aries', emoji: '♈', tip: 'Passionate and impulsive — needs a partner who can match their fire.' },
  { sign: 'Taurus', emoji: '♉', tip: 'Loyal and sensual — craves stability, beauty, and physical affection.' },
  { sign: 'Gemini', emoji: '♊', tip: 'Communicative and playful — attracted to wit and intellectual stimulation.' },
  { sign: 'Cancer', emoji: '♋', tip: 'Nurturing and emotional — seeks deep security and family bonds.' },
  { sign: 'Leo', emoji: '♌', tip: 'Romantic and generous — wants to be admired and adored.' },
  { sign: 'Virgo', emoji: '♍', tip: 'Devoted and practical — shows love through acts of service and care.' },
  { sign: 'Libra', emoji: '♎', tip: 'Harmonious and partnership-oriented — naturally drawn to committed relationships.' },
  { sign: 'Scorpio', emoji: '♏', tip: 'Intense and transformative — all-or-nothing in love, deeply loyal.' },
  { sign: 'Sagittarius', emoji: '♐', tip: 'Adventurous and philosophical — needs freedom and a fellow explorer.' },
  { sign: 'Capricorn', emoji: '♑', tip: 'Committed and traditional — love grows deeper and stronger with time.' },
  { sign: 'Aquarius', emoji: '♒', tip: 'Independent and unconventional — attracted to uniqueness and intellectual equals.' },
  { sign: 'Pisces', emoji: '♓', tip: 'Dreamy and compassionate — experiences love as a spiritual connection.' },
];

export default function LoveHoroscopePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-10">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Horoscope', href: '/horoscope/today' }, { name: 'Love', href: '/horoscope/love' }]} />
      <Breadcrumbs items={[{ label: 'Horoscope', href: '/horoscope/today' }, { label: 'Love', href: '/horoscope/love' }]} />

      <div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
          Love Horoscope — Vedic Astrology Romance Guide
        </h1>
        <p className="text-zinc-400 mt-2 text-lg max-w-3xl">
          Vedic astrology offers profound tools for understanding love, attraction, and marriage compatibility. From the ancient Ashtakoot gun milan to Jaimini&apos;s Darakaraka spouse analysis — explore every dimension of love through the stars.
        </p>
      </div>

      {/* Love Tools */}
      <section>
        <h2 className="font-display text-xl font-semibold text-zinc-200 mb-4">Love &amp; Relationship Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LOVE_TOOLS.map(tool => (
            <LocaleLink key={tool.href} href={tool.href} className="glass-card rounded-xl p-5 hover:border-violet-500/30 transition-colors group">
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">{tool.icon}</span>
                <div>
                  <h3 className="font-display font-semibold text-zinc-200 group-hover:text-white transition-colors">{tool.title}</h3>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{tool.desc}</p>
                </div>
              </div>
            </LocaleLink>
          ))}
        </div>
      </section>

      {/* Signs in Love */}
      <section>
        <h2 className="font-display text-xl font-semibold text-zinc-200 mb-4">Love by Zodiac Sign</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {LOVE_SIGNS_INTRO.map(s => (
            <div key={s.sign} className="glass-card rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{s.emoji}</span>
                <h3 className="font-semibold text-zinc-200 text-sm">{s.sign}</h3>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">{s.tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEO content */}
      <article className="prose prose-invert prose-sm max-w-none">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-3">How Vedic Astrology Analyses Love</h2>
          <p className="text-zinc-300 text-sm leading-relaxed">
            In Vedic astrology, love and marriage are analysed through multiple layers: the 7th house (partnerships), Venus (attraction and romance), Mars (passion and desire), the Navamsa chart (D-9, the marriage divisional), and Jaimini&apos;s Darakaraka (the planet representing the spouse). No single indicator tells the full story — a comprehensive love analysis combines Ashtakoot matching, synastry overlays, Dasha timing, and Navamsa strength.
          </p>
          <p className="text-zinc-300 text-sm leading-relaxed mt-3">
            The Venus-Mars dynamic is especially important: Venus in a man&apos;s chart shows the type of partner he&apos;s attracted to, while Mars in a woman&apos;s chart reveals her romantic preferences. Cross-chart aspects between Venus and Mars indicate natural chemistry. Meanwhile, Saturn&apos;s involvement with the 7th house or Venus can delay marriage but ultimately strengthens commitment.
          </p>
        </div>
      </article>

      <div className="flex gap-3">
        <LocaleLink href="/vedic/compatibility" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">← Kundli Matching</LocaleLink>
        <LocaleLink href="/tools" className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors">All Tools →</LocaleLink>
      </div>
    </div>
  );
}
