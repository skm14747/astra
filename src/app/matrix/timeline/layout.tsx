import type { Metadata } from 'next';
import { buildMatrixMetadata } from '../seo';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import PageAdWrapper from '@/components/ads/PageAdWrapper';

export const metadata: Metadata = buildMatrixMetadata('timeline');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Matrix of Destiny', href: '/matrix/chart' }, { name: 'Life Timeline', href: '/matrix/timeline' }]} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <Breadcrumbs items={[{ label: 'Matrix of Destiny', href: '/matrix/chart' }, { label: 'Life Timeline', href: '/matrix/timeline' }]} />
      </div>
      <PageAdWrapper>{children}</PageAdWrapper>
    </>
  );
}
