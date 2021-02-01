import { useI18n } from 'next-localization'

import { Layout, Seo } from '@/components/index'

const Home = () => {
  const { t } = useI18n()
  return (
    <Layout>
      <Seo title={t('home')} description='Rsk Academy' />
    </Layout>
  )
}

export default Home
