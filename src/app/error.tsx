'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertOctagon, RefreshCw, ArrowLeft } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Registrar error sin exponer datos confidenciales
    console.error('Error capturado por boundary:', error.message);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-surface-card border-2 border-amber-500 flex items-center justify-center text-amber-500 shadow-lg">
          <AlertOctagon className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono tracking-widest uppercase text-amber-500">
            ANOMALÍA DEL SISTEMA
          </span>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">
            Interrupción de Señal
          </h1>
          <p className="text-sm text-slate-400">
            Ocurrió un error inesperado al procesar la solicitud. Los subsistemas ya están registrando el evento.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-arcade-cyan text-slate-950 font-bold text-sm shadow-glow-cyan hover:scale-105 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reintentar Operación</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-surface-card hover:bg-surface-border text-slate-300 text-sm font-semibold border border-surface-border transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ir al Inicio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
