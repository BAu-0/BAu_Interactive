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
              Creemos firmemente en que un videojuego debe ser tan divertido como desafiante a la vez. Diseñamos experiencias estimulantes donde cada logro se siente genuinamente ganado, respetando el tiempo del jugador y ofreciendo retos donde la satisfacción proviene de su propia destreza e ingenio.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase flex items-center space-x-2.5 font-sans">
              <Sparkles className="w-5 h-5 text-[#a855f7]" />
              <span>Entretenimiento con Propósito</span>
            </h2>
            <p>
              Abordamos cada desarrollo entendiendo la escala y el alma de cada producción. Sabemos que una propuesta ágil busca diversión inmediata, dinamismo y mecánicas fáciles de comprender desde los primeros segundos; mientras que un proyecto de mayor envergadura abre la puerta a una inmersión más pausada, profundidad gradual y nuevos matices de reto.
            </p>
            <p className="text-zinc-400">
              Sin importar el formato ni la complejidad, nuestra brújula siempre es la misma: crear juegos cautivadores, justos y pensados para disfrutarse de principio a fin.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white uppercase flex items-center space-x-2.5 font-sans">
              <Compass className="w-5 h-5 text-[#a855f7]" />
              <span>Nuestra Visión a Futuro</span>
            </h2>
            <p>
              Como desarrolladora independiente, nuestro camino está en continua expansión. Concebimos a BAu Interactive como un taller creativo en constante movimiento, con el objetivo firme de seguir ideando, construyendo y publicando nuevos proyectos que exploren distintas temáticas y estilos de juego.
            </p>
            <p className="text-zinc-400">
              Miramos hacia adelante con la convicción de ampliar nuestro catálogo paso a paso, experimentando con ideas frescas y dando vida a nuevas experiencias interactivas que sigan conectando con quienes buscan diversión auténtica y desafíos estimulantes.
            </p>
          </section>
        </div>

        {/* Tarjeta de Contacto / Call to Action */}
        <div className="p-8 rounded-2xl bg-zinc-950 text-white border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-1 font-sans">
              Prueba Pok-Tschack en tu navegador
            </h3>
            <p className="text-xs text-zinc-400 font-sans">
              Beta en navegador disponible previo a su lanzamiento en móviles
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="https://garanda.itch.io/pok-tschack-betav1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-6 h-11 rounded-lg bg-[#9333ea] hover:bg-[#7e22ce] text-white font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-white text-white" />
              <span>START</span>
            </a>
            <Link
              href="/juegos/pok-tschack"
              className="inline-flex items-center justify-center space-x-2 px-5 h-11 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider border border-zinc-750 hover:border-[#a855f7]/50 transition-all whitespace-nowrap"
            >
              <span>Conoce más</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#a855f7]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
