import { ALL_NAKSHATRA_SLUGS, getNakshatraArticle } from '@/lib/astrology/nakshatra-articles';
import LocaleLink from '@/components/shared/LocaleLink';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

export const metadata: Metadata = {
  title: '27 Nakshatras — Complete Vedic Astrology Guide | Astra Destiny',
  description: 'Explore all 27 Nakshatras (lunar mansions) in Vedic astrology. Personality traits, deity, symbol, compatibility, and career for each Nakshatra.',
  keywords: ['nakshatras', '27 nakshatras', 'nakshatra list', 'vedic astrology nakshatras', 'lunar mansions'],
  alternates: { canonical: `${BASE_URL}/nakshatras` },
};

export default function NakshatrasHubPage() {
  const nakshatras = ALL_NAKSHATRA_SLUGS.map(slug => getNakshatraArticle(slug)!).filter(Boolean);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-8">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Nakshatras', href: '/nakshatras' }]} />
      <Breadcrumbs items={[{ label: 'Nakshatras', href: '/nakshatras' }]} />

      <div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
          27 Nakshatras — Lunar Mansions in Vedic Astrology
        </h1>
        <p className="text-zinc-400 mt-2 text-lg max-w-3xl">
          The 27 Nakshatras divide the 360° zodiac into lunar mansions of 13°20&apos; each. Each Nakshatra carries a unique deity, symbol, motivation, and personality blueprint. Discover yours below.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {nakshatras.map((n, i) => (
          <LocaleLink
            key={n.slug}
            href={`/nakshatras/${n.slug}`}
            className="glass-card rounded-xl p-5 hover:border-violet-500/30 transition-all group"
          >
            <div className="flex items-start gap-3">
              <span className="text-lg font-mono text-zinc-500 mt-0.5 w-6 text-right">{i + 1}</span>
              <div>
                <h2 className="font-display font-semibold text-zinc-200 group-hover:text-white transition-colors">
                  {n.profile.name}
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">{n.degreeRange}</p>
                <p className="text-xs text-zinc-500 mt-0.5">🙏 {n.profile.deity} · {n.profile.symbol}</p>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{n.profile.personality.slice(0, 120)}…</p>
              </div>
            </div>
          </LocaleLink>
        ))}
      </div>

      <div className="flex gap-3">
        <LocaleLink href="/vedic/nakshatra" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">← Nakshatra Calculator</LocaleLink>
        <LocaleLink href="/tools" className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors">All Tools →</LocaleLink>
      </div>
    </div>
  );
}
