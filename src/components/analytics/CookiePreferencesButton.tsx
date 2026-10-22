'use client';

export function CookiePreferencesButton({ className = '' }: { className?: string }) {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('bau_open_cookies'));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`hover:text-zinc-300 transition-colors cursor-pointer text-left focus:outline-none focus:underline ${className}`}
    >
      Preferencias de Cookies
    </button>
  );
}
