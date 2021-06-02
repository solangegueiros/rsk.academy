import React, { useContext, useRef } from 'react'

import { Box, CloseButton, HStack, Tag, useColorModeValue, VStack, Button, ButtonProps } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { DarkModeSwitch, Transactions } from '@components'
import { Web3Context } from '@context/Web3Provider'
import { useAppSelector } from '@store'

import { MobileNavLink } from '../MobileNavLink'

const LoadingButton = () => <Button variant='outlined' isLoading={true} />

const WalletConnect = dynamic(() => import('../../WalletConnect'), {
  ssr: false,
  loading: () => <LoadingButton />,
}) as React.FC<ButtonProps>

interface MobileNavHeaderProps {
  onClose: () => void
  shadow?: string
}

export const MobileNavHeader = ({ shadow, onClose }: MobileNavHeaderProps): JSX.Element => {
  const router = useRouter()
  const closeBtnRef = useRef()
  const { t } = useTranslation('common')
  const { isAdmin } = useAppSelector(state => state.identity)
  const { isLoggedIn } = useContext(Web3Context)

  const { locale, locales } = router

  const colorScheme = useColorModeValue('primary', 'light')

  const handleChange = async lang => {
    await router.push(router.pathname, router.asPath, { locale: lang })
  }

  return (
    <Box>
      <VStack px='6' py='4' shadow={shadow}>
        <HStack w='full'>
          <HStack flex='1'>
            {locales.map(lang => (
              <Tag size='lg' colorScheme={locale === lang && colorScheme} onClick={() => handleChange(lang)} key={lang}>
                {lang.toUpperCase()}
              </Tag>
            ))}
          </HStack>
          <DarkModeSwitch />
          <CloseButton ref={closeBtnRef} onClick={onClose} />
        </HStack>
        <HStack w='full'>
          <MobileNavLink href={`/courses/dev/01/${locale}`}>{t`courses`}</MobileNavLink>
          <MobileNavLink href='/events'>{t`events`}</MobileNavLink>
          {isLoggedIn && !isAdmin && (
            <>
              <MobileNavLink href='/portfolio'>{t`portfolio`}</MobileNavLink>
              <MobileNavLink href='/profile'>{t`profile`}</MobileNavLink>
            </>
          )}
          {isAdmin && <MobileNavLink href='/admin'>{t`admin`}</MobileNavLink>}
        </HStack>
        <HStack align='center'>
          <Transactions />
          <WalletConnect onClick={() => setTimeout(() => onClose(), 1000)} />
        </HStack>
      </VStack>
    </Box>
  )
}
