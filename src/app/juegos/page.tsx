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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12 bg-obsidian">
      <div className="max-w-2xl">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent-razer mb-2 block">
          CATÁLOGO // DESARROLLO INTERNO
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-text-primary uppercase font-display mb-4">
          Producciones Oficiales
        </h1>
        <p className="text-sm text-text-muted leading-relaxed font-sans">
          Títulos independientes diseñados para competición de alta precisión, control inercial directo y rendimiento garantizado a 60 FPS+.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <article
            key={game.slug}
            className="rounded-lg bg-surface-card border border-border-subtle hover:border-border-hover transition-all duration-200 overflow-hidden shadow-fluent-rest flex flex-col justify-between group"
          >
            {/* Cabecera 16:9 Widescreen */}
            <div className="aspect-video bg-surface-elevated relative border-b border-border-subtle p-5 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between z-10">
                <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-surface-base border border-border-subtle text-accent-razer font-semibold">
                  {game.status === 'beta' ? 'BETA V' + game.display_version : 'RELEASE'}
                </span>
                <span className="text-[10px] font-mono text-text-muted">60 FPS ENGINE</span>
              </div>

              <div className="my-auto text-center py-2">
                <div className="w-10 h-10 mx-auto rounded border border-border-subtle bg-surface-base flex items-center justify-center text-accent-razer mb-2 group-hover:border-accent-razer/50 transition-colors">
                  <Play className="w-4 h-4 fill-accent-razer/20 text-accent-razer ml-0.5" />
                </div>
                <h2 className="text-lg font-bold text-text-primary uppercase tracking-wide font-display group-hover:text-white transition-colors">
                  {game.title}
                </h2>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-text-muted pt-2 border-t border-border-subtle/50">
                <span>INERTIAL ARCADE</span>
                <span>PC // WEB</span>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs text-text-muted leading-relaxed line-clamp-2 font-sans">
                {game.short_description}
              </p>

              <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
                <Link
                  href={`/juegos/${game.slug}`}
                  className="inline-flex items-center space-x-1.5 font-mono font-semibold text-text-secondary hover:text-accent-razer transition-colors"
                >
                  <span>ESPECIFICACIONES</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href="/clasificacion"
                  className="font-mono text-[11px] text-text-muted hover:text-white transition-colors"
                >
                  TELEMETRÍA &rarr;
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
