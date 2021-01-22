import { useColorMode, IconButton, useColorModeValue } from '@chakra-ui/react'
import { FiSun, FiMoon } from 'react-icons/fi'

const DarkModeSwitch = () => {
  const { toggleColorMode } = useColorMode()
  const ColorModeIcon = useColorModeValue(FiSun, FiMoon)

  return (
    <IconButton
      isRound
      color='gray.400'
      borderColor='gray.400'
      borderWidth='1px'
      icon={<ColorModeIcon />}
      onClick={toggleColorMode}
    />
  )
}

export default DarkModeSwitch
