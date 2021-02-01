import { Box } from '@chakra-ui/react'

export const Container = props => (
  <Box w='full' mx='auto' maxW='75rem' px={{ base: '2', md: '6' }} {...props} />
)

export default Container
