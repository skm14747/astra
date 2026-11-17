import type { Metadata } from 'next';
import { buildNumerologyMetadata } from '../seo';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import PageAdWrapper from '@/components/ads/PageAdWrapper';

export const metadata: Metadata = buildNumerologyMetadata('lo-shu-grid');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Tools', href: '/tools' }, { name: 'Numerology', href: '/tools/numerology' }, { name: 'Lo Shu Grid', href: '/tools/numerology/lo-shu-grid' }]} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Numerology', href: '/tools/numerology' }, { label: 'Lo Shu Grid', href: '/tools/numerology/lo-shu-grid' }]} />
      </div>
      <PageAdWrapper>{children}</PageAdWrapper>
    </>
  );
}
