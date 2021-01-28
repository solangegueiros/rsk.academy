import { extendTheme } from '@chakra-ui/react'

import { styles } from './global'
import { colors } from './colors'
import { mdx } from './mdx'
const fonts = { body: `'Rubik', sans-serif`, mono: `'Consolas', monospace` }

const theme = extendTheme({
  styles,
  colors,
  fonts,
  shadows: {
    outline: 'none',
  },
  mdx,
})

export default theme
