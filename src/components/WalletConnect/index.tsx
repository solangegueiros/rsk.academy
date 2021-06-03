/* eslint-disable max-lines-per-function */
import { useContext, useEffect } from 'react'

import {
  Button,
  ButtonGroup,
  Divider,
  HStack,
  Icon,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useClipboard,
  useColorModeValue,
  useDisclosure,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { Web3Provider } from '@ethersproject/providers'
import RLogin from '@rsksmart/rlogin'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { useTranslation } from 'next-i18next'
import { FaPlus } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { MdContentCopy, MdErrorOutline } from 'react-icons/md'

import { RifIcon } from '@components'
import { Popup } from '@components/Popup'
import { DeployedNetworksType, SUPPORTED_CHAINS } from '@constants'
import { Web3Context } from '@context/Web3Provider'
import { useLoadAllContracts } from '@hooks/useLoadAllContracts'
import { useAppDispatch, useAppSelector } from '@store'
import { changeAccount, changeChainId, reset } from '@store/identity/slice'
import { getSigner } from '@utils/getContract'
import { trimValue } from '@utils/trimValue'

type Global = typeof window & { ethereum: any }

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
  },
  supportedChains: SUPPORTED_CHAINS,
})

const WalletConnect = (): JSX.Element => {
  const { account, chainId, error } = useAppSelector(state => state.identity)
  const { hasCopied, onCopy } = useClipboard(account)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useAppDispatch()
  const { logout, login, isLoggedIn } = useContext(Web3Context)
  const { loadAllContracts } = useLoadAllContracts()
  const toast = useToast()

  const { t } = useTranslation('common')
  const bg = useColorModeValue('white', 'dark.500')
  const color = useColorModeValue('primary.500', 'light.500')

  useEffect(() => {
    if (chainId && !SUPPORTED_CHAINS.includes(chainId)) {
      toast({ status: 'error', title: 'Unsupported Network', description: `Network Id: ${chainId}`, isClosable: true })
    } else if (isLoggedIn && chainId && Boolean(account)) {
      loadAllContracts()
    }
  }, [account, chainId, isLoggedIn])

  // handle logging out
  const handleLogOut = () => {
    logout()
    dispatch(reset())
  }

  const handleLogin = async () => {
    onClose()
    try {
      const res = await rLogin.connect()
      const rLoginProvider = res.provider

      if (rLoginProvider) {
        const web3Provider = new Web3Provider(rLoginProvider)
        const signer = getSigner(web3Provider, account)

        // const [acc] = await rLoginProvider.request({ method: 'eth_accounts' })
        // const network = await rLoginProvider.request({ method: 'eth_chainId' })
        const [acc] = await web3Provider.listAccounts()
        const network = await web3Provider.getNetwork()

        dispatch(changeAccount({ account: acc.toLowerCase() }))
        dispatch(changeChainId({ chainId: Number(network.chainId) as DeployedNetworksType }))

        // listen to change events and log out if any of them happen, passing
        // the rLogin response to the logout function as it has not been saved
        // into useState yet.
        rLoginProvider.on('accountsChanged', (accounts: string[]) =>
          dispatch(changeAccount({ account: accounts[0].toLowerCase() })),
        )
        rLoginProvider.on('chainChanged', (c: string) =>
          dispatch(changeChainId({ chainId: Number(c) as DeployedNetworksType })),
        )
        rLoginProvider.on('disconnect', () => handleLogOut)

        login({ rLoginResponse: res, web3Provider, signer })
      }
    } catch (err) {
      console.log(`RLogin Error`, err)
    }
  }

  const addNetwork = async params => {
    let global: Global
    if (typeof window !== undefined) {
      await global.ethereum.request({
        method: 'wallet_addEthereumChain',
        params,
      })

      dispatch(changeChainId({ chainId: Number(params[0].chainId) as DeployedNetworksType }))
    }
  }

  const addRskTestnet = () =>
    addNetwork([
      {
        chainId: '0x1f',
        chainName: 'RSK Testnet',
        nativeCurrency: {
          name: 'Test RSK BTC',
          symbol: 'tRBTC',
          decimals: 18,
        },
        rpcUrls: ['https://public-node.testnet.rsk.co'],
        blockExplorerUrls: ['https://explorer.testnet.rsk.co'],
      },
    ])

  const addRskMainnet = () =>
    addNetwork([
      {
        chainId: '0x1e',
        chainName: 'RSK Mainnet',
        nativeCurrency: {
          name: 'RSK BTC',
          symbol: 'RBTC',
          decimals: 18,
        },
        rpcUrls: ['https://public-node.rsk.co'],
        blockExplorerUrls: ['https://explorer.rsk.co'],
      },
    ])

  if (isLoggedIn) {
    if (error) {
      return (
        <ButtonGroup isAttached colorScheme='red'>
          <Button leftIcon={<MdErrorOutline />}>{t`error.connect`}</Button>
        </ButtonGroup>
      )
    }

    return (
      <ButtonGroup w='200px' variant='outlined' role='group' isAttached>
        <Button w='200px' onClick={onCopy} leftIcon={!hasCopied && <MdContentCopy />} isTruncated>
          {hasCopied ? t`copied` : trimValue(account)}
        </Button>
        <Popup label={t`logout`}>
          <IconButton aria-label='Logout' ml='-1px' icon={<FiLogOut />} onClick={handleLogOut} />
        </Popup>
      </ButtonGroup>
    )
  }

  return (
    <>
      <Button variant='outlined' onClick={onOpen}>
        {t`connect`}
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={bg} p={4}>
          <ModalHeader textAlign='center' color={color}>
            {t`connect`}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <Button size='lg' isFullWidth colorScheme='blue' onClick={handleLogin} leftIcon={<RifIcon />}>
              Connect with RLogin
            </Button>
            <Divider my={4} />
            <Text textAlign='center'>Add Rsk configurations for MetaMask</Text>
            <HStack justify='center' my={2}>
              <VStack
                as={Button}
                variant='outlined'
                size='sm'
                w='full'
                borderWidth={1}
                p={4}
                h='auto'
                onClick={addRskMainnet}
              >
                <HStack>
                  <Image h={50} src='/img/metamask-fox.svg' />
                  <Icon as={FaPlus} />
                  <Image h={50} src='/img/rsk.svg' />
                </HStack>
                <Text>Add RSK Mainnet</Text>
              </VStack>
              <VStack
                as={Button}
                variant='outlined'
                size='sm'
                w='full'
                borderWidth={1}
                p={4}
                h='auto'
                onClick={addRskTestnet}
              >
                <HStack>
                  <Image h={50} src='/img/metamask-fox.svg' />
                  <Icon as={FaPlus} />
                  <Image h={50} src='/img/rsk.svg' />
                </HStack>
                <Text>Add RSK Testnet</Text>
              </VStack>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default WalletConnect
