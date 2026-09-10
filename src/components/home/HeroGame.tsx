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
    <section className="relative overflow-hidden pt-12 pb-20 lg:py-24 bg-white border-b border-zinc-200" aria-labelledby="hero-title">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Columna Izquierda: Información Principal */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Píldora de Estado */}
            <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded bg-zinc-100 border border-zinc-300 text-xs font-medium text-zinc-800">
              <span className="w-2 h-2 rounded-full bg-[#00d647] shadow-[0_0_6px_#00d647]" />
              <span className="font-semibold uppercase tracking-wider">
                {game.status === 'beta' ? 'BETA V' + game.display_version : 'RELEASE'}
              </span>
              <span className="text-zinc-400">/</span>
              <span className="text-zinc-600">ACCESO PÚBLICO</span>
            </div>

            {/* Título de Impacto en Titillium Web */}
            <h1
              id="hero-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-tight"
            >
              {game.title}
            </h1>

            {/* Descripción Sobria y Legible */}
            <p className="text-base sm:text-lg text-zinc-600 max-w-xl font-normal leading-relaxed mx-auto lg:mx-0">
              {game.short_description}
            </p>

            {/* Ficha técnica rápida */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-medium text-zinc-500 pt-2 border-t border-zinc-200">
              <div className="flex items-center space-x-1.5">
                <Cpu className="w-4 h-4 text-zinc-700" />
                <span>Motor: <strong className="text-zinc-900">Canvas / WASM</strong></span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Terminal className="w-4 h-4 text-zinc-700" />
                <span>Rendimiento: <strong className="text-zinc-900">60 FPS Estables</strong></span>
              </div>
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00d647]" />
                <span>Clasificación: <strong className="text-[#00a836]">Top 15 Verificado</strong></span>
              </div>
            </div>

            {/* Botones de Acción (Verde Razer + Negro Mate) */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              {betaLink && (
                <a
                  href={betaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded bg-[#00d647] hover:bg-[#00b83c] text-black font-bold text-sm uppercase tracking-wider shadow-sm hover:shadow-md active:scale-[0.98] transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                >
                  <Play className="w-4 h-4 fill-black" />
                  <span>Probar la Beta Gratis</span>
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
                  <span>Dar Feedback en Reddit</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400 ml-0.5" />
                </a>
              )}
            </div>
          </div>

          {/* Columna Derecha: Key Art Showcase en Chasis Negro de Contraste */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full aspect-video rounded-lg border border-zinc-800 bg-black text-white shadow-xl overflow-hidden group">
              {/* HUD Superior */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-zinc-400 z-10">
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                  CANVAS 1080P // 60 FPS
                </span>
                <span className="text-[#00ff55] font-semibold">ONLINE</span>
              </div>

              {/* Centro Gráfico */}
              <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-3 relative z-10">
                <div className="w-14 h-14 rounded border border-zinc-700 bg-zinc-900 flex items-center justify-center text-[#00ff55] group-hover:border-[#00ff55] transition-colors">
                  <Play className="w-6 h-6 fill-[#00ff55]/20 text-[#00ff55] ml-0.5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide uppercase">
                    {game.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Supervivencia y velocidad inercial
                  </p>
                </div>
              </div>

              {/* HUD Inferior */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-zinc-400 z-10 pt-2 border-t border-zinc-800">
                <span>VERSIÓN {game.display_version}</span>
                <Link
                  href={`/juegos/${game.slug}`}
                  className="text-zinc-300 hover:text-[#00ff55] transition-colors flex items-center space-x-1"
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
