import { useColorModeValue } from '@chakra-ui/react'

export const useGradient = (
  dir: string,
  color1?: [string, string],
  color2?: [string, string],
  ...colors: [string, string][]
): string => {
  const c1 = useColorModeValue((color1 && color1[0]) || 'white', (color1 && color1[1]) || 'whiteAlpha.50')
  const c2 = useColorModeValue((color2 && color2[0]) || 'gray.100', (color2 && color2[1]) || 'blackAlpha.100')

  const cs = colors.map(([ca, cb]) => useColorModeValue(ca, cb))

  const gradient = `linear(${dir || 'to-r'}, ${color1 || c1}, ${color2 || c2}, ${cs.join(', ')})`

  return gradient
}
