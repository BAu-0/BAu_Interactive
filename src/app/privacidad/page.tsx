import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Tratamiento transparente de telemetría y datos técnicos en BAu Interactive.',
};

export default function PrivacyPage() {
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'soporte@bauinteractive.com';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-zinc-700 bg-white font-sans">
      <header className="border-b border-zinc-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-[#00a836] mb-2 block">
          Política de Telemetría // Privacidad
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 uppercase mb-2">
          Privacidad de Datos
        </h1>
        <p className="text-xs text-zinc-500">
          Versión 1.1 // Protocolo Canónico de Telemetría
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-base font-bold uppercase text-zinc-950">
          1. Mínima Ingestión de Datos
        </h2>
        <p className="text-sm leading-relaxed">
          En <strong>BAu Interactive</strong> procesamos únicamente la información técnica imprescindible para calcular y proyectar la tabla de clasificación mundial. No rastreamos datos personales invasivos ni comercializamos perfiles de jugadores.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold uppercase text-zinc-950">
          2. Parámetros de la Clasificación (Top 15)
        </h2>
        <p className="text-sm leading-relaxed">
          Al enviar una partida verificada en <em>Aether Drift</em>, se registran:
        </p>
        <ul className="text-sm list-disc list-inside space-y-1.5 pl-2 text-zinc-800">
          <li><strong>Alias público (Callsign):</strong> Nombre visible elegido libremente por el jugador.</li>
          <li><strong>Puntuación y marca de tiempo UTC:</strong> Asignadas canónicamente por el servidor.</li>
          <li><strong>Identificador seudónimo (UUID):</strong> Token no asociado a datos personales.</li>
          <li><strong>Firma técnica de versión y plataforma:</strong> Con fines de integridad antifraude.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold uppercase text-zinc-950">
          3. Cookies & Almacenamiento
        </h2>
        <p className="text-sm leading-relaxed">
          No empleamos cookies publicitarias ni trackers de terceros. Solo se utilizan claves locales de almacenamiento en el cliente para mantener preferencias técnicas funcionales.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold uppercase text-zinc-950">
          4. Rectificación o Purga de Datos
        </h2>
        <p className="text-sm leading-relaxed">
          Cualquier piloto puede solicitar la rectificación o eliminación inmediata de su alias y marcas de la tabla de clasificación escribiendo a nuestro correo oficial de soporte:
        </p>
        <div className="p-3 bg-zinc-50 rounded border border-zinc-200 text-xs font-semibold text-zinc-900">
          {supportEmail}
        </div>
      </section>
    </div>
  );
}
