import type { ReactElement } from 'react';
import { FlatList } from 'react-native';

import { useScreenBottomInset } from '@/components/ui/Screen';

import type { CheckStatus } from '../checks.types';
import { CheckRow, CheckRowSeparator } from './CheckRow';

type CheckRowListItem = { id: string; name: string; status: CheckStatus };

type CheckRowListProps = {
  items: CheckRowListItem[];
  now: Date;
  onToggle: (itemId: string) => void;
  /** Scrolls with the rows, such as the ScreenHeader. */
  header?: ReactElement;
};

/** Virtualized list of CheckRows. Goes inside a non-scroll Screen. */
export function CheckRowList({ items, now, onToggle, header }: CheckRowListProps) {
  const bottomInset = useScreenBottomInset();

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CheckRow
          name={item.name}
          status={item.status}
          now={now}
          onToggle={() => onToggle(item.id)}
        />
      )}
      ItemSeparatorComponent={CheckRowSeparator}
      ListHeaderComponent={header}
      // Inset from the device, a runtime value.
      contentContainerStyle={{ paddingBottom: bottomInset }}
    />
  );
}
