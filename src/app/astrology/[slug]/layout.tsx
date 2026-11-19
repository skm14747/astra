import type { Metadata } from 'next';
import { getArticleData } from '@/lib/astrology/planet-in-house';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import PageAdWrapper from '@/components/ads/PageAdWrapper';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleData(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `${BASE_URL}/astrology/${slug}/` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${BASE_URL}/astrology/${slug}/`,
      siteName: 'Astra Destiny',
      type: 'article',
    },
  };
}

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleData(slug);
  const label = article ? `${article.planetName} in ${article.house}${article.house === 1 ? 'st' : article.house === 2 ? 'nd' : article.house === 3 ? 'rd' : 'th'} House` : slug;

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Astrology', href: '/astrology' }, { name: label, href: `/astrology/${slug}` }]} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <Breadcrumbs items={[{ label: 'Astrology', href: '/astrology' }, { label, href: `/astrology/${slug}` }]} />
      </div>
      <PageAdWrapper>{children}</PageAdWrapper>
    </>
  );
}
