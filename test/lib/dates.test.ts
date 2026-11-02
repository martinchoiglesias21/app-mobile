import {
  formatTime,
  formatWeekdayLong,
  formatWeekdayShort,
  isADayOrMoreAway,
  spokenTime,
} from '@/lib/dates';

// Local dates, so results do not depend on the machine's time zone.
const at = (hours: number, minutes: number, day = 6) => new Date(2026, 10, day, hours, minutes);

describe('formatTime', () => {
  it.each([
    [at(6, 0), '06:00'],
    [at(21, 43), '21:43'],
    [at(0, 5), '00:05'],
    [at(12, 30), '12:30'],
  ])('formats %p as %s, 24 h with two digits', (date, expected) => {
    expect(formatTime(date)).toBe(expected);
  });
});

describe('formatWeekdayShort', () => {
  it('returns the short weekday', () => {
    // 6 Nov 2026 is a Friday.
    expect(formatWeekdayShort(at(8, 30))).toBe('vie');
  });

  it('drops the trailing dot some engines add', () => {
    const spy = jest
      .spyOn(Intl, 'DateTimeFormat')
      .mockImplementation(() => ({ format: () => 'vie.' }) as unknown as Intl.DateTimeFormat);

    expect(formatWeekdayShort(at(8, 30))).toBe('vie');

    spy.mockRestore();
  });
});

describe('formatWeekdayLong', () => {
  it('returns the full weekday', () => {
    expect(formatWeekdayLong(at(8, 30))).toBe('viernes');
  });
});

describe('spokenTime', () => {
  it.each([
    [0, 0, 'medianoche'],
    [0, 30, 'las 0 y 30'],
    [1, 0, 'la 1'],
    [1, 30, 'la 1 y 30'],
    [6, 0, 'las 6'],
    [6, 5, 'las 6 y 5'],
    [6, 30, 'las 6 y 30'],
    [12, 0, 'mediodía'],
    [12, 30, 'las 12 y 30'],
    [13, 0, 'las 13'],
  ])('says %i:%i as «%s»', (hours, minutes, expected) => {
    expect(spokenTime(at(hours, minutes))).toBe(expected);
  });
});

describe('isADayOrMoreAway', () => {
  const now = at(21, 43);

  it('is false for tomorrow at 06:00', () => {
    expect(isADayOrMoreAway(at(6, 0, 7), now)).toBe(false);
  });

  it('is true from exactly 24 h', () => {
    expect(isADayOrMoreAway(at(21, 43, 7), now)).toBe(true);
  });
});
