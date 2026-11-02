import { nextMorningEnd } from '@/features/checks/validity';

const at = (day: number, hours: number, minutes = 0) => new Date(2026, 10, day, hours, minutes);

describe('nextMorningEnd', () => {
  it.each([
    ['00:00', at(5, 0), at(5, 6)],
    ['02:00', at(5, 2), at(5, 6)],
    ['05:59', at(5, 5, 59), at(5, 6)],
    ['06:00 sharp', at(5, 6), at(6, 6)],
    ['21:43', at(5, 21, 43), at(6, 6)],
  ])('at %s ends at the next 06:00', (_label, now, expected) => {
    expect(nextMorningEnd(now)).toEqual(expected);
  });

  it('crosses the end of the month', () => {
    expect(nextMorningEnd(new Date(2026, 10, 30, 22, 0))).toEqual(new Date(2026, 11, 1, 6, 0));
  });

  it('uses a configured end hour', () => {
    expect(nextMorningEnd(at(5, 9), 10)).toEqual(at(5, 10));
  });
});
