import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';

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
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
