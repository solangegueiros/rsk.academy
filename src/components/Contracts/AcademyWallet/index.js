import { useContext, useState } from 'react'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useI18n } from 'next-localization'

import { ContractContext } from '@/context/ContractProvider'
import ContractBase from '@/components/ContractBase'

export const AcademyWallet = () => {
  const { AcademyWallet: contract } = useContext(ContractContext)
  const [balance, setBalance] = useState(null)
  const toast = useToast()
  const { t } = useI18n()
  const { register, handleSubmit, reset, errors } = useForm()
  const colorScheme = useColorModeValue('primary', 'light')

  const getBalance = async data => {
    try {
      const res = await contract.methods
        .balanceOf(data.balance.toLowerCase())
        .call()
      setBalance(res)
      reset()
    } catch (err) {
      toast({
        status: 'error',
        title: 'Error!',
        description: err.message || 'An error occured!',
      })
    }
  }

  return (
    <ContractBase contract={contract}>
      <Box>
        <VStack
          mb={4}
          spacing={4}
          as='form'
          onSubmit={handleSubmit(getBalance)}
        >
          <FormControl isInvalid={errors.balance}>
            <FormLabel>Address</FormLabel>

            <Input
              placeholder='Address'
              name='balance'
              ref={register({
                required: { value: true, message: 'Address required' },
              })}
            />
            {errors.balance && (
              <FormErrorMessage>{errors.balance.message}</FormErrorMessage>
            )}
          </FormControl>
          <Button type='submit' colorScheme={colorScheme} mt={2} isFullWidth>
            {t('contract.getBalance')}
          </Button>
        </VStack>
        {balance && (
          <Alert mt={2} status='info'>
            <AlertIcon />
            {t('contract.balanceIs')} {balance / 1000000000000000000} tR-BTC
          </Alert>
        )}
      </Box>
    </ContractBase>
  )
}

export default AcademyWallet
