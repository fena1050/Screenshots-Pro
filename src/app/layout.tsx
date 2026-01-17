import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { ThemeWrapper } from './ThemeWrapper'

// SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://theappscreenshot.firebaseapp.com'),
  title: {
    default: 'Screenshots Pro - App Store Screenshot Generator iOS and Android',
    template: '%s | Screenshots Pro',
  },
  description: 'Create stunning App Store and Play Store screenshots in minutes. Free online tool with device mockups, beautiful backgrounds, and easy export. No design skills required.',
  keywords: [
    'app store screenshot generator',
    'play store screenshot maker',
    'app mockup generator',
    'screenshot generator free',
    'app store optimization',
    'ASO tools',
    'mobile app screenshot',
    'iPhone mockup',
    'Android mockup',
    'app store assets',
    'play store listing',
    'app marketing',
    'screenshot design tool',
    'free mockup generator',
  ],
  authors: [{ name: 'Screenshots Pro' }],
  creator: 'Screenshots Pro',
  publisher: 'Screenshots Pro',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theappscreenshot.firebaseapp.com',
    siteName: 'Screenshots Pro',
    title: 'Screenshots Pro - App Store Screenshot Generator iOS and Android',
    description: 'Create stunning App Store and Play Store screenshots in minutes. Free online tool with device mockups and beautiful backgrounds.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Screenshots Pro - Create Beautiful App Store Screenshots',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Screenshots Pro - App Store Screenshot Generator iOS and Android',
    description: 'Create stunning App Store and Play Store screenshots in minutes. Free, easy, no design skills required.',
    images: ['/og-image.png'],
    creator: '@appscreenshot',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.ico',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://theappscreenshot.firebaseapp.com',
  },
  category: 'technology',
}

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Screenshots Pro',
  description: 'Free online tool to create stunning App Store and Play Store screenshots with device mockups and beautiful backgrounds.',
  url: 'https://theappscreenshot.firebaseapp.com',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '500',
  },
  featureList: [
    'App Store Screenshot Generator',
    'Play Store Screenshot Maker',
    'Device Mockups',
    'Beautiful Backgrounds',
    'Drag and Drop Editor',
    'Export as ZIP',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C21MEKWQE2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C21MEKWQE2');
          `}
        </Script>
        
        {/* JSON-LD Structured Data */}
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  )
}
