import type { Metadata } from 'next';
import LocaleLink from '@/components/shared/LocaleLink';
import { calculatePanchang } from '@/lib/vedic/panchang';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import MonthPanchangView from '@/components/vedic/MonthPanchangView';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';
const DEFAULT_OBSERVER = { latitude: 28.6139, longitude: 77.209 };

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function parseMonth(slug: string): { year: number; month: number } | null {
  const m = slug.match(/^(\d{4})-(\d{2})$/);
  if (!m) return null;
  const year = +m[1];
  const month = +m[2] - 1;
  if (month < 0 || month > 11) return null;
  return { year, month };
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export async function generateStaticParams() {
  const today = new Date();
  const params: { month: string }[] = [];
  for (let offset = -1; offset <= 6; offset++) {
    const d = new Date(today.getFullYear(), today.getMonth() + offset, 1);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    params.push({ month: `${yyyy}-${mm}` });
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ month: string }> }): Promise<Metadata> {
  const { month: slug } = await params;
  const parsed = parseMonth(slug);
  if (!parsed) return { title: 'Monthly Panchang' };
  const name = MONTH_NAMES[parsed.month];
  const title = `Panchang ${name} ${parsed.year} — Monthly Hindu Calendar & Tithi List`;
  const description = `Complete Hindu Panchang for ${name} ${parsed.year}. Daily Tithi, Nakshatra, Yoga, Karana for every day of the month. New Delhi timings.`;
  return {
    title,
    description,
    alternates: {
      canonical: `/vedic/panchang/month/${slug}`,
      languages: {
        'en': `/vedic/panchang/month/${slug}`,
        'hi': `/hi/vedic/panchang/month/${slug}`,
        'ne': `/ne/vedic/panchang/month/${slug}`,
        'pt': `/pt/vedic/panchang/month/${slug}`,
        'es': `/es/vedic/panchang/month/${slug}`,
        'ja': `/ja/vedic/panchang/month/${slug}`,
        'x-default': `/vedic/panchang/month/${slug}`,
      },
    },
    openGraph: { title, description, url: `/vedic/panchang/month/${slug}`, type: 'article' },
  };
}

export default async function MonthlyPanchangPage({ params }: { params: Promise<{ month: string }> }) {
  const { month: slug } = await params;
  const parsed = parseMonth(slug);

  if (!parsed) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <h1 className="font-display text-3xl font-bold text-white">Invalid Month</h1>
        <p className="text-zinc-400 mt-2">Use format YYYY-MM (e.g., 2026-11).</p>
        <LocaleLink href="/vedic/panchang" className="text-violet-400 hover:underline mt-4 inline-block">Back to Panchang</LocaleLink>
      </div>
    );
  }

  const { year, month } = parsed;
  const monthName = MONTH_NAMES[month];
  const numDays = daysInMonth(year, month);

  const days = Array.from({ length: numDays }, (_, i) => {
    const date = new Date(Date.UTC(year, month, i + 1, 6, 0));
    const panchang = calculatePanchang(date, DEFAULT_OBSERVER, 'lahiri');
    const dateStr = date.toISOString().slice(0, 10);
    return { day: i + 1, dateStr, weekday: date.getUTCDay(), panchang };
  });

  const prevMonth = new Date(year, month - 1, 1);
  const nextMonth = new Date(year, month + 1, 1);
  const prevSlug = `${prevMonth.getFullYear()}-${String(prevMonth.getMonth() + 1).padStart(2, '0')}`;
  const nextSlug = `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, '0')}`;

  return (
    <article className="mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-8">
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Panchang', href: '/vedic/panchang' },
        { name: `${monthName} ${year}`, href: `/vedic/panchang/month/${slug}` },
      ]} />

      <MonthPanchangView
        monthName={monthName}
        year={year}
        slug={slug}
        prevSlug={prevSlug}
        nextSlug={nextSlug}
        prevMonthName={MONTH_NAMES[prevMonth.getMonth()]}
        prevMonthYear={prevMonth.getFullYear()}
        nextMonthName={MONTH_NAMES[nextMonth.getMonth()]}
        nextMonthYear={nextMonth.getFullYear()}
        days={days}
      />

      {/* SEO text */}
      <section className="mt-8 border-t border-white/[0.04] pt-8">
        <h2 className="font-display text-lg font-semibold text-zinc-300 mb-3">
          Hindu Panchang for {monthName} {year}
        </h2>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl">
          This page lists the complete Hindu Panchang for every day in {monthName} {year}, showing the five
          elements (Tithi, Nakshatra, Yoga, Karana, Vara) calculated for New Delhi using the Lahiri Ayanamsa.
          Click any date to see the full daily Panchang with Rahu Kalam, Muhurta timings, and Hindu calendar details.
        </p>
      </section>

      {/* Related */}
      <nav aria-label="Related tools" className="mt-6 pt-6 border-t border-white/[0.04]">
        <div className="flex flex-wrap gap-2">
          {[
            { href: '/vedic/panchang', label: "Today's Panchang" },
            { href: '/vedic/muhurta', label: 'Muhurta Finder' },
            { href: '/vedic/choghadiya', label: "Today's Choghadiya" },
            { href: '/vedic/kundli', label: 'Birth Chart (Kundli)' },
          ].map(tool => (
            <LocaleLink
              key={tool.href}
              href={tool.href}
              className="px-4 py-2 rounded-full text-sm text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.04] hover:border-violet-500/30 transition-all"
            >
              {tool.label}
            </LocaleLink>
          ))}
        </div>
      </nav>
    </article>
  );
}
