import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Screen } from '@/components/ui/Screen';
import { ThemeProvider } from '@/theme';

const insets = { top: 59, bottom: 34, left: 0, right: 0 };

async function renderScreen(props: { scroll?: boolean; bottomInset?: boolean } = {}) {
  await render(
    <SafeAreaProvider initialMetrics={{ insets, frame: { x: 0, y: 0, width: 390, height: 844 } }}>
      <ThemeProvider>
        <Screen {...props}>
          <Text>Contenido</Text>
        </Screen>
      </ThemeProvider>
    </SafeAreaProvider>,
  );
}

// The container is the parent of the content wrapper.
const container = () => screen.getByText('Contenido').parent!.parent!;

describe('Screen', () => {
  it('keeps the status bar zone clear', async () => {
    await renderScreen();

    expect(container()).toHaveStyle({ paddingTop: 59 });
  });

  it('adds the bottom safe area by default', async () => {
    await renderScreen();

    expect(screen.getByText('Contenido').parent).toHaveStyle({ paddingBottom: 34 });
  });

  it('leaves the bottom zone to a tab bar when bottomInset is off', async () => {
    await renderScreen({ bottomInset: false });

    expect(screen.getByText('Contenido').parent).toHaveStyle({ paddingBottom: 0 });
  });
});
