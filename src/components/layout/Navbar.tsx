'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Gamepad2, Trophy, Newspaper, Info } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', href: '/', icon: Gamepad2 },
  { label: 'Aether Drift', href: '/juegos/aether-drift', icon: Gamepad2 },
  { label: 'Clasificación', href: '/clasificacion', icon: Trophy },
  { label: 'Novedades', href: '/novedades', icon: Newspaper },
  { label: 'Acerca', href: '/acerca', icon: Info },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-zinc-800 shadow-md py-2.5'
          : 'bg-black/90 backdrop-blur-sm border-b border-zinc-800/80 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monograma Grabado en Titanio */}
          <Link
            href="/"
            className="flex items-center space-x-3 group rounded p-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00ff55]"
          >
            <div className="w-8 h-8 rounded border border-zinc-700 bg-zinc-900 flex items-center justify-center font-bold text-white text-xs tracking-wider transition-colors group-hover:border-[#00ff55] group-hover:text-[#00ff55]">
              BAU
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wider uppercase text-white group-hover:text-zinc-200 transition-colors">
                BAu Interactive
              </span>
              <span className="text-[10px] tracking-widest uppercase text-zinc-400">
                Indie Game Studio
              </span>
            </div>
          </Link>

          {/* Navegación de Escritorio Minimalista con Titillium Web */}
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
              {isOpen ? <X className="h-5 w-5 text-[#00ff55]" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {isOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="md:hidden fixed inset-x-0 top-[57px] bottom-0 bg-black/98 backdrop-blur-2xl border-t border-zinc-800 px-4 pt-4 pb-8 flex flex-col justify-between overflow-y-auto"
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
            <p>Juegos independientes de alto rendimiento</p>
          </div>
        </div>
      )}
    </header>
  );
}
