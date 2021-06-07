/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext } from 'react'

import { Box, SimpleGrid } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout, Seo, AcademyWallet } from '@components'
import { CONTRACTS } from '@components/Contracts'
import { Web3Context } from '@context/Web3Provider'
import { useAppSelector } from '@store'

const Portfolio = (): JSX.Element => {
  const { t } = useTranslation('common')
  const { isLoggedIn } = useContext(Web3Context)
  const { isAdmin } = useAppSelector(state => state.identity)
  const { portfolioList } = useAppSelector(state => state.profile)

  const PortfolioProjectComponents = Object.entries(CONTRACTS)
    .filter(([contractName, _]) => portfolioList?.some(([_, portfolioName]) => contractName === portfolioName))
    .map(([name, Component]) => <Component key={name} />)

  return (
    <Layout>
      <Seo title={t`portfolio`} description={t`portfolio`} />
      {!isLoggedIn && <Box>You must log in</Box>}
      {isLoggedIn && isAdmin ? (
        <Box>Portfolio page is for students</Box>
      ) : (
        <SimpleGrid columns={{ md: 2 }} gap={4}>
          <AcademyWallet />

          {PortfolioProjectComponents}
        </SimpleGrid>
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
