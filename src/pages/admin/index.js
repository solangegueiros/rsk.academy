import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import { useI18n } from 'next-localization'

import { Layout, AcademyWalletAdmin } from '@/components/all'
import { useRLogin } from '@/hooks/useRLogin'

const Admin = () => {
  const { t } = useI18n()
  const { isAdmin, isLoggedIn } = useRLogin()

  return (
    <Layout>
      <Heading textAlign='center' my={8}>
        {t('admin')}
      </Heading>
      {isLoggedIn ? (
        isAdmin ? (
          <SimpleGrid columns={{ md: 2 }}>
            <AcademyWalletAdmin />
          </SimpleGrid>
        ) : (
          <Box>You are not an admin</Box>
        )
      ) : (
        <Box>Login with admin account</Box>
      )}
    </Layout>
  )
}

export default Admin
