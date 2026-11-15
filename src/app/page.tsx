'use client';
import Link from 'next/link';
import { useProfile } from '@/lib/profile/context';
import { useState } from 'react';
import ProfileModal from '@/components/shared/ProfileModal';

const VEDIC_FEATURES = [
  { href: '/vedic/kundli', icon: '☉', title: 'Kundli', desc: 'Your complete birth chart with planetary positions, houses, nakshatras, and dignities.', color: 'from-violet-600/20 to-indigo-600/10' },
  { href: '/vedic/dashas', icon: '⏳', title: 'Dasha Timeline', desc: 'Vimshottari Mahadasha and Antardasha periods mapped across your lifetime.', color: 'from-purple-600/20 to-violet-600/10' },
  { href: '/vedic/panchang', icon: '🌙', title: 'Daily Panchang', desc: 'Today\'s Tithi, Nakshatra, Yoga, Karana, and auspicious Muhurtas.', color: 'from-blue-600/20 to-cyan-600/10' },
  { href: '/vedic/yogas', icon: '✦', title: 'Yogas & Doshas', desc: 'Detect Raja Yogas, Dhana Yogas, Kaal Sarp Dosha, and Mangal Dosha.', color: 'from-emerald-600/20 to-teal-600/10' },
  { href: '/vedic/transits', icon: '🪐', title: 'Transits', desc: 'Sade Sati check, transit scores, and current planetary movements.', color: 'from-amber-600/20 to-orange-600/10' },
  { href: '/vedic/compatibility', icon: '💫', title: 'Kundli Milan', desc: '36-point Ashtakoota matching and Mangal Dosha compatibility.', color: 'from-rose-600/20 to-pink-600/10' },
];

const MATRIX_FEATURES = [
  { href: '/matrix/chart', icon: '✦', title: 'Matrix of Destiny', desc: 'Personal octagram with 22 Major Arcana energies decoded.', color: 'from-pink-600/20 to-rose-600/10' },
  { href: '/matrix/health', icon: '🧘', title: 'Health Card', desc: '7-chakra health analysis based on your birth numbers.', color: 'from-fuchsia-600/20 to-purple-600/10' },
  { href: '/matrix/timeline', icon: '📊', title: 'Life Timeline', desc: 'Age-by-age energy cycles and yearly forecasts.', color: 'from-violet-600/20 to-indigo-600/10' },
  { href: '/matrix/compatibility', icon: '❤️', title: 'Compatibility', desc: 'Couples harmony analysis using Matrix arcana overlay.', color: 'from-red-600/20 to-pink-600/10' },
];

const MORE_TOOLS = [
  { href: '/vedic/divisional', label: 'Divisional Charts (D1–D60)', icon: '◎' },
  { href: '/vedic/nakshatra', label: 'Nakshatra Analysis', icon: '⭐' },
  { href: '/vedic/ashtakavarga', label: 'Ashtakavarga', icon: '☉' },
  { href: '/vedic/kp', label: 'KP System', icon: '◈' },
  { href: '/vedic/muhurta', label: 'Muhurta Finder', icon: '⏰' },
  { href: '/vedic/remedies', label: 'Remedies', icon: '💎' },
  { href: '/vedic/shadbala', label: 'Shadbala (Strength)', icon: '⚖' },
  { href: '/vedic/jaimini', label: 'Jaimini Astrology', icon: '◈' },
  { href: '/vedic/career', label: 'Career Analysis', icon: '💼' },
  { href: '/vedic/wealth', label: 'Wealth Analysis', icon: '💰' },
  { href: '/vedic/health', label: 'Health & Longevity', icon: '🏥' },
  { href: '/vedic/predictions', label: 'Annual Predictions', icon: '🔮' },
  { href: '/vedic/nadi', label: 'Nadi Astrology', icon: '🔱' },
];

const ZODIAC_STRIP = '♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓';

function FeatureCard({ href, icon, title, desc, color }: { href: string; icon: string; title: string; desc: string; color: string }) {
  return (
    <Link href={href} className="group glass-card gradient-border rounded-2xl p-6 flex flex-col gap-3 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-base font-semibold text-white group-hover:text-white transition">{title}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed mt-1 group-hover:text-zinc-300 transition">{desc}</p>
      </div>
    </Link>
  );
}

