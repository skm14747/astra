'use client';

import LocaleLink from './LocaleLink';
import { useT, type TranslationKey } from '@/lib/i18n';

const POPULAR_TOOLS: { href: string; labelKey: TranslationKey }[] = [
  { href: '/vedic/kundli', labelKey: 'footer.freeKundli' },
  { href: '/vedic/compatibility', labelKey: 'footer.kundliMilan' },
  { href: '/vedic/dashas', labelKey: 'footer.dashaTimeline' },
  { href: '/vedic/panchang', labelKey: 'footer.dailyPanchang' },
  { href: '/vedic/nakshatra', labelKey: 'footer.nakshatraAnalysis' },
  { href: '/vedic/mangal-dosha', labelKey: 'mangalDosha.title' },
  { href: '/vedic/kaal-sarp-dosha', labelKey: 'kaalSarp.title' },
  { href: '/vedic/navamsa', labelKey: 'navamsa.title' },
  { href: '/vedic/sade-sati', labelKey: 'footer.sadeSatiCheck' },
  { href: '/vedic/choghadiya', labelKey: 'choghadiya.title' },
  { href: '/vedic/yogas', labelKey: 'footer.yogasDoshas' },
  { href: '/vedic/muhurta', labelKey: 'footer.muhurtaFinder' },
  { href: '/vedic/divisional', labelKey: 'more.divisional' },
  { href: '/vedic/transits', labelKey: 'related.transits' },
];

const RESOURCES: { href: string; labelKey: TranslationKey }[] = [
  { href: '/tools', labelKey: 'tools.title' },
  { href: '/how-it-works', labelKey: 'footer.howItWorks' },
  { href: '/about', labelKey: 'footer.about' },
  { href: '/settings', labelKey: 'footer.settings' },
];

const LEGAL: { href: string; label: string }[] = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/disclaimer', label: 'Disclaimer' },
];

export default function SiteFooter() {
  const t = useT();

  return (
    <footer className="relative z-10 border-t border-white/[0.04] bg-black/20 mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <LocaleLink href="/" className="font-display text-xl font-bold text-violet-400 tracking-wide">
              ASTRA DESTINY
            </LocaleLink>
            <p className="text-sm text-zinc-500 mt-2 max-w-[220px] leading-relaxed">
              {t('app.footer.privacy')}
            </p>
          </div>

          {/* Popular Tools */}
          <div className="col-span-1">
            <h3 className="text-sm font-medium text-zinc-400 mb-3">
              {t('footer.popularTools')}
            </h3>
            <nav aria-label="Popular tools" className="flex flex-col gap-2">
              {POPULAR_TOOLS.slice(0, 6).map(item => (
                <LocaleLink key={item.href} href={item.href} className="text-[0.9375rem] text-zinc-500 hover:text-zinc-300 transition-colors">
                  {t(item.labelKey)}
                </LocaleLink>
              ))}
            </nav>
          </div>

          {/* More Tools */}
          <div className="col-span-1">
            <h3 className="text-sm font-medium text-zinc-400 mb-3">
              {t('footer.moreTools')}
            </h3>
            <nav aria-label="More tools" className="flex flex-col gap-2">
              {POPULAR_TOOLS.slice(6).map(item => (
                <LocaleLink key={item.href} href={item.href} className="text-[0.9375rem] text-zinc-500 hover:text-zinc-300 transition-colors">
                  {t(item.labelKey)}
                </LocaleLink>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-sm font-medium text-zinc-400 mb-3">
              {t('footer.about')}
            </h3>
            <nav aria-label="Resources" className="flex flex-col gap-2">
              {RESOURCES.map(item => (
                <LocaleLink key={item.href} href={item.href} className="text-[0.9375rem] text-zinc-500 hover:text-zinc-300 transition-colors">
                  {t(item.labelKey)}
                </LocaleLink>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-600">
            © 2026 Astra Destiny · {t('app.tagline')}
          </p>
          <nav aria-label="Legal" className="flex gap-5">
            {LEGAL.map(l => (
              <LocaleLink key={l.href} href={l.href} className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors">
                {l.label}
              </LocaleLink>
            ))}
          </nav>
        </div>
        <p className="text-sm text-zinc-700 text-center mt-3">
          {t('app.footer.powered')}
        </p>
      </div>
    </footer>
  );
}
