import { useToast } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'

import { addTransaction } from '@/store/transaction/actions'
import { useState } from 'react'

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

  const exec = async () => {
    setIsLoading(true)
    setIsError(false)

    const response = await fn
      .send({ from })
      .on('transactionHash', hash => {
        dispatch(
          addTransaction({
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
        if (typeof onComplete === 'function') {
          onComplete()
        }
      })
      .on('error', (error, receipt) => {
        setIsLoading(false)
        setIsError(true)
        console.error('Send answer error', error)

        if (error.code !== 4001) {
          dispatch(
            addTransaction({
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
  }

  return { exec, isError, isLoading, result }
}
