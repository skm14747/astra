'use client';
import { useState, useMemo } from 'react';
import { calculateLoShuGrid } from '@/lib/numerology/core';
import { LO_SHU_MISSING, LO_SHU_PRESENT } from '@/lib/numerology/interpretations';
import { NUMEROLOGY_SEO } from '../seo';
import LocaleLink from '@/components/shared/LocaleLink';

const GRID_LABELS = [
  [4, 9, 2],
  [3, 5, 7],
  [8, 1, 6],
];

export default function LoShuGridPage() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [calculated, setCalculated] = useState(false);

  const result = useMemo(() => {
    if (!calculated || !day || !month || !year) return null;
    const d = parseInt(day, 10), m = parseInt(month, 10), y = parseInt(year, 10);
    if (isNaN(d) || isNaN(m) || isNaN(y) || d < 1 || d > 31 || m < 1 || m > 12 || y < 1900) return null;
    return calculateLoShuGrid(d, m, y);
  }, [calculated, day, month, year]);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-cyan-400/40">🐢 Lo Shu Grid</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Lo Shu Grid Calculator</h1>
        <p className="text-zinc-400 mt-1">3×3 magic square numerology from your birth date</p>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="grid grid-cols-3 gap-3 max-w-md">
          <div>
            <label className="text-sm text-zinc-400 block mb-1">Day</label>
            <input type="number" min="1" max="31" value={day} onChange={e => { setDay(e.target.value); setCalculated(false); }} placeholder="DD" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40" />
          </div>
          <div>
            <label className="text-sm text-zinc-400 block mb-1">Month</label>
            <input type="number" min="1" max="12" value={month} onChange={e => { setMonth(e.target.value); setCalculated(false); }} placeholder="MM" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40" />
          </div>
          <div>
            <label className="text-sm text-zinc-400 block mb-1">Year</label>
            <input type="number" min="1900" max="2030" value={year} onChange={e => { setYear(e.target.value); setCalculated(false); }} placeholder="YYYY" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/40" />
          </div>
        </div>
        <button onClick={() => setCalculated(true)} disabled={!day || !month || !year} className="mt-4 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors">
          Generate Lo Shu Grid
        </button>
      </div>

      {result && (
        <>
          {/* Grid Visualization */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-semibold text-zinc-100 text-lg mb-4">Your Lo Shu Grid</h2>
            <div className="flex justify-center mb-6">
              <div className="grid grid-cols-3 gap-2">
                {GRID_LABELS.map(row =>
                  row.map(num => {
                    const count = result.digitCounts[num];
                    return (
                      <div
                        key={num}
                        className={`w-20 h-20 flex flex-col items-center justify-center rounded-xl border-2 transition-all ${
                          count > 0
                            ? 'bg-cyan-600/20 border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                            : 'bg-white/[0.02] border-white/5'
                        }`}
                      >
                        <div className="text-xs text-zinc-500">{num}</div>
                        <div className={`text-xl font-bold ${count > 0 ? 'text-cyan-400' : 'text-zinc-700'}`}>
                          {count > 0 ? String(num).repeat(Math.min(count, 3)) : '—'}
                        </div>
                        {count > 1 && <div className="text-[10px] text-cyan-400/60">×{count}</div>}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white/[0.03] rounded-xl p-3">
                <div className="text-xs text-cyan-400 uppercase mb-1">Present Numbers</div>
                <div className="text-zinc-300">{result.presentNumbers.join(', ') || 'None'}</div>
              </div>
              <div className="bg-white/[0.03] rounded-xl p-3">
                <div className="text-xs text-amber-400 uppercase mb-1">Missing Numbers</div>
                <div className="text-zinc-300">{result.missingNumbers.join(', ') || 'None'}</div>
              </div>
            </div>
          </div>

          {/* Planes Analysis */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-semibold text-zinc-100 text-lg mb-4">Planes &amp; Arrows</h2>
            <div className="space-y-3">
              {result.planes.map(plane => (
                <div key={plane.name} className="flex items-center justify-between bg-white/[0.03] rounded-xl px-4 py-3">
                  <div>
                    <span className="text-zinc-200 text-sm font-medium">{plane.name}</span>
                    <span className="text-zinc-500 text-xs ml-2">({plane.numbers.join('-')})</span>
                    <p className="text-zinc-400 text-xs mt-0.5">{plane.meaning}</p>
                  </div>
                  <div className={`text-sm font-bold ${plane.present === plane.total ? 'text-cyan-400' : plane.present === 0 ? 'text-red-400' : 'text-amber-400'}`}>
                    {plane.present}/{plane.total}
                    {plane.present === plane.total && ' ✓'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Missing Number Interpretations */}
          {result.missingNumbers.length > 0 && (
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-semibold text-zinc-100 text-lg mb-4">Missing Numbers — Karmic Lessons</h2>
              <div className="space-y-3">
                {result.missingNumbers.map(n => (
                  <div key={n} className="bg-white/[0.03] rounded-xl p-3">
                    <p className="text-zinc-300 text-sm">{LO_SHU_MISSING[n]}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Present Number Strengths */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-semibold text-zinc-100 text-lg mb-4">Present Numbers — Strengths</h2>
            <div className="space-y-3">
              {result.presentNumbers.map(n => (
                <div key={n} className="bg-white/[0.03] rounded-xl p-3">
                  <p className="text-zinc-300 text-sm">{LO_SHU_PRESENT[n]}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-100">{NUMEROLOGY_SEO['lo-shu-grid'].seoIntro.heading}</h2>
        <p className="text-zinc-400 text-sm leading-relaxed">{NUMEROLOGY_SEO['lo-shu-grid'].seoIntro.text}</p>
      </div>

      {NUMEROLOGY_SEO['lo-shu-grid'].relatedTools && (
        <div className="flex flex-wrap gap-2">
          {NUMEROLOGY_SEO['lo-shu-grid'].relatedTools!.map(t => (
            <LocaleLink key={t.href} href={t.href} className="text-sm text-violet-400 hover:text-violet-300 bg-violet-600/10 rounded-lg px-3 py-1.5 transition-colors">{t.label}</LocaleLink>
          ))}
        </div>
      )}
    </div>
  );
}
