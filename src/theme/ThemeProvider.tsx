import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { createContext, useEffect, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { themes, type Theme, type ThemeMode } from './theme';

/** «Sistema», «Claro» u «Oscuro» in Settings (phase 5). */
export type ThemePreference = 'system' | ThemeMode;

export const ThemeContext = createContext<Theme | null>(null);

type ThemeProviderProps = {
  preference?: ThemePreference;
  children: ReactNode;
};

export function ThemeProvider({ preference = 'system', children }: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const systemMode: ThemeMode = systemScheme === 'dark' ? 'dark' : 'light';
  const theme = themes[preference === 'system' ? systemMode : preference];

  // Native window background, behind every React Native view: avoids a white
  // flash on launch and screen transitions in dark mode.
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.colors.ground);
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
      {children}
    </ThemeContext.Provider>
  );
}
