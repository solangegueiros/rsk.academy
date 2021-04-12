import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Box, SimpleGrid } from '@chakra-ui/react'
import { useI18n } from 'next-localization'

import { Layout, Seo, AcademyWallet } from '@/components/all'
import { CONTRACTS } from '@/components/Contracts'
import { RLoginResponseContext } from '@/context/RLoginProvider'

const Portfolio = () => {
  const { t } = useI18n()
  const { rLoginResponse } = useContext(RLoginResponseContext)
  const { isAdmin } = useSelector(state => state.identity)
  const { portfolioList } = useSelector(state => state.profile)

  const PortfolioProjectComponents = Object.entries(CONTRACTS)
    .filter(([name]) =>
      portfolioList?.some(([_, portfolioName]) => name === portfolioName),
    )
    .map(([name, Component]) => <Component key={name} />)

  return (
    <Layout>
      <Seo title={t('portfolio')} />
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

export default Portfolio
