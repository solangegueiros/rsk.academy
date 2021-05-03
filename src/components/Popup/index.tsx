import { Tooltip, TooltipProps, useColorModeValue } from '@chakra-ui/react'

export const Popup = (props: TooltipProps): JSX.Element => (
  <Tooltip
    hasArrow
    placement='top'
    bg={useColorModeValue('dark.50', 'light.500')}
    color={useColorModeValue('dark.500', 'dark.500')}
    {...props}
  />
)
