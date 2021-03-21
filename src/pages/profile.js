import { Box, Heading, useColorModeValue } from '@chakra-ui/react'
import { useI18n } from 'next-localization'

import { Layout, Seo } from '@/components/all'
import { useSelector } from 'react-redux'
import { useRLogin } from '@/hooks/useRLogin'

const Profile = () => {
  const { t } = useI18n()
  const profile = useSelector(state => state.profile)
  const { isAdmin, isLoggedIn } = useRLogin()
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

  return (
    <Layout>
      <Seo title={t('profile')} />
      {isLoggedIn ? (
        isAdmin ? (
          <Box>Portfolio page is for students</Box>
        ) : index ? (
          <Box my={4} p={4} boxShadow='md' as='pre'>
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
        ) : (
          <Box>Student is not registered in RSK Academy.</Box>
        )
      ) : (
        <Box>You must log in</Box>
      )}
    </Layout>
  )
}

export default Profile
