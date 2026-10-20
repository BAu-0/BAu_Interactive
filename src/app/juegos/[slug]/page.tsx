import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getGameBySlug, getLeaderboard, getNewsPosts } from '@/lib/data/api';
import { LiveLeaderboard } from '@/components/leaderboard/LiveLeaderboard';
import { NewsCard } from '@/components/news/NewsCard';
import { GameDetailHero } from '@/components/games/GameDetailHero';
import { Monitor, CheckCircle, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    return { title: 'Juego no encontrado' };
  }

  return {
    title: `${game.title} (Ficha Técnica)`,
    description: game.short_description,
    openGraph: {
      title: `${game.title} | BAu Interactive`,
      description: game.short_description,
    },
  };
}

export default async function GameDetailPage({ params }: Props) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const [leaderboard, newsPosts] = await Promise.all([
    getLeaderboard(game.slug, 5),
    getNewsPosts(),
  ]);

  const relatedNews = newsPosts.filter((n) => n.game_id === game.id).slice(0, 2);

  return (
    <div className="space-y-16 pb-24 bg-white font-sans">
      {/* 1. Hero Cinematográfico con Video de Fondo, Logo Oficial y Especificaciones */}
      <GameDetailHero game={game} />

      {/* 2. Características Clave y Parámetros */}
      {game.features && game.features.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7e22ce] mb-2 block">
            Mecánicas Deterministas
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 uppercase mb-6">
            Parámetros de Jugabilidad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {game.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start space-x-3 p-4 rounded-lg bg-white border border-zinc-200 shadow-sm"
              >
                <CheckCircle className="w-5 h-5 text-[#7e22ce] shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-700 leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Adelanto del Top 15 del Juego */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#7e22ce] mb-1 block">
              Telemetría Canónica // {game.title.toUpperCase()}
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 uppercase">
              Top 5 de Marcas
            </h2>
          </div>

          <Link
            href="/clasificacion"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase text-zinc-700 hover:text-[#7e22ce] transition-colors group"
          >
            <span>Ver Top 15 completo</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <LiveLeaderboard
          initialEntries={leaderboard}
          gameSlug={game.slug}
          limit={5}
          showVerificationNote={true}
        />
      </section>

      {/* 4. Requisitos de Sistema */}
      {game.system_requirements && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-[#7e22ce] mb-4">
            <Monitor className="w-5 h-5" />
            <h2 className="text-lg font-bold uppercase text-zinc-950">
              Dispositivos y Plataformas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {game.system_requirements.map((req, i) => (
              <div
                key={i}
                className="p-5 rounded-lg bg-white border border-zinc-200 space-y-3 text-xs shadow-sm"
              >
                <h3 className="font-bold text-zinc-950 border-b border-zinc-100 pb-2 uppercase tracking-wide">
                  {req.platform}
                </h3>
                <div className="space-y-1.5 text-xs">
                  <p>
                    <strong className="text-zinc-500">Mínimo: </strong>
                    <span className="text-zinc-800">{req.minimum}</span>
                  </p>
                  <p>
                    <strong className="text-zinc-500">Recomendado: </strong>
                    <span className="text-zinc-800">{req.recommended}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Novedades Relacionadas */}
      {relatedNews.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold tracking-tight text-zinc-950 uppercase mb-6">
            Actualizaciones de {game.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedNews.map((post) => (
              <NewsCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
