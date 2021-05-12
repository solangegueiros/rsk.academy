import { Box, Center, IconButton, Menu, MenuButton, useColorModeValue } from '@chakra-ui/react'
import { BiTransferAlt } from 'react-icons/bi'
import { TransactionList } from './TransactionList'
import { useAppSelector } from '@store/store'
import { Popup } from '@components/Popup'

export const Transactions = (): JSX.Element => {
  const { transactions } = useAppSelector(state => state.transaction)
  const { account } = useAppSelector(state => state.identity)
  const color = useColorModeValue('white', 'dark.500')

  if (!account || (!transactions && transactions[account]?.length === 0)) {
    return null
  }

  const pendingCount = transactions[account]?.filter(tsx => tsx.type === 'pending')?.length || 0

  return (
    <Menu size='xl' placement='bottom'>
      <Popup label='Transactions'>
        <Box pos='relative'>
          {pendingCount > 0 && (
            <Center
              pos='absolute'
              top={-1}
              right={-1}
              bg='yellow.400'
              rounded='full'
              borderWidth={2}
              borderColor={color}
              color={color}
              fontSize='sm'
              fontWeight='bold'
              w={5}
              h={5}
              zIndex='modal'
            >
              {pendingCount}
            </Center>
          )}
          <MenuButton fontSize='2xl' as={IconButton} variant='outlined' icon={<BiTransferAlt />}></MenuButton>
        </Box>
      </Popup>
      <TransactionList />
    </Menu>
  )
}
