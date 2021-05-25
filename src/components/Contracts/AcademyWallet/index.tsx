import { useContext, useRef, useState } from 'react'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  FormControl,
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
import { useTranslation } from 'next-i18next'
import { FaPaste } from 'react-icons/fa'

import { ContractBase } from '@components'
import { Popup } from '@components/Popup'
import { ContractContext } from '@context/ContractProvider'

export const AcademyWallet = (): JSX.Element => {
  const { AcademyWallet: contract } = useContext(ContractContext)
  const [balance, setBalance] = useState<number | null>(null)
  const [address, setAddress] = useState<string>('')
  const toast = useToast()
  const { t } = useTranslation('common')
  const account = useRef(null)

  const onPaste = async () => {
    const clipBoard = await navigator.clipboard.readText()
    setAddress(clipBoard)
  }

  const getBalance = async () => {
    try {
      const res = await contract.contract?.methods.balanceOf(address.toLowerCase()).call()
      account.current = address
      setBalance(res)
      setAddress(null)
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
        <VStack mb={4} spacing={4}>
          <FormControl>
            <FormLabel>Address</FormLabel>

            <InputGroup>
              <Popup label='Paste'>
                <InputRightElement>
                  <IconButton
                    aria-label='Paste'
                    onClick={onPaste}
                    variant='ghost'
                    colorScheme={useColorModeValue('primary', 'light')}
                    icon={<FaPaste />}
                  />
                </InputRightElement>
              </Popup>
              <Input placeholder='Address' name='address' value={address} onChange={e => setAddress(e.target.value)} />
            </InputGroup>
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
      </Box>
    </ContractBase>
  )
}
