import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getGameBySlug, getNewsPosts } from '@/lib/data/api';
import { NewsCard } from '@/components/news/NewsCard';
import { GameDetailHero } from '@/components/games/GameDetailHero';
import { TrailerSection } from '@/components/media/TrailerSection';
import { GameFeatures } from '@/components/home/GameFeatures';
import { Play, ArrowRight, ShieldCheck } from 'lucide-react';
import { DiscordIcon, InstagramIcon, FacebookIcon, TikTokIcon } from '@/components/icons/BrandIcons';
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

      {/* 3. Vitrina de Jugabilidad y Dinámica de Cancha */}
      <GameFeatures />

      {/* 4. Requisitos de Sistema y Plataformas */}
      <section
        className="py-20 lg:py-24 bg-zinc-950 text-white border-b border-zinc-800"
        aria-labelledby="sysreq-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tarjeta 1: Web */}
            <div className="p-6 sm:p-8 rounded-xl bg-black border border-zinc-800 space-y-4 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
                  <h3 className="font-bold text-base text-white uppercase tracking-wider font-sans">
                    Navegador Web (PC / Móvil)
                  </h3>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-zinc-900 border border-zinc-700 text-[#a855f7]">
                    DISPONIBLE EN BETA
                  </span>
                </div>

                <div className="space-y-3 text-sm text-zinc-300 leading-relaxed font-sans">
                  <p>
                    Durante la fase actual de pruebas y retroalimentación, Pok-Tschack se juega directamente desde tu navegador web sin descargas previas ni instalaciones.
                  </p>
                  <p className="text-zinc-400 text-xs">
                    El acceso en web es temporal y exclusivo para esta etapa de pruebas con la comunidad, permitiéndonos calibrar la dificultad y mecánicas de la cancha.
                  </p>
                </div>
              </div>
            </div>

            {/* Tarjeta 2: Móviles */}
            <div className="p-6 sm:p-8 rounded-xl bg-black border border-zinc-800 space-y-4 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
                  <h3 className="font-bold text-base text-white uppercase tracking-wider font-sans">
                    Móviles (Android & iOS)
                  </h3>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-zinc-900 border border-zinc-700 text-zinc-400">
                    PRÓXIMAMENTE
                  </span>
                </div>

                <div className="space-y-3 text-sm text-zinc-300 leading-relaxed font-sans">
                  <p>
                    Pok-Tschack está concebido y diseñado desde su origen para vivirse como una experiencia ágil y táctil en teléfonos móviles.
                  </p>
                  <p className="text-zinc-400 text-xs">
                    En cuanto concluya la etapa de beta pública, la versión final estará disponible exclusivamente mediante descarga oficial en Google Play Store y Apple App Store.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Comunidad, Redes Oficiales y Canal de Feedback */}
      <section
        id="comunidad"
        className="py-20 lg:py-24 bg-black text-white border-b border-zinc-800 scroll-mt-16"
        aria-labelledby="community-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#a855f7] mb-2 block font-sans">
              Desarrollo Independiente & Comunidad
            </span>
            <h2
              id="community-title"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-sans mb-3"
            >
              Tu experiencia ayuda a pulir el juego
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
              Tus impresiones y comentarios tras probar la beta de Pok-Tschack son directos para la evolución del juego. Comparte tus partidas, retos superados o cualquier sugerencia para seguir puliendo la experiencia en nuestro servidor oficial de Discord y redes del estudio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Discord - Canal Principal */}
            <a
              href="https://discord.gg/BTNA7EEQG"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-zinc-950 border border-[#a855f7]/50 hover:border-[#a855f7] hover:shadow-xl hover:shadow-purple-950/30 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/80 flex items-center justify-center text-[#a855f7] group-hover:scale-105 transition-transform">
                  <DiscordIcon className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#a855f7] block mb-1">
                    CANAL PRINCIPAL DE FEEDBACK
                  </span>
                  <h3 className="text-lg font-bold text-white uppercase font-sans">
                    Discord Oficial
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Foro de discusión, reporte de bugs, balance de juego y noticias directas del estudio.
                </p>
              </div>
              <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-bold uppercase text-[#a855f7] group-hover:translate-x-0.5 transition-transform">
                <span>Unirse al Discord</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/bau.interactive/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-600 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:scale-105 transition-all">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                    RED SOCIAL
                  </span>
                  <h3 className="text-lg font-bold text-white uppercase font-sans">
                    Instagram
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Síguenos en nuestras redes para ver nuestro contenido y que no te pierdas de las últimas noticias.
                </p>
              </div>
              <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-bold uppercase text-zinc-300 group-hover:text-white transition-colors">
                <span>Ver Perfil</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61595454786065&locale=es_LA"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-600 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:scale-105 transition-all">
                  <FacebookIcon className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                    COMUNIDAD
                  </span>
                  <h3 className="text-lg font-bold text-white uppercase font-sans">
                    Facebook
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Síguenos en nuestras redes para ver nuestro contenido y que no te pierdas de las últimas noticias.
                </p>
              </div>
              <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-bold uppercase text-zinc-300 group-hover:text-white transition-colors">
                <span>Seguir Página</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@bau_interactive"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-600 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:scale-105 transition-all">
                  <TikTokIcon className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                    CONTENIDO CORTO
                  </span>
                  <h3 className="text-lg font-bold text-white uppercase font-sans">
                    TikTok
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Síguenos en nuestras redes para ver nuestro contenido y que no te pierdas de las últimas noticias.
                </p>
              </div>
              <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-bold uppercase text-zinc-300 group-hover:text-white transition-colors">
                <span>Ver Videos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 6. Novedades y Bitácoras Específicas de Pok-Tschack */}
      {relatedNews.length > 0 && (
        <section
          className="py-20 lg:py-24 bg-zinc-950 text-white border-b border-zinc-800"
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

      {/* 7. Barra Final de Acción */}
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
            Disponible para jugar directamente en navegador web durante esta fase beta. Próximamente lanzamiento final en Android e iOS.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={betaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 h-12 rounded-lg bg-[#9333ea] hover:bg-[#7e22ce] text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-purple-950/40 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98]"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              <span>START</span>
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
