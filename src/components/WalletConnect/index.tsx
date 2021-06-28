/* eslint-disable max-lines-per-function */
import { useContext, useEffect, useState } from 'react'

import {
  Button,
  ButtonGroup,
  useClipboard,
  useToast,
  Image,
  Box,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Text,
  PopoverBody,
  VStack,
  InputGroup,
  Input,
  InputRightAddon,
  FormControl,
  Divider,
  FormLabel,
  Badge,
} from '@chakra-ui/react'
import { Web3Provider } from '@ethersproject/providers'
import Portis from '@portis/web3'
import RLogin from '@rsksmart/rlogin'
import RNS from '@rsksmart/rns'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Identicon from 'identicon.js'
import { useTranslation } from 'next-i18next'
import { FiLogOut } from 'react-icons/fi'
import { MdContentCopy, MdErrorOutline } from 'react-icons/md'
import Web3 from 'web3'

import { RifIcon } from '@components'
import { SUPPORTED_CHAINS } from '@constants'
import { Web3Context } from '@context/Web3Provider'
import { useLoadAllContracts } from '@hooks/useLoadAllContracts'
import { useAppDispatch, useAppSelector } from '@store'
import { changeAccount, changeChainId, changeDomain, loginWallet, reset } from '@store/identity/slice'
import { getSigner } from '@utils/getContract'
import { trimValue } from '@utils/trimValue'

const rLogin = new RLogin({
  cachedProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          1: 'https://mainnet.infura.io/v3/8043bb2cf99347b1bfadfb233c5325c0',
          30: 'https://public-node.rsk.co',
          31: 'https://public-node.testnet.rsk.co',
          1337: 'http://localhost:8545',
        },
      },
    },
    portis: {
      package: Portis,
      options: {
        id: 'e388b4f1-8300-447e-add0-a901db7c8c41',
        network: {
          nodeUrl: 'https://public-node.testnet.rsk.co',
          chainId: 31,
        },
      },
    },
  },
  supportedChains: SUPPORTED_CHAINS,
})

