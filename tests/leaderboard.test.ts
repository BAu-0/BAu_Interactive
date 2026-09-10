import { describe, it, expect } from 'vitest';
import { computeCanonicalLeaderboard } from '@/lib/utils/leaderboard';
import { RawScoreSubmission } from '@/types/leaderboard';

describe('Canonical Leaderboard Logic', () => {
  it('ordena descendentemente por puntuación', () => {
    const submissions: RawScoreSubmission[] = [
      {
        player_id: 'p1',
        display_name: 'Player One',
        score: 5000,
        ranked_at: '2026-09-10T12:00:00Z',
        verification_status: 'verified',
      },
      {
        player_id: 'p2',
        display_name: 'Player Two',
        score: 10000,
        ranked_at: '2026-09-10T12:00:00Z',
        verification_status: 'verified',
      },
    ];

    const result = computeCanonicalLeaderboard(submissions);
    expect(result[0].display_name).toBe('Player Two');
    expect(result[0].score).toBe(10000);
    expect(result[0].rank).toBe(1);

    expect(result[1].display_name).toBe('Player One');
    expect(result[1].score).toBe(5000);
    expect(result[1].rank).toBe(2);
  });

  it('desempata mediante ranked_at ascendente (quien lo logró primero gana)', () => {
    const submissions: RawScoreSubmission[] = [
      {
        player_id: 'p1',
        display_name: 'Tardío',
        score: 8000,
        ranked_at: '2026-09-10T15:00:00Z', // Más tarde
        verification_status: 'verified',
      },
      {
        player_id: 'p2',
        display_name: 'Pionero',
        score: 8000,
        ranked_at: '2026-09-10T10:00:00Z', // Más temprano
        verification_status: 'verified',
      },
    ];

    const result = computeCanonicalLeaderboard(submissions);
    expect(result[0].display_name).toBe('Pionero');
    expect(result[0].rank).toBe(1);
    expect(result[1].display_name).toBe('Tardío');
    expect(result[1].rank).toBe(2);
  });

  it('deduplica y conserva solo la mejor marca por jugador en modo best_score', () => {
    const submissions: RawScoreSubmission[] = [
      {
        player_id: 'pilot_alpha',
        display_name: 'PilotAlpha',
        score: 3000,
        ranked_at: '2026-09-10T10:00:00Z',
        verification_status: 'verified',
      },
      {
        player_id: 'pilot_alpha',
        display_name: 'PilotAlpha',
        score: 9500, // Mejor marca
        ranked_at: '2026-09-10T14:00:00Z',
        verification_status: 'verified',
      },
      {
        player_id: 'pilot_alpha',
        display_name: 'PilotAlpha',
        score: 7200,
        ranked_at: '2026-09-10T16:00:00Z',
        verification_status: 'verified',
      },
      {
        player_id: 'pilot_beta',
        display_name: 'PilotBeta',
        score: 6000,
        ranked_at: '2026-09-10T11:00:00Z',
        verification_status: 'verified',
      },
    ];

    const result = computeCanonicalLeaderboard(submissions, { mode: 'best_score' });
    expect(result.length).toBe(2);
    expect(result[0].display_name).toBe('PilotAlpha');
    expect(result[0].score).toBe(9500);
    expect(result[1].display_name).toBe('PilotBeta');
    expect(result[1].score).toBe(6000);
  });

  it('excluye registros pendientes, rechazados o de jugadores bloqueados', () => {
    const submissions: RawScoreSubmission[] = [
      {
        player_id: 'p_legit',
        display_name: 'LegitPlayer',
        score: 8000,
        ranked_at: '2026-09-10T12:00:00Z',
        verification_status: 'verified',
      },
      {
        player_id: 'p_pending',
        display_name: 'PendingCheater',
        score: 999999,
        ranked_at: '2026-09-10T12:00:00Z',
        verification_status: 'pending',
      },
      {
        player_id: 'p_rejected',
        display_name: 'RejectedCheater',
        score: 999999,
        ranked_at: '2026-09-10T12:00:00Z',
        verification_status: 'rejected',
      },
      {
        player_id: 'p_blocked',
        display_name: 'BlockedUser',
        score: 8500,
        ranked_at: '2026-09-10T12:00:00Z',
        verification_status: 'verified',
        is_blocked: true,
      },
    ];

    const result = computeCanonicalLeaderboard(submissions);
    expect(result.length).toBe(1);
    expect(result[0].display_name).toBe('LegitPlayer');
  });

  it('acota estrictamente a un máximo de 15 filas aunque existan 30 jugadores', () => {
    const submissions: RawScoreSubmission[] = [];
    for (let i = 1; i <= 30; i++) {
      submissions.push({
        player_id: `player_${i}`,
        display_name: `Pilot ${i}`,
        score: 1000 * i,
        ranked_at: '2026-09-10T12:00:00Z',
        verification_status: 'verified',
      });
    }

    const result = computeCanonicalLeaderboard(submissions, { limit: 15 });
    expect(result.length).toBe(15);
    expect(result[0].score).toBe(30000); // El jugador 30 con 30.000
    expect(result[14].score).toBe(16000); // El puesto 15
    expect(result[14].rank).toBe(15);
  });

  it('no rellena con datos ficticios si hay menos de 15 registros', () => {
    const submissions: RawScoreSubmission[] = [
      {
        player_id: 'solo',
        display_name: 'SoloPlayer',
        score: 4500,
        ranked_at: '2026-09-10T12:00:00Z',
        verification_status: 'verified',
      },
    ];

    const result = computeCanonicalLeaderboard(submissions, { limit: 15 });
    expect(result.length).toBe(1);
  });
});
