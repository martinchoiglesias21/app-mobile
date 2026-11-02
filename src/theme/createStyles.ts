import { StyleSheet, type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';

import type { Theme, ThemeMode } from './theme';
import { useTheme } from './useTheme';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

/**
 * Builds a component's styles from the theme. Returns a hook; the styles are
 * created once per mode and cached at module level, so no useMemo is needed.
 *
 *   const useStyles = createStyles((theme) => ({ row: { ... } }));
 *   const styles = useStyles();
 */
export function createStyles<T extends NamedStyles<T>>(factory: (theme: Theme) => T) {
  const cache = new Map<ThemeMode, Readonly<T>>();

  return function useStyles(): Readonly<T> {
    const theme = useTheme();
    let styles = cache.get(theme.mode);
    if (!styles) {
      styles = StyleSheet.create(factory(theme));
      cache.set(theme.mode, styles);
    }
    return styles;
  };
}
