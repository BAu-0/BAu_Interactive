import { Game } from '@/types/game';
import { NewsPost } from '@/types/news';
import { LeaderboardEntry } from '@/types/leaderboard';

export const FALLBACK_GAME: Game = {
  id: '11111111-1111-1111-1111-111111111111',
  slug: 'aether-drift',
  title: 'Aether Drift',
  short_description: 'Sobrevive a las ráfagas del vacío en este arcade de velocidad y reflejos extremos.',
  full_description:
    'Aether Drift es un homenaje contemporáneo a la era dorada de los arcades de supervivencia con una estética retro-futurista y banda sonora synthwave dinámica. Pilota tu nave a través del pulso del vacío, esquiva campos gravitacionales cambiantes, encadena multiplicadores de inercia y compite por el codiciado Top 15 mundial.',
  status: 'beta',
  display_version: 'v0.9.5-beta',
  leaderboard_enabled: true,
  leaderboard_mode: 'best_score',
  score_order: 'desc',
  score_label: 'Puntos',
  featured: true,
  sort_order: 1,
  published_at: '2026-09-01T00:00:00Z',
  links: [
    {
      id: 'l-1',
      type: 'beta',
      url: process.env.NEXT_PUBLIC_BETA_URL || 'https://play.bauinteractive.com/beta',
      enabled: true,
      sort_order: 1,
    },
    {
      id: 'l-2',
      type: 'itch',
      url: 'https://bau-interactive.itch.io/aether-drift',
      enabled: true,
      sort_order: 2,
    },
  ],
  features: [
    'Control inercial hipercalibrado a 60 FPS con respuesta instantánea.',
    'Banda sonora synthwave procedural que acelera con tu multiplicador de supervivencia.',
    'Clasificación canónica mundial en tiempo real con validación antifraude.',
    'Sin anuncios invasivos, sin pay-to-win, 100% habilidad arcade pura.',
  ],
  system_requirements: [
    {
      platform: 'Navegador Web',
      minimum: 'Chrome 115+, Firefox 118+, Safari 16+ con aceleración por hardware',
      recommended: 'Cualquier navegador moderno con tasa de refresco a 60Hz o 144Hz',
    },
    {
      platform: 'Windows',
      minimum: 'Windows 10 64-bit, 4 GB RAM, Intel HD 4000 o superior',
      recommended: 'Windows 11, 8 GB RAM, GPU dedicada compatible con DirectX 11',
    },
  ],
};

export const FALLBACK_NEWS: NewsPost[] = [
  {
    id: 'n-1',
    slug: 'lanzamiento-beta-publica-aether-drift',
    game_id: '11111111-1111-1111-1111-111111111111',
    game_title: 'Aether Drift',
    title: '¡La Beta Pública de Aether Drift ya está disponible!',
    excerpt:
      'Abrimos las puertas del vacío a la comunidad. Juega directamente desde el navegador o descarga la versión de prueba y comparte tu experiencia.',
    body: `Hoy marcamos un hito para **BAu Interactive**: el lanzamiento de la primera beta pública jugable de *Aether Drift*.

### ¿Qué incluye esta versión inicial?
- **Modo Supervivencia Clásico**: Oleadas de vórtices y partículas con dificultad adaptativa.
- **Física de Inercia**: Esquives milimétricos al borde del choque para recargar el medidor de turbo.
- **Top 15 Canónico**: Tu mejor marca se registra automáticamente en la tabla de clasificación mundial.

### La comunidad es el centro del desarrollo
Como estudio independiente, cada detalle cuenta. Hemos abierto nuestro hilo oficial en Reddit para recibir cualquier comentario sobre balance de controles, dificultad y rendimiento.`,
    category: 'anuncio',
    status: 'published',
    author_name: 'Equipo BAu',
    published_at: '2026-09-07T14:00:00Z',
  },
  {
    id: 'n-2',
    slug: 'parche-v0-9-5-balance-y-leaderboard',
    game_id: '11111111-1111-1111-1111-111111111111',
    game_title: 'Aether Drift',
    title: 'Notas de Versión v0.9.5: Calibración de inercia y prevención de colisiones fantasma',
    excerpt:
      'Ajustes finos en las físicas de frenado, corrección de hitbox en los vórtices de antimateria y nueva función de refresco de clasificación.',
    body: `### Registro de Cambios v0.9.5

- **Jugabilidad**: Reducido el radio del hitbox de colisión en un 4% para permitir esquives más ajustados.
- **Clasificación**: Implementado sistema de idempotencia en envíos de partidas con \`client_submission_id\` para evitar pérdida de puntuaciones por fluctuaciones de red.
- **Audio**: Nuevo efecto de sonido de reverberación al activar el modo Hiperimpulso.
- **Rendimiento**: Optimización del buffer de renderizado WebGL para pantallas con alta tasa de refresco (120Hz/144Hz).`,
    category: 'notas_de_version',
    status: 'published',
    author_name: 'Equipo BAu',
    published_at: '2026-09-09T18:30:00Z',
  },
  {
    id: 'n-3',
    slug: 'bitacora-diseno-sonoro-retro-futurista',
    game_id: '11111111-1111-1111-1111-111111111111',
    game_title: 'Aether Drift',
    title: 'Bitácora #1: Sintetizadores analógicos y la búsqueda del pulso perfecto',
    excerpt:
      'Descubre cómo construimos la atmósfera sonora de Aether Drift combinando sintetizadores FM de los 80 con diseño de audio reactivo.',
    body: `La música en un arcade de supervivencia no es un simple adorno: es el metrónomo de tu concentración.

En esta primera bitácora compartimos el proceso creativo detrás de la banda sonora:
1. **Capas Dinámicas**: Las pistas están divididas en 4 capas de sintetizadores (arpegio, bajo sub, leads y percusión) que entran progresivamente conforme la partida avanza.
2. **Efecto de Tensión**: Cuando tu multiplicador supera x10, las frecuencias bajas se filtran sutilmente para enfocar tus reflejos auditivos en los avisos de impacto.

Queremos que cada partida se sienta como una carrera contrarreloj a través de una noche de neón infinita.`,
    category: 'desarrollo',
    status: 'published',
    author_name: 'Equipo BAu',
    published_at: '2026-09-05T10:15:00Z',
  },
];

