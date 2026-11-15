'use client';

import { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { generateFullReport, type FullReport } from '@/lib/vedic/report';
import { RASHI_NAMES } from '@/lib/vedic/constants';
import type { Planet, GrahaPlanet } from '@/lib/vedic/types';
import { useT } from '@/lib/i18n';

const GRAHAS: GrahaPlanet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

/* ── Table of Contents ── */
const TOC = [
  { id: 'birth-details', label: '1. Birth Details' },
  { id: 'birth-chart', label: '2. Birth Chart' },
  { id: 'planetary-positions', label: '3. Planetary Positions' },
  { id: 'ascendant', label: '4. Your Ascendant' },
  { id: 'moon-sign', label: '5. Moon Sign & Nakshatra' },
  { id: 'planet-analysis', label: '6. Planet-by-Planet' },
  { id: 'house-analysis', label: '7. House-by-House' },
  { id: 'shadbala', label: '8. Planetary Strength' },
  { id: 'ashtakavarga', label: '9. Ashtakavarga' },
  { id: 'yogas', label: '10. Yogas' },
  { id: 'doshas', label: '11. Doshas' },
  { id: 'career', label: '12. Career' },
  { id: 'wealth', label: '13. Wealth' },
  { id: 'marriage', label: '14. Marriage' },
  { id: 'health', label: '15. Health & Longevity' },
  { id: 'spiritual', label: '16. Spiritual Path' },
  { id: 'dasha', label: '17. Vimshottari Dasha' },
  { id: 'jaimini', label: '18. Jaimini Analysis' },
  { id: 'nadi', label: '19. Nadi Points' },
  { id: 'sade-sati', label: '20. Sade Sati' },
  { id: 'varshaphal', label: '21. This Year' },
  { id: 'remedies', label: '22. Remedies' },
];

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
  const [report, setReport] = useState<FullReport | null>(null);
  const [generating, setGenerating] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [forceAllOpen, setForceAllOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Auto-expand all sections before print, collapse back after
  useEffect(() => {
    const onBeforePrint = () => setForceAllOpen(true);
    const onAfterPrint = () => setForceAllOpen(false);
    window.addEventListener('beforeprint', onBeforePrint);
    window.addEventListener('afterprint', onAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', onBeforePrint);
      window.removeEventListener('afterprint', onAfterPrint);
    };
  }, []);

  const handleDownload = useCallback(() => {
    setForceAllOpen(true);
    // Small delay to let React re-render expanded sections before triggering print
    setTimeout(() => window.print(), 150);
  }, []);

  const generate = useCallback(() => {
    if (!chart) return;
    setGenerating(true);
    requestAnimationFrame(() => {
      const r = generateFullReport(chart);
      setReport(r);
      setGenerating(false);
    });
  }, [chart]);

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
        <EmptyState icon="📋" title="Detailed Report" description="Create a birth profile to generate your comprehensive Vedic astrology report — 22 chapters covering personality, career, marriage, health, Dasha timeline, and remedies." />
        <SeoIntro headingKey="seo.report.heading" textKey="seo.report.text" />
        {VEDIC_SEO.report?.relatedTools && <RelatedTools tools={VEDIC_SEO.report.relatedTools} />}
      </div>
    );
  }

  if (!report) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8 text-center">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Detailed Report</h1>
        <p className="text-zinc-400 mb-8 max-w-xl mx-auto">Generate your comprehensive 22-chapter Vedic astrology report with planet-by-planet analysis, life-area predictions, Dasha narratives, and personalized remedies.</p>
        <button
          onClick={generate}
          disabled={generating}
          className="px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-lg transition disabled:opacity-50"
        >
          {generating ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Generating Report…
            </span>
          ) : '✦ Generate Full Report'}
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
            📄 Download PDF
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
        {/* Cover */}
        <div className="text-center pb-8" data-print-cover data-print-pb>
          {/* Print-only decorative border */}
          <div className="hidden mx-auto w-24 h-0.5 bg-violet-600 mb-6" data-print-show />
          <p className="text-violet-400 text-sm tracking-widest uppercase mb-2">Personalized Vedic Astrology Report</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">{r.profileName}&apos;s Report</h1>
          <div className="hidden mx-auto w-16 h-px bg-zinc-400 my-4" data-print-show />
          <p className="text-zinc-400">{fmtDate(bd.date)} · {fmtTime(bd.date)}</p>
          <p className="text-zinc-500 text-sm mt-1">{bd.observer.latitude.toFixed(2)}°N, {bd.observer.longitude.toFixed(2)}°E</p>
          <div className="hidden mt-8 space-y-1" data-print-show>
            <p className="text-zinc-500 text-xs">Ascendant: {r.chart.ascendant.rashiName} · Moon: {r.chart.planets.Moon.rashiName} · Sun: {r.chart.planets.Sun.rashiName}</p>
            <p className="text-zinc-500 text-xs">Ayanamsa: {r.chart.ayanamsaSystem} ({r.chart.ayanamsa.toFixed(4)}°)</p>
          </div>
          <p className="text-zinc-600 text-xs mt-6">Generated by Astra · astradestiny.com · {fmtDate(r.generatedAt)}</p>
          <div className="hidden mx-auto w-24 h-0.5 bg-violet-600 mt-6" data-print-show />
          {/* Mobile PDF button — prominent CTA */}
          <button onClick={handleDownload} className="mt-6 xl:hidden px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-base transition shadow-lg" data-print-hide>
            📄 Download PDF
          </button>
        </div>

        {/* 1. Birth Details */}
        <Section forceOpen={forceAllOpen} id="birth-details" title="1. Birth Details & Panchang">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-zinc-300 mb-3">Personal Details</h3>
              <DataRow label="Name" value={r.profileName} />
              <DataRow label="Date of Birth" value={fmtDate(bd.date)} />
              <DataRow label="Time of Birth" value={fmtTime(bd.date)} />
              <DataRow label="Coordinates" value={`${bd.observer.latitude.toFixed(4)}°N, ${bd.observer.longitude.toFixed(4)}°E`} />
              <DataRow label="Ayanamsa" value={`${r.chart.ayanamsaSystem} (${r.chart.ayanamsa.toFixed(4)}°)`} />
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-zinc-300 mb-3">Birth Panchang</h3>
              {r.panchang ? (
                <>
                  <DataRow label="Tithi" value={r.panchang.tithi} />
                  <DataRow label="Nakshatra" value={r.panchang.nakshatra} />
                  <DataRow label="Yoga" value={r.panchang.yoga} />
                  <DataRow label="Karana" value={r.panchang.karana} />
                  <DataRow label="Vara" value={r.panchang.vara} />
                </>
              ) : <p className="text-zinc-500 text-sm">Panchang data unavailable</p>}
            </Card>
          </div>
        </Section>

        {/* 2. Birth Chart */}
        <Section forceOpen={forceAllOpen} id="birth-chart" title="2. Birth Chart Overview">
          <Card>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-xs text-zinc-500 uppercase">Ascendant</p>
                <p className="text-lg font-semibold text-white">{r.chart.ascendant.rashiName}</p>
                <p className="text-xs text-zinc-400">{r.chart.ascendant.degree}° {r.chart.ascendant.nakshatraName}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-zinc-500 uppercase">Moon Sign</p>
                <p className="text-lg font-semibold text-white">{r.chart.planets.Moon.rashiName}</p>
                <p className="text-xs text-zinc-400">{r.chart.planets.Moon.nakshatraName} P{r.chart.planets.Moon.pada}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-zinc-500 uppercase">Sun Sign</p>
                <p className="text-lg font-semibold text-white">{r.chart.planets.Sun.rashiName}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-zinc-500 uppercase">Vargottama</p>
                <p className="text-lg font-semibold text-white">{r.vargottamaPlanets.length > 0 ? r.vargottamaPlanets.join(', ') : 'None'}</p>
              </div>
            </div>
          </Card>
        </Section>

        {/* 3. Planetary Positions */}
        <Section forceOpen={forceAllOpen} id="planetary-positions" title="3. Planetary Positions">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Planetary positions">
              <thead>
                <tr className="text-left text-zinc-500 text-xs uppercase border-b border-white/[0.06]">
                  <th className="pb-2 pr-4">Planet</th><th className="pb-2 pr-4">Sign</th><th className="pb-2 pr-4">Degree</th>
                  <th className="pb-2 pr-4">House</th><th className="pb-2 pr-4">Nakshatra</th><th className="pb-2 pr-4">Dignity</th><th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {r.planetEntries.map(pe => (
                  <tr key={pe.planet} className="border-b border-white/[0.03]">
                    <td className="py-2 pr-4 font-medium text-zinc-100">{pe.planet}</td>
                    <td className="py-2 pr-4 text-zinc-300">{pe.sign}</td>
                    <td className="py-2 pr-4 text-zinc-400 font-mono text-xs">{pe.degree}</td>
                    <td className="py-2 pr-4 text-zinc-400">{pe.house}</td>
                    <td className="py-2 pr-4 text-zinc-400">{pe.nakshatra} P{pe.pada}</td>
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

        {/* 4. Ascendant Reading */}
        <Section forceOpen={forceAllOpen} id="ascendant" title="4. Your Ascendant (Lagna)">
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{getSignEmoji(r.ascendantReading.sign)}</span>
              <div>
                <h3 className="text-lg font-semibold text-white">{r.ascendantReading.sign} Rising</h3>
                <p className="text-xs text-zinc-400">Lord: {r.ascendantReading.lord} in house {r.ascendantReading.lordHouse}</p>
              </div>
            </div>
            <Prose text={r.ascendantReading.text} />
          </Card>
        </Section>

        {/* 5. Moon Sign & Nakshatra */}
        <Section forceOpen={forceAllOpen} id="moon-sign" title="5. Moon Sign & Birth Nakshatra">
          <Card>
            <Prose text={r.moonSignReading.text} />
          </Card>
          {r.nakshatraProfile && (
            <Card className="mt-4">
              <h3 className="text-lg font-semibold text-white mb-1">{r.nakshatraProfile.name}</h3>
              <p className="text-xs text-zinc-500 mb-3">{r.nakshatraProfile.deity} · {r.nakshatraProfile.symbol} · {r.nakshatraProfile.motivation}</p>
              <Prose text={r.nakshatraProfile.personality} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div><p className="text-xs text-zinc-500 uppercase mb-1">Strengths</p><p className="text-sm text-zinc-300">{r.nakshatraProfile.strengths}</p></div>
                <div><p className="text-xs text-zinc-500 uppercase mb-1">Challenges</p><p className="text-sm text-zinc-300">{r.nakshatraProfile.challenges}</p></div>
                <div><p className="text-xs text-zinc-500 uppercase mb-1">Career Fit</p><p className="text-sm text-zinc-300">{r.nakshatraProfile.career}</p></div>
              </div>
            </Card>
          )}
        </Section>

        {/* 6. Planet-by-Planet */}
        <Section forceOpen={forceAllOpen} id="planet-analysis" title="6. Planet-by-Planet Analysis">
          {r.planetEntries.map(pe => (
              <Card key={pe.planet} className="mb-4" data-print-avoid-break>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">{pe.planet} in {pe.sign}, House {pe.house}</h3>
                <div className="flex items-center gap-2">
                  <DignityBadge dignity={pe.dignity} />
                  {pe.isRetrograde && <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">Retrograde</span>}
                </div>
              </div>
              <p className="text-xs text-zinc-500 mb-3">{pe.nakshatra} pada {pe.pada} · {pe.dignityText.label}</p>
              <Prose text={pe.signText.nature} />
              <div className="mt-3 space-y-2">
                <div><span className="text-xs font-semibold text-emerald-400 uppercase">Strengths: </span><span className="text-sm text-zinc-300">{pe.signText.positive}</span></div>
                <div><span className="text-xs font-semibold text-orange-400 uppercase">Challenges: </span><span className="text-sm text-zinc-300">{pe.signText.challenges}</span></div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/[0.04]">
                <p className="text-xs text-zinc-500 uppercase mb-1">In House {pe.house}: {pe.houseText.area}</p>
                <Prose text={pe.houseText.whenStrong} />
              </div>
              {pe.conjunctions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/[0.04]">
                  <p className="text-xs text-zinc-500 uppercase mb-1">Conjunctions</p>
                  {pe.conjunctions.map(c => (
                    <p key={c.planet} className="text-sm text-zinc-400 mb-1">With {c.planet}: {c.text}</p>
                  ))}
                </div>
              )}
              {pe.retroText && <p className="mt-2 text-sm text-amber-300/80 italic">{pe.retroText}</p>}
            </Card>
          ))}
        </Section>

        {/* 7. House-by-House */}
        <Section forceOpen={forceAllOpen} id="house-analysis" title="7. House-by-House Analysis (Bhava Phala)">
          {r.houseEntries.map(he => (
              <Card key={he.house} className="mb-3" data-print-avoid-break>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-zinc-100">House {he.house} — {he.sign}</h3>
                <span className="text-xs text-zinc-500">Lord: {he.lord} in H{he.lordHouse}</span>
              </div>
              <p className="text-xs text-violet-400/70 mb-2">{he.area}</p>
              <Prose text={he.interpretation} />
              {he.planets.length > 0 && (
                <p className="mt-2 text-xs text-zinc-400">Occupants: {he.planets.join(', ')}</p>
              )}
            </Card>
          ))}
        </Section>

        {/* 8. Shadbala */}
        <Section forceOpen={forceAllOpen} id="shadbala" title="8. Planetary Strength (Shadbala)">
          <div className="space-y-3">
            {GRAHAS.map(p => {
              const sb = r.shadbala.planets[p];
              if (!sb) return null;
              const pct = (sb.ratio * 100).toFixed(0);
              const isStrong = sb.ratio >= 1;
              return (
                <Card key={p} className="!p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-zinc-200">{p}</span>
                    <span className={`text-xs font-mono ${isStrong ? 'text-emerald-400' : 'text-orange-400'}`}>{sb.total.toFixed(1)} / {sb.required} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-white/[0.04] rounded-full h-2">
                    <div className={`h-2 rounded-full ${isStrong ? 'bg-emerald-500/60' : 'bg-orange-500/60'}`} style={{ width: `${Math.min(150, Number(pct))}%` }} />
                  </div>
                </Card>
              );
            })}
          </div>
        </Section>

        {/* 9. Ashtakavarga */}
        <Section forceOpen={forceAllOpen} id="ashtakavarga" title="9. Ashtakavarga (SAV)">
          <Card>
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
              {r.ashtakavarga.sav.map((score, i) => (
                <div key={i} className="text-center">
                  <p className="text-xs text-zinc-500">{RASHI_NAMES[i]?.slice(0, 3)}</p>
                  <p className={`text-lg font-mono font-bold ${score >= 28 ? 'text-emerald-400' : score < 25 ? 'text-red-400' : 'text-zinc-300'}`}>{score}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-zinc-500 mt-3">Signs with 28+ Bindus give strong results during transits. Below 25 indicates challenging transit periods.</p>
          </Card>
        </Section>

        {/* 10. Yogas */}
        <Section forceOpen={forceAllOpen} id="yogas" title="10. Yogas in Your Chart">
          {r.yogas.length === 0 ? <p className="text-zinc-500 text-sm">No major Yogas detected.</p> : (
            <div className="space-y-3">
              {r.yogas.map((y, i) => (
                <Card key={i} className="!p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-zinc-100">{y.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${y.type === 'benefic' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>{y.type} · {y.strength}</span>
                  </div>
                  <Prose text={y.description} />
                  <p className="text-xs text-zinc-500 mt-1">Planets: {y.planets.join(', ')} · Houses: {y.houses.join(', ')}</p>
                </Card>
              ))}
            </div>
          )}
        </Section>

        {/* 11. Doshas */}
        <Section forceOpen={forceAllOpen} id="doshas" title="11. Doshas & Cautions">
          {r.doshas.filter(d => d.isActive).length === 0 ? <p className="text-zinc-400 text-sm">No active Doshas detected in your chart — this is very favorable.</p> : (
            <div className="space-y-3">
              {r.doshas.filter(d => d.isActive).map((d, i) => (
                <Card key={i} className="!p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-zinc-100">{d.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${d.severity === 'severe' ? 'bg-red-500/20 text-red-300' : d.severity === 'moderate' ? 'bg-orange-500/20 text-orange-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{d.severity}</span>
                  </div>
                  <Prose text={d.description} />
                  {d.cancellation && <p className="text-xs text-emerald-400 mt-1">Cancellation: {d.cancellation}</p>}
                </Card>
              ))}
            </div>
          )}
        </Section>

        {/* 12. Career */}
        <Section forceOpen={forceAllOpen} id="career" title="12. Career & Professional Destiny">
          <Card>
            <Prose text={r.career.summary} />
            <div className="mt-4"><Prose text={r.career.tenthHouseAnalysis} /></div>
            <div className="mt-4">
              <p className="text-xs text-zinc-500 uppercase mb-2">Suitable Career Fields</p>
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
        <Section forceOpen={forceAllOpen} id="wealth" title="13. Wealth, Income & Property">
          <Card>
            <Prose text={r.wealth.summary} />
            <div className="mt-3 space-y-2">
              <Prose text={r.wealth.wealthSources} />
              <Prose text={r.wealth.wealthTiming} />
              <Prose text={r.wealth.propertyIndication} />
            </div>
            {r.wealthRaw.dhanaYogas.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/[0.04]">
                <p className="text-xs text-zinc-500 uppercase mb-2">Dhana Yogas Detected</p>
                {r.wealthRaw.dhanaYogas.map((dy, i) => (
                  <p key={i} className="text-sm text-emerald-300">✦ {dy}</p>
                ))}
              </div>
            )}
          </Card>
        </Section>

        {/* 14. Marriage */}
        <Section forceOpen={forceAllOpen} id="marriage" title="14. Marriage & Relationships">
          <Card>
            <Prose text={r.marriage.summary} />
            <div className="mt-3 space-y-2">
              <Prose text={r.marriage.spouseNature} />
              <Prose text={r.marriage.marriageTiming} />
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                <p className="text-xs text-emerald-400 uppercase mb-1">Strengths</p>
                <p className="text-sm text-zinc-300">{r.marriage.strengths}</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
                <p className="text-xs text-orange-400 uppercase mb-1">Challenges</p>
                <p className="text-sm text-zinc-300">{r.marriage.challenges}</p>
              </div>
            </div>
          </Card>
        </Section>

        {/* 15. Health */}
        <Section forceOpen={forceAllOpen} id="health" title="15. Health & Longevity">
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${r.healthRaw.ayushTier === 'Deerghayu' ? 'bg-emerald-500/20 text-emerald-300' : r.healthRaw.ayushTier === 'Madhyayu' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'}`}>
                {r.healthRaw.ayushTier}
              </span>
              <span className="text-zinc-400 text-sm">Longevity Classification</span>
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
        <Section forceOpen={forceAllOpen} id="spiritual" title="16. Spiritual Path & Life Purpose">
          <Card>
            <Prose text={r.spiritual.summary} />
            <div className="mt-3 space-y-2">
              <Prose text={r.spiritual.spiritualStrengths} />
              <Prose text={r.spiritual.meditationStyle} />
              <Prose text={r.spiritual.karmaTheme} />
            </div>
          </Card>
        </Section>

        {/* 17. Dasha */}
        <Section forceOpen={forceAllOpen} id="dasha" title="17. Vimshottari Dasha Timeline">
          <div className="space-y-4">
            {r.vimshottariDasha.map((d, i) => (
              <Card key={i} className={`!p-4 ${d.isActive ? 'ring-1 ring-violet-500/30' : ''}`} data-print-avoid-break>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-zinc-100">
                    {d.period.lord} Mahadasha
                    {d.isActive && <span className="ml-2 text-xs bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full">Current</span>}
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono">
                    {fmtDate(d.period.startDate)} → {fmtDate(d.period.endDate)}
                  </span>
                </div>
                {d.narrative && (
                  <>
                    <p className="text-xs text-violet-400 mb-2">{d.narrative.theme}</p>
                    <Prose text={d.narrative.generalEffects} />
                    {d.isActive && (
                      <div className="mt-3 space-y-2">
                        <div><span className="text-xs font-semibold text-emerald-400">Career: </span><span className="text-sm text-zinc-300">{d.narrative.career}</span></div>
                        <div><span className="text-xs font-semibold text-pink-400">Relationships: </span><span className="text-sm text-zinc-300">{d.narrative.relationships}</span></div>
                        <div><span className="text-xs font-semibold text-cyan-400">Health: </span><span className="text-sm text-zinc-300">{d.narrative.health}</span></div>
                        <div><span className="text-xs font-semibold text-violet-400">Spirituality: </span><span className="text-sm text-zinc-300">{d.narrative.spirituality}</span></div>
                      </div>
                    )}
                  </>
                )}
              </Card>
            ))}
          </div>
        </Section>

        {/* 18. Jaimini */}
        <Section forceOpen={forceAllOpen} id="jaimini" title="18. Jaimini Analysis">
          <Card>
            <h3 className="font-semibold text-zinc-200 mb-3">Seven Chara Karakas</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {r.jaiminiKarakas.map(ck => (
                <div key={ck.type} className="text-center">
                  <p className="text-xs text-zinc-500">{ck.fullName}</p>
                  <p className="text-sm font-semibold text-white">{ck.planet}</p>
                  <p className="text-xs text-zinc-400">{ck.degreeInSign.toFixed(1)}°</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="mt-4">
            <DataRow label="Karakamsha" value={RASHI_NAMES[r.karakamsha.rashi]} />
            <DataRow label="Amatyakaraka Career" value={`${r.amatyakarakaCareer.planet}: ${r.amatyakarakaCareer.career}`} />
            <DataRow label="Brahma" value={r.brahmaMaheshwara.brahma} />
            <DataRow label="Maheshwara" value={r.brahmaMaheshwara.maheshwara} />
            <DataRow label="Rudra" value={r.brahmaMaheshwara.rudra} />
          </Card>
        </Section>

        {/* 19. Nadi */}
        <Section forceOpen={forceAllOpen} id="nadi" title="19. Nadi Sensitive Points">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {r.nadiPoints.map((np, i) => (
              <Card key={i}>
                <h3 className="font-semibold text-zinc-200">{np.name}</h3>
                <p className="text-sm text-violet-400">{np.rashiName} {(np.longitude % 30).toFixed(1)}°</p>
                <p className="text-xs text-zinc-400 mt-1">{np.description}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* 20. Sade Sati */}
        <Section forceOpen={forceAllOpen} id="sade-sati" title="20. Sade Sati">
          <Card>
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${r.sadeSati.isActive ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                {r.sadeSati.isActive ? `Active — ${r.sadeSati.phase} phase` : 'Not Active'}
              </span>
            </div>
            <Prose text={r.sadeSati.description} />
          </Card>
        </Section>

        {/* 21. This Year */}
        <Section forceOpen={forceAllOpen} id="varshaphal" title="21. This Year (Varshaphal)">
          {r.varshaphal ? (
            <Card>
              <DataRow label="Year" value={String(r.varshaphal.year)} />
              <DataRow label="Varsha Lagna" value={RASHI_NAMES[r.varshaphal.varshaLagna]} />
              <DataRow label="Muntha" value={`${RASHI_NAMES[r.varshaphal.muntha]} (lord: ${r.varshaphal.munthaLord})`} />
              <DataRow label="Year Lord" value={r.varshaphal.yearLord} />
            </Card>
          ) : <p className="text-zinc-500 text-sm">Varshaphal data unavailable for this year.</p>}
        </Section>

        {/* 22. Remedies */}
        <Section forceOpen={forceAllOpen} id="remedies" title="22. Personalized Remedies">
          <div className="space-y-3">
            {r.remedies.map((rem, i) => (
              <Card key={i} className="!p-4" data-print-avoid-break>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-zinc-200">{rem.planet} — {rem.recommendation}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${rem.priority === 'high' ? 'bg-red-500/20 text-red-300' : rem.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-zinc-500/20 text-zinc-300'}`}>{rem.priority}</span>
                </div>
                <p className="text-sm text-zinc-400">{rem.details}</p>
                <p className="text-xs text-zinc-500 mt-1 capitalize">{rem.type}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* Footer */}
        <div className="pt-8 text-center" data-print-pt>
          <div className="hidden mx-auto w-16 h-px bg-violet-600 mb-4" data-print-show />
          <p className="text-zinc-600 text-xs font-medium">✦ Astra — Vedic Astrology by GoEasyTools</p>
          <p className="text-zinc-600 text-xs mt-1">astradestiny.com</p>
          <p className="text-zinc-700 text-xs mt-2">294 BPHS-accurate algorithms · NASA JPL DE440 ephemeris · Lahiri Ayanamsa</p>
          <p className="text-zinc-700 text-xs mt-1">Report generated {fmtDate(r.generatedAt)} — for educational and spiritual guidance only.</p>
        </div>
      </article>

      {/* Floating Download Button — always visible on all screens */}
      <button
        onClick={handleDownload}
        className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-xl shadow-violet-900/30 transition-all flex items-center gap-2"
        data-print-hide
        aria-label="Download PDF"
      >
        📄 Download PDF
      </button>
    </div>
  );
}

function getSignEmoji(sign: string): string {
  const map: Record<string, string> = {
    Aries: '♈', Taurus: '♉', Gemini: '♊', Cancer: '♋', Leo: '♌', Virgo: '♍',
    Libra: '♎', Scorpio: '♏', Sagittarius: '♐', Capricorn: '♑', Aquarius: '♒', Pisces: '♓',
  };
  return map[sign] || '✦';
}
