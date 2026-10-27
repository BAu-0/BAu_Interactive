import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import { DiscordIcon, InstagramIcon, FacebookIcon, TikTokIcon } from '@/components/icons/BrandIcons';
import { CookiePreferencesButton } from '@/components/analytics/CookiePreferencesButton';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'bau.interactive@gmail.com';
  const discordUrl = 'https://discord.gg/BTNA7EEQG';
  const instagramUrl = 'https://www.instagram.com/bau.interactive/';
  const facebookUrl = 'https://www.facebook.com/profile.php?id=61595454786065&locale=es_LA';
  const tiktokUrl = 'https://www.tiktok.com/@bau_interactive';

  return (
    <footer className="bg-[#000000] text-zinc-300 border-t border-zinc-800 mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Columna 1: Estudio e Identidad */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7] rounded">
              <div className="relative h-14 sm:h-16 w-18 sm:w-21 aspect-[755/581]">
                <Image
                  src="/images/studio/bau-interactive-logo-tight.png"
                  alt="BAu Interactive"
                  fill
                  sizes="(max-width: 640px) 100px, 140px"
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed font-sans">
              Estudio independiente de entretenimiento interactivo. Creamos experiencias desafiantes, ideas originales y videojuegos donde la diversión del jugador es la máxima prioridad.
            </p>
            {supportEmail && (
              <div className="flex items-center space-x-2 text-xs text-zinc-400 pt-1">
                <Mail className="w-3.5 h-3.5 text-[#a855f7]" />
                <span>Contacto oficial:</span>
                <a
                  href={`mailto:${supportEmail}`}
                  className="text-zinc-200 hover:text-[#a855f7] transition-colors"
                >
                  {supportEmail}
                </a>
              </div>
            )}
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">
              Explorar
            </h2>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/juegos" className="hover:text-white transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/juegos/pok-tschack" className="hover:text-white transition-colors">
                  Pok-Tschack (Beta)
                </Link>
              </li>
              <li>
                <Link href="/novedades" className="hover:text-white transition-colors">
                  Novedades & Devlogs
                </Link>
              </li>
              <li>
                <Link href="/acerca" className="hover:text-white transition-colors">
                  Acerca del Estudio
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Canales Oficiales y Redes */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">
              Comunidad
            </h2>
            <div className="flex flex-col space-y-2.5 text-sm">
              <a
                href={discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors group"
              >
                <DiscordIcon className="w-4 h-4 text-zinc-400 group-hover:text-[#a855f7] transition-colors" />
                <span>Discord (Feedback & Noticias)</span>
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors group"
              >
                <InstagramIcon className="w-4 h-4 text-zinc-400 group-hover:text-[#a855f7] transition-colors" />
                <span>Instagram (@bau.interactive)</span>
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors group"
              >
                <FacebookIcon className="w-4 h-4 text-zinc-400 group-hover:text-[#a855f7] transition-colors" />
                <span>Facebook Oficial</span>
              </a>
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors group"
              >
                <TikTokIcon className="w-4 h-4 text-zinc-400 group-hover:text-[#a855f7] transition-colors" />
                <span>TikTok (@bau_interactive)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Barra inferior: Legales y Copyright */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            &copy; {currentYear} BAu Interactive. Todos los derechos reservados.
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <CookiePreferencesButton />
            <Link href="/privacidad" className="hover:text-zinc-300 transition-colors">
              Privacidad de Datos
            </Link>
            <Link href="/terminos" className="hover:text-zinc-300 transition-colors">
              Términos de Servicio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
