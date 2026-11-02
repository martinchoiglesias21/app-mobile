import { listProgress, toggleItem } from '@/features/lists/listDetail';
import type { ListItem } from '@/features/lists/lists.types';

const at = (day: number, hours: number, minutes = 0) => new Date(2026, 10, day, hours, minutes);
const now = at(5, 21, 52);

const verified = (id: string, checkedAt: Date): ListItem => ({
  id,
  name: id,
  check: { checkedAt, expiresAt: at(6, 6), hasPhoto: false },
});
const pending = (id: string): ListItem => ({ id, name: id, check: null });
const expired = (id: string): ListItem => ({
  id,
  name: id,
  check: { checkedAt: at(5, 8), expiresAt: at(5, 13), hasPhoto: false },
});

describe('toggleItem', () => {
  it('verifies a pending item until the next 06:00', () => {
    const [item] = toggleItem([pending('windows')], 'windows', now);

    expect(item.check).toEqual({ checkedAt: now, expiresAt: at(6, 6), hasPhoto: false });
  });

  it('verifies an expired item again', () => {
    const [item] = toggleItem([expired('iron')], 'iron', now);

    expect(item.check?.checkedAt).toEqual(now);
  });

  it('unchecks a verified item', () => {
    const [item] = toggleItem([verified('gas', at(5, 21, 43))], 'gas', now);

    expect(item.check).toBeNull();
  });

  it('keeps the order and the other items', () => {
    const items = [verified('gas', at(5, 21, 43)), pending('windows'), pending('door')];

    const result = toggleItem(items, 'windows', now);

    expect(result.map((item) => item.id)).toEqual(['gas', 'windows', 'door']);
    expect(result[0]).toBe(items[0]);
    expect(result[2]).toBe(items[2]);
  });
});

describe('listProgress', () => {
  it('counts only valid checks', () => {
    const items = [verified('gas', at(5, 21, 43)), pending('windows'), expired('iron')];

    expect(listProgress(items, now)).toEqual({ kind: 'partial', verified: 1, total: 3 });
  });

  it('says all verified with the last check time', () => {
    const items = [verified('gas', at(5, 21, 43)), verified('windows', at(5, 21, 52))];

    expect(listProgress(items, now)).toEqual({ kind: 'allVerified', lastCheckedAt: at(5, 21, 52) });
  });

  it('is partial for an empty list', () => {
    expect(listProgress([], now)).toEqual({ kind: 'partial', verified: 0, total: 0 });
  });
});
