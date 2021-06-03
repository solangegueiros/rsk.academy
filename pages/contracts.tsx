import { useContext } from 'react'

import { HStack, Text, Box, Code } from '@chakra-ui/react'

import { Layout } from '@components'
import { ContractContext } from '@context/ContractProvider'

const Contracts = (): JSX.Element => {
  const { allContracts } = useContext(ContractContext)

  return (
    <Layout>
      <Box>
        {allContracts
          ?.sort((a, b) => a.name.localeCompare(b.name))
          .map(({ name, contract }, i: number) => (
            <HStack my={2} key={i}>
              <Text fontSize='1.5em' fontWeight='bold'>
                {name}
              </Text>
              <Code fontSize='1.5em'>{contract?.address}</Code>
            </HStack>
          ))}
      </Box>
    </Layout>
  )
}

export default Contracts
