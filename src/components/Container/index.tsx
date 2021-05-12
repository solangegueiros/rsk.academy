import { Box, BoxProps } from '@chakra-ui/react'

export const Container = (props: BoxProps): JSX.Element => {
  return <Box w='full' mx='auto' px={{ base: '2', md: '6' }} maxW={1440} {...props} />
}
