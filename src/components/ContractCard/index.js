import PropTypes from 'prop-types'
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
import { NETWORK_LABELS } from '@/constants/constants'
import { ContractBase } from '@/components/ContractBase'

const ContractCard = ({ contract }) => {
  return (
    <ContractBase contract={contract}>
      <Flex h='full' align='center' justify='space-between'>
        <Box>
          {contract.deployedNetworks?.map(chain => (
            <Badge key={chain}>{NETWORK_LABELS[chain]}</Badge>
          ))}
        </Box>
        <Popover
          arrowShadowColor={useColorModeValue('primary.500', 'dark.600')}
        >
          <PopoverTrigger>
            <Button variant='reversed' size='xs'>
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

ContractCard.propTypes = {
  contract: PropTypes.shape({
    deployedNetworks: PropTypes.arrayOf(PropTypes.string),
    methods: PropTypes.arrayOf(PropTypes.string),
    address: PropTypes.string,
  }).isRequired,
}

export default ContractCard
