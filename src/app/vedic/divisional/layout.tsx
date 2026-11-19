import type { Metadata } from 'next';
import { buildVedicMetadata } from '../seo';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import PageAdWrapper from '@/components/ads/PageAdWrapper';

export async function generateMetadata(): Promise<Metadata> { return buildVedicMetadata('divisional'); }

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Vedic Astrology', href: '/vedic/kundli' }, { name: 'Divisional Charts', href: '/vedic/divisional' }]} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <Breadcrumbs items={[{ label: 'Vedic Astrology', href: '/vedic/kundli' }, { label: 'Divisional Charts', href: '/vedic/divisional' }]} />
      </div>
      <PageAdWrapper>{children}</PageAdWrapper>
    </>
  );
}
