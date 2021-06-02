import { useContext } from 'react'

import { Alert, AlertIcon, Button, Text } from '@chakra-ui/react'

import { ContractBase } from '@components'
import { CONTRACT_ADDRESSES } from '@constants'
import { ContractContext } from '@context/ContractProvider'
import { useTransactionCallback } from '@hooks/transactions/useTransactionCallback'
import { useAppSelector } from '@store'

interface SubscribeAcademyProps {
  contractName: 'Developer' | 'Business'
  buttonText?: string
}

export const SubscribeAcademy = ({ contractName, buttonText }: SubscribeAcademyProps): JSX.Element => {
  const {
    [contractName]: { contract },
  } = useContext(ContractContext)
  const { studentClasses } = useAppSelector(state => state.profile)
  const { chainId } = useAppSelector(state => state.identity)

  const hasSubscribed = studentClasses?.includes(
    CONTRACT_ADDRESSES[chainId] && CONTRACT_ADDRESSES[chainId][contractName],
  )

  const { execute, isLoading } = useTransactionCallback(`Subscribe ${contractName}`)

  return (
    <ContractBase name={contractName} contract={contract}>
      {hasSubscribed ? (
        <Alert>
          <AlertIcon />
          <Text>You have already subscribed the course {contractName}</Text>
        </Alert>
      ) : (
        <Button isLoading={isLoading} isFullWidth onClick={() => execute(() => contract.subscribe())}>
          {buttonText || 'Subscribe'}
        </Button>
      )}
    </ContractBase>
  )
}

export default SubscribeAcademy
