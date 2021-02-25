import { Button, useColorModeValue, useBreakpointValue } from '@chakra-ui/react'

export const CopyButton = props => (
  <Button
    size={useBreakpointValue({ base: 'sm', sm: 'xs' })}
    position='absolute'
    textTransform='uppercase'
    colorScheme={useColorModeValue('primary', 'light')}
    top={useBreakpointValue({ base: '-1rem', sm: 4 })}
    zIndex='1'
    right={useBreakpointValue({ base: 0, sm: 4 })}
    {...props}
  />
)
