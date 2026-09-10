import React from 'react';
import { NewsCategory } from '@/types/news';

interface CategoryBadgeProps {
  category: NewsCategory;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  switch (category) {
    case 'anuncio':
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-surface-elevated border border-border-subtle text-text-primary">
          <span className="w-1 h-1 rounded-full bg-white" />
          <span>ANUNCIO</span>
        </span>
      );
    case 'actualizacion':
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-surface-elevated border border-border-subtle text-text-secondary">
          <span className="w-1 h-1 rounded-full bg-accent-titanium" />
          <span>UPDATE</span>
        </span>
      );
    case 'notas_de_version':
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-surface-elevated border border-accent-razer/30 text-accent-razer font-semibold">
          <span className="w-1 h-1 rounded-full bg-accent-razer shadow-[0_0_4px_#00ff55]" />
          <span>CHANGELOG</span>
        </span>
      );
    case 'desarrollo':
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-surface-elevated border border-border-subtle text-text-muted">
          <span className="w-1 h-1 rounded-full bg-text-disabled" />
          <span>DEVLOG</span>
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-surface-elevated border border-border-subtle text-text-muted">
          <span>GENERAL</span>
        </span>
      );
  }
}
