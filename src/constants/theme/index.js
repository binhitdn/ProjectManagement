import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {COLORS} from '@constants/styles';
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.PRIMARY,
    background: COLORS.WHITE,
    card: COLORS.WHITE,
    text: COLORS.TEXT,
    border: COLORS.PRIMARY,
    notification: COLORS.PRIMARY,
  },
};
const DarkThemeCustom = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: COLORS.PRIMARY,
    background: COLORS.BLACK,
    card: COLORS.BLACK,
    text: COLORS.WHITE,
    border: COLORS.PRIMARY,
    notification: COLORS.PRIMARY,
  },
};
export {MyTheme, DarkThemeCustom};
