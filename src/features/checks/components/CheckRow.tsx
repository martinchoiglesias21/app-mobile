import { Camera } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { createStyles, maxFontSizeMultiplier, tabularNums, useTheme } from '@/theme';

import { checkAccessibilityLabel, checkMeta, checkUntil } from '../checkRowText';
import type { CheckStatus } from '../checks.types';
import { CheckCircle } from './CheckCircle';

type CheckRowProps = {
  name: string;
  /** Already computed by the caller. The row changes only when this changes. */
  status: CheckStatus;
  /** Reference time for «hasta 06:00» vs «hasta vie 08:30». */
  now: Date;
  /** Saves first; the parent passes the new status once it is stored. */
  onToggle: () => void;
};

/**
 * Item row. The left strip (64 wide, full height) toggles the check. In phase 1
 * the rest of the row is not touchable; it opens the detail from phase 3.
 */
export function CheckRow({ name, status, now, onToggle }: CheckRowProps) {
  const styles = useStyles();
  const { colors, sizes, motion } = useTheme();
  const reduceMotion = useReducedMotion();
  const [pressed, setPressed] = useState(false);
  const lastToggleAt = useRef(Number.NEGATIVE_INFINITY);
  const verified = status.kind === 'verified';

  // Soft green tint for 1.2 s right after verifying.
  const highlight = useSharedValue(0);
  const wasVerified = useRef(verified);
  useEffect(() => {
    if (verified && !wasVerified.current) {
      const fade = reduceMotion ? motion.duration.reducedFade : motion.duration.highlightFade;
      highlight.set(
        withSequence(
          withTiming(1, { duration: 0 }),
          withDelay(motion.duration.rowHighlight, withTiming(0, { duration: fade })),
        ),
      );
    } else if (!verified) {
      highlight.set(0);
    }
    wasVerified.current = verified;
  }, [verified, reduceMotion, highlight, motion]);
  const highlightStyle = useAnimatedStyle(() => ({ opacity: highlight.get() }));

  const handleToggle = () => {
    const now = Date.now();
    // A quick second tap is ignored, so a double tap never undoes the first.
    if (now - lastToggleAt.current < motion.duration.doubleTapGuard) return;
    lastToggleAt.current = now;
    onToggle();
  };

  return (
    <View style={[styles.row, pressed && styles.rowPressed]}>
      <Animated.View style={[styles.highlight, highlightStyle]} pointerEvents="none" />

      <Pressable
        onPress={handleToggle}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: verified }}
        accessibilityLabel={checkAccessibilityLabel(name, status, now)}
        android_ripple={{ color: colors.pressed }}
        style={styles.checkZone}
      >
        <CheckCircle checked={verified} />
      </Pressable>

      {/* The circle's label already says all of this to the screen reader. */}
      <View
        style={styles.content}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        <View style={styles.texts}>
          <Text style={styles.name} maxFontSizeMultiplier={maxFontSizeMultiplier}>
            {name}
          </Text>
          <View style={styles.metaLine}>
            <Text
              style={verified ? styles.metaVerified : styles.meta}
              maxFontSizeMultiplier={maxFontSizeMultiplier}
            >
              {checkMeta(status)}
            </Text>
            {status.kind === 'verified' && status.hasPhoto && (
              <Camera color={colors.accent} size={sizes.iconSmall} strokeWidth={sizes.iconStroke} />
            )}
          </View>
        </View>
        {status.kind === 'verified' && (
          <Text style={styles.until} maxFontSizeMultiplier={maxFontSizeMultiplier}>
            {checkUntil(status.expiresAt, now)}
          </Text>
        )}
      </View>
    </View>
  );
}

/** Divider between rows, starting where the name starts. For FlatList's ItemSeparatorComponent. */
export function CheckRowSeparator() {
  const styles = useStyles();
  return <View style={styles.separator} />;
}

const useStyles = createStyles((theme) => {
  const nameStart = theme.sizes.screenMargin + theme.sizes.checkSize + theme.sizes.checkGap;

  return {
    row: {
      flexDirection: 'row',
      minHeight: theme.sizes.rowMinHeight,
    },
    rowPressed: {
      backgroundColor: theme.colors.pressed,
    },
    highlight: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: theme.colors.accentSoft,
    },
    checkZone: {
      width: theme.sizes.checkZoneWidth,
      justifyContent: 'center',
      paddingLeft: theme.sizes.screenMargin,
    },
    content: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.md,
      marginLeft: nameStart - theme.sizes.checkZoneWidth,
      paddingVertical: theme.spacing.sm,
      paddingRight: theme.sizes.screenMargin,
    },
    texts: {
      flex: 1,
    },
    name: {
      ...theme.typography.item,
      color: theme.colors.ink,
    },
    metaLine: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    meta: {
      ...theme.typography.meta,
      ...tabularNums,
      color: theme.colors.inkSecondary,
    },
    metaVerified: {
      ...theme.typography.metaStrong,
      ...tabularNums,
      color: theme.colors.accent,
    },
    until: {
      ...theme.typography.meta,
      ...tabularNums,
      color: theme.colors.inkSecondary,
    },
    separator: {
      height: theme.sizes.borderWidth,
      marginLeft: nameStart,
      backgroundColor: theme.colors.line,
    },
  };
});
