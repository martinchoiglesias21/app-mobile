import { Platform } from 'react-native';

// Base-4 scale from the design spec.
export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

// Fixed measures from the design spec.
export const sizes = {
  screenMargin: 20,
  rowMinHeight: 72,
  /** Left strip of CheckRow that toggles the check. */
  checkZoneWidth: 64,
  checkSize: 32,
  /** Between the circle and the name: the name and the divider start at 20 + 32 + 14 = 66. */
  checkGap: 14,
  /** Border of the pending circle. */
  checkBorder: 2,
  /** Stroke of the check mark, in points. */
  checkStroke: 2.5,
  validityBarHeight: 3,
  /** Outlined buttons and field borders. */
  borderWidth: 1,
  /** Lucide icons: 24 pt, stroke 1.75. */
  icon: 24,
  iconStroke: 1.75,
  /** Inline icons, such as the camera next to the check time. */
  iconSmall: 18,
  buttonHeight: 52,
  /** Secondary text buttons such as «Ver historial». */
  buttonHeightCompact: 44,
  /** 44 × 44 on iOS, 48 × 48 on Android, even if the visible element is smaller. */
  minTouchTarget: Platform.select({ android: 48, default: 44 }),
} as const;

export type SpacingTokens = typeof spacing;
export type SizeTokens = typeof sizes;
