import {
  Box,
  Center,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  Tag,
  useColorModeValue,
  useUpdateEffect,
  VStack,
} from '@chakra-ui/react'
import { AnimatePresence, motion, useElementScroll } from 'framer-motion'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState, useEffect, forwardRef } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { RemoveScroll } from 'react-remove-scroll'

import { getRoutes } from '@/layouts/mdx'
import { DarkModeSwitch, SidebarContent } from '@/components/index'
import { useI18n } from 'next-localization'

export const MobileNavLink = ({ href, children }) => {
  const { pathname } = useRouter()

  const [, group] = href.split('/')
  const isActive = pathname.includes(group)

  const bg = useColorModeValue('primary.500', 'light.500')
  const color = useColorModeValue('white', 'dark.500')
  const activeHoverBg = useColorModeValue('primary.500', 'dark.500')
  const hoverBg = useColorModeValue('gray.100', 'whiteAlpha.100')

  return (
    <NextLink href={href}>
      <Center
        flex='1'
        minH='40px'
        as='button'
        rounded='md'
        transition='0.2s all'
        fontWeight={isActive ? '600' : '400'}
        bg={isActive ? bg : undefined}
        borderWidth={isActive ? undefined : '1px'}
        color={isActive ? color : undefined}
        _hover={{
          bg: isActive ? activeHoverBg : hoverBg,
        }}
      >
        {children}
      </Center>
    </NextLink>
  )
}

export const MobileNavContent = props => {
  const { isOpen, onClose } = props
  const closeBtnRef = useRef()
  const router = useRouter()
  const [shadow, setShadow] = useState()

  const { locale, locales, pathname } = router
  const { t } = useI18n()

  const bg = useColorModeValue('white', 'dark.500')
  const colorScheme = useColorModeValue('primary', 'light')

  const handleChange = async lang => {
    await router.push(router.pathname, router.asPath, { locale: lang })
  }

  useUpdateEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus()
      })
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <RemoveScroll forwardProps>
          <motion.div
            transition={{ duration: 0.08 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Flex
              direction='column'
              w='100%'
              bg={bg}
              h='100vh'
              overflow='auto'
              pos='absolute'
              top='0'
              left='0'
              zIndex='modal'
              pb='8'
            >
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
                    <MobileNavLink href='/projects'>
                      {t('projects')}
                    </MobileNavLink>
                    <MobileNavLink href='/blog'>{t('blog')}</MobileNavLink>
                    <MobileNavLink href='/admin'>{t('admin')}</MobileNavLink>
                  </HStack>
                </VStack>
              </Box>

              <ScrollView
                onScroll={scrolled => {
                  setShadow(scrolled ? 'md' : undefined)
                }}
              >
                <SidebarContent
                  pathname={pathname}
                  routes={getRoutes(pathname)}
                />
              </ScrollView>
            </Flex>
          </motion.div>
        </RemoveScroll>
      )}
    </AnimatePresence>
  )
}

export const ScrollView = props => {
  const { onScroll, ...rest } = props
  const [y, setY] = useState(0)
  const elRef = useRef()
  const { scrollY } = useElementScroll(elRef)

  useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])

  useUpdateEffect(() => {
    onScroll?.(y > 5)
  }, [y])

  return (
    <Box
      ref={elRef}
      flex='1'
      id='routes'
      overflow='auto'
      px='6'
      pb='6'
      {...rest}
    />
  )
}

export const MobileNavButton = forwardRef(function MobileNavButton(props, ref) {
  return (
    <IconButton
      ref={ref}
      display={{ base: 'flex', md: 'none' }}
      aria-label='Open menu'
      fontSize='20px'
      color={useColorModeValue('gray.800', 'inherit')}
      variant='ghost'
      icon={<AiOutlineMenu />}
      {...props}
    />
  )
})
