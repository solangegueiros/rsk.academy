import { lighten, darken } from '@chakra-ui/theme-tools'

const generateColorPalette = color => ({
  50: lighten(color, 50)(),
  100: lighten(color, 40)(),
  200: lighten(color, 30)(),
  300: lighten(color, 15)(),
  400: lighten(color, 5)(),
  500: darken(color, 0)(),
  600: darken(color, 7)(),
  700: darken(color, 12)(),
  800: darken(color, 18)(),
  900: darken(color, 23)(),
})

const RSK_GREEN = '#2BA149' // From images
const RSK_BLUE = '#007BFF'
const RSK_DARK = '#344147'
const RSK_LIGHT = '#9FDFD1'

export const colors = {
  primary: generateColorPalette(RSK_GREEN),
  rif: generateColorPalette(RSK_BLUE),
  light: generateColorPalette(RSK_LIGHT),
  dark: generateColorPalette(RSK_DARK),
}
