import { darkColors, lightColors, type ColorTokens } from '@/theme';

import { contrastRatio } from '../helpers/contrast';

type Pair = [foreground: keyof ColorTokens, background: keyof ColorTokens];

const backgrounds: (keyof ColorTokens)[] = ['ground', 'surface', 'pressed', 'accentSoft'];

// Text: at least 4.5:1 in both themes, including 14 px metadata.
const textPairs: Pair[] = [
  ...(['ink', 'inkSecondary', 'accent', 'danger'] as const).flatMap((fg) =>
    backgrounds.map((bg): Pair => [fg, bg]),
  ),
  ['accentInk', 'accentSoft'],
  ['danger', 'dangerSoft'],
  ['onAccent', 'accent'],
  ['onDanger', 'danger'],
];

// Non-text UI (pending check border, inactive icons): at least 3:1.
const uiPairs: Pair[] = [
  ['inkTertiary', 'ground'],
  ['inkTertiary', 'surface'],
  ['inkTertiary', 'pressed'],
  ['inkTertiary', 'accentSoft'],
];

describe.each([
  ['light', lightColors],
  ['dark', darkColors],
])('%s colors', (_mode, colors) => {
  it.each(textPairs)('%s on %s reaches 4.5:1', (fg, bg) => {
    expect(contrastRatio(colors[fg], colors[bg])).toBeGreaterThanOrEqual(4.5);
  });

  it.each(uiPairs)('%s on %s reaches 3:1', (fg, bg) => {
    expect(contrastRatio(colors[fg], colors[bg])).toBeGreaterThanOrEqual(3);
  });
});
