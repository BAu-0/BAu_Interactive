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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 bg-white font-sans">
      {/* Cabecera */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-widest text-[#00a836] mb-2 block">
          Telemetría Canónica // Top 15 Mundial
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-950 uppercase mb-4">
          Salón de la Fama Mundial
        </h1>
        <p className="text-sm text-zinc-600 leading-relaxed font-sans">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-zinc-200">
        <div className="p-6 rounded-lg bg-white border border-zinc-200 space-y-3 shadow-sm text-xs">
          <div className="flex items-center space-x-2 text-[#00a836] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-sm text-zinc-950">Criterios de Desempate & Elegibilidad</h3>
          </div>
          <ul className="text-zinc-600 space-y-2 list-disc list-inside leading-relaxed text-xs">
            <li>
              <strong className="text-zinc-900">Mejor marca personal:</strong> Solo se proyecta el puntaje más alto alcanzado por cada jugador.
            </li>
            <li>
              <strong className="text-zinc-900">Desempate cronológico:</strong> En caso de igualdad de puntos, el jugador que haya registrado su marca antes (<code>ranked_at</code>) conservará el puesto superior.
            </li>
            <li>
              <strong className="text-zinc-900">Cálculo dinámico en consulta:</strong> La posición se computa de forma atómica en cada solicitud a la base de datos.
            </li>
            <li>
              <strong className="text-zinc-900">Filtro antifraude:</strong> Registros con firmas inválidas o descalificados no son procesados por la RPC.
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-lg bg-white border border-zinc-200 space-y-3 shadow-sm text-xs">
          <div className="flex items-center space-x-2 text-zinc-800 font-bold uppercase tracking-wider">
            <HelpCircle className="w-5 h-5 text-zinc-500" />
            <h3 className="text-sm text-zinc-950">Ingestión & Protocolo de Red</h3>
          </div>
          <p className="text-zinc-600 leading-relaxed text-xs font-sans">
            Al concluir una partida en el ejecutable o versión web de <em>Aether Drift</em>, el cliente genera un identificador de idempotencia (<code>client_submission_id</code>) y firma la sesión mediante token validado. Las marcas aprobadas se reflejan en este tablero en un lapso máximo de 45 segundos mientras la pestaña se mantenga activa.
          </p>
        </div>
      </div>
    </div>
  );
}
