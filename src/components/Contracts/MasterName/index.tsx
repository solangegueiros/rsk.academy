import { useContext, useEffect, useState } from 'react'

import { Button, ButtonGroup, Input, VStack } from '@chakra-ui/react'

import { ContractBase } from '@components'
import { ContractContext } from '@context/ContractProvider'
import { useTransactionCallback } from '@hooks/transactions/useTransactionCallback'
import { useAppSelector } from '@store'

export const MasterName = (): JSX.Element => {
  const {
    MasterName: { contract, name: contractName },
  } = useContext(ContractContext)
  const { account } = useAppSelector(state => state.identity)

  const { studentName } = useAppSelector(state => state.profile)
  const [name, setName] = useState<string>(studentName || '')
  const [address, setAddress] = useState<string>('')

  const { execute: onSetName, isLoading: isLoadingSet } = useTransactionCallback('Set Name')
  const { execute: onDeleteName, isLoading: isLoadingDelete } = useTransactionCallback('Delete Name')

  const handleSetName = () => onSetName(() => contract.addName(address, name))
  const handleDeleteName = () => onDeleteName(() => contract.deleteName())

  useEffect(() => {
    if (studentName) setName(studentName)
    if (!account) setName(null)
  }, [studentName, account])

  return (
    <ContractBase name={contractName} contract={contract}>
      <VStack spacing={4}>
        <Input value={name} placeholder='Name' onChange={e => setName(e.target.value)} />
        <Input value={address} placeholder='Address' onChange={e => setAddress(e.target.value.toLowerCase())} />
        <ButtonGroup w='full'>
          <Button isLoading={isLoadingSet} isFullWidth onClick={handleSetName} isDisabled={!!studentName}>
            Set Name
          </Button>
          <Button
            isFullWidth
            isLoading={isLoadingDelete}
            colorScheme='red'
            onClick={handleDeleteName}
            isDisabled={!studentName}
          >
            Delete
          </Button>
        </ButtonGroup>
      </VStack>
    </ContractBase>
  )
}
