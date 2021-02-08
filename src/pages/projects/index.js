import { Heading } from '@chakra-ui/react'
import { useI18n } from 'next-localization'

import { Layout } from '@/components/index'
import AcademyWallet from '@/components/contracts/AcademyWallet'

const Projects = () => {
  const { t } = useI18n()
  return (
    <Layout>
      <Heading>{t('projects')}</Heading>
      <AcademyWallet />
    </Layout>
  )
}

export default Projects
