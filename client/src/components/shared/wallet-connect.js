/* eslint-disable react-hooks/rules-of-hooks */
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { injected } from '@/connectors/index'
import { shortenAddress } from '@/utils/index'
import { NETWORK_LABELS } from '@/constants/index'
import { MdContentCopy, MdErrorOutline } from 'react-icons/md'
import { useState } from 'react'
import {
  Button,
  ButtonGroup,
  IconButton,
  Tag,
  useClipboard,
  useColorModeValue,
  Modal,
  ModalBody,
  ModalContent,
  VStack,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Link as ChakraLink,
} from '@chakra-ui/react'
import { toggleWalletModal } from '@/store/account/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useI18n } from 'next-localization'
import { FiLogOut } from 'react-icons/fi'

const WalletConnect = () => {
  const { deactivate, account, activate, error, chainId } = useWeb3React()
  const { hasCopied, onCopy } = useClipboard(account)
  const [pending, setPending] = useState(false)
  const dispatch = useDispatch()
  const { t } = useI18n()
  const { isWalletModalOpen } = useSelector(state => state.wallet)
  const hasWebWallet =
    typeof window !== 'undefined' && (window.web3 || window.ethereum)

  async function tryConnect() {
    setPending(true)
    try {
      if (hasWebWallet) {
        await activate(injected, undefined, true)
      }

      dispatch(toggleWalletModal())
    } catch (err) {
      if (err instanceof UnsupportedChainIdError) {
        activate(injected)
      }
    } finally {
      setPending(false)
    }
  }

  const getWalletStatus = () => {
    if (error) {
      return (
        <ButtonGroup isAttached colorScheme='red'>
          <Button
            isLoading={pending || !(error instanceof UnsupportedChainIdError)}
            leftIcon={<MdErrorOutline />}
          >
            {error instanceof UnsupportedChainIdError
              ? t('error.network')
              : t('error.connect')}
          </Button>
          <IconButton icon={<FiLogOut />} onClick={deactivate} />
        </ButtonGroup>
      )
    } else if (account) {
      return (
        <ButtonGroup
          colorScheme={useColorModeValue('rsk.green', 'rsk.text')}
          variant='outline'
          role='group'
          isAttached
        >
          <Button
            onClick={onCopy}
            leftIcon={!hasCopied && <MdContentCopy />}
            isTruncated
          >
            {hasCopied ? t('copied') : shortenAddress(account)}
          </Button>
          <IconButton icon={<FiLogOut />} onClick={deactivate} />
        </ButtonGroup>
      )
    } else {
      return (
        <Button
          variant='outline'
          colorScheme={useColorModeValue('rsk.green', 'rsk.text')}
          onClick={tryConnect}
        >
          {t('connect')}
        </Button>
      )
    }
  }

  return (
    <>
      {NETWORK_LABELS[chainId] && (
        <Tag colorScheme='orange'>{NETWORK_LABELS[chainId]}</Tag>
      )}
      {getWalletStatus()}
      <Modal
        isOpen={isWalletModalOpen}
        onClose={() => dispatch(toggleWalletModal())}
        isCentered
        size='lg'
      >
        <ModalContent>
          <ModalHeader>
            Need a wallet?
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <VStack>
              <Button w='full' as={ChakraLink} href='https://metamask.io'>
                Download Metamask
              </Button>
              <Button
                w='full'
                as={ChakraLink}
                href='https://chrome.google.com/webstore/detail/nifty-wallet/jbdaocneiiinmjbjlgalhcelgbejmnid?hl=en'
              >
                Download Nifty
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter fontSize='0.875em' justifyContent='center'>
            If you have MetaMask/Nifty wallet already, please activate the
            extension.
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default WalletConnect
