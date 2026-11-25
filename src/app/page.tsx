'use client';
import LocaleLink from '@/components/shared/LocaleLink';
import { useProfile } from '@/lib/profile/context';
import { useState } from 'react';
import ProfileModal from '@/components/shared/ProfileModal';
import AdSlot from '@/components/ads/AdSlot';
import { useT } from '@/lib/i18n';
import type { TranslationKey } from '@/lib/i18n';

const VEDIC_FEATURES: { href: string; icon: string; titleKey: TranslationKey; descKey: TranslationKey; color: string }[] = [
  { href: '/vedic/kundli', icon: '☉', titleKey: 'feat.kundli', descKey: 'feat.kundli.desc', color: 'from-violet-600/20 to-indigo-600/10' },
  { href: '/vedic/dashas', icon: '⏳', titleKey: 'feat.dashas', descKey: 'feat.dashas.desc', color: 'from-purple-600/20 to-violet-600/10' },
  { href: '/vedic/panchang', icon: '🌙', titleKey: 'feat.panchang', descKey: 'feat.panchang.desc', color: 'from-blue-600/20 to-cyan-600/10' },
  { href: '/vedic/yogas', icon: '✦', titleKey: 'feat.yogas', descKey: 'feat.yogas.desc', color: 'from-emerald-600/20 to-teal-600/10' },
  { href: '/vedic/transits', icon: '🪐', titleKey: 'feat.transits', descKey: 'feat.transits.desc', color: 'from-amber-600/20 to-orange-600/10' },
  { href: '/vedic/compatibility', icon: '💫', titleKey: 'feat.compatibility', descKey: 'feat.compatibility.desc', color: 'from-rose-600/20 to-pink-600/10' },
];

const MATRIX_FEATURES: { href: string; icon: string; titleKey: TranslationKey; descKey: TranslationKey; color: string }[] = [
  { href: '/matrix/chart', icon: '✦', titleKey: 'feat.matrix', descKey: 'feat.matrix.desc', color: 'from-pink-600/20 to-rose-600/10' },
  { href: '/matrix/health', icon: '🧘', titleKey: 'feat.matrixHealth', descKey: 'feat.matrixHealth.desc', color: 'from-fuchsia-600/20 to-purple-600/10' },
  { href: '/matrix/timeline', icon: '📊', titleKey: 'feat.matrixTimeline', descKey: 'feat.matrixTimeline.desc', color: 'from-violet-600/20 to-indigo-600/10' },
  { href: '/matrix/compatibility', icon: '❤️', titleKey: 'feat.matrixCompat', descKey: 'feat.matrixCompat.desc', color: 'from-red-600/20 to-pink-600/10' },
];

const MORE_TOOLS: { href: string; labelKey: TranslationKey; icon: string }[] = [
  { href: '/vedic/divisional', labelKey: 'more.divisional', icon: '◎' },
  { href: '/vedic/navamsa', labelKey: 'navamsa.title', icon: '◎' },
  { href: '/vedic/nakshatra', labelKey: 'more.nakshatra', icon: '⭐' },
  { href: '/vedic/mangal-dosha', labelKey: 'mangalDosha.title', icon: '♂' },
  { href: '/vedic/kaal-sarp-dosha', labelKey: 'kaalSarp.title', icon: '🐍' },
  { href: '/vedic/sade-sati', labelKey: 'footer.sadeSatiCheck', icon: '🪐' },
  { href: '/vedic/choghadiya', labelKey: 'choghadiya.title', icon: '⏱' },
  { href: '/vedic/ashtakavarga', labelKey: 'more.ashtakavarga', icon: '☉' },
  { href: '/vedic/kp', labelKey: 'more.kp', icon: '◈' },
  { href: '/vedic/muhurta', labelKey: 'more.muhurta', icon: '⏰' },
  { href: '/vedic/remedies', labelKey: 'more.remedies', icon: '💎' },
  { href: '/vedic/shadbala', labelKey: 'more.shadbala', icon: '⚖' },
  { href: '/vedic/jaimini', labelKey: 'more.jaimini', icon: '◈' },
  { href: '/vedic/career', labelKey: 'more.career', icon: '💼' },
  { href: '/vedic/wealth', labelKey: 'more.wealth', icon: '💰' },
  { href: '/vedic/health', labelKey: 'more.health', icon: '🏥' },
  { href: '/vedic/predictions', labelKey: 'more.predictions', icon: '🔮' },
  { href: '/vedic/nadi', labelKey: 'more.nadi', icon: '🔱' },
  { href: '/vedic/report', labelKey: 'nav.fullReport', icon: '📋' },
];

