'use client';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { analyzeWealth } from '@/lib/vedic/wealth';
import { RASHI_NAMES } from '@/lib/vedic/constants';
import { RASHI_GLYPH } from '@/lib/vedic/glyphs';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { useT } from '@/lib/i18n';

export default function WealthPage() {
  const { chart } = useProfileChart();

  const t = useT();
  if (!chart) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="💰" title={t('wealth.title')} description={t('empty.wealth')} />
      <SeoIntro headingKey="seo.wealth.heading" textKey="seo.wealth.text" />
      {VEDIC_SEO.wealth.relatedTools && <RelatedTools tools={VEDIC_SEO.wealth.relatedTools} />}
    </div>
  );

  const wealth = analyzeWealth(chart);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3"><span className="text-xs text-violet-400/40">💰 Wealth</span></div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('wealth.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('wealth.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6 text-center">
          <div className="text-xs text-zinc-500 mb-2">Indu Lagna</div>
          <div className="text-2xl text-violet-400">{RASHI_GLYPH[RASHI_NAMES[wealth.induLagna]]} {RASHI_NAMES[wealth.induLagna]}</div>
          <div className="text-xs text-zinc-500 mt-1">Wealth potential indicator</div>
        </div>
        <div className="glass-card rounded-2xl p-6 text-center">
          <div className="text-xs text-zinc-500 mb-2">2nd House SAV</div>
          <div className={`text-2xl font-bold ${wealth.savSecondHouse >= 28 ? 'text-emerald-400' : 'text-amber-400'}`}>{wealth.savSecondHouse}</div>
          <div className="text-xs text-zinc-500 mt-1">Lord: {wealth.secondLord}</div>
        </div>
        <div className="glass-card rounded-2xl p-6 text-center">
          <div className="text-xs text-zinc-500 mb-2">11th House SAV</div>
          <div className={`text-2xl font-bold ${wealth.savEleventhHouse >= 28 ? 'text-emerald-400' : 'text-amber-400'}`}>{wealth.savEleventhHouse}</div>
          <div className="text-xs text-zinc-500 mt-1">Lord: {wealth.eleventhLord}</div>
        </div>
      </div>

      {wealth.dhanaYogas.length > 0 && (
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-4">Dhana Yogas Detected</h2>
          <div className="space-y-2">
            {wealth.dhanaYogas.map((y, i) => (
              <div key={i} className="flex items-center gap-3 bg-emerald-500/5 rounded-xl px-4 py-3">
                <span className="text-emerald-400">✦</span>
                <span className="text-zinc-200 text-sm">{y}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
