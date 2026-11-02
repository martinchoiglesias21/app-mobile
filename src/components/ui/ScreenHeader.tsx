import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { strings } from '@/i18n';
import { createStyles, maxFontSizeMultiplier, useTheme } from '@/theme';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  /** accent is for «Todo verificado, último a las 21:52». */
  subtitleTone?: 'secondary' | 'accent';
  /** Name of the screen it goes back to. Shown only when there is one. */
  backLabel?: string;
};

export function ScreenHeader({
  title,
  subtitle,
  subtitleTone = 'secondary',
  backLabel = strings.screenHeader.back,
}: ScreenHeaderProps) {
  const styles = useStyles();
  const { colors, sizes } = useTheme();
  const router = useRouter();

  return (
    <View style={styles.header}>
      {router.canGoBack() && (
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel={backLabel}
          android_ripple={{ color: colors.pressed }}
          style={({ pressed }) => [styles.back, pressed && styles.backPressed]}
        >
          <ChevronLeft color={colors.accent} size={sizes.icon} strokeWidth={sizes.iconStroke} />
          <Text style={styles.backLabel} maxFontSizeMultiplier={maxFontSizeMultiplier}>
            {backLabel}
          </Text>
        </Pressable>
      )}
      <Text
        style={styles.title}
        accessibilityRole="header"
        maxFontSizeMultiplier={maxFontSizeMultiplier}
      >
        {title}
      </Text>
      {subtitle !== undefined && (
        <Text
          style={subtitleTone === 'accent' ? styles.subtitleAccent : styles.subtitle}
          maxFontSizeMultiplier={maxFontSizeMultiplier}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}

const useStyles = createStyles((theme) => ({
  header: {
    paddingHorizontal: theme.sizes.screenMargin,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: theme.spacing.xxs,
    minHeight: theme.sizes.minTouchTarget,
    // Pulled left so the chevron lines up with the screen margin while the
    // pressed background still has room around it.
    marginLeft: -theme.spacing.xs,
    paddingHorizontal: theme.spacing.xs,
    borderRadius: theme.radius.button,
    overflow: 'hidden',
  },
  backPressed: {
    backgroundColor: theme.colors.pressed,
  },
  backLabel: {
    ...theme.typography.button,
    color: theme.colors.accent,
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.ink,
    marginTop: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.subtitle,
    color: theme.colors.inkSecondary,
    marginTop: theme.spacing.xxs,
  },
  subtitleAccent: {
    ...theme.typography.label,
    color: theme.colors.accent,
    marginTop: theme.spacing.xxs,
  },
}));
