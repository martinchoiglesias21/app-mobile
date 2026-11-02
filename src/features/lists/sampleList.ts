import { startOfLocalDay } from '@/lib/dates';

import { nextMorningEnd } from '../checks/validity';
import type { List } from './lists.types';

// Phase 1 only: in-memory sample data, replaced by SQLite in phase 2. Names
// are the person's content, not interface text, so they do not live in i18n.

export const sampleListId = 'sample';

const minutesAgo = (now: Date, minutes: number) => new Date(now.getTime() - minutes * 60_000);

/** «Salir de casa», with times relative to `now` so every state makes sense at any hour. */
export function createSampleList(now: Date): List {
  // Expired an hour ago, but always today (at 00:30 it expired at 00:00).
  const expiredAt = new Date(
    Math.max(minutesAgo(now, 60).getTime(), startOfLocalDay(now).getTime()),
  );
  const gasCheckedAt = minutesAgo(now, 9);
  const doorCheckedAt = minutesAgo(now, 8);

  return {
    id: sampleListId,
    name: 'Salir de casa',
    items: [
      {
        id: 'gas',
        name: 'Llave del gas',
        check: {
          checkedAt: gasCheckedAt,
          expiresAt: nextMorningEnd(gasCheckedAt),
          hasPhoto: false,
        },
      },
      {
        id: 'door',
        name: 'Puerta con llave',
        check: {
          checkedAt: doorCheckedAt,
          expiresAt: nextMorningEnd(doorCheckedAt),
          hasPhoto: true,
        },
      },
      { id: 'windows', name: 'Ventanas cerradas', check: null },
      {
        id: 'iron',
        name: 'Plancha desenchufada',
        check: { checkedAt: minutesAgo(expiredAt, 60), expiresAt: expiredAt, hasPhoto: false },
      },
      {
        id: 'alarm',
        name: 'Alarma puesta',
        check: { checkedAt: minutesAgo(now, 120), expiresAt: null, hasPhoto: false },
      },
    ],
  };
}
