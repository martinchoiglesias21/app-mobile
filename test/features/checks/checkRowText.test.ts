import { checkAccessibilityLabel, checkMeta, checkUntil } from '@/features/checks/checkRowText';
import type { CheckStatus } from '@/features/checks/checks.types';

// Thursday 5 Nov 2026, 22:00 local time.
const now = new Date(2026, 10, 5, 22, 0);
const at = (day: number, hours: number, minutes = 0) => new Date(2026, 10, day, hours, minutes);

const verified = (expiresAt: Date | null): CheckStatus => ({
  kind: 'verified',
  checkedAt: at(5, 21, 43),
  expiresAt,
  hasPhoto: false,
});

describe('checkMeta', () => {
  it.each<[CheckStatus, string]>([
    [{ kind: 'pending' }, 'Pendiente'],
    [verified(null), 'Verificado a las 21:43'],
    [{ kind: 'expiredToday', expiredAt: at(5, 13) }, 'Venció hoy 13:00'],
  ])('%#: «%s»', (status, expected) => {
    expect(checkMeta(status)).toBe(expected);
  });
});

describe('checkUntil', () => {
  it('shows only the time when the end is less than 24 h away', () => {
    expect(checkUntil(at(6, 6), now)).toBe('hasta 06:00');
  });

  it('adds the day when the end is 24 h or more away', () => {
    expect(checkUntil(at(13, 8, 30), now)).toBe('hasta vie 08:30');
  });

  it('says «sin vencimiento» when it does not expire', () => {
    expect(checkUntil(null, now)).toBe('sin vencimiento');
  });
});

describe('checkAccessibilityLabel', () => {
  it('says when it is valid until, spoken', () => {
    expect(checkAccessibilityLabel('Llave del gas', verified(at(6, 6)), now)).toBe(
      'Llave del gas, verificado a las 21:43, vale hasta las 6.',
    );
  });

  it('says the full weekday when the end is 24 h or more away', () => {
    expect(checkAccessibilityLabel('Llave del gas', verified(at(13, 8, 30)), now)).toBe(
      'Llave del gas, verificado a las 21:43, vale hasta el viernes a las 8 y 30.',
    );
  });

  it('says «sin vencimiento»', () => {
    expect(checkAccessibilityLabel('Alarma puesta', verified(null), now)).toBe(
      'Alarma puesta, verificado a las 21:43, sin vencimiento.',
    );
  });

  it('says pending', () => {
    expect(checkAccessibilityLabel('Luces apagadas', { kind: 'pending' }, now)).toBe(
      'Luces apagadas, pendiente.',
    );
  });

  it('says pending and when it expired', () => {
    const status: CheckStatus = { kind: 'expiredToday', expiredAt: at(5, 13) };

    expect(checkAccessibilityLabel('Plancha desenchufada', status, now)).toBe(
      'Plancha desenchufada, pendiente, venció hoy a las 13.',
    );
  });
});
