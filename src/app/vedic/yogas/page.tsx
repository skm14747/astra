'use client';
import { useMemo } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { detectAllYogas } from '@/lib/vedic/yogas';
import { detectAllDoshas } from '@/lib/vedic/doshas';
import SeoIntro from '@/components/seo/SeoIntro';

export default function YogasPage() {
  const { chart } = useProfileChart();

  const { yogas, doshas } = useMemo(() => {
    if (!chart) return { yogas: [], doshas: [] };
    return { yogas: detectAllYogas(chart), doshas: detectAllDoshas(chart) };
  }, [chart]);

  if (!chart) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="✦" title="Yoga & Dosha Analysis" description="Create a birth profile to detect planetary yogas and doshas in your chart." />
      <SeoIntro heading="What are Yogas and Doshas?" text="Yogas are specific planetary combinations that produce auspicious or inauspicious results in a birth chart. Raja Yoga can indicate fame and authority, while Dhana Yoga signals wealth. Doshas are afflictions — Manglik Dosha affects marriage compatibility, Kaal Sarp Dosha creates recurring obstacles, and Pitra Dosha indicates ancestral karma." />
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-emerald-400/40">✦ ♃ ♀ ☉</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Yogas & Doshas</h1>
        <p className="text-zinc-400 mt-1">Planetary combinations and afflictions in your chart</p>
      </div>

      {/* Summary strip */}
      <div className="flex gap-3 flex-wrap">
        {yogas.length > 0 && <span className="planet-badge !bg-emerald-500/12 !border-emerald-500/20 !text-emerald-400">{yogas.length} Yogas found</span>}
        {doshas.filter(d => d.isActive).length > 0 && <span className="planet-badge !bg-red-500/12 !border-red-500/20 !text-red-400">{doshas.filter(d => d.isActive).length} Doshas active</span>}
      </div>

      {yogas.length > 0 && (() => {
        const strong = yogas.filter(y => y.strength === 'Strong');
        const medium = yogas.filter(y => y.strength === 'Medium');
        const weak = yogas.filter(y => y.strength === 'Weak' || (y.strength !== 'Strong' && y.strength !== 'Medium'));
        const groups = [
          { label: 'Strong Yogas', items: strong },
          { label: 'Medium Yogas', items: medium },
          { label: 'Other Yogas', items: weak },
        ].filter(g => g.items.length > 0);
        return (
          <div className="space-y-6">
            {groups.map(group => (
              <div key={group.label}>
                <div className="section-title mb-3">{group.label}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {group.items.map((y, i) => (
                    <div key={i} className="glass-card rounded-xl p-5 vedic-glow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-zinc-100">{y.name}</h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-500/10 text-green-400 border border-green-500/20">{y.strength}</span>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed">{y.description}</p>
                      <div className="mt-3 flex gap-2 flex-wrap">
                        {y.planets.map(p => (
                          <span key={p} className="px-2 py-0.5 rounded text-[10px] bg-white/[0.04] text-zinc-500">{p}</span>
                        ))}
                        {y.houses.map(h => (
                          <span key={h} className="px-2 py-0.5 rounded text-[10px] bg-white/[0.04] text-zinc-500">H{h}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      })()}

      {doshas.length > 0 && (
        <div>
          <div className="section-title mb-4">Dosha Analysis</div>
          <div className="space-y-3">
            {doshas.map((d, i) => (
              <div key={i} className={`glass-card rounded-xl p-5 ${d.isActive ? 'vedic-glow border-red-500/20' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-zinc-100">{d.name}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                    d.isActive ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'
                  }`}>
                    {d.isActive ? `Active · ${d.severity}` : 'Not Present'}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{d.description}</p>
                {d.type && <p className="text-xs text-zinc-500 mt-2">Type: {d.type}</p>}
                {d.cancellation && <p className="text-xs text-green-400/80 mt-1">✦ Cancellation: {d.cancellation}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
