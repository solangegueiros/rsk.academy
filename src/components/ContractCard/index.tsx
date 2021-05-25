import {
  Badge,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Flex,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'

import { ContractBase } from '@components'
import { NETWORK_LABELS } from '@constants'

export interface ContractCardProps {
  name: string
  deployedNetworks: string[]
  methods: string[]
  address: string
  isDeployedOnCurrentNetwork: boolean
}

export const ContractCard = ({ contract }: { contract: ContractCardProps }): JSX.Element => {
  return (
    <ContractBase contract={contract}>
      <Flex h='full' align='center' justify='space-between'>
        <Box>
          {contract.deployedNetworks?.map(chain => (
            <Badge key={chain}>{NETWORK_LABELS[chain]}</Badge>
          ))}
        </Box>
        <Popover>
          <PopoverTrigger>
            <Button variant='outlined' size='xs'>
              Functions
            </Button>
          </PopoverTrigger>
          <PopoverContent
            bg={useColorModeValue('primary.50', 'dark.500')}
            borderColor={useColorModeValue('primary.500', 'dark.600')}
          >
            <PopoverArrow bg={useColorModeValue('primary.50', 'dark.500')} />
            <PopoverCloseButton />
            <PopoverHeader>Functions</PopoverHeader>
            <PopoverBody>
              <Box>
                {contract.methods?.map(method => (
                  <pre key={method}>{method}</pre>
                ))}
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </ContractBase>
  )
}
