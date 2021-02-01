import { chakra, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

export const NavLink = props => {
  const { href, ...rest } = props
  const { pathname } = useRouter()

  const [, group] = href.split('/')
  const isActive = pathname.includes(group)

  return (
    <NextLink href={href} passHref>
      <chakra.a
        aria-current={isActive ? 'page' : undefined}
        display='block'
        py='1'
        px='3'
        borderRadius='full'
        transition='all 0.3s'
        color={useColorModeValue('rsk.dark.500', 'rsk.dark.50')}
        fontWeight='normal'
        _hover={{ bg: useColorModeValue('rsk.green.50', 'whiteAlpha.100') }}
        _activeLink={{
          fontWeight: 'semibold',
          color: useColorModeValue('white', 'rsk.dark.500'),
          bg: useColorModeValue('rsk.green.500', 'rsk.light.500'),
        }}
        {...rest}
      />
    </NextLink>
  )
}

export default NavLink
