import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Astra Destiny — usage terms for our free Vedic astrology calculator platform.',
  alternates: {
    canonical: '/terms',
    languages: { 'en': '/terms', 'hi': '/hi/terms', 'x-default': '/terms' },
  },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-8 space-y-8">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Terms of Service', href: '/terms' }]} />

      <header>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Terms of Service</h1>
        <p className="text-zinc-500 mt-2 text-sm">Last updated: November 15, 2026</p>
      </header>

      <div className="prose prose-invert prose-zinc max-w-none prose-headings:font-display prose-headings:text-zinc-200 prose-p:text-zinc-400 prose-p:leading-relaxed prose-li:text-zinc-400 prose-strong:text-zinc-200">
        <h2>Acceptance of Terms</h2>
        <p>
          By accessing and using Astra Destiny (astradestiny.com), you agree to these Terms of Service. If you
          do not agree, please do not use the site.
        </p>

        <h2>Service Description</h2>
        <p>
          Astra Destiny provides free, browser-based Vedic astrology calculation tools. These tools perform
          astronomical and astrological computations using established Jyotish methodologies and NASA JPL
          ephemeris data. The service is provided &quot;as is&quot; and &quot;as available.&quot;
        </p>

        <h2>No Professional Advice</h2>
        <p>
          <strong>The content and calculations on this site are for educational and entertainment purposes only.</strong>
          Astrological interpretations are based on traditional Vedic astrology (Jyotish) methodologies and
          should not be considered as:
        </p>
        <ul>
          <li>Medical or health advice</li>
          <li>Financial or investment advice</li>
          <li>Legal advice</li>
          <li>Mental health or psychological counseling</li>
          <li>A substitute for professional consultation in any field</li>
        </ul>

        <h2>Accuracy</h2>
        <p>
          While we use NASA JPL DE-series ephemeris for planetary calculations and follow BPHS (Brihat Parashara
          Hora Shastra) rules for astrological interpretations, we do not guarantee the accuracy, completeness,
          or reliability of any calculation or interpretation. Different astrology software may produce slightly
          different results due to variations in ayanamsa values, house systems, and algorithmic implementations.
        </p>

        <h2>User Responsibilities</h2>
        <ul>
          <li>You are responsible for the accuracy of the birth details you enter.</li>
          <li>You agree not to use the service for any unlawful purpose.</li>
          <li>You agree not to attempt to interfere with the proper working of the site.</li>
          <li>You acknowledge that chart data is stored locally in your browser and you are responsible for your own data.</li>
        </ul>

        <h2>Intellectual Property</h2>
        <p>
          The design, code, content, and branding of Astra Destiny are protected by copyright. Astrological
          methodologies themselves (Parashari, Jaimini, KP) are part of the public domain of Jyotish tradition.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          Astra Destiny and its creators shall not be liable for any direct, indirect, incidental, consequential,
          or punitive damages arising from your use of the service or reliance on any calculation or interpretation
          provided.
        </p>

        <h2>Modifications</h2>
        <p>
          We reserve the right to modify these terms at any time. Continued use of the service constitutes
          acceptance of modified terms.
        </p>

        <h2>Governing Law</h2>
        <p>
          These terms are governed by the laws of India. Any disputes shall be resolved in the courts of
          New Delhi, India.
        </p>
      </div>
    </article>
  );
}
