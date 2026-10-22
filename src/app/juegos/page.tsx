import React from 'react';
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <article
              key={game.slug}
              className="rounded-xl bg-zinc-950 border border-zinc-800 hover:border-[#a855f7]/60 transition-all duration-200 overflow-hidden shadow-xl flex flex-col justify-between group"
            >
              {/* Cabecera en marco oscuro estilo arcade */}
              <div className="aspect-video bg-black relative border-b border-zinc-800 p-5 flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-[#a855f7]">
                    {game.status === 'beta' ? 'BETA ' + game.display_version : 'LANZAMIENTO'}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">ARCADE</span>
                </div>

                <div className="my-auto text-center py-2">
                  <div className="w-10 h-10 mx-auto rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center text-[#a855f7] mb-2 group-hover:border-[#a855f7]/60 transition-colors">
                    <Play className="w-4 h-4 fill-[#a855f7] text-[#a855f7] ml-0.5" />
                  </div>
                  <h2 className="text-lg font-bold text-white uppercase tracking-wide group-hover:text-[#a855f7] transition-colors">
                    {game.title}
                  </h2>
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/80 font-mono">
                  <span>ARCADE 2D</span>
                  <span>WEB // ANDROID</span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 font-sans">
                  {game.short_description}
                </p>

                <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-sans">
                  <Link
                    href={`/juegos/${game.slug}`}
                    className="inline-flex items-center space-x-1.5 font-bold uppercase tracking-wider text-white hover:text-[#a855f7] transition-colors"
                  >
                    <span>Ficha del Juego</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#a855f7] group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <span className="text-xs text-zinc-500 font-medium font-mono">
                    HTML5 // ANDROID
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
