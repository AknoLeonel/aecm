import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'aecm-theme';

// O tema inicial já foi aplicado por um script inline no index.html; aqui só sincronizamos.
export function useTheme() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Acompanha o sistema enquanto o usuário não escolheu um tema manualmente.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) setIsDark(e.matches);
      } catch {
        setIsDark(e.matches);
      }
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
      } catch {
        // Armazenamento indisponível (modo privado): o tema vale só para esta visita.
      }
      return next;
    });
  }, []);

  return { isDark, toggle };
}
