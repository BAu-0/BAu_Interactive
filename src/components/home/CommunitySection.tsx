import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { GithubIcon, DiscordIcon } from '@/components/icons/BrandIcons';

export function CommunitySection() {
  const feedbackUrl = process.env.NEXT_PUBLIC_FEEDBACK_URL || 'https://garanda.itch.io/pok-tschack-betav1';
  const discordUrl = process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/BTNA7EEQG';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/BAu-0/BAu_Interactive';

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="community-title">
      <div className="rounded-xl bg-black text-white border border-zinc-800 p-8 md:p-12 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#a855f7]">
            <span className="w-2 h-2 rounded-full bg-[#a855f7] shadow-[0_0_8px_#a855f7]" />
            <span>Desarrollo Independiente & Comunidad</span>
          </div>

          <h2 id="community-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
            Tu experiencia ayuda a pulir el juego
          </h2>

          <p className="text-sm text-zinc-400 leading-relaxed font-sans pb-2">
            Tus impresiones y comentarios tras probar la beta de <strong>Pok-Tschack</strong> son directos para la evolución del juego. Comparte tus partidas, retos superados o cualquier sugerencia para seguir puliendo la experiencia.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Feedback en Itch.io / Foro */}
            <a
              href={feedbackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-[#a855f7]/50 transition-all duration-150 group"
            >
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-zinc-400 group-hover:text-[#a855f7] transition-colors" />
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#a855f7] transition-colors">
                    Itch.io
                  </h3>
                  <p className="text-xs text-zinc-400">Comentarios de Beta</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 group-hover:text-[#a855f7] transition-all" />
            </a>

            {/* Discord */}
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-[#a855f7]/50 transition-all duration-150 group"
            >
              <div className="flex items-center space-x-3">
                <DiscordIcon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#a855f7] transition-colors">
                    Discord
                  </h3>
                  <p className="text-xs text-zinc-400">Canal de la comunidad</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 group-hover:text-[#a855f7] transition-all" />
            </a>

            {/* GitHub */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-[#a855f7]/50 transition-all duration-150 group"
            >
              <div className="flex items-center space-x-3">
                <GithubIcon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#a855f7] transition-colors">
                    GitHub
                  </h3>
                  <p className="text-xs text-zinc-400">Repositorio del portal</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 group-hover:text-[#a855f7] transition-all" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
