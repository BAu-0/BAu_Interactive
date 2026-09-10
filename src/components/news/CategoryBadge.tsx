import React from 'react';
import { NewsCategory } from '@/types/news';

interface CategoryBadgeProps {
  category: NewsCategory;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  switch (category) {
    case 'anuncio':
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-sans font-bold uppercase tracking-wider bg-black text-white">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff55]" />
          <span>Anuncio</span>
        </span>
      );
    case 'actualizacion':
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-sans font-bold uppercase tracking-wider bg-zinc-100 border border-zinc-300 text-zinc-900">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
          <span>Parche</span>
        </span>
      );
    case 'notas_de_version':
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-sans font-bold uppercase tracking-wider bg-emerald-50 border border-emerald-300 text-emerald-800">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00a836]" />
          <span>Changelog</span>
        </span>
      );
    case 'desarrollo':
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-sans font-bold uppercase tracking-wider bg-zinc-100 border border-zinc-200 text-zinc-700">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
          <span>Devlog</span>
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-sans font-bold uppercase tracking-wider bg-zinc-100 border border-zinc-200 text-zinc-600">
          <span>General</span>
        </span>
      );
  }
}
