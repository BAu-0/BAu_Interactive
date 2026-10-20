import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Terminal } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-white font-sans">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full border border-zinc-200 bg-zinc-50 flex items-center justify-center text-[#7e22ce] shadow-sm">
          <Terminal className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold tracking-widest uppercase text-[#7e22ce]">
            Error 404 // Coordenada Inválida
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-950 uppercase tracking-tight">
            Sector No Encontrado
          </h1>
          <p className="text-sm text-zinc-600">
            El cuadrante solicitado no responde a la telemetría del sistema o ha sido desmantelado.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-md bg-[#9333ea] hover:bg-[#7e22ce] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retornar a Base (Inicio)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
