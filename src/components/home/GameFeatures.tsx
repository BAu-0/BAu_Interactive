import React from 'react';
import { RotateCw, Clock, Zap, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    icon: RotateCw,
    title: 'Aro Rotatorio & Apertura Variable',
    description:
      'El aro de piedra gira de forma continua en la cancha. El reto exige leer el ángulo y calcular el momento exacto en que la apertura permite el cruce limpio de la pelota.',
    tag: 'Precisión de Tiro',
  },
  {
    icon: Clock,
    title: 'Reloj Dinámico Reiniciable',
    description:
      'Cada gol reinicia el tiempo a 60 segundos. La partida dura lo que tu destreza permita prolongar. Los goles rápidos recompensan con escalones de hasta 100 puntos.',
    tag: 'Supervivencia Activa',
  },
  {
    icon: Zap,
    title: 'Física de Rebote e Inercia',
    description:
      'Encadenar contactos en el aire y rebotes en paredes o techo acumula velocidad e impulso cinético. Tocar el suelo interrumpe la inercia sin eliminar al jugador.',
    tag: 'Control Físico 2D',
  },
  {
    icon: ShieldCheck,
    title: 'Habilidad Pura & Cero Pay-to-Win',
    description:
      'Sin micropagos con dinero real ni ventajas prediseñadas. La tienda interna utiliza exclusivamente puntos generados en la misma partida para mejoras temporales.',
    tag: '100% Destreza Arcade',
  },
];

export function GameFeatures() {
  return (
    <section className="py-20 bg-zinc-50 border-b border-zinc-200" aria-labelledby="features-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#7e22ce] mb-2 block">
              Mecánicas Principales
            </span>
            <h2 id="features-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-black uppercase">
              Pilares de Jugabilidad
            </h2>
          </div>
          <p className="text-sm text-zinc-600 max-w-sm">
            Diseñado para poner a prueba tu capacidad de respuesta y lectura de trayectorias bajo presión continua.
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
                  <div className="w-10 h-10 rounded border border-zinc-200 bg-zinc-100 flex items-center justify-center mb-6 text-zinc-800 group-hover:text-black group-hover:border-[#9333ea] transition-colors">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <h3 className="text-base font-bold text-black mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed font-sans">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span className="text-[#7e22ce] font-semibold">{feature.tag}</span>
                  <span>CANCHA // MECÁNICA</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
