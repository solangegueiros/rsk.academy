import {
  useColorMode,
  Switch,
  HStack,
  useBreakpointValue,
  Icon,
} from '@chakra-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'

export const DarkModeSwitch = props => {
  const { toggleColorMode, colorMode } = useColorMode()

  const isDark = colorMode === 'dark'

  return (
    <HStack align='center'>
      <Switch
        size={useBreakpointValue({ base: 'md', md: 'sm' })}
        onChange={toggleColorMode}
        {...props}
      />
      <Icon
        color={isDark ? 'yellow.400' : 'dark.400'}
        fontSize='sm'
        as={isDark ? FaSun : FaMoon}
      />
    </HStack>
  )
}

export default DarkModeSwitch
