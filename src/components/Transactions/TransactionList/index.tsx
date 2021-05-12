import { Text, Box, Link, Icon, useColorModeValue, MenuList, MenuItem } from '@chakra-ui/react'
import { MdCheckCircle, MdRemoveCircle } from 'react-icons/md'
import { formatDistanceToNow } from 'date-fns'
import { ClockLoader } from 'react-spinners'
import { trimValue } from '@utils/trimValue'
import { useAppSelector } from '@store/store'

export const TransactionList = (): JSX.Element => {
  const { transactions } = useAppSelector(state => state.transaction)
  const { account } = useAppSelector(state => state.identity)
  const bg = useColorModeValue('white', 'dark.500')
  const colors = {
    confirmed: 'green.400',
    pending: 'yellow.400',
    failed: 'red.400',
  }

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
            <Box>
              {tsx.type === 'confirmed' ? (
                <Icon boxSize={8} color={colors.confirmed} as={MdCheckCircle} mr={4} />
              ) : tsx.type === 'pending' ? (
                <Box boxSize={8} bg={colors.pending} borderRadius='full'>
                  <ClockLoader size={32} color='white' />
                </Box>
              ) : (
                tsx.type === 'failed' && <Icon boxSize={8} color={colors.failed} as={MdRemoveCircle} />
              )}
            </Box>
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
