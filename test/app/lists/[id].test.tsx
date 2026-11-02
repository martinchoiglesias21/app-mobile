import { renderRouter, screen } from 'expo-router/testing-library';
import { userEvent } from '@testing-library/react-native';

import Index from '@/app/index';
import ListDetailScreen from '@/app/lists/[id]';
import { hapticUncheck, hapticVerify } from '@/lib/haptics';
import { ThemeProvider } from '@/theme';

jest.mock('@/lib/haptics');

const routes = {
  index: Index,
  'lists/[id]': ListDetailScreen,
};

async function renderList(initialUrl = '/lists/sample') {
  await renderRouter(routes, {
    initialUrl,
    wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
  });
}

const user = () => userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
const checkboxNames = () =>
  screen.getAllByRole('checkbox').map((checkbox) => checkbox.props.accessibilityLabel);

describe('List detail', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    // Thursday 5 Nov 2026, 21:52.
    jest.setSystemTime(new Date(2026, 10, 5, 21, 52));
    jest.mocked(hapticVerify).mockClear();
    jest.mocked(hapticUncheck).mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('shows the list with its progress', async () => {
    await renderList();

    expect(screen.getByRole('header', { name: 'Salir de casa' })).toBeOnTheScreen();
    expect(screen.getByText('3 de 5 verificados')).toBeOnTheScreen();
    expect(checkboxNames()).toEqual([
      'Llave del gas, verificado a las 21:43, vale hasta las 6.',
      'Puerta con llave, verificado a las 21:44, vale hasta las 6.',
      'Ventanas cerradas, pendiente.',
      'Plancha desenchufada, pendiente, venció hoy a las 20 y 52.',
      'Alarma puesta, verificado a las 19:52, sin vencimiento.',
    ]);
  });

  it('verifies a pending item, then vibrates', async () => {
    await renderList();

    await user().press(screen.getByRole('checkbox', { name: 'Ventanas cerradas, pendiente.' }));

    expect(
      screen.getByRole('checkbox', {
        name: 'Ventanas cerradas, verificado a las 21:52, vale hasta las 6.',
      }),
    ).toBeChecked();
    expect(screen.getByText('4 de 5 verificados')).toBeOnTheScreen();
    expect(hapticVerify).toHaveBeenCalledTimes(1);
  });

  it('unchecks a verified item without asking', async () => {
    await renderList();

    await user().press(screen.getByRole('checkbox', { name: /^Llave del gas/ }));

    expect(screen.getByRole('checkbox', { name: 'Llave del gas, pendiente.' })).not.toBeChecked();
    expect(screen.getByText('2 de 5 verificados')).toBeOnTheScreen();
    expect(hapticUncheck).toHaveBeenCalledTimes(1);
  });

  it('says all verified with the last check time', async () => {
    await renderList();

    await user().press(screen.getByRole('checkbox', { name: /^Ventanas cerradas/ }));
    jest.setSystemTime(new Date(2026, 10, 5, 21, 53));
    await user().press(screen.getByRole('checkbox', { name: /^Plancha desenchufada/ }));

    expect(screen.getByText('Todo verificado, último a las 21:53')).toBeOnTheScreen();
  });

  it('keeps the order when marking', async () => {
    await renderList();
    const namesBefore = checkboxNames().map((name) => name.split(',')[0]);

    await user().press(screen.getByRole('checkbox', { name: /^Ventanas cerradas/ }));

    expect(checkboxNames().map((name) => name.split(',')[0])).toEqual(namesBefore);
  });

  it('goes to the sample list from an unknown list', async () => {
    await renderList('/lists/unknown');

    expect(screen.getByRole('header', { name: 'Salir de casa' })).toBeOnTheScreen();
  });
});
