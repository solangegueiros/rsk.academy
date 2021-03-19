import { MdContentCopy, MdErrorOutline } from 'react-icons/md'
import { useContext } from 'react'
import {
  Button,
  ButtonGroup,
  IconButton,
  Tag,
  Tooltip,
  useClipboard,
} from '@chakra-ui/react'
import { useI18n } from 'next-localization'
import { FiLogOut } from 'react-icons/fi'

import { useRLogin } from '@/hooks/useRLogin'
import { Web3ProviderContext } from '@/context/Web3Provider'
import { NETWORK_LABELS } from '@/constants/constants'
import { trimValue } from '@/utils/trimValue'

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
        <ButtonGroup variant='inversed' role='group' isAttached>
          <Button
            onClick={onCopy}
            leftIcon={!hasCopied && <MdContentCopy />}
            isTruncated
          >
            {hasCopied ? t('copied') : trimValue(account)}
          </Button>
          <Tooltip hasArrow label={t('logout')}>
            <IconButton ml='-1px' icon={<FiLogOut />} onClick={deactivate} />
          </Tooltip>
        </ButtonGroup>
      )
    }

    return (
      <Button variant='inversed' onClick={() => activate(context)}>
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
