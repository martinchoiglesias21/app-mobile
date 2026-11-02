// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier/flat');

module.exports = defineConfig([
  expoConfig,
  // Last, so it turns off the formatting rules that would clash with Prettier.
  prettierConfig,
  {
    ignores: ['dist/*', '.expo/*'],
  },
]);
