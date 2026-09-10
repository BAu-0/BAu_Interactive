/**
 * Formateo de puntuaciones numéricas según locale en español.
 */
export function formatScore(score: number): string {
  return new Intl.NumberFormat('es-ES').format(score);
}

/**
 * Formateo de fechas relativas ("hace 2 horas", "hace 3 días") o absolutas en UTC.
 */
export function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'hace unos segundos';
    }
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `hace ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;
    }
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `hace ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `hace ${diffInDays} ${diffInDays === 1 ? 'día' : 'días'}`;
    }

    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Formatea una fecha en formato completo UTC legible.
 */
export function formatUtcDateTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toUTCString();
  } catch {
    return dateString;
  }
}
