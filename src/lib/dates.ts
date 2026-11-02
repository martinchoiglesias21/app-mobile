import { strings } from '@/i18n';

// Dates are stored as UTC instants and shown in the phone's local time.
const locale = 'es-AR';

/** «06:00», «21:43»: always 24 h with two digits, whatever the phone setting (D-19). */
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(date);
}

/** «vie», without the trailing dot some engines add («vie.»). */
export function formatWeekdayShort(date: Date): string {
  return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date).replace(/\.$/, '');
}

/** «viernes» */
export function formatWeekdayLong(date: Date): string {
  return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
}

/** The time as the screen reader says it: «medianoche», «la 1», «las 6 y 30», «mediodía». */
export function spokenTime(date: Date): string {
  const hour = date.getHours();
  const minutes = date.getMinutes();

  if (minutes === 0) {
    if (hour === 0) return strings.spokenTime.midnight;
    if (hour === 12) return strings.spokenTime.noon;
    return strings.spokenTime.hour(hour);
  }
  return strings.spokenTime.hourAndMinutes(hour, minutes);
}

/** Same calendar day in the phone's local time. */
export function isSameLocalDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** 00:00 of the same local day. */
export function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

const dayInMs = 24 * 60 * 60 * 1000;

/** True when `date` is 24 h or more after `now`: then the day is shown next to the time. */
export function isADayOrMoreAway(date: Date, now: Date): boolean {
  return date.getTime() - now.getTime() >= dayInMs;
}
