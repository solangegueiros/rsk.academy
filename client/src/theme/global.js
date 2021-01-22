import { lighten, mode } from '@chakra-ui/theme-tools'

export const styles = {
  global: props => ({
    body: {
      fontFamily: 'body',
      color: mode(lighten('light.text'), 'dark.text')(props),
      bg: mode('light.bg', 'dark.bg')(props),
      fontWeight: 400,
    },
  }),
}
