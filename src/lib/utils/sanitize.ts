/**
 * Sanea y escapa cualquier alias de jugador para prevenir inyecciones HTML / XSS.
 * Limita el alias a un máximo de 24 caracteres legibles.
 */
export function sanitizeDisplayName(rawName: string): string {
  if (!rawName || typeof rawName !== 'string') {
    return 'Piloto Anónimo';
  }

  // 1. Eliminar saltos de línea y caracteres de control
  const singleLine = rawName.replace(/[\r\n\t]/g, ' ').trim();

  // 2. Acotar el nombre de usuario a 24 caracteres legibles antes de escapar entidades
  const clamped = singleLine.slice(0, 24);

  if (!clamped) {
    return 'Piloto Anónimo';
  }

  // 3. Reemplazar caracteres especiales HTML
  return clamped
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
