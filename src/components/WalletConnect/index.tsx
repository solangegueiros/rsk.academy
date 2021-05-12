/* eslint-disable max-lines-per-function */
import { MdContentCopy, MdErrorOutline } from 'react-icons/md'
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
  usePrevious,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FiLogOut } from 'react-icons/fi'
import RLogin from '@rsksmart/rlogin'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { FaPlus } from 'react-icons/fa'

import { trimValue } from '@utils/trimValue'
import { SUPPORTED_CHAINS } from '@constants/constants'
import { changeAccount, changeChainId, reset } from '@store/identity/slice'
import { RLoginResponseContext } from '@context/RLoginProvider'
import { useLoadSmartContracts } from '@hooks/useLoadContracts'
import { RifIcon } from '@components'
import { useAppDispatch, useAppSelector } from '@store/store'
import { Popup } from '@components/Popup'

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
  const { resetResponse, setRLoginResponse, rLoginResponse } = useContext(RLoginResponseContext)
  const prevAccount = usePrevious(account)
  const prevChainId = usePrevious(chainId)
  const { loadContracts } = useLoadSmartContracts()

  const { t } = useTranslation('common')
  const bg = useColorModeValue('white', 'dark.500')
  const color = useColorModeValue('primary.500', 'light.500')

  useEffect(() => {
    if ((rLoginResponse?.provider && chainId && account !== '') || prevAccount !== account || prevChainId !== chainId) {
      loadContracts()
    }
  }, [account, chainId, rLoginResponse?.provider])

  // handle logging out
  const handleLogOut = () => {
    resetResponse()
    dispatch(reset())
  }

  const handleLogin = async () => {
    onClose()
    try {
      const res = await rLogin.connect()
      const provider = res.provider
      const [acc] = await provider.request({ method: 'eth_accounts' })
      const network = await provider.request({ method: 'eth_chainId' })

      dispatch(changeAccount({ account: acc.toLowerCase() }))
      dispatch(changeChainId({ chainId: Number(network) }))

      // listen to change events and log out if any of them happen, passing
      // the rLogin response to the logout function as it has not been saved
      // into useState yet.
      provider.on('accountsChanged', (accounts: string[]) =>
        dispatch(changeAccount({ account: accounts[0].toLowerCase() })),
      )
      provider.on('chainChanged', (c: string) => dispatch(changeChainId({ chainId: Number(c) })))
      provider.on('disconnect', () => handleLogOut)

      // finally, set setRLoginResponse with useState
      // when the JS is compiled this variable is set after the promise is
      // resolved which is why it is at the very end.
      setRLoginResponse(res)
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

      dispatch(changeChainId({ chainId: Number(params[0].chainId) }))
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

  if (rLoginResponse) {
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