import type { Check } from '../checks/checks.types';

export type ListItem = {
  id: string;
  name: string;
  /** The current check, or null if it was never verified or was unchecked. */
  check: Check | null;
};

export type List = {
  id: string;
  name: string;
  /** In the order the person chose. Never reordered by marking. */
  items: ListItem[];
};
