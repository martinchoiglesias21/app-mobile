// Moderate radii by hierarchy. The square checkbox (6) is selection and the
// circle (full) is verification: they are never swapped.
export const radius = {
  checkbox: 6,
  field: 12,
  button: 14,
  panel: 24,
  /** Only for the check, chips and switches. */
  full: 9999,
} as const;

export type RadiusTokens = typeof radius;
