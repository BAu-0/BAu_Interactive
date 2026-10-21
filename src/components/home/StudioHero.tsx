'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, Sparkles, Gamepad2, ArrowRight } from 'lucide-react';

export function StudioHero() {
  const scrollToSpotlight = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('destacado-pok-tschack');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-black text-white min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex flex-col justify-between border-b border-zinc-800"
      aria-labelledby="studio-hero-title"
    >
      {/* Fondo Atmosférico de Estudio con Glow Morado Mace Windu */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Glow Radial Superior */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[600px] bg-purple-950/25 blur-[140px] rounded-full" />
        {/* Trama de cuadrícula técnica muy sutil */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Gradientes de viñeta para profundidad cinematográfica */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
      </div>

      {/* Contenido Central del Estudio */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 my-auto w-full flex flex-col items-center text-center">
        {/* Badge de Estudio */}
        <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-zinc-950/90 border border-zinc-800 text-xs text-zinc-300 mb-8 backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#a855f7] shadow-[0_0_8px_#a855f7] animate-pulse" />
          <span className="font-semibold uppercase tracking-wider text-white">
            BAu Interactive
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-400">ESTUDIO INDEPENDIENTE DE VIDEOJUEGOS</span>
        </div>

        {/* Logo Oficial de Gran Escala de BAu Interactive */}
        <div className="relative h-20 sm:h-28 md:h-32 w-48 sm:w-64 md:w-80 aspect-[755/581] mb-8">
          <Image
            src="/images/studio/bau-interactive-logo-tight.png"
            alt="BAu Interactive Studio"
            fill
            priority
            sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 320px"
            className="object-contain object-center drop-shadow-[0_4px_30px_rgba(168,85,247,0.2)]"
          />
        </div>

        {/* Declaración de Misión / Título de Estudio */}
        <h1
          id="studio-hero-title"
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase font-sans max-w-4xl leading-[1.1] mb-6"
        >
          Creamos videojuegos de{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-[#a855f7] to-purple-300">
            destreza pura
          </span>{' '}
          y respuesta milimétrica.
        </h1>

        {/* Subtítulo / Filosofía Rápida */}
        <p className="text-base sm:text-lg text-zinc-400 font-sans leading-relaxed max-w-2xl mb-10">
          Diseñamos experiencias arcade con físicas deterministas, control fluido a 60 FPS y cero
          prácticas predatorias. Tu habilidad es el único factor de progreso.
        </p>

        {/* Botones de Acción de Portada */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href="#destacado-pok-tschack"
            onClick={scrollToSpotlight}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 h-12 rounded-lg bg-[#9333ea] hover:bg-[#7e22ce] text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-purple-950/50 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98]"
          >
            <Gamepad2 className="w-4 h-4 fill-white text-white" />
            <span>Ver Título Estandarte</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <Link
            href="/acerca"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 h-12 rounded-lg bg-zinc-950/80 hover:bg-zinc-900 text-zinc-300 hover:text-white text-sm font-medium border border-zinc-800 hover:border-zinc-600 backdrop-blur-md transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Manifiesto del Estudio</span>
            <ArrowRight className="w-4 h-4 text-zinc-400" />
          </Link>
        </div>
      </div>

      {/* Barra Inferior del Hero: Telemetría de Valores del Estudio y Prompt de Scroll */}
      <div className="relative z-10 border-t border-zinc-800/80 bg-black/60 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-500">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-zinc-400">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
              <span>FÍSICA DETERMINISTA</span>
            </span>
            <span className="hidden md:inline text-zinc-700">•</span>
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
              <span>CONTROL 60 FPS</span>
            </span>
            <span className="hidden md:inline text-zinc-700">•</span>
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
              <span>CERO PAY-TO-WIN</span>
            </span>
          </div>

          <a
            href="#destacado-pok-tschack"
            onClick={scrollToSpotlight}
            className="inline-flex items-center space-x-1.5 text-zinc-400 hover:text-[#a855f7] transition-colors cursor-pointer group"
          >
            <span>DESLIZA PARA CONOCER EL JUEGO</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
