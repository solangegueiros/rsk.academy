import { TimeIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Heading,
  HStack,
  Icon,
  Tag,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import Link from 'next/link'

export const BlogPostCard = ({ post }) => {
  const readableDate = format(parseISO(post.date), 'MMMM dd, yyyy')
  const tagScheme = useColorModeValue('primary', 'light')

  return (
    <Link href={post.slug} passHref>
      <Box
        tabIndex={0}
        cursor='pointer'
        position='relative'
        borderRadius='md'
        alignItems='flex-start'
        p={6}
        bg={useColorModeValue('white', 'dark.600')}
        boxShadow='md'
      >
        <VStack align='flex-start'>
          <Heading as='h3' size='lg'>
            {post.title}
          </Heading>
          <HStack>
            <Avatar src={post.author.avatarUrl} />
            <Box>
              <Text>{post.author.name}</Text>
              <Text fontSize='xs'>{readableDate}</Text>
            </Box>
          </HStack>
          <HStack fontSize='sm' color='gray.500' pt='2'>
            <HStack>
              {post.tags?.map(t => (
                <Tag colorScheme={tagScheme} variant='outline' key={t}>
                  {t}
                </Tag>
              ))}
              <Icon as={TimeIcon} />
              <Text>{post.readTimeMinutes} mins</Text>
            </HStack>
          </HStack>
        </VStack>
      </Box>
    </Link>
  )
}
