'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Game } from '@/types/game';
import {
  Play,
  Pause,
  MessageSquare,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Cpu,
  VolumeX,
  ArrowRight,
} from 'lucide-react';

interface HeroGameProps {
  game: Game;
}

interface VideoVariant {
  id: string;
  name: string;
  tag: string;
  description: string;
  src: string;
  poster: string;
}

const VARIANTS: VideoVariant[] = [
  {
    id: '01',
    name: 'Toma 01',
    tag: 'Ritmo Dinámico',
    description: 'Encadenamiento de rebotes continuos en paredes y techo a 60 FPS.',
    src: '/videos/pok-tschack/pok-tschack-gameplay-01.mp4',
    poster: '/videos/pok-tschack/poster-01.webp',
  },
  {
    id: '02',
    name: 'Toma 02',
    tag: 'Apertura de Aro',
    description: 'Cálculo de ángulo ante la rotación variable y fintas en cancha.',
    src: '/videos/pok-tschack/pok-tschack-gameplay-02.mp4',
    poster: '/videos/pok-tschack/poster-02.webp',
  },
  {
    id: '03',
    name: 'Toma 03',
    tag: 'Supervivencia',
    description: 'Presión del reloj dinámico, penalizaciones y racha de puntos.',
    src: '/videos/pok-tschack/pok-tschack-gameplay-03.mp4',
    poster: '/videos/pok-tschack/poster-03.webp',
  },
];

