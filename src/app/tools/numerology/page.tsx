'use client';
import { useState, useMemo } from 'react';
import { calculateNumerologyProfile } from '@/lib/numerology/core';
import { getLifePathMeaning, getPersonalYearMeaning, LO_SHU_MISSING } from '@/lib/numerology/interpretations';
import { NUMEROLOGY_SEO } from './seo';
import LocaleLink from '@/components/shared/LocaleLink';

export default function NumerologyHubPage() {
  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [calculated, setCalculated] = useState(false);

  const profile = useMemo(() => {
    if (!calculated || !name || !day || !month || !year) return null;
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);
    if (isNaN(d) || isNaN(m) || isNaN(y) || d < 1 || d > 31 || m < 1 || m > 12 || y < 1900) return null;
    return calculateNumerologyProfile(name, d, m, y);
  }, [calculated, name, day, month, year]);

  const lpMeaning = profile ? getLifePathMeaning(profile.lifePath.number) : null;
  const pyMeaning = profile ? getPersonalYearMeaning(profile.personalYear.number) : null;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-emerald-400/40">🔢 Numerology</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Free Numerology Calculator</h1>
        <p className="text-zinc-400 mt-1">Life Path, Destiny, Soul Urge, Personality, Personal Year &amp; Lo Shu Grid</p>
      </div>

      {/* Input Form */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">Enter Your Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-sm text-zinc-400 block mb-1">Full Birth Name (as on birth certificate)</label>
            <input
              type="text"
              value={name}
              onChange={e => { setName(e.target.value); setCalculated(false); }}
              placeholder="e.g. John Michael Smith"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>
          <div className="grid grid-cols-3 gap-3 sm:col-span-2">
            <div>
              <label className="text-sm text-zinc-400 block mb-1">Day</label>
              <input type="number" min="1" max="31" value={day} onChange={e => { setDay(e.target.value); setCalculated(false); }} placeholder="DD" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
            </div>
            <div>
              <label className="text-sm text-zinc-400 block mb-1">Month</label>
              <input type="number" min="1" max="12" value={month} onChange={e => { setMonth(e.target.value); setCalculated(false); }} placeholder="MM" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
            </div>
            <div>
              <label className="text-sm text-zinc-400 block mb-1">Year</label>
              <input type="number" min="1900" max="2030" value={year} onChange={e => { setYear(e.target.value); setCalculated(false); }} placeholder="YYYY" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
            </div>
          </div>
        </div>
        <button
          onClick={() => setCalculated(true)}
          disabled={!name || !day || !month || !year}
          className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
        >
          Calculate Numerology
        </button>
      </div>

      {profile && (
        <>
          {/* Core Numbers Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { label: 'Life Path', value: profile.lifePath.number, color: 'emerald' },
              { label: 'Destiny', value: profile.destiny.number, color: 'violet' },
              { label: 'Soul Urge', value: profile.soulUrge.number, color: 'rose' },
              { label: 'Personality', value: profile.personality.number, color: 'amber' },
              { label: 'Birthday', value: profile.birthdayNumber, color: 'cyan' },
              { label: 'Maturity', value: profile.maturityNumber, color: 'blue' },
            ].map(n => (
              <div key={n.label} className="glass-card rounded-2xl p-4 text-center">
                <div className="text-xs text-zinc-500">{n.label}</div>
                <div className={`text-3xl font-display font-bold mt-1 text-${n.color}-400`}>{n.value}</div>
              </div>
            ))}
          </div>

          {/* Life Path Detail */}
          {lpMeaning && (
            <div className="glass-card rounded-2xl p-6 vedic-glow">
              <h2 className="font-semibold text-zinc-100 text-lg mb-2">Life Path {profile.lifePath.number}: {lpMeaning.title}</h2>
              <p className="text-zinc-300 text-sm leading-relaxed">{lpMeaning.overview}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="bg-white/[0.03] rounded-xl p-3">
                  <div className="text-xs text-emerald-400 uppercase mb-1">Strengths</div>
                  <p className="text-zinc-300 text-sm">{lpMeaning.strengths.join(', ')}</p>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3">
                  <div className="text-xs text-amber-400 uppercase mb-1">Challenges</div>
                  <p className="text-zinc-300 text-sm">{lpMeaning.challenges.join(', ')}</p>
                </div>
                <div className="bg-white/[0.03] rounded-xl p-3">
                  <div className="text-xs text-cyan-400 uppercase mb-1">Best Careers</div>
                  <p className="text-zinc-300 text-sm">{lpMeaning.careers.join(', ')}</p>
                </div>
              </div>
            </div>
          )}

          {/* Personal Year */}
          {pyMeaning && (
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-semibold text-zinc-100 text-lg mb-2">Personal Year {profile.personalYear.number} ({profile.personalYear.year}): {pyMeaning.title}</h2>
              <p className="text-zinc-400 text-sm mb-2">{pyMeaning.theme}</p>
              <p className="text-zinc-300 text-sm">{pyMeaning.advice}</p>
            </div>
          )}

          {/* Lo Shu Grid */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-semibold text-zinc-100 text-lg mb-4">Lo Shu Grid</h2>
            <div className="flex justify-center mb-4">
              <div className="grid grid-cols-3 gap-1">
                {[
                  [4, 9, 2],
                  [3, 5, 7],
                  [8, 1, 6],
                ].map(row =>
                  row.map(num => {
                    const count = profile.loShuGrid.digitCounts[num];
                    return (
                      <div
                        key={num}
                        className={`w-16 h-16 flex flex-col items-center justify-center rounded-lg border ${count > 0 ? 'bg-emerald-600/20 border-emerald-500/30' : 'bg-white/[0.02] border-white/5'}`}
                      >
                        <div className="text-xs text-zinc-500">{num}</div>
                        <div className={`text-lg font-bold ${count > 0 ? 'text-emerald-400' : 'text-zinc-600'}`}>
                          {count > 0 ? String(num).repeat(count) : '—'}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            {profile.loShuGrid.missingNumbers.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-zinc-300">Missing Numbers (Karmic Lessons)</h3>
                {profile.loShuGrid.missingNumbers.map(n => (
                  <p key={n} className="text-xs text-zinc-400">{LO_SHU_MISSING[n]}</p>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* SEO Intro & Related Tools */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-100">{NUMEROLOGY_SEO.hub.seoIntro.heading}</h2>
        <p className="text-zinc-400 text-sm leading-relaxed">{NUMEROLOGY_SEO.hub.seoIntro.text}</p>
      </div>

      {NUMEROLOGY_SEO.hub.relatedTools && (
        <div className="flex flex-wrap gap-2">
          {NUMEROLOGY_SEO.hub.relatedTools.map(t => (
            <LocaleLink key={t.href} href={t.href} className="text-sm text-violet-400 hover:text-violet-300 bg-violet-600/10 rounded-lg px-3 py-1.5 transition-colors">
              {t.label}
            </LocaleLink>
          ))}
        </div>
      )}
    </div>
  );
}
