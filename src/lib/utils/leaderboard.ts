import { LeaderboardEntry, RawScoreSubmission } from '@/types/leaderboard';
import { sanitizeDisplayName } from './sanitize';

export interface RankingOptions {
  mode?: 'best_score' | 'all_runs';
  scoreOrder?: 'desc' | 'asc';
  limit?: number;
}

/**
 * Calcula el Top canónico a partir de un conjunto de envíos de puntuación.
 * Aplica:
 * - Exclusión de registros no verificados o bloqueados.
 * - Deduplicación de mejor marca por jugador si mode === 'best_score'.
 * - Ordenación por score (desc o asc) y desempates con ranked_at ascendente e ID estable.
 * - Límite acotado entre 1 y 15 (máximo 15).
 * - Saneamiento de nombres.
 */
export function computeCanonicalLeaderboard(
  submissions: RawScoreSubmission[],
  options: RankingOptions = {}
): LeaderboardEntry[] {
  const {
    mode = 'best_score',
    scoreOrder = 'desc',
    limit = 15,
  } = options;

  const clampedLimit = Math.min(Math.max(limit, 1), 15);

  // 1. Filtrar solo registros verificados y no bloqueados
  const validSubmissions = submissions.filter(
    (s) => s.verification_status === 'verified' && !s.is_blocked
  );

  let candidateSubmissions: RawScoreSubmission[] = [];

  if (mode === 'best_score') {
    // Agrupar por jugador y conservar únicamente su mejor marca
    const playerBestMap = new Map<string, RawScoreSubmission>();

    for (const sub of validSubmissions) {
      const existing = playerBestMap.get(sub.player_id);
      if (!existing) {
        playerBestMap.set(sub.player_id, sub);
      } else {
        const isBetter =
          scoreOrder === 'desc'
            ? sub.score > existing.score ||
              (sub.score === existing.score &&
                new Date(sub.ranked_at) < new Date(existing.ranked_at))
            : sub.score < existing.score ||
              (sub.score === existing.score &&
                new Date(sub.ranked_at) < new Date(existing.ranked_at));

        if (isBetter) {
          playerBestMap.set(sub.player_id, sub);
        }
      }
    }
    candidateSubmissions = Array.from(playerBestMap.values());
  } else {
    candidateSubmissions = validSubmissions;
  }

  // 2. Ordenar canónicamente:
  // - score (desc/asc)
  // - desempate: ranked_at ascendente (el que lo logró antes queda primero)
  // - desempate secundario: player_id estable
  candidateSubmissions.sort((a, b) => {
    if (a.score !== b.score) {
      return scoreOrder === 'desc' ? b.score - a.score : a.score - b.score;
    }
    const timeA = new Date(a.ranked_at).getTime();
    const timeB = new Date(b.ranked_at).getTime();
    if (timeA !== timeB) {
      return timeA - timeB;
    }
    return a.player_id.localeCompare(b.player_id);
  });

  // 3. Tomar como máximo clampedLimit y calcular rank
  const topRows = candidateSubmissions.slice(0, clampedLimit);

  return topRows.map((item, index) => ({
    rank: index + 1,
    display_name: sanitizeDisplayName(item.display_name),
    score: item.score,
    ranked_at: item.ranked_at,
  }));
}
