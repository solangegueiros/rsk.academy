import NextLink from 'next/link'
import { Box, Heading, Image, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Seo, Layout } from '@components'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Courses = (): JSX.Element => {
  const { t } = useTranslation()
  const bg = useColorModeValue('white', 'dark.400')
  return (
    <Layout>
      <Seo title={t`courses`} description='' />
      <SimpleGrid mb={16} columns={{ md: 2 }} gap={8}>
        <NextLink href='/courses/dev/_/welcome' passHref>
          <Box _hover={{ boxShadow: 'lg' }} cursor='pointer' boxShadow='md' bg={bg} transition='box-shadow 0.3s'>
            <Image w='full' src='/img/developers.svg' alt='developer course' />
            <Box p={4}>
              <Heading textAlign='center'>{t`developer`}</Heading>
            </Box>
          </Box>
        </NextLink>
        <NextLink href='/courses/business/_/welcome' passHref>
          <Box _hover={{ boxShadow: 'lg' }} cursor='pointer' boxShadow='md' bg={bg} transition='box-shadow 0.3s'>
            <Image w='full' src='/img/business.svg' alt='business course' />
            <Box p={4}>
              <Heading textAlign='center'>{t`business`}</Heading>
            </Box>
          </Box>
        </NextLink>
      </SimpleGrid>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Courses
