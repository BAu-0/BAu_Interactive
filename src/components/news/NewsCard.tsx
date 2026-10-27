import React from 'react';
import Link from 'next/link';
import { NewsPost } from '@/types/news';
import { CategoryBadge } from './CategoryBadge';
import { formatRelativeTime } from '@/lib/utils/format';
import { ArrowRight } from 'lucide-react';

interface NewsCardProps {
  post: NewsPost;
  compact?: boolean;
  dark?: boolean;
}

export function NewsCard({ post, compact = false }: NewsCardProps) {
  return (
    <article className="flex flex-col justify-between rounded-xl p-6 transition-all duration-200 bg-zinc-950 border border-zinc-800 hover:border-[#a855f7]/60 hover:shadow-xl hover:shadow-purple-950/20 group">
      <div>
        {/* Encabezado: Categoría y Fecha */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <CategoryBadge category={post.category} />
          <span className="text-xs font-sans text-zinc-500">
            {formatRelativeTime(post.published_at)}
          </span>
        </div>

        {/* Título */}
        <h3 className="text-lg font-bold mb-2.5 line-clamp-2 leading-snug font-sans text-white group-hover:text-[#a855f7] transition-colors">
          <Link href={`/novedades/${post.slug}`} className="focus:outline-none">
            {post.title}
          </Link>
        </h3>

        {/* Resumen / Excerpt */}
        <p
          className={`text-sm leading-relaxed ${
            compact ? 'line-clamp-2' : 'line-clamp-3'
          } mb-6 font-sans text-zinc-400`}
        >
          {post.excerpt}
        </p>
      </div>

      {/* Footer de la tarjeta */}
      <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-sans text-zinc-500">
        <span>Por {post.author_name}</span>

        <Link
          href={`/novedades/${post.slug}`}
          className="inline-flex items-center space-x-1 font-semibold text-zinc-300 hover:text-[#a855f7] transition-colors"
          aria-label={`Leer artículo completo: ${post.title}`}
        >
          <span>Leer artículo</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#a855f7]" />
        </Link>
      </div>
    </article>
  );
}
