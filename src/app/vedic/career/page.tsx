'use client';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { analyzeCareer } from '@/lib/vedic/career';
import { PLANET_GLYPH } from '@/lib/vedic/glyphs';
import type { Lang } from '@/lib/vedic/types';
import { getPlanetName, getDignityLabel } from '@/lib/vedic/domain-i18n';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { useT } from '@/lib/i18n';
import { useSettings } from '@/lib/settings/context';

export default function CareerPage() {
  const { chart } = useProfileChart();

  const { language } = useSettings();
  const t = useT();
  const lang = language as Lang;
  if (!chart) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="💼" title={t('career.title')} description={t('empty.career')} />
      <SeoIntro headingKey="seo.career.heading" textKey="seo.career.text" />
      {VEDIC_SEO.career.relatedTools && <RelatedTools tools={VEDIC_SEO.career.relatedTools} />}
    </div>
  );

  const career = analyzeCareer(chart);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3"><span className="text-xs text-violet-400/40">💼 Career</span></div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('career.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('career.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-4">{t('career.tenthHouse')}</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-zinc-400">{t('career.tenthLord')}</span><span className="text-zinc-200">{getPlanetName(career.tenthLord, lang)}</span></div>
            <div className="flex justify-between"><span className="text-zinc-400">{t('career.tenthLordHouse')}</span><span className="text-zinc-200">{t('rpt.th.house')} {career.tenthLordHouse}</span></div>
            <div className="flex justify-between"><span className="text-zinc-400">{t('career.tenthLordDignity')}</span><span className="text-zinc-200 capitalize">{getDignityLabel(career.tenthLordDignity as any, lang)}</span></div>
            <div className="flex justify-between"><span className="text-zinc-400">{t('career.planetsInTenth')}</span><span className="text-zinc-200">{career.planetsInTenth.length > 0 ? career.planetsInTenth.map(p => `${PLANET_GLYPH[p]} ${getPlanetName(p, lang)}`).join(', ') : t('rpt.none')}</span></div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-4">{t('career.indicators')}</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-zinc-400">{t('career.amatyakaraka')}</span><span className="text-zinc-200">{PLANET_GLYPH[career.amatyakaraka]} {getPlanetName(career.amatyakaraka, lang)}</span></div>
            <div className="flex justify-between"><span className="text-zinc-400">{t('career.domain')}</span><span className="text-cyan-400">{career.amatyakarakaCareer}</span></div>
            <div className="flex justify-between"><span className="text-zinc-400">{t('career.d10Strength')}</span><span className="text-zinc-200">{career.d10Strength}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
