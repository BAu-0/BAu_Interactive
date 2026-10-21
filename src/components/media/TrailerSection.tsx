'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Smartphone, Sparkles, Shield, Clock } from 'lucide-react';

interface TrailerSectionProps {
  title?: string;
  subtitle?: string;
  gameTitle?: string;
  betaUrl?: string;
}

export function TrailerSection({
  title = 'El Ritmo de la Cancha en Acción',
  subtitle = 'Trailer Oficial',
  gameTitle = 'Pok-Tschack',
  betaUrl = 'https://garanda.itch.io/pok-tschack-betav1',
}: TrailerSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStartPlay = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, []);

  const togglePlayPause = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  }, []);

  const handleRestart = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 bg-zinc-50 border-b border-zinc-200" aria-labelledby="trailer-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera de Sección */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7e22ce] mb-2 block font-sans">
            {subtitle}
          </span>
          <h2
            id="trailer-title"
            className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 uppercase font-sans mb-3"
          >
            {title}
          </h2>
          <p className="text-base text-zinc-600 leading-relaxed font-sans">
            Metraje oficial del juego en formato vertical. Observa la inercia del salto, la apertura rotatoria del aro y la presión del cronómetro en la cancha.
          </p>
        </div>

        {/* Estructura en 2 Columnas: Trailer Vertical en un lateral + Especificaciones editoriales */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Columna Izquierda / Lateral: Dispositivo Arcade Vertical con Video Optimizado */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[9/16] rounded-2xl overflow-hidden bg-black border-4 border-zinc-800 shadow-2xl shadow-purple-950/20 group">
              {/* Poster Inmediato para PageSpeed (Solo 9.5 KB, Cero Retraso en LCP) */}
              <div
                className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
                  isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100 z-10'
                }`}
              >
                <Image
                  src="/videos/pok-tschack/trailer-poster.webp"
                  alt={`Carátula del trailer oficial de ${gameTitle}`}
                  fill
                  sizes="(max-width: 640px) 340px, 360px"
                  className="object-cover object-center"
                  priority={false}
                />

                {/* Overlay de gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60" />

                {/* Botón Central de Play */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <button
                    type="button"
                    onClick={handleStartPlay}
                    className="w-16 h-16 rounded-full bg-[#9333ea] hover:bg-[#7e22ce] text-white flex items-center justify-center shadow-xl shadow-purple-900/60 transform group-hover:scale-110 active:scale-95 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-white mb-3"
                    aria-label={`Reproducir trailer oficial de ${gameTitle}`}
                  >
                    <Play className="w-7 h-7 fill-white text-white ml-1" />
                  </button>
                  <span className="text-xs font-bold uppercase tracking-wider text-white drop-shadow">
                    Ver Trailer Oficial
                  </span>
                  <span className="text-[11px] text-zinc-400 mt-1">Con audio y efectos de juego</span>
                </div>
              </div>

              {/* Elemento de Video (preload="none" para proteger el 100% de PageSpeed) */}
              <video
                ref={videoRef}
                src="/videos/pok-tschack/pok-tschack-trailer.mp4"
                poster="/videos/pok-tschack/trailer-poster.webp"
                playsInline
                preload="none"
                onEnded={() => setIsPlaying(false)}
                className="w-full h-full object-cover object-center"
              />

              {/* Barra de Controles en reproducción */}
              {isPlaying && (
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between z-20 text-white text-xs">
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={togglePlayPause}
                      className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-[#a855f7]"
                      aria-label={isPlaying ? 'Pausar trailer' : 'Continuar trailer'}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                    </button>
                    <button
                      type="button"
                      onClick={toggleMute}
                      className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-[#a855f7]"
                      aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#a855f7]" />}
                    </button>
                    <button
                      type="button"
                      onClick={handleRestart}
                      className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-[#a855f7]"
                      aria-label="Reiniciar trailer desde el inicio"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Columna Derecha: Características Clave del Trailer & Llamada a la Acción */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              {/* Tarjeta 1: Formato Vertical */}
              <div className="p-5 rounded-lg bg-white border border-zinc-200 shadow-sm flex items-start space-x-4 group hover:border-zinc-400 transition-colors">
                <div className="w-10 h-10 rounded border border-zinc-200 bg-purple-50 flex items-center justify-center text-[#7e22ce] shrink-0 mt-0.5">
                  <Smartphone className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-950 font-sans mb-1">
                    Diseño Nativo en Formato Vertical
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed font-sans">
                    Construido específicamente para la visión vertical y la inercia de caída libre. Permite anticipar rebotes en paredes y calcular la apertura del aro sin distorsión de perspectiva.
                  </p>
                </div>
              </div>

              {/* Tarjeta 2: Reloj y Supervivencia */}
              <div className="p-5 rounded-lg bg-white border border-zinc-200 shadow-sm flex items-start space-x-4 group hover:border-zinc-400 transition-colors">
                <div className="w-10 h-10 rounded border border-zinc-200 bg-purple-50 flex items-center justify-center text-[#7e22ce] shrink-0 mt-0.5">
                  <Clock className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-950 font-sans mb-1">
                    Reloj Dinámico de 60 Segundos
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed font-sans">
                    El trailer evidencia cómo cada anotación limpia reinicia el cronómetro. La supervivencia en la cancha depende exclusivamente de tu ritmo para prolongar la partida.
                  </p>
                </div>
              </div>

              {/* Tarjeta 3: Reactividad y Criaturas */}
              <div className="p-5 rounded-lg bg-white border border-zinc-200 shadow-sm flex items-start space-x-4 group hover:border-zinc-400 transition-colors">
                <div className="w-10 h-10 rounded border border-zinc-200 bg-purple-50 flex items-center justify-center text-[#7e22ce] shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-950 font-sans mb-1">
                    Cancha Reactiva y Efectos Sonoros
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed font-sans">
                    Descubre las interferencias de Temotl, los robos a ras de suelo de los Luxen y los obstáculos Punzantes que alteran la jugada acompañados de su banda sonora original.
                  </p>
                </div>
              </div>
            </div>

            {/* Botón de Jugar la Beta */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={betaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded bg-[#9333ea] hover:bg-[#7e22ce] text-white font-bold text-sm uppercase tracking-wider shadow-sm hover:shadow-md transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                <span>Probar la Beta en Navegador</span>
              </a>

              <span className="text-xs text-zinc-500 font-sans">
                Sin instalación // Directo en tu navegador web
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
