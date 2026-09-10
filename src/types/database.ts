export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      games: {
        Row: {
          id: string;
          slug: string;
          title: string;
          short_description: string;
          full_description: string;
          status: 'beta' | 'released' | 'coming_soon' | 'paused';
          cover_image_path: string | null;
          hero_image_path: string | null;
          trailer_url: string | null;
          display_version: string;
          leaderboard_enabled: boolean;
          leaderboard_mode: 'best_score' | 'all_runs';
          score_order: 'desc' | 'asc';
          score_label: string;
          release_date: string | null;
          featured: boolean;
          sort_order: number;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      game_links: {
        Row: {
          id: string;
          game_id: string;
          type: 'beta' | 'play' | 'google_play' | 'app_store' | 'steam' | 'itch';
          url: string;
          enabled: boolean;
          sort_order: number;
          created_at: string;
        };
      };
      news_posts: {
        Row: {
          id: string;
          slug: string;
          game_id: string | null;
          title: string;
          excerpt: string;
          body: string;
          category: 'anuncio' | 'actualizacion' | 'notas_de_version' | 'desarrollo';
          cover_image_path: string | null;
          cover_alt: string | null;
          status: 'draft' | 'published' | 'archived';
          author_name: string;
          seo_title: string | null;
          seo_description: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      site_settings: {
        Row: {
          key: string;
          value: Json;
          updated_at: string;
        };
      };
      social_links: {
        Row: {
          id: string;
          platform: 'reddit' | 'discord' | 'twitter' | 'github' | 'youtube';
          url: string;
          label: string;
          enabled: boolean;
          sort_order: number;
          created_at: string;
        };
      };
    };
    Functions: {
      get_public_leaderboard: {
        Args: {
          p_game_slug: string;
          p_limit?: number;
        };
        Returns: {
          rank: number;
          display_name: string;
          score: number;
          ranked_at: string;
        }[];
      };
    };
  };
}
