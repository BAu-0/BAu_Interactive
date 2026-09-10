import React from 'react';
import { NewsCategory } from '@/types/news';

interface CategoryBadgeProps {
  category: NewsCategory;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  switch (category) {
    case 'anuncio':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-cyan-500/10 text-arcade-cyan border border-arcade-cyan/30">
          Anuncio
        </span>
      );
    case 'actualizacion':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-purple-500/10 text-arcade-purple border border-arcade-purple/30">
          Actualización
        </span>
      );
    case 'notas_de_version':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-amber-500/10 text-arcade-gold border border-arcade-gold/30">
          Notas de Versión
        </span>
      );
    case 'desarrollo':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-emerald-500/10 text-arcade-green border border-arcade-green/30">
          Devlog
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-slate-800 text-slate-300">
          General
        </span>
      );
  }
}
