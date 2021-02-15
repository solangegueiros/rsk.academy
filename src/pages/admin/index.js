import { Heading, SimpleGrid } from '@chakra-ui/react'
import { useI18n } from 'next-localization'

import { Layout, AcademyWalletAdmin } from '@/components/all'

const Admin = () => {
  const { t } = useI18n()
  return (
    <Layout>
      <Heading textAlign='center' my={8}>
        {t('admin')}
      </Heading>
      <SimpleGrid columns={{ md: 2 }}>
        <AcademyWalletAdmin />
      </SimpleGrid>
    </Layout>
  )
}

export default Admin
