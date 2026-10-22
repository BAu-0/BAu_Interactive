import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getGameBySlug, getNewsPosts } from '@/lib/data/api';
import { NewsCard } from '@/components/news/NewsCard';
import { GameDetailHero } from '@/components/games/GameDetailHero';
import { TrailerSection } from '@/components/media/TrailerSection';
import { GameFeatures } from '@/components/home/GameFeatures';
import { Monitor, Play, ArrowRight, ShieldCheck } from 'lucide-react';
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
    title: `${game.title} - Ficha Oficial de Producción`,
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

  const newsPosts = await getNewsPosts();
  const relatedNews = newsPosts.filter((n) => n.game_id === game.id).slice(0, 3);
  const betaLink =
    game.links.find((l) => l.type === 'beta' && l.enabled)?.url ||
    'https://garanda.itch.io/pok-tschack-betav1';

  return (
    <div className="bg-black text-white w-full font-sans">
      {/* 1. Hero Canónico de Pok-Tschack (Ficha Técnica y Video de Fondo) */}
      <GameDetailHero game={game} />

      {/* 2. Trailer Oficial Vertical en Formato Arcade Nativo */}
      <TrailerSection
        title={`Metraje Oficial de ${game.title}`}
        subtitle="Trailer Oficial"
        gameTitle={game.title}
        betaUrl={betaLink}
      />

      {/* 3. Vitrina de Jugabilidad y Dinámica de Cancha (Estilo Bethesda con Sprites Oficiales) */}
      <GameFeatures />

      {/* 4. Requisitos de Sistema y Plataformas */}
      {game.system_requirements && (
        <section
          className="py-20 lg:py-24 bg-zinc-950 text-white border-b border-zinc-800"
          aria-labelledby="sysreq-title"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#a855f7] mb-2 block font-sans">
                  Compatibilidad & Rendimiento
                </span>
                <h2
                  id="sysreq-title"
                  className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-sans"
                >
                  Dispositivos y Plataformas
                </h2>
              </div>

              <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400">
                <Monitor className="w-4 h-4 text-[#a855f7]" />
                <span>PLATAFORMAS // SOPORTE OFICIAL</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {game.system_requirements.map((req, i) => (
                <div
                  key={i}
                  className="p-6 sm:p-7 rounded-xl bg-black border border-zinc-800 space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <h3 className="font-bold text-base text-white uppercase tracking-wider font-sans">
                      {req.platform}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-zinc-900 border border-zinc-700 text-[#a855f7]">
                      DISPONIBLE
                    </span>
                  </div>

                  <div className="space-y-3 text-xs leading-relaxed font-sans">
                    <p className="text-zinc-400">
                      <strong className="text-zinc-200 block mb-0.5 font-mono text-[11px] uppercase tracking-wide">
                        Entorno Mínimo:
                      </strong>
                      {req.minimum}
                    </p>
                    <p className="text-zinc-400">
                      <strong className="text-zinc-200 block mb-0.5 font-mono text-[11px] uppercase tracking-wide">
                        Configuración Recomendada:
                      </strong>
                      {req.recommended}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Novedades y Bitácoras Específicas de Pok-Tschack */}
      {relatedNews.length > 0 && (
        <section
          className="py-20 lg:py-24 bg-black text-white border-b border-zinc-800"
          aria-labelledby="related-news-title"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#a855f7] mb-2 block font-sans">
                  Notas de Desarrollo
                </span>
                <h2
                  id="related-news-title"
                  className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-sans"
                >
                  Actualizaciones de {game.title}
                </h2>
              </div>

              <Link
                href="/novedades"
                className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-[#a855f7] transition-colors group"
              >
                <span>Ver todas las novedades</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedNews.map((post) => (
                <NewsCard key={post.slug} post={post} dark={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Barra Final de Acción */}
      <section className="py-16 bg-zinc-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#a855f7]">
            <ShieldCheck className="w-4 h-4 text-[#a855f7]" />
            <span>BETA PÚBLICA // ACCESO LIBRE</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white font-sans">
            ¿Listo para poner a prueba tu lectura de cancha?
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto font-sans leading-relaxed">
            La beta corre directo en tu navegador web mediante aceleración gráfica HTML5. Sin descargas
            pesadas ni compras integradas.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={betaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 h-12 rounded-lg bg-[#9333ea] hover:bg-[#7e22ce] text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-purple-950/40 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98]"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              <span>Jugar Pok-Tschack en Navegador</span>
            </a>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 h-12 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-sm font-medium border border-zinc-750 hover:border-zinc-500 transition-all"
            >
              <span>Volver a BAu Interactive</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
