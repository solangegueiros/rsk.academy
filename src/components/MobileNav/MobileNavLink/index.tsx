import { ReactNode } from 'react'

import { Center, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

interface MobileNavLinkProps {
  href: string
  children: ReactNode
}

export const MobileNavLink = ({ href, children }: MobileNavLinkProps): JSX.Element => {
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
        fontSize='0.9em'
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
