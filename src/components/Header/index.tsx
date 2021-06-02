import { useContext, useRef } from 'react'

import {
  Box,
  useColorModeValue,
  HStack,
  useUpdateEffect,
  useDisclosure,
  chakra,
  useBreakpointValue,
  Text,
  Tag,
  Button,
  StackProps,
  BoxProps,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'

import {
  DarkModeSwitch,
  LocaleSwitch,
  MobileNavButton,
  MobileNavContent,
  NavLink,
  Logo,
  Transactions,
  Container,
} from '@components'
import { NETWORK_LABELS } from '@constants'
import { Web3Context } from '@context/Web3Provider'
import { useAppSelector } from '@store'

const LoadingButton = () => <Button variant='outlined' isLoading={true} />

const WalletConnect = dynamic(() => import('../WalletConnect'), {
  ssr: false,
  loading: () => <LoadingButton />,
})

const MainNavLinkGroup = (props: StackProps): JSX.Element => {
  const { t } = useTranslation('common')
  const { isAdmin, account } = useAppSelector(state => state.identity)

  return (
    <HStack spacing='4' {...props}>
      <NavLink href='/courses/dev/_/welcome'>{t`courses`}</NavLink>
      <NavLink href='/events'>{t`events`}</NavLink>
      {account && !isAdmin && (
        <>
          <NavLink href='/portfolio'>{t`portfolio`}</NavLink>
          <NavLink href='/profile'>{t`profile`}</NavLink>
        </>
      )}
      {isAdmin && <NavLink href='/admin'>{t`admin`}</NavLink>}
    </HStack>
  )
}

export const Header = (props: BoxProps): JSX.Element => {
  const mobileNavBtnRef = useRef<HTMLButtonElement>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('primary.50', 'dark.500')
  const colorScheme = useColorModeValue('primary', 'light')
  const { t } = useTranslation('common')
  const { isLoggedIn } = useContext(Web3Context)

  const { chainId } = useAppSelector(state => state.identity)

  useUpdateEffect(() => {
    mobileNavBtnRef?.current?.focus()
  }, [isOpen])

  return (
    <>
      <Box d={useBreakpointValue({ base: 'none', md: 'block' })} bg={bg}>
        <Container>
          <HStack w='full' py={2} justify='center' pos='relative'>
            <Text
              userSelect='none'
              color={useColorModeValue('primary.500', 'light.500')}
              fontSize='sm'
              fontWeight='bold'
            >
              <span aria-label='student' role='img'>
                👨🏻‍🎓
              </span>{' '}
              {t`topBanner`}
            </Text>
            <HStack pos='absolute' right={0}>
              {isLoggedIn && NETWORK_LABELS[chainId] && <Tag colorScheme={colorScheme}>{NETWORK_LABELS[chainId]}</Tag>}
              <LocaleSwitch />
              <DarkModeSwitch />
            </HStack>
          </HStack>
        </Container>
      </Box>
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
        <Container h='4.5rem'>
          <HStack justify='space-between' align='center' h='full' w='full'>
            <HStack spacing={16} h='full'>
              <NextLink href='/' passHref>
                <chakra.a
                  fontWeight='bold'
                  fontSize='6em'
                  lineHeight='1'
                  mr={4}
                  d='flex'
                  justifyContent='center'
                  alignItems='center'
                  color={useColorModeValue('black', 'dark.50')}
                >
                  <Logo />
                </chakra.a>
              </NextLink>
              {useBreakpointValue({ base: false, md: true }) && <MainNavLinkGroup />}
            </HStack>

            {useBreakpointValue({ base: false, md: true }) && (
              <HStack>
                <Transactions />
                <WalletConnect />
              </HStack>
            )}
            <MobileNavButton ref={mobileNavBtnRef} aria-label='Open Menu' onClick={onOpen} />
          </HStack>
        </Container>
      </Box>
      <MobileNavContent isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Header
