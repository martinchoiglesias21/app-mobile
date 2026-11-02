import { Redirect, useLocalSearchParams } from 'expo-router';

import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { CheckRowList } from '@/features/checks/components/CheckRowList';
import { useListDetail } from '@/features/lists/hooks/useListDetail';

export default function ListDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const list = useListDetail(id);

  if (list === null) {
    return <Redirect href="/" />;
  }

  return (
    <Screen>
      <CheckRowList
        items={list.rows}
        now={list.now}
        onToggle={list.toggle}
        header={
          <ScreenHeader
            title={list.name}
            subtitle={list.subtitle}
            subtitleTone={list.subtitleTone}
          />
        }
      />
    </Screen>
  );
}
