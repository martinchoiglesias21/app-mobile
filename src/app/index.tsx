import { ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { createStyles, maxFontSizeMultiplier, tabularNums } from '@/theme';

const noop = () => {};

// Provisional: shows the font, its weights, tabular digits and the Button
// variants on the phone. Replaced by the redirect to lists/sample in step 10
// of phase 1.
export default function Index() {
  const styles = useStyles();

  return (
    <ScrollView contentContainerStyle={styles.screen}>
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

      <View style={styles.buttons}>
        <Button label="Verificar" onPress={noop} />
        <Button label="Desmarcar" variant="secondary" onPress={noop} />
        <Button label="Ver historial" variant="text" size="compact" onPress={noop} />
        <Button label="Eliminar ítem" variant="destructive" onPress={noop} />
        <Button label="Eliminar" variant="destructiveFilled" onPress={noop} />
        <Button label="Verificar" busy onPress={noop} />
        <Button label="Agregar ítem" variant="text" width="auto" onPress={noop} />
      </View>
    </ScrollView>
  );
}

const useStyles = createStyles((theme) => ({
  screen: {
    gap: theme.spacing.xs,
    paddingHorizontal: theme.sizes.screenMargin,
    paddingVertical: theme.spacing.xxxl,
  },
  title: { ...theme.typography.title, color: theme.colors.ink },
  item: { ...theme.typography.item, color: theme.colors.ink },
  label: { ...theme.typography.label, color: theme.colors.inkSecondary },
  time: { ...theme.typography.display, ...tabularNums, color: theme.colors.accent },
  meta: { ...theme.typography.meta, color: theme.colors.inkSecondary },
  buttons: {
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xl,
  },
}));
