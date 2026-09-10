import React from 'react';
import { getLeaderboard } from '@/lib/data/api';
import { LiveLeaderboard } from '@/components/leaderboard/LiveLeaderboard';
import { Trophy, ShieldCheck, HelpCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clasificación Mundial (Top 15)',
  description:
    'Tabla de clasificación canónica oficial de Aether Drift y títulos de BAu Interactive. Solo puntuaciones verificadas.',
};

export const revalidate = 30; // Frescura cada 30 segundos

export default async function LeaderboardPage() {
  const initialLeaderboard = await getLeaderboard('aether-drift', 15);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Cabecera */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-arcade-gold mb-2">
          <Trophy className="w-4 h-4 fill-arcade-gold" />
          <span>Salón de la Fama Canónico</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
          Clasificación Mundial (Top 15)
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          Las 15 mejores marcas registradas y verificadas por nuestro servidor central para <strong>Aether Drift</strong>. Esta tabla consume exactamente la misma fuente de verdad que el videojuego.
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-surface-border">
        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-3">
          <div className="flex items-center space-x-2 text-arcade-cyan font-bold text-sm">
            <ShieldCheck className="w-5 h-5" />
            <h3>Reglas de Elegibilidad y Desempates</h3>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
            <li>
              <strong>Una sola marca por jugador:</strong> Se proyecta únicamente tu mejor puntuación personal histórica.
            </li>
            <li>
              <strong>Criterio de desempate:</strong> En caso de empate en puntos, el jugador que haya registrado su marca antes cronológicamente (<code>ranked_at</code>) conservará el puesto superior.
            </li>
            <li>
              <strong>Cálculo en consulta:</strong> La posición nunca es estática; se recalcula de forma atómica en cada consulta.
            </li>
            <li>
              <strong>Anti-trampas:</strong> Registros anómalos o manipulados son rechazados en la ingestión y no entran a la tabla pública.
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-3">
          <div className="flex items-center space-x-2 text-arcade-purple font-bold text-sm">
            <HelpCircle className="w-5 h-5" />
            <h3>¿Cómo aparece mi puntuación aquí?</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Al finalizar una partida en la versión Beta de <em>Aether Drift</em>, tu cliente genera una firma de sesión única y envía el resultado a través de nuestra API segura. Si superas a alguno de los 15 mejores pilotos del mundo, tu nombre aparecerá reflejado en menos de 60 segundos en esta pantalla.
          </p>
        </div>
      </div>
    </div>
  );
}
