'use client';

import React, { useEffect, useRef } from 'react';
import type { AccentTuple } from './presets';

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark' | 'auto';
  accent?: AccentTuple;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme = 'auto', accent }) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (theme === 'dark') {
      el.setAttribute('data-theme', 'dark');
    } else if (theme === 'light') {
      el.setAttribute('data-theme', 'light');
    } else {
      el.removeAttribute('data-theme');
    }
  }, [theme]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (accent) {
      el.style.setProperty('--amber', accent[0]);
      el.style.setProperty('--amber-deep', accent[1]);
      el.style.setProperty('--amber-soft', accent[2]);
    } else {
      el.style.removeProperty('--amber');
      el.style.removeProperty('--amber-deep');
      el.style.removeProperty('--amber-soft');
    }
  }, [accent]);

  return <div ref={rootRef}>{children}</div>;
};
