const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const primaryColor = '#FFBEAC';
const complementGreen = '#3F826D';
const complementRed = '#BF211E';
const white = '#FFFFFF';
const slate600 = '#475569';
const slate500 = '#64748B';

export default {
  light: {
    primary: primaryColor,
    text: slate600,
    secondaryText: slate500,
    background: white,
    tint: primaryColor,
    tabIconDefault: white,
    tabIconSelected: primaryColor,
    tabBackgroundColor: primaryColor,
    slate600,
    slate500,
  },
  default: {
    primary: primaryColor,
    white,
    slate600,
    slate500,
    complementGreen,
    complementRed,
  },
  dark: {
    primary: primaryColor,
    text: white,
    background: slate600,
    secondaryBackground: slate500,
    tint: slate600,
    tabIconDefault: primaryColor,
    tabIconSelected: slate600,
    tabBackgroundColor: slate500,
    slate600,
    slate500,
  },
};
