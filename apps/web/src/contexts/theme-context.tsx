import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';

export type ThemePreference = 'dark' | 'light' | 'system';

interface ThemeContextValue {
  preference: ThemePreference;
  setPreference(preference: ThemePreference): void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const storageKey = 'stadiumsphere-theme';

function resolveTheme(preference: ThemePreference): 'dark' | 'light' {
  if (preference !== 'system') {
    return preference;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [preference, setPreference] = useState<ThemePreference>(() => {
    const stored = window.localStorage.getItem(storageKey);
    return stored === 'dark' || stored === 'light' || stored === 'system' ? stored : 'system';
  });

  useEffect(() => {
    const applyTheme = () => document.documentElement.setAttribute('data-theme', resolveTheme(preference));
    applyTheme();
    window.localStorage.setItem(storageKey, preference);

    if (preference === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      media.addEventListener('change', applyTheme);
      return () => media.removeEventListener('change', applyTheme);
    }

    return undefined;
  }, [preference]);

  const value = useMemo(() => ({ preference, setPreference }), [preference]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider.');
  }

  return context;
}
