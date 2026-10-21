import React from 'react';
import Link from 'next/link';
import { getFeaturedGame, getNewsPosts } from '@/lib/data/api';
import { HeroGame } from '@/components/home/HeroGame';
import { TrailerSection } from '@/components/media/TrailerSection';
import { GameFeatures } from '@/components/home/GameFeatures';
import { CommunitySection } from '@/components/home/CommunitySection';
import { NewsCard } from '@/components/news/NewsCard';
import { ArrowRight } from 'lucide-react';

export const revalidate = 60; // Revalidar contenido cada 60 segundos (ISR)

export default async function HomePage() {
  const [featuredGame, latestNews] = await Promise.all([
    getFeaturedGame(),
    getNewsPosts(),
  ]);

  const recentNews = latestNews.slice(0, 3);
  const betaLink =
    featuredGame.links.find((l) => l.type === 'beta' && l.enabled)?.url ||
    'https://garanda.itch.io/pok-tschack-betav1';

  return (
    <div className="bg-black text-white w-full">
      {/* 1. Hero Cinematográfico con Gameplay Horizontal en Pantalla Completa */}
      <HeroGame game={featuredGame} />

      {/* 2. Trailer Oficial Vertical en Lateral (Formato Obsidian Cohesivo) */}
      <TrailerSection
        title="El Ritmo de la Cancha en Acción"
        subtitle="Trailer Oficial"
        gameTitle={featuredGame.title}
        betaUrl={betaLink}
      />

      {/* 3. Características Principales de Jugabilidad (Estilo Bethesda) */}
      <GameFeatures />

      {/* 4. Novedades y Devlogs del Estudio */}
      {recentNews.length > 0 && (
        <section className="py-20 lg:py-24 bg-zinc-950 text-white border-b border-zinc-800" aria-labelledby="news-preview-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#a855f7] mb-2 block font-sans">
                  Devlogs // Desarrollo
                </span>
                <h2 id="news-preview-title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
                  Novedades y Actualizaciones
                </h2>
              </div>

              <Link
                href="/novedades"
                className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-[#a855f7] transition-colors group"
              >
                <span>Ver archivo completo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentNews.map((post) => (
                <NewsCard key={post.slug} post={post} compact={true} dark={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Comunidad y Feedback */}
      <div className="py-20 lg:py-24 bg-black">
        <CommunitySection />
      </div>
    </div>
  );
}
