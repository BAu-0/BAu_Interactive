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

export function NewsCard({ post, compact = false, dark = false }: NewsCardProps) {
  return (
    <article
      className={`flex flex-col justify-between rounded-xl p-6 transition-all duration-200 shadow-sm hover:shadow-md group ${
        dark
          ? 'bg-black border border-zinc-800 hover:border-[#a855f7]/50 hover:shadow-purple-950/20'
          : 'bg-white border border-zinc-200 hover:border-zinc-400'
      }`}
    >
      <div>
        {/* Encabezado: Categoría y Fecha */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <CategoryBadge category={post.category} />
          <span className={`text-xs font-sans ${dark ? 'text-zinc-500' : 'text-zinc-500'}`}>
            {formatRelativeTime(post.published_at)}
          </span>
        </div>

        {/* Título */}
        <h3
          className={`text-lg font-bold mb-2.5 line-clamp-2 leading-snug font-sans transition-colors ${
            dark ? 'text-white group-hover:text-[#a855f7]' : 'text-zinc-950 group-hover:text-[#7e22ce]'
          }`}
        >
          <Link href={`/novedades/${post.slug}`} className="focus:outline-none">
            {post.title}
          </Link>
        </h3>

        {/* Resumen / Excerpt */}
        <p
          className={`text-sm leading-relaxed ${
            compact ? 'line-clamp-2' : 'line-clamp-3'
          } mb-6 font-sans ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}
        >
          {post.excerpt}
        </p>
      </div>

      {/* Footer de la tarjeta */}
      <div
        className={`pt-4 border-t flex items-center justify-between text-xs font-sans ${
          dark ? 'border-zinc-900 text-zinc-500' : 'border-zinc-100 text-zinc-500'
        }`}
      >
        <span>Por {post.author_name}</span>

        <Link
          href={`/novedades/${post.slug}`}
          className={`inline-flex items-center space-x-1 font-semibold transition-colors ${
            dark ? 'text-zinc-300 hover:text-[#a855f7]' : 'text-zinc-900 hover:text-[#7e22ce]'
          }`}
          aria-label={`Leer artículo completo: ${post.title}`}
        >
          <span>Leer artículo</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
