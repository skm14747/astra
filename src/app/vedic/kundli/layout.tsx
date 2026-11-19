import type { Metadata } from 'next';
import { buildVedicMetadata, VEDIC_SEO } from '../seo';
import { BreadcrumbJsonLd, FAQJsonLd, HowToJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import PageAdWrapper from '@/components/ads/PageAdWrapper';

export async function generateMetadata(): Promise<Metadata> { return buildVedicMetadata('kundli'); }

const seo = VEDIC_SEO['kundli'];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Vedic Astrology', href: '/vedic/kundli' }, { name: 'Kundli', href: '/vedic/kundli' }]} />
      {seo.faqs && <FAQJsonLd faqs={seo.faqs} />}
      {seo.howTo && <HowToJsonLd name={seo.howTo.name} description={seo.howTo.description} steps={seo.howTo.steps} />}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <Breadcrumbs items={[{ label: 'Vedic Astrology', href: '/vedic/kundli' }]} />
      </div>
      <PageAdWrapper>{children}</PageAdWrapper>
    </>
  );
}
