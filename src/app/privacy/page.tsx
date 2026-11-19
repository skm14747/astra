import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Astra Destiny privacy policy — how we handle your data, what information is collected, and your rights. All astrology calculations run locally in your browser.',
  alternates: {
    canonical: '/privacy/',
    languages: {
      'en': '/privacy/',
      'hi': '/hi/privacy/',
      'ne': '/ne/privacy/',
      'pt': '/pt/privacy/',
      'es': '/es/privacy/',
      'ja': '/ja/privacy/',
      'fr': '/fr/privacy/',
      'x-default': '/privacy/',
    },
  },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-8 space-y-8">
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Privacy Policy', href: '/privacy' }]} />

      <header>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Privacy Policy</h1>
        <p className="text-zinc-500 mt-2 text-sm">Last updated: November 15, 2026</p>
      </header>

      <div className="prose prose-invert prose-zinc max-w-none prose-headings:font-display prose-headings:text-zinc-200 prose-p:text-zinc-400 prose-p:leading-relaxed prose-li:text-zinc-400 prose-strong:text-zinc-200">
        <h2>Overview</h2>
        <p>
          Astra Destiny (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a free Vedic astrology calculator platform
          hosted at astradestiny.com. We are committed to protecting your privacy. This policy explains what
          information we collect and how we use it.
        </p>

        <h2>Local-First Architecture</h2>
        <p>
          <strong>All astrology calculations run entirely in your browser.</strong> Your birth date, birth time,
          birth location, and chart data are processed by JavaScript running on your device. This data is stored
          only in your browser&apos;s localStorage and is never transmitted to our servers or any third party.
        </p>
        <p>
          You can delete all stored data at any time by clearing your browser&apos;s localStorage for this site,
          or by using the Settings page within the application.
        </p>

        <h2>Information We Collect</h2>
        <h3>Information you provide</h3>
        <p>
          We do not require account creation, registration, or login. We do not collect names, email addresses,
          or any personally identifiable information through our astrology tools.
        </p>

        <h3>Automatically collected information</h3>
        <p>Like most websites, our hosting provider (Vercel) and analytics services may collect:</p>
        <ul>
          <li>IP address (anonymized where possible)</li>
          <li>Browser type and version</li>
          <li>Device type and screen size</li>
          <li>Pages visited and time spent</li>
          <li>Referring URL</li>
        </ul>
        <p>This information is used solely for website analytics and performance monitoring.</p>

        <h2>Third-Party Services</h2>
        <ul>
          <li><strong>Vercel</strong> — Hosting and CDN delivery</li>
          <li><strong>Google Analytics (GA4)</strong> — Anonymous usage statistics (if enabled)</li>
          <li><strong>Google AdSense</strong> — Advertising (subject to Google&apos;s privacy policy)</li>
          <li><strong>Google Fonts</strong> — Font delivery</li>
        </ul>
        <p>
          We do not send your birth details, chart data, or calculation results to any of these services.
        </p>

        <h2>Cookies</h2>
        <p>
          We use essential cookies for site functionality. Third-party services (Google Analytics, Google AdSense)
          may set their own cookies. You can manage cookie preferences through your browser settings.
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          Our service is not directed at children under 13. We do not knowingly collect information from children.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. Changes will be posted on this page with an updated
          &quot;Last updated&quot; date.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this privacy policy, please contact us through the information provided
          on our About page.
        </p>
      </div>
    </article>
  );
}
