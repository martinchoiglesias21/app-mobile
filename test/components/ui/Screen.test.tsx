import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Screen, useScreenBottomInset } from '@/components/ui/Screen';
import { ThemeProvider } from '@/theme';

const insets = { top: 59, bottom: 34, left: 0, right: 0 };

/** Stands in for a FlatList: shows the bottom padding it would add. */
function ListContent() {
  return <Text>{`inset ${useScreenBottomInset()}`}</Text>;
}

async function renderScreen(props: { bottomInset?: boolean } = {}) {
  await render(
    <SafeAreaProvider initialMetrics={{ insets, frame: { x: 0, y: 0, width: 390, height: 844 } }}>
      <ThemeProvider>
        <Screen {...props}>
          <ListContent />
        </Screen>
      </ThemeProvider>
    </SafeAreaProvider>,
  );
}

describe('Screen', () => {
  it('keeps the status bar zone clear', async () => {
    await renderScreen();

    // The screen container is the parent of the content wrapper.
    expect(screen.getByText(/inset/).parent!.parent).toHaveStyle({ paddingTop: 59 });
  });

  it('gives a list the bottom safe area, so it ends above the home indicator', async () => {
    await renderScreen();

    expect(screen.getByText('inset 34')).toBeOnTheScreen();
  });

  it('leaves the bottom zone to a tab bar when bottomInset is off', async () => {
    await renderScreen({ bottomInset: false });

    expect(screen.getByText('inset 0')).toBeOnTheScreen();
  });
});
