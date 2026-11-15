'use client';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { analyzeHealth } from '@/lib/vedic/health';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { useT } from '@/lib/i18n';

export default function HealthPage() {
  const { chart } = useProfileChart();

  const t = useT();
  if (!chart) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="🏥" title={t('health.title')} description={t('empty.health')} />
      <SeoIntro headingKey="seo.health.heading" textKey="seo.health.text" />
      {VEDIC_SEO.health.relatedTools && <RelatedTools tools={VEDIC_SEO.health.relatedTools} />}
    </div>
  );

  const health = analyzeHealth(chart);
  const tierColor = health.ayushTier === 'Deerghayu' ? 'text-emerald-400' : health.ayushTier === 'Madhyayu' ? 'text-amber-400' : 'text-red-400';

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3"><span className="text-xs text-violet-400/40">🏥 Health</span></div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('health.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('health.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 text-center">
          <div className="text-xs text-zinc-500 mb-2">{t('health.ayushTier')}</div>
          <div className={`text-2xl font-bold ${tierColor}`}>{health.ayushTier}</div>
          <div className="text-xs text-zinc-500 mt-1">
            {health.ayushTier === 'Deerghayu' ? 'Long life (67–100+)' : health.ayushTier === 'Madhyayu' ? 'Medium life (33–66)' : 'Short life (0–32)'}
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <div className="text-xs text-zinc-500 mb-2">{t('health.maraka')}</div>
          <div className="text-zinc-200">{health.marakaLords.join(', ')}</div>
          <div className="text-xs text-zinc-500 mt-1">{t('rpt.th.house')} 2 & 7</div>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <div className="text-xs text-zinc-500 mb-2">{t('health.badhaka')}</div>
          <div className="text-zinc-200">{health.badhakaLord} ({t('rpt.th.house')} {health.badhakaHouse})</div>
          <div className="text-xs text-zinc-500 mt-1">{t('rpt.lord')}</div>
        </div>
      </div>

      {health.vulnerableAreas.length > 0 && (
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-4">{t('health.vulnerable')}</h2>
          <div className="space-y-2">
            {health.vulnerableAreas.map((area, i) => (
              <div key={i} className="flex items-center gap-3 bg-amber-500/5 rounded-xl px-4 py-3">
                <span className="text-amber-400">⚠</span>
                <span className="text-zinc-300 text-sm">{area}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
