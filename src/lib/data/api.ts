import { getSupabaseClient } from '@/lib/supabase/client';
import { Game, GameLink } from '@/types/game';
import { NewsPost, NewsCategory } from '@/types/news';
import { LeaderboardEntry } from '@/types/leaderboard';
import {
  FALLBACK_GAME,
  FALLBACK_NEWS,
  FALLBACK_LEADERBOARD,
  FALLBACK_SOCIAL_LINKS,
} from './fallback';

export async function getFeaturedGame(): Promise<Game> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return FALLBACK_GAME;
  }

  try {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('featured', true)
      .limit(1)
      .single();

    if (error || !data) {
      return FALLBACK_GAME;
    }

    const game = data as unknown as Game;

    const { data: linksData } = await supabase
      .from('game_links')
      .select('*')
      .eq('game_id', game.id)
      .eq('enabled', true)
      .order('sort_order', { ascending: true });

    const links = (linksData as unknown as GameLink[]) || [];

    return {
      ...game,
      links,
      features: FALLBACK_GAME.features,
      system_requirements: FALLBACK_GAME.system_requirements,
    };
  } catch {
    return FALLBACK_GAME;
  }
}

export async function getGameBySlug(slug: string): Promise<Game | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return slug === FALLBACK_GAME.slug ? FALLBACK_GAME : null;
  }

  try {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return slug === FALLBACK_GAME.slug ? FALLBACK_GAME : null;
    }

    const game = data as unknown as Game;

    const { data: linksData } = await supabase
      .from('game_links')
      .select('*')
      .eq('game_id', game.id)
      .eq('enabled', true)
      .order('sort_order', { ascending: true });

    const links = (linksData as unknown as GameLink[]) || [];

    return {
      ...game,
      links,
      features: FALLBACK_GAME.features,
      system_requirements: FALLBACK_GAME.system_requirements,
    };
  } catch {
    return slug === FALLBACK_GAME.slug ? FALLBACK_GAME : null;
  }
}

export async function getAllGames(): Promise<Game[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return [FALLBACK_GAME];
  }

  try {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return [FALLBACK_GAME];
    }

    const games = data as unknown as Game[];

    return games.map((g) => ({
      ...g,
      links: [],
      features: FALLBACK_GAME.features,
      system_requirements: FALLBACK_GAME.system_requirements,
    }));
  } catch {
    return [FALLBACK_GAME];
  }
}

export async function getLeaderboard(
  gameSlug: string = 'aether-drift',
  limit: number = 15
): Promise<LeaderboardEntry[]> {
  const clampedLimit = Math.min(Math.max(limit, 1), 15);
  const supabase = getSupabaseClient();

  if (!supabase) {
    return FALLBACK_LEADERBOARD.slice(0, clampedLimit);
  }

  try {
    const { data, error } = await (supabase as any).rpc('get_public_leaderboard', {
      p_game_slug: gameSlug,
      p_limit: clampedLimit,
    });

    if (error || !data || !Array.isArray(data) || data.length === 0) {
      return FALLBACK_LEADERBOARD.slice(0, clampedLimit);
    }

    return (data as Array<{ rank: number; display_name: string; score: number; ranked_at: string }>).map((item) => ({
      rank: item.rank,
      display_name: item.display_name,
      score: Number(item.score),
      ranked_at: item.ranked_at,
    }));
  } catch {
    return FALLBACK_LEADERBOARD.slice(0, clampedLimit);
  }
}

export async function getNewsPosts(category?: NewsCategory): Promise<NewsPost[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    if (!category) return FALLBACK_NEWS;
    return FALLBACK_NEWS.filter((n) => n.category === category);
  }

  try {
    let query = supabase
      .from('news_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      if (!category) return FALLBACK_NEWS;
      return FALLBACK_NEWS.filter((n) => n.category === category);
    }

    return data as unknown as NewsPost[];
  } catch {
    return FALLBACK_NEWS;
  }
}

export async function getNewsPostBySlug(slug: string): Promise<NewsPost | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return FALLBACK_NEWS.find((n) => n.slug === slug) || null;
  }

  try {
    const { data, error } = await supabase
      .from('news_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !data) {
      return FALLBACK_NEWS.find((n) => n.slug === slug) || null;
    }

    return data as unknown as NewsPost;
  } catch {
    return FALLBACK_NEWS.find((n) => n.slug === slug) || null;
  }
}

export async function getSocialLinks() {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return FALLBACK_SOCIAL_LINKS;
  }

  try {
    const { data, error } = await supabase
      .from('social_links')
      .select('*')
      .eq('enabled', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_SOCIAL_LINKS;
    }

    return data;
  } catch {
    return FALLBACK_SOCIAL_LINKS;
  }
}
