'use client';
import { useState, useEffect } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { calculateJaiminiData, getAmatyakarakaCareer, calculateCharaDasha, calculateBrahmaMaheshwaraRudra } from '@/lib/vedic/jaimini';
import { PLANET_GLYPH, RASHI_GLYPH } from '@/lib/vedic/glyphs';
import { RASHI_NAMES } from '@/lib/vedic/constants';
import SeoIntro from '@/components/seo/SeoIntro';

export default function JaiminiPage() {
  const { chart } = useProfileChart();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => { setNow(new Date()); }, []);

  if (!chart) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="◈" title="Jaimini Astrology" description="Create a birth profile to explore Jaimini Chara Karakas, Karakamsha, Arudha Padas, and Chara Dasha." />
      <SeoIntro heading="What is Jaimini Astrology?" text="Jaimini Sutras present a parallel system of Vedic astrology attributed to Sage Jaimini. Unlike Parashari astrology which focuses on planets, Jaimini emphasizes signs (Rashi) and their lords. The 7 Chara Karakas are planets ranked by degree." />
    </div>
  );

  const jaimini = calculateJaiminiData(chart);
  const career = getAmatyakarakaCareer(chart);
  const charaDasha = calculateCharaDasha(chart);
  const bmr = calculateBrahmaMaheshwaraRudra(chart);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-violet-400/40">◈ Jaimini</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Jaimini Astrology</h1>
        <p className="text-zinc-400 mt-1">Chara Karakas, Karakamsha, Arudha Padas, and sign-based analysis</p>
      </div>

      {/* Chara Karakas */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">Seven Chara Karakas</h2>
        <div className="space-y-3">
          {jaimini.charaKarakas.map(k => (
            <div key={k.type} className="flex items-center justify-between bg-white/[0.03] rounded-xl px-4 py-3">
              <div>
                <span className="text-violet-400 font-mono text-sm mr-2">{k.type}</span>
                <span className="text-zinc-300 text-sm">{k.fullName}</span>
              </div>
              <div className="text-right">
                <span className="text-zinc-100 font-medium">{PLANET_GLYPH[k.planet]} {k.planet}</span>
                <span className="text-zinc-500 text-xs ml-2">{k.degreeInSign.toFixed(2)}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Karakamsha + Career + BMR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-3">Karakamsha</h2>
          <p className="text-2xl text-violet-400">
            {RASHI_GLYPH[RASHI_NAMES[jaimini.karakamsha]]} {jaimini.karakamshaName}
          </p>
          <p className="text-xs text-zinc-500 mt-1">AK&apos;s sign in Navamsa (D9)</p>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-3">Career (AmK)</h2>
          <p className="text-zinc-200">{PLANET_GLYPH[career.planet]} {career.planet}</p>
          <p className="text-sm text-cyan-400 mt-1">{career.career}</p>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-3">Brahma · Maheshwara · Rudra</h2>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-zinc-400">Brahma</span><span className="text-zinc-200">{bmr.brahma}</span></div>
            <div className="flex justify-between"><span className="text-zinc-400">Maheshwara</span><span className="text-zinc-200">{bmr.maheshwara}</span></div>
            <div className="flex justify-between"><span className="text-zinc-400">Rudra</span><span className="text-zinc-200">{bmr.rudra}</span></div>
          </div>
        </div>
      </div>

      {/* Arudha Padas */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">Arudha Padas (A1–A12)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {jaimini.arudhaPadas.map(a => (
            <div key={a.house} className="bg-white/[0.03] rounded-xl p-3 text-center">
              <div className="text-xs text-zinc-500">A{a.house}</div>
              <div className="text-zinc-100 font-medium mt-1">
                {RASHI_GLYPH[a.padaRashiName]} {a.padaRashiName}
              </div>
              <div className="text-xs text-zinc-500">Lord: {a.lord}{a.exceptionApplied ? ' *' : ''}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-zinc-600 mt-3">* Parashara exception applied (1st/7th rule → +9 signs)</p>
      </div>

      {/* Chara Dasha */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">Chara Dasha</h2>
        <div className="space-y-2">
          {charaDasha.map((d, i) => {
            const isCurrent = now ? now >= d.startDate && now < d.endDate : false;
            return (
              <div key={i} className={`flex items-center justify-between px-4 py-2 rounded-lg ${isCurrent ? 'bg-violet-600/20 border border-violet-500/30' : 'bg-white/[0.02]'}`}>
                <span className={`font-medium ${isCurrent ? 'text-violet-300' : 'text-zinc-300'}`}>{d.lord}</span>
                <div className="text-right text-sm">
                  <span className="text-zinc-400">{d.startDate.getFullYear()} – {d.endDate.getFullYear()}</span>
                  <span className="text-zinc-600 ml-2">({d.durationYears}y)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
