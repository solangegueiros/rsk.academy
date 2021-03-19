import { Box, Image } from '@chakra-ui/react'

export const MdxImage = props => {
  return (
    <Box pos='relative' overflowX='auto' maxW={{ base: '90vw', md: 'full' }}>
      <Image apply='mdx.img' maxW='none' my={2} {...props} />
    </Box>
  )
}
