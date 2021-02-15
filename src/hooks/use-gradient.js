import { useColorModeValue } from '@chakra-ui/react'

export const useGradient = (dir, color1, color2, ...colors) => {
  const c1 = useColorModeValue('primary.50', 'whiteAlpha.50')
  const c2 = useColorModeValue('light.50', 'blackAlpha.100')
  const gradient = `linear(${dir || 'to-r'}, ${color1 || c1}, ${
    color2 || c2
  }, ${colors.join(', ')})`
  return gradient
}
