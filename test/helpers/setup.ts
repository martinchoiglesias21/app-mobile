// Runs before every test file (jest.config.js → setupFilesAfterEnv).

// Every screen uses Screen, which reads the safe area insets. The library's
// own mock returns zero insets unless a test wraps it in a SafeAreaProvider
// with initialMetrics.
jest.mock(
  'react-native-safe-area-context',
  () => jest.requireActual('react-native-safe-area-context/jest/mock').default,
);
