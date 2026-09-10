'use client';

import React, { useState } from 'react';
import { Eye, Shield, Radio, Sparkles } from 'lucide-react';

const SHOTS = [
  {
    id: 1,
    title: 'Campo Gravitacional & Vórtices',
    subtitle: 'SECTOR 01 // VACÍO CINÉTICO',
    description:
      'Maniobras evasivas en campos de alta masa gravitacional con recarga inercial de impulso por proximidad.',
    icon: Radio,
    tag: 'JUGABILIDAD',
  },
  {
    id: 2,
    title: 'Modo Hiperimpulso Reactivo',
    subtitle: 'SISTEMA // MULTIPLICADOR X15',
    description:
      'Compresión temporal adaptativa que afina la ventana de reflejos al encadenar esquives milimétricos continuos.',
    icon: Sparkles,
    tag: 'HABILIDAD',
  },
  {
    id: 3,
    title: 'Supervivencia en Densidad Crítica',
    subtitle: 'SECTOR 03 // VÓRTICE DE ANTIMATERIA',
    description:
      'Evaluación pura de tiempo de respuesta y control motriz donde se disputan las marcas del Top 15 mundial.',
    icon: Shield,
    tag: 'DESAFÍO',
  },
];

export function GameGallery() {
  const [activeShot, setActiveShot] = useState<number>(0);

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="gallery-title">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#00a836] mb-2 block">
            Capturas Directas
          </span>
          <h2 id="gallery-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
            Galería del Juego
          </h2>
        </div>
        <p className="text-sm text-zinc-600 max-w-sm">
          Secuencias de prueba tomadas directamente del cliente de ejecución a 1080p y 60 FPS estables.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SHOTS.map((shot, idx) => {
          const Icon = shot.icon;
          const isSelected = activeShot === idx;
          return (
            <div
              key={shot.id}
              onClick={() => setActiveShot(idx)}
              className={`cursor-pointer rounded-lg overflow-hidden border transition-all duration-200 ${
                isSelected
                  ? 'border-black ring-2 ring-[#00d647] shadow-lg scale-[1.01] bg-white'
                  : 'border-zinc-200 hover:border-zinc-400 bg-zinc-50'
              }`}
            >
              {/* Frame 16:9 Widescreen en negro/contraste de pantalla */}
              <div className="relative aspect-video w-full bg-zinc-950 text-white p-5 flex flex-col justify-between overflow-hidden border-b border-zinc-800">
                <div className="flex items-center justify-between z-10">
                  <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
                    {shot.tag}
                  </span>
                  <Eye className="w-4 h-4 text-zinc-400" />
                </div>

                <div className="z-10 text-center py-2">
                  <div className="w-10 h-10 mx-auto rounded border border-zinc-800 bg-zinc-900 flex items-center justify-center text-[#00ff55] mb-2">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <span className="text-xs font-mono text-zinc-400">{shot.subtitle}</span>
                </div>

                <div className="z-10 text-[10px] font-mono text-zinc-500 flex justify-between border-t border-zinc-800 pt-2">
                  <span>60 FPS CAPTURE</span>
                  <span>1920x1080</span>
                </div>
              </div>

              {/* Información debajo de la captura */}
              <div className="p-5 bg-white">
                <h3 className="text-base font-bold text-black mb-1.5">
                  {shot.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-sans">
                  {shot.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
