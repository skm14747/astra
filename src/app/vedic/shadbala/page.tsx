'use client';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { calculateShadbala, calculateVimsopakaBala, calculateVaiseshikamsa, calculateBhavaBala } from '@/lib/vedic/shadbala';
import { PLANET_GLYPH } from '@/lib/vedic/glyphs';
import type { GrahaPlanet } from '@/lib/vedic/types';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { useT } from '@/lib/i18n';

const GRAHAS: GrahaPlanet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

export default function ShadbalaPage() {
  const { chart } = useProfileChart();

  const t = useT();
  if (!chart) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="⚖" title={t('shadbala.title')} description={t('empty.shadbala')} />
      <SeoIntro headingKey="seo.shadbala.heading" textKey="seo.shadbala.text" />
      {VEDIC_SEO.shadbala.relatedTools && <RelatedTools tools={VEDIC_SEO.shadbala.relatedTools} />}
    </div>
  );

  const shadbala = calculateShadbala(chart);
  const vimsopaka = calculateVimsopakaBala(chart);
  const vaiseshikamsa = calculateVaiseshikamsa(chart);
  const bhavaBala = calculateBhavaBala(chart);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-violet-400/40">⚖ Shadbala</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('shadbala.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('shadbala.subtitle')}</p>
      </div>

      {/* Main Shadbala Table */}
      <div className="glass-card rounded-2xl p-6 overflow-x-auto">
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">{t('shadbala.strengthTable')}</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-zinc-400 border-b border-white/5">
              <th className="text-left py-2 pr-3">{t('rpt.th.planet')}</th>
              <th className="text-right px-2">Sthana</th>
              <th className="text-right px-2">Dig</th>
              <th className="text-right px-2">Kala</th>
              <th className="text-right px-2">Cheshta</th>
              <th className="text-right px-2">Naisarg.</th>
              <th className="text-right px-2">Drik</th>
              <th className="text-right px-2 font-bold">{t('common.total')}</th>
              <th className="text-right px-2">{t('rpt.th.required')}</th>
              <th className="text-right pl-2">{t('rpt.th.ratio')}</th>
            </tr>
          </thead>
          <tbody>
            {GRAHAS.map(p => {
              const s = shadbala.planets[p];
              const ratioColor = s.ratio >= 1 ? 'text-emerald-400' : 'text-amber-400';
              return (
                <tr key={p} className="border-b border-white/5">
                  <td className="py-2 pr-3 text-zinc-200">{PLANET_GLYPH[p]} {p}</td>
                  <td className="text-right px-2 text-zinc-300">{Math.round(s.sthanaBala)}</td>
                  <td className="text-right px-2 text-zinc-300">{Math.round(s.digBala)}</td>
                  <td className="text-right px-2 text-zinc-300">{Math.round(s.kalaBala)}</td>
                  <td className="text-right px-2 text-zinc-300">{Math.round(s.cheshtaBala)}</td>
                  <td className="text-right px-2 text-zinc-300">{Math.round(s.naisargikaBala)}</td>
                  <td className="text-right px-2 text-zinc-300">{Math.round(s.drikBala)}</td>
                  <td className="text-right px-2 font-bold text-zinc-100">{Math.round(s.total)}</td>
                  <td className="text-right px-2 text-zinc-500">{s.required}</td>
                  <td className={`text-right pl-2 font-mono ${ratioColor}`}>{s.ratio.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Ishta / Kashta Phala */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-4">{t('shadbala.ishta')}</h2>
          <div className="space-y-2">
            {GRAHAS.map(p => (
              <div key={p} className="flex justify-between text-sm">
                <span className="text-zinc-300">{PLANET_GLYPH[p]} {p}</span>
                <span className="text-emerald-400 font-mono">{shadbala.ishtaPhala[p].toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-4">{t('shadbala.kashta')}</h2>
          <div className="space-y-2">
            {GRAHAS.map(p => (
              <div key={p} className="flex justify-between text-sm">
                <span className="text-zinc-300">{PLANET_GLYPH[p]} {p}</span>
                <span className="text-amber-400 font-mono">{shadbala.kashtaPhala[p].toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vimsopaka + Vaiseshikamsa */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-4">{t('shadbala.vimsopaka')}</h2>
          <div className="space-y-2">
            {GRAHAS.map(p => (
              <div key={p} className="flex justify-between text-sm">
                <span className="text-zinc-300">{PLANET_GLYPH[p]} {p}</span>
                <span className="text-violet-400 font-mono">{vimsopaka[p].toFixed(1)} / 20</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-4">{t('shadbala.vaiseshikamsa')}</h2>
          <div className="space-y-2">
            {GRAHAS.map(p => (
              <div key={p} className="flex justify-between text-sm">
                <span className="text-zinc-300">{PLANET_GLYPH[p]} {p}</span>
                <span className="text-cyan-400">{vaiseshikamsa[p].classification} ({vaiseshikamsa[p].count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bhava Bala */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">{t('shadbala.bhavaBala')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {bhavaBala.houses.map(h => (
            <div key={h.house} className="bg-white/[0.03] rounded-xl p-3 text-center">
              <div className="text-xs text-zinc-500 mb-1">House {h.house}</div>
              <div className="text-lg font-bold text-zinc-100">{Math.round(h.total)}</div>
              <div className="text-xs text-zinc-500 mt-1">
                Lord: {Math.round(h.bhavadhipatiBala)} · Dig: {h.bhavaDigBala} · Asp: {h.bhavaDrishtiBala}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
