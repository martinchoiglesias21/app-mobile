import type { TextStyle } from 'react-native';

// One font file per weight: on Android a custom font does not pick its file
// from fontWeight, so the weight lives in the family name. The font loader in
// the root layout registers these same names.
export const fontFamily = {
  regular: 'AtkinsonHyperlegibleNext-Regular',
  medium: 'AtkinsonHyperlegibleNext-Medium',
  semiBold: 'AtkinsonHyperlegibleNext-SemiBold',
  bold: 'AtkinsonHyperlegibleNext-Bold',
} as const;

type TypeToken = Required<Pick<TextStyle, 'fontFamily' | 'fontSize' | 'lineHeight'>>;

export type TypographyTokens = {
  /** 44/48, 700. Receipt time. Only use. */
  display: TypeToken;
  /** 32/38, 700. Screen title. */
  title: TypeToken;
  /** 26/32, 700. Item name in the receipt, next to the 48 check. */
  headline: TypeToken;
  /** 22/28, 700. Sheet and dialog titles. */
  heading: TypeToken;
  /** 17/22, 500. Item and list names in rows. */
  item: TypeToken;
  /** 17/24, 400. Paragraphs, options, fields. */
  body: TypeToken;
  /** 17/22, 600. Button labels (added in phase 1). */
  button: TypeToken;
  /** 15/20, 400. Screen subtitle, such as «2 de 4 verificados» (added in phase 1). */
  subtitle: TypeToken;
  /** 15/20, 600. Field labels. */
  label: TypeToken;
  /** 14/19, 400. Row metadata, hints, field errors. */
  meta: TypeToken;
  /** 14/19, 600. Emphasized metadata: «Verificado a las 21:43» (added in phase 1). */
  metaStrong: TypeToken;
  /** 12/16, 600. Tab bar labels and badges. Absolute minimum. */
  caption: TypeToken;
};

export const typography: TypographyTokens = {
  display: { fontFamily: fontFamily.bold, fontSize: 44, lineHeight: 48 },
  title: { fontFamily: fontFamily.bold, fontSize: 32, lineHeight: 38 },
  headline: { fontFamily: fontFamily.bold, fontSize: 26, lineHeight: 32 },
  heading: { fontFamily: fontFamily.bold, fontSize: 22, lineHeight: 28 },
  item: { fontFamily: fontFamily.medium, fontSize: 17, lineHeight: 22 },
  body: { fontFamily: fontFamily.regular, fontSize: 17, lineHeight: 24 },
  button: { fontFamily: fontFamily.semiBold, fontSize: 17, lineHeight: 22 },
  subtitle: { fontFamily: fontFamily.regular, fontSize: 15, lineHeight: 20 },
  label: { fontFamily: fontFamily.semiBold, fontSize: 15, lineHeight: 20 },
  meta: { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 19 },
  metaStrong: { fontFamily: fontFamily.semiBold, fontSize: 14, lineHeight: 19 },
  caption: { fontFamily: fontFamily.semiBold, fontSize: 12, lineHeight: 16 },
};

/** Added to any text that shows a time, so digits line up and do not shift. */
export const tabularNums: TextStyle = { fontVariant: ['tabular-nums'] };

/** System text size is honored up to 200 %. */
export const maxFontSizeMultiplier = 2;
