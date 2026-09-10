import { describe, it, expect } from 'vitest';
import { sanitizeDisplayName } from '@/lib/utils/sanitize';

describe('Sanitización de Alias de Jugador', () => {
  it('escapa etiquetas HTML y scripts para prevenir XSS', () => {
    const raw = '<script>hack</script>';
    const sanitized = sanitizeDisplayName(raw);

    expect(sanitized).not.toContain('<script>');
    expect(sanitized).toBe('&lt;script&gt;hack&lt;/script&gt;');
  });

  it('escapa comillas simples y dobles', () => {
    const raw = `Ace "007" O'Con`;
    const sanitized = sanitizeDisplayName(raw);

    expect(sanitized).toBe('Ace &quot;007&quot; O&#039;Con');
  });

  it('limita la longitud a un máximo de 24 caracteres legibles', () => {
    const overlyLong = 'SuperExtraUltraLongGamerTagThatExceedsLimit';
    const sanitized = sanitizeDisplayName(overlyLong);

    expect(sanitized.length).toBeLessThanOrEqual(24);
    expect(sanitized).toBe('SuperExtraUltraLongGamer');
  });

  it('devuelve alias anónimo por defecto si el valor es nulo o vacío', () => {
    expect(sanitizeDisplayName('')).toBe('Piloto Anónimo');
    // @ts-expect-error probando valor inválido
    expect(sanitizeDisplayName(null)).toBe('Piloto Anónimo');
  });
});
