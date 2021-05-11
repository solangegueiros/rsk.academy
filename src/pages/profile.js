import { useContext } from 'react'
import { useSelector } from 'react-redux'
import {
  Alert,
  AlertIcon,
  Box,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react'
import { useI18n } from 'next-localization'

import { Layout, Seo, SubscribeAcademy } from '@/components/all'
import { RLoginResponseContext } from '@/context/RLoginProvider'
import { COURSE_ADDRESSES } from '@/constants/constants'

const Profile = () => {
  const { t } = useI18n()
  const profile = useSelector(state => state.profile)
  const { rLoginResponse } = useContext(RLoginResponseContext)
  const { isAdmin, chainId } = useSelector(state => state.identity)
  const {
    index,
    ownerAddress,
    portfolioAddress,
    activeClassAddress,
    studentClasses,
    portfolioList,
    studentActiveClassName,
    studentName,
  } = profile

  const color = useColorModeValue('primary.500', 'light.500')

  const renderProfile = () => {
    if (!rLoginResponse) return <Box>You must log in</Box>
    if (isAdmin) return <Box>Portfolio page is for students</Box>
    if (!index)
      return (
        <Box>
          <Alert status='warning' mb={8}>
            <AlertIcon />
            You are not registered in RSK Academy. Please subscribe one of the
            following courses.
          </Alert>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <SubscribeAcademy contractName='Developer' />
          </SimpleGrid>
        </Box>
      )
      /*  to list all courses to subscribe:
            {Object.keys(COURSE_ADDRESSES[chainId]).map(courseName => (
              <SubscribeAcademy key={courseName} contractName={courseName} />
            ))}      
      */

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
                {studentActiveClassName} - {activeClassAddress}
              </pre>
            </Box>
          )}
        </Box>
        <Heading mb={8}>Courses</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {Object.keys(COURSE_ADDRESSES[chainId]).map(courseName => (
            <SubscribeAcademy key={courseName} contractName={courseName} />
          ))}
        </SimpleGrid>
      </>
    )
  }

  return (
    <Layout>
      <Seo title={t('profile')} />
      {renderProfile()}
    </Layout>
  )
}

export default Profile
