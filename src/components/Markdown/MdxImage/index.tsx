import { Box, Image, ImageProps } from '@chakra-ui/react'

export const MdxImage = (props: ImageProps): JSX.Element => {
  return (
    <Box
      d='inline-flex'
      borderWidth={1}
      borderColor='dark.200'
      borderRadius='lg'
      overflow='hidden'
      my={6}
      boxShadow='lg'
    >
      <Image apply='mdx.img' maxW='full' {...props} />
    </Box>
  )
}
