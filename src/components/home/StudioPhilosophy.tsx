'use client';

import React from 'react';
import { Cpu, ShieldCheck, MessageSquareCode, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const PILLARS = [
  {
    icon: Cpu,
    tag: 'ARQUITECTURA DE JUEGO',
    title: 'Física Determinista & 60 FPS',
    description:
      'Cada salto, rebote y aceleración cinemática responde a un modelo matemático consistente. La precisión de tus reflejos determina el éxito, sin aleatoriedad artificial.',
  },
  {
    icon: ShieldCheck,
    tag: 'RESPETO AL JUGADOR',
    title: 'Habilidad Pura & Cero Pay-to-Win',
    description:
      'Rechazamos de raíz las prácticas predatorias: sin compras integradas abusivas, sin ventajas prediseñadas y sin anuncios que interrumpan la concentración.',
  },
  {
    icon: MessageSquareCode,
    tag: 'PROCESO ABIERTO',
    title: 'Desarrollo Transparente con la Comunidad',
    description:
      'Construimos junto a los jugadores. Calibramos inercia, sensibilidad de controles y dificultad evaluando directamente las bitácoras y comentarios de la beta.',
  },
];

export function StudioPhilosophy() {
  return (
    <section
      className="py-20 lg:py-24 bg-black text-white border-b border-zinc-800"
      aria-labelledby="philosophy-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera de la Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#a855f7] block font-sans">
              Filosofía del Estudio
            </span>
            <h2
              id="philosophy-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase font-sans"
            >
              El ADN de BAu Interactive
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-400 max-w-md font-sans leading-relaxed">
            Nuestros principios de diseño gobiernan cada línea de código, cada calibración de motor y
            cada experiencia que publicamos.
          </p>
        </div>

        {/* Cuadrícula de 3 Pilares Fundamentales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative p-7 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-[#a855f7]/60 hover:shadow-xl hover:shadow-purple-950/20 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover:border-[#a855f7]/40 group-hover:text-[#a855f7] transition-colors">
                      {pillar.tag}
                    </span>

                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center p-2 text-[#a855f7] group-hover:border-[#a855f7]/50 transition-colors shadow-sm">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide mb-3 font-sans leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors">
                    ESTÁNDAR // 0{idx + 1}
                  </span>
                  <span className="text-[#a855f7] opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                    CANÓNICO
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA a la Página Acerca De */}
        <div className="mt-12 text-center">
          <Link
            href="/acerca"
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-[#a855f7] transition-colors"
          >
            <span>Conoce más sobre nuestra visión y manifiesto de desarrollo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
