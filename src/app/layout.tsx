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
    default: 'BAu Interactive | Estudio Independiente de Videojuegos',
    template: '%s | BAu Interactive',
  },
  description:
    'Estudio independiente de desarrollo de videojuegos. Conoce nuestros proyectos, prueba la beta pública de Pok-Tschack y sigue nuestras actualizaciones de desarrollo.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  keywords: [
    'videojuegos independientes',
    'indie games',
    'Pok-Tschack',
    'arcade 2D',
    'juego de pelota mesoamericano',
    'física de rebotes',
    'beta pública',
    'BAu Interactive',
  ],
  authors: [{ name: 'BAu Interactive' }],
  openGraph: {
    title: 'BAu Interactive | Estudio Independiente de Videojuegos',
    description:
      'Estudio independiente enfocado en mecánicas de precisión, física arcade y diseño de autor. Prueba la beta de Pok-Tschack.',
    url: '/',
    siteName: 'BAu Interactive',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BAu Interactive | Estudio Independiente de Videojuegos',
    description:
      'Estudio independiente. Prueba la beta pública de Pok-Tschack y sigue nuestras notas de desarrollo.',
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
      <head>
        <link rel="icon" href="/images/studio/bau-interactive-logo.jpg" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-zinc-900 antialiased selection:bg-[#00d647] selection:text-black">
        {/* Enlace de accesibilidad para saltar al contenido principal */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-black text-[#00ff55] font-bold border border-[#00ff55] rounded shadow-lg focus:outline-none"
        >
          Saltar al contenido principal
        </a>

        {/* Barra de Navegación Principal */}
        <Navbar />

        {/* Contenedor de Vistas */}
        <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
          {children}
        </main>

        {/* Pie de Página */}
        <Footer />
      </body>
    </html>
  );
}
