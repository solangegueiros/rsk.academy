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
    account,
    chainId,
    isLoggedIn,
    error,
    isUnsupportedChainError,
  } = useRLogin()
  const { hasCopied, onCopy } = useClipboard(account)
  const context = useContext(Web3ProviderContext)

  const { t } = useI18n()

  const colorScheme = useColorModeValue('rsk.green', 'rsk.light')

  const getWalletStatus = () => {
    if (isLoggedIn) {
      if (isUnsupportedChainError) {
        return (
          <ButtonGroup isAttached colorScheme='red'>
            <Button leftIcon={<MdErrorOutline />}>{t('error.network')}</Button>
            <Tooltip hasArrow label={t('logout')}>
              <IconButton ml='-1px' icon={<FiLogOut />} onClick={deactivate} />
            </Tooltip>
          </ButtonGroup>
        )
      }

      if (error) {
        if (error === 'Modal closed by user') {
          return (
            <ButtonGroup isAttached colorScheme='yellow'>
              <Button leftIcon={<MdErrorOutline />}>
                {t('error.network')}
              </Button>
            </ButtonGroup>
          )
        } else
          return (
            <ButtonGroup isAttached colorScheme='red'>
              <Button leftIcon={<MdErrorOutline />}>
                {t('error.connect')}
              </Button>
            </ButtonGroup>
          )
      }

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
              : `${account.slice(0, 4)}...${account.slice(account.length - 4)}`}
          </Button>
          <Tooltip hasArrow label={t('logout')}>
            <IconButton ml='-1px' icon={<FiLogOut />} onClick={deactivate} />
          </Tooltip>
        </ButtonGroup>
      )
    }

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
