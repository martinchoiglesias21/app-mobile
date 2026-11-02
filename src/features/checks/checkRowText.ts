import { strings } from '@/i18n';
import {
  formatTime,
  formatWeekdayLong,
  formatWeekdayShort,
  isADayOrMoreAway,
  spokenTime,
} from '@/lib/dates';

import type { CheckStatus } from './checks.types';

const text = strings.checkRow;

/** Line under the name: «Pendiente», «Verificado a las 21:43», «Venció hoy 13:00». */
export function checkMeta(status: CheckStatus): string {
  switch (status.kind) {
    case 'pending':
      return text.pending;
    case 'verified':
      return text.verifiedAt(formatTime(status.checkedAt));
    case 'expiredToday':
      return text.expiredToday(formatTime(status.expiredAt));
  }
}

/**
 * Right side of a verified row: always the absolute end. The day appears only
 * when the end is 24 h or more away: «hasta 06:00», «hasta vie 08:30».
 */
export function checkUntil(expiresAt: Date | null, now: Date): string {
  if (expiresAt === null) return text.noExpiry;
  const time = formatTime(expiresAt);
  return isADayOrMoreAway(expiresAt, now)
    ? text.untilDay(formatWeekdayShort(expiresAt), time)
    : text.until(time);
}

/** What the screen reader says for the circle. */
export function checkAccessibilityLabel(name: string, status: CheckStatus, now: Date): string {
  switch (status.kind) {
    case 'pending':
      return text.a11y.pending(name);
    case 'expiredToday':
      return text.a11y.expiredToday(name, spokenTime(status.expiredAt));
    case 'verified': {
      const time = formatTime(status.checkedAt);
      if (status.expiresAt === null) return text.a11y.verifiedNoExpiry(name, time);
      const until = isADayOrMoreAway(status.expiresAt, now)
        ? text.a11y.untilDay(formatWeekdayLong(status.expiresAt), spokenTime(status.expiresAt))
        : spokenTime(status.expiresAt);
      return text.a11y.verified(name, time, until);
    }
  }
}
