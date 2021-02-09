import { Heading, SimpleGrid } from '@chakra-ui/react'
import { useI18n } from 'next-localization'

import { Layout } from '@/components/index'
import AcademyWallet from '@/components/contracts/AcademyWallet'

const Projects = () => {
  const { t } = useI18n()
  return (
    <Layout>
      <Heading textAlign='center' my={8}>
        {t('projects')}
      </Heading>
      <SimpleGrid columns={{ md: 2 }}>
        <AcademyWallet />
      </SimpleGrid>
    </Layout>
  )
}

export default Projects
