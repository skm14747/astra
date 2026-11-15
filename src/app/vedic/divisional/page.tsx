'use client';
import { useMemo, useState, useRef } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import ExportButton from '@/components/shared/ExportButton';
import SouthIndianChart from '@/components/vedic/SouthIndianChart';
import { getAllVargas } from '@/lib/vedic/vargas';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { useT } from '@/lib/i18n';

const IMPORTANT_VARGAS = ['d1', 'd9', 'd10'];

export default function DivisionalPage() {
  const { chart } = useProfileChart();
  const t = useT();
  const [selectedVarga, setSelectedVarga] = useState<string>('d1');
  const chartRef = useRef<HTMLDivElement>(null);

  const vargas = useMemo(() => {
    if (!chart) return {};
    return getAllVargas(chart.ascendant.longitude, chart.planets);
  }, [chart]);

  if (!chart) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="☉" title={t('divisional.title')} description={t('empty.divisional')} />
      <SeoIntro headingKey="seo.divisional.heading" textKey="seo.divisional.text" />
      {VEDIC_SEO.divisional.relatedTools && <RelatedTools tools={VEDIC_SEO.divisional.relatedTools} />}
    </div>
  );

  const vargaKeys = Object.keys(vargas);
  const currentVarga = vargas[selectedVarga];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-violet-400/40">◎ D1 D9 D10</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('divisional.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('divisional.subtitle')}</p>
      </div>

      <div className="section-title mb-3">{t('divisional.selectVarga')}</div>
      <div className="flex gap-3 items-center flex-wrap">
        <select
          value={selectedVarga}
          onChange={e => setSelectedVarga(e.target.value)}
          className="bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm focus:border-violet-500 outline-none transition"
        >
          {vargaKeys.map(k => (
            <option key={k} value={k}>{k.toUpperCase()} — {vargas[k].name}</option>
          ))}
        </select>

        <div className="flex gap-2">
          {IMPORTANT_VARGAS.filter(v => vargas[v]).map(v => (
            <button
              key={v}
              onClick={() => setSelectedVarga(v)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition ${
                selectedVarga === v
                  ? 'bg-violet-500/15 text-violet-300 border border-violet-500/30'
                  : 'glass-card text-zinc-400 hover:text-white'
              }`}
            >
              {v.toUpperCase()}
            </button>
          ))}
        </div>

        {currentVarga && <ExportButton targetRef={chartRef} filename={`astra-${selectedVarga}`} />}
      </div>

      {currentVarga && (
        <div>
          <p className="text-sm text-zinc-400 mb-4">
            {t('divisional.showing')} <strong className="text-zinc-200">{selectedVarga.toUpperCase()}</strong> — {currentVarga.name}
          </p>
          <div ref={chartRef} className="glass-card rounded-2xl p-5 inline-block vedic-glow">
            <SouthIndianChart
              houses={currentVarga.houses}
              ascendantRashi={currentVarga.ascendantRashi}
              title={`${selectedVarga.toUpperCase()} ${currentVarga.name}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
