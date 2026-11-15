import type { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/content/blog';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import AdSlot from '@/components/ads/AdSlot';

export const metadata: Metadata = {
  title: 'Vedic Astrology Blog — Jyotish Guides & Tutorials | Astra',
  description: 'Learn Vedic astrology with in-depth guides on Kundli reading, Dasha interpretation, Dosha analysis, Nakshatra wisdom, and practical Jyotish techniques.',
  keywords: ['vedic astrology blog', 'jyotish guide', 'astrology tutorial', 'learn vedic astrology', 'kundli reading guide'],
  alternates: {
    canonical: '/blog',
    languages: { 'en': '/blog', 'hi': '/hi/blog', 'x-default': '/blog' },
  },
  openGraph: {
    title: 'Vedic Astrology Blog — Jyotish Guides & Tutorials',
    description: 'Learn Vedic astrology with in-depth guides on Kundli reading, Dasha interpretation, Dosha analysis, and practical Jyotish techniques.',
    url: '/blog',
    type: 'website',
  },
};

export default function BlogIndexPage() {
  const categories = [...new Set(BLOG_POSTS.map(p => p.category))];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-10">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog' }]} />

      <header>
        <div className="zodiac-divider mb-4">
          <span className="text-xs text-violet-400/40">✦ 📚 ✦</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Vedic Astrology Blog</h1>
        <p className="text-zinc-400 mt-2 max-w-2xl">
          In-depth guides on Jyotish fundamentals, chart reading techniques, Dosha analysis, and practical wisdom from the ancient science of light.
        </p>
      </header>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <span key={cat} className="px-3 py-1.5 rounded-full text-xs font-medium text-zinc-400 bg-white/[0.03] border border-white/[0.06]">
            {cat}
          </span>
        ))}
      </div>

      {/* Post cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {BLOG_POSTS.map(post => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glass-card rounded-2xl p-6 hover:border-violet-500/30 transition-all group"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                {post.category}
              </span>
              <span className="text-xs text-zinc-600">{post.readingTime}</span>
            </div>
            <h2 className="font-display text-lg font-semibold text-zinc-200 group-hover:text-white transition-colors leading-snug">
              {post.title}
            </h2>
            <p className="text-sm text-zinc-500 mt-2 line-clamp-2">{post.description}</p>
            <div className="flex items-center justify-between mt-4 text-xs text-zinc-600">
              <span>{post.author}</span>
              <time dateTime={post.date}>
                {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </time>
            </div>
          </Link>
        ))}
      </div>

      {/* Ad slot */}
      <AdSlot format="horizontal" />

      {/* SEO footer */}
      <section className="mt-12 border-t border-white/[0.04] pt-8">
        <h2 className="font-display text-lg font-semibold text-zinc-300 mb-3">About This Blog</h2>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl">
          The Astra Vedic Astrology Blog covers Jyotish from fundamentals to advanced techniques.
          Every article is written with reference to classical texts — Brihat Parashara Hora Shastra (BPHS),
          Uttara Kalamrita, Saravali, and Jataka Parijata — and grounded in the astronomical calculations
          that power our free tools. Whether you are learning to read your first Kundli or interpreting
          Vimshottari Dasha for event timing, you will find practical, no-fluff guidance here.
        </p>
      </section>
    </div>
  );
}
