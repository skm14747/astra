'use client';
import LocaleLink from './LocaleLink';
import { usePathname } from 'next/navigation';
import { useT } from '@/lib/i18n';
import type { TranslationKey } from '@/lib/i18n';

const TABS: { href: string; labelKey: TranslationKey; icon: string }[] = [
  { href: '/', labelKey: 'tab.home', icon: '✦' },
  { href: '/vedic/kundli', labelKey: 'tab.chart', icon: '☉' },
  { href: '/vedic/panchang', labelKey: 'tab.daily', icon: '🌙' },
  { href: '/vedic/compatibility', labelKey: 'tab.match', icon: '💫' },
  { href: '/matrix/chart', labelKey: 'tab.matrix', icon: '◇' },
];

export default function BottomTabs() {
  const pathname = usePathname();
  const t = useT();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0a0a1a]/85 backdrop-blur-2xl border-t border-violet-500/[0.08]">
      <div className="flex justify-around items-center h-[4.5rem] px-2 max-w-lg mx-auto">
        {TABS.map(tab => {
          const clean = pathname.replace(/^\/(hi|ne|pt|es|ja|fr|ko)/, '') || '/';
          const active = clean === tab.href || (tab.href !== '/' && clean.startsWith(tab.href.split('/').slice(0, 3).join('/')));
          return (
            <LocaleLink
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                active ? 'text-violet-300' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <span className={`text-xl transition-transform ${active ? 'scale-110 drop-shadow-[0_0_8px_rgba(124,92,252,0.5)]' : ''}`}>{tab.icon}</span>
              <span className="text-xs font-medium">{t(tab.labelKey)}</span>
              {active && <span className="w-1 h-1 rounded-full bg-violet-400 -mt-0.5 shadow-[0_0_6px_rgba(124,92,252,0.6)]" />}
            </LocaleLink>
          );
        })}
      </div>
    </nav>
  );
}
