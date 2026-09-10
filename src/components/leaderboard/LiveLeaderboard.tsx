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
      setErrorMessage('No se pudo actualizar la clasificación. Mostrando los últimos datos verificados.');
    } finally {
      setIsLoading(false);
    }
  }, [gameSlug, limit]);

  // Ciclo de refresco periódico (cada 45 segundos) con pausa al ocultar pestaña
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
        // Al volver a la pestaña, refrescar datos
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
    <div className="space-y-4">
      {/* Barra de estado y control */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 bg-surface-card/40 p-3 rounded-lg border border-surface-border">
        <div className="flex items-center space-x-2">
          <Clock className="w-3.5 h-3.5 text-arcade-cyan" />
          <span>Última sincronización: <strong className="text-slate-200">{formattedTime}</strong></span>
          {isStale && (
            <span className="inline-flex items-center space-x-1 text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
              <AlertTriangle className="w-3 h-3" />
              <span>Datos desactualizados</span>
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => fetchLeaderboard(true)}
          disabled={isLoading}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-surface-card hover:bg-surface-border text-slate-200 hover:text-white transition-all disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-arcade-cyan"
          aria-label="Actualizar clasificación ahora"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-arcade-cyan' : ''}`} />
          <span>{isLoading ? 'Actualizando...' : 'Actualizar'}</span>
        </button>
      </div>

      {errorMessage && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-200 flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Tabla con aria-live para no abrumar al lector de pantalla */}
      <div aria-live="polite">
        <LeaderboardTable entries={entries} />
      </div>

      {showVerificationNote && (
        <div className="flex items-start space-x-2 text-xs text-slate-500 pt-1">
          <ShieldCheck className="w-4 h-4 text-arcade-cyan shrink-0 mt-0.5" />
          <p>
            Solo se publican puntuaciones canónicas validadas por el servidor del juego. Desempates resueltos por marca de tiempo cronológica. Máximo 1 puesto por jugador.
          </p>
        </div>
      )}
    </div>
  );
}
