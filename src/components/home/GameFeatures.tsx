import React from 'react';
import { Cpu, Headphones, Activity, Gauge } from 'lucide-react';

const FEATURES = [
  {
    icon: Gauge,
    title: 'Latencia Ultrabaja & 60 FPS',
    description:
      'Muestreo de entrada directo sobre canvas optimizado sin amortiguación artificial. Respuesta instantánea en cada esquive milimétrico.',
    tag: 'Latencia < 16ms',
  },
  {
    icon: Headphones,
    title: 'Audio Espacial Procedural',
    description:
      'Capas de audio analógico calibradas mediante síntesis física reactiva que se modulan dinámicamente con tu velocidad e inercia.',
    tag: 'Síntesis Reactiva',
  },
  {
    icon: Activity,
    title: 'Telemetría Criptográfica',
    description:
      'Sistema de clasificación verificado lado servidor. Cada partida se sella con firma atómica única e idempotencia contra trampas.',
    tag: 'Validación SHA-256',
  },
  {
    icon: Cpu,
    title: 'Física Determinista Pura',
    description:
      'Cero mecánicas pay-to-win, cero compras internas y cero temporizadores. Rendimiento basado 100% en la precisión motriz del piloto.',
    tag: '100% Habilidad Pura',
  },
];

export function GameFeatures() {
  return (
    <section className="py-20 bg-zinc-50 border-b border-zinc-200" aria-labelledby="features-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#00a836] mb-2 block">
              Mecánicas y Rendimiento
            </span>
            <h2 id="features-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
              Arquitectura de Precisión
            </h2>
          </div>
          <p className="text-sm text-zinc-600 max-w-sm">
            Diseñado bajo estándares de ingeniería y gaming competitivo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-lg bg-white border border-zinc-200 hover:border-zinc-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded border border-zinc-200 bg-zinc-100 flex items-center justify-center mb-6 text-zinc-800 group-hover:text-black group-hover:border-[#00d647] transition-colors">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <h3 className="text-base font-bold text-black mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed font-sans">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-100 flex items-center justify-between text-xs font-medium text-zinc-500">
                  <span>{feature.tag}</span>
                  <span className="w-2 h-2 rounded-full bg-zinc-300 group-hover:bg-[#00d647] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
