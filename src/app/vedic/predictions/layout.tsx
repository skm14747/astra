import type { Metadata } from 'next';
import { buildVedicMetadata, VEDIC_SEO } from '../seo';
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import PageAdWrapper from '@/components/ads/PageAdWrapper';

export async function generateMetadata(): Promise<Metadata> { return buildVedicMetadata('predictions'); }

const seo = VEDIC_SEO.predictions;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Vedic Astrology', href: '/vedic/kundli' }, { name: 'Annual Predictions', href: '/vedic/predictions' }]} />
      {seo.faqs && <FAQJsonLd faqs={seo.faqs} />}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <Breadcrumbs items={[{ label: 'Vedic Astrology', href: '/vedic/kundli' }, { label: 'Annual Predictions', href: '/vedic/predictions' }]} />
      </div>
      <PageAdWrapper>{children}</PageAdWrapper>
    </>
  );
}
