/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext } from 'react'
import { Box, SimpleGrid } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout, Seo, AcademyWallet } from '@components'
import { CONTRACTS } from '@components/Contracts'
import { RLoginResponseContext } from '@context/RLoginProvider'
import { useAppSelector } from '@store/store'
import { GetStaticProps } from 'next'

const Portfolio = (): JSX.Element => {
  const { t } = useTranslation('common')
  const { rLoginResponse } = useContext(RLoginResponseContext)
  const { isAdmin } = useAppSelector(state => state.identity)
  const { portfolioList } = useAppSelector(state => state.profile)

  const PortfolioProjectComponents = Object.entries(CONTRACTS)
    .filter(([contractName, _]) => portfolioList?.some(([_, portfolioName]) => contractName === portfolioName))
    .map(([name, Component]) => <Component key={name} />)

  return (
    <Layout>
      <Seo title={t`portfolio`} description={t`portfolio`} />
      {rLoginResponse ? (
        isAdmin ? (
          <Box>Portfolio page is for students</Box>
        ) : (
          <SimpleGrid columns={{ md: 2 }} gap={4}>
            <AcademyWallet />

            {PortfolioProjectComponents}
          </SimpleGrid>
        )
      ) : (
        <Box>You must log in</Box>
      )}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Portfolio
