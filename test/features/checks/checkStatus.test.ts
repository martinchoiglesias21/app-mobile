import { checkStatus } from '@/features/checks/checkStatus';
import type { Check } from '@/features/checks/checks.types';

const at = (day: number, hours: number, minutes = 0) => new Date(2026, 10, day, hours, minutes);

const check = (expiresAt: Date | null): Check => ({
  checkedAt: at(5, 8),
  expiresAt,
  hasPhoto: false,
});

describe('checkStatus', () => {
  const now = at(5, 14);

  it('is pending without a check', () => {
    expect(checkStatus(null, now)).toEqual({ kind: 'pending' });
  });

  it('is verified while it has not expired', () => {
    expect(checkStatus(check(at(6, 6)), now)).toMatchObject({ kind: 'verified' });
  });

  it('is verified forever without an end', () => {
    expect(checkStatus(check(null), now)).toMatchObject({ kind: 'verified', expiresAt: null });
  });

  it('expires exactly at its end', () => {
    expect(checkStatus(check(at(5, 14)), now)).toEqual({
      kind: 'expiredToday',
      expiredAt: at(5, 14),
    });
  });

  it('says it expired today during that day', () => {
    expect(checkStatus(check(at(5, 13)), now)).toEqual({
      kind: 'expiredToday',
      expiredAt: at(5, 13),
    });
  });

  it('is plain pending once that day is over', () => {
    expect(checkStatus(check(at(4, 23, 59)), now)).toEqual({ kind: 'pending' });
  });
});
