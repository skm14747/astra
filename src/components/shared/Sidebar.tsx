'use client';
import LocaleLink from './LocaleLink';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const SECTIONS = [
  {
    heading: 'Birth Chart',
    icon: '☉',
    items: [
      { href: '/vedic/kundli', label: 'Kundli' },
      { href: '/vedic/divisional', label: 'Divisional Charts' },
      { href: '/vedic/yogas', label: 'Yogas & Doshas' },
      { href: '/vedic/remedies', label: 'Remedies' },
    ],
  },
  {
    heading: 'Predictions',
    icon: '⏳',
    items: [
      { href: '/vedic/dashas', label: 'Dasha Timeline' },
      { href: '/vedic/transits', label: 'Transits (Gochar)' },
      { href: '/vedic/nakshatra', label: 'Nakshatra' },
      { href: '/vedic/kp', label: 'KP System' },
    ],
  },
  {
    heading: 'Daily',
    icon: '📅',
    items: [
      { href: '/vedic/panchang', label: 'Panchang' },
      { href: '/vedic/muhurta', label: 'Muhurta' },
      { href: '/vedic/ashtakavarga', label: 'Ashtakavarga' },
    ],
  },
  {
    heading: 'Matching',
    icon: '💕',
    items: [
      { href: '/vedic/compatibility', label: 'Kundli Milan' },
      { href: '/matrix/compatibility', label: 'Matrix Compatibility' },
    ],
  },
  {
    heading: 'Matrix of Destiny',
    icon: '✦',
    items: [
      { href: '/matrix/chart', label: 'Personal Chart' },
      { href: '/matrix/health', label: 'Health Card' },
      { href: '/matrix/timeline', label: 'Life Timeline' },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    Object.fromEntries(SECTIONS.map(s => [s.heading, true])),
  );

  const toggleSection = (heading: string) => {
    setExpandedSections(prev => ({ ...prev, [heading]: !prev[heading] }));
  };

  return (
    <nav
      className={`fixed left-0 top-0 h-screen bg-zinc-900 border-r border-zinc-800 overflow-y-auto flex flex-col transition-all duration-200 z-50
        hidden md:flex ${collapsed ? 'w-12' : 'w-56'}`}
    >
      <div className="flex items-center justify-between p-3">
        <LocaleLink href="/" className={`font-bold text-violet-400 transition-all ${collapsed ? 'text-sm' : 'text-lg px-1'}`}>
          {collapsed ? '✦' : '✦ Astra'}
        </LocaleLink>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-zinc-500 hover:text-zinc-300 p-0.5"
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            {collapsed
              ? <path d="M6 4l4 4-4 4" strokeLinecap="round" />
              : <path d="M10 4L6 8l4 4" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      <div className="flex-1 space-y-1 px-1.5">
        {SECTIONS.map(sec => (
          <div key={sec.heading}>
            <button
              onClick={() => collapsed ? setCollapsed(false) : toggleSection(sec.heading)}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition ${collapsed ? 'justify-center' : ''}`}
              title={sec.heading}
            >
              <span className="text-sm flex-shrink-0">{sec.icon}</span>
              {!collapsed && (
                <>
                  <span className="text-[10px] font-semibold flex-1 text-left">{sec.heading}</span>
                  <svg className={`w-3 h-3 transition-transform ${expandedSections[sec.heading] ? 'rotate-90' : ''}`} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4.5 2.5l3.5 3.5-3.5 3.5" strokeLinecap="round" />
                  </svg>
                </>
              )}
            </button>
            {!collapsed && expandedSections[sec.heading] && (
              <div className="ml-5 space-y-0.5">
                {sec.items.map(item => {
                  const clean = pathname.replace(/^\/(hi|ne|pt|es|ja|fr|ko)/, '') || '/';
                  const active = clean === item.href;
                  return (
                    <LocaleLink
                      key={item.href}
                      href={item.href}
                      className={`block text-sm px-2 py-1 rounded transition ${active ? 'bg-violet-600/20 text-violet-300' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'}`}
                    >
                      {item.label}
                    </LocaleLink>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
