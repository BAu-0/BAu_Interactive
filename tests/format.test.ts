import { describe, it, expect } from 'vitest';
import { formatScore, formatRelativeTime } from '@/lib/utils/format';

describe('Utilidades de Formato', () => {
  it('formatea puntuaciones con separadores de miles', () => {
    const formatted = formatScore(985400);
    // En es-ES suele ser 985.400 o con espacio de no separación
    expect(formatted).toMatch(/985[.\s]400/);
  });

  it('calcula tiempo relativo correctamente', () => {
    const now = new Date();
    const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000).toISOString();
    expect(formatRelativeTime(tenMinutesAgo)).toContain('minutos');

    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString();
    expect(formatRelativeTime(twoHoursAgo)).toContain('horas');
  });
});
