import { checkStatus } from '../checks/checkStatus';
import { nextMorningEnd } from '../checks/validity';
import type { ListItem } from './lists.types';

/**
 * Verifies a pending (or expired) item with the default validity, or unchecks
 * a verified one. The order never changes.
 */
export function toggleItem(items: ListItem[], itemId: string, now: Date): ListItem[] {
  return items.map((item) => {
    if (item.id !== itemId) return item;
    if (checkStatus(item.check, now).kind === 'verified') {
      return { ...item, check: null };
    }
    return {
      ...item,
      check: { checkedAt: now, expiresAt: nextMorningEnd(now), hasPhoto: false },
    };
  });
}

export type ListProgress =
  | { kind: 'partial'; verified: number; total: number }
  /** Every item has a valid check: «Todo verificado, último a las 21:52». */
  | { kind: 'allVerified'; lastCheckedAt: Date };

/** Counts only checks that are valid at `now`. */
export function listProgress(items: ListItem[], now: Date): ListProgress {
  const verifiedChecks = items.flatMap((item) => {
    const status = checkStatus(item.check, now);
    return status.kind === 'verified' ? [status] : [];
  });

  if (items.length > 0 && verifiedChecks.length === items.length) {
    const lastCheckedAt = Math.max(...verifiedChecks.map((check) => check.checkedAt.getTime()));
    return { kind: 'allVerified', lastCheckedAt: new Date(lastCheckedAt) };
  }
  return { kind: 'partial', verified: verifiedChecks.length, total: items.length };
}
