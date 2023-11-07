const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const primaryColor = '#FFBEAC';
const white = '#FFFFFF';
const slate600 = '#64748B';
const slate500 = '#64748B';

export default {
  light: {
    primary: primaryColor,
    text: '#000',
    background: '#fff',
    tint: white,
    tabIconDefault: white,
    tabIconSelected: white,
    tabBackgroundColor: primaryColor,
    slate600,
    slate500,
  },
  // light: {
  //   text: '#000',
  //   background: '#fff',
  //   tint: tintColorLight,
  //   tabIconDefault: '#ccc',
  //   tabIconSelected: tintColorLight,
  // },
  dark: {
    primary: white,
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    tabBackgroundColor: white,
  },
};
