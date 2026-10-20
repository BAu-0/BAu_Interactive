import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import { GithubIcon, DiscordIcon } from '@/components/icons/BrandIcons';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'soporte@bauinteractive.com';
  const redditUrl = process.env.NEXT_PUBLIC_FEEDBACK_URL || 'https://reddit.com/r/BAuInteractive';
  const discordUrl = process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/bauinteractive';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/BAu-0/BAu_Interactive';

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
              Estudio independiente de desarrollo de videojuegos. Diseñado con una arquitectura limpia, física de precisión, estética arcade y transparencia absoluta con la comunidad.
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

          {/* Columna 3: Canales Oficiales */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">
              Comunidad
            </h2>
            <div className="flex flex-col space-y-2.5 text-sm">
              {redditUrl && (
                <a
                  href={redditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-[#a855f7] transition-colors" />
                  <span>Canal de Feedback</span>
                </a>
              )}
              {discordUrl && (
                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors group"
                >
                  <DiscordIcon className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  <span>Discord Oficial</span>
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors group"
                >
                  <GithubIcon className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Barra inferior: Legales y Copyright */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            &copy; {currentYear} BAu Interactive. Todos los derechos reservados.
          </div>
          <div className="flex items-center space-x-6">
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
