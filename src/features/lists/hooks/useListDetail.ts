import { useState } from 'react';

import { strings } from '@/i18n';
import { formatTime } from '@/lib/dates';
import { hapticUncheck, hapticVerify } from '@/lib/haptics';
import { useNow } from '@/lib/useNow';

import { checkStatus } from '../../checks/checkStatus';
import type { CheckStatus } from '../../checks/checks.types';
import { listProgress, toggleItem } from '../listDetail';
import { createSampleList, sampleListId } from '../sampleList';

export type ListDetailRow = { id: string; name: string; status: CheckStatus };

export type ListDetail = {
  name: string;
  subtitle: string;
  subtitleTone: 'secondary' | 'accent';
  rows: ListDetailRow[];
  now: Date;
  toggle: (itemId: string) => void;
};

/**
 * Detail of a list, in memory (phase 1). Returns null when the list does not
 * exist. Toggling saves first, then the row shows the new state and vibrates.
 */
export function useListDetail(listId: string): ListDetail | null {
  const [list, setList] = useState(() =>
    listId === sampleListId ? createSampleList(new Date()) : null,
  );
  const now = useNow();

  if (list === null) return null;

  const toggle = (itemId: string) => {
    const at = new Date();
    const item = list.items.find((candidate) => candidate.id === itemId);
    if (!item) return;
    const wasVerified = checkStatus(item.check, at).kind === 'verified';

    // Phase 1 saves in memory, which cannot fail. From phase 2 this awaits
    // the repository, and on failure the row stays as it was.
    setList({ ...list, items: toggleItem(list.items, itemId, at) });

    if (wasVerified) hapticUncheck();
    else hapticVerify();
  };

  const progress = listProgress(list.items, now);

  return {
    name: list.name,
    subtitle:
      progress.kind === 'allVerified'
        ? strings.listDetail.allVerified(formatTime(progress.lastCheckedAt))
        : strings.listDetail.progress(progress.verified, progress.total),
    subtitleTone: progress.kind === 'allVerified' ? 'accent' : 'secondary',
    rows: list.items.map((item) => ({
      id: item.id,
      name: item.name,
      status: checkStatus(item.check, now),
    })),
    now,
    toggle,
  };
}
