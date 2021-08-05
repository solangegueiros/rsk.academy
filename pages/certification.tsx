import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import dynamic from 'next/dynamic'

import { Layout } from '@components'

const Certificate = dynamic(() => import('@components/Certificate'), { ssr: false })

const Certification = (): JSX.Element => {
  return (
    <Layout>
      <Certificate />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Certification
