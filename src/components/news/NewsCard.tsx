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
    <article className="flex flex-col justify-between rounded-lg bg-surface-card border border-border-subtle hover:border-border-hover p-6 transition-all duration-200 shadow-fluent-rest group">
      <div>
        {/* Encabezado: Categoría y Fecha */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <CategoryBadge category={post.category} />
          <span className="text-[11px] font-mono text-text-muted">
            {formatRelativeTime(post.published_at)}
          </span>
        </div>

        {/* Título */}
        <h3 className="text-base font-bold text-text-primary group-hover:text-white transition-colors mb-2.5 line-clamp-2 leading-snug font-display">
          <Link href={`/novedades/${post.slug}`} className="focus:outline-none">
            {post.title}
          </Link>
        </h3>

        {/* Resumen / Excerpt */}
        <p
          className={`text-xs text-text-muted leading-relaxed ${
            compact ? 'line-clamp-2' : 'line-clamp-3'
          } mb-6 font-sans`}
        >
          {post.excerpt}
        </p>
      </div>

      {/* Footer de la tarjeta */}
      <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-text-muted">
        <span>POR {post.author_name.toUpperCase()}</span>

        <Link
          href={`/novedades/${post.slug}`}
          className="inline-flex items-center space-x-1 font-semibold text-text-secondary hover:text-accent-razer transition-colors"
          aria-label={`Leer artículo completo: ${post.title}`}
        >
          <span>LEER</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
