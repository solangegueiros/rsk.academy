import { Button, ButtonGroup, Input, VStack } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ContractBase } from '@/components/all'
import { useRLogin } from '@/hooks/useRLogin'
import { ContractContext } from '@/context/ContractProvider'
import { useTransactionCallback } from '@/hooks/transactions/useTransactionCallback'
import { setStudentName } from '@/store/profile/actions'

export const MasterName = () => {
  const { MasterName: MasterNameContract } = useContext(ContractContext)
  const { account } = useRLogin()

  const { studentName } = useSelector(state => state.profile)
  const [name, setName] = useState(studentName || '')
  const [address, setAddress] = useState('')
  const dispatch = useDispatch()

  const onSetCompleted = () => {
    dispatch(setStudentName(name))
    setName('')
  }

  const onDeleteCompleted = () => {
    dispatch(setStudentName(null))
    setName('')
  }

  const {
    exec: handleSetName,
    isLoading: isLoadingSet,
  } = useTransactionCallback({
    name: 'Set Name',
    from: account,
    method: MasterNameContract.contract?.methods.addName,
    args: [address, name],
    onCompleted: onSetCompleted,
  })

  const {
    exec: handleDeleteName,
    isLoading: isLoadingDelete,
  } = useTransactionCallback({
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
          <Button
            isLoading={isLoadingSet}
            isFullWidth
            variant='normal'
            onClick={handleSetName}
            isDisabled={studentName}
          >
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

export default MasterName
