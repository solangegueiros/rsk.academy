/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState, forwardRef, useRef, useCallback } from 'react'
import {
  chakra,
  HStack,
  Kbd,
  Portal,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react'
import { startsWith } from 'lodash/fp'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useI18n } from 'next-localization'
import { lighten } from '@chakra-ui/theme-tools'

import SearchStyle from './search-styles'

const startsWithCss = startsWith('css-')

const ACTION_KEY_DEFAULT = ['Ctrl', 'Control']
const ACTION_KEY_APPLE = ['⌘', 'Command']

function Hit(props) {
  const { hit, children } = props
  return (
    <Link href={hit.url}>
      <a>{children}</a>
    </Link>
  )
}

export const SearchButton = forwardRef(function SearchButton(props, ref) {
  const [actionKey, setActionKey] = useState(ACTION_KEY_APPLE)

  const { t } = useI18n()

  useEffect(() => {
    if (typeof navigator === 'undefined') return
    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
    if (!isMac) {
      setActionKey(ACTION_KEY_DEFAULT)
    }
  }, [])

  return (
    <chakra.button
      flex='1'
      type='button'
      role='search'
      mx='6'
      ref={ref}
      lineHeight='1.2'
      w='100%'
      bg={useColorModeValue('white', lighten('dark.bg'))}
      whiteSpace='nowrap'
      display={{ base: 'none', sm: 'flex' }}
      alignItems='center'
      color='gray.400'
      py='3'
      px='4'
      outline='0'
      _focus={{ shadow: 'outline' }}
      shadow='base'
      rounded='md'
      {...props}
    >
      <SearchStyle />
      <FaSearch />
      <HStack w='full' ml='3' spacing='4px'>
        <Text textAlign='left' flex='1'>
          {t('search')}
        </Text>
        <HStack spacing='4px'>
          <VisuallyHidden>Press </VisuallyHidden>
          <Kbd color='gray.500' rounded='2px'>
            <chakra.div
              as='abbr'
              title={actionKey[1]}
              textDecoration='none !important'
            >
              {ACTION_KEY_APPLE[0]}
            </chakra.div>
          </Kbd>
          <VisuallyHidden> and </VisuallyHidden>
          <Kbd color='gray.500' rounded='2px'>
            K
          </Kbd>
          <VisuallyHidden> to search</VisuallyHidden>
        </HStack>
      </HStack>
    </chakra.button>
  )
})

export function Search() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const searchButtonRef = useRef()
  const [initialQuery, setInitialQuery] = useState(null)

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const onInput = useCallback(
    e => {
      setIsOpen(true)
      setInitialQuery(e.key)
    },
    [setIsOpen, setInitialQuery],
  )

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  })

  return (
    <>
      <Head>
        <link
          rel='preconnect'
          href='https://QVXESOG9L2-dsn.algolia.net'
          crossOrigin='true'
        />
      </Head>
      <SearchButton onClick={onOpen} ref={searchButtonRef} />
      {isOpen && (
        <Portal>
          <DocSearchModal
            placeholder='Search the docs'
            initialQuery={initialQuery}
            initialScrollY={window.scrollY}
            onClose={onClose}
            indexName='test_Academy'
            apiKey='99f91ee81835e5f8b334ca3ccd9e58e8'
            appId='QVXESOG9L2'
            //@ts-expect-error
            navigator={{
              navigate({ suggestionUrl }) {
                setIsOpen(false)
                router.push(suggestionUrl)
              },
            }}
            hitComponent={Hit}
            transformItems={items => {
              return items
                .filter(item => {
                  const lvl1 = item.hierarchy.lvl1
                  return !startsWithCss(lvl1) || !startsWithCss(item.content)
                })
                .map(item => {
                  /**
                   *  We transform the absolute URL into a relative URL to
                   *  leverage Next's preloading.
                   */
                  const a = document.createElement('a')
                  a.href = item.url
                  const hash = a.hash === '#content-wrapper' ? '' : a.hash

                  return {
                    ...item,
                    url: `${a.pathname}${hash}`,
                    content: item.content ?? item.hierarchy.lvl0,
                  }
                })
            }}
          />
        </Portal>
      )}
    </>
  )
}
