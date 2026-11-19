import type { Metadata } from 'next';
import { buildMatrixMetadata } from '../seo';
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import PageAdWrapper from '@/components/ads/PageAdWrapper';

export const metadata: Metadata = buildMatrixMetadata('chart');

const MATRIX_FAQ = [
  {
    question: 'What is the Matrix of Destiny?',
    answer: 'The Matrix of Destiny is a numerological system attributed to Natalia Ladini (2006) that maps 22 Major Arcana energies onto an octagram (8-pointed star) derived from your birth date. Each position reveals core energies governing personality, karma, talents, and life purposes.',
  },
  {
    question: 'How is the Matrix of Destiny calculated?',
    answer: 'Your birth day, month, and year are reduced to numbers 1–22 using digit-sum reduction (any value above 22 has its digits summed until it falls within range, with 0 mapped to 22). These form points A, B, C on the octagram, with D and E derived from their sums. Additional points map ancestral lines, karmic tail, and love/money energies.',
  },
  {
    question: 'What is the Karmic Tail in the Matrix of Destiny?',
    answer: 'The Karmic Tail consists of three energies read from center outward on the D-axis: the pattern carried from past lives, how it repeats in the current life, and the lesson to master. It reveals inherited behavioral patterns and the growth opportunity they present.',
  },
  {
    question: 'What are the Love and Money Lines?',
    answer: 'The Love Line and Money Line are three-point energy sequences derived from the matrix midpoints. They show how you attract and manage romantic relationships and material resources respectively, with each point representing a different phase of the energy flow.',
  },
  {
    question: 'Is my birth data sent to a server?',
    answer: 'No. All Matrix of Destiny calculations happen entirely in your browser using client-side JavaScript. No birth date or personal data is transmitted to any server.',
  },
  {
    question: 'What is the Year Arcana?',
    answer: 'The Year Arcana reveals which of the 22 Major Arcana energies governs your current calendar year. It is calculated from your birth day, birth month, and the target year, and changes every January 1st. It helps you understand the dominant theme and opportunities for each year.',
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Matrix of Destiny', href: '/matrix' }, { name: 'Chart', href: '/matrix/chart' }]} />
      <FAQJsonLd faqs={MATRIX_FAQ} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <Breadcrumbs items={[{ label: 'Matrix of Destiny', href: '/matrix/chart' }]} />
      </div>
      <PageAdWrapper>{children}</PageAdWrapper>
    </>
  );
}
