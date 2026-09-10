import React from 'react';
import Link from 'next/link';
import { getFeaturedGame, getLeaderboard, getNewsPosts } from '@/lib/data/api';
import { HeroGame } from '@/components/home/HeroGame';
import { GameFeatures } from '@/components/home/GameFeatures';
import { GameGallery } from '@/components/home/GameGallery';
import { CommunitySection } from '@/components/home/CommunitySection';
import { LiveLeaderboard } from '@/components/leaderboard/LiveLeaderboard';
import { NewsCard } from '@/components/news/NewsCard';
import { Trophy, ArrowRight, Newspaper } from 'lucide-react';

export const revalidate = 60; // Revalidar contenido cada 60 segundos (ISR)

export default async function HomePage() {
  const [featuredGame, initialLeaderboard, latestNews] = await Promise.all([
    getFeaturedGame(),
    getLeaderboard('aether-drift', 5), // Adelanto de 5 puestos en portada
    getNewsPosts(),
  ]);

  const recentNews = latestNews.slice(0, 3);

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero del Juego Destacado */}
      <HeroGame game={featuredGame} />

      {/* 2. Adelanto del Top 15 Mundial */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="leaderboard-preview-title">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-arcade-gold mb-1.5">
              <Trophy className="w-3.5 h-3.5 fill-arcade-gold" />
              <span>Competencia Global Canónica</span>
            </div>
            <h2 id="leaderboard-preview-title" className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Adelanto del Top 15 Mundial
            </h2>
          </div>

          <Link
            href="/clasificacion"
            className="inline-flex items-center space-x-1.5 text-sm font-semibold text-arcade-cyan hover:text-white transition-colors group"
          >
            <span>Ver tabla completa (Top 15)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Componente reactivo con polling inteligente */}
        <LiveLeaderboard
          initialEntries={initialLeaderboard}
          gameSlug="aether-drift"
          limit={5}
          showVerificationNote={true}
        />
      </section>

      {/* 3. Características y Mecánicas */}
      <GameFeatures />

      {/* 4. Galería de Capturas */}
      <GameGallery />

      {/* 5. Novedades y Devlogs Recientes */}
      {recentNews.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-labelledby="news-preview-title">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-arcade-cyan mb-1.5">
                <Newspaper className="w-3.5 h-3.5" />
                <span>Bitácora de Desarrollo</span>
              </div>
              <h2 id="news-preview-title" className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Últimas Actualizaciones
              </h2>
            </div>

            <Link
              href="/novedades"
              className="inline-flex items-center space-x-1.5 text-sm font-semibold text-arcade-cyan hover:text-white transition-colors group"
            >
              <span>Ver todas las noticias</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
