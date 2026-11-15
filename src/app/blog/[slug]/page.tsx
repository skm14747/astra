import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, getBlogPost } from '@/content/blog';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import AdSlot from '@/components/ads/AdSlot';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

export async function generateStaticParams() {
  return BLOG_POSTS.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Not Found' };

  return {
    title: `${post.title} | Astra Blog`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
      languages: {
        'en': `/blog/${post.slug}`,
        'hi': `/hi/blog/${post.slug}`,
        'ne': `/ne/blog/${post.slug}`,
        'pt': `/pt/blog/${post.slug}`,
        'es': `/es/blog/${post.slug}`,
        'x-default': `/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const ArticleContent = (await import(`@/content/blog/${slug}`)).default;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'Astra Destiny',
      url: BASE_URL,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blog/${post.slug}` },
  };

  const relatedPosts = BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-8 space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbJsonLd items={[
        { name: 'Home', href: '/' },
        { name: 'Blog', href: '/blog' },
        { name: post.title, href: `/blog/${post.slug}` },
      ]} />

      {/* Header */}
      <header>
        <div className="flex items-center gap-3 mb-4">
          <Link href="/blog" className="text-sm text-violet-400 hover:text-violet-300 transition">
            ← Blog
          </Link>
          <span className="text-zinc-700">·</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
            {post.category}
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 mt-4 text-sm text-zinc-500">
          <span>{post.author}</span>
          <span>·</span>
          <time dateTime={post.date}>
            {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </time>
          <span>·</span>
          <span>{post.readingTime} read</span>
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-invert prose-zinc max-w-none
        prose-headings:font-display prose-headings:text-zinc-200
        prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
        prose-p:text-zinc-400 prose-p:leading-relaxed
        prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-zinc-200
        prose-li:text-zinc-400
        prose-blockquote:border-l-violet-500/40 prose-blockquote:text-zinc-400
        prose-table:text-sm
        prose-th:text-zinc-300 prose-th:border-white/10
        prose-td:border-white/[0.06] prose-td:text-zinc-400
      ">
        <ArticleContent />
      </div>

      {/* Ad slot */}
      <AdSlot format="auto" />

      {/* CTA */}
      <div className="glass-card rounded-2xl p-6 text-center">
        <h2 className="font-display text-lg font-semibold text-white mb-2">Try These Tools Free</h2>
        <p className="text-sm text-zinc-400 mb-4">
          All calculations mentioned in this article are available in Astra — free, instant, and private.
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          <Link href="/vedic/kundli" className="px-4 py-2 rounded-full text-sm text-white bg-violet-600 hover:bg-violet-500 transition">
            Generate Kundli
          </Link>
          <Link href="/vedic/yogas" className="px-4 py-2 rounded-full text-sm text-zinc-300 bg-white/[0.05] hover:bg-white/[0.08] transition border border-white/[0.06]">
            Check Yogas & Doshas
          </Link>
        </div>
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <nav className="mt-8 pt-6 border-t border-white/[0.04]">
          <h2 className="text-sm font-semibold text-zinc-400 tracking-wide uppercase mb-4">More Articles</h2>
          <div className="grid gap-3">
            {relatedPosts.map(rp => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}`}
                className="glass-card rounded-xl p-4 hover:border-violet-500/30 transition-all flex justify-between items-center"
              >
                <div>
                  <div className="font-medium text-sm text-zinc-200">{rp.title}</div>
                  <div className="text-xs text-zinc-500 mt-1">{rp.category} · {rp.readingTime}</div>
                </div>
                <span className="text-zinc-600 text-lg">→</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </article>
  );
}
