/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  useColorModeValue,
  chakra,
  Container,
  Flex,
  HStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import { darken } from '@chakra-ui/theme-tools'
import { useI18n } from 'next-localization'

import DarkModeSwitch from '@/components/shared/dark-mode-switch'
import LocaleSwitch from '@/components/shared/locale-switch'
import WalletConnect from '@/components/shared/wallet-connect'
import { Search } from './search'

// eslint-disable-next-line max-lines-per-function
const Header = () => {
  const { t } = useI18n()

  return (
    <Box
      pos='sticky'
      top='0'
      left='0'
      right='0'
      maxW='full'
      bg={useColorModeValue('white', darken('dark.bg', 2))}
      boxShadow='sm'
    >
      <Flex
        h={8}
        align='center'
        justify='center'
        fontSize='0.9em'
        textAlign='center'
        bg={useColorModeValue('rsk.green.500', 'rsk.text.500')}
        color={useColorModeValue('white', 'light.text')}
      >
        {t('topBanner')}
      </Flex>
      <Container maxW={1200} h='4.5rem'>
        <HStack justify='space-between' align='center' h='full' w='full'>
          <HStack flex='1'>
            <Link href='/' passHref>
              <chakra.a fontWeight='bold' fontSize='1.5rem' mr={4}>
                RSK Academy
              </chakra.a>
            </Link>
            <Search />
          </HStack>
          <HStack>
            <WalletConnect />
            <LocaleSwitch />
            <DarkModeSwitch />
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
}

export default Header
