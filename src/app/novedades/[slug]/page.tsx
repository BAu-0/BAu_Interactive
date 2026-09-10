import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getNewsPostBySlug } from '@/lib/data/api';
import { CategoryBadge } from '@/components/news/CategoryBadge';
import { formatUtcDateTime } from '@/lib/utils/format';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
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

  // Renderizar párrafos formateando markdown básico
  const renderParagraphs = (bodyText: string) => {
    return bodyText.split('\n\n').map((block, idx) => {
      if (block.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-xl font-bold text-white mt-6 mb-3">
            {block.replace('### ', '')}
          </h3>
        );
      }
      if (block.startsWith('- ')) {
        const items = block.split('\n').map((item) => item.replace('- ', ''));
        return (
          <ul key={idx} className="list-disc list-inside space-y-2 text-slate-300 my-4 text-sm leading-relaxed">
            {items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        );
      }
      if (block.startsWith('1. ')) {
        const items = block.split('\n').map((item) => item.replace(/^\d+\.\s*/, ''));
        return (
          <ol key={idx} className="list-decimal list-inside space-y-2 text-slate-300 my-4 text-sm leading-relaxed">
            {items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ol>
        );
      }
      return (
        <p key={idx} className="text-slate-300 leading-relaxed text-base my-4">
          {block}
        </p>
      );
    });
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Botón de regreso */}
      <div className="mb-8">
        <Link
          href="/novedades"
          className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-400 hover:text-arcade-cyan transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a todas las novedades</span>
        </Link>
      </div>

      {/* Encabezado del artículo */}
      <header className="space-y-4 pb-8 border-b border-surface-border">
        <div className="flex items-center space-x-3">
          <CategoryBadge category={post.category} />
          <span className="text-xs text-slate-500">•</span>
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <time dateTime={post.published_at}>{formatUtcDateTime(post.published_at)}</time>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center space-x-2 text-sm text-slate-400 pt-2">
          <User className="w-4 h-4 text-arcade-cyan" />
          <span>Por <strong className="text-slate-200">{post.author_name}</strong></span>
        </div>
      </header>

      {/* Resumen destacado */}
      <div className="my-8 p-6 rounded-2xl bg-surface-card border-l-4 border-arcade-cyan text-base text-slate-200 italic font-medium leading-relaxed">
        {post.excerpt}
      </div>

      {/* Cuerpo del Artículo */}
      <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-white pb-12">
        {renderParagraphs(post.body)}
      </div>

      {/* Footer del Artículo */}
      <div className="pt-8 border-t border-surface-border flex flex-wrap items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          Publicado oficialmente en el portal de <strong>BAu Interactive</strong>.
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/clasificacion"
            className="text-xs font-semibold text-arcade-cyan hover:underline"
          >
            Ver Top 15 Mundial &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
