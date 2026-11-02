// Durations in milliseconds, from the design spec (Movimiento y vibración).
export const motion = {
  duration: {
    checkFill: 200,
    checkStroke: 240,
    uncheck: 160,
    sheetOpen: 280,
    scrimFade: 200,
    toastIn: 200,
    toastVisible: 5000,
    /** Soft green tint on a just-verified row. */
    rowHighlight: 1200,
    /** With reduce motion on, every animation becomes this fade. */
    reducedFade: 120,
    /** A second tap on the check within this window is ignored. */
    doubleTapGuard: 400,
  },
  easing: {
    /** «Salida suave»: cubic-bezier control points. */
    out: [0.16, 1, 0.3, 1] as const,
  },
} as const;

export type MotionTokens = typeof motion;
