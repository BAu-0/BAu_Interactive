import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Tratamiento transparente de alias, puntuaciones y datos en BAu Interactive.',
};

export default function PrivacyPage() {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'soporte@bauinteractive.com';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-slate-300">
      <header className="border-b border-surface-border pb-6">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
          Política de Privacidad y Tratamiento de Datos
        </h1>
        <p className="text-xs font-mono text-slate-400">
          Última actualización: Septiembre de 2026 • Versión 1.0 (Beta)
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">1. Principio de Mínima Recolección</h2>
        <p className="text-sm leading-relaxed">
          En <strong>BAu Interactive</strong> aplicamos el principio estricto de recolectar únicamente la información técnica imprescindible para el correcto funcionamiento de nuestros videojuegos y la tabla de clasificación mundial. No vendemos, compartimos ni comerciamos con datos de jugadores.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">2. Datos de la Clasificación (Top 15)</h2>
        <p className="text-sm leading-relaxed">
          Cuando participas en partidas de <em>Aether Drift</em> y envías una puntuación para el ranking público, tratamos los siguientes datos:
        </p>
        <ul className="text-sm list-disc list-inside space-y-1.5 pl-2">
          <li><strong>Alias público (display name):</strong> Nombre seudónimo elegido voluntariamente por el jugador.</li>
          <li><strong>Puntuación obtenida y marca de tiempo (UTC):</strong> Valor numérico de puntos y fecha/hora asignada por el servidor al validar la partida.</li>
          <li><strong>Identificador seudónimo técnico:</strong> UUID aleatorio no vinculado públicamente a tu identidad real.</li>
          <li><strong>Versión del juego y plataforma:</strong> Con fines exclusivos de compatibilidad y control antifraude.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">3. Cookies y Rastreo</h2>
        <p className="text-sm leading-relaxed">
          Este sitio web <strong>no utiliza cookies de publicidad invasiva ni rastreadores de terceros</strong>. Únicamente se emplean mecanismos locales necesarios para recordar preferencias funcionales (como el estado de audio en el juego o caché técnica de rendimiento).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">4. Derecho a Rectificación u Ocultación</h2>
        <p className="text-sm leading-relaxed">
          Cualquier jugador tiene derecho a solicitar la modificación, anonimización u ocultación de su alias o puntuación en la tabla de clasificación. Para ejercer este derecho, puedes escribirnos a nuestro correo oficial de soporte indicando tu alias:
        </p>
        <div className="p-4 bg-surface-card rounded-xl border border-surface-border text-sm font-mono text-arcade-cyan">
          {supportEmail}
        </div>
      </section>
    </div>
  );
}