const ZODIAC_STRIP = '♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

const ALL_TOOLS = [
  ...VEDIC_FEATURES.map(f => ({ name: f.titleKey, href: f.href })),
  ...MATRIX_FEATURES.map(f => ({ name: f.titleKey, href: f.href })),
  ...MORE_TOOLS.map(t => ({ name: t.labelKey, href: t.href })),
];

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Vedic astrology tools",
  description: "Free Vedic astrology calculators — Kundli, Dasha, Yogas, Panchang, Compatibility & more.",
  numberOfItems: ALL_TOOLS.length,
  itemListElement: ALL_TOOLS.map((tool, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: tool.name,
    url: `${BASE_URL}${tool.href}/`,
  })),
};

function FeatureCard({ href, icon, title, desc, color }: { href: string; icon: string; title: string; desc: string; color: string }) {
  return (
    <LocaleLink href={href} className="group glass-card gradient-border rounded-2xl p-7 flex flex-col gap-3 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] flex items-center justify-center text-2xl mb-2 transition-transform duration-300">{icon}</div>
        <h3 className="text-lg font-semibold text-white group-hover:text-white transition">{title}</h3>
        <p className="text-base text-zinc-400 leading-relaxed mt-1.5 group-hover:text-zinc-300 transition">{desc}</p>
      </div>
    </LocaleLink>
  );
}

function TranslatedFeatureCard({ href, icon, titleKey, descKey, color }: { href: string; icon: string; titleKey: TranslationKey; descKey: TranslationKey; color: string }) {
  const t = useT();
  return <FeatureCard href={href} icon={icon} title={t(titleKey)} desc={t(descKey)} color={color} />;
}

