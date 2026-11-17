'use client';
import { useMemo } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { calculateAllArudhaPadas } from '@/lib/vedic/lagnas';
import { RASHI_GLYPH } from '@/lib/vedic/glyphs';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';

const ARUDHA_LABELS: Record<number, { name: string; meaning: string }> = {
  1: { name: 'Arudha Lagna (AL)', meaning: 'Public image, reputation, worldly status' },
  2: { name: 'Dhana Pada (A2)', meaning: 'Perceived wealth, financial reputation' },
  3: { name: 'Vikrama Pada (A3)', meaning: 'Courage & initiative as seen by others' },
  4: { name: 'Sukha Pada (A4)', meaning: 'Happiness, property, vehicles reputation' },
  5: { name: 'Mantra Pada (A5)', meaning: 'Perceived intelligence, followers' },
  6: { name: 'Roga Pada (A6)', meaning: 'Perceived enemies, litigation image' },
  7: { name: 'Dara Pada (A7)', meaning: 'Public perception of partnerships' },
  8: { name: 'Mrityu Pada (A8)', meaning: 'Vulnerabilities visible to others' },
  9: { name: 'Dharma Pada (A9)', meaning: 'Perceived righteousness, guru reputation' },
  10: { name: 'Raja Pada (A10)', meaning: 'Career reputation, professional image' },
  11: { name: 'Labha Pada (A11)', meaning: 'Perceived gains, social network' },
  12: { name: 'Upapada (UL)', meaning: 'Marriage manifestation, spouse background' },
};

export default function ArudhaPadaPage() {
  const { chart } = useProfileChart();

  const data = useMemo(() => {
    if (!chart) return null;
    const arudhas = calculateAllArudhaPadas(chart);
    const al = arudhas.find(a => a.house === 1)!;
    const a7 = arudhas.find(a => a.house === 7)!;
    const a10 = arudhas.find(a => a.house === 10)!;
    const ul = arudhas.find(a => a.house === 12)!;
    return { arudhas, al, a7, a10, ul };
  }, [chart]);

  if (!data) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="◈" title="Arudha Pada Calculator" description="Enter your birth details to compute all 12 Arudha Padas." />
      <SeoIntro headingKey="seo.arudha-pada.heading" textKey="seo.arudha-pada.text" />
      {VEDIC_SEO['arudha-pada'].relatedTools && <RelatedTools tools={VEDIC_SEO['arudha-pada'].relatedTools} />}
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-cyan-400/40">◈ Jaimini · Arudha Padas</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Arudha Pada Calculator</h1>
        <p className="text-zinc-400 mt-1">All 12 Bhava Padas — your public image in Jaimini astrology</p>
      </div>

      {/* Key Arudhas Hero */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[data.al, data.a7, data.a10, data.ul].map(a => {
          const info = ARUDHA_LABELS[a.house];
          return (
            <div key={a.house} className="glass-card rounded-2xl p-5 vedic-glow">
              <div className="text-xs text-cyan-400/80 uppercase tracking-wider font-medium mb-1">{info.name}</div>
              <div className="text-2xl text-white font-display font-bold">
                {RASHI_GLYPH[a.padaRashiName]} {a.padaRashiName}
              </div>
              <div className="text-xs text-zinc-500 mt-1">Lord: {a.lord}{a.exceptionApplied ? ' *' : ''}</div>
              <p className="text-xs text-zinc-400 mt-2">{info.meaning}</p>
            </div>
          );
        })}
      </div>

      {/* Full 12 Arudha Padas */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">All 12 Arudha Padas</h2>
        <div className="space-y-3">
          {data.arudhas.map(a => {
            const info = ARUDHA_LABELS[a.house];
            return (
              <div key={a.house} className={`flex items-center justify-between rounded-xl px-4 py-3 ${[1, 7, 10, 12].includes(a.house) ? 'bg-cyan-600/10 border border-cyan-500/20' : 'bg-white/[0.03]'}`}>
                <div className="flex-1">
                  <span className="text-cyan-400 font-mono text-sm mr-2">A{a.house}</span>
                  <span className="text-zinc-300 text-sm">{info.name}</span>
                  <span className="text-zinc-500 text-xs ml-2 hidden sm:inline">— {info.meaning}</span>
                </div>
                <div className="text-right">
                  <span className="text-zinc-100 font-medium">{RASHI_GLYPH[a.padaRashiName]} {a.padaRashiName}</span>
                  <span className="text-zinc-500 text-xs ml-2">({a.lord}{a.exceptionApplied ? ' *' : ''})</span>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-zinc-600 mt-3">* Parashara exception applied (1st/7th rule → +9 signs)</p>
      </div>

      <SeoIntro headingKey="seo.arudha-pada.heading" textKey="seo.arudha-pada.text" />
      {VEDIC_SEO['arudha-pada'].relatedTools && <RelatedTools tools={VEDIC_SEO['arudha-pada'].relatedTools} />}
    </div>
  );
}
