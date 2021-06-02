import { useContext } from 'react'

import { Box, Heading, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout } from '@components'
import { Web3Context } from '@context/Web3Provider'
import { useAppSelector } from '@store'

const Admin = (): JSX.Element => {
  const { isLoggedIn } = useContext(Web3Context)
  const { isAdmin } = useAppSelector(state => state.identity)
  const { students, nameList } = useAppSelector(state => state.admin)
  const bg = useColorModeValue('white', 'dark.400')

  const renderAdmin = () => {
    if (!isLoggedIn) return <Box>Login with admin account</Box>
    if (!isAdmin) return <Box>You are not an admin</Box>

    return (
      <Box>
        <Heading my={8} textAlign='center'>
          Contracts
        </Heading>
        <Heading my={8} textAlign='center'>
          Students
        </Heading>
        <SimpleGrid gap={4} columns={{ lg: 2 }}>
          {students?.map((student, i) => (
            <Box key={i} bg={bg} p={8} boxShadow='md' borderRadius={10}>
              <Text>
                Portfolio: <pre>{student.portfolioAddress}</pre>
              </Text>
              <Text>
                Classes: <pre>{JSON.stringify(student.studentClasses, null, 2)}</pre>
              </Text>
              <Text>
                Active Class: <pre>{student.activeClass}</pre>
              </Text>
            </Box>
          ))}
        </SimpleGrid>
        <Heading my={8} textAlign='center'>
          Name List
        </Heading>
        <SimpleGrid gap={4} columns={{ lg: 2 }}>
          {nameList?.map((item, i) => (
            <Box key={i} bg={bg} p={8} boxShadow='md' borderRadius={10}>
              <Text>{item.name}</Text>
              <Text>
                Owner: <pre>{item.owner}</pre>
              </Text>
              <Text>
                Contract: <pre>{item.scName}</pre>
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    )
  }
  return <Layout>{renderAdmin()}</Layout>
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Admin
