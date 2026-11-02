// Jest resolver (jest.config.js → resolver). Chains the two that the project
// needs, since Jest accepts only one:
// 1. Reanimated's (includes Worklets'): loads their web files instead of the
//    .native ones, which need the phone.
// 2. React Native's, set by jest-expo: lets tests reach react-native subpaths.
const reactNativeResolver = require('@react-native/jest-preset/jest/resolver');
const reanimatedResolver = require('react-native-reanimated/jest/resolver');

/** @type {import('jest-resolve').SyncResolver} */
module.exports = (request, options) =>
  reanimatedResolver(request, {
    ...options,
    defaultResolver: (path, nextOptions) =>
      reactNativeResolver(path, { ...nextOptions, defaultResolver: options.defaultResolver }),
  });
