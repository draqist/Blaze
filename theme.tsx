import {
  ComponentStyleConfig,
  extendTheme,
  theme,
  type ThemeConfig,
} from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {};

const config: ThemeConfig = {
  initialColorMode: 'dark',
};
const Button: ComponentStyleConfig = {
  baseStyle: {
    outline: '0',
  },
};
const Theme = extendTheme({
  theme,
  Button,
  colors,
  config,
  fonts: {
    heading: `'Clash Display', 'Aktura', 'Poppins','Cabinet Grotesk' ,sans-serif`,
    body: `'Oswald', sans-serif`,
  },
});

export default Theme;
