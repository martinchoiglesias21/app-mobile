import * as Haptics from 'expo-haptics';

// Called after the check is saved, never before. The single place to honor
// the «Vibración al marcar» setting when it arrives (phase 5).

/** Verify: light impact. Firm and brief. */
export function hapticVerify(): void {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

/** Uncheck: selection, the softest. */
export function hapticUncheck(): void {
  Haptics.selectionAsync();
}
