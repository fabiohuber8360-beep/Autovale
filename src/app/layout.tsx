import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'AutoVale – Importierte Fahrzeuge transparent kaufen',
    template: '%s | AutoVale',
  },
  description:
    'Importierte Fahrzeuge aus Deutschland. Transparent geprüft. Einfach verständlich. Finde dein nächstes Fahrzeug auf AutoVale.',
  keywords: [
    'Autoimport',
    'Fahrzeugimport Schweiz',
    'Occasion Fahrzeuge',
    'Auto kaufen Schweiz',
    'Importfahrzeuge Deutschland',
    'AutoVale',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
