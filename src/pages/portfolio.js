import { Box, Heading } from '@chakra-ui/react'
import { useI18n } from 'next-localization'

import { Container, Layout, Seo } from '@/components/all'
import { useSelector } from 'react-redux'
import { useContext } from 'react'
import { ContractContext } from '@/context/ContractProvider'

const Portfolio = () => {
  const { t } = useI18n()
  const profile = useSelector(state => state.profile)
  const { contractState } = useContext(ContractContext)

  return (
    <Layout>
      <Seo title={t('portfolio')} />
      <Heading>{t('portfolio')}</Heading>
      <Container>
        <Box my={4} p={4} boxShadow='md' as='pre'>
          <Heading>Profile</Heading>
          {JSON.stringify(profile, null, 2)}
        </Box>
        <Box my={4} p={4} boxShadow='md' as='pre'>
          <Heading>Contracts</Heading>
          {JSON.stringify(
            Object.entries(contractState).map(([name, value]) => ({
              [name]: {
                address: value.address,
                isContractLoaded: value.contract ? '✅' : '❌',
                deployedNetworks: value.deployedNetworks,
              },
            })),
            null,
            2,
          )}
        </Box>
      </Container>
    </Layout>
  )
}

export default Portfolio
