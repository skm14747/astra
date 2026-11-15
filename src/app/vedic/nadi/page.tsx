'use client';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { getAllNadiPoints, calculateNadiAmsha } from '@/lib/vedic/nadi';
import { RASHI_GLYPH } from '@/lib/vedic/glyphs';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { useT } from '@/lib/i18n';

export default function NadiPage() {
  const { chart } = useProfileChart();

  const t = useT();
  if (!chart) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="🔱" title={t('nadi.title')} description={t('empty.nadi')} />
      <SeoIntro headingKey="seo.nadi.heading" textKey="seo.nadi.text" />
      {VEDIC_SEO.nadi.relatedTools && <RelatedTools tools={VEDIC_SEO.nadi.relatedTools} />}
    </div>
  );

  const nadiPoints = getAllNadiPoints(chart);
  const moonAmsha = calculateNadiAmsha(chart.planets.Moon.siderealLongitude);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3"><span className="text-xs text-violet-400/40">🔱 Nadi</span></div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('nadi.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('nadi.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {nadiPoints.map((pt) => (
          <div key={pt.name} className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl text-violet-400">{RASHI_GLYPH[pt.rashiName] ?? '●'}</span>
              <div>
                <h2 className="text-lg font-semibold text-zinc-100">{pt.name}</h2>
                <div className="text-sm text-zinc-400">{pt.rashiName} {(pt.longitude % 30).toFixed(2)}°</div>
              </div>
            </div>
            <p className="text-sm text-zinc-300">{pt.description}</p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">{t('nadi.amsha')}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-zinc-500">Division</div>
            <div className="text-xl text-violet-400 font-bold">{moonAmsha.division} / 150</div>
          </div>
          <div>
            <div className="text-xs text-zinc-500">Deity Group</div>
            <div className="text-xl text-amber-400 font-bold">{moonAmsha.deityGroup}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
