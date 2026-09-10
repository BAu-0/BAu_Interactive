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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 bg-white font-sans">
      <div className="max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-widest text-[#00a836] mb-2 block">
          Catálogo // Desarrollo Interno
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-950 uppercase mb-4">
          Producciones Oficiales
        </h1>
        <p className="text-sm text-zinc-600 leading-relaxed font-sans">
          Títulos independientes diseñados para competición de alta precisión, control inercial directo y rendimiento garantizado a 60 FPS+.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <article
            key={game.slug}
            className="rounded-lg bg-white border border-zinc-200 hover:border-zinc-400 transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md flex flex-col justify-between group"
          >
            {/* Cabecera 16:9 Widescreen en marco oscuro */}
            <div className="aspect-video bg-black relative border-b border-zinc-800 p-5 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-[#00ff55]">
                  {game.status === 'beta' ? 'BETA V' + game.display_version : 'LANZAMIENTO'}
                </span>
                <span className="text-xs text-zinc-400">60 FPS ENGINE</span>
              </div>

              <div className="my-auto text-center py-2">
                <div className="w-10 h-10 mx-auto rounded border border-zinc-800 bg-zinc-900 flex items-center justify-center text-[#00ff55] mb-2 group-hover:border-[#00ff55]/60 transition-colors">
                  <Play className="w-4 h-4 fill-[#00ff55] text-[#00ff55] ml-0.5" />
                </div>
                <h2 className="text-lg font-bold text-white uppercase tracking-wide group-hover:text-[#00ff55] transition-colors">
                  {game.title}
                </h2>
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/80">
                <span>ARCADE INERCIAL</span>
                <span>PC // WEB CANVAS</span>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-sm text-zinc-600 leading-relaxed line-clamp-2 font-sans">
                {game.short_description}
              </p>

              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                <Link
                  href={`/juegos/${game.slug}`}
                  className="inline-flex items-center space-x-1.5 font-bold text-zinc-900 hover:text-[#00a836] transition-colors"
                >
                  <span>Especificaciones</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href="/clasificacion"
                  className="text-xs text-zinc-500 hover:text-zinc-900 font-medium transition-colors"
                >
                  Telemetría &rarr;
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
