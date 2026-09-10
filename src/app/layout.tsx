import type { Metadata } from 'next';
import { Titillium_Web } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const titilliumWeb = Titillium_Web({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-titillium',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'BAu Interactive | Portal Oficial de Videojuegos',
    template: '%s | BAu Interactive',
  },
  description:
    'Estudio de desarrollo de videojuegos independiente. Prueba la beta pública de Aether Drift, revisa las notas de versión y compite por el Top 15 mundial.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  keywords: [
    'videojuegos independientes',
    'indie games',
    'Aether Drift',
    'arcade',
    'synthwave',
    'top 15',
    'beta pública',
    'BAu Interactive',
  ],
  authors: [{ name: 'BAu Interactive' }],
  openGraph: {
    title: 'BAu Interactive | Portal Oficial de Videojuegos',
    description:
      'Estudio independiente dedicado a crear videojuegos con pulso arcade y alma digital. Prueba la beta de Aether Drift.',
    url: '/',
    siteName: 'BAu Interactive',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BAu Interactive | Portal Oficial de Videojuegos',
    description:
      'Estudio independiente. Prueba la beta pública de Aether Drift y compite en el Top 15 mundial.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={titilliumWeb.variable}>
      <body className="min-h-screen flex flex-col bg-white text-zinc-900 font-sans antialiased selection:bg-[#00ff55] selection:text-black">
        {/* Enlace accesible para saltar directo al contenido */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-black text-white font-bold rounded shadow-lg border border-[#00ff55]"
        >
          Saltar al contenido principal
        </a>

        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
