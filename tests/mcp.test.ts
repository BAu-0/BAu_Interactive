import { describe, it, expect } from 'vitest';
import { GET, POST } from '@/app/api/mcp/route';
import { NextRequest } from 'next/server';

function createPostRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost:3000/api/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

function createGetRequest(): NextRequest {
  return new NextRequest('http://localhost:3000/api/mcp', {
    method: 'GET',
  });
}

describe('MCP Web Server (/api/mcp)', () => {
  it('GET /api/mcp devuelve el manifiesto de descubrimiento y CORS habilitado', async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();

    expect(data.status).toBe('online');
    expect(data.protocolVersion).toBe('2024-11-05');
    expect(data.server.name).toBe('bau-interactive-web-mcp');
    expect(data.tools).toBeInstanceOf(Array);
    expect(data.tools.length).toBeGreaterThanOrEqual(7);
  });

  it('POST initialize retorna versión de protocolo y capacidades', async () => {
    const req = createPostRequest({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();

    expect(data.jsonrpc).toBe('2.0');
    expect(data.id).toBe(1);
    expect(data.result.protocolVersion).toBe('2024-11-05');
    expect(data.result.serverInfo.name).toBe('bau-interactive-web-mcp');
    expect(data.result.capabilities).toHaveProperty('tools');
    expect(data.result.capabilities).toHaveProperty('resources');
    expect(data.result.capabilities).toHaveProperty('prompts');
  });

  it('POST tools/list lista todas las herramientas disponibles', async () => {
    const req = createPostRequest({
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/list',
    });

    const res = await POST(req);
    const data = await res.json();

    expect(data.result.tools).toBeInstanceOf(Array);
    const toolNames = data.result.tools.map((t: { name: string }) => t.name);
    expect(toolNames).toContain('get_studio_info');
    expect(toolNames).toContain('get_games');
    expect(toolNames).toContain('get_game_details');
    expect(toolNames).toContain('get_game_mechanics');
    expect(toolNames).toContain('get_latest_news');
    expect(toolNames).toContain('get_beta_access');
    expect(toolNames).toContain('get_leaderboard');
  });

  it('POST tools/call ejecuta get_studio_info correctamente', async () => {
    const req = createPostRequest({
      jsonrpc: '2.0',
      id: 3,
      method: 'tools/call',
      params: {
        name: 'get_studio_info',
        arguments: {},
      },
    });

    const res = await POST(req);
    const data = await res.json();

    expect(data.result.content[0].type).toBe('text');
    const parsed = JSON.parse(data.result.content[0].text);
    expect(parsed.name).toBe('BAu Interactive');
    expect(parsed.country).toBe('México');
  });

  it('POST tools/call ejecuta get_game_details para pok-tschack', async () => {
    const req = createPostRequest({
      jsonrpc: '2.0',
      id: 4,
      method: 'tools/call',
      params: {
        name: 'get_game_details',
        arguments: { slug: 'pok-tschack' },
      },
    });

    const res = await POST(req);
    const data = await res.json();

    const parsed = JSON.parse(data.result.content[0].text);
    expect(parsed.title).toBe('Pok-Tschack');
    expect(parsed.status).toBe('beta');
  });

  it('POST tools/call retorna error 404/formateado para herramientas desconocidas', async () => {
    const req = createPostRequest({
      jsonrpc: '2.0',
      id: 5,
      method: 'tools/call',
      params: {
        name: 'herramienta_inexistente',
        arguments: {},
      },
    });

    const res = await POST(req);
    const data = await res.json();

    expect(data.error).toBeDefined();
    expect(data.error.code).toBe(-32601);
  });

  it('POST resources/list y resources/read funcionan correctamente', async () => {
    const listReq = createPostRequest({
      jsonrpc: '2.0',
      id: 6,
      method: 'resources/list',
    });
    const listRes = await POST(listReq);
    const listData = await listRes.json();
    expect(listData.result.resources.length).toBeGreaterThan(0);

    const readReq = createPostRequest({
      jsonrpc: '2.0',
      id: 7,
      method: 'resources/read',
      params: { uri: 'studio://manifesto' },
    });
    const readRes = await POST(readReq);
    const readData = await readRes.json();
    expect(readData.result.contents[0].uri).toBe('studio://manifesto');
    expect(readData.result.contents[0].text).toContain('BAu Interactive');
  });

  it('POST prompts/list devuelve las plantillas de prompts para agentes', async () => {
    const req = createPostRequest({
      jsonrpc: '2.0',
      id: 8,
      method: 'prompts/list',
    });

    const res = await POST(req);
    const data = await res.json();

    expect(data.result.prompts.length).toBeGreaterThan(0);
    const promptNames = data.result.prompts.map((p: { name: string }) => p.name);
    expect(promptNames).toContain('resumen-estudio');
    expect(promptNames).toContain('como-jugar-pok-tschack');
  });
});
