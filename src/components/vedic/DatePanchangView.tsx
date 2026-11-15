'use client';

import Link from 'next/link';
import { useT } from '@/lib/i18n';
import type { PanchangData } from '@/lib/vedic/types';
import type { MuhurtaTime } from '@/lib/vedic/muhurta';

function fmtTime(d: Date | null): string {
  if (!d) return '—';
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });
}

interface Props {
  panchang: PanchangData;
  muhurtas: MuhurtaTime[];
  slug: string;
  month: string;
  day: number;
  year: number;
  dayName: string;
  prevSlug: string;
  nextSlug: string;
  moonPhase: string;
}

export default function DatePanchangView({
  panchang,
  muhurtas,
  slug,
  month,
  day,
  year,
  dayName,
  prevSlug,
  nextSlug,
  moonPhase,
}: Props) {
  const t = useT();

  return (
    <>
      {/* Navigation */}
      <nav className="flex items-center justify-between" aria-label="Date navigation">
        <Link href={`/vedic/panchang/${prevSlug}`} className="text-sm text-violet-400 hover:text-violet-300 transition">
          ← {prevSlug}
        </Link>
        <Link href="/vedic/panchang" className="text-sm text-zinc-500 hover:text-zinc-300 transition">
          {t('common.today')}
        </Link>
        <Link href={`/vedic/panchang/${nextSlug}`} className="text-sm text-violet-400 hover:text-violet-300 transition">
          {nextSlug} →
        </Link>
      </nav>

      {/* Header */}
      <header>
        <div className="zodiac-divider mb-4">
          <span className="text-xs text-violet-400/40">☽ ☉ ✦</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
              {t('panchang.title')} — {day} {month} {year}
            </h1>
            <p className="text-zinc-400 mt-1">{dayName} · New Delhi, India (IST)</p>
          </div>
          <div className="text-4xl">{moonPhase}</div>
        </div>
      </header>

      {/* Sunrise / Sunset */}
      {panchang.sunrise && panchang.sunset && (
        <div className="glass-card rounded-2xl p-5 sm:p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌅</span>
              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">{t('panchang.sunrise')}</div>
                <div className="text-lg text-white font-semibold font-mono">{fmtTime(panchang.sunrise)}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">{t('panchang.sunset')}</div>
                <div className="text-lg text-white font-semibold font-mono">{fmtTime(panchang.sunset)}</div>
              </div>
              <span className="text-2xl">🌇</span>
            </div>
          </div>
        </div>
      )}

      {/* Core Five */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="section-title">{t('panchang.section.panchangam')}</h2>
          <span className="text-[10px] text-zinc-600">{t('panchang.section.panchangam.sub')}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="glass-card rounded-2xl p-5 sm:col-span-2 lg:col-span-1 vedic-glow relative overflow-hidden">
            <div className="absolute top-4 right-4 text-4xl opacity-30">{moonPhase}</div>
            <div className="text-xs text-violet-400/80 uppercase tracking-wider font-medium mb-1">{t('panchang.tithi')}</div>
            <div className="text-xl text-white font-display font-bold">{panchang.tithi.name}</div>
            <div className="flex items-center gap-2 mt-2 text-sm text-zinc-400">
              <span className="planet-badge">{panchang.tithi.paksha}</span>
              <span>{t('panchang.tithi')} {panchang.tithi.number} {t('common.of')} 15</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <div className="text-xs text-violet-400/80 uppercase tracking-wider font-medium mb-1">{t('panchang.nakshatra')}</div>
            <div className="text-lg text-white font-display font-bold">{panchang.nakshatra.name}</div>
            <div className="flex items-center gap-2 mt-2 text-sm text-zinc-400">
              <span className="planet-badge">{t('panchang.pada')} {panchang.nakshatra.pada}</span>
              <span>{t('common.lord')}: {panchang.nakshatra.lord}</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <div className="text-xs text-violet-400/80 uppercase tracking-wider font-medium mb-1">{t('panchang.yoga')}</div>
            <div className="text-lg text-white font-display font-bold">{panchang.yoga.name}</div>
            <div className="text-xs text-zinc-500 mt-2">{t('panchang.yoga')} #{panchang.yoga.index + 1} {t('common.of')} 27</div>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <div className="text-xs text-violet-400/80 uppercase tracking-wider font-medium mb-1">{t('panchang.karana')}</div>
            <div className="text-lg text-white font-display font-bold">{panchang.karana.name}</div>
            <div className="text-xs text-zinc-500 mt-2">{t('panchang.karana')} #{panchang.karana.index + 1} {t('common.of')} 60</div>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <div className="text-xs text-violet-400/80 uppercase tracking-wider font-medium mb-1">{t('panchang.vara')}</div>
            <div className="text-lg text-white font-display font-bold">{panchang.vara.name}</div>
            <div className="text-xs text-zinc-500 mt-2">{t('panchang.vara')} #{panchang.vara.index + 1}</div>
          </div>
        </div>
      </section>

      {/* Hindu Calendar */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="section-title">{t('panchang.section.calendar')}</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: t('panchang.paksha'), value: panchang.paksha },
            { label: t('panchang.masa'), value: `${panchang.masa.name}${panchang.masa.isAdhika ? ' (Adhika)' : ''}` },
            { label: t('panchang.samvatsara'), value: panchang.samvat.samvatsara, sub: `Shaka ${panchang.samvat.shaka}` },
            { label: t('panchang.ayana'), value: panchang.ayana },
            { label: t('panchang.ritu'), value: panchang.ritu },
          ].map(item => (
            <div key={item.label} className="glass-card rounded-xl p-4">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium mb-1">{item.label}</div>
              <div className="text-sm font-semibold text-zinc-100">{item.value}</div>
              {item.sub && <div className="text-[10px] text-zinc-500 mt-1">{item.sub}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Muhurta Timings */}
      {muhurtas.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="section-title">{t('panchang.section.muhurta')}</h2>
            <span className="text-[10px] text-zinc-600">{t('panchang.section.muhurta.sub', { n: muhurtas.filter(m => m.isAuspicious).length })}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {muhurtas.map((m, i) => (
              <div key={i} className="glass-card rounded-xl px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${m.isAuspicious ? 'bg-emerald-400' : 'bg-red-400/80'}`} />
                  <span className="font-medium text-sm text-zinc-300">{m.name}</span>
                </div>
                <span className="text-sm font-mono text-zinc-500">
                  {fmtTime(m.start)} — {fmtTime(m.end)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
