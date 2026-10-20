import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Game } from '@/types/game';
import { Play, MessageSquare, ExternalLink, ShieldCheck, Terminal, Cpu } from 'lucide-react';

interface HeroGameProps {
  game: Game;
}

export function HeroGame({ game }: HeroGameProps) {
  const betaLink =
    game.links.find((l) => l.type === 'beta' && l.enabled)?.url ||
    'https://garanda.itch.io/pok-tschack-betav1';
  const feedbackLink =
    process.env.NEXT_PUBLIC_FEEDBACK_URL || 'https://reddit.com/r/BAuInteractive';

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:py-24 bg-white border-b border-zinc-200" aria-labelledby="hero-title">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Columna Izquierda: Información Principal */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Píldora de Estado */}
            <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded bg-zinc-100 border border-zinc-300 text-xs font-medium text-zinc-800">
              <span className="w-2 h-2 rounded-full bg-[#00d647] shadow-[0_0_6px_#00d647]" />
              <span className="font-semibold uppercase tracking-wider">
                BETA v1.0 EN ITCH.IO
              </span>
              <span className="text-zinc-400">/</span>
              <span className="text-zinc-600">JUGABLE EN NAVEGADOR</span>
            </div>

            {/* Título de Impacto */}
            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-black leading-tight uppercase font-sans"
            >
              {game.title}
            </h1>

            {/* Premisa del Juego (Sin lema) */}
            <p className="text-base sm:text-lg text-zinc-700 max-w-xl font-normal leading-relaxed mx-auto lg:mx-0">
              {game.short_description}
            </p>

            {/* Ficha técnica rápida */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-medium text-zinc-600 pt-3 border-t border-zinc-200">
              <div className="flex items-center space-x-1.5">
                <Cpu className="w-4 h-4 text-zinc-800" />
                <span>Motor: <strong className="text-zinc-950">Godot Engine (HTML5)</strong></span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Terminal className="w-4 h-4 text-zinc-800" />
                <span>Formato: <strong className="text-zinc-950">Arcade Vertical 2D</strong></span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00a836]" />
                <span>Objetivo: <strong className="text-[#00a836]">Aro Rotatorio & Reloj</strong></span>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              {betaLink && (
                <a
                  href={betaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded bg-[#00d647] hover:bg-[#00b83c] text-black font-bold text-sm uppercase tracking-wider shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  <Play className="w-4 h-4 fill-black" />
                  <span>Jugar la Beta en Navegador</span>
                </a>
              )}

              {feedbackLink && (
                <a
                  href={feedbackLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded bg-black hover:bg-zinc-800 text-white text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  <MessageSquare className="w-4 h-4 text-zinc-300" />
                  <span>Canal de Feedback</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400 ml-0.5" />
                </a>
              )}
            </div>
          </div>

          {/* Columna Derecha: Key Art Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-xl border border-zinc-800 bg-black text-white shadow-2xl overflow-hidden group flex flex-col justify-between p-6">
              {/* HUD Superior */}
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 z-10 border-b border-zinc-800/80 pb-3">
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                  CANCHA // 60 FPS
                </span>
                <span className="text-[#00ff55] font-semibold flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00ff55] animate-pulse" />
                  <span>BETA DISPONIBLE</span>
                </span>
              </div>

              {/* Centro Gráfico: Logo Auténtico de Pok-Tschack */}
              <div className="my-auto flex flex-col items-center justify-center text-center space-y-4 relative z-10 py-4">
                <div className="relative w-64 h-24 sm:w-72 sm:h-28 transition-transform group-hover:scale-105 duration-200">
                  <Image
                    src="/images/pok-tschack/Pok-Tschack!.png"
                    alt="Logo oficial de Pok-Tschack"
                    fill
                    sizes="(max-width: 640px) 256px, 288px"
                    className="object-contain object-center drop-shadow-[0_0_15px_rgba(0,255,85,0.25)]"
                    style={{ imageRendering: 'pixelated' }}
                    priority
                  />
                </div>
                <p className="text-xs text-zinc-400 font-mono tracking-wide max-w-xs">
                  Anota a través del aro rotatorio y renueva el tiempo
                </p>
              </div>

              {/* HUD Inferior */}
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 z-10 pt-3 border-t border-zinc-800/80">
                <span>VERSIÓN v1.0 HTML5</span>
                <Link
                  href={`/juegos/${game.slug}`}
                  className="text-zinc-200 hover:text-[#00ff55] transition-colors flex items-center space-x-1"
                >
                  <span>Ficha Técnica</span>
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
