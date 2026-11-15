'use client';
import { useMemo } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { calculateAshtakavarga, getWeakHouses } from '@/lib/vedic/ashtakavarga';
import { PLANET_GLYPH } from '@/lib/vedic/glyphs';
import { RASHI_NAMES } from '@/lib/vedic/constants';
import type { GrahaPlanet } from '@/lib/vedic/types';
import SeoIntro from '@/components/seo/SeoIntro';

export default function AshtakavargaPage() {
  const { chart } = useProfileChart();

  const data = useMemo(() => {
    if (!chart) return null;
    const av = calculateAshtakavarga(chart);
    return { av, weakHouses: getWeakHouses(av.sav) };
  }, [chart]);

  if (!data) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="☉" title="Ashtakavarga" description="Create a birth profile to see BAV/SAV benefic point calculations." />
      <SeoIntro heading="What is Ashtakavarga?" text="Ashtakavarga is a quantitative scoring system from BPHS that assigns Bindu (benefic points) to each sign. Signs with high SAV scores (28+) give strong transit results; low scores (under 25) indicate challenging transit periods. Essential for predicting transit impact." />
    </div>
  );

  const planets: GrahaPlanet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-violet-400/40">☉ ☽ ♂ ☿ ♃ ♀ ♄</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Ashtakavarga</h1>
        <p className="text-zinc-400 mt-1">Bindhu Ashtakavarga (BAV) and Sarva Ashtakavarga (SAV) analysis</p>
      </div>

      {/* Summary strip */}
      {(() => {
        const totalSav = data.av.sav.reduce((a, b) => a + b, 0);
        const maxIdx = data.av.sav.indexOf(Math.max(...data.av.sav));
        const minIdx = data.av.sav.indexOf(Math.min(...data.av.sav));
        return (
          <div className="flex gap-3 flex-wrap">
            <span className="planet-badge">Total SAV: {totalSav}</span>
            <span className="planet-badge !bg-emerald-500/12 !border-emerald-500/20 !text-emerald-400">Strongest: {RASHI_NAMES[maxIdx]} ({data.av.sav[maxIdx]})</span>
            <span className="planet-badge !bg-red-500/12 !border-red-500/20 !text-red-400">Weakest: {RASHI_NAMES[minIdx]} ({data.av.sav[minIdx]})</span>
          </div>
        );
      })()}

      <div>
        <div className="section-title mb-3">BAV / SAV Matrix</div>
      </div>
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left py-3 px-4 text-zinc-400 text-xs font-medium uppercase tracking-wider">Planet</th>
                {RASHI_NAMES.map(r => <th key={r} className="py-3 px-1.5 text-center text-[10px] text-zinc-500 font-medium">{r.slice(0, 3)}</th>)}
              </tr>
            </thead>
            <tbody>
              {planets.map((p, pi) => (
                <tr key={p} className={`border-b border-white/[0.03] ${pi % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                  <td className="py-2.5 px-4 font-medium text-zinc-200">
                    <span className="mr-1.5">{PLANET_GLYPH[p]}</span>{p}
                  </td>
                  {data.av.bav[p].map((v, i) => (
                    <td key={i} className={`py-2.5 px-1.5 text-center text-xs font-mono ${v >= 4 ? 'text-green-400' : v <= 2 ? 'text-red-400' : 'text-zinc-400'}`}>{v}</td>
                  ))}
                </tr>
              ))}
              <tr className="border-t-2 border-white/[0.08] font-bold bg-white/[0.02]">
                <td className="py-3 px-4 text-zinc-100">SAV</td>
                {data.av.sav.map((v, i) => (
                  <td key={i} className={`py-3 px-1.5 text-center text-xs font-mono ${v < 27 ? 'text-red-400 bg-red-500/[0.06]' : v >= 30 ? 'text-green-400 bg-emerald-500/[0.06]' : 'text-zinc-300'}`}>{v}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {data.weakHouses.length > 0 && (
        <div className="glass-card rounded-xl px-5 py-4 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
          <span className="text-sm text-zinc-300">
            <strong className="text-red-400">Weak Houses</strong> (SAV &lt; 27): {data.weakHouses.join(', ')}
          </span>
        </div>
      )}
    </div>
  );
}
