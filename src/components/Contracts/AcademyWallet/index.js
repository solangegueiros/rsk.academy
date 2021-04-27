import { useContext, useState } from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useI18n } from 'next-localization'

import { ContractContext } from '@/context/ContractProvider'
import ContractBase from '@/components/ContractBase'
import { FaPaste } from 'react-icons/fa'

export const AcademyWallet = () => {
  const { AcademyWallet: contract } = useContext(ContractContext)
  const [balance, setBalance] = useState(null)
  const [address, setAddress] = useState()
  const toast = useToast()
  const { t } = useI18n()
  const { register, handleSubmit, reset, errors, setValue } = useForm({
    mode: 'onChange',
  })
  const colorScheme = useColorModeValue('primary', 'light')

  const onPaste = async () => {
    const clipBoard = await navigator.clipboard.readText()
    setValue('address', clipBoard)
  }

  const getBalance = async data => {
    try {
      setAddress(data.address)
      const res = await contract.contract?.methods
        .balanceOf(data.address.toLowerCase())
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

            <InputGroup>
              <InputRightElement>
                <IconButton
                  onClick={onPaste}
                  variant='ghost'
                  colorScheme='primary'
                  icon={<FaPaste />}
                />
              </InputRightElement>
              <Input
                placeholder='Address'
                name='address'
                ref={register({
                  required: { value: true, message: 'Address required' },
                })}
              />
            </InputGroup>
            {errors.address && (
              <FormErrorMessage>{errors.address.message}</FormErrorMessage>
            )}
          </FormControl>
          <Button type='submit' colorScheme={colorScheme} mt={2} isFullWidth>
            {t('contract.getBalance')}
          </Button>
        </VStack>
        {balance && (
          <Alert mt={2} status='info'>
            <AlertIcon />
            <AlertDescription>
              {t('contract.balanceIs')}{' '}
              <Text fontWeight='bold' as='span'>
                {balance / 10e18} tR-BTC
              </Text>
              <Text fontSize='sm'>(Account: {address})</Text>
            </AlertDescription>
          </Alert>
        )}
      </Box>
    </ContractBase>
  )
}

export default AcademyWallet
