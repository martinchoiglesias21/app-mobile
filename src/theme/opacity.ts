// Added in phase 1 (docs/decisiones.md).
export const opacity = {
  /** Filled buttons (primary, destructiveFilled) while pressed. */
  pressed: 0.85,
  /** A button while saving: it shows the gerund and takes no more taps. */
  busy: 0.45,
} as const;

export type OpacityTokens = typeof opacity;
