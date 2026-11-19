'use client';
import { useMemo } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { calculateAllArudhaPadas } from '@/lib/vedic/lagnas';
import { calculateCharaKarakas } from '@/lib/vedic/jaimini';
import { PLANET_GLYPH, RASHI_GLYPH } from '@/lib/vedic/glyphs';
import { RASHI_NAMES, RASHI_LORDS } from '@/lib/vedic/constants';
import type { RashiIndex, Lang } from '@/lib/vedic/types';
import { getPlanetName, getRashiName, getRashiNameByKey } from '@/lib/vedic/domain-i18n';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { useT } from '@/lib/i18n';
import { useSettings } from '@/lib/settings/context';

export default function UpapadaPage() {
  const { chart } = useProfileChart();
  const { language } = useSettings();
  const t = useT();
  const lang = language as Lang;

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
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('upapada.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('upapada.subtitle')}</p>
      </div>

      {/* Hero: Upapada */}
      <div className="glass-card rounded-2xl p-6 vedic-glow relative overflow-hidden">
        <div className="cosmic-orb w-28 h-28 bg-rose-600/8 -top-8 -right-8" />
        <div className="relative z-10">
          <div className="text-xs text-rose-400/80 tracking-wider font-medium mb-1">{t('upapada.ulLabel')}</div>
          <div className="text-3xl text-white font-display font-bold">
            {RASHI_GLYPH[data.ulSignName]} {getRashiNameByKey(data.ulSignName, lang)}
          </div>
          <div className="text-sm text-zinc-400 mt-1">{t('rpt.lord')}: {PLANET_GLYPH[data.ulLord]} {getPlanetName(data.ulLord, lang)}{data.ul.exceptionApplied ? ` (${t('common.exceptionApplied')})` : ''}</div>
        </div>
      </div>

      {/* Marriage Analysis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-3">{t('upapada.signAnalysis')}</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">{t('upapada.ulSign')}</span>
              <span className="text-zinc-200">{RASHI_GLYPH[data.ulSignName]} {getRashiNameByKey(data.ulSignName, lang)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">{t('upapada.ulLord')}</span>
              <span className="text-zinc-200">{PLANET_GLYPH[data.ulLord]} {getPlanetName(data.ulLord, lang)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">{t('upapada.planetsInUL')}</span>
              <span className="text-zinc-200">{data.planetsInUL.length > 0 ? data.planetsInUL.map(p => `${PLANET_GLYPH[p]} ${getPlanetName(p, lang)}`).join(', ') : t('rpt.none')}</span>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-3">{t('upapada.gaunapada')}</h2>
          <p className="text-xs text-zinc-500 mb-3">{t('upapada.gaunapadaDesc')}</p>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">{t('upapada.gaunapadaSign')}</span>
              <span className="text-zinc-200">{RASHI_GLYPH[data.gaunapadaName]} {getRashiNameByKey(data.gaunapadaName, lang)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">{t('upapada.gaunapadaLord')}</span>
              <span className="text-zinc-200">{PLANET_GLYPH[data.gaunapadaLord]} {getPlanetName(data.gaunapadaLord, lang)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cross-reference with DK */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-3">{t('upapada.dkConnection')}</h2>
        <p className="text-sm text-zinc-400 mb-3">{t('upapada.dkConnectionDesc')}</p>
        <div className="bg-white/[0.03] rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-zinc-500">{t('upapada.yourDK')}</div>
            <div className="text-zinc-200 font-medium mt-1">{PLANET_GLYPH[data.dk.planet]} {getPlanetName(data.dk.planet, lang)} ({data.dk.fullName})</div>
          </div>
          <a href="/vedic/darakaraka" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
            {t('upapada.viewDKAnalysis')}
          </a>
        </div>
      </div>

      <SeoIntro headingKey="seo.upapada.heading" textKey="seo.upapada.text" />
      {VEDIC_SEO.upapada.relatedTools && <RelatedTools tools={VEDIC_SEO.upapada.relatedTools} />}
    </div>
  );
}
