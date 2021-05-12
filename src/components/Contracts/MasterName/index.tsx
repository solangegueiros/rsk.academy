import { useContext, useEffect, useState } from 'react'
import { Button, ButtonGroup, Input, VStack } from '@chakra-ui/react'

import { ContractBase } from '@components'
import { ContractContext } from '@context/ContractProvider'
import { useTransactionCallback } from '@hooks/transactions/useTransactionCallback'
import { useLoadSmartContracts } from '@hooks/useLoadContracts'
import { useAppSelector } from '@store/store'

export const MasterName = (): JSX.Element => {
  const { MasterName: MasterNameContract } = useContext(ContractContext)
  const { account } = useAppSelector(state => state.identity)
  const { loadContracts } = useLoadSmartContracts()

  const { studentName } = useAppSelector(state => state.profile)
  const [name, setName] = useState<string>(studentName)
  const [address, setAddress] = useState<string>('')

  const onSetCompleted = () => loadContracts()

  const onDeleteCompleted = () => loadContracts()

  const { exec: handleSetName, isLoading: isLoadingSet } = useTransactionCallback({
    name: 'Set Name',
    from: account,
    method: MasterNameContract.contract?.methods.addName,
    args: [address, name],
    onCompleted: onSetCompleted,
  })

  const { exec: handleDeleteName, isLoading: isLoadingDelete } = useTransactionCallback({
    name: 'Delete Name',
    from: account,
    method: MasterNameContract.contract?.methods.deleteName,
    onCompleted: onDeleteCompleted,
  })

  useEffect(() => {
    if (studentName) setName(studentName)
    if (!account) setName(null)
  }, [studentName, account])

  return (
    <ContractBase contract={MasterNameContract}>
      <VStack spacing={4}>
        <Input value={name} placeholder='Name' onChange={e => setName(e.target.value)} />
        <Input value={address} placeholder='Address' onChange={e => setAddress(e.target.value)} />
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
