'use client';
import { useMemo } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { getNakshatraDetails, isPanchak, getNakshatraCharacteristics } from '@/lib/vedic/nakshatra';
import SeoIntro from '@/components/seo/SeoIntro';

export default function NakshatraPage() {
  const { chart } = useProfileChart();

  const data = useMemo(() => {
    if (!chart) return null;
    const moonLon = chart.planets.Moon.siderealLongitude;
    const details = getNakshatraDetails(moonLon);
    const chars = getNakshatraCharacteristics(details.index);
    const panchak = isPanchak(details.index);
    return { details, chars, panchak };
  }, [chart]);

  if (!data) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="⭐" title="Nakshatra Analysis" description="Create a birth profile to analyze your birth Nakshatra." />
      <SeoIntro heading="What is a Nakshatra?" text="Nakshatras are the 27 lunar mansions of Vedic astrology, each spanning 13°20\' of the zodiac. Your birth Nakshatra reveals your emotional nature, instinctive reactions, and deep personality traits. Each has a ruling deity, planetary lord, Gana, Nadi, and animal symbol." />
    </div>
  );

  const items = [
    { label: 'Nakshatra', value: `${data.details.name} (#${data.details.index + 1})`, icon: '⭐' },
    { label: 'Pada', value: String(data.details.pada), icon: '◈' },
    { label: 'Lord', value: data.details.lord, icon: '👑' },
    { label: 'Degree in Nakshatra', value: `${data.details.degreeInNakshatra.toFixed(2)}°`, icon: '📐' },
    { label: 'Progress', value: `${data.details.percentComplete.toFixed(1)}%`, icon: '📊' },
    { label: 'Deity', value: data.chars.deity, icon: '🙏' },
    { label: 'Symbol', value: data.chars.symbol, icon: '🔱' },
    { label: 'Nature', value: data.chars.nature, icon: '🌿' },
    { label: 'Panchak', value: data.panchak?.isPanchak ? `Yes (${data.panchak.type})` : 'No', icon: '⚠' },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-cyan-400/40">⭐ ☽ ✧</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Nakshatra Analysis</h1>
        <p className="text-zinc-400 mt-1">Your birth Moon Nakshatra and its characteristics</p>
      </div>

      {/* Hero card */}
      <div className="glass-card rounded-2xl p-6 vedic-glow relative overflow-hidden">
        <div className="cosmic-orb w-28 h-28 bg-violet-600/8 -top-8 -right-8" />
        <div className="relative z-10">
          <div className="text-xs text-violet-400/80 uppercase tracking-wider font-medium mb-1">Birth Nakshatra</div>
          <div className="text-2xl text-white font-display font-bold">{data.details.name} <span className="text-lg text-zinc-500">#{data.details.index + 1}</span></div>
          <div className="flex items-center gap-3 mt-2 text-sm text-zinc-400">
            <span className="planet-badge">Pada {data.details.pada}</span>
            <span>Lord: {data.details.lord}</span>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-zinc-500 mb-1.5">
              <span>0°</span>
              <span>{data.details.percentComplete.toFixed(1)}% through nakshatra</span>
              <span>13°20&apos;</span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400 transition-all" style={{ width: `${data.details.percentComplete}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Characteristics */}
      <div>
        <div className="section-title mb-3">Characteristics</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Deity', value: data.chars.deity, icon: '🙏' },
            { label: 'Symbol', value: data.chars.symbol, icon: '🔱' },
            { label: 'Nature', value: data.chars.nature, icon: '🌿' },
            { label: 'Panchak', value: data.panchak?.isPanchak ? `Yes (${data.panchak.type})` : 'No', icon: '⚠' },
          ].map(item => (
            <div key={item.label} className="glass-card rounded-xl p-4 glow-hover">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">{item.icon}</span>
                <span className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">{item.label}</span>
              </div>
              <div className="text-sm font-semibold text-zinc-100">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Position Details */}
      <div>
        <div className="section-title mb-3">Position Details</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Degree in Nakshatra', value: `${data.details.degreeInNakshatra.toFixed(2)}°`, icon: '📐' },
            { label: 'Progress', value: `${data.details.percentComplete.toFixed(1)}%`, icon: '📊' },
          ].map(item => (
            <div key={item.label} className="glass-card rounded-xl p-4 glow-hover">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">{item.icon}</span>
                <span className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">{item.label}</span>
              </div>
              <div className="text-sm font-semibold text-zinc-100">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
