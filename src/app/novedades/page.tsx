import React from 'react';
import { getNewsPosts } from '@/lib/data/api';
import { NewsList } from '@/components/news/NewsList';
import { Newspaper } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Novedades y Devlogs',
  description:
    'Noticias oficiales, notas de parches y bitácoras de desarrollo del estudio BAu Interactive.',
};

export const revalidate = 60;

export default async function NewsPage() {
  const posts = await getNewsPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="max-w-3xl">
        <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-arcade-cyan mb-2">
          <Newspaper className="w-4 h-4" />
          <span>Archivo Editorial</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
          Novedades y Actualizaciones
        </h1>
        <p className="text-base text-slate-300">
          Sigue el progreso de nuestros videojuegos, notas de versión de parches y reflexiones sobre diseño técnico y sonoro.
        </p>
      </div>

      <NewsList initialPosts={posts} />
    </div>
  );
}
