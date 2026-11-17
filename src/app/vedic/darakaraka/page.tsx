'use client';
import { useMemo } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { calculateCharaKarakas } from '@/lib/vedic/jaimini';
import { PLANET_GLYPH } from '@/lib/vedic/glyphs';
import { RASHI_NAMES } from '@/lib/vedic/constants';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { getDarakarakaInterpretation } from '@/lib/vedic/interpretations/jaimini';

const DK_SPOUSE: Record<string, { appearance: string; personality: string; career: string }> = {
  Sun: { appearance: 'Regal bearing, strong bone structure, radiant complexion', personality: 'Dignified, authoritative, proud, leadership-oriented', career: 'Government, administration, politics, medicine' },
  Moon: { appearance: 'Soft features, pleasant face, attractive eyes', personality: 'Nurturing, emotional, caring, home-oriented', career: 'Healthcare, hospitality, public relations, counselling' },
  Mars: { appearance: 'Athletic build, sharp features, energetic', personality: 'Courageous, assertive, passionate, competitive', career: 'Engineering, military, sports, surgery, real estate' },
  Mercury: { appearance: 'Youthful look, expressive face, quick movements', personality: 'Intellectual, witty, communicative, adaptable', career: 'IT, media, writing, trade, analytics, accounting' },
  Jupiter: { appearance: 'Well-built, dignified appearance, broad forehead', personality: 'Wise, traditional, optimistic, philosophical', career: 'Education, law, finance, religion, advisory' },
  Venus: { appearance: 'Attractive, charming, refined features, good skin', personality: 'Artistic, romantic, pleasure-seeking, diplomatic', career: 'Arts, design, fashion, luxury, entertainment' },
  Saturn: { appearance: 'Lean build, mature features, serious expression', personality: 'Disciplined, hardworking, mature, reserved', career: 'Construction, mining, agriculture, labour, engineering' },
};

export default function DarakarakaPage() {
  const { chart } = useProfileChart();

  const data = useMemo(() => {
    if (!chart) return null;
    const karakas = calculateCharaKarakas(chart);
    const dk = karakas.find(k => k.type === 'DK')!;
    const dkSign = chart.planets[dk.planet].rashi;
    const dkSignName = RASHI_NAMES[dkSign];
    const spouse = DK_SPOUSE[dk.planet] ?? DK_SPOUSE.Sun;
    const dkInterp = getDarakarakaInterpretation(dk.planet);
    return { karakas, dk, dkSign, dkSignName, spouse, dkInterp };
  }, [chart]);

  if (!data) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="💑" title="Darakaraka Calculator" description="Enter your birth details to find your spouse significator planet." />
      <SeoIntro headingKey="seo.darakaraka.heading" textKey="seo.darakaraka.text" />
      {VEDIC_SEO.darakaraka.relatedTools && <RelatedTools tools={VEDIC_SEO.darakaraka.relatedTools} />}
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-rose-400/40">💑 Jaimini · Darakaraka</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Darakaraka Calculator</h1>
        <p className="text-zinc-400 mt-1">Your Jaimini spouse significator planet</p>
      </div>

      {/* Hero: Darakaraka */}
      <div className="glass-card rounded-2xl p-6 vedic-glow relative overflow-hidden">
        <div className="cosmic-orb w-28 h-28 bg-rose-600/8 -top-8 -right-8" />
        <div className="relative z-10">
          <div className="text-xs text-rose-400/80 uppercase tracking-wider font-medium mb-1">Your Darakaraka (Spouse Planet)</div>
          <div className="text-3xl text-white font-display font-bold">
            {PLANET_GLYPH[data.dk.planet]} {data.dk.planet}
          </div>
          <div className="text-sm text-zinc-400 mt-1">{data.dk.degreeInSign.toFixed(2)}° in {data.dkSignName} — lowest degree among 7 planets</div>
        </div>
      </div>

      {/* Spouse Characteristics */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">Spouse Characteristics ({data.dk.planet} as DK)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/[0.03] rounded-xl p-4">
            <div className="text-xs text-rose-400/80 uppercase tracking-wider font-medium mb-2">Appearance</div>
            <p className="text-zinc-300 text-sm">{data.spouse.appearance}</p>
          </div>
          <div className="bg-white/[0.03] rounded-xl p-4">
            <div className="text-xs text-rose-400/80 uppercase tracking-wider font-medium mb-2">Personality</div>
            <p className="text-zinc-300 text-sm">{data.spouse.personality}</p>
          </div>
          <div className="bg-white/[0.03] rounded-xl p-4">
            <div className="text-xs text-rose-400/80 uppercase tracking-wider font-medium mb-2">Career Field</div>
            <p className="text-zinc-300 text-sm">{data.spouse.career}</p>
          </div>
        </div>
      </div>

      {/* Detailed DK Interpretation */}
      {data.dkInterp && (
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-3">{data.dk.planet} as Darakaraka — Detailed Analysis</h2>
          <p className="text-zinc-300 text-sm leading-relaxed">{data.dkInterp}</p>
        </div>
      )}

      {/* All Karakas for context */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">All 7 Chara Karakas</h2>
        <div className="space-y-3">
          {data.karakas.map(k => (
            <div key={k.type} className={`flex items-center justify-between rounded-xl px-4 py-3 ${k.type === 'DK' ? 'bg-rose-600/20 border border-rose-500/30' : 'bg-white/[0.03]'}`}>
              <div>
                <span className="text-violet-400 font-mono text-sm mr-2">{k.type}</span>
                <span className="text-zinc-300 text-sm">{k.fullName}</span>
              </div>
              <div className="text-right">
                <span className="text-zinc-100 font-medium">{PLANET_GLYPH[k.planet]} {k.planet}</span>
                <span className="text-zinc-500 text-xs ml-2">{k.degreeInSign.toFixed(2)}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SeoIntro headingKey="seo.darakaraka.heading" textKey="seo.darakaraka.text" />
      {VEDIC_SEO.darakaraka.relatedTools && <RelatedTools tools={VEDIC_SEO.darakaraka.relatedTools} />}
    </div>
  );
}
