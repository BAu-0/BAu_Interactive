import { Game } from '@/types/game';
import { NewsPost } from '@/types/news';
import { LeaderboardEntry } from '@/types/leaderboard';

export const FALLBACK_GAME: Game = {
  id: 'pok-tschack-001',
  slug: 'pok-tschack',
  title: 'Pok-Tschack',
  short_description:
    'Domina los rebotes, atraviesa un aro de apertura cambiante y anota para ganar más tiempo. Un arcade vertical 2D de precisión y físicas inspirado en el juego de pelota mesoamericano.',
  full_description:
    'Pok-Tschack es un videojuego independiente de arcade 2D y precisión en formato vertical, inspirado en el juego de pelota mesoamericano. Muévete, salta e intercepta la pelota para hacerla cruzar un aro de piedra que gira y altera continuamente su apertura. Cada gol reinicia el reloj y prolonga la partida mientras la cancha introduce criaturas, trampas y desafíos que ponen a prueba tu capacidad de adaptación y reflejos.',
  status: 'beta',
  display_version: 'v1.0-beta',
  cover_image_path: '/images/pok-tschack/Pok-Tschack!.png',
  hero_image_path: '/images/pok-tschack/POK-TSCHACK-LOGO.png',
  leaderboard_enabled: true,
  leaderboard_mode: 'best_score',
  score_order: 'desc',
  score_label: 'Puntos',
  featured: true,
  sort_order: 1,
  published_at: '2026-10-20T00:00:00Z',
  links: [
    {
      id: 'l-1',
      type: 'beta',
      url: process.env.NEXT_PUBLIC_BETA_URL || 'https://garanda.itch.io/pok-tschack-betav1',
      enabled: true,
      sort_order: 1,
    },
    {
      id: 'l-2',
      type: 'itch',
      url: 'https://garanda.itch.io/pok-tschack-betav1',
      enabled: true,
      sort_order: 2,
    },
  ],
  features: [
    'Reloj dinámico: cada gol reinicia el cronómetro a 60 segundos y premia la rapidez con hasta 100 puntos.',
    'Física de rebotes e inercia: interceptación precisa, acumulación de impulso en paredes y control de trayectorias.',
    'Cancha reactiva: criaturas como Luxen, interferencias de Temotl, Punzantes en el aro y Mirones de bloqueo.',
    'Desafíos de 30 segundos y objetos misteriosos con alteraciones temporales de reglas.',
    'Habilidad arcade pura: cero micropagos, con tienda de mejoras temporales adquiridas con puntos de la misma partida.',
  ],
  system_requirements: [
    {
      platform: 'Navegador Web (PC / Móvil)',
      minimum: 'Chrome, Firefox, Safari o Edge con soporte HTML5 y aceleración gráfica',
      recommended: 'Navegador moderno a 60 Hz. En móviles, se recomienda jugar en orientación vertical.',
    },
    {
      platform: 'Móviles (Android)',
      minimum: 'En desarrollo activo para distribución nativa en Google Play',
      recommended: 'Controles optimizados para gestos de deslizamiento táctil y toque',
    },
  ],
};

