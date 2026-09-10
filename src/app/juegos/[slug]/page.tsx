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
    <div className="space-y-20 pb-24 bg-obsidian">
      {/* Hero de Ficha de Juego */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-surface-base border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded bg-surface-elevated border border-border-subtle text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-razer shadow-[0_0_8px_#00ff55]" />
                <span className="text-accent-razer font-semibold uppercase tracking-wider">
                  STATUS: {game.status.toUpperCase()} V{game.display_version}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-text-primary uppercase font-display">
                {game.title}
              </h1>

              <p className="text-base text-text-muted leading-relaxed font-sans">
                {game.full_description}
              </p>

              {/* Botones de acción directos */}
              <div className="flex flex-wrap gap-3.5 pt-2">
                {betaLink && (
                  <a
                    href={betaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-md bg-accent-razer hover:bg-accent-razer-hover text-obsidian font-bold text-xs font-mono uppercase tracking-wider shadow-razer-sm hover:shadow-razer-md transition-all ease-fluent"
                  >
                    <Play className="w-4 h-4 fill-obsidian" />
                    <span>Jugar Beta en Navegador</span>
                  </a>
                )}

                {feedbackLink && (
                  <a
                    href={feedbackLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-md bg-surface-elevated hover:bg-surface-card text-accent-titanium hover:text-white border border-border-subtle text-xs font-mono uppercase tracking-wider transition-all ease-fluent"
                  >
                    <MessageSquare className="w-4 h-4 text-text-muted" />
                    <span>Canal de Feedback</span>
                  </a>
                )}
              </div>
            </div>

            {/* Ficha Resumen de Ingeniería */}
            <div className="lg:col-span-5 bg-surface-card rounded-lg border border-border-subtle p-6 space-y-4 shadow-fluent-elevated">
              <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-razer border-b border-border-subtle pb-3">
                ESPECIFICACIONES DE TÍTULO
              </h2>
              <dl className="divide-y divide-border-subtle/50 text-xs font-mono space-y-2.5">
                <div className="flex justify-between pt-2">
                  <dt className="text-text-muted">GÉNERO:</dt>
                  <dd className="font-semibold text-text-primary">ARCADE INERCIAL / SURVIVAL</dd>
                </div>
                <div className="flex justify-between pt-2">
                  <dt className="text-text-muted">ESTADO:</dt>
                  <dd className="font-semibold text-accent-razer">BETA PÚBLICA</dd>
                </div>
                <div className="flex justify-between pt-2">
                  <dt className="text-text-muted">BUILD:</dt>
                  <dd className="text-text-secondary">{game.display_version}</dd>
                </div>
                <div className="flex justify-between pt-2">
                  <dt className="text-text-muted">MÉTRICA TELEMETRÍA:</dt>
                  <dd className="text-accent-titanium">MAYOR PUNTUACIÓN (1 MARCA/USER)</dd>
                </div>
                <div className="flex justify-between pt-2">
                  <dt className="text-text-muted">ENTORNOS:</dt>
                  <dd className="text-text-secondary">WEB CANVAS / WINDOWS PC</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Características Clave */}
      {game.features && game.features.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent-razer mb-2 block">
            MECÁNICAS DETERMINISTAS
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary uppercase font-display mb-6">
            Parámetros de Ejecución
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {game.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start space-x-3 p-4 rounded-md bg-surface-card border border-border-subtle"
              >
                <CheckCircle className="w-4 h-4 text-accent-razer shrink-0 mt-0.5" />
                <span className="text-xs text-text-secondary font-sans leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Adelanto del Top 15 del Juego */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent-razer mb-1 block">
              CANONICAL_TELEMETRY // {game.title.toUpperCase()}
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-text-primary uppercase font-display">
              Top 5 Canónico
            </h2>
          </div>

          <Link
            href="/clasificacion"
            className="inline-flex items-center space-x-1.5 text-xs font-mono uppercase text-text-secondary hover:text-accent-razer transition-colors group"
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
          <div className="flex items-center space-x-2 text-accent-razer mb-4">
            <Monitor className="w-4 h-4" />
            <h2 className="text-lg font-mono font-bold uppercase text-text-primary">
              Requisitos de Hardware
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {game.system_requirements.map((req, i) => (
              <div
                key={i}
                className="p-5 rounded-md bg-surface-card border border-border-subtle space-y-3 font-mono text-xs"
              >
                <h3 className="font-bold text-text-primary border-b border-border-subtle pb-2 uppercase tracking-wide">
                  {req.platform}
                </h3>
                <div className="space-y-1.5 text-[11px]">
                  <p>
                    <strong className="text-text-muted">MÍNIMO: </strong>
                    <span className="text-text-secondary">{req.minimum}</span>
                  </p>
                  <p>
                    <strong className="text-text-muted">RECOMENDADO: </strong>
                    <span className="text-text-secondary">{req.recommended}</span>
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
          <h2 className="text-xl font-bold tracking-tight text-text-primary uppercase font-display mb-6">
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
