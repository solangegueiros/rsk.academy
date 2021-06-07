import { useContext } from 'react'

import { Box, Heading, HStack, List, ListItem, SimpleGrid } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout } from '@components'
import { Navigate } from '@components/Markdown/Navigate'
import { Web3Context } from '@context/Web3Provider'
import { useAppSelector } from '@store'

const Admin = (): JSX.Element => {
  const { isLoggedIn } = useContext(Web3Context)

  const { isAdmin } = useAppSelector(state => state.identity)
  const { nameCount, nameList, studentCount, students } = useAppSelector(state => state.admin)

  if (!isLoggedIn) return <Layout>Login with admin account</Layout>
  if (!isAdmin) return <Layout>You are not an admin</Layout>

  return (
    <Layout>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
        <Box p={4} boxShadow='lg'>
          <Heading as='h3' size='xl' mb={4}>
            Students ({studentCount})
          </Heading>
          <List maxH={500} overflowY='auto'>
            {students?.map((student, i) => (
              <ListItem my={2} key={student}>
                <Navigate href={`https://explorer.testnet.rsk.co/address/${student}`}>
                  {i + 1}. {student}
                </Navigate>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box p={4} boxShadow='lg'>
          <Heading as='h3' size='xl' mb={4}>
            Names ({nameCount})
          </Heading>
          <List maxH={500} overflowY='auto'>
            {nameList?.map((n, i) => (
              <ListItem my={2} key={n.owner}>
                <HStack spacing={8}>
                  <Box>
                    <Navigate href={`https://explorer.testnet.rsk.co/address/${n.scName}`}>
                      {i + 1}. Name Contract
                    </Navigate>
                  </Box>
                  <Box>
                    <Navigate href={`https://explorer.testnet.rsk.co/address/${n.owner}`}>{n.name}</Navigate>
                  </Box>
                </HStack>
              </ListItem>
            ))}
          </List>
        </Box>
      </SimpleGrid>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Admin
