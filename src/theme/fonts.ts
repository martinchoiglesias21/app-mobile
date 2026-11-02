import { fontFamily } from './typography';

type FontFamilyName = (typeof fontFamily)[keyof typeof fontFamily];

// Static files, one per weight (not the variable [wght] font). Source and
// license in docs/decisiones.md. Typed so a missing weight fails to compile.
export const fontAssets: Record<FontFamilyName, number> = {
  [fontFamily.regular]: require('@/assets/fonts/AtkinsonHyperlegibleNext-Regular.ttf'),
  [fontFamily.medium]: require('@/assets/fonts/AtkinsonHyperlegibleNext-Medium.ttf'),
  [fontFamily.semiBold]: require('@/assets/fonts/AtkinsonHyperlegibleNext-SemiBold.ttf'),
  [fontFamily.bold]: require('@/assets/fonts/AtkinsonHyperlegibleNext-Bold.ttf'),
};
