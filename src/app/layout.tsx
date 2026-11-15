import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Inter, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { WebAppJsonLd, WebSiteJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import Navbar from "@/components/shared/Navbar";
import BottomTabs from "@/components/shared/BottomTabs";
import { LazyCosmicBackground, LazyCommandPalette } from "@/components/shared/LazyShell";
import { ProfileProvider } from "@/lib/profile/context";
import { SettingsProvider } from "@/lib/settings/context";
import SiteFooter from "@/components/shared/SiteFooter";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-hindi",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Astra Destiny — Free Vedic Astrology Calculator & Kundli Generator',
    template: '%s | Astra Destiny',
  },
  description:
    'Free Vedic astrology calculator with 200+ Jyotish tools — Kundli, Dasha, Yogas, Nakshatra & Kundli Milan. Try free now!',
  keywords: [
    'vedic astrology', 'kundli', 'birth chart', 'jyotish', 'horoscope',
    'free kundli online', 'janam kundali', 'vedic birth chart calculator',
    'mahadasha calculator', 'vimshottari dasha calculator', 'dasha calculator',
    'nakshatra calculator', 'birth star calculator', 'nakshatra finder',
    'kundli matching', 'kundli milan', 'gun milan', 'ashtakoota matching',
    'panchang today', 'rahu kaal today', 'tithi today',
    'yoga dosha', 'mangal dosha calculator', 'kaal sarp dosha',
    'sade sati calculator', 'saturn transit',
    'muhurta', 'ashtakavarga', 'shadbala', 'jaimini',
    'navamsa chart calculator', 'career astrology',
    'nadi astrology', 'vedic remedies', 'free astrology calculator',
  ],
  authors: [{ name: 'Astra Destiny' }],
  creator: 'Astra Destiny',
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'hi': '/',
      'x-default': '/',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Astra Destiny',
    title: 'Astra Destiny — Free Vedic Astrology Calculator & Kundli Generator',
    description:
      'Free Vedic astrology calculator with 200+ Jyotish tools — Kundli, Dasha, Yogas, Kundli Milan & more. BPHS-based, NASA-precision.',
    url: BASE_URL,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Astra Vedic Astrology' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Astra Destiny — Free Vedic Astrology Calculator',
    description: 'Free Vedic astrology with 200+ Jyotish tools — Kundli, Dasha, Yogas & more.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="google-adsense-account" content="ca-pub-4058029196087745" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4058029196087745"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${playfair.variable} ${inter.variable} ${notoDevanagari.variable} bg-astra-bg text-zinc-100 min-h-screen`}>
        <WebSiteJsonLd />
        <OrganizationJsonLd />
        <WebAppJsonLd />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[300] focus:px-4 focus:py-2 focus:bg-violet-600 focus:text-white focus:rounded focus:text-sm">
          Skip to main content
        </a>
        <LazyCosmicBackground />
        <ProfileProvider>
          <SettingsProvider>
            <Navbar />
            <main id="main-content" className="relative z-10 min-h-[calc(100vh-4rem)] pb-20 md:pb-8" tabIndex={-1}>
              {children}
            </main>
            <SiteFooter />
            <BottomTabs />
            <LazyCommandPalette />
          </SettingsProvider>
        </ProfileProvider>
      </body>
    </html>
  );
}
