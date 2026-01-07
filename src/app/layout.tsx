import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { PageViewTracker } from '@/components/PageViewTracker';

export const metadata: Metadata = {
  title: 'The Invest Collective',
  description: 'Join our community of passionate investors who meet weekly to share insights and grow together.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cfWebAnalyticsToken = process.env.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN;

  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <PageViewTracker />
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Cloudflare Web Analytics */}
        {cfWebAnalyticsToken && (
          <Script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${cfWebAnalyticsToken}"}`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
