import { Heading } from '@chakra-ui/react'
import { useI18n } from 'next-localization'

import { Layout } from '@/components/index'

const Projects = () => {
  const { t } = useI18n()
  return (
    <Layout>
      <Heading>{t('projects')}</Heading>
    </Layout>
  )
}

export default Projects
