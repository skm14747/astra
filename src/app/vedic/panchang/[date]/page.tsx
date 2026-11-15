import type { Metadata } from 'next';
import Link from 'next/link';
import { calculatePanchang } from '@/lib/vedic/panchang';
import { getAllMuhurtas } from '@/lib/vedic/muhurta';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

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

function fmtTime(d: Date | null): string {
  if (!d) return '—';
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });
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
    alternates: { canonical: `/vedic/panchang/${slug}` },
    openGraph: {
      title,
      description,
      url: `/vedic/panchang/${slug}`,
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
        <Link href="/vedic/panchang" className="text-violet-400 hover:underline mt-4 inline-block">
          Go to today&apos;s Panchang
        </Link>
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

      {/* Navigation */}
      <nav className="flex items-center justify-between" aria-label="Date navigation">
        <Link href={`/vedic/panchang/${prevSlug}`} className="text-sm text-violet-400 hover:text-violet-300 transition">
          ← {prevSlug}
        </Link>
        <Link href="/vedic/panchang" className="text-sm text-zinc-500 hover:text-zinc-300 transition">
          Today
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
              Panchang for {dayName}, {month} {day}, {year}
            </h1>
            <p className="text-zinc-400 mt-1">New Delhi, India (IST)</p>
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
                <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Sunrise</div>
                <div className="text-lg text-white font-semibold font-mono">{fmtTime(panchang.sunrise)}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Sunset</div>
                <div className="text-lg text-white font-semibold font-mono">{fmtTime(panchang.sunset)}</div>
              </div>
              <span className="text-2xl">🌇</span>
            </div>
          </div>
        </div>
      )}

      {/* Core Five */}
      <section>
        <h2 className="section-title mb-4">Panchangam — The Five Limbs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="glass-card rounded-2xl p-5 sm:col-span-2 lg:col-span-1 vedic-glow relative overflow-hidden">
            <div className="absolute top-4 right-4 text-4xl opacity-30">{moonPhase}</div>
            <div className="text-xs text-violet-400/80 uppercase tracking-wider font-medium mb-1">Tithi</div>
            <div className="text-xl text-white font-display font-bold">{panchang.tithi.name}</div>
            <div className="flex items-center gap-2 mt-2 text-sm text-zinc-400">
              <span className="planet-badge">{panchang.tithi.paksha}</span>
              <span>Tithi {panchang.tithi.number} of 15</span>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <div className="text-xs text-violet-400/80 uppercase tracking-wider font-medium mb-1">Nakshatra</div>
            <div className="text-lg text-white font-display font-bold">{panchang.nakshatra.name}</div>
            <div className="flex items-center gap-2 mt-2 text-sm text-zinc-400">
              <span className="planet-badge">Pada {panchang.nakshatra.pada}</span>
              <span>Lord: {panchang.nakshatra.lord}</span>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <div className="text-xs text-violet-400/80 uppercase tracking-wider font-medium mb-1">Yoga</div>
            <div className="text-lg text-white font-display font-bold">{panchang.yoga.name}</div>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <div className="text-xs text-violet-400/80 uppercase tracking-wider font-medium mb-1">Karana</div>
            <div className="text-lg text-white font-display font-bold">{panchang.karana.name}</div>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <div className="text-xs text-violet-400/80 uppercase tracking-wider font-medium mb-1">Vara</div>
            <div className="text-lg text-white font-display font-bold">{panchang.vara.name}</div>
          </div>
        </div>
      </section>

      {/* Hindu Calendar */}
      <section>
        <h2 className="section-title mb-4">Hindu Calendar</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: 'Paksha', value: panchang.paksha },
            { label: 'Masa', value: `${panchang.masa.name}${panchang.masa.isAdhika ? ' (Adhika)' : ''}` },
            { label: 'Samvatsara', value: panchang.samvat.samvatsara, sub: `Shaka ${panchang.samvat.shaka}` },
            { label: 'Ayana', value: panchang.ayana },
            { label: 'Ritu', value: panchang.ritu },
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
          <h2 className="section-title mb-4">
            Muhurta Timings — {muhurtas.filter(m => m.isAuspicious).length} auspicious
          </h2>
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
        <h2 className="text-sm font-semibold text-zinc-400 tracking-wide uppercase mb-4">Related Tools</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { href: '/vedic/muhurta', label: 'Muhurta Finder' },
            { href: '/vedic/nakshatra', label: 'Nakshatra Analysis' },
            { href: '/vedic/transits', label: 'Planetary Transits' },
            { href: '/vedic/kundli', label: 'Birth Chart (Kundli)' },
          ].map(tool => (
            <Link
              key={tool.href}
              href={tool.href}
              className="px-4 py-2 rounded-full text-sm text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.04] hover:border-violet-500/30 transition-all"
            >
              {tool.label}
            </Link>
          ))}
        </div>
      </nav>
    </article>
  );
}
