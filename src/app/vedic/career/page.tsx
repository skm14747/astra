'use client';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { analyzeCareer } from '@/lib/vedic/career';
import { PLANET_GLYPH } from '@/lib/vedic/glyphs';
import SeoIntro from '@/components/seo/SeoIntro';

export default function CareerPage() {
  const { chart } = useProfileChart();

  if (!chart) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="💼" title="Career Analysis" description="Create a birth profile to analyze your career potential through Vedic astrology." />
      <SeoIntro heading="Career Analysis in Vedic Astrology" text="Career analysis examines the 10th house (Karma Bhava), its lord, planets placed there, and the Dasamsa (D10) divisional chart. The 10th house represents public life, profession, authority, and reputation." />
    </div>
  );

  const career = analyzeCareer(chart);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3"><span className="text-xs text-violet-400/40">💼 Career</span></div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Career Analysis</h1>
        <p className="text-zinc-400 mt-1">10th house, Dasamsa (D10), and Amatyakaraka career indicators</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-4">10th House</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-zinc-400">10th Lord</span><span className="text-zinc-200">{career.tenthLord}</span></div>
            <div className="flex justify-between"><span className="text-zinc-400">10th Lord House</span><span className="text-zinc-200">House {career.tenthLordHouse}</span></div>
            <div className="flex justify-between"><span className="text-zinc-400">10th Lord Dignity</span><span className="text-zinc-200 capitalize">{career.tenthLordDignity}</span></div>
            <div className="flex justify-between"><span className="text-zinc-400">Planets in 10th</span><span className="text-zinc-200">{career.planetsInTenth.length > 0 ? career.planetsInTenth.map(p => `${PLANET_GLYPH[p]} ${p}`).join(', ') : 'None'}</span></div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-4">Career Indicators</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-zinc-400">Amatyakaraka</span><span className="text-zinc-200">{PLANET_GLYPH[career.amatyakaraka]} {career.amatyakaraka}</span></div>
            <div className="flex justify-between"><span className="text-zinc-400">Career Domain</span><span className="text-cyan-400">{career.amatyakarakaCareer}</span></div>
            <div className="flex justify-between"><span className="text-zinc-400">D10 Strength</span><span className="text-zinc-200">{career.d10Strength}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
