import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createStyles } from '@/theme';

type ScreenProps = {
  children: ReactNode;
  /** Wraps the content in a ScrollView. Lists use FlatList inside a non-scroll Screen. */
  scroll?: boolean;
  /** Adds the bottom safe area (home indicator). Off when a tab bar takes that zone. */
  bottomInset?: boolean;
};

/**
 * Container for every screen. Keeps the status bar and Dynamic Island zone
 * clear and painted with the ground color; content scrolls beneath it and is
 * clipped at its edge.
 */
export function Screen({ children, scroll = false, bottomInset = true }: ScreenProps) {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const paddingBottom = bottomInset ? insets.bottom : 0;

  return (
    // Insets are runtime values from the device, so they go inline.
    <View
      style={[
        styles.screen,
        { paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right },
      ]}
    >
      {scroll ? (
        <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom }}>
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.content, { paddingBottom }]}>{children}</View>
      )}
    </View>
  );
}

const useStyles = createStyles((theme) => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.ground,
  },
  content: {
    flex: 1,
  },
}));
