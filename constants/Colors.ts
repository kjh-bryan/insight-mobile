const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const primaryColor = '#FFBEAC';
const white = '#FFFFFF';

export default {
  light: {
    primary: primaryColor,
    text: '#000',
    background: '#fff',
    tint: white,
    tabIconDefault: '#E4E4E4',
    tabIconSelected: white,
    tabBackgroundColor: primaryColor,
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
