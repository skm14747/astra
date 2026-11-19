'use client';
import { useMemo } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { calculateCharaKarakas } from '@/lib/vedic/jaimini';
import { PLANET_GLYPH } from '@/lib/vedic/glyphs';
import { RASHI_NAMES } from '@/lib/vedic/constants';
import type { Lang } from '@/lib/vedic/types';
import { getPlanetName, getRashiNameByKey, getDkSpouse } from '@/lib/vedic/domain-i18n';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { getDarakarakaInterpretation } from '@/lib/vedic/interpretations/jaimini';
import { useT } from '@/lib/i18n';
import { useSettings } from '@/lib/settings/context';

export default function DarakarakaPage() {
  const { chart } = useProfileChart();
  const { language } = useSettings();
  const t = useT();
  const lang = language as Lang;

  const data = useMemo(() => {
    if (!chart) return null;
    const karakas = calculateCharaKarakas(chart);
    const dk = karakas.find(k => k.type === 'DK')!;
    const dkSign = chart.planets[dk.planet].rashi;
    const dkSignName = RASHI_NAMES[dkSign];
    const dkInterp = getDarakarakaInterpretation(dk.planet);
    return { karakas, dk, dkSign, dkSignName, dkInterp };
  }, [chart]);

  const spouse = data ? getDkSpouse(data.dk.planet, lang) : null;

  if (!data) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="💑" title={t('darakaraka.title')} description={t('darakaraka.subtitle')} />
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
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('darakaraka.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('darakaraka.subtitle')}</p>
      </div>

      {/* Hero: Darakaraka */}
      <div className="glass-card rounded-2xl p-6 vedic-glow relative overflow-hidden">
        <div className="cosmic-orb w-28 h-28 bg-rose-600/8 -top-8 -right-8" />
        <div className="relative z-10">
          <div className="text-xs text-rose-400/80 font-medium mb-1">{t('darakaraka.spousePlanet')}</div>
          <div className="text-3xl text-white font-display font-bold">
            {PLANET_GLYPH[data.dk.planet]} {getPlanetName(data.dk.planet, lang)}
          </div>
          <div className="text-sm text-zinc-400 mt-1">{data.dk.degreeInSign.toFixed(2)}° — {getRashiNameByKey(data.dkSignName, lang)}</div>
        </div>
      </div>

      {/* Spouse Characteristics */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">{t('darakaraka.spouseTraits')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/[0.03] rounded-xl p-4">
            <div className="text-xs text-rose-400/80 font-medium mb-2">{t('darakaraka.appearance')}</div>
            <p className="text-zinc-300 text-sm">{spouse!.appearance}</p>
          </div>
          <div className="bg-white/[0.03] rounded-xl p-4">
            <div className="text-xs text-rose-400/80 font-medium mb-2">{t('darakaraka.personality')}</div>
            <p className="text-zinc-300 text-sm">{spouse!.personality}</p>
          </div>
          <div className="bg-white/[0.03] rounded-xl p-4">
            <div className="text-xs text-rose-400/80 font-medium mb-2">{t('darakaraka.careerField')}</div>
            <p className="text-zinc-300 text-sm">{spouse!.career}</p>
          </div>
        </div>
      </div>

      {/* Detailed DK Interpretation */}
      {data.dkInterp && (
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-3">{getPlanetName(data.dk.planet, lang)} — {t('darakaraka.title')}</h2>
          <p className="text-zinc-300 text-sm leading-relaxed">{data.dkInterp}</p>
        </div>
      )}

      {/* All Karakas for context */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">{t('darakaraka.allKarakas')}</h2>
        <div className="space-y-3">
          {data.karakas.map(k => (
            <div key={k.type} className={`flex items-center justify-between rounded-xl px-4 py-3 ${k.type === 'DK' ? 'bg-rose-600/20 border border-rose-500/30' : 'bg-white/[0.03]'}`}>
              <div>
                <span className="text-violet-400 font-mono text-sm mr-2">{k.type}</span>
                <span className="text-zinc-300 text-sm">{k.fullName}</span>
              </div>
              <div className="text-right">
                <span className="text-zinc-100 font-medium">{PLANET_GLYPH[k.planet]} {getPlanetName(k.planet, lang)}</span>
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
