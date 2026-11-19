'use client';
import { useState, useRef, useEffect } from 'react';
import LocaleLink from './LocaleLink';
import { usePathname, useRouter } from 'next/navigation';
import { useProfile } from '@/lib/profile/context';
import { useSettings, type FontSize, type Language } from '@/lib/settings/context';
import { useT } from '@/lib/i18n';
import ProfileModal from './ProfileModal';

import type { TranslationKey } from '@/lib/i18n';

const NAV_GROUPS: { labelKey: TranslationKey; items: { href: string; labelKey: TranslationKey }[] }[] = [
  {
    labelKey: 'nav.birthChart',
    items: [
      { href: '/vedic/kundli', labelKey: 'nav.kundli' },
      { href: '/vedic/report', labelKey: 'nav.fullReport' },
      { href: '/vedic/divisional', labelKey: 'nav.divisional' },
      { href: '/vedic/navamsa', labelKey: 'navamsa.title' },
      { href: '/vedic/yogas', labelKey: 'nav.yogas' },
      { href: '/vedic/mangal-dosha', labelKey: 'mangalDosha.title' },
      { href: '/vedic/kaal-sarp-dosha', labelKey: 'kaalSarp.title' },
      { href: '/vedic/shadbala', labelKey: 'nav.shadbala' },
      { href: '/vedic/jaimini', labelKey: 'nav.jaimini' },
      { href: '/vedic/atmakaraka', labelKey: 'atmakaraka.title' },
      { href: '/vedic/darakaraka', labelKey: 'darakaraka.title' },
      { href: '/vedic/karakamsha', labelKey: 'karakamsha.title' },
      { href: '/vedic/upapada', labelKey: 'upapada.title' },
      { href: '/vedic/arudha-pada', labelKey: 'arudhaPada.title' },
      { href: '/vedic/varshphal', labelKey: 'varshphal.title' },
      { href: '/vedic/nadi', labelKey: 'nav.nadi' },
    ],
  },
  {
    labelKey: 'nav.predictions',
    items: [
      { href: '/vedic/dashas', labelKey: 'nav.dashas' },
      { href: '/vedic/transits', labelKey: 'nav.transits' },
      { href: '/vedic/sade-sati', labelKey: 'nav.sadeSati' },
      { href: '/vedic/predictions', labelKey: 'nav.annualPredictions' },
      { href: '/vedic/nakshatra', labelKey: 'nav.nakshatra' },
      { href: '/nakshatras', labelKey: 'nav.astrologyHub' },
      { href: '/vedic/kp', labelKey: 'nav.kp' },
    ],
  },
  {
    labelKey: 'nav.lifeAreas',
    items: [
      { href: '/vedic/career', labelKey: 'nav.career' },
      { href: '/vedic/wealth', labelKey: 'nav.wealth' },
      { href: '/vedic/health', labelKey: 'nav.health' },
      { href: '/vedic/remedies', labelKey: 'nav.remedies' },
    ],
  },
  {
    labelKey: 'nav.daily',
    items: [
      { href: '/vedic/panchang', labelKey: 'nav.panchang' },
      { href: '/vedic/muhurta', labelKey: 'nav.muhurta' },
      { href: '/vedic/choghadiya', labelKey: 'nav.choghadiya' },
      { href: '/vedic/ashtakavarga', labelKey: 'nav.ashtakavarga' },
    ],
  },
  {
    labelKey: 'nav.matching',
    items: [
      { href: '/vedic/compatibility', labelKey: 'nav.kundliMilan' },
      { href: '/matrix/compatibility', labelKey: 'nav.matrixCompat' },
      { href: '/horoscope/love', labelKey: 'nav.loveHub' },
      { href: '/astrology/venus-mars-compatibility', labelKey: 'nav.venusMars' },
      { href: '/astrology/darakaraka-spouse', labelKey: 'nav.darakarakaSpouse' },
      { href: '/astrology/marriage-timing', labelKey: 'nav.marriageTiming' },
      { href: '/astrology/synastry-aspects', labelKey: 'nav.synastryAspects' },
      { href: '/tools/western/synastry', labelKey: 'western.synastry.title' },
    ],
  },
  {
    labelKey: 'nav.matrix',
    items: [
      { href: '/matrix/chart', labelKey: 'nav.matrixChart' },
      { href: '/matrix/health', labelKey: 'nav.matrixHealth' },
      { href: '/matrix/timeline', labelKey: 'nav.matrixTimeline' },
      { href: '/tools/numerology', labelKey: 'numerology.hub.title' },
      { href: '/tools/western/lilith', labelKey: 'western.lilith.title' },
      { href: '/tools/western/chiron', labelKey: 'western.chiron.title' },
      { href: '/tools/western/saturn-return', labelKey: 'western.saturnReturn.title' },
      { href: '/astrology', labelKey: 'nav.astrologyHub' },
    ],
  },
];

