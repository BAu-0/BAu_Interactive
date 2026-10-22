import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  updateGtagConsent,
  getSavedConsent,
  trackEvent,
  CONSENT_STORAGE_KEY,
} from '@/lib/analytics/gtag';

describe('Google Analytics 4 & Consent Mode v2 (RGPD / ePrivacy)', () => {
  beforeEach(() => {
    localStorage.clear();
    window.gtag = vi.fn();
  });

  it('getSavedConsent devuelve "pending" cuando el usuario aún no ha interactuado', () => {
    expect(getSavedConsent()).toBe('pending');
  });

  it('updateGtagConsent("granted") actualiza almacenamiento y envía consentimiento a gtag', () => {
    updateGtagConsent('granted');

    expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBe('granted');
    expect(getSavedConsent()).toBe('granted');
    expect(window.gtag).toHaveBeenCalledWith('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  });

  it('updateGtagConsent("denied") almacena "denied" y bloquea cookies analíticas', () => {
    updateGtagConsent('denied');

    expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBe('denied');
    expect(getSavedConsent()).toBe('denied');
    expect(window.gtag).toHaveBeenCalledWith('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  });

  it('trackEvent no envía eventos si el consentimiento está en "pending" o "denied"', () => {
    // Caso 1: Pending
    trackEvent('click_play_beta', { game: 'pok-tschack' });
    expect(window.gtag).not.toHaveBeenCalledWith('event', expect.anything(), expect.anything());

    // Caso 2: Denied
    updateGtagConsent('denied');
    trackEvent('click_play_beta', { game: 'pok-tschack' });
    expect(window.gtag).not.toHaveBeenCalledWith('event', expect.anything(), expect.anything());
  });

  it('trackEvent envía eventos cuando el consentimiento está en "granted"', () => {
    updateGtagConsent('granted');
    trackEvent('click_play_beta', { game: 'pok-tschack' });
    expect(window.gtag).toHaveBeenCalledWith('event', 'click_play_beta', { game: 'pok-tschack' });
  });
});
