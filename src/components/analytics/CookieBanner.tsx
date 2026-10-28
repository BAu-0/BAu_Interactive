'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { updateGtagConsent, getSavedConsent, ConsentStatus } from '@/lib/analytics/gtag';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    // Verificar si el usuario ya ha tomado una decisión
    const consent = getSavedConsent();
    if (consent === 'pending') {
      setVisible(true);
    } else {
      setAnalyticsEnabled(consent === 'granted');
    }

    // Escuchar eventos globales para reabrir el panel de preferencias en cualquier momento
    const handleOpenPreferences = () => {
      setShowConfig(true);
      setVisible(true);
    };

    window.addEventListener('bau_open_cookies', handleOpenPreferences);
    return () => {
      window.removeEventListener('bau_open_cookies', handleOpenPreferences);
    };
  }, []);

  const handleAcceptAll = () => {
    updateGtagConsent('granted');
    setAnalyticsEnabled(true);
    setVisible(false);
    setShowConfig(false);
  };

  const handleRejectNonEssential = () => {
    updateGtagConsent('denied');
    setAnalyticsEnabled(false);
    setVisible(false);
    setShowConfig(false);
  };

  const handleSaveCustom = () => {
    if (analyticsEnabled) {
      updateGtagConsent('granted');
    } else {
      updateGtagConsent('denied');
    }
    setVisible(false);
    setShowConfig(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Consentimiento de cookies y privacidad"
      role="region"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-xl z-50 p-5 rounded-2xl bg-[#09090d]/95 backdrop-blur-md border border-purple-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)] text-zinc-200 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#a855f7] animate-pulse" />
          <h2 className="text-sm font-bold tracking-wide text-white uppercase font-sans">
            Privacidad & Analítica
          </h2>
        </div>
        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/20 text-purple-300">
          RGPD / ePrivacy
        </span>
      </div>

      {!showConfig ? (
        <>
          <p className="text-xs text-zinc-300 leading-relaxed mb-4">
            En <strong>BAu Interactive</strong> respetamos tu privacidad. Conforme a las normativas de
            protección de datos (RGPD de la UE y directiva ePrivacy), solo activamos cookies analíticas
            de Google Analytics 4 (con IP anonimizada) si nos das tu consentimiento previo para medir visitas
            y mejorar nuestros videojuegos.
          </p>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-zinc-800/80">
            <Link
              href="/privacidad"
              className="text-[11px] text-zinc-400 hover:text-purple-300 underline underline-offset-2 transition-colors"
            >
              Leer política completa
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setShowConfig(true)}
                className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-700/80 rounded-lg border border-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                Configurar
              </button>
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                Solo esenciales
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#9333ea] to-[#7928ca] hover:from-[#a855f7] hover:to-[#9333ea] rounded-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-purple-300"
              >
                Aceptar analítica
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {/* Esenciales */}
            <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-white">Cookies Técnicas / Esenciales</p>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  Necesarias para el funcionamiento básico del portal, seguridad y almacenamiento de tus preferencias de consentimiento.
                </p>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-1 bg-zinc-800 text-zinc-400 rounded shrink-0">
                Siempre activas
              </span>
            </div>

            {/* Analíticas */}
            <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-white">Analítica (Google Analytics 4)</p>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  Métricas anónimas de rendimiento, páginas visitadas y efectividad de enlaces con IP anonimizada y Consent Mode v2. Sin perfilado publicitario.
                </p>
              </div>
              <label htmlFor="analytics-consent-checkbox" className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  id="analytics-consent-checkbox"
                  type="checkbox"
                  aria-label="Permitir cookies analíticas de Google Analytics 4"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#9333ea]"></div>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => setShowConfig(false)}
              className="text-xs text-zinc-400 hover:text-white underline underline-offset-2"
            >
              Volver
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700 transition-colors"
              >
                Rechazar todas
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-4 py-1.5 text-xs font-bold text-white bg-[#9333ea] hover:bg-[#a855f7] rounded-lg transition-colors"
              >
                Guardar preferencias
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
