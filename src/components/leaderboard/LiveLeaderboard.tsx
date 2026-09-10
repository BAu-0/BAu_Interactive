'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { LeaderboardEntry } from '@/types/leaderboard';
import { LeaderboardTable } from './LeaderboardTable';
import { RefreshCw, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { getLeaderboard } from '@/lib/data/api';

interface LiveLeaderboardProps {
  initialEntries: LeaderboardEntry[];
  gameSlug?: string;
  limit?: number;
  showVerificationNote?: boolean;
}

export function LiveLeaderboard({
  initialEntries,
  gameSlug = 'aether-drift',
  limit = 15,
  showVerificationNote = true,
}: LiveLeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(initialEntries);
  const [isLoading, setIsLoading] = useState(false);
  const [isStale, setIsStale] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchLeaderboard = useCallback(async (isManual = false) => {
    if (isManual) {
      setIsLoading(true);
    }
    setErrorMessage(null);

    try {
      const data = await getLeaderboard(gameSlug, limit);
      if (data && data.length > 0) {
        setEntries(data);
        setLastUpdated(new Date());
        setIsStale(false);
      }
    } catch {
      setIsStale(true);
      setErrorMessage('Fallo en sincronización. Conservando última telemetría válida.');
    } finally {
      setIsLoading(false);
    }
  }, [gameSlug, limit]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const startPolling = () => {
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (!document.hidden) {
          fetchLeaderboard(false);
        }
      }, 45000);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (intervalId) clearInterval(intervalId);
      } else {
        fetchLeaderboard(false);
        startPolling();
      }
    };

    startPolling();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (intervalId) clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchLeaderboard]);

  const formattedTime = lastUpdated.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="space-y-3 font-sans">
      {/* Barra de Telemetría Superior */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-lg border border-zinc-200 bg-zinc-50 text-xs text-zinc-600">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-[#00a836]" />
            <span>Sincronizado: <strong className="text-zinc-950 font-bold">{formattedTime}</strong></span>
          </div>
          <span className="text-zinc-300">|</span>
          <span>Intervalo: <strong className="text-zinc-800">45s</strong></span>
          {isStale && (
            <span className="inline-flex items-center space-x-1 text-amber-700 bg-amber-100 px-2 py-0.5 rounded text-[10px] font-bold">
              <AlertTriangle className="w-3 h-3" />
              <span>DESFASADO</span>
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => fetchLeaderboard(true)}
          disabled={isLoading}
          className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 hover:border-zinc-400 transition-all text-xs font-medium disabled:opacity-50 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00a836]"
          aria-label="Actualizar clasificación ahora"
        >
          <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin text-[#00a836]' : ''}`} />
          <span>{isLoading ? 'Sincronizando...' : 'Actualizar'}</span>
        </button>
      </div>

      {errorMessage && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800 flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Tabla con aria-live */}
      <div aria-live="polite">
        <LeaderboardTable entries={entries} />
      </div>

      {showVerificationNote && (
        <div className="flex items-start space-x-2 text-xs text-zinc-500 pt-1">
          <ShieldCheck className="w-4 h-4 text-[#00a836] shrink-0 mt-0.5" />
          <p>
            Telemetría criptográfica verificada lado servidor. Desempate por fecha cronológica (ranked_at). Máximo 1 registro por jugador.
          </p>
        </div>
      )}
    </div>
  );
}
