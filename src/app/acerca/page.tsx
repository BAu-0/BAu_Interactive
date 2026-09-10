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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12 bg-obsidian text-text-muted">
      {/* Cabecera */}
      <div className="space-y-4">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent-razer mb-2 block">
          MANIFIESTO // INGENIERÍA INDEPENDIENTE
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-text-primary uppercase font-display">
          Acerca de BAu Interactive
        </h1>
        <p className="text-base text-text-secondary leading-relaxed font-sans">
          Estudio independiente enfocado en mecánicas de alta exigencia, software determinista y transparencia técnica absoluta con la comunidad de jugadores.
        </p>
      </div>

      {/* Contenido Editorial */}
      <div className="space-y-10 border-t border-border-subtle pt-10 text-sm font-sans leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-text-primary uppercase font-display flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-accent-razer" />
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
          <h2 className="text-xl font-bold text-text-primary uppercase font-display flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-accent-titanium" />
            <span>Telemetría Canónica</span>
          </h2>
          <p>
            Nuestro primer título, <em>Aether Drift</em>, conecta directamente con un backend criptográfico en Supabase. Las tablas de clasificación que ves en este portal consumen de manera idéntica la misma fuente canónica que el ejecutable del juego.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-text-primary uppercase font-display flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-accent-razer" />
            <span>Iteración Abierta</span>
          </h2>
          <p>
            Toda calibración de físicas, detección de colisiones y diseño de niveles se discute abiertamente con los pilotos en Reddit y Discord. Los parches reflejan directamente las necesidades de la comunidad competitiva.
          </p>
        </section>
      </div>

      {/* Tarjeta de Contacto */}
      <div className="p-8 rounded-lg bg-surface-card border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-6 shadow-fluent-elevated">
        <div>
          <h3 className="text-base font-bold text-text-primary uppercase tracking-wide font-display mb-1">
            Pruébalo en tu navegador
          </h3>
          <p className="text-xs text-text-muted font-mono">BETA PÚBLICA GRATUITA // 60 FPS</p>
        </div>
        <Link
          href="/juegos/aether-drift"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-md bg-accent-razer hover:bg-accent-razer-hover text-obsidian font-mono font-bold text-xs uppercase tracking-wider shadow-razer-sm hover:shadow-razer-md transition-all whitespace-nowrap"
        >
          <span>Ejecutar Aether Drift</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
