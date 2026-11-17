import type { Metadata } from 'next';
import LocaleLink from '@/components/shared/LocaleLink';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

export const metadata: Metadata = {
  title: 'Astrology Guides & Planet in House Meanings | Astra Destiny',
  description: 'Explore all 108 planet-in-house interpretations in Vedic astrology, along with comprehensive guides to relationship compatibility, marriage timing, and synastry.',
  keywords: ['astrology guides', 'planet in house', 'vedic astrology interpretations', 'planet in houses meaning', 'astrology articles'],
  alternates: { canonical: `${BASE_URL}/astrology` },
};

const PLANETS = [
  { id: 'sun', name: 'Sun (Surya)', icon: '☀️', desc: 'Soul, authority, leadership, father, vitality' },
  { id: 'moon', name: 'Moon (Chandra)', icon: '🌙', desc: 'Mind, emotions, mother, mental peace, public image' },
  { id: 'mars', name: 'Mars (Mangal)', icon: '♂️', desc: 'Energy, courage, brothers, ambition, real estate' },
  { id: 'mercury', name: 'Mercury (Budha)', icon: '☿️', desc: 'Intellect, speech, trade, analytics, communication' },
  { id: 'jupiter', name: 'Jupiter (Guru)', icon: '♃', desc: 'Wisdom, spirituality, children, fortune, expansion' },
  { id: 'venus', name: 'Venus (Shukra)', icon: '♀️', desc: 'Love, marriage, beauty, arts, vehicles, luxury' },
  { id: 'saturn', name: 'Saturn (Shani)', icon: '🪐', desc: 'Discipline, longevity, career, delays, karma' },
  { id: 'rahu', name: 'Rahu (North Node)', icon: '☊', desc: 'Ambition, foreign lands, innovation, obsessions' },
  { id: 'ketu', name: 'Ketu (South Node)', icon: '☋', desc: 'Moksha, detachment, spirituality, occult wisdom' },
];

const HOUSES = [
  '1st House (Lagna)', '2nd House (Dhana)', '3rd House (Sahaja)',
  '4th House (Sukha)', '5th House (Putra)', '6th House (Ari)',
  '7th House (Yuvati)', '8th House (Randhra)', '9th House (Dharma)',
  '10th House (Karma)', '11th House (Labha)', '12th House (Vyaya)',
];

function getOrdinal(n: number): string {
  return `${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'}`;
}

const RELATIONSHIP_GUIDES = [
  { href: '/horoscope/love', title: 'Love Horoscope Hub', icon: '💖', desc: 'Vedic romance guide, zodiac love personality, and relationship calculators.' },
  { href: '/astrology/venus-mars-compatibility', title: 'Venus-Mars Compatibility', icon: '♀♂', desc: 'How romantic attraction and sexual chemistry interact across the 12 signs.' },
  { href: '/astrology/darakaraka-spouse', title: 'Darakaraka Spouse Profile', icon: '💍', desc: 'Jaimini astrology indicator of your future spouse\'s appearance, career, and nature.' },
  { href: '/astrology/marriage-timing', title: 'Marriage Timing in Vedic Astrology', icon: '📅', desc: 'Dasha periods, transits, and Navamsa activations that trigger marriage.' },
  { href: '/astrology/synastry-aspects', title: 'Synastry Aspects Guide', icon: '🔗', desc: 'Geometric angles between two charts that define lasting love and chemistry.' },
];

export default function AstrologyHubPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-12">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Astrology', href: '/astrology' }]} />
      <Breadcrumbs items={[{ label: 'Astrology', href: '/astrology' }]} />

      <div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
          Astrology Knowledge Hub
        </h1>
        <p className="text-zinc-400 mt-2 text-lg max-w-3xl">
          Comprehensive library of Vedic astrology interpretations. Browse 108 planet-in-house placements, deep-dive relationship guides, and classical Jyotish wisdom.
        </p>
      </div>

      {/* Relationship & Love Guides */}
      <section>
        <h2 className="font-display text-xl font-semibold text-zinc-100 mb-4">Love &amp; Relationship Astrology Guides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RELATIONSHIP_GUIDES.map(guide => (
            <LocaleLink
              key={guide.href}
              href={guide.href}
              className="glass-card rounded-xl p-5 hover:border-violet-500/30 transition-all group"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">{guide.icon}</span>
                <div>
                  <h3 className="font-display font-semibold text-zinc-200 group-hover:text-white transition-colors">{guide.title}</h3>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{guide.desc}</p>
                </div>
              </div>
            </LocaleLink>
          ))}
        </div>
      </section>

      {/* 108 Planet-in-House Articles by Planet */}
      <section className="space-y-8">
        <div>
          <h2 className="font-display text-xl font-semibold text-zinc-100">Planet in House Guide (108 Combinations)</h2>
          <p className="text-sm text-zinc-400 mt-1">Select any planet to view its effects across the 12 Bhavas (houses) of a Vedic birth chart.</p>
        </div>

        <div className="space-y-6">
          {PLANETS.map(p => (
            <div key={p.id} className="glass-card rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{p.icon}</span>
                <div>
                  <h3 className="font-display font-semibold text-lg text-white">{p.name}</h3>
                  <p className="text-xs text-zinc-400">{p.desc}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-2">
                {Array.from({ length: 12 }, (_, i) => {
                  const houseNum = i + 1;
                  const ord = getOrdinal(houseNum);
                  const slug = `${p.id}-in-${ord}-house`;
                  return (
                    <LocaleLink
                      key={slug}
                      href={`/astrology/${slug}`}
                      className="bg-white/[0.03] hover:bg-violet-600/10 hover:border-violet-500/30 border border-white/[0.06] rounded-lg p-2.5 text-center transition-all group"
                    >
                      <div className="text-xs font-semibold text-zinc-300 group-hover:text-violet-300">{ord} House</div>
                      <div className="text-[10px] text-zinc-500 truncate mt-0.5">{HOUSES[i].split(' ')[1]?.replace(/[()]/g, '')}</div>
                    </LocaleLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA to Kundli */}
      <section className="glass-card rounded-2xl p-8 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold text-white">Find Your Exact Planet Placements</h2>
        <p className="text-zinc-400 text-sm max-w-xl mx-auto">
          Calculate your accurate Vedic Janam Kundli to discover which houses your planets occupy, complete with degrees, nakshatras, and dasha timelines.
        </p>
        <div>
          <LocaleLink
            href="/vedic/kundli"
            className="inline-block bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl px-6 py-3 text-sm transition-colors shadow-lg shadow-violet-600/20"
          >
            Generate Free Janam Kundli →
          </LocaleLink>
        </div>
      </section>
    </div>
  );
}
