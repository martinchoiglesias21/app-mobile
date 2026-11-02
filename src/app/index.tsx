import { Text, View } from 'react-native';

import { createStyles, maxFontSizeMultiplier, tabularNums } from '@/theme';

// Provisional: shows the font, its weights and tabular digits on the phone.
// Replaced by the redirect to lists/sample in step 10 of phase 1.
export default function Index() {
  const styles = useStyles();

  return (
    <View style={styles.screen}>
      <Text style={styles.title} maxFontSizeMultiplier={maxFontSizeMultiplier}>
        Tilde
      </Text>
      <Text style={styles.item} maxFontSizeMultiplier={maxFontSizeMultiplier}>
        Llave del gas
      </Text>
      <Text style={styles.label} maxFontSizeMultiplier={maxFontSizeMultiplier}>
        Verificado a las
      </Text>
      <Text style={styles.time} maxFontSizeMultiplier={maxFontSizeMultiplier}>
        21:43
      </Text>
      <Text style={styles.time} maxFontSizeMultiplier={maxFontSizeMultiplier}>
        11:11
      </Text>
      <Text style={styles.meta} maxFontSizeMultiplier={maxFontSizeMultiplier}>
        1 l I · 0 O
      </Text>
    </View>
  );
}

const useStyles = createStyles((theme) => ({
  screen: {
    flex: 1,
    justifyContent: 'center',
    gap: theme.spacing.xs,
    paddingHorizontal: theme.sizes.screenMargin,
  },
  title: { ...theme.typography.title, color: theme.colors.ink },
  item: { ...theme.typography.item, color: theme.colors.ink },
  label: { ...theme.typography.label, color: theme.colors.inkSecondary },
  time: { ...theme.typography.display, ...tabularNums, color: theme.colors.accent },
  meta: { ...theme.typography.meta, color: theme.colors.inkSecondary },
}));
