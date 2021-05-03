import { chakra, ChakraComponent, useColorModeValue } from '@chakra-ui/react'

export const MdxTable = (props: ChakraComponent<'table'>): JSX.Element => (
  <chakra.div overflowX='auto'>
    <chakra.table textAlign='left' mt='32px' width='full' {...props} />
  </chakra.div>
)

export const MdxTHead = (props: ChakraComponent<'th'>): JSX.Element => (
  <chakra.th bg={useColorModeValue('gray.50', 'whiteAlpha.100')} fontWeight='600' p={2} fontSize='sm' {...props} />
)

export const MdxTd = (props: ChakraComponent<'td'>): JSX.Element => (
  <chakra.td p={2} borderTopWidth='1px' borderColor='inherit' fontSize='sm' whiteSpace='normal' {...props} />
)
