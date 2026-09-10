import React from 'react';
import { getNewsPosts } from '@/lib/data/api';
import { NewsList } from '@/components/news/NewsList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelog y Devlogs',
  description:
    'Registro técnico de versiones, parches y bitácoras de ingeniería del estudio BAu Interactive.',
};

export const revalidate = 60;

export default async function NewsPage() {
  const posts = await getNewsPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 bg-white font-sans">
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-widest text-[#00a836] mb-2 block">
          Changelog // Registro de Ingeniería
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-950 uppercase mb-4">
          Novedades y Parches
        </h1>
        <p className="text-sm text-zinc-600 leading-relaxed font-sans">
          Sigue el avance de desarrollo de nuestros títulos, calibraciones de inercia y notas de versión de cada compilación.
        </p>
      </div>

      <NewsList initialPosts={posts} />
    </div>
  );
}
