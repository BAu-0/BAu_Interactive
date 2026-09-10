'use client';

import React, { useState } from 'react';
import { NewsPost, NewsCategory } from '@/types/news';
import { NewsCard } from './NewsCard';

interface NewsListProps {
  initialPosts: NewsPost[];
}

const CATEGORIES: { label: string; value: NewsCategory | 'todas' }[] = [
  { label: 'Todas', value: 'todas' },
  { label: 'Anuncios', value: 'anuncio' },
  { label: 'Actualizaciones', value: 'actualizacion' },
  { label: 'Changelogs', value: 'notas_de_version' },
  { label: 'Devlogs', value: 'desarrollo' },
];

export function NewsList({ initialPosts }: NewsListProps) {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'todas'>('todas');

  const filteredPosts =
    selectedCategory === 'todas'
      ? initialPosts
      : initialPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="space-y-8 font-sans">
      {/* Selector de Categorías Estilo Hardware Chips */}
      <div className="flex flex-wrap gap-2 pb-2">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded text-xs font-semibold tracking-wide transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00a836] ${
                isActive
                  ? 'bg-black text-white border border-black shadow-sm'
                  : 'bg-white hover:bg-zinc-100 text-zinc-600 hover:text-black border border-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Listado de Artículos */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-lg border border-zinc-200 bg-white">
          <p className="text-zinc-500 text-xs">
            No existen publicaciones en esta categoría actualmente.
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
