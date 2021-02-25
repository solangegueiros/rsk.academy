import { Button, ButtonGroup, Input, VStack } from '@chakra-ui/react'
import { useContext, useState } from 'react'

import { ContractBase } from '@/components/all'
import { useRLogin } from '@/hooks/useRLogin'
import { ContractContext } from '@/context/ContractProvider'

export const MasterQuote = () => {
  const { MasterQuote: contract } = useContext(ContractContext)
  const { account } = useRLogin()

  const [quote, setQuote] = useState('')
  const [address, setAddress] = useState('')

  console.log('contract.contract.methods', contract.contract?.methods)

  const handleSetQuote = () => {
    try {
      contract.contract.methods
        .addName(address, quote)
        .send({ from: account })
        .once('receipt', receipt => {
          console.log('receipt', receipt)
        })
        .catch(err => console.error('err', err))
    } catch (error) {
      console.error('error', error)
    }
  }
  const handleDeleteName = () => {
    try {
      contract.contract.methods
        .deleteName()
        .send({ from: account })
        .once('receipt', receipt => {
          console.log('transaction receipt: ', receipt)
        })
        .catch(err => console.error('err', err))
    } catch (err) {
      console.error('err', err)
    }
  }

  return (
    <ContractBase contract={contract}>
      <VStack spacing={4}>
        <Input
          value={quote}
          placeholder='Name'
          onChange={e => setQuote(e.target.value)}
        />
        <Input
          value={address}
          placeholder='Address'
          onChange={e => setAddress(e.target.value)}
        />
        <ButtonGroup w='full'>
          <Button isFullWidth variant='normal' onClick={handleSetQuote}>
            Set Name
          </Button>
          <Button isFullWidth colorScheme='red' onClick={handleDeleteName}>
            Delete
          </Button>
        </ButtonGroup>
      </VStack>
    </ContractBase>
  )
}

export default MasterQuote
