import { useEffect, useState } from 'react';

const minuteInMs = 60_000;

/**
 * Current time, refreshed on every minute change: first at the next
 * hh:mm:00, then every 60 s. Aligned so a check that expires at 06:00 stops
 * showing as verified at 06:00, not up to a minute later.
 *
 * Reading `new Date()` during render does not work with the React Compiler:
 * it may reuse the value and freeze the time.
 */
export function useNow(): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    const untilNextMinute = minuteInMs - (Date.now() % minuteInMs);

    const timeout = setTimeout(() => {
      setNow(new Date());
      interval = setInterval(() => setNow(new Date()), minuteInMs);
    }, untilNextMinute);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return now;
}
