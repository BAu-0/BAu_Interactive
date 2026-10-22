'use client';

import React from 'react';
import Image from 'next/image';
import { Clock, ShieldCheck, Zap } from 'lucide-react';

interface GameFeatureItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  sprite?: string;
  spriteAlt?: string;
  icon?: React.ComponentType<{ className?: string }>;
  video: string;
}

const GAME_FEATURES: GameFeatureItem[] = [
  {
    id: 'ring',
    tag: 'PRECISIÓN DE TIRO',
    title: 'Aro Rotatorio y Apertura Variable',
    description:
      'El aro de piedra gira de forma continua en la cancha. El reto exige leer el ángulo y calcular el momento exacto en que la apertura permite el cruce limpio de la pelota.',
    sprite: '/images/pok-tschack/sprites/pelota.png',
    spriteAlt: 'Pelota de juego y trayectoria',
    video: '/videos/features/feature-ring.mp4',
  },
  {
    id: 'clock',
    tag: 'SUPERVIVENCIA ACTIVA',
    title: 'Reloj Dinámico de 60 Segundos',
    description:
      'Cada gol reinicia el tiempo a 60 segundos. La partida dura lo que tu destreza permita prolongar. Los tiros rápidos premian con escalones de hasta 100 puntos.',
    icon: Clock,
    video: '/videos/features/feature-clock.mp4',
  },
  {
    id: 'physics',
    tag: 'FÍSICA 2D & INERCIA',
    title: 'Física de Rebote e Impulso Cinético',
    description:
      'Encadenar contactos aéreos y rebotes contra paredes y techo acumula velocidad e inercia. Tocar el suelo interrumpe el impulso sin eliminarte.',
    sprite: '/images/pok-tschack/sprites/grecas.png',
    spriteAlt: 'Grecas de rebote en cancha',
    video: '/videos/features/feature-physics.mp4',
  },
  {
    id: 'creatures',
    tag: 'CRIATURAS EN CANCHA',
    title: 'Robos de Luxen y Fintas de Temotl',
    description:
      'Los Luxen atrapan la pelota a ras de suelo y Temotl interviene con fintas directas sobre el aro, obligándote a rectificar la trayectoria en milisegundos.',
    sprite: '/images/pok-tschack/sprites/POK-TSCHACK-TEMOTL.png',
    spriteAlt: 'Temotl en cancha',
    video: '/videos/features/feature-creatures.mp4',
  },
  {
    id: 'hazards',
    tag: 'OBSTÁCULOS Y RETOS',
    title: 'Punzantes y Desafíos de 30s',
    description:
      'Peligros de obsidiana junto al aro que penalizan puntos, junto a fases breves de 30 segundos con gravedad modificada o controles invertidos.',
    sprite: '/images/pok-tschack/sprites/punzantes.png',
    spriteAlt: 'Punzantes de obsidiana',
    video: '/videos/features/feature-hazards.mp4',
  },
  {
    id: 'pure-skill',
    tag: 'DESTREZA PURA',
    title: 'Habilidad Arcade & Cero Pay-to-Win',
    description:
      'Sin micropagos con dinero real ni ventajas prediseñadas. La tienda interna utiliza exclusivamente los puntos generados en la misma partida para mejoras temporales.',
    icon: ShieldCheck,
    video: '/videos/features/feature-skill.mp4',
  },
];

export function GameFeatures() {
  return (
    <section
      className="py-20 lg:py-24 bg-black text-white border-b border-zinc-800"
      aria-labelledby="features-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera de Sección (Estilo Bethesda) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#a855f7] block font-sans">
              Características del Juego
            </span>
            <h2
              id="features-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase font-sans"
            >
              Domina el Ritmo de la Cancha
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-400 max-w-md font-sans leading-relaxed">
            Una pelota, un aro en rotación continua y 60 segundos en el cronómetro. Tu lectura de trayectorias determina cuánto tiempo logras sobrevivir.
          </p>
        </div>

        {/* Cuadrícula de 6 Características con Identidad Gráfica Real */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {GAME_FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative p-6 sm:p-7 rounded-xl bg-zinc-950/90 border border-zinc-800 hover:border-[#a855f7]/60 hover:shadow-2xl hover:shadow-purple-950/20 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Video de fondo en close-up con loop auténtico del gameplay */}
                {feature.video && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                    <video
                      src={feature.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-25 group-hover:opacity-45 transition-opacity duration-500"
                      style={{ imageRendering: 'pixelated' }}
                    />
                    {/* Gradientes para garantizar contraste WCAG de los textos */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/85 to-zinc-950/50" />
                    <div className="absolute inset-0 bg-zinc-950/30 backdrop-blur-[0.5px]" />
                  </div>
                )}

                {/* Contenido en primer plano */}
                <div className="relative z-10">
                  {/* Encabezado de la Tarjeta: Badge Semántico y Preview Visual */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 text-zinc-300 group-hover:border-[#a855f7]/40 group-hover:text-[#a855f7] transition-colors">
                      {feature.tag}
                    </span>

                    <div className="w-12 h-12 rounded-lg bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 flex items-center justify-center p-2 group-hover:border-[#a855f7]/50 transition-colors">
                      {feature.sprite ? (
                        <div className="relative w-8 h-8 flex items-center justify-center">
                          <Image
                            src={feature.sprite}
                            alt={feature.spriteAlt || feature.title}
                            fill
                            sizes="32px"
                            className="object-contain"
                            style={{ imageRendering: 'pixelated' }}
                          />
                        </div>
                      ) : Icon ? (
                        <Icon className="w-5 h-5 text-[#a855f7]" />
                      ) : null}
                    </div>
                  </div>

                  {/* Título de la Característica */}
                  <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide mb-2.5 font-sans leading-snug drop-shadow-sm">
                    {feature.title}
                  </h3>

                  {/* Descripción Directa */}
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                    {feature.description}
                  </p>
                </div>

                {/* Acento inferior sutil al hacer hover */}
                <div className="relative z-10 mt-6 pt-3 border-t border-zinc-800/80 flex items-center justify-end text-[11px] font-mono">
                  <span className="text-[#a855f7] opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                    EXPLORAR &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
