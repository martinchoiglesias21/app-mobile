/** End of «Hasta mañana», configurable between 00:00 and 12:00 (phase 5). */
export const defaultMorningEndHour = 6;

/**
 * «Hasta mañana»: the next `endHour`:00 strictly after `now`. At 02:00 it is
 * 06:00 of the same day; at 06:00 sharp, 06:00 of the next day.
 *
 * Phase 1 verifies always with this validity; phase 3 adds the other options.
 */
export function nextMorningEnd(now: Date, endHour = defaultMorningEndHour): Date {
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour);
  if (end.getTime() <= now.getTime()) {
    // setDate keeps the local hour across daylight saving changes.
    end.setDate(end.getDate() + 1);
  }
  return end;
}
