import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { fontAssets, ThemeProvider, useTheme } from '@/theme';

// Keep the native splash until the font is ready, so text never shows first
// in the system font and then jumps.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);
  const ready = fontsLoaded || fontError !== null;

  useEffect(() => {
    if (fontError) {
      // The app still starts, with the system font, instead of hanging on the splash.
      console.error('Could not load Atkinson Hyperlegible Next.', fontError);
    }
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready, fontError]);

  if (!ready) {
    return null;
  }

  return (
    <ThemeProvider>
      <RootStack />
    </ThemeProvider>
  );
}

function RootStack() {
  const { colors } = useTheme();

  // The navigator paints each screen's container; without this it stays white
  // in dark mode.
  return (
    <Stack
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.ground } }}
    />
  );
}
