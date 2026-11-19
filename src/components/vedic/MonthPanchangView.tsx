'use client';

import Link from 'next/link';
import { useT } from '@/lib/i18n';
import type { PanchangData } from '@/lib/vedic/types';

const DAY_ABBR = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface DayItem {
  day: number;
  dateStr: string;
  weekday: number;
  panchang: PanchangData;
}

interface Props {
  monthName: string;
  year: number;
  slug: string;
  prevSlug: string;
  nextSlug: string;
  prevMonthName: string;
  prevMonthYear: number;
  nextMonthName: string;
  nextMonthYear: number;
  days: DayItem[];
}

export default function MonthPanchangView({
  monthName,
  year,
  prevSlug,
  nextSlug,
  prevMonthName,
  prevMonthYear,
  nextMonthName,
  nextMonthYear,
  days,
}: Props) {
  const t = useT();

  return (
    <>
      <nav className="flex items-center justify-between" aria-label="Month navigation">
        <Link href={`/vedic/panchang/month/${prevSlug}`} className="text-sm text-violet-400 hover:text-violet-300 transition">
          ← {prevMonthName} {prevMonthYear}
        </Link>
        <Link href="/vedic/panchang" className="text-sm text-zinc-500 hover:text-zinc-300 transition">
          {t('common.today')}
        </Link>
        <Link href={`/vedic/panchang/month/${nextSlug}`} className="text-sm text-violet-400 hover:text-violet-300 transition">
          {nextMonthName} {nextMonthYear} →
        </Link>
      </nav>

      <header>
        <div className="zodiac-divider mb-4">
          <span className="text-xs text-violet-400/40">☽ 📅 ☉</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
          {t('panchang.title')} — {monthName} {year}
        </h1>
        <p className="text-zinc-400 mt-1">{t('panchang.monthCalendar')} · New Delhi (IST)</p>
      </header>

      {/* Monthly table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                <th className="px-3 py-2.5 text-left text-xs text-zinc-500 font-medium w-16">{t('panchang.date')}</th>
                <th className="px-3 py-2.5 text-left text-xs text-zinc-500 font-medium w-12">{t('panchang.day')}</th>
                <th className="px-3 py-2.5 text-left text-xs text-zinc-500 font-medium">{t('panchang.tithi')}</th>
                <th className="px-3 py-2.5 text-left text-xs text-zinc-500 font-medium">{t('panchang.nakshatra')}</th>
                <th className="px-3 py-2.5 text-left text-xs text-zinc-500 font-medium hidden sm:table-cell">{t('panchang.yoga')}</th>
                <th className="px-3 py-2.5 text-left text-xs text-zinc-500 font-medium hidden md:table-cell">{t('panchang.paksha')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {days.map(({ day, dateStr, weekday, panchang }) => (
                <tr key={day} className={weekday === 0 ? 'bg-red-500/[0.03]' : ''}>
                  <td className="px-3 py-2">
                    <Link href={`/vedic/panchang/${dateStr}`} className="text-violet-400 hover:text-violet-300 font-medium">
                      {day}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-zinc-500">{DAY_ABBR[weekday]}</td>
                  <td className="px-3 py-2 text-zinc-300">{panchang.tithi.name}</td>
                  <td className="px-3 py-2 text-zinc-400">{panchang.nakshatra.name}</td>
                  <td className="px-3 py-2 text-zinc-500 hidden sm:table-cell">{panchang.yoga.name}</td>
                  <td className="px-3 py-2 text-zinc-500 hidden md:table-cell">
                    <span className={panchang.paksha === 'Shukla' ? 'text-yellow-400/60' : 'text-zinc-600'}>
                      {panchang.paksha}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
