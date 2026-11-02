import { render, screen, userEvent } from '@testing-library/react-native';
import { useRouter } from 'expo-router';

import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { ThemeProvider } from '@/theme';

jest.mock('expo-router', () => ({ useRouter: jest.fn() }));

const back = jest.fn();

function mockRouter(canGoBack: boolean) {
  jest.mocked(useRouter).mockReturnValue({
    back,
    canGoBack: () => canGoBack,
  } as unknown as ReturnType<typeof useRouter>);
}

async function renderHeader() {
  await render(
    <ThemeProvider>
      <ScreenHeader title="Salir de casa" subtitle="2 de 4 verificados" />
    </ThemeProvider>,
  );
}

beforeEach(() => back.mockClear());

describe('ScreenHeader', () => {
  it('announces the title as a header and shows the subtitle', async () => {
    mockRouter(false);
    await renderHeader();

    expect(screen.getByRole('header', { name: 'Salir de casa' })).toBeOnTheScreen();
    expect(screen.getByText('2 de 4 verificados')).toBeOnTheScreen();
  });

  it('hides «Inicio» when there is no screen to go back to', async () => {
    mockRouter(false);
    await renderHeader();

    expect(screen.queryByRole('button', { name: 'Inicio' })).not.toBeOnTheScreen();
  });

  it('goes back when «Inicio» is tapped', async () => {
    mockRouter(true);
    await renderHeader();

    await userEvent.press(screen.getByRole('button', { name: 'Inicio' }));

    expect(back).toHaveBeenCalledTimes(1);
  });
});
