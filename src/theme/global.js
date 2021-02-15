import { mode } from '@chakra-ui/theme-tools'

export const styles = {
  global: props => ({
    body: {
      fontFamily: 'body',
      color: mode('dark.500', 'gray.100')(props),
      bg: mode('gray.50', 'dark.500')(props),
      fontWeight: 400,
    },
    'h1, h2, h3, h4, a': {
      color: mode('primary.500', 'light.500')(props),
    },
    a: {
      _hover: {
        color: mode('primary.700', 'light.900')(props),
      },
    },
    '.rlogin-modal-container': {
      '.rlogin-modal-card': {
        bg: mode('white', 'dark.500')(props),
      },
      '.rlogin-modal-header': {
        bg: mode('white', 'dark.600')(props),
      },
      '.rlogin-provider-container': {
        bg: mode('blackAlpha.200', 'whiteAlpha.200'),
        _hover: {
          bg: mode('blackAlpha.300', 'whiteAlpha.30'),
        },
      },
      '.rlogin-header2, .rlogin-footer-text a': {
        color: mode('primary.500', 'light.500')(props),
        fontWeight: 'bold !important',
      },
    },
  }),
}
