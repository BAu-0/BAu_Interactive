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
      {/* Contenedor de ancho completo en negro puro #000000 */}
      <div className="w-full flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 lg:px-8">
        {/* Logo Oficial de BAu Interactive en el Extremo Izquierdo (Fondo 100% transparente, estático y sin saltos) */}
        <Link
          href="/"
          className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a855f7] rounded py-1"
          aria-label="BAu Interactive - Inicio"
        >
          <div className="relative h-12 sm:h-16 w-16 sm:w-21 aspect-[755/581]">
            <Image
              src="/images/studio/bau-interactive-logo-tight.png"
              alt="BAu Interactive"
              fill
              sizes="(max-width: 640px) 90px, 120px"
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Lado Derecho: Navegación de Escritorio y Menú */}
        <div className="flex items-center">
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
                    <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#a855f7] shadow-[0_0_8px_#a855f7]" />
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
              className="inline-flex items-center justify-center p-2 rounded border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:border-zinc-700 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#a855f7]"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Cerrar menú principal' : 'Abrir menú principal'}
            >
              <span className="sr-only">Menú</span>
              {isOpen ? <X className="h-6 w-6 text-[#a855f7]" /> : <Menu className="h-6 w-6" />}
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
                      ? 'text-[#a855f7] bg-zinc-900 border border-[#a855f7]/40'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white border border-transparent'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#a855f7]' : 'text-zinc-400'}`} />
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
