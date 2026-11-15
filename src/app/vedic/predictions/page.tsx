'use client';
import { useState, useEffect } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { calculateVarshaphal } from '@/lib/vedic/predictions';
import { RASHI_NAMES } from '@/lib/vedic/constants';
import { RASHI_GLYPH } from '@/lib/vedic/glyphs';
import SeoIntro from '@/components/seo/SeoIntro';

export default function PredictionsPage() {
  const { chart } = useProfileChart();
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => { setYear(new Date().getFullYear()); }, []);

  if (!chart || year === null) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="🔮" title="Annual Predictions" description="Create a birth profile to view Varshaphal (annual horoscope), Muntha, and year lord." />
      <SeoIntro heading="What is Varshaphal?" text="Varshaphal (Tajaka annual chart) is a Solar Return chart cast for the exact moment the Sun returns to its natal position each year. Key components include the Muntha, the Year Lord, and Tajaka Yogas." />
    </div>
  );

  const varshaphal = calculateVarshaphal(chart, year);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3"><span className="text-xs text-violet-400/40">🔮 Predictions</span></div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Annual Predictions</h1>
        <p className="text-zinc-400 mt-1">Varshaphal (solar return) analysis</p>
      </div>

      <div className="flex gap-2 items-center">
        <button onClick={() => setYear(y => (y ?? year) - 1)} className="px-3 py-1.5 rounded-lg bg-white/5 text-zinc-300 hover:bg-white/10 transition">←</button>
        <span className="text-xl font-bold text-zinc-100 px-4">{year}</span>
        <button onClick={() => setYear(y => (y ?? year) + 1)} className="px-3 py-1.5 rounded-lg bg-white/5 text-zinc-300 hover:bg-white/10 transition">→</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card rounded-2xl p-6 text-center">
          <div className="text-xs text-zinc-500 mb-2">Solar Return</div>
          <div className="text-zinc-200 text-sm">{varshaphal.solarReturnDate.toLocaleDateString()}</div>
        </div>
        <div className="glass-card rounded-2xl p-6 text-center">
          <div className="text-xs text-zinc-500 mb-2">Varsha Lagna</div>
          <div className="text-violet-400 text-lg">{RASHI_GLYPH[RASHI_NAMES[varshaphal.varshaLagna]]} {RASHI_NAMES[varshaphal.varshaLagna]}</div>
        </div>
        <div className="glass-card rounded-2xl p-6 text-center">
          <div className="text-xs text-zinc-500 mb-2">Muntha</div>
          <div className="text-cyan-400 text-lg">{RASHI_GLYPH[RASHI_NAMES[varshaphal.muntha]]} {RASHI_NAMES[varshaphal.muntha]}</div>
          <div className="text-xs text-zinc-500 mt-1">Lord: {varshaphal.munthaLord}</div>
        </div>
        <div className="glass-card rounded-2xl p-6 text-center">
          <div className="text-xs text-zinc-500 mb-2">Year Lord</div>
          <div className="text-amber-400 text-lg">{varshaphal.yearLord}</div>
        </div>
      </div>
    </div>
  );
}
