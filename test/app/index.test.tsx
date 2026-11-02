import { render, screen } from '@testing-library/react-native';

import Index from '@/app/index';
import { ThemeProvider } from '@/theme';

jest.mock('expo-router', () => ({ useRouter: () => ({ canGoBack: () => false }) }));

// Provisional: checks the Jest + Testing Library setup. Removed with the
// placeholder screen in step 10 of phase 1.
describe('Index', () => {
  it('renders the placeholder screen', async () => {
    await render(
      <ThemeProvider>
        <Index />
      </ThemeProvider>,
    );

    expect(screen.getByText('Tilde')).toBeOnTheScreen();
  });
});