const WalletConnect = (): JSX.Element => {
  const { account, chainId, error, domain } = useAppSelector(state => state.identity)
  const { hasCopied, onCopy } = useClipboard(account)
  const dispatch = useAppDispatch()
  const { logout, login, isLoggedIn } = useContext(Web3Context)
  const { loadAllContracts } = useLoadAllContracts()
  const [inputDomain, setInputDomain] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDomainError, setIsDomainError] = useState(false)
  const toast = useToast()
  const color = useColorModeValue('primary.500', 'light.500')
  const bg = useColorModeValue('white', 'dark.500')

  const { t } = useTranslation('common')

  const getDomain = async (account: string, chainId: number) => {
    let domain = null
    const localDomain = localStorage.getItem(`rns-domain_${account}`)

    try {
      const rsnWeb3 = new Web3(chainId === 30 ? 'https://public-node.rsk.co' : 'https://public-node.testnet.rsk.co')
      const rns = new RNS(rsnWeb3)
      domain = await rns.reverse(account)
      return domain
    } catch (error) {
      console.error('RNS error', error)
      return localDomain
    }
  }

  const handleValidate = async () => {
    let validatedAddress
    try {
      setIsLoading(true)
      const rsnWeb3 = new Web3(chainId === 30 ? 'https://public-node.rsk.co' : 'https://public-node.testnet.rsk.co')
      const rns = new RNS(rsnWeb3)
      validatedAddress = await rns.addr(inputDomain + '.rsk')

      if (validatedAddress) {
        dispatch(changeDomain({ domain: inputDomain + '.rsk (not reversed)' }))
        localStorage.setItem(`rns-domain_${validatedAddress.toLowerCase()}`, inputDomain + '.rsk (not reversed)')
      }
    } catch (error) {
      console.error('RNS validate error', error)
      setIsDomainError(true)
      setTimeout(() => {
        setIsDomainError(false)
      }, 5000)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (chainId && !SUPPORTED_CHAINS.includes(chainId)) {
      toast({ status: 'error', title: 'Unsupported Network', description: `Network Id: ${chainId}`, isClosable: true })
    } else if (isLoggedIn && chainId && Boolean(account)) {
      loadAllContracts()
      getDomain(account, chainId).then(domain => dispatch(changeDomain({ domain })))
    }
  }, [account, chainId, isLoggedIn])

  // handle logging out
  const handleLogOut = () => {
    logout()
    dispatch(reset())
  }

  const handleLogin = async () => {
    try {
      const res = await rLogin.connect()
      const rLoginProvider = res.provider

      if (rLoginProvider) {
        const web3Provider = new Web3Provider(rLoginProvider)
        const signer = getSigner(web3Provider, account)

        const [acc] = await web3Provider.listAccounts()
        const network = await web3Provider.getNetwork()

        dispatch(loginWallet({ account: acc, chainId: Number(network.chainId) }))

        rLoginProvider.on('accountsChanged', async (accounts: string[]) =>
          dispatch(changeAccount({ account: accounts[0] })),
        )
        rLoginProvider.on('chainChanged', (c: string) => dispatch(changeChainId({ chainId: Number(c) })))
        rLoginProvider.on('disconnect', () => handleLogOut)

        login({ rLoginResponse: res, web3Provider, signer })
      }
    } catch (err) {
      if (err.message === 'No reverse resolution set') {
        dispatch(changeDomain({ domain: null }))
      }
      console.error(`RLogin Error`, err.message)
    }
  }

  if (isLoggedIn) {
    if (error) {
      return (
        <ButtonGroup isAttached colorScheme='red'>
          <Button leftIcon={<MdErrorOutline />}>{t`error.connect`}</Button>
        </ButtonGroup>
      )
    }

    return (
      <>
        <Popover placement='bottom'>
          <PopoverTrigger>
            <Box overflow='hidden' boxSize='40px' borderRadius='md' borderColor={color} borderWidth={1}>
              <Image
                rounded='md'
                cursor='pointer'
                src={`data:image/svg+xml;base64,${new Identicon(account, {
                  background: useColorModeValue([255, 255, 255, 255], [0, 0, 0, 0]),
                  format: 'svg',
                  size: 40,
                  margin: '0.15',
                }).toString()}`}
                alt={account}
              />
            </Box>
          </PopoverTrigger>
          <PopoverContent bg={bg}>
            <PopoverBody as={VStack} spacing={4} fontWeight='bold' p={4}>
              {domain && (
                <Text>
                  {domain.split(' ')[0]}{' '}
                  {domain.split(' ')[1] && (
                    <Badge textTransform='capitalize' colorScheme='red'>
                      Not reversed
                    </Badge>
                  )}
                </Text>
              )}
              {!domain && (
                <FormControl borderWidth={1} p={4} borderRadius='md'>
                  <FormLabel fontWeight='bold'>Validate domain</FormLabel>
                  <InputGroup>
                    <Input type='tel' placeholder='Your domain' onChange={e => setInputDomain(e.target.value)} />
                    <InputRightAddon children='.rsk' />
                  </InputGroup>
                  <Button
                    colorScheme={isDomainError ? 'red' : 'primary'}
                    isLoading={isLoading}
                    mt={4}
                    isFullWidth
                    variant='outline'
                    onClick={handleValidate}
                    isDisabled={!inputDomain || inputDomain?.length < 3}
                  >
                    {isDomainError ? 'You are not owner the domain' : 'Validate'}
                  </Button>
                </FormControl>
              )}

              <Button
                isFullWidth
                variant='outlined'
                onClick={onCopy}
                leftIcon={!hasCopied && <MdContentCopy />}
                isTruncated
              >
                {hasCopied ? t`copied` : trimValue(account, 6)}
              </Button>

              <Divider />

              <Button
                isFullWidth
                colorScheme='red'
                variant='solid'
                aria-label='Logout'
                ml='-1px'
                leftIcon={<FiLogOut />}
                onClick={handleLogOut}
              >
                Logout
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </>
    )
  }

  return (
    <Button rounded='full' variant='outlined' isFullWidth onClick={handleLogin} leftIcon={<RifIcon />}>
      Login
    </Button>
  )
}

export default WalletConnect
