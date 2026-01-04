import type { Metadata } from 'next';
import './globals.css';

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
