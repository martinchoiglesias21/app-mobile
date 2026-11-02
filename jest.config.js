/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  // Tests live in test/, mirroring src/, never next to the source file.
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  moduleNameMapper: {
    '^@/assets/(.*)$': '<rootDir>/assets/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
