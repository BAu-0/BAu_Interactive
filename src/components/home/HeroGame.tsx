import React from 'react';
import Link from 'next/link';
import { Game } from '@/types/game';
import { Play, MessageSquare, Shield, Sparkles, ExternalLink } from 'lucide-react';

interface HeroGameProps {
  game: Game;
}

export function HeroGame({ game }: HeroGameProps) {
  // Enlaces condicionales: se buscan en los enlaces del juego o variables de entorno
  const betaLink = game.links.find((l) => l.type === 'beta' && l.enabled)?.url ||
    process.env.NEXT_PUBLIC_BETA_URL;
  const feedbackLink = process.env.NEXT_PUBLIC_FEEDBACK_URL || 'https://reddit.com/r/BAuInteractive';

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-24" aria-labelledby="hero-title">
      {/* Luces de fondo ambientales */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-arcade-cyan/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-arcade-purple/20 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Contenido Principal */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Badges de Estado */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-surface-card border border-arcade-cyan/40 shadow-glow-cyan/20">
              <span className="w-2 h-2 rounded-full bg-arcade-cyan animate-ping" />
              <span className="text-xs font-bold uppercase tracking-widest text-arcade-cyan">
                {game.status === 'beta' ? 'Beta Pública Activa' : 'Lanzamiento'}
              </span>
              <span className="text-slate-500 font-mono text-xs">|</span>
              <span className="text-xs font-mono text-slate-300">{game.display_version}</span>
            </div>

            {/* Título de Juego */}
            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-display"
            >
              {game.title}
            </h1>

            {/* Descripción breve de una frase */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              {game.short_description}
            </p>

            {/* Plataformas disponibles reales */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-arcade-green" />
                <span>Disponible en Navegador Web</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-arcade-green" />
                <span>Windows 64-bit</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5 text-arcade-cyan" />
                <span>Top 15 Canónico Integrado</span>
              </div>
            </div>

            {/* Acciones principales (CTAs condicionales) */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {betaLink && (
                <a
                  href={betaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-arcade-cyan to-blue-600 text-slate-950 font-bold text-base shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-arcade-cyan"
                >
                  <Play className="w-5 h-5 fill-slate-950" />
                  <span>Probar la Beta Gratis</span>
                </a>
              )}

              {feedbackLink && (
                <a
                  href={feedbackLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-xl bg-surface-card hover:bg-surface-border text-slate-200 hover:text-white border border-surface-border font-medium text-base transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-arcade-cyan"
                >
                  <MessageSquare className="w-5 h-5 text-orange-400" />
                  <span>Dar Feedback en Reddit</span>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>
              )}
            </div>
          </div>

          {/* Key Art / Representación Gráfica del Juego */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[460px] aspect-[4/3] rounded-2xl border-2 border-surface-border/80 bg-gradient-to-br from-surface-card via-surface to-background p-6 shadow-2xl flex flex-col justify-between overflow-hidden group">
              {/* Rejilla retro-futurista decorativa */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-arcade-cyan border border-arcade-cyan/30 px-2 py-0.5 rounded bg-arcade-cyan/10">
                  ARCADE REAL-TIME ENGINE
                </span>
                <span className="text-[10px] font-mono text-slate-400">60 FPS LOCKED</span>
              </div>

              {/* Arte conceptual centrado */}
              <div className="relative z-10 my-auto text-center space-y-3 py-6">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-arcade-cyan via-arcade-purple to-arcade-pink p-0.5 shadow-glow-cyan group-hover:scale-110 transition-transform duration-500">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-arcade-cyan" />
                  </div>
                </div>
                <h3 className="text-xl font-bold tracking-wider text-white">AETHER DRIFT</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Vórtices cinéticos, reflejos hipercalibrados y sintetizadores dinámicos.
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between pt-4 border-t border-surface-border text-xs text-slate-400 font-mono">
                <span>VERSIÓN {game.display_version}</span>
                <Link
                  href={`/juegos/${game.slug}`}
                  className="text-arcade-cyan hover:underline flex items-center space-x-1"
                >
                  <span>Ver Ficha Técnica</span>
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
