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
  Input,
  SimpleGrid,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { IoMdWallet } from 'react-icons/io'
import { useI18n } from 'next-localization'

import AcademyWalletABI from '@/contracts/AcademyWallet.json'
import { useRLogin } from '@/hooks/use-rLogin'
import { useWeb3 } from '@/hooks/use-web3'

const AcademyWallet = () => {
  const [academyWalletContract, setAcademyWalletContract] = useState(null)
  const [balance, setBalance] = useState(null)

  const { activate, chainId, isLoggedIn } = useRLogin()
  const web3 = useWeb3()
  const toast = useToast()
  const { t } = useI18n()
  const { register, handleSubmit, reset, errors } = useForm()
  const colorScheme = useColorModeValue('rsk.green', 'rsk.light')

  useEffect(() => {
    const loadAcademyWallet = () => {
      const academyWalletNetwork = AcademyWalletABI.networks[chainId]
      if (academyWalletNetwork) {
        const contract = new web3.eth.Contract(
          AcademyWalletABI.abi,
          academyWalletNetwork.address,
        )
        setAcademyWalletContract(contract)
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
    <SimpleGrid mt={8} columns={{ sm: 1, md: 2 }}>
      <Box
        bg={useColorModeValue('white', 'rsk.dark.700')}
        p={4}
        boxShadow='sm'
        borderRadius={10}
      >
        <Heading textAlign='center' as='h3' size='md' mb={4}>
          Academy Wallet
        </Heading>
        {isLoggedIn ? (
          chainId === 31 ? (
            <Box>
              <Box as='form' onSubmit={handleSubmit(getBalance)}>
                <FormControl isInvalid={errors.balance}>
                  <FormLabel>Address</FormLabel>
                  <Input
                    placeholder='Address'
                    name='balance'
                    ref={register({ required: true })}
                  />
                  {errors.balance && (
                    <FormErrorMessage>
                      {errors.balance.message}
                    </FormErrorMessage>
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
              </Box>
              {balance && (
                <Alert mt={2} status='info'>
                  <AlertIcon />
                  {t('contract.balanceIs')} {balance} wei
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
    </SimpleGrid>
  )
}

export default AcademyWallet
