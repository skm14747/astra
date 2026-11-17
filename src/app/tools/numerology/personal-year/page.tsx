'use client';
import { useState, useMemo, useEffect } from 'react';
import { calculatePersonalYear, calculatePersonalMonth } from '@/lib/numerology/core';
import { PERSONAL_YEAR_MEANINGS } from '@/lib/numerology/interpretations';
import { NUMEROLOGY_SEO } from '../seo';
import LocaleLink from '@/components/shared/LocaleLink';

export default function PersonalYearPage() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [calculated, setCalculated] = useState(false);
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const result = useMemo(() => {
    if (!calculated || !day || !month) return null;
    const d = parseInt(day, 10), m = parseInt(month, 10);
    if (isNaN(d) || isNaN(m) || d < 1 || d > 31 || m < 1 || m > 12) return null;

    const years = [];
    for (let y = currentYear - 1; y <= currentYear + 2; y++) {
      const py = calculatePersonalYear(d, m, y);
      const meaning = PERSONAL_YEAR_MEANINGS[py.number];
      const months = Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        number: calculatePersonalMonth(py.number, i + 1),
      }));
      years.push({ ...py, meaning, months });
    }
    return years;
  }, [calculated, day, month, currentYear]);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-amber-400/40">📅 Personal Year</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Personal Year Number Calculator</h1>
        <p className="text-zinc-400 mt-1">9-year numerology cycle forecast</p>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <p className="text-sm text-zinc-400 mb-3">Enter your birth month and day (year not needed for Personal Year):</p>
        <div className="grid grid-cols-2 gap-3 max-w-xs">
          <div>
            <label className="text-sm text-zinc-400 block mb-1">Birth Day</label>
            <input type="number" min="1" max="31" value={day} onChange={e => { setDay(e.target.value); setCalculated(false); }} placeholder="DD" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40" />
          </div>
          <div>
            <label className="text-sm text-zinc-400 block mb-1">Birth Month</label>
            <input type="number" min="1" max="12" value={month} onChange={e => { setMonth(e.target.value); setCalculated(false); }} placeholder="MM" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40" />
          </div>
        </div>
        <button onClick={() => setCalculated(true)} disabled={!day || !month} className="mt-4 px-6 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors">
          Calculate
        </button>
      </div>

      {result && (
        <div className="space-y-6">
          {result.map(yr => (
            <div key={yr.year} className={`glass-card rounded-2xl p-6 ${yr.year === currentYear ? 'vedic-glow ring-1 ring-amber-500/30' : ''}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl font-display font-bold text-amber-400">{yr.number}</div>
                <div>
                  <div className="text-zinc-200 font-semibold">{yr.year} {yr.year === currentYear ? '(Current Year)' : ''}</div>
                  {yr.meaning && <div className="text-sm text-amber-400">{yr.meaning.title}</div>}
                </div>
              </div>
              {yr.meaning && (
                <>
                  <p className="text-zinc-400 text-sm mb-2">{yr.meaning.theme}</p>
                  <p className="text-zinc-300 text-sm">{yr.meaning.advice}</p>
                </>
              )}
              <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-1">
                {yr.months.map(pm => (
                  <div key={pm.month} className="bg-white/[0.03] rounded-lg p-2 text-center">
                    <div className="text-[10px] text-zinc-500">{new Date(yr.year, pm.month - 1).toLocaleString('en', { month: 'short' })}</div>
                    <div className="text-sm font-bold text-zinc-300">{pm.number}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* All Personal Year meanings */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">The 9-Year Cycle</h2>
        <div className="space-y-3">
          {Object.entries(PERSONAL_YEAR_MEANINGS).map(([num, m]) => (
            <div key={num} className="flex gap-3 bg-white/[0.03] rounded-xl px-4 py-3">
              <div className="text-xl font-bold text-amber-400 w-8 shrink-0">{num}</div>
              <div>
                <div className="text-zinc-200 font-medium text-sm">{m.title}</div>
                <div className="text-zinc-400 text-xs">{m.theme}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-100">{NUMEROLOGY_SEO['personal-year'].seoIntro.heading}</h2>
        <p className="text-zinc-400 text-sm leading-relaxed">{NUMEROLOGY_SEO['personal-year'].seoIntro.text}</p>
      </div>

      {NUMEROLOGY_SEO['personal-year'].relatedTools && (
        <div className="flex flex-wrap gap-2">
          {NUMEROLOGY_SEO['personal-year'].relatedTools!.map(t => (
            <LocaleLink key={t.href} href={t.href} className="text-sm text-violet-400 hover:text-violet-300 bg-violet-600/10 rounded-lg px-3 py-1.5 transition-colors">{t.label}</LocaleLink>
          ))}
        </div>
      )}
    </div>
  );
}