export const FALLBACK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, display_name: 'VortexPilot', score: 985400, ranked_at: '2026-09-10T15:30:00Z' },
  { rank: 2, display_name: 'NeonRunner_99', score: 942150, ranked_at: '2026-09-10T12:45:00Z' },
  { rank: 3, display_name: 'CyberSpecter', score: 895300, ranked_at: '2026-09-10T09:15:00Z' },
  { rank: 4, display_name: 'SolarisApex', score: 854200, ranked_at: '2026-09-10T05:20:00Z' },
  { rank: 5, display_name: 'Echo_Striker', score: 812900, ranked_at: '2026-09-09T22:10:00Z' },
  { rank: 6, display_name: 'QuantumShift', score: 776400, ranked_at: '2026-09-09T18:40:00Z' },
  { rank: 7, display_name: 'GlitchDrifter', score: 734100, ranked_at: '2026-09-08T21:15:00Z' },
  { rank: 8, display_name: 'NullVector', score: 698500, ranked_at: '2026-09-08T17:05:00Z' },
  { rank: 9, display_name: 'AeroPulse', score: 662000, ranked_at: '2026-09-08T11:50:00Z' },
  { rank: 10, display_name: 'RetroByte', score: 625300, ranked_at: '2026-09-07T20:30:00Z' },
  { rank: 11, display_name: 'HyperionX', score: 589000, ranked_at: '2026-09-07T14:10:00Z' },
  { rank: 12, display_name: 'ZeroGravity', score: 554200, ranked_at: '2026-09-06T19:00:00Z' },
  { rank: 13, display_name: 'LaserPhantom', score: 512000, ranked_at: '2026-09-06T13:45:00Z' },
  { rank: 14, display_name: 'CosmicFlux', score: 481500, ranked_at: '2026-09-05T16:20:00Z' },
  { rank: 15, display_name: 'SubZeroPilot', score: 440200, ranked_at: '2026-09-05T09:10:00Z' },
];

export const FALLBACK_SOCIAL_LINKS = [
  {
    id: 's-1',
    platform: 'reddit' as const,
    label: 'r/BAuInteractive',
    url: process.env.NEXT_PUBLIC_FEEDBACK_URL || 'https://reddit.com/r/BAuInteractive',
    enabled: true,
  },
  {
    id: 's-2',
    platform: 'discord' as const,
    label: 'Discord Oficial',
    url: process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/bauinteractive',
    enabled: true,
  },
  {
    id: 's-3',
    platform: 'github' as const,
    label: 'GitHub',
    url: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/BAu-0/BAu_Interactive',
    enabled: true,
  },
];
