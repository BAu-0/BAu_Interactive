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
      <div className="text-center py-12 px-4 rounded-lg border border-border-subtle bg-surface-card">
        <p className="text-text-muted text-xs font-mono">
          NO SE REGISTRAN TELEMETRÍAS VERIFICADAS TODAVÍA. SÉ EL PRIMERO EN ESTABLECER MARCA.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border-subtle bg-surface-base shadow-fluent-elevated overflow-hidden font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <caption className="sr-only">{captionTitle}</caption>
          <thead>
            <tr className="border-b border-border-subtle bg-surface-elevated text-[11px] font-mono uppercase tracking-widest text-text-muted">
              <th scope="col" className="py-3 px-4 w-16 text-center">
                POS
              </th>
              <th scope="col" className="py-3 px-4">
                PILOTO // CALLSIGN
              </th>
              <th scope="col" className="py-3 px-4 text-right">
                PUNTUACIÓN // TELEMETRÍA
              </th>
              <th scope="col" className="py-3 px-4 text-right hidden sm:table-cell">
                LOG_TIME
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle/40 text-xs font-mono">
            {entries.map((entry) => {
              const isP1 = entry.rank === 1;
              const isTop3 = entry.rank <= 3;

              return (
                <tr
                  key={`${entry.rank}-${entry.display_name}`}
                  className={`group transition-colors duration-100 hover:bg-surface-elevated ${
                    isP1 ? 'bg-accent-razer/[0.02]' : ''
                  }`}
                >
                  {/* Posición Formateada (01, 02... 15) */}
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <div className="inline-flex items-center justify-center space-x-1 tabular-nums font-mono">
                      {isP1 ? (
                        <span className="inline-flex items-center text-accent-razer font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-razer mr-1.5 shadow-[0_0_6px_#00ff55]" />
                          01
                        </span>
                      ) : (
                        <span
                          className={
                            entry.rank === 2
                              ? 'text-accent-titanium font-semibold'
                              : entry.rank === 3
                              ? 'text-slate-300 font-medium'
                              : 'text-text-muted'
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
                          isTop3 ? 'text-text-primary font-semibold' : 'text-text-secondary'
                        }`}
                      >
                        {entry.display_name}
                      </span>
                      <span
                        title="Telemetría verificada por servidor"
                        className="inline-flex items-center text-[10px] px-1.5 py-0.2 rounded border border-border-subtle bg-surface-card text-text-muted font-mono"
                      >
                        <CheckCircle2 className="w-3 h-3 text-accent-razer mr-1 inline-block" />
                        SYS_OK
                      </span>
                    </div>
                  </td>

                  {/* Puntuación Tabular */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <span
                      className={`font-mono text-sm tabular-nums tracking-tight ${
                        isP1 ? 'text-accent-razer font-bold' : 'text-accent-titanium font-medium'
                      }`}
                    >
                      {formatScore(entry.score)}
                    </span>
                    <span className="text-[10px] text-text-muted font-mono uppercase ml-1">PTS</span>
                  </td>

                  {/* Timestamp */}
                  <td className="py-3 px-4 text-right text-text-muted whitespace-nowrap hidden sm:table-cell text-[11px]">
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
