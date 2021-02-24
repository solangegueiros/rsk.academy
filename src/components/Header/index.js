import { useRef } from 'react'
import {
  Box,
  useColorModeValue,
  Container,
  HStack,
  useUpdateEffect,
  useDisclosure,
  chakra,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useI18n } from 'next-localization'
import NextLink from 'next/link'

import {
  DarkModeSwitch,
  LocaleSwitch,
  WalletConnect,
  MobileNavButton,
  MobileNavContent,
  NavLink,
  Logo,
} from '@/components/all'
import { useRLogin } from '@/hooks/useRLogin'

const MainNavLinkGroup = props => {
  const { t } = useI18n()
  const { isAdmin, isLoggedIn } = useRLogin()

  return (
    <HStack spacing='4' {...props}>
      <NavLink href='/courses'>{t('courses')}</NavLink>
      {isLoggedIn && !isAdmin && (
        <>
          <NavLink href='/portfolio'>{t('portfolio')}</NavLink>
          <NavLink href='/profile'>{t('profile')}</NavLink>
        </>
      )}
      {isAdmin && <NavLink href='/admin'>{t('admin')}</NavLink>}
    </HStack>
  )
}

export const Header = props => {
  const mobileNavBtnRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus()
  }, [isOpen])

  return (
    <>
      <Box
        pos='sticky'
        top='0'
        left='0'
        right='0'
        maxW='full'
        bg={useColorModeValue('white', 'dark.600')}
        boxShadow='md'
        zIndex='sticky'
        {...props}
      >
        <Container maxW={1200} h='4.5rem'>
          <HStack justify='space-between' align='center' h='full' w='full'>
            <NextLink href='/' passHref>
              <chakra.a
                fontWeight='bold'
                fontSize='5em'
                lineHeight='1'
                mr={4}
                d='flex'
                justifyContent='center'
                alignItems='center'
                color={useColorModeValue('black', 'dark.50')}
              >
                <Logo h='full' />
              </chakra.a>
            </NextLink>
            {useBreakpointValue({ base: false, md: true }) && (
              <>
                <MainNavLinkGroup />
                <HStack>
                  <WalletConnect />
                  <LocaleSwitch />
                  <DarkModeSwitch />
                </HStack>
              </>
            )}
            <MobileNavButton
              ref={mobileNavBtnRef}
              aria-label='Open Menu'
              onClick={onOpen}
            />
          </HStack>
        </Container>
      </Box>
      <MobileNavContent isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Header
