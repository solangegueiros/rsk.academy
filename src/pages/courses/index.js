import NextLink from 'next/link'

import {
  Box,
  Heading,
  Image,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react'
import { useI18n } from 'next-localization'
import { useRouter } from 'next/router'

import { Seo, Layout } from '@/components/all'

const Courses = () => {
  const { t } = useI18n()
  const { locale } = useRouter()
  const bg = useColorModeValue('white', 'dark.400')
  return (
    <Layout>
      <Seo title={t('courses')} />
      <SimpleGrid my={16} columns={{ md: 2 }} gap={8}>
        <NextLink href={`/courses/dev/${locale}`} passHref>
          <Box
            _hover={{ boxShadow: 'lg' }}
            cursor='pointer'
            boxShadow='md'
            bg={bg}
            transition='box-shadow 0.3s'
          >
            <Image w='full' src='/img/developers.svg' alt='developer course' />
            <Box p={4}>
              <Heading textAlign='center'>{t('developer')}</Heading>
            </Box>
          </Box>
        </NextLink>
        <NextLink href={`/courses/business/${locale}`} passHref>
          <Box
            _hover={{ boxShadow: 'lg' }}
            cursor='pointer'
            boxShadow='md'
            bg={bg}
            transition='box-shadow 0.3s'
          >
            <Image w='full' src='/img/business.svg' alt='business course' />
            <Box p={4}>
              <Heading textAlign='center'>{t('business')}</Heading>
            </Box>
          </Box>
        </NextLink>
      </SimpleGrid>
    </Layout>
  )
}

export default Courses
