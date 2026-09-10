'use client';

import React, { useState } from 'react';
import { NewsPost, NewsCategory } from '@/types/news';
import { NewsCard } from './NewsCard';

interface NewsListProps {
  initialPosts: NewsPost[];
}

const CATEGORIES: { label: string; value: NewsCategory | 'todas' }[] = [
  { label: 'TODAS', value: 'todas' },
  { label: 'ANUNCIOS', value: 'anuncio' },
  { label: 'ACTUALIZACIONES', value: 'actualizacion' },
  { label: 'CHANGELOGS', value: 'notas_de_version' },
  { label: 'DEVLOGS', value: 'desarrollo' },
];

export function NewsList({ initialPosts }: NewsListProps) {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'todas'>('todas');

  const filteredPosts =
    selectedCategory === 'todas'
      ? initialPosts
      : initialPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Selector de Categorías Estilo Hardware Chips */}
      <div className="flex flex-wrap gap-2 pb-2">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-1.5 rounded text-xs font-mono tracking-wider transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-razer ${
                isActive
                  ? 'bg-surface-elevated text-accent-razer border border-accent-razer/50 font-bold'
                  : 'bg-surface-base hover:bg-surface-elevated text-text-muted hover:text-white border border-border-subtle'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Listado de Artículos */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-lg border border-border-subtle bg-surface-card">
          <p className="text-text-muted text-xs font-mono">
            NO EXISTEN PUBLICACIONES EN ESTA CATEGORÍA ACTUALMENTE.
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
