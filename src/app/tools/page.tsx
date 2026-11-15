'use client';

import Link from 'next/link';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { useT, type TranslationKey } from '@/lib/i18n';

interface ToolItem {
  href: string;
  nameKey: TranslationKey;
  descKey: TranslationKey;
  icon: string;
}

interface ToolCategory {
  titleKey: TranslationKey;
  tools: ToolItem[];
}

const TOOL_CATEGORIES: ToolCategory[] = [
  {
    titleKey: 'nav.birthChart',
    tools: [
      { href: '/vedic/kundli', nameKey: 'feat.kundli', descKey: 'feat.kundli.desc', icon: '☉' },
      { href: '/vedic/divisional', nameKey: 'more.divisional', descKey: 'divisional.subtitle', icon: '◎' },
      { href: '/vedic/navamsa', nameKey: 'navamsa.title', descKey: 'navamsa.subtitle', icon: '◎' },
    ],
  },
  {
    titleKey: 'nav.predictions',
    tools: [
      { href: '/vedic/dashas', nameKey: 'feat.dashas', descKey: 'feat.dashas.desc', icon: '⏳' },
      { href: '/vedic/predictions', nameKey: 'predictions.title', descKey: 'predictions.subtitle', icon: '🔮' },
      { href: '/vedic/transits', nameKey: 'feat.transits', descKey: 'feat.transits.desc', icon: '♄' },
      { href: '/vedic/sade-sati', nameKey: 'sadeSati.title', descKey: 'sadeSati.subtitle', icon: '🪐' },
    ],
  },
  {
    titleKey: 'yogas.title',
    tools: [
      { href: '/vedic/yogas', nameKey: 'feat.yogas', descKey: 'feat.yogas.desc', icon: '♃' },
      { href: '/vedic/mangal-dosha', nameKey: 'mangalDosha.title', descKey: 'mangalDosha.subtitle', icon: '♂' },
      { href: '/vedic/kaal-sarp-dosha', nameKey: 'kaalSarp.title', descKey: 'kaalSarp.subtitle', icon: '🐍' },
    ],
  },
  {
    titleKey: 'nav.matching',
    tools: [
      { href: '/vedic/compatibility', nameKey: 'feat.compatibility', descKey: 'feat.compatibility.desc', icon: '♥' },
      { href: '/vedic/nakshatra', nameKey: 'nakshatra.title', descKey: 'nakshatra.subtitle', icon: '☽' },
    ],
  },
  {
    titleKey: 'nav.daily',
    tools: [
      { href: '/vedic/panchang', nameKey: 'feat.panchang', descKey: 'feat.panchang.desc', icon: '📅' },
      { href: '/vedic/muhurta', nameKey: 'muhurta.title', descKey: 'muhurta.subtitle', icon: '🕐' },
      { href: '/vedic/choghadiya', nameKey: 'choghadiya.title', descKey: 'choghadiya.subtitle', icon: '⏱' },
    ],
  },
  {
    titleKey: 'shadbala.title',
    tools: [
      { href: '/vedic/shadbala', nameKey: 'shadbala.title', descKey: 'shadbala.subtitle', icon: '⚖' },
      { href: '/vedic/ashtakavarga', nameKey: 'ashtakavarga.title', descKey: 'ashtakavarga.subtitle', icon: '⬡' },
    ],
  },
  {
    titleKey: 'more.kp',
    tools: [
      { href: '/vedic/kp', nameKey: 'kp.title', descKey: 'kp.subtitle', icon: '⊕' },
      { href: '/vedic/jaimini', nameKey: 'jaimini.title', descKey: 'jaimini.subtitle', icon: '♈' },
      { href: '/vedic/nadi', nameKey: 'nadi.title', descKey: 'nadi.subtitle', icon: '🌀' },
    ],
  },
  {
    titleKey: 'nav.lifeAreas',
    tools: [
      { href: '/vedic/career', nameKey: 'career.title', descKey: 'career.subtitle', icon: '💼' },
      { href: '/vedic/wealth', nameKey: 'wealth.title', descKey: 'wealth.subtitle', icon: '₹' },
      { href: '/vedic/health', nameKey: 'health.title', descKey: 'health.subtitle', icon: '❤' },
      { href: '/vedic/remedies', nameKey: 'remedies.title', descKey: 'remedies.subtitle', icon: '💎' },
      { href: '/vedic/report', nameKey: 'report.title', descKey: 'report.subtitle', icon: '📋' },
    ],
  },
  {
    titleKey: 'nav.matrix',
    tools: [
      { href: '/matrix/chart', nameKey: 'matrixChart.title', descKey: 'matrixChart.subtitle', icon: '✦' },
      { href: '/matrix/health', nameKey: 'matrixHealth.title', descKey: 'matrixHealth.subtitle', icon: '🧘' },
      { href: '/matrix/timeline', nameKey: 'matrixTimeline.title', descKey: 'matrixTimeline.subtitle', icon: '📊' },
      { href: '/matrix/compatibility', nameKey: 'matrixCompat.title', descKey: 'matrixCompat.subtitle', icon: '❤️' },
    ],
  },
];

export default function ToolsDirectoryPage() {
  const t = useT();
  const totalTools = TOOL_CATEGORIES.reduce((sum, cat) => sum + cat.tools.length, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-10">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Tools', href: '/tools' }]} />

      <header>
        <div className="zodiac-divider mb-4">
          <span className="text-xs text-violet-400/40">☉ ☽ ♃ ♄ ♂</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
          {t('tools.title')}
        </h1>
        <p className="text-zinc-400 mt-2 max-w-2xl">
          {t('tools.subtitle')}
        </p>
      </header>

      {/* Guide box */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-display text-lg font-semibold text-zinc-200 mb-3">{t('tools.guide')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="text-zinc-400">
            <Link href="/vedic/kundli" className="text-violet-400 hover:underline">{t('tools.guide.kundli')}</Link>
          </div>
          <div className="text-zinc-400">
            <Link href="/vedic/compatibility" className="text-violet-400 hover:underline">{t('tools.guide.compat')}</Link>
          </div>
          <div className="text-zinc-400">
            <Link href="/vedic/transits" className="text-violet-400 hover:underline">{t('tools.guide.transits')}</Link>
          </div>
          <div className="text-zinc-400">
            <Link href="/vedic/panchang" className="text-violet-400 hover:underline">{t('tools.guide.timing')}</Link>
          </div>
        </div>
      </div>

      {/* Tool categories */}
      {TOOL_CATEGORIES.map(category => (
        <section key={category.titleKey}>
          <h2 className="section-title mb-4">{t(category.titleKey)}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.tools.map(tool => (
              <Link
                key={tool.href}
                href={tool.href}
                className="glass-card rounded-xl p-5 hover:border-violet-500/30 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5">{tool.icon}</span>
                  <div>
                    <h3 className="font-display font-semibold text-zinc-200 group-hover:text-white transition-colors">
                      {t(tool.nameKey)}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{t(tool.descKey)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* SEO footer */}
      <section className="mt-12 border-t border-white/[0.04] pt-8">
        <h2 className="font-display text-lg font-semibold text-zinc-300 mb-3">{t('tools.about.heading')}</h2>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl">
          {t('tools.about.text')}{' '}
          <Link href="/how-it-works" className="text-violet-400 hover:underline">
            {t('footer.howItWorks')} →
          </Link>
        </p>
      </section>
    </div>
  );
}
