import { NextRequest, NextResponse } from 'next/server';
import {
  getAllGames,
  getGameBySlug,
  getNewsPosts,
  getLeaderboard,
  getFeaturedGame,
} from '@/lib/data/api';

const MCP_SERVER_INFO = {
  name: 'bau-interactive-web-mcp',
  version: '1.0.0',
};

const PROTOCOL_VERSION = '2024-11-05';

const TOOLS = [
  {
    name: 'get_studio_info',
    description:
      'Devuelve la información institucional, filosofía de diseño, año de inicio y canales comunitarios de BAu Interactive.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_games',
    description:
      'Devuelve la lista completa de videojuegos y proyectos desarrollados por BAu Interactive.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_game_details',
    description:
      'Devuelve la ficha técnica profunda de un videojuego específico por su slug (ej. "pok-tschack").',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'Identificador del juego (ej. "pok-tschack").',
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'get_game_mechanics',
    description:
      'Devuelve las reglas de juego, dinámica de cancha, reloj y físicas de Pok-Tschack.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_latest_news',
    description:
      'Devuelve las últimas publicaciones, notas de versión y bitácoras de desarrollo (devlogs) del estudio.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'number',
          description: 'Número máximo de artículos a retornar (por defecto 3).',
        },
      },
    },
  },
  {
    name: 'get_beta_access',
    description:
      'Devuelve el enlace oficial para jugar la beta pública de Pok-Tschack en el navegador web (HTML5) y Android.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_leaderboard',
    description:
      'Devuelve la tabla de clasificación y mejores puntuaciones registradas en Pok-Tschack.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'number',
          description: 'Número de posiciones a consultar (por defecto 10).',
        },
      },
    },
  },
];

const RESOURCES = [
  {
    uri: 'studio://manifesto',
    name: 'Manifiesto de BAu Interactive',
    description: 'Principios de diseño, 60 FPS, física determinista y rechazo al pay-to-win.',
    mimeType: 'text/markdown',
  },
  {
    uri: 'game://pok-tschack/overview',
    name: 'Ficha General de Pok-Tschack',
    description: 'Sinopsis, estado de beta y especificaciones de Pok-Tschack.',
    mimeType: 'text/markdown',
  },
  {
    uri: 'game://pok-tschack/rules',
    name: 'Reglas y Mecánicas de Cancha',
    description: 'Detalle de aros, reloj de 60 segundos, físicas y criaturas.',
    mimeType: 'text/markdown',
  },
];