export default function Home() {
  const { activeProfile } = useProfile();
  const t = useT();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
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
            <span className="gradient-text">{t('home.hero.title1')}</span>
            <br />
            <span className="text-white drop-shadow-[0_0_40px_rgba(124,92,252,0.3)]">{t('home.hero.title2')}</span>
          </h1>

          <p className="text-xl sm:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12">
            {t('home.hero.subtitle')}
          </p>

          {!activeProfile ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => setModalOpen(true)} className="cosmic-btn text-base">
                {t('home.hero.cta')}
              </button>
              <LocaleLink href="/vedic/panchang" className="glass-card px-6 py-3.5 rounded-full text-zinc-300 text-sm font-medium hover:text-white transition group">
                {t('home.hero.panchang')}
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </LocaleLink>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="glass-card rounded-full px-6 py-3 flex items-center gap-3 vedic-glow">
                <span className="relative w-3 h-3 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(124,92,252,0.5)]" />
                <span className="text-zinc-100 font-medium">{activeProfile.name}</span>
                <span className="text-zinc-500 text-sm">· {activeProfile.city}</span>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <LocaleLink href="/vedic/kundli" className="cosmic-btn px-6 py-2.5 text-sm">{t('home.hero.viewKundli')}</LocaleLink>
                <LocaleLink href="/vedic/dashas" className="glass-card px-6 py-2.5 rounded-full text-zinc-300 text-sm font-medium hover:text-white transition">{t('home.hero.dashaTimeline')}</LocaleLink>
                <LocaleLink href="/vedic/compatibility" className="glass-card px-6 py-2.5 rounded-full text-zinc-300 text-sm font-medium hover:text-white transition">{t('home.hero.kundliMilan')}</LocaleLink>
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
          <span className="section-title">{t('home.vedic.label')}</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 text-white">
            {t('home.vedic.title')}<span className="gradient-text-static">{t('home.vedic.titleAccent')}</span>
          </h2>
          <p className="text-zinc-400 mt-3 max-w-lg text-lg leading-relaxed">{t('home.vedic.desc')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VEDIC_FEATURES.map(f => <TranslatedFeatureCard key={f.href} {...f} />)}
        </div>
      </section>

      {/* Ad after Vedic section */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mb-12">
        <AdSlot format="horizontal" />
      </div>

      {/* More Vedic Tools */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mb-20">
        <div className="glass-card rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          <div className="cosmic-orb w-40 h-40 bg-violet-600/8 -top-10 -right-10" />
          <h3 className="font-display text-lg font-semibold text-white mb-5 relative z-10">{t('home.moreTools')}</h3>
          <div className="flex flex-wrap gap-3 relative z-10">
            {MORE_TOOLS.map(tool => (
              <LocaleLink
                key={tool.href}
                href={tool.href}
                className="px-5 py-3 rounded-full text-base text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-violet-500/30 transition-colors group"
              >
                <span className="mr-2 opacity-50 group-hover:opacity-100 transition">{tool.icon}</span>
                {t(tool.labelKey)}
              </LocaleLink>
            ))}
          </div>
        </div>
      </section>

      {/* Matrix of Destiny — secondary content pillar */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 mb-20">
        <div className="mb-8">
          <span className="section-title" style={{ color: '#e84393' }}>{t('home.matrix.label')}</span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold mt-2 text-white">
            {t('home.matrix.title')}<span className="gradient-text-static">{t('home.matrix.titleAccent')}</span>
          </h3>
          <p className="text-zinc-400 mt-2 max-w-lg text-base leading-relaxed">{t('home.matrix.desc')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {MATRIX_FEATURES.map(f => <TranslatedFeatureCard key={f.href} {...f} />)}
        </div>
      </section>

      {/* Ad before footer */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mb-12">
        <AdSlot format="horizontal" />
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.04] py-12 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            <div>
              <h3 className="text-sm font-medium text-zinc-300 mb-3">{t('footer.popularTools')}</h3>
              <ul className="space-y-2.5">
                {([['/vedic/kundli', 'footer.freeKundli'], ['/vedic/compatibility', 'footer.kundliMilan'], ['/vedic/panchang', 'footer.dailyPanchang'], ['/vedic/dashas', 'footer.dashaTimeline'], ['/vedic/yogas', 'footer.yogasDoshas'], ['/vedic/transits', 'footer.sadeSatiCheck']] as const).map(([href, key]) => (
                  <li key={href}><LocaleLink href={href} className="text-sm text-zinc-500 hover:text-zinc-300 transition">{t(key)}</LocaleLink></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-zinc-300 mb-3">{t('footer.moreTools')}</h3>
              <ul className="space-y-2.5">
                {([['/vedic/muhurta', 'footer.muhurtaFinder'], ['/vedic/nakshatra', 'footer.nakshatraAnalysis'], ['/vedic/shadbala', 'footer.shadbalaCalc'], ['/vedic/remedies', 'footer.vedicRemedies'], ['/matrix/chart', 'footer.matrixOfDestiny'], ['/vedic/report', 'footer.fullReport']] as const).map(([href, key]) => (
                  <li key={href}><LocaleLink href={href} className="text-sm text-zinc-500 hover:text-zinc-300 transition">{t(key)}</LocaleLink></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-zinc-300 mb-3">{t('footer.analysis')}</h3>
              <ul className="space-y-2.5">
                {([['/vedic/career', 'footer.careerAnalysis'], ['/vedic/wealth', 'footer.wealthAnalysis'], ['/vedic/health', 'footer.healthLongevity'], ['/vedic/predictions', 'footer.annualPredictions'], ['/vedic/nadi', 'footer.nadiAstrology'], ['/vedic/ashtakavarga', 'footer.ashtakavarga']] as const).map(([href, key]) => (
                  <li key={href}><LocaleLink href={href} className="text-sm text-zinc-500 hover:text-zinc-300 transition">{t(key)}</LocaleLink></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-zinc-300 mb-3">{t('footer.about')}</h3>
              <ul className="space-y-2.5">
                {([['/how-it-works', 'footer.howItWorks'], ['/settings', 'footer.settings']] as const).map(([href, key]) => (
                  <li key={href}><LocaleLink href={href} className="text-sm text-zinc-500 hover:text-zinc-300 transition">{t(key)}</LocaleLink></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="zodiac-divider max-w-xs mx-auto mb-6">
            <span className="text-xs text-violet-400/30">{ZODIAC_STRIP}</span>
          </div>
          <div className="text-center">
            <p className="text-sm text-zinc-500">{t('app.footer.privacy')}</p>
            <p className="text-xs text-zinc-600 mt-2">{t('app.footer.powered')}</p>
          </div>
        </div>
      </footer>

      <ProfileModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
