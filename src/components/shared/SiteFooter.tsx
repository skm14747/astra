import Link from 'next/link';

const POPULAR_TOOLS = [
  { href: '/vedic/kundli', label: 'Free Kundli' },
  { href: '/vedic/compatibility', label: 'Kundli Milan' },
  { href: '/vedic/dashas', label: 'Mahadasha Calculator' },
  { href: '/vedic/panchang', label: "Today's Panchang" },
  { href: '/vedic/nakshatra', label: 'Nakshatra Finder' },
  { href: '/vedic/mangal-dosha', label: 'Mangal Dosha Check' },
  { href: '/vedic/kaal-sarp-dosha', label: 'Kaal Sarp Dosha' },
  { href: '/vedic/navamsa', label: 'Navamsa (D9) Chart' },
  { href: '/vedic/transits', label: 'Sade Sati Calculator' },
  { href: '/vedic/yogas', label: 'Yoga & Dosha Analysis' },
  { href: '/vedic/muhurta', label: 'Muhurta Finder' },
  { href: '/vedic/divisional', label: 'Divisional Charts' },
];

const RESOURCES = [
  { href: '/blog', label: 'Vedic Astrology Blog' },
  { href: '/about', label: 'About Astra Destiny' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/how-it-works', label: 'How It Works' },
];

const LEGAL = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/disclaimer', label: 'Disclaimer' },
];

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/[0.04] bg-black/20 mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="font-display text-xl font-bold text-violet-400 tracking-wide">
              ASTRA DESTINY
            </Link>
            <p className="text-xs text-zinc-500 mt-2 max-w-[200px] leading-relaxed">
              Free Vedic astrology calculators with NASA-precision ephemeris. All calculations run in your browser — no data leaves your device.
            </p>
          </div>

          {/* Popular Tools */}
          <div className="col-span-1">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Popular Tools</h3>
            <nav aria-label="Popular tools" className="flex flex-col gap-1.5">
              {POPULAR_TOOLS.slice(0, 6).map(t => (
                <Link key={t.href} href={t.href} className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  {t.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* More Tools */}
          <div className="col-span-1">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">More Tools</h3>
            <nav aria-label="More tools" className="flex flex-col gap-1.5">
              {POPULAR_TOOLS.slice(6).map(t => (
                <Link key={t.href} href={t.href} className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  {t.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Resources</h3>
            <nav aria-label="Resources" className="flex flex-col gap-1.5">
              {RESOURCES.map(r => (
                <Link key={r.href} href={r.href} className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                  {r.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © 2026 Astra Destiny. Free Vedic Astrology Calculators.
          </p>
          <nav aria-label="Legal" className="flex gap-4">
            {LEGAL.map(l => (
              <Link key={l.href} href={l.href} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="text-xs text-zinc-700 text-center mt-3">
          Calculations use NASA JPL DE-series ephemeris • Lahiri Ayanamsa • BPHS rules
        </p>
      </div>
    </footer>
  );
}
