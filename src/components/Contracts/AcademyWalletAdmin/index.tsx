/* eslint-disable max-lines-per-function */
import { useContext, useRef, useState } from 'react'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { ContractBase } from '@components'
import { ContractContext } from '@context/ContractProvider'

export const AcademyWalletAdmin = (): JSX.Element => {
  const { AcademyWallet } = useContext(ContractContext)
  const [balance, setBalance] = useState<number | null>(null)
  const [contractBalance, setContractBalance] = useState<number | null>(null)
  const [address, setAddress] = useState<string>('')
  const toast = useToast()
  const { t } = useTranslation('common')
  const account = useRef(null)

  const getBalance = async () => {
    try {
      const res = await AcademyWallet.contract.balanceOf(address.toLowerCase())
      account.current = address
      setBalance(res.toNumber())
      setAddress('')
    } catch (err) {
      toast({
        status: 'error',
        title: 'Error!',
        description: err.message || 'An error occurred!',
        isClosable: true,
      })
    }
  }

  const getThisBalance = async () => {
    try {
      const res = await AcademyWallet.contract.thisBalance()
      setContractBalance(res.toNumber())
    } catch (err) {
      toast({
        status: 'error',
        title: 'Error!',
        description: err.message || 'An error occurred!',
        isClosable: true,
      })
    }
  }

  return (
    <ContractBase name={AcademyWallet.name} contract={AcademyWallet.contract}>
      <Box>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input placeholder='Address' name='address' onChange={e => setAddress(e.target.value)} />
          </FormControl>
          <Button type='submit' mt={2} isFullWidth onClick={getBalance}>
            {t`contract.getBalance`}
          </Button>
        </VStack>
        {balance && (
          <Alert mt={2} status='info'>
            <AlertIcon />
            <AlertDescription>
              {t`contract.balanceIs`}{' '}
              <Text fontWeight='bold' as='span'>
                {balance / 10e18} tR-BTC
              </Text>
              <Text fontSize='sm'>(Account: {account.current})</Text>
            </AlertDescription>
          </Alert>
        )}

        <Button type='submit' mt={2} isFullWidth onClick={getThisBalance}>
          {t`contract.getThisBalance`}
        </Button>
        {contractBalance && (
          <Alert mt={2} status='info'>
            <AlertIcon />
            {t`contract.balanceIs`} {contractBalance / 10e18} tR-BTC
          </Alert>
        )}
      </Box>
    </ContractBase>
  )
}
