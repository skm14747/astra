'use client';
import { useMemo } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { calculateAllArudhaPadas } from '@/lib/vedic/lagnas';
import { calculateCharaKarakas } from '@/lib/vedic/jaimini';
import { PLANET_GLYPH, RASHI_GLYPH } from '@/lib/vedic/glyphs';
import { RASHI_NAMES, RASHI_LORDS } from '@/lib/vedic/constants';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import type { RashiIndex } from '@/lib/vedic/types';

export default function UpapadaPage() {
  const { chart } = useProfileChart();

  const data = useMemo(() => {
    if (!chart) return null;
    const arudhas = calculateAllArudhaPadas(chart);
    const ul = arudhas.find(a => a.house === 12)!;
    const ulSign = ul.padaRashi;
    const ulSignName = RASHI_NAMES[ulSign];
    const ulLord = RASHI_LORDS[ulSign];
    const gaunapadaSign = ((ulSign + 1) % 12) as RashiIndex;
    const gaunapadaName = RASHI_NAMES[gaunapadaSign];
    const gaunapadaLord = RASHI_LORDS[gaunapadaSign];

    const karakas = calculateCharaKarakas(chart);
    const dk = karakas.find(k => k.type === 'DK')!;

    const planetsInUL: string[] = [];
    for (const [planet, info] of Object.entries(chart.planets)) {
      if (info.rashi === ulSign) planetsInUL.push(planet);
    }

    return { ul, ulSign, ulSignName, ulLord, gaunapadaSign, gaunapadaName, gaunapadaLord, dk, planetsInUL };
  }, [chart]);

  if (!data) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="💍" title="Upapada Lagna Calculator" description="Enter your birth details to find your Jaimini marriage indicator." />
      <SeoIntro headingKey="seo.upapada.heading" textKey="seo.upapada.text" />
      {VEDIC_SEO.upapada.relatedTools && <RelatedTools tools={VEDIC_SEO.upapada.relatedTools} />}
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-rose-400/40">💍 Jaimini · Upapada</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Upapada Lagna Calculator</h1>
        <p className="text-zinc-400 mt-1">Jaimini marriage indicator — Arudha Pada of the 12th house</p>
      </div>

      {/* Hero: Upapada */}
      <div className="glass-card rounded-2xl p-6 vedic-glow relative overflow-hidden">
        <div className="cosmic-orb w-28 h-28 bg-rose-600/8 -top-8 -right-8" />
        <div className="relative z-10">
          <div className="text-xs text-rose-400/80 uppercase tracking-wider font-medium mb-1">Your Upapada Lagna (UL / A12)</div>
          <div className="text-3xl text-white font-display font-bold">
            {RASHI_GLYPH[data.ulSignName]} {data.ulSignName}
          </div>
          <div className="text-sm text-zinc-400 mt-1">Lord: {PLANET_GLYPH[data.ulLord]} {data.ulLord}{data.ul.exceptionApplied ? ' (Parashara exception applied)' : ''}</div>
        </div>
      </div>

      {/* Marriage Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-3">Upapada Sign Analysis</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">UL Sign</span>
              <span className="text-zinc-200">{RASHI_GLYPH[data.ulSignName]} {data.ulSignName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">UL Lord</span>
              <span className="text-zinc-200">{PLANET_GLYPH[data.ulLord]} {data.ulLord}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Planets in UL</span>
              <span className="text-zinc-200">{data.planetsInUL.length > 0 ? data.planetsInUL.map(p => `${PLANET_GLYPH[p]} ${p}`).join(', ') : 'None'}</span>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-3">Gaunapada (2nd from UL)</h2>
          <p className="text-xs text-zinc-500 mb-3">Sustains the marriage — malefics here or afflicted lord may indicate separation</p>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Gaunapada Sign</span>
              <span className="text-zinc-200">{RASHI_GLYPH[data.gaunapadaName]} {data.gaunapadaName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Gaunapada Lord</span>
              <span className="text-zinc-200">{PLANET_GLYPH[data.gaunapadaLord]} {data.gaunapadaLord}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cross-reference with DK */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-3">Darakaraka Connection</h2>
        <p className="text-sm text-zinc-400 mb-3">The Darakaraka (spouse planet) and Upapada Lagna together give a complete marriage picture.</p>
        <div className="bg-white/[0.03] rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-zinc-500">Your Darakaraka</div>
            <div className="text-zinc-200 font-medium mt-1">{PLANET_GLYPH[data.dk.planet]} {data.dk.planet} ({data.dk.fullName})</div>
          </div>
          <a href="/vedic/darakaraka" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
            View full DK analysis →
          </a>
        </div>
      </div>

      <SeoIntro headingKey="seo.upapada.heading" textKey="seo.upapada.text" />
      {VEDIC_SEO.upapada.relatedTools && <RelatedTools tools={VEDIC_SEO.upapada.relatedTools} />}
    </div>
  );
}
