import { Box, Heading } from '@chakra-ui/react'
import { useI18n } from 'next-localization'

import { Container, Layout, Seo, MasterName } from '@/components/all'
import { useContext } from 'react'
import { ContractContext } from '@/context/ContractProvider'
import { useRLogin } from '@/hooks/useRLogin'

const Portfolio = () => {
  const { t } = useI18n()
  const { allContracts } = useContext(ContractContext)
  const { isAdmin, isLoggedIn } = useRLogin()

  return (
    <Layout>
      <Seo title={t('portfolio')} />
      <Heading>{t('portfolio')}</Heading>
      <Container>
        {isLoggedIn ? (
          isAdmin ? (
            <Box>Portfolio page is for students</Box>
          ) : (
            <>
              <Box my={4}>
                <MasterName />
              </Box>
              <Box my={4} p={4} boxShadow='md' as='pre'>
                <Heading>Contracts</Heading>
                {JSON.stringify(
                  allContracts.map(
                    ({
                      name,
                      address,
                      contract,
                      deployedNetworks,
                      isDeployedOnCurrentNetwork,
                    }) => ({
                      [name]: {
                        address,
                        isContractLoaded: contract ? '✅' : '❌',
                        isDeployedOnCurrentNetwork: isDeployedOnCurrentNetwork
                          ? '✅'
                          : '❌',
                        deployedNetworks,
                      },
                    }),
                  ),
                  null,
                  2,
                )}
              </Box>
            </>
          )
        ) : (
          <Box>You must log in</Box>
        )}
      </Container>
    </Layout>
  )
}

export default Portfolio
