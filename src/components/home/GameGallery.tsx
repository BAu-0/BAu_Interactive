'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Eye, Shield, Radio, Sparkles } from 'lucide-react';

const SHOTS = [
  {
    id: 1,
    title: 'Aro Móvil & Trayectoria',
    subtitle: 'CANCHA // APERTURA ROTATORIA',
    description:
      'Lectura de ángulos y rebotes calculados contra paredes y techo para cruzar el aro de piedra en su punto óptimo de giro.',
    sprite: '/images/pok-tschack/sprites/pelota.png',
    spriteAlt: 'Pelota de juego',
    tag: 'REBOTES & TIRO',
  },
  {
    id: 2,
    title: 'Interferencias: Luxen & Temotl',
    subtitle: 'CRIATURAS // ROBOS Y FINTAS',
    description:
      'Los Luxen atrapan la pelota a ras de suelo y Temotl interviene con fintas directas sobre el aro, alterando la jugada.',
    sprite: '/images/pok-tschack/sprites/POK-TSCHACK-TEMOTL.png',
    spriteAlt: 'Temotl en cancha',
    tag: 'CRIATURAS',
  },
  {
    id: 3,
    title: 'Punzantes y Desafíos de 30s',
    subtitle: 'OBSTÁCULOS // REGLAS CAMBIANTES',
    description:
      'Peligros de obsidiana junto al aro que penalizan puntos, junto a fases breves de gravedad modificada o controles invertidos.',
    sprite: '/images/pok-tschack/sprites/punzantes.png',
    spriteAlt: 'Punzantes de obsidiana',
    tag: 'DESAFÍOS',
  },
];

export function GameGallery() {
  const [activeShot, setActiveShot] = useState<number>(0);

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white" aria-labelledby="gallery-title">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#00a836] mb-2 block">
            Dinámica de Cancha
          </span>
          <h2 id="gallery-title" className="text-3xl sm:text-4xl font-bold tracking-tight text-black uppercase">
            La Cancha Cambia
          </h2>
        </div>
        <p className="text-sm text-zinc-600 max-w-sm">
          Un gol nunca asegura que la jugada siguiente sea idéntica. Cada anotación abre paso a nuevas pruebas y reflejos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SHOTS.map((shot, idx) => {
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
              {/* Frame con fondo oscuro estilo arcade / retro-pixel */}
              <div className="relative aspect-video w-full bg-zinc-950 text-white p-5 flex flex-col justify-between overflow-hidden border-b border-zinc-800">
                <div className="flex items-center justify-between z-10">
                  <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
                    {shot.tag}
                  </span>
                  <Eye className="w-4 h-4 text-zinc-400" />
                </div>

                <div className="z-10 text-center py-2 flex flex-col items-center justify-center">
                  <div className="relative w-16 h-16 flex items-center justify-center mb-1">
                    <Image
                      src={shot.sprite}
                      alt={shot.spriteAlt}
                      fill
                      sizes="64px"
                      className="object-contain"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>
                  <span className="text-xs font-mono text-zinc-400">{shot.subtitle}</span>
                </div>

                <div className="z-10 text-[10px] font-mono text-zinc-500 flex justify-between border-t border-zinc-800 pt-2">
                  <span>60 FPS</span>
                  <span>ARCADE 2D</span>
                </div>
              </div>

              {/* Información debajo de la tarjeta */}
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
