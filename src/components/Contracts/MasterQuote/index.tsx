import { useContext, useState } from 'react'

import { Button, ButtonGroup, Input, VStack } from '@chakra-ui/react'

import { ContractBase } from '@components'
import { ContractContext } from '@context/ContractProvider'
import { useAppSelector } from '@store'

export const MasterQuote = (): JSX.Element => {
  const { MasterQuote: contract } = useContext(ContractContext)
  const { account } = useAppSelector(state => state.identity)

  const [quote, setQuote] = useState<string>('')
  const [address, setAddress] = useState<string>('')

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
        <Input value={quote} placeholder='Name' onChange={e => setQuote(e.target.value)} />
        <Input value={address} placeholder='Address' onChange={e => setAddress(e.target.value)} />
        <ButtonGroup w='full'>
          <Button isFullWidth onClick={handleSetQuote}>
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
