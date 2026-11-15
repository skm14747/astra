import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import CosmicBackground from "@/components/shared/CosmicBackground";
import { WebAppJsonLd } from "@/components/seo/JsonLd";
import Navbar from "@/components/shared/Navbar";
import BottomTabs from "@/components/shared/BottomTabs";
import CommandPalette from "@/components/shared/CommandPalette";
import { ProfileProvider } from "@/lib/profile/context";
import { SettingsProvider } from "@/lib/settings/context";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astra.goeasytool.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Astra — Free Vedic Astrology Calculator & Kundli Generator',
    template: '%s | Astra',
  },
  description:
    'Free Vedic astrology calculator with 200+ Jyotish tools — Kundli, Dasha timelines, Yogas, Nakshatra analysis, Kundli Milan, and Matrix of Destiny. Built on BPHS & NASA-precision astronomy.',
  keywords: [
    'vedic astrology', 'kundli', 'birth chart', 'jyotish', 'horoscope',
    'dasha calculator', 'nakshatra', 'yoga dosha', 'kundli milan',
    'panchang', 'muhurta', 'ashtakavarga', 'shadbala', 'jaimini',
    'nadi astrology', 'vedic remedies', 'free astrology calculator',
  ],
  authors: [{ name: 'Astra' }],
  creator: 'Astra',
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
    siteName: 'Astra',
    title: 'Astra — Free Vedic Astrology Calculator & Kundli Generator',
    description:
      'Free Vedic astrology calculator with 200+ Jyotish tools — Kundli, Dasha, Yogas, Kundli Milan & more. BPHS-based, NASA-precision.',
    url: BASE_URL,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Astra Vedic Astrology' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Astra — Free Vedic Astrology Calculator',
    description: 'Free Vedic astrology with 200+ Jyotish tools — Kundli, Dasha, Yogas & more.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/',
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
      <body className={`${playfair.variable} ${inter.variable} bg-astra-bg text-zinc-100 min-h-screen`}>
        <WebAppJsonLd />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[300] focus:px-4 focus:py-2 focus:bg-violet-600 focus:text-white focus:rounded focus:text-sm">
          Skip to main content
        </a>
        <CosmicBackground />
        <ProfileProvider>
          <SettingsProvider>
            <Navbar />
            <main id="main-content" className="relative z-10 min-h-[calc(100vh-4rem)] pb-20 md:pb-8" tabIndex={-1}>
              {children}
            </main>
            <BottomTabs />
            <CommandPalette />
          </SettingsProvider>
        </ProfileProvider>
      </body>
    </html>
  );
}
