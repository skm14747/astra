import type { Metadata } from 'next';
import { buildVedicMetadata, VEDIC_SEO } from '../seo';
import { BreadcrumbJsonLd, FAQJsonLd, HowToJsonLd, WebApplicationJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import PageAdWrapper from '@/components/ads/PageAdWrapper';

export async function generateMetadata(): Promise<Metadata> { return buildVedicMetadata('kaal-sarp-dosha'); }

const seo = VEDIC_SEO['kaal-sarp-dosha'];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Vedic Astrology', href: '/vedic/kundli' }, { name: 'Kaal Sarp Dosha', href: '/vedic/kaal-sarp-dosha' }]} />
      <WebApplicationJsonLd slug="kaal-sarp-dosha" name={seo.title} description={seo.description} url={seo.canonical} />
      {seo.faqs && <FAQJsonLd faqs={seo.faqs} />}
      {seo.howTo && <HowToJsonLd name={seo.howTo.name} description={seo.howTo.description} steps={seo.howTo.steps} />}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <Breadcrumbs items={[{ label: 'Vedic Astrology', href: '/vedic/kundli' }, { label: 'Kaal Sarp Dosha', href: '/vedic/kaal-sarp-dosha' }]} />
      </div>
      <PageAdWrapper>{children}</PageAdWrapper>
    </>
  );
}
