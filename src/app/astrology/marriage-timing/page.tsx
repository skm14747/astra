import type { Metadata } from 'next';
import LocaleLink from '@/components/shared/LocaleLink';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

export const metadata: Metadata = {
  title: 'Marriage Timing in Vedic Astrology — When Will You Get Married? | Astra Destiny',
  description: 'Vedic astrology marriage timing guide: Dasha periods, transits of Jupiter and Saturn, Navamsa indicators, and classical rules for predicting when marriage is most likely.',
  keywords: ['marriage timing astrology', 'when will i get married', 'marriage prediction vedic astrology', 'vivah muhurat', 'marriage dasha'],
  alternates: { canonical: `${BASE_URL}/astrology/marriage-timing/` },
};

const TIMING_FACTORS = [
  {
    title: '7th House Lord Dasha',
    desc: 'The Dasha (major period) of the 7th house lord is the strongest indicator. If the 7th lord is well-placed, marriage often occurs during its Dasha or Antardasha (sub-period).',
    importance: 'Primary',
  },
  {
    title: 'Venus Dasha / Antardasha',
    desc: 'Venus is the natural significator of marriage. Its Dasha or sub-period frequently activates marriage, especially for male charts.',
    importance: 'Primary',
  },
  {
    title: 'Jupiter Transit Over 7th House',
    desc: 'Jupiter transiting the 7th house from the Ascendant or Moon gives a strong push toward marriage within 12 months.',
    importance: 'Major',
  },
  {
    title: 'Saturn Transit & Sade Sati',
    desc: 'Saturn transiting the 7th house or aspecting it can delay marriage but also crystallize commitment. The end of Sade Sati often coincides with marriage.',
    importance: 'Major',
  },
  {
    title: 'Navamsa Activation',
    desc: 'When the Dasha lord is strong in the Navamsa (D-9 chart), marriage karma is activated. The Navamsa is the definitive marriage divisional.',
    importance: 'Supporting',
  },
  {
    title: 'Double Transit of Jupiter & Saturn',
    desc: 'When both Jupiter and Saturn simultaneously aspect or transit the 7th house, 7th lord, or Venus, marriage is highly probable.',
    importance: 'Classical',
  },
];

const DELAY_CAUSES = [
  'Saturn conjunct, aspecting, or ruling the 7th house',
  'Rahu or Ketu in the 7th house (karmic delays)',
  'Mangal Dosha without matching (Mars in 1st, 4th, 7th, 8th, or 12th)',
  'Venus combust (too close to the Sun) — attraction exists but commitment delays',
  'Debilitated 7th lord or Venus in the birth or Navamsa chart',
  'Sade Sati period (7.5-year Saturn transit) — marriage often comes after it ends',
];

export default function MarriageTimingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 space-y-8">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Love', href: '/horoscope/love' }, { name: 'Marriage Timing', href: '/astrology/marriage-timing' }]} />
      <Breadcrumbs items={[{ label: 'Love', href: '/horoscope/love' }, { label: 'Marriage Timing', href: '/astrology/marriage-timing' }]} />

      <div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Marriage Timing in Vedic Astrology</h1>
        <p className="text-zinc-400 mt-2 text-lg">When will you get married? Dasha, transits &amp; Navamsa indicators</p>
      </div>

      <article className="prose prose-invert prose-sm max-w-none space-y-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-3">How Vedic Astrology Times Marriage</h2>
          <p className="text-zinc-300 text-sm leading-relaxed">
            Marriage timing in Vedic astrology uses a combination of Dasha periods (planetary time cycles), transits (current planetary positions), and divisional chart activations. The primary houses for marriage are the 7th (partnerships), 2nd (family), and 11th (fulfilment of desires). When the lords of these houses are activated by Dasha and transit simultaneously, marriage becomes highly probable.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-4">Key Timing Factors</h2>
          <div className="space-y-4">
            {TIMING_FACTORS.map((f, i) => (
              <div key={i} className="bg-white/[0.03] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-zinc-200">{f.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    f.importance === 'Primary' ? 'bg-violet-600/20 text-violet-300' :
                    f.importance === 'Major' ? 'bg-cyan-600/20 text-cyan-300' :
                    'bg-zinc-600/20 text-zinc-400'
                  }`}>{f.importance}</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-3">Common Causes of Delayed Marriage</h2>
          <ul className="list-disc list-inside text-zinc-300 text-sm space-y-1">
            {DELAY_CAUSES.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-3">Remedies for Marriage Delay</h2>
          <p className="text-zinc-300 text-sm leading-relaxed">
            If marriage is delayed, Vedic astrology offers targeted remedies: strengthening Venus through mantras and gemstones, performing Vivah Muhurta selection for the most auspicious wedding date, worshipping Lord Shiva and Parvati (the divine couple), fasting on Fridays for Venus, and performing Mangal Dosha remedies if applicable. Our <LocaleLink href="/vedic/remedies" className="text-violet-400 hover:underline">Remedies Calculator</LocaleLink> provides personalized suggestions.
          </p>
        </div>
      </article>

      <div className="flex gap-3">
        <LocaleLink href="/vedic/dashas" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">← Check Your Dasha Periods</LocaleLink>
        <LocaleLink href="/horoscope/love" className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors">Love Horoscope →</LocaleLink>
      </div>
    </div>
  );
}
