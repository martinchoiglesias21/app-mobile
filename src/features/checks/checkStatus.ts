import { isSameLocalDay } from '@/lib/dates';

import type { Check, CheckStatus } from './checks.types';

/**
 * What a check means at `now`. Expiring needs no background work: it is
 * computed by comparing expiresAt with the current time. An expired check goes
 * back to pending silently and says when it expired, only during that day.
 */
export function checkStatus(check: Check | null, now: Date): CheckStatus {
  if (check === null) return { kind: 'pending' };

  const { expiresAt } = check;
  if (expiresAt === null || expiresAt.getTime() > now.getTime()) {
    return { kind: 'verified', ...check };
  }
  return isSameLocalDay(expiresAt, now)
    ? { kind: 'expiredToday', expiredAt: expiresAt }
    : { kind: 'pending' };
}
