import React from 'react';
import { NewsCategory } from '@/types/news';

interface CategoryBadgeProps {
  category: NewsCategory;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  switch (category) {
    case 'anuncio':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-200">
          <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
          <span>Anuncio</span>
        </span>
      );
    case 'actualizacion':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-200">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
          <span>Parche</span>
        </span>
      );
    case 'notas_de_version':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-200">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
          <span>Changelog</span>
        </span>
      );
    case 'desarrollo':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-200">
          <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]" />
          <span>Devlog</span>
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-300">
          <span>General</span>
        </span>
      );
  }
}
