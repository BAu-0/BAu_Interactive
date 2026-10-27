import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllGames } from '@/lib/data/api';
import { ArrowRight, Play } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catálogo de Juegos',
  description: 'Títulos y proyectos desarrollados por BAu Interactive.',
};

export default async function GamesPage() {
  const games = await getAllGames();

  return (
    <div className="w-full bg-black text-white min-h-[calc(100vh-4rem)] font-sans border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-12">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#a855f7] mb-2 block">
            Catálogo // Títulos
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white uppercase mb-4">
            Producciones
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
            Videojuegos independientes enfocados en reto auténtico, creatividad original y diversión sin concesiones.
          </p>
        </div>

        {/* Cuadrícula de Producciones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {games.map((game) => {
            const betaLink =
              game.links?.find((l) => l.type === 'beta' || l.type === 'itch')?.url ||
              process.env.NEXT_PUBLIC_BETA_URL ||
              'https://garanda.itch.io/pok-tschack-betav1';

            return (
              <article
                key={game.slug}
                className="group relative rounded-2xl bg-black border border-zinc-800/80 hover:border-[#a855f7]/60 overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Cabecera con Video MP4 de Gameplay Real y Logo Flotante */}
                <div className="relative w-full aspect-[16/9] bg-zinc-950 overflow-hidden border-b border-zinc-800">
                  <video
                    src="/videos/pok-tschack-preview.mp4"
                    poster={game.hero_image_path || '/images/pok-tschack/pok-tschack-title-logo.png'}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-hidden="true"
                    tabIndex={-1}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent pointer-events-none" />

                  {/* Logo Oficial de Pok-Tschack Flotante */}
                  <div className="absolute bottom-4 left-6 right-6 pointer-events-none">
                    <div className="relative w-48 sm:w-56 aspect-[1232/592] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                      <Image
                        src="/images/pok-tschack/pok-tschack-title-logo.png"
                        alt={game.title}
                        fill
                        sizes="224px"
                        className="object-contain object-left"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Contenido Editorial */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-[11px] font-mono text-[#a855f7] font-semibold uppercase tracking-wider block mb-2">
                      ARCADE
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide font-sans mb-3">
                      {game.title}
                    </h2>
                    <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                      Inspirado en el juego de pelota mesoamericano. Calcula trayectorias, atraviesa el
                      aro rotatorio y reinicia el cronómetro en cada anotación limpia para sobrevivir a
                      las criaturas de la cancha.
                    </p>
                  </div>

                  {/* Acciones de la Tarjeta */}
                  <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <Link
                      href={`/juegos/${game.slug}`}
                      className="inline-flex items-center justify-center space-x-2 px-6 h-11 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider border border-zinc-750 hover:border-[#a855f7]/60 transition-colors"
                    >
                      <span>Conoce más</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#a855f7]" />
                    </Link>

                    {betaLink && (
                      <a
                        href={betaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center space-x-2 px-6 h-11 rounded-lg bg-[#9333ea] hover:bg-[#7e22ce] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>START</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}

          {/* Tarjeta de Próxima Producción */}
          <article className="group relative rounded-2xl bg-black border border-zinc-800/80 hover:border-zinc-700 overflow-hidden shadow-xl transition-all duration-200 flex flex-col justify-between">
            {/* Banner con Logo de BAu Interactive sobre fondo oscuro */}
            <div className="relative w-full aspect-[16/9] bg-zinc-950 overflow-hidden border-b border-zinc-800 flex items-center justify-center p-8">
              {/* Trama sutil de fondo */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #a855f7 1px, transparent 1px), linear-gradient(to bottom, #a855f7 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />

              {/* Logo Oficial de BAu Interactive como Imagen Central */}
              <div className="relative w-40 sm:w-52 aspect-[755/581] opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 drop-shadow-[0_4px_24px_rgba(168,85,247,0.2)]">
                <Image
                  src="/images/studio/bau-interactive-logo-tight.png"
                  alt="BAu Interactive - Próxima Producción"
                  fill
                  sizes="208px"
                  className="object-contain object-center"
                />
              </div>
            </div>

            {/* Contenido Editorial */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 font-semibold uppercase tracking-wider block mb-2">
                  PROYECTO EN DESARROLLO
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide font-sans mb-3">
                  Próxima Producción
                </h2>
                <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                  Próximamente un nuevo proyecto.
                </p>
              </div>

              {/* Pie de la Tarjeta */}
              <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>ESTADO: EN DESARROLLO</span>
                <span className="text-zinc-600">// BAu INTERACTIVE</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
