import React from 'react';
import { LeaderboardEntry } from '@/types/leaderboard';
import { formatScore, formatRelativeTime } from '@/lib/utils/format';
import { Trophy, Medal, Award, CheckCircle2 } from 'lucide-react';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  captionTitle?: string;
}

export function LeaderboardTable({
  entries,
  captionTitle = 'Clasificación canónica mundial de Aether Drift (Top 15)',
}: LeaderboardTableProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12 px-4 rounded-xl border border-surface-border bg-surface-card/40">
        <p className="text-slate-400 text-sm">
          No hay puntuaciones verificadas registradas todavía. ¡Sé el primero en entrar al ranking!
        </p>
      </div>
    );
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="flex items-center space-x-1 text-arcade-gold font-bold">
            <Trophy className="w-5 h-5 text-arcade-gold fill-arcade-gold/20 animate-pulse" />
            <span>1º</span>
          </div>
        );
      case 2:
        return (
          <div className="flex items-center space-x-1 text-slate-300 font-bold">
            <Medal className="w-5 h-5 text-slate-300 fill-slate-300/20" />
            <span>2º</span>
          </div>
        );
      case 3:
        return (
          <div className="flex items-center space-x-1 text-amber-600 font-bold">
            <Award className="w-5 h-5 text-amber-600 fill-amber-600/20" />
            <span>3º</span>
          </div>
        );
      default:
        return <span className="font-mono text-slate-400 font-medium pl-1">#{rank}</span>;
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-surface-border bg-surface shadow-xl">
      <table className="w-full text-left border-collapse">
        <caption className="sr-only">{captionTitle}</caption>
        <thead>
          <tr className="border-b border-surface-border bg-surface-card/60 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <th scope="col" className="py-3.5 px-4 w-16 text-center">
              Puesto
            </th>
            <th scope="col" className="py-3.5 px-4">
              Piloto
            </th>
            <th scope="col" className="py-3.5 px-4 text-right">
              Puntuación
            </th>
            <th scope="col" className="py-3.5 px-4 text-right hidden sm:table-cell">
              Marca Lograda
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-border/50 text-sm">
          {entries.map((entry) => {
            const isTop3 = entry.rank <= 3;
            return (
              <tr
                key={`${entry.rank}-${entry.display_name}`}
                className={`transition-colors hover:bg-surface-card/50 ${
                  entry.rank === 1
                    ? 'bg-arcade-gold/5'
                    : entry.rank === 2
                    ? 'bg-slate-300/5'
                    : entry.rank === 3
                    ? 'bg-amber-600/5'
                    : ''
                }`}
              >
                {/* Puesto */}
                <td className="py-3 px-4 text-center whitespace-nowrap">
                  {getRankBadge(entry.rank)}
                </td>

                {/* Nombre de jugador */}
                <td className="py-3 px-4 font-medium text-slate-200">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`truncate max-w-[150px] sm:max-w-[260px] ${
                        isTop3 ? 'font-bold text-white' : ''
                      }`}
                    >
                      {entry.display_name}
                    </span>
                    <span
                      title="Puntuación verificada por servidor"
                      className="inline-flex items-center"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-arcade-cyan/70 shrink-0" />
                    </span>
                  </div>
                </td>

                {/* Puntuación */}
                <td className="py-3 px-4 text-right font-mono font-bold text-arcade-cyan whitespace-nowrap">
                  {formatScore(entry.score)}
                  <span className="text-[10px] text-slate-400 font-sans font-normal ml-1">pts</span>
                </td>

                {/* Fecha */}
                <td className="py-3 px-4 text-right text-xs text-slate-400 whitespace-nowrap hidden sm:table-cell">
                  {formatRelativeTime(entry.ranked_at)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
