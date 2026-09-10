import Link from 'next/link';
import { MessageSquare, Mail, Shield } from 'lucide-react';
import { GithubIcon, DiscordIcon } from '@/components/icons/BrandIcons';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'soporte@bauinteractive.com';
  const redditUrl = process.env.NEXT_PUBLIC_FEEDBACK_URL || 'https://reddit.com/r/BAuInteractive';
  const discordUrl = process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/bauinteractive';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/BAu-0/BAu_Interactive';

  return (
    <footer className="bg-surface border-t border-surface-border mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Columna 1: Estudio */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-arcade-cyan to-arcade-purple flex items-center justify-center font-bold text-slate-950 text-sm">
                BAu
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                BAu Interactive
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Estudio de desarrollo de videojuegos independiente. Creamos experiencias mecánicamente
              exigentes, transparentes con la comunidad y centradas en la habilidad del jugador.
            </p>
            {supportEmail && (
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Mail className="w-4 h-4 text-arcade-cyan" />
                <span>Contacto directo: </span>
                <a
                  href={`mailto:${supportEmail}`}
                  className="text-arcade-cyan hover:underline"
                >
                  {supportEmail}
                </a>
              </div>
            )}
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Explorar
            </h2>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-arcade-cyan transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/juegos/aether-drift" className="hover:text-arcade-cyan transition-colors">
                  Aether Drift (Beta)
                </Link>
              </li>
              <li>
                <Link href="/clasificacion" className="hover:text-arcade-cyan transition-colors">
                  Top 15 Mundial
                </Link>
              </li>
              <li>
                <Link href="/novedades" className="hover:text-arcade-cyan transition-colors">
                  Novedades y Devlogs
                </Link>
              </li>
              <li>
                <Link href="/acerca" className="hover:text-arcade-cyan transition-colors">
                  Acerca del Estudio
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Comunidad y Redes */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Comunidad
            </h2>
            <div className="flex flex-col space-y-3">
              {redditUrl && (
                <a
                  href={redditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-sm text-slate-400 hover:text-white group"
                >
                  <MessageSquare className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
                  <span>Reddit (Feedback)</span>
                </a>
              )}
              {discordUrl && (
                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-sm text-slate-400 hover:text-white group"
                >
                  <DiscordIcon className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                  <span>Discord</span>
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-sm text-slate-400 hover:text-white group"
                >
                  <GithubIcon className="w-4 h-4 text-slate-300 group-hover:scale-110 transition-transform" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Barra inferior: Legales y Copyright */}
        <div className="pt-8 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {currentYear} BAu Interactive. Todos los derechos reservados.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacidad" className="hover:text-slate-300 transition-colors">
              Privacidad de Datos
            </Link>
            <Link href="/terminos" className="hover:text-slate-300 transition-colors">
              Términos de Servicio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
