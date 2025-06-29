import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { GoogleTagManager, GTMNoScript } from "@/components/analytics/GoogleTagManager";
import { generateOrganizationSchema, generateLocalBusinessSchema, generateWebsiteSchema } from "@/lib/structuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://royaltyrepair.com';
const SITE_NAME = 'Royalty Repair';
const SITE_DESCRIPTION = 'Expert mobile small engine repair service at your doorstep. Fast, reliable, and convenient service for all your small engine needs.';

// Generate structured data for the website
const structuredData = [
  generateOrganizationSchema(),
  generateLocalBusinessSchema(),
  generateWebsiteSchema()
];

// Convert structured data to JSON string
const structuredDataJson = JSON.stringify(structuredData);

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Expert Mobile Small Engine Repair`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'small engine repair',
    'mobile repair service',
    'lawn mower repair',
    'generator repair',
    'emergency repair service',
    'on-site repair',
    'small engine maintenance',
    'power equipment repair',
    'outdoor power equipment',
    'small engine tune-up',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.jpg`],
    creator: '@royaltyrepair',
  },
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataJson }}
          key="structured-data"
        />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.google.com" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/geist-sans.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <GoogleTagManager />
        <GoogleAnalytics />
        <GTMNoScript />
        {children}
        
        {/* Load non-critical scripts after page load */}
        <Script
          src="https://www.googletagmanager.com/gtag/js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
