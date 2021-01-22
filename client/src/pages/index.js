import Layout from '@/components/layout/layout'
import Seo from '@/components/seo'
import { useI18n } from 'next-localization'

const Home = () => {
  const { t } = useI18n()
  return (
    <Layout>
      <Seo title={t('home')} description='Rsk Academy' />
    </Layout>
  )
}

export default Home
