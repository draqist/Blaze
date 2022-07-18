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
const Circle: ComponentStyleConfig = {
  baseStyle: {
    _hover: {
      bgColor: '#9696969d',
      color: 'white',
    },
  },
};
const Theme = extendTheme({
  theme,
  Circle,
  colors,
  config,
  fonts: {
    heading: `'Clash Display', 'Aktura', 'Poppins','Cabinet Grotesk' ,sans-serif`,
    body: `'Oswald', sans-serif`,
  },
});

export default Theme;
