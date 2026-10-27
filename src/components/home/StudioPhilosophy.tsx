'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const PILLARS = [
  {
    title: 'Diversión y Reto',
    description:
      'Creemos en juegos que divierten desde el primer segundo y desafían tu habilidad, donde cada triunfo se siente auténticamente ganado.',
  },
  {
    title: 'Entretenimiento con Propósito',
    description:
      'Diseñamos cada experiencia según su escala: inmediatez y dinamismo para partidas rápidas, o profundidad gradual para proyectos mayores.',
  },
  {
    title: 'Visión a Futuro',
    description:
      'Un estudio en constante movimiento, enfocado en seguir ideando y publicando nuevos proyectos que exploren temáticas y estilos originales.',
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
              Filosofía de Desarrollo
            </span>
            <h2
              id="philosophy-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase font-sans"
            >
              El ADN de BAu Interactive
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-400 max-w-md font-sans leading-relaxed">
            Nuestra visión guía cada proyecto: retos justos, creatividad sin ataduras y videojuegos diseñados para divertir de verdad.
          </p>
        </div>

        {/* Cuadrícula de 3 Pilares Fundamentales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="group relative p-7 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-[#a855f7]/60 hover:shadow-xl hover:shadow-purple-950/20 transition-all duration-200 flex flex-col justify-start"
            >
              <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide mb-3 font-sans leading-snug">
                {pillar.title}
              </h3>

              <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA a la Página Acerca De */}
        <div className="mt-12 text-center">
          <Link
            href="/acerca"
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-[#a855f7] transition-colors"
          >
            <span>Conoce más sobre la filosofía y visión del estudio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
