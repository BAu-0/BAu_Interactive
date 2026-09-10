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
  captionTitle = 'Telemetría de Clasificación Canónica Mundial (Top 15)',
}: LeaderboardTableProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12 px-4 rounded-lg border border-zinc-200 bg-white">
        <p className="text-zinc-500 text-xs font-sans">
          No se registran telemetrías verificadas todavía. Sé el primero en establecer marca.
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
                Piloto // Callsign
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
                      {isP1 ? (
                        <span className="inline-flex items-center text-[#00a836] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00d647] mr-1.5 shadow-[0_0_6px_#00d647]" />
                          01
                        </span>
                      ) : (
                        <span
                          className={
                            entry.rank === 2
                              ? 'text-zinc-950 font-bold'
                              : entry.rank === 3
                              ? 'text-zinc-800 font-semibold'
                              : 'text-zinc-400 font-medium'
                          }
                        >
                          {entry.rank < 10 ? `0${entry.rank}` : entry.rank}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Piloto */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`font-sans text-sm ${
                          isTop3 ? 'text-zinc-950 font-bold' : 'text-zinc-700'
                        }`}
                      >
                        {entry.display_name}
                      </span>
                      <span
                        title="Telemetría verificada por servidor"
                        className="inline-flex items-center text-[10px] px-1.5 py-0.5 rounded border border-zinc-200 bg-zinc-50 text-zinc-600 font-sans"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#00a836] mr-1 inline-block" />
                        SYS_OK
                      </span>
                    </div>
                  </td>

                  {/* Puntuación Tabular */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <span
                      className={`font-mono text-sm tabular-nums tracking-tight ${
                        isP1 ? 'text-[#00a836] font-bold' : 'text-zinc-950 font-bold'
                      }`}
                    >
                      {formatScore(entry.score)}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-sans uppercase ml-1">pts</span>
                  </td>

                  {/* Timestamp */}
                  <td className="py-3 px-4 text-right text-zinc-500 whitespace-nowrap hidden sm:table-cell text-[11px] font-sans">
                    {formatRelativeTime(entry.ranked_at)}
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
