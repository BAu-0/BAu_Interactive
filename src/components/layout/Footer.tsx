import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { GithubIcon, DiscordIcon } from '@/components/icons/BrandIcons';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'soporte@bauinteractive.com';
  const redditUrl = process.env.NEXT_PUBLIC_FEEDBACK_URL || 'https://reddit.com/r/BAuInteractive';
  const discordUrl = process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/bauinteractive';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/BAu-0/BAu_Interactive';

  return (
    <footer className="bg-obsidian border-t border-border-subtle mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Columna 1: Estudio e Identidad */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded border border-border-hover bg-surface-elevated flex items-center justify-center font-mono font-bold text-white text-xs tracking-wider">
                BAU
              </div>
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-text-primary">
                BAu Interactive
              </span>
            </div>
            <p className="text-xs text-text-muted max-w-md leading-relaxed font-sans">
              Estudio independiente de ingeniería de videojuegos. Arquitecturas deterministas de alto rendimiento, telemetría competitiva transparente y control inercial de precisión quirúrgica.
            </p>
            {supportEmail && (
              <div className="flex items-center space-x-2 text-xs font-mono text-text-muted pt-1">
                <Mail className="w-3.5 h-3.5 text-accent-razer" />
                <span>SUPPORT:</span>
                <a
                  href={`mailto:${supportEmail}`}
                  className="text-text-secondary hover:text-accent-razer transition-colors"
                >
                  {supportEmail}
                </a>
              </div>
            )}
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div>
            <h2 className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-text-muted mb-4">
              Directorio
            </h2>
            <ul className="space-y-2 text-xs font-mono text-text-muted">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  INICIO
                </Link>
              </li>
              <li>
                <Link href="/juegos/aether-drift" className="hover:text-white transition-colors">
                  AETHER DRIFT (BETA)
                </Link>
              </li>
              <li>
                <Link href="/clasificacion" className="hover:text-white transition-colors">
                  TOP 15 TELEMETRY
                </Link>
              </li>
              <li>
                <Link href="/novedades" className="hover:text-white transition-colors">
                  CHANGELOG & DEVLOGS
                </Link>
              </li>
              <li>
                <Link href="/acerca" className="hover:text-white transition-colors">
                  SISTEMA & MANIFIESTO
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Canales de Comunidad */}
          <div>
            <h2 className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-text-muted mb-4">
              Canales Oficiales
            </h2>
            <div className="flex flex-col space-y-2.5">
              {redditUrl && (
                <a
                  href={redditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs font-mono text-text-muted hover:text-white transition-colors group"
                >
                  <span className="w-1 h-1 rounded-full bg-border-hover group-hover:bg-accent-razer transition-colors" />
                  <span>REDDIT // FEEDBACK</span>
                </a>
              )}
              {discordUrl && (
                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs font-mono text-text-muted hover:text-white transition-colors group"
                >
                  <DiscordIcon className="w-3.5 h-3.5 text-text-muted group-hover:text-white transition-colors" />
                  <span>DISCORD SERVER</span>
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs font-mono text-text-muted hover:text-white transition-colors group"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-text-muted group-hover:text-white transition-colors" />
                  <span>GITHUB SOURCE</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Barra inferior: Legales y Copyright */}
        <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-text-muted">
          <div>
            &copy; {currentYear} BAU INTERACTIVE. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacidad" className="hover:text-text-primary transition-colors">
              PRIVACIDAD
            </Link>
            <Link href="/terminos" className="hover:text-text-primary transition-colors">
              TÉRMINOS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
