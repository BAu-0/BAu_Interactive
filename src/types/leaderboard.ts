export interface LeaderboardEntry {
  rank: number;
  display_name: string;
  score: number;
  ranked_at: string;
}

export interface RawScoreSubmission {
  player_id: string;
  display_name: string;
  score: number;
  ranked_at: string;
  verification_status: 'pending' | 'verified' | 'rejected' | 'hidden';
  is_blocked?: boolean;
}

export interface LeaderboardState {
  entries: LeaderboardEntry[];
  isLoading: boolean;
  isStale: boolean;
  lastUpdated: Date | null;
  error: string | null;
}
