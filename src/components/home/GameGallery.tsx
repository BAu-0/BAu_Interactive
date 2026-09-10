'use client';

import React, { useState } from 'react';
import { Eye, Shield, Radio, Sparkles } from 'lucide-react';

const SHOTS = [
  {
    id: 1,
    title: 'Campo Gravitacional y Vórtices',
    subtitle: 'Nivel 01: El Abismo de Neón',
    description: 'Esquiva vórtices de gravedad mientras recolectas prismas de sobrecarga para activar tu multiplicador de inercia.',
    gradient: 'from-blue-900 via-indigo-950 to-slate-950',
    icon: Radio,
    tag: 'JUGABILIDAD',
  },
  {
    id: 2,
    title: 'Modo Hiperimpulso Reactivo',
    subtitle: 'Sobrecarga de Fusión x15',
    description: 'Al encadenar 15 esquives críticos consecutivos, el tiempo se ralentiza un 20% y tu velocidad se duplica.',
    gradient: 'from-purple-950 via-pink-950 to-slate-950',
    icon: Sparkles,
    tag: 'HABILIDAD',
  },
  {
    id: 3,
    title: 'Supervivencia en Alta Densidad',
    subtitle: 'Nivel 03: Tormenta de Antimateria',
    description: 'La prueba definitiva de concentración donde solo los mejores pilotos logran puntajes superiores a 800.000.',
    gradient: 'from-cyan-950 via-slate-900 to-slate-950',
    icon: Shield,
    tag: 'CLÍMAX',
  },
];

export function GameGallery() {
  const [activeShot, setActiveShot] = useState<number>(0);

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="gallery-title">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 id="gallery-title" className="text-xs font-bold uppercase tracking-widest text-arcade-cyan mb-2">
            Galería del Juego
          </h2>
          <p className="text-3xl font-bold tracking-tight text-white">
            Vistas de la arena en acción
          </p>
        </div>
        <p className="text-sm text-slate-400 max-w-md">
          Capturas conceptuales tomadas directamente de la versión de prueba de Aether Drift en resolución 1080p a 60 FPS.
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
              className={`cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 ${
                isSelected
                  ? 'border-arcade-cyan ring-1 ring-arcade-cyan shadow-glow-cyan/30 scale-[1.01]'
                  : 'border-surface-border hover:border-slate-600 bg-surface-card/40'
              }`}
            >
              {/* Contenedor de Captura / Arte */}
              <div
                className={`relative aspect-[16/9] w-full bg-gradient-to-br ${shot.gradient} p-6 flex flex-col justify-between overflow-hidden`}
              >
                <div className="flex items-center justify-between z-10">
                  <span className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-background/80 text-arcade-cyan border border-arcade-cyan/30">
                    {shot.tag}
                  </span>
                  <Eye className="w-4 h-4 text-slate-400" />
                </div>

                <div className="z-10 text-center py-4">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-background/60 backdrop-blur border border-surface-border flex items-center justify-center text-arcade-cyan mb-2">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-slate-300">{shot.subtitle}</span>
                </div>

                <div className="z-10 text-[11px] font-mono text-slate-400 flex justify-between border-t border-surface-border/50 pt-2">
                  <span>60 FPS CAPTURE</span>
                  <span>1920x1080</span>
                </div>
              </div>

              {/* Información debajo de la captura */}
              <div className="p-5 bg-surface-card">
                <h3 className="text-base font-bold text-white mb-1.5">{shot.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{shot.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
