import { render, screen, userEvent } from '@testing-library/react-native';
import type { ComponentProps } from 'react';

import { Button } from '@/components/ui/Button';
import { ThemeProvider } from '@/theme';

async function renderButton(props: Partial<ComponentProps<typeof Button>> = {}) {
  const onPress = jest.fn();
  await render(
    <ThemeProvider>
      <Button label="Verificar" onPress={onPress} {...props} />
    </ThemeProvider>,
  );
  return { onPress };
}

describe('Button', () => {
  it('is announced as a button with its label', async () => {
    await renderButton();

    expect(screen.getByRole('button', { name: 'Verificar' })).toBeOnTheScreen();
  });

  it('calls onPress when tapped', async () => {
    const { onPress } = await renderButton();

    await userEvent.press(screen.getByRole('button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  describe('while busy', () => {
    it('shows «Guardando…» and is announced as busy', async () => {
      await renderButton({ busy: true });

      const button = screen.getByRole('button', { name: 'Guardando…' });
      expect(button).toBeBusy();
      expect(button).toBeDisabled();
      expect(screen.queryByText('Verificar')).not.toBeOnTheScreen();
    });

    it('takes no taps', async () => {
      const { onPress } = await renderButton({ busy: true });

      await userEvent.press(screen.getByRole('button'));

      expect(onPress).not.toHaveBeenCalled();
    });

    it('shows a custom gerund', async () => {
      await renderButton({ busy: true, busyLabel: 'Creando listas…' });

      expect(screen.getByRole('button', { name: 'Creando listas…' })).toBeOnTheScreen();
    });
  });
});
