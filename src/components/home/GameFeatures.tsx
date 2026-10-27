'use client';

import React from 'react';

interface GameFeatureItem {
  id: string;
  title: string;
  description: string;
  video: string;
}

const GAME_FEATURES: GameFeatureItem[] = [
  {
    id: 'ring',
    title: 'Aro Móvil',
    description:
      'El aro de piedra gira de forma continua en la cancha. El reto exige leer el ángulo y calcular el momento exacto en que la apertura permite el cruce limpio de la pelota.',
    video: '/videos/features/feature-ring.mp4',
  },
  {
    id: 'clock',
    title: '60 Segundos para Anotar',
    description:
      'Cada gol reinicia el tiempo a 60 segundos. La partida dura lo que tu destreza permita prolongar. Los tiros rápidos premian con escalones de hasta 100 puntos.',
    video: '/videos/features/feature-clock.mp4',
  },
  {
    id: 'physics',
    title: 'Física de Rebote e Impulso Cinético',
    description:
      'Encadenar contactos aéreos y rebotes contra paredes y techo acumula velocidad e inercia. Tocar el suelo interrumpe el impulso sin eliminarte.',
    video: '/videos/features/feature-physics.mp4',
  },
  {
    id: 'court-events',
    title: 'Eventos en Cancha',
    description:
      'Cerrojos de Mirones, robos de Luxen, fintas de Temotl y zonas de castigo transforman la cancha en tiempo real, obligándote a adaptarte al instante.',
    video: '/videos/features/feature-events.mp4',
  },
  {
    id: 'challenge',
    title: 'Etapa Desafío',
    description:
      'Rondas límite de 30 segundos donde la intensidad se dispara: aros en vaivén, gravedad alterada y reloj acelerado para poner a prueba tu temple bajo presión.',
    video: '/videos/features/feature-challenge.mp4',
  },
  {
    id: 'arcade-experience',
    title: '¿Podrás Dominar la Cancha?',
    description:
      'Acepta el reto y pon a prueba tus habilidades. Entra a la cancha, siente la adrenalina de cada rebote y vive una experiencia arcade frenética, intensa y desafiante.',
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
            Un desafío: domina el movimiento de la pelota, anota y mantén la partida viva. Tu habilidad mantendrá la partida corriendo.
          </p>
        </div>

        {/* Cuadrícula de 6 Características con Identidad Gráfica y Video de Fondo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {GAME_FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="group relative p-6 sm:p-7 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-[#a855f7]/80 hover:shadow-2xl hover:shadow-purple-950/30 transition-all duration-300 flex flex-col justify-between overflow-hidden min-h-[220px]"
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
                    className="w-full h-full object-cover opacity-65 group-hover:opacity-90 transition-opacity duration-300"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  {/* Gradiente sutil para legibilidad cinematográfica sin tapar el video */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/30" />
                </div>
              )}

              {/* Contenido en primer plano con sombras protectoras */}
              <div className="relative z-10 flex flex-col justify-start">
                {/* Título de la Característica */}
                <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wide font-sans leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  {feature.title}
                </h3>

                {/* Barra divisora entre el título y la descripción */}
                <div className="border-t border-zinc-800/90 my-3.5 group-hover:border-[#a855f7]/60 transition-colors" />

                {/* Descripción Directa */}
                <p className="text-sm text-zinc-200 leading-relaxed font-sans drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
