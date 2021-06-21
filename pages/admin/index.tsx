import { useContext, useState } from 'react'

import { Box, Heading, HStack, List, ListItem, SimpleGrid, Button } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout } from '@components'
import { Navigate } from '@components/Markdown/Navigate'
import { ContractContext } from '@context/ContractProvider'
import { Web3Context } from '@context/Web3Provider'
import { useAppDispatch, useAppSelector } from '@store'
import { loadNames, loadStudents } from '@store/admin/slice'

const Admin = (): JSX.Element => {
  const { isLoggedIn } = useContext(Web3Context)
  const { Developer, MasterName } = useContext(ContractContext)
  const [isNameListLoading, setIsNameListLoading] = useState(false)
  const [isStudentListLoading, setIsStudentListLoading] = useState(false)

  const { isAdmin } = useAppSelector(state => state.identity)
  const { nameCount, nameList, studentCount, students } = useAppSelector(state => state.admin)
  const dispatch = useAppDispatch()

  if (!isLoggedIn) return <Layout>Login with admin account</Layout>
  if (!isAdmin) return <Layout>You are not an admin</Layout>

  const loadStudentList = async () => {
    setIsStudentListLoading(true)
    try {
      const studentList = await Developer.contract.listStudentsByAddress()
      dispatch(loadStudents({ students: studentList }))
    } catch (error) {
      console.log(`error`, error)
    }
    setIsStudentListLoading(false)
  }

  const loadNameList = async () => {
    setIsNameListLoading(true)
    try {
      const nameList = await MasterName.contract.listNameInfo()
      console.log(`nameList`, nameList)
      dispatch(loadNames({ nameList }))
    } catch (error) {
      console.log(`error`, error)
    }
    setIsNameListLoading(false)
  }

  return (
    <Layout>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
        <Box p={4} boxShadow='lg'>
          <Heading as='h3' size='xl' mb={4}>
            Students ({studentCount})
          </Heading>

          <Button isLoading={isStudentListLoading} onClick={loadStudentList}>
            Load Student List
          </Button>

          <List mt={4} maxH={500} overflowY='auto'>
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

          <Button isLoading={isNameListLoading} onClick={loadNameList}>
            Load Name List
          </Button>

          <List mt={4} maxH={500} overflowY='auto'>
            {nameList?.map(({ name, scName, owner }, i) => (
              <ListItem my={2} key={i}>
                <HStack spacing={8}>
                  <Box>
                    <Navigate href={`https://explorer.testnet.rsk.co/address/${scName}`}>
                      {i + 1}. Name Contract
                    </Navigate>
                  </Box>
                  <Box>
                    <Navigate href={`https://explorer.testnet.rsk.co/address/${owner}`}>{name}</Navigate>
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