export function HeroGame({ game }: HeroGameProps) {
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const currentVariant = VARIANTS[activeVariantIndex];

  const betaLink =
    game.links.find((l) => l.type === 'beta' && l.enabled)?.url ||
    'https://garanda.itch.io/pok-tschack-betav1';
  const feedbackLink =
    process.env.NEXT_PUBLIC_FEEDBACK_URL || 'https://reddit.com/r/BAuInteractive';

  // Detección de accesibilidad (prefers-reduced-motion) y PageSpeed (IntersectionObserver)
  useEffect(() => {
    // 1. Comprobar si el usuario tiene activada la preferencia de reducción de movimiento
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      setIsReducedMotion(true);
      return; // No iniciar autoplay si el usuario prefiere movimiento reducido
    }

    // 2. IntersectionObserver: solo reproducir cuando la sección sea visible en pantalla
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (videoRef.current && !motionQuery.matches) {
              videoRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => {
                  // Autoplay restringido por política del navegador
                  setIsPlaying(false);
                });
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

    // 3. Pausar cuando la pestaña pierde el foco (ahorro de batería y GPU)
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

  // Manejador para alternar reproducción manual
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

  // Cambio de variante de video
  const handleVariantSelect = useCallback(
    (idx: number) => {
      setActiveVariantIndex(idx);
      setIsVideoLoaded(false);
      if (videoRef.current) {
        videoRef.current.src = VARIANTS[idx].src;
        videoRef.current.load();
        if (!isReducedMotion) {
          videoRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        }
      }
    },
    [isReducedMotion]
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black text-white min-h-[640px] lg:min-h-[720px] flex flex-col justify-between border-b border-zinc-800"
      aria-labelledby="hero-title"
    >
      {/* 1. Capa de Video de Fondo y Poster Optimizado (LCP Instantáneo) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
        {/* Poster estático inmediato para PageSpeed LCP */}
        <Image
          src={currentVariant.poster}
          alt={`Captura de gameplay de ${game.title} - ${currentVariant.name}`}
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-700 ${
            isVideoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Video en bucle silencioso a 60 FPS */}
        {!isReducedMotion && (
          <video
            ref={videoRef}
            src={currentVariant.src}
            poster={currentVariant.poster}
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

        {/* Gradientes atmosféricos estilo Bethesda: aseguran contraste y legibilidad AAA */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* 2. Contenido Principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8 flex-1 flex flex-col justify-between w-full">
        {/* Barra Superior del Hero: Estado de Beta y Telemetría */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="inline-flex items-center space-x-2.5 px-3 py-1 rounded bg-black/70 backdrop-blur-md border border-zinc-700 text-zinc-200">
            <span className="w-2 h-2 rounded-full bg-[#a855f7] shadow-[0_0_8px_#a855f7] animate-pulse" />
            <span className="font-semibold uppercase tracking-wider text-white">
              BETA v1.0 EN ITCH.IO
            </span>
            <span className="text-zinc-500">/</span>
            <span className="text-zinc-300">JUGABLE EN NAVEGADOR</span>
          </div>

          <div className="hidden sm:flex items-center space-x-3 text-[11px] font-mono text-zinc-400 bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-zinc-800">
            <span>CANCHA // 60 FPS</span>
            <span className="text-zinc-600">|</span>
            <span className="text-[#a855f7] font-semibold">{currentVariant.name}: {currentVariant.tag.toUpperCase()}</span>
          </div>
        </div>

        {/* Bloque Central de Tipografía y Acción */}
        <div className="max-w-2xl py-8 sm:py-12 space-y-6">
          {/* Título de Gran Impacto: Logo Oficial de Pok-Tschack */}
          <div className="space-y-2">
            <h1 id="hero-title" className="sr-only">
              {game.title}
            </h1>
            <div className="relative w-72 sm:w-88 md:w-[420px] aspect-[1232/592] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              <Image
                src="/images/pok-tschack/pok-tschack-title-logo.png"
                alt={`Logo oficial de ${game.title}`}
                fill
                priority
                sizes="(max-width: 640px) 288px, (max-width: 768px) 352px, 420px"
                className="object-contain object-left"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          </div>

          {/* Premisa del Juego */}
          <p className="text-base sm:text-lg text-zinc-200 font-normal leading-relaxed drop-shadow">
            {game.short_description}
          </p>

          {/* Ficha Técnica Rápida (Chips de Contraste) */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300 pt-2">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-zinc-800">
              <Cpu className="w-3.5 h-3.5 text-zinc-400" />
              <span>Motor: <strong className="text-white">Godot (HTML5)</strong></span>
            </div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-zinc-800">
              <Terminal className="w-3.5 h-3.5 text-zinc-400" />
              <span>Formato: <strong className="text-white">Arcade 2D</strong></span>
            </div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-zinc-800">
              <ShieldCheck className="w-3.5 h-3.5 text-[#a855f7]" />
              <span>Objetivo: <strong className="text-[#a855f7]">Aro & Reloj</strong></span>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            {betaLink && (
              <a
                href={betaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded bg-[#9333ea] hover:bg-[#7e22ce] text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-purple-900/30 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98]"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                <span>Jugar la Beta en Navegador</span>
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
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400 ml-0.5" />
              </a>
            )}

            <Link
              href={`/juegos/${game.slug}`}
              className="inline-flex items-center justify-center space-x-1.5 px-4 py-3.5 text-xs uppercase font-semibold text-zinc-300 hover:text-white transition-colors"
            >
              <span>Ficha Técnica</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3. Barra Inferior de Control de Video y Selector de 3 Variantes (Creativo y Accesible) */}
        <div className="pt-6 border-t border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Lado Izquierdo: Controles de Reproducción y Accesibilidad (WCAG 2.2.2) */}
          <div className="flex items-center space-x-3 text-xs text-zinc-400">
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

            <div className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-black/60 border border-zinc-800 text-[11px] text-zinc-400">
              <VolumeX className="w-3 h-3 text-zinc-400" />
              <span>Metraje Silencioso // 60 FPS</span>
            </div>
          </div>

          {/* Lado Derecho: Selector de las 3 Tomas (Pool de Alternativas) */}
          <div
            role="tablist"
            aria-label="Selector de tomas de gameplay"
            className="flex items-center space-x-1 sm:space-x-2 bg-black/70 backdrop-blur-md p-1 rounded-lg border border-zinc-800"
          >
            {VARIANTS.map((variant, idx) => {
              const isSelected = activeVariantIndex === idx;
              return (
                <button
                  key={variant.id}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`variant-panel-${variant.id}`}
                  onClick={() => handleVariantSelect(idx)}
                  className={`px-3 py-1.5 rounded text-xs font-medium tracking-wide transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7] flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-zinc-800 text-white font-semibold shadow-sm border border-[#a855f7]'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected ? 'bg-[#a855f7] shadow-[0_0_6px_#a855f7]' : 'bg-zinc-600'
                    }`}
                  />
                  <span>{variant.name}</span>
                  <span className="hidden lg:inline text-zinc-500 font-normal">
                    ({variant.tag})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
