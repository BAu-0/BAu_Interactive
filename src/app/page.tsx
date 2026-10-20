import React from 'react';
import Link from 'next/link';
import { getFeaturedGame, getLeaderboard, getNewsPosts } from '@/lib/data/api';
import { HeroGame } from '@/components/home/HeroGame';
import { GameFeatures } from '@/components/home/GameFeatures';
import { GameGallery } from '@/components/home/GameGallery';
import { CommunitySection } from '@/components/home/CommunitySection';
import { LiveLeaderboard } from '@/components/leaderboard/LiveLeaderboard';
import { NewsCard } from '@/components/news/NewsCard';
import { ArrowRight } from 'lucide-react';

export const revalidate = 60; // Revalidar contenido cada 60 segundos (ISR)

export default async function HomePage() {
  const [featuredGame, initialLeaderboard, latestNews] = await Promise.all([
    getFeaturedGame(),
    getLeaderboard('pok-tschack', 5),
    getNewsPosts(),
  ]);

  const recentNews = latestNews.slice(0, 3);

  return (
    <div className="space-y-16 pb-20 bg-white">
      {/* 1. Hero del Juego Destacado */}
      <HeroGame game={featuredGame} />

      {/* 2. Marcas y Clasificación (Top 15) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="leaderboard-preview-title">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#7e22ce] mb-2 block">
              Telemetría de Juego // Marcas de Cancha
            </span>
            <h2 id="leaderboard-preview-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 uppercase font-sans">
              Top 15 de Puntuaciones
            </h2>
          </div>

          <Link
            href="/clasificacion"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-700 hover:text-[#7e22ce] transition-colors group"
          >
            <span>Ver tabla completa (Top 15)</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <LiveLeaderboard
          initialEntries={initialLeaderboard}
          gameSlug="pok-tschack"
          limit={5}
          showVerificationNote={true}
        />
      </section>

      {/* 3. Pilares de Jugabilidad y Mecánicas */}
      <GameFeatures />

      {/* 4. Dinámica de Cancha y Criaturas */}
      <GameGallery />

      {/* 5. Novedades y Devlogs del Estudio */}
      {recentNews.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-labelledby="news-preview-title">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#7e22ce] mb-2 block">
                Devlogs // Desarrollo
              </span>
              <h2 id="news-preview-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 uppercase font-sans">
                Novedades y Actualizaciones
              </h2>
            </div>

            <Link
              href="/novedades"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-700 hover:text-[#7e22ce] transition-colors group"
            >
              <span>Ver archivo completo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentNews.map((post) => (
              <NewsCard key={post.slug} post={post} compact={true} />
            ))}
          </div>
        </section>
      )}

      {/* 6. Comunidad y Feedback */}
      <CommunitySection />
    </div>
  );
}
