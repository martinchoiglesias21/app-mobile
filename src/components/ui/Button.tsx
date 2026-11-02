import { Pressable, Text, View } from 'react-native';

import { strings } from '@/i18n';
import { createStyles, maxFontSizeMultiplier, useTheme } from '@/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'destructive' | 'destructiveFilled';

type ButtonProps = {
  label: string;
  onPress: () => void;
  /** One primary per screen. destructiveFilled is only for ConfirmDialog's confirm button. */
  variant?: ButtonVariant;
  /** compact (44) is for secondary text buttons such as «Ver historial». */
  size?: 'regular' | 'compact';
  /** full stretches to the container; auto fits the label and centers itself. */
  width?: 'full' | 'auto';
  /** While saving: shows the gerund and takes no more taps. Never used for validation. */
  busy?: boolean;
  busyLabel?: string;
  accessibilityHint?: string;
};

const filledVariants: ReadonlySet<ButtonVariant> = new Set(['primary', 'destructiveFilled']);

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'regular',
  width = 'full',
  busy = false,
  busyLabel = strings.button.saving,
  accessibilityHint,
}: ButtonProps) {
  const styles = useStyles();
  const { colors } = useTheme();
  const filled = filledVariants.has(variant);
  const variantStyle = {
    primary: styles.primary,
    secondary: styles.outlined,
    text: null,
    destructive: styles.outlined,
    destructiveFilled: styles.destructiveFilled,
  }[variant];
  const labelStyle = {
    primary: styles.primaryLabel,
    secondary: styles.secondaryLabel,
    text: styles.textLabel,
    destructive: styles.destructiveLabel,
    destructiveFilled: styles.destructiveFilledLabel,
  }[variant];

  return (
    // The wrapper clips the Android ripple to the button radius.
    <View style={[styles.clip, width === 'full' ? styles.fullWidth : styles.autoWidth]}>
      <Pressable
        onPress={onPress}
        disabled={busy}
        accessibilityRole="button"
        accessibilityState={{ busy, disabled: busy }}
        accessibilityHint={accessibilityHint}
        android_ripple={{ color: colors.pressed }}
        style={({ pressed }) => [
          styles.button,
          size === 'compact' ? styles.compact : styles.regular,
          variantStyle,
          pressed && (filled ? styles.pressedFilled : styles.pressedOutlined),
          busy && styles.busy,
        ]}
      >
        <Text style={[styles.label, labelStyle]} maxFontSizeMultiplier={maxFontSizeMultiplier}>
          {busy ? busyLabel : label}
        </Text>
      </Pressable>
    </View>
  );
}

const useStyles = createStyles((theme) => ({
  clip: {
    borderRadius: theme.radius.button,
    overflow: 'hidden',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  autoWidth: {
    alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.button,
    paddingVertical: theme.spacing.xs,
  },
  // minHeight, not height: with large system text the label wraps and the button grows.
  regular: {
    minHeight: theme.sizes.buttonHeight,
    paddingHorizontal: theme.spacing.xl,
  },
  compact: {
    minHeight: theme.sizes.buttonHeightCompact,
    paddingHorizontal: theme.spacing.md,
  },
  primary: {
    backgroundColor: theme.colors.accent,
  },
  outlined: {
    borderWidth: theme.sizes.borderWidth,
    borderColor: theme.colors.line,
  },
  destructiveFilled: {
    backgroundColor: theme.colors.danger,
  },
  pressedFilled: {
    opacity: theme.opacity.pressed,
  },
  pressedOutlined: {
    backgroundColor: theme.colors.pressed,
  },
  busy: {
    opacity: theme.opacity.busy,
  },
  label: {
    ...theme.typography.button,
    textAlign: 'center',
  },
  primaryLabel: { color: theme.colors.onAccent },
  secondaryLabel: { color: theme.colors.ink },
  textLabel: { color: theme.colors.accent },
  destructiveLabel: { color: theme.colors.danger },
  destructiveFilledLabel: { color: theme.colors.onDanger },
}));
