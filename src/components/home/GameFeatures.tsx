import React from 'react';
import { Zap, Music, Trophy, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: 'Física Inercial de Precisión',
    description:
      'Control suave y milimétrico a 60 FPS sin retraso de entrada. Cada esquive al límite recarga tu impulso.',
    accent: 'text-arcade-cyan',
    border: 'hover:border-arcade-cyan/50',
  },
  {
    icon: Music,
    title: 'Audio Synthwave Procedural',
    description:
      'Sintetizadores FM de los 80 que evolucionan dinámicamente con tu multiplicador de puntuación y velocidad.',
    accent: 'text-arcade-pink',
    border: 'hover:border-arcade-pink/50',
  },
  {
    icon: Trophy,
    title: 'Top 15 Mundial Verificado',
    description:
      'Clasificación canónica centralizada. Solo cuentan partidas aprobadas por el servidor mediante protocolo seguro.',
    accent: 'text-arcade-gold',
    border: 'hover:border-arcade-gold/50',
  },
  {
    icon: ShieldCheck,
    title: 'Pura Habilidad, Cero P2W',
    description:
      'Sin compras dentro del juego, sin temporizadores forzados y sin anuncios que rompan la inmersión del arcade.',
    accent: 'text-arcade-green',
    border: 'hover:border-arcade-green/50',
  },
];

export function GameFeatures() {
  return (
    <section className="py-16 bg-surface/50 border-y border-surface-border/50" aria-labelledby="features-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 id="features-title" className="text-xs font-bold uppercase tracking-widest text-arcade-cyan mb-2">
            Mecánicas y Filosofía
          </h2>
          <p className="text-3xl font-bold tracking-tight text-white">
            Diseñado para poner a prueba tus reflejos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-surface-card/60 border border-surface-border transition-all duration-300 hover:-translate-y-1 ${feature.border} shadow-lg`}
              >
                <div className={`w-12 h-12 rounded-xl bg-background flex items-center justify-center mb-4 ${feature.accent}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
