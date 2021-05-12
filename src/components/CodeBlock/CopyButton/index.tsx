import { Button, useBreakpointValue, ButtonProps } from '@chakra-ui/react'

export const CopyButton = (props: ButtonProps): JSX.Element => (
  <Button
    size={useBreakpointValue({ base: 'sm', sm: 'xs' })}
    position='absolute'
    textTransform='uppercase'
    top={useBreakpointValue({ base: '-1rem', sm: 4 })}
    zIndex='1'
    right={useBreakpointValue({ base: 0, sm: 4 })}
    {...props}
  />
)
