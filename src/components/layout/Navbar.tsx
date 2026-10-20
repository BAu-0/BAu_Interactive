'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Gamepad2, Trophy, Newspaper, Info } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', href: '/', icon: Gamepad2 },
  { label: 'Pok-Tschack (Beta)', href: '/juegos/pok-tschack', icon: Gamepad2 },
  { label: 'Clasificación', href: '/clasificacion', icon: Trophy },
  { label: 'Novedades', href: '/novedades', icon: Newspaper },
  { label: 'El Estudio', href: '/acerca', icon: Info },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[#000000] border-b border-zinc-800 shadow-xl">
      {/* Contenedor de ancho completo y altura uniforme */}
      <div className="w-full flex items-stretch justify-between h-16 sm:h-20">
        {/* Bloque Insignia en el Extremo Superior Izquierdo (Estilo Nintendo / Bethesda) */}
        <Link
          href="/"
          className="h-full flex items-center justify-center px-4 sm:px-7 md:px-9 bg-[#000000] border-r border-zinc-800/80 hover:bg-zinc-950 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff55]"
          aria-label="BAu Interactive - Inicio"
        >
          <div className="relative h-full py-2 sm:py-2.5 aspect-[814/640] transition-transform duration-200 group-hover:scale-105 flex items-center justify-center">
            <Image
              src="/images/studio/bau-interactive-logo-cropped.png"
              alt="BAu Interactive"
              fill
              sizes="(max-width: 640px) 120px, 160px"
              className="object-contain object-center"
              priority
            />
          </div>
        </Link>

        {/* Lado Derecho: Navegación de Escritorio y Menú */}
        <div className="flex items-center px-4 sm:px-6 lg:px-8">
          <nav className="hidden md:flex items-center space-x-1" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium tracking-normal transition-colors duration-150 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#00ff55] shadow-[0_0_8px_#00ff55]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Botón de Menú Móvil */}
          <div className="flex md:hidden">
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:border-zinc-700 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00ff55]"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Cerrar menú principal' : 'Abrir menú principal'}
            >
              <span className="sr-only">Menú</span>
              {isOpen ? <X className="h-6 w-6 text-[#00ff55]" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {isOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="md:hidden fixed inset-x-0 top-[64px] sm:top-[80px] bottom-0 bg-[#000000]/98 backdrop-blur-2xl border-t border-zinc-800 px-4 pt-4 pb-8 flex flex-col justify-between overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Navegación móvil"
        >
          <div className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded text-sm font-medium tracking-normal transition-all ${
                    isActive
                      ? 'text-[#00ff55] bg-zinc-900 border border-[#00ff55]/40'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white border border-transparent'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#00ff55]' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-6 border-t border-zinc-800 text-center text-xs text-zinc-400 space-y-1">
            <p className="font-semibold text-white tracking-wider uppercase">BAu Interactive</p>
            <p>Estudio de desarrollo de videojuegos independientes</p>
          </div>
        </div>
      )}
    </header>
  );
}
