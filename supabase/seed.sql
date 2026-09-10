-- =============================================================================
-- Seed de Demostración: BAu Interactive & Aether Drift
-- =============================================================================

-- Inserción del juego principal: Aether Drift
INSERT INTO public.games (
  id,
  slug,
  title,
  short_description,
  full_description,
  status,
  display_version,
  leaderboard_enabled,
  leaderboard_mode,
  score_order,
  score_label,
  featured,
  sort_order,
  published_at
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  'aether-drift',
  'Aether Drift',
  'Sobrevive a las ráfagas del vacío en este arcade de velocidad y reflejos extremos.',
  'Aether Drift es un homenaje contemporáneo a la era dorada de los arcades de supervivencia con una estética retro-futurista y banda sonora synthwave dinámica. Pilota tu nave a través del pulso del vacío, esquiva campos gravitacionales cambiantes, encadena multiplicadores de inercia y compite por el codiciado Top 15 mundial.',
  'beta',
  'v0.9.5-beta',
  true,
  'best_score',
  'desc',
  'Puntos',
  true,
  1,
  now()
) ON CONFLICT (slug) DO NOTHING;

-- Enlaces del juego
INSERT INTO public.game_links (game_id, type, url, enabled, sort_order) VALUES
('11111111-1111-1111-1111-111111111111', 'beta', 'https://play.bauinteractive.com/beta', true, 1),
('11111111-1111-1111-1111-111111111111', 'itch', 'https://bau-interactive.itch.io/aether-drift', true, 2)
ON CONFLICT DO NOTHING;

-- Configuración del Sitio
INSERT INTO public.site_settings (key, value) VALUES
('studio_info', '{"name": "BAu Interactive", "tagline": "Juegos independientes con pulso arcade y alma digital", "support_email": "soporte@bauinteractive.com"}'),
('hero_settings', '{"cta_primary_label": "Probar la Beta", "cta_secondary_label": "Comunidad en Reddit"}')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Enlaces de Redes y Comunidad
INSERT INTO public.social_links (platform, url, label, enabled, sort_order) VALUES
('reddit', 'https://reddit.com/r/BAuInteractive', 'r/BAuInteractive', true, 1),
('discord', 'https://discord.gg/bauinteractive', 'Servidor de Discord', true, 2),
('github', 'https://github.com/BAu-0/BAu_Interactive', 'GitHub Oficial', true, 3)
ON CONFLICT DO NOTHING;

-- Artículos y Devlogs
INSERT INTO public.news_posts (
  slug,
  game_id,
  title,
  excerpt,
  body,
  category,
  status,
  author_name,
  published_at
) VALUES
(
  'lanzamiento-beta-publica-aether-drift',
  '11111111-1111-1111-1111-111111111111',
  '¡La Beta Pública de Aether Drift ya está disponible!',
  'Abrimos las puertas del vacío a la comunidad. Juega directamente desde el navegador o descarga la versión de prueba y comparte tu experiencia.',
  'Hoy marcamos un hito para **BAu Interactive**: el lanzamiento de la primera beta pública jugable de *Aether Drift*.\n\n### ¿Qué incluye esta versión?\n- Modo Supervivencia Clásico con oleadas dinámicas.\n- Sistema de multiplicadores de inercia y física de deslizamiento calibrada.\n- Integración completa con el Top 15 mundial en tiempo real.\n\n### Tu opinión es el motor del proyecto\nComo estudio independiente, cada comentario cuenta. Ya hemos abierto nuestro hilo de retroalimentación en Reddit para escuchar tus impresiones sobre el control, balance de dificultad y rendimiento.',
  'anuncio',
  'published',
  'Equipo BAu',
  now() - INTERVAL '3 days'
),
(
  'parche-v0-9-5-balance-y-leaderboard',
  '11111111-1111-1111-1111-111111111111',
  'Notas de Versión v0.9.5: Calibración de inercia y prevención de colisiones fantasma',
  'Ajustes finos en las físicas de frenado, corrección de hitbox en los vórtices de antimateria y nueva función de refresco de clasificación.',
  '### Registro de Cambios v0.9.5\n\n- **Jugabilidad**: Ajustado el radio del hitbox en un 4% para esquives más precisos al límite.\n- **Clasificación**: Implementado sistema de idempotencia en envíos de partidas con `client_submission_id`.\n- **Audio**: Nuevo efecto de sonido de reverberación al activar el modo Hiperimpulso.',
  'notas_de_version',
  'published',
  'Equipo BAu',
  now() - INTERVAL '1 day'
),
(
  'bitacora-diseno-sonoro-retro-futurista',
  '11111111-1111-1111-1111-111111111111',
  'Bitácora #1: Sintetizadores analógicos y la búsqueda del pulso perfecto',
  'Descubre cómo construimos la atmósfera sonora de Aether Drift combinando sintetizadores FM de los 80 con diseño de audio reactivo.',
  'La música en un arcade no es un simple fondo: es el pulso cardíaco del jugador. En esta bitácora explicamos cómo creamos transiciones de audio procedurales que reaccionan a la proximidad de los obstáculos y aumentan el tempo conforme te acercas a romper tu récord personal.',
  'desarrollo',
  'published',
  'Equipo BAu',
  now() - INTERVAL '5 days'
)
ON CONFLICT (slug) DO NOTHING;

