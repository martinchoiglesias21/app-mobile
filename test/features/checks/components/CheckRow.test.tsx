import { render, screen, userEvent } from '@testing-library/react-native';
import type { ComponentProps } from 'react';

import type { CheckStatus } from '@/features/checks/checks.types';
import { CheckRow } from '@/features/checks/components/CheckRow';
import { ThemeProvider } from '@/theme';

const now = new Date(2026, 10, 5, 22, 0);
const at = (day: number, hours: number, minutes = 0) => new Date(2026, 10, day, hours, minutes);

// The visible texts are hidden from the screen reader on purpose (the circle's
// label already says them), so queries for them must include hidden elements.
const hidden = { includeHiddenElements: true };

const verified: CheckStatus = {
  kind: 'verified',
  checkedAt: at(5, 21, 43),
  expiresAt: at(6, 6),
  hasPhoto: false,
};

async function renderRow(props: Partial<ComponentProps<typeof CheckRow>> = {}) {
  const onToggle = jest.fn();
  await render(
    <ThemeProvider>
      <CheckRow
        name="Llave del gas"
        status={{ kind: 'pending' }}
        now={now}
        onToggle={onToggle}
        {...props}
      />
    </ThemeProvider>,
  );
  return { onToggle };
}

describe('CheckRow', () => {
  it('shows a pending item as an unchecked checkbox', async () => {
    await renderRow();

    const checkbox = screen.getByRole('checkbox', { name: 'Llave del gas, pendiente.' });
    expect(checkbox).not.toBeChecked();
    expect(screen.getByText('Pendiente', hidden)).toBeOnTheScreen();
  });

  it('shows a verified item with its time and end', async () => {
    await renderRow({ status: verified });

    const checkbox = screen.getByRole('checkbox', {
      name: 'Llave del gas, verificado a las 21:43, vale hasta las 6.',
    });
    expect(checkbox).toBeChecked();
    expect(screen.getByText('Verificado a las 21:43', hidden)).toBeOnTheScreen();
    expect(screen.getByText('hasta 06:00', hidden)).toBeOnTheScreen();
  });

  it('shows «sin vencimiento» when the check does not expire', async () => {
    await renderRow({ status: { ...verified, expiresAt: null } });

    expect(screen.getByText('sin vencimiento', hidden)).toBeOnTheScreen();
  });

  it('shows an expired item as pending, saying when it expired', async () => {
    await renderRow({ status: { kind: 'expiredToday', expiredAt: at(5, 13) } });

    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByText('Venció hoy 13:00', hidden)).toBeOnTheScreen();
    expect(screen.queryByText(/hasta/, hidden)).not.toBeOnTheScreen();
  });

  it('toggles when the circle is tapped', async () => {
    const { onToggle } = await renderRow();

    await userEvent.press(screen.getByRole('checkbox'));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('ignores a second tap within 400 ms', async () => {
    const nowSpy = jest.spyOn(Date, 'now').mockReturnValue(1_000);
    const { onToggle } = await renderRow();
    const checkbox = screen.getByRole('checkbox');

    await userEvent.press(checkbox);
    nowSpy.mockReturnValue(1_399);
    await userEvent.press(checkbox);
    expect(onToggle).toHaveBeenCalledTimes(1);

    nowSpy.mockReturnValue(1_400);
    await userEvent.press(checkbox);
    expect(onToggle).toHaveBeenCalledTimes(2);

    nowSpy.mockRestore();
  });
});
