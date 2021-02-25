import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { Layout } from '@/components/all'
import { useRLogin } from '@/hooks/useRLogin'
import { useContext } from 'react'
import { ContractContext } from '@/context/ContractProvider'
import ContractCard from '@/components/ContractCard'
import { useSelector } from 'react-redux'

const Admin = () => {
  const { isAdmin, isLoggedIn } = useRLogin()
  const { allContracts } = useContext(ContractContext)
  const { students, nameList } = useSelector(state => state.admin)
  console.log('students', students)
  const bg = useColorModeValue('white', 'dark.400')
  console.log('nameList', nameList)

  const extractContracts = allContracts.map(contract => {
    let methods = null
    if (contract.contract?.methods) {
      const CHARS = ['DEFAULT', '0x', '(']
      methods = Object.keys(contract.contract.methods).filter(method =>
        CHARS.every(char => !method.includes(char)),
      )
    }
    return { ...contract, methods }
  })

  return (
    <Layout>
      {isLoggedIn ? (
        isAdmin ? (
          <Box>
            <Heading my={8} textAlign='center'>
              Contracts
            </Heading>
            <SimpleGrid gap={4} columns={{ md: 2, lg: 3 }}>
              {extractContracts.map((contract, i) => (
                <ContractCard
                  contract={contract}
                  methods={contract.methods}
                  key={i}
                />
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
                    Classes:{' '}
                    <pre>{JSON.stringify(student.studentClasses, null, 2)}</pre>
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
        ) : (
          <Box>You are not an admin</Box>
        )
      ) : (
        <Box>Login with admin account</Box>
      )}
    </Layout>
  )
}

export default Admin
