import { StyleSheet, useColorScheme } from 'react-native';
import Colors from '../constants/Colors';

export type ThemeUtilProps = {
  themeTextStyle: { color: string };
  themeBackgroundStyle: { backgroundColor: string };
  themeSecondaryBackgroundStyle: { backgroundColor: string };
};

export function ThemeUtils(): ThemeUtilProps {
  const colorScheme = useColorScheme();

  const themeTextStyle =
    colorScheme === 'light' ? styles.lightColor : styles.darkColor;

  const themeBackgroundStyle =
    colorScheme === 'light' ? styles.lightBackground : styles.darkBackground;

  const themeSecondaryBackgroundStyle =
    colorScheme === 'light'
      ? styles.lightBackground
      : styles.secondaryDarkBackground;

  return {
    themeTextStyle,
    themeBackgroundStyle,
    themeSecondaryBackgroundStyle,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightBackground: {
    backgroundColor: Colors.light.background,
  },
  darkBackground: {
    backgroundColor: Colors.dark.background,
  },
  secondaryDarkBackground: {
    backgroundColor: Colors.dark.secondaryBackground,
  },
  lightColor: {
    color: Colors.light.text,
  },
  secondaryLightColor: {
    color: Colors.light.secondaryText,
  },
  darkColor: {
    color: Colors.dark.text,
  },
});
