import React from 'react';
import { LeaderboardEntry } from '@/types/leaderboard';
import { formatScore, formatRelativeTime } from '@/lib/utils/format';
import { CheckCircle2 } from 'lucide-react';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  captionTitle?: string;
}

export function LeaderboardTable({
  entries,
  captionTitle = 'Tabla de Clasificación y Puntuaciones (Top 15)',
}: LeaderboardTableProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12 px-4 rounded-lg border border-zinc-200 bg-white">
        <p className="text-zinc-500 text-xs font-sans">
          No se registran marcas verificadas todavía. Sé el primero en establecer una puntuación.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white shadow-sm overflow-hidden font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <caption className="sr-only">{captionTitle}</caption>
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 text-[11px] font-bold uppercase tracking-wider text-zinc-600">
              <th scope="col" className="py-3 px-4 w-16 text-center">
                Pos
              </th>
              <th scope="col" className="py-3 px-4">
                Jugador // Alias
              </th>
              <th scope="col" className="py-3 px-4 text-right">
                Puntuación
              </th>
              <th scope="col" className="py-3 px-4 text-right hidden sm:table-cell">
                Tiempo
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-xs">
            {entries.map((entry) => {
              const isP1 = entry.rank === 1;
              const isTop3 = entry.rank <= 3;

              return (
                <tr
                  key={`${entry.rank}-${entry.display_name}`}
                  className={`group transition-colors duration-100 hover:bg-zinc-50/80 ${
                    isP1 ? 'bg-emerald-50/30' : ''
                  }`}
                >
                  {/* Posición Formateada (01, 02... 15) */}
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <div className="inline-flex items-center justify-center space-x-1 tabular-nums font-sans">
                      <span
                        className={`font-bold ${
                          isP1
                            ? 'text-[#00a836]'
                            : isTop3
                            ? 'text-zinc-900'
                            : 'text-zinc-500'
                        }`}
                      >
                        {String(entry.rank).padStart(2, '0')}
                      </span>
                    </div>
                  </td>

                  {/* Nombre del Jugador */}
                  <td className="py-3 px-4 font-medium text-zinc-900 flex items-center space-x-2">
                    <span className="truncate max-w-[180px] sm:max-w-xs">{entry.display_name}</span>
                    {isP1 && (
                      <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#00d647]/15 text-[#00a836] border border-[#00d647]/30">
                        LÍDER
                      </span>
                    )}
                  </td>

                  {/* Puntuación */}
                  <td className="py-3 px-4 text-right font-mono font-bold tabular-nums text-zinc-950">
                    {formatScore(entry.score)}
                  </td>

                  {/* Timestamp Relativo */}
                  <td className="py-3 px-4 text-right text-zinc-500 font-mono text-[11px] hidden sm:table-cell">
                    <span className="inline-flex items-center justify-end space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-[#00a836]" />
                      <span>{formatRelativeTime(entry.ranked_at)}</span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
