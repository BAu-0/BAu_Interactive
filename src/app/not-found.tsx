import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Terminal } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-obsidian">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-14 h-14 mx-auto rounded border border-border-subtle bg-surface-elevated flex items-center justify-center text-accent-razer shadow-fluent-hairline">
          <Terminal className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono tracking-widest uppercase text-accent-razer">
            ERROR 404 // COORDENADA INVÁLIDA
          </span>
          <h1 className="text-3xl font-black text-text-primary uppercase tracking-tight font-display">
            Sector No Encontrado
          </h1>
          <p className="text-xs font-mono text-text-muted">
            El cuadrante solicitado no responde a la telemetría del sistema o ha sido desmantelado.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-md bg-accent-razer hover:bg-accent-razer-hover text-obsidian font-mono font-bold text-xs uppercase tracking-wider shadow-razer-sm hover:shadow-razer-md transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retornar a Base (Inicio)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
