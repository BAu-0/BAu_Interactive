import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getNewsPostBySlug } from '@/lib/data/api';
import { CategoryBadge } from '@/components/news/CategoryBadge';
import { formatUtcDateTime } from '@/lib/utils/format';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) {
    return { title: 'Publicación no encontrada' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | BAu Interactive`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.published_at,
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const renderParagraphs = (bodyText: string) => {
    return bodyText.split('\n\n').map((block, idx) => {
      if (block.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-lg font-bold text-text-primary uppercase font-display mt-8 mb-3">
            {block.replace('### ', '')}
          </h3>
        );
      }
      if (block.startsWith('- ')) {
        const items = block.split('\n').map((item) => item.replace('- ', ''));
        return (
          <ul key={idx} className="list-disc list-inside space-y-2 text-text-secondary my-4 text-xs font-sans leading-relaxed">
            {items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        );
      }
      if (block.startsWith('1. ')) {
        const items = block.split('\n').map((item) => item.replace(/^\d+\.\s*/, ''));
        return (
          <ol key={idx} className="list-decimal list-inside space-y-2 text-text-secondary my-4 text-xs font-sans leading-relaxed">
            {items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ol>
        );
      }
      return (
        <p key={idx} className="text-text-muted leading-relaxed text-sm my-4 font-sans">
          {block}
        </p>
      );
    });
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-obsidian">
      {/* Botón de regreso */}
      <div className="mb-8">
        <Link
          href="/novedades"
          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-text-muted hover:text-accent-razer transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al Changelog</span>
        </Link>
      </div>

      {/* Encabezado del artículo */}
      <header className="space-y-4 pb-8 border-b border-border-subtle">
        <div className="flex items-center space-x-3">
          <CategoryBadge category={post.category} />
          <span className="text-xs text-border-hover">•</span>
          <span className="text-xs font-mono text-text-muted">
            <time dateTime={post.published_at}>{formatUtcDateTime(post.published_at)}</time>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-text-primary leading-tight uppercase font-display">
          {post.title}
        </h1>

        <div className="text-xs font-mono text-text-muted pt-1">
          <span>AUTHOR: <strong className="text-text-secondary">{post.author_name.toUpperCase()}</strong></span>
        </div>
      </header>

      {/* Resumen destacado */}
      <div className="my-8 p-5 rounded-md bg-surface-card border-l-2 border-accent-razer text-sm text-text-secondary font-sans leading-relaxed">
        {post.excerpt}
      </div>

      {/* Cuerpo del Artículo */}
      <div className="prose prose-invert max-w-none pb-12">
        {renderParagraphs(post.body)}
      </div>

      {/* Footer del Artículo */}
      <div className="pt-8 border-t border-border-subtle flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-text-muted">
        <div>
          PUBLICACIÓN OFICIAL // <strong>BAU INTERACTIVE</strong>
        </div>

        <div>
          <Link
            href="/clasificacion"
            className="text-xs font-mono uppercase tracking-wider text-text-secondary hover:text-accent-razer transition-colors"
          >
            Ver Telemetría Mundial &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
