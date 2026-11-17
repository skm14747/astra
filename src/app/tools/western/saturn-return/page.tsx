'use client';
import { useMemo, useState, useEffect } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { calculateSaturnReturns } from '@/lib/astronomy/asteroids';
import { WESTERN_SEO } from '../seo';
import LocaleLink from '@/components/shared/LocaleLink';

const RETURN_THEMES: Record<number, { title: string; theme: string; advice: string }> = {
  1: { title: 'First Saturn Return (Ages ~27-30)', theme: 'Adulthood crystallization. Career commitment. Relationship reality check. Defining your life structure.', advice: 'Embrace responsibility. Release what isn\'t working. Make conscious choices about career, relationships, and life direction. This is your initiation into true adulthood.' },
  2: { title: 'Second Saturn Return (Ages ~56-60)', theme: 'Life review. Legacy building. Wisdom integration. Releasing outdated ambitions.', advice: 'Evaluate what truly matters. Simplify. Focus on legacy and mentorship. This is when you become an elder — not old, but wise.' },
  3: { title: 'Third Saturn Return (Ages ~84-90)', theme: 'Final wisdom. Spiritual completion. Life meaning distillation.', advice: 'Reflect on the full arc of your life. Share your wisdom. Find peace with your journey. This is a rare and sacred passage.' },
};

export default function SaturnReturnPage() {
  const { chart } = useProfileChart();
  const [clientNow, setClientNow] = useState<Date>(() => new Date(2026, 0, 1));

  useEffect(() => {
    setClientNow(new Date());
  }, []);

  const data = useMemo(() => {
    if (!chart) return null;
    const saturnLon = chart.planets.Saturn.siderealLongitude;
    const returns = calculateSaturnReturns(saturnLon, chart.birthData.date, 3);
    return { saturnLon, returns, now: clientNow };
  }, [chart, clientNow]);

  if (!data) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="🪐" title="Saturn Return Calculator" description="Enter your birth details to find your Saturn Return dates." />
      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-zinc-100">{WESTERN_SEO['saturn-return'].seoIntro.heading}</h2>
        <p className="text-zinc-400 text-sm leading-relaxed">{WESTERN_SEO['saturn-return'].seoIntro.text}</p>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3"><span className="text-xs text-yellow-400/40">🪐 Saturn Return</span></div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Saturn Return Calculator</h1>
        <p className="text-zinc-400 mt-1">When Saturn returns to its natal position</p>
      </div>

      <div className="space-y-6">
        {data.returns.map(r => {
          const theme = RETURN_THEMES[r.returnNumber];
          const isPast = r.approximateDate < data.now;
          const isActive = Math.abs(r.approximateDate.getTime() - data.now.getTime()) < 365.25 * 2 * 86400000;

          return (
            <div key={r.returnNumber} className={`glass-card rounded-2xl p-6 ${isActive ? 'vedic-glow ring-1 ring-yellow-500/30' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="font-semibold text-zinc-100 text-lg">{theme?.title}</h2>
                  <div className="text-sm text-zinc-400 mt-1">
                    Approximate: {r.approximateDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })} (Age ~{r.age})
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${isPast ? 'bg-zinc-700 text-zinc-400' : isActive ? 'bg-yellow-600/20 text-yellow-400' : 'bg-blue-600/20 text-blue-400'}`}>
                  {isPast ? 'Completed' : isActive ? 'Active Now' : 'Upcoming'}
                </span>
              </div>
              {theme && (
                <>
                  <p className="text-zinc-400 text-sm mb-2">{theme.theme}</p>
                  <p className="text-zinc-300 text-sm">{theme.advice}</p>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-100">{WESTERN_SEO['saturn-return'].seoIntro.heading}</h2>
        <p className="text-zinc-400 text-sm leading-relaxed">{WESTERN_SEO['saturn-return'].seoIntro.text}</p>
      </div>
      {WESTERN_SEO['saturn-return'].relatedTools && (
        <div className="flex flex-wrap gap-2">
          {WESTERN_SEO['saturn-return'].relatedTools.map(t => (
            <LocaleLink key={t.href} href={t.href} className="text-sm text-violet-400 hover:text-violet-300 bg-violet-600/10 rounded-lg px-3 py-1.5 transition-colors">{t.label}</LocaleLink>
          ))}
        </div>
      )}
    </div>
  );
}
