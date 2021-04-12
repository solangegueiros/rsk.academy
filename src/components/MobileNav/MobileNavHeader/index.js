import PropTypes from 'prop-types'
import React, { useContext, useRef } from 'react'
import {
  Box,
  CloseButton,
  HStack,
  Tag,
  useColorModeValue,
  VStack,
  Button,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useI18n } from 'next-localization'
import dynamic from 'next/dynamic'

import { DarkModeSwitch } from '@/components/all'
import { RLoginResponseContext } from '@/context/RLoginProvider'
import { MobileNavLink } from '../MobileNavLink'

const LoadingButton = () => <Button variant='inversed' isLoading={true} />

const WalletConnect = dynamic(() => import('../../WalletConnect/index'), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => <LoadingButton />,
})

export const MobileNavHeader = ({ shadow, onClose }) => {
  const router = useRouter()
  const closeBtnRef = useRef()
  const { t } = useI18n()
  const { isAdmin } = useSelector(state => state.identity)
  const { rLoginResponse } = useContext(RLoginResponseContext)

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
          {rLoginResponse && !isAdmin && (
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
