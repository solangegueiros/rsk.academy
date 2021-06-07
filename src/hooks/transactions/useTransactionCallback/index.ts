/* eslint-disable @typescript-eslint/ban-types */

import { useState } from 'react'

import { useToast, useUpdateEffect } from '@chakra-ui/react'
import { ContractReceipt, ContractTransaction } from 'ethers'

import { useLoadAllContracts } from '@hooks/useLoadAllContracts'
import { useAppDispatch, useAppSelector } from '@store'
import { addTransaction } from '@store/transaction/slice'

type UseTransactionCallbackReturnType = {
  execute: (tsx: () => Promise<ContractTransaction>) => {}
  isError: boolean
  isLoading: boolean
  response: ContractTransaction
  receipt: ContractReceipt
}

export const useTransactionCallback = (name: string): UseTransactionCallbackReturnType => {
  const toast = useToast()
  const { loadAllContracts } = useLoadAllContracts()
  const dispatch = useAppDispatch()
  const { account } = useAppSelector(state => state.identity)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [response, setResponse] = useState<ContractTransaction>(null)
  const [receipt, setReceipt] = useState<ContractReceipt>(null)

  useUpdateEffect(() => {
    if (response?.hash && isError) {
      dispatch(addTransaction({ name, account, hash: response.hash, type: 'failed' }))
    }
  }, [response, isError])

  const execute = async (tsx: () => Promise<ContractTransaction>) => {
    setIsLoading(true)
    setIsError(false)

    try {
      const _response = await tsx()

      dispatch(addTransaction({ name, account, hash: _response.hash, type: 'pending' }))
      setResponse(_response)
      const _receipt = await _response.wait()

      loadAllContracts()
      setReceipt(_receipt)
      setIsLoading(false)

      dispatch(addTransaction({ name, account, hash: _receipt.transactionHash, type: 'confirmed' }))
      toast({
        status: 'success',
        title: 'Transaction has been sent!',
        position: 'top-right',
        isClosable: true,
      })
    } catch (error) {
      setIsLoading(false)
      setIsError(true)

      toast({
        status: 'error',
        title: 'Transaction failed!',
        description: error.data?.message || error.message,
        position: 'top-right',
        isClosable: true,
      })
    }
  }

  return { execute, isError, isLoading, response, receipt }
}
