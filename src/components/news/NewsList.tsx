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
      {/* Selector de Categorías Estilo Hardware Chips en Paleta Oscura */}
      <div className="flex flex-wrap gap-2 pb-2">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#a855f7] ${
                isActive
                  ? 'bg-[#9333ea] text-white border border-[#9333ea] shadow-md shadow-purple-950/40'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Listado de Artículos / Estado Vacío Consistente */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 px-6 rounded-2xl border border-zinc-850 bg-zinc-950/70 max-w-xl mx-auto space-y-3 shadow-xl">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-[#a855f7]">
            Próximamente
          </span>
          <h3 className="text-lg font-bold text-white uppercase tracking-wide">
            Sin publicaciones por el momento
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-md mx-auto font-sans">
            Aún no hay anuncios publicados en esta categoría. Muy pronto compartiremos aquí las notas de desarrollo, actualizaciones y noticias oficiales directamente desde el estudio.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <NewsCard key={post.slug} post={post} dark={true} />
          ))}
        </div>
      )}
    </div>
  );
}
