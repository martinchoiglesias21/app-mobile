import { Stack } from 'expo-router';

import { ThemeProvider, useTheme } from '@/theme';

export default function RootLayout() {
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
