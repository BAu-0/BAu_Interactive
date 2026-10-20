import React from 'react';
import { getLeaderboard } from '@/lib/data/api';
import { LiveLeaderboard } from '@/components/leaderboard/LiveLeaderboard';
import { ShieldCheck, HelpCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tabla de Clasificación (Top 15)',
  description:
    'Tabla de clasificación y marcas de juego para los títulos de BAu Interactive, incluyendo Pok-Tschack.',
};

export const revalidate = 30;

export default async function LeaderboardPage() {
  const initialLeaderboard = await getLeaderboard('pok-tschack', 15);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 bg-white font-sans">
      {/* Cabecera */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-widest text-[#7e22ce] mb-2 block">
          Telemetría de Cancha // Top 15
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-950 uppercase mb-4">
          Salón de Marcas
        </h1>
        <p className="text-sm text-zinc-600 leading-relaxed font-sans">
          Registro de las 15 mejores marcas obtenidas en <strong>Pok-Tschack</strong> y títulos de BAu Interactive. En la fase de beta actual las puntuaciones se guardan localmente y este tablero proyecta las marcas de referencia y telemetría de prueba del estudio.
        </p>
      </div>

      {/* Componente reactivo con polling en vivo */}
      <div className="space-y-6">
        <LiveLeaderboard
          initialEntries={initialLeaderboard}
          gameSlug="pok-tschack"
          limit={15}
          showVerificationNote={true}
        />
      </div>

      {/* Reglas de la Clasificación y Preguntas Frecuentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-zinc-200">
        <div className="p-6 rounded-lg bg-white border border-zinc-200 space-y-3 shadow-sm text-xs">
          <div className="flex items-center space-x-2 text-[#7e22ce] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-sm text-zinc-950">Criterios de Puntuación & Registro</h3>
          </div>
          <ul className="text-zinc-600 space-y-2 list-disc list-inside leading-relaxed text-xs">
            <li>
              <strong className="text-zinc-900">Mejor marca personal:</strong> Se registra la puntuación máxima alcanzada durante un intento continuo.
            </li>
            <li>
              <strong className="text-zinc-900">Desempate cronológico:</strong> En caso de igualdad de puntos, la marca registrada con anterioridad (<code>ranked_at</code>) conserva el puesto superior.
            </li>
            <li>
              <strong className="text-zinc-900">Goles vs. Puntos:</strong> Los goles acumulados aumentan la dificultad y prolongan la partida, mientras que los puntos reflejan la rapidez y precisión de cada gol.
            </li>
            <li>
              <strong className="text-zinc-900">Próxima Telemetría Global:</strong> El sistema de ranking sincronizado en tiempo real se implementará de cara al lanzamiento móvil.
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-lg bg-white border border-zinc-200 space-y-3 shadow-sm text-xs">
          <div className="flex items-center space-x-2 text-zinc-800 font-bold uppercase tracking-wider">
            <HelpCircle className="w-5 h-5 text-zinc-500" />
            <h3 className="text-sm text-zinc-950">Dinámica de Supervivencia y Reloj</h3>
          </div>
          <p className="text-zinc-600 leading-relaxed text-xs font-sans">
            En <em>Pok-Tschack</em> el reloj reinicia a 60 segundos con cada anotación efectiva a través del aro de piedra. Los goles anotados en los primeros segundos otorgan el máximo escalón de puntos (100 pts), incentivando un ritmo ágil de anticipación y rebotes continuos antes de que las criaturas interfieran en la cancha.
          </p>
        </div>
      </div>
    </div>
  );
}
