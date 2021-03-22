import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import {
  Box,
  CloseButton,
  HStack,
  Tag,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useI18n } from 'next-localization'

import { DarkModeSwitch, WalletConnect } from '@/components/all'
import { useRLogin } from '@/hooks/useRLogin'
import { MobileNavLink } from '../MobileNavLink'

export const MobileNavHeader = ({ shadow, onClose }) => {
  const router = useRouter()
  const closeBtnRef = useRef()
  const { t } = useI18n()
  const { isAdmin, isLoggedIn } = useRLogin()

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
              <Tag
                size='lg'
                colorScheme={locale === lang && colorScheme}
                onClick={() => handleChange(lang)}
                key={lang}
              >
                {lang.toUpperCase()}
              </Tag>
            ))}
          </HStack>
          <DarkModeSwitch />
          <CloseButton ref={closeBtnRef} onClick={onClose} />
        </HStack>
        <HStack w='full'>
          <MobileNavLink href={`/courses/dev/01/${locale}`}>
            {t('courses')}
          </MobileNavLink>
          <MobileNavLink href='/events'>{t('events')}</MobileNavLink>
          {isLoggedIn && !isAdmin && (
            <>
              <MobileNavLink href='/portfolio'>{t('portfolio')}</MobileNavLink>
              <MobileNavLink href='/profile'>{t('profile')}</MobileNavLink>
            </>
          )}
          {isAdmin && <MobileNavLink href='/admin'>{t('admin')}</MobileNavLink>}
        </HStack>
        <HStack
          onClick={() => setTimeout(() => onClose(), 1000)}
          align='center'
        >
          <WalletConnect />
        </HStack>
      </VStack>
    </Box>
  )
}

MobileNavHeader.propTypes = {
  shadow: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}
