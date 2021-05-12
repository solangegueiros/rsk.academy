import { Box, BoxProps } from '@chakra-ui/react'

export const Container = (props: BoxProps): JSX.Element => (
  <Box w='full' mx='auto' maxW='75rem' px={{ base: '2', md: '6' }} {...props} />
)
