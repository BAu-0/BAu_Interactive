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
          ? 'bg-obsidian/90 backdrop-blur-xl border-b border-border-subtle shadow-fluent-rest py-2.5'
          : 'bg-obsidian/75 backdrop-blur-md border-b border-border-subtle/60 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monograma Grabado en Titanio */}
          <Link
            href="/"
            className="flex items-center space-x-3 group rounded p-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-razer"
          >
            <div className="w-8 h-8 rounded border border-border-hover bg-surface-elevated flex items-center justify-center font-mono font-bold text-white text-xs tracking-widest transition-colors group-hover:border-accent-razer group-hover:text-accent-razer">
              BAU
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-text-primary group-hover:text-white transition-colors">
                BAu Interactive
              </span>
              <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-text-muted">
                Studio Systems
              </span>
            </div>
          </Link>

          {/* Navegación de Escritorio Minimalista */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-2 text-xs font-mono uppercase tracking-wider transition-colors duration-150 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-accent-razer shadow-[0_0_8px_#00ff55]" />
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
              className="inline-flex items-center justify-center p-2 rounded border border-border-subtle bg-surface-elevated text-text-secondary hover:text-white hover:border-border-hover focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-razer"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Cerrar menú principal' : 'Abrir menú principal'}
            >
              <span className="sr-only">Menú</span>
              {isOpen ? <X className="h-5 w-5 text-accent-razer" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {isOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="md:hidden fixed inset-x-0 top-[57px] bottom-0 bg-obsidian/98 backdrop-blur-2xl border-t border-border-subtle px-4 pt-4 pb-8 flex flex-col justify-between overflow-y-auto"
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
                  className={`flex items-center space-x-3 px-4 py-3 rounded text-sm font-mono uppercase tracking-wider transition-all ${
                    isActive
                      ? 'text-accent-razer bg-surface-elevated border border-accent-razer/30'
                      : 'text-text-secondary hover:bg-surface-elevated hover:text-white border border-transparent'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-accent-razer' : 'text-text-muted'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-6 border-t border-border-subtle text-center text-[11px] font-mono text-text-muted space-y-1">
            <p className="font-semibold text-text-primary tracking-widest uppercase">BAu Interactive</p>
            <p>HIGH-PRECISION INDIE GAMING SYSTEMS</p>
          </div>
        </div>
      )}
    </header>
  );
}
