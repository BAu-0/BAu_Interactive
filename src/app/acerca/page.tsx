import React from 'react';
import Link from 'next/link';
import { ArrowRight, Flame, Sparkles, Compass, Play } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acerca del Estudio',
  description: 'Filosofía, principios y visión de desarrollo de BAu Interactive.',
};

export default function AboutPage() {
  return (
    <div className="w-full bg-black text-white min-h-[calc(100vh-4rem)] font-sans border-b border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-12">
        {/* Cabecera */}
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#a855f7] mb-2 block font-mono">
            Estudio Independiente
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
            Acerca de BAu Interactive
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
            Desarrolladora independiente de entretenimiento interactivo enfocada en experiencias desafiantes, creatividad original y diversión sin concesiones.
          </p>
        </div>

        {/* Contenido Editorial */}
        <div className="space-y-10 border-t border-zinc-850 pt-10 text-base leading-relaxed text-zinc-300">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase flex items-center space-x-2.5 font-sans">
              <Flame className="w-5 h-5 text-[#a855f7]" />
              <span>Nuestra Filosofía de Juego</span>
            </h2>
            <p>
              En <strong>BAu Interactive</strong> vemos a los videojuegos como lo que siempre debieron ser: una combinación de arte, reto e ingenio donde la experiencia y diversión del jugador están al centro de cada decisión.
            </p>
            <p className="text-zinc-400">
              Rechazamos las fórmulas repetitivas, los clones sin alma y las limitaciones creativas impuestas por modas pasajeras. Diseñamos títulos donde cada acierto cuesta, cada avance se siente ganado y donde el reto respeta la inteligencia y habilidad del jugador.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase flex items-center space-x-2.5 font-sans">
              <Sparkles className="w-5 h-5 text-[#a855f7]" />
              <span>Diversión en su Propósito</span>
            </h2>
            <p>
              Nuestra regla de diseño es directa: si un juego está pensado para desconectar unos minutos, debe ser sumamente entretenido al instante; si es una experiencia que exige dedicación y maestría, debe ofrecer una satisfacción inigualable al conquistar cada hito.
            </p>
            <p className="text-zinc-400">
              No creemos en llevar al jugador de la mano, sino en entregar reglas claras, controles intuitivos y desafíos justos para que cada triunfo sea mérito genuino del jugador.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase flex items-center space-x-2.5 font-sans">
              <Compass className="w-5 h-5 text-[#a855f7]" />
              <span>Exploración y Futuro</span>
            </h2>
            <p>
              <strong>Pok-Tschack</strong> marca nuestro debut oficial, reimaginando la tensión y la destreza del juego de pelota mesoamericano en una experiencia arcade contemporánea. Sin embargo, BAu Interactive no se detiene en un solo género ni en una sola estética.
            </p>
            <p className="text-zinc-400">
              Somos un estudio en constante evolución: exploramos nuevas ideas, mecánicas audaces y proyectos interactivos que mantengan viva la chispa del descubrimiento y el reto en cada partida.
            </p>
          </section>
        </div>

        {/* Tarjeta de Contacto / Call to Action */}
        <div className="p-8 rounded-2xl bg-zinc-950 text-white border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-1 font-sans">
              Prueba Pok-Tschack en tu navegador
            </h3>
            <p className="text-xs text-zinc-400 font-sans">Beta pública jugable en itch.io</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="https://garanda.itch.io/pok-tschack-betav1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-6 h-11 rounded-lg bg-[#9333ea] hover:bg-[#7e22ce] text-white font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-white text-white" />
              <span>Jugar en Itch.io</span>
            </a>
            <Link
              href="/juegos/pok-tschack"
              className="inline-flex items-center justify-center space-x-2 px-5 h-11 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider border border-zinc-750 hover:border-[#a855f7]/50 transition-all whitespace-nowrap"
            >
              <span>Ficha del Juego</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#a855f7]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
