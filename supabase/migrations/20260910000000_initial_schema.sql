-- =============================================================================
-- Migración Inicial: Portal de Videojuegos Independiente BAu Interactive
-- Basado en especificación canónica con separación de esquemas y RLS
-- =============================================================================

-- 1. Esquema Privado para Datos de Partidas y Jugadores
CREATE SCHEMA IF NOT EXISTS private;

-- Desautorizar al rol público o anónimo acceder directamente al esquema privado
REVOKE ALL ON SCHEMA private FROM PUBLIC;
REVOKE ALL ON SCHEMA private FROM anon;
REVOKE ALL ON SCHEMA private FROM authenticated;

-- =============================================================================
-- 2. Esquema Público: Catálogo, Enlaces, Novedades y Configuración
-- =============================================================================

-- Tabla: games
CREATE TABLE IF NOT EXISTS public.games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'beta' CHECK (status IN ('beta', 'released', 'coming_soon', 'paused')),
  cover_image_path TEXT,
  hero_image_path TEXT,
  trailer_url TEXT,
  display_version TEXT DEFAULT 'v0.9.5-beta',
  leaderboard_enabled BOOLEAN DEFAULT true,
  leaderboard_mode TEXT DEFAULT 'best_score' CHECK (leaderboard_mode IN ('best_score', 'all_runs')),
  score_order TEXT DEFAULT 'desc' CHECK (score_order IN ('desc', 'asc')),
  score_label TEXT DEFAULT 'Puntos',
  release_date TIMESTAMPTZ,
  featured BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla: game_links (enlaces condicionales a beta, tiendas, etc.)
CREATE TABLE IF NOT EXISTS public.game_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('beta', 'play', 'google_play', 'app_store', 'steam', 'itch')),
  url TEXT NOT NULL,
  enabled BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla: news_posts (artículos editoriales y devlogs)
CREATE TABLE IF NOT EXISTS public.news_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  game_id UUID REFERENCES public.games(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'actualizacion' CHECK (category IN ('anuncio', 'actualizacion', 'notas_de_version', 'desarrollo')),
  cover_image_path TEXT,
  cover_alt TEXT,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  author_name TEXT DEFAULT 'Equipo BAu',
  seo_title TEXT,
  seo_description TEXT,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla: site_settings (configuración editorial y metadatos)
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla: social_links (enlaces activos de comunidad)
CREATE TABLE IF NOT EXISTS public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL CHECK (platform IN ('reddit', 'discord', 'twitter', 'github', 'youtube')),
  url TEXT NOT NULL,
  label TEXT NOT NULL,
  enabled BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================================================
-- 3. Esquema Privado: Perfiles, Partidas y Proyección de Puntuaciones
-- =============================================================================

CREATE TABLE IF NOT EXISTS private.player_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name TEXT NOT NULL,
  normalized_display_name TEXT NOT NULL,
  is_blocked BOOLEAN DEFAULT false,
  moderation_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS private.score_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
  player_id UUID NOT NULL REFERENCES private.player_profiles(id) ON DELETE CASCADE,
  run_id TEXT,
  client_submission_id TEXT NOT NULL,
  score BIGINT NOT NULL,
  platform TEXT NOT NULL DEFAULT 'web',
  game_version TEXT NOT NULL,
  verification_status TEXT NOT NULL DEFAULT 'verified' CHECK (verification_status IN ('pending', 'verified', 'rejected', 'hidden')),
  rejection_reason TEXT,
  ranked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT uq_game_client_submission UNIQUE (game_id, client_submission_id)
);

CREATE TABLE IF NOT EXISTS private.leaderboard_best (
  game_id UUID NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
  player_id UUID NOT NULL REFERENCES private.player_profiles(id) ON DELETE CASCADE,
  best_score BIGINT NOT NULL,
  display_name TEXT NOT NULL,
  ranked_at TIMESTAMPTZ NOT NULL,
  accepted_submission_id UUID NOT NULL REFERENCES private.score_submissions(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (game_id, player_id)
);

CREATE INDEX IF NOT EXISTS idx_lb_best_ranking 
  ON private.leaderboard_best (game_id, best_score DESC, ranked_at ASC);

-- =============================================================================
-- 4. Función Canónica Pública RPC: get_public_leaderboard
-- Devuelve hasta 15 filas validadas sin exponer datos privados ni IDs de jugadores
-- =============================================================================

CREATE OR REPLACE FUNCTION public.get_public_leaderboard(
  p_game_slug TEXT,
  p_limit INT DEFAULT 15
)
RETURNS TABLE (
  rank INT,
  display_name TEXT,
  score BIGINT,
  ranked_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_game_id UUID;
  v_clamped_limit INT;
BEGIN
  -- Acotar límite estrictamente entre 1 y 15
  v_clamped_limit := LEAST(GREATEST(COALESCE(p_limit, 15), 1), 15);

  -- Obtener identificador del juego
  SELECT id INTO v_game_id
  FROM public.games
  WHERE slug = p_game_slug 
    AND (published_at IS NOT NULL AND published_at <= now())
  LIMIT 1;

  IF v_game_id IS NULL THEN
    RETURN;
  END IF;

  RETURN QUERY
  SELECT
    (ROW_NUMBER() OVER (ORDER BY lb.best_score DESC, lb.ranked_at ASC, lb.player_id ASC))::INT AS rank,
    lb.display_name,
    lb.best_score AS score,
    lb.ranked_at
  FROM private.leaderboard_best lb
  JOIN private.player_profiles p ON p.id = lb.player_id
  WHERE lb.game_id = v_game_id
    AND p.is_blocked = false
  ORDER BY lb.best_score DESC, lb.ranked_at ASC, lb.player_id ASC
  LIMIT v_clamped_limit;
END;
$$;

-- Permisos de ejecución de la RPC
REVOKE ALL ON FUNCTION public.get_public_leaderboard(TEXT, INT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_leaderboard(TEXT, INT) TO anon;
GRANT EXECUTE ON FUNCTION public.get_public_leaderboard(TEXT, INT) TO authenticated;

-- =============================================================================
-- 5. Configuración de Row Level Security (RLS)
-- =============================================================================

ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

-- Lectura pública para elementos publicados
CREATE POLICY "Lectura pública de juegos publicados" 
  ON public.games FOR SELECT 
  TO anon, authenticated 
  USING (published_at IS NOT NULL AND published_at <= now());

CREATE POLICY "Lectura pública de enlaces activos" 
  ON public.game_links FOR SELECT 
  TO anon, authenticated 
  USING (enabled = true);

CREATE POLICY "Lectura pública de novedades publicadas" 
  ON public.news_posts FOR SELECT 
  TO anon, authenticated 
  USING (status = 'published' AND published_at IS NOT NULL AND published_at <= now());

CREATE POLICY "Lectura pública de configuración" 
  ON public.site_settings FOR SELECT 
  TO anon, authenticated 
  USING (true);

CREATE POLICY "Lectura pública de redes sociales activas" 
  ON public.social_links FOR SELECT 
  TO anon, authenticated 
  USING (enabled = true);

-- Las tablas privadas NO tienen lectura ni escritura desde clientes anónimos
ALTER TABLE private.player_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE private.score_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE private.leaderboard_best ENABLE ROW LEVEL SECURITY;
