import { useContext } from 'react'

import {
  Alert,
  AlertIcon,
  Box,
  Heading,
  SimpleGrid,
  HStack,
  AlertTitle,
  AlertDescription,
  Divider,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout, MasterName, Seo, SubscribeAcademy } from '@components'
import Certificate from '@components/Certificate'
import { Navigate } from '@components/Markdown/Navigate'
import { COURSE_ADDRESSES } from '@constants'
import { Web3Context } from '@context/Web3Provider'
import { useAppSelector } from '@store'

const AddressLink = ({ address }: { address: string }): JSX.Element => (
  <Navigate href={`https://explorer.testnet.rsk.co/address/${address}`} rel='noopener'>
    {address}
  </Navigate>
)

const Profile = (): JSX.Element => {
  const { t } = useTranslation('common')
  const profile = useAppSelector(state => state.profile)
  const { isLoggedIn } = useContext(Web3Context)
  const { isAdmin, chainId, domain } = useAppSelector(state => state.identity)
  const {
    index,
    ownerAddress,
    portfolioAddress,
    activeClass,
    studentClasses,
    portfolioList,
    studentActiveClassName,
    studentName,
    quizResults,
  } = profile

  const renderProfile = () => {
    if (!isLoggedIn) return <Box>You must log in</Box>
    if (isAdmin) return <Box>Portfolio page is for students</Box>
    if (!index)
      return (
        <Box>
          <Alert status='warning' mb={8}>
            <AlertIcon />
            You are not registered in RSK Academy Developers Course. Please subscribe the course!.
          </Alert>
          {/* TODO: Map multiple courses */}
          {COURSE_ADDRESSES[chainId] && (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <SubscribeAcademy key='Developer' contractName='Developer' />
            </SimpleGrid>
          )}
        </Box>
      )

    return (
      <>
        <Box p={8} boxShadow='md'>
          {studentName ? (
            <Heading>{studentName}</Heading>
          ) : (
            <Alert status='warning'>
              <AlertIcon /> Name Contract has not been deployed
              <Navigate ml={4} href='/courses/dev/02/smart-contract-name'>
                More Info
              </Navigate>
            </Alert>
          )}
          <Table mt={8}>
            <Tbody>
              {ownerAddress && (
                <Tr>
                  <Th fontSize='1em'>Owner Address</Th>
                  <Td>
                    <AddressLink address={ownerAddress} />
                  </Td>
                </Tr>
              )}

              <Tr>
                <Th fontSize='1em'>RNS Domain</Th>
                <Td>{domain || 'No domain has been registered or set reversed!'}</Td>
              </Tr>

              {portfolioAddress && (
                <Tr>
                  <Th fontSize='1em'>Portfolio Address</Th>
                  <Td>
                    <AddressLink address={portfolioAddress} />
                  </Td>
                </Tr>
              )}
              {portfolioList?.[0] && (
                <Tr>
                  <Th fontSize='1em'>Projects in Portfolio</Th>
                  <Td>
                    {portfolioList[0][1]} - <AddressLink address={portfolioList[0][0]} />
                  </Td>
                </Tr>
              )}
              {studentClasses && (
                <Tr>
                  <Th fontSize='1em'>Subscribed Class</Th>
                  <Td>
                    <AddressLink address={studentClasses[0]} />
                  </Td>
                </Tr>
              )}
              {studentActiveClassName && (
                <Tr>
                  <Th fontSize='1em'>Active Class</Th>
                  <Td>
                    {studentActiveClassName} - <AddressLink address={activeClass} />
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>

        <Divider my={8} />

        <Box>
          <Heading mb={8}>Quiz Results</Heading>
          {quizResults ? (
            <HStack spacing={8} w='full' p={8} boxShadow='md'>
              {quizResults.map(({ total, passed, grade, attempt, id }, i) => (
                <Alert
                  key={i}
                  status={passed ? 'success' : 'error'}
                  variant='subtle'
                  flexDirection='column'
                  alignItems='center'
                  justifyContent='center'
                  textAlign='center'
                  height='200px'
                >
                  <AlertIcon boxSize='40px' mr={0} />
                  <AlertTitle mt={4} mb={1} fontSize='lg' textTransform='uppercase'>
                    {id} <br />%{(grade / total) * 100}
                  </AlertTitle>
                  <AlertDescription maxWidth='sm'>Attempt: {attempt}</AlertDescription>
                </Alert>
              ))}
            </HStack>
          ) : (
            <Alert
              status='warning'
              variant='subtle'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              textAlign='center'
              height='200px'
            >
              <AlertIcon boxSize='40px' mr={0} />
              <AlertTitle mt={4} mb={1} fontSize='lg' textTransform='uppercase'>
                You have not taken any quiz!
              </AlertTitle>
            </Alert>
          )}
        </Box>

        <Divider my={8} />

        <Box>
          <Heading mb={8}>Portfolio</Heading>
          <MasterName />
        </Box>

        <Divider my={8} />

        <Box>
          <Heading mb={8}>Certificate</Heading>
          <Certificate />
        </Box>
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
