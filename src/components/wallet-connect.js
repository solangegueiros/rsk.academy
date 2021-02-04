import { MdContentCopy, MdErrorOutline } from 'react-icons/md'
import { useContext } from 'react'
import {
  Button,
  ButtonGroup,
  IconButton,
  Tag,
  Tooltip,
  useClipboard,
  useColorModeValue,
} from '@chakra-ui/react'
import { useI18n } from 'next-localization'
import { FiLogOut } from 'react-icons/fi'

import { useRLogin } from '@/hooks/use-rLogin'
import { Web3ProviderContext } from '@/context/Web3Provider'
import { NETWORK_LABELS } from '@/constants/supported-chains'

export const WalletConnect = () => {
  const {
    activate,
    deactivate,
    address,
    chainId,
    isLoggedIn,
    error,
    isChainError,
  } = useRLogin()
  const { hasCopied, onCopy } = useClipboard(address)
  const context = useContext(Web3ProviderContext)

  console.log('chainId', chainId)
  console.log('isChainError', isChainError)

  const { t } = useI18n()

  const colorScheme = useColorModeValue('rsk.green', 'rsk.light')

  const getWalletStatus = () => {
    if (isChainError) {
      return (
        <ButtonGroup isAttached colorScheme='red'>
          <Button leftIcon={<MdErrorOutline />}>
            {isChainError ? t('error.network') : t('error.connect')}
          </Button>
          <IconButton icon={<FiLogOut />} onClick={deactivate} />
        </ButtonGroup>
      )
    } else if (error) {
      return (
        <ButtonGroup isAttached colorScheme='red'>
          <Button leftIcon={<MdErrorOutline />}>
            {error === 'Modal closed by user'
              ? t('error.changeNetwork')
              : t('error.network')}
          </Button>
          <IconButton icon={<FiLogOut />} onClick={deactivate} />
        </ButtonGroup>
      )
    } else if (address) {
      return (
        <ButtonGroup
          colorScheme={colorScheme}
          variant='outline'
          role='group'
          isAttached
        >
          <Button
            onClick={onCopy}
            leftIcon={!hasCopied && <MdContentCopy />}
            isTruncated
          >
            {hasCopied
              ? t('copied')
              : `${address.slice(0, 4)}...${address.slice(address.length - 4)}`}
          </Button>
          <Tooltip hasArrow label={t('logout')}>
            <IconButton ml='-1px' icon={<FiLogOut />} onClick={deactivate} />
          </Tooltip>
        </ButtonGroup>
      )
    } else {
      return (
        <Button
          variant='outline'
          colorScheme={colorScheme}
          onClick={() => activate(context)}
        >
          {t('connect')}
        </Button>
      )
    }
  }

  return (
    <>
      {isLoggedIn && NETWORK_LABELS[chainId] && (
        <Tag colorScheme='orange'>{NETWORK_LABELS[chainId]}</Tag>
      )}
      {getWalletStatus()}
    </>
  )
}

export default WalletConnect
