'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { href: '/', label: 'Home', icon: '✦' },
  { href: '/vedic/kundli', label: 'Chart', icon: '☉' },
  { href: '/vedic/panchang', label: 'Daily', icon: '🌙' },
  { href: '/vedic/compatibility', label: 'Match', icon: '💫' },
  { href: '/matrix/chart', label: 'Matrix', icon: '◇' },
];

export default function BottomTabs() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#050510]/80 backdrop-blur-2xl border-t border-violet-500/[0.06]">
      <div className="flex justify-around items-center h-16 px-2 max-w-lg mx-auto">
        {TABS.map(tab => {
          const active = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href.split('/').slice(0, 3).join('/')));
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                active ? 'text-violet-300' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <span className={`text-lg transition-transform ${active ? 'scale-110 drop-shadow-[0_0_8px_rgba(124,92,252,0.5)]' : ''}`}>{tab.icon}</span>
              <span className="text-[10px] font-medium">{tab.label}</span>
              {active && <span className="w-1 h-1 rounded-full bg-violet-400 -mt-0.5 shadow-[0_0_6px_rgba(124,92,252,0.6)]" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
