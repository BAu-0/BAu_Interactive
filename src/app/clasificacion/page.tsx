import React from 'react';
import { getLeaderboard } from '@/lib/data/api';
import { LiveLeaderboard } from '@/components/leaderboard/LiveLeaderboard';
import { ShieldCheck, HelpCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Telemetría de Clasificación Mundial (Top 15)',
  description:
    'Tabla de clasificación canónica oficial de Aether Drift y títulos de BAu Interactive. Solo puntuaciones verificadas criptográficamente.',
};

export const revalidate = 30;

export default async function LeaderboardPage() {
  const initialLeaderboard = await getLeaderboard('aether-drift', 15);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12 bg-obsidian">
      {/* Cabecera */}
      <div className="max-w-3xl">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent-razer mb-2 block">
          CANONICAL_LEADERBOARD // TOP 15 TELEMETRY
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-text-primary uppercase font-display mb-4">
          Salón de la Fama Mundial
        </h1>
        <p className="text-sm text-text-muted leading-relaxed font-sans">
          Las 15 mejores marcas registradas y autenticadas por el servidor central de <strong>Aether Drift</strong>. Esta telemetría consume la misma fuente canónica que alimenta el cliente del juego en tiempo de ejecución.
        </p>
      </div>

      {/* Componente reactivo con polling en vivo */}
      <div className="space-y-6">
        <LiveLeaderboard
          initialEntries={initialLeaderboard}
          gameSlug="aether-drift"
          limit={15}
          showVerificationNote={true}
        />
      </div>

      {/* Reglas de la Clasificación y Preguntas Frecuentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-border-subtle">
        <div className="p-6 rounded-lg bg-surface-card border border-border-subtle space-y-3 font-mono text-xs">
          <div className="flex items-center space-x-2 text-accent-razer font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <h3>CRITERIOS DE DESEMPATE & ELEGIBILIDAD</h3>
          </div>
          <ul className="text-text-muted space-y-2 list-disc list-inside leading-relaxed text-[11px]">
            <li>
              <strong className="text-text-secondary">Mejor marca personal:</strong> Solo se proyecta el puntaje más alto alcanzado por cada jugador.
            </li>
            <li>
              <strong className="text-text-secondary">Desempate cronológico:</strong> En caso de igualdad de puntos, el jugador que haya registrado su marca antes (<code>ranked_at</code>) conservará el puesto superior.
            </li>
            <li>
              <strong className="text-text-secondary">Cálculo dinámico en consulta:</strong> La posición se computa de forma atómica en cada solicitud a la base de datos.
            </li>
            <li>
              <strong className="text-text-secondary">Filtro antifraude:</strong> Registros con firmas inválidas o descalificados no son procesados por la RPC.
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-lg bg-surface-card border border-border-subtle space-y-3 font-mono text-xs">
          <div className="flex items-center space-x-2 text-accent-titanium font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <h3>INGESTIÓN & PROTOCOLO DE RED</h3>
          </div>
          <p className="text-text-muted leading-relaxed text-[11px] font-sans">
            Al concluir una partida en el ejecutable o versión web de <em>Aether Drift</em>, el cliente genera un identificador de idempotencia (<code>client_submission_id</code>) y firma la sesión mediante token validado. Las marcas aprobadas se reflejan en este tablero en un lapso máximo de 45 segundos mientras la pestaña se mantenga activa.
          </p>
        </div>
      </div>
    </div>
  );
}
