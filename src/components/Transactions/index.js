import {
  Center,
  IconButton,
  Menu,
  MenuButton,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { BiTransferAlt } from 'react-icons/bi'
import { TransactionList } from './TransactionList'

export const Transactions = () => {
  const { transactions } = useSelector(state => state.transaction)
  const { account } = useSelector(state => state.identity)
  const color = useColorModeValue('white', 'dark.500')
  const bg = useColorModeValue('primary.500', 'light.500')

  if (!account || (!transactions && transactions[account]?.length === 0)) {
    return null
  }

  const pendingCount =
    transactions[account]?.filter(tsx => tsx.type === 'pending')?.length || 0

  return (
    <Menu size='xl'>
      <Tooltip label='Transactions' hasArrow bg={bg}>
        <MenuButton>
          <Center
            pos='relative'
            display='inline-block'
            align='center'
            justify='center'
          >
            <IconButton
              borderRadius='full'
              variant='inversed'
              icon={<BiTransferAlt />}
            />

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
              >
                {pendingCount}
              </Center>
            )}
          </Center>
        </MenuButton>
      </Tooltip>
      <TransactionList />
    </Menu>
  )
}
