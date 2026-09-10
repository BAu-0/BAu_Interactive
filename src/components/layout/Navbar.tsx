'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Gamepad2, Trophy, Newspaper, Info, ShieldAlert } from 'lucide-react';

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

  // Detección de scroll para compactar la barra
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Control accesible del menú móvil: tecla Escape y bloqueo de foco
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-surface-border py-2.5 shadow-lg'
          : 'bg-background/80 backdrop-blur-sm border-b border-surface-border/50 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Nombre de Estudio */}
          <Link
            href="/"
            className="flex items-center space-x-3 group rounded-md p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-arcade-cyan"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-arcade-cyan to-arcade-purple p-0.5 shadow-glow-cyan transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-background rounded-[7px] flex items-center justify-center font-bold text-arcade-cyan text-lg tracking-wider">
                BAu
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-arcade-cyan transition-colors">
                BAu Interactive
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                Indie Game Studio
              </span>
            </div>
          </Link>

          {/* Navegación de Escritorio */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-arcade-cyan bg-surface-card border border-arcade-cyan/30 shadow-glow-cyan/20'
                      : 'text-slate-300 hover:text-white hover:bg-surface-card/60'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
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
              className="inline-flex items-center justify-center p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-surface-card focus:outline-none focus-visible:ring-2 focus-visible:ring-arcade-cyan"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Cerrar menú principal' : 'Abrir menú principal'}
            >
              <span className="sr-only">Menú</span>
              {isOpen ? <X className="h-6 w-6 text-arcade-pink" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {isOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="md:hidden fixed inset-x-0 top-[65px] bottom-0 bg-background/98 backdrop-blur-xl border-t border-surface-border px-4 pt-4 pb-8 flex flex-col justify-between overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Navegación móvil"
        >
          <div className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'text-arcade-cyan bg-surface-card border border-arcade-cyan/30'
                      : 'text-slate-200 hover:bg-surface-card/60'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-arcade-cyan' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-6 border-t border-surface-border text-center text-xs text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300">BAu Interactive</p>
            <p>Videojuegos con pulso arcade y alma digital</p>
          </div>
        </div>
      )}
    </header>
  );
}
