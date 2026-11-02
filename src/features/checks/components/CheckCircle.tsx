import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { createStyles, useTheme } from '@/theme';

const AnimatedPath = Animated.createAnimatedComponent(Path);

// Lucide «check» (24 × 24 viewBox), written left to right so the stroke draws
// the way a hand would.
const checkPath = 'M4 12l5 5L20 6';
const checkPathLength = 22.7;
const viewBoxSize = 24;

type CheckCircleProps = {
  checked: boolean;
};

/**
 * The circle means «verified» across the app. Fills in 200 ms and draws the
 * check in 240 ms; unchecking withdraws the fill in 160 ms. With reduce motion,
 * everything is a 120 ms fade. Animates only on change, never on mount.
 */
export function CheckCircle({ checked }: CheckCircleProps) {
  const styles = useStyles();
  const { colors, sizes, motion } = useTheme();
  const reduceMotion = useReducedMotion();
  const fill = useSharedValue(checked ? 1 : 0);
  const stroke = useSharedValue(checked ? 1 : 0);
  const previous = useRef(checked);

  useEffect(() => {
    if (previous.current === checked) return;
    previous.current = checked;

    const easing = Easing.bezier(...motion.easing.out);
    if (reduceMotion) {
      fill.set(withTiming(checked ? 1 : 0, { duration: motion.duration.reducedFade }));
      stroke.set(1);
    } else if (checked) {
      stroke.set(0);
      fill.set(withTiming(1, { duration: motion.duration.checkFill, easing }));
      stroke.set(withTiming(1, { duration: motion.duration.checkStroke, easing }));
    } else {
      fill.set(withTiming(0, { duration: motion.duration.uncheck, easing }));
    }
  }, [checked, reduceMotion, fill, stroke, motion]);

  const fillStyle = useAnimatedStyle(() => ({ opacity: fill.get() }));
  const strokeProps = useAnimatedProps(() => ({
    strokeDashoffset: checkPathLength * (1 - stroke.get()),
  }));

  return (
    <View style={styles.circle}>
      <Animated.View style={[styles.fill, fillStyle]}>
        <Svg
          width={sizes.iconSmall}
          height={sizes.iconSmall}
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        >
          <AnimatedPath
            d={checkPath}
            fill="none"
            stroke={colors.onAccent}
            strokeWidth={(sizes.checkStroke * viewBoxSize) / sizes.iconSmall}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={checkPathLength}
            animatedProps={strokeProps}
          />
        </Svg>
      </Animated.View>
    </View>
  );
}

const useStyles = createStyles((theme) => ({
  circle: {
    width: theme.sizes.checkSize,
    height: theme.sizes.checkSize,
    borderRadius: theme.radius.full,
    borderWidth: theme.sizes.checkBorder,
    borderColor: theme.colors.inkTertiary,
  },
  // Covers the pending ring, border included.
  fill: {
    position: 'absolute',
    top: -theme.sizes.checkBorder,
    left: -theme.sizes.checkBorder,
    width: theme.sizes.checkSize,
    height: theme.sizes.checkSize,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
