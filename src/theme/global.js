import { mode } from '@chakra-ui/theme-tools'

export const styles = {
  global: props => ({
    body: {
      fontFamily: 'body',
      color: mode('rsk.dark.500', 'rsk.dark.50')(props),
      bg: mode('rsk.dark.50', 'rsk.dark.500')(props),
      fontWeight: 400,
    },
    'h1, h2, h3, h4, a': {
      color: mode('rsk.green.500', 'rsk.light.500')(props),
    },
    a: {
      _hover: {
        color: mode('rsk.green.700', 'rsk.light.900')(props),
      },
    },
  }),
}
