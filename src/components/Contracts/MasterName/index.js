import { Button, ButtonGroup, Input, VStack } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { ContractBase } from '@/components/all'
import { useRLogin } from '@/hooks/useRLogin'
import { ContractContext } from '@/context/ContractProvider'

export const MasterName = () => {
  const { MasterName: contract } = useContext(ContractContext)
  const { account } = useRLogin()

  const { studentName } = useSelector(state => state.profile)
  const [name, setName] = useState(studentName || '')
  const [address, setAddress] = useState('')

  useEffect(() => {
    if (studentName) setName(studentName)
  }, [studentName])

  const handleSetName = () => {
    try {
      contract.contract.methods
        .addName(address, name)
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
          value={name}
          placeholder='Name'
          onChange={e => setName(e.target.value)}
        />
        <Input
          value={address}
          placeholder='Address'
          onChange={e => setAddress(e.target.value)}
        />
        <ButtonGroup w='full'>
          <Button isFullWidth variant='normal' onClick={handleSetName}>
            Set Name
          </Button>
          <Button
            isFullWidth
            colorScheme='red'
            isDisabled={!studentName}
            onClick={handleDeleteName}
          >
            Delete
          </Button>
        </ButtonGroup>
      </VStack>
    </ContractBase>
  )
}

export default MasterName
