/**
 * BAu Interactive - Google Analytics 4 & Consent Mode v2 Engine
 * Cumplimiento estricto con RGPD (UE), ePrivacy y directrices de protección de datos.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

export const CONSENT_STORAGE_KEY = 'bau_cookie_consent_v1';

export type ConsentStatus = 'granted' | 'denied' | 'pending';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Actualiza el estado de consentimiento en Google Analytics mediante Consent Mode v2.
 */
export function updateGtagConsent(status: 'granted' | 'denied') {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: status,
      ad_storage: 'denied', // BAu Interactive no usa publicidad
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  }

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, status);
    window.dispatchEvent(new CustomEvent('bau_consent_changed', { detail: { status } }));
  } catch (err) {
    console.debug('[Analytics] No se pudo guardar consentimiento en localStorage', err);
  }
}

/**
 * Lee el estado actual de consentimiento almacenado en el cliente.
 */
export function getSavedConsent(): ConsentStatus {
  if (typeof window === 'undefined') return 'pending';
  try {
    const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (saved === 'granted' || saved === 'denied') {
      return saved;
    }
  } catch {
    // Si localStorage está bloqueado, actuar de forma conservadora
    return 'denied';
  }
  return 'pending';
}

/**
 * Registra un evento personalizado en GA4 respetando el consentimiento.
 */
export function trackEvent(action: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  const currentConsent = getSavedConsent();
  if (currentConsent !== 'granted') {
    // En RGPD estricto, no enviamos eventos analíticos si el usuario no dio consentimiento explícito
    return;
  }

  if (typeof window.gtag === 'function' && GA_MEASUREMENT_ID) {
    window.gtag('event', action, params);
  }
}
