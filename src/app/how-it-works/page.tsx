'use client';

import Link from 'next/link';
import { useT } from '@/lib/i18n';
import type { TranslationKey } from '@/lib/i18n';

const SECTIONS: { titleKey: TranslationKey; icon: string; contentKeys: TranslationKey[] }[] = [
  {
    titleKey: 'hiw.astronomy.title',
    icon: '🔭',
    contentKeys: ['hiw.astronomy.p1', 'hiw.astronomy.p2'],
  },
  {
    titleKey: 'hiw.ayanamsa.title',
    icon: '⟳',
    contentKeys: ['hiw.ayanamsa.p1', 'hiw.ayanamsa.lahiri', 'hiw.ayanamsa.kp', 'hiw.ayanamsa.raman'],
  },
  {
    titleKey: 'hiw.sources.title',
    icon: '📜',
    contentKeys: ['hiw.sources.p1', 'hiw.sources.bphs', 'hiw.sources.uk', 'hiw.sources.jaimini', 'hiw.sources.tajaka'],
  },
  {
    titleKey: 'hiw.clientSide.title',
    icon: '🔒',
    contentKeys: ['hiw.clientSide.p1', 'hiw.clientSide.p2'],
  },
  {
    titleKey: 'hiw.houses.title',
    icon: '🏠',
    contentKeys: ['hiw.houses.p1', 'hiw.houses.whole', 'hiw.houses.sripati', 'hiw.houses.placidus'],
  },
  {
    titleKey: 'hiw.tools.title',
    icon: '⚙️',
    contentKeys: ['hiw.tools.p1'],
  },
];

export default function HowItWorksPage() {
  const t = useT();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
          {t('hiw.title')}
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          {t('hiw.subtitle')}
        </p>
      </div>

      <div className="space-y-12">
        {SECTIONS.map((section) => (
          <section key={section.titleKey} className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-2xl flex-shrink-0 mt-1">{section.icon}</span>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white">
                {t(section.titleKey)}
              </h2>
            </div>
            <div className="space-y-3 ml-12">
              {section.contentKeys.map((key) => (
                <p key={key} className="text-zinc-400 leading-relaxed text-[15px]">
                  {t(key)}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 text-center space-y-4">
        <p className="text-sm text-zinc-500">
          {t('hiw.cta.methodology')}
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/vedic/kundli" className="cosmic-btn px-6 py-2.5 text-sm">
            {t('hiw.cta.generateKundli')}
          </Link>
          <Link href="/llms-full.txt" className="glass-card px-6 py-2.5 rounded-full text-zinc-300 text-sm font-medium hover:text-white transition">
            {t('hiw.cta.viewInventory')}
          </Link>
        </div>
      </div>
    </div>
  );
}
