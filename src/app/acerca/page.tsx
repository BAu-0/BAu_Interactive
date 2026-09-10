import React from 'react';
import Link from 'next/link';
import { ArrowRight, Cpu, ShieldCheck, Terminal } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acerca del Estudio',
  description: 'Filosofía de ingeniería y diseño detrás del estudio independiente BAu Interactive.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 bg-white text-zinc-700 font-sans">
      {/* Cabecera */}
      <div className="space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#00a836] mb-2 block">
          Manifiesto // Ingeniería Independiente
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-950 uppercase">
          Acerca de BAu Interactive
        </h1>
        <p className="text-base text-zinc-600 leading-relaxed font-sans">
          Estudio independiente enfocado en mecánicas de alta exigencia, software determinista y transparencia técnica absoluta con la comunidad de jugadores.
        </p>
      </div>

      {/* Contenido Editorial */}
      <div className="space-y-10 border-t border-zinc-200 pt-10 text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 uppercase flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-[#00a836]" />
            <span>Filosofía de Software</span>
          </h2>
          <p>
            No simulamos ser una corporación masiva ni añadimos capas innecesarias a nuestros productos. En <strong>BAu Interactive</strong> diseñamos videojuegos donde la respuesta de control a 60 FPS o más es la prioridad número uno. Cada milisegundo de entrada importa.
          </p>
          <p>
            Rechazamos de raíz las prácticas predatorias: no existen compras integradas forzadas, cajas de botín ni anuncios invasivos que interrumpan la concentración del jugador.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 uppercase flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-zinc-700" />
            <span>Telemetría Canónica</span>
          </h2>
          <p>
            Nuestro primer título, <em>Aether Drift</em>, conecta directamente con un backend criptográfico en Supabase. Las tablas de clasificación que ves en este portal consumen de manera idéntica la misma fuente canónica que el ejecutable del juego.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 uppercase flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-[#00a836]" />
            <span>Iteración Abierta</span>
          </h2>
          <p>
            Toda calibración de físicas, detección de colisiones y diseño de niveles se discute abiertamente con los pilotos en Reddit y Discord. Los parches reflejan directamente las necesidades de la comunidad competitiva.
          </p>
        </section>
      </div>

      {/* Tarjeta de Contacto / Call to Action en negro y verde */}
      <div className="p-8 rounded-xl bg-black text-white border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-1">
            Pruébalo en tu navegador
          </h3>
          <p className="text-xs text-zinc-400">Beta pública gratuita // 60 FPS</p>
        </div>
        <Link
          href="/juegos/aether-drift"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-md bg-[#00d647] hover:bg-[#00b83c] text-black font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap"
        >
          <span>Ejecutar Aether Drift</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
