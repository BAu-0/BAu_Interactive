import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getGameBySlug, getLeaderboard, getNewsPosts } from '@/lib/data/api';
import { LiveLeaderboard } from '@/components/leaderboard/LiveLeaderboard';
import { NewsCard } from '@/components/news/NewsCard';
import { Play, MessageSquare, Monitor, CheckCircle, ArrowRight } from 'lucide-react';
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
  const betaLink =
    game.links.find((l) => l.type === 'beta' && l.enabled)?.url ||
    process.env.NEXT_PUBLIC_BETA_URL;
  const feedbackLink =
    process.env.NEXT_PUBLIC_FEEDBACK_URL || 'https://reddit.com/r/BAuInteractive';

  return (
    <div className="space-y-16 pb-24 bg-white font-sans">
      {/* Hero de Ficha de Juego */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded bg-white border border-zinc-200 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#00d647] shadow-[0_0_8px_#00d647]" />
                <span className="text-[#00a836] font-bold uppercase tracking-wider">
                  Estado: {game.status.toUpperCase()} V{game.display_version}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 uppercase">
                {game.title}
              </h1>

              <p className="text-base text-zinc-600 leading-relaxed">
                {game.full_description}
              </p>

              {/* Botones de acción directos */}
              <div className="flex flex-wrap gap-3.5 pt-2">
                {betaLink && (
                  <a
                    href={betaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-md bg-[#00d647] hover:bg-[#00b83c] text-black font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    <span>Jugar Beta en Navegador</span>
                  </a>
                )}

                {feedbackLink && (
                  <a
                    href={feedbackLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-md bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-zinc-300" />
                    <span>Canal de Feedback</span>
                  </a>
                )}
              </div>
            </div>

            {/* Ficha Resumen de Ingeniería */}
            <div className="lg:col-span-5 bg-white rounded-lg border border-zinc-200 p-6 space-y-4 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#00a836] border-b border-zinc-100 pb-3">
                Especificaciones de Título
              </h2>
              <dl className="divide-y divide-zinc-100 text-xs space-y-2.5">
                <div className="flex justify-between pt-2">
                  <dt className="text-zinc-500">Género:</dt>
                  <dd className="font-bold text-zinc-950">Arcade Inercial / Survival</dd>
                </div>
                <div className="flex justify-between pt-2">
                  <dt className="text-zinc-500">Estado:</dt>
                  <dd className="font-bold text-[#00a836]">Beta Pública</dd>
                </div>
                <div className="flex justify-between pt-2">
                  <dt className="text-zinc-500">Compilación:</dt>
                  <dd className="text-zinc-800 font-semibold">{game.display_version}</dd>
                </div>
                <div className="flex justify-between pt-2">
                  <dt className="text-zinc-500">Métrica Telemetría:</dt>
                  <dd className="text-zinc-900 font-semibold">Mayor Puntuación (1 marca/user)</dd>
                </div>
                <div className="flex justify-between pt-2">
                  <dt className="text-zinc-500">Entornos:</dt>
                  <dd className="text-zinc-800">Web Canvas / Windows PC</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Características Clave */}
      {game.features && game.features.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00a836] mb-2 block">
            Mecánicas Deterministas
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950 uppercase mb-6">
            Parámetros de Ejecución
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {game.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start space-x-3 p-4 rounded-lg bg-white border border-zinc-200"
              >
                <CheckCircle className="w-5 h-5 text-[#00a836] shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-700 leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Adelanto del Top 15 del Juego */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#00a836] mb-1 block">
              Telemetría Canónica // {game.title.toUpperCase()}
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 uppercase">
              Top 5 Canónico
            </h2>
          </div>

          <Link
            href="/clasificacion"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase text-zinc-700 hover:text-[#00a836] transition-colors group"
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

      {/* Requisitos de Sistema */}
      {game.system_requirements && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-[#00a836] mb-4">
            <Monitor className="w-5 h-5" />
            <h2 className="text-lg font-bold uppercase text-zinc-950">
              Requisitos de Hardware
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {game.system_requirements.map((req, i) => (
              <div
                key={i}
                className="p-5 rounded-lg bg-white border border-zinc-200 space-y-3 text-xs"
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

      {/* Novedades Relacionadas */}
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
