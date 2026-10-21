'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, Gamepad2, ArrowRight } from 'lucide-react';

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
      {/* Fondo Atmosférico Minimalista con Glow Morado Mace Windu */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Glow Radial Central */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[350px] sm:h-[550px] bg-purple-950/30 blur-[150px] rounded-full" />
        {/* Trama sutil de cuadrícula de fondo */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Gradientes de viñeta suaves */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
      </div>

      {/* Contenido Central: Logo de Gran Escala y Leyenda Minimalista */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 my-auto w-full flex flex-col items-center text-center">
        {/* Logo Oficial de Gran Escala de BAu Interactive (Fondo Transparente) */}
        <h1 id="studio-hero-title" className="sr-only">
          BAu Interactive - Desarrollando desde 2026
        </h1>

        <div className="relative w-72 sm:w-96 md:w-[480px] lg:w-[560px] aspect-[755/581] mb-8 drop-shadow-[0_8px_40px_rgba(168,85,247,0.25)]">
          <Image
            src="/images/studio/bau-interactive-logo-tight.png"
            alt="BAu Interactive"
            fill
            priority
            sizes="(max-width: 640px) 288px, (max-width: 768px) 384px, (max-width: 1024px) 480px, 560px"
            className="object-contain object-center"
          />
        </div>

        {/* Leyenda Simple y Elegante Solicitada por el Usuario */}
        <div className="mb-10">
          <p className="text-sm sm:text-base md:text-lg font-mono font-medium uppercase tracking-[0.3em] text-zinc-300 drop-shadow">
            Desarrollando desde 2026
          </p>
        </div>

        {/* Botones de Acción Simétricos */}
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
            <span>El Estudio</span>
            <ArrowRight className="w-4 h-4 text-zinc-400" />
          </Link>
        </div>
      </div>

      {/* Barra Inferior del Hero: Prompt de Scroll Sutil */}
      <div className="relative z-10 border-t border-zinc-900 bg-black/60 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-mono text-zinc-500">
          <span className="text-zinc-500 uppercase tracking-wider">
            ESTUDIO INDEPENDIENTE
          </span>

          <a
            href="#destacado-pok-tschack"
            onClick={scrollToSpotlight}
            className="inline-flex items-center space-x-2 text-zinc-400 hover:text-[#a855f7] transition-colors cursor-pointer group uppercase tracking-wider"
          >
            <span>Desliza para explorar</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
