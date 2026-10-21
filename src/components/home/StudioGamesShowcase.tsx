'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Game } from '@/types/game';
import { Play, ArrowRight, Sparkles, Terminal } from 'lucide-react';

interface StudioGamesShowcaseProps {
  featuredGame: Game;
}

export function StudioGamesShowcase({ featuredGame }: StudioGamesShowcaseProps) {
  const betaLink =
    featuredGame.links.find((l) => l.type === 'beta' && l.enabled)?.url ||
    'https://garanda.itch.io/pok-tschack-betav1';

  return (
    <section
      className="py-20 lg:py-24 bg-zinc-950 text-white border-b border-zinc-800"
      aria-labelledby="portfolio-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera de la Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#a855f7] block font-sans">
              Catálogo de Producciones
            </span>
            <h2
              id="portfolio-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase font-sans"
            >
              Nuestros Títulos
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-400 max-w-md font-sans leading-relaxed">
            Cada proyecto concebido en el estudio responde a una misma premisa: desafío justo,
            respuesta inmediata y control milimétrico.
          </p>
        </div>

        {/* Cuadrícula de Proyectos del Estudio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tarjeta 1: Pok-Tschack (Título Principal) */}
          <article className="group relative rounded-2xl bg-black border border-zinc-800 hover:border-[#a855f7]/60 overflow-hidden shadow-xl transition-all duration-200 flex flex-col justify-between">
            {/* Banner Gráfico del Juego */}
            <div className="relative w-full aspect-[16/9] bg-zinc-900 overflow-hidden border-b border-zinc-800">
              <Image
                src="/videos/pok-tschack/poster-01.webp"
                alt="Pok-Tschack Gameplay"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Badges de Estado */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-zinc-700 font-bold uppercase tracking-wider text-[#a855f7]">
                  BETA v1.0 DISPONIBLE
                </span>
                <span className="px-2.5 py-0.5 rounded bg-black/70 backdrop-blur-md border border-zinc-800 text-zinc-300">
                  60 FPS
                </span>
              </div>

              {/* Logo Flotante */}
              <div className="absolute bottom-4 left-6 right-6">
                <div className="relative w-48 sm:w-56 aspect-[1232/592] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                  <Image
                    src="/images/pok-tschack/pok-tschack-title-logo.png"
                    alt={featuredGame.title}
                    fill
                    sizes="224px"
                    className="object-contain object-left"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>
              </div>
            </div>

            {/* Contenido Editorial */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[11px] font-mono text-[#a855f7] font-semibold uppercase tracking-wider block mb-2">
                  ARCADE VERTICAL 2D // FÍSICAS DE PRECISIÓN
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide font-sans mb-3">
                  {featuredGame.title}
                </h3>
                <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                  Inspirado en el juego de pelota mesoamericano. Calcula trayectorias, atraviesa el
                  aro rotatorio y reinicia el cronómetro en cada anotación limpia para sobrevivir a
                  las criaturas de la cancha.
                </p>
              </div>

              {/* Acciones de la Tarjeta */}
              <div className="pt-4 border-t border-zinc-900 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <Link
                  href={`/juegos/${featuredGame.slug}`}
                  className="inline-flex items-center justify-center space-x-2 px-6 h-11 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider border border-zinc-750 hover:border-[#a855f7]/60 transition-colors"
                >
                  <span>Ver Ficha Técnica Completa</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#a855f7]" />
                </Link>

                {betaLink && (
                  <a
                    href={betaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 px-6 h-11 rounded-lg bg-[#9333ea] hover:bg-[#7e22ce] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Jugar Beta</span>
                  </a>
                )}
              </div>
            </div>
          </article>

          {/* Tarjeta 2: Proyecto TBA (En Desarrollo Activo) */}
          <article className="group relative rounded-2xl bg-black border border-zinc-800/80 hover:border-zinc-750 overflow-hidden shadow-xl transition-all duration-200 flex flex-col justify-between">
            {/* Banner Gráfico Conceptual (Estilo Blueprint de Desarrollo) */}
            <div className="relative w-full aspect-[16/9] bg-zinc-950 overflow-hidden border-b border-zinc-800 flex items-center justify-center p-8">
              {/* Trama técnica de fondo */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, #a855f7 1px, transparent 1px), linear-gradient(to bottom, #a855f7 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />

              <div className="relative z-10 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#a855f7] shadow-lg">
                  <Terminal className="w-6 h-6" />
                </div>
                <div className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                  PROYECTO EN PRE-PRODUCCIÓN
                </div>
              </div>

              {/* Badges de Estado */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 font-bold uppercase tracking-wider text-zinc-400">
                  EN CONCEPTO // TBA
                </span>
                <span className="px-2.5 py-0.5 rounded bg-zinc-900/80 border border-zinc-800 text-zinc-500">
                  I+D
                </span>
              </div>
            </div>

            {/* Contenido Editorial */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 font-semibold uppercase tracking-wider block mb-2">
                  PRÓXIMA PRODUCCIÓN // SISTEMA EN INVESTIGACIÓN
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide font-sans mb-3">
                  Proyecto 02 (TBA)
                </h3>
                <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                  Nueva exploración mecánica enfocada en ritmo dinámico, calibración física en tiempo
                  real y control táctil sin concesiones. Actualmente en fase de diseño técnico y
                  prototipado de motor.
                </p>
              </div>

              {/* Acciones de la Tarjeta */}
              <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500">
                  ESTADO: DOCUMENTACIÓN TÉCNICA
                </span>

                <Link
                  href="/novedades"
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-[#a855f7] transition-colors"
                >
                  <span>Seguir Devlogs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        </div>

        {/* Enlace al Catálogo Completo */}
        <div className="mt-12 text-center">
          <Link
            href="/juegos"
            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-[#a855f7] transition-colors"
          >
            <span>Ver registro completo del catálogo de producciones</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
