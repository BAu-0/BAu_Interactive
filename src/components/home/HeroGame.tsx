import React from 'react';
import Link from 'next/link';
import { Game } from '@/types/game';
import { Play, MessageSquare, ExternalLink, ShieldCheck, Terminal, Cpu } from 'lucide-react';

interface HeroGameProps {
  game: Game;
}

export function HeroGame({ game }: HeroGameProps) {
  const betaLink =
    game.links.find((l) => l.type === 'beta' && l.enabled)?.url ||
    process.env.NEXT_PUBLIC_BETA_URL;
  const feedbackLink =
    process.env.NEXT_PUBLIC_FEEDBACK_URL || 'https://reddit.com/r/BAuInteractive';

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:py-28 bg-obsidian border-b border-border-subtle" aria-labelledby="hero-title">
      {/* Luz cenital ambiental fría ultra-atenuada (Razer Chroma Ambient) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[280px] bg-accent-razer/[0.04] blur-[140px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Columna Izquierda: Información de Ingeniería */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Píldora HUD de Estado */}
            <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded bg-surface-elevated border border-border-subtle text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-razer shadow-[0_0_8px_#00ff55]" />
              <span className="text-accent-razer font-semibold uppercase tracking-wider">
                {game.status === 'beta' ? 'BETA V' + game.display_version : 'RELEASE'}
              </span>
              <span className="text-border-hover">/</span>
              <span className="text-text-muted">PUBLIC ACCESS</span>
            </div>

            {/* Título de Impacto */}
            <h1
              id="hero-title"
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase font-display"
            >
              {game.title}
            </h1>

            {/* Descripción Sobria */}
            <p className="text-base sm:text-lg text-text-muted max-w-xl font-normal leading-relaxed mx-auto lg:mx-0">
              {game.short_description}
            </p>

            {/* Ficha técnica rápida estilo consola */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-mono text-text-muted pt-2 border-t border-border-subtle/80">
              <div className="flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5 text-accent-titanium" />
                <span>ENGINE: <strong className="text-text-secondary font-medium">CANVAS/WASM</strong></span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Terminal className="w-3.5 h-3.5 text-accent-titanium" />
                <span>TARGET: <strong className="text-text-secondary font-medium">60 FPS LOCKED</strong></span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-accent-razer" />
                <span>TELEMETRY: <strong className="text-accent-razer font-medium">VERIFIED</strong></span>
              </div>
            </div>

            {/* Acciones Principales (Razer Action + Microsoft Fluent) */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              {betaLink && (
                <a
                  href={betaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-md bg-accent-razer hover:bg-accent-razer-hover text-obsidian font-bold text-xs font-mono tracking-wider uppercase shadow-razer-sm hover:shadow-razer-md active:scale-[0.98] transition-all duration-150 ease-fluent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-razer"
                >
                  <Play className="w-4 h-4 fill-obsidian" />
                  <span>Jugar Beta en Navegador</span>
                </a>
              )}

              {feedbackLink && (
                <a
                  href={feedbackLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-md bg-surface-elevated/90 hover:bg-surface-card text-accent-titanium hover:text-white border border-border-subtle hover:border-border-hover shadow-fluent-rest text-xs font-mono tracking-wide uppercase transition-all duration-150 ease-fluent focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-razer"
                >
                  <MessageSquare className="w-4 h-4 text-text-muted" />
                  <span>Reportar Feedback</span>
                  <ExternalLink className="w-3.5 h-3.5 text-text-muted ml-0.5" />
                </a>
              )}
            </div>
          </div>

          {/* Columna Derecha: Key Art 16:9 Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full aspect-video rounded-lg border border-border-subtle bg-surface-card shadow-fluent-elevated overflow-hidden group">
              {/* Rejilla milimétrica sutil */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:32px_32px] opacity-25 pointer-events-none" />

              {/* HUD Superior */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-text-muted z-10">
                <span className="px-2 py-0.5 rounded bg-surface-base/90 border border-border-subtle text-text-secondary">
                  CANVAS_RENDER // HIGH PERFORMANCE
                </span>
                <span className="text-accent-razer font-semibold">ONLINE</span>
              </div>

              {/* Centro Gráfico */}
              <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-3 relative z-10">
                <div className="w-14 h-14 rounded border border-border-hover bg-surface-elevated flex items-center justify-center text-accent-razer shadow-fluent-hairline group-hover:border-accent-razer transition-colors">
                  <Play className="w-6 h-6 fill-accent-razer/20 text-accent-razer ml-0.5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary tracking-wide uppercase font-display">
                    {game.title}
                  </h3>
                  <p className="text-xs font-mono text-text-muted mt-1">
                    INERTIAL DRIFT PHYSICS // 60 FPS
                  </p>
                </div>
              </div>

              {/* HUD Inferior */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-text-muted z-10 pt-2 border-t border-border-subtle/60">
                <span>VERSION {game.display_version}</span>
                <Link
                  href={`/juegos/${game.slug}`}
                  className="text-text-secondary hover:text-accent-razer transition-colors flex items-center space-x-1"
                >
                  <span>ESPECIFICACIONES</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
