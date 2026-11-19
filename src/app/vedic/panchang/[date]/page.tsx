import type { Metadata } from 'next';
import LocaleLink from '@/components/shared/LocaleLink';
import { calculatePanchang } from '@/lib/vedic/panchang';
import { getAllMuhurtas } from '@/lib/vedic/muhurta';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import DatePanchangView from '@/components/vedic/DatePanchangView';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';
const DEFAULT_OBSERVER = { latitude: 28.6139, longitude: 77.209 };

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DAY_NAMES_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function parseDate(slug: string): Date | null {
  const m = slug.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], 6, 0));
  if (isNaN(d.getTime())) return null;
  return d;
}

function adjacentDate(slug: string, offset: number): string {
  const d = parseDate(slug);
  if (!d) return slug;
  d.setUTCDate(d.getUTCDate() + offset);
  return d.toISOString().slice(0, 10);
}

export async function generateStaticParams() {
  const today = new Date();
  const params: { date: string }[] = [];
  for (let i = -7; i <= 30; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    params.push({ date: d.toISOString().slice(0, 10) });
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ date: string }> }): Promise<Metadata> {
  const { date: slug } = await params;
  const d = parseDate(slug);
  if (!d) return { title: 'Panchang' };
  const month = MONTH_NAMES[d.getUTCMonth()];
  const day = d.getUTCDate();
  const year = d.getUTCFullYear();
  const dayName = DAY_NAMES_LONG[d.getUTCDay()];

  const panchang = calculatePanchang(d, DEFAULT_OBSERVER, 'lahiri');

  const title = `Panchang ${month} ${day}, ${year} (${dayName}) — ${panchang.tithi.name}, ${panchang.nakshatra.name}`;
  const description = `Hindu Panchang for ${dayName}, ${month} ${day}, ${year}: Tithi ${panchang.tithi.name} (${panchang.paksha}), Nakshatra ${panchang.nakshatra.name}, Yoga ${panchang.yoga.name}, Karana ${panchang.karana.name}. Sunrise, sunset, Rahu Kaal times for New Delhi.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/vedic/panchang/${slug}/`,
      languages: {
        'en': `/vedic/panchang/${slug}/`,
        'hi': `/hi/vedic/panchang/${slug}/`,
        'ne': `/ne/vedic/panchang/${slug}/`,
        'pt': `/pt/vedic/panchang/${slug}/`,
        'es': `/es/vedic/panchang/${slug}/`,
        'ja': `/ja/vedic/panchang/${slug}/`,
        'x-default': `/vedic/panchang/${slug}/`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/vedic/panchang/${slug}/`,
      type: 'article',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function DailyPanchangPage({ params }: { params: Promise<{ date: string }> }) {
  const { date: slug } = await params;
  const targetDate = parseDate(slug);

  if (!targetDate) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <h1 className="font-display text-3xl font-bold text-white">Invalid Date</h1>
        <p className="text-zinc-400 mt-2">Please use the format YYYY-MM-DD.</p>
        <LocaleLink href="/vedic/panchang" className="text-violet-400 hover:underline mt-4 inline-block">
          Go to today&apos;s Panchang
        </LocaleLink>
      </div>
    );
  }

  const panchang = calculatePanchang(targetDate, DEFAULT_OBSERVER, 'lahiri');
  let muhurtas: ReturnType<typeof getAllMuhurtas> = [];
  if (panchang.sunrise && panchang.sunset) {
    const prevSunset = new Date(panchang.sunrise.getTime() - 12 * 3600000);
    muhurtas = getAllMuhurtas(panchang.sunrise, panchang.sunset, prevSunset, panchang.vara.index);
  }

  const month = MONTH_NAMES[targetDate.getUTCMonth()];
  const day = targetDate.getUTCDate();
  const year = targetDate.getUTCFullYear();
  const dayName = DAY_NAMES_LONG[targetDate.getUTCDay()];
  const prevSlug = adjacentDate(slug, -1);
  const nextSlug = adjacentDate(slug, 1);

  const MOON_PHASES = [
    '🌑','🌒','🌒','🌒','🌓','🌓','🌔','🌔',
    '🌕','🌕','🌖','🌖','🌗','🌗','🌘','🌘',
    '🌑','🌒','🌒','🌒','🌓','🌓','🌔','🌔',
    '🌕','🌕','🌖','🌖','🌗','🌗','🌘',
  ];
  const moonPhase = MOON_PHASES[panchang.tithi.index] || '🌙';

  return (
    <article className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-10">
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Panchang', href: '/vedic/panchang' },
        { name: `${month} ${day}, ${year}`, href: `/vedic/panchang/${slug}` },
      ]} />

      <DatePanchangView
        panchang={panchang}
        muhurtas={muhurtas}
        slug={slug}
        month={month}
        day={day}
        year={year}
        dayName={dayName}
        prevSlug={prevSlug}
        nextSlug={nextSlug}
        moonPhase={moonPhase}
      />

      {/* SEO footer text */}
      <section className="mt-12 border-t border-white/[0.04] pt-8">
        <h2 className="font-display text-lg font-semibold text-zinc-300 mb-3">
          About the Panchang for {month} {day}, {year}
        </h2>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl">
          This page shows the Hindu Panchang for {dayName}, {month} {day}, {year}, calculated for New Delhi, India using
          the Lahiri (Chitrapaksha) Ayanamsa and NASA JPL DE-series planetary ephemeris. The five limbs (Pancha Anga)
          — Tithi, Nakshatra, Yoga, Karana, and Vara — along with Masa, Samvatsara, Ayana, and Ritu are computed from
          precise sidereal Sun and Moon positions. Muhurta timings including Rahu Kalam, Gulika Kalam, Yamaganda,
          and Abhijit Muhurta are derived from sunrise and sunset.
        </p>
      </section>

      {/* Related links */}
      <nav aria-label="Related tools" className="mt-8 pt-6 border-t border-white/[0.04]">
        <h2 className="text-sm font-medium text-zinc-400 mb-4">Related Tools</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { href: '/vedic/muhurta', label: 'Muhurta Finder' },
            { href: '/vedic/nakshatra', label: 'Nakshatra Analysis' },
            { href: '/vedic/transits', label: 'Planetary Transits' },
            { href: '/vedic/kundli', label: 'Birth Chart (Kundli)' },
          ].map(tool => (
            <LocaleLink
              key={tool.href}
              href={tool.href}
              className="px-4 py-2 rounded-full text-sm text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.04] hover:border-violet-500/30 transition-colors"
            >
              {tool.label}
            </LocaleLink>
          ))}
        </div>
      </nav>
    </article>
  );
}
