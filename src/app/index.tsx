import { Redirect } from 'expo-router';

import { sampleListId } from '@/features/lists/sampleList';

// Provisional (phase 1): opens the sample list. Replaced by the tabs and the
// Inicio screen in phase 2.
export default function Index() {
  return <Redirect href={{ pathname: '/lists/[id]', params: { id: sampleListId } }} />;
}
