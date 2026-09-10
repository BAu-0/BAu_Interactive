import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos de Servicio',
  description: 'Condiciones de uso y juego limpio para el portal y clasificación de BAu Interactive.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-slate-300">
      <header className="border-b border-surface-border pb-6">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
          Términos de Servicio y Juego Limpio
        </h1>
        <p className="text-xs font-mono text-slate-400">
          Última actualización: Septiembre de 2026 • Versión 1.0 (Beta)
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">1. Aceptación de los Términos</h2>
        <p className="text-sm leading-relaxed">
          Al acceder al sitio web de <strong>BAu Interactive</strong> y participar en las versiones de prueba (Beta) de nuestros videojuegos, aceptas cumplir los presentes Términos de Servicio y nuestras normas de convivencia comunitaria.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">2. Política de Juego Limpio y Anti-Trampas</h2>
        <p className="text-sm leading-relaxed">
          La integridad del Top 15 mundial es fundamental para la experiencia de todos los jugadores. Queda estrictamente prohibido:
        </p>
        <ul className="text-sm list-disc list-inside space-y-1.5 pl-2">
          <li>Modificar la memoria del cliente de juego para alterar puntuaciones, velocidades o temporizadores.</li>
          <li>Inyectar paquetes o realizar peticiones simuladas al endpoint de envío de puntuaciones sin jugar la partida.</li>
          <li>Utilizar alias ofensivos, difamatorios, de odio o que contengan datos personales sensibles o intentos de inyección de código.</li>
        </ul>
        <p className="text-sm leading-relaxed">
          Cualquier registro detectado como anómalo o fraudulento será purgado y el jugador podrá ser descalificado del salón de la fama.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">3. Naturaleza de las Versiones Beta</h2>
        <p className="text-sm leading-relaxed">
          <em>Aether Drift</em> se encuentra actualmente en fase de Beta Pública. Esto significa que las físicas, balances, multiplicadores y requisitos de hardware pueden ser actualizados periódicamente. BAu Interactive se reserva el derecho de calibrar o reiniciar temporadas de clasificación previa notificación en la sección de Novedades.
        </p>
      </section>
    </div>
  );
}
