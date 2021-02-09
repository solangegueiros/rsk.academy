import { useEffect, useState } from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Tooltip,
  useClipboard,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { IoMdWallet } from 'react-icons/io'
import { useI18n } from 'next-localization'
import { CopyIcon } from '@chakra-ui/icons'

import AcademyWalletABI from '@/contracts/AcademyWallet.json'
import { useRLogin } from '@/hooks/use-rLogin'
import { useWeb3 } from '@/hooks/use-web3'

const AcademyWallet = () => {
  const { activate, chainId, isLoggedIn } = useRLogin()
  const [academyWalletContract, setAcademyWalletContract] = useState(null)
  const [balance, setBalance] = useState(null)
  const [contractAddress, setContractAddress] = useState(null)
  const web3 = useWeb3()
  const toast = useToast()
  const { t } = useI18n()
  const { register, handleSubmit, reset, errors } = useForm()
  const colorScheme = useColorModeValue('primary', 'light')
  const color = useColorModeValue('primary.500', 'light.500')

  const { hasCopied, onCopy } = useClipboard(contractAddress)

  useEffect(() => {
    const loadAcademyWallet = () => {
      const academyWalletNetwork = AcademyWalletABI.networks[chainId]
      if (academyWalletNetwork) {
        const contract = new web3.eth.Contract(
          AcademyWalletABI.abi,
          academyWalletNetwork.address,
        )
        setAcademyWalletContract(contract)
        setContractAddress(contract._address.toLowerCase())
      }
    }
    loadAcademyWallet()
  }, [chainId])

  const getBalance = async data => {
    try {
      const res = await academyWalletContract.methods
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
    <Box
      bg={useColorModeValue('white', 'dark.400')}
      p={8}
      boxShadow='md'
      borderRadius={10}
    >
      <HStack mb={4} justify='center'>
        <Heading as='h3' size='md'>
          Academy Wallet
        </Heading>
        {isLoggedIn && (
          <Tooltip label={contractAddress} hasArrow>
            <Box
              color={color}
              cursor='pointer'
              as={!hasCopied && CopyIcon}
              onClick={onCopy}
            >
              {hasCopied ? 'Copied' : 'Copy'}
            </Box>
          </Tooltip>
        )}
      </HStack>
      {isLoggedIn ? (
        chainId === 31 ? (
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
              <Button
                type='submit'
                colorScheme={colorScheme}
                mt={2}
                isFullWidth
              >
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
        ) : (
          <Alert status='warning'>
            <AlertIcon />
            {t('contract.notDeployed')}
          </Alert>
        )
      ) : (
        <Alert
          variant='subtle'
          status='warning'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
        >
          <AlertIcon as={IoMdWallet} boxSize='50px' mr={0} />

          <AlertDescription my={4} maxWidth='sm'>
            {t('contract.mustConnect')}
          </AlertDescription>
          <Button onClick={activate} colorScheme={colorScheme}>
            {t('connect')}
          </Button>
        </Alert>
      )}
    </Box>
  )
}

export default AcademyWallet