export const FALLBACK_NEWS: NewsPost[] = [
  {
    id: 'n-1',
    slug: 'beta-v1-pok-tschack-itchio',
    game_id: 'pok-tschack-001',
    game_title: 'Pok-Tschack',
    title: 'Beta v1.0 de Pok-Tschack disponible en itch.io',
    excerpt:
      'La primera versión de prueba de Pok-Tschack ya está accesible en navegador. Prueba la física de rebotes, el aro dinámico y comparte tus impresiones.',
    body: `La beta v1.0 de **Pok-Tschack** se encuentra disponible en itch.io para jugar directamente en navegador sin descargas obligatorias.

### ¿Qué encontrarás en esta versión?
- **Mecánica central de aro rotatorio**: el aro gira y cambia de apertura en tiempo real, exigiendo leer el momento exacto para encajar la pelota.
- **Reloj reiniciable**: cada gol reinicia el tiempo a 60 segundos. Los goles veloces otorgan mayores puntuaciones (hasta 100 puntos por anotación).
- **Control de inercia y rebotes**: aprovecha el personaje, las paredes y el techo para construir trayectorias precisas.
- **Pruebas y criaturas en cancha**: interferencias de Luxen, Punzantes y fases de reto que cambian las condiciones del juego.

### Feedback de la comunidad
Como estudio independiente, los comentarios sobre sensibilidad de controles (tanto en teclado como en gestos táctiles móviles) y balance de dificultad son fundamentales para pulir el juego rumbo a su versión final.`,
    category: 'anuncio',
    status: 'published',
    author_name: 'BAu',
    published_at: '2026-10-18T14:00:00Z',
  },
  {
    id: 'n-2',
    slug: 'mecanicas-cancha-y-aro-giratorio',
    game_id: 'pok-tschack-001',
    game_title: 'Pok-Tschack',
    title: 'Notas de Diseño: Física de rebotes, impulso y lectura de aro',
    excerpt:
      'Profundizamos en cómo la cancha interactúa con la pelota, la acumulación de impulso al encadenar golpes y la estrategia de tiempo.',
    body: `En Pok-Tschack la cancha no es un simple escenario pasivo, sino el eje de todo el desafío.

### Factores clave de la jugabilidad:
1. **Acumulación de Impulso**: Encadenar golpes en el aire y rebotes en paredes y techo incrementa la velocidad de la pelota. Tocar el suelo corta la acumulación de inercia, pero no elimina al jugador.
2. **Aro de Apertura Variable**: La piedra gira constantemente. Encontrar la ventana en la que la apertura es suficiente para el paso de la pelota requiere cálculo y paciencia bajo la presión del reloj.
3. **Escalones de Puntuación**: Los goles inmediatos valen 100 puntos; conforme avanzan los segundos del reloj, el valor desciende a 75, 50 y 25 puntos. Anotar rápido no solo salva tu tiempo, sino que maximiza tu marca.`,
    category: 'desarrollo',
    status: 'published',
    author_name: 'BAu',
    published_at: '2026-10-16T18:00:00Z',
  },
  {
    id: 'n-3',
    slug: 'criaturas-y-desafios-de-cancha',
    game_id: 'pok-tschack-001',
    game_title: 'Pok-Tschack',
    title: 'Bitácora #1: Luxen, Temotl y los Desafíos de 30 segundos',
    excerpt:
      'Cómo las interferencias en la cancha evitan la monotonía y obligan al jugador a tomar decisiones en fracciones de segundo.',
    body: `A medida que un intento se prolonga y se acumulan goles, la cancha incrementa sus pruebas:

- **Luxen**: Criaturas que aparecen cerca del suelo para atrapar o arrebatar la pelota. El jugador debe saltar cerca de ellos para recuperarla de inmediato.
- **Temotl**: Una presencia que interfiere físicamente con el aro o la pelota mediante fintas y bloqueos temporales.
- **Punzantes y Mirones**: Peligros que penalizan puntos al tocar el aro o sellos que exigen golpear objetos específicos antes de volver a anotar.
- **Fases de Desafío**: Eventos de 30 segundos con combinaciones de gravedad variable, controles invertidos o aros teletransportados donde al menos un gol es necesario para superar la prueba.`,
    category: 'desarrollo',
    status: 'published',
    author_name: 'BAu',
    published_at: '2026-10-14T10:00:00Z',
  },
];

export const FALLBACK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, display_name: 'BAu_Dev', score: 3850, ranked_at: '2026-10-19T20:30:00Z' },
  { rank: 2, display_name: 'CanchaMaster', score: 3200, ranked_at: '2026-10-19T18:45:00Z' },
  { rank: 3, display_name: 'RebotePro', score: 2950, ranked_at: '2026-10-19T15:10:00Z' },
  { rank: 4, display_name: 'InerciaPilot', score: 2600, ranked_at: '2026-10-18T22:20:00Z' },
  { rank: 5, display_name: 'AroHunter', score: 2350, ranked_at: '2026-10-18T19:00:00Z' },
  { rank: 6, display_name: 'LuxenSlayer', score: 2100, ranked_at: '2026-10-18T14:30:00Z' },
  { rank: 7, display_name: 'TemotlRival', score: 1850, ranked_at: '2026-10-17T21:15:00Z' },
  { rank: 8, display_name: 'SpeedStriker', score: 1600, ranked_at: '2026-10-17T17:05:00Z' },
  { rank: 9, display_name: 'PelotaAzul', score: 1450, ranked_at: '2026-10-17T11:50:00Z' },
  { rank: 10, display_name: 'GrecasRun', score: 1300, ranked_at: '2026-10-16T20:30:00Z' },
  { rank: 11, display_name: 'PixelCourt', score: 1150, ranked_at: '2026-10-16T14:10:00Z' },
  { rank: 12, display_name: 'ZeroDrop', score: 1000, ranked_at: '2026-10-15T19:00:00Z' },
  { rank: 13, display_name: 'TimeKeep', score: 850, ranked_at: '2026-10-15T13:45:00Z' },
  { rank: 14, display_name: 'Reflejo99', score: 700, ranked_at: '2026-10-14T16:20:00Z' },
  { rank: 15, display_name: 'BetaTester1', score: 550, ranked_at: '2026-10-14T09:10:00Z' },
];

export const FALLBACK_SOCIAL_LINKS = [
  {
    id: 's-1',
    platform: 'reddit' as const,
    label: 'Comunidad en Reddit',
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
