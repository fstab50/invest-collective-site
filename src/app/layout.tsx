import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';

export const metadata: Metadata = {
  title: 'Invest Collective - Trading Group',
  description: 'Join our community of passionate investors who meet weekly to share insights and grow together.',
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
