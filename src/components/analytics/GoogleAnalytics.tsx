'use client';

import Script from 'next/script';
import { GA_MEASUREMENT_ID, CONSENT_STORAGE_KEY } from '@/lib/analytics/gtag';

/**
 * Google Analytics 4 con soporte obligatorio para Consent Mode v2 (RGPD / ePrivacy).
 *
 * Por defecto:
 * 1. Todos los tipos de almacenamiento (analytics_storage, ad_storage, etc.) inician en 'denied'.
 * 2. Se activa anonymize_ip: true.
 * 3. Si el usuario ya dio su consentimiento previo en localStorage, se actualiza a 'granted'.
 * 4. Si no hay ID de medición configurado, el script no se descarga para no consumir ancho de banda.
 */
export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    // Si no hay ID de GA4 configurado aún en .env, inicializar gtag stub para evitar errores
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
          `,
        }}
      />
    );
  }

  return (
    <>
      {/* 1. Inicialización de Consent Mode v2 ANTES de cargar gtag.js */}
      <Script
        id="google-consent-mode-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;

            // Verificar si el usuario ya otorgó consentimiento previamente en este navegador
            var savedConsent = 'denied';
            try {
              var stored = localStorage.getItem('${CONSENT_STORAGE_KEY}');
              if (stored === 'granted') {
                savedConsent = 'granted';
              }
            } catch(e) {}

            // Consent Mode v2 por defecto (Obligatorio en Europa / RGPD)
            gtag('consent', 'default', {
              'analytics_storage': savedConsent,
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });

            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure',
              send_page_view: true
            });
          `,
        }}
      />

      {/* 2. Carga asíncrona de la librería oficial gtag de Google en reposo para 0 bloqueo de LCP */}
      <Script
        id="google-analytics-tag"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
    </>
  );
}
