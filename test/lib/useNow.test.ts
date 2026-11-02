import { act, renderHook } from '@testing-library/react-native';

import { useNow } from '@/lib/useNow';

describe('useNow', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 10, 5, 5, 59, 45));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('updates at the next minute change, not 60 s after mounting', async () => {
    const { result } = await renderHook(() => useNow());
    expect(result.current.getMinutes()).toBe(59);

    await act(() => jest.advanceTimersByTime(14_999));
    expect(result.current.getMinutes()).toBe(59);

    await act(() => jest.advanceTimersByTime(1));
    expect(result.current).toEqual(new Date(2026, 10, 5, 6, 0, 0));
  });

  it('then updates every 60 s', async () => {
    const { result } = await renderHook(() => useNow());

    await act(() => jest.advanceTimersByTime(15_000 + 60_000));

    expect(result.current).toEqual(new Date(2026, 10, 5, 6, 1, 0));
  });
});
