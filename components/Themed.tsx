/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  useColorScheme,
  View as DefaultView,
} from 'react-native';

import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps &
  DefaultText['props'] & {
    weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  };
export type ViewProps = ThemeProps & DefaultView['props'];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  let fontFamily = Fonts.regular;
  const { weight } = props;
  switch (weight) {
    case 'light':
      fontFamily = Fonts.light;
      break;
    case 'medium':
      fontFamily = Fonts.medium;
      break;
    case 'semibold':
      fontFamily = Fonts.semibold;
      break;
    case 'bold':
      fontFamily = Fonts.bold;
      break;
    default:
      break;
  }
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color, fontFamily }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
