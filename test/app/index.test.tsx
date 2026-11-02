import { render, screen } from '@testing-library/react-native';

import Index from '@/app/index';

// Provisional: checks the Jest + Testing Library setup. Removed with the
// placeholder screen in step 10 of phase 1.
describe('Index', () => {
  it('renders the placeholder screen', async () => {
    await render(<Index />);

    expect(screen.getByText('Tilde')).toBeOnTheScreen();
  });
});
