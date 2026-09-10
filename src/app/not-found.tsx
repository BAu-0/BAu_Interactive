import React from 'react';
import Link from 'next/link';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-surface-card border-2 border-arcade-pink flex items-center justify-center text-arcade-pink shadow-glow-pink">
          <Gamepad2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono tracking-widest uppercase text-arcade-pink">
            ERROR 404 • SECTOR VACÍO
          </span>
          <h1 className="text-4xl font-black text-white uppercase tracking-tight font-display">
            Zona no explorada
          </h1>
          <p className="text-sm text-slate-400">
            La coordenada que buscas se ha desintegrado en el vacío o nunca existió en este cuadrante.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-arcade-cyan text-slate-950 font-bold text-sm shadow-glow-cyan hover:scale-105 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la Base (Inicio)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
