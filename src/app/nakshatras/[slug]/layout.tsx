import type { Metadata } from 'next';
import { getNakshatraArticle } from '@/lib/astrology/nakshatra-articles';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import PageAdWrapper from '@/components/ads/PageAdWrapper';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getNakshatraArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `${BASE_URL}/nakshatras/${slug}/` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${BASE_URL}/nakshatras/${slug}/`,
      siteName: 'Astra Destiny',
      type: 'article',
    },
  };
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getNakshatraArticle(slug);
  const label = article ? `${article.profile.name} Nakshatra` : slug;

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Nakshatras', href: '/nakshatras' }, { name: label, href: `/nakshatras/${slug}` }]} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <Breadcrumbs items={[{ label: 'Nakshatras', href: '/nakshatras' }, { label, href: `/nakshatras/${slug}` }]} />
      </div>
      <PageAdWrapper>{children}</PageAdWrapper>
    </>
  );
}
