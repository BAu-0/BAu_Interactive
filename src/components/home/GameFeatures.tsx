import React from 'react';
import { Cpu, Headphones, Activity, Gauge } from 'lucide-react';

const FEATURES = [
  {
    icon: Gauge,
    title: 'Latencia Ultrabaja & 60 FPS',
    description:
      'Muestreo de entrada directo sobre canvas optimizado sin amortiguación artificial. Respuesta instantánea en cada micro-esquive.',
    tag: 'LATENCIA < 16MS',
  },
  {
    icon: Headphones,
    title: 'Audio Espacial Procedural',
    description:
      'Capas de audio analógico calibradas mediante síntesis física reactiva que se modulan dinámicamente con tu velocidad e inercia.',
    tag: 'SYNTHESIS ENGINE',
  },
  {
    icon: Activity,
    title: 'Telemetría Criptográfica',
    description:
      'Sistema de clasificación verificado lado servidor. Cada partida se sella con firma atómica única e idempotencia contra trampas.',
    tag: 'SHA-256 VERIFIED',
  },
  {
    icon: Cpu,
    title: 'Física Determinista Pura',
    description:
      'Cero mecánicas pay-to-win, cero compras internas y cero temporizadores. Rendimiento basado 100% en la precisión motriz del piloto.',
    tag: 'ZERO P2W ARCHITECTURE',
  },
];

export function GameFeatures() {
  return (
    <section className="py-20 bg-canvas border-b border-border-subtle" aria-labelledby="features-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent-razer mb-2 block">
              ESPECIFICACIONES DE SISTEMA
            </span>
            <h2 id="features-title" className="text-3xl sm:text-4xl font-black tracking-tight text-text-primary uppercase font-display">
              Arquitectura de Precisión
            </h2>
          </div>
          <p className="text-xs font-mono text-text-muted max-w-sm">
            Diseñado bajo estándares de ingeniería de hardware competitivo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-lg bg-surface-card border border-border-subtle hover:border-border-hover transition-all duration-200 shadow-fluent-rest group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded border border-border-subtle bg-surface-elevated flex items-center justify-center mb-6 text-accent-titanium group-hover:text-accent-razer group-hover:border-accent-razer/40 transition-colors">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <h3 className="text-sm font-bold text-text-primary uppercase tracking-wide mb-2 font-display">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed font-sans">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-border-subtle/60 flex items-center justify-between text-[10px] font-mono text-text-muted">
                  <span>{feature.tag}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-border-hover group-hover:bg-accent-razer transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
