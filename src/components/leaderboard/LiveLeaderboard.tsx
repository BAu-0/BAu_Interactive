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
    <div className="space-y-3">
      {/* Barra de Telemetría Superior */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-lg border border-border-subtle bg-surface-elevated text-xs font-mono text-text-muted">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-accent-razer" />
            <span>SYNC: <strong className="text-text-primary">{formattedTime}</strong></span>
          </div>
          <span className="text-border-hover">|</span>
          <span>INTERVAL: <strong className="text-text-secondary">45s</strong></span>
          {isStale && (
            <span className="inline-flex items-center space-x-1 text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded text-[10px]">
              <AlertTriangle className="w-3 h-3" />
              <span>STALE</span>
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => fetchLeaderboard(true)}
          disabled={isLoading}
          className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-surface-card hover:bg-surface-overlay text-text-secondary hover:text-white border border-border-subtle hover:border-border-hover transition-all text-xs font-mono disabled:opacity-50 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-razer"
          aria-label="Actualizar clasificación ahora"
        >
          <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin text-accent-razer' : ''}`} />
          <span>{isLoading ? 'SYNCING...' : 'RE-SYNC'}</span>
        </button>
      </div>

      {errorMessage && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded text-xs font-mono text-amber-300 flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Tabla con aria-live */}
      <div aria-live="polite">
        <LeaderboardTable entries={entries} />
      </div>

      {showVerificationNote && (
        <div className="flex items-start space-x-2 text-[11px] font-mono text-text-muted pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-accent-razer shrink-0 mt-0.5" />
          <p>
            TELEMETRÍA CRIPTOGRÁFICA VERIFICADA LADO SERVIDOR. DESEMPATE POR FECHA CRONOLÓGICA (RANKED_AT). MÁXIMO 1 REGISTRO POR JUGADOR.
          </p>
        </div>
      )}
    </div>
  );
}
