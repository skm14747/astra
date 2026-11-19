'use client';

import { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { generateFullReport, type FullReport } from '@/lib/vedic/report';
import { RASHI_NAMES } from '@/lib/vedic/constants';
import type { Planet, GrahaPlanet, Lang } from '@/lib/vedic/types';
import { useT, type TranslationKey } from '@/lib/i18n';
import { useSettings } from '@/lib/settings/context';
import { PLANET_GLYPH, RASHI_GLYPH } from '@/lib/vedic/glyphs';
import {
  planetNameHi, planetNameNe, planetNamePt, planetNameEs,
  SIGN_NAME_HI, SIGN_NAME_NE, SIGN_NAME_PT, SIGN_NAME_ES,
} from '@/lib/vedic/interpretations';

type TFn = (key: TranslationKey, params?: Record<string, string | number>) => string;
import SouthIndianChart from '@/components/vedic/SouthIndianChart';

const GRAHAS: GrahaPlanet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

/* ── Section IDs (static, language-independent) ── */
const SECTION_IDS = [
  'birth-details', 'birth-chart', 'planetary-positions', 'ascendant', 'moon-sign',
  'planet-analysis', 'house-analysis', 'shadbala', 'ashtakavarga', 'yogas', 'doshas',
  'career', 'wealth', 'marriage', 'health', 'spiritual',
  'dasha', 'jaimini', 'nadi', 'sade-sati', 'varshaphal', 'remedies',
];

const SECTION_TITLE_KEYS: TranslationKey[] = [
  'rpt.s1', 'rpt.s2', 'rpt.s3', 'rpt.s4', 'rpt.s5', 'rpt.s6', 'rpt.s7',
  'rpt.s8', 'rpt.s9', 'rpt.s10', 'rpt.s11', 'rpt.s12', 'rpt.s13', 'rpt.s14',
  'rpt.s15', 'rpt.s16', 'rpt.s17', 'rpt.s18', 'rpt.s19', 'rpt.s20', 'rpt.s21', 'rpt.s22',
];

/* ── Part Groupings (indices into SECTION_IDS) ── */
const PARTS = [
  { num: 'I', titleKey: 'print.vedicProfile' as TranslationKey, sections: [0, 1, 2] },
  { num: 'II', titleKey: 'print.personalityNature' as TranslationKey, sections: [3, 4, 5, 6, 7, 8, 9, 10] },
  { num: 'III', titleKey: 'print.lifeAreas' as TranslationKey, sections: [11, 12, 13, 14, 15] },
  { num: 'IV', titleKey: 'print.timelineRemedies' as TranslationKey, sections: [16, 17, 18, 19, 20, 21] },
];

function getTOC(t: TFn) {
  return SECTION_IDS.map((id, i) => ({ id, label: t(SECTION_TITLE_KEYS[i]) }));
}

function Section({ id, title, children, forceOpen }: { id: string; title: string; children: React.ReactNode; forceOpen?: boolean }) {
  const [open, setOpen] = useState(true);
  const isOpen = forceOpen || open;
  return (
    <section id={id} className="scroll-mt-24" data-print-avoid-break>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-3 text-left group">
        <h2 className="font-display text-xl font-bold text-white group-hover:text-violet-300 transition">{title}</h2>
        <span className={`text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} data-print-hide>▾</span>
      </button>
      {isOpen && <div className="pb-8 space-y-4">{children}</div>}
    </section>
  );
}

function Card({ children, className = '', ...rest }: { children: React.ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`glass-card rounded-xl p-5 ${className}`} {...rest}>{children}</div>;
}

function DataRow({ label, value }: { label: string; value: string | React.ReactNode }) {
  return (
    <div className="flex justify-between items-start gap-4 py-1.5 border-b border-white/[0.03] last:border-0">
      <span className="text-zinc-400 text-sm shrink-0">{label}</span>
      <span className="text-zinc-100 text-sm text-right">{value}</span>
    </div>
  );
}

function Prose({ text }: { text: string }) {
  if (!text) return null;
  return <p className="text-sm text-zinc-300 leading-relaxed">{text}</p>;
}

function DignityBadge({ dignity }: { dignity: string }) {
  const colors: Record<string, string> = {
    exalted: 'bg-emerald-500/20 text-emerald-300',
    own: 'bg-blue-500/20 text-blue-300',
    moolatrikona: 'bg-cyan-500/20 text-cyan-300',
    friendly: 'bg-sky-500/20 text-sky-300',
    neutral: 'bg-zinc-500/20 text-zinc-300',
    enemy: 'bg-orange-500/20 text-orange-300',
    debilitated: 'bg-red-500/20 text-red-300',
  };
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[dignity] || colors.neutral}`}>{dignity}</span>;
}

function BarChart({ value, max, color = 'violet' }: { value: number; max: number; color?: string }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="w-full bg-white/[0.04] rounded-full h-2">
      <div className={`h-2 rounded-full bg-${color}-500/60`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function ReportPage() {
  const { chart } = useProfileChart();
  const t = useT();
  const { language } = useSettings();
  const lang = (['hi', 'ne', 'pt', 'es'].includes(language) ? language : 'en') as Lang;

  const localizePlanet = useCallback((p: string): string => {
    if (language === 'hi') return planetNameHi(p);
    if (language === 'ne') return planetNameNe(p);
    if (language === 'pt') return planetNamePt(p);
    if (language === 'es') return planetNameEs(p);
    return p;
  }, [language]);

  const localizeSign = useCallback((s: string): string => {
    if (language === 'hi') return SIGN_NAME_HI[s] || s;
    if (language === 'ne') return SIGN_NAME_NE[s] || s;
    if (language === 'pt') return SIGN_NAME_PT[s] || s;
    if (language === 'es') return SIGN_NAME_ES[s] || s;
    return s;
  }, [language]);
  const TOC = useMemo(() => getTOC(t), [t]);
  const [report, setReport] = useState<FullReport | null>(null);
  const [generating, setGenerating] = useState(false);
  const [reportLang, setReportLang] = useState<Lang>('en');
  const [activeSection, setActiveSection] = useState('');
  const [forceAllOpen, setForceAllOpen] = useState(false);
  const [showPrintOverlay, setShowPrintOverlay] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Auto-expand all sections before print, collapse back after
  useEffect(() => {
    const onBeforePrint = () => setForceAllOpen(true);
    const onAfterPrint = () => { setForceAllOpen(false); setShowPrintOverlay(false); };
    window.addEventListener('beforeprint', onBeforePrint);
    window.addEventListener('afterprint', onAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', onBeforePrint);
      window.removeEventListener('afterprint', onAfterPrint);
    };
  }, []);

  const handleDownload = useCallback(() => {
    setShowPrintOverlay(true);
    setForceAllOpen(true);
    setTimeout(() => window.print(), 250);
  }, []);

  const generate = useCallback(() => {
    if (!chart) return;
    setGenerating(true);
    requestAnimationFrame(() => {
      const r = generateFullReport(chart, lang);
      setReport(r);
      setReportLang(lang);
      setGenerating(false);
    });
  }, [chart, lang]);

  // Re-generate report when language changes (if report already exists)
  useEffect(() => {
    if (report && chart && reportLang !== lang) {
      requestAnimationFrame(() => {
        const r = generateFullReport(chart, lang);
        setReport(r);
        setReportLang(lang);
      });
    }
  }, [lang, chart, report, reportLang]);

  // Scroll-spy for ToC
  useEffect(() => {
    if (!report) return;
    observerRef.current = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );
    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [report]);

  if (!chart) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
        <EmptyState icon="📋" title={t('report.title')} description={t('report.emptyDesc')} />
        <SeoIntro headingKey="seo.report.heading" textKey="seo.report.text" />
        {VEDIC_SEO.report?.relatedTools && <RelatedTools tools={VEDIC_SEO.report.relatedTools} />}
      </div>
    );
  }

  if (!report) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8 text-center">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">{t('report.title')}</h1>
        <p className="text-zinc-400 mb-8 max-w-xl mx-auto">{t('report.subtitle')}</p>
        <button
          onClick={generate}
          disabled={generating}
          className="px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-lg transition disabled:opacity-50"
        >
          {generating ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {t('export.generatingReport')}
            </span>
          ) : t('export.generateReport')}
        </button>
        <SeoIntro headingKey="seo.report.heading" textKey="seo.report.text" />
      </div>
    );
  }

  const r = report;
  const bd = r.chart.birthData;
  const fmtDate = (d: Date) => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const fmtTime = (d: Date) => d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <div className="flex max-w-7xl mx-auto px-4 sm:px-6 py-8 gap-8">
      {/* ── Sticky ToC Sidebar ── */}
      <aside className="hidden xl:block w-56 shrink-0" data-print-hide>
        <nav className="sticky top-24 space-y-0.5 max-h-[calc(100vh-8rem)] overflow-y-auto" aria-label="Report sections">
          <button onClick={handleDownload} className="w-full mb-3 px-3 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition flex items-center justify-center gap-2">
            📄 {t('export.downloadPdf')}
          </button>
          {TOC.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`block px-3 py-1.5 rounded-lg text-xs transition-colors ${activeSection === id ? 'bg-violet-500/10 text-violet-300 font-medium' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              {label}
            </a>
          ))}
        </nav>
      </aside>

      {/* ── Main Report ── */}
      <article className="flex-1 min-w-0 space-y-2 divide-y divide-white/[0.04]">

        {/* ── Print-Only: Cover, TOC, Dashboard ── */}
        <PrintCover report={r} fmtDate={fmtDate} fmtTime={fmtTime} t={t} localizeSign={localizeSign} />
        <PrintTOC t={t} toc={TOC} />
        <PrintDashboard report={r} t={t} localizeSign={localizeSign} localizePlanet={localizePlanet} />

        {/* Screen Cover (hidden in print) */}
        <div className="text-center pb-8" data-print-hide>
          {/* Print-only decorative border */}
          <div className="hidden mx-auto w-24 h-0.5 bg-violet-600 mb-6" data-print-show />
          <p className="text-violet-400 text-sm tracking-widest mb-2">{t('report.coverLabel')}</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">{r.profileName}&apos;s Report</h1>
          <div className="hidden mx-auto w-16 h-px bg-zinc-400 my-4" data-print-show />
          <p className="text-zinc-400">{fmtDate(bd.date)} · {fmtTime(bd.date)}</p>
          <p className="text-zinc-500 text-sm mt-1">{bd.observer.latitude.toFixed(2)}°N, {bd.observer.longitude.toFixed(2)}°E</p>
          <div className="hidden mt-8 space-y-1" data-print-show>
            <p className="text-zinc-500 text-xs">{t('print.ascendant')}: {localizeSign(r.chart.ascendant.rashiName)} · {t('print.moon')}: {localizeSign(r.chart.planets.Moon.rashiName)} · {t('print.sun')}: {localizeSign(r.chart.planets.Sun.rashiName)}</p>
            <p className="text-zinc-500 text-xs">{t('kundli.ayanamsa')}: {r.chart.ayanamsaSystem} ({r.chart.ayanamsa.toFixed(4)}°)</p>
          </div>
          <p className="text-zinc-600 text-xs mt-6">Generated by Astra · astradestiny.com · {fmtDate(r.generatedAt)}</p>
          <div className="hidden mx-auto w-24 h-0.5 bg-violet-600 mt-6" data-print-show />
          {/* Mobile PDF button — prominent CTA */}
          <button onClick={handleDownload} className="mt-6 xl:hidden px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-base transition shadow-lg" data-print-hide>
            📄 {t('export.downloadPdf')}
          </button>
        </div>

        {/* Part I Divider */}
        <PrintPartDivider num="I" title={t('print.vedicProfile')} t={t} />

        {/* 1. Birth Details */}
        <Section forceOpen={forceAllOpen} id="birth-details" title={t('rpt.s1')}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-zinc-300 mb-3">{t('rpt.personalDetails')}</h3>
              <DataRow label={t('rpt.name')} value={r.profileName} />
              <DataRow label={t('rpt.dob')} value={fmtDate(bd.date)} />
              <DataRow label={t('rpt.tob')} value={fmtTime(bd.date)} />
              <DataRow label={t('rpt.coordinates')} value={`${bd.observer.latitude.toFixed(4)}°N, ${bd.observer.longitude.toFixed(4)}°E`} />
              <DataRow label={t('rpt.ayanamsa')} value={`${r.chart.ayanamsaSystem} (${r.chart.ayanamsa.toFixed(4)}°)`} />
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-zinc-300 mb-3">{t('rpt.birthPanchang')}</h3>
              {r.panchang ? (
                <>
                  <DataRow label={t('rpt.tithi')} value={r.panchang.tithi} />
                  <DataRow label={t('rpt.nakshatra')} value={r.panchang.nakshatra} />
                  <DataRow label={t('rpt.yoga')} value={r.panchang.yoga} />
                  <DataRow label={t('rpt.karana')} value={r.panchang.karana} />
                  <DataRow label={t('rpt.vara')} value={r.panchang.vara} />
                </>
              ) : <p className="text-zinc-500 text-sm">{t('rpt.panchangUnavail')}</p>}
            </Card>
          </div>
        </Section>

        {/* 2. Birth Chart */}
        <Section forceOpen={forceAllOpen} id="birth-chart" title={t('rpt.s2')}>
          {/* Inline Kundli Chart */}
          <div className="flex justify-center mb-4" data-print-chart>
            <div className="glass-card rounded-2xl p-6">
              <SouthIndianChart houses={r.chart.houses} ascendantRashi={r.chart.ascendant.rashi} title="D1 Rashi" />
            </div>
          </div>
          <Card>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-xs text-zinc-500">{t('print.ascendant')}</p>
                <p className="text-lg font-semibold text-white">{localizeSign(r.chart.ascendant.rashiName)}</p>
                <p className="text-xs text-zinc-400">{r.chart.ascendant.degree}° {r.chart.ascendant.nakshatraName}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-zinc-500">{t('print.moonSign')}</p>
                <p className="text-lg font-semibold text-white">{localizeSign(r.chart.planets.Moon.rashiName)}</p>
                <p className="text-xs text-zinc-400">{r.chart.planets.Moon.nakshatraName} {t('panchang.pada')} {r.chart.planets.Moon.pada}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-zinc-500">{t('print.sunSign')}</p>
                <p className="text-lg font-semibold text-white">{localizeSign(r.chart.planets.Sun.rashiName)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-zinc-500">{t('rpt.vargottama')}</p>
                <p className="text-lg font-semibold text-white">{r.vargottamaPlanets.length > 0 ? r.vargottamaPlanets.map(localizePlanet).join(', ') : t('rpt.none')}</p>
              </div>
            </div>
          </Card>
        </Section>

        {/* 3. Planetary Positions */}
        <Section forceOpen={forceAllOpen} id="planetary-positions" title={t('rpt.s3')}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Planetary positions">
              <thead>
                <tr className="text-left text-zinc-500 text-xs uppercase border-b border-white/[0.06]">
                  <th className="pb-2 pr-4">{t('rpt.th.planet')}</th><th className="pb-2 pr-4">{t('rpt.th.sign')}</th><th className="pb-2 pr-4">{t('rpt.th.degree')}</th>
                  <th className="pb-2 pr-4">{t('rpt.th.house')}</th><th className="pb-2 pr-4">{t('rpt.th.nakshatra')}</th><th className="pb-2 pr-4">{t('rpt.th.dignity')}</th><th className="pb-2">{t('rpt.th.status')}</th>
                </tr>
              </thead>
              <tbody>
                {r.planetEntries.map(pe => (
                  <tr key={pe.planet} className="border-b border-white/[0.03]">
                    <td className="py-2 pr-4 font-medium text-zinc-100">{localizePlanet(pe.planet)}</td>
                    <td className="py-2 pr-4 text-zinc-300">{localizeSign(pe.sign)}</td>
                    <td className="py-2 pr-4 text-zinc-400 font-mono tabular-nums text-xs">{pe.degree}</td>
                    <td className="py-2 pr-4 text-zinc-400">{pe.house}</td>
                    <td className="py-2 pr-4 text-zinc-400">{pe.nakshatra} {t('panchang.pada')} {pe.pada}</td>
                    <td className="py-2 pr-4"><DignityBadge dignity={pe.dignity} /></td>
                    <td className="py-2 text-zinc-400">
                      {pe.isRetrograde && <span className="text-amber-400 text-xs mr-1">℞</span>}
                      {pe.isCombust && <span className="text-red-400 text-xs">☀️</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Part II Divider */}
        <PrintPartDivider num="II" title={t('print.personalityNature')} t={t} />

        {/* 4. Ascendant Reading */}
        <Section forceOpen={forceAllOpen} id="ascendant" title={t('rpt.s4')}>
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{getSignEmoji(r.ascendantReading.sign)}</span>
              <div>
                <h3 className="text-lg font-semibold text-white">{localizeSign(r.ascendantReading.sign)} {t('rpt.rising')}</h3>
                <p className="text-xs text-zinc-400">{t('rpt.lord')}: {localizePlanet(r.ascendantReading.lord)} ({t('rpt.house')} {r.ascendantReading.lordHouse})</p>
              </div>
            </div>
            <Prose text={r.ascendantReading.text} />
          </Card>
        </Section>

        {/* 5. Moon Sign & Nakshatra */}
        <Section forceOpen={forceAllOpen} id="moon-sign" title={t('rpt.s5')}>
          <Card>
            <Prose text={r.moonSignReading.text} />
          </Card>
          {r.nakshatraProfile && (
            <Card className="mt-4">
              <h3 className="text-lg font-semibold text-white mb-1">{r.nakshatraProfile.name}</h3>
              <p className="text-xs text-zinc-500 mb-3">{r.nakshatraProfile.deity} · {r.nakshatraProfile.symbol} · {r.nakshatraProfile.motivation}</p>
              <Prose text={r.nakshatraProfile.personality} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div><p className="text-xs text-zinc-500 mb-1">{t('rpt.strengths')}</p><p className="text-sm text-zinc-300">{r.nakshatraProfile.strengths}</p></div>
                <div><p className="text-xs text-zinc-500 mb-1">{t('rpt.challenges')}</p><p className="text-sm text-zinc-300">{r.nakshatraProfile.challenges}</p></div>
                <div><p className="text-xs text-zinc-500 mb-1">{t('rpt.careerFit')}</p><p className="text-sm text-zinc-300">{r.nakshatraProfile.career}</p></div>
              </div>
            </Card>
          )}
        </Section>

        {/* 6. Planet-by-Planet */}
        <Section forceOpen={forceAllOpen} id="planet-analysis" title={t('rpt.s6')}>
          <div data-print-2col>
          {r.planetEntries.map(pe => (
              <Card key={pe.planet} className="mb-4" data-print-avoid-break>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">{PLANET_GLYPH[pe.planet]} {localizePlanet(pe.planet)} — {localizeSign(pe.sign)} ({t('rpt.house')} {pe.house})</h3>
                <div className="flex items-center gap-2">
                  <DignityBadge dignity={pe.dignity} />
                  {pe.isRetrograde && <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">{t('rpt.retrograde')}</span>}
                </div>
              </div>
              <p className="text-xs text-zinc-500 mb-3">{pe.nakshatra} · {t('panchang.pada')} {pe.pada} · {pe.dignityText.label}</p>
              <Prose text={pe.signText.nature} />
              <div className="mt-3 space-y-2">
                <div><span className="text-xs font-semibold text-emerald-400">{t('rpt.strengths')}: </span><span className="text-sm text-zinc-300">{pe.signText.positive}</span></div>
                <div><span className="text-xs font-semibold text-orange-400">{t('rpt.challenges')}: </span><span className="text-sm text-zinc-300">{pe.signText.challenges}</span></div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/[0.04]">
                <p className="text-xs text-zinc-500 mb-1">{t('rpt.house')} {pe.house}: {pe.houseText.area}</p>
                <Prose text={pe.houseText.whenStrong} />
              </div>
              {pe.conjunctions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/[0.04]">
                  <p className="text-xs text-zinc-500 mb-1">{t('rpt.conjunctions')}</p>
                  {pe.conjunctions.map(c => (
                    <p key={c.planet} className="text-sm text-zinc-400 mb-1">{t('rpt.with')} {localizePlanet(c.planet)}: {c.text}</p>
                  ))}
                </div>
              )}
              {pe.retroText && <p className="mt-2 text-sm text-amber-300/80 italic">{pe.retroText}</p>}
            </Card>
          ))}
          </div>
        </Section>

        {/* 7. House-by-House */}
        <Section forceOpen={forceAllOpen} id="house-analysis" title={t('rpt.s7')}>
          <div data-print-2col>
          {r.houseEntries.map(he => (
              <Card key={he.house} className="mb-3" data-print-avoid-break>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-zinc-100">{t('rpt.house')} {he.house} — {localizeSign(he.sign)}</h3>
                <span className="text-xs text-zinc-500">{t('rpt.lord')}: {localizePlanet(he.lord)} ({t('rpt.house')} {he.lordHouse})</span>
              </div>
              <p className="text-xs text-violet-400/70 mb-2">{he.area}</p>
              <Prose text={he.interpretation} />
              {he.planets.length > 0 && (
                <p className="mt-2 text-xs text-zinc-400">{t('rpt.occupants')}: {he.planets.map(localizePlanet).join(', ')}</p>
              )}
            </Card>
          ))}
          </div>
        </Section>

        {/* 8. Shadbala */}
        <Section forceOpen={forceAllOpen} id="shadbala" title={t('rpt.s8')}>
          <Card>
            <table className="w-full" aria-label="Shadbala planetary strength">
              <thead>
                <tr className="text-left text-zinc-500 text-xs uppercase border-b border-white/[0.06]">
                  <th className="pb-2 pr-4">{t('rpt.th.planet')}</th>
                  <th className="pb-2 pr-4">{t('rpt.th.strength')}</th>
                  <th className="pb-2 pr-4">{t('rpt.th.required')}</th>
                  <th className="pb-2 pr-4">{t('rpt.th.ratio')}</th>
                  <th className="pb-2">{t('rpt.th.bar')}</th>
                </tr>
              </thead>
              <tbody>
                {GRAHAS.map(p => {
                  const sb = r.shadbala.planets[p];
                  if (!sb) return null;
                  const pct = (sb.ratio * 100).toFixed(0);
                  const isStrong = sb.ratio >= 1;
                  const barColor = isStrong ? '#059669' : '#c2410c';
                  return (
                    <tr key={p} className="border-b border-white/[0.03]">
                      <td className="py-2 pr-4 font-medium text-zinc-200">{PLANET_GLYPH[p]} {localizePlanet(p)}</td>
                      <td className="py-2 pr-4 text-zinc-300 font-mono tabular-nums text-xs">{sb.total.toFixed(1)}</td>
                      <td className="py-2 pr-4 text-zinc-400 font-mono tabular-nums text-xs">{sb.required}</td>
                      <td className={`py-2 pr-4 font-mono tabular-nums text-xs font-semibold ${isStrong ? 'text-emerald-400' : 'text-orange-400'}`}>{pct}%</td>
                      <td className="py-2 w-24">
                        <div className="w-full rounded-full h-2" style={{ background: 'rgba(255,255,255,0.04)' }}>
                          <div className="h-2 rounded-full" style={{ width: `${Math.min(100, Number(pct))}%`, background: barColor }} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </Section>

        {/* 9. Ashtakavarga */}
        <Section forceOpen={forceAllOpen} id="ashtakavarga" title={t('rpt.s9')}>
          <Card>
            <table className="w-full text-center" data-print-avoid-break aria-label="Ashtakavarga SAV scores">
              <thead>
                <tr>
                  {r.ashtakavarga.sav.map((_, i) => (
                    <th key={i} className="text-xs text-zinc-500 pb-1 font-normal">{localizeSign(RASHI_NAMES[i])?.slice(0, 3)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {r.ashtakavarga.sav.map((score, i) => {
                    const color = score >= 28 ? '#059669' : score < 25 ? '#dc2626' : '#71717a';
                    const bg = score >= 28 ? '#d1fae5' : score < 25 ? '#fee2e2' : 'transparent';
                    return (
                      <td key={i} className="font-mono tabular-nums font-bold text-lg py-1" style={{ color, background: bg }}>
                        {score}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-zinc-500 mt-3">{t('rpt.savHint')}</p>
          </Card>
        </Section>

        {/* 10. Yogas */}
        <Section forceOpen={forceAllOpen} id="yogas" title={t('rpt.s10')}>
          {r.yogas.length === 0 ? <p className="text-zinc-500 text-sm">{t('rpt.noYogas')}</p> : (
            <div className="space-y-3">
              {r.yogas.map((y, i) => (
                <Card key={i} className="!p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-zinc-100">{y.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${y.type === 'benefic' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>{y.type} · {y.strength}</span>
                  </div>
                  <Prose text={y.description} />
                  <p className="text-xs text-zinc-500 mt-1">{t('rpt.planets')}: {y.planets.map(localizePlanet).join(', ')} · {t('rpt.houses')}: {y.houses.join(', ')}</p>
                </Card>
              ))}
            </div>
          )}
        </Section>

        {/* 11. Doshas */}
        <Section forceOpen={forceAllOpen} id="doshas" title={t('rpt.s11')}>
          {r.doshas.filter(d => d.isActive).length === 0 ? <p className="text-zinc-400 text-sm">{t('rpt.noDoshas')}</p> : (
            <div className="space-y-3">
              {r.doshas.filter(d => d.isActive).map((d, i) => (
                <Card key={i} className="!p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-zinc-100">{d.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${d.severity === 'severe' ? 'bg-red-500/20 text-red-300' : d.severity === 'moderate' ? 'bg-orange-500/20 text-orange-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{d.severity}</span>
                  </div>
                  <Prose text={d.description} />
                  {d.cancellation && <p className="text-xs text-emerald-400 mt-1">{t('rpt.cancellation')}: {d.cancellation}</p>}
                </Card>
              ))}
            </div>
          )}
        </Section>

        {/* Part III Divider */}
        <PrintPartDivider num="III" title={t('print.lifeAreas')} t={t} />

        {/* 12. Career */}
        <Section forceOpen={forceAllOpen} id="career" title={t('rpt.s12')}>
          <Card>
            <Prose text={r.career.summary} />
            <div className="mt-4"><Prose text={r.career.tenthHouseAnalysis} /></div>
            <div className="mt-4">
              <p className="text-xs text-zinc-500 mb-2">{t('rpt.suitableFields')}</p>
              <div className="flex flex-wrap gap-2">
                {r.career.suitableFields.map(f => (
                  <span key={f} className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 text-xs">{f}</span>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/[0.04] space-y-2">
              <Prose text={r.career.jobVsBusiness} />
              <Prose text={r.career.foreignWork} />
              <Prose text={r.career.timingHint} />
            </div>
          </Card>
        </Section>

        {/* 13. Wealth */}
        <Section forceOpen={forceAllOpen} id="wealth" title={t('rpt.s13')}>
          <Card>
            <Prose text={r.wealth.summary} />
            <div className="mt-3 space-y-2">
              <Prose text={r.wealth.wealthSources} />
              <Prose text={r.wealth.wealthTiming} />
              <Prose text={r.wealth.propertyIndication} />
            </div>
            {r.wealthRaw.dhanaYogas.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/[0.04]">
                <p className="text-xs text-zinc-500 mb-2">{t('rpt.dhanaYogas')}</p>
                {r.wealthRaw.dhanaYogas.map((dy, i) => (
                  <p key={i} className="text-sm text-emerald-300">✦ {dy}</p>
                ))}
              </div>
            )}
          </Card>
        </Section>

        {/* 14. Marriage */}
        <Section forceOpen={forceAllOpen} id="marriage" title={t('rpt.s14')}>
          <Card>
            <Prose text={r.marriage.summary} />
            <div className="mt-3 space-y-2">
              <Prose text={r.marriage.spouseNature} />
              <Prose text={r.marriage.marriageTiming} />
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                <p className="text-xs text-emerald-400 mb-1">{t('rpt.marriageStr')}</p>
                <p className="text-sm text-zinc-300">{r.marriage.strengths}</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
                <p className="text-xs text-orange-400 mb-1">{t('rpt.marriageChal')}</p>
                <p className="text-sm text-zinc-300">{r.marriage.challenges}</p>
              </div>
            </div>
          </Card>
        </Section>

        {/* 15. Health */}
        <Section forceOpen={forceAllOpen} id="health" title={t('rpt.s15')}>
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${r.healthRaw.ayushTier === 'Deerghayu' ? 'bg-emerald-500/20 text-emerald-300' : r.healthRaw.ayushTier === 'Madhyayu' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'}`}>
                {r.healthRaw.ayushTier}
              </span>
              <span className="text-zinc-400 text-sm">{t('rpt.longevityClass')}</span>
            </div>
            <Prose text={r.health.summary} />
            <div className="mt-3 space-y-2">
              <Prose text={r.health.vulnerableAreas} />
              <Prose text={r.health.healthPeriods} />
              <Prose text={r.health.preventiveMeasures} />
            </div>
          </Card>
        </Section>

        {/* 16. Spiritual */}
        <Section forceOpen={forceAllOpen} id="spiritual" title={t('rpt.s16')}>
          <Card>
            <Prose text={r.spiritual.summary} />
            <div className="mt-3 space-y-2">
              <Prose text={r.spiritual.spiritualStrengths} />
              <Prose text={r.spiritual.meditationStyle} />
              <Prose text={r.spiritual.karmaTheme} />
            </div>
          </Card>
        </Section>

        {/* Part IV Divider */}
        <PrintPartDivider num="IV" title={t('print.timelineRemedies')} t={t} />

        {/* 17. Dasha */}
        <Section forceOpen={forceAllOpen} id="dasha" title={t('rpt.s17')}>
          <div className="space-y-4">
            {r.vimshottariDasha.map((d, i) => (
              <Card key={i} className={`!p-4 ${d.isActive ? 'ring-1 ring-violet-500/30' : ''}`} data-print-avoid-break>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-zinc-100">
                    {PLANET_GLYPH[d.period.lord]} {localizePlanet(d.period.lord)} {t('print.mahadasha')}
                    {d.isActive && <span className="ml-2 text-xs bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full">{t('rpt.current')}</span>}
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono tabular-nums">
                    {fmtDate(d.period.startDate)} → {fmtDate(d.period.endDate)}
                  </span>
                </div>
                {d.narrative && (
                  <>
                    <p className="text-xs text-violet-400 mb-2">{d.narrative.theme}</p>
                    <Prose text={d.narrative.generalEffects} />
                    {d.isActive && (
                      <div className="mt-3 space-y-2">
                        <div><span className="text-xs font-semibold text-emerald-400">{t('rpt.career')}: </span><span className="text-sm text-zinc-300">{d.narrative.career}</span></div>
                        <div><span className="text-xs font-semibold text-pink-400">{t('rpt.relationships')}: </span><span className="text-sm text-zinc-300">{d.narrative.relationships}</span></div>
                        <div><span className="text-xs font-semibold text-cyan-400">{t('rpt.health')}: </span><span className="text-sm text-zinc-300">{d.narrative.health}</span></div>
                        <div><span className="text-xs font-semibold text-violet-400">{t('rpt.spirituality')}: </span><span className="text-sm text-zinc-300">{d.narrative.spirituality}</span></div>
                      </div>
                    )}
                  </>
                )}
              </Card>
            ))}
          </div>
        </Section>

        {/* 18. Jaimini */}
        <Section forceOpen={forceAllOpen} id="jaimini" title={t('rpt.s18')}>
          <Card>
            <h3 className="font-semibold text-zinc-200 mb-3">{t('rpt.charaKarakas')}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {r.jaiminiKarakas.map(ck => (
                <div key={ck.type} className="text-center">
                  <p className="text-xs text-zinc-500">{ck.fullName}</p>
                  <p className="text-sm font-semibold text-white">{localizePlanet(ck.planet)}</p>
                  <p className="text-xs text-zinc-400">{ck.degreeInSign.toFixed(1)}°</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="mt-4">
            <DataRow label={t('rpt.karakamsha')} value={localizeSign(RASHI_NAMES[r.karakamsha.rashi])} />
            <DataRow label={t('rpt.amatyaCareer')} value={`${localizePlanet(r.amatyakarakaCareer.planet)}: ${r.amatyakarakaCareer.career}`} />
            <DataRow label={t('rpt.brahma')} value={localizePlanet(r.brahmaMaheshwara.brahma)} />
            <DataRow label={t('rpt.maheshwara')} value={localizePlanet(r.brahmaMaheshwara.maheshwara)} />
            <DataRow label={t('rpt.rudra')} value={localizePlanet(r.brahmaMaheshwara.rudra)} />
          </Card>
        </Section>

        {/* 19. Nadi */}
        <Section forceOpen={forceAllOpen} id="nadi" title={t('rpt.s19')}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {r.nadiPoints.map((np, i) => (
              <Card key={i}>
                <h3 className="font-semibold text-zinc-200">{np.name}</h3>
                <p className="text-sm text-violet-400">{localizeSign(np.rashiName)} {(np.longitude % 30).toFixed(1)}°</p>
                <p className="text-xs text-zinc-400 mt-1">{np.description}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* 20. Sade Sati */}
        <Section forceOpen={forceAllOpen} id="sade-sati" title={t('rpt.s20')}>
          <Card>
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${r.sadeSati.isActive ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                {r.sadeSati.isActive ? t('rpt.activePhase', { phase: r.sadeSati.phase || '' }) : t('rpt.notActiveSadeSati')}
              </span>
            </div>
            <Prose text={r.sadeSati.description} />
          </Card>
        </Section>

        {/* 21. This Year */}
        <Section forceOpen={forceAllOpen} id="varshaphal" title={t('rpt.s21')}>
          {r.varshaphal ? (
            <Card>
              <DataRow label={t('rpt.year')} value={String(r.varshaphal.year)} />
              <DataRow label={t('rpt.varshaLagna')} value={localizeSign(RASHI_NAMES[r.varshaphal.varshaLagna])} />
              <DataRow label={t('rpt.muntha')} value={`${localizeSign(RASHI_NAMES[r.varshaphal.muntha])} (${t('rpt.lord')}: ${localizePlanet(r.varshaphal.munthaLord)})`} />
              <DataRow label={t('rpt.yearLord')} value={localizePlanet(r.varshaphal.yearLord)} />
            </Card>
          ) : <p className="text-zinc-500 text-sm">{t('rpt.varshaphalUnavail')}</p>}
        </Section>

        {/* 22. Remedies */}
        <Section forceOpen={forceAllOpen} id="remedies" title={t('rpt.s22')}>
          <div className="space-y-3">
            {r.remedies.map((rem, i) => (
              <Card key={i} className="!p-4" data-print-avoid-break>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-zinc-200">{localizePlanet(rem.planet)} — {rem.recommendation}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${rem.priority === 'high' ? 'bg-red-500/20 text-red-300' : rem.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-zinc-500/20 text-zinc-300'}`}>{rem.priority}</span>
                </div>
                <p className="text-sm text-zinc-400">{rem.details}</p>
                <p className="text-xs text-zinc-500 mt-1 capitalize">{rem.type}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* Footer */}
        <div className="pt-8 text-center" data-print-pt data-print-footer>
          <div className="hidden mx-auto w-16 h-px bg-violet-600 mb-4" data-print-show />
          <p className="text-zinc-600 text-xs font-medium">{t('rpt.footerBrand')}</p>
          <p className="text-zinc-600 text-xs mt-1">astradestiny.com</p>
          <p className="text-zinc-700 text-xs mt-2">{t('rpt.footerAlgo')}</p>
          <p className="text-zinc-700 text-xs mt-1">{t('rpt.footerGenerated', { date: fmtDate(r.generatedAt) })}</p>
        </div>
      </article>

      {/* Print preparation overlay */}
      {showPrintOverlay && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex flex-col items-center justify-center" data-print-hide>
          <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4" />
          <p className="text-white text-lg font-semibold">{t('print.preparing')}</p>
          <p className="text-zinc-400 text-sm mt-2">{t('print.saveTip')}</p>
        </div>
      )}

      {/* Floating Download Button — always visible on all screens */}
      <button
        onClick={handleDownload}
        className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-xl shadow-violet-900/30 transition-colors flex items-center gap-2"
        data-print-hide
        aria-label={t('export.downloadPdf')}
      >
        📄 {t('export.downloadPdf')}
      </button>
    </div>
  );
}

function getSignEmoji(sign: string): string {
  return RASHI_GLYPH[sign] || '✦';
}

/* ══════════════════════════════════════════════════════════
   PRINT-ONLY COMPONENTS (hidden on screen, shown in print)
   ══════════════════════════════════════════════════════════ */

function PrintCover({ report, fmtDate, fmtTime, t, localizeSign }: { report: FullReport; fmtDate: (d: Date) => string; fmtTime: (d: Date) => string; t: TFn; localizeSign: (s: string) => string }) {
  const bd = report.chart.birthData;
  const ascSign = report.chart.ascendant.rashiName;
  const moonSign = report.chart.planets.Moon.rashiName;
  const sunSign = report.chart.planets.Sun.rashiName;
  const nakshatra = report.chart.planets.Moon.nakshatraName;
  return (
    <div className="hidden" data-print-show data-print-cover style={{ textAlign: 'center' }}>
      <div style={{ borderTop: '3px solid #6d28d9', width: '60px', margin: '0 auto 24pt' }} />
      <p style={{ fontSize: '10pt', letterSpacing: '4pt', textTransform: 'uppercase', color: '#6d28d9', marginBottom: '8pt' }}>
        {t('print.brandName')}
      </p>
      <p style={{ fontSize: '8pt', letterSpacing: '2pt', textTransform: 'uppercase', color: '#888', marginBottom: '32pt' }}>
        {t('print.vedicReport')}
      </p>
      <h1 style={{ fontSize: '32pt', fontWeight: 700, color: '#1e1b2e', marginBottom: '6pt', fontFamily: 'Georgia, serif' }}>
        {report.profileName}
      </h1>
      <div style={{ width: '40px', height: '1px', background: '#ccc', margin: '16pt auto' }} />
      <p style={{ fontSize: '11pt', color: '#444' }}>
        {fmtDate(bd.date)} &middot; {fmtTime(bd.date)}
      </p>
      <p style={{ fontSize: '9pt', color: '#666', marginTop: '4pt' }}>
        {bd.observer.latitude.toFixed(2)}°N, {bd.observer.longitude.toFixed(2)}°E
      </p>

      {/* Mini summary grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12pt', maxWidth: '280px', margin: '32pt auto 0' }}>
        <div style={{ textAlign: 'center', padding: '8pt', border: '1px solid #e5e5ea', borderRadius: '4px' }}>
          <p style={{ fontSize: '20pt', marginBottom: '2pt' }}>{RASHI_GLYPH[ascSign] || '✦'}</p>
          <p style={{ fontSize: '8pt', color: '#888', textTransform: 'uppercase', letterSpacing: '1pt' }}>{t('print.ascendant')}</p>
          <p style={{ fontSize: '10pt', fontWeight: 600, color: '#1e1b2e' }}>{localizeSign(ascSign)}</p>
        </div>
        <div style={{ textAlign: 'center', padding: '8pt', border: '1px solid #e5e5ea', borderRadius: '4px' }}>
          <p style={{ fontSize: '20pt', marginBottom: '2pt' }}>{RASHI_GLYPH[moonSign] || '✦'}</p>
          <p style={{ fontSize: '8pt', color: '#888', textTransform: 'uppercase', letterSpacing: '1pt' }}>{t('print.moonSign')}</p>
          <p style={{ fontSize: '10pt', fontWeight: 600, color: '#1e1b2e' }}>{localizeSign(moonSign)}</p>
        </div>
        <div style={{ textAlign: 'center', padding: '8pt', border: '1px solid #e5e5ea', borderRadius: '4px' }}>
          <p style={{ fontSize: '20pt', marginBottom: '2pt' }}>{RASHI_GLYPH[sunSign] || '✦'}</p>
          <p style={{ fontSize: '8pt', color: '#888', textTransform: 'uppercase', letterSpacing: '1pt' }}>{t('print.sunSign')}</p>
          <p style={{ fontSize: '10pt', fontWeight: 600, color: '#1e1b2e' }}>{localizeSign(sunSign)}</p>
        </div>
        <div style={{ textAlign: 'center', padding: '8pt', border: '1px solid #e5e5ea', borderRadius: '4px' }}>
          <p style={{ fontSize: '14pt', marginBottom: '2pt' }}>☽</p>
          <p style={{ fontSize: '8pt', color: '#888', textTransform: 'uppercase', letterSpacing: '1pt' }}>{t('print.nakshatra')}</p>
          <p style={{ fontSize: '10pt', fontWeight: 600, color: '#1e1b2e' }}>{nakshatra}</p>
        </div>
      </div>

      <div style={{ marginTop: '40pt' }}>
        <p style={{ fontSize: '8pt', color: '#999' }}>{t('print.generated')} {fmtDate(report.generatedAt)}</p>
        <p style={{ fontSize: '8pt', color: '#6d28d9', marginTop: '2pt' }}>astradestiny.com</p>
      </div>
      <div style={{ borderBottom: '3px solid #6d28d9', width: '60px', margin: '24pt auto 0' }} />
    </div>
  );
}

function PrintTOC({ t, toc }: { t: TFn; toc: { id: string; label: string }[] }) {
  return (
    <div className="hidden" data-print-show data-print-page-break>
      <h2 style={{ fontSize: '18pt', fontWeight: 700, color: '#1e1b2e', marginBottom: '20pt', fontFamily: 'Georgia, serif', textAlign: 'center' }}>
        {t('print.toc')}
      </h2>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        {PARTS.map(part => (
          <div key={part.num} style={{ marginBottom: '16pt' }}>
            <p style={{ fontSize: '10pt', fontWeight: 700, color: '#6d28d9', textTransform: 'uppercase', letterSpacing: '2pt', marginBottom: '6pt' }}>
              {t('print.part')} {part.num} &mdash; {t(part.titleKey)}
            </p>
            {part.sections.map(si => (
              <p key={si} style={{ fontSize: '10pt', color: '#333', paddingLeft: '12pt', lineHeight: '2' }}>
                {toc[si]?.label}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function PrintDashboard({ report, t, localizeSign, localizePlanet }: { report: FullReport; t: TFn; localizeSign: (s: string) => string; localizePlanet: (p: string) => string }) {
  const asc = report.chart.ascendant.rashiName;
  const moon = report.chart.planets.Moon.rashiName;
  const sun = report.chart.planets.Sun.rashiName;
  const now = new Date();

  // Find strongest planet by shadbala
  let strongestPlanet = 'Jupiter';
  let strongestRatio = 0;
  for (const p of GRAHAS) {
    const sb = report.shadbala.planets[p];
    if (sb && sb.ratio > strongestRatio) { strongestRatio = sb.ratio; strongestPlanet = p; }
  }

  // Current dasha
  const activeDasha = report.vimshottariDasha.find(d => d.isActive);

  // Top yogas
  const topYogas = report.yogas.filter(y => y.type === 'benefic').slice(0, 3);

  const circleStyle: React.CSSProperties = {
    width: '80pt', height: '80pt', borderRadius: '50%', border: '2px solid #6d28d9',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
  };

  return (
    <div className="hidden" data-print-show data-print-page-break>
      <h2 style={{ fontSize: '16pt', fontWeight: 700, color: '#1e1b2e', textAlign: 'center', marginBottom: '24pt', fontFamily: 'Georgia, serif' }}>
        {t('print.atAGlance')}
      </h2>

      {/* Three circles */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24pt', marginBottom: '28pt' }}>
        <div style={circleStyle}>
          <span style={{ fontSize: '20pt' }}>{RASHI_GLYPH[asc]}</span>
          <span style={{ fontSize: '7pt', color: '#888', textTransform: 'uppercase', letterSpacing: '1pt' }}>{t('print.ascendant')}</span>
          <span style={{ fontSize: '10pt', fontWeight: 600 }}>{localizeSign(asc)}</span>
        </div>
        <div style={circleStyle}>
          <span style={{ fontSize: '20pt' }}>{RASHI_GLYPH[moon]}</span>
          <span style={{ fontSize: '7pt', color: '#888', textTransform: 'uppercase', letterSpacing: '1pt' }}>{t('print.moon')}</span>
          <span style={{ fontSize: '10pt', fontWeight: 600 }}>{localizeSign(moon)}</span>
        </div>
        <div style={circleStyle}>
          <span style={{ fontSize: '20pt' }}>{RASHI_GLYPH[sun]}</span>
          <span style={{ fontSize: '7pt', color: '#888', textTransform: 'uppercase', letterSpacing: '1pt' }}>{t('print.sun')}</span>
          <span style={{ fontSize: '10pt', fontWeight: 600 }}>{localizeSign(sun)}</span>
        </div>
      </div>

      {/* Key stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12pt', maxWidth: '480px', margin: '0 auto 24pt' }}>
        <div style={{ padding: '10pt', border: '1px solid #e5e5ea', borderLeft: '3px solid #059669', borderRadius: '2px' }}>
          <p style={{ fontSize: '7pt', color: '#888', textTransform: 'uppercase', letterSpacing: '1pt' }}>{t('print.strongestPlanet')}</p>
          <p style={{ fontSize: '12pt', fontWeight: 700, color: '#1e1b2e' }}>{PLANET_GLYPH[strongestPlanet]} {localizePlanet(strongestPlanet)}</p>
          <p style={{ fontSize: '8pt', color: '#666' }}>{(strongestRatio * 100).toFixed(0)}% Shadbala</p>
        </div>
        <div style={{ padding: '10pt', border: '1px solid #e5e5ea', borderLeft: '3px solid #6d28d9', borderRadius: '2px' }}>
          <p style={{ fontSize: '7pt', color: '#888', textTransform: 'uppercase', letterSpacing: '1pt' }}>{t('print.longevity')}</p>
          <p style={{ fontSize: '12pt', fontWeight: 700, color: '#1e1b2e' }}>{report.healthRaw.ayushTier}</p>
          <p style={{ fontSize: '8pt', color: '#666' }}>{t('print.classification')}</p>
        </div>
        <div style={{ padding: '10pt', border: '1px solid #e5e5ea', borderLeft: report.sadeSati.isActive ? '3px solid #dc2626' : '3px solid #059669', borderRadius: '2px' }}>
          <p style={{ fontSize: '7pt', color: '#888', textTransform: 'uppercase', letterSpacing: '1pt' }}>{t('print.sadeSati')}</p>
          <p style={{ fontSize: '12pt', fontWeight: 700, color: report.sadeSati.isActive ? '#dc2626' : '#059669' }}>
            {report.sadeSati.isActive ? t('print.active') : t('print.notActive')}
          </p>
          <p style={{ fontSize: '8pt', color: '#666' }}>{report.sadeSati.isActive ? report.sadeSati.phase : t('print.clear')}</p>
        </div>
      </div>

      {/* Current Dasha */}
      {activeDasha && (
        <div style={{ maxWidth: '480px', margin: '0 auto 20pt', padding: '10pt 14pt', border: '1px solid #e5e5ea', borderLeft: '3px solid #6d28d9', borderRadius: '2px' }}>
          <p style={{ fontSize: '7pt', color: '#888', textTransform: 'uppercase', letterSpacing: '1pt', marginBottom: '4pt' }}>{t('print.currentMahadasha')}</p>
          <p style={{ fontSize: '13pt', fontWeight: 700, color: '#1e1b2e' }}>
            {PLANET_GLYPH[activeDasha.period.lord]} {localizePlanet(activeDasha.period.lord)} {t('print.mahadasha')}
          </p>
          {activeDasha.narrative && <p style={{ fontSize: '9pt', color: '#6d28d9', marginTop: '2pt' }}>{activeDasha.narrative.theme}</p>}
        </div>
      )}

      {/* Top Yogas */}
      {topYogas.length > 0 && (
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <p style={{ fontSize: '8pt', color: '#888', textTransform: 'uppercase', letterSpacing: '1pt', marginBottom: '8pt' }}>{t('print.keyYogas')}</p>
          {topYogas.map((y, i) => (
            <p key={i} style={{ fontSize: '10pt', color: '#333', lineHeight: '1.8' }}>
              <span style={{ color: '#059669', fontWeight: 600 }}>✦</span> {y.name} — {y.description.slice(0, 80)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function PrintPartDivider({ num, title, t }: { num: string; title: string; t: TFn }) {
  return (
    <div className="hidden" data-print-show data-print-part-divider>
      <div style={{ textAlign: 'center', paddingTop: '30vh' }}>
        <div style={{ borderTop: '2px solid #6d28d9', width: '40px', margin: '0 auto 16pt' }} />
        <p style={{ fontSize: '9pt', color: '#6d28d9', textTransform: 'uppercase', letterSpacing: '3pt', marginBottom: '8pt' }}>
          {t('print.part')} {num}
        </p>
        <p style={{ fontSize: '22pt', fontWeight: 700, color: '#1e1b2e', fontFamily: 'Georgia, serif' }}>
          {title}
        </p>
        <div style={{ borderBottom: '2px solid #6d28d9', width: '40px', margin: '16pt auto 0' }} />
      </div>
    </div>
  );
}
