import type { Metadata } from 'next';
import LocaleLink from '@/components/shared/LocaleLink';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

export const metadata: Metadata = {
  title: 'Darakaraka — Your Ideal Spouse in Vedic Astrology | Astra Destiny',
  description: 'Darakaraka is the Jaimini indicator of your ideal spouse. Discover your spouse\'s appearance, personality, and career based on which planet holds the lowest degree in your birth chart.',
  keywords: ['darakaraka', 'darakaraka spouse', 'jaimini darakaraka', 'ideal spouse astrology', 'darakaraka calculator'],
  alternates: { canonical: `${BASE_URL}/astrology/darakaraka-spouse` },
};

const DK_PROFILES = [
  { planet: 'Sun', appearance: 'Tall, well-built, warm complexion, dignified posture, bright eyes.', personality: 'Authoritative, proud, leadership-oriented. Government or administrative background.', career: 'Politics, civil service, medicine, administration, corporate leadership.' },
  { planet: 'Moon', appearance: 'Soft features, round face, fair or pale complexion, expressive eyes.', personality: 'Nurturing, emotional, caring, home-oriented. May have mood fluctuations.', career: 'Nursing, teaching, hospitality, food industry, psychology.' },
  { planet: 'Mars', appearance: 'Athletic, sharp features, reddish tint, energetic bearing.', personality: 'Courageous, competitive, passionate, may be short-tempered but protective.', career: 'Military, police, sports, engineering, surgery, real estate.' },
  { planet: 'Mercury', appearance: 'Youthful, slender, expressive hands, quick movements.', personality: 'Intellectual, communicative, witty, versatile. May be dual-natured.', career: 'Writing, accounting, trading, IT, astrology, media.' },
  { planet: 'Jupiter', appearance: 'Well-proportioned, taller than average, pleasant expression, dignified.', personality: 'Wise, generous, ethical, religious or philosophical. Natural counsellor.', career: 'Teaching, law, banking, religious service, advisory.' },
  { planet: 'Venus', appearance: 'Attractive, symmetrical features, charming smile, artistic dress sense.', personality: 'Romantic, artistic, luxury-loving, socially skilled. Values beauty.', career: 'Art, fashion, entertainment, beauty, hospitality, luxury goods.' },
  { planet: 'Saturn', appearance: 'Lean, angular features, may appear older than age, serious expression.', personality: 'Disciplined, hardworking, mature, traditional. May seem emotionally reserved.', career: 'Law, government, agriculture, mining, real estate, social work.' },
];

export default function DarakarakaSpousePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 space-y-8">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Love', href: '/horoscope/love' }, { name: 'Darakaraka Spouse', href: '/astrology/darakaraka-spouse' }]} />
      <Breadcrumbs items={[{ label: 'Love', href: '/horoscope/love' }, { label: 'Darakaraka Spouse', href: '/astrology/darakaraka-spouse' }]} />

      <div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Darakaraka — Your Ideal Spouse</h1>
        <p className="text-zinc-400 mt-2 text-lg">Jaimini astrology&apos;s key to understanding your partner&apos;s nature</p>
      </div>

      <article className="prose prose-invert prose-sm max-w-none space-y-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-3">What Is Darakaraka?</h2>
          <p className="text-zinc-300 text-sm leading-relaxed">
            In Jaimini astrology, the Darakaraka (DK) is the planet with the lowest degree among the seven Chara Karakas (Sun through Saturn). &quot;Dara&quot; means spouse — this planet reveals the essential qualities of your life partner: their appearance, temperament, profession, and how they show up in your life. The DK is considered more specific than the general 7th house ruler for spouse analysis.
          </p>
          <p className="text-zinc-300 text-sm leading-relaxed mt-3">
            To find your Darakaraka, calculate the Chara Karakas from your birth chart. The planet at the lowest degree (closest to 0° in any sign) becomes your DK. Use our <LocaleLink href="/vedic/darakaraka" className="text-violet-400 hover:underline">Darakaraka Calculator</LocaleLink> for an instant calculation.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-4">Spouse Profile by Darakaraka Planet</h2>
          <div className="space-y-4">
            {DK_PROFILES.map(dk => (
              <div key={dk.planet} className="bg-white/[0.03] rounded-lg p-4 space-y-2">
                <h3 className="font-semibold text-violet-300 text-sm">{dk.planet} as Darakaraka</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div><span className="text-zinc-500">Appearance</span><p className="text-zinc-300 mt-0.5">{dk.appearance}</p></div>
                  <div><span className="text-zinc-500">Personality</span><p className="text-zinc-300 mt-0.5">{dk.personality}</p></div>
                  <div><span className="text-zinc-500">Career</span><p className="text-zinc-300 mt-0.5">{dk.career}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-3">DK in the Navamsa</h2>
          <p className="text-zinc-300 text-sm leading-relaxed">
            The Darakaraka&apos;s placement in the Navamsa chart (D-9) adds another layer. The Navamsa sign of the DK shows the spiritual essence of the marriage and the deeper motivations of the spouse. A strong DK in the Navamsa (exalted, in own sign, or in a kendra) indicates a well-placed and supportive spouse. A debilitated DK suggests challenges that require maturity and compromise.
          </p>
        </div>
      </article>

      <div className="flex gap-3">
        <LocaleLink href="/vedic/darakaraka" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">← Calculate Your Darakaraka</LocaleLink>
        <LocaleLink href="/horoscope/love" className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors">Love Horoscope →</LocaleLink>
      </div>
    </div>
  );
}
