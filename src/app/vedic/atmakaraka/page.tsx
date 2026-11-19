'use client';
import { useMemo } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { calculateCharaKarakas, getKarakamsha } from '@/lib/vedic/jaimini';
import { PLANET_GLYPH, RASHI_GLYPH } from '@/lib/vedic/glyphs';
import { RASHI_NAMES } from '@/lib/vedic/constants';
import type { Lang } from '@/lib/vedic/types';
import { getPlanetName, getRashiName, getRashiNameByKey, getAkLesson } from '@/lib/vedic/domain-i18n';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { getAtmakarakaInterpretation, getKarakamshaInterpretation } from '@/lib/vedic/interpretations/jaimini';
import { useT } from '@/lib/i18n';
import { useSettings } from '@/lib/settings/context';

export default function AtmakarakaPage() {
  const { chart } = useProfileChart();
  const { language } = useSettings();
  const t = useT();
  const lang = language as Lang;

  const data = useMemo(() => {
    if (!chart) return null;
    const karakas = calculateCharaKarakas(chart);
    const ak = karakas[0];
    const karakamsha = getKarakamsha(chart);
    const akInterp = getAtmakarakaInterpretation(ak.planet);
    const kkInterp = getKarakamshaInterpretation(karakamsha.rashi);
    return { karakas, ak, karakamsha, akInterp, kkInterp };
  }, [chart]);

  const akInfo = data ? getAkLesson(data.ak.planet, lang) : null;

  if (!data) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="🔱" title={t('atmakaraka.title')} description={t('atmakaraka.subtitle')} />
      <SeoIntro headingKey="seo.atmakaraka.heading" textKey="seo.atmakaraka.text" />
      {VEDIC_SEO.atmakaraka.relatedTools && <RelatedTools tools={VEDIC_SEO.atmakaraka.relatedTools} />}
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-violet-400/40">🔱 Jaimini · Atmakaraka</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('atmakaraka.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('atmakaraka.subtitle')}</p>
      </div>

      {/* Hero: Atmakaraka */}
      <div className="glass-card rounded-2xl p-6 vedic-glow relative overflow-hidden">
        <div className="cosmic-orb w-28 h-28 bg-violet-600/8 -top-8 -right-8" />
        <div className="relative z-10">
          <div className="text-xs text-violet-400/80 tracking-wider font-medium mb-1">{t('atmakaraka.soulPlanet')}</div>
          <div className="text-3xl text-white font-display font-bold">
            {PLANET_GLYPH[data.ak.planet]} {getPlanetName(data.ak.planet, lang)}
          </div>
          <div className="text-sm text-zinc-400 mt-1">{data.ak.degreeInSign.toFixed(2)}°</div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/[0.03] rounded-xl p-3">
              <div className="text-xs text-zinc-500">{t('atmakaraka.soulLesson')}</div>
              <div className="text-zinc-200 text-sm mt-1">{akInfo!.lesson}</div>
            </div>
            <div className="bg-white/[0.03] rounded-xl p-3">
              <div className="text-xs text-zinc-500">{t('atmakaraka.soulDesire')}</div>
              <div className="text-zinc-200 text-sm mt-1">{akInfo!.desire}</div>
            </div>
            <div className="bg-white/[0.03] rounded-xl p-3">
              <div className="text-xs text-zinc-500">{t('atmakaraka.ishtaDevata')}</div>
              <div className="text-zinc-200 text-sm mt-1">{akInfo!.deity}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed AK Interpretation */}
      {data.akInterp && (
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-3">{getPlanetName(data.ak.planet, lang)} — {t('atmakaraka.title')}</h2>
          <p className="text-zinc-300 text-sm leading-relaxed">{data.akInterp}</p>
        </div>
      )}

      {/* Karakamsha */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-3">{t('atmakaraka.karakamshaSection')}</h2>
        <div className="flex items-center gap-4">
          <div className="text-3xl text-violet-400">
            {RASHI_GLYPH[RASHI_NAMES[data.karakamsha.rashi]]} {getRashiName(data.karakamsha.rashi, lang)}
          </div>
        </div>
        <p className="text-sm text-zinc-400 mt-2">{getPlanetName(data.ak.planet, lang)} — {getRashiNameByKey(data.karakamsha.rashiName, lang)} (D9)</p>
        {data.kkInterp && <p className="text-zinc-300 text-sm mt-3 leading-relaxed">{data.kkInterp}</p>}
      </div>

      {/* All 7 Chara Karakas */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">{t('atmakaraka.allKarakas')}</h2>
        <div className="space-y-3">
          {data.karakas.map(k => (
            <div key={k.type} className={`flex items-center justify-between rounded-xl px-4 py-3 ${k.type === 'AK' ? 'bg-violet-600/20 border border-violet-500/30' : 'bg-white/[0.03]'}`}>
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

      <SeoIntro headingKey="seo.atmakaraka.heading" textKey="seo.atmakaraka.text" />
      {VEDIC_SEO.atmakaraka.relatedTools && <RelatedTools tools={VEDIC_SEO.atmakaraka.relatedTools} />}
    </div>
  );
}
