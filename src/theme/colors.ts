// Values from the design spec (Color page). pressed, scrim, onAccent and
// onDanger were added in phase 1 and are recorded in docs/decisiones.md.
export type ColorTokens = {
  /** Screen background. */
  ground: string;
  /** Panels, fields, tab bar. */
  surface: string;
  /** Main text, item names. */
  ink: string;
  /** Metadata, hints, supporting text. */
  inkSecondary: string;
  /** Pending check border, inactive icons. */
  inkTertiary: string;
  /** Dividers, field borders, validity bar track. */
  line: string;
  /** Verified and primary action. The only color with meaning. */
  accent: string;
  /** Selection, just-verified row, badges. */
  accentSoft: string;
  /** Text on accentSoft. */
  accentInk: string;
  /** Text and icons on a filled accent background. */
  onAccent: string;
  /** Real errors only: validation, system failures, delete. */
  danger: string;
  /** Error notice background. */
  dangerSoft: string;
  /** Text and icons on a filled danger background. */
  onDanger: string;
  /** Background of a touchable surface while pressed. */
  pressed: string;
  /** Veil behind sheets and dialogs. */
  scrim: string;
};

export const lightColors: ColorTokens = {
  ground: '#F3F4F0',
  surface: '#FFFFFF',
  ink: '#202622',
  inkSecondary: '#59615C',
  inkTertiary: '#6B736E',
  line: '#DDE1DB',
  accent: '#1F5C45',
  accentSoft: '#E1ECE5',
  accentInk: '#174634',
  onAccent: '#FFFFFF',
  danger: '#A2352B',
  dangerSoft: '#F7E4E1',
  onDanger: '#FFFFFF',
  pressed: '#E8EBE6',
  scrim: 'rgba(16, 22, 19, 0.36)',
};

export const darkColors: ColorTokens = {
  ground: '#121614',
  surface: '#1B201D',
  ink: '#E7ECE8',
  inkSecondary: '#A9B1AC',
  inkTertiary: '#8D9691',
  line: '#2B322E',
  accent: '#74C29C',
  accentSoft: '#1D3329',
  accentInk: '#A8DDC3',
  onAccent: '#121614',
  danger: '#E58A7E',
  dangerSoft: '#3A2220',
  onDanger: '#121614',
  pressed: '#232925',
  scrim: 'rgba(0, 0, 0, 0.55)',
};
