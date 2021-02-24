import { Box, Heading } from '@chakra-ui/react'
import { useI18n } from 'next-localization'

import { Container, Layout, Seo } from '@/components/all'
import { useSelector } from 'react-redux'
import { useRLogin } from '@/hooks/useRLogin'

const Portfolio = () => {
  const { t } = useI18n()
  const profile = useSelector(state => state.profile)
  const { isAdmin, isLoggedIn } = useRLogin()

  return (
    <Layout>
      <Seo title={t('portfolio')} />
      <Heading>{t('portfolio')}</Heading>
      <Container>
        {isLoggedIn ? (
          isAdmin ? (
            <Box>Portfolio page is for students</Box>
          ) : (
            <Box my={4} p={4} boxShadow='md' as='pre'>
              <Heading>Profile</Heading>
              {JSON.stringify(profile, null, 2)}
            </Box>
          )
        ) : (
          <Box>You must log in</Box>
        )}
      </Container>
    </Layout>
  )
}

export default Portfolio
