'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { useProfile } from '@/lib/profile/context';
import { useT, type TranslationKey } from '@/lib/i18n';

interface PageItem {
  href: string;
  nameKey: TranslationKey;
  keywords: string;
}

const PAGE_ITEMS: PageItem[] = [
  { href: '/', nameKey: 'tab.home', keywords: 'dashboard home होम गृह inicio ホーム' },
  { href: '/vedic/kundli', nameKey: 'nav.kundli', keywords: 'chart planets houses कुंडली चिना mapa クンドリー' },
  { href: '/vedic/report', nameKey: 'nav.fullReport', keywords: 'report life जीवन पत्रिका relatório informe レポート' },
  { href: '/vedic/divisional', nameKey: 'more.divisional', keywords: 'd1 d9 navamsa varga वर्ग vargas 分割図' },
  { href: '/vedic/navamsa', nameKey: 'navamsa.title', keywords: 'd9 navamsa marriage नवमांश ナヴァムシャ' },
  { href: '/vedic/dashas', nameKey: 'nav.dashas', keywords: 'mahadasha antardasha vimshottari दशा dasha ダシャー' },
  { href: '/vedic/predictions', nameKey: 'predictions.title', keywords: 'annual varshaphal year solar वर्षफल 年運' },
  { href: '/vedic/transits', nameKey: 'nav.transits', keywords: 'gochar sade sati saturn गोचर trânsito トランジット' },
  { href: '/vedic/sade-sati', nameKey: 'nav.sadeSati', keywords: 'saturn shani साढ़े साती साढेसाती サディサティ' },
  { href: '/vedic/yogas', nameKey: 'nav.yogas', keywords: 'raja yoga kaal sarp mangal योग दोष ヨーガ' },
  { href: '/vedic/mangal-dosha', nameKey: 'mangalDosha.title', keywords: 'manglik mars मंगल मांगलिक マンガル' },
  { href: '/vedic/kaal-sarp-dosha', nameKey: 'kaalSarp.title', keywords: 'serpent rahu ketu कालसर्प カールサルパ' },
  { href: '/vedic/compatibility', nameKey: 'nav.kundliMilan', keywords: 'kundli milan matching koota मिलान sinastria 相性' },
  { href: '/vedic/nakshatra', nameKey: 'nav.nakshatra', keywords: 'star constellation pada नक्षत्र ナクシャトラ' },
  { href: '/vedic/panchang', nameKey: 'nav.panchang', keywords: 'tithi nakshatra yoga karana पंचांग panchangam 暦' },
  { href: '/vedic/muhurta', nameKey: 'nav.muhurta', keywords: 'auspicious timing hora मुहूर्त साइत 吉時' },
  { href: '/vedic/choghadiya', nameKey: 'nav.choghadiya', keywords: 'choghadiya चौघड़िया चौघडिया チョーガディヤ' },
  { href: '/vedic/ashtakavarga', nameKey: 'nav.ashtakavarga', keywords: 'bav sav benefic points अष्टकवर्ग アシュタカヴァルガ' },
  { href: '/vedic/shadbala', nameKey: 'nav.shadbala', keywords: 'strength षड्बल shadbala シャドバラ' },
  { href: '/vedic/kp', nameKey: 'nav.kp', keywords: 'krishnamurti sub lord केपी kp' },
  { href: '/vedic/jaimini', nameKey: 'nav.jaimini', keywords: 'chara karaka jaimini जैमिनी ジャイミニ' },
  { href: '/vedic/nadi', nameKey: 'nav.nadi', keywords: 'bhrigu bindu nadi नाडी नाड़ी ナーディ' },
  { href: '/vedic/career', nameKey: 'nav.career', keywords: 'career job business पेशा आजीविका 仕事' },
  { href: '/vedic/wealth', nameKey: 'nav.wealth', keywords: 'money wealth finance धन संपत्ति 財運' },
  { href: '/vedic/health', nameKey: 'nav.health', keywords: 'ayush health longevity स्वास्थ्य सेहत 健康' },
  { href: '/vedic/remedies', nameKey: 'nav.remedies', keywords: 'gemstone mantra lifestyle उपाय 処方' },
  { href: '/matrix/chart', nameKey: 'nav.matrixChart', keywords: 'octagram arcana मैट्रिक्स destiny 数秘' },
  { href: '/matrix/health', nameKey: 'nav.matrixHealth', keywords: 'chakra health स्वास्थ्य चक्र chakras チャクラ' },
  { href: '/matrix/timeline', nameKey: 'nav.matrixTimeline', keywords: 'age cycle year forecast जीवन समयरेखा 年齢' },
  { href: '/matrix/compatibility', nameKey: 'nav.matrixCompat', keywords: 'couples harmony अनुकूलता तालमेल 相性' },
  { href: '/tools', nameKey: 'tools.title', keywords: 'all tools directory उपकरण ツール' },
  { href: '/settings', nameKey: 'settings.title', keywords: 'ayanamsa chart style preferences सेटिंग्स 設定' },
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
              {PAGE_ITEMS.map(page => {
                const title = t(page.nameKey);
                return (
                  <Command.Item
                    key={page.href}
                    value={`${title} ${page.keywords}`}
                    onSelect={() => navigate(page.href)}
                    className="px-3 py-2 rounded-lg text-sm cursor-pointer data-[selected=true]:bg-white/[0.06] flex items-center gap-2"
                  >
                    <span className="text-zinc-300">{title}</span>
                  </Command.Item>
                );
              })}
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
