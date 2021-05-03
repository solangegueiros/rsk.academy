import { lighten, darken } from '@chakra-ui/theme-tools'
import { Theme, DeepPartial, Colors } from '@chakra-ui/react'

const generateColorPalette = (color: string, theme: Theme): DeepPartial<Colors> => ({
  50: lighten(color, 50)(theme),
  100: lighten(color, 40)(theme),
  200: lighten(color, 30)(theme),
  300: lighten(color, 15)(theme),
  400: lighten(color, 5)(theme),
  500: darken(color, 0)(theme),
  600: darken(color, 7)(theme),
  700: darken(color, 12)(theme),
  800: darken(color, 18)(theme),
  900: darken(color, 23)(theme),
})

const RSK_GREEN = '#2BA149' // From images
const RSK_BLUE = '#007BFF'
const RSK_DARK = '#344147'
const RSK_LIGHT = '#9FDFD1'

export const colors = (theme: Theme): Record<string, DeepPartial<Colors>> => ({
  primary: generateColorPalette(RSK_GREEN, theme),
  rif: generateColorPalette(RSK_BLUE, theme),
  light: generateColorPalette(RSK_LIGHT, theme),
  dark: generateColorPalette(RSK_DARK, theme),
})
