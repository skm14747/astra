import { ALL_SLUGS, getArticleData, parseSlug } from '@/lib/astrology/planet-in-house';
import { getPlanetInHouseText } from '@/lib/vedic/interpretations';
import { RICH_ARTICLES } from '@/lib/astrology/rich-articles';
import { notFound } from 'next/navigation';
import LocaleLink from '@/components/shared/LocaleLink';
import type { Planet } from '@/lib/vedic/types';

export function generateStaticParams() {
  return ALL_SLUGS.map(slug => ({ slug }));
}

const PLANET_MAP: Record<string, Planet> = {
  sun: 'Sun', moon: 'Moon', mars: 'Mars', mercury: 'Mercury',
  jupiter: 'Jupiter', venus: 'Venus', saturn: 'Saturn', rahu: 'Rahu', ketu: 'Ketu',
};

function getOrdinal(n: number): string {
  return `${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'}`;
}

export default async function PlanetInHousePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleData(slug);
  if (!article) notFound();

  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const planetKey = PLANET_MAP[parsed.planet];
  const interp = getPlanetInHouseText(planetKey, parsed.house);
  const rich = RICH_ARTICLES[slug];

  const relatedSameHouse = Array.from({ length: 9 }, (_, i) => {
    const planets = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'rahu', 'ketu'];
    const p = planets[i];
    if (p === parsed.planet) return null;
    const s = `${p}-in-${getOrdinal(parsed.house)}-house`;
    const NAMES: Record<string, string> = { sun: 'Sun', moon: 'Moon', mars: 'Mars', mercury: 'Mercury', jupiter: 'Jupiter', venus: 'Venus', saturn: 'Saturn', rahu: 'Rahu', ketu: 'Ketu' };
    return { slug: s, label: `${NAMES[p]} in ${getOrdinal(parsed.house)} House` };
  }).filter(Boolean) as { slug: string; label: string }[];

  const relatedSamePlanet = Array.from({ length: 12 }, (_, i) => {
    const h = i + 1;
    if (h === parsed.house) return null;
    const s = `${parsed.planet}-in-${getOrdinal(h)}-house`;
    return { slug: s, label: `${article.planetName} in ${getOrdinal(h)} House` };
  }).filter(Boolean) as { slug: string; label: string }[];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">
          {article.planetName} in the {getOrdinal(article.house)} House
        </h1>
        <p className="text-zinc-400 mt-2 text-lg">Vedic astrology meaning, effects &amp; interpretation</p>
      </div>

      {/* House Context */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-2">The {getOrdinal(article.house)} House — {article.houseName}</h2>
        <p className="text-zinc-400 text-sm">{article.houseTheme}</p>
      </div>

      {/* Main Interpretation */}
      {interp && (
        <article className="prose prose-invert prose-sm max-w-none space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-semibold text-zinc-100 text-lg mb-3">{article.planetName} in {getOrdinal(article.house)} House — Overview</h2>
            <p className="text-zinc-300 text-sm leading-relaxed">{interp.keywords}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold text-emerald-400 text-lg mb-3">When Strong (Exalted / Own Sign / Well-Aspected)</h3>
              <p className="text-zinc-300 text-sm leading-relaxed">{interp.whenStrong}</p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold text-amber-400 text-lg mb-3">When Weak (Debilitated / Afflicted / Combust)</h3>
              <p className="text-zinc-300 text-sm leading-relaxed">{interp.whenWeak}</p>
            </div>
          </div>
        </article>
      )}

      {/* Rich Article Content (top 10 pages) */}
      {rich && (
        <article className="prose prose-invert prose-sm max-w-none space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <p className="text-zinc-300 text-sm leading-relaxed">{rich.intro}</p>
          </div>
          {rich.sections.map((s, i) => (
            <div key={i} className="glass-card rounded-2xl p-6">
              <h2 className="font-semibold text-zinc-100 text-lg mb-3">{s.heading}</h2>
              <p className="text-zinc-300 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
          {rich.remedies.length > 0 && (
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-semibold text-zinc-100 text-lg mb-3">Vedic Remedies</h2>
              <ul className="list-disc list-inside text-zinc-300 text-sm space-y-1">
                {rich.remedies.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          )}
          {rich.faqs.length > 0 && (
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-semibold text-zinc-100 text-lg mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {rich.faqs.map((faq, i) => (
                  <details key={i} className="group">
                    <summary className="cursor-pointer text-sm font-medium text-violet-300 group-open:text-violet-200">{faq.q}</summary>
                    <p className="text-zinc-400 text-sm mt-2 leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </article>
      )}

      {/* Related: Same House */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">Other Planets in the {getOrdinal(article.house)} House</h2>
        <div className="flex flex-wrap gap-2">
          {relatedSameHouse.map(r => (
            <LocaleLink key={r.slug} href={`/astrology/${r.slug}`} className="text-sm text-violet-400 hover:text-violet-300 bg-violet-600/10 rounded-lg px-3 py-1.5 transition-colors">
              {r.label}
            </LocaleLink>
          ))}
        </div>
      </div>

      {/* Related: Same Planet */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">{article.planetName} in All 12 Houses</h2>
        <div className="flex flex-wrap gap-2">
          {relatedSamePlanet.map(r => (
            <LocaleLink key={r.slug} href={`/astrology/${r.slug}`} className="text-sm text-cyan-400 hover:text-cyan-300 bg-cyan-600/10 rounded-lg px-3 py-1.5 transition-colors">
              {r.label}
            </LocaleLink>
          ))}
        </div>
      </div>

      {/* Back to tools */}
      <div className="flex gap-3">
        <LocaleLink href="/vedic/kundli" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">← Generate your birth chart</LocaleLink>
        <LocaleLink href="/tools" className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors">All Tools →</LocaleLink>
      </div>
    </div>
  );
}
