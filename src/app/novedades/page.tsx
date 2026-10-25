import React from 'react';
import { getNewsPosts } from '@/lib/data/api';
import { NewsList } from '@/components/news/NewsList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Novedades y Actualizaciones',
  description:
    'Anuncios oficiales, notas de versión y avances del desarrollo en BAu Interactive.',
};

export const revalidate = 60;

export default async function NewsPage() {
  const posts = await getNewsPosts();

  return (
    <div className="w-full bg-black text-white min-h-[calc(100vh-4rem)] font-sans border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-12">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#a855f7] mb-2 block font-mono">
            Actualizaciones // Estudio
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white uppercase mb-4">
            Novedades y Actualizaciones
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
            Sigue el avance de desarrollo de nuestros juegos, anuncios de versiones y notas de actualización directamente desde el estudio.
          </p>
        </div>

        <NewsList initialPosts={posts} />
      </div>
    </div>
  );
}
