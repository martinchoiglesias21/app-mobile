/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  // Tests live in test/, mirroring src/, never next to the source file.
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  setupFilesAfterEnv: ['<rootDir>/test/helpers/setup.ts'],
  resolver: '<rootDir>/test/helpers/resolver.js',
  moduleNameMapper: {
    // Its "react-native" export is ESM (.mjs), which Jest cannot load; the
    // package also ships a CommonJS build.
    '^lucide-react-native$':
      '<rootDir>/node_modules/lucide-react-native/dist/cjs/lucide-react-native.js',
    '^@/assets/(.*)$': '<rootDir>/assets/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