-- Jugadores de prueba para el Top 15
INSERT INTO private.player_profiles (id, display_name, normalized_display_name) VALUES
('a0000000-0000-0000-0000-000000000001', 'VortexPilot', 'vortexpilot'),
('a0000000-0000-0000-0000-000000000002', 'NeonRunner_99', 'neonrunner_99'),
('a0000000-0000-0000-0000-000000000003', 'CyberSpecter', 'cyberspecter'),
('a0000000-0000-0000-0000-000000000004', 'SolarisApex', 'solarisapex'),
('a0000000-0000-0000-0000-000000000005', 'Echo_Striker', 'echo_striker'),
('a0000000-0000-0000-0000-000000000006', 'QuantumShift', 'quantumshift'),
('a0000000-0000-0000-0000-000000000007', 'GlitchDrifter', 'glitchdrifter'),
('a0000000-0000-0000-0000-000000000008', 'NullVector', 'nullvector'),
('a0000000-0000-0000-0000-000000000009', 'AeroPulse', 'aeropulse'),
('a0000000-0000-0000-0000-000000000010', 'RetroByte', 'retrobyte'),
('a0000000-0000-0000-0000-000000000011', 'HyperionX', 'hyperionx'),
('a0000000-0000-0000-0000-000000000012', 'ZeroGravity', 'zerogravity'),
('a0000000-0000-0000-0000-000000000013', 'LaserPhantom', 'laserphantom'),
('a0000000-0000-0000-0000-000000000014', 'CosmicFlux', 'cosmicflux'),
('a0000000-0000-0000-0000-000000000015', 'SubZeroPilot', 'subzeropilot')
ON CONFLICT (id) DO NOTHING;

