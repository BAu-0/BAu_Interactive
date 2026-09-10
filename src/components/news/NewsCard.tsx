import React from 'react';
import Link from 'next/link';
import { NewsPost } from '@/types/news';
import { CategoryBadge } from './CategoryBadge';
import { formatRelativeTime } from '@/lib/utils/format';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface NewsCardProps {
  post: NewsPost;
  compact?: boolean;
}

export function NewsCard({ post, compact = false }: NewsCardProps) {
  return (
    <article className="flex flex-col justify-between rounded-2xl bg-surface-card border border-surface-border hover:border-arcade-cyan/40 p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg group">
      <div>
        {/* Encabezado: Categoría y Fecha */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <CategoryBadge category={post.category} />
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{formatRelativeTime(post.published_at)}</span>
          </div>
        </div>

        {/* Título */}
        <h3 className="text-lg font-bold text-white group-hover:text-arcade-cyan transition-colors mb-2.5 line-clamp-2 leading-snug">
          <Link href={`/novedades/${post.slug}`} className="focus:outline-none">
            {post.title}
          </Link>
        </h3>

        {/* Resumen / Excerpt */}
        <p className={`text-sm text-slate-400 leading-relaxed ${compact ? 'line-clamp-2' : 'line-clamp-3'} mb-6`}>
          {post.excerpt}
        </p>
      </div>

      {/* Footer de la tarjeta */}
      <div className="pt-4 border-t border-surface-border/60 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-1.5">
          <User className="w-3.5 h-3.5 text-slate-500" />
          <span>{post.author_name}</span>
        </div>

        <Link
          href={`/novedades/${post.slug}`}
          className="inline-flex items-center space-x-1 font-semibold text-arcade-cyan hover:text-white transition-colors"
          aria-label={`Leer artículo completo: ${post.title}`}
        >
          <span>Leer más</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
