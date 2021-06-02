import { Text, Box, Link, Icon, useColorModeValue, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { formatDistanceToNow } from 'date-fns'
import { FaTrash } from 'react-icons/fa'
import { MdCheckCircle, MdRemoveCircle } from 'react-icons/md'
import { ClockLoader } from 'react-spinners'

import { useAppDispatch, useAppSelector } from '@store'
import { resetTransaction } from '@store/transaction/slice'
import { trimValue } from '@utils/trimValue'

const TsxTypeComponents = {
  confirmed: <Icon boxSize={8} color='green.400' as={MdCheckCircle} />,
  pending: (
    <Box boxSize={7} bg='yellow.400' borderRadius='full'>
      <ClockLoader size={28} color='white' />
    </Box>
  ),
  failed: <Icon boxSize={8} color='red.400' as={MdRemoveCircle} />,
}

export const TransactionList = (): JSX.Element => {
  const { transactions } = useAppSelector(state => state.transaction)
  const { account } = useAppSelector(state => state.identity)
  const bg = useColorModeValue('white', 'dark.500')
  const dispatch = useAppDispatch()

  return (
    <MenuList pos='relative' bg={bg} py={0} maxH={400} overflowY='auto'>
      {transactions[account]?.length > 0 ? (
        <>
          <Button
            rounded={0}
            size='sm'
            isFullWidth
            pos='sticky'
            top={0}
            aria-label='Clear transactions'
            variant='solid'
            colorScheme='red'
            leftIcon={<FaTrash />}
            onClick={() => dispatch(resetTransaction({ account }))}
          >
            Clear Transaction History
          </Button>
          {transactions[account]?.map((tsx, i) => (
            <MenuItem
              key={i}
              _even={{ bg: 'blackAlpha.50' }}
              _hover={{ bg: 'blackAlpha.200', textDecor: 'none' }}
              as={Link}
              target='_blank'
              href={`https://explorer.testnet.rsk.co/tx/${tsx.hash}`}
              px={6}
            >
              <Box mr={4}>{TsxTypeComponents[tsx.type]}</Box>
              <Box my={2}>
                <Text fontWeight='bold'>{tsx.name}</Text>
                {tsx.hash && <Text>{trimValue(tsx.hash, 6)}</Text>}
                <Text fontSize='xs'>{formatDistanceToNow(tsx.time)}</Text>
              </Box>
            </MenuItem>
          ))}
        </>
      ) : (
        <MenuItem>No transaction found</MenuItem>
      )}
    </MenuList>
  )
}
