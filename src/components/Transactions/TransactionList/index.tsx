import { Text, Box, Link, Icon, useColorModeValue, MenuList, MenuItem } from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'
import { MdCheckCircle, MdRemoveCircle } from 'react-icons/md'
import { ClockLoader } from 'react-spinners'

import { useAppSelector } from '@store'
import { trimValue } from '@utils/trimValue'

const TsxTypeComponents = {
  confirmed: <Icon boxSize={8} color='green.400' as={MdCheckCircle} mr={4} />,
  pending: (
    <Box boxSize={8} bg='yellow.400' borderRadius='full'>
      <ClockLoader size={32} color='white' />
    </Box>
  ),
  failed: <Icon boxSize={8} color='red.400' as={MdRemoveCircle} />,
}

export const TransactionList = (): JSX.Element => {
  const { transactions } = useAppSelector(state => state.transaction)
  const { account } = useAppSelector(state => state.identity)
  const bg = useColorModeValue('white', 'dark.500')

  return (
    <MenuList bg={bg} py={0}>
      {transactions[account]?.length > 0 &&
        transactions[account].map((tsx, i) => (
          <MenuItem
            key={i}
            _even={{ bg: 'blackAlpha.50' }}
            _hover={{ bg: 'blackAlpha.200', textDecor: 'none' }}
            as={Link}
            target='_blank'
            href={`https://explorer.testnet.rsk.co/tx/${tsx.hash}`}
            px={8}
          >
            <Box>{TsxTypeComponents[tsx.type]}</Box>
            <Box my={2}>
              <Text fontWeight='bold'>{tsx.name}</Text>
              {tsx.hash && <Text>{trimValue(tsx.hash, 6)}</Text>}
              <Text fontSize='sm'>{formatDistanceToNow(tsx.time)}</Text>
            </Box>
          </MenuItem>
        ))}
    </MenuList>
  )
}
