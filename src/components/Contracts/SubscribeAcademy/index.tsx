import { useContext } from 'react'

import { Alert, AlertIcon, Button, Text } from '@chakra-ui/react'

import { ContractBase } from '@components'
import { CONTRACT_ADDRESSES } from '@constants'
import { ContractContext } from '@context/ContractProvider'
import { useTransactionCallback } from '@hooks/transactions/useTransactionCallback'
import { useAppSelector } from '@store'

interface SubscribeAcademyProps {
  contractName: string
  buttonText?: string
}

export const SubscribeAcademy = ({ contractName, buttonText }: SubscribeAcademyProps): JSX.Element => {
  const context = useContext(ContractContext)
  const contract = context[contractName]
  const { studentClasses } = useAppSelector(state => state.profile)
  const { account, chainId } = useAppSelector(state => state.identity)

  const hasSubscribed = studentClasses?.includes(
    CONTRACT_ADDRESSES[chainId] && CONTRACT_ADDRESSES[chainId][contractName],
  )

  const { exec, isLoading } = useTransactionCallback({
    name: `Subscribe course ${contractName}`,
    from: account,
    method: contract?.contract?.methods.subscribe,
  })

  return (
    <ContractBase contract={contract}>
      {hasSubscribed ? (
        <Alert>
          <AlertIcon />
          <Text>You have already subscribed the course {contractName}</Text>
        </Alert>
      ) : (
        <Button isLoading={isLoading} isFullWidth onClick={exec}>
          {buttonText || 'Subscribe'}
        </Button>
      )}
    </ContractBase>
  )
}

export default SubscribeAcademy
