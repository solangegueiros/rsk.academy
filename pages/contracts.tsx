import { Layout } from '@components'
import { useContext } from 'react'
import { ContractContext } from '@context/ContractProvider'
import { HStack, Text, Box, Code } from '@chakra-ui/react'

const Contracts = (): JSX.Element => {
  const { allContracts } = useContext(ContractContext)

  return (
    <Layout>
      <Box>
        {allContracts
          ?.sort((a, b) => a.name.localeCompare(b.name))
          .map(({ address, name }, i: number) => (
            <HStack my={2} key={i}>
              <Text fontSize='1.5em' fontWeight='bold'>
                {name}
              </Text>
              <Code fontSize='1.5em'>{address}</Code>
            </HStack>
          ))}
      </Box>
    </Layout>
  )
}

export default Contracts
