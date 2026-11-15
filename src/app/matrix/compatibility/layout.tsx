import type { Metadata } from 'next';
import { buildMatrixMetadata } from '../seo';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import PageAdWrapper from '@/components/ads/PageAdWrapper';

export const metadata: Metadata = buildMatrixMetadata('compatibility');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Matrix of Destiny', href: '/matrix/chart' }, { name: 'Compatibility', href: '/matrix/compatibility' }]} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <Breadcrumbs items={[{ label: 'Matrix of Destiny', href: '/matrix/chart' }, { label: 'Compatibility', href: '/matrix/compatibility' }]} />
      </div>
      <PageAdWrapper>{children}</PageAdWrapper>
    </>
  );
}
