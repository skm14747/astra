'use client';
import { useMemo } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { generateExpandedRemedies } from '@/lib/vedic/remedies';
import { PLANET_GLYPH } from '@/lib/vedic/glyphs';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { useT } from '@/lib/i18n';

const typeConfig: Record<string, { icon: string; accent: string }> = {
  gemstone: { icon: '💎', accent: 'border-blue-500/20' },
  mantra: { icon: '🕉', accent: 'border-purple-500/20' },
  lifestyle: { icon: '🌿', accent: 'border-green-500/20' },
  ritual: { icon: '🪔', accent: 'border-yellow-500/20' },
};

export default function RemediesPage() {
  const { chart } = useProfileChart();

  const t = useT();
  const remedies = useMemo(() => {
    if (!chart) return [];
    return generateExpandedRemedies(chart);
  }, [chart]);

  if (!chart) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="💎" title={t('remedies.title')} description={t('empty.remedies')} />
      <SeoIntro headingKey="seo.remedies.heading" textKey="seo.remedies.text" />
      {VEDIC_SEO.remedies.relatedTools && <RelatedTools tools={VEDIC_SEO.remedies.relatedTools} />}
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-blue-400/40">💎 🕉 🌿 🪔</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('remedies.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('remedies.subtitle')}</p>
      </div>

      {remedies.length > 0 && (() => {
        const highCount = remedies.filter(r => r.priority === 'high').length;
        const types = ['gemstone', 'mantra', 'lifestyle', 'ritual'] as const;
        const grouped = types
          .map(t => ({ type: t, items: remedies.filter(r => r.type === t) }))
          .filter(g => g.items.length > 0);

        return (
          <>
            <div className="flex gap-3 flex-wrap">
              {highCount > 0 && <span className="planet-badge !bg-red-500/12 !border-red-500/20 !text-red-400">{highCount} High priority</span>}
              <span className="planet-badge">{remedies.length} Total remedies</span>
            </div>

            {grouped.map(group => {
              const cfg = typeConfig[group.type] || { icon: '✦', accent: '' };
              return (
                <div key={group.type}>
                  <div className="section-title mb-3">{cfg.icon} {group.type}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {group.items.map((r, i) => (
                      <div key={i} className={`glass-card rounded-xl p-5 ${cfg.accent} ${r.priority === 'high' ? 'vedic-glow' : ''}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{cfg.icon}</span>
                            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">{r.type}</span>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                            r.priority === 'high' ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : r.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                            : 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'
                          }`}>
                            {r.priority}
                          </span>
                        </div>
                        <h3 className="font-semibold text-zinc-100 mb-1">{r.recommendation}</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">{r.details}</p>
                        <div className="mt-3 text-xs text-zinc-600">
                          {PLANET_GLYPH[r.planet] && <span className="mr-1">{PLANET_GLYPH[r.planet]}</span>}
                          {r.planet}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        );
      })()}
    </div>
  );
}
