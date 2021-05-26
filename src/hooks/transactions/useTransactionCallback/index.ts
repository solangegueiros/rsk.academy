/* eslint-disable @typescript-eslint/ban-types */

import { useState } from 'react'

import { useToast } from '@chakra-ui/react'

import { useLoadSmartContracts } from '@hooks/useLoadContracts'
import { useAppDispatch, useAppSelector } from '@store'
import { addTransaction } from '@store/transaction/slice'

type UseTransactionCallbackReturnType = {
  exec: () => {}
  isError: boolean
  isLoading: boolean
  result: any
}

type UseTransactionCallbackProps = {
  name: string
  method: () => {}
  args?: any[]
  from: string
  onCompleted?: () => void
  onFailed?: () => void
}

export const useTransactionCallback = ({
  name,
  method,
  args = [],
  from,
  onCompleted,
  onFailed,
}: UseTransactionCallbackProps): UseTransactionCallbackReturnType => {
  const dispatch = useAppDispatch()
  const toast = useToast()
  const fn = method?.apply(this, args)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [result, setResult] = useState<any>(null)
  const { loadContracts } = useLoadSmartContracts()
  const { account } = useAppSelector(state => state.identity)

  const exec = async () => {
    setIsLoading(true)
    setIsError(false)

    try {
      const response = await fn
        .send({ from })
        .on('transactionHash', (hash: string) => {
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
          )

          toast({
            status: 'success',
            title: 'Transaction confirmed!',
            position: 'top-right',
          })

          loadContracts()

          if (typeof onCompleted === 'function') {
            onCompleted()
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
