export interface GameLink {
  id: string;
  type: 'beta' | 'play' | 'google_play' | 'app_store' | 'steam' | 'itch';
  url: string;
  enabled: boolean;
  sort_order: number;
}

export interface Game {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  full_description: string;
  status: 'beta' | 'released' | 'coming_soon' | 'paused';
  cover_image_path?: string | null;
  hero_image_path?: string | null;
  trailer_url?: string | null;
  display_version: string;
  leaderboard_enabled: boolean;
  leaderboard_mode: 'best_score' | 'all_runs';
  score_order: 'desc' | 'asc';
  score_label: string;
  release_date?: string | null;
  featured: boolean;
  sort_order: number;
  published_at?: string | null;
  links: GameLink[];
  features?: string[];
  system_requirements?: {
    platform: string;
    minimum: string;
    recommended: string;
  }[];
}
