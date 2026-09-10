import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos de Servicio',
  description: 'Condiciones de uso y juego limpio para el portal y clasificación de BAu Interactive.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8 text-text-muted bg-obsidian">
      <header className="border-b border-border-subtle pb-6">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent-razer mb-2 block">
          CONDICIONES DE SISTEMA // PROTOCOLO COMPETITIVO
        </span>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-text-primary uppercase font-display mb-2">
          Términos de Servicio y Juego Limpio
        </h1>
        <p className="text-xs font-mono text-text-muted">
          VERSIÓN 1.1 // COMPROMISO ANTI-CHEAT
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-base font-mono font-bold uppercase text-text-primary">
          1. Aceptación del Protocolo
        </h2>
        <p className="text-xs font-sans leading-relaxed">
          El acceso a los servicios web y la participación en las versiones de prueba de los títulos de <strong>BAu Interactive</strong> implican la aceptación de estas condiciones y el respeto estricto a las normas de competición leal.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-mono font-bold uppercase text-text-primary">
          2. Integridad de la Clasificación (Anti-Cheat)
        </h2>
        <p className="text-xs font-sans leading-relaxed">
          Para salvaguardar la confianza de todos los pilotos, está terminantemente prohibido:
        </p>
        <ul className="text-xs font-mono list-disc list-inside space-y-1.5 pl-2 text-text-secondary">
          <li>Modificar o inyectar código en la memoria del ejecutable para alterar multiplicadores de inercia o cronómetros.</li>
          <li>Enviar solicitudes HTTP simuladas o forzar telemetrías sintéticas fuera del flujo normal de juego.</li>
          <li>Utilizar alias difamatorios, de odio o que contengan ataques de inyección de scripts.</li>
        </ul>
        <p className="text-xs font-sans leading-relaxed">
          Cualquier marca anómala es rechazada en la ingestión y su identificador es purgado de la base canónica.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-mono font-bold uppercase text-text-primary">
          3. Versiones en Desarrollo
        </h2>
        <p className="text-xs font-sans leading-relaxed">
          Los videojuegos en fase de Beta pública pueden recibir ajustes de balance y físicas periódicas para garantizar la paridad competitiva.
        </p>
      </section>
    </div>
  );
}
