'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Game } from '@/types/game';
import { Play, Pause, MessageSquare, VolumeX, ShieldCheck } from 'lucide-react';

interface GameDetailHeroProps {
  game: Game;
}

export function GameDetailHero({ game }: GameDetailHeroProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const betaLink =
    game.links.find((l) => l.type === 'beta' && l.enabled)?.url ||
    'https://garanda.itch.io/pok-tschack-betav1';
  const feedbackLink =
    process.env.NEXT_PUBLIC_FEEDBACK_URL || 'https://reddit.com/r/BAuInteractive';

  // Video y poster optimizados
  const videoSrc = '/videos/pok-tschack/pok-tschack-gameplay-01.mp4';
  const posterSrc = '/videos/pok-tschack/poster-01.webp';
  const logoSrc = '/images/pok-tschack/pok-tschack-title-logo.png';

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      setIsReducedMotion(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (videoRef.current && !motionQuery.matches) {
              videoRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
            }
          } else {
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleVisibility = () => {
      if (document.hidden) {
        videoRef.current?.pause();
        setIsPlaying(false);
      } else if (!motionQuery.matches && sectionRef.current) {
        videoRef.current
          ?.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black text-white min-h-[640px] lg:min-h-[700px] flex flex-col justify-between border-b border-zinc-800"
      aria-labelledby="game-detail-title"
    >
      {/* 1. Fondo de Video Cinematográfico y Poster Optimizado */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
        <Image
          src={posterSrc}
          alt={`Metraje de gameplay oficial de ${game.title}`}
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-700 ${
            isVideoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {!isReducedMotion && (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            muted
            playsInline
            loop
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            onLoadedData={() => setIsVideoLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}

        {/* Gradientes atmosféricos Bethesda de alto contraste */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
      </div>

      {/* 2. Contenido del Hero y Ficha Técnica */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8 flex-1 flex flex-col justify-between w-full">
        {/* Barra Superior: Estado */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded bg-black/70 backdrop-blur-md border border-zinc-700 text-zinc-200">
            <span className="w-2 h-2 rounded-full bg-[#a855f7] shadow-[0_0_8px_#a855f7] animate-pulse" />
            <span className="font-semibold uppercase tracking-wider text-white">
              ESTADO: {game.status.toUpperCase()} {game.display_version}
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-[11px] font-mono text-zinc-400 bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-zinc-800">
            <span className="text-[#a855f7] font-semibold">FICHA TÉCNICA OFICIAL</span>
          </div>
        </div>

        {/* Rejilla Principal: Presentación de Juego + Especificaciones */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-8">
          {/* Lado Izquierdo: Logo Oficial, Premisa y Botones */}
          <div className="lg:col-span-7 space-y-6">
            {/* Logo Oficial de Pok-Tschack en sustitución del texto plano */}
            <div className="space-y-2">
              <h1 id="game-detail-title" className="sr-only">
                {game.title}
              </h1>
              <div className="relative w-72 sm:w-88 md:w-[420px] aspect-[1232/592] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                <Image
                  src={logoSrc}
                  alt={`Logo oficial de ${game.title}`}
                  fill
                  priority
                  sizes="(max-width: 640px) 288px, (max-width: 768px) 352px, 420px"
                  className="object-contain object-left"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
            </div>

            {/* Descripción Completa */}
            <p className="text-base sm:text-lg text-zinc-200 font-normal leading-relaxed max-w-xl drop-shadow">
              {game.full_description}
            </p>

            {/* Botones de Acción */}
            <div className="pt-2 flex flex-wrap gap-3.5">
              {betaLink && (
                <a
                  href={betaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded bg-[#9333ea] hover:bg-[#7e22ce] text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-purple-900/30 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98]"
                >
                  <Play className="w-4 h-4 fill-white text-white" />
                  <span>Jugar Beta en Navegador</span>
                </a>
              )}

              {feedbackLink && (
                <a
                  href={feedbackLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded bg-black/80 hover:bg-zinc-900 text-white text-sm font-medium border border-zinc-700 backdrop-blur-md transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <MessageSquare className="w-4 h-4 text-zinc-300" />
                  <span>Canal de Feedback</span>
                </a>
              )}
            </div>
          </div>

          {/* Lado Derecho: Especificaciones de Título (Ficha Técnica en Dark Glass) */}
          <div className="lg:col-span-5 bg-black/75 backdrop-blur-md rounded-xl border border-zinc-800 p-6 space-y-4 shadow-2xl">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#a855f7] border-b border-zinc-800/80 pb-3 flex items-center justify-between">
              <span>Especificaciones de Título</span>
              <span className="text-[10px] font-mono text-zinc-500">PROYECTO ACTIVO</span>
            </h2>
            <dl className="divide-y divide-zinc-800/60 text-xs space-y-2.5">
              <div className="flex justify-between pt-2">
                <dt className="text-zinc-400">Género:</dt>
                <dd className="font-bold text-white">Arcade 2D / Habilidad y Reflejos</dd>
              </div>
              <div className="flex justify-between pt-2">
                <dt className="text-zinc-400">Estado:</dt>
                <dd className="font-bold text-[#a855f7]">Beta Pública (Itch.io)</dd>
              </div>
              <div className="flex justify-between pt-2">
                <dt className="text-zinc-400">Compilación:</dt>
                <dd className="text-zinc-200 font-semibold">{game.display_version}</dd>
              </div>
              <div className="flex justify-between pt-2">
                <dt className="text-zinc-400">Métrica:</dt>
                <dd className="text-zinc-200 font-semibold">Mayor Puntuación & Goles</dd>
              </div>
              <div className="flex justify-between pt-2">
                <dt className="text-zinc-400">Plataformas:</dt>
                <dd className="text-zinc-200">HTML5 Web / En desarrollo para Android</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* 3. Barra Inferior de Control de Video */}
        <div className="pt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={togglePlay}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded bg-zinc-900/90 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-500 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7]"
              aria-label={isPlaying ? 'Pausar video de gameplay' : 'Reproducir video de gameplay'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#a855f7]" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-[#a855f7] text-[#a855f7]" />
                  <span>Reproducir</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center space-x-1.5 text-[11px] font-mono text-zinc-400">
            <ShieldCheck className="w-3.5 h-3.5 text-[#a855f7]" />
            <span>PRODUCCIÓN OFICIAL // BAU INTERACTIVE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
