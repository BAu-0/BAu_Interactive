import React from 'react';
import { ArrowRight } from 'lucide-react';
import { GithubIcon, DiscordIcon } from '@/components/icons/BrandIcons';

export function CommunitySection() {
  const redditUrl = process.env.NEXT_PUBLIC_FEEDBACK_URL || 'https://reddit.com/r/BAuInteractive';
  const discordUrl = process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/bauinteractive';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/BAu-0/BAu_Interactive';

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="community-title">
      <div className="rounded-xl bg-black text-white border border-zinc-800 p-8 md:p-12 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#00ff55]">
            <span className="w-2 h-2 rounded-full bg-[#00ff55] shadow-[0_0_8px_#00ff55]" />
            <span>Desarrollo Abierto & Comunidad</span>
          </div>

          <h2 id="community-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
            Tu telemetría da forma a las actualizaciones
          </h2>

          <p className="text-sm text-zinc-400 leading-relaxed font-sans pb-2">
            Construimos nuestros títulos con comunicación abierta. Si probaste la beta de Aether Drift y detectas descalibración de físicas, latencia en algún navegador o tienes sugerencias de obstáculos, nuestro equipo revisa directamente los canales comunitarios oficiales.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Reddit */}
            <a
              href={redditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-[#00ff55]/50 transition-all duration-150 group"
            >
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-[#00ff55] transition-colors">
                  Reddit
                </h3>
                <p className="text-xs text-zinc-400">Hilo de feedback</p>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 group-hover:text-[#00ff55] transition-all" />
            </a>

            {/* Discord */}
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-[#00ff55]/50 transition-all duration-150 group"
            >
              <div className="flex items-center space-x-3">
                <DiscordIcon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#00ff55] transition-colors">
                    Discord
                  </h3>
                  <p className="text-xs text-zinc-400">Chat & soporte</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 group-hover:text-[#00ff55] transition-all" />
            </a>

            {/* GitHub */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-[#00ff55]/50 transition-all duration-150 group"
            >
              <div className="flex items-center space-x-3">
                <GithubIcon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#00ff55] transition-colors">
                    GitHub
                  </h3>
                  <p className="text-xs text-zinc-400">Código fuente</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 group-hover:text-[#00ff55] transition-all" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
