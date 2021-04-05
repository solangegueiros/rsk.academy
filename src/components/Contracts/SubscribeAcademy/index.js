import PropTypes from 'prop-types'
import { Alert, AlertIcon, Button, Text } from '@chakra-ui/react'
import { useContext } from 'react'

import { ContractBase } from '@/components/all'
import { ContractContext } from '@/context/ContractProvider'
import { useSelector } from 'react-redux'
import { CONTRACT_ADDRESSES } from '@/constants/constants'
import { useRLogin } from '@/hooks/useRLogin'
import { useTransactionCallback } from '@/hooks/transactions/useTransactionCallback'

export const SubscribeAcademy = ({ contractName, buttonText }) => {
  const context = useContext(ContractContext)
  const contract = context[contractName]
  const { studentClasses } = useSelector(state => state.profile)
  const { account, chainId } = useRLogin()

  const hasSubscribed = studentClasses?.includes(
    CONTRACT_ADDRESSES[chainId][contractName],
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
        <Button
          isLoading={isLoading}
          isFullWidth
          variant='normal'
          onClick={exec}
        >
          {buttonText || 'Subscribe'}
        </Button>
      )}
    </ContractBase>
  )
}

SubscribeAcademy.propTypes = {
  contractName: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
}

export default SubscribeAcademy