-- Envíos de partidas
INSERT INTO private.score_submissions (
  id, game_id, player_id, client_submission_id, score, platform, game_version, ranked_at
) VALUES
('b0000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000001', 'sub-01', 985400, 'web', '0.9.5', now() - INTERVAL '2 hours'),
('b0000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000002', 'sub-02', 942150, 'web', '0.9.5', now() - INTERVAL '5 hours'),
('b0000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000003', 'sub-03', 895300, 'web', '0.9.5', now() - INTERVAL '8 hours'),
('b0000000-0000-0000-0000-000000000004', '11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000004', 'sub-04', 854200, 'web', '0.9.5', now() - INTERVAL '12 hours'),
('b0000000-0000-0000-0000-000000000005', '11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000005', 'sub-05', 812900, 'web', '0.9.5', now() - INTERVAL '1 day'),
('b0000000-0000-0000-0000-000000000006', '11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000006', 'sub-06', 776400, 'web', '0.9.4', now() - INTERVAL '1 day'),
('b0000000-0000-0000-0000-000000000007', '11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000007', 'sub-07', 734100, 'web', '0.9.4', now() - INTERVAL '2 days'),
('b0000000-0000-0000-0000-000000000008', '11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000008', 'sub-08', 698500, 'web', '0.9.4', now() - INTERVAL '2 days'),
('b0000000-0000-0000-0000-000000000009', '11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000009', 'sub-09', 662000, 'web', '0.9.4', now() - INTERVAL '2 days'),
('b0000000-0000-0000-0000-000000000010', '11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000010', 'sub-10', 625300, 'web', '0.9.4', now() - INTERVAL '3 days'),
('b0000000-0000-0000-0000-000000000011', '11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000011', 'sub-11', 589000, 'web', '0.9.4', now() - INTERVAL '3 days'),
('b0000000-0000-0000-0000-000000000012', '11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000012', 'sub-12', 554200, 'web', '0.9.3', now() - INTERVAL '4 days'),
('b0000000-0000-0000-0000-000000000013', '11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000013', 'sub-13', 512000, 'web', '0.9.3', now() - INTERVAL '4 days'),
('b0000000-0000-0000-0000-000000000014', '11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000014', 'sub-14', 481500, 'web', '0.9.3', now() - INTERVAL '5 days'),
('b0000000-0000-0000-0000-000000000015', '11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000015', 'sub-15', 440200, 'web', '0.9.2', now() - INTERVAL '5 days')
ON CONFLICT (game_id, client_submission_id) DO NOTHING;

-- Proyección de mejores marcas para el Top 15 canónico
INSERT INTO private.leaderboard_best (
  game_id, player_id, best_score, display_name, ranked_at, accepted_submission_id
) VALUES
('11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000001', 985400, 'VortexPilot', now() - INTERVAL '2 hours', 'b0000000-0000-0000-0000-000000000001'),
('11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000002', 942150, 'NeonRunner_99', now() - INTERVAL '5 hours', 'b0000000-0000-0000-0000-000000000002'),
('11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000003', 895300, 'CyberSpecter', now() - INTERVAL '8 hours', 'b0000000-0000-0000-0000-000000000003'),
('11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000004', 854200, 'SolarisApex', now() - INTERVAL '12 hours', 'b0000000-0000-0000-0000-000000000004'),
('11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000005', 812900, 'Echo_Striker', now() - INTERVAL '1 day', 'b0000000-0000-0000-0000-000000000005'),
('11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000006', 776400, 'QuantumShift', now() - INTERVAL '1 day', 'b0000000-0000-0000-0000-000000000006'),
('11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000007', 734100, 'GlitchDrifter', now() - INTERVAL '2 days', 'b0000000-0000-0000-0000-000000000007'),
('11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000008', 698500, 'NullVector', now() - INTERVAL '2 days', 'b0000000-0000-0000-0000-000000000008'),
('11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000009', 662000, 'AeroPulse', now() - INTERVAL '2 days', 'b0000000-0000-0000-0000-000000000009'),
('11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000010', 625300, 'RetroByte', now() - INTERVAL '3 days', 'b0000000-0000-0000-0000-000000000010'),
('11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000011', 589000, 'HyperionX', now() - INTERVAL '3 days', 'b0000000-0000-0000-0000-000000000011'),
('11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000012', 554200, 'ZeroGravity', now() - INTERVAL '4 days', 'b0000000-0000-0000-0000-000000000012'),
('11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000013', 512000, 'LaserPhantom', now() - INTERVAL '4 days', 'b0000000-0000-0000-0000-000000000013'),
('11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000014', 481500, 'CosmicFlux', now() - INTERVAL '5 days', 'b0000000-0000-0000-0000-000000000014'),
('11111111-1111-1111-1111-111111111111', 'a0000000-0000-0000-0000-000000000015', 440200, 'SubZeroPilot', now() - INTERVAL '5 days', 'b0000000-0000-0000-0000-000000000015')
ON CONFLICT (game_id, player_id) DO UPDATE SET
  best_score = EXCLUDED.best_score,
  ranked_at = EXCLUDED.ranked_at,
  accepted_submission_id = EXCLUDED.accepted_submission_id,
  updated_at = now();
