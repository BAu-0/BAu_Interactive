import React from 'react';
import Link from 'next/link';
import { Gamepad2, Shield, Heart, Terminal, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acerca del Estudio',
  description: 'Conoce la filosofía y visión detrás del estudio independiente BAu Interactive.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Cabecera */}
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-arcade-cyan">
          <Terminal className="w-4 h-4" />
          <span>Manifiesto Independiente</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
          Acerca de BAu Interactive
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed font-normal">
          Un estudio pequeño enfocado en crear videojuegos desafiantes, transparentes con su comunidad y diseñados para premiar la habilidad pura del jugador.
        </p>
      </div>

      {/* Contenido Editorial */}
      <div className="space-y-8 text-slate-300 leading-relaxed text-base border-t border-surface-border pt-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Gamepad2 className="w-6 h-6 text-arcade-cyan" />
            <span>Nuestra Filosofía</span>
          </h2>
          <p>
            No somos una corporación multinacional ni pretendemos simular serlo. <strong>BAu Interactive</strong> nació con un propósito directo: revivir la adrenalina de los arcades clásicos donde cada partida depende enteramente de tus reflejos, tu capacidad de anticipación y tu dominio de las mecánicas.
          </p>
          <p>
            Creemos que los videojuegos deben respetar el tiempo y la inteligencia de quien juega. Por eso, nuestros títulos no contienen mecánicas abusivas de monetización, cajas de botín ni barreras artificiales de progresión.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Shield className="w-6 h-6 text-arcade-gold" />
            <span>Competencia Transparente</span>
          </h2>
          <p>
            Nuestro primer juego, <em>Aether Drift</em>, implementa un sistema canónico de clasificación mundial donde cada récord es validado de forma estricta por nuestro servidor. La tabla Top 15 que ves en este portal es exactamente la misma que alimenta el cliente del juego en tiempo real.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Heart className="w-6 h-6 text-arcade-pink" />
            <span>Desarrollo Abierto a la Comunidad</span>
          </h2>
          <p>
            Todas las decisiones de balance, físicas y diseño de niveles se debaten abiertamente en nuestros canales de Reddit y Discord. Si tienes una sugerencia sobre cómo mejorar la respuesta de los controles o el ritmo de las oleadas, tu voz tiene un impacto directo en el próximo parche.
          </p>
        </section>
      </div>

      {/* Tarjeta de Contacto */}
      <div className="p-8 rounded-2xl bg-surface-card border border-surface-border flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">¿Listo para poner a prueba tus reflejos?</h3>
          <p className="text-sm text-slate-400">Prueba la versión beta pública gratuita en tu navegador.</p>
        </div>
        <Link
          href="/juegos/aether-drift"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-arcade-cyan text-slate-950 font-bold text-sm shadow-glow-cyan hover:scale-105 transition-all whitespace-nowrap"
        >
          <span>Jugar Aether Drift</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
