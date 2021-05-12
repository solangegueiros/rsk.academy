import { useContext } from 'react'
import { Box, Heading, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'

import { Layout } from '@components'
import { ContractContext } from '@context/ContractProvider'
import { ContractCard, ContractCardProps } from '@components'
import { RLoginResponseContext } from '@context/RLoginProvider'
import { useAppSelector } from '@store/store'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'

const Admin = (): JSX.Element => {
  const { rLoginResponse } = useContext(RLoginResponseContext)
  const { isAdmin } = useAppSelector(state => state.identity)
  const { allContracts } = useContext(ContractContext)
  const { students, nameList } = useAppSelector(state => state.admin)
  const bg = useColorModeValue('white', 'dark.400')

  const extractContracts: ContractCardProps[] = allContracts.map(contract => {
    let methods = null
    if (contract.contract?.methods) {
      const CHARS = ['DEFAULT', '0x', '(']
      methods = Object.keys(contract.contract.methods).filter(method => CHARS.every(char => !method.includes(char)))
    }
    return { ...contract, methods }
  })

  const renderAdmin = () => {
    if (!rLoginResponse) return <Box>Login with admin account</Box>
    if (!isAdmin) return <Box>You are not an admin</Box>

    return (
      <Box>
        <Heading my={8} textAlign='center'>
          Contracts
        </Heading>
        <SimpleGrid gap={4} columns={{ md: 2, lg: 3 }}>
          {extractContracts.map((contract, i) => (
            <ContractCard contract={contract} key={i} />
          ))}
        </SimpleGrid>
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
