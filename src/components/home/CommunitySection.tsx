import React from 'react';
import { ArrowRight } from 'lucide-react';
import { GithubIcon, DiscordIcon } from '@/components/icons/BrandIcons';

export function CommunitySection() {
  const redditUrl = process.env.NEXT_PUBLIC_FEEDBACK_URL || 'https://reddit.com/r/BAuInteractive';
  const discordUrl = process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/bauinteractive';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/BAu-0/BAu_Interactive';

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="community-title">
      <div className="rounded-xl bg-surface-card border border-border-subtle p-8 md:p-12 relative overflow-hidden shadow-fluent-elevated">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-accent-razer">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-razer shadow-[0_0_6px_#00ff55]" />
            <span>DESARROLLO ABIERTO & COMUNIDAD</span>
          </div>

          <h2 id="community-title" className="text-3xl sm:text-4xl font-black tracking-tight text-text-primary uppercase font-display">
            Tu telemetría da forma a las actualizaciones
          </h2>

          <p className="text-sm text-text-muted leading-relaxed font-sans pb-4">
            Construimos nuestros títulos con comunicación abierta. Si probaste la beta de Aether Drift y detectas descalibración de físicas, latencia en algún navegador o tienes sugerencias de obstáculos, nuestro equipo revisa directamente los canales comunitarios oficiales.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Reddit */}
            <a
              href={redditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-md bg-surface-elevated border border-border-subtle hover:border-border-hover transition-all duration-150 group"
            >
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary group-hover:text-white transition-colors">
                  Reddit
                </h3>
                <p className="text-[11px] font-mono text-text-muted">HILO DE FEEDBACK</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:translate-x-1 group-hover:text-accent-razer transition-all" />
            </a>

            {/* Discord */}
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-md bg-surface-elevated border border-border-subtle hover:border-border-hover transition-all duration-150 group"
            >
              <div className="flex items-center space-x-3">
                <DiscordIcon className="w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary group-hover:text-white transition-colors">
                    Discord
                  </h3>
                  <p className="text-[11px] font-mono text-text-muted">CHAT & SOPORTE</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:translate-x-1 group-hover:text-accent-razer transition-all" />
            </a>

            {/* GitHub */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-md bg-surface-elevated border border-border-subtle hover:border-border-hover transition-all duration-150 group"
            >
              <div className="flex items-center space-x-3">
                <GithubIcon className="w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary group-hover:text-white transition-colors">
                    GitHub
                  </h3>
                  <p className="text-[11px] font-mono text-text-muted">REPOSITORIO CÓDIGO</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:translate-x-1 group-hover:text-accent-razer transition-all" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
