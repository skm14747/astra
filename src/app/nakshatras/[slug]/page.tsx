import { ALL_NAKSHATRA_SLUGS, getNakshatraArticle } from '@/lib/astrology/nakshatra-articles';
import { notFound } from 'next/navigation';
import LocaleLink from '@/components/shared/LocaleLink';

export function generateStaticParams() {
  return ALL_NAKSHATRA_SLUGS.map(slug => ({ slug }));
}

export default async function NakshatraPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getNakshatraArticle(slug);
  if (!article) notFound();

  const { profile, degreeRange, rashi, pada } = article;
  const idx = article.index;

  const prevSlug = idx > 0 ? ALL_NAKSHATRA_SLUGS[idx - 1] : null;
  const nextSlug = idx < 26 ? ALL_NAKSHATRA_SLUGS[idx + 1] : null;
  const prevArticle = prevSlug ? getNakshatraArticle(prevSlug) : null;
  const nextArticle = nextSlug ? getNakshatraArticle(nextSlug) : null;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
          {profile.name} Nakshatra
        </h1>
        <p className="text-zinc-400 mt-2 text-lg">
          Nakshatra #{idx + 1} · {degreeRange} · {rashi}
        </p>
      </div>

      {/* Quick Facts */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">Quick Facts</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div><span className="text-zinc-500">Deity</span><p className="text-zinc-200 mt-0.5">{profile.deity}</p></div>
          <div><span className="text-zinc-500">Symbol</span><p className="text-zinc-200 mt-0.5">{profile.symbol}</p></div>
          <div><span className="text-zinc-500">Motivation</span><p className="text-zinc-200 mt-0.5">{profile.motivation}</p></div>
          <div><span className="text-zinc-500">Guna</span><p className="text-zinc-200 mt-0.5">{profile.guna}</p></div>
          <div><span className="text-zinc-500">Animal</span><p className="text-zinc-200 mt-0.5">{profile.animal}</p></div>
          <div><span className="text-zinc-500">Degree Range</span><p className="text-zinc-200 mt-0.5">{degreeRange}</p></div>
        </div>
      </div>

      {/* Pada */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-3">Four Padas (Quarters)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {pada.map((p, i) => (
            <div key={i} className="bg-white/[0.03] rounded-lg p-3 text-center">
              <span className="text-xs text-zinc-500">Pada {i + 1}</span>
              <p className="text-sm text-zinc-200 mt-0.5">{p} Navamsha</p>
            </div>
          ))}
        </div>
      </div>

      {/* Personality */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-3">Personality</h2>
        <p className="text-zinc-300 text-sm leading-relaxed">{profile.personality}</p>
      </div>

      {/* Strengths & Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-emerald-400 text-lg mb-3">Strengths</h2>
          <p className="text-zinc-300 text-sm leading-relaxed">{profile.strengths}</p>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-amber-400 text-lg mb-3">Challenges</h2>
          <p className="text-zinc-300 text-sm leading-relaxed">{profile.challenges}</p>
        </div>
      </div>

      {/* Career */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-3">Career &amp; Professional Life</h2>
        <p className="text-zinc-300 text-sm leading-relaxed">{profile.career}</p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        {prevArticle ? (
          <LocaleLink href={`/nakshatras/${prevSlug}`} className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
            ← {prevArticle.profile.name}
          </LocaleLink>
        ) : <span />}
        <LocaleLink href="/nakshatras" className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors">All 27 Nakshatras</LocaleLink>
        {nextArticle ? (
          <LocaleLink href={`/nakshatras/${nextSlug}`} className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
            {nextArticle.profile.name} →
          </LocaleLink>
        ) : <span />}
      </div>

      <div className="flex gap-3">
        <LocaleLink href="/vedic/nakshatra" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">← Find Your Nakshatra</LocaleLink>
        <LocaleLink href="/vedic/kundli" className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors">Full Birth Chart →</LocaleLink>
      </div>
    </div>
  );
}