export default function Home() {
  const { activeProfile } = useProfile();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="hero-glow relative overflow-hidden">
        {/* Decorative orbs */}
        <div className="cosmic-orb w-64 h-64 bg-violet-600/10 -top-20 -left-20" />
        <div className="cosmic-orb w-48 h-48 bg-pink-600/10 top-10 right-10" style={{ animationDelay: '3s' }} />
        <div className="cosmic-orb w-32 h-32 bg-blue-600/10 bottom-10 left-1/3" style={{ animationDelay: '5s' }} />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-20 sm:pt-28 pb-20 text-center relative z-10">
          {/* Zodiac strip */}
          <div className="text-sm tracking-[0.5em] text-violet-400/30 mb-8 font-light">{ZODIAC_STRIP}</div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            <span className="gradient-text">Discover Your</span>
            <br />
            <span className="text-white drop-shadow-[0_0_40px_rgba(124,92,252,0.3)]">Cosmic Blueprint</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12">
            Vedic astrology charts, Dasha timelines, compatibility matching, and Matrix of Destiny — all calculated locally in your browser.
          </p>

          {!activeProfile ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => setModalOpen(true)} className="cosmic-btn text-base">
                ✦ Create Your Birth Chart
              </button>
              <Link href="/vedic/panchang" className="glass-card px-6 py-3.5 rounded-full text-zinc-300 text-sm font-medium hover:text-white transition group">
                View Today&apos;s Panchang
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="glass-card rounded-full px-6 py-3 flex items-center gap-3 vedic-glow">
                <span className="relative w-3 h-3 rounded-full bg-violet-400">
                  <span className="absolute inset-0 rounded-full bg-violet-400 animate-ping opacity-40" />
                </span>
                <span className="text-zinc-100 font-medium">{activeProfile.name}</span>
                <span className="text-zinc-500 text-sm">· {activeProfile.city}</span>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/vedic/kundli" className="cosmic-btn px-6 py-2.5 text-sm">View Kundli</Link>
                <Link href="/vedic/dashas" className="glass-card px-6 py-2.5 rounded-full text-zinc-300 text-sm font-medium hover:text-white transition">Dasha Timeline</Link>
                <Link href="/matrix/chart" className="glass-card px-6 py-2.5 rounded-full text-zinc-300 text-sm font-medium hover:text-white transition">Matrix Chart</Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Vedic Astrology Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mb-20">
        <div className="mb-10">
          <div className="zodiac-divider mb-4">
            <span className="text-xs tracking-widest text-violet-400/60">☽ ☉ ♃ ♄ ♂</span>
          </div>
          <span className="section-title">Vedic Astrology</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 text-white">
            Ancient wisdom, <span className="gradient-text-static">cosmic precision</span>
          </h2>
          <p className="text-zinc-400 mt-3 max-w-lg text-lg">Comprehensive Jyotish tools powered by Swiss Ephemeris–grade astronomy calculations.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VEDIC_FEATURES.map(f => <FeatureCard key={f.href} {...f} />)}
        </div>
      </section>

      {/* Matrix of Destiny Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mb-20">
        <div className="mb-10">
          <div className="zodiac-divider mb-4">
            <span className="text-xs tracking-widest text-pink-400/60">✦ ◇ ❋ ✧</span>
          </div>
          <span className="section-title" style={{ color: '#e84393' }}>Matrix of Destiny</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 text-white">
            Decode your <span className="gradient-text-static">life path</span>
          </h2>
          <p className="text-zinc-400 mt-3 max-w-lg text-lg">Major Arcana energy mapping, health chakras, and relationship harmonics.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {MATRIX_FEATURES.map(f => <FeatureCard key={f.href} {...f} />)}
        </div>
      </section>

      {/* More Tools */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mb-20">
        <div className="glass-card rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          <div className="cosmic-orb w-40 h-40 bg-violet-600/8 -top-10 -right-10" />
          <h3 className="font-display text-lg font-semibold text-white mb-5 relative z-10">Explore more tools</h3>
          <div className="flex flex-wrap gap-3 relative z-10">
            {MORE_TOOLS.map(t => (
              <Link
                key={t.href}
                href={t.href}
                className="px-5 py-2.5 rounded-full text-sm text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.04] hover:border-violet-500/30 transition-all group"
              >
                <span className="mr-2 opacity-50 group-hover:opacity-100 transition">{t.icon}</span>
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.04] py-10 px-4 text-center">
        <div className="zodiac-divider max-w-xs mx-auto mb-6">
          <span className="text-xs text-violet-400/30">{ZODIAC_STRIP}</span>
        </div>
        <p className="text-xs text-zinc-500">
          All calculations run locally in your browser. No data is sent to any server.
        </p>
        <p className="text-[10px] text-zinc-600 mt-2">
          Powered by <span className="text-zinc-400">astronomy-engine</span> · Ayanamsa-corrected sidereal positions
        </p>
      </footer>

      <ProfileModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
