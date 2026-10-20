import React from 'react';
import Link from 'next/link';
import { ArrowRight, Cpu, ShieldCheck, Terminal, Play } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acerca del Estudio',
  description: 'Filosofía de desarrollo y diseño independiente detrás de BAu Interactive.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 bg-white text-zinc-700 font-sans">
      {/* Cabecera */}
      <div className="space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#7e22ce] mb-2 block">
          Manifiesto // Estudio Independiente
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-950 uppercase">
          Acerca de BAu Interactive
        </h1>
        <p className="text-base text-zinc-600 leading-relaxed font-sans">
          Estudio independiente enfocado en mecánicas de alta precisión, control fluido a 60 FPS y desarrollo transparente con la comunidad de jugadores.
        </p>
      </div>

      {/* Contenido Editorial */}
      <div className="space-y-10 border-t border-zinc-200 pt-10 text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 uppercase flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-[#7e22ce]" />
            <span>Filosofía de Juego</span>
          </h2>
          <p>
            En <strong>BAu Interactive</strong> creamos videojuegos donde la respuesta de control, el ritmo y la física determinista son la prioridad. Rechazamos de raíz las prácticas predatorias: no existen compras integradas abusivas, pay-to-win ni anuncios invasivos que interrumpan la concentración del jugador.
          </p>
          <p>
            Creemos en los retos auténticos donde cada segundo cuenta y donde la destreza motriz y la lectura táctica del jugador determinan el éxito de cada intento.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 uppercase flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-zinc-700" />
            <span>Proyecto Actual: Pok-Tschack</span>
          </h2>
          <p>
            Nuestro primer título estandarte es <strong>Pok-Tschack</strong>, un arcade vertical 2D de física e interceptación inspirado en el juego de pelota mesoamericano. Su núcleo se basa en golpear la pelota para hacerla cruzar un aro de piedra que gira y cambia de apertura, donde cada gol reinicia el reloj y permite resistir frente a las criaturas y desafíos de la cancha.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 uppercase flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-[#7e22ce]" />
            <span>Desarrollo Abierto & Feedback</span>
          </h2>
          <p>
            El juego se encuentra actualmente en fase beta pública jugable desde el navegador en itch.io, con el objetivo prioritario de llegar a dispositivos móviles Android. Toda retroalimentación de los jugadores sobre sensibilidad de controles, balance de dificultad y rendimiento es evaluada directamente por el autor para afinar la experiencia.
          </p>
        </section>
      </div>

      {/* Tarjeta de Contacto / Call to Action */}
      <div className="p-8 rounded-xl bg-black text-white border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-1">
            Prueba Pok-Tschack en tu navegador
          </h3>
          <p className="text-xs text-zinc-400">Beta pública v1.0 en itch.io // 60 FPS</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://garanda.itch.io/pok-tschack-betav1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-md bg-[#9333ea] hover:bg-[#7e22ce] text-white font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5 fill-white text-white" />
            <span>Jugar en Itch.io</span>
          </a>
          <Link
            href="/juegos/pok-tschack"
            className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-md bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider border border-zinc-700 transition-all whitespace-nowrap"
          >
            <span>Ficha Técnica</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
