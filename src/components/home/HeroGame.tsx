'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Game } from '@/types/game';
import { Play, MessageSquare, ExternalLink, ArrowRight } from 'lucide-react';

interface HeroGameProps {
  game: Game;
}

const BACKGROUND_VIDEOS = [
  {
    src: '/videos/pok-tschack/pok-tschack-gameplay-01.mp4',
    poster: '/videos/pok-tschack/poster-01.webp',
  },
  {
    src: '/videos/pok-tschack/pok-tschack-gameplay-02.mp4',
    poster: '/videos/pok-tschack/poster-02.webp',
  },
  {
    src: '/videos/pok-tschack/pok-tschack-gameplay-03.mp4',
    poster: '/videos/pok-tschack/poster-03.webp',
  },
];

export function HeroGame({ game }: HeroGameProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const initialMount = useRef(true);

  const currentVideo = BACKGROUND_VIDEOS[currentVideoIndex];

  const betaLink =
    game.links.find((l) => l.type === 'beta' && l.enabled)?.url ||
    'https://garanda.itch.io/pok-tschack-betav1';
  const feedbackLink =
    process.env.NEXT_PUBLIC_FEEDBACK_URL || 'https://reddit.com/r/BAuInteractive';

  // Manejar cambio automático secuencial de video cuando termina el actual (loop infinito de fondo)
  const handleVideoEnded = useCallback(() => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % BACKGROUND_VIDEOS.length);
  }, []);

  // Cargar y reproducir automáticamente el siguiente video de fondo
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }
    const video = videoRef.current;
    if (!video || isReducedMotion) return;

    video.src = BACKGROUND_VIDEOS[currentVideoIndex].src;
    video.load();
    video.play().catch(() => {});
  }, [currentVideoIndex, isReducedMotion]);

  // Accesibilidad (prefers-reduced-motion) y PageSpeed (IntersectionObserver)
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
              videoRef.current.play().catch(() => {});
            }
          } else {
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.pause();
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
      } else if (!motionQuery.matches && sectionRef.current) {
        videoRef.current?.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black text-white min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex flex-col justify-center border-b border-zinc-800"
      aria-labelledby="hero-title"
    >
      {/* 1. Capa de Video de Fondo en Secuencia Continua (Ambiental) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
        {/* Poster estático inmediato para PageSpeed LCP */}
        <Image
          src={currentVideo.poster}
          alt={`Gameplay de ${game.title}`}
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-700 ${
            isVideoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Video ambiental: reproduce la lista en bucle continuo y automático */}
        {!isReducedMotion && (
          <video
            ref={videoRef}
            src={currentVideo.src}
            poster={currentVideo.poster}
            muted
            playsInline
            autoPlay
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            onEnded={handleVideoEnded}
            onLoadedData={() => setIsVideoLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}

        {/* Gradientes atmosféricos estilo Bethesda: aseguran contraste y legibilidad AAA */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
      </div>

      {/* 2. Contenido Principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full flex-1 flex flex-col justify-center">
        {/* Barra Superior del Hero: Estado de Beta */}
        <div className="mb-6">
          <div className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-zinc-700/80 text-zinc-200 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#a855f7] shadow-[0_0_8px_#a855f7] animate-pulse" />
            <span className="font-semibold uppercase tracking-wider text-white">
              BETA v1.0
            </span>
            <span className="text-zinc-500">/</span>
            <span className="text-zinc-300">JUGABLE EN NAVEGADOR</span>
          </div>
        </div>

        {/* Bloque Central de Tipografía y Acción */}
        <div className="max-w-2xl space-y-6">
          {/* Título de Gran Impacto: Logo Oficial de Pok-Tschack */}
          <div className="space-y-2">
            <h1 id="hero-title" className="sr-only">
              {game.title}
            </h1>
            <div className="relative w-72 sm:w-88 md:w-[440px] aspect-[1232/592] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              <Image
                src="/images/pok-tschack/pok-tschack-title-logo.png"
                alt={`Logo oficial de ${game.title}`}
                fill
                priority
                sizes="(max-width: 640px) 288px, (max-width: 768px) 352px, 440px"
                className="object-contain object-left"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          </div>

          {/* Premisa del Juego */}
          <p className="text-base sm:text-lg text-zinc-200 font-normal leading-relaxed drop-shadow font-sans">
            {game.short_description}
          </p>

          {/* Botones de Acción Simétricos con Altura y Alineación Coherente */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            {betaLink && (
              <a
                href={betaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2.5 px-8 h-12 rounded-lg bg-[#9333ea] hover:bg-[#7e22ce] text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-purple-950/40 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98]"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                <span>START</span>
              </a>
            )}

            {feedbackLink && (
              <a
                href={feedbackLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2.5 px-6 h-12 rounded-lg bg-zinc-950/80 hover:bg-zinc-900 text-white text-sm font-medium border border-zinc-700/80 hover:border-zinc-500 backdrop-blur-md transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <MessageSquare className="w-4 h-4 text-zinc-300" />
                <span>Canal de Feedback</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400 ml-0.5" />
              </a>
            )}

            <Link
              href={`/juegos/${game.slug}`}
              className="inline-flex items-center justify-center space-x-2 px-6 h-12 rounded-lg bg-zinc-950/80 hover:bg-zinc-900 text-zinc-200 hover:text-white text-sm font-medium border border-zinc-800 hover:border-zinc-600 backdrop-blur-md transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Ficha Técnica</span>
              <ArrowRight className="w-4 h-4 text-zinc-400" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
