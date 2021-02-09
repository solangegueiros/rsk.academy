import { extendTheme } from '@chakra-ui/react'

import { styles } from './global'
import { colors } from './colors'
import { components } from './components'
import { mdx } from './mdx'
const fonts = { body: `'Rubik', sans-serif`, mono: `'Consolas', monospace` }

const theme = extendTheme({
  styles,
  colors,
  fonts,
  components,
  shadows: {
    outline: 'none',
  },
  mdx,
})

export default theme
