import { darkColors, lightColors, type ColorTokens } from './colors';
import { motion, type MotionTokens } from './motion';
import { radius, type RadiusTokens } from './radius';
import { sizes, spacing, type SizeTokens, type SpacingTokens } from './spacing';
import { typography, type TypographyTokens } from './typography';

export type ThemeMode = 'light' | 'dark';

export type Theme = {
  mode: ThemeMode;
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  sizes: SizeTokens;
  radius: RadiusTokens;
  motion: MotionTokens;
};

const shared = { typography, spacing, sizes, radius, motion };

export const lightTheme: Theme = { mode: 'light', colors: lightColors, ...shared };
export const darkTheme: Theme = { mode: 'dark', colors: darkColors, ...shared };

export const themes: Record<ThemeMode, Theme> = { light: lightTheme, dark: darkTheme };
