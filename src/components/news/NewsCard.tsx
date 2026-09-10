import React from 'react';
import Link from 'next/link';
import { NewsPost } from '@/types/news';
import { CategoryBadge } from './CategoryBadge';
import { formatRelativeTime } from '@/lib/utils/format';
import { ArrowRight } from 'lucide-react';

interface NewsCardProps {
  post: NewsPost;
  compact?: boolean;
}

export function NewsCard({ post, compact = false }: NewsCardProps) {
  return (
    <article className="flex flex-col justify-between rounded-lg bg-white border border-zinc-200 hover:border-zinc-400 p-6 transition-all duration-200 shadow-sm hover:shadow-md group">
      <div>
        {/* Encabezado: Categoría y Fecha */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <CategoryBadge category={post.category} />
          <span className="text-xs text-zinc-500 font-sans">
            {formatRelativeTime(post.published_at)}
          </span>
        </div>

        {/* Título */}
        <h3 className="text-lg font-bold text-zinc-950 group-hover:text-[#00a836] transition-colors mb-2.5 line-clamp-2 leading-snug font-sans">
          <Link href={`/novedades/${post.slug}`} className="focus:outline-none">
            {post.title}
          </Link>
        </h3>

        {/* Resumen / Excerpt */}
        <p
          className={`text-sm text-zinc-600 leading-relaxed ${
            compact ? 'line-clamp-2' : 'line-clamp-3'
          } mb-6 font-sans`}
        >
          {post.excerpt}
        </p>
      </div>

      {/* Footer de la tarjeta */}
      <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-sans">
        <span>Por {post.author_name}</span>

        <Link
          href={`/novedades/${post.slug}`}
          className="inline-flex items-center space-x-1 font-semibold text-zinc-900 hover:text-[#00a836] transition-colors"
          aria-label={`Leer artículo completo: ${post.title}`}
        >
          <span>Leer artículo</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
