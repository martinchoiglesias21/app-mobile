import { renderHook } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { createStyles, ThemeProvider, type ThemePreference } from '@/theme';

const useStyles = createStyles((theme) => ({
  row: { backgroundColor: theme.colors.ground },
}));

function wrapperFor(preference: ThemePreference) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider preference={preference}>{children}</ThemeProvider>;
  };
}

describe('createStyles', () => {
  it('builds the styles from the active theme', async () => {
    const { result } = await renderHook(() => useStyles(), { wrapper: wrapperFor('dark') });

    expect(result.current.row.backgroundColor).toBe('#121614');
  });

  it('reuses the same styles object within a mode', async () => {
    const first = await renderHook(() => useStyles(), { wrapper: wrapperFor('light') });
    const second = await renderHook(() => useStyles(), { wrapper: wrapperFor('light') });

    expect(second.result.current).toBe(first.result.current);
  });

  it('returns different styles for each mode', async () => {
    const light = await renderHook(() => useStyles(), { wrapper: wrapperFor('light') });
    const dark = await renderHook(() => useStyles(), { wrapper: wrapperFor('dark') });

    expect(dark.result.current).not.toBe(light.result.current);
    expect(light.result.current.row.backgroundColor).toBe('#F3F4F0');
  });
});
