'use client';
import { useMemo } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { calculateKPSubLord } from '@/lib/vedic/kp';
import { PLANET_GLYPH } from '@/lib/vedic/glyphs';
import type { Planet, KPData } from '@/lib/vedic/types';
import SeoIntro from '@/components/seo/SeoIntro';

export default function KPPage() {
  const { chart } = useProfileChart();

  const kpData = useMemo(() => {
    if (!chart) return null;
    const result: Record<string, KPData> = {};
    const allPlanets: Planet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
    for (const p of allPlanets) {
      result[p] = calculateKPSubLord(chart.planets[p].siderealLongitude);
    }
    result['Ascendant'] = calculateKPSubLord(chart.ascendant.longitude);
    return result;
  }, [chart]);

  if (!kpData) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="☉" title="KP System" description="Create a birth profile to see Krishnamurti Paddhati Sub-Lord analysis." />
      <SeoIntro heading="What is the KP System?" text="The Krishnamurti Paddhati (KP System) is a modern refinement of Vedic astrology developed by Prof. K.S. Krishnamurti. It divides each Nakshatra into 9 sub-divisions, creating a finer 249-level zodiac segmentation. It\'s prized for precise event timing." />
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-indigo-400/40">◈ ☉ ⭐</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">KP System</h1>
        <p className="text-zinc-400 mt-1">Krishnamurti Paddhati Sub-Lord table</p>
      </div>

      <div className="section-title mb-3">Sub-Lord Table</div>
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left py-3 px-5 text-zinc-400 text-xs font-medium uppercase tracking-wider">Point</th>
                <th className="text-left py-3 px-4 text-zinc-400 text-xs font-medium uppercase tracking-wider">Sign Lord</th>
                <th className="text-left py-3 px-4 text-zinc-400 text-xs font-medium uppercase tracking-wider">Star Lord</th>
                <th className="text-left py-3 px-4 text-zinc-400 text-xs font-medium uppercase tracking-wider">Sub Lord</th>
                <th className="text-left py-3 px-4 text-zinc-400 text-xs font-medium uppercase tracking-wider">Sub-Sub</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(kpData).map(([name, kp], i) => (
                <tr key={name} className={`border-b border-white/[0.03] transition hover:bg-violet-600/[0.03] ${name === 'Ascendant' ? 'bg-violet-500/[0.05]' : i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                  <td className="py-3 px-5 font-medium text-zinc-200">
                    {PLANET_GLYPH[name] && <span className="mr-2 text-base">{PLANET_GLYPH[name]}</span>}
                    {name}
                  </td>
                  <td className="py-3 px-4 text-zinc-300">{kp.signLord}</td>
                  <td className="py-3 px-4 text-zinc-300">{kp.starLord}</td>
                  <td className="py-3 px-4 text-violet-300 font-medium">{kp.subLord}</td>
                  <td className="py-3 px-4 text-zinc-400">{kp.subSubLord}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
