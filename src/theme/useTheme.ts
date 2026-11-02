import { useContext } from 'react';

import type { Theme } from './theme';
import { ThemeContext } from './ThemeProvider';

/** Tokens of the active mode (light or dark). */
export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used inside <ThemeProvider>.');
  }
  return theme;
}
