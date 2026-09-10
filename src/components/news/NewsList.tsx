'use client';

import React, { useState } from 'react';
import { NewsPost, NewsCategory } from '@/types/news';
import { NewsCard } from './NewsCard';

interface NewsListProps {
  initialPosts: NewsPost[];
}

const CATEGORIES: { label: string; value: NewsCategory | 'todas' }[] = [
  { label: 'Todas las publicaciones', value: 'todas' },
  { label: 'Anuncios', value: 'anuncio' },
  { label: 'Actualizaciones', value: 'actualizacion' },
  { label: 'Notas de Versión', value: 'notas_de_version' },
  { label: 'Devlogs', value: 'desarrollo' },
];

export function NewsList({ initialPosts }: NewsListProps) {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'todas'>('todas');

  const filteredPosts =
    selectedCategory === 'todas'
      ? initialPosts
      : initialPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Selector de Categorías */}
      <div className="flex flex-wrap gap-2 pb-2">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-arcade-cyan ${
                isActive
                  ? 'bg-arcade-cyan text-slate-950 shadow-glow-cyan/50 font-bold'
                  : 'bg-surface-card hover:bg-surface-border text-slate-300 hover:text-white border border-surface-border'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Listado de Artículos */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl border border-surface-border bg-surface-card/40">
          <p className="text-slate-400 text-sm">
            No hay publicaciones en esta categoría por el momento.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <NewsCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
