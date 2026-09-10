import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getGameBySlug, getLeaderboard, getNewsPosts } from '@/lib/data/api';
import { LiveLeaderboard } from '@/components/leaderboard/LiveLeaderboard';
import { NewsCard } from '@/components/news/NewsCard';
import { Play, MessageSquare, Monitor, CheckCircle, Trophy, ArrowRight, ShieldCheck } from 'lucide-react';
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
    title: `${game.title} (Beta Pública)`,
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
  const betaLink = game.links.find((l) => l.type === 'beta' && l.enabled)?.url ||
    process.env.NEXT_PUBLIC_BETA_URL;
  const feedbackLink = process.env.NEXT_PUBLIC_FEEDBACK_URL || 'https://reddit.com/r/BAuInteractive';

  return (
    <div className="space-y-16 pb-20">
      {/* Hero de Ficha de Juego */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-surface/40 border-b border-surface-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-surface-card border border-arcade-cyan/30 text-arcade-cyan text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-arcade-cyan animate-ping" />
                <span>{game.status.toUpperCase()}</span>
                <span>•</span>
                <span>{game.display_version}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-display">
                {game.title}
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed font-normal">
                {game.full_description}
              </p>

              {/* Botones de acción directos */}
              <div className="flex flex-wrap gap-4 pt-2">
                {betaLink && (
                  <a
                    href={betaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-gradient-to-r from-arcade-cyan to-blue-600 text-slate-950 font-bold text-base shadow-glow-cyan hover:scale-[1.02] transition-all"
                  >
                    <Play className="w-5 h-5 fill-slate-950" />
                    <span>Jugar la Beta Gratis</span>
                  </a>
                )}

                {feedbackLink && (
                  <a
                    href={feedbackLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-4 rounded-xl bg-surface-card hover:bg-surface-border text-slate-200 border border-surface-border text-base font-medium transition-all"
                  >
                    <MessageSquare className="w-5 h-5 text-orange-400" />
                    <span>Enviar Feedback</span>
                  </a>
                )}
              </div>
            </div>

            {/* Ficha Resumen */}
            <div className="lg:col-span-5 bg-surface-card rounded-2xl border border-surface-border p-6 space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-arcade-cyan border-b border-surface-border pb-3">
                Datos del Juego
              </h2>
              <dl className="divide-y divide-surface-border/50 text-sm space-y-3">
                <div className="flex justify-between pt-2">
                  <dt className="text-slate-400">Género:</dt>
                  <dd className="font-semibold text-white">Arcade / Supervivencia Inercial</dd>
                </div>
                <div className="flex justify-between pt-2">
                  <dt className="text-slate-400">Estado:</dt>
                  <dd className="font-semibold text-arcade-cyan">Beta Pública</dd>
                </div>
                <div className="flex justify-between pt-2">
                  <dt className="text-slate-400">Versión Actual:</dt>
                  <dd className="font-mono text-slate-300">{game.display_version}</dd>
                </div>
                <div className="flex justify-between pt-2">
                  <dt className="text-slate-400">Métrica del Ranking:</dt>
                  <dd className="font-semibold text-arcade-gold">Mayor Puntuación (1 marca/jugador)</dd>
                </div>
                <div className="flex justify-between pt-2">
                  <dt className="text-slate-400">Plataformas:</dt>
                  <dd className="text-slate-300">Navegador Web / Windows PC</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Características Clave */}
      {game.features && game.features.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
            Puntos Fuertes de Jugabilidad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {game.features.map((feature, i) => (
              <div key={i} className="flex items-start space-x-3 p-4 rounded-xl bg-surface-card border border-surface-border">
                <CheckCircle className="w-5 h-5 text-arcade-cyan shrink-0 mt-0.5" />
                <span className="text-sm text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Adelanto del Top 15 del Juego */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-arcade-gold mb-1.5">
              <Trophy className="w-3.5 h-3.5 fill-arcade-gold" />
              <span>Récords de {game.title}</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Clasificación Canónica (Top 5)
            </h2>
          </div>

          <Link
            href="/clasificacion"
            className="inline-flex items-center space-x-1.5 text-sm font-semibold text-arcade-cyan hover:text-white transition-colors group"
          >
            <span>Ver Top 15 completo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
          <div className="flex items-center space-x-2 text-arcade-cyan mb-4">
            <Monitor className="w-5 h-5" />
            <h2 className="text-xl font-bold text-white">Requisitos del Sistema</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {game.system_requirements.map((req, i) => (
              <div key={i} className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-3">
                <h3 className="text-base font-bold text-white border-b border-surface-border pb-2">
                  {req.platform}
                </h3>
                <div className="text-xs space-y-2">
                  <p>
                    <strong className="text-slate-400">Mínimo: </strong>
                    <span className="text-slate-300">{req.minimum}</span>
                  </p>
                  <p>
                    <strong className="text-slate-400">Recomendado: </strong>
                    <span className="text-slate-300">{req.recommended}</span>
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
          <h2 className="text-2xl font-bold tracking-tight text-white mb-6">
            Actualizaciones y Notas de {game.title}
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
