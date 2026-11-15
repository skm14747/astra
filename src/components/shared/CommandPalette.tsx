'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { useProfile } from '@/lib/profile/context';
import { useT } from '@/lib/i18n';

const PAGES = [
  { name: 'Dashboard', href: '/', keywords: 'home होम' },
  { name: 'Kundli / Birth Chart', href: '/vedic/kundli', keywords: 'chart planets houses कुंडली' },
  { name: 'Divisional Charts', href: '/vedic/divisional', keywords: 'd1 d9 navamsa varga वर्ग' },
  { name: 'Dasha Timeline', href: '/vedic/dashas', keywords: 'mahadasha antardasha vimshottari दशा' },
  { name: 'Daily Panchang', href: '/vedic/panchang', keywords: 'tithi nakshatra yoga karana पंचांग' },
  { name: 'Muhurta', href: '/vedic/muhurta', keywords: 'auspicious timing hora मुहूर्त' },
  { name: 'Yogas & Doshas', href: '/vedic/yogas', keywords: 'raja yoga kaal sarp mangal योग दोष' },
  { name: 'Transits', href: '/vedic/transits', keywords: 'gochar sade sati saturn गोचर' },
  { name: 'Nakshatra', href: '/vedic/nakshatra', keywords: 'star constellation pada नक्षत्र' },
  { name: 'Compatibility', href: '/vedic/compatibility', keywords: 'kundli milan matching koota मिलान' },
  { name: 'Ashtakavarga', href: '/vedic/ashtakavarga', keywords: 'bav sav benefic points अष्टकवर्ग' },
  { name: 'KP System', href: '/vedic/kp', keywords: 'krishnamurti sub lord केपी' },
  { name: 'Remedies', href: '/vedic/remedies', keywords: 'gemstone mantra lifestyle उपाय' },
  { name: 'Matrix of Destiny', href: '/matrix/chart', keywords: 'octagram arcana मैट्रिक्स' },
  { name: 'Matrix Compatibility', href: '/matrix/compatibility', keywords: 'couples harmony अनुकूलता' },
  { name: 'Health Card', href: '/matrix/health', keywords: 'chakra health स्वास्थ्य चक्र' },
  { name: 'Life Timeline', href: '/matrix/timeline', keywords: 'age cycle year forecast जीवन समयरेखा' },
  { name: 'Settings', href: '/settings', keywords: 'ayanamsa chart style preferences सेटिंग्स' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { profiles, setActiveProfile } = useProfile();
  const t = useT();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const navigate = useCallback((href: string) => {
    router.push(href);
    setOpen(false);
  }, [router]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-24 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div className="w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <Command className="glass-card rounded-2xl shadow-2xl overflow-hidden">
          <Command.Input
            placeholder={t('app.search')}
            className="w-full px-5 py-4 bg-transparent border-b border-white/[0.04] text-sm outline-none placeholder:text-zinc-500"
            autoFocus
          />
          <Command.List className="max-h-72 overflow-y-auto p-2">
            <Command.Empty className="px-4 py-6 text-center text-sm text-zinc-500">{t('common.noResults')}</Command.Empty>

            <Command.Group heading={t('cmd.pages')} className="text-[10px] text-zinc-500 uppercase tracking-wider px-2 py-1">
              {PAGES.map(page => (
                <Command.Item
                  key={page.href}
                  value={`${page.name} ${page.keywords}`}
                  onSelect={() => navigate(page.href)}
                  className="px-3 py-2 rounded-lg text-sm cursor-pointer data-[selected=true]:bg-white/[0.06] flex items-center gap-2"
                >
                  <span className="text-zinc-300">{page.name}</span>
                </Command.Item>
              ))}
            </Command.Group>

            {profiles.length > 0 && (
              <Command.Group heading={t('cmd.switchProfile')} className="text-[10px] text-zinc-500 uppercase tracking-wider px-2 py-1 mt-2">
                {profiles.map(p => (
                  <Command.Item
                    key={p.id}
                    value={`profile ${p.name} ${p.city}`}
                    onSelect={() => { setActiveProfile(p.id); setOpen(false); }}
                    className="px-3 py-2 rounded-lg text-sm cursor-pointer data-[selected=true]:bg-white/[0.06]"
                  >
                    <span className="text-zinc-300">{p.name}</span>
                    <span className="text-zinc-500 text-xs ml-2">{p.city}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}
          </Command.List>
        </Command>
        <p className="text-center text-[10px] text-zinc-600 mt-2">{t('common.pressEsc')}</p>
      </div>
    </div>
  );
}
