import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Royalty Repair - CRM for Repair Shops",
  description: "The #1 CRM for Small-Engine Repair Shops. Streamline bookings, manage customers, and boost revenue.",
  icons: {
    icon: "/favicon.ico", // Main favicon
    shortcut: "/favicon-16x16.png", // For older browsers
    apple: "/apple-touch-icon.png", // Apple touch icon
    other: [ // For Android and other specific sizes
      { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', url: '/android-chrome-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '512x512', url: '/android-chrome-512x512.png' },
    ],
  },
  keywords: ["crm", "small engine repair", "shop management", "invoicing software", "scheduling tool", "mechanic software", "repair shop crm"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
