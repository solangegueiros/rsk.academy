import AcademyWalletAbi from '@contracts/AcademyWallet.json'
import { Box, useClipboard, useColorModeValue } from '@chakra-ui/react'
import { CopyButton } from '../CodeBlock/CopyButton'
import { Highlight } from '../CodeBlock/Highlight'

export const WalletAddress = (): JSX.Element => {
  const address = process.env.NEXT_PUBLIC_ACADEMY_WALLET || AcademyWalletAbi.networks[31].address
  const { hasCopied, onCopy } = useClipboard(address?.toLowerCase())

  return (
    <Box position='relative' zIndex='0' w='full'>
      <Box py='4' overflow='auto' rounded='8px' my='8' bg={useColorModeValue('white', 'dark.600')} boxShadow='md'>
        <Highlight codeString={address?.toLowerCase()} language='bash' />
      </Box>
      <CopyButton onClick={onCopy}>{hasCopied ? 'copied' : 'copy'}</CopyButton>
    </Box>
  )
}
