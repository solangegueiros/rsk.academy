import { MdContentCopy, MdErrorOutline } from 'react-icons/md'
import { useContext, useEffect } from 'react'
import {
  Button,
  ButtonGroup,
  IconButton,
  Tooltip,
  useClipboard,
  usePrevious,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useI18n } from 'next-localization'
import { FiLogOut } from 'react-icons/fi'
import RLogin from '@rsksmart/rlogin'
import WalletConnectProvider from '@walletconnect/web3-provider'

import { trimValue } from '@/utils/trimValue'
import { SUPPORTED_CHAINS } from '@/constants/constants'
import { getAccountAndNetwork } from '@/utils/web3Rpc'
import { changeAccount, changeChainId, reset } from '@/store/identity/actions'
import { RLoginResponseContext } from '@/context/RLoginProvider'
import { useLoadSmartContracts } from '@/hooks/useLoadContracts'

const rLogin = new RLogin({
  cachedProvider: false,
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

const WalletConnect = () => {
  const { account, chainId, error } = useSelector(state => state.identity)
  const { hasCopied, onCopy } = useClipboard(account)
  const dispatch = useDispatch()
  const { resetResponse, setRLoginResponse, rLoginResponse } = useContext(
    RLoginResponseContext,
  )
  const prevAccount = usePrevious(account)
  const prevChainId = usePrevious(chainId)
  const { loadContracts } = useLoadSmartContracts()

  const { t } = useI18n()

  useEffect(() => {
    if (
      (rLoginResponse?.provider && chainId && account !== '') ||
      prevAccount !== account ||
      prevChainId !== chainId
    ) {
      loadContracts()
    }
  }, [account, chainId, rLoginResponse?.provider])

  // handle logging out
  const handleLogOut = () => {
    resetResponse()
    dispatch(reset())
  }

  const handleLogin = async () => {
    const res = await rLogin.connect()
    const provider = res.provider
    const [acc, network] = await getAccountAndNetwork(provider)

    dispatch(changeAccount({ account: acc.toLowerCase() }))
    dispatch(changeChainId({ chainId: parseInt(network) }))

    // listen to change events and log out if any of them happen, passing
    // the rLogin response to the logout function as it has not been saved
    // into useState yet.
    provider.on('accountsChanged', accounts =>
      dispatch(changeAccount({ account: accounts[0].toLowerCase() })),
    )
    provider.on('chainChanged', c =>
      dispatch(changeChainId({ chainId: parseInt(c) })),
    )
    provider.on('disconnect', () => handleLogOut)

    // finally, set setRLoginResponse with useState
    // when the JS is compiled this variable is set after the promise is
    // resolved which is why it is at the very end.
    setRLoginResponse(res)
  }

  const getWalletStatus = () => {
    if (rLoginResponse) {
      if (error) {
        return (
          <ButtonGroup isAttached colorScheme='red'>
            <Button leftIcon={<MdErrorOutline />}>{t('error.connect')}</Button>
          </ButtonGroup>
        )
      }

      return (
        <ButtonGroup w='200px' variant='inversed' role='group' isAttached>
          <Button
            w='200px'
            onClick={onCopy}
            leftIcon={!hasCopied && <MdContentCopy />}
            isTruncated
          >
            {hasCopied ? t('copied') : trimValue(account)}
          </Button>
          <Tooltip hasArrow label={t('logout')}>
            <IconButton ml='-1px' icon={<FiLogOut />} onClick={handleLogOut} />
          </Tooltip>
        </ButtonGroup>
      )
    }

    return (
      <Button variant='inversed' onClick={handleLogin}>
        {t('connect')}
      </Button>
    )
  }

  return getWalletStatus()
}

export default WalletConnect
