import { Box, Image } from '@chakra-ui/react'

export const MdxImage = props => {
  return (
    <Box
      d='inline-flex'
      borderWidth={1}
      borderColor='gray.200'
      borderRadius='lg'
      overflow='hidden'
      my={6}
      boxShadow='lg'
    >
      <Image apply='mdx.img' maxW='full' {...props} />
    </Box>
  )
}
