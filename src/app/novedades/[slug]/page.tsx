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
          <h3 key={idx} className="text-xl font-bold text-white uppercase mt-8 mb-3 font-sans">
            {block.replace('### ', '')}
          </h3>
        );
      }
      if (block.startsWith('- ')) {
        const items = block.split('\n').map((item) => item.replace('- ', ''));
        return (
          <ul key={idx} className="list-disc list-inside space-y-2 text-zinc-300 my-4 text-sm font-sans leading-relaxed">
            {items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        );
      }
      if (block.startsWith('1. ')) {
        const items = block.split('\n').map((item) => item.replace(/^\d+\.\s*/, ''));
        return (
          <ol key={idx} className="list-decimal list-inside space-y-2 text-zinc-300 my-4 text-sm font-sans leading-relaxed">
            {items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ol>
        );
      }
      return (
        <p key={idx} className="text-zinc-300 leading-relaxed text-base my-4 font-sans">
          {block}
        </p>
      );
    });
  };

  return (
    <div className="w-full bg-black text-white min-h-[calc(100vh-4rem)] font-sans border-b border-zinc-800">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Botón de regreso */}
        <div className="mb-8">
          <Link
            href="/novedades"
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-[#a855f7] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Novedades</span>
          </Link>
        </div>

        {/* Encabezado del artículo */}
        <header className="space-y-4 pb-8 border-b border-zinc-800">
          <div className="flex items-center space-x-3">
            <CategoryBadge category={post.category} />
            <span className="text-xs text-zinc-600">•</span>
            <span className="text-xs text-zinc-400 font-mono">
              <time dateTime={post.published_at}>{formatUtcDateTime(post.published_at)}</time>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight uppercase">
            {post.title}
          </h1>

          <div className="text-xs text-zinc-400 pt-1">
            <span>Autor: <strong className="text-zinc-200">{post.author_name}</strong></span>
          </div>
        </header>

        {/* Resumen destacado */}
        <div className="my-8 p-5 rounded-xl bg-zinc-950 border-l-4 border-[#a855f7] text-base text-zinc-300 leading-relaxed border border-zinc-800/80">
          {post.excerpt}
        </div>

        {/* Cuerpo del Artículo */}
        <div className="max-w-none pb-12 text-zinc-300">
          {renderParagraphs(post.body)}
        </div>

        {/* Footer del Artículo */}
        <div className="pt-8 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500 font-sans">
          <div>
            Publicación oficial // <strong className="text-zinc-400">BAu Interactive</strong>
          </div>

          <div>
            <Link
              href="/juegos/pok-tschack"
              className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-[#a855f7] transition-colors"
            >
              Ver Ficha Técnica &rarr;
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
