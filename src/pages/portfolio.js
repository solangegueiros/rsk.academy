import { Box, SimpleGrid } from '@chakra-ui/react'
import { useI18n } from 'next-localization'

import { Layout, Seo, AcademyWallet } from '@/components/all'
import { useRLogin } from '@/hooks/useRLogin'
import { CONTRACTS } from '@/components/Contracts'
import { useSelector } from 'react-redux'

const Portfolio = () => {
  const { t } = useI18n()
  const { isAdmin, isLoggedIn } = useRLogin()
  const { portfolioList } = useSelector(state => state.profile)

  const PortfolioProjectComponents = Object.entries(CONTRACTS)
    .filter(([name]) =>
      portfolioList?.some(([_, portfolioName]) => name === portfolioName),
    )
    .map(([name, Component]) => <Component key={name} />)

  return (
    <Layout>
      <Seo title={t('portfolio')} />
      {isLoggedIn ? (
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
