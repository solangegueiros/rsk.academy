import { useContext } from 'react'

import { Alert, AlertIcon, Box, Heading, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout, Seo, SubscribeAcademy } from '@components'
import { COURSE_ADDRESSES } from '@constants'
import { Web3Context } from '@context/Web3Provider'
import { useAppSelector } from '@store'

const Profile = (): JSX.Element => {
  const { t } = useTranslation('common')
  const profile = useAppSelector(state => state.profile)
  const { isLoggedIn } = useContext(Web3Context)
  const { isAdmin, chainId } = useAppSelector(state => state.identity)
  const {
    index,
    ownerAddress,
    portfolioAddress,
    activeClass,
    studentClasses,
    portfolioList,
    studentActiveClassName,
    studentName,
  } = profile

  const color = useColorModeValue('primary.500', 'light.500')

  const renderProfile = () => {
    if (!isLoggedIn) return <Box>You must log in</Box>
    if (isAdmin) return <Box>Portfolio page is for students</Box>
    if (!index)
      return (
        <Box>
          <Alert status='warning' mb={8}>
            <AlertIcon />
            You are not registered in RSK Academy. Please subscribe one of the following courses.
          </Alert>
          {COURSE_ADDRESSES[chainId] && (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <SubscribeAcademy key='Developer' contractName='Developer' />
            </SimpleGrid>
          )}
        </Box>
      )

    return (
      <>
        <Box my={8} p={4} boxShadow='md' as='pre'>
          <Heading>{studentName}</Heading>
          {ownerAddress && (
            <Box my={4}>
              <Box fontWeight='bold' color={color}>
                Owner Address:
              </Box>
              <pre>{ownerAddress}</pre>
            </Box>
          )}

          {portfolioAddress && (
            <Box my={4}>
              <Box fontWeight='bold' color={color}>
                Portfolio Address:
              </Box>
              <pre>{portfolioAddress}</pre>
            </Box>
          )}

          {portfolioList && (
            <Box my={4}>
              <Box fontWeight='bold' color={color}>
                Projects in portfolio:
              </Box>
              {portfolioList.map(([address, name]) => (
                <pre key={address}>
                  {name} - {address}
                </pre>
              ))}
            </Box>
          )}
          {studentClasses && (
            <Box my={4}>
              <Box fontWeight='bold' color={color}>
                Classes subscribed:
              </Box>
              {studentClasses.map(c => (
                <pre key={c}>{c}</pre>
              ))}
            </Box>
          )}

          {studentActiveClassName && (
            <Box my={4}>
              <Box fontWeight='bold' color={color}>
                Active Class:
              </Box>
              <pre>
                {studentActiveClassName} - {activeClass}
              </pre>
            </Box>
          )}
        </Box>
        <Heading mb={8}>Courses</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <SubscribeAcademy key='Developer' contractName='Developer' />
        </SimpleGrid>
      </>
    )
  }

  return (
    <Layout>
      <Seo title={t`profile`} description={t`profile`} />
      {renderProfile()}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Profile
