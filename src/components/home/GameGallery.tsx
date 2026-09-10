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
    tag: 'GAMEPLAY TELEMETRY',
  },
  {
    id: 2,
    title: 'Modo Hiperimpulso Reactivo',
    subtitle: 'SISTEMA // MULTIPLICADOR X15',
    description:
      'Compresión temporal adaptativa que afina la ventana de reflejos al encadenar esquives milimétricos continuos.',
    icon: Sparkles,
    tag: 'HIGH MOBILITY',
  },
  {
    id: 3,
    title: 'Supervivencia en Densidad Crítica',
    subtitle: 'SECTOR 03 // VÓRTICE DE ANTIMATERIA',
    description:
      'Evaluación pura de tiempo de respuesta y control motriz donde se disputan las marcas del Top 15 mundial.',
    icon: Shield,
    tag: 'ELITE CHALLENGE',
  },
];

export function GameGallery() {
  const [activeShot, setActiveShot] = useState<number>(0);

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="gallery-title">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent-razer mb-2 block">
            VISUALIZACIÓN TÉCNICA
          </span>
          <h2 id="gallery-title" className="text-3xl sm:text-4xl font-black tracking-tight text-text-primary uppercase font-display">
            Capturas de Rendimiento
          </h2>
        </div>
        <p className="text-xs font-mono text-text-muted max-w-sm">
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
                  ? 'border-border-hover ring-1 ring-accent-razer/40 shadow-fluent-elevated scale-[1.01] bg-surface-card'
                  : 'border-border-subtle hover:border-border-hover bg-surface-base'
              }`}
            >
              {/* Frame 16:9 Widescreen */}
              <div className="relative aspect-video w-full bg-surface-elevated p-5 flex flex-col justify-between overflow-hidden border-b border-border-subtle">
                <div className="flex items-center justify-between z-10">
                  <span className="text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded bg-surface-base border border-border-subtle text-text-secondary">
                    {shot.tag}
                  </span>
                  <Eye className="w-3.5 h-3.5 text-text-muted" />
                </div>

                <div className="z-10 text-center py-2">
                  <div className="w-10 h-10 mx-auto rounded border border-border-subtle bg-surface-base flex items-center justify-center text-accent-titanium mb-2">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <span className="text-[11px] font-mono text-text-muted">{shot.subtitle}</span>
                </div>

                <div className="z-10 text-[10px] font-mono text-text-muted flex justify-between border-t border-border-subtle/50 pt-2">
                  <span>60 FPS CAPTURE</span>
                  <span>1920x1080</span>
                </div>
              </div>

              {/* Información debajo de la captura */}
              <div className="p-5 bg-surface-card">
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wide mb-1.5 font-display">
                  {shot.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed font-sans">
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