const FONT_SIZES: FontSize[] = ['small', 'default', 'large', 'xl'];
const FONT_LABELS: Record<FontSize, string> = { small: 'S', default: 'M', large: 'L', xl: 'XL' };

export default function Navbar() {
  const pathname = usePathname();
  const { profiles, activeProfile, setActiveProfile } = useProfile();
  const router = useRouter();
  const { fontSize, setFontSize, theme, setTheme, language, setLanguage } = useSettings();
  const t = useT();
  const [mobileOpen, setMobileOpen] = useState(false);

  const ALL_LANGUAGES: { code: Language; label: string; short: string; family: 'vedic' | 'latin' | 'east-asian' | 'global' }[] = [
    { code: 'en', label: 'English', short: 'EN', family: 'global' },
    { code: 'hi', label: 'हिन्दी', short: 'हि', family: 'vedic' },
    { code: 'ne', label: 'नेपाली', short: 'ने', family: 'vedic' },
    { code: 'pt', label: 'Português', short: 'PT', family: 'latin' },
    { code: 'es', label: 'Español', short: 'ES', family: 'latin' },
    { code: 'fr', label: 'Français', short: 'FR', family: 'latin' },
    { code: 'ja', label: '日本語', short: 'JA', family: 'east-asian' },
    { code: 'ko', label: '한국어', short: 'KO', family: 'east-asian' },
  ];

  const currentFamily = ALL_LANGUAGES.find(l => l.code === language)?.family || 'global';
  const primaryLangs = ALL_LANGUAGES.filter(l =>
    l.code === language || l.family === 'global' || l.family === currentFamily
  );
  const moreLangs = ALL_LANGUAGES.filter(l =>
    l.code !== language && l.family !== 'global' && l.family !== currentFamily
  );
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    const cleanPath = pathname.replace(/^\/(hi|ne|pt|es|ja|fr|ko)/, '') || '/';
    if (lang === 'en') {
      router.push(cleanPath);
    } else {
      router.push(`/${lang}${cleanPath}`);
    }
    setLangDropdown(false);
  };
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const cycleFontUp = () => {
    const i = FONT_SIZES.indexOf(fontSize);
    if (i < FONT_SIZES.length - 1) setFontSize(FONT_SIZES[i + 1]);
  };
  const cycleFontDown = () => {
    const i = FONT_SIZES.indexOf(fontSize);
    if (i > 0) setFontSize(FONT_SIZES[i - 1]);
  };

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileDropdown(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangDropdown(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const formatDate = (iso: string) => new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const handleGroupEnter = (label: string) => {
    clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };
  const handleGroupLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  // Strip locale prefix for active-state matching (pathname may be /hi/vedic/kundli)
  const cleanPathname = pathname.replace(/^\/(hi|ne|pt|es|ja|fr|ko)/, '') || '/';
  const isGroupActive = (group: typeof NAV_GROUPS[0]) => group.items.some(i => cleanPathname === i.href);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-violet-500/[0.08] bg-[#0a0a1a]/70 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 h-16">
          {/* Logo */}
          <LocaleLink href="/" className="flex items-center gap-2.5 group">
            <span className="text-2xl drop-shadow-[0_0_8px_rgba(124,92,252,0.5)]">✦</span>
            <span className="font-display text-xl font-bold tracking-tight gradient-text">Astra</span>
          </LocaleLink>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation">
            {NAV_GROUPS.map(group => (
              <div
                key={t(group.labelKey)}
                className="relative"
                onMouseEnter={() => handleGroupEnter(t(group.labelKey))}
                onMouseLeave={handleGroupLeave}
              >
                <button
                  className={`px-3.5 py-2.5 rounded-lg text-[0.9375rem] font-medium transition-colors ${
                    isGroupActive(group) ? 'text-white drop-shadow-[0_0_8px_rgba(124,92,252,0.3)]' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {t(group.labelKey)}
                  <svg className="inline-block ml-1 w-3 h-3 opacity-40" viewBox="0 0 12 12" fill="none"><path d="M3 5l3 2.5L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </button>
                {openDropdown === t(group.labelKey) && (
                  <div className="absolute top-full left-0 pt-1 min-w-[200px]">
                    <div className="glass-card rounded-xl p-2 shadow-2xl">
                      {group.items.map(item => (
                        <LocaleLink
                          key={item.href}
                          href={item.href}
                          className={`block px-3.5 py-2.5 rounded-lg text-[0.9375rem] transition-colors ${
                            cleanPathname === item.href
                              ? 'bg-white/[0.06] text-white font-medium'
                              : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                          }`}
                        >
                          {t(item.labelKey)}
                        </LocaleLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side: profile + settings */}
          <div className="flex items-center gap-3">
            {/* Profile pill */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => activeProfile ? setProfileDropdown(!profileDropdown) : setModalOpen(true)}
                className="flex items-center gap-2 glass-card rounded-full pl-3 pr-2 py-1.5 text-sm hover:border-white/10"
              >
                {mounted && activeProfile ? (
                  <>
                    <span className="relative w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_6px_rgba(124,92,252,0.5)]" />
                    <span className="font-medium text-zinc-200 max-w-[100px] truncate">{activeProfile.name}</span>
                    <svg className="w-3.5 h-3.5 text-zinc-500" viewBox="0 0 12 12" fill="none"><path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </>
                ) : (
                  <span className="text-zinc-400 pr-1">+ {t('profile.createCta')}</span>
                )}
              </button>

              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-72 glass-card rounded-xl p-2 shadow-2xl">
                  {profiles.map(p => (
                    <button
                      key={p.id}
                      onClick={() => { setActiveProfile(p.id); setProfileDropdown(false); }}
                      className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                        p.id === activeProfile?.id ? 'bg-violet-500/10 text-white' : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${p.id === activeProfile?.id ? 'bg-violet-400' : 'bg-zinc-600'}`} />
                      <div className="min-w-0">
                        <div className="font-medium text-sm truncate">{p.name}</div>
                        <div className="text-xs text-zinc-500">{formatDate(p.dateOfBirth)} · {p.city}</div>
                      </div>
                    </button>
                  ))}
                  <div className="mt-1 pt-1 border-t border-white/[0.04]">
                    <button
                      onClick={() => { setProfileDropdown(false); setModalOpen(true); }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-violet-400 hover:bg-white/[0.04] transition"
                    >
                      + New Profile
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Accessibility toolbar */}
            <div className="hidden sm:flex items-center gap-1 glass-card rounded-full px-1.5 py-1">
              {/* Font size decrease */}
              <button
                onClick={cycleFontDown}
                disabled={fontSize === 'small'}
                className="w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed transition"
                title="Decrease font size"
                aria-label="Decrease font size"
              >
                A−
              </button>
              {/* Font size label */}
              <span className="text-[10px] font-semibold text-violet-400 w-5 text-center" aria-live="polite">{FONT_LABELS[fontSize]}</span>
              {/* Font size increase */}
              <button
                onClick={cycleFontUp}
                disabled={fontSize === 'xl'}
                className="w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold text-zinc-400 hover:text-white hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed transition"
                title="Increase font size"
                aria-label="Increase font size"
              >
                A+
              </button>
              {/* Divider */}
              <span className="w-px h-4 bg-white/[0.08] mx-0.5" />
              {/* Language selector */}
              <div ref={langRef} className="relative">
                <button
                  onClick={() => setLangDropdown(!langDropdown)}
                  className="w-7 h-7 flex items-center justify-center rounded-full text-[10px] font-bold text-zinc-400 hover:text-white hover:bg-white/[0.08] transition"
                  title="Change language"
                  aria-label="Change language"
                >
                  {ALL_LANGUAGES.find(l => l.code === language)?.short || 'EN'}
                </button>
                {langDropdown && (
                  <div className="absolute top-full right-0 mt-2 min-w-[150px] glass-card rounded-xl p-1.5 shadow-2xl z-50">
                    {primaryLangs.map(l => (
                      <button
                        key={l.code}
                        onClick={() => handleLanguageChange(l.code)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2.5 ${
                          language === l.code
                            ? 'bg-violet-500/10 text-white font-medium'
                            : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                        }`}
                      >
                        <span className="text-[10px] font-bold w-5 text-center opacity-60">{l.short}</span>
                        {l.label}
                      </button>
                    ))}
                    {moreLangs.length > 0 && (
                      <>
                        <div className="my-1 border-t border-white/[0.06] mx-2" />
                        <div className="px-3 pt-1 pb-0.5 text-[10px] font-medium text-zinc-600">More</div>
                        {moreLangs.map(l => (
                          <button
                            key={l.code}
                            onClick={() => handleLanguageChange(l.code)}
                            className="w-full text-left px-3 py-1.5 rounded-lg text-sm text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04] transition-colors flex items-center gap-2.5"
                          >
                            <span className="text-[10px] font-bold w-5 text-center opacity-40">{l.short}</span>
                            {l.label}
                          </button>
                        ))}
                      </>
                    )}
                  </div>
                )}
              </div>
              {/* Divider */}
              <span className="w-px h-4 bg-white/[0.08] mx-0.5" />
              {/* Theme toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-7 h-7 flex items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.08] transition"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Settings */}
            <LocaleLink href="/settings" className="p-2 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04] transition" title="Settings">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
              </svg>
            </LocaleLink>

            {/* Mobile hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.04]">
              {mobileOpen ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /></svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Keyboard shortcut hint */}
        <div className="hidden lg:block absolute right-6 top-full -mt-[3px]">
          <span className="text-[10px] text-zinc-600">⌘K search</span>
        </div>
      </header>

      {/* Mobile slide-over menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-astra-bg border-l border-white/[0.04] overflow-y-auto">
            <div className="p-4 pt-20 space-y-4">
              {/* Accessibility controls (mobile) */}
              <div className="flex items-center justify-between glass-card rounded-xl px-4 py-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400 font-medium">Text</span>
                  <div className="flex items-center gap-1">
                    <button onClick={cycleFontDown} disabled={fontSize === 'small'} className="w-8 h-8 rounded-lg bg-white/[0.04] text-xs font-bold text-zinc-300 disabled:opacity-30 transition" aria-label="Decrease font">A−</button>
                    <span className="text-[10px] font-semibold text-violet-400 w-6 text-center">{FONT_LABELS[fontSize]}</span>
                    <button onClick={cycleFontUp} disabled={fontSize === 'xl'} className="w-8 h-8 rounded-lg bg-white/[0.04] text-sm font-bold text-zinc-300 disabled:opacity-30 transition" aria-label="Increase font">A+</button>
                  </div>
                </div>
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value as Language)}
                  className="h-8 rounded-lg bg-white/[0.04] border-none text-[11px] font-bold text-zinc-300 px-1.5 cursor-pointer transition focus:outline-none focus:ring-1 focus:ring-violet-500/30"
                  aria-label="Select language"
                >
                  {primaryLangs.map(l => (
                    <option key={l.code} value={l.code} className="bg-zinc-900 text-zinc-200">
                      {l.short} {l.label}
                    </option>
                  ))}
                  {moreLangs.length > 0 && (
                    <optgroup label="More" className="bg-zinc-900 text-zinc-400">
                      {moreLangs.map(l => (
                        <option key={l.code} value={l.code} className="bg-zinc-900 text-zinc-200">
                          {l.short} {l.label}
                        </option>
                      ))}
                    </optgroup>
                  )}
                </select>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-zinc-300 transition"
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {theme === 'dark' ? '☀️' : '🌙'}
                </button>
              </div>

              {NAV_GROUPS.map(group => (
                <div key={t(group.labelKey)}>
                  <div className="section-title mb-2 px-2">{t(group.labelKey)}</div>
                  {group.items.map(item => (
                    <LocaleLink
                      key={item.href}
                      href={item.href}
                      className={`block px-3.5 py-3 rounded-lg text-base transition ${
                        cleanPathname === item.href ? 'bg-white/[0.06] text-white font-medium' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {t(item.labelKey)}
                    </LocaleLink>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <ProfileModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
