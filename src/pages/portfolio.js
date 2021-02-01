import { Heading } from '@chakra-ui/react'
import { useI18n } from 'next-localization'

import { Layout, Seo } from '@/components/index'

const Portfolio = () => {
  const { t } = useI18n()
  return (
    <Layout>
      <Seo title={t('portfolio')} />
      <Heading>{t('portfolio')}</Heading>
    </Layout>
  )
}

export default Portfolio