const PROMPTS = [
  {
    name: 'resumen-estudio',
    description: 'Genera un resumen conciso sobre el estudio independiente BAu Interactive.',
  },
  {
    name: 'como-jugar-pok-tschack',
    description: 'Explica a un nuevo jugador cómo funciona la cancha y cómo sobrevivir en Pok-Tschack.',
  },
];

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
  // Respuesta informativa y de descubrimiento para clientes HTTP / Agentes
  const discovery = {
    protocol: 'model-context-protocol',
    protocolVersion: PROTOCOL_VERSION,
    server: MCP_SERVER_INFO,
    serverInfo: MCP_SERVER_INFO,
    endpoints: {
      rpc: '/api/mcp',
      llmsTxt: '/llms.txt',
      llmsFullTxt: '/llms-full.txt',
    },
    capabilities: {
      tools: TOOLS.map((t) => ({ name: t.name, description: t.description })),
      resources: RESOURCES.map((r) => ({ uri: r.uri, name: r.name })),
      prompts: PROMPTS.map((p) => ({ name: p.name, description: p.description })),
    },
    tools: TOOLS,
    status: 'online',
  };

  return NextResponse.json(discovery, {
    headers: {
      ...CORS_HEADERS,
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        error: { code: -32700, message: 'Parse error: JSON inválido' },
        id: null,
      },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const { jsonrpc, id, method, params } = body;

  if (jsonrpc !== '2.0') {
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        error: { code: -32600, message: 'Invalid Request: se requiere jsonrpc 2.0' },
        id: id ?? null,
      },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  // 1. Manejo de Inicialización MCP
  if (method === 'initialize') {
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: PROTOCOL_VERSION,
          capabilities: {
            tools: {},
            resources: {},
            prompts: {},
          },
          serverInfo: MCP_SERVER_INFO,
        },
      },
      { headers: CORS_HEADERS }
    );
  }

  // Notificación post-inicialización
  if (method === 'notifications/initialized') {
    return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
  }

  // Ping de salud
  if (method === 'ping') {
    return NextResponse.json({ jsonrpc: '2.0', id, result: {} }, { headers: CORS_HEADERS });
  }

  // 2. Herramientas (Tools)
  if (method === 'tools/list') {
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id,
        result: {
          tools: TOOLS,
        },
      },
      { headers: CORS_HEADERS }
    );
  }

  if (method === 'tools/call') {
    const toolName = params?.name;
    const args = params?.arguments || {};

    try {
      let resultData: any;

      switch (toolName) {
        case 'get_studio_info': {
          resultData = {
            name: 'BAu Interactive',
            country: 'México',
            type: 'Estudio independiente de desarrollo de videojuegos',
            year: 2026,
            tagline: 'Desarrollando desde 2026',
            philosophy: [
              'Física determinista y 60 FPS estables',
              'Habilidad pura y cero prácticas predatorias (0 Pay-to-Win)',
              'Desarrollo transparente con la comunidad de jugadores',
            ],
            links: {
              website: 'https://bauinteractive.com',
              itch: 'https://garanda.itch.io/pok-tschack-betav1',
              discord: 'https://discord.gg/bauinteractive',
              github: 'https://github.com/BAu-0/BAu_Interactive',
            },
          };
          break;
        }

        case 'get_games': {
          const games = await getAllGames();
          resultData = games.map((g) => ({
            id: g.id,
            slug: g.slug,
            title: g.title,
            status: g.status,
            display_version: g.display_version,
            short_description: g.short_description,
            page_url: `https://bauinteractive.com/juegos/${g.slug}`,
          }));
          break;
        }

        case 'get_game_details': {
          const slug = args.slug || 'pok-tschack';
          const game = await getGameBySlug(slug);
          if (!game) {
            return NextResponse.json(
              {
                jsonrpc: '2.0',
                id,
                result: {
                  isError: true,
                  content: [{ type: 'text', text: `Juego con slug "${slug}" no encontrado.` }],
                },
              },
              { headers: CORS_HEADERS }
            );
          }
          resultData = game;
          break;
        }

        case 'get_game_mechanics': {
          const game = await getFeaturedGame();
          resultData = {
            game: game.title,
            features: game.features,
            key_mechanics: [
              {
                name: 'Aro Rotatorio Variable',
                description: 'Aro de piedra en rotación continua con apertura cambiante.',
              },
              {
                name: 'Reloj Dinámico de 60s',
                description: 'Cada gol limpio reinicia el tiempo a 60 segundos.',
              },
              {
                name: 'Física de Rebote e Inercia',
                description: 'Impulso acumulable en paredes laterales y techo.',
              },
              {
                name: 'Criaturas',
                description: 'Luxen atrapan pelotas en suelo y Temotl genera fintas directas al aro.',
              },
              {
                name: 'Cero Pay-to-Win',
                description: 'Sin compras con dinero real; mejoras adquiridas con puntos de la partida.',
              },
            ],
          };
          break;
        }

        case 'get_latest_news': {
          const limit = typeof args.limit === 'number' ? args.limit : 3;
          const news = await getNewsPosts();
          resultData = news.slice(0, limit).map((n) => ({
            slug: n.slug,
            title: n.title,
            category: n.category,
            published_at: n.published_at,
            excerpt: n.excerpt,
            url: `https://bauinteractive.com/novedades/${n.slug}`,
          }));
          break;
        }

        case 'get_beta_access': {
          resultData = {
            game: 'Pok-Tschack',
            version: 'v1.0-beta',
            platform: 'HTML5 Navegador Web (PC / Móvil) y Android en desarrollo',
            play_url: 'https://garanda.itch.io/pok-tschack-betav1',
            cost: 'Completamente gratuito sin micropagos',
            requirements: 'Navegador moderno con soporte WebGL / HTML5 a 60 FPS',
          };
          break;
        }

        case 'get_leaderboard': {
          const limit = typeof args.limit === 'number' ? args.limit : 10;
          const scores = await getLeaderboard(limit);
          resultData = scores;
          break;
        }

        default:
          return NextResponse.json(
            {
              jsonrpc: '2.0',
              id,
              error: { code: -32601, message: `Herramienta "${toolName}" no encontrada` },
            },
            { status: 404, headers: CORS_HEADERS }
          );
      }

      return NextResponse.json(
        {
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(resultData, null, 2),
              },
            ],
          },
        },
        { headers: CORS_HEADERS }
      );
    } catch (err: any) {
      return NextResponse.json(
        {
          jsonrpc: '2.0',
          id,
          result: {
            isError: true,
            content: [{ type: 'text', text: `Error ejecutando ${toolName}: ${err.message}` }],
          },
        },
        { headers: CORS_HEADERS }
      );
    }
  }

  // 3. Recursos (Resources)
  if (method === 'resources/list') {
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id,
        result: {
          resources: RESOURCES,
        },
      },
      { headers: CORS_HEADERS }
    );
  }

  if (method === 'resources/read') {
    const uri = params?.uri;
    let textContent = '';

    if (uri === 'studio://manifesto') {
      textContent = `# Manifiesto de BAu Interactive\n\n- Física determinista y 60 FPS.\n- Destreza pura y cero prácticas predatorias.\n- Desarrollo abierto junto a la comunidad.`;
    } else if (uri === 'game://pok-tschack/overview') {
      const game = await getFeaturedGame();
      textContent = `# ${game.title}\n\n${game.full_description}\n\nBeta disponible: https://garanda.itch.io/pok-tschack-betav1`;
    } else if (uri === 'game://pok-tschack/rules') {
      textContent = `# Reglas de Pok-Tschack\n\n1. Atraviesa el aro rotatorio.\n2. Reinicia el cronómetro a 60s con cada gol.\n3. Evita que los Luxen roben la pelota en el suelo.\n4. Supera los desafíos de 30 segundos.`;
    } else {
      return NextResponse.json(
        {
          jsonrpc: '2.0',
          id,
          error: { code: -32602, message: `Recurso no encontrado: ${uri}` },
        },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id,
        result: {
          contents: [
            {
              uri,
              mimeType: 'text/markdown',
              text: textContent,
            },
          ],
        },
      },
      { headers: CORS_HEADERS }
    );
  }

  // 4. Prompts
  if (method === 'prompts/list') {
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id,
        result: {
          prompts: PROMPTS,
        },
      },
      { headers: CORS_HEADERS }
    );
  }

  if (method === 'prompts/get') {
    const promptName = params?.name;
    if (promptName === 'resumen-estudio') {
      return NextResponse.json(
        {
          jsonrpc: '2.0',
          id,
          result: {
            description: 'Resumen de BAu Interactive',
            messages: [
              {
                role: 'user',
                content: {
                  type: 'text',
                  text: 'Resume en un párrafo la identidad, proyectos y filosofía del estudio de videojuegos BAu Interactive.',
                },
              },
            ],
          },
        },
        { headers: CORS_HEADERS }
      );
    }

    if (promptName === 'como-jugar-pok-tschack') {
      return NextResponse.json(
        {
          jsonrpc: '2.0',
          id,
          result: {
            description: 'Instrucciones para jugar Pok-Tschack',
            messages: [
              {
                role: 'user',
                content: {
                  type: 'text',
                  text: 'Explica a un nuevo jugador cómo funciona la pelota, el aro rotatorio y el reloj dinámico en Pok-Tschack.',
                },
              },
            ],
          },
        },
        { headers: CORS_HEADERS }
      );
    }

    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id,
        error: { code: -32602, message: `Prompt no encontrado: ${promptName}` },
      },
      { status: 404, headers: CORS_HEADERS }
    );
  }

  // Método no implementado
  return NextResponse.json(
    {
      jsonrpc: '2.0',
      id,
      error: { code: -32601, message: `Método desconocido: ${method}` },
    },
    { status: 404, headers: CORS_HEADERS }
  );
}
