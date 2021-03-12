import { Button, Center, Tooltip, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { TransactionList } from './TransactionList'

export const Transactions = () => {
  const { transactions } = useSelector(state => state.transaction)
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (transactions.length === 0) {
    return null
  }

  return (
    <>
      <TransactionList isOpen={isOpen} onClose={onClose} />
      <Tooltip label='Transactions'>
        <Center
          opacity={0.5}
          _hover={{ opacity: 1 }}
          pos='fixed'
          bottom={4}
          right={4}
          align='center'
          justify='center'
        >
          {transactions.length > 0 && (
            <Button borderRadius='full' variant='normal' onClick={onOpen}>
              {transactions.length}
            </Button>
          )}
        </Center>
      </Tooltip>
    </>
  )
}
