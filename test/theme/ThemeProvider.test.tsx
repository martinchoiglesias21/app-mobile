import { renderHook } from '@testing-library/react-native';
import * as SystemUI from 'expo-system-ui';
import type { ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { ThemeProvider, useTheme, type ThemePreference } from '@/theme';

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('expo-system-ui', () => ({ setBackgroundColorAsync: jest.fn() }));

const mockedUseColorScheme = jest.mocked(useColorScheme);

function wrapperFor(preference?: ThemePreference) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider preference={preference}>{children}</ThemeProvider>;
  };
}

describe('ThemeProvider', () => {
  it.each([
    ['light', 'light'],
    ['dark', 'dark'],
    [null, 'light'],
  ] as const)('follows the system scheme %s by default', async (system, expected) => {
    mockedUseColorScheme.mockReturnValue(system);

    const { result } = await renderHook(() => useTheme(), { wrapper: wrapperFor() });

    expect(result.current.mode).toBe(expected);
  });

  it('uses a fixed preference over the system scheme', async () => {
    mockedUseColorScheme.mockReturnValue('dark');

    const { result } = await renderHook(() => useTheme(), { wrapper: wrapperFor('light') });

    expect(result.current.mode).toBe('light');
  });

  it('paints the native background with the ground color', async () => {
    mockedUseColorScheme.mockReturnValue('dark');

    await renderHook(() => useTheme(), { wrapper: wrapperFor() });

    expect(SystemUI.setBackgroundColorAsync).toHaveBeenCalledWith('#121614');
  });
});

describe('useTheme', () => {
  it('fails with a clear message outside ThemeProvider', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    await expect(renderHook(() => useTheme())).rejects.toThrow(
      'useTheme must be used inside <ThemeProvider>.',
    );
  });
});
