import { useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'

import { addTransaction } from '@/store/transaction/actions'
import { useState } from 'react'
import { useLoadSmartContracts } from '@/hooks/useLoadContracts'

export const useTransactionCallback = ({
  name,
  method,
  args = [],
  from,
  onComplete,
  onFailed,
}) => {
  const dispatch = useDispatch()
  const toast = useToast()
  // eslint-disable-next-line babel/no-invalid-this
  const fn = method?.apply(this, args)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [result, setResult] = useState(null)
  const { loadContracts } = useLoadSmartContracts()
  const { account } = useSelector(state => state.identity)

  const exec = async () => {
    setIsLoading(true)
    setIsError(false)

    try {
      const response = await fn
        .send({ from })
        .on('transactionHash', hash => {
          dispatch(
            addTransaction({
              account,
              name,
              hash,
              type: 'pending',
            }),
          )
        })
        .on('receipt', receipt => {
          setIsLoading(false)
          dispatch(
            addTransaction({
              account,
              name,
              hash: receipt.transactionHash,
              type: 'confirmed',
            }),
            toast({
              status: 'success',
              title: 'Transaction confirmed!',
              position: 'top-right',
            }),
          )

          loadContracts()

          if (typeof onComplete === 'function') {
            onComplete()
          }
        })
        .on('error', (error, receipt) => {
          console.error('Send answer error', error)

          if (error.code !== 4001 && receipt) {
            dispatch(
              addTransaction({
                account,
                name,
                type: 'failed',
                hash: receipt.transactionHash,
              }),
            )
          }

          if (typeof onFailed === 'function') {
            onFailed()
          }
        })

      setResult(response)
    } catch (error) {
      setIsLoading(false)
      setIsError(true)

      toast({
        status: 'error',
        title: 'Transaction failed!',
        position: 'top-right',
      })
    }
  }

  return { exec, isError, isLoading, result }
}
