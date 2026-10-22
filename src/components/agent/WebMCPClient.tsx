'use client';

import { useEffect } from 'react';

/**
 * WebMCPClient - Browser Agent Integration (Chrome 150+ / WebMCP Spec)
 *
 * Registra las herramientas de BAu Interactive en el contexto de agentes del navegador
 * (navigator.modelContext) para permitir navegación inteligente, extracción estructurada
 * y llamadas directas sin CLS ni sobrecarga de renderizado.
 */

interface WebMCPTool {
  name: string;
  description: string;
  inputSchema?: Record<string, unknown>;
  readOnlyHint?: boolean;
  consequentialHint?: boolean;
  execute?: (args?: Record<string, unknown>) => Promise<unknown> | unknown;
}

interface NavigatorWithModelContext extends Navigator {
  modelContext?: {
    registerTool: (tool: WebMCPTool) => void;
    unregisterTool?: (name: string) => void;
  };
}

export function WebMCPClient() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Herramientas declaradas para agentes en el navegador
    const tools: WebMCPTool[] = [
      {
        name: 'get_studio_info',
        description:
          'Devuelve información sobre BAu Interactive, su filosofía de juego arcade y enlaces oficiales.',
        readOnlyHint: true,
        consequentialHint: false,
        execute: async () => {
          const res = await fetch('/api/mcp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0',
              id: 'client-studio',
              method: 'tools/call',
              params: { name: 'get_studio_info', arguments: {} },
            }),
          });
          return await res.json();
        },
      },
      {
        name: 'get_game_details',
        description:
          'Consulta detalles técnicos, plataforma y jugabilidad de Pok-Tschack o proyectos del estudio.',
        inputSchema: {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              description: 'Slug del juego (ej. pok-tschack)',
              default: 'pok-tschack',
            },
          },
        },
        readOnlyHint: true,
        consequentialHint: false,
        execute: async (args?: Record<string, unknown>) => {
          const res = await fetch('/api/mcp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0',
              id: 'client-game',
              method: 'tools/call',
              params: {
                name: 'get_game_details',
                arguments: { slug: args?.slug || 'pok-tschack' },
              },
            }),
          });
          return await res.json();
        },
      },
      {
        name: 'get_game_mechanics',
        description:
          'Obtiene las reglas de juego, dinámica de la cancha mesoamericana, reloj y físicas de Pok-Tschack.',
        readOnlyHint: true,
        consequentialHint: false,
        execute: async () => {
          const res = await fetch('/api/mcp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0',
              id: 'client-mechanics',
              method: 'tools/call',
              params: { name: 'get_game_mechanics', arguments: {} },
            }),
          });
          return await res.json();
        },
      },
      {
        name: 'get_beta_access',
        description:
          'Obtiene el enlace para jugar la beta pública de Pok-Tschack en navegador web o descargar APK.',
        readOnlyHint: true,
        consequentialHint: false,
        execute: async () => {
          const res = await fetch('/api/mcp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0',
              id: 'client-beta',
              method: 'tools/call',
              params: { name: 'get_beta_access', arguments: {} },
            }),
          });
          return await res.json();
        },
      },
      {
        name: 'get_latest_news',
        description:
          'Obtiene las últimas noticias, notas de parche y devlogs del estudio.',
        readOnlyHint: true,
        consequentialHint: false,
        execute: async () => {
          const res = await fetch('/api/mcp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0',
              id: 'client-news',
              method: 'tools/call',
              params: { name: 'get_latest_news', arguments: { limit: 3 } },
            }),
          });
          return await res.json();
        },
      },
    ];

    // Registro nativo si el navegador soporta WebMCP (navigator.modelContext)
    const nav = navigator as NavigatorWithModelContext;
    if (nav.modelContext && typeof nav.modelContext.registerTool === 'function') {
      try {
        tools.forEach((t) => nav.modelContext!.registerTool(t));
      } catch (err) {
        console.debug('[WebMCP] Error al registrar herramientas en navigator.modelContext', err);
      }
    }

    // Exposición global para crawlers e inspectores de agentes
    (window as unknown as { __BAU_MCP__: unknown }).__BAU_MCP__ = {
      endpoint: '/api/mcp',
      llmsTxt: '/llms.txt',
      llmsFullTxt: '/llms-full.txt',
      protocolVersion: '2024-11-05',
      tools: tools.map(({ name, description, inputSchema }) => ({
        name,
        description,
        inputSchema,
      })),
    };
  }, []);

  return null;
}
