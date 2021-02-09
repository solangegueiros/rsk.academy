import { chakra, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const StyledLink = React.forwardRef(function StyledLink(props, ref) {
  const { isActive, ...rest } = props

  return (
    <chakra.a
      aria-current={isActive ? 'page' : undefined}
      px='3'
      py='1'
      rounded='md'
      ref={ref}
      fontSize='sm'
      fontWeight='500'
      color={useColorModeValue('dark.500', 'gray.100')}
      transition='all 0.2s'
      borderWidth={1}
      borderColor='transparent'
      _hover={{ color: useColorModeValue('primary.500', 'light.500') }}
      _activeLink={{
        borderColor: useColorModeValue('primary.500', 'light.500'),
        color: useColorModeValue('primary.500', 'light.500'),
        fontWeight: '600',
      }}
      {...rest}
    />
  )
})

export const SidebarLink = props => {
  const { href, icon, children, ...rest } = props

  const { pathname } = useRouter()
  const isActive = pathname === href

  return (
    <chakra.div
      userSelect='none'
      display='flex'
      alignItems='center'
      lineHeight='1.5rem'
      {...rest}
    >
      <NextLink href={href} passHref>
        <StyledLink isActive={isActive}>{children}</StyledLink>
      </NextLink>
    </chakra.div>
  )
}

export default SidebarLink
