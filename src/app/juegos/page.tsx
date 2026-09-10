import React from 'react';
import Link from 'next/link';
import { getAllGames } from '@/lib/data/api';
import { Gamepad2, ArrowRight, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catálogo de Juegos',
  description: 'Explora los títulos desarrollados por BAu Interactive.',
};

export default async function GamesPage() {
  const games = await getAllGames();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="max-w-2xl">
        <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-arcade-cyan mb-2">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Producciones BAu</span>
        </div>
        <h1 className="text-4xl font-black tracking-tight text-white mb-4">
          Catálogo de Videojuegos
        </h1>
        <p className="text-base text-slate-300">
          Proyectos desarrollados internamente con enfoque en mecánicas de habilidad pura, precisión y control inercial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game) => (
          <div
            key={game.slug}
            className="rounded-2xl bg-surface-card border border-surface-border overflow-hidden hover:border-arcade-cyan/50 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between"
          >
            {/* Cabecera visual de la tarjeta */}
            <div className="aspect-[16/9] bg-gradient-to-br from-indigo-950 via-slate-900 to-background p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-arcade-cyan/10 border border-arcade-cyan/30 text-arcade-cyan font-bold">
                  {game.status === 'beta' ? 'BETA PÚBLICA' : 'DISPONIBLE'}
                </span>
                <span className="text-xs font-mono text-slate-400">{game.display_version}</span>
              </div>

              <div className="z-10 text-center py-2">
                <div className="w-12 h-12 mx-auto rounded-xl bg-background/80 flex items-center justify-center text-arcade-cyan mb-2 shadow-glow-cyan/20">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black tracking-wide text-white uppercase">{game.title}</h2>
              </div>

              <div className="z-10 text-[11px] font-mono text-slate-400 border-t border-surface-border/50 pt-2 flex justify-between">
                <span>ARCADE DE PRECISIÓN</span>
                <span>WEB & PC</span>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                {game.short_description}
              </p>

              <div className="pt-4 border-t border-surface-border flex items-center justify-between">
                <Link
                  href={`/juegos/${game.slug}`}
                  className="inline-flex items-center space-x-1.5 text-sm font-bold text-arcade-cyan hover:text-white transition-colors"
                >
                  <span>Ver ficha y jugar</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/clasificacion"
                  className="text-xs text-slate-400 hover:text-slate-200 transition-colors font-mono"
                >
                  Top 15 &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
