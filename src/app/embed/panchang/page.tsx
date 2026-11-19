'use client';

import { useMemo, useState, useEffect } from 'react';
import { calculatePanchang } from '@/lib/vedic/panchang';
import { calculateRahuKalam } from '@/lib/vedic/muhurta';

const DEFAULT_LOCATION = { latitude: 28.6139, longitude: 77.209, label: 'New Delhi' };

const MOON_PHASES = [
  '🌑','🌒','🌒','🌒','🌓','🌓','🌔','🌔',
  '🌕','🌕','🌖','🌖','🌗','🌗','🌘','🌘',
  '🌑','🌒','🌒','🌒','🌓','🌓','🌔','🌔',
  '🌕','🌕','🌖','🌖','🌗','🌗','🌘',
];

function formatTime(d: Date): string {
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

export default function EmbedPanchangPage() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const panchang = useMemo(() => {
    if (!now) return null;
    return calculatePanchang(now, DEFAULT_LOCATION, 'lahiri');
  }, [now]);

  const rahuKaal = useMemo(() => {
    if (!panchang?.sunrise || !panchang?.sunset) return null;
    return calculateRahuKalam(panchang.sunrise, panchang.sunset, panchang.vara.index);
  }, [panchang]);

  if (!panchang || !now) {
    return (
      <div className="flex items-center justify-center p-8 text-zinc-400 text-sm animate-pulse">
        Calculating Panchang...
      </div>
    );
  }

  const moonPhase = MOON_PHASES[panchang.tithi.index] || '🌙';
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="w-full max-w-md mx-auto bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 shadow-xl flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
        <div>
          <div className="text-xs tracking-wider text-violet-400 font-medium">Daily Vedic Panchang</div>
          <div className="text-sm font-semibold text-white mt-0.5">{dateStr}</div>
        </div>
        <div className="text-2xl">{moonPhase}</div>
      </div>

      {/* Grid of Key Panchang Elements */}
      <div className="grid grid-cols-2 gap-2.5 my-3 text-xs">
        <div className="bg-zinc-800/50 rounded-xl p-2.5 border border-zinc-700/40">
          <span className="text-zinc-400 block text-[11px]">Tithi</span>
          <span className="text-white font-medium text-sm truncate block mt-0.5">{panchang.tithi.name}</span>
          <span className="text-zinc-500 text-[10px] block mt-0.5">{panchang.tithi.paksha} Paksha</span>
        </div>

        <div className="bg-zinc-800/50 rounded-xl p-2.5 border border-zinc-700/40">
          <span className="text-zinc-400 block text-[11px]">Nakshatra</span>
          <span className="text-white font-medium text-sm truncate block mt-0.5">{panchang.nakshatra.name}</span>
          <span className="text-zinc-500 text-[10px] block mt-0.5">Lord: {panchang.nakshatra.lord}</span>
        </div>

        <div className="bg-zinc-800/50 rounded-xl p-2.5 border border-zinc-700/40">
          <span className="text-zinc-400 block text-[11px]">Rahu Kaal</span>
          <span className="text-amber-400 font-medium text-sm block mt-0.5">
            {rahuKaal ? `${formatTime(rahuKaal.start)} - ${formatTime(rahuKaal.end)}` : '—'}
          </span>
          <span className="text-zinc-500 text-[10px] block mt-0.5">Inauspicious Period</span>
        </div>

        <div className="bg-zinc-800/50 rounded-xl p-2.5 border border-zinc-700/40">
          <span className="text-zinc-400 block text-[11px]">Sunrise / Sunset</span>
          <span className="text-white font-medium text-sm block mt-0.5">
            {panchang.sunrise ? formatTime(panchang.sunrise) : '—'} / {panchang.sunset ? formatTime(panchang.sunset) : '—'}
          </span>
          <span className="text-zinc-500 text-[10px] block mt-0.5">Standard Observer</span>
        </div>
      </div>

      {/* Contextual Backlink / Powered By Attribution */}
      <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
        <span>NASA JPL Precision</span>
        <a
          href="https://astradestiny.com/vedic/panchang"
          target="_blank"
          rel="noopener"
          className="text-violet-400 hover:text-violet-300 font-medium inline-flex items-center gap-1 transition"
        >
          Powered by Astra Destiny ↗
        </a>
      </div>
    </div>
  );
}
